// Config.test.ts

import fs from "fs";
import { Config, DEFAULT_CONFIG } from "../Config";
import { logger } from "../Logger";

jest.mock("fs");
jest.mock("../Logger", () => ({
  logger: {
    error: jest.fn(),
  },
  LOG_VALUES: ["ERROR", "WARN", "INFO", "DEBUG"],
}));

describe("Config", () => {
  let config: Config;

  beforeEach(() => {
    // Reset mocks
    (fs.existsSync as jest.Mock).mockReset();
    (fs.readFileSync as jest.Mock).mockReset();
    (logger.error as jest.Mock).mockReset();

    // Destroy singleton instance before each test
    Config.destroy();
    config = Config.load();
  });

  afterEach(() => {
    // Clean up after each test
    Config.destroy();
  });

  describe("Singleton Management", () => {
    it("getInstance returns the same instance", () => {
      const instance1 = Config.load();
      const instance2 = Config.load();
      expect(instance1).toBe(instance2);
    });

    it("destroy removes the singleton instance", () => {
      const instance1 = Config.load();
      Config.destroy();
      const instance2 = Config.load();
      expect(instance1).not.toBe(instance2);
    });

    it("reset restores default configuration", () => {
      config.set("outputFile", "custom-output");
      config.reset();
      expect(config.getAll()).toEqual(DEFAULT_CONFIG);
    });
  });

  describe("Configuration Loading", () => {
    it("loads default config when no config file exists", () => {
      (fs.existsSync as jest.Mock).mockReturnValue(false);
      Config.destroy();
      const newConfig = Config.load();
      expect(newConfig.getAll()).toEqual(DEFAULT_CONFIG);
    });

    it("loads and merges user config when file exists", () => {
      const userConfig = {
        outputFile: "user-output",
        logLevel: "DEBUG",
      };
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.readFileSync as jest.Mock).mockReturnValue(
        JSON.stringify(userConfig)
      );

      Config.destroy();
      const newConfig = Config.load();
      expect(newConfig.get("outputFile")).toBe(userConfig.outputFile);
      expect(newConfig.get("logLevel")).toBe(userConfig.logLevel);
      // Default values should still be present
      expect(newConfig.get("pattern")).toBe(DEFAULT_CONFIG.pattern);
    });
  });

  describe("Constructor and Private Properties", () => {
    it("creates a new instance with default config when no file exists", () => {
      (fs.existsSync as jest.Mock).mockReturnValue(false);
      Config.destroy();
      const instance = Config.load();
      expect(instance.getAll()).toEqual(DEFAULT_CONFIG);
    });

    afterEach(() => {
      jest.resetModules();
      jest.dontMock("../Config");
      Config.destroy();
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
      it("updates single value successfully", () => {
        config.set("outputFile", "new-output");
        expect(config.get("outputFile")).toBe("new-output");
      });

      it("maintains other values when setting one value", () => {
        const originalConfig = config.getAll();
        config.set("outputFile", "new-output");
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
          outputFile: "custom-output",
          logLevel: "DEBUG" as const,
          maxFileSize: 2048576,
        };

        config.override(overrides);

        expect(config.get("outputFile")).toBe(overrides.outputFile);
        expect(config.get("logLevel")).toBe(overrides.logLevel);
        expect(config.get("maxFileSize")).toBe(overrides.maxFileSize);
      });

      it("maintains unaffected values after override", () => {
        const originalPattern = config.get("pattern");
        config.override({ outputFile: "custom-output" });
        expect(config.get("pattern")).toBe(originalPattern);
      });

      it("throws error for invalid override values", () => {
        expect(() => {
          config.override({ maxFileSize: -1 });
        }).toThrow();
        expect(logger.error).toHaveBeenCalled();
      });
    });

    describe("reset", () => {
      it("restores all values to defaults", () => {
        config.override({
          outputFile: "custom-output",
          logLevel: "DEBUG" as const,
          maxFileSize: 2048576,
        });
        config.reset();
        expect(config.getAll()).toEqual(DEFAULT_CONFIG);
      });

      it("allows modifications after reset", () => {
        config.reset();
        config.set("outputFile", "new-output");
        expect(config.get("outputFile")).toBe("new-output");
      });
    });
  });
});
