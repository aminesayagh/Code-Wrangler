```json:tsconfig.json
{
  "compilerOptions": {
    "target": "ES2017",
    "module": "ESNext",
    "lib": ["ES2017", "ES2018", "ES2019", "ES2020", "ES2021", "ES2022", "ES2023"],
    "moduleResolution": "node",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "resolveJsonModule": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
```

```json:package.json
{
  "name": "codewrangler",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node dist/index.js",
    "build": "node build.js",
    "dev": "esbuild src/index.ts --bundle --platform=node --outfile=dist/index.js --sourcemap --watch",
    "lint": "eslint . --ext .ts",
    "test": "jest"
  },
  "bin": {
    "codewrangler": "dist/index.js",
    "cw": "dist/index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cli-progress": "^3.12.0",
    "colors": "^1.4.0",
    "commander": "^12.1.0",
    "minimatch": "^10.0.1",
    "remark": "^15.0.1",
    "remark-parse": "^11.0.0",
    "remark-stringify": "^11.0.0",
    "unist-util-visit": "^5.0.0",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@babel/core": "^7.25.2",
    "@babel/preset-env": "^7.25.4",
    "@babel/preset-typescript": "^7.24.7",
    "@eslint/js": "^9.11.1",
    "@types/cli-progress": "^3.11.6",
    "@types/jest": "^29.5.13",
    "@types/minimatch": "^5.1.2",
    "@types/node": "^22.7.4",
    "@typescript-eslint/eslint-plugin": "^8.7.0",
    "@typescript-eslint/parser": "^8.7.0",
    "babel-jest": "^29.7.0",
    "esbuild": "^0.24.0",
    "esbuild-plugin-typescript": "^2.0.0-next.1",
    "eslint": "^9.11.1",
    "globals": "^15.9.0",
    "jest": "^29.7.0",
    "ts-jest": "^29.2.5",
    "ts-node": "^10.9.2",
    "typescript": "^5.6.2",
    "typescript-eslint": "^8.7.0"
  }
}```

```js:jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(unified|remark-parse|remark-stringify|unist-util-visit|unist)/)',
  ],
};
```

```js:babel.config.js
module.exports = {
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript',
    ],
};
```

```ts:src/index.ts
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

```ts:src/CodeWrangler.ts
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
```

```ts:src/utils/Config.ts
import * as fs from 'fs';
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
  outputFormat: z.array(OutputFormatSchema),
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
  outputFormat: ["markdown"],
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
  public getAll(): ConfigOptions {
    return this.config;
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

export const config = Config.getInstance();
export type ConfigInstance = Config;
```

```ts:src/utils/DocumentFactory.ts
import * as fs from "fs/promises";
import * as path from "path";
import { File } from "../models/File";
import { Directory } from "../models/Directory";

export class DocumentFactory {
  static async create(filePath: string): Promise<File | Directory> {
    const stats = await fs.stat(filePath);
    const name = path.basename(filePath);
    if (stats && typeof stats.isDirectory === 'function' && stats.isDirectory()) {
      return new Directory(name, filePath);
    }

    return new File(name, filePath, stats.size);
  }
}
```

```ts:src/utils/FileSystem.ts
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

```ts:src/utils/Logger.ts
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

```ts:src/utils/ProgressBar.ts
import cliProgress from "cli-progress";

export class ProgressBar {
  private bar: cliProgress.SingleBar;
  private intervalId: NodeJS.Timeout | null = null;
  private currentValue: number = 0;

  constructor(private total: number = 100) {
    this.bar = new cliProgress.SingleBar(
      {},
      cliProgress.Presets.shades_classic
    );
  }

  private simulateProgress() {
    const remainingProgress = this.total - this.currentValue;
    const increment = Math.random() * remainingProgress * 0.1;
    this.currentValue = Math.min(this.currentValue + increment, this.total * 0.95);
    this.bar.update(this.currentValue);
  }

  start() {
    this.bar.start(this.total, 0);
    this.intervalId = setInterval(() => this.simulateProgress(), 200);
  }

  update(value: number): void {
    this.currentValue = value;
    this.bar.update(value);
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.bar.update(this.total);
    this.bar.stop();
  }

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    this.start();
    try {
      return await fn();
    } finally {
      this.stop();
    }
  }
}

export async function progressBar(total: number, callback: () => Promise<void>): Promise<void> {
  const bar = new ProgressBar(total);
  await bar.execute(async () => {
    await callback();
  });
}
```

```ts:src/utils/templates/TemplateEngine.ts
import { Config } from "../Config";
import { logger } from "../Logger";
import { MarkdownGenerator } from "./MarkdownGenerator";
import fs from "fs/promises";

export abstract class OutputFileGenerator {
  public abstract readonly name: string;
  public abstract readonly extension: string;
  protected constructor() {}
  abstract updateSection(sectionName: string, content: string): Promise<void>;
  abstract generateOutput(): string;
}

export class TemplateEngine {
  private templates: OutputFileGenerator[] = [];
  private config: Config;
  private constructor(config: Config) {
    this.config = config;
  }

  public static async init(config: Config): Promise<TemplateEngine> {
    const templateEngine = new TemplateEngine(config);
    await templateEngine.loadTemplates();
    return templateEngine;
  }
  private async loadTemplates(): Promise<void> {
    const outputFormats = this.config.get("outputFormat");
    if (Array.isArray(outputFormats)) {
      const templatePromises = outputFormats.map((format) => {
        switch (format) {
          case "markdown":
            return MarkdownGenerator.init();
          default:
            logger.warn(`Unsupported output format: ${format}`);
            return null;
        }
      });

      const loadedTemplates = await Promise.all(templatePromises)
      this.templates = loadedTemplates.filter((template) => template !== null) as OutputFileGenerator[];
    }
  }

  public async updateSection(sectionName: string, content: string): Promise<void> {
    await Promise.all(
      this.templates.map((template) => template.updateSection(sectionName, content))
    );
  }

  public async generateOutput(): Promise<boolean> {
    const templates = this.templates.map((template) => ({
      content: template.generateOutput(),
      name: template.name,
      extension: template.extension,
    }));
    await Promise.all(
      templates.map((template) => {
        const outputFile =
          (this.config.get("outputFile") as string) + "." + template.extension;
        return fs.writeFile(outputFile, template.content);
      })
    );
    return true;
  }
}
```

```ts:src/utils/templates/MarkdownGenerator.ts
import fs from "fs/promises";
import path from "path";
import { logger } from "../Logger";
import { MarkdownParser } from "./MarkdownParser";

export class MarkdownGenerator {
  public readonly name = "markdown";
  public readonly extension = "md";
  private templatePath: string;
  private parser: MarkdownParser | null = null;

  protected constructor() {
    this.templatePath = this.getTemplatePath();
  }

  public static async init(): Promise<MarkdownGenerator> {
    const markdownGenerator = new MarkdownGenerator();
    await markdownGenerator.loadTemplate();
    return markdownGenerator;
  }

  protected getTemplatePath(): string {
    return path.join(
      __dirname,
      "..",
      "src",
      "templates",
      "default-template.md"
    );
  }

  protected async loadTemplate(): Promise<void> {
    try {
      const template = await fs.readFile(this.templatePath, "utf8");
      this.parser = await MarkdownParser.init(template);
    } catch (error) {
      logger.error(`Error loading template: ${error}`);
      throw error;
    }
  }

  public async updateSection(sectionName: string, content: string): Promise<void> {
    if (!this.parser) {
      throw new Error("Template not loaded");
    }
    await this.parser.updateSection(sectionName, content);
  }

  public generateOutput(): string {
    if (!this.parser) {
      throw new Error("Template not loaded");
    }
    return this.parser.toString();
  }
}
```

```ts:src/utils/templates/MarkdownParser.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Node } from "unist";
import type { Processor } from "unified";

const NodeType = {
  heading: "heading",
  paragraph: "paragraph",
  list: "list",
  code: "code",
  quote: "quote",
  link: "link",
  image: "image",
  table: "table",
  other: "other",
  section: "section",
} as const;

type NodeType = (typeof NodeType)[keyof typeof NodeType];

interface MarkdownSection {
  type: NodeType;
  depth?: number;
  children?: MarkdownSection[];
  value?: string;
}

export class MarkdownParser {
  private ast: Node;
  private unified: Processor;
  private remarkParse: any;
  private remarkStringify: any;
  private visit: any;
  private constructor() {
    this.ast = { type: "root" } as any;
    this.unified = {} as Processor;
    this.remarkParse = null;
    this.remarkStringify = null;
    this.visit = null;
  }
  static async init(markdown: string): Promise<MarkdownParser> {
    const parser = new MarkdownParser();
    await parser.loadParser(markdown);
    return parser;
  }
  private async loadParser(markdown: string): Promise<void> {
    const [unified, remarkParse, remarkStringify, { visit }] =
      await Promise.all([
        import("unified").then((module) => module.unified),
        import("remark-parse"),
        import("remark-stringify"),
        import("unist-util-visit"),
      ]);
    this.unified = unified;
    this.remarkParse = remarkParse.default;
    this.remarkStringify = remarkStringify.default;
    this.visit = visit;

    this.ast = this.unified()
      .use(this.remarkParse)
      .use(this.remarkStringify)
      .parse(markdown);
  }

  private static parseHeading(node: Node): MarkdownSection {
    const headingNode = node as any;
    const newSection: MarkdownSection = {
      type: "section",
      depth: headingNode.depth,
      children: [],
    };

    if (headingNode.children && headingNode.children[0]) {
      newSection.value = headingNode.children[0].value;
    }

    return newSection;
  }
  private static parseParagraph(node: Node): MarkdownSection {
    const paragraphNode = node as any;
    return {
      type: NodeType.paragraph,
      value:
        paragraphNode.children
          ?.map((child: MarkdownSection) => child.value)
          .join("") || "",
    };
  }

  public async toJSON(): Promise<MarkdownSection[]> {
    const json: MarkdownSection[] = [];
    let currentSection: MarkdownSection | null = null;

    this.visit(this.ast, (node: Node) => {
      if (node.type === "heading") {
        const newSection = MarkdownParser.parseHeading(node);
        if (
          !currentSection ||
          newSection.depth! <= (currentSection.depth || 0)
        ) {
          json.push(newSection);
          currentSection = newSection;
        } else {
          currentSection?.children?.push(newSection);
        }
      } else if (node.type === "paragraph") {
        const newSection = MarkdownParser.parseParagraph(node);
        if (!currentSection) {
          json.push(newSection);
          currentSection = newSection;
        } else {
          currentSection.children?.push(newSection);
        }
      }
    });
    return json;
  }

  public static async fromJSON(json: MarkdownSection[]): Promise<string> {
    const [unified, remarkStringify] = await Promise.all([
      import("unified").then((module) => module.unified),
      import("remark-stringify"),
    ]);
    if (!unified || !remarkStringify) {
      throw new Error("MarkdownParser is not initialized");
    }
    const ast = {
      type: "root",
      children: MarkdownParser.jsonToAst(json),
    } as any;
    return unified().use(remarkStringify.default).stringify(ast) as string;
  }
  private static jsonToAst(json: MarkdownSection[]): any[] {
    return json.flatMap((section) => {
      const result: any[] = [
        {
          type: "heading",
          depth: section.depth || 1,
          children: [{ type: "text", value: section.value || "" }],
        },
      ];

      if (section.children) {
        result.push(
          ...section.children
            .map((child) => {
              if (child.type === "section") {
                return MarkdownParser.jsonToAst([child]);
              } else {
                return {
                  type: "paragraph",
                  children: [{ type: "text", value: child.value || "" }],
                };
              }
            })
            .flat()
        );
      }

      return result;
    });
  }

  public async updateSection(
    sectionName: string,
    newContent: string
  ): Promise<void> {
    const json = await this.toJSON();
    const updatedJson = this.updateSectionInJson(json, sectionName, newContent);
    if (!updatedJson || updatedJson.length === 0) {
      throw new Error("Section not found");
    }
    // print the updatedJson on a json file
    if (!this.remarkParse) {
      throw new Error("MarkdownParser or Unified is not initialized");
    }

    if (typeof this.unified !== "function") {
      throw new Error("Unified is not initialized");
    }

    this.ast = this.unified()
      .use(this.remarkParse)
      .parse(await MarkdownParser.fromJSON(updatedJson));
  }
  private updateSectionInJson(
    json: MarkdownSection[],
    sectionName: string,
    newContent: string
  ): MarkdownSection[] {
    return json.map((section) => {
      if (section.value === sectionName) {
        return {
          ...section,
          children: [
            ...section.children || [],
            { type: "paragraph", value: newContent },
          ],
        };
      } else if (section.children) {
        return {
          ...section,
          children: this.updateSectionInJson(
            section.children,
            sectionName,
            newContent
          ),
        };
      }
      return section;
    });
  }
  public toString(): string {
    if (!this.unified || !this.remarkStringify) {
      throw new Error("MarkdownParser or Unified is not initialized");
    }
    return this.unified()
      .use(this.remarkStringify)
      .stringify(this.ast as any) as string;
  }
}
```

```ts:src/services/TreeVisualizer.ts
import { Directory } from "../models/Directory";
import { File } from "../models/File";
import { Document } from "../models/Document";
import path from "path";
import * as fs from "fs/promises";

export class TreeVisualizer {
  static async generateTree(files: string[], rootDir: string): Promise<string> {
    const root = new Directory(path.basename(rootDir), rootDir);
    await this.buildTree(root, files, rootDir);
    return this.generateTreeString(root, "", true);
  }

  private static async buildTree(
    root: Directory,
    files: string[],
    rootDir: string
  ): Promise<void> {
    for (const file of files) {
      const relativePath = path.relative(rootDir, file);
      const parts = relativePath.split(path.sep);
      let currentDir = root;

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i] as string;
        if (i === parts.length - 1) {
          // It's a file
          const stats = await fs.stat(file);
          const newFile = new File(part, file, stats.size);
          await currentDir.addChild(newFile);
        } else {
          // It's a directory
          let child = currentDir.children.find(
            (c) => c.name === part
          ) as Directory;
          if (!child) {
            child = new Directory(part, path.join(currentDir.path, part));
            await currentDir.addChild(child);
          }
          currentDir = child;
        }
      }
    }
  }

  private static generateTreeString(node: Document, prefix: string, isLast: boolean): string {
    const nodePrefix = isLast ? "└── " : "├── ";
    let result = prefix + nodePrefix + node.name + "\n";

    if (node instanceof Directory && node.children.length > 0) {
      const childPrefix = prefix + (isLast ? "    " : "│   ");
      const sortedChildren = node.children.sort((a, b) => {
        if (a instanceof Directory && b instanceof File) return -1;
        if (a instanceof File && b instanceof Directory) return 1;
        return a.name.localeCompare(b.name);
      });

      sortedChildren.forEach((child, index) => {
        const isLastChild = index === sortedChildren.length - 1;
        result += this.generateTreeString(child, childPrefix, isLastChild);
      });
    }

    return result;
  }
}
```

```ts:src/services/DocumentTree.ts
import * as path from "path";
import { Directory } from "../models/Directory";
import { DocumentFactory } from "../utils/DocumentFactory";
import { config } from "../utils/Config";
import { logger } from "../utils/Logger";
import { promises as fs } from "fs";

export class DocumentTree {
  public readonly root: Directory;

  constructor(rootDir: string) {
    this.root = new Directory(path.basename(rootDir), rootDir);
  }

  async buildTree(files: string[]): Promise<void> {
    for (const file of files) {
      await this.addResource(file, {
        maxFileSize: config.get("maxFileSize") as number
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

```ts:src/models/File.ts
import { promises as fs } from "fs";
import { Document } from "./Document";
import path from "path";

export class File extends Document {
  private content: string | null = null;
  public readonly extension: string;
  public size: number;

  constructor(name: string, filePath: string, size: number) {
    super(name, filePath);
    this.extension = path.extname(name);
    this.size = size;
  }

  public async getContent(): Promise<string> {
    if (!this.content) {
      this.content = await fs.readFile(this.path, "utf-8");
    }
    return `
    Name: ${this.name}
    Extension: ${this.extension}
    Size: ${this.formatSize()}
    Content:
    \`\`\`${this.extension} 
    ${this.content}
    \`\`\``;
  }
  public getInfo(): string {
    return `${this.name} (${this.extension}, ${this.formatSize()})`;
  }
  private formatSize(): string {
    const units = ["B", "KB", "MB", "GB", "TB"];
    let size = this.size;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(2)} ${units[unitIndex]}`;
  }
  public async toMarkdown(): Promise<string> {
    let content = `\`\`\`${this.extension}\n`;
    content += `# ${this.name}\n`;
    content += `\n`;
    content += await this.getContent();
    content += `\n\`\`\`\n\n`;
    return content;
  }
  public async toHTML(): Promise<string> {
    let content = `<pre><code class="language-${this.extension}">`;
    content += await this.getContent();
    content += `</code></pre>`;
    return content;
  }
}
```

```ts:src/models/Directory.ts
import { Document } from "./Document";
import { File } from "./File";

export class Directory extends Document {
  public children: (File | Directory)[] = [];

  async addChild(child: File | Directory): Promise<void> {
    this.children.push(child);
  }

  async getContent(): Promise<string> {
    const childrenContent = await Promise.all(this.children.map(child => child.getContent()));
    return childrenContent.join('\n\n');
  }

  getInfo(): string {
    return `${this.name} (${this.children.length} items)`;
  }

  getAllFiles(): File[] {
    const documents: File[] = [];
    this.children.forEach(child => {
      if (child instanceof File) {
        documents.push(child);
      } else if (child instanceof Directory) {
        documents.push(...child.getAllFiles());
      }
    });
    return documents;
  }

  async generateContentMarkdown(): Promise<string[]> {
    const files = this.getAllFiles();
    console.log("files :", files);
    const filesContent = await Promise.all(files.map(file => file.getContent()));
    return filesContent;
  }
  
}
```

```ts:src/models/Document.ts
export abstract class Document {
  constructor(public name: string, public path: string) {}
  abstract getContent(): Promise<string>;
  abstract getInfo(): string;
}
```

```ts:src/mockFileSystem.ts
type FileSystem = {
  [key: string]: string | FileSystem;
};

export const mockFileSystem: FileSystem = {
  "root": {
    "file1.ts": `export const test = "test 1";`,
    "file2.js": `export const test = "test 2";`,
    dir: {
      "file3.ts": `export const test = "test 3";`,
      "file4.js": `export const test = "test 4";`,
    },
  },
};

export const MOCK_PATH = "src/__mocks__/root";

export function isDirectory(path: string): boolean {
  const parts = path.split("/").filter(Boolean);
  let current: FileSystem | string = mockFileSystem;
  for (const part of parts) {
    const currentPart = (current as FileSystem)[part] as FileSystem | string;
    if (typeof currentPart === "string") return false;
    current = currentPart;
  }
  return true;
}

export function getContent(path: string): string | null {
  const parts = path.split("/").filter(Boolean);
  let current: FileSystem | string = mockFileSystem;
  for (const part of parts) {
    if ((current as FileSystem)[part] === undefined) {
        console.error("File not found: ", path, "on part: ", part);
        throw new Error(`File not found: ${path}`);
    }
    current = (current as FileSystem)[part] as FileSystem | string;
  }
  return typeof current === "string" ? current : null;
}
```

