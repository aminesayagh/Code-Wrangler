import { DocumentOrchestratorBuilder } from "../../../orchestration/DocumentOrchestratorBuilder";
import { DocumentTreeBuilder } from "../../../services/builder/DocumentTreeBuilder";
import { logger } from "../../../utils/logger";
import { BaseCommand } from "../base";

export class DocumentCLI extends BaseCommand {
  protected override async beforeExecution(): Promise<void> {
    this.logVerbose();
    await super.beforeExecution();
  }

  protected override async processExecution(): Promise<void> {
    await this.config.jobManager.executeJobs(async job => {
      const builder = new DocumentTreeBuilder(job);
      const root = await builder.build();

      const orchestrator = new DocumentOrchestratorBuilder()
        .setRoot(root)
        .setConfig(this.config)
        .setJobs([job]);

      const orchestrators = await orchestrator.buildAndExecute();

      logger.info(`Generated ${orchestrators.length} documents`);
    });
  }

  protected override logVerbose(): void {
    logger.debug(
      `Searching for file matching pattern: ${this.config.defaultJob.get("pattern")}`
    );
    logger.debug(
      `Excluding patterns: ${(this.config.defaultJob.get("excludePatterns") as string[]).join(", ")}`
    );
    logger.debug(
      `Ignoring hidden files: ${this.config.defaultJob.get("ignoreHiddenFiles")}`
    );
    logger.debug(
      `Max file size: ${this.config.defaultJob.get("maxFileSize")} bytes`
    );
  }

  protected override async afterExecution(): Promise<void> {
    await Promise.resolve(logger.info("Document generation completed"));
  }
}
