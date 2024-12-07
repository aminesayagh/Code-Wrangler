import { DEFAULT_JOB_CONFIG, IJobConfig } from "../schema";
import { JobConfig } from "./JobConfig";

export interface IJobManager {
  registerJob: (jobConfig: IJobConfig) => void;
  mergeJobs: (newJobs: IJobConfig[]) => void;
  getJobs: () => JobConfig[];
}

export class JobManager implements IJobManager {
  private jobs: Map<string, JobConfig> = new Map();

  public registerJob(jobConfig: IJobConfig): void {
    const mergedConfig = this.mergeWithDefaults(jobConfig);
    this.jobs.set(jobConfig.name, new JobConfig(mergedConfig));
  }

  public mergeJobs(newJobs: IJobConfig[]): void {
    for (const job of newJobs) {
      const existing = this.jobs.get(job.name);
      if (existing) {
        this.jobs.set(
          job.name,
          new JobConfig({ ...existing.getAll(), ...job })
        );
      } else {
        this.jobs.set(job.name, new JobConfig(job));
      }
    }
  }

  public getJobs(): JobConfig[] {
    return Array.from(this.jobs.values());
  }

  private mergeWithDefaults(jobConfig: IJobConfig): IJobConfig {
    return {
      ...DEFAULT_JOB_CONFIG,
      ...jobConfig
    };
  }
}
