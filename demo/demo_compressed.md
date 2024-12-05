
# Code documentation
```
codewrangler
├── demo
├── documentation
├── public
│   └── templates
└── src
    ├── cli
    │   ├── CodeWrangler.ts
    │   ├── commands
    │   │   ├── DemoCommand.ts
    │   │   ├── GenerateCommand.ts
    │   │   └── types.ts
    │   ├── index.ts
    │   └── program
    │       └── ProgramBuilder.ts
    ├── core
    │   ├── entities
    │   │   ├── NodeBase.ts
    │   │   ├── NodeDirectory.ts
    │   │   └── NodeFile.ts
    │   └── errors
    │       ├── DirectoryNotFoundError.ts
    │       ├── DocumentError.ts
    │       ├── FileNotFoundError.ts
    │       └── index.ts
    ├── infrastructure
    │   ├── filesystem
    │   │   ├── DocumentFactory.ts
    │   │   ├── FileStats.ts
    │   │   └── JsonReader.ts
    │   └── templates
    │       ├── TemplateEngine.ts
    │       └── zod.ts
    ├── services
    │   ├── builder
    │   │   ├── DocumentTreeBuilder.ts
    │   │   ├── FileHidden.ts
    │   │   └── NodeTreeBuilder.ts
    │   └── renderer
    │       ├── RenderStrategy.ts
    │       └── strategies
    │           ├── HTMLStrategy.ts
    │           └── MarkdownStrategy.ts
    ├── types
    │   ├── template.ts
    │   └── type.ts
    └── utils
        ├── config
        │   ├── Config.ts
        │   ├── index.ts
        │   └── schema.ts
        ├── helpers
        │   └── ProgressBar.ts
        └── logger
            ├── Logger.ts
            └── index.ts
```

## File: CodeWrangler.ts, Path: `/root/git/codewrangler/src/cli/CodeWrangler.ts`
```ts
 1 | import { Command } from "commander";
 2 | import { GenerateCommand } from "./commands/GenerateCommand";
 3 | import { ICommandOptions } from "./commands/types";
 4 | import { ProgramBuilder } from "./program/ProgramBuilder";
 5 | import { Config } from "../utils/config/Config";
 6 | export class CodeWrangler {
 7 | private static instance: CodeWrangler | undefined;
 8 | private readonly VERSION = "1.0.0";
 9 | private config: Config;
10 | private program: Command;
11 | private generateCommand: GenerateCommand;
12 | private constructor(config: Config) {
13 | this.config = config;
14 | this.generateCommand = new GenerateCommand(this.config);
15 | this.program = new ProgramBuilder(this.config, this.VERSION).build();
16 | this.setupCommands();
17 | }
18 | public static async run(): Promise<boolean> {
19 | if (!CodeWrangler.instance) {
20 | const config = await Config.load();
21 | CodeWrangler.instance = new CodeWrangler(config);
22 | await CodeWrangler.instance.program.parseAsync(process.argv);
23 | return true;
24 | }
25 | throw new Error("CodeWrangler already initialized");
26 | }
27 | private setupCommands(): void {
28 | this.program.action(async (pattern: string, options: ICommandOptions) => {
29 | await this.generateCommand.execute([pattern], options);
30 | });
31 | }
32 | }
```

## File: DemoCommand.ts, Path: `/root/git/codewrangler/src/cli/commands/DemoCommand.ts`
```ts
  1 | /* eslint-disable max-lines-per-function */
  2 | import { Stats } from "fs";
  3 | import * as fs from "fs/promises";
  4 | import * as path from "path";
  5 | interface IFileInfo {
  6 | name: string;
  7 | path: string;
  8 | content: string;
  9 | ext: string;
 10 | size: number;
 11 | lines: number;
 12 | }
 13 | interface ITreeNode {
 14 | name: string;
 15 | path: string;
 16 | type: "file" | "directory";
 17 | children: ITreeNode[];
 18 | }
 19 | interface IDocumentConfig {
 20 | pattern: RegExp;
 21 | rootDir: string;
 22 | outputPath: string;
 23 | excludePatterns: string[];
 24 | maxFileSize: number;
 25 | ignoreHidden: boolean;
 26 | compress: boolean;
 27 | }
 28 | const DEFAULT_CONFIG: IDocumentConfig = {
 29 | pattern: /.*/,
 30 | rootDir: process.cwd(),
 31 | outputPath: "documentation.md",
 32 | excludePatterns: ["node_modules/**", "**/dist/**", "**/*.test.ts"],
 33 | maxFileSize: 1024 * 1024, // 1MB
 34 | ignoreHidden: true,
 35 | compress: false
 36 | };
 37 | const generateTreeSymbols = (depth: number, isLast: boolean[]): string => {
 38 | if (depth === 0) return "";
 39 | return (
 40 | isLast
 41 | .slice(0, -1)
 42 | .map(last => (last ? "    " : "│   "))
 43 | .join("") + (isLast[isLast.length - 1] ? "└── " : "├── ")
 44 | );
 45 | };
 46 | const createTreeNode = async (
 47 | nodePath: string,
 48 | config: IDocumentConfig,
 49 | relativePath = ""
 50 | ): Promise<ITreeNode | null> => {
 51 | const stats = await fs.stat(nodePath);
 52 | const name = path.basename(nodePath);
 53 | if (!shouldInclude(nodePath, config)) {
 54 | return null;
 55 | }
 56 | if (stats.isDirectory()) {
 57 | const entries = await fs.readdir(nodePath, { withFileTypes: true });
 58 | const children: ITreeNode[] = [];
 59 | for (const entry of entries) {
 60 | const childNode = await createTreeNode(
 61 | path.join(nodePath, entry.name),
 62 | config,
 63 | path.join(relativePath, name)
 64 | );
 65 | if (childNode) children.push(childNode);
 66 | }
 67 | return {
 68 | name,
 69 | path: relativePath || name,
 70 | type: "directory",
 71 | children
 72 | };
 73 | } else if (isMatchingFile(nodePath, config)) {
 74 | return {
 75 | name,
 76 | path: relativePath || name,
 77 | type: "file",
 78 | children: []
 79 | };
 80 | }
 81 | return null;
 82 | };
 83 | const renderTreeNode = (
 84 | node: ITreeNode,
 85 | isLast: boolean[] = [],
 86 | result: string[] = []
 87 | ): string[] => {
 88 | const prefix = generateTreeSymbols(isLast.length, isLast);
 89 | result.push(prefix + node.name);
 90 | if (node.type === "directory") {
 91 | node.children.forEach((child, index) => {
 92 | renderTreeNode(
 93 | child,
 94 | [...isLast, index === node.children.length - 1],
 95 | result
 96 | );
 97 | });
 98 | }
 99 | return result;
100 | };
101 | const isHidden = (filePath: string): boolean => {
102 | const baseName = path.basename(filePath);
103 | return baseName.startsWith(".");
104 | };
105 | const shouldInclude = (
106 | filePath: string,
107 | { excludePatterns, ignoreHidden }: IDocumentConfig
108 | ): boolean => {
109 | if (ignoreHidden && isHidden(filePath)) {
110 | return false;
111 | }
112 | const isExcluded = excludePatterns.some(pattern =>
113 | new RegExp(pattern.replace(/\*/g, ".*")).test(filePath)
114 | );
115 | return !isExcluded;
116 | };
117 | const isMatchingFile = (filePath: string, config: IDocumentConfig): boolean => {
118 | if (!config.pattern) {
119 | throw new Error("Pattern is not defined in the config");
120 | }
121 | if (!shouldInclude(filePath, config)) {
122 | return false;
123 | }
124 | return config.pattern.test(filePath);
125 | };
126 | const formatSize = (bytes: number): string => {
127 | const units = ["B", "KB", "MB", "GB"];
128 | let size = bytes;
129 | let unitIndex = 0;
130 | while (size >= 1024 && unitIndex < units.length - 1) {
131 | size /= 1024;
132 | unitIndex++;
133 | }
134 | return `${size.toFixed(2)} ${units[unitIndex]}`;
135 | };
136 | async function* walkDirectory(dir: string): AsyncGenerator<string> {
137 | const entries = await fs.readdir(dir, { withFileTypes: true });
138 | for (const entry of entries) {
139 | const fullPath = path.join(dir, entry.name);
140 | if (entry.isDirectory()) {
141 | yield* walkDirectory(fullPath);
142 | } else {
143 | yield fullPath;
144 | }
145 | }
146 | }
147 | const formatContentWithLineNumbers = (content: string): string => {
148 | const lines = content.split("\n");
149 | const lineNumberWidth = lines.length.toString().length;
150 | return lines
151 | .map((line, index) => {
152 | const lineNumber = (index + 1).toString().padStart(lineNumberWidth, " ");
153 | return `${lineNumber} | ${line}`;
154 | })
155 | .join("\n");
156 | };
157 | const generateFileSection = (
158 | file: IFileInfo,
159 | compress: boolean = false
160 | ): string =>
161 | !compress
162 | ? `
163 | ## File: ${file.name}
164 | - Path: \`${file.path}\`
165 | - Size: ${formatSize(Number(file.size))}
166 | - Extension: ${file.ext}
167 | - Lines of code: ${file.lines}
168 | - Content:
169 | \`\`\`${file.ext.slice(1) || "plaintext"}
170 | ${formatContentWithLineNumbers(file.content)}
171 | \`\`\`
172 | ---------------------------------------------------------------------------
173 | `
174 | : `
175 | ## File: ${file.name}, Path: \`${file.path}\`
176 | \`\`\`${file.ext.slice(1) || "plaintext"}
177 | ${formatContentWithLineNumbers(file.content)}
178 | \`\`\``;
179 | const generateMarkdownContent = (
180 | files: IFileInfo[],
181 | treeContent: string,
182 | compress: boolean
183 | ): string =>
184 | !compress
185 | ? `
186 | # Code Documentation
187 | Generated on: ${new Date().toISOString()}
188 | Total files: ${files.length}
189 | ## Project Structure
190 | \`\`\`
191 | ${treeContent}
192 | \`\`\`
193 | ${files.map(file => generateFileSection(file)).join("\n")}
194 | `
195 | : `
196 | # Code documentation
197 | \`\`\`
198 | ${treeContent}
199 | \`\`\`
200 | ${files.map(file => generateFileSection(file, true)).join("\n")}
201 | `;
202 | const compressContent = (content: string): string =>
203 | content
204 | .split("\n")
205 | .map(line => line.trim())
206 | .filter(line => line !== "")
207 | .filter(line => !line.startsWith("//"))
208 | .join("\n");
209 | async function generateFileInfo(
210 | filePath: string,
211 | stats: Stats,
212 | compress: boolean
213 | ): Promise<IFileInfo> {
214 | const content = await fs.readFile(filePath, "utf-8");
215 | return {
216 | name: path.basename(filePath),
217 | path: filePath,
218 | content: compress ? compressContent(content) : content,
219 | ext: path.extname(filePath),
220 | size: stats.size,
221 | lines: content.split("\n").filter(line => line.trim() !== "").length
222 | };
223 | }
224 | async function generateDocumentation(
225 | userConfig: Partial<IDocumentConfig> = {}
226 | ): Promise<void> {
227 | try {
228 | const config: IDocumentConfig = { ...DEFAULT_CONFIG, ...userConfig };
229 | const files: IFileInfo[] = [];
230 | const rootNode = await createTreeNode(config.rootDir, config);
231 | const treeContent = rootNode
232 | ? renderTreeNode(rootNode).join("\n")
233 | : "No matching files found";
234 | for await (const filePath of walkDirectory(config.rootDir)) {
235 | if (!isMatchingFile(filePath, config)) {
236 | continue;
237 | }
238 | const stats = await fs.stat(filePath);
239 | if (stats.size > config.maxFileSize) {
240 | continue;
241 | }
242 | const fileInfo = await generateFileInfo(filePath, stats, config.compress);
243 | files.push(fileInfo);
244 | }
245 | const markdownContent = generateMarkdownContent(
246 | files,
247 | treeContent,
248 | config.compress
249 | );
250 | await fs.writeFile(config.outputPath, markdownContent, "utf-8");
251 | } catch (error) {
252 | console.error("Error generating documentation", error);
253 | throw error;
254 | }
255 | }
256 | if (require.main === module) {
257 | generateDocumentation({
258 | pattern: /\.ts$/,
259 | outputPath: "demo_compressed.md",
260 | ignoreHidden: true,
261 | excludePatterns: [
262 | "node_modules",
263 | "dist",
264 | "coverage",
265 | "**/__tests__",
266 | "**/*.test.ts"
267 | ],
268 | compress: true
269 | }).catch(console.error);
270 | }
```

## File: GenerateCommand.ts, Path: `/root/git/codewrangler/src/cli/commands/GenerateCommand.ts`
```ts
 1 | import { ICommand, ICommandOptions } from "./types";
 2 | import { DocumentTreeBuilder } from "../../services/builder/DocumentTreeBuilder";
 3 | import { HTMLRenderStrategy } from "../../services/renderer/strategies/HTMLStrategy";
 4 | import { MarkdownStrategy } from "../../services/renderer/strategies/MarkdownStrategy";
 5 | import { Config } from "../../utils/config/Config";
 6 | import { logger } from "../../utils/logger/Logger";
 7 | const CONFIG_FROM_FORMAT = {
 8 | markdown: MarkdownStrategy,
 9 | html: HTMLRenderStrategy
10 | } as const;
11 | export class GenerateCommand implements ICommand {
12 | public constructor(private config: Config) {}
13 | public async execute(
14 | args: string[],
15 | options: ICommandOptions
16 | ): Promise<void> {
17 | try {
18 | this.config.override({ ...options, pattern: args[0] });
19 | if (options.verbose) {
20 | this.logVerbose();
21 | }
22 | const outputFormat = this.config.get("outputFormat");
23 | outputFormat.map(format => new CONFIG_FROM_FORMAT[format](this.config));
24 | const builder = new DocumentTreeBuilder(this.config);
25 | const root = await builder.build();
26 | } catch (error) {
27 | logger.error("Generation failed:", error as Error);
28 | throw error;
29 | }
30 | }
31 | private logVerbose(): void {
32 | logger.debug(
33 | `Searching for file matching pattern: ${this.config.get("pattern")}`
34 | );
35 | logger.debug(
36 | `Excluding patterns: ${(
37 | this.config.get("excludePatterns") as string[]
38 | ).join(", ")}`
39 | );
40 | logger.debug(
41 | `Ignoring hidden files: ${this.config.get("ignoreHiddenFiles")}`
42 | );
43 | logger.debug(`Max file size: ${this.config.get("maxFileSize")} bytes`);
44 | }
45 | }
```

## File: types.ts, Path: `/root/git/codewrangler/src/cli/commands/types.ts`
```ts
 1 | export interface ICommandOptions {
 2 | dir?: string;
 3 | output?: string;
 4 | config?: string;
 5 | verbose?: boolean;
 6 | format?: string[];
 7 | maxSize?: number;
 8 | exclude?: string[];
 9 | ignoreHidden?: boolean;
10 | additionalIgnore?: string[];
11 | }
12 | export interface ICommand {
13 | execute: (args: string[], options: ICommandOptions) => Promise<void>;
14 | }
```

## File: index.ts, Path: `/root/git/codewrangler/src/cli/index.ts`
```ts
 1 | #!/usr/bin/env node
 2 | import { CodeWrangler } from "./CodeWrangler";
 3 | import { logger } from "../utils/logger/Logger";
 4 | async function main(): Promise<void> {
 5 | try {
 6 | await CodeWrangler.run();
 7 | } catch (error) {
 8 | if (error instanceof Error) {
 9 | logger.error(error.message);
10 | } else {
11 | logger.error("An unknown error occurred");
12 | }
13 | process.exit(1);
14 | }
15 | }
16 | main().catch(() => process.exit(1));
```

## File: ProgramBuilder.ts, Path: `/root/git/codewrangler/src/cli/program/ProgramBuilder.ts`
```ts
 1 | import { Command } from "commander";
 2 | import { Config } from "../../utils/config/Config";
 3 | export class ProgramBuilder {
 4 | private program: Command;
 5 | public constructor(
 6 | private config: Config,
 7 | private version: string
 8 | ) {
 9 | this.program = new Command();
10 | }
11 | public build(): Command {
12 | this.buildVersion().buildDescription().buildArguments().buildOptions();
13 | return this.program;
14 | }
15 | private buildVersion(): ProgramBuilder {
16 | this.program.version(this.version);
17 | return this;
18 | }
19 | private buildDescription(): ProgramBuilder {
20 | this.program.description("CodeWrangler is a tool for generating code");
21 | return this;
22 | }
23 | private buildArguments(): ProgramBuilder {
24 | this.program.argument(
25 | "<pattern>",
26 | 'File pattern to match (e.g., "\\.ts$" for TypeScript files)'
27 | );
28 | return this;
29 | }
30 | private buildOptions(): ProgramBuilder {
31 | this.program
32 | .option("-d, --dir <dir>", "Directory to search", this.config.get("dir"))
33 | .option(
34 | "-c, --config <config>",
35 | "Config file",
36 | this.config.get("codeConfigFile")
37 | )
38 | .option("-v, --verbose", "Verbose mode", this.config.get("logLevel"))
39 | .option(
40 | "-f, --format <format>",
41 | "Output format",
42 | this.config.get("outputFormat")
43 | )
44 | .option(
45 | "-o, --output <output>",
46 | "Output file",
47 | this.config.get("outputFile")
48 | )
49 | .option(
50 | "-e, --exclude <exclude>",
51 | "Exclude patterns",
52 | this.config.get("excludePatterns")
53 | )
54 | .option(
55 | "-i, --ignore-hidden",
56 | "Ignore hidden files",
57 | this.config.get("ignoreHiddenFiles")
58 | )
59 | .option(
60 | "-a, --additional-ignore <additional-ignore>",
61 | "Additional ignore patterns",
62 | this.config.get("additionalIgnoreFiles")
63 | );
64 | return this;
65 | }
66 | }
```

## File: NodeBase.ts, Path: `/root/git/codewrangler/src/core/entities/NodeBase.ts`
```ts
  1 | import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
  2 | import { IRenderStrategy } from "../../services/renderer/RenderStrategy";
  3 | import { IFileStats, IPropsNode } from "../../types/type";
  4 | const defaultProps: IPropsNode = {
  5 | name: "",
  6 | path: "",
  7 | deep: 0,
  8 | size: 0, // size of the node from the children nodes
  9 | stats: {
 10 | size: 0, // size of the node from the file system
 11 | created: new Date(),
 12 | modified: new Date(),
 13 | accessed: new Date(),
 14 | isDirectory: false,
 15 | isFile: false,
 16 | permissions: {
 17 | readable: false,
 18 | writable: false,
 19 | executable: false
 20 | }
 21 | }
 22 | };
 23 | export interface INodeContent {
 24 | content: string;
 25 | }
 26 | interface INodeLifeCycle {
 27 | validate: () => boolean;
 28 | bundle: (deep: number) => Promise<void>;
 29 | render: (strategy: IRenderStrategy) => INodeContent;
 30 | dispose: () => void;
 31 | clone: () => NodeBase;
 32 | }
 33 | export abstract class NodeBase implements INodeLifeCycle {
 34 | protected _props: IPropsNode = { ...defaultProps };
 35 | public constructor(
 36 | _name: string,
 37 | private originalPath: string
 38 | ) {
 39 | this.initNode(_name, originalPath);
 40 | this.validate();
 41 | }
 42 | public validate(): boolean {
 43 | if (!documentFactory.exists(this.path)) {
 44 | throw new Error(`Path ${this.originalPath} does not exist`);
 45 | }
 46 | if (!documentFactory.isAbsolute(this.path)) {
 47 | throw new Error(`Path ${this.originalPath} is not absolute`);
 48 | }
 49 | return true;
 50 | }
 51 | public abstract bundle(deep: number): Promise<void>;
 52 | public abstract render(strategy: IRenderStrategy): INodeContent;
 53 | public abstract get secondaryProps(): Record<string, unknown> | undefined;
 54 | get deep(): number {
 55 | return this._props.deep;
 56 | }
 57 | set deep(deep: number) {
 58 | this._props.deep = deep;
 59 | }
 60 | get size(): number {
 61 | return this._props.size;
 62 | }
 63 | set size(size: number) {
 64 | this._props.size = size;
 65 | }
 66 | get name(): string {
 67 | return this._props.name;
 68 | }
 69 | set name(name: string) {
 70 | this._props.name = name;
 71 | }
 72 | get path(): string {
 73 | return this._props.path;
 74 | }
 75 | set path(path: string) {
 76 | this._props.path = path;
 77 | }
 78 | get stats(): IFileStats | undefined {
 79 | return this._props.stats;
 80 | }
 81 | set stats(stats: IFileStats | undefined) {
 82 | this._props.stats = stats;
 83 | }
 84 | get props(): IPropsNode {
 85 | return {
 86 | ...this._props,
 87 | ...this.secondaryProps
 88 | };
 89 | }
 90 | public dispose(): void {
 91 | this._props = { ...defaultProps };
 92 | }
 93 | public clone(): NodeBase {
 94 | return Object.assign(Object.create(this), this);
 95 | }
 96 | private initNode(name: string, path: string): void {
 97 | this.deep = 0;
 98 | this.size = 0;
 99 | this.name = name;
100 | this.path = documentFactory.resolve(path);
101 | }
102 | }
```

## File: NodeDirectory.ts, Path: `/root/git/codewrangler/src/core/entities/NodeDirectory.ts`
```ts
 1 | import { INodeContent, NodeBase } from "./NodeBase";
 2 | import { NodeFile } from "./NodeFile";
 3 | import { fileStatsService } from "../../infrastructure/filesystem/FileStats";
 4 | import { IRenderStrategy } from "../../services/renderer/RenderStrategy";
 5 | interface IPropsDirectory {
 6 | length: number;
 7 | deepLength: number;
 8 | }
 9 | const defaultPropsDirectory: IPropsDirectory = {
10 | length: 0,
11 | deepLength: 0
12 | };
13 | export abstract class NodeDirectory extends NodeBase {
14 | public children: (NodeFile | NodeDirectory)[] = [];
15 | private _propsDirectory: IPropsDirectory = { ...defaultPropsDirectory };
16 | public constructor(name: string, pathName: string) {
17 | super(name, pathName);
18 | this.initDirectory();
19 | }
20 | public get length(): number {
21 | return this._propsDirectory.length;
22 | }
23 | public set length(length: number) {
24 | this._propsDirectory.length = length;
25 | }
26 | public get deepLength(): number {
27 | return this._propsDirectory.deepLength;
28 | }
29 | public set deepLength(deepLength: number) {
30 | this._propsDirectory.deepLength = deepLength;
31 | }
32 | public get secondaryProps(): Record<string, unknown> {
33 | return {
34 | ...this._propsDirectory
35 | };
36 | }
37 | public addChild(child: NodeFile | NodeDirectory): NodeDirectory {
38 | if (!(child instanceof NodeFile || child instanceof NodeDirectory)) {
39 | throw new Error("Invalid child type");
40 | }
41 | this.children.push(child);
42 | return this;
43 | }
44 | public async bundle(deep: number = 0): Promise<void> {
45 | this.deep = deep;
46 | await Promise.all(this.children.map(child => child.bundle(deep + 1)));
47 | this.length = this.children.filter(
48 | child => child instanceof NodeFile
49 | ).length;
50 | this.deepLength = this.children.reduce(
51 | (acc, child) =>
52 | acc + (child instanceof NodeDirectory ? child.deepLength + 1 : 1),
53 | 0
54 | );
55 | this.size = this.children.reduce((acc, child) => acc + child.size, 0);
56 | this.stats = await fileStatsService(this.path);
57 | }
58 | public abstract override render(strategy: IRenderStrategy): INodeContent;
59 | private initDirectory(): void {
60 | this.children = [];
61 | this._propsDirectory = { ...defaultPropsDirectory };
62 | }
63 | }
64 | export class RenderableDirectory extends NodeDirectory {
65 | public override render(strategy: IRenderStrategy): INodeContent {
66 | return {
67 | content: strategy.renderDirectory(this)
68 | };
69 | }
70 | }
```

## File: NodeFile.ts, Path: `/root/git/codewrangler/src/core/entities/NodeFile.ts`
```ts
 1 | import { INodeContent, NodeBase } from "./NodeBase";
 2 | import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
 3 | import { fileStatsService } from "../../infrastructure/filesystem/FileStats";
 4 | import { IRenderStrategy } from "../../services/renderer/RenderStrategy";
 5 | interface IPropsFile {
 6 | extension: string;
 7 | }
 8 | const defaultPropsFile: IPropsFile = {
 9 | extension: ""
10 | };
11 | export abstract class NodeFile extends NodeBase {
12 | private _propsFile: IPropsFile = { ...defaultPropsFile };
13 | private _content: string | null = null;
14 | public constructor(name: string, pathName: string) {
15 | super(name, pathName);
16 | this.initFile(name);
17 | }
18 | public get extension(): string {
19 | return this._propsFile.extension;
20 | }
21 | protected set extension(extension: string) {
22 | this._propsFile.extension = extension;
23 | }
24 | public get content(): string | null {
25 | return this._content;
26 | }
27 | protected set content(content: string | null) {
28 | this._content = content;
29 | }
30 | public get secondaryProps(): Record<string, unknown> | undefined {
31 | return {
32 | extension: this.extension
33 | };
34 | }
35 | public async bundle(deep: number = 0): Promise<void> {
36 | this.deep = deep;
37 | this.size = await documentFactory.size(this.path);
38 | this.content = await documentFactory.readFile(this.path);
39 | this.stats = await fileStatsService(this.path);
40 | }
41 | public abstract override render(strategy: IRenderStrategy): INodeContent;
42 | private initFile(name: string): void {
43 | this._propsFile = { ...defaultPropsFile };
44 | this.extension = documentFactory.extension(name);
45 | this._content = null;
46 | }
47 | }
48 | export class RenderableFile extends NodeFile {
49 | public override render(strategy: IRenderStrategy): INodeContent {
50 | return {
51 | content: strategy.renderFile(this)
52 | };
53 | }
54 | public override async dispose(): Promise<void> {
55 | await super.dispose();
56 | }
57 | }
```

## File: DirectoryNotFoundError.ts, Path: `/root/git/codewrangler/src/core/errors/DirectoryNotFoundError.ts`
```ts
1 | import { DocumentError } from "./DocumentError";
2 | export class DirectoryNotFoundError extends DocumentError {
3 | public constructor(path: string) {
4 | super("Directory not found", path);
5 | this.name = "DirectoryNotFoundError";
6 | }
7 | }
```

## File: DocumentError.ts, Path: `/root/git/codewrangler/src/core/errors/DocumentError.ts`
```ts
1 | export class DocumentError extends Error {
2 | public constructor(
3 | message: string,
4 | public readonly path: string
5 | ) {
6 | super(`Document error at ${path}: ${message}`);
7 | this.name = "DocumentError";
8 | }
9 | }
```

## File: FileNotFoundError.ts, Path: `/root/git/codewrangler/src/core/errors/FileNotFoundError.ts`
```ts
1 | import { DocumentError } from "./DocumentError";
2 | export class FileNotFoundError extends DocumentError {
3 | public constructor(path: string) {
4 | super("File not found", path);
5 | this.name = "FileNotFoundError";
6 | }
7 | }
```

## File: index.ts, Path: `/root/git/codewrangler/src/core/errors/index.ts`
```ts
1 | export { DocumentError } from "./DocumentError";
2 | export { DirectoryNotFoundError } from "./DirectoryNotFoundError";
3 | export { FileNotFoundError } from "./FileNotFoundError";
```

## File: DocumentFactory.ts, Path: `/root/git/codewrangler/src/infrastructure/filesystem/DocumentFactory.ts`
```ts
  1 | import { ObjectEncodingOptions } from "fs";
  2 | import * as fsSync from "fs";
  3 | import * as fs from "fs/promises";
  4 | import * as path from "path";
  5 | import { fileStatsService } from "./FileStats";
  6 | import { DocumentError, FileNotFoundError } from "../../core/errors";
  7 | import {
  8 | FILE_TYPE,
  9 | FileType,
 10 | IDirectoryOptions,
 11 | IReadOptions,
 12 | IWriteOptions
 13 | } from "../../types/type";
 14 | export const documentFactory = {
 15 | /**
 16 | * Gets the type of a file system entry
 17 | * @param filePath - The path to check
 18 | * @returns The type of the file system entry (File or Directory)
 19 | * @throws {FileNotFoundError} If the path doesn't exist
 20 | * @throws {DocumentError} For other file system errors
 21 | */
 22 | async type(filePath: string): Promise<FileType> {
 23 | try {
 24 | const stats = await fs.stat(filePath);
 25 | return stats.isDirectory() ? FILE_TYPE.Directory : FILE_TYPE.File;
 26 | } catch (error) {
 27 | if ((error as NodeJS.ErrnoException).code === "ENOENT") {
 28 | throw new FileNotFoundError(filePath);
 29 | }
 30 | throw new DocumentError(String(error), filePath);
 31 | }
 32 | },
 33 | /**
 34 | * Gets file size in bytes
 35 | * @param filePath - The path to the file
 36 | * @returns The size of the file in bytes
 37 | * @throws {FileNotFoundError} If the file doesn't exist
 38 | * @throws {DocumentError} For other file system errors or if path is a directory
 39 | */
 40 | async size(filePath: string): Promise<number> {
 41 | const isDirectory = (await this.type(filePath)) === FILE_TYPE.Directory;
 42 | if (isDirectory) {
 43 | throw new DocumentError("Path is a directory", filePath);
 44 | }
 45 | const stats = await fileStatsService(filePath);
 46 | return stats.size;
 47 | },
 48 | /**
 49 | * Resolves a path to an absolute path
 50 | * @param filePath - The path to resolve
 51 | * @returns The absolute path
 52 | */
 53 | resolve(filePath: string): string {
 54 | return path.resolve(filePath);
 55 | },
 56 | /**
 57 | * Checks various access flags for a path
 58 | * @private
 59 | * @param filePath - The path to check access for
 60 | * @returns An object containing readable, writable, and executable permission flags
 61 | */
 62 | async checkAccess(filePath: string): Promise<{
 63 | readable: boolean;
 64 | writable: boolean;
 65 | executable: boolean;
 66 | }> {
 67 | const check = async (mode: number): Promise<boolean> => {
 68 | try {
 69 | await fs.access(filePath, mode);
 70 | return true;
 71 | } catch {
 72 | return false;
 73 | }
 74 | };
 75 | return {
 76 | readable: await check(fs.constants.R_OK),
 77 | writable: await check(fs.constants.W_OK),
 78 | executable: await check(fs.constants.X_OK)
 79 | };
 80 | },
 81 | /**
 82 | * Reads the entire contents of a file synchronously
 83 | * @param filePath - The path to the file
 84 | * @param options - The options for the read operation
 85 | * @returns The contents of the file as a string
 86 | * @throws {Error} If the file cannot be read
 87 | */
 88 | readFileSync(filePath: string, options: IReadOptions = {}): string {
 89 | return fsSync.readFileSync(filePath, {
 90 | encoding: options.encoding ?? "utf-8",
 91 | flag: options.flag
 92 | });
 93 | },
 94 | /**
 95 | * Reads the entire contents of a file
 96 | * @param filePath - The path to the file
 97 | * @param options - The options for the read operation
 98 | * @returns The contents of the file as a string
 99 | * @throws {FileNotFoundError} If the file doesn't exist
100 | * @throws {DocumentError} For other file system errors
101 | */
102 | async readFile(
103 | filePath: string,
104 | options: IReadOptions = {}
105 | ): Promise<string> {
106 | try {
107 | return await fs.readFile(filePath, {
108 | encoding: options.encoding ?? "utf-8",
109 | flag: options.flag
110 | });
111 | } catch (error) {
112 | if ((error as NodeJS.ErrnoException).code === "ENOENT") {
113 | throw new FileNotFoundError(filePath);
114 | }
115 | throw new DocumentError(String(error), filePath);
116 | }
117 | },
118 | /**
119 | * Writes data to a file, replacing the file if it already exists
120 | * @param filePath - The path to the file
121 | * @param data - The data to write
122 | * @param options - The options for the write operation
123 | * @throws {DocumentError} For file system errors
124 | */
125 | async writeFile(
126 | filePath: string,
127 | data: string | Buffer,
128 | options: IWriteOptions = {}
129 | ): Promise<void> {
130 | try {
131 | await fs.writeFile(filePath, data, {
132 | encoding: options.encoding ?? "utf-8",
133 | mode: options.mode,
134 | flag: options.flag
135 | });
136 | } catch (error) {
137 | throw new DocumentError(String(error), filePath);
138 | }
139 | },
140 | /**
141 | * Appends data to a file
142 | * @param filePath - The path to the file
143 | * @param content - The content to append
144 | * @param options - The options for the write operation
145 | * @throws {DocumentError} For file system errors
146 | */
147 | async appendFile(
148 | filePath: string,
149 | content: string,
150 | options: IWriteOptions = {}
151 | ): Promise<void> {
152 | try {
153 | await fs.appendFile(filePath, content, {
154 | encoding: options.encoding ?? "utf-8",
155 | mode: options.mode,
156 | flag: options.flag
157 | });
158 | } catch (error) {
159 | throw new DocumentError(String(error), filePath);
160 | }
161 | },
162 | /**
163 | * Reads the contents of a directory
164 | * @param dirPath - The path to the directory
165 | * @param options - The options for the read operation
166 | * @returns An array of file and directory names in the directory
167 | * @throws {Error} If the directory cannot be read
168 | */
169 | async readDir(
170 | dirPath: string,
171 | options?: { withFileTypes?: boolean }
172 | ): Promise<string[]> {
173 | return await fs.readdir(dirPath, options as ObjectEncodingOptions);
174 | },
175 | /**
176 | * Creates a directory if it doesn't exist
177 | * @param dirPath - The path where to create the directory
178 | * @param recursive - Whether to create parent directories if they don't exist
179 | * @throws {DocumentError} For file system errors
180 | */
181 | async createDir(dirPath: string, recursive = true): Promise<void> {
182 | await fs.mkdir(dirPath, { recursive });
183 | },
184 | /**
185 | * Gets the base name of a file
186 | * @param filePath - The path to the file
187 | * @returns The base name of the file (last portion of the path)
188 | */
189 | baseName(filePath: string): string {
190 | return path.basename(filePath);
191 | },
192 | /**
193 | * Gets the extension of a file
194 | * @param filePath - The path to the file
195 | * @returns The extension of the file including the dot (e.g., '.txt')
196 | */
197 | extension(filePath: string): string {
198 | return path.extname(filePath);
199 | },
200 | /**
201 | * Checks if a file or directory exists
202 | * @param filePath - The path to check
203 | * @returns True if the file or directory exists, false otherwise
204 | */
205 | exists(filePath: string): boolean {
206 | try {
207 | fsSync.accessSync(filePath);
208 | return true;
209 | } catch {
210 | return false;
211 | }
212 | },
213 | /**
214 | * Checks if a path is absolute
215 | * @param filePath - The path to check
216 | * @returns True if the path is absolute, false otherwise
217 | */
218 | isAbsolute(filePath: string): boolean {
219 | return path.isAbsolute(filePath);
220 | },
221 | /**
222 | * Gets directory contents with type information
223 | * @param dirPath - The path to the directory
224 | * @returns An array of objects containing name and type information for each entry
225 | * @throws {DocumentError} If path is not a directory or other errors occur
226 | */
227 | async readDirectory(
228 | dirPath: string
229 | ): Promise<Array<{ name: string; type: FileType }>> {
230 | try {
231 | const entries = await fs.readdir(dirPath, { withFileTypes: true });
232 | return entries.map(entry => ({
233 | name: entry.name,
234 | type: entry.isDirectory() ? FILE_TYPE.Directory : FILE_TYPE.File
235 | }));
236 | } catch (error) {
237 | throw new DocumentError(String(error), dirPath);
238 | }
239 | },
240 | /**
241 | * Creates a directory if it doesn't exist
242 | * @param dirPath - The path where to create the directory
243 | * @param options - Options for directory creation including recursive and mode
244 | * @throws {DocumentError} For file system errors
245 | */
246 | async ensureDirectory(
247 | dirPath: string,
248 | options: IDirectoryOptions = {}
249 | ): Promise<void> {
250 | try {
251 | if (!this.exists(dirPath)) {
252 | await fs.mkdir(dirPath, {
253 | recursive: options.recursive ?? true,
254 | mode: options.mode
255 | });
256 | }
257 | } catch (error) {
258 | throw new DocumentError(String(error), dirPath);
259 | }
260 | },
261 | /**
262 | * Removes a file or directory
263 | * @param filePath - The path to remove
264 | * @throws {DocumentError} For file system errors
265 | */
266 | async remove(filePath: string): Promise<void> {
267 | const stats = await fs.stat(filePath);
268 | if (stats.isDirectory()) {
269 | await fs.rm(filePath, { recursive: true, force: true });
270 | } else {
271 | await fs.unlink(filePath);
272 | }
273 | },
274 | /**
275 | * Copies a file or directory
276 | * @param src - The source path
277 | * @param dest - The destination path
278 | * @throws {DocumentError} For file system errors
279 | */
280 | async copy(src: string, dest: string): Promise<void> {
281 | const stats = await fs.stat(src);
282 | if (stats.isDirectory()) {
283 | await this.copyDir(src, dest);
284 | } else {
285 | await fs.copyFile(src, dest);
286 | }
287 | },
288 | /**
289 | * Copies a directory recursively
290 | * @private
291 | * @param src - The source directory path
292 | * @param dest - The destination directory path
293 | * @throws {DocumentError} For file system errors
294 | */
295 | async copyDir(src: string, dest: string): Promise<void> {
296 | await this.ensureDirectory(dest);
297 | const entries = await fs.readdir(src, { withFileTypes: true });
298 | for (const entry of entries) {
299 | const srcPath = path.join(src, entry.name);
300 | const destPath = path.join(dest, entry.name);
301 | if (entry.isDirectory()) {
302 | await this.copyDir(srcPath, destPath);
303 | } else {
304 | await fs.copyFile(srcPath, destPath);
305 | }
306 | }
307 | },
308 | /**
309 | * Joins an array of paths into a single path
310 | * @param paths - The paths to join
311 | * @returns The joined path
312 | */
313 | join(...paths: string[]): string {
314 | return path.join(...paths);
315 | }
316 | };
```

## File: FileStats.ts, Path: `/root/git/codewrangler/src/infrastructure/filesystem/FileStats.ts`
```ts
 1 | import { Stats } from "fs";
 2 | import fs from "fs/promises";
 3 | import { DocumentError } from "../../core/errors/DocumentError";
 4 | import { FileNotFoundError } from "../../core/errors/FileNotFoundError";
 5 | import { IAccessFlags, IFileStats } from "../../types/type";
 6 | class FileStatsService {
 7 | public async getStats(filePath: string): Promise<IFileStats> {
 8 | const stats = await this.getBasicStats(filePath);
 9 | const accessFlags = await this.checkAccess(filePath);
10 | return this.mapStatsToFileInfo(stats, accessFlags);
11 | }
12 | private async getBasicStats(filePath: string): Promise<Stats> {
13 | try {
14 | return await fs.stat(filePath);
15 | } catch (error) {
16 | this.handleStatError(error as NodeJS.ErrnoException, filePath);
17 | throw error; // TypeScript requires this
18 | }
19 | }
20 | private handleStatError(
21 | error: NodeJS.ErrnoException,
22 | filePath: string
23 | ): never {
24 | if (error.code === "ENOENT") {
25 | throw new FileNotFoundError(filePath);
26 | }
27 | throw new DocumentError(String(error), filePath);
28 | }
29 | private async checkAccess(filePath: string): Promise<IAccessFlags> {
30 | const check = async (mode: number): Promise<boolean> => {
31 | try {
32 | await fs.access(filePath, mode);
33 | return true;
34 | } catch {
35 | return false;
36 | }
37 | };
38 | return {
39 | readable: await check(fs.constants.R_OK),
40 | writable: await check(fs.constants.W_OK),
41 | executable: await check(fs.constants.X_OK)
42 | };
43 | }
44 | private mapStatsToFileInfo(
45 | stats: Stats,
46 | accessFlags: IAccessFlags
47 | ): IFileStats {
48 | return {
49 | size: stats.size,
50 | created: stats.birthtime,
51 | modified: stats.mtime,
52 | accessed: stats.atime,
53 | isDirectory: stats.isDirectory(),
54 | isFile: stats.isFile(),
55 | permissions: accessFlags
56 | };
57 | }
58 | }
59 | export const fileStatsService = async (
60 | filePath: string
61 | ): Promise<IFileStats> => {
62 | const fileStatsService = new FileStatsService();
63 | return await fileStatsService.getStats(filePath);
64 | };
```

## File: JsonReader.ts, Path: `/root/git/codewrangler/src/infrastructure/filesystem/JsonReader.ts`
```ts
 1 | import fs from "fs/promises";
 2 | import { documentFactory } from "./DocumentFactory";
 3 | import { DocumentError } from "../../core/errors/DocumentError";
 4 | import { FileNotFoundError } from "../../core/errors/FileNotFoundError";
 5 | export class JsonReader {
 6 | public async readJsonSync(filePath: string): Promise<object> {
 7 | try {
 8 | const absolutePath = this.validatePath(filePath);
 9 | const content = await this.readFileContent(absolutePath, filePath);
10 | return this.parseJsonContent(content, filePath);
11 | } catch (error) {
12 | if (error instanceof DocumentError) {
13 | throw error;
14 | }
15 | throw new DocumentError(String(error), filePath);
16 | }
17 | }
18 | private validatePath(filePath: string): string {
19 | const absolutePath = documentFactory.resolve(filePath);
20 | if (!documentFactory.exists(absolutePath)) {
21 | throw new FileNotFoundError(filePath);
22 | }
23 | return absolutePath;
24 | }
25 | private async readFileContent(
26 | absolutePath: string,
27 | filePath: string
28 | ): Promise<string> {
29 | const content = await fs.readFile(absolutePath, "utf-8");
30 | if (!content) {
31 | throw new DocumentError(`File is empty`, filePath);
32 | }
33 | return content;
34 | }
35 | private parseJsonContent(content: string, filePath: string): object {
36 | try {
37 | return JSON.parse(content);
38 | } catch (error) {
39 | throw new DocumentError(`Invalid JSON: ${String(error)}`, filePath);
40 | }
41 | }
42 | }
43 | export const jsonReader = async (path: string): Promise<object> => {
44 | const jsonReader = new JsonReader();
45 | return await jsonReader.readJsonSync(path);
46 | };
```

## File: TemplateEngine.ts, Path: `/root/git/codewrangler/src/infrastructure/templates/TemplateEngine.ts`
```ts
  1 | import { ZodObject, z } from "zod";
  2 | import { TemplateType } from "../../types/template";
  3 | import { Config } from "../../utils/config";
  4 | import { logger } from "../../utils/logger";
  5 | import { documentFactory } from "../filesystem/DocumentFactory";
  6 | type TemplateValue = z.ZodType<string | number | boolean | undefined>;
  7 | export class Template<
  8 | T extends Record<string, TemplateValue> = Record<string, TemplateValue>
  9 | > {
 10 | private _content: string = "";
 11 | private schema: ZodObject<T>;
 12 | public constructor(
 13 | private type: TemplateType,
 14 | schema: ZodObject<T>
 15 | ) {
 16 | const optionalFields = Object.fromEntries(
 17 | Object.entries(schema.shape).map(([key, value]) => [
 18 | key,
 19 | value.optional()
 20 | ])
 21 | );
 22 | this.schema = schema.extend(optionalFields) as unknown as ZodObject<T>;
 23 | }
 24 | public async load(
 25 | path: string,
 26 | additionalFields?: Record<string, z.ZodSchema<string>>
 27 | ): Promise<void> {
 28 | this._content = await documentFactory.readFile(path);
 29 | if (additionalFields) {
 30 | this.schema = this.schema.extend(additionalFields) as ZodObject<T>;
 31 | }
 32 | this.validate();
 33 | }
 34 | public static getTemplateDir(config: Config): string {
 35 | const dir = documentFactory.join(
 36 | config.get("rootDir") as string,
 37 | config.get("templatesDir") as string
 38 | );
 39 | if (!documentFactory.exists(dir)) {
 40 | throw new Error(`Templates directory not found: ${dir}`);
 41 | }
 42 | return dir;
 43 | }
 44 | public get content(): string {
 45 | if (!this._content) {
 46 | throw new Error(`Template content is not loaded for ${this.type}`);
 47 | }
 48 | return this._content;
 49 | }
 50 | public static async create<T extends Record<string, TemplateValue>>(
 51 | type: TemplateType,
 52 | schema: ZodObject<T>,
 53 | path: string,
 54 | additionalFields?: Record<string, z.ZodSchema<string>>
 55 | ): Promise<Template<T>> {
 56 | const template = new Template(type, schema);
 57 | await template.load(path, additionalFields);
 58 | return template;
 59 | }
 60 | public render(data: Record<string, string | number | boolean>): string {
 61 | try {
 62 | this.validateData(data);
 63 | return this.replaceTokens(data);
 64 | } catch {
 65 | throw new Error(`Template content validation failed for ${this.type}`);
 66 | }
 67 | }
 68 | private validateData(data: Record<string, string | number | boolean>): void {
 69 | this.schema.parse(data);
 70 | this.validateRequiredTokens(data);
 71 | }
 72 | private validateRequiredTokens(
 73 | data: Record<string, string | number | boolean>
 74 | ): void {
 75 | const contentTokens = this.getTemplateTokens();
 76 | const missingTokens = this.findMissingRequiredTokens(contentTokens, data);
 77 | if (missingTokens.length > 0) {
 78 | throw new Error(
 79 | `Missing required values for tokens: ${missingTokens.join(", ")}`
 80 | );
 81 | }
 82 | }
 83 | private findMissingRequiredTokens(
 84 | tokens: string[],
 85 | data: Record<string, string | number | boolean>
 86 | ): string[] {
 87 | return tokens.filter(token => {
 88 | const isRequired = this.schema.shape[token]?.isOptional() === false;
 89 | return isRequired && !(token in data);
 90 | });
 91 | }
 92 | private getTemplateTokens(): string[] {
 93 | const tokenRegex = /\{\{(\w+)\}\}/g;
 94 | const tokens: string[] = [];
 95 | let match;
 96 | while ((match = tokenRegex.exec(this.content)) !== null) {
 97 | const token = match[1];
 98 | if (token === undefined) {
 99 | throw new Error(`Invalid template content for ${this.type}`);
100 | }
101 | tokens.push(token);
102 | }
103 | return tokens;
104 | }
105 | private replaceTokens(
106 | data: Record<string, string | number | boolean>
107 | ): string {
108 | const contentTokens = this.getTemplateTokens();
109 | const pattern = new RegExp(`\\{\\{(${contentTokens.join("|")})\\}\\}`, "g");
110 | return this.content.replace(pattern, (_, key) =>
111 | key in data ? String(data[key]) : `{{${key}}}`
112 | );
113 | }
114 | private validate(): void {
115 | const tokens = this.getTemplateTokens();
116 | const requiredFields = Object.keys(this.schema.shape);
117 | const missingRequired = requiredFields.filter(
118 | field => !tokens.includes(field)
119 | );
120 | if (missingRequired.length > 0) {
121 | logger.warn(
122 | `Missing required tokens in ${this.type} template: ${missingRequired.join(
123 | ", "
124 | )}`
125 | );
126 | }
127 | }
128 | }
```

## File: zod.ts, Path: `/root/git/codewrangler/src/infrastructure/templates/zod.ts`
```ts
 1 | import { z } from "zod";
 2 | export const baseTemplateSchema = z.object({
 3 | PROJECT_NAME: z.string(),
 4 | GENERATION_DATE: z.string().datetime(),
 5 | DIRECTORY_STRUCTURE: z.string(),
 6 | TOTAL_FILES: z.number(),
 7 | TOTAL_DIRECTORIES: z.number(),
 8 | TOTAL_SIZE: z.number(),
 9 | CONTENT: z.string()
10 | });
11 | export type BaseTemplate = z.infer<typeof baseTemplateSchema>;
12 | export type BaseTemplateString = keyof BaseTemplate;
13 | export const fileTemplateSchema = z.object({
14 | FILE_NAME: z.string(),
15 | FILE_EXTENSION: z.string(),
16 | FILE_SIZE: z.number(),
17 | FILE_DEPTH: z.number(),
18 | FILE_LINES: z.number(),
19 | FILE_PATH: z.string(),
20 | FILE_CONTENTS: z.string()
21 | });
22 | export type FileTemplate = z.infer<typeof fileTemplateSchema>;
23 | export type FileTemplateString = keyof FileTemplate;
24 | export const directoryTemplateSchema = z.object({
25 | DIRECTORY_NAME: z.string(),
26 | DIRECTORY_PATH: z.string(),
27 | DIRECTORY_SIZE: z.number(),
28 | DIRECTORY_LENGTH: z.number(),
29 | DIRECTORY_DEEP_LENGTH: z.number(),
30 | DIRECTORY_DEPTH: z.number(),
31 | DIRECTORY_CONTENT: z.string()
32 | });
33 | export type DirectoryTemplate = z.infer<typeof directoryTemplateSchema>;
34 | export type DirectoryTemplateString = keyof DirectoryTemplate;
```

## File: DocumentTreeBuilder.ts, Path: `/root/git/codewrangler/src/services/builder/DocumentTreeBuilder.ts`
```ts
 1 | import { INodeTree, NodeTreeBuilder } from "./NodeTreeBuilder";
 2 | import { RenderableDirectory } from "../../core/entities/NodeDirectory";
 3 | import { RenderableFile } from "../../core/entities/NodeFile";
 4 | import { FILE_TYPE } from "../../types/type";
 5 | import { Config } from "../../utils/config";
 6 | import { logger } from "../../utils/logger";
 7 | export class DocumentTreeBuilder {
 8 | private root: RenderableDirectory | RenderableFile | undefined;
 9 | private builder: NodeTreeBuilder;
10 | public constructor(config: Config) {
11 | this.builder = new NodeTreeBuilder(config);
12 | }
13 | public async build(): Promise<RenderableDirectory | RenderableFile | undefined> {
14 | try {
15 | const fileTree = await this.builder.build();
16 | this.root = await this.createDocumentStructure(fileTree);
17 | await this.root.bundle();
18 | logger.info("Document tree built successfully");
19 | return this.root;
20 | } catch (error) {
21 | logger.error("Error building document tree", error as Error);
22 | throw error;
23 | }
24 | }
25 | private async createDocumentStructure(
26 | node: INodeTree
27 | ): Promise<RenderableDirectory | RenderableFile> {
28 | if (node.type === FILE_TYPE.Directory) {
29 | const directory = new RenderableDirectory(node.name, node.path);
30 | if (node.children) {
31 | for (const child of node.children) {
32 | const childDocument = await this.createDocumentStructure(child);
33 | directory.addChild(childDocument);
34 | }
35 | }
36 | return directory;
37 | } else {
38 | return new RenderableFile(node.name, node.path);
39 | }
40 | }
41 | }
```

## File: FileHidden.ts, Path: `/root/git/codewrangler/src/services/builder/FileHidden.ts`
```ts
 1 | import { minimatch } from "minimatch";
 2 | import { Config } from "../../utils/config";
 3 | export default class FileHidden {
 4 | private ignoreHiddenFiles: boolean;
 5 | private patterns: string[];
 6 | private additionalIgnoreFiles: string[];
 7 | public constructor(config: Config) {
 8 | this.ignoreHiddenFiles = config.get("ignoreHiddenFiles") as boolean;
 9 | this.patterns = [...config.get("excludePatterns")];
10 | this.additionalIgnoreFiles = config.get("additionalIgnoreFiles");
11 | }
12 | public shouldExclude(fileName: string): boolean {
13 | if (this.ignoreHiddenFiles && fileName.startsWith(".")) {
14 | return true;
15 | }
16 | if (this.patterns.some(pattern => minimatch(fileName, pattern))) {
17 | return true;
18 | }
19 | if (this.additionalIgnoreFiles.some(file => minimatch(fileName, file))) {
20 | return true;
21 | }
22 | return false;
23 | }
24 | }
```

## File: NodeTreeBuilder.ts, Path: `/root/git/codewrangler/src/services/builder/NodeTreeBuilder.ts`
```ts
  1 | import FileHidden from "./FileHidden";
  2 | import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
  3 | import { fileStatsService } from "../../infrastructure/filesystem/FileStats";
  4 | import { FILE_TYPE, FileType } from "../../types/type";
  5 | import { Config, ConfigOptions } from "../../utils/config";
  6 | export interface INodeTree {
  7 | name: string;
  8 | path: string;
  9 | type: FileType;
 10 | children?: INodeTree[];
 11 | }
 12 | export interface INodeTreeBuilderOptions
 13 | extends Pick<
 14 | ConfigOptions,
 15 | | "additionalIgnoreFiles"
 16 | | "maxDepth"
 17 | | "excludePatterns"
 18 | | "dir"
 19 | | "followSymlinks"
 20 | > {
 21 | pattern: RegExp;
 22 | returnType: "paths" | "details";
 23 | }
 24 | export class NodeTreeBuilder {
 25 | private config: Config;
 26 | private options: INodeTreeBuilderOptions;
 27 | private fileHidden: FileHidden;
 28 | public constructor(config: Config) {
 29 | this.config = config;
 30 | this.options = this.initializeOptions();
 31 | this.fileHidden = new FileHidden(config);
 32 | }
 33 | public async build(): Promise<INodeTree> {
 34 | const rootDir = this.options.dir;
 35 | if (!documentFactory.exists(rootDir)) {
 36 | throw new Error(`Directory ${rootDir} does not exist`);
 37 | }
 38 | return await this.buildTree(rootDir);
 39 | }
 40 | private initializeOptions(): INodeTreeBuilderOptions {
 41 | return {
 42 | dir: this.config.get("dir"),
 43 | pattern: new RegExp(this.config.get("pattern")),
 44 | maxDepth: this.config.get("maxDepth"),
 45 | excludePatterns: this.config.get("excludePatterns"),
 46 | additionalIgnoreFiles: this.config.get("additionalIgnoreFiles"),
 47 | returnType: "details",
 48 | followSymlinks: false
 49 | };
 50 | }
 51 | private async createNode(nodePath: string): Promise<INodeTree> {
 52 | const stats = await fileStatsService(nodePath);
 53 | const name = documentFactory.baseName(nodePath);
 54 | return {
 55 | name,
 56 | path: nodePath,
 57 | type: stats.isDirectory ? FILE_TYPE.Directory : FILE_TYPE.File
 58 | };
 59 | }
 60 | private shouldProcessChildren(node: INodeTree, depth: number): boolean {
 61 | const isDirectory = node.type === FILE_TYPE.Directory;
 62 | const withinDepthLimit =
 63 | !this.options.maxDepth || depth < this.options.maxDepth;
 64 | return isDirectory && withinDepthLimit;
 65 | }
 66 | private async processChildren(
 67 | nodePath: string,
 68 | depth: number
 69 | ): Promise<INodeTree[]> {
 70 | const entries = await documentFactory.readDir(nodePath);
 71 | const children: INodeTree[] = [];
 72 | for (const entry of entries) {
 73 | const childNode = await this.processChild(nodePath, entry, depth);
 74 | if (childNode) {
 75 | children.push(childNode);
 76 | }
 77 | }
 78 | return children;
 79 | }
 80 | private async processChild(
 81 | parentPath: string,
 82 | entry: string,
 83 | depth: number
 84 | ): Promise<INodeTree | null> {
 85 | if (this.fileHidden.shouldExclude(entry)) {
 86 | return null;
 87 | }
 88 | const childPath = documentFactory.join(parentPath, entry);
 89 | return await this.buildTree(childPath, depth + 1);
 90 | }
 91 | private async buildTree(
 92 | nodePath: string,
 93 | depth: number = 0
 94 | ): Promise<INodeTree> {
 95 | const node = await this.createNode(nodePath);
 96 | if (this.shouldProcessChildren(node, depth)) {
 97 | node.children = await this.processChildren(nodePath, depth);
 98 | }
 99 | return node;
100 | }
101 | }
```

## File: RenderStrategy.ts, Path: `/root/git/codewrangler/src/services/renderer/RenderStrategy.ts`
```ts
  1 | import { NodeDirectory } from "../../core/entities/NodeDirectory";
  2 | import { NodeFile } from "../../core/entities/NodeFile";
  3 | import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
  4 | import { Template } from "../../infrastructure/templates/TemplateEngine";
  5 | import {
  6 | BaseTemplate,
  7 | DirectoryTemplate,
  8 | FileTemplate,
  9 | baseTemplateSchema,
 10 | directoryTemplateSchema,
 11 | fileTemplateSchema
 12 | } from "../../infrastructure/templates/zod";
 13 | import { TemplateType } from "../../types/template";
 14 | import { Config, OutputFormatExtension } from "../../utils/config";
 15 | interface IContentRenderer {
 16 | renderFile: (file: NodeFile) => string;
 17 | renderDirectory: (directory: NodeDirectory) => string;
 18 | }
 19 | interface ITemplateLoader {
 20 | loadTemplates: () => Promise<void>;
 21 | }
 22 | interface IDocumentRenderer {
 23 | render: (rootDirectory: NodeDirectory) => string;
 24 | dispose: () => void;
 25 | }
 26 | export interface IRenderStrategy
 27 | extends IContentRenderer,
 28 | ITemplateLoader,
 29 | IDocumentRenderer {}
 30 | export abstract class BaseRenderStrategy implements IRenderStrategy {
 31 | protected extension: OutputFormatExtension;
 32 | protected templates: Record<TemplateType, Template | null>;
 33 | protected config: Config;
 34 | protected constructor(config: Config, extension: OutputFormatExtension) {
 35 | this.config = config;
 36 | this.templates = {
 37 | page: null,
 38 | file: null,
 39 | directory: null
 40 | };
 41 | this.extension = extension;
 42 | }
 43 | public async loadTemplates(): Promise<void> {
 44 | const templateDir = Template.getTemplateDir(this.config);
 45 | this.templates = {
 46 | page: await Template.create(
 47 | "page",
 48 | baseTemplateSchema,
 49 | documentFactory.join(templateDir, `page.${this.extension}`)
 50 | ),
 51 | file: await Template.create(
 52 | "file",
 53 | fileTemplateSchema,
 54 | documentFactory.join(templateDir, `file.${this.extension}`)
 55 | ),
 56 | directory: await Template.create(
 57 | "directory",
 58 | directoryTemplateSchema,
 59 | documentFactory.join(templateDir, `directory.${this.extension}`)
 60 | )
 61 | };
 62 | }
 63 | public renderFile(file: NodeFile): string {
 64 | if (!this.templates.file) {
 65 | throw new Error("File template is not loaded");
 66 | }
 67 | return this.replaceSelectors(this.templates.file.content, {
 68 | FILE_NAME: file.name,
 69 | FILE_EXTENSION: file.extension,
 70 | FILE_SIZE: file.size,
 71 | FILE_CONTENTS: file.content || "",
 72 | ...file.props
 73 | });
 74 | }
 75 | public renderDirectory(directory: NodeDirectory): string {
 76 | const content = directory.children
 77 | .map(
 78 | child =>
 79 | child instanceof NodeFile
 80 | ? this.renderFile(child)
 81 | : this.renderDirectory(child) // save the rendering result on the object after bundling execution
 82 | )
 83 | .join("");
 84 | if (!this.templates.directory) {
 85 | throw new Error("Directory template is not loaded");
 86 | }
 87 | return this.replaceSelectors(this.templates.directory.content, {
 88 | DIRECTORY_NAME: directory.name,
 89 | DIRECTORY_PATH: directory.path,
 90 | DIRECTORY_SIZE: directory.size,
 91 | DIRECTORY_CONTENT: content,
 92 | ...directory.props
 93 | });
 94 | }
 95 | public render(rootDirectory: NodeDirectory): string {
 96 | const directoryContent = this.renderDirectory(rootDirectory);
 97 | if (!this.templates.page) {
 98 | throw new Error("Page template is not loaded");
 99 | }
100 | return this.replaceSelectors(this.templates.page.content, {
101 | PROJECT_NAME:
102 | this.config.get("projectName") || rootDirectory.name || "Project",
103 | GENERATION_DATE: new Date().toLocaleDateString(),
104 | DIRECTORY_STRUCTURE: directoryContent,
105 | TOTAL_FILES: rootDirectory.length,
106 | TOTAL_DIRECTORIES: rootDirectory.deepLength,
107 | TOTAL_SIZE: rootDirectory.size,
108 | CONTENT: directoryContent
109 | });
110 | }
111 | public dispose(): void {
112 | this.templates = {
113 | page: null,
114 | file: null,
115 | directory: null
116 | };
117 | }
118 | protected replaceSelectors(
119 | template: string,
120 | values: BaseTemplate | FileTemplate | DirectoryTemplate
121 | ): string {
122 | return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
123 | const typedKey = key as keyof typeof values;
124 | return values[typedKey] !== undefined
125 | ? String(values[typedKey])
126 | : `{{${key}}}`;
127 | });
128 | }
129 | }
```

## File: HTMLStrategy.ts, Path: `/root/git/codewrangler/src/services/renderer/strategies/HTMLStrategy.ts`
```ts
 1 | import { NodeFile } from "../../../core/entities/NodeFile";
 2 | import { Config } from "../../../utils/config";
 3 | import { OUTPUT_FORMATS } from "../../../utils/config/schema";
 4 | import { BaseRenderStrategy } from "../RenderStrategy";
 5 | export class HTMLRenderStrategy extends BaseRenderStrategy {
 6 | public constructor(config: Config) {
 7 | super(config, OUTPUT_FORMATS.html);
 8 | }
 9 | public override renderFile(file: NodeFile): string {
10 | const rendered = super.renderFile(file);
11 | return this.processCodeBlock(rendered, file.extension.replace(".", ""));
12 | }
13 | protected processCodeBlock(content: string, language: string): string {
14 | return `<pre><code class="language-${language}">${this.escapeHtml(
15 | content
16 | )}</code></pre>`;
17 | }
18 | private escapeHtml(content: string): string {
19 | return content
20 | .replace(/&/g, "&amp;")
21 | .replace(/</g, "&lt;")
22 | .replace(/>/g, "&gt;")
23 | .replace(/"/g, "&quot;")
24 | .replace(/'/g, "&#039;");
25 | }
26 | }
```

## File: MarkdownStrategy.ts, Path: `/root/git/codewrangler/src/services/renderer/strategies/MarkdownStrategy.ts`
```ts
 1 | import { NodeFile } from "../../../core/entities/NodeFile";
 2 | import { Config } from "../../../utils/config";
 3 | import { OUTPUT_FORMATS } from "../../../utils/config/schema";
 4 | import { BaseRenderStrategy } from "../RenderStrategy";
 5 | export class MarkdownStrategy extends BaseRenderStrategy {
 6 | public constructor(config: Config) {
 7 | super(config, OUTPUT_FORMATS.markdown);
 8 | }
 9 | public override renderFile(file: NodeFile): string {
10 | const rendered = super.renderFile(file);
11 | return this.processCodeBlock(rendered, file.extension.replace(".", ""));
12 | }
13 | protected processCodeBlock(content: string, language: string): string {
14 | return `\`\`\`${language}\n${content}\n\`\`\``;
15 | }
16 | }
```

## File: template.ts, Path: `/root/git/codewrangler/src/types/template.ts`
```ts
1 | import { z } from "zod";
2 | export type TemplateType = "page" | "file" | "directory";
3 | export interface ITemplateContent<T> {
4 | content: string;
5 | schema: z.ZodSchema<T>;
6 | additionalFields?: Record<string, z.ZodSchema<string>>;
7 | }
```

## File: type.ts, Path: `/root/git/codewrangler/src/types/type.ts`
```ts
 1 | export const FILE_TYPE = {
 2 | File: "file",
 3 | Directory: "directory"
 4 | } as const;
 5 | export type FileType = (typeof FILE_TYPE)[keyof typeof FILE_TYPE];
 6 | export interface IAccessFlags {
 7 | readable: boolean;
 8 | writable: boolean;
 9 | executable: boolean;
10 | }
11 | export interface IFileStats {
12 | size: number;
13 | created: Date;
14 | modified: Date;
15 | accessed: Date;
16 | isDirectory: boolean;
17 | isFile: boolean;
18 | permissions: IAccessFlags;
19 | }
20 | export interface IReadOptions {
21 | encoding?: BufferEncoding;
22 | flag?: string;
23 | }
24 | export interface IWriteOptions extends IReadOptions {
25 | mode?: number;
26 | flag?: string;
27 | }
28 | export interface IDirectoryOptions {
29 | recursive?: boolean;
30 | mode?: number;
31 | }
32 | export interface IFileTreeItem {
33 | path: string;
34 | type: FileType;
35 | stats?: IFileStats;
36 | }
37 | export interface IPropsNode {
38 | name: string;
39 | path: string;
40 | deep: number;
41 | size: number;
42 | extension?: string;
43 | stats?: IFileStats;
44 | }
```

## File: Config.ts, Path: `/root/git/codewrangler/src/utils/config/Config.ts`
```ts
 1 | import { z } from "zod";
 2 | import {
 3 | ConfigKeys,
 4 | ConfigOptions,
 5 | DEFAULT_CONFIG,
 6 | configSchema
 7 | } from "./schema";
 8 | import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
 9 | import { JsonReader } from "../../infrastructure/filesystem/JsonReader";
10 | import { logger } from "../logger/Logger";
11 | export class Config {
12 | private static instance: Config | undefined;
13 | private config: ConfigOptions;
14 | private jsonReader: JsonReader;
15 | private constructor() {
16 | this.jsonReader = new JsonReader();
17 | this.config = configSchema.parse(DEFAULT_CONFIG);
18 | }
19 | public static async load(): Promise<Config> {
20 | if (!Config.instance) {
21 | Config.instance = new Config();
22 | await Config.instance.loadUserConfig();
23 | }
24 | return Config.instance;
25 | }
26 | public get<T extends ConfigKeys>(key: T): ConfigOptions[T] {
27 | return this.config[key] as ConfigOptions[T];
28 | }
29 | public set(
30 | key: keyof ConfigOptions,
31 | value: ConfigOptions[keyof ConfigOptions]
32 | ): void {
33 | const updatedConfig = { ...this.config, [key]: value };
34 | try {
35 | configSchema.parse(updatedConfig);
36 | this.config = updatedConfig;
37 | } catch (error) {
38 | if (error instanceof z.ZodError) {
39 | logger.error(`Invalid configuration value: ${error.errors}`);
40 | }
41 | throw error;
42 | }
43 | }
44 | public getAll(): ConfigOptions {
45 | return this.config;
46 | }
47 | public reset(): void {
48 | this.config = DEFAULT_CONFIG;
49 | }
50 | public static destroy(): void {
51 | Config.instance = undefined;
52 | }
53 | public override(config: Partial<ConfigOptions>): void {
54 | const newOverrideConfig = { ...this.config, ...config };
55 | try {
56 | configSchema.parse(newOverrideConfig);
57 | this.config = newOverrideConfig;
58 | } catch (error) {
59 | if (error instanceof z.ZodError) {
60 | logger.error(`Invalid configuration value: ${error.errors}`);
61 | }
62 | throw error;
63 | }
64 | }
65 | private async loadUserConfig(): Promise<void> {
66 | try {
67 | const configPath = documentFactory.resolve(this.config.codeConfigFile);
68 | const userConfig = await this.jsonReader.readJsonSync(configPath);
69 | this.config = configSchema.parse({ ...this.config, ...userConfig });
70 | } catch (error) {
71 | this.handleConfigError(error);
72 | }
73 | }
74 | private handleConfigError(error: unknown): void {
75 | if (error instanceof z.ZodError) {
76 | const details = error.errors
77 | .map(err => `${err.path.join(".")}: ${err.message}`)
78 | .join(", ");
79 | throw new Error(`Configuration validation failed: ${details}`);
80 | }
81 | throw error;
82 | }
83 | }
```

## File: index.ts, Path: `/root/git/codewrangler/src/utils/config/index.ts`
```ts
1 | export * from "./Config";
2 | export * from "./schema";
```

## File: schema.ts, Path: `/root/git/codewrangler/src/utils/config/schema.ts`
```ts
 1 | import { z } from "zod";
 2 | import { LOG_VALUES } from "../logger/Logger";
 3 | export const OUTPUT_FORMATS = {
 4 | markdown: "md",
 5 | html: "html"
 6 | } as const;
 7 | export type OutputFormats = typeof OUTPUT_FORMATS;
 8 | export type OutputFormatName = keyof OutputFormats;
 9 | export type OutputFormatExtension = OutputFormats[OutputFormatName];
10 | export const outputFormatSchema = z.enum(["markdown", "html"] as const);
11 | export const fileExtensionSchema = z.enum(["md", "html"] as const);
12 | export type OutputFormat = z.infer<typeof outputFormatSchema>;
13 | export type FileExtension = z.infer<typeof fileExtensionSchema>;
14 | export const FILE_EXTENSION: Record<OutputFormat, FileExtension> = {
15 | markdown: "md",
16 | html: "html"
17 | };
18 | export const configSchema = z
19 | .object({
20 | dir: z.string().default(process.cwd()),
21 | rootDir: z.string().default(process.cwd()),
22 | templatesDir: z.string().default("public/templates"),
23 | pattern: z
24 | .string()
25 | .regex(/^.*$/, "Pattern must be a valid regex")
26 | .default(".*"),
27 | outputFile: z.string().default("output"),
28 | logLevel: z.enum(LOG_VALUES as [string, ...string[]]).default("INFO"),
29 | outputFormat: z.array(outputFormatSchema).default(["markdown"]),
30 | maxFileSize: z.number().positive().default(1048576),
31 | maxDepth: z.number().default(100),
32 | excludePatterns: z
33 | .array(z.string())
34 | .default(["node_modules/**", "**/*.test.ts", "dist/**"]),
35 | ignoreHiddenFiles: z.boolean().default(true),
36 | additionalIgnoreFiles: z.array(z.string()).optional().default([]),
37 | projectName: z.string().optional(),
38 | followSymlinks: z.boolean().default(false),
39 | codeConfigFile: z
40 | .string()
41 | .regex(/\.json$/, "Config file must end with .json")
42 | .default("public/codewrangler.json")
43 | })
44 | .strict();
45 | export type ConfigOptions = z.infer<typeof configSchema>;
46 | export type ConfigKeys = keyof ConfigOptions;
47 | export const DEFAULT_CONFIG: ConfigOptions = {
48 | dir: process.cwd(), // current working directory, where the command is run
49 | rootDir: process.cwd(),
50 | templatesDir: "public/templates",
51 | pattern: ".*",
52 | outputFile: "output",
53 | logLevel: "INFO",
54 | outputFormat: ["markdown"],
55 | maxFileSize: 1048576,
56 | maxDepth: 100,
57 | codeConfigFile: "public/codewrangler.json",
58 | projectName: undefined,
59 | followSymlinks: false,
60 | ignoreHiddenFiles: true, // Default value
61 | additionalIgnoreFiles: [],
62 | excludePatterns: ["node_modules/**", "**/*.test.ts", "dist/**"]
63 | };
```

## File: ProgressBar.ts, Path: `/root/git/codewrangler/src/utils/helpers/ProgressBar.ts`
```ts
 1 | import cliProgress from "cli-progress";
 2 | export class ProgressBar {
 3 | private bar: cliProgress.SingleBar;
 4 | private intervalId: NodeJS.Timeout | null = null;
 5 | private currentValue: number = 0;
 6 | public constructor(private total: number = 100) {
 7 | this.bar = new cliProgress.SingleBar(
 8 | {},
 9 | cliProgress.Presets.shades_classic
10 | );
11 | }
12 | public start(): ProgressBar {
13 | this.bar.start(this.total, 0);
14 | this.intervalId = setInterval(() => this.simulateProgress(), 200);
15 | return this;
16 | }
17 | public update(value: number): ProgressBar {
18 | this.currentValue = value;
19 | this.bar.update(value);
20 | return this;
21 | }
22 | public stop(): ProgressBar {
23 | if (this.intervalId) {
24 | clearInterval(this.intervalId);
25 | this.intervalId = null;
26 | }
27 | this.bar.update(this.total);
28 | this.bar.stop();
29 | return this;
30 | }
31 | public async execute<T>(fn: () => Promise<T>): Promise<T> {
32 | this.start();
33 | try {
34 | return await fn();
35 | } finally {
36 | this.stop();
37 | }
38 | }
39 | private simulateProgress(): void {
40 | const remainingProgress = this.total - this.currentValue;
41 | const increment = Math.random() * remainingProgress * 0.1;
42 | this.currentValue = Math.min(
43 | this.currentValue + increment,
44 | this.total * 0.95
45 | );
46 | this.bar.update(this.currentValue);
47 | }
48 | }
49 | export async function progressBar(
50 | total: number,
51 | callback: () => Promise<void>
52 | ): Promise<void> {
53 | const bar = new ProgressBar(total);
54 | await bar.execute(async () => {
55 | await callback();
56 | });
57 | }
```

## File: Logger.ts, Path: `/root/git/codewrangler/src/utils/logger/Logger.ts`
```ts
 1 | /* eslint-disable no-console */
 2 | import colors from "colors";
 3 | import { Config } from "../config/Config";
 4 | export const LOG_LEVEL = {
 5 | ERROR: 0,
 6 | WARN: 1,
 7 | INFO: 2,
 8 | DEBUG: 3
 9 | } as const;
10 | type LogLevel = (typeof LOG_LEVEL)[keyof typeof LOG_LEVEL];
11 | export type LogLevelString = keyof typeof LOG_LEVEL;
12 | export const LOG_VALUES = Object.keys(LOG_LEVEL) as LogLevelString[];
13 | export class Logger {
14 | private static instance: Logger;
15 | private config: Config | null = null;
16 | private constructor() {}
17 | public static load(): Logger {
18 | if (!Logger.instance) {
19 | Logger.instance = new Logger();
20 | }
21 | return Logger.instance;
22 | }
23 | public setConfig(config: Config): Logger {
24 | this.config = config;
25 | return this;
26 | }
27 | public setLogLevel(logLevel: LogLevelString): Logger {
28 | if (this.config) {
29 | this.config.set("logLevel", logLevel);
30 | }
31 | return this;
32 | }
33 | private get logLevel(): LogLevel {
34 | const configLogLevel = this.config?.get("logLevel") as
35 | | LogLevelString
36 | | undefined;
37 | return configLogLevel ? LOG_LEVEL[configLogLevel] : LOG_LEVEL.ERROR;
38 | }
39 | public error(message: string, error?: Error, ...other: unknown[]): void {
40 | if (this.logLevel >= LOG_LEVEL.ERROR) {
41 | console.log(colors.red(`[ERROR] ${message}`), ...other);
42 | if (error instanceof Error && error.stack) {
43 | console.log(colors.red(error.stack));
44 | }
45 | }
46 | }
47 | public warn(message: string): void {
48 | if (this.logLevel >= LOG_LEVEL.WARN) {
49 | console.log(colors.yellow(`[WARN] ${message}`));
50 | }
51 | }
52 | public info(message: string): void {
53 | if (this.logLevel >= LOG_LEVEL.INFO) {
54 | console.log(colors.blue(`[INFO] ${message}`));
55 | }
56 | }
57 | public debug(message: string): void {
58 | if (this.logLevel >= LOG_LEVEL.DEBUG) {
59 | console.log(colors.gray(`[DEBUG] ${message}`));
60 | }
61 | }
62 | public success(message: string): void {
63 | console.log(colors.green(message));
64 | }
65 | public log(message: string): void {
66 | console.log(message);
67 | }
68 | }
69 | export const logger = Logger.load();
```

## File: index.ts, Path: `/root/git/codewrangler/src/utils/logger/index.ts`
```ts
1 | export * from "./Logger";
```
