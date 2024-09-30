import { program } from 'commander';
import { FileSystem } from './utils/FileSystem';
import { DocumentTree } from './services/DocumentTree';
import * as fs from 'fs/promises';
import { ProgressBar } from './utils/ProgressBar';
import { logger, LogLevel } from './utils/Logger';
import { ConfigOptions } from './utils/Config';

export class CodeWrangler {
  private documentTree: DocumentTree;

  constructor(private rootDir: string, private pattern: string, private outputFile: string) {
    this.documentTree = new DocumentTree(rootDir);
  }

  async execute(): Promise<void> {
    logger.debug(`Searching for files matching pattern: ${this.pattern} in directory: ${this.rootDir}`);
    const files = await FileSystem.getFiles(this.rootDir, this.pattern);
    logger.debug(`Found ${files.length} matching files`);

    logger.info('Building document tree...');
    const progress = new ProgressBar(files.length);
    await progress.execute(async () => {
      await this.documentTree.buildTree(files);
    });

    logger.info('Generating content...');
    const content = await this.documentTree.getContent();

    logger.info('Writing content to file...');
    await fs.writeFile(`${this.outputFile}.md`, content);
    logger.success(`CodeWrangler: Round-up complete! Output wrangled to ${this.outputFile}.md`);
  }

  static async run() {
    program
      .version('1.0.0')
      .argument('<pattern>', 'File pattern to match (e.g., "\\.ts$" for TypeScript files)')
      .option('-d, --dir <dir>', 'Directory to search', process.cwd())
      .option('-o, --output <output>', 'Output file', 'output')
      .option("-c, --config <config>", "Config file")
      .option('-v, --verbose', 'Verbose mode')
      .action(async (pattern: string, options: { dir: string; output: string; verbose: boolean, config: string }) => {
        try {
          let configOverrides: Partial<ConfigOptions> = {
            dir: options.dir,
            pattern,
            outputFile: options.output,
          };

          if (options.verbose) {
            configOverrides.logLevel = 'DEBUG';
          }

          const wrangler = new CodeWrangler(options.dir, pattern, options.output);
          if (options.verbose) {
            logger.setLogLevel(LogLevel.DEBUG);
          }

          await wrangler.execute();
        } catch (error) {
          console.error('Error:', error instanceof Error ? error.message : String(error));
          process.exit(1);
        }
      });

    await program.parseAsync(process.argv);
  }
}