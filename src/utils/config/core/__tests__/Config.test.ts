import { z } from "zod";

import { logger } from "../../../logger";
import { DEFAULT_CONFIG, DEFAULT_JOB_CONFIG } from "../../schema/defaults";
import { IConfig, ILoadConfigResult } from "../../schema/types";
import { optionalConfigSchema } from "../../schema/validation";
import { IConfigurationSource } from "../../sources/interfaces/IConfigurationSource";
import { Config } from "../Config";
import { JobConfig } from "../JobConfig";

jest.mock("../../../logger", () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    setConfig: jest.fn()
  }
}));

class MockConfigSource implements IConfigurationSource<Partial<IConfig>> {
  public readonly priority = 1;
  public readonly schema = optionalConfigSchema;

  public constructor(private mockConfig: Partial<IConfig> = {}) {}

  public async load(): Promise<ILoadConfigResult<Partial<IConfig>>> {
    return await Promise.resolve({
      config: this.mockConfig,
      jobConfig: [],
      input: this.mockConfig
    });
  }
}

describe("Config", () => {
  beforeEach(() => {
    Config.destroy();
    jest.clearAllMocks();
  });

  describe("Singleton Pattern", () => {
    it("should create only one instance", async () => {
      const instance1 = await Config.load();
      const instance2 = await Config.load();
      expect(instance1).toBe(instance2);
    });

    it("should throw error if getInstance called before initialization", () => {
      Config.destroy();
      expect(() => Config.getInstance()).toThrow(
        "Config must be initialized before use"
      );
    });
  });

  describe("Configuration Sources", () => {
    it("should load configuration from sources in priority order", async () => {
      const config = await Config.load();
      const source1 = new MockConfigSource({ name: "Source1" });
      const source2 = new MockConfigSource({ name: "Source2" });

      config.addSource(source1);
      config.addSource(source2);

      await config.loadSources();
      expect(config.get("name")).toBe("Source2");
    });

    it("should handle source loading errors gracefully", async () => {
      const config = await Config.load();
      const failingSource = new MockConfigSource();
      jest
        .spyOn(failingSource, "load")
        .mockRejectedValue(new Error("Load failed"));

      config.addSource(failingSource);
      await config.loadSources();

      expect(logger.error).toHaveBeenCalled();
    });
  });

  describe("Default Job", () => {
    it("should initialize with default job config", async () => {
      const config = await Config.load();
      expect(config.defaultJob).toBeInstanceOf(JobConfig);
      expect(config.defaultJob.getAll()).toEqual({
        ...DEFAULT_JOB_CONFIG,
        name: expect.any(String)
      });
    });
  });

  describe("Configuration Override", () => {
    it("should allow overriding configuration values", async () => {
      const config = await Config.load();
      const override = { name: "Overridden" };

      config.override(override);
      expect(config.get("name")).toBe("Overridden");
    });

    it("should validate overridden values", async () => {
      const config = await Config.load();
      const invalidOverride = { name: 123 }; // Invalid type

      expect(() =>
        config.override(
          invalidOverride as unknown as Partial<typeof DEFAULT_CONFIG>
        )
      ).toThrow();
    });
  });
  describe("Configuration Validation", () => {
    it("should validate configuration on load", async () => {
      const config = await Config.load();
      const invalidSource = new MockConfigSource({
        name: 123 as unknown as string
      });

      config.addSource(invalidSource);
      await expect(config.loadSources()).rejects.toThrow();
    });
  });
  describe("Logger Integration", () => {
    it("should initialize logger with config instance", async () => {
      await Config.load();
      expect(logger.setConfig).toHaveBeenCalled();
    });
  });

  describe("Configuration Loading", () => {
    it("should properly initialize default configuration", async () => {
      const config = await Config.load();
      expect(config.get("name")).toBeDefined();
      expect(config.defaultJob).toBeDefined();
    });

    it("should handle validation errors during source loading", async () => {
      const config = await Config.load();
      const invalidSource = new MockConfigSource({
        invalidField: "test"
      } as unknown as Partial<IConfig>);

      config.addSource(invalidSource);
      await expect(config.loadSources()).rejects.toThrow();
    });
  });

  describe("Source Navigation", () => {
    it("should handle errors during source navigation", async () => {
      const config = await Config.load();
      const errorSource = {
        priority: 1,
        schema: z.object({}),
        load: jest.fn().mockRejectedValue(new Error("Navigation error"))
      };

      config.addSource(errorSource);
      await config.loadSources();
      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining("Failed to navigate configuration source")
      );
    });
  });
});
