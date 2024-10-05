import { program } from "commander";
import { FileSystem } from "./utils/FileSystem";
import { DocumentTree } from "./services/DocumentTree";
import * as fs from "fs/promises";
import { logger } from "./utils/Logger";
import { config, ConfigInstance, ConfigOptions } from "./utils/Config";
import { TemplateEngine } from "./utils/templates/TemplateEngine";
import { TreeVisualizer } from "./services/TreeVisualizer";

logger.setConfig(config);

export class CodeWrangler {
  private documentTree: DocumentTree;
  private templateEngine: TemplateEngine | null = null;
  private config: ConfigInstance = config;

  private constructor() {
    this.config = config;
    this.documentTree = new DocumentTree(this.config.get("dir") as string);
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
    this.templateEngine = await TemplateEngine.init(this.config);
    this.verboseLogging();

    const rootDir = this.config.get("dir") as string;
    const pattern = this.config.get("pattern") as string;
    const files = await FileSystem.getFiles(rootDir, pattern);
    await this.documentTree.buildTree(files);
    logger.debug(`Found ${files.length} matching files`);

    logger.info("Building document tree...");
    const treeVisualization = await TreeVisualizer.generateTree(files, rootDir);
    logger.info("Generating tree visualization...");
    this.templateEngine!.updateSection("File Structure", treeVisualization);

    logger.info("Generating content...");
    const content = await this.documentTree.root.generateContentMarkdown();
    console.log(content);
    for (const c of content) {
      this.templateEngine!.updateSection("File Contents", c);
    }

    logger.info("Writing output...");
    await this.templateEngine!.generateOutput();

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
