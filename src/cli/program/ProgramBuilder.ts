import { Command } from "commander";

import { Config } from "../../utils/config/Config";

export class ProgramBuilder {
  private program: Command;

  constructor(
    private config: Config,
    private version: string
  ) {
    this.program = new Command();
  }

  build(): Command {
    return this.program
      .version(this.version)
      .description("CodeWrangler is a tool for generating code")
      .argument(
        "<pattern>",
        'File pattern to match (e.g., "\\.ts$" for TypeScript files)'
      )
      .option("-d, --dir <dir>", "Directory to search", this.config.get("dir"))
      .option(
        "-o, --output <output>",
        "Output file",
        this.config.get("outputFile")
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
        this.config.get("outputFormat")
      )
      .option(
        "-s, --max-size <max-size>",
        "Max file size",
        this.config.get("maxFileSize").toString()
      )
      .option(
        "-e, --exclude <exclude>",
        "Exclude patterns",
        this.config.get("excludePatterns")
      )
      .option(
        "-i, --ignore-hidden",
        "Ignore hidden files",
        this.config.get("ignoreHiddenFiles")
      )
      .option(
        "-a, --additional-ignore <additional-ignore>",
        "Additional ignore patterns",
        this.config.get("additionalIgnoreFiles")
      );
  }
}
