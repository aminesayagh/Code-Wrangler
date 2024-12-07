# Project Documentation: src

## Overview

This documentation was automatically generated on 2024-12-06T15:26:23.790Z.

## Summary

- Total Files: 0
- Total Directories: 73
- Total Size: 74481

## Content of Files

### Directory: src

- **Path:** /root/git/codewrangler/src
- **Size:** 74481 bytes
- **Files:** 0
- **Total Files (including subdirectories):** 42
- **Depth:** 0

#### Contents:

### Directory: cli

- **Path:** /root/git/codewrangler/src/cli
- **Size:** 16068 bytes
- **Files:** 2
- **Total Files (including subdirectories):** 8
- **Depth:** 1

#### Contents:

#### File: CodeWrangler.ts

- **Path:** /root/git/codewrangler/src/cli/CodeWrangler.ts
- **Extension:** ts
- **Size:** 1174 bytes
- **Depth:** 2
- **Lines:** 37

```ts
import { Command } from "commander";

import { MainCLICommand } from "./program/mainCLI/MainCLICommand";
import { ProgramBuilder } from "./program/mainCLI/ProgramBuilder";
import { Config } from "../utils/config/Config";
import { IMainCLICommandOptions } from "./program/mainCLI/type";

export class CodeWrangler {
  private static instance: CodeWrangler | undefined;
  private readonly VERSION = "1.0.0";
  private program: Command;

  private constructor(private config: Config) {
    this.program = new ProgramBuilder(config, this.VERSION).build();
    this.setupCommands();
  }

  public static async run(): Promise<boolean> {
    if (!CodeWrangler.instance) {
      const config = await Config.load();
      CodeWrangler.instance = new CodeWrangler(config);
      await CodeWrangler.instance.program.parseAsync(process.argv);
      return true;
    }
    throw new Error("CodeWrangler already initialized");
  }

  private setupCommands(): void {
    this.program.action(
      async (pattern: string, options: IMainCLICommandOptions) => {
        const command = new MainCLICommand(this.config);
        await command.execute([pattern], options);
      }
    );
  }
}

```
### Directory: commands

- **Path:** /root/git/codewrangler/src/cli/commands
- **Size:** 9545 bytes
- **Files:** 3
- **Total Files (including subdirectories):** 3
- **Depth:** 2

#### Contents:

#### File: Command.ts

- **Path:** /root/git/codewrangler/src/cli/commands/Command.ts
- **Extension:** ts
- **Size:** 1323 bytes
- **Depth:** 3
- **Lines:** 47

```ts
/* eslint-disable require-await */
import { ICommandOptions } from "./types";
import { Config } from "../../utils/config/Config";
import { logger } from "../../utils/logger/Logger";

export abstract class BaseCommand<T extends ICommandOptions> {
  public constructor(protected config: Config) {}

  public async execute(args: string[], options: T): Promise<void> {
    try {
      // Pre-execution phase
      await this.beforeExecution(args, options);

      // Progress tracking
      await this.processExecution();

      // Post-execution phase
      await this.afterExecution();
    } catch (error) {
      await this.handleError(error);
      throw error;
    }
  }

  // Template methods that can be overridden
  protected async beforeExecution(_: string[], options: T): Promise<void> {
    if (options.verbose) {
      this.logVerbose();
    }
  }

  protected abstract processExecution(): Promise<void>;

  protected async afterExecution(): Promise<void> {
    // Default implementation - override if needed
  }

  protected async handleError(error: unknown): Promise<void> {
    logger.error("Command execution failed:", error as Error);
  }

  protected logVerbose(): void {
    // Default verbose logging - override to add command-specific logs
    logger.debug("Executing command with verbose logging");
  }
}

```
#### File: DemoCommand.ts

- **Path:** /root/git/codewrangler/src/cli/commands/DemoCommand.ts
- **Extension:** ts
- **Size:** 8062 bytes
- **Depth:** 3
- **Lines:** 343

```ts
/* eslint-disable max-lines-per-function */
import { Stats } from "fs";
import * as fs from "fs/promises";
import * as path from "path";

interface IFileInfo {
  name: string;
  path: string;
  content: string;
  ext: string;
  size: number;
  lines: number;
}

interface ITreeNode {
  name: string;
  path: string;
  type: "file" | "directory";
  children: ITreeNode[];
}

interface IDocumentConfig {
  pattern: RegExp;
  rootDir: string;
  outputPath: string;
  excludePatterns: string[];
  maxFileSize: number;
  ignoreHidden: boolean;
  compress: boolean;
}

const DEFAULT_CONFIG: IDocumentConfig = {
  pattern: /.*/,
  rootDir: process.cwd(),
  outputPath: "documentation.md",
  excludePatterns: ["node_modules/**", "**/dist/**", "**/*.test.ts"],
  maxFileSize: 1024 * 1024, // 1MB
  ignoreHidden: true,
  compress: false
};

// Tree visualization functions
const generateTreeSymbols = (depth: number, isLast: boolean[]): string => {
  if (depth === 0) return "";

  return (
    isLast
      .slice(0, -1)
      .map(last => (last ? "    " : "│   "))
      .join("") + (isLast[isLast.length - 1] ? "└── " : "├── ")
  );
};

const createTreeNode = async (
  nodePath: string,
  config: IDocumentConfig,
  relativePath = ""
): Promise<ITreeNode | null> => {
  const stats = await fs.stat(nodePath);
  const name = path.basename(nodePath);

  if (!shouldInclude(nodePath, config)) {
    return null;
  }

  if (stats.isDirectory()) {
    const entries = await fs.readdir(nodePath, { withFileTypes: true });
    const children: ITreeNode[] = [];

    for (const entry of entries) {
      const childNode = await createTreeNode(
        path.join(nodePath, entry.name),
        config,
        path.join(relativePath, name)
      );
      if (childNode) children.push(childNode);
    }

    return {
      name,
      path: relativePath || name,
      type: "directory",
      children
    };
  } else if (isMatchingFile(nodePath, config)) {
    return {
      name,
      path: relativePath || name,
      type: "file",
      children: []
    };
  }

  return null;
};

const renderTreeNode = (
  node: ITreeNode,
  isLast: boolean[] = [],
  result: string[] = []
): string[] => {
  const prefix = generateTreeSymbols(isLast.length, isLast);
  result.push(prefix + node.name);

  if (node.type === "directory") {
    node.children.forEach((child, index) => {
      renderTreeNode(
        child,
        [...isLast, index === node.children.length - 1],
        result
      );
    });
  }

  return result;
};

const isHidden = (filePath: string): boolean => {
  const baseName = path.basename(filePath);
  return baseName.startsWith(".");
};

const shouldInclude = (
  filePath: string,
  { excludePatterns, ignoreHidden }: IDocumentConfig
): boolean => {
  // Check for hidden files if ignoreHidden is enabled
  if (ignoreHidden && isHidden(filePath)) {
    return false;
  }

  // Check against exclude patterns
  const isExcluded = excludePatterns.some(pattern =>
    new RegExp(pattern.replace(/\*/g, ".*")).test(filePath)
  );

  return !isExcluded;
};

// Pure functions for file operations
const isMatchingFile = (filePath: string, config: IDocumentConfig): boolean => {
  if (!config.pattern) {
    throw new Error("Pattern is not defined in the config");
  }

  if (!shouldInclude(filePath, config)) {
    return false;
  }

  return config.pattern.test(filePath);
};

const formatSize = (bytes: number): string => {
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
};

// Core file processing functions

async function* walkDirectory(dir: string): AsyncGenerator<string> {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      yield* walkDirectory(fullPath);
    } else {
      yield fullPath;
    }
  }
}

const formatContentWithLineNumbers = (content: string): string => {
  const lines = content.split("\n");
  const lineNumberWidth = lines.length.toString().length;

  return lines
    .map((line, index) => {
      const lineNumber = (index + 1).toString().padStart(lineNumberWidth, " ");
      return `${lineNumber} | ${line}`;
    })
    .join("\n");
};

// Markdown generation functions
const generateFileSection = (
  file: IFileInfo,
  compress: boolean = false
): string =>
  !compress
    ? `
## File: ${file.name}
- Path: \`${file.path}\`
- Size: ${formatSize(Number(file.size))}
- Extension: ${file.ext}
- Lines of code: ${file.lines}
- Content:

\`\`\`${file.ext.slice(1) || "plaintext"}
${formatContentWithLineNumbers(file.content)}
\`\`\`

---------------------------------------------------------------------------
`
    : `
## File: ${file.name}, Path: \`${file.path}\`
\`\`\`${file.ext.slice(1) || "plaintext"}
${formatContentWithLineNumbers(file.content)}
\`\`\``;

const generateMarkdownContent = (
  files: IFileInfo[],
  treeContent: string,
  compress: boolean
): string =>
  !compress
    ? `
# Code Documentation
Generated on: ${new Date().toISOString()}
Total files: ${files.length}

## Project Structure

\`\`\`
${treeContent}
\`\`\`

${files.map(file => generateFileSection(file, compress)).join("\n")}
`
    : `
# Code documentation
\`\`\`
${treeContent}
\`\`\`
${files.map(file => generateFileSection(file, compress)).join("\n")}
`;

const compressContent = (content: string): string =>
  content
    .split("\n")
    .map(line => line.trim())
    .filter(line => line !== "")
    .filter(line => !line.startsWith("//"))
    .join("\n");

async function generateFileInfo(
  filePath: string,
  stats: Stats,
  compress: boolean
): Promise<IFileInfo> {
  const content = await fs.readFile(filePath, "utf-8");
  return {
    name: path.basename(filePath),
    path: filePath,
    content: compress ? compressContent(content) : content,
    ext: path.extname(filePath),
    size: stats.size,
    lines: content.split("\n").filter(line => line.trim() !== "").length
  };
}

// Main function
async function generateDocumentation(
  userConfig: Partial<IDocumentConfig> = {}
): Promise<void> {
  try {
    const config: IDocumentConfig = { ...DEFAULT_CONFIG, ...userConfig };
    const files: IFileInfo[] = [];

    // Generate tree structure
    const rootNode = await createTreeNode(config.rootDir, config);
    const treeContent = rootNode
      ? renderTreeNode(rootNode).join("\n")
      : "No matching files found";

    for await (const filePath of walkDirectory(config.rootDir)) {
      if (!isMatchingFile(filePath, config)) {
        continue;
      }
      const stats = await fs.stat(filePath);
      if (stats.size > config.maxFileSize) {
        continue;
      }
      const fileInfo = await generateFileInfo(filePath, stats, config.compress);
      files.push(fileInfo);
    }

    const markdownContent = generateMarkdownContent(
      files,
      treeContent,
      config.compress
    );
    await fs.writeFile(config.outputPath, markdownContent, "utf-8");
  } catch (error) {
    console.error("Error generating documentation", error);
    throw error;
  }
}

if (require.main === module) {
  generateDocumentation({
    pattern: /\.ts$/,
    outputPath: "demo_compressed.md",
    ignoreHidden: true,
    excludePatterns: [
      "node_modules",
      "dist",
      "coverage",
      "**/__tests__",
      "**/*.test.ts"
    ],
    compress: false
  }).catch(console.error);
  generateDocumentation({
    pattern: /\.test.ts$/,
    outputPath: "demo_test.md",
    ignoreHidden: true,
    excludePatterns: [
      "node_modules",
      "dist",
      "coverage",
      "**/__tests__/__mocks__"
    ],
    compress: false
  }).catch(console.error);
  generateDocumentation({
    pattern: /\.md$/,
    outputPath: "demo_md.md",
    ignoreHidden: true,
    excludePatterns: ["node_modules", "dist", "coverage", "*demo*", "src"],
    compress: false
  }).catch(console.error);
}

```
#### File: types.ts

- **Path:** /root/git/codewrangler/src/cli/commands/types.ts
- **Extension:** ts
- **Size:** 160 bytes
- **Depth:** 3
- **Lines:** 8

```ts
export interface ICommandOptions {
  verbose: boolean;
}

export interface ICommand {
  execute: (args: string[], options: ICommandOptions) => Promise<void>;
}

```
#### File: index.ts

- **Path:** /root/git/codewrangler/src/cli/index.ts
- **Extension:** ts
- **Size:** 416 bytes
- **Depth:** 2
- **Lines:** 19

```ts
#!/usr/bin/env node
import { CodeWrangler } from "./CodeWrangler";
import { logger } from "../utils/logger/Logger";

async function main(): Promise<void> {
  try {
    await CodeWrangler.run();
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
    } else {
      logger.error("An unknown error occurred");
    }
    process.exit(1);
  }
}

main().catch(() => process.exit(1));

```
### Directory: program

- **Path:** /root/git/codewrangler/src/cli/program
- **Size:** 4933 bytes
- **Files:** 0
- **Total Files (including subdirectories):** 3
- **Depth:** 2

#### Contents:

### Directory: mainCLI

- **Path:** /root/git/codewrangler/src/cli/program/mainCLI
- **Size:** 4933 bytes
- **Files:** 3
- **Total Files (including subdirectories):** 3
- **Depth:** 3

#### Contents:

#### File: MainCLICommand.ts

- **Path:** /root/git/codewrangler/src/cli/program/mainCLI/MainCLICommand.ts
- **Extension:** ts
- **Size:** 2743 bytes
- **Depth:** 4
- **Lines:** 79

```ts
import { IMainCLICommandOptions } from "./type";
import { DocumentOrchestratorBuilder } from "../../../orchestration/DocumentOrchestratorBuilder";
import { DocumentTreeBuilder } from "../../../services/builder/DocumentTreeBuilder";
import { renderStrategyFactory } from "../../../services/renderer/RenderStrategyFactory";
import { OutputFormat } from "../../../utils/config/schema";
import { logger } from "../../../utils/logger/Logger";
import { BaseCommand } from "../../commands/Command";

export class MainCLICommand<
  T extends IMainCLICommandOptions
> extends BaseCommand<T> {
  protected override async beforeExecution(
    args: string[],
    options: T
  ): Promise<void> {
    this.config.set("pattern", args[0]);
    if (!this.updateOptions(options)) {
      throw new Error("Invalid configuration value");
    }
    this.logVerbose();
    await super.beforeExecution(args, options);
  }

  protected override async processExecution(): Promise<void> {
    const builder = new DocumentTreeBuilder(this.config);
    const root = await builder.build();

    const orchestrator = new DocumentOrchestratorBuilder()
      .setRoot(root)
      .setConfig(this.config);

    const outputFormat = this.config.get("outputFormat");
    const strategies = await renderStrategyFactory.createStrategies(
      this.config,
      outputFormat
    );

    orchestrator.setStrategies(strategies);

    const orchestrators = await orchestrator.buildAndExecute();

    logger.info(`Generated ${orchestrators.length} documents`);
  }

  protected override logVerbose(): void {
    super.logVerbose();
    logger.debug(
      `Searching for file matching pattern: ${this.config.get("pattern")}`
    );
    logger.debug(
      `Excluding patterns: ${(this.config.get("excludePatterns") as string[]).join(", ")}`
    );
    logger.debug(
      `Ignoring hidden files: ${this.config.get("ignoreHiddenFiles")}`
    );
    logger.debug(`Max file size: ${this.config.get("maxFileSize")} bytes`);
  }

  private updateOptions(options: IMainCLICommandOptions): boolean {
    try {
      this.config.set("dir", options["dir"]);
      this.config.set("codeConfigFile", options["config"]);
      this.config.set("logLevel", options["verbose"] ? "DEBUG" : "INFO");
      this.config.set("verbose", options["verbose"]);
      this.config.set(
        "outputFormat",
        options["format"] as unknown as OutputFormat[]
      );
      this.config.set("outputFile", options["output"]);
      this.config.set("ignoreHiddenFiles", options["ignoreHidden"]);
      this.config.set("additionalIgnoreFiles", options["additionalIgnore"]);
    } catch (error) {
      logger.error(`Invalid configuration value: ${error}`);
      return false;
    }
    return true;
  }
}

```
#### File: ProgramBuilder.ts

- **Path:** /root/git/codewrangler/src/cli/program/mainCLI/ProgramBuilder.ts
- **Extension:** ts
- **Size:** 1924 bytes
- **Depth:** 4
- **Lines:** 76

```ts
import { Command } from "commander";

import { Config } from "../../../utils/config/Config";

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
      .option("-d, --dir <dir>", "Directory to search", this.config.get("dir"))
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
        "-o, --output <output>",
        "Output file",
        this.config.get("outputFile")
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
    return this;
  }
}

```
#### File: type.ts

- **Path:** /root/git/codewrangler/src/cli/program/mainCLI/type.ts
- **Extension:** ts
- **Size:** 266 bytes
- **Depth:** 4
- **Lines:** 12

```ts
import { ICommandOptions } from "../../commands/types";

export interface IMainCLICommandOptions extends ICommandOptions {
  dir: string;
  config: string;
  format: string;
  output: string;
  exclude: string;
  ignoreHidden: boolean;
  additionalIgnore: string;
}

```
### Directory: core

- **Path:** /root/git/codewrangler/src/core
- **Size:** 8762 bytes
- **Files:** 0
- **Total Files (including subdirectories):** 7
- **Depth:** 1

#### Contents:

### Directory: entities

- **Path:** /root/git/codewrangler/src/core/entities
- **Size:** 7918 bytes
- **Files:** 3
- **Total Files (including subdirectories):** 3
- **Depth:** 2

#### Contents:

#### File: NodeBase.ts

- **Path:** /root/git/codewrangler/src/core/entities/NodeBase.ts
- **Extension:** ts
- **Size:** 2775 bytes
- **Depth:** 3
- **Lines:** 125

```ts
import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
import { IRenderStrategy } from "../../services/renderer/RenderStrategy";
import { IFileStats, IPropsNode } from "../../types/type";

const defaultProps: IPropsNode = {
  name: "",
  path: "",
  deep: 0,
  size: 0, // size of the node from the children nodes
  stats: {
    size: 0, // size of the node from the file system
    created: new Date(),
    modified: new Date(),
    accessed: new Date(),
    isDirectory: false,
    isFile: false,
    permissions: {
      readable: false,
      writable: false,
      executable: false
    }
  }
};

export interface INodeContent {
  content: string;
}

interface INodeLifeCycle {
  validate: () => boolean;
  bundle: (deep: number) => Promise<void>;
  render: (strategy: IRenderStrategy) => INodeContent;
  dispose: () => void;
  clone: () => NodeBase;
}

export abstract class NodeBase implements INodeLifeCycle {
  protected _props: IPropsNode = { ...defaultProps };

  public constructor(
    _name: string,
    private originalPath: string
  ) {
    this.initNode(_name, originalPath);
    this.validate();
  }

  public validate(): boolean {
    if (!documentFactory.exists(this.path)) {
      throw new Error(`Path ${this.originalPath} does not exist`);
    }
    if (!documentFactory.isAbsolute(this.path)) {
      throw new Error(`Path ${this.originalPath} is not absolute`);
    }
    return true;
  }

  // abstract methods
  public abstract bundle(deep: number): Promise<void>;
  public abstract render(strategy: IRenderStrategy): INodeContent;

  // getters and setters
  // deep
  public get deep(): number {
    return this._props.deep;
  }
  public set deep(deep: number) {
    this._props.deep = deep;
  }

  // size
  public get size(): number {
    return this._props.size;
  }
  public set size(size: number) {
    this._props.size = size;
  }

  // name
  public get name(): string {
    return this._props.name;
  }
  public set name(name: string) {
    this._props.name = name;
  }

  // path
  public get path(): string {
    return this._props.path;
  }
  public set path(path: string) {
    this._props.path = path;
  }

  // stats
  public get stats(): IFileStats | undefined {
    return this._props.stats;
  }
  public set stats(stats: IFileStats | undefined) {
    this._props.stats = stats;
  }

  // props
  public get props(): IPropsNode {
    return {
      ...this._props
    };
  }

  public dispose(): void {
    this._props = { ...defaultProps };
  }

  public clone(): NodeBase {
    return Object.assign(Object.create(this), this);
  }

  private initNode(name: string, path: string): void {
    this.deep = 0;
    this.size = 0;
    this.name = name;
    this.path = documentFactory.resolve(path);
  }
}

```
#### File: NodeDirectory.ts

- **Path:** /root/git/codewrangler/src/core/entities/NodeDirectory.ts
- **Extension:** ts
- **Size:** 3142 bytes
- **Depth:** 3
- **Lines:** 108

```ts
import { INodeContent, NodeBase } from "./NodeBase";
import { NodeFile } from "./NodeFile";
import { fileStatsService } from "../../infrastructure/filesystem/FileStats";
import { IRenderStrategy } from "../../services/renderer/RenderStrategy";
import { IPropsDirectoryNode } from "../../types/type";

interface IPropsDirectory {
  length: number;
  deepLength: number;
  numberOfFiles: number;
  numberOfDirectories: number;
}

const defaultPropsDirectory: IPropsDirectory = {
  length: 0,
  deepLength: 0,
  numberOfFiles: 0,
  numberOfDirectories: 0
};

export abstract class NodeDirectory extends NodeBase {
  public readonly type = "directory";
  public children: (NodeFile | NodeDirectory)[] = [];
  private _propsDirectory: IPropsDirectory = { ...defaultPropsDirectory };

  public constructor(name: string, pathName: string) {
    super(name, pathName);
    this.initDirectory();
  }
  // getters and setters
  public get length(): number {
    return this._propsDirectory.length;
  }
  public set length(length: number) {
    this._propsDirectory.length = length;
  }
  public get deepLength(): number {
    return this._propsDirectory.deepLength;
  }
  public set deepLength(deepLength: number) {
    this._propsDirectory.deepLength = deepLength;
  }
  public get numberOfFiles(): number {
    return this._propsDirectory.numberOfFiles;
  }
  public set numberOfFiles(numberOfFiles: number) {
    this._propsDirectory.numberOfFiles = numberOfFiles;
  }
  public override get props(): IPropsDirectoryNode {
    return {
      ...super.props,
      ...this._propsDirectory
    };
  }

  public addChild(child: NodeFile | NodeDirectory): NodeDirectory {
    if (!(child instanceof NodeFile || child instanceof NodeDirectory)) {
      throw new Error("Invalid child type");
    }
    this.children.push(child);
    return this;
  }

  public async bundle(deep: number = 0): Promise<void> {
    // set the deep of the directory
    this.deep = deep;

    // bundle all children
    await Promise.all(this.children.map(child => child.bundle(deep + 1)));

    // set the length of the directory
    this.length = this.children.filter(child => child.type === "file").length;
    this.numberOfFiles =
      this.length +
      this.children
        .filter(child => child.type === "directory")
        .reduce((acc, child) => acc + child.numberOfFiles, 0);

    // set the deep length of the directory
    this.deepLength = this.children.reduce(
      (acc, child) =>
        acc + (child instanceof NodeDirectory ? child.deepLength + 1 : 1),
      0
    );

    // set the size of the directory
    this.size = this.children.reduce((acc, child) => acc + child.size, 0);

    // set stats
    this.stats = await fileStatsService(this.path);
  }

  public abstract override render(strategy: IRenderStrategy): INodeContent;

  private initDirectory(): void {
    this.children = [];
    this._propsDirectory = { ...defaultPropsDirectory };
  }
}

export class RenderableDirectory extends NodeDirectory {
  public override render(strategy: IRenderStrategy): INodeContent {
    return {
      content: strategy.renderDirectory(this)
    };
  }
}

```
#### File: NodeFile.ts

- **Path:** /root/git/codewrangler/src/core/entities/NodeFile.ts
- **Extension:** ts
- **Size:** 2001 bytes
- **Depth:** 3
- **Lines:** 74

```ts
import { INodeContent, NodeBase } from "./NodeBase";
import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
import { fileStatsService } from "../../infrastructure/filesystem/FileStats";
import { IRenderStrategy } from "../../services/renderer/RenderStrategy";
import { IPropsFileNode } from "../../types/type";

export abstract class NodeFile extends NodeBase {
  public readonly type = "file";
  private _extension: string = "";
  private _content: string | null = null;

  public constructor(name: string, pathName: string) {
    super(name, pathName);
    this.initFile(name);
  }

  // getters and setters
  // extension
  public get extension(): string {
    return this._extension;
  }
  protected set extension(extension: string) {
    this._extension = extension;
  }
  // content
  public get content(): string | null {
    return this._content;
  }
  protected set content(content: string | null) {
    this._content = content;
  }
  // secondary props
  public override get props(): IPropsFileNode {
    return {
      ...super.props,
      extension: this.extension
    };
  }

  // bundle
  public async bundle(deep: number = 0): Promise<void> {
    // set the deep of the file
    this.deep = deep;
    // set the size of the file
    this.size = await documentFactory.size(this.path);
    // set the content of the file
    this.content = await documentFactory.readFile(this.path);
    // set the stats of the file
    this.stats = await fileStatsService(this.path);
  }

  // render
  public abstract override render(strategy: IRenderStrategy): INodeContent;

  private initFile(name: string): void {
    this.extension = documentFactory.extension(name);
    this._content = null;
  }
}

export class RenderableFile extends NodeFile {
  // render
  public override render(strategy: IRenderStrategy): INodeContent {
    return {
      content: strategy.renderFile(this)
    };
  }

  // dispose
  public override dispose(): void {
    super.dispose();
  }
}

```
### Directory: __tests__

- **Path:** /root/git/codewrangler/src/core/entities/__tests__
- **Size:** 0 bytes
- **Files:** 0
- **Total Files (including subdirectories):** 0
- **Depth:** 3

#### Contents:

### Directory: errors

- **Path:** /root/git/codewrangler/src/core/errors
- **Size:** 844 bytes
- **Files:** 4
- **Total Files (including subdirectories):** 4
- **Depth:** 2

#### Contents:

#### File: DirectoryNotFoundError.ts

- **Path:** /root/git/codewrangler/src/core/errors/DirectoryNotFoundError.ts
- **Extension:** ts
- **Size:** 235 bytes
- **Depth:** 3
- **Lines:** 9

```ts
import { DocumentError } from "./DocumentError";

export class DirectoryNotFoundError extends DocumentError {
  public constructor(path: string) {
    super("Directory not found", path);
    this.name = "DirectoryNotFoundError";
  }
}

```
#### File: DocumentError.ts

- **Path:** /root/git/codewrangler/src/core/errors/DocumentError.ts
- **Extension:** ts
- **Size:** 216 bytes
- **Depth:** 3
- **Lines:** 10

```ts
export class DocumentError extends Error {
  public constructor(
    message: string,
    public readonly path: string
  ) {
    super(`Document error at ${path}: ${message}`);
    this.name = "DocumentError";
  }
}

```
#### File: FileNotFoundError.ts

- **Path:** /root/git/codewrangler/src/core/errors/FileNotFoundError.ts
- **Extension:** ts
- **Size:** 220 bytes
- **Depth:** 3
- **Lines:** 9

```ts
import { DocumentError } from "./DocumentError";

export class FileNotFoundError extends DocumentError {
  public constructor(path: string) {
    super("File not found", path);
    this.name = "FileNotFoundError";
  }
}

```
### Directory: __tests__

- **Path:** /root/git/codewrangler/src/core/errors/__tests__
- **Size:** 0 bytes
- **Files:** 0
- **Total Files (including subdirectories):** 0
- **Depth:** 3

#### Contents:

#### File: index.ts

- **Path:** /root/git/codewrangler/src/core/errors/index.ts
- **Extension:** ts
- **Size:** 173 bytes
- **Depth:** 3
- **Lines:** 4

```ts
export { DocumentError } from "./DocumentError";
export { DirectoryNotFoundError } from "./DirectoryNotFoundError";
export { FileNotFoundError } from "./FileNotFoundError";

```
### Directory: infrastructure

- **Path:** /root/git/codewrangler/src/infrastructure
- **Size:** 19243 bytes
- **Files:** 0
- **Total Files (including subdirectories):** 5
- **Depth:** 1

#### Contents:

### Directory: filesystem

- **Path:** /root/git/codewrangler/src/infrastructure/filesystem
- **Size:** 13662 bytes
- **Files:** 3
- **Total Files (including subdirectories):** 3
- **Depth:** 2

#### Contents:

#### File: DocumentFactory.ts

- **Path:** /root/git/codewrangler/src/infrastructure/filesystem/DocumentFactory.ts
- **Extension:** ts
- **Size:** 10107 bytes
- **Depth:** 3
- **Lines:** 350

```ts
import { ObjectEncodingOptions } from "fs";
import * as fsSync from "fs";
import * as fs from "fs/promises";
import * as path from "path";

import { fileStatsService } from "./FileStats";
import { DocumentError, FileNotFoundError } from "../../core/errors";
import {
  FILE_TYPE,
  FileType,
  IDirectoryOptions,
  IReadOptions,
  IWriteOptions
} from "../../types/type";

export const documentFactory = {
  /**
   * Gets the type of a file system entry
   * @param filePath - The path to check
   * @returns The type of the file system entry (File or Directory)
   * @throws {FileNotFoundError} If the path doesn't exist
   * @throws {DocumentError} For other file system errors
   */
  async type(filePath: string): Promise<FileType> {
    try {
      const stats = await fs.stat(filePath);
      return stats.isDirectory() ? FILE_TYPE.Directory : FILE_TYPE.File;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        throw new FileNotFoundError(filePath);
      }
      throw new DocumentError(String(error), filePath);
    }
  },

  /**
   * Gets file size in bytes
   * @param filePath - The path to the file
   * @returns The size of the file in bytes
   * @throws {FileNotFoundError} If the file doesn't exist
   * @throws {DocumentError} For other file system errors or if path is a directory
   */
  async size(filePath: string): Promise<number> {
    const isDirectory = (await this.type(filePath)) === FILE_TYPE.Directory;
    if (isDirectory) {
      throw new DocumentError("Path is a directory", filePath);
    }
    const stats = await fileStatsService(filePath);
    return stats.size;
  },

  /**
   * Resolves a path to an absolute path
   * @param filePath - The path to resolve
   * @returns The absolute path
   */
  resolve(filePath: string): string {
    return path.resolve(filePath);
  },

  /**
   * Checks various access flags for a path
   * @private
   * @param filePath - The path to check access for
   * @returns An object containing readable, writable, and executable permission flags
   */
  async checkAccess(filePath: string): Promise<{
    readable: boolean;
    writable: boolean;
    executable: boolean;
  }> {
    const check = async (mode: number): Promise<boolean> => {
      try {
        await fs.access(filePath, mode);
        return true;
      } catch {
        return false;
      }
    };

    return {
      readable: await check(fs.constants.R_OK),
      writable: await check(fs.constants.W_OK),
      executable: await check(fs.constants.X_OK)
    };
  },

  /**
   * Reads the entire contents of a file synchronously
   * @param filePath - The path to the file
   * @param options - The options for the read operation
   * @returns The contents of the file as a string
   * @throws {Error} If the file cannot be read
   */
  readFileSync(filePath: string, options: IReadOptions = {}): string {
    return fsSync.readFileSync(filePath, {
      encoding: options.encoding ?? "utf-8",
      flag: options.flag
    });
  },

  /**
   * Reads the entire contents of a file
   * @param filePath - The path to the file
   * @param options - The options for the read operation
   * @returns The contents of the file as a string
   * @throws {FileNotFoundError} If the file doesn't exist
   * @throws {DocumentError} For other file system errors
   */
  async readFile(
    filePath: string,
    options: IReadOptions = {}
  ): Promise<string> {
    try {
      return await fs.readFile(filePath, {
        encoding: options.encoding ?? "utf-8",
        flag: options.flag
      });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        throw new FileNotFoundError(filePath);
      }
      throw new DocumentError(String(error), filePath);
    }
  },

  /**
   * Writes data to a file, replacing the file if it already exists
   * @param filePath - The path to the file
   * @param data - The data to write
   * @param options - The options for the write operation
   * @throws {DocumentError} For file system errors
   */
  async writeFile(
    filePath: string,
    data: string | Buffer,
    options: IWriteOptions = {}
  ): Promise<void> {
    try {
      // Ensure parent directory exists
      const parentDir = path.dirname(filePath);
      await fs.mkdir(parentDir, { recursive: true });

      // Write the file
      await fs.writeFile(filePath, data, {
        encoding: options.encoding ?? "utf-8",
        mode: options.mode,
        flag: options.flag
      });
    } catch (error) {
      if (error instanceof DocumentError) {
        throw error;
      }
      throw new DocumentError(String(error), filePath);
    }
  },

  /**
   * Appends data to a file
   * @param filePath - The path to the file
   * @param content - The content to append
   * @param options - The options for the write operation
   * @throws {DocumentError} For file system errors
   */
  async appendFile(
    filePath: string,
    content: string,
    options: IWriteOptions = {}
  ): Promise<void> {
    try {
      await fs.appendFile(filePath, content, {
        encoding: options.encoding ?? "utf-8",
        mode: options.mode,
        flag: options.flag
      });
    } catch (error) {
      throw new DocumentError(String(error), filePath);
    }
  },

  /**
   * Reads the contents of a directory
   * @param dirPath - The path to the directory
   * @param options - The options for the read operation
   * @returns An array of file and directory names in the directory
   * @throws {Error} If the directory cannot be read
   */
  async readDir(
    dirPath: string,
    options?: { withFileTypes?: boolean }
  ): Promise<string[]> {
    return await fs.readdir(dirPath, options as ObjectEncodingOptions);
  },

  /**
   * Creates a directory if it doesn't exist
   * @param dirPath - The path where to create the directory
   * @param recursive - Whether to create parent directories if they don't exist
   * @throws {DocumentError} For file system errors
   */
  async createDir(dirPath: string, recursive = true): Promise<void> {
    await fs.mkdir(dirPath, { recursive });
  },

  /**
   * Gets the base name of a file
   * @param filePath - The path to the file
   * @returns The base name of the file (last portion of the path)
   */
  baseName(filePath: string): string {
    return path.basename(filePath);
  },

  /**
   * Gets the extension of a file
   * @param filePath - The path to the file
   * @returns The extension of the file including the dot (e.g., '.txt')
   */
  extension(filePath: string): string {
    return path.extname(filePath);
  },

  /**
   * Checks if a file or directory exists
   * @param filePath - The path to check
   * @returns True if the file or directory exists, false otherwise
   */
  exists(filePath: string): boolean {
    try {
      fsSync.accessSync(filePath);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Checks if a path is absolute
   * @param filePath - The path to check
   * @returns True if the path is absolute, false otherwise
   */
  isAbsolute(filePath: string): boolean {
    return path.isAbsolute(filePath);
  },

  /**
   * Gets directory contents with type information
   * @param dirPath - The path to the directory
   * @returns An array of objects containing name and type information for each entry
   * @throws {DocumentError} If path is not a directory or other errors occur
   */
  async readDirectory(
    dirPath: string
  ): Promise<Array<{ name: string; type: FileType }>> {
    try {
      const entries = await fs.readdir(dirPath, { withFileTypes: true });
      return entries.map(entry => ({
        name: entry.name,
        type: entry.isDirectory() ? FILE_TYPE.Directory : FILE_TYPE.File
      }));
    } catch (error) {
      throw new DocumentError(String(error), dirPath);
    }
  },

  /**
   * Creates a directory if it doesn't exist
   * @param dirPath - The path where to create the directory
   * @param options - Options for directory creation including recursive and mode
   * @throws {DocumentError} For file system errors
   */
  async ensureDirectory(
    dirPath: string,
    options: IDirectoryOptions = {}
  ): Promise<void> {
    try {
      if (!this.exists(dirPath)) {
        await fs.mkdir(dirPath, {
          recursive: options.recursive ?? true,
          mode: options.mode
        });
      }
    } catch (error) {
      throw new DocumentError(String(error), dirPath);
    }
  },

  /**
   * Removes a file or directory
   * @param filePath - The path to remove
   * @throws {DocumentError} For file system errors
   */
  async remove(filePath: string): Promise<void> {
    const stats = await fs.stat(filePath);
    if (stats.isDirectory()) {
      await fs.rm(filePath, { recursive: true, force: true });
    } else {
      await fs.unlink(filePath);
    }
  },

  /**
   * Copies a file or directory
   * @param src - The source path
   * @param dest - The destination path
   * @throws {DocumentError} For file system errors
   */
  async copy(src: string, dest: string): Promise<void> {
    const stats = await fs.stat(src);

    if (stats.isDirectory()) {
      await this.copyDir(src, dest);
    } else {
      await fs.copyFile(src, dest);
    }
  },

  /**
   * Copies a directory recursively
   * @private
   * @param src - The source directory path
   * @param dest - The destination directory path
   * @throws {DocumentError} For file system errors
   */
  async copyDir(src: string, dest: string): Promise<void> {
    await this.ensureDirectory(dest);
    const entries = await fs.readdir(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        await this.copyDir(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }
  },

  /**
   * Joins an array of paths into a single path
   * @param paths - The paths to join
   * @returns The joined path
   */
  join(...paths: string[]): string {
    return path.join(...paths);
  }
};

```
#### File: FileStats.ts

- **Path:** /root/git/codewrangler/src/infrastructure/filesystem/FileStats.ts
- **Extension:** ts
- **Size:** 1987 bytes
- **Depth:** 3
- **Lines:** 72

```ts
import { Stats } from "fs";
import fs from "fs/promises";

import { DocumentError } from "../../core/errors/DocumentError";
import { FileNotFoundError } from "../../core/errors/FileNotFoundError";
import { IAccessFlags, IFileStats } from "../../types/type";

class FileStatsService {
  public async getStats(filePath: string): Promise<IFileStats> {
    const stats = await this.getBasicStats(filePath);
    const accessFlags = await this.checkAccess(filePath);
    return this.mapStatsToFileInfo(stats, accessFlags);
  }
  private async getBasicStats(filePath: string): Promise<Stats> {
    try {
      return await fs.stat(filePath);
    } catch (error) {
      this.handleStatError(error as NodeJS.ErrnoException, filePath);
      throw error; // TypeScript requires this
    }
  }

  private handleStatError(
    error: NodeJS.ErrnoException,
    filePath: string
  ): never {
    if (error.code === "ENOENT") {
      throw new FileNotFoundError(filePath);
    }
    throw new DocumentError(String(error), filePath);
  }

  private async checkAccess(filePath: string): Promise<IAccessFlags> {
    const check = async (mode: number): Promise<boolean> => {
      try {
        await fs.access(filePath, mode);
        return true;
      } catch {
        return false;
      }
    };

    return {
      readable: await check(fs.constants.R_OK),
      writable: await check(fs.constants.W_OK),
      executable: await check(fs.constants.X_OK)
    };
  }

  private mapStatsToFileInfo(
    stats: Stats,
    accessFlags: IAccessFlags
  ): IFileStats {
    return {
      size: stats.size,
      created: stats.birthtime,
      modified: stats.mtime,
      accessed: stats.atime,
      isDirectory: stats.isDirectory(),
      isFile: stats.isFile(),
      permissions: accessFlags
    };
  }
}

export const fileStatsService = async (
  filePath: string
): Promise<IFileStats> => {
  const fileStatsService = new FileStatsService();
  return await fileStatsService.getStats(filePath);
};

```
#### File: JsonReader.ts

- **Path:** /root/git/codewrangler/src/infrastructure/filesystem/JsonReader.ts
- **Extension:** ts
- **Size:** 1568 bytes
- **Depth:** 3
- **Lines:** 52

```ts
import fs from "fs/promises";

import { documentFactory } from "./DocumentFactory";
import { DocumentError } from "../../core/errors/DocumentError";
import { FileNotFoundError } from "../../core/errors/FileNotFoundError";

export class JsonReader {
  public async readJsonSync(filePath: string): Promise<object> {
    try {
      const absolutePath = this.validatePath(filePath);
      const content = await this.readFileContent(absolutePath, filePath);
      return this.parseJsonContent(content, filePath);
    } catch (error) {
      if (error instanceof DocumentError) {
        throw error;
      }
      throw new DocumentError(String(error), filePath);
    }
  }
  private validatePath(filePath: string): string {
    const absolutePath = documentFactory.resolve(filePath);
    if (!documentFactory.exists(absolutePath)) {
      throw new FileNotFoundError(filePath);
    }
    return absolutePath;
  }

  private async readFileContent(
    absolutePath: string,
    filePath: string
  ): Promise<string> {
    const content = await fs.readFile(absolutePath, "utf-8");
    if (!content) {
      throw new DocumentError(`File is empty`, filePath);
    }
    return content;
  }

  private parseJsonContent(content: string, filePath: string): object {
    try {
      return JSON.parse(content);
    } catch (error) {
      throw new DocumentError(`Invalid JSON: ${String(error)}`, filePath);
    }
  }
}

export const jsonReader = async (path: string): Promise<object> => {
  const jsonReader = new JsonReader();
  return await jsonReader.readJsonSync(path);
};

```
### Directory: __tests__

- **Path:** /root/git/codewrangler/src/infrastructure/filesystem/__tests__
- **Size:** 0 bytes
- **Files:** 0
- **Total Files (including subdirectories):** 0
- **Depth:** 3

#### Contents:

### Directory: __mocks__

- **Path:** /root/git/codewrangler/src/infrastructure/filesystem/__tests__/__mocks__
- **Size:** 0 bytes
- **Files:** 0
- **Total Files (including subdirectories):** 0
- **Depth:** 4

#### Contents:

### Directory: templates

- **Path:** /root/git/codewrangler/src/infrastructure/templates
- **Size:** 5581 bytes
- **Files:** 2
- **Total Files (including subdirectories):** 2
- **Depth:** 2

#### Contents:

#### File: TemplateEngine.ts

- **Path:** /root/git/codewrangler/src/infrastructure/templates/TemplateEngine.ts
- **Extension:** ts
- **Size:** 4369 bytes
- **Depth:** 3
- **Lines:** 157

```ts
import { ZodObject, z } from "zod";

import { TemplateType } from "../../types/template";
import { Config } from "../../utils/config";
import { logger } from "../../utils/logger";
import { documentFactory } from "../filesystem/DocumentFactory";

type TemplateValue = z.ZodType<string | number | boolean | undefined>;

export class Template<
  T extends Record<string, TemplateValue> = Record<string, TemplateValue>
> {
  private _content: string = "";
  private schema: ZodObject<T>;

  public constructor(
    private type: TemplateType,
    schema: ZodObject<T>
  ) {
    // convert all fields to optional
    const optionalFields = Object.fromEntries(
      Object.entries(schema.shape).map(([key, value]) => [
        key,
        value.optional()
      ])
    );
    this.schema = schema.extend(optionalFields) as unknown as ZodObject<T>;
  }

  public async load(
    path: string,
    additionalFields?: Record<string, z.ZodSchema<string>>
  ): Promise<void> {
    this._content = await documentFactory.readFile(path);
    if (additionalFields) {
      this.schema = this.schema.extend(additionalFields) as ZodObject<T>;
    }
    this.validate();
  }

  public static getTemplateDir(config: Config): string {
    const dir = documentFactory.join(
      config.get("rootDir") as string,
      config.get("templatesDir") as string
    );
    if (!documentFactory.exists(dir)) {
      throw new Error(`Templates directory not found: ${dir}`);
    }
    return dir;
  }

  public get content(): string {
    if (!this._content) {
      throw new Error(`Template content is not loaded for ${this.type}`);
    }
    return this._content;
  }

  public static async create<T extends Record<string, TemplateValue>>(
    type: TemplateType,
    schema: ZodObject<T>,
    path: string,
    additionalFields?: Record<string, z.ZodSchema<string>>
  ): Promise<Template<T>> {
    const template = new Template(type, schema);
    await template.load(path, additionalFields);
    return template;
  }

  public render(data: Record<string, string | number | boolean>): string {
    try {
      this.validateData(data);
      return this.replaceTokens(data);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Template content validation failed for ${this.type}`);
      }
      throw error;
    }
  }

  public dispose(): void {
    this._content = "";
  }

  private validateData(data: Record<string, string | number | boolean>): void {
    this.schema.parse(data);
    this.validateRequiredTokens(data);
  }

  private validateRequiredTokens(
    data: Record<string, string | number | boolean>
  ): void {
    const contentTokens = this.getTemplateTokens();
    const missingTokens = this.findMissingRequiredTokens(contentTokens, data);

    if (missingTokens.length > 0) {
      throw new Error(
        `Missing required values for tokens: ${missingTokens.join(", ")}`
      );
    }
  }

  private findMissingRequiredTokens(
    tokens: string[],
    data: Record<string, string | number | boolean>
  ): string[] {
    return tokens.filter(token => {
      const isRequired = this.schema.shape[token]?.isOptional() === false;
      return isRequired && !(token in data);
    });
  }

  private getTemplateTokens(): string[] {
    const tokenRegex = /\{\{(\w+)\}\}/g;
    const tokens: string[] = [];
    let match;

    while ((match = tokenRegex.exec(this.content)) !== null) {
      const token = match[1];
      if (token === undefined) {
        throw new Error(`Invalid template content for ${this.type}`);
      }
      tokens.push(token);
    }

    return tokens;
  }

  private replaceTokens(
    data: Record<string, string | number | boolean>
  ): string {
    const contentTokens = this.getTemplateTokens();
    const pattern = new RegExp(`\\{\\{(${contentTokens.join("|")})\\}\\}`, "g");

    return this.content.replace(pattern, (_, key) =>
      key in data ? String(data[key]) : `{{${key}}}`
    );
  }

  private validate(): void {
    const tokens = this.getTemplateTokens();
    const requiredFields = Object.keys(this.schema.shape);
    const missingRequired = requiredFields.filter(
      field => !tokens.includes(field)
    );

    if (missingRequired.length > 0) {
      logger.warn(
        `Missing required tokens in ${this.type} template: ${missingRequired.join(
          ", "
        )}`
      );
    }
  }
}

```
### Directory: __tests__

- **Path:** /root/git/codewrangler/src/infrastructure/templates/__tests__
- **Size:** 0 bytes
- **Files:** 0
- **Total Files (including subdirectories):** 0
- **Depth:** 3

#### Contents:

#### File: zod.ts

- **Path:** /root/git/codewrangler/src/infrastructure/templates/zod.ts
- **Extension:** ts
- **Size:** 1212 bytes
- **Depth:** 3
- **Lines:** 42

```ts
import { z } from "zod";

export const baseTemplateSchema = z.object({
  PROJECT_NAME: z.string(),
  GENERATION_DATE: z.string().datetime(),
  DIRECTORY_STRUCTURE: z.string(),
  TOTAL_SIZE: z.number(),
  TOTAL_FILES: z.number(),
  TOTAL_DIRECTORIES: z.number(),
  CONTENT: z.string()
});

export type BaseTemplate = z.infer<typeof baseTemplateSchema>;
export type BaseTemplateString = keyof BaseTemplate;

export const fileTemplateSchema = z.object({
  FILE_NAME: z.string(),
  FILE_EXTENSION: z.string(),
  FILE_SIZE: z.number(),
  FILE_DEPTH: z.number(),
  FILE_LINES: z.number(),
  FILE_PATH: z.string(),
  FILE_CONTENTS: z.string()
});

export type FileTemplate = z.infer<typeof fileTemplateSchema>;
export type FileTemplateString = keyof FileTemplate;

export const directoryTemplateSchema = z.object({
  DIRECTORY_NAME: z.string(),
  DIRECTORY_PATH: z.string(),
  DIRECTORY_SIZE: z.number(),
  DIRECTORY_LENGTH: z.number(),
  DIRECTORY_DEEP_LENGTH: z.number(),
  DIRECTORY_DEPTH: z.number(),
  DIRECTORY_NUMBER_OF_FILES: z.number(),
  DIRECTORY_CONTENT: z.string()
});

export type DirectoryTemplate = z.infer<typeof directoryTemplateSchema>;
export type DirectoryTemplateString = keyof DirectoryTemplate;

```
### Directory: orchestration

- **Path:** /root/git/codewrangler/src/orchestration
- **Size:** 5232 bytes
- **Files:** 3
- **Total Files (including subdirectories):** 6
- **Depth:** 1

#### Contents:

#### File: DocumentOrchestrator.ts

- **Path:** /root/git/codewrangler/src/orchestration/DocumentOrchestrator.ts
- **Extension:** ts
- **Size:** 2826 bytes
- **Depth:** 2
- **Lines:** 94

```ts
import { IDocumentOrchestrator } from "./interfaces/IDocumentOrchestrator";
import { NodeDirectory } from "../core/entities/NodeDirectory";
import { NodeFile } from "../core/entities/NodeFile";
import { documentFactory } from "../infrastructure/filesystem/DocumentFactory";
import { IRenderStrategy } from "../services/renderer/RenderStrategy";
import { Config } from "../utils/config/Config";
import { OUTPUT_FORMATS, OutputFormat } from "../utils/config/schema";
import { logger } from "../utils/logger/Logger";

export class DocumentOrchestrator implements IDocumentOrchestrator {
  private strategy: IRenderStrategy | null = null;

  private constructor(
    private readonly root: NodeDirectory | NodeFile,
    private readonly config: Config
  ) {}

  public static create(
    root: NodeDirectory | NodeFile,
    config: Config
  ): DocumentOrchestrator {
    const orchestrator = new DocumentOrchestrator(root, config);
    orchestrator.initialize();
    return orchestrator;
  }

  public setStrategy(strategy: IRenderStrategy): this {
    this.strategy = strategy;
    return this;
  }

  public async build(): Promise<void> {
    try {
      if (!this.strategy) {
        throw new Error("Strategy is not set");
      }

      const content = this.strategy.render(this.root as NodeDirectory);
      const outputFormat = this.strategy.getName();
      const outputPath = this.resolveOutputPath(outputFormat);
      await this.ensureOutputDirectory(outputPath);
      await this.writeOutput(outputPath, content);

      logger.success(`Document built successfully at ${outputPath}`);
    } catch (error) {
      logger.error("Failed to build document", error as Error);
      throw error;
    }
  }

  public getStrategyName(): string {
    return this.strategy?.getName() ?? "Unknown";
  }

  public dispose(): void {
    this.strategy?.dispose();
  }

  private initialize(): void {
    this.validateStructure();
  }

  private validateStructure(): void {
    if (!(this.root.type == "directory") && !(this.root.type == "file")) {
      throw new Error("Invalid root node type");
    }
  }

  private resolveOutputPath(outputFormat: OutputFormat): string {
    const outputFile = this.config.get("outputFile");
    return documentFactory.resolve(
      `${outputFile}.${OUTPUT_FORMATS[outputFormat]}`
    );
  }

  private async ensureOutputDirectory(outputPath: string): Promise<void> {
    const directory = documentFactory.baseName(outputPath);
    if (
      outputPath.endsWith(`.${OUTPUT_FORMATS.html}`) ||
      outputPath.endsWith(`.${OUTPUT_FORMATS.markdown}`)
    ) {
      return;
    }
    await documentFactory.ensureDirectory(directory);
  }

  private async writeOutput(
    outputPath: string,
    content: string
  ): Promise<void> {
    await documentFactory.writeFile(outputPath, content);
  }
}

```
#### File: DocumentOrchestratorBuilder.ts

- **Path:** /root/git/codewrangler/src/orchestration/DocumentOrchestratorBuilder.ts
- **Extension:** ts
- **Size:** 2018 bytes
- **Depth:** 2
- **Lines:** 72

```ts
import { DocumentOrchestrator } from "./DocumentOrchestrator";
import { NodeDirectory } from "../core/entities/NodeDirectory";
import { NodeFile } from "../core/entities/NodeFile";
import { IRenderStrategy } from "../services/renderer/RenderStrategy";
import { Config } from "../utils/config/Config";
import { logger } from "../utils/logger/Logger";

export class DocumentOrchestratorBuilder {
  private root: NodeDirectory | NodeFile | null = null;
  private config: Config | null = null;
  private strategies: IRenderStrategy[] = [];

  public setRoot(root: NodeDirectory | NodeFile): this {
    this.root = root;
    return this;
  }

  public setConfig(config: Config): this {
    this.config = config;
    return this;
  }

  public addStrategy(strategy: IRenderStrategy): this {
    this.strategies.push(strategy);
    return this;
  }

  public setStrategies(strategies: IRenderStrategy[]): this {
    this.strategies = strategies;
    return this;
  }

  public async build(): Promise<DocumentOrchestrator[]> {
    if (!this.root || !this.config) {
      throw new Error("Missing required components for DocumentOrchestrator");
    }

    if (this.strategies.length === 0) {
      throw new Error("At least one render strategy is required");
    }

    const orchestrators: DocumentOrchestrator[] = [];

    for (const strategy of this.strategies) {
      const orchestrator = await DocumentOrchestrator.create(
        this.root,
        this.config
      );
      orchestrator.setStrategy(strategy);
      orchestrators.push(orchestrator);
    }

    return orchestrators;
  }
  public async buildAndExecute(): Promise<DocumentOrchestrator[]> {
    const orchestrators = await this.build();

    for (const orchestrator of orchestrators) {
      try {
        await orchestrator.build();
      } catch (error) {
        logger.error(
          `Failed to build documentation with strategy ${orchestrator.getStrategyName()}`,
          error as Error
        );
      }
    }

    return orchestrators;
  }
}

```
#### File: index.ts

- **Path:** /root/git/codewrangler/src/orchestration/index.ts
- **Extension:** ts
- **Size:** 0 bytes
- **Depth:** 2
- **Lines:** 1

```ts

```
### Directory: interfaces

- **Path:** /root/git/codewrangler/src/orchestration/interfaces
- **Size:** 388 bytes
- **Files:** 3
- **Total Files (including subdirectories):** 3
- **Depth:** 2

#### Contents:

#### File: IDocumentMetadata.ts

- **Path:** /root/git/codewrangler/src/orchestration/interfaces/IDocumentMetadata.ts
- **Extension:** ts
- **Size:** 132 bytes
- **Depth:** 3
- **Lines:** 8

```ts
export interface IDocumentMetadata {
  title: string;
  description: string;
  author: string;
  date: string;
  version: string;
}

```
#### File: IDocumentOrchestrator.ts

- **Path:** /root/git/codewrangler/src/orchestration/interfaces/IDocumentOrchestrator.ts
- **Extension:** ts
- **Size:** 256 bytes
- **Depth:** 3
- **Lines:** 9

```ts
import { IRenderStrategy } from "../../services/renderer/RenderStrategy";

export interface IDocumentOrchestrator {
  setStrategy: (strategy: IRenderStrategy) => this;
  getStrategyName: () => string;
  build: () => Promise<void>;
  dispose: () => void;
}

```
#### File: index.ts

- **Path:** /root/git/codewrangler/src/orchestration/interfaces/index.ts
- **Extension:** ts
- **Size:** 0 bytes
- **Depth:** 3
- **Lines:** 1

```ts

```
### Directory: services

- **Path:** /root/git/codewrangler/src/services
- **Size:** 14713 bytes
- **Files:** 0
- **Total Files (including subdirectories):** 8
- **Depth:** 1

#### Contents:

### Directory: builder

- **Path:** /root/git/codewrangler/src/services/builder
- **Size:** 5920 bytes
- **Files:** 3
- **Total Files (including subdirectories):** 3
- **Depth:** 2

#### Contents:

#### File: DocumentTreeBuilder.ts

- **Path:** /root/git/codewrangler/src/services/builder/DocumentTreeBuilder.ts
- **Extension:** ts
- **Size:** 1814 bytes
- **Depth:** 3
- **Lines:** 59

```ts
import { INodeTree, NodeTreeBuilder } from "./NodeTreeBuilder";
import { RenderableDirectory } from "../../core/entities/NodeDirectory";
import { RenderableFile } from "../../core/entities/NodeFile";
import { FILE_TYPE } from "../../types/type";
import { Config } from "../../utils/config";
import { logger } from "../../utils/logger";

export class DocumentTreeBuilder {
  private root: RenderableDirectory | RenderableFile | undefined;
  private builder: NodeTreeBuilder;
  public constructor(config: Config) {
    this.builder = new NodeTreeBuilder(config);
  }

  public async build(): Promise<RenderableDirectory | RenderableFile> {
    try {
      // Build file tree structure
      const fileTree = await this.builder.build();

      // Convert file tree to Document tree
      this.root = await this.createDocumentStructure(fileTree);

      // Initialize the entire document tree
      await this.root.bundle();

      if (!this.root) {
        throw new Error("No files found matching the specified pattern");
      }

      logger.info("Document tree built successfully");

      return this.root;
    } catch (error) {
      logger.error("Error building document tree", error as Error);
      throw error;
    }
  }

  private async createDocumentStructure(
    node: INodeTree
  ): Promise<RenderableDirectory | RenderableFile> {
    if (node.type === FILE_TYPE.Directory) {
      const directory = new RenderableDirectory(node.name, node.path);

      if (node.children) {
        // Recursively create children
        for (const child of node.children) {
          const childDocument = await this.createDocumentStructure(child);
          directory.addChild(childDocument);
        }
      }

      return directory;
    } else {
      return new RenderableFile(node.name, node.path);
    }
  }
}

```
#### File: FileHidden.ts

- **Path:** /root/git/codewrangler/src/services/builder/FileHidden.ts
- **Extension:** ts
- **Size:** 893 bytes
- **Depth:** 3
- **Lines:** 33

```ts
import { minimatch } from "minimatch";

import { Config } from "../../utils/config";

export default class FileHidden {
  private ignoreHiddenFiles: boolean;
  private patterns: string[];
  private additionalIgnoreFiles: string[];

  public constructor(config: Config) {
    this.ignoreHiddenFiles = config.get("ignoreHiddenFiles") as boolean;
    this.patterns = [...config.get("excludePatterns")];
    this.additionalIgnoreFiles = config.get("additionalIgnoreFiles");
  }

  public shouldExclude(fileName: string): boolean {
    if (this.ignoreHiddenFiles && fileName.startsWith(".")) {
      return true;
    }

    if (this.patterns.some(pattern => minimatch(fileName, pattern))) {
      return true;
    }

    if (this.additionalIgnoreFiles.some(file => minimatch(fileName, file))) {
      // Additional ignore files are always excluded
      return true;
    }

    return false;
  }
}

```
#### File: NodeTreeBuilder.ts

- **Path:** /root/git/codewrangler/src/services/builder/NodeTreeBuilder.ts
- **Extension:** ts
- **Size:** 3213 bytes
- **Depth:** 3
- **Lines:** 119

```ts
import FileHidden from "./FileHidden";
import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
import { fileStatsService } from "../../infrastructure/filesystem/FileStats";
import { FILE_TYPE, FileType } from "../../types/type";
import { Config, ConfigOptions } from "../../utils/config";

export interface INodeTree {
  name: string;
  path: string;
  type: FileType;
  children?: INodeTree[];
}

export interface INodeTreeBuilderOptions
  extends Pick<
    ConfigOptions,
    | "additionalIgnoreFiles"
    | "maxDepth"
    | "excludePatterns"
    | "dir"
    | "followSymlinks"
  > {
  pattern: RegExp;
  returnType: "paths" | "details";
}

export class NodeTreeBuilder {
  private config: Config;
  private options: INodeTreeBuilderOptions;
  private fileHidden: FileHidden;

  public constructor(config: Config) {
    this.config = config;
    this.options = this.initializeOptions();
    this.fileHidden = new FileHidden(config);
  }

  public async build(): Promise<INodeTree> {
    const rootDir = this.options.dir;
    if (!documentFactory.exists(rootDir)) {
      throw new Error(`Directory ${rootDir} does not exist`);
    }
    return await this.buildTree(rootDir);
  }

  private initializeOptions(): INodeTreeBuilderOptions {
    return {
      dir: this.config.get("dir"),
      pattern: new RegExp(this.config.get("pattern")),
      maxDepth: this.config.get("maxDepth"),
      excludePatterns: this.config.get("excludePatterns"),
      additionalIgnoreFiles: this.config.get("additionalIgnoreFiles"),
      returnType: "details",
      followSymlinks: false
    };
  }

  private async createNode(nodePath: string): Promise<INodeTree> {
    const stats = await fileStatsService(nodePath);
    const name = documentFactory.baseName(nodePath);

    return {
      name,
      path: nodePath,
      type: stats.isDirectory ? FILE_TYPE.Directory : FILE_TYPE.File
    };
  }

  private shouldProcessChildren(node: INodeTree, depth: number): boolean {
    const isDirectory = node.type === FILE_TYPE.Directory;
    const withinDepthLimit =
      !this.options.maxDepth || depth < this.options.maxDepth;
    return isDirectory && withinDepthLimit;
  }

  private async processChildren(
    nodePath: string,
    depth: number
  ): Promise<INodeTree[]> {
    const entries = await documentFactory.readDir(nodePath);
    const children: INodeTree[] = [];

    for (const entry of entries) {
      const childNode = await this.processChild(nodePath, entry, depth);
      if (childNode) {
        children.push(childNode);
      }
    }

    return children;
  }

  private async processChild(
    parentPath: string,
    entry: string,
    depth: number
  ): Promise<INodeTree | null> {
    if (this.fileHidden.shouldExclude(entry)) {
      return null;
    }

    const childPath = documentFactory.join(parentPath, entry);
    return await this.buildTree(childPath, depth + 1);
  }

  private async buildTree(
    nodePath: string,
    depth: number = 0
  ): Promise<INodeTree> {
    const node = await this.createNode(nodePath);

    if (this.shouldProcessChildren(node, depth)) {
      node.children = await this.processChildren(nodePath, depth);
    }

    return node;
  }
}

```
### Directory: __tests__

- **Path:** /root/git/codewrangler/src/services/builder/__tests__
- **Size:** 0 bytes
- **Files:** 0
- **Total Files (including subdirectories):** 0
- **Depth:** 3

#### Contents:

### Directory: renderer

- **Path:** /root/git/codewrangler/src/services/renderer
- **Size:** 8793 bytes
- **Files:** 3
- **Total Files (including subdirectories):** 5
- **Depth:** 2

#### Contents:

#### File: RenderStrategy.ts

- **Path:** /root/git/codewrangler/src/services/renderer/RenderStrategy.ts
- **Extension:** ts
- **Size:** 3388 bytes
- **Depth:** 3
- **Lines:** 109

```ts
import { NodeDirectory } from "../../core/entities/NodeDirectory";
import { NodeFile } from "../../core/entities/NodeFile";
import { Template } from "../../infrastructure/templates/TemplateEngine";
import {
  BaseTemplate,
  DirectoryTemplate,
  FileTemplate
} from "../../infrastructure/templates/zod";
import { Config, OutputFormat } from "../../utils/config";

interface IContentRenderer {
  renderFile: (file: NodeFile) => string;
  renderDirectory: (directory: NodeDirectory) => string;
}

interface IDocumentRenderer {
  render: (rootDirectory: NodeDirectory) => string;
  dispose: () => void;
}

export interface IRenderStrategy extends IContentRenderer, IDocumentRenderer {
  getName: () => OutputFormat;
}

export abstract class RenderBaseStrategy implements IRenderStrategy {
  protected templatePage: Template;
  protected templateDirectory: Template;
  protected templateFile: Template;

  protected constructor(
    private readonly config: Config,
    public readonly name: OutputFormat,
    templatePage: Template,
    templateDirectory: Template,
    templateFile: Template
  ) {
    this.templatePage = templatePage;
    this.templateDirectory = templateDirectory;
    this.templateFile = templateFile;
  }

  public getName(): OutputFormat {
    return this.name;
  }

  public renderFile(file: NodeFile): string {
    return this.templateFile.render({
      FILE_NAME: file.name,
      FILE_EXTENSION: file.extension.replace(".", ""),
      FILE_SIZE: file.size,
      FILE_DEPTH: file.deep,
      FILE_LINES: file.content?.split("\n").length || 0,
      FILE_PATH: file.path,
      FILE_CONTENTS: file.content || ""
    } as FileTemplate & Record<string, string>);
  }

  public renderDirectory(directory: NodeDirectory): string {
    const content = this.renderChildren(directory.children);

    return this.templateDirectory.render({
      DIRECTORY_NAME: directory.name,
      DIRECTORY_PATH: directory.path,
      DIRECTORY_SIZE: directory.size,
      DIRECTORY_LENGTH: directory.length,
      DIRECTORY_NUMBER_OF_FILES: directory.numberOfFiles,
      DIRECTORY_DEEP_LENGTH: directory.deepLength,
      DIRECTORY_DEPTH: directory.deep,
      DIRECTORY_CONTENT: content
    } as DirectoryTemplate & Record<string, string>);
  }

  public render(rootDirectory: NodeDirectory | NodeFile): string {
    const rootContent = this.renderNode(rootDirectory);

    const templateConfig = {
      PROJECT_NAME:
        this.config.get("projectName") || rootDirectory.name || "Project",
      GENERATION_DATE: new Date().toISOString(),
      TOTAL_SIZE: rootDirectory.size,
      CONTENT: rootContent
    } as BaseTemplate & Record<string, string>;

    if (rootDirectory.type === "directory") {
      templateConfig["TOTAL_FILES"] = rootDirectory.length;
      templateConfig["TOTAL_DIRECTORIES"] = rootDirectory.deepLength;
    }

    return this.templatePage.render(templateConfig);
  }

  public dispose(): void {
    this.templatePage.dispose();
    this.templateDirectory.dispose();
    this.templateFile.dispose();
  }

  protected renderNode(node: NodeFile | NodeDirectory): string {
    return node.type === "file"
      ? this.renderFile(node)
      : this.renderDirectory(node);
  }

  protected renderChildren(children: (NodeFile | NodeDirectory)[]): string {
    if (!children) return "";
    return children.map(child => this.renderNode(child)).join("");
  }
}

```
#### File: RenderStrategyBuilder.ts

- **Path:** /root/git/codewrangler/src/services/renderer/RenderStrategyBuilder.ts
- **Extension:** ts
- **Size:** 3112 bytes
- **Depth:** 3
- **Lines:** 105

```ts
import { RenderBaseStrategy } from "./RenderStrategy";
import { RenderHTMLStrategy } from "./strategies/HTMLStrategy";
import { RenderMarkdownStrategy } from "./strategies/MarkdownStrategy";
import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
import { Template } from "../../infrastructure/templates/TemplateEngine";
import {
  baseTemplateSchema,
  directoryTemplateSchema,
  fileTemplateSchema
} from "../../infrastructure/templates/zod";
import { Config, OutputFormatExtension } from "../../utils/config";

export class RenderStrategyBuilder {
  private config: Config | null = null;
  private extension: OutputFormatExtension | null = null;
  private name: string | null = null;
  private templatePage: Template | null = null;
  private templateDirectory: Template | null = null;
  private templateFile: Template | null = null;

  public setConfig(config: Config): RenderStrategyBuilder {
    this.config = config;
    return this;
  }

  public setExtension(extension: OutputFormatExtension): RenderStrategyBuilder {
    this.extension = extension;
    return this;
  }

  public setName(name: string): RenderStrategyBuilder {
    this.name = name;
    return this;
  }

  public async loadTemplates(): Promise<RenderStrategyBuilder> {
    if (!this.config) {
      throw new Error("Config is required");
    }

    const templateDir = Template.getTemplateDir(this.config);

    this.templatePage = await this.loadTemplatePage(templateDir);
    this.templateDirectory = await this.loadTemplateDirectory(templateDir);
    this.templateFile = await this.loadTemplateFile(templateDir);

    return this;
  }

  public build(): RenderBaseStrategy {
    this.validate();

    const concreteRenderStrategy =
      this.name === "Markdown" ? RenderMarkdownStrategy : RenderHTMLStrategy;

    return new concreteRenderStrategy(
      this.config as Config,
      this.templatePage as Template,
      this.templateDirectory as Template,
      this.templateFile as Template
    );
  }

  private validate(): boolean {
    if (!this.config) {
      throw new Error("Config is required");
    }
    if (!this.extension) {
      throw new Error("Extension is required");
    }
    if (!this.name) {
      throw new Error("Name is required");
    }
    if (!this.templatePage || !this.templateDirectory || !this.templateFile) {
      throw new Error("Templates must be loaded before building");
    }

    return true;
  }

  private loadTemplateFile(templateDir: string): Promise<Template> {
    return Template.create(
      "file",
      fileTemplateSchema,
      documentFactory.join(templateDir, `file.${this.extension}`)
    );
  }

  private loadTemplateDirectory(templateDir: string): Promise<Template> {
    return Template.create(
      "directory",
      directoryTemplateSchema,
      documentFactory.join(templateDir, `directory.${this.extension}`)
    );
  }

  private loadTemplatePage(templateDir: string): Promise<Template> {
    return Template.create(
      "page",
      baseTemplateSchema,
      documentFactory.join(templateDir, `page.${this.extension}`)
    );
  }
}

```
#### File: RenderStrategyFactory.ts

- **Path:** /root/git/codewrangler/src/services/renderer/RenderStrategyFactory.ts
- **Extension:** ts
- **Size:** 1367 bytes
- **Depth:** 3
- **Lines:** 47

```ts
import { RenderBaseStrategy } from "./RenderStrategy";
import { RenderStrategyBuilder } from "./RenderStrategyBuilder";
import { Config } from "../../utils/config/Config";
import { OutputFormat } from "../../utils/config/schema";

// Factory function for common render strategies
export const renderStrategyFactory = {
  async createMarkdownStrategy(config: Config): Promise<RenderBaseStrategy> {
    return await new RenderStrategyBuilder()
      .setConfig(config)
      .setExtension("md")
      .setName("Markdown")
      .loadTemplates()
      .then(builder => builder.build());
  },

  async createHTMLStrategy(config: Config): Promise<RenderBaseStrategy> {
    return await new RenderStrategyBuilder()
      .setConfig(config)
      .setExtension("html")
      .setName("HTML")
      .loadTemplates()
      .then(builder => builder.build());
  },

  async createStrategies(
    config: Config,
    formats: OutputFormat[]
  ): Promise<RenderBaseStrategy[]> {
    return await Promise.all(
      formats.map(format => this.createStrategy(config, format))
    );
  },

  async createStrategy(
    config: Config,
    format: OutputFormat
  ): Promise<RenderBaseStrategy> {
    switch (format) {
      case "markdown":
        return await this.createMarkdownStrategy(config);
      case "html":
        return await this.createHTMLStrategy(config);
    }
  }
};

```
### Directory: __tests__

- **Path:** /root/git/codewrangler/src/services/renderer/__tests__
- **Size:** 0 bytes
- **Files:** 0
- **Total Files (including subdirectories):** 0
- **Depth:** 3

#### Contents:

### Directory: strategies

- **Path:** /root/git/codewrangler/src/services/renderer/strategies
- **Size:** 926 bytes
- **Files:** 2
- **Total Files (including subdirectories):** 2
- **Depth:** 3

#### Contents:

#### File: HTMLStrategy.ts

- **Path:** /root/git/codewrangler/src/services/renderer/strategies/HTMLStrategy.ts
- **Extension:** ts
- **Size:** 459 bytes
- **Depth:** 4
- **Lines:** 15

```ts
import { Template } from "../../../infrastructure/templates/TemplateEngine";
import { Config } from "../../../utils/config";
import { RenderBaseStrategy } from "../RenderStrategy";

export class RenderHTMLStrategy extends RenderBaseStrategy {
  public constructor(
    config: Config,
    templatePage: Template,
    templateDirectory: Template,
    templateFile: Template
  ) {
    super(config, "html", templatePage, templateDirectory, templateFile);
  }
}

```
#### File: MarkdownStrategy.ts

- **Path:** /root/git/codewrangler/src/services/renderer/strategies/MarkdownStrategy.ts
- **Extension:** ts
- **Size:** 467 bytes
- **Depth:** 4
- **Lines:** 15

```ts
import { Template } from "../../../infrastructure/templates/TemplateEngine";
import { Config } from "../../../utils/config";
import { RenderBaseStrategy } from "../RenderStrategy";

export class RenderMarkdownStrategy extends RenderBaseStrategy {
  public constructor(
    config: Config,
    templatePage: Template,
    templateDirectory: Template,
    templateFile: Template
  ) {
    super(config, "markdown", templatePage, templateDirectory, templateFile);
  }
}

```
### Directory: types

- **Path:** /root/git/codewrangler/src/types
- **Size:** 1314 bytes
- **Files:** 2
- **Total Files (including subdirectories):** 2
- **Depth:** 1

#### Contents:

#### File: template.ts

- **Path:** /root/git/codewrangler/src/types/template.ts
- **Extension:** ts
- **Size:** 229 bytes
- **Depth:** 2
- **Lines:** 10

```ts
import { z } from "zod";

export type TemplateType = "page" | "file" | "directory";

export interface ITemplateContent<T> {
  content: string;
  schema: z.ZodSchema<T>;
  additionalFields?: Record<string, z.ZodSchema<string>>;
}

```
#### File: type.ts

- **Path:** /root/git/codewrangler/src/types/type.ts
- **Extension:** ts
- **Size:** 1085 bytes
- **Depth:** 2
- **Lines:** 62

```ts
export const FILE_TYPE = {
  File: "file",
  Directory: "directory"
} as const;

export type FileType = (typeof FILE_TYPE)[keyof typeof FILE_TYPE];

export interface IAccessFlags {
  readable: boolean;
  writable: boolean;
  executable: boolean;
}

export interface IFileStats {
  size: number;
  created: Date;
  modified: Date;
  accessed: Date;
  isDirectory: boolean;
  isFile: boolean;
  permissions: IAccessFlags;
}

export interface IReadOptions {
  encoding?: BufferEncoding;
  flag?: string;
}

export interface IWriteOptions extends IReadOptions {
  mode?: number;
  flag?: string;
}

export interface IDirectoryOptions {
  recursive?: boolean;
  mode?: number;
}

export interface IFileTreeItem {
  path: string;
  type: FileType;
  stats?: IFileStats;
}

export interface IPropsNode {
  name: string;
  path: string;
  deep: number;
  size: number;
  extension?: string;
  stats?: IFileStats;
}

export interface IPropsDirectoryNode extends IPropsNode {
  deepLength: number;
  length: number;
}

export interface IPropsFileNode extends IPropsNode {
  extension: string;
}

```
### Directory: utils

- **Path:** /root/git/codewrangler/src/utils
- **Size:** 9149 bytes
- **Files:** 0
- **Total Files (including subdirectories):** 6
- **Depth:** 1

#### Contents:

### Directory: config

- **Path:** /root/git/codewrangler/src/utils/config
- **Size:** 5564 bytes
- **Files:** 3
- **Total Files (including subdirectories):** 3
- **Depth:** 2

#### Contents:

#### File: Config.ts

- **Path:** /root/git/codewrangler/src/utils/config/Config.ts
- **Extension:** ts
- **Size:** 2649 bytes
- **Depth:** 3
- **Lines:** 96

```ts
import { z } from "zod";

import {
  ConfigKeys,
  ConfigOptions,
  DEFAULT_CONFIG,
  configSchema
} from "./schema";
import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
import { JsonReader } from "../../infrastructure/filesystem/JsonReader";
import { logger } from "../logger/Logger";

export class Config {
  private static instance: Config | undefined;
  private config: ConfigOptions;
  private jsonReader: JsonReader;

  private constructor() {
    this.jsonReader = new JsonReader();
    this.config = configSchema.parse(DEFAULT_CONFIG);
    logger.setConfig(this);
  }

  public static async load(): Promise<Config> {
    if (!Config.instance) {
      Config.instance = new Config();
      await Config.instance.loadUserConfig();
    }
    return Config.instance;
  }

  public get<T extends ConfigKeys>(key: T): ConfigOptions[T] {
    return this.config[key] as ConfigOptions[T];
  }

  public set(
    key: keyof ConfigOptions,
    value: ConfigOptions[keyof ConfigOptions] | undefined
  ): void {
    if (value === undefined) {
      return;
    }
    const updatedConfig = { ...this.config, [key]: value };
    try {
      configSchema.parse(updatedConfig);
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
      configSchema.parse(newOverrideConfig);
      this.config = newOverrideConfig;
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error(`Invalid configuration value: ${error.errors}`);
      }
      throw error;
    }
  }

  private async loadUserConfig(): Promise<void> {
    try {
      const configPath = documentFactory.resolve(this.config.codeConfigFile);
      const userConfig = await this.jsonReader.readJsonSync(configPath);
      this.config = configSchema.parse({ ...this.config, ...userConfig });
    } catch (error) {
      this.handleConfigError(error);
    }
  }

  private handleConfigError(error: unknown): void {
    if (error instanceof z.ZodError) {
      const details = error.errors
        .map(err => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
      throw new Error(`Configuration validation failed: ${details}`);
    }
    throw error;
  }
}

```
### Directory: __tests__

- **Path:** /root/git/codewrangler/src/utils/config/__tests__
- **Size:** 0 bytes
- **Files:** 0
- **Total Files (including subdirectories):** 0
- **Depth:** 3

#### Contents:

#### File: index.ts

- **Path:** /root/git/codewrangler/src/utils/config/index.ts
- **Extension:** ts
- **Size:** 52 bytes
- **Depth:** 3
- **Lines:** 3

```ts
export * from "./Config";
export * from "./schema";

```
#### File: schema.ts

- **Path:** /root/git/codewrangler/src/utils/config/schema.ts
- **Extension:** ts
- **Size:** 2863 bytes
- **Depth:** 3
- **Lines:** 97

```ts
import { z } from "zod";

import { LOG_VALUES } from "../logger/Logger";

export const OUTPUT_FORMATS = {
  markdown: "md",
  html: "html"
} as const;

export type OutputFormats = typeof OUTPUT_FORMATS;
export type OutputFormatName = keyof OutputFormats;
export type OutputFormatExtension = OutputFormats[OutputFormatName];

export const outputFormatSchema = z.enum(["markdown", "html"] as const);

export const fileExtensionSchema = z.enum(["md", "html"] as const);

export type OutputFormat = z.infer<typeof outputFormatSchema>;
export type FileExtension = z.infer<typeof fileExtensionSchema>;

export const FILE_EXTENSION: Record<OutputFormat, FileExtension> = {
  markdown: "md",
  html: "html"
};

export const configSchema = z
  .object({
    dir: z.string().default(process.cwd()),
    rootDir: z.string().default(process.cwd()),
    templatesDir: z.string().default("public/templates"),
    pattern: z
      .string()
      .regex(/^.*$/, "Pattern must be a valid regex")
      .default(".*"),
    outputFile: z.string().default("output"),
    logLevel: z.enum(LOG_VALUES as [string, ...string[]]).default("INFO"),
    outputFormat: z.array(outputFormatSchema).default(["markdown"]),
    maxFileSize: z.number().positive().default(1048576),
    maxDepth: z.number().default(100),
    excludePatterns: z
      .array(z.string())
      .default(["node_modules/**", "**/*.test.ts", "dist/**"]),
    ignoreHiddenFiles: z.boolean().default(true),
    additionalIgnoreFiles: z.array(z.string()).optional().default([]),
    projectName: z.string().optional(),
    verbose: z.boolean().default(false),
    followSymlinks: z.boolean().default(false),
    codeConfigFile: z
      .string()
      .regex(/\.json$/, "Config file must end with .json")
      .default("public/codewrangler.json")
  })
  .strict();

export type ConfigOptions = z.infer<typeof configSchema>;
// get a type listing all the keys of the config
export type ConfigKeys = keyof ConfigOptions;

const DEFAULT_CONFIG_IGNORE = {
  ignoreHiddenFiles: true, // Default value
  additionalIgnoreFiles: [],
  excludePatterns: ["node_modules/**", "**/*.test.ts", "dist/**"]
};

const DEFAULT_CONFIG_LOG = {
  logLevel: "INFO",
  verbose: false
};

const DEFAULT_CONFIG_LIMITS = {
  maxFileSize: 1048576,
  maxDepth: 100
};

const DEFAULT_CONFIG_PATHS = {
  templatesDir: "public/templates",
  codeConfigFile: "public/codewrangler.json"
};

const DEFAULT_CONFIG_OUTPUT = {
  outputFormat: ["markdown"] as OutputFormat[],
  outputFile: "output"
};

export const DEFAULT_CONFIG: ConfigOptions = {
  dir: process.cwd(), // current working directory, where the command is run
  rootDir: process.cwd(),
  projectName: undefined,
  pattern: ".*",
  followSymlinks: false,
  ...DEFAULT_CONFIG_PATHS,
  ...DEFAULT_CONFIG_LIMITS,
  ...DEFAULT_CONFIG_IGNORE,
  ...DEFAULT_CONFIG_LOG,
  ...DEFAULT_CONFIG_OUTPUT
};

```
### Directory: helpers

- **Path:** /root/git/codewrangler/src/utils/helpers
- **Size:** 1524 bytes
- **Files:** 1
- **Total Files (including subdirectories):** 1
- **Depth:** 2

#### Contents:

#### File: ProgressBar.ts

- **Path:** /root/git/codewrangler/src/utils/helpers/ProgressBar.ts
- **Extension:** ts
- **Size:** 1524 bytes
- **Depth:** 3
- **Lines:** 66

```ts
import cliProgress from "cli-progress";

export class ProgressBar {
  private bar: cliProgress.SingleBar;
  private intervalId: NodeJS.Timeout | null = null;
  private currentValue: number = 0;

  public constructor(private total: number = 100) {
    this.bar = new cliProgress.SingleBar(
      {},
      cliProgress.Presets.shades_classic
    );
  }

  public start(): ProgressBar {
    this.bar.start(this.total, 0);
    this.intervalId = setInterval(() => this.simulateProgress(), 200);
    return this;
  }

  public update(value: number): ProgressBar {
    this.currentValue = value;
    this.bar.update(value);
    return this;
  }

  public stop(): ProgressBar {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.bar.update(this.total);
    this.bar.stop();
    return this;
  }

  public async execute<T>(fn: () => Promise<T>): Promise<T> {
    this.start();
    try {
      return await fn();
    } finally {
      this.stop();
    }
  }

  private simulateProgress(): void {
    const remainingProgress = this.total - this.currentValue;
    const increment = Math.random() * remainingProgress * 0.1;
    this.currentValue = Math.min(
      this.currentValue + increment,
      this.total * 0.95
    );
    this.bar.update(this.currentValue);
  }
}

export async function progressBar(
  total: number,
  callback: () => Promise<void>
): Promise<void> {
  const bar = new ProgressBar(total);
  await bar.execute(async () => {
    await callback();
  });
}

```
### Directory: __tests__

- **Path:** /root/git/codewrangler/src/utils/helpers/__tests__
- **Size:** 0 bytes
- **Files:** 0
- **Total Files (including subdirectories):** 0
- **Depth:** 3

#### Contents:

### Directory: logger

- **Path:** /root/git/codewrangler/src/utils/logger
- **Size:** 2061 bytes
- **Files:** 2
- **Total Files (including subdirectories):** 2
- **Depth:** 2

#### Contents:

#### File: Logger.ts

- **Path:** /root/git/codewrangler/src/utils/logger/Logger.ts
- **Extension:** ts
- **Size:** 2035 bytes
- **Depth:** 3
- **Lines:** 83

```ts
/* eslint-disable no-console */
import colors from "colors";

import { Config } from "../config/Config";

export const LOG_LEVEL = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3
} as const;

type LogLevel = (typeof LOG_LEVEL)[keyof typeof LOG_LEVEL];
export type LogLevelString = keyof typeof LOG_LEVEL;
export const LOG_VALUES = Object.keys(LOG_LEVEL) as LogLevelString[];

export class Logger {
  private static instance: Logger;
  private config: Config | null = null;

  private constructor() {}
  public static load(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }
  public setConfig(config: Config): Logger {
    this.config = config;
    return this;
  }
  public setLogLevel(logLevel: LogLevelString): Logger {
    if (this.config) {
      this.config.set("logLevel", logLevel);
    }
    return this;
  }

  private get logLevel(): LogLevel {
    const configLogLevel = this.config?.get("logLevel") as
      | LogLevelString
      | undefined;
    return configLogLevel ? LOG_LEVEL[configLogLevel] : LOG_LEVEL.ERROR;
  }

  public error(message: string, error?: Error, ...other: unknown[]): void {
    if (this.logLevel >= LOG_LEVEL.ERROR) {
      console.log(colors.red(`[ERROR] ${message}`), ...other);
      if (error instanceof Error && error.stack) {
        console.log(colors.red(error.stack));
      }
    }
  }

  public warn(message: string): void {
    if (this.logLevel >= LOG_LEVEL.WARN) {
      console.log(colors.yellow(`[WARN] ${message}`));
    }
  }

  public info(message: string): void {
    if (this.logLevel >= LOG_LEVEL.INFO) {
      console.log(colors.blue(`[INFO] ${message}`));
    }
  }

  public debug(message: string): void {
    if (this.logLevel >= LOG_LEVEL.DEBUG) {
      console.log(colors.gray(`[DEBUG] ${message}`));
    }
  }

  public success(message: string): void {
    console.log(colors.green(message));
  }

  public log(message: string): void {
    console.log(message);
  }
}

export const logger = Logger.load();

```
### Directory: __tests__

- **Path:** /root/git/codewrangler/src/utils/logger/__tests__
- **Size:** 0 bytes
- **Files:** 0
- **Total Files (including subdirectories):** 0
- **Depth:** 3

#### Contents:

#### File: index.ts

- **Path:** /root/git/codewrangler/src/utils/logger/index.ts
- **Extension:** ts
- **Size:** 26 bytes
- **Depth:** 3
- **Lines:** 2

```ts
export * from "./Logger";

```

