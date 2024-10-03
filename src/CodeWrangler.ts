import { program } from "commander";
import { FileSystem } from "./utils/FileSystem";
import { DocumentTree } from "./services/DocumentTree";
import * as fs from "fs/promises";
import { progressBar } from "./utils/ProgressBar";
import { logger } from "./utils/Logger";
import { config, ConfigInstance, ConfigOptions } from "./utils/Config";
import { MarkdownGenerator, OutputFileGenerator } from "./utils/templates/MarkdownGenerator";

logger.setConfig(config);

export class CodeWrangler {
  private documentTree: DocumentTree;
  private outputFileGenerator: OutputFileGenerator | null = null;
  private config: ConfigInstance = config;

  private constructor() {
    this.config = config;
    this.documentTree = new DocumentTree(this.config.get("dir") as string);
  }

  private async initOutputFile(): Promise<void> {
    if (this.config.get("outputFormat") == "markdown") {
      this.outputFileGenerator = await MarkdownGenerator.init();
    } else {
      logger.error("Invalid output file type");
      process.exit(1);
    }
  }

  private verboseLogging(): void {
    if (this.config.get("logLevel") != "DEBUG") {
      return;
    }

    logger.debug(`Searching for files matching pattern: ${this.config.get("pattern")}`);
    logger.debug(`Excluding patterns: ${(this.config.get("excludePatterns") as string[]).join(", ")}`);
    logger.debug(`Ignoring hidden files and directories: ${this.config.get("ignoreHiddenFiles")}`);
    logger.debug(`Maximum file size: ${this.config.get("maxFileSize")} bytes`);
  }

  async execute(): Promise<void> {
    await this.initOutputFile();
    this.verboseLogging();

    const files = await FileSystem.getFiles(this.config.get("dir") as string, this.config.get("pattern") as string);
    logger.debug(`Found ${files.length} matching files`);

    logger.info("Building document tree...");
    await progressBar(files.length, async () => {
      await this.documentTree.buildTree(files);
    });

    logger.info("Generating content...");
    await this.documentTree.getContent();

    logger.info("Writing content to file...");

    const content = this.outputFileGenerator!.generateOutput();
    const outputFile = this.config.get("outputFile") as string + ".md";
    await fs.writeFile(outputFile, content);

    logger.success(`CodeWrangler: Round-up complete! Output wrangled to ${this.config.get("outputFile")}.md`);
  }

  static async run() {
    program
      .version("1.0.0")
      .argument(
        "<pattern>",
        'File pattern to match (e.g., "\\.ts$" for TypeScript files)'
      )
      .option("-d, --dir <dir>", "Directory to search", process.cwd())
      .option("-o, --output <output>", "Output file", "output")
      .option("-c, --config <config>", "Config file")
      .option("-v, --verbose", "Verbose mode")
      .action(
        async (
          pattern: string,
          options: {
            dir: string;
            output: string;
            verbose: boolean;
            config: string;
          }
        ) => {
          try {
            const configInstance = config;

            let configOverrides: Partial<ConfigOptions> = {
              pattern,
              dir: options.dir,
              outputFile: options.output,
            };

            if (options.config) {
              const userConfig = JSON.parse(
                await fs.readFile(options.config, "utf-8")
              );
              configOverrides = { ...configOverrides, ...userConfig };
            }

            if (options.verbose) {
              configOverrides.logLevel = "DEBUG";
            }

            configInstance.override(configOverrides);
            const wrangler = new CodeWrangler();
            await wrangler.execute();
          } catch (error) {
            logger.error(error as string);
            process.exit(1);
          }
        }
      );

    await program.parseAsync(process.argv);
  }
}
