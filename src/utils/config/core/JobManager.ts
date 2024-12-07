import { DEFAULT_JOB_CONFIG, IJobConfig } from "../schema";

export class JobManager {
  private jobs: Map<string, IJobConfig> = new Map();

  public registerJob(jobConfig: IJobConfig): void {
    const mergedCOnfig = this.mergeWithDefaults(jobConfig);
    this.jobs.set(jobConfig.name, mergedCOnfig);
  }

  public mergeJobs(newJobs: IJobConfig[]): void {
    for (const job of newJobs) {
      const existing = this.jobs.get(job.name);
      if (existing) {
        this.jobs.set(job.name, { ...existing, ...job });
      } else {
        this.jobs.set(job.name, job);
      }
    }
  }

  public getJobs(): IJobConfig[] {
    return Array.from(this.jobs.values());
  }

  private mergeWithDefaults(jobConfig: IJobConfig): IJobConfig {
    return {
      ...DEFAULT_JOB_CONFIG,
      ...jobConfig
    };
  }
}
