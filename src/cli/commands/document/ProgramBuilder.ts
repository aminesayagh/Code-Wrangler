import { Command } from "commander";

import { Config } from "../../../utils/config";

export class ProgramBuilder {
  private program: Command;

  public constructor(
    private config: Config,
    private version: string
  ) {
    this.program = new Command();
  }

  public build(): Command {
    this.buildVersion().buildDescription().buildArguments().buildOptions();
    return this.program;
  }

  private buildVersion(): ProgramBuilder {
    this.program.version(this.version);
    return this;
  }

  private buildDescription(): ProgramBuilder {
    this.program.description("CodeWrangler is a tool for generating code");
    return this;
  }

  private buildArguments(): ProgramBuilder {
    this.program.argument(
      "<pattern>",
      'File pattern to match (e.g., "\\.ts$" for TypeScript files)'
    );
    return this;
  }

  // eslint-disable-next-line max-lines-per-function
  private buildOptions(): ProgramBuilder {
    this.program
      .option(
        "-d, --dir <dir>",
        "Directory to search",
        this.config.defaultJob.get("rootDir")
      )
      .option(
        "-c, --config <config>",
        "Config file",
        this.config.get("codeConfigFile")
      )
      .option("-v, --verbose", "Verbose mode", this.config.get("logLevel"))
      .option(
        "-f, --format <format>",
        "Output format",
        this.config.defaultJob.get("outputFormat")
      )
      .option(
        "-o, --output <output>",
        "Output file",
        this.config.defaultJob.get("outputFile")
      )
      .option(
        "-e, --exclude <exclude>",
        "Exclude patterns",
        this.config.defaultJob.get("excludePatterns")
      )
      .option(
        "-i, --ignore-hidden",
        "Ignore hidden files",
        this.config.defaultJob.get("ignoreHiddenFiles")
      )
      .option(
        "-a, --additional-ignore <additional-ignore>",
        "Additional ignore patterns",
        this.config.defaultJob.get("additionalIgnoreFiles")
      );
    return this;
  }
}
