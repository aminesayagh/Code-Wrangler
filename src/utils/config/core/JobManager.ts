import { logger } from "../../logger";
import { DEFAULT_JOB_CONFIG, IJobConfig, JobConfigOptions } from "../schema";
import { Config } from "./Config";
import { JobConfig } from "./JobConfig";

export interface IJobManager {
  registerJob: (jobConfig: IJobConfig) => void;
  mergeJobs: (newJobs: IJobConfig[]) => void;
  getJobs: () => JobConfig[];
}

export class JobManager implements IJobManager {
  private jobs: Map<string, JobConfig> = new Map();
  private global: Config;

  /**
   * Initializes a new JobManager instance.
   * @param config - The main configuration.
   */
  public constructor(global: Config) {
    this.global = global;
  }

  /**
   * Registers a new job.
   * @param jobConfig - The job config to register.
   */
  public registerJob(jobConfig: JobConfigOptions): void {
    const mergedConfig = this.mergeWithDefaults(jobConfig);
    this.jobs.set(mergedConfig.name, new JobConfig(mergedConfig, this.global));
  }

  /**
   * Merges new jobs with existing jobs.
   * @param newJobs - The new jobs to merge.
   */
  public mergeJobs(newJobs: JobConfigOptions[]): void {
    for (const job of newJobs) {
      const existing = job?.name ? this.jobs.get(job.name) : undefined;
      if (existing && typeof job.name === "string") {
        this.jobs.set(
          job.name,
          new JobConfig({ ...existing.getAll(), ...job }, this.global)
        );
      } else {
        if (typeof job.name === "string") {
          this.jobs.set(job.name, new JobConfig(job, this.global));
        } else {
          this.jobs.set(
            this.global.generateName(),
            new JobConfig(job, this.global)
          );
        }
      }
    }
  }

  /**
   * Returns all registered jobs.
   * @returns An array of JobConfig instances.
   */
  public getJobs(): JobConfig[] {
    return Array.from(this.jobs.values());
  }

  public async executeJobs<T>(
    callback: (job: JobConfig) => Promise<T>
  ): Promise<(T | undefined)[]> {
    return await Promise.all(
      this.getJobs().map(async job => {
        try {
          return await callback(job);
        } catch (error) {
          this.handleError(error, job);
          return undefined;
        }
      })
    );
  }

  /**
   * Merges the job config with the default job config.
   * @param jobConfig - The job config to merge.
   * @returns The merged job config.
   */
  private mergeWithDefaults(jobConfig: JobConfigOptions): IJobConfig {
    return {
      ...DEFAULT_JOB_CONFIG,
      ...jobConfig
    } as IJobConfig;
  }

  private handleError(error: unknown, job: JobConfig): void {
    logger.error(`Error in job ${job.get("name")}: ${error}`);
  }
}
