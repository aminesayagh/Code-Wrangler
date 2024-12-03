
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
    │   │   └── DocumentFactory.ts
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
159 | ): string => !compress
160 | ? `
161 | ## File: ${file.name}
162 | - Path: \`${file.path}\`
163 | - Size: ${formatSize(Number(file.size))}
164 | - Extension: ${file.ext}
165 | - Lines of code: ${file.lines}
166 | - Content:
167 | \`\`\`${file.ext.slice(1) || "plaintext"}
168 | ${formatContentWithLineNumbers(file.content)}
169 | \`\`\`
170 | ---------------------------------------------------------------------------
171 | `
172 | : `
173 | ## File: ${file.name}, Path: \`${file.path}\`
174 | \`\`\`${file.ext.slice(1) || "plaintext"}
175 | ${formatContentWithLineNumbers(file.content)}
176 | \`\`\``;
177 | const generateMarkdownContent = (
178 | files: IFileInfo[],
179 | treeContent: string,
180 | compress: boolean
181 | ): string => !compress
182 | ? `
183 | # Code Documentation
184 | Generated on: ${new Date().toISOString()}
185 | Total files: ${files.length}
186 | ## Project Structure
187 | \`\`\`
188 | ${treeContent}
189 | \`\`\`
190 | ${files.map(file => generateFileSection(file)).join("\n")}
191 | `
192 | : `
193 | # Code documentation
194 | ${treeContent}
195 | ${files.map(file => generateFileSection(file, true)).join("\n")}
196 | `;
197 | const compressContent = (content: string): string => content
198 | .split("\n")
199 | .map(line => line.trim())
200 | .filter(line => line !== "")
201 | .filter(line => !line.startsWith("//"))
202 | .join("\n");
203 | async function generateFileInfo(filePath: string, stats: Stats, compress: boolean): Promise<IFileInfo> {
204 | const content = await fs.readFile(filePath, "utf-8");
205 | return {
206 | name: path.basename(filePath),
207 | path: filePath,
208 | content: compress ? compressContent(content) : content,
209 | ext: path.extname(filePath),
210 | size: stats.size,
211 | lines: content.split("\n").filter(line => line.trim() !== "").length
212 | }
213 | }
214 | async function generateDocumentation(
215 | userConfig: Partial<IDocumentConfig> = {}
216 | ): Promise<void> {
217 | try {
218 | const config: IDocumentConfig = { ...DEFAULT_CONFIG, ...userConfig };
219 | const files: IFileInfo[] = [];
220 | const rootNode = await createTreeNode(config.rootDir, config);
221 | const treeContent = rootNode
222 | ? renderTreeNode(rootNode).join("\n")
223 | : "No matching files found";
224 | for await (const filePath of walkDirectory(config.rootDir)) {
225 | if (isMatchingFile(filePath, config)) {
226 | const stats = await fs.stat(filePath);
227 | if (stats.size <= config.maxFileSize) {
228 | const fileInfo = await generateFileInfo(filePath, stats, config.compress);
229 | files.push(fileInfo);
230 | }
231 | }
232 | }
233 | const markdownContent = generateMarkdownContent(
234 | files,
235 | treeContent,
236 | config.compress
237 | );
238 | await fs.writeFile(config.outputPath, markdownContent, "utf-8");
239 | } catch (error) {
240 | console.error("Error generating documentation", error);
241 | throw error;
242 | }
243 | }
244 | if (require.main === module) {
245 | generateDocumentation({
246 | pattern: /\.ts$/,
247 | outputPath: "demo.md",
248 | ignoreHidden: true,
249 | excludePatterns: [
250 | "node_modules",
251 | "dist",
252 | "documentation",
253 | "coverage",
254 | "**/__tests__",
255 | "**/*.test.ts"
256 | ],
257 | compress: true
258 | }).catch(console.error);
259 | }
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
 9 | public async execute(args: string[], options: ICommandOptions): Promise<void> {
10 | try {
11 | this.config.override({ ...options, pattern: args[0] });
12 | if (options.verbose) {
13 | this.logVerbose();
14 | }
15 | const outputFormat = this.config.get("outputFormat");
16 | const renderStrategies = outputFormat.map(format => {
17 | switch (format) {
18 | case "markdown":
19 | return new MarkdownStrategy(this.config);
20 | case "html":
21 | return new HTMLRenderStrategy(this.config);
22 | default:
23 | throw new Error(`Unsupported output format: ${format}`);
24 | }
25 | });
26 | const builder = new DocumentTreeBuilder(this.config, renderStrategies);
27 | await builder.build();
28 | } catch (error) {
29 | logger.error("Generation failed:", error as Error);
30 | throw error;
31 | }
32 | }
33 | private logVerbose(): void {
34 | logger.debug(
35 | `Searching for file matching pattern: ${this.config.get("pattern")}`
36 | );
37 | logger.debug(
38 | `Excluding patterns: ${(
39 | this.config.get("excludePatterns") as string[]
40 | ).join(", ")}`
41 | );
42 | logger.debug(
43 | `Ignoring hidden files: ${this.config.get("ignoreHiddenFiles")}`
44 | );
45 | logger.debug(`Max file size: ${this.config.get("maxFileSize")} bytes`);
46 | }
47 | }
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
 5 | constructor(
 6 | private config: Config,
 7 | private version: string
 8 | ) {
 9 | this.program = new Command();
10 | }
11 | build(): Command {
12 | return this.program
13 | .version(this.version)
14 | .description("CodeWrangler is a tool for generating code")
15 | .argument(
16 | "<pattern>",
17 | 'File pattern to match (e.g., "\\.ts$" for TypeScript files)'
18 | )
19 | .option("-d, --dir <dir>", "Directory to search", this.config.get("dir"))
20 | .option(
21 | "-o, --output <output>",
22 | "Output file",
23 | this.config.get("outputFile")
24 | )
25 | .option(
26 | "-c, --config <config>",
27 | "Config file",
28 | this.config.get("codeConfigFile")
29 | )
30 | .option("-v, --verbose", "Verbose mode", this.config.get("logLevel"))
31 | .option(
32 | "-f, --format <format>",
33 | "Output format",
34 | this.config.get("outputFormat")
35 | )
36 | .option(
37 | "-s, --max-size <max-size>",
38 | "Max file size",
39 | this.config.get("maxFileSize").toString()
40 | )
41 | .option(
42 | "-e, --exclude <exclude>",
43 | "Exclude patterns",
44 | this.config.get("excludePatterns")
45 | )
46 | .option(
47 | "-i, --ignore-hidden",
48 | "Ignore hidden files",
49 | this.config.get("ignoreHiddenFiles")
50 | )
51 | .option(
52 | "-a, --additional-ignore <additional-ignore>",
53 | "Additional ignore patterns",
54 | this.config.get("additionalIgnoreFiles")
55 | );
56 | }
57 | }
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
37 | public addChild(
38 | child: NodeFile | NodeDirectory
39 | ): NodeDirectory {
40 | if (!(child instanceof NodeFile || child instanceof NodeDirectory)) {
41 | throw new Error("Invalid child type");
42 | }
43 | this.children.push(child);
44 | return this;
45 | }
46 | public async bundle(deep: number = 0): Promise<void> {
47 | this.deep = deep;
48 | await Promise.all(this.children.map(child => child.bundle(deep + 1)));
49 | this.length = this.children.filter(
50 | child => child instanceof NodeFile
51 | ).length;
52 | this.deepLength = this.children.reduce(
53 | (acc, child) =>
54 | acc + (child instanceof NodeDirectory ? child.deepLength + 1 : 1),
55 | 0
56 | );
57 | this.size = this.children.reduce((acc, child) => acc + child.size, 0);
58 | this.stats = await documentFactory.getStats(this.path);
59 | }
60 | public abstract override render(strategy: IRenderStrategy): INodeContent;
61 | private initDirectory(): void {
62 | this.children = [];
63 | this._propsDirectory = { ...defaultPropsDirectory };
64 | }
65 | }
66 | export class RenderableDirectory extends NodeDirectory {
67 | public override render(strategy: IRenderStrategy): INodeContent {
68 | return {
69 | content: strategy.renderDirectory(this)
70 | };
71 | }
72 | }
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
3 | constructor(path: string) {
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
  5 | import { DocumentError, FileNotFoundError } from "../../core/errors";
  6 | import {
  7 | FILE_TYPE,
  8 | FileType,
  9 | IDirectoryOptions,
 10 | IFileStats,
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
 45 | const stats = await this.getStats(filePath);
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
 57 | * Gets detailed file statistics
 58 | * @param filePath - The path to get stats for
 59 | * @returns Detailed file statistics including size, dates, and permissions
 60 | * @throws {FileNotFoundError} If the path doesn't exist
 61 | * @throws {DocumentError} For other file system errors
 62 | */
 63 | async getStats(filePath: string): Promise<IFileStats> {
 64 | try {
 65 | const stats = await fs.stat(filePath);
 66 | const accessFlags = await this.checkAccess(filePath);
 67 | return {
 68 | size: stats.size,
 69 | created: stats.birthtime,
 70 | modified: stats.mtime,
 71 | accessed: stats.atime,
 72 | isDirectory: stats.isDirectory(),
 73 | isFile: stats.isFile(),
 74 | permissions: {
 75 | readable: accessFlags.readable,
 76 | writable: accessFlags.writable,
 77 | executable: accessFlags.executable
 78 | }
 79 | };
 80 | } catch (error) {
 81 | if ((error as NodeJS.ErrnoException).code === "ENOENT") {
 82 | throw new FileNotFoundError(filePath);
 83 | }
 84 | throw new DocumentError(String(error), filePath);
 85 | }
 86 | },
 87 | /**
 88 | * Checks various access flags for a path
 89 | * @private
 90 | * @param filePath - The path to check access for
 91 | * @returns An object containing readable, writable, and executable permission flags
 92 | */
 93 | async checkAccess(filePath: string): Promise<{
 94 | readable: boolean;
 95 | writable: boolean;
 96 | executable: boolean;
 97 | }> {
 98 | const check = async (mode: number): Promise<boolean> => {
 99 | try {
100 | await fs.access(filePath, mode);
101 | return true;
102 | } catch {
103 | return false;
104 | }
105 | };
106 | return {
107 | readable: await check(fs.constants.R_OK),
108 | writable: await check(fs.constants.W_OK),
109 | executable: await check(fs.constants.X_OK)
110 | };
111 | },
112 | /**
113 | * Reads the entire contents of a file synchronously
114 | * @param filePath - The path to the file
115 | * @param options - The options for the read operation
116 | * @returns The contents of the file as a string
117 | * @throws {Error} If the file cannot be read
118 | */
119 | readFileSync(filePath: string, options: IReadOptions = {}): string {
120 | return fsSync.readFileSync(filePath, {
121 | encoding: options.encoding ?? "utf-8",
122 | flag: options.flag
123 | });
124 | },
125 | async readJsonSync(filePath: string): Promise<object> {
126 | try {
127 | const absolutePath = this.resolve(filePath);
128 | if (!this.exists(absolutePath)) {
129 | throw new Error(`File not found: ${filePath}`);
130 | }
131 | const fileContents = await fs.readFile(absolutePath, "utf-8");
132 | if (!fileContents) {
133 | throw new Error(`File is empty: ${filePath}`);
134 | }
135 | try {
136 | return JSON.parse(fileContents);
137 | } catch (parseError) {
138 | throw new Error(
139 | `Invalid JSON in file ${filePath}: ${String(parseError)}`
140 | );
141 | }
142 | } catch (error) {
143 | throw new DocumentError(String(error), filePath);
144 | }
145 | },
146 | /**
147 | * Reads the entire contents of a file
148 | * @param filePath - The path to the file
149 | * @param options - The options for the read operation
150 | * @returns The contents of the file as a string
151 | * @throws {FileNotFoundError} If the file doesn't exist
152 | * @throws {DocumentError} For other file system errors
153 | */
154 | async readFile(
155 | filePath: string,
156 | options: IReadOptions = {}
157 | ): Promise<string> {
158 | try {
159 | return await fs.readFile(filePath, {
160 | encoding: options.encoding ?? "utf-8",
161 | flag: options.flag
162 | });
163 | } catch (error) {
164 | if ((error as NodeJS.ErrnoException).code === "ENOENT") {
165 | throw new FileNotFoundError(filePath);
166 | }
167 | throw new DocumentError(String(error), filePath);
168 | }
169 | },
170 | /**
171 | * Writes data to a file, replacing the file if it already exists
172 | * @param filePath - The path to the file
173 | * @param data - The data to write
174 | * @param options - The options for the write operation
175 | * @throws {DocumentError} For file system errors
176 | */
177 | async writeFile(
178 | filePath: string,
179 | data: string | Buffer,
180 | options: IWriteOptions = {}
181 | ): Promise<void> {
182 | try {
183 | await fs.writeFile(filePath, data, {
184 | encoding: options.encoding ?? "utf-8",
185 | mode: options.mode,
186 | flag: options.flag
187 | });
188 | } catch (error) {
189 | throw new DocumentError(String(error), filePath);
190 | }
191 | },
192 | /**
193 | * Appends data to a file
194 | * @param filePath - The path to the file
195 | * @param content - The content to append
196 | * @param options - The options for the write operation
197 | * @throws {DocumentError} For file system errors
198 | */
199 | async appendFile(
200 | filePath: string,
201 | content: string,
202 | options: IWriteOptions = {}
203 | ): Promise<void> {
204 | try {
205 | await fs.appendFile(filePath, content, {
206 | encoding: options.encoding ?? "utf-8",
207 | mode: options.mode,
208 | flag: options.flag
209 | });
210 | } catch (error) {
211 | throw new DocumentError(String(error), filePath);
212 | }
213 | },
214 | /**
215 | * Reads the contents of a directory
216 | * @param dirPath - The path to the directory
217 | * @param options - The options for the read operation
218 | * @returns An array of file and directory names in the directory
219 | * @throws {Error} If the directory cannot be read
220 | */
221 | async readDir(
222 | dirPath: string,
223 | options?: { withFileTypes?: boolean }
224 | ): Promise<string[]> {
225 | return await fs.readdir(dirPath, options as ObjectEncodingOptions);
226 | },
227 | /**
228 | * Creates a directory if it doesn't exist
229 | * @param dirPath - The path where to create the directory
230 | * @param recursive - Whether to create parent directories if they don't exist
231 | * @throws {DocumentError} For file system errors
232 | */
233 | async createDir(dirPath: string, recursive = true): Promise<void> {
234 | await fs.mkdir(dirPath, { recursive });
235 | },
236 | /**
237 | * Gets the base name of a file
238 | * @param filePath - The path to the file
239 | * @returns The base name of the file (last portion of the path)
240 | */
241 | baseName(filePath: string): string {
242 | return path.basename(filePath);
243 | },
244 | /**
245 | * Gets the extension of a file
246 | * @param filePath - The path to the file
247 | * @returns The extension of the file including the dot (e.g., '.txt')
248 | */
249 | extension(filePath: string): string {
250 | return path.extname(filePath);
251 | },
252 | /**
253 | * Checks if a file or directory exists
254 | * @param filePath - The path to check
255 | * @returns True if the file or directory exists, false otherwise
256 | */
257 | exists(filePath: string): boolean {
258 | try {
259 | fsSync.accessSync(filePath);
260 | return true;
261 | } catch {
262 | return false;
263 | }
264 | },
265 | /**
266 | * Checks if a path is absolute
267 | * @param filePath - The path to check
268 | * @returns True if the path is absolute, false otherwise
269 | */
270 | isAbsolute(filePath: string): boolean {
271 | return path.isAbsolute(filePath);
272 | },
273 | /**
274 | * Gets directory contents with type information
275 | * @param dirPath - The path to the directory
276 | * @returns An array of objects containing name and type information for each entry
277 | * @throws {DocumentError} If path is not a directory or other errors occur
278 | */
279 | async readDirectory(
280 | dirPath: string
281 | ): Promise<Array<{ name: string; type: FileType }>> {
282 | try {
283 | const entries = await fs.readdir(dirPath, { withFileTypes: true });
284 | return entries.map(entry => ({
285 | name: entry.name,
286 | type: entry.isDirectory() ? FILE_TYPE.Directory : FILE_TYPE.File
287 | }));
288 | } catch (error) {
289 | throw new DocumentError(String(error), dirPath);
290 | }
291 | },
292 | /**
293 | * Creates a directory if it doesn't exist
294 | * @param dirPath - The path where to create the directory
295 | * @param options - Options for directory creation including recursive and mode
296 | * @throws {DocumentError} For file system errors
297 | */
298 | async ensureDirectory(
299 | dirPath: string,
300 | options: IDirectoryOptions = {}
301 | ): Promise<void> {
302 | try {
303 | if (!this.exists(dirPath)) {
304 | await fs.mkdir(dirPath, {
305 | recursive: options.recursive ?? true,
306 | mode: options.mode
307 | });
308 | }
309 | } catch (error) {
310 | throw new DocumentError(String(error), dirPath);
311 | }
312 | },
313 | /**
314 | * Removes a file or directory
315 | * @param filePath - The path to remove
316 | * @throws {DocumentError} For file system errors
317 | */
318 | async remove(filePath: string): Promise<void> {
319 | const stats = await fs.stat(filePath);
320 | if (stats.isDirectory()) {
321 | await fs.rm(filePath, { recursive: true, force: true });
322 | } else {
323 | await fs.unlink(filePath);
324 | }
325 | },
326 | /**
327 | * Copies a file or directory
328 | * @param src - The source path
329 | * @param dest - The destination path
330 | * @throws {DocumentError} For file system errors
331 | */
332 | async copy(src: string, dest: string): Promise<void> {
333 | const stats = await fs.stat(src);
334 | if (stats.isDirectory()) {
335 | await this.copyDir(src, dest);
336 | } else {
337 | await fs.copyFile(src, dest);
338 | }
339 | },
340 | /**
341 | * Copies a directory recursively
342 | * @private
343 | * @param src - The source directory path
344 | * @param dest - The destination directory path
345 | * @throws {DocumentError} For file system errors
346 | */
347 | async copyDir(src: string, dest: string): Promise<void> {
348 | await this.ensureDirectory(dest);
349 | const entries = await fs.readdir(src, { withFileTypes: true });
350 | for (const entry of entries) {
351 | const srcPath = path.join(src, entry.name);
352 | const destPath = path.join(dest, entry.name);
353 | if (entry.isDirectory()) {
354 | await this.copyDir(srcPath, destPath);
355 | } else {
356 | await fs.copyFile(srcPath, destPath);
357 | }
358 | }
359 | },
360 | /**
361 | * Joins an array of paths into a single path
362 | * @param paths - The paths to join
363 | * @returns The joined path
364 | */
365 | join(...paths: string[]): string {
366 | return path.join(...paths);
367 | }
368 | };
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
 7 | import { IRenderStrategy } from "../renderer/RenderStrategy";
 8 | export class DocumentTreeBuilder {
 9 | private root: RenderableDirectory | RenderableFile | undefined;
10 | private builder: NodeTreeBuilder;
11 | constructor(
12 | config: Config,
13 | private renderStrategy: IRenderStrategy[]
14 | ) {
15 | this.builder = new NodeTreeBuilder(config);
16 | }
17 | async build(): Promise<void> {
18 | try {
19 | const fileTree = await this.builder.build();
20 | this.root = await this.createDocumentStructure(fileTree);
21 | await this.root.bundle();
22 | } catch (error) {
23 | logger.error("Error building document tree", error as Error);
24 | throw error;
25 | }
26 | }
27 | private async createDocumentStructure(
28 | node: INodeTree
29 | ): Promise<RenderableDirectory | RenderableFile> {
30 | if (node.type === FILE_TYPE.Directory) {
31 | const directory = new RenderableDirectory(
32 | node.name,
33 | node.path
34 | );
35 | if (node.children) {
36 | for (const child of node.children) {
37 | const childDocument = await this.createDocumentStructure(child);
38 | await directory.addChild(childDocument);
39 | }
40 | }
41 | return directory;
42 | } else {
43 | return new RenderableFile(node.name, node.path);
44 | }
45 | }
46 | }
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
 6 | export interface IFileStats {
 7 | size: number;
 8 | created: Date;
 9 | modified: Date;
10 | accessed: Date;
11 | isDirectory: boolean;
12 | isFile: boolean;
13 | permissions: {
14 | readable: boolean;
15 | writable: boolean;
16 | executable: boolean;
17 | };
18 | }
19 | export interface IReadOptions {
20 | encoding?: BufferEncoding;
21 | flag?: string;
22 | }
23 | export interface IWriteOptions extends IReadOptions {
24 | mode?: number;
25 | flag?: string;
26 | }
27 | export interface IDirectoryOptions {
28 | recursive?: boolean;
29 | mode?: number;
30 | }
31 | export interface IFileTreeItem {
32 | path: string;
33 | type: FileType;
34 | stats?: IFileStats;
35 | }
36 | export interface IPropsNode {
37 | name: string;
38 | path: string;
39 | deep: number;
40 | size: number;
41 | extension?: string;
42 | stats?: IFileStats;
43 | }
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
 9 | import { logger } from "../logger/Logger";
10 | export class Config {
11 | private static instance: Config | undefined;
12 | private config: ConfigOptions;
13 | private constructor() {
14 | this.config = configSchema.parse(DEFAULT_CONFIG);
15 | }
16 | public static async load(): Promise<Config> {
17 | if (!Config.instance) {
18 | Config.instance = new Config();
19 | await Config.instance.initialize();
20 | }
21 | return Config.instance;
22 | }
23 | public get<T extends ConfigKeys>(key: T): ConfigOptions[T] {
24 | return this.config[key] as ConfigOptions[T];
25 | }
26 | public set(
27 | key: keyof ConfigOptions,
28 | value: ConfigOptions[keyof ConfigOptions]
29 | ): void {
30 | const updatedConfig = { ...this.config, [key]: value };
31 | try {
32 | configSchema.parse(updatedConfig);
33 | this.config = updatedConfig;
34 | } catch (error) {
35 | if (error instanceof z.ZodError) {
36 | logger.error(`Invalid configuration value: ${error.errors}`);
37 | }
38 | throw error;
39 | }
40 | }
41 | public getAll(): ConfigOptions {
42 | return this.config;
43 | }
44 | public reset(): void {
45 | this.config = DEFAULT_CONFIG;
46 | }
47 | public static destroy(): void {
48 | Config.instance = undefined;
49 | }
50 | public override(config: Partial<ConfigOptions>): void {
51 | const newOverrideConfig = { ...this.config, ...config };
52 | try {
53 | configSchema.parse(newOverrideConfig);
54 | this.config = newOverrideConfig;
55 | } catch (error) {
56 | if (error instanceof z.ZodError) {
57 | logger.error(`Invalid configuration value: ${error.errors}`);
58 | }
59 | throw error;
60 | }
61 | }
62 | private async initialize(): Promise<Config> {
63 | try {
64 | const currentDirConfig = documentFactory.join(
65 | process.cwd(),
66 | this.config.codeConfigFile
67 | );
68 | if (documentFactory.exists(currentDirConfig)) {
69 | const fileContent = await documentFactory.readFile(currentDirConfig);
70 | if (!fileContent.trim()) {
71 | throw new Error(`Configuration file is empty: ${currentDirConfig}`);
72 | }
73 | let userConfig;
74 | try {
75 | userConfig = JSON.parse(fileContent);
76 | } catch {
77 | throw new Error(
78 | `Invalid JSON in configuration file: ${currentDirConfig}`
79 | );
80 | }
81 | const validatedConfig = configSchema.parse({
82 | ...this.config,
83 | ...userConfig
84 | });
85 | this.config = validatedConfig;
86 | }
87 | } catch (error) {
88 | if (error instanceof z.ZodError) {
89 | const details = error.errors
90 | .map(err => `${err.path.join(".")}: ${err.message}`)
91 | .join(", ");
92 | throw new Error(`Configuration validation failed: ${details}`);
93 | }
94 | throw error;
95 | }
96 | return this;
97 | }
98 | }
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
