import { program } from "commander";

import { Config, ConfigOptions } from "./utils/Config";
import { logger } from "./utils/Logger";

class CodeWrangler {
  private VERSION = "1.0.0";
  private static instance: CodeWrangler | undefined;
  private config: Config;
  private constructor() {
    // init Library
    this.config = Config.load();

    this.cli();
  }
  static async run() {
    if (!CodeWrangler.instance) {
      CodeWrangler.instance = new CodeWrangler();
      return true;
    }
    throw new Error("CodeWrangler already initialized");
  }
  private async cli() {
    program
      .version(this.VERSION)
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
      )
      .action(this.execute);

    await program.parseAsync(process.argv);
  }
  private async execute(pattern: string, options: Partial<ConfigOptions>) {
    this.config.override({ ...options, pattern });
    await this.build();
  }
  private verboseLoggingConfig() {
    logger.debug(
      `Searching for file matching pattern: ${this.config.get("pattern")}`
    );
    logger.debug(
      `Excluding patterns: ${(
        this.config.get("excludePatterns") as string[]
      ).join(", ")}`
    );
    logger.debug(
      `Ignoring hidden files: ${this.config.get("ignoreHiddenFiles")}`
    );
    logger.debug(`Max file size: ${this.config.get("maxFileSize")} bytes`);
  }
  private async build() {
    // verbose logging
    this.verboseLoggingConfig();
    
  }
}

export default CodeWrangler;
