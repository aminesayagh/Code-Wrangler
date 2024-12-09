import { logger } from "../../../logger";
import { DEFAULT_JOB_CONFIG } from "../../schema";
import { IJobConfig, JobConfigOptions } from "../../schema/types";
import { Config } from "../Config";
import { JobManager } from "../JobManager";

jest.mock("../../../logger", () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    setConfig: jest.fn()
  }
}));

describe("JobManager", () => {
  let jobManager: JobManager;
  let mockConfig: jest.Mocked<Config>;

  beforeEach(() => {
    mockConfig = {
      get: jest.fn(),
      set: jest.fn(),
      getAll: jest.fn(),
      override: jest.fn(),
      loadSources: jest.fn()
    } as unknown as jest.Mocked<Config>;

    jobManager = new JobManager(mockConfig);
  });

  describe("Job Registration", () => {
    it("should register a new job with default values", () => {
      const jobConfig = {
        name: "test-job"
      } as JobConfigOptions;

      jobManager.registerJob(jobConfig);
      const jobs = jobManager.getJobs();


      expect(jobs).toHaveLength(1);
      expect(jobs[0]?.get("name")).toBe("test-job");
    });

    it("should merge job config with defaults", () => {
      const jobConfig: Partial<IJobConfig> = {
        name: "test-job",
        description: "Custom description"
      };

      jobManager.registerJob(jobConfig as JobConfigOptions);
      const job = jobManager.getJobs()[0];

      expect(job?.getAll()).toEqual({
        ...DEFAULT_JOB_CONFIG,
        ...jobConfig
      });
    });
  });

  describe("Job Merging", () => {
    it("should merge new jobs with existing ones", () => {
      const existingJob = {
        name: "existing-job",
        description: "Original description"
      };

      const newJobConfig = {
        name: "existing-job",
        description: "Updated description"
      } as JobConfigOptions;

      jobManager.registerJob(existingJob);
      jobManager.mergeJobs([newJobConfig]);

      const jobs = jobManager.getJobs();
      expect(jobs).toHaveLength(1);
      expect(jobs[0]?.get("description")).toBe("Updated description");
    });

    it("should add new jobs when merging", () => {
      const newJobs = [
        { name: "job-1", description: "First job" },
        { name: "job-2", description: "Second job" }
      ];

      jobManager.mergeJobs(newJobs as JobConfigOptions[]);
      expect(jobManager.getJobs()).toHaveLength(2);
    });
  });

  describe("Job Execution", () => {
    it("should execute callback for all jobs", async () => {
      const mockCallback = jest.fn();
      jobManager.registerJob({ name: "job-1" });
      jobManager.registerJob({ name: "job-2" });

      await jobManager.executeJobs(mockCallback);
      expect(mockCallback).toHaveBeenCalledTimes(2);
    });

    it("should handle job execution errors", async () => {
      const mockCallback = jest.fn().mockRejectedValue(new Error("Job failed"));
      jobManager.registerJob({ name: "failing-job" });

      await jobManager.executeJobs(mockCallback);
      expect(logger.error).toHaveBeenCalled();
    });

    it("should continue execution after job failure", async () => {
      const mockCallback = jest
        .fn()
        .mockResolvedValueOnce("success")
        .mockRejectedValueOnce(new Error("Job failed"))
        .mockResolvedValueOnce("success");

      jobManager.registerJob({ name: "job-1" });
      jobManager.registerJob({ name: "job-2" });
      jobManager.registerJob({ name: "job-3" });

      const results = await jobManager.executeJobs(mockCallback);
      expect(results).toEqual(["success", undefined, "success"]);
    });
  });
});
