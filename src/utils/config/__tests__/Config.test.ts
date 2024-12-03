import { documentFactory } from "../../../infrastructure/filesystem/DocumentFactory";
import { logger } from "../../logger/Logger";
import { Config } from "../Config";
import { DEFAULT_CONFIG } from "../schema";

jest.mock("../../../infrastructure/filesystem/DocumentFactory");
jest.mock("../../logger/Logger", () => ({
  logger: {
    error: jest.fn()
  },
  LOG_VALUES: ["ERROR", "WARN", "INFO", "DEBUG"]
}));

describe("Config", () => {
  let config: Config;

  const TEST_OUTPUT_FILE = "new-output";

  beforeEach(async () => {
    // Reset mocks
    jest.resetAllMocks();
    (documentFactory.exists as jest.Mock).mockReturnValue(false);
    (documentFactory.readFile as jest.Mock).mockResolvedValue(
      JSON.stringify(DEFAULT_CONFIG)
    );
    (documentFactory.join as jest.Mock).mockImplementation((...args) =>
      args.join("/")
    );

    // Destroy singleton instance before each test
    Config.destroy();
    config = await Config.load();
  });

  afterEach(() => {
    Config.destroy();
  });

  describe("Singleton Management", () => {
    it("load returns the same instance", async () => {
      const instance1 = await Config.load();
      const instance2 = await Config.load();
      expect(instance1).toBe(instance2);
    });

    it("destroy removes the singleton instance", async () => {
      const instance1 = await Config.load();
      Config.destroy();
      const instance2 = await Config.load();
      expect(instance1).not.toBe(instance2);
    });

    it("reset restores default configuration", () => {
      config.set("outputFile", TEST_OUTPUT_FILE);
      config.reset();
      expect(config.getAll()).toEqual(DEFAULT_CONFIG);
    });
  });

  describe("Configuration Loading", () => {
    it("loads default config when no config file exists", async () => {
      (documentFactory.exists as jest.Mock).mockReturnValue(false);
      Config.destroy();
      const newConfig = await Config.load();
      expect(newConfig.getAll()).toEqual(DEFAULT_CONFIG);
    });

    it("loads and merges custom config when file exists", async () => {
      const customConfig = {
        outputFile: TEST_OUTPUT_FILE,
        logLevel: "DEBUG" as const
      };

      (documentFactory.exists as jest.Mock).mockReturnValue(true);
      (documentFactory.readFile as jest.Mock).mockResolvedValue(
        JSON.stringify(customConfig)
      );

      Config.destroy();
      const newConfig = await Config.load();

      expect(newConfig.get("outputFile")).toBe(customConfig.outputFile);
      expect(newConfig.get("logLevel")).toBe(customConfig.logLevel);
    });

    it("throws error when config file is empty", async () => {
      (documentFactory.exists as jest.Mock).mockReturnValue(true);
      (documentFactory.readFile as jest.Mock).mockResolvedValue("  ");

      Config.destroy();
      await expect(Config.load()).rejects.toThrow(
        "Configuration file is empty"
      );
    });

    it("throws error when config file contains invalid JSON", async () => {
      (documentFactory.exists as jest.Mock).mockReturnValue(true);
      (documentFactory.readFile as jest.Mock).mockResolvedValue("invalid json");

      Config.destroy();
      await expect(Config.load()).rejects.toThrow(
        "Invalid JSON in configuration file"
      );
    });
  });

  describe("Configuration Operations", () => {
    describe("get", () => {
      it("returns correct values after initialization", () => {
        expect(config.get("dir")).toBe(DEFAULT_CONFIG.dir);
        expect(config.get("pattern")).toBe(DEFAULT_CONFIG.pattern);
        expect(config.get("outputFile")).toBe(DEFAULT_CONFIG.outputFile);
      });
    });

    describe("set", () => {
      const TEST_OUTPUT_FILE = "new-output";
      it("updates single value successfully", () => {
        config.set("outputFile", TEST_OUTPUT_FILE);
        expect(config.get("outputFile")).toBe(TEST_OUTPUT_FILE);
      });

      it("maintains other values when setting one value", () => {
        const originalConfig = config.getAll();
        config.set("outputFile", TEST_OUTPUT_FILE);
        expect(config.get("pattern")).toBe(originalConfig.pattern);
      });

      it("throws error for invalid values", () => {
        expect(() => {
          config.set("maxFileSize", -1);
        }).toThrow();
        expect(logger.error).toHaveBeenCalled();
      });
    });

    describe("override", () => {
      it("successfully overrides multiple values", () => {
        const overrides = {
          outputFile: TEST_OUTPUT_FILE,
          logLevel: "DEBUG" as const,
          maxFileSize: 2048576
        };

        config.override(overrides);

        expect(config.get("outputFile")).toBe(overrides.outputFile);
        expect(config.get("logLevel")).toBe(overrides.logLevel);
        expect(config.get("maxFileSize")).toBe(overrides.maxFileSize);
      });

      it("maintains unaffected values after override", () => {
        const originalPattern = config.get("pattern");
        config.override({ outputFile: TEST_OUTPUT_FILE });
        expect(config.get("pattern")).toBe(originalPattern);
      });

      it("throws error for invalid override values", () => {
        expect(() => {
          config.override({ maxFileSize: -1 });
        }).toThrow();
        expect(logger.error).toHaveBeenCalled();
      });
    });
  });
});
