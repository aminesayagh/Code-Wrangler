import { z } from "zod";

import { logger } from "../../../logger";
import { Config } from "../Config";
import { ConfigManager } from "../ConfigManager";
import { JobManager } from "../JobManager";

jest.mock("../../../logger", () => ({
  logger: {
    error: jest.fn(),
    warn: jest.fn()
  }
}));

interface ITestConfig {
  name: string;
  value: number;
  flag: boolean;
}

const testSchema = z.object({
  name: z.string(),
  value: z.number(),
  flag: z.boolean()
});

class TestConfigManager extends ConfigManager<ITestConfig> {
  protected validate(config: ITestConfig): ITestConfig {
    return testSchema.parse(config);
  }

  protected handleConfigError(error: unknown): void {
    if (error instanceof z.ZodError) {
      const details = error.errors
        .map(err => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
      logger.error(`Configuration validation failed: ${details}`);
      throw new Error("Configuration validation failed");
    }
    throw error;
  }
}

describe("ConfigManager", () => {
  let configManager: TestConfigManager;
  const defaultConfig: ITestConfig = {
    name: "test",
    value: 42,
    flag: true
  };

  beforeEach(() => {
    jest.clearAllMocks();
    configManager = new TestConfigManager(defaultConfig);
  });

  describe("constructor", () => {
    it("should initialize with provided default config", () => {
      expect(configManager.getAll()).toEqual(defaultConfig);
    });

    it("should validate default config on initialization", () => {
      const invalidConfig = {
        name: 123,
        value: "invalid",
        flag: "not-boolean"
      };

      expect(
        () => new TestConfigManager(invalidConfig as unknown as ITestConfig)
      ).toThrow();
    });
  });

  describe("get", () => {
    it("should return correct values for all config keys", () => {
      expect(configManager.get("name")).toBe("test");
      expect(configManager.get("value")).toBe(42);
      expect(configManager.get("flag")).toBe(true);
    });

    it("should return undefined for non-existent keys", () => {
      expect(
        configManager.get("nonexistent" as keyof ITestConfig)
      ).toBeUndefined();
    });
  });

  describe("set", () => {
    it("should update valid config values", () => {
      configManager.set("name", "updated");
      expect(configManager.get("name")).toBe("updated");
    });

    it("should maintain other values when updating single key", () => {
      const originalConfig = configManager.getAll();
      configManager.set("name", "updated");

      expect(configManager.getAll()).toEqual({
        ...originalConfig,
        name: "updated"
      });
    });

    it("should ignore undefined values", () => {
      configManager.set("name", undefined as unknown as string);
      expect(configManager.get("name")).toBe("test");
    });

    it("should validate new values", () => {
      expect(() =>
        configManager.set("value", "invalid" as unknown as number)
      ).toThrow();
      expect(configManager.get("value")).toBe(42);
    });

    it("should call handleConfigError for validation failures", () => {
      expect(() =>
        configManager.set("flag", "invalid" as unknown as boolean)
      ).toThrow("Configuration validation failed");
      expect(logger.error).toHaveBeenCalled();
    });
  });

  describe("getAll", () => {
    it("should return complete config object", () => {
      expect(configManager.getAll()).toEqual(defaultConfig);
    });

    it("should return updated config after changes", () => {
      configManager.set("name", "updated");
      configManager.set("value", 100);

      expect(configManager.getAll()).toEqual({
        ...defaultConfig,
        name: "updated",
        value: 100
      });
    });

    it("should return a copy of the config object", () => {
      const config = configManager.getAll();
      config.name = "modified";

      expect(configManager.get("name")).toBe("test");
    });
  });

  describe("Job Execution", () => {
    const mockConfig = {
      name: "test"
    };

    it("should handle errors during job execution callback", async () => {
      const jobManager = new JobManager(mockConfig as unknown as Config);
      const mockCallback = jest
        .fn()
        .mockRejectedValue(new Error("Execution error"));

      jobManager.registerJob({ name: "test-job" });
      const results = await jobManager.executeJobs(mockCallback);

      expect(results).toContain(undefined);
      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining("Error in job test-job")
      );
    });
  });
});
