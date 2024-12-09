import { z } from "zod";

import { logger } from "../../../logger";
import { DEFAULT_JOB_CONFIG } from "../../schema";
import { IJobConfig } from "../../schema/types";
import { Config } from "../Config";
import { JobConfig } from "../JobConfig";

jest.mock("../../../logger", () => ({
  logger: {
    error: jest.fn(),
    warn: jest.fn()
  }
}));

describe("JobConfig", () => {
  let jobConfig: JobConfig;
  let mockGlobalConfig: jest.Mocked<Config>;

  beforeEach(() => {
    mockGlobalConfig = {
      get: jest.fn(),
      set: jest.fn(),
      defaultJob: {} as JobConfig
    } as unknown as jest.Mocked<Config>;

    jobConfig = new JobConfig(
      { ...DEFAULT_JOB_CONFIG, name: "test" },
      mockGlobalConfig
    );
    jest.clearAllMocks();
  });

  describe("constructor", () => {
    it("should initialize with default job config", () => {
      expect(jobConfig.getAll()).toEqual({
        ...DEFAULT_JOB_CONFIG,
        name: "test"
      });
    });

    it("should maintain reference to global config", () => {
      expect(jobConfig.global).toBe(mockGlobalConfig);
    });

    it("should validate initial config", () => {
      const invalidConfig = {
        ...DEFAULT_JOB_CONFIG,
        pattern: 123 // Invalid type
      };

      expect(
        () =>
          new JobConfig(
            invalidConfig as unknown as IJobConfig,
            mockGlobalConfig
          )
      ).toThrow();
    });
  });

  describe("get", () => {
    it("should return correct values for all job config keys", () => {
      expect(jobConfig.get("name")).toBe("test");
      expect(jobConfig.get("pattern")).toBe(DEFAULT_JOB_CONFIG.pattern);
      expect(jobConfig.get("outputFormat")).toEqual(
        DEFAULT_JOB_CONFIG.outputFormat
      );
    });

    it("should return undefined for non-existent keys", () => {
      expect(jobConfig.get("nonexistent" as keyof IJobConfig)).toBeUndefined();
    });
  });

  describe("set", () => {
    it("should update valid job config values", () => {
      const newPattern = "**/*.test.ts";
      jobConfig.set("pattern", newPattern);
      expect(jobConfig.get("pattern")).toBe(newPattern);
    });

    it("should validate pattern format", () => {
      expect(() =>
        jobConfig.set("pattern", 123 as unknown as string)
      ).toThrow();
      expect(logger.error).toHaveBeenCalled();
    });

    it("should validate output format", () => {
      expect(() =>
        jobConfig.set("outputFormat", ["invalid"] as unknown as string[])
      ).toThrow();
    });

    it("should handle array properties correctly", () => {
      const newExcludePatterns = ["*.test.ts", "*.spec.ts"];
      jobConfig.set("excludePatterns", newExcludePatterns);
      expect(jobConfig.get("excludePatterns")).toEqual(newExcludePatterns);
    });
  });

  describe("validation", () => {
    it("should validate numeric constraints", () => {
      expect(() => jobConfig.set("maxFileSize", -1)).toThrow();
      expect(() => jobConfig.set("maxDepth", -1)).toThrow();
    });

    it("should use default name if not provided", () => {
      const jobConfig = new JobConfig(
        { ...DEFAULT_JOB_CONFIG },
        mockGlobalConfig
      );
      expect(jobConfig.get("name")).toContain("config-code-wrangler-");
    });

    it("should handle validation errors gracefully", () => {
      const invalidUpdate = { maxFileSize: "invalid" };
      expect(() =>
        jobConfig.set("maxFileSize", invalidUpdate as unknown as number)
      ).toThrow("Configuration validation failed");
      expect(logger.error).toHaveBeenCalled();
    });
  });

  describe("error handling", () => {
    it("should handle ZodError properly", () => {
      const zodError = new z.ZodError([
        {
          code: "invalid_type",
          expected: "string",
          received: "number",
          path: ["pattern"],
          message: "Expected string, received number"
        }
      ]);

      expect(() => jobConfig["handleConfigError"](zodError)).toThrow(
        "Configuration validation failed"
      );
      expect(logger.error).toHaveBeenCalled();
    });

    it("should rethrow non-Zod errors", () => {
      const genericError = new Error("Generic error");
      expect(() => jobConfig["handleConfigError"](genericError)).toThrow(
        genericError
      );
    });
  });
});
