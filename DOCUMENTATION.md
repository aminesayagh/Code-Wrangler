## Data Model

```ts
// models/BaseNode.ts
import * as path from "path";

export abstract class BaseNode {
  protected _deep: number = 0;
  protected _size: number = 0;
  protected _path: string;
  constructor(protected _name: string, _path: string) {
    // check if path is absolute or a valid path
    if (!path.isAbsolute(_path) && !path.resolve(_path)) {
      throw new Error("Path must be absolute");
    }
    this._path = path.resolve(_path);
  }

  abstract bundle(deep: number): Promise<void>;
  abstract render(): void;
  abstract get secondaryProps(): Record<string, unknown> | undefined;

  get deep(): number {
    return this._deep;
  }
  get size(): number {
    return this._size;
  }
  get name(): string {
    return this._name;
  }
  get path(): string {
    return this._path;
  }

  public async dispose(): Promise<void> {
    this._deep = 0;
    this._size = 0;
    this._path = "";
    this._name = "";
  }

  get props() {
    return {
      name: this._name,
      path: this._path,
      deep: this._deep,
      size: this._size,
      ...this.secondaryProps,
    };
  }
}
```

```ts
// models/Directory.ts
import { File } from "./File";
import { BaseNode } from "./BaseNode";
import { RenderStrategy } from "./RenderStrategy";

type ContentType = (string | ContentType)[];

export abstract class Directory extends BaseNode {
  public children: (File | Directory)[] = [];
  private _length: number = 0;
  private _deepLength: number = 0;
  private _content: ContentType = [];

  public get length(): number {
    return this._length;
  }
  public get deepLength(): number {
    return this._deepLength;
  }
  public get content(): ContentType {
    return this._content;
  }
  public get secondaryProps(): Record<string, unknown> {
    return {
      length: this._length,
      deepLength: this._deepLength,
    };
  }

  public async addChild(child: File | Directory): Promise<Directory> {
    if (!(child instanceof File || child instanceof Directory)) {
      throw new Error("Invalid child type");
    }
    this.children.push(child);
    return this;
  }

  public async bundle(deep: number = 0): Promise<void> {
    this._deep = deep;
    await Promise.all(this.children.map((child) => child.bundle(deep + 1)));
    this._length = this.children.filter(
      (child) => child instanceof File
    ).length;
    this._deepLength = this.children.reduce(
      (acc, child) =>
        acc + (child instanceof Directory ? child.deepLength + 1 : 1),
      0
    );
    this._size = this.children.reduce((acc, child) => acc + child.size, 0);
  }

  public abstract override render(): void;
}

export class RenderableDirectory extends Directory {
  constructor(
    name: string,
    pathName: string,
    private renderStrategy: RenderStrategy
  ) {
    super(name, pathName);
  }

  render(): string {
    return this.renderStrategy.renderDirectory(this);
  }
}
```

```ts
// models/File.ts
import path from "path";
import { DocumentFactory } from "../utils/DocumentFactory";
import { BaseNode } from "./BaseNode";
import { RenderStrategy } from "./RenderStrategy";

export abstract class File extends BaseNode {
  public readonly _extension: string;
  private _content: string | null = null;
  public get children() {
    return this._content;
  }
  public constructor(name: string, pathName: string) {
    super(name, pathName);
    this._extension = path.extname(name);
  }
  public get secondaryProps(): Record<string, unknown> | undefined {
    return {
      extension: this._extension,
    };
  }
  public async bundle(deep: number = 0): Promise<void> {
    this._deep = deep;
    this._size = await DocumentFactory.size(this._path);
    this._content = await DocumentFactory.fileContent(this._path);
  }
  public abstract override render(): void;
}

export class RenderableFile extends File {
  constructor(
    name: string,
    pathName: string,
    private renderStrategy: RenderStrategy
  ) {
    super(name, pathName);
  }

  render(): void {
    this.renderStrategy.renderFile(this);
  }

  public override async dispose(): Promise<void> {
    await super.dispose();
    await this.renderStrategy.dispose();
  }
}
```

```ts
// models/RenderStrategy.ts
import * as path from "path";

import { File } from "./File";
import { Directory } from "./Directory";
import { TemplateValidator } from "./TemplateValidator";
import { Config } from "../utils/Config";
import { DocumentFactory } from "../utils/DocumentFactory";

interface ContentRenderer {
  renderFile(file: File): string;
  renderDirectory(directory: Directory): string;
}

interface TemplateLoader {
  loadTemplates(): Promise<void>;
  validateTemplates(): void;
}

interface DocumentBundler {
  bundle(rootDirectory: Directory): Promise<string>;
  dispose(): Promise<void>;
}

export interface RenderStrategy
  extends ContentRenderer,
    TemplateLoader,
    DocumentBundler {}

export abstract class BaseRenderStrategy implements RenderStrategy {
  protected templatePage: string = "";
  protected templateFile: string = "";
  protected templateDirectory: string = "";
  protected config: Config;
  protected abstract fileExtension: string;

  protected constructor(config: Config) {
    this.config = config;
  }

  async loadTemplates(): Promise<void> {
    const templateDir = path.join(
      this.config.get("rootDir") as string,
      "templates"
    );
    // check if the templates directory exists
    if (!(await DocumentFactory.exists(templateDir))) {
      throw new Error(`Templates directory not found: ${templateDir}`);
    }
    [this.templatePage, this.templateFile, this.templateDirectory] =
      await Promise.all([
        DocumentFactory.readFile(
          path.join(templateDir, `page.${this.fileExtension}`)
        ),
        DocumentFactory.readFile(
          path.join(templateDir, `file.${this.fileExtension}`)
        ),
        DocumentFactory.readFile(
          path.join(templateDir, `directory.${this.fileExtension}`)
        ),
      ]);
  }

  public validateTemplates(): void {
    TemplateValidator.validate(this.templatePage, {
      required: [
        "{{PROJECT_NAME}}",
        "{{GENERATION_DATE}}",
        "{{DIRECTORY_STRUCTURE}}",
        "{{TOTAL_FILES}}",
        "{{TOTAL_DIRECTORIES}}",
        "{{TOTAL_SIZE}}",
        "{{CONTENT}}",
      ],
      optional: ["{{FILE_CONTENTS}}"],
    });
    TemplateValidator.validate(this.templateFile, {
      required: [
        "{{FILE_NAME}}",
        "{{FILE_EXTENSION}}",
        "{{FILE_SIZE}}",
        "{{FILE_CONTENTS}}",
      ],
    });
    TemplateValidator.validate(this.templateDirectory, {
      required: [
        "{{DIRECTORY_NAME}}",
        "{{DIRECTORY_PATH}}",
        "{{DIRECTORY_SIZE}}",
        "{{CONTENT}}",
      ],
    });
  }

  public renderFile(file: File): string {
    return this.replaceSelectors(this.templateFile, {
      ...file.props,
      CONTENT: file.children || "",
    });
  }

  public renderDirectory(directory: Directory): string {
    const content = directory.children
      .map(
        (child) =>
          child instanceof File
            ? this.renderFile(child)
            : this.renderDirectory(child) // save the rendering result on the object after bundling execution
      )
      .join("");
    return this.replaceSelectors(this.templateDirectory, {
      ...directory.props,
      CONTENT: content,
    });
  }

  protected replaceSelectors(
    template: string,
    values: Record<string, string | number>
  ): string {
    return template.replace(/\{\{(\w+)\}\}/g, (_, key) =>
      values[key] !== undefined ? String(values[key]) : `{{${key}}}`
    );
  }

  public async bundle(rootDirectory: Directory): Promise<string> {
    const directoryContent = this.renderDirectory(rootDirectory);
    return this.replaceSelectors(this.templatePage, {
      PROJECT_NAME:
        this.config.get("projectName") || rootDirectory.name || "Project",
      GENERATION_DATE: new Date().toLocaleDateString(),
      DIRECTORY_STRUCTURE: directoryContent,
      TOTAL_FILES: rootDirectory.length,
      TOTAL_DIRECTORIES: rootDirectory.deepLength,
      TOTAL_SIZE: rootDirectory.size,
      CONTENT: directoryContent,
    });
  }

  public async dispose(): Promise<void> {
    this.templatePage = "";
    this.templateFile = "";
    this.templateDirectory = "";
  }
}
```

```ts
// models/TemplateValidator.ts
export interface TemplateSchema {
  required: string[];
  optional?: string[];
}

export class TemplateValidator {
  static validate(template: string, validator: TemplateSchema): void {
    const missingTokens = validator.required.filter(
      (token) => !template.includes(`{{${token}}}`)
    );
    if (missingTokens.length > 0) {
      throw new Error(`Missing required tokens: ${missingTokens.join(", ")}`);
    }
  }
}
```

## Utils

```ts
// utils/DocumentFactory.ts
import * as fs from "fs/promises";

export class DocumentFactory {
  static async type(filePath: string): Promise<"file" | "directory"> {
    const stats = await fs.stat(filePath);
    if (
      stats &&
      typeof stats.isDirectory === "function" &&
      stats.isDirectory()
    ) {
      return "directory";
    }
    return "file";
  }
  static async size(filePath: string): Promise<number> {
    const stats = await fs.stat(filePath);
    return stats.size;
  }
  static async fileContent(filePath: string): Promise<string> {
    return await fs.readFile(filePath, "utf-8");
  }
  static async exists(filePath: string): Promise<boolean> {
    return await fs
      .access(filePath)
      .then(() => true)
      .catch(() => false);
  }
  static async readFile(filePath: string): Promise<string> {
    return await fs.readFile(filePath, "utf-8");
  }
}
```

```ts
// utils/FileSystem.ts
import { promises as fs } from "fs";
import * as path from "path";
import { Config } from "./Config";
import { logger } from "./Logger";
import { minimatch } from "minimatch";
import { DocumentFactory } from "./DocumentFactory";

class IgnorePatternHandler {
  private patterns: string[] = [];
  private readonly ignoreHiddenFiles: boolean;
  private readonly excludePatterns: string[];
  private readonly additionalIgnoreFiles: string[];

  constructor(config: Config) {
    this.ignoreHiddenFiles = config.get("ignoreHiddenFiles") as boolean;
    this.excludePatterns = config.get("excludePatterns") as string[];
    this.additionalIgnoreFiles = config.get(
      "additionalIgnoreFiles"
    ) as string[];
    this.patterns = [...this.excludePatterns];
    this.loadIgnorePatterns(
      config.get("rootDir") as string,
      this.additionalIgnoreFiles
    );
  }

  public shouldExclude(filePath: string): boolean {
    return this.patterns.some((pattern) =>
      minimatch(filePath, pattern, { dot: !this.ignoreHiddenFiles })
    );
  }

  async loadIgnorePatterns(dir: string, ignoreFile: string[]): Promise<void> {
    for (const file of ignoreFile) {
      const filePath = path.join(dir, file);
      try {
        const fileExists = await DocumentFactory.exists(filePath);
        if (fileExists && (await fs.stat(filePath)).isFile()) {
          const content = await fs.readFile(filePath, "utf8");
          this.patterns.push(
            ...content
              .split("\n")
              .map((pattern) => pattern.trim())
              .filter((pattern) => pattern && !pattern.startsWith("#"))
          );
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
    const ignorePatternHandler = new IgnorePatternHandler(Config.load());
    const files = await Promise.all(
      dirents.map((dirent) => {
        const res = path.resolve(dir, dirent.name);
        if (ignorePatternHandler.shouldExclude(res)) {
          return [];
        }
        return dirent.isDirectory() ? FileSystem.getFiles(res, pattern) : res;
      })
    );
    return Array.prototype
      .concat(...files)
      .filter((file) => new RegExp(pattern).test(file));
  }
}
```

```ts
// utils/Logger.ts
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

class Logger {
  private static instance: Logger;
  private config: Config | null = null;

  private constructor() {}
  public static load(): Logger {
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
    const configLogLevel = this.config?.get("logLevel") as
      | LogLevelString
      | undefined;
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

export const logger = Logger.load();
```

```ts
// utils/Config.ts
import * as fs from "fs";
import path from "path";
import { z } from "zod";
import { LOG_VALUES, logger } from "./Logger";

export const OutputFormatSchema = z.enum(["markdown"]);
export type OutputFormat = z.infer<typeof OutputFormatSchema>;

const ConfigSchema = z
  .object({
    dir: z.string(),
    rootDir: z.string(),
    pattern: z.string().regex(/^.*$/, "Pattern must be a valid regex"),
    outputFile: z.string(),
    logLevel: z.enum(LOG_VALUES as [string, ...string[]]),
    outputFormat: z.array(OutputFormatSchema),
    maxFileSize: z.number().positive(),
    excludePatterns: z.array(z.string()),
    ignoreHiddenFiles: z.boolean(),
    additionalIgnoreFiles: z.array(z.string()).optional(),
    projectName: z.string().optional(),
    codeConfigFile: z
      .string()
      .regex(/\.json$/, "Config file must end with .json"),
  })
  .strict();

export type ConfigOptions = z.infer<typeof ConfigSchema>;
// get a type listing all the keys of the config
export type ConfigKeys = keyof ConfigOptions;

export const DEFAULT_CONFIG: ConfigOptions = {
  dir: process.cwd(), // current working directory, where the command is run
  rootDir: process.cwd(),
  pattern: ".*",
  outputFile: "output",
  logLevel: "INFO",
  outputFormat: ["markdown"],
  maxFileSize: 1048576,
  excludePatterns: ["node_modules/**", "**/*.test.ts", "dist/**"],
  codeConfigFile: "codewrangler.json",
  projectName: undefined,
  ignoreHiddenFiles: true, // Default value
  additionalIgnoreFiles: [],
};

export class Config {
  private static instance: Config | undefined;
  private config: ConfigOptions;

  private constructor() {
    this.config = this.loodConfig();
  }

  public static load(): Config {
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
  public get<T extends ConfigKeys>(key: T): ConfigOptions[T] {
    return this.config[key] as ConfigOptions[T];
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
  public getAll(): ConfigOptions {
    return this.config;
  }
  public reset(): void {
    this.config = DEFAULT_CONFIG;
  }
  public static destroy(): void {
    Config.instance = undefined;
  }
  public override(config: Partial<ConfigOptions>): void {
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
```

## CLI

```ts
// CodeWrangler.ts
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
```

```ts
#!/usr/bin/env node
import CodeWrangler from "./CodeWrangler";

async function main() {
  try {
    await CodeWrangler.run();
  } catch (error) {
    console.error(
      "Error:",
      error instanceof Error ? error.message : String(error)
    );
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

main();
```
