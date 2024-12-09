import { logger } from "../../../logger";
import { ConfigBuilder } from "../../builders/ConfigBuilder";
import { Config } from "../../core/Config";
import { CLIConfigSource } from "../../sources/CLIConfigSource";
import { FileConfigSource } from "../../sources/FileConfigSource";

jest.mock("../../../logger", () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn()
  }
}));

jest.mock("../../core/Config");
jest.mock("../../sources/FileConfigSource");
jest.mock("../../sources/CLIConfigSource");

describe("ConfigBuilder", () => {
  let mockConfig: jest.Mocked<Config>;
  let builderInstance: ConfigBuilder;

  beforeEach(() => {
    jest.clearAllMocks();

    // Create mock Config instance with all required methods
    mockConfig = {
      addSource: jest.fn(),
      override: jest.fn(),
      loadSources: jest.fn().mockResolvedValue(undefined)
    } as unknown as jest.Mocked<Config>;

    // Mock the Config.load static method to return our mockConfig
    (Config.load as jest.Mock).mockResolvedValue(mockConfig);

    // Reset the ConfigBuilder singleton
    // @ts-expect-error - accessing private static member for testing
    ConfigBuilder.instance = undefined;
  });

  describe("create", () => {
    it("should create a singleton instance", async () => {
      const instance1 = await ConfigBuilder.create();
      const instance2 = await ConfigBuilder.create();

      expect(instance1).toBe(instance2);
      expect(logger.info).toHaveBeenCalledWith("ConfigBuilder created");
      // Store the instance for other tests
      builderInstance = instance1;
    });

    it("should handle creation errors", async () => {
      (Config.load as jest.Mock).mockRejectedValue(
        new Error("Config load failed")
      );

      await expect(ConfigBuilder.create()).rejects.toThrow(
        "Config load failed"
      );
    });
  });

  describe("configuration methods", () => {
    beforeEach(async () => {
      // Ensure we have a fresh builder instance that uses our mockConfig
      builderInstance = await ConfigBuilder.create();
    });

    describe("withFileConfig", () => {
      it("should add file configuration source", () => {
        const filePath = "config.json";
        const result = builderInstance.withFileConfig(filePath);

        expect(mockConfig.addSource).toHaveBeenCalledWith(
          expect.any(FileConfigSource)
        );
        expect(result).toBe(builderInstance);
      });
    });

    describe("withCLIConfig", () => {
      it("should add CLI configuration source", () => {
        const mockCLISource = {} as CLIConfigSource<object>;
        const result = builderInstance.withCLIConfig(mockCLISource);

        expect(mockConfig.addSource).toHaveBeenCalledWith(mockCLISource);
        expect(result).toBe(builderInstance);
      });
    });

    describe("withOverride", () => {
      it("should apply configuration override", () => {
        const override = { name: "test" };
        const result = builderInstance.withOverride(override);

        expect(mockConfig.override).toHaveBeenCalledWith(override);
        expect(result).toBe(builderInstance);
      });
    });

    describe("build", () => {
      it("should return configured Config instance", () => {
        const config = builderInstance.build();
        expect(config).toBe(mockConfig);
      });

      it("should load sources before returning", () => {
        builderInstance.build();
        expect(mockConfig.loadSources).toHaveBeenCalled();
      });

      it("should handle load errors gracefully", async () => {
        mockConfig.loadSources.mockRejectedValue(new Error("Load error"));

        builderInstance.build();

        await new Promise(process.nextTick); // Allow async error to be handled
        expect(logger.error).toHaveBeenCalledWith(
          "Failed to load configuration sources",
          expect.any(Error)
        );
      });
    });
  });
});
