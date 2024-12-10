/* eslint-disable no-console */
import colors from "colors";

import { Config } from "../../config";
import { LOG_LEVEL, LOG_VALUES, LogLevelString, Logger } from "../Logger";

jest.mock("../../config");
jest.spyOn(console, "log").mockImplementation(() => {});

describe("Logger", () => {
  let logger: Logger;
  let mockConfig: jest.Mocked<Config>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockConfig = {
      get: jest.fn(),
      set: jest.fn()
    } as unknown as jest.Mocked<Config>;

    logger = Logger.load();
  });

  describe("Singleton Pattern", () => {
    it("should create only one instance of Logger", () => {
      const instance1 = Logger.load();
      const instance2 = Logger.load();
      expect(instance1).toBe(instance2);
    });
  });

  describe("Configuration", () => {
    it("should set config correctly", () => {
      const result = logger.setConfig(mockConfig);
      expect(result).toBe(logger);
      expect(logger["config"]).toBe(mockConfig);
    });

    it("should set log level when config is present", () => {
      logger.setConfig(mockConfig);
      const result = logger.setLogLevel("DEBUG");

      expect(result).toBe(logger);
      expect(mockConfig.set).toHaveBeenCalledWith("logLevel", "DEBUG");
    });

    it("should not set log level when config is not present", () => {
      const result = logger.setLogLevel("DEBUG");

      expect(result).toBe(logger);
      expect(mockConfig.set).not.toHaveBeenCalled();
    });

    it("should return ERROR level when config returns undefined", () => {
      logger.setConfig(mockConfig);
      mockConfig.get.mockReturnValue(undefined as unknown as LogLevelString);
      expect(logger["logLevel"]).toBe(LOG_LEVEL.ERROR);
    });

    it("should return correct log level from config", () => {
      logger.setConfig(mockConfig);
      mockConfig.get.mockReturnValue("DEBUG");
      expect(logger["logLevel"]).toBe(LOG_LEVEL.DEBUG);
    });
  });

  describe("Logging Methods", () => {
    beforeEach(() => {
      logger.setConfig(mockConfig);
    });
    const TEST_ERROR = "Test error";

    describe("error", () => {
      it("should log error messages when level is ERROR or higher", () => {
        mockConfig.get.mockReturnValue("ERROR");
        logger.error(TEST_ERROR);
        expect(console.log).toHaveBeenCalledWith(
          colors.red(`[ERROR] ${TEST_ERROR}`)
        );
      });

      it("should log error with stack trace when error object is provided", () => {
        mockConfig.get.mockReturnValue("ERROR");
        const error = new Error(TEST_ERROR);
        logger.error("Error occurred", error);

        expect(console.log).toHaveBeenCalledWith(
          colors.red("[ERROR] Error occurred")
        );
        expect(console.log).toHaveBeenCalledWith(colors.red(error.stack ?? ""));
      });

      it("should log additional arguments", () => {
        mockConfig.get.mockReturnValue("ERROR");
        logger.error(TEST_ERROR, undefined, { details: "test" });
        expect(console.log).toHaveBeenCalledWith(
          colors.red(`[ERROR] ${TEST_ERROR}`),
          { details: "test" }
        );
      });
    });

    describe("warn", () => {
      it("should log warn messages when level is WARN or higher", () => {
        mockConfig.get.mockReturnValue("WARN");
        logger.warn("Test warning");
        expect(console.log).toHaveBeenCalledWith(
          colors.yellow("[WARN] Test warning")
        );
      });

      it("should not log warn messages when level is ERROR", () => {
        mockConfig.get.mockReturnValue("ERROR");
        logger.warn("Test warning");
        expect(console.log).not.toHaveBeenCalled();
      });
    });

    describe("info", () => {
      it("should log info messages when level is INFO or higher", () => {
        mockConfig.get.mockReturnValue("INFO");
        logger.info("Test info");
        expect(console.log).toHaveBeenCalledWith(
          colors.blue("[INFO] Test info")
        );
      });

      it("should not log info messages when level is WARN", () => {
        mockConfig.get.mockReturnValue("WARN");
        logger.info("Test info");
        expect(console.log).not.toHaveBeenCalled();
      });
    });

    describe("debug", () => {
      it("should log debug messages when level is DEBUG", () => {
        mockConfig.get.mockReturnValue("DEBUG");
        logger.debug("Test debug");
        expect(console.log).toHaveBeenCalledWith(
          colors.gray("[DEBUG] Test debug")
        );
      });

      it("should not log debug messages when level is INFO", () => {
        mockConfig.get.mockReturnValue("INFO");
        logger.debug("Test debug");
        expect(console.log).not.toHaveBeenCalled();
      });
    });

    describe("success", () => {
      it("should always log success messages in green", () => {
        mockConfig.get.mockReturnValue("ERROR");
        logger.success("Operation successful");
        expect(console.log).toHaveBeenCalledWith(
          colors.green("Operation successful")
        );
      });
    });

    describe("log", () => {
      it("should always log plain messages without color", () => {
        mockConfig.get.mockReturnValue("ERROR");
        logger.log("Plain message");
        expect(console.log).toHaveBeenCalledWith("Plain message");
      });
    });
  });

  describe("Log Values", () => {
    it("should export correct log level values", () => {
      expect(LOG_VALUES).toEqual(["ERROR", "WARN", "INFO", "DEBUG"]);
    });
  });
});
