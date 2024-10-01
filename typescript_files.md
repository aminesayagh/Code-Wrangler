

./src/index.ts
```ts
#!/usr/bin/env node
import { CodeWrangler } from "./CodeWrangler";

async function main() {
  try {
    await CodeWrangler.run();
  } catch (error) {
    console.error("Error:", error instanceof Error ? error.message : String(error));
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

main();
```

./src/CodeWrangler.ts
```ts
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
```

./src/utils/Config.ts
```ts
import fs from "fs";
import path from "path";
import { z } from "zod";
import { LOG_VALUES, logger } from "./Logger";

export const OutputFormatSchema = z.enum(["markdown"]);
export type OutputFormat = z.infer<typeof OutputFormatSchema>;

const ConfigSchema = z.object({
  dir: z.string(),
  rootDir: z.string(),
  pattern: z.string().regex(/^.*$/, "Pattern must be a valid regex"),
  outputFile: z.string(),
  logLevel: z.enum(LOG_VALUES as [string, ...string[]]),
  outputFormat: OutputFormatSchema,
  maxFileSize: z.number().positive(),
  excludePatterns: z.array(z.string()),
  ignoreHiddenFiles: z.boolean(),
  additionalIgnoreFiles: z.array(z.string()).optional(),
  codeConfigFile: z
    .string()
    .regex(/\.json$/, "Config file must end with .json"),
});

export type ConfigOptions = z.infer<typeof ConfigSchema>;

const DEFAULT_CONFIG: ConfigOptions = {
  dir: process.cwd(), // current working directory, where the command is run
  rootDir: process.cwd(),
  pattern: ".*",
  outputFile: "output",
  logLevel: "INFO",
  outputFormat: "markdown",
  maxFileSize: 1048576,
  excludePatterns: ["node_modules/**", "**/*.test.ts", "dist/**"],
  codeConfigFile: "codewrangler.json",
  ignoreHiddenFiles: true, // Default value
  additionalIgnoreFiles: [],
};

export class Config {
  private static instance: Config;
  private config: ConfigOptions;

  private constructor() {
    this.config = this.loodConfig();
  }

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }
  private loodConfig(): ConfigOptions {
    const defaultConfig = ConfigSchema.parse(DEFAULT_CONFIG);

    const currentDirConfig = path.join(
      process.cwd(),
      defaultConfig.codeConfigFile
    );
    if (fs.existsSync(currentDirConfig)) {
      const userConfig = JSON.parse(fs.readFileSync(currentDirConfig, "utf-8"));
      return { ...defaultConfig, ...userConfig };
    }

    return defaultConfig;
  }
  public get<T extends ConfigOptions[keyof ConfigOptions]>(
    key: keyof ConfigOptions
  ): ConfigOptions[keyof ConfigOptions] {
    return this.config[key] as T;
  }

  public set(
    key: keyof ConfigOptions,
    value: ConfigOptions[keyof ConfigOptions]
  ): void {
    const updatedConfig = { ...this.config, [key]: value };
    try {
      ConfigSchema.parse(updatedConfig);
      this.config = updatedConfig;
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error(`Invalid configuration value: ${error.errors}`);
      }
      throw error;
    }
  }
  public getALl(): ConfigOptions {
    return this.config;
  }
  override(config: Partial<ConfigOptions>): void {
    const newOverrideConfig = { ...this.config, ...config };
    try {
      ConfigSchema.parse(newOverrideConfig);
      this.config = newOverrideConfig;
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error(`Invalid configuration value: ${error.errors}`);
      }
      throw error;
    }
  }
}

export const config = Config.getInstance();
export type ConfigInstance = Config;
```

./src/utils/FileSystem.ts
```ts
import { promises as fs } from "fs";
import * as path from "path";
import { Config } from "./Config";
import { logger } from "./Logger";
import { minimatch } from "minimatch";

class IgnorePatternHandler {
  private patterns: string[] = [];
  private readonly ignoreHiddenFiles: boolean;
  private readonly excludePatterns: string[];
  private readonly additionalIgnoreFiles: string[];

  constructor(config: Config) {
    this.ignoreHiddenFiles = config.get("ignoreHiddenFiles") as boolean;
    this.excludePatterns = config.get("excludePatterns") as string[];
    this.additionalIgnoreFiles = config.get("additionalIgnoreFiles") as string[];
    this.patterns = [...this.excludePatterns];
    this.loadIgnorePatterns(config.get("rootDir") as string, this.additionalIgnoreFiles);
  }

  public shouldExclude(filePath: string): boolean {
    return this.patterns.some(pattern => minimatch(filePath, pattern, { dot: !this.ignoreHiddenFiles }));
  }

  async loadIgnorePatterns(dir: string, ignoreFile: string[]): Promise<void> {
    for (const file of ignoreFile) {
      const filePath = path.join(dir, file);
      try {
        const fileExists = await fs.access(filePath).then(() => true).catch(() => false);
        if (fileExists && (await fs.stat(filePath)).isFile()) {
          const content = await fs.readFile(filePath, "utf8");
          this.patterns.push(...content.split("\n").map(pattern => pattern.trim()).filter(pattern => pattern && !pattern.startsWith("#")));
        }
      } catch (error) {
        logger.error(`Error reading ignore file ${filePath}: ${error}`);
      }
    }
  }
}

export class FileSystem {
  static async getFiles(dir: string, pattern: string): Promise<string[]> {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    const ignorePatternHandler = new IgnorePatternHandler(Config.getInstance());
    const files = await Promise.all(dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      if (ignorePatternHandler.shouldExclude(res)) {
        return [];
      }
      return dirent.isDirectory() ? FileSystem.getFiles(res, pattern) : res;
    }));
    return Array.prototype.concat(...files).filter((file) => new RegExp(pattern).test(file));
  }
}
```

./src/utils/Logger.ts
```ts
import colors from "colors";
import { Config } from "./Config";

export const LogLevel = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
} as const;

type LogLevel = (typeof LogLevel)[keyof typeof LogLevel];
export type LogLevelString = keyof typeof LogLevel;
export const LOG_VALUES = Object.keys(LogLevel) as LogLevelString[];

export class Logger {
  private static instance: Logger;
  private config: Config | null = null;

  private constructor() {}
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }
  public setConfig(config: Config) {
    this.config = config;
  }
  public setLogLevel(logLevel: LogLevelString) {
    if (this.config) {
      this.config.set("logLevel", logLevel);
    }
  }

  private get logLevel(): LogLevel {
    const configLogLevel = this.config?.get("logLevel") as LogLevelString | undefined;
    return configLogLevel ? LogLevel[configLogLevel] : LogLevel.ERROR;
  }

  public error(message: string, error?: Error, ...other: unknown[]) {
    if (this.logLevel >= LogLevel.ERROR) {
      console.log(colors.red(`[ERROR] ${message}`), ...other);
      if (error instanceof Error && error.stack) {
        console.log(colors.red(error.stack));
      }
    }
  }

  public warn(message: string) {
    if (this.logLevel >= LogLevel.WARN) {
      console.log(colors.yellow(`[WARN] ${message}`));
    }
  }

  public info(message: string) {
    if (this.logLevel >= LogLevel.INFO) {
      console.log(colors.blue(`[INFO] ${message}`));
    }
  }

  public debug(message: string) {
    if (this.logLevel >= LogLevel.DEBUG) {
      console.log(colors.gray(`[DEBUG] ${message}`));
    }
  }

  public success(message: string) {
    console.log(colors.green(message));
  }

  public log(message: string) {
    console.log(message);
  }
}

export const logger = Logger.getInstance();
```

./src/utils/DocumentFactory.ts
```ts
import * as fs from "fs/promises";
import * as path from "path";
import { Document } from "../models/Document";
import { File } from "../models/File";
import { Directory } from "../models/Directory";

export class DocumentFactory {
  static async create(filePath: string): Promise<Document> {
    const stats = await fs.stat(filePath);
    if (stats && typeof stats.isDirectory === 'function' && stats.isDirectory()) {
      return new Directory(path.basename(filePath), filePath);
    }

    return new File(path.basename(filePath), filePath);
  }
}
```

./services/DocumentTree.ts
```ts
import * as path from "path";
import { Directory } from "../models/Directory";
import { DocumentFactory } from "../utils/DocumentFactory";
import { config } from "../utils/Config";
import { logger } from "../utils/Logger";
import { promises as fs } from "fs";

export class DocumentTree {
  private root: Directory;

  constructor(rootDir: string) {
    this.root = new Directory(path.basename(rootDir), rootDir);
  }

  async buildTree(files: string[]): Promise<void> {
    const maxFileSize = config.get("maxFileSize") as number;
    for (const file of files) {
      await this.addResource(file, {
        maxFileSize,
      });
    }
  }

  private async addResource(filePath: string, options: { maxFileSize: number }): Promise<void> {
    const stats = await fs.stat(filePath);
    if (stats.size > options.maxFileSize) {
      logger.info(`Skipping file ${filePath} as it exceeds the maximum file size (${stats.size} > ${options.maxFileSize} bytes)`);
      return;
    }
    const relativePath = path.relative(this.root.path, filePath);
    const pathParts = relativePath.split(path.sep);
    let currentDir = this.root;

    for (let i = 0; i < pathParts.length - 1; i++) {
      const dirName = pathParts[i] as string;
      let existingDir = currentDir.children.find(
        (child) => child.name === dirName && child instanceof Directory
      ) as Directory | undefined;
      if (!existingDir) {
        existingDir = new Directory(
          dirName,
          path.join(currentDir.path, dirName)
        );
        await currentDir.addChild(existingDir);
      }
      currentDir = existingDir;
    }

    const document = await DocumentFactory.create(filePath);
    await currentDir.addChild(document);
  }

  async getContent(): Promise<string> {
    return this.root.getContent();
  }
}
```

./src/models/Document.ts
```ts
export abstract class Document {
  constructor(public name: string, public path: string) {}
  abstract getContent(): Promise<string>;
}
```

./src/models/Directory.ts
```ts
import { Document } from "./Document";

export class Directory extends Document {
  public children: Document[] = [];

  async addChild(child: Document): Promise<void> {
    this.children.push(child);
  }

  async getContent(): Promise<string> {
    const childrenContent = await Promise.all(this.children.map(child => child.getContent()));
    return childrenContent.join('\n\n');
  }
}
```

./src/models/File.ts
```ts
import { promises as fs } from "fs";
import { Document } from "./Document";

export class File extends Document {
  private _content: string | null = null;
  async getContent(): Promise<string> {
    if (!this._content) {
      this._content = await fs.readFile(this.path, "utf-8");
    }
    return this._content;
  }
}
```

