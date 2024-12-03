
# Code documentation
codewrangler
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
  1 | import { Stats } from "fs";
  2 | import * as fs from "fs/promises";
  3 | import * as path from "path";
  4 | interface IFileInfo {
  5 | name: string;
  6 | path: string;
  7 | content: string;
  8 | ext: string;
  9 | size: number;
 10 | lines: number;
 11 | }
 12 | interface ITreeNode {
 13 | name: string;
 14 | path: string;
 15 | type: "file" | "directory";
 16 | children: ITreeNode[];
 17 | }
 18 | interface IDocumentConfig {
 19 | pattern: RegExp;
 20 | rootDir: string;
 21 | outputPath: string;
 22 | excludePatterns: string[];
 23 | maxFileSize: number;
 24 | ignoreHidden: boolean;
 25 | compress: boolean;
 26 | }
 27 | const DEFAULT_CONFIG: IDocumentConfig = {
 28 | pattern: /.*/,
 29 | rootDir: process.cwd(),
 30 | outputPath: "documentation.md",
 31 | excludePatterns: ["node_modules/**", "**/dist/**", "**/*.test.ts"],
 32 | maxFileSize: 1024 * 1024, // 1MB
 33 | ignoreHidden: true,
 34 | compress: false
 35 | };
 36 | const generateTreeSymbols = (depth: number, isLast: boolean[]): string => {
 37 | if (depth === 0) return "";
 38 | return (
 39 | isLast
 40 | .slice(0, -1)
 41 | .map(last => (last ? "    " : "│   "))
 42 | .join("") + (isLast[isLast.length - 1] ? "└── " : "├── ")
 43 | );
 44 | };
 45 | const createTreeNode = async (
 46 | nodePath: string,
 47 | config: IDocumentConfig,
 48 | relativePath = ""
 49 | ): Promise<ITreeNode | null> => {
 50 | const stats = await fs.stat(nodePath);
 51 | const name = path.basename(nodePath);
 52 | if (!shouldInclude(nodePath, config)) {
 53 | return null;
 54 | }
 55 | if (stats.isDirectory()) {
 56 | const entries = await fs.readdir(nodePath, { withFileTypes: true });
 57 | const children: ITreeNode[] = [];
 58 | for (const entry of entries) {
 59 | const childNode = await createTreeNode(
 60 | path.join(nodePath, entry.name),
 61 | config,
 62 | path.join(relativePath, name)
 63 | );
 64 | if (childNode) children.push(childNode);
 65 | }
 66 | return {
 67 | name,
 68 | path: relativePath || name,
 69 | type: "directory",
 70 | children
 71 | };
 72 | } else if (isMatchingFile(nodePath, config)) {
 73 | return {
 74 | name,
 75 | path: relativePath || name,
 76 | type: "file",
 77 | children: []
 78 | };
 79 | }
 80 | return null;
 81 | };
 82 | const renderTreeNode = (
 83 | node: ITreeNode,
 84 | isLast: boolean[] = [],
 85 | result: string[] = []
 86 | ): string[] => {
 87 | const prefix = generateTreeSymbols(isLast.length, isLast);
 88 | result.push(prefix + node.name);
 89 | if (node.type === "directory") {
 90 | node.children.forEach((child, index) => {
 91 | renderTreeNode(
 92 | child,
 93 | [...isLast, index === node.children.length - 1],
 94 | result
 95 | );
 96 | });
 97 | }
 98 | return result;
 99 | };
100 | const isHidden = (filePath: string): boolean => {
101 | const baseName = path.basename(filePath);
102 | return baseName.startsWith(".");
103 | };
104 | const shouldInclude = (
105 | filePath: string,
106 | { excludePatterns, ignoreHidden }: IDocumentConfig
107 | ): boolean => {
108 | if (ignoreHidden && isHidden(filePath)) {
109 | return false;
110 | }
111 | const isExcluded = excludePatterns.some(pattern =>
112 | new RegExp(pattern.replace(/\*/g, ".*")).test(filePath)
113 | );
114 | return !isExcluded;
115 | };
116 | const isMatchingFile = (filePath: string, config: IDocumentConfig): boolean => {
117 | if (!config.pattern) {
118 | throw new Error("Pattern is not defined in the config");
119 | }
120 | if (!shouldInclude(filePath, config)) {
121 | return false;
122 | }
123 | return config.pattern.test(filePath);
124 | };
125 | const formatSize = (bytes: number): string => {
126 | const units = ["B", "KB", "MB", "GB"];
127 | let size = bytes;
128 | let unitIndex = 0;
129 | while (size >= 1024 && unitIndex < units.length - 1) {
130 | size /= 1024;
131 | unitIndex++;
132 | }
133 | return `${size.toFixed(2)} ${units[unitIndex]}`;
134 | };
135 | async function* walkDirectory(dir: string): AsyncGenerator<string> {
136 | const entries = await fs.readdir(dir, { withFileTypes: true });
137 | for (const entry of entries) {
138 | const fullPath = path.join(dir, entry.name);
139 | if (entry.isDirectory()) {
140 | yield* walkDirectory(fullPath);
141 | } else {
142 | yield fullPath;
143 | }
144 | }
145 | }
146 | const formatContentWithLineNumbers = (content: string): string => {
147 | const lines = content.split("\n");
148 | const lineNumberWidth = lines.length.toString().length;
149 | return lines
150 | .map((line, index) => {
151 | const lineNumber = (index + 1).toString().padStart(lineNumberWidth, " ");
152 | return `${lineNumber} | ${line}`;
153 | })
154 | .join("\n");
155 | };
156 | const generateFileSection = (
157 | file: IFileInfo,
158 | compress: boolean = false
159 | ): string =>
160 | !compress
161 | ? `
162 | ## File: ${file.name}
163 | - Path: \`${file.path}\`
164 | - Size: ${formatSize(Number(file.size))}
165 | - Extension: ${file.ext}
166 | - Lines of code: ${file.lines}
167 | - Content:
168 | \`\`\`${file.ext.slice(1) || "plaintext"}
169 | ${formatContentWithLineNumbers(file.content)}
170 | \`\`\`
171 | ---------------------------------------------------------------------------
172 | `
173 | : `
174 | ## File: ${file.name}, Path: \`${file.path}\`
175 | \`\`\`${file.ext.slice(1) || "plaintext"}
176 | ${formatContentWithLineNumbers(file.content)}
177 | \`\`\``;
178 | const generateMarkdownContent = (
179 | files: IFileInfo[],
180 | treeContent: string,
181 | compress: boolean
182 | ): string =>
183 | !compress
184 | ? `
185 | # Code Documentation
186 | Generated on: ${new Date().toISOString()}
187 | Total files: ${files.length}
188 | ## Project Structure
189 | \`\`\`
190 | ${treeContent}
191 | \`\`\`
192 | ${files.map(file => generateFileSection(file)).join("\n")}
193 | `
194 | : `
195 | # Code documentation
196 | ${treeContent}
197 | ${files.map(file => generateFileSection(file, true)).join("\n")}
198 | `;
199 | const compressContent = (content: string): string =>
200 | content
201 | .split("\n")
202 | .map(line => line.trim())
203 | .filter(line => line !== "")
204 | .filter(line => !line.startsWith("//"))
205 | .join("\n");
206 | async function generateFileInfo(
207 | filePath: string,
208 | stats: Stats,
209 | compress: boolean
210 | ): Promise<IFileInfo> {
211 | const content = await fs.readFile(filePath, "utf-8");
212 | return {
213 | name: path.basename(filePath),
214 | path: filePath,
215 | content: compress ? compressContent(content) : content,
216 | ext: path.extname(filePath),
217 | size: stats.size,
218 | lines: content.split("\n").filter(line => line.trim() !== "").length
219 | };
220 | }
221 | async function generateDocumentation(
222 | userConfig: Partial<IDocumentConfig> = {}
223 | ): Promise<void> {
224 | try {
225 | const config: IDocumentConfig = { ...DEFAULT_CONFIG, ...userConfig };
226 | const files: IFileInfo[] = [];
227 | const rootNode = await createTreeNode(config.rootDir, config);
228 | const treeContent = rootNode
229 | ? renderTreeNode(rootNode).join("\n")
230 | : "No matching files found";
231 | for await (const filePath of walkDirectory(config.rootDir)) {
232 | if (!isMatchingFile(filePath, config)) {
233 | continue;
234 | }
235 | const stats = await fs.stat(filePath);
236 | if (stats.size > config.maxFileSize) {
237 | continue;
238 | }
239 | const fileInfo = await generateFileInfo(filePath, stats, config.compress);
240 | files.push(fileInfo);
241 | }
242 | const markdownContent = generateMarkdownContent(
243 | files,
244 | treeContent,
245 | config.compress
246 | );
247 | await fs.writeFile(config.outputPath, markdownContent, "utf-8");
248 | } catch (error) {
249 | console.error("Error generating documentation", error);
250 | throw error;
251 | }
252 | }
253 | if (require.main === module) {
254 | generateDocumentation({
255 | pattern: /\.ts$/,
256 | outputPath: "demo.md",
257 | ignoreHidden: true,
258 | excludePatterns: [
259 | "node_modules",
260 | "dist",
261 | "documentation",
262 | "coverage",
263 | "**/__tests__",
264 | "**/*.test.ts"
265 | ],
266 | compress: true
267 | }).catch(console.error);
268 | }
```

## File: GenerateCommand.ts, Path: `/root/git/codewrangler/src/cli/commands/GenerateCommand.ts`
```ts
 1 | import { ICommand, ICommandOptions } from "./types";
 2 | import { DocumentTreeBuilder } from "../../services/builder/DocumentTreeBuilder";
 3 | import { HTMLRenderStrategy } from "../../services/renderer/strategies/HTMLStrategy";
 4 | import { MarkdownStrategy } from "../../services/renderer/strategies/MarkdownStrategy";
 5 | import { Config } from "../../utils/config/Config";
 6 | import { logger } from "../../utils/logger/Logger";
 7 | export class GenerateCommand implements ICommand {
 8 | constructor(private config: Config) {}
 9 | public async execute(
10 | args: string[],
11 | options: ICommandOptions
12 | ): Promise<void> {
13 | try {
14 | this.config.override({ ...options, pattern: args[0] });
15 | if (options.verbose) {
16 | this.logVerbose();
17 | }
18 | const outputFormat = this.config.get("outputFormat");
19 | outputFormat.map(format => {
20 | switch (format) {
21 | case "markdown":
22 | return new MarkdownStrategy(this.config);
23 | case "html":
24 | return new HTMLRenderStrategy(this.config);
25 | default:
26 | throw new Error(`Unsupported output format: ${format}`);
27 | }
28 | });
29 | const builder = new DocumentTreeBuilder(this.config);
30 | await builder.build();
31 | } catch (error) {
32 | logger.error("Generation failed:", error as Error);
33 | throw error;
34 | }
35 | }
36 | private logVerbose(): void {
37 | logger.debug(
38 | `Searching for file matching pattern: ${this.config.get("pattern")}`
39 | );
40 | logger.debug(
41 | `Excluding patterns: ${(
42 | this.config.get("excludePatterns") as string[]
43 | ).join(", ")}`
44 | );
45 | logger.debug(
46 | `Ignoring hidden files: ${this.config.get("ignoreHiddenFiles")}`
47 | );
48 | logger.debug(`Max file size: ${this.config.get("maxFileSize")} bytes`);
49 | }
50 | }
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
12 | this.buildVersion()
13 | .buildDescription()
14 | .buildArguments()
15 | .buildOptions();
16 | return this.program;
17 | }
18 | private buildVersion(): ProgramBuilder {
19 | this.program.version(this.version);
20 | return this;
21 | }
22 | private buildDescription(): ProgramBuilder {
23 | this.program.description("CodeWrangler is a tool for generating code");
24 | return this;
25 | }
26 | private buildArguments(): ProgramBuilder {
27 | this.program.argument(
28 | "<pattern>",
29 | 'File pattern to match (e.g., "\\.ts$" for TypeScript files)'
30 | );
31 | return this;
32 | }
33 | private buildOptions(): ProgramBuilder {
34 | this.program
35 | .option("-d, --dir <dir>", "Directory to search", this.config.get("dir"))
36 | .option("-c, --config <config>", "Config file", this.config.get("codeConfigFile"))
37 | .option("-v, --verbose", "Verbose mode", this.config.get("logLevel"))
38 | .option("-f, --format <format>", "Output format", this.config.get("outputFormat"))
39 | .option("-o, --output <output>", "Output file", this.config.get("outputFile"))
40 | .option("-e, --exclude <exclude>", "Exclude patterns", this.config.get("excludePatterns"))
41 | .option("-i, --ignore-hidden", "Ignore hidden files", this.config.get("ignoreHiddenFiles"))
42 | .option("-a, --additional-ignore <additional-ignore>", "Additional ignore patterns", this.config.get("additionalIgnoreFiles"));
43 | return this;
44 | }
45 | }
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
 3 | import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
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
56 | this.stats = await documentFactory.getStats(this.path);
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
 3 | import { IRenderStrategy } from "../../services/renderer/RenderStrategy";
 4 | interface IPropsFile {
 5 | extension: string;
 6 | }
 7 | const defaultPropsFile: IPropsFile = {
 8 | extension: ""
 9 | };
10 | export abstract class NodeFile extends NodeBase {
11 | private _propsFile: IPropsFile = { ...defaultPropsFile };
12 | private _content: string | null = null;
13 | public constructor(name: string, pathName: string) {
14 | super(name, pathName);
15 | this.initFile(name);
16 | }
17 | public get extension(): string {
18 | return this._propsFile.extension;
19 | }
20 | protected set extension(extension: string) {
21 | this._propsFile.extension = extension;
22 | }
23 | public get content(): string | null {
24 | return this._content;
25 | }
26 | protected set content(content: string | null) {
27 | this._content = content;
28 | }
29 | public get secondaryProps(): Record<string, unknown> | undefined {
30 | return {
31 | extension: this.extension
32 | };
33 | }
34 | public async bundle(deep: number = 0): Promise<void> {
35 | this.deep = deep;
36 | this.size = await documentFactory.size(this.path);
37 | this.content = await documentFactory.readFile(this.path);
38 | this.stats = await documentFactory.getStats(this.path);
39 | }
40 | public abstract override render(strategy: IRenderStrategy): INodeContent;
41 | private initFile(name: string): void {
42 | this._propsFile = { ...defaultPropsFile };
43 | this.extension = documentFactory.extension(name);
44 | this._content = null;
45 | }
46 | }
47 | export class RenderableFile extends NodeFile {
48 | public override render(strategy: IRenderStrategy): INodeContent {
49 | return {
50 | content: strategy.renderFile(this)
51 | };
52 | }
53 | public override async dispose(): Promise<void> {
54 | await super.dispose();
55 | }
56 | }
```

## File: DirectoryNotFoundError.ts, Path: `/root/git/codewrangler/src/core/errors/DirectoryNotFoundError.ts`
```ts
1 | import { DocumentError } from "./DocumentError";
2 | export class DirectoryNotFoundError extends DocumentError {
3 | constructor(path: string) {
4 | super("Directory not found", path);
5 | this.name = "DirectoryNotFoundError";
6 | }
7 | }
```

## File: DocumentError.ts, Path: `/root/git/codewrangler/src/core/errors/DocumentError.ts`
```ts
1 | export class DocumentError extends Error {
2 | constructor(
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
44 | private mapStatsToFileInfo(stats: Stats, accessFlags: IAccessFlags): IFileStats {
45 | return {
46 | size: stats.size,
47 | created: stats.birthtime,
48 | modified: stats.mtime,
49 | accessed: stats.atime,
50 | isDirectory: stats.isDirectory(),
51 | isFile: stats.isFile(),
52 | permissions: accessFlags
53 | };
54 | }
55 | }
56 | export const fileStatsService = async (
57 | filePath: string
58 | ): Promise<IFileStats> => {
59 | const fileStatsService = new FileStatsService();
60 | return await fileStatsService.getStats(filePath);
61 | };
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
 9 | const content = await this.readFileContent(absolutePath, filePath)
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
  3 | import { logger } from "../../utils/logger";
  4 | import { documentFactory } from "../filesystem/DocumentFactory";
  5 | type TemplateValue = z.ZodType<string | number | boolean | undefined>;
  6 | export class Template<
  7 | T extends Record<string, TemplateValue> = Record<string, TemplateValue>
  8 | > {
  9 | private _content: string = "";
 10 | private schema: ZodObject<T>;
 11 | public constructor(
 12 | private type: TemplateType,
 13 | schema: ZodObject<T>
 14 | ) {
 15 | const optionalFields = Object.fromEntries(
 16 | Object.entries(schema.shape).map(([key, value]) => [
 17 | key,
 18 | value.optional()
 19 | ])
 20 | );
 21 | this.schema = schema.extend(optionalFields) as unknown as ZodObject<T>;
 22 | }
 23 | public async load(
 24 | path: string,
 25 | additionalFields?: Record<string, z.ZodSchema<string>>
 26 | ): Promise<void> {
 27 | this._content = await documentFactory.readFile(path);
 28 | if (additionalFields) {
 29 | this.schema = this.schema.extend(additionalFields) as ZodObject<T>;
 30 | }
 31 | this.validate();
 32 | }
 33 | public get content(): string {
 34 | if (!this._content) {
 35 | throw new Error(`Template content is not loaded for ${this.type}`);
 36 | }
 37 | return this._content;
 38 | }
 39 | public static async create<T extends Record<string, TemplateValue>>(
 40 | type: TemplateType,
 41 | schema: ZodObject<T>,
 42 | path: string,
 43 | additionalFields?: Record<string, z.ZodSchema<string>>
 44 | ): Promise<Template<T>> {
 45 | const template = new Template(type, schema);
 46 | await template.load(path, additionalFields);
 47 | return template;
 48 | }
 49 | public render(data: Record<string, string | number | boolean>): string {
 50 | try {
 51 | this.schema.parse(data);
 52 | const contentTokens = this.getTemplateTokens();
 53 | const missingTokens = contentTokens.filter(token => {
 54 | const isRequired = this.schema.shape[token]?.isOptional() === false;
 55 | return isRequired && !(token in data);
 56 | });
 57 | if (missingTokens.length > 0) {
 58 | throw new Error(
 59 | `Missing required values for tokens: ${missingTokens.join(", ")}`
 60 | );
 61 | }
 62 | const templateContent = this.content;
 63 | return templateContent.replace(
 64 | new RegExp(`\\{\\{(${contentTokens.join("|")})\\}\\}`, "g"),
 65 | (_, key) => (key in data ? String(data[key]) : `{{${key}}}`)
 66 | );
 67 | } catch (error) {
 68 | if (error instanceof z.ZodError) {
 69 | throw new Error(
 70 | `Template content validation failed for ${this.type}: ${error.errors
 71 | .map(e => `${e.path.join(".")}: ${e.message}`)
 72 | .join(", ")}`
 73 | );
 74 | }
 75 | throw error;
 76 | }
 77 | }
 78 | private getTemplateTokens(): string[] {
 79 | const tokenRegex = /\{\{(\w+)\}\}/g;
 80 | const tokens: string[] = [];
 81 | let match;
 82 | while ((match = tokenRegex.exec(this.content)) !== null) {
 83 | const token = match[1];
 84 | if (token === undefined) {
 85 | throw new Error(`Invalid template content for ${this.type}`);
 86 | }
 87 | tokens.push(token);
 88 | }
 89 | return tokens;
 90 | }
 91 | private validate(): void {
 92 | const tokens = this.getTemplateTokens();
 93 | const requiredFields = Object.keys(this.schema.shape);
 94 | const missingRequired = requiredFields.filter(
 95 | field => !tokens.includes(field)
 96 | );
 97 | if (missingRequired.length > 0) {
 98 | logger.warn(
 99 | `Missing required tokens in ${this.type} template: ${missingRequired.join(
100 | ", "
101 | )}`
102 | );
103 | }
104 | }
105 | }
```

## File: zod.ts, Path: `/root/git/codewrangler/src/infrastructure/templates/zod.ts`
```ts
 1 | import { z } from "zod";
 2 | const OTHER_KEYS = [
 3 | "PROJECT_NAME",
 4 | "GENERATION_DATE",
 5 | "DIRECTORY_STRUCTURE",
 6 | "TOTAL_FILES",
 7 | "TOTAL_DIRECTORIES",
 8 | "TOTAL_SIZE"
 9 | ] as const;
10 | export type OtherKeys = (typeof OTHER_KEYS)[number];
11 | export const OTHER_KEYS_SCHEMA = z.enum(OTHER_KEYS);
12 | export const baseTemplateSchema = z.object({
13 | PROJECT_NAME: z.string(),
14 | GENERATION_DATE: z.string().datetime(),
15 | DIRECTORY_STRUCTURE: z.string(),
16 | TOTAL_FILES: z.number(),
17 | TOTAL_DIRECTORIES: z.number(),
18 | TOTAL_SIZE: z.number(),
19 | CONTENT: z.string()
20 | });
21 | export type BaseTemplate = z.infer<typeof baseTemplateSchema>;
22 | export type BaseTemplateString = keyof BaseTemplate;
23 | export const fileTemplateSchema = z.object({
24 | FILE_NAME: z.string(),
25 | FILE_EXTENSION: z.string(),
26 | FILE_SIZE: z.number(),
27 | FILE_CONTENTS: z.string()
28 | });
29 | export type FileTemplate = z.infer<typeof fileTemplateSchema>;
30 | export type FileTemplateString = keyof FileTemplate;
31 | export const directoryTemplateSchema = z.object({
32 | DIRECTORY_NAME: z.string(),
33 | DIRECTORY_PATH: z.string(),
34 | DIRECTORY_SIZE: z.number(),
35 | DIRECTORY_CONTENT: z.string()
36 | });
37 | export type DirectoryTemplate = z.infer<typeof directoryTemplateSchema>;
38 | export type DirectoryTemplateString = keyof DirectoryTemplate;
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
10 | constructor(config: Config) {
11 | this.builder = new NodeTreeBuilder(config);
12 | }
13 | async build(): Promise<void> {
14 | try {
15 | const fileTree = await this.builder.build();
16 | this.root = await this.createDocumentStructure(fileTree);
17 | await this.root.bundle();
18 | } catch (error) {
19 | logger.error("Error building document tree", error as Error);
20 | throw error;
21 | }
22 | }
23 | private async createDocumentStructure(
24 | node: INodeTree
25 | ): Promise<RenderableDirectory | RenderableFile> {
26 | if (node.type === FILE_TYPE.Directory) {
27 | const directory = new RenderableDirectory(node.name, node.path);
28 | if (node.children) {
29 | for (const child of node.children) {
30 | const childDocument = await this.createDocumentStructure(child);
31 | directory.addChild(childDocument);
32 | }
33 | }
34 | return directory;
35 | } else {
36 | return new RenderableFile(node.name, node.path);
37 | }
38 | }
39 | }
```

## File: FileHidden.ts, Path: `/root/git/codewrangler/src/services/builder/FileHidden.ts`
```ts
 1 | import { minimatch } from "minimatch";
 2 | import { Config } from "../../utils/config";
 3 | export default class FileHidden {
 4 | private ignoreHiddenFiles: boolean;
 5 | private patterns: string[];
 6 | private additionalIgnoreFiles: string[];
 7 | constructor(config: Config) {
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
 3 | import { FILE_TYPE, FileType } from "../../types/type";
 4 | import { Config, ConfigOptions } from "../../utils/config";
 5 | export interface INodeTree {
 6 | name: string;
 7 | path: string;
 8 | type: FileType;
 9 | children?: INodeTree[];
10 | }
11 | export interface INodeTreeBuilderOptions
12 | extends Pick<
13 | ConfigOptions,
14 | | "additionalIgnoreFiles"
15 | | "maxDepth"
16 | | "excludePatterns"
17 | | "dir"
18 | | "followSymlinks"
19 | > {
20 | pattern: RegExp;
21 | returnType: "paths" | "details";
22 | }
23 | export class NodeTreeBuilder {
24 | private config: Config;
25 | private options: INodeTreeBuilderOptions;
26 | private fileHidden: FileHidden;
27 | constructor(config: Config) {
28 | this.config = config;
29 | this.options = this.initializeOptions();
30 | this.fileHidden = new FileHidden(config);
31 | }
32 | public async build(): Promise<INodeTree> {
33 | const rootDir = this.options.dir;
34 | if (!documentFactory.exists(rootDir)) {
35 | throw new Error(`Directory ${rootDir} does not exist`);
36 | }
37 | return await this.buildTree(rootDir);
38 | }
39 | private initializeOptions(): INodeTreeBuilderOptions {
40 | return {
41 | dir: this.config.get("dir"),
42 | pattern: new RegExp(this.config.get("pattern")),
43 | maxDepth: this.config.get("maxDepth"),
44 | excludePatterns: this.config.get("excludePatterns"),
45 | additionalIgnoreFiles: this.config.get("additionalIgnoreFiles"),
46 | returnType: "details",
47 | followSymlinks: false
48 | };
49 | }
50 | private async buildTree(
51 | nodePath: string,
52 | depth: number = 0
53 | ): Promise<INodeTree> {
54 | const stats = await documentFactory.getStats(nodePath);
55 | const name = documentFactory.baseName(nodePath);
56 | const node: INodeTree = {
57 | name,
58 | path: nodePath,
59 | type: stats.isDirectory ? FILE_TYPE.Directory : FILE_TYPE.File
60 | };
61 | if (stats.isDirectory) {
62 | if (
63 | this.options.maxDepth !== undefined &&
64 | depth >= this.options.maxDepth
65 | ) {
66 | return node;
67 | }
68 | const entries = await documentFactory.readDir(nodePath);
69 | const children: INodeTree[] = [];
70 | for (const entry of entries) {
71 | const childPath = documentFactory.join(nodePath, entry);
72 | if (this.fileHidden.shouldExclude(entry)) {
73 | continue;
74 | }
75 | const childNode = await this.buildTree(childPath, depth + 1);
76 | children.push(childNode);
77 | }
78 | node.children = children;
79 | }
80 | return node;
81 | }
82 | }
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
 44 | const templateDir = documentFactory.join(
 45 | this.config.get("rootDir") as string,
 46 | this.config.get("templatesDir") as string
 47 | );
 48 | if (!documentFactory.exists(templateDir)) {
 49 | throw new Error(`Templates directory not found: ${templateDir}`);
 50 | }
 51 | this.templates = {
 52 | page: await Template.create(
 53 | "page",
 54 | baseTemplateSchema,
 55 | documentFactory.join(templateDir, `page.${this.extension}`)
 56 | ),
 57 | file: await Template.create(
 58 | "file",
 59 | fileTemplateSchema,
 60 | documentFactory.join(templateDir, `file.${this.extension}`)
 61 | ),
 62 | directory: await Template.create(
 63 | "directory",
 64 | directoryTemplateSchema,
 65 | documentFactory.join(templateDir, `directory.${this.extension}`)
 66 | )
 67 | };
 68 | }
 69 | public renderFile(file: NodeFile): string {
 70 | if (!this.templates.file) {
 71 | throw new Error("File template is not loaded");
 72 | }
 73 | return this.replaceSelectors(this.templates.file.content, {
 74 | FILE_NAME: file.name,
 75 | FILE_EXTENSION: file.extension,
 76 | FILE_SIZE: file.size,
 77 | FILE_CONTENTS: file.content || "",
 78 | ...file.props
 79 | });
 80 | }
 81 | public renderDirectory(directory: NodeDirectory): string {
 82 | const content = directory.children
 83 | .map(
 84 | child =>
 85 | child instanceof NodeFile
 86 | ? this.renderFile(child)
 87 | : this.renderDirectory(child) // save the rendering result on the object after bundling execution
 88 | )
 89 | .join("");
 90 | if (!this.templates.directory) {
 91 | throw new Error("Directory template is not loaded");
 92 | }
 93 | return this.replaceSelectors(this.templates.directory.content, {
 94 | DIRECTORY_NAME: directory.name,
 95 | DIRECTORY_PATH: directory.path,
 96 | DIRECTORY_SIZE: directory.size,
 97 | DIRECTORY_CONTENT: content,
 98 | ...directory.props
 99 | });
100 | }
101 | public render(rootDirectory: NodeDirectory): string {
102 | const directoryContent = this.renderDirectory(rootDirectory);
103 | if (!this.templates.page) {
104 | throw new Error("Page template is not loaded");
105 | }
106 | return this.replaceSelectors(this.templates.page.content, {
107 | PROJECT_NAME:
108 | this.config.get("projectName") || rootDirectory.name || "Project",
109 | GENERATION_DATE: new Date().toLocaleDateString(),
110 | DIRECTORY_STRUCTURE: directoryContent,
111 | TOTAL_FILES: rootDirectory.length,
112 | TOTAL_DIRECTORIES: rootDirectory.deepLength,
113 | TOTAL_SIZE: rootDirectory.size,
114 | CONTENT: directoryContent
115 | });
116 | }
117 | public dispose(): void {
118 | this.templates = {
119 | page: null,
120 | file: null,
121 | directory: null
122 | };
123 | }
124 | protected replaceSelectors(
125 | template: string,
126 | values: BaseTemplate | FileTemplate | DirectoryTemplate
127 | ): string {
128 | return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
129 | const typedKey = key as keyof typeof values;
130 | return values[typedKey] !== undefined
131 | ? String(values[typedKey])
132 | : `{{${key}}}`;
133 | });
134 | }
135 | }
```

## File: HTMLStrategy.ts, Path: `/root/git/codewrangler/src/services/renderer/strategies/HTMLStrategy.ts`
```ts
 1 | import { NodeFile } from "../../../core/entities/NodeFile";
 2 | import { Config } from "../../../utils/config";
 3 | import { OUTPUT_FORMATS } from "../../../utils/config/schema";
 4 | import { BaseRenderStrategy } from "../RenderStrategy";
 5 | export class HTMLRenderStrategy extends BaseRenderStrategy {
 6 | constructor(config: Config) {
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
 6 | constructor(config: Config) {
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
69 | console.log(userConfig);
70 | this.config = configSchema.parse({ ...this.config, ...userConfig });
71 | } catch (error) {
72 | this.handleConfigError(error);
73 | }
74 | }
75 | private handleConfigError(error: unknown): void {
76 | if (error instanceof z.ZodError) {
77 | const details = error.errors
78 | .map(err => `${err.path.join(".")}: ${err.message}`)
79 | .join(", ");
80 | throw new Error(`Configuration validation failed: ${details}`);
81 | }
82 | throw error;
83 | }
84 | }
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
 6 | constructor(private total: number = 100) {
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
