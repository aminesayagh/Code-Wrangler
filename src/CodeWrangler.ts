import { program } from "commander";
import { FileSystem } from "./utils/FileSystem";
import { DocumentTree } from "./services/DocumentTree";
import * as fs from "fs/promises";
import { ProgressBar } from "./utils/ProgressBar";
import { logger } from "./utils/Logger";
import { config, ConfigInstance, ConfigOptions } from "./utils/Config";

logger.setConfig(config);

export class CodeWrangler {
  private documentTree: DocumentTree;
  private config: ConfigInstance = config;

  private constructor() {
    this.config = config;
    this.documentTree = new DocumentTree(this.config.get("dir") as string);
  }

  async execute(): Promise<void> {
    const pattern = this.config.get("pattern") as string;
    const rootDir = this.config.get("dir") as string;
    const outputFile = this.config.get("outputFile") as string;
    const ignoreHiddenFiles = this.config.get('ignoreHiddenFiles') as boolean;
    const maxFileSize = this.config.get('maxFileSize') as number;

    logger.debug(`Searching for files matching pattern: ${pattern} in directory: ${rootDir}`);
    logger.debug(`Excluding patterns: ${(this.config.get('excludePatterns') as string[]).join(', ')}`);
    logger.debug(`Ignoring hidden files and directories: ${ignoreHiddenFiles}`);
    logger.debug(`Maximum file size: ${maxFileSize} bytes`);

    const files = await FileSystem.getFiles(rootDir, pattern);
    logger.debug(`Found ${files.length} matching files`);

    logger.info("Building document tree...");
    const progress = new ProgressBar(files.length);
    await progress.execute(async () => {
      await this.documentTree.buildTree(files);
    });

    logger.info("Generating content...");
    const content = await this.documentTree.getContent();

    logger.info("Writing content to file...");
    await fs.writeFile(`${outputFile}.md`, content);
    logger.success(`CodeWrangler: Round-up complete! Output wrangled to ${outputFile}.md`);
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
            console.error(
              "Error:",
              error instanceof Error ? error.message : String(error)
            );
            process.exit(1);
          }
        }
      );

    await program.parseAsync(process.argv);
  }
}
