
# Code Documentation
Generated on: 2024-12-04T07:15:06.458Z
Total files: 32

## Project Structure

```
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
```


## File: CodeWrangler.ts
- Path: `/root/git/codewrangler/src/cli/CodeWrangler.ts`
- Size: 1.21 KB
- Extension: .ts
- Lines of code: 32
- Content:

```ts
 1 | import { Command } from "commander";
 2 | 
 3 | import { GenerateCommand } from "./commands/GenerateCommand";
 4 | import { ICommandOptions } from "./commands/types";
 5 | import { ProgramBuilder } from "./program/ProgramBuilder";
 6 | import { Config } from "../utils/config/Config";
 7 | 
 8 | export class CodeWrangler {
 9 |   private static instance: CodeWrangler | undefined;
10 |   private readonly VERSION = "1.0.0";
11 |   private config: Config;
12 |   private program: Command;
13 |   private generateCommand: GenerateCommand;
14 | 
15 |   private constructor(config: Config) {
16 |     this.config = config;
17 |     this.generateCommand = new GenerateCommand(this.config);
18 |     this.program = new ProgramBuilder(this.config, this.VERSION).build();
19 | 
20 |     this.setupCommands();
21 |   }
22 | 
23 |   public static async run(): Promise<boolean> {
24 |     if (!CodeWrangler.instance) {
25 |       const config = await Config.load();
26 |       CodeWrangler.instance = new CodeWrangler(config);
27 |       await CodeWrangler.instance.program.parseAsync(process.argv);
28 |       return true;
29 |     }
30 |     throw new Error("CodeWrangler already initialized");
31 |   }
32 | 
33 |   private setupCommands(): void {
34 |     this.program.action(async (pattern: string, options: ICommandOptions) => {
35 |       await this.generateCommand.execute([pattern], options);
36 |     });
37 |   }
38 | }
39 | 
```

---------------------------------------------------------------------------


## File: DemoCommand.ts
- Path: `/root/git/codewrangler/src/cli/commands/DemoCommand.ts`
- Size: 7.39 KB
- Extension: .ts
- Lines of code: 279
- Content:

```ts
  1 | /* eslint-disable max-lines-per-function */
  2 | import { Stats } from "fs";
  3 | import * as fs from "fs/promises";
  4 | import * as path from "path";
  5 | 
  6 | interface IFileInfo {
  7 |   name: string;
  8 |   path: string;
  9 |   content: string;
 10 |   ext: string;
 11 |   size: number;
 12 |   lines: number;
 13 | }
 14 | 
 15 | interface ITreeNode {
 16 |   name: string;
 17 |   path: string;
 18 |   type: "file" | "directory";
 19 |   children: ITreeNode[];
 20 | }
 21 | 
 22 | interface IDocumentConfig {
 23 |   pattern: RegExp;
 24 |   rootDir: string;
 25 |   outputPath: string;
 26 |   excludePatterns: string[];
 27 |   maxFileSize: number;
 28 |   ignoreHidden: boolean;
 29 |   compress: boolean;
 30 | }
 31 | 
 32 | const DEFAULT_CONFIG: IDocumentConfig = {
 33 |   pattern: /.*/,
 34 |   rootDir: process.cwd(),
 35 |   outputPath: "documentation.md",
 36 |   excludePatterns: ["node_modules/**", "**/dist/**", "**/*.test.ts"],
 37 |   maxFileSize: 1024 * 1024, // 1MB
 38 |   ignoreHidden: true,
 39 |   compress: false
 40 | };
 41 | 
 42 | // Tree visualization functions
 43 | const generateTreeSymbols = (depth: number, isLast: boolean[]): string => {
 44 |   if (depth === 0) return "";
 45 | 
 46 |   return (
 47 |     isLast
 48 |       .slice(0, -1)
 49 |       .map(last => (last ? "    " : "│   "))
 50 |       .join("") + (isLast[isLast.length - 1] ? "└── " : "├── ")
 51 |   );
 52 | };
 53 | 
 54 | const createTreeNode = async (
 55 |   nodePath: string,
 56 |   config: IDocumentConfig,
 57 |   relativePath = ""
 58 | ): Promise<ITreeNode | null> => {
 59 |   const stats = await fs.stat(nodePath);
 60 |   const name = path.basename(nodePath);
 61 | 
 62 |   if (!shouldInclude(nodePath, config)) {
 63 |     return null;
 64 |   }
 65 | 
 66 |   if (stats.isDirectory()) {
 67 |     const entries = await fs.readdir(nodePath, { withFileTypes: true });
 68 |     const children: ITreeNode[] = [];
 69 | 
 70 |     for (const entry of entries) {
 71 |       const childNode = await createTreeNode(
 72 |         path.join(nodePath, entry.name),
 73 |         config,
 74 |         path.join(relativePath, name)
 75 |       );
 76 |       if (childNode) children.push(childNode);
 77 |     }
 78 | 
 79 |     return {
 80 |       name,
 81 |       path: relativePath || name,
 82 |       type: "directory",
 83 |       children
 84 |     };
 85 |   } else if (isMatchingFile(nodePath, config)) {
 86 |     return {
 87 |       name,
 88 |       path: relativePath || name,
 89 |       type: "file",
 90 |       children: []
 91 |     };
 92 |   }
 93 | 
 94 |   return null;
 95 | };
 96 | 
 97 | const renderTreeNode = (
 98 |   node: ITreeNode,
 99 |   isLast: boolean[] = [],
100 |   result: string[] = []
101 | ): string[] => {
102 |   const prefix = generateTreeSymbols(isLast.length, isLast);
103 |   result.push(prefix + node.name);
104 | 
105 |   if (node.type === "directory") {
106 |     node.children.forEach((child, index) => {
107 |       renderTreeNode(
108 |         child,
109 |         [...isLast, index === node.children.length - 1],
110 |         result
111 |       );
112 |     });
113 |   }
114 | 
115 |   return result;
116 | };
117 | 
118 | const isHidden = (filePath: string): boolean => {
119 |   const baseName = path.basename(filePath);
120 |   return baseName.startsWith(".");
121 | };
122 | 
123 | const shouldInclude = (
124 |   filePath: string,
125 |   { excludePatterns, ignoreHidden }: IDocumentConfig
126 | ): boolean => {
127 |   // Check for hidden files if ignoreHidden is enabled
128 |   if (ignoreHidden && isHidden(filePath)) {
129 |     return false;
130 |   }
131 | 
132 |   // Check against exclude patterns
133 |   const isExcluded = excludePatterns.some(pattern =>
134 |     new RegExp(pattern.replace(/\*/g, ".*")).test(filePath)
135 |   );
136 | 
137 |   return !isExcluded;
138 | };
139 | 
140 | // Pure functions for file operations
141 | const isMatchingFile = (filePath: string, config: IDocumentConfig): boolean => {
142 |   if (!config.pattern) {
143 |     throw new Error("Pattern is not defined in the config");
144 |   }
145 | 
146 |   if (!shouldInclude(filePath, config)) {
147 |     return false;
148 |   }
149 | 
150 |   return config.pattern.test(filePath);
151 | };
152 | 
153 | const formatSize = (bytes: number): string => {
154 |   const units = ["B", "KB", "MB", "GB"];
155 |   let size = bytes;
156 |   let unitIndex = 0;
157 | 
158 |   while (size >= 1024 && unitIndex < units.length - 1) {
159 |     size /= 1024;
160 |     unitIndex++;
161 |   }
162 | 
163 |   return `${size.toFixed(2)} ${units[unitIndex]}`;
164 | };
165 | 
166 | // Core file processing functions
167 | 
168 | async function* walkDirectory(dir: string): AsyncGenerator<string> {
169 |   const entries = await fs.readdir(dir, { withFileTypes: true });
170 | 
171 |   for (const entry of entries) {
172 |     const fullPath = path.join(dir, entry.name);
173 | 
174 |     if (entry.isDirectory()) {
175 |       yield* walkDirectory(fullPath);
176 |     } else {
177 |       yield fullPath;
178 |     }
179 |   }
180 | }
181 | 
182 | const formatContentWithLineNumbers = (content: string): string => {
183 |   const lines = content.split("\n");
184 |   const lineNumberWidth = lines.length.toString().length;
185 | 
186 |   return lines
187 |     .map((line, index) => {
188 |       const lineNumber = (index + 1).toString().padStart(lineNumberWidth, " ");
189 |       return `${lineNumber} | ${line}`;
190 |     })
191 |     .join("\n");
192 | };
193 | 
194 | // Markdown generation functions
195 | const generateFileSection = (
196 |   file: IFileInfo,
197 |   compress: boolean = false
198 | ): string =>
199 |   !compress
200 |     ? `
201 | ## File: ${file.name}
202 | - Path: \`${file.path}\`
203 | - Size: ${formatSize(Number(file.size))}
204 | - Extension: ${file.ext}
205 | - Lines of code: ${file.lines}
206 | - Content:
207 | 
208 | \`\`\`${file.ext.slice(1) || "plaintext"}
209 | ${formatContentWithLineNumbers(file.content)}
210 | \`\`\`
211 | 
212 | ---------------------------------------------------------------------------
213 | `
214 |     : `
215 | ## File: ${file.name}, Path: \`${file.path}\`
216 | \`\`\`${file.ext.slice(1) || "plaintext"}
217 | ${formatContentWithLineNumbers(file.content)}
218 | \`\`\``;
219 | 
220 | const generateMarkdownContent = (
221 |   files: IFileInfo[],
222 |   treeContent: string,
223 |   compress: boolean
224 | ): string =>
225 |   !compress
226 |     ? `
227 | # Code Documentation
228 | Generated on: ${new Date().toISOString()}
229 | Total files: ${files.length}
230 | 
231 | ## Project Structure
232 | 
233 | \`\`\`
234 | ${treeContent}
235 | \`\`\`
236 | 
237 | ${files.map(file => generateFileSection(file)).join("\n")}
238 | `
239 |     : `
240 | # Code documentation
241 | \`\`\`
242 | ${treeContent}
243 | \`\`\`
244 | ${files.map(file => generateFileSection(file, true)).join("\n")}
245 | `;
246 | 
247 | const compressContent = (content: string): string =>
248 |   content
249 |     .split("\n")
250 |     .map(line => line.trim())
251 |     .filter(line => line !== "")
252 |     .filter(line => !line.startsWith("//"))
253 |     .join("\n");
254 | 
255 | async function generateFileInfo(
256 |   filePath: string,
257 |   stats: Stats,
258 |   compress: boolean
259 | ): Promise<IFileInfo> {
260 |   const content = await fs.readFile(filePath, "utf-8");
261 |   return {
262 |     name: path.basename(filePath),
263 |     path: filePath,
264 |     content: compress ? compressContent(content) : content,
265 |     ext: path.extname(filePath),
266 |     size: stats.size,
267 |     lines: content.split("\n").filter(line => line.trim() !== "").length
268 |   };
269 | }
270 | 
271 | // Main function
272 | async function generateDocumentation(
273 |   userConfig: Partial<IDocumentConfig> = {}
274 | ): Promise<void> {
275 |   try {
276 |     const config: IDocumentConfig = { ...DEFAULT_CONFIG, ...userConfig };
277 |     const files: IFileInfo[] = [];
278 | 
279 |     // Generate tree structure
280 |     const rootNode = await createTreeNode(config.rootDir, config);
281 |     const treeContent = rootNode
282 |       ? renderTreeNode(rootNode).join("\n")
283 |       : "No matching files found";
284 | 
285 |     for await (const filePath of walkDirectory(config.rootDir)) {
286 |       if (!isMatchingFile(filePath, config)) {
287 |         continue;
288 |       }
289 |       const stats = await fs.stat(filePath);
290 |       if (stats.size > config.maxFileSize) {
291 |         continue;
292 |       }
293 |       const fileInfo = await generateFileInfo(filePath, stats, config.compress);
294 |       files.push(fileInfo);
295 |     }
296 | 
297 |     const markdownContent = generateMarkdownContent(
298 |       files,
299 |       treeContent,
300 |       config.compress
301 |     );
302 |     await fs.writeFile(config.outputPath, markdownContent, "utf-8");
303 |   } catch (error) {
304 |     console.error("Error generating documentation", error);
305 |     throw error;
306 |   }
307 | }
308 | 
309 | if (require.main === module) {
310 |   generateDocumentation({
311 |     pattern: /\.ts$/,
312 |     outputPath: "demo.md",
313 |     ignoreHidden: true,
314 |     excludePatterns: [
315 |       "node_modules",
316 |       "dist",
317 |       "documentation",
318 |       "coverage",
319 |       "**/__tests__",
320 |       "**/*.test.ts"
321 |     ],
322 |     compress: false
323 |   }).catch(console.error);
324 | }
325 | 
```

---------------------------------------------------------------------------


## File: GenerateCommand.ts
- Path: `/root/git/codewrangler/src/cli/commands/GenerateCommand.ts`
- Size: 1.74 KB
- Extension: .ts
- Lines of code: 49
- Content:

```ts
 1 | import { ICommand, ICommandOptions } from "./types";
 2 | import { DocumentTreeBuilder } from "../../services/builder/DocumentTreeBuilder";
 3 | import { HTMLRenderStrategy } from "../../services/renderer/strategies/HTMLStrategy";
 4 | import { MarkdownStrategy } from "../../services/renderer/strategies/MarkdownStrategy";
 5 | import { Config } from "../../utils/config/Config";
 6 | import { logger } from "../../utils/logger/Logger";
 7 | 
 8 | const CONFIG_FROM_FORMAT = {
 9 |   markdown: MarkdownStrategy,
10 |   html: HTMLRenderStrategy
11 | } as const;
12 | 
13 | export class GenerateCommand implements ICommand {
14 |   public constructor(private config: Config) {}
15 | 
16 |   public async execute(
17 |     args: string[],
18 |     options: ICommandOptions
19 |   ): Promise<void> {
20 |     try {
21 |       // Override config with command options
22 |       this.config.override({ ...options, pattern: args[0] });
23 | 
24 |       // Log verbose information if enabled
25 |       if (options.verbose) {
26 |         this.logVerbose();
27 |       }
28 | 
29 |       // Execute document tree building
30 |       const outputFormat = this.config.get("outputFormat");
31 |       outputFormat.map(format => new CONFIG_FROM_FORMAT[format](this.config));
32 |       const builder = new DocumentTreeBuilder(this.config);
33 |       await builder.build();
34 | 
35 |       // Execute rendering
36 |     } catch (error) {
37 |       logger.error("Generation failed:", error as Error);
38 |       throw error;
39 |     }
40 |   }
41 | 
42 |   private logVerbose(): void {
43 |     logger.debug(
44 |       `Searching for file matching pattern: ${this.config.get("pattern")}`
45 |     );
46 |     logger.debug(
47 |       `Excluding patterns: ${(
48 |         this.config.get("excludePatterns") as string[]
49 |       ).join(", ")}`
50 |     );
51 |     logger.debug(
52 |       `Ignoring hidden files: ${this.config.get("ignoreHiddenFiles")}`
53 |     );
54 |     logger.debug(`Max file size: ${this.config.get("maxFileSize")} bytes`);
55 |   }
56 | }
57 | 
```

---------------------------------------------------------------------------


## File: types.ts
- Path: `/root/git/codewrangler/src/cli/commands/types.ts`
- Size: 335.00 B
- Extension: .ts
- Lines of code: 14
- Content:

```ts
 1 | export interface ICommandOptions {
 2 |   dir?: string;
 3 |   output?: string;
 4 |   config?: string;
 5 |   verbose?: boolean;
 6 |   format?: string[];
 7 |   maxSize?: number;
 8 |   exclude?: string[];
 9 |   ignoreHidden?: boolean;
10 |   additionalIgnore?: string[];
11 | }
12 | 
13 | export interface ICommand {
14 |   execute: (args: string[], options: ICommandOptions) => Promise<void>;
15 | }
16 | 
```

---------------------------------------------------------------------------


## File: index.ts
- Path: `/root/git/codewrangler/src/cli/index.ts`
- Size: 416.00 B
- Extension: .ts
- Lines of code: 16
- Content:

```ts
 1 | #!/usr/bin/env node
 2 | import { CodeWrangler } from "./CodeWrangler";
 3 | import { logger } from "../utils/logger/Logger";
 4 | 
 5 | async function main(): Promise<void> {
 6 |   try {
 7 |     await CodeWrangler.run();
 8 |   } catch (error) {
 9 |     if (error instanceof Error) {
10 |       logger.error(error.message);
11 |     } else {
12 |       logger.error("An unknown error occurred");
13 |     }
14 |     process.exit(1);
15 |   }
16 | }
17 | 
18 | main().catch(() => process.exit(1));
19 | 
```

---------------------------------------------------------------------------


## File: ProgramBuilder.ts
- Path: `/root/git/codewrangler/src/cli/program/ProgramBuilder.ts`
- Size: 1.88 KB
- Extension: .ts
- Lines of code: 67
- Content:

```ts
 1 | import { Command } from "commander";
 2 | 
 3 | import { Config } from "../../utils/config/Config";
 4 | 
 5 | export class ProgramBuilder {
 6 |   private program: Command;
 7 | 
 8 |   public constructor(
 9 |     private config: Config,
10 |     private version: string
11 |   ) {
12 |     this.program = new Command();
13 |   }
14 | 
15 |   public build(): Command {
16 |     this.buildVersion().buildDescription().buildArguments().buildOptions();
17 |     return this.program;
18 |   }
19 | 
20 |   private buildVersion(): ProgramBuilder {
21 |     this.program.version(this.version);
22 |     return this;
23 |   }
24 | 
25 |   private buildDescription(): ProgramBuilder {
26 |     this.program.description("CodeWrangler is a tool for generating code");
27 |     return this;
28 |   }
29 | 
30 |   private buildArguments(): ProgramBuilder {
31 |     this.program.argument(
32 |       "<pattern>",
33 |       'File pattern to match (e.g., "\\.ts$" for TypeScript files)'
34 |     );
35 |     return this;
36 |   }
37 | 
38 |   // eslint-disable-next-line max-lines-per-function
39 |   private buildOptions(): ProgramBuilder {
40 |     this.program
41 |       .option("-d, --dir <dir>", "Directory to search", this.config.get("dir"))
42 |       .option(
43 |         "-c, --config <config>",
44 |         "Config file",
45 |         this.config.get("codeConfigFile")
46 |       )
47 |       .option("-v, --verbose", "Verbose mode", this.config.get("logLevel"))
48 |       .option(
49 |         "-f, --format <format>",
50 |         "Output format",
51 |         this.config.get("outputFormat")
52 |       )
53 |       .option(
54 |         "-o, --output <output>",
55 |         "Output file",
56 |         this.config.get("outputFile")
57 |       )
58 |       .option(
59 |         "-e, --exclude <exclude>",
60 |         "Exclude patterns",
61 |         this.config.get("excludePatterns")
62 |       )
63 |       .option(
64 |         "-i, --ignore-hidden",
65 |         "Ignore hidden files",
66 |         this.config.get("ignoreHiddenFiles")
67 |       )
68 |       .option(
69 |         "-a, --additional-ignore <additional-ignore>",
70 |         "Additional ignore patterns",
71 |         this.config.get("additionalIgnoreFiles")
72 |       );
73 |     return this;
74 |   }
75 | }
76 | 
```

---------------------------------------------------------------------------


## File: NodeBase.ts
- Path: `/root/git/codewrangler/src/core/entities/NodeBase.ts`
- Size: 2.74 KB
- Extension: .ts
- Lines of code: 110
- Content:

```ts
  1 | import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
  2 | import { IRenderStrategy } from "../../services/renderer/RenderStrategy";
  3 | import { IFileStats, IPropsNode } from "../../types/type";
  4 | 
  5 | const defaultProps: IPropsNode = {
  6 |   name: "",
  7 |   path: "",
  8 |   deep: 0,
  9 |   size: 0, // size of the node from the children nodes
 10 |   stats: {
 11 |     size: 0, // size of the node from the file system
 12 |     created: new Date(),
 13 |     modified: new Date(),
 14 |     accessed: new Date(),
 15 |     isDirectory: false,
 16 |     isFile: false,
 17 |     permissions: {
 18 |       readable: false,
 19 |       writable: false,
 20 |       executable: false
 21 |     }
 22 |   }
 23 | };
 24 | 
 25 | export interface INodeContent {
 26 |   content: string;
 27 | }
 28 | 
 29 | interface INodeLifeCycle {
 30 |   validate: () => boolean;
 31 |   bundle: (deep: number) => Promise<void>;
 32 |   render: (strategy: IRenderStrategy) => INodeContent;
 33 |   dispose: () => void;
 34 |   clone: () => NodeBase;
 35 | }
 36 | 
 37 | export abstract class NodeBase implements INodeLifeCycle {
 38 |   protected _props: IPropsNode = { ...defaultProps };
 39 | 
 40 |   public constructor(
 41 |     _name: string,
 42 |     private originalPath: string
 43 |   ) {
 44 |     this.initNode(_name, originalPath);
 45 |     this.validate();
 46 |   }
 47 | 
 48 |   public validate(): boolean {
 49 |     if (!documentFactory.exists(this.path)) {
 50 |       throw new Error(`Path ${this.originalPath} does not exist`);
 51 |     }
 52 |     if (!documentFactory.isAbsolute(this.path)) {
 53 |       throw new Error(`Path ${this.originalPath} is not absolute`);
 54 |     }
 55 |     return true;
 56 |   }
 57 | 
 58 |   // abstract methods
 59 |   public abstract bundle(deep: number): Promise<void>;
 60 |   public abstract render(strategy: IRenderStrategy): INodeContent;
 61 |   public abstract get secondaryProps(): Record<string, unknown> | undefined;
 62 | 
 63 |   // getters and setters
 64 |   // deep
 65 |   get deep(): number {
 66 |     return this._props.deep;
 67 |   }
 68 |   set deep(deep: number) {
 69 |     this._props.deep = deep;
 70 |   }
 71 | 
 72 |   // size
 73 |   get size(): number {
 74 |     return this._props.size;
 75 |   }
 76 |   set size(size: number) {
 77 |     this._props.size = size;
 78 |   }
 79 | 
 80 |   // name
 81 |   get name(): string {
 82 |     return this._props.name;
 83 |   }
 84 |   set name(name: string) {
 85 |     this._props.name = name;
 86 |   }
 87 | 
 88 |   // path
 89 |   get path(): string {
 90 |     return this._props.path;
 91 |   }
 92 |   set path(path: string) {
 93 |     this._props.path = path;
 94 |   }
 95 | 
 96 |   // stats
 97 |   get stats(): IFileStats | undefined {
 98 |     return this._props.stats;
 99 |   }
100 |   set stats(stats: IFileStats | undefined) {
101 |     this._props.stats = stats;
102 |   }
103 | 
104 |   // props
105 |   get props(): IPropsNode {
106 |     return {
107 |       ...this._props,
108 |       ...this.secondaryProps
109 |     };
110 |   }
111 | 
112 |   public dispose(): void {
113 |     this._props = { ...defaultProps };
114 |   }
115 | 
116 |   public clone(): NodeBase {
117 |     return Object.assign(Object.create(this), this);
118 |   }
119 | 
120 |   private initNode(name: string, path: string): void {
121 |     this.deep = 0;
122 |     this.size = 0;
123 |     this.name = name;
124 |     this.path = documentFactory.resolve(path);
125 |   }
126 | }
127 | 
```

---------------------------------------------------------------------------


## File: NodeDirectory.ts
- Path: `/root/git/codewrangler/src/core/entities/NodeDirectory.ts`
- Size: 2.50 KB
- Extension: .ts
- Lines of code: 77
- Content:

```ts
 1 | import { INodeContent, NodeBase } from "./NodeBase";
 2 | import { NodeFile } from "./NodeFile";
 3 | import { fileStatsService } from "../../infrastructure/filesystem/FileStats";
 4 | import { IRenderStrategy } from "../../services/renderer/RenderStrategy";
 5 | 
 6 | interface IPropsDirectory {
 7 |   length: number;
 8 |   deepLength: number;
 9 | }
10 | 
11 | const defaultPropsDirectory: IPropsDirectory = {
12 |   length: 0,
13 |   deepLength: 0
14 | };
15 | 
16 | export abstract class NodeDirectory extends NodeBase {
17 |   public children: (NodeFile | NodeDirectory)[] = [];
18 |   private _propsDirectory: IPropsDirectory = { ...defaultPropsDirectory };
19 | 
20 |   public constructor(name: string, pathName: string) {
21 |     super(name, pathName);
22 |     this.initDirectory();
23 |   }
24 |   // getters and setters
25 |   public get length(): number {
26 |     return this._propsDirectory.length;
27 |   }
28 |   public set length(length: number) {
29 |     this._propsDirectory.length = length;
30 |   }
31 |   public get deepLength(): number {
32 |     return this._propsDirectory.deepLength;
33 |   }
34 |   public set deepLength(deepLength: number) {
35 |     this._propsDirectory.deepLength = deepLength;
36 |   }
37 |   public get secondaryProps(): Record<string, unknown> {
38 |     return {
39 |       ...this._propsDirectory
40 |     };
41 |   }
42 | 
43 |   public addChild(child: NodeFile | NodeDirectory): NodeDirectory {
44 |     if (!(child instanceof NodeFile || child instanceof NodeDirectory)) {
45 |       throw new Error("Invalid child type");
46 |     }
47 |     this.children.push(child);
48 |     return this;
49 |   }
50 | 
51 |   public async bundle(deep: number = 0): Promise<void> {
52 |     // set the deep of the directory
53 |     this.deep = deep;
54 | 
55 |     // bundle all children
56 |     await Promise.all(this.children.map(child => child.bundle(deep + 1)));
57 | 
58 |     // set the length of the directory
59 |     this.length = this.children.filter(
60 |       child => child instanceof NodeFile
61 |     ).length;
62 | 
63 |     // set the deep length of the directory
64 |     this.deepLength = this.children.reduce(
65 |       (acc, child) =>
66 |         acc + (child instanceof NodeDirectory ? child.deepLength + 1 : 1),
67 |       0
68 |     );
69 | 
70 |     // set the size of the directory
71 |     this.size = this.children.reduce((acc, child) => acc + child.size, 0);
72 | 
73 |     // set stats
74 |     this.stats = await fileStatsService(this.path);
75 |   }
76 | 
77 |   public abstract override render(strategy: IRenderStrategy): INodeContent;
78 | 
79 |   private initDirectory(): void {
80 |     this.children = [];
81 |     this._propsDirectory = { ...defaultPropsDirectory };
82 |   }
83 | }
84 | 
85 | export class RenderableDirectory extends NodeDirectory {
86 |   public override render(strategy: IRenderStrategy): INodeContent {
87 |     return {
88 |       content: strategy.renderDirectory(this)
89 |     };
90 |   }
91 | }
92 | 
```

---------------------------------------------------------------------------


## File: NodeFile.ts
- Path: `/root/git/codewrangler/src/core/entities/NodeFile.ts`
- Size: 2.08 KB
- Extension: .ts
- Lines of code: 69
- Content:

```ts
 1 | import { INodeContent, NodeBase } from "./NodeBase";
 2 | import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
 3 | import { fileStatsService } from "../../infrastructure/filesystem/FileStats";
 4 | import { IRenderStrategy } from "../../services/renderer/RenderStrategy";
 5 | 
 6 | interface IPropsFile {
 7 |   extension: string;
 8 | }
 9 | 
10 | const defaultPropsFile: IPropsFile = {
11 |   extension: ""
12 | };
13 | 
14 | export abstract class NodeFile extends NodeBase {
15 |   private _propsFile: IPropsFile = { ...defaultPropsFile };
16 |   private _content: string | null = null;
17 | 
18 |   public constructor(name: string, pathName: string) {
19 |     super(name, pathName);
20 |     this.initFile(name);
21 |   }
22 | 
23 |   // getters and setters
24 |   // extension
25 |   public get extension(): string {
26 |     return this._propsFile.extension;
27 |   }
28 |   protected set extension(extension: string) {
29 |     this._propsFile.extension = extension;
30 |   }
31 |   // content
32 |   public get content(): string | null {
33 |     return this._content;
34 |   }
35 |   protected set content(content: string | null) {
36 |     this._content = content;
37 |   }
38 |   // secondary props
39 |   public get secondaryProps(): Record<string, unknown> | undefined {
40 |     return {
41 |       extension: this.extension
42 |     };
43 |   }
44 | 
45 |   // bundle
46 |   public async bundle(deep: number = 0): Promise<void> {
47 |     // set the deep of the file
48 |     this.deep = deep;
49 |     // set the size of the file
50 |     this.size = await documentFactory.size(this.path);
51 |     // set the content of the file
52 |     this.content = await documentFactory.readFile(this.path);
53 |     // set the stats of the file
54 |     this.stats = await fileStatsService(this.path);
55 |   }
56 | 
57 |   // render
58 |   public abstract override render(strategy: IRenderStrategy): INodeContent;
59 | 
60 |   private initFile(name: string): void {
61 |     this._propsFile = { ...defaultPropsFile };
62 |     this.extension = documentFactory.extension(name);
63 |     this._content = null;
64 |   }
65 | }
66 | 
67 | export class RenderableFile extends NodeFile {
68 |   // render
69 |   public override render(strategy: IRenderStrategy): INodeContent {
70 |     return {
71 |       content: strategy.renderFile(this)
72 |     };
73 |   }
74 | 
75 |   // dispose
76 |   public override async dispose(): Promise<void> {
77 |     await super.dispose();
78 |   }
79 | }
80 | 
```

---------------------------------------------------------------------------


## File: DirectoryNotFoundError.ts
- Path: `/root/git/codewrangler/src/core/errors/DirectoryNotFoundError.ts`
- Size: 235.00 B
- Extension: .ts
- Lines of code: 7
- Content:

```ts
1 | import { DocumentError } from "./DocumentError";
2 | 
3 | export class DirectoryNotFoundError extends DocumentError {
4 |   public constructor(path: string) {
5 |     super("Directory not found", path);
6 |     this.name = "DirectoryNotFoundError";
7 |   }
8 | }
9 | 
```

---------------------------------------------------------------------------


## File: DocumentError.ts
- Path: `/root/git/codewrangler/src/core/errors/DocumentError.ts`
- Size: 216.00 B
- Extension: .ts
- Lines of code: 9
- Content:

```ts
 1 | export class DocumentError extends Error {
 2 |   public constructor(
 3 |     message: string,
 4 |     public readonly path: string
 5 |   ) {
 6 |     super(`Document error at ${path}: ${message}`);
 7 |     this.name = "DocumentError";
 8 |   }
 9 | }
10 | 
```

---------------------------------------------------------------------------


## File: FileNotFoundError.ts
- Path: `/root/git/codewrangler/src/core/errors/FileNotFoundError.ts`
- Size: 220.00 B
- Extension: .ts
- Lines of code: 7
- Content:

```ts
1 | import { DocumentError } from "./DocumentError";
2 | 
3 | export class FileNotFoundError extends DocumentError {
4 |   public constructor(path: string) {
5 |     super("File not found", path);
6 |     this.name = "FileNotFoundError";
7 |   }
8 | }
9 | 
```

---------------------------------------------------------------------------


## File: index.ts
- Path: `/root/git/codewrangler/src/core/errors/index.ts`
- Size: 173.00 B
- Extension: .ts
- Lines of code: 3
- Content:

```ts
1 | export { DocumentError } from "./DocumentError";
2 | export { DirectoryNotFoundError } from "./DirectoryNotFoundError";
3 | export { FileNotFoundError } from "./FileNotFoundError";
4 | 
```

---------------------------------------------------------------------------


## File: DocumentFactory.ts
- Path: `/root/git/codewrangler/src/infrastructure/filesystem/DocumentFactory.ts`
- Size: 9.64 KB
- Extension: .ts
- Lines of code: 316
- Content:

```ts
  1 | import { ObjectEncodingOptions } from "fs";
  2 | import * as fsSync from "fs";
  3 | import * as fs from "fs/promises";
  4 | import * as path from "path";
  5 | 
  6 | import { fileStatsService } from "./FileStats";
  7 | import { DocumentError, FileNotFoundError } from "../../core/errors";
  8 | import {
  9 |   FILE_TYPE,
 10 |   FileType,
 11 |   IDirectoryOptions,
 12 |   IReadOptions,
 13 |   IWriteOptions
 14 | } from "../../types/type";
 15 | 
 16 | export const documentFactory = {
 17 |   /**
 18 |    * Gets the type of a file system entry
 19 |    * @param filePath - The path to check
 20 |    * @returns The type of the file system entry (File or Directory)
 21 |    * @throws {FileNotFoundError} If the path doesn't exist
 22 |    * @throws {DocumentError} For other file system errors
 23 |    */
 24 |   async type(filePath: string): Promise<FileType> {
 25 |     try {
 26 |       const stats = await fs.stat(filePath);
 27 |       return stats.isDirectory() ? FILE_TYPE.Directory : FILE_TYPE.File;
 28 |     } catch (error) {
 29 |       if ((error as NodeJS.ErrnoException).code === "ENOENT") {
 30 |         throw new FileNotFoundError(filePath);
 31 |       }
 32 |       throw new DocumentError(String(error), filePath);
 33 |     }
 34 |   },
 35 | 
 36 |   /**
 37 |    * Gets file size in bytes
 38 |    * @param filePath - The path to the file
 39 |    * @returns The size of the file in bytes
 40 |    * @throws {FileNotFoundError} If the file doesn't exist
 41 |    * @throws {DocumentError} For other file system errors or if path is a directory
 42 |    */
 43 |   async size(filePath: string): Promise<number> {
 44 |     const isDirectory = (await this.type(filePath)) === FILE_TYPE.Directory;
 45 |     if (isDirectory) {
 46 |       throw new DocumentError("Path is a directory", filePath);
 47 |     }
 48 |     const stats = await fileStatsService(filePath);
 49 |     return stats.size;
 50 |   },
 51 | 
 52 |   /**
 53 |    * Resolves a path to an absolute path
 54 |    * @param filePath - The path to resolve
 55 |    * @returns The absolute path
 56 |    */
 57 |   resolve(filePath: string): string {
 58 |     return path.resolve(filePath);
 59 |   },
 60 | 
 61 |   /**
 62 |    * Checks various access flags for a path
 63 |    * @private
 64 |    * @param filePath - The path to check access for
 65 |    * @returns An object containing readable, writable, and executable permission flags
 66 |    */
 67 |   async checkAccess(filePath: string): Promise<{
 68 |     readable: boolean;
 69 |     writable: boolean;
 70 |     executable: boolean;
 71 |   }> {
 72 |     const check = async (mode: number): Promise<boolean> => {
 73 |       try {
 74 |         await fs.access(filePath, mode);
 75 |         return true;
 76 |       } catch {
 77 |         return false;
 78 |       }
 79 |     };
 80 | 
 81 |     return {
 82 |       readable: await check(fs.constants.R_OK),
 83 |       writable: await check(fs.constants.W_OK),
 84 |       executable: await check(fs.constants.X_OK)
 85 |     };
 86 |   },
 87 | 
 88 |   /**
 89 |    * Reads the entire contents of a file synchronously
 90 |    * @param filePath - The path to the file
 91 |    * @param options - The options for the read operation
 92 |    * @returns The contents of the file as a string
 93 |    * @throws {Error} If the file cannot be read
 94 |    */
 95 |   readFileSync(filePath: string, options: IReadOptions = {}): string {
 96 |     return fsSync.readFileSync(filePath, {
 97 |       encoding: options.encoding ?? "utf-8",
 98 |       flag: options.flag
 99 |     });
100 |   },
101 | 
102 |   /**
103 |    * Reads the entire contents of a file
104 |    * @param filePath - The path to the file
105 |    * @param options - The options for the read operation
106 |    * @returns The contents of the file as a string
107 |    * @throws {FileNotFoundError} If the file doesn't exist
108 |    * @throws {DocumentError} For other file system errors
109 |    */
110 |   async readFile(
111 |     filePath: string,
112 |     options: IReadOptions = {}
113 |   ): Promise<string> {
114 |     try {
115 |       return await fs.readFile(filePath, {
116 |         encoding: options.encoding ?? "utf-8",
117 |         flag: options.flag
118 |       });
119 |     } catch (error) {
120 |       if ((error as NodeJS.ErrnoException).code === "ENOENT") {
121 |         throw new FileNotFoundError(filePath);
122 |       }
123 |       throw new DocumentError(String(error), filePath);
124 |     }
125 |   },
126 | 
127 |   /**
128 |    * Writes data to a file, replacing the file if it already exists
129 |    * @param filePath - The path to the file
130 |    * @param data - The data to write
131 |    * @param options - The options for the write operation
132 |    * @throws {DocumentError} For file system errors
133 |    */
134 |   async writeFile(
135 |     filePath: string,
136 |     data: string | Buffer,
137 |     options: IWriteOptions = {}
138 |   ): Promise<void> {
139 |     try {
140 |       await fs.writeFile(filePath, data, {
141 |         encoding: options.encoding ?? "utf-8",
142 |         mode: options.mode,
143 |         flag: options.flag
144 |       });
145 |     } catch (error) {
146 |       throw new DocumentError(String(error), filePath);
147 |     }
148 |   },
149 | 
150 |   /**
151 |    * Appends data to a file
152 |    * @param filePath - The path to the file
153 |    * @param content - The content to append
154 |    * @param options - The options for the write operation
155 |    * @throws {DocumentError} For file system errors
156 |    */
157 |   async appendFile(
158 |     filePath: string,
159 |     content: string,
160 |     options: IWriteOptions = {}
161 |   ): Promise<void> {
162 |     try {
163 |       await fs.appendFile(filePath, content, {
164 |         encoding: options.encoding ?? "utf-8",
165 |         mode: options.mode,
166 |         flag: options.flag
167 |       });
168 |     } catch (error) {
169 |       throw new DocumentError(String(error), filePath);
170 |     }
171 |   },
172 | 
173 |   /**
174 |    * Reads the contents of a directory
175 |    * @param dirPath - The path to the directory
176 |    * @param options - The options for the read operation
177 |    * @returns An array of file and directory names in the directory
178 |    * @throws {Error} If the directory cannot be read
179 |    */
180 |   async readDir(
181 |     dirPath: string,
182 |     options?: { withFileTypes?: boolean }
183 |   ): Promise<string[]> {
184 |     return await fs.readdir(dirPath, options as ObjectEncodingOptions);
185 |   },
186 | 
187 |   /**
188 |    * Creates a directory if it doesn't exist
189 |    * @param dirPath - The path where to create the directory
190 |    * @param recursive - Whether to create parent directories if they don't exist
191 |    * @throws {DocumentError} For file system errors
192 |    */
193 |   async createDir(dirPath: string, recursive = true): Promise<void> {
194 |     await fs.mkdir(dirPath, { recursive });
195 |   },
196 | 
197 |   /**
198 |    * Gets the base name of a file
199 |    * @param filePath - The path to the file
200 |    * @returns The base name of the file (last portion of the path)
201 |    */
202 |   baseName(filePath: string): string {
203 |     return path.basename(filePath);
204 |   },
205 | 
206 |   /**
207 |    * Gets the extension of a file
208 |    * @param filePath - The path to the file
209 |    * @returns The extension of the file including the dot (e.g., '.txt')
210 |    */
211 |   extension(filePath: string): string {
212 |     return path.extname(filePath);
213 |   },
214 | 
215 |   /**
216 |    * Checks if a file or directory exists
217 |    * @param filePath - The path to check
218 |    * @returns True if the file or directory exists, false otherwise
219 |    */
220 |   exists(filePath: string): boolean {
221 |     try {
222 |       fsSync.accessSync(filePath);
223 |       return true;
224 |     } catch {
225 |       return false;
226 |     }
227 |   },
228 | 
229 |   /**
230 |    * Checks if a path is absolute
231 |    * @param filePath - The path to check
232 |    * @returns True if the path is absolute, false otherwise
233 |    */
234 |   isAbsolute(filePath: string): boolean {
235 |     return path.isAbsolute(filePath);
236 |   },
237 | 
238 |   /**
239 |    * Gets directory contents with type information
240 |    * @param dirPath - The path to the directory
241 |    * @returns An array of objects containing name and type information for each entry
242 |    * @throws {DocumentError} If path is not a directory or other errors occur
243 |    */
244 |   async readDirectory(
245 |     dirPath: string
246 |   ): Promise<Array<{ name: string; type: FileType }>> {
247 |     try {
248 |       const entries = await fs.readdir(dirPath, { withFileTypes: true });
249 |       return entries.map(entry => ({
250 |         name: entry.name,
251 |         type: entry.isDirectory() ? FILE_TYPE.Directory : FILE_TYPE.File
252 |       }));
253 |     } catch (error) {
254 |       throw new DocumentError(String(error), dirPath);
255 |     }
256 |   },
257 | 
258 |   /**
259 |    * Creates a directory if it doesn't exist
260 |    * @param dirPath - The path where to create the directory
261 |    * @param options - Options for directory creation including recursive and mode
262 |    * @throws {DocumentError} For file system errors
263 |    */
264 |   async ensureDirectory(
265 |     dirPath: string,
266 |     options: IDirectoryOptions = {}
267 |   ): Promise<void> {
268 |     try {
269 |       if (!this.exists(dirPath)) {
270 |         await fs.mkdir(dirPath, {
271 |           recursive: options.recursive ?? true,
272 |           mode: options.mode
273 |         });
274 |       }
275 |     } catch (error) {
276 |       throw new DocumentError(String(error), dirPath);
277 |     }
278 |   },
279 | 
280 |   /**
281 |    * Removes a file or directory
282 |    * @param filePath - The path to remove
283 |    * @throws {DocumentError} For file system errors
284 |    */
285 |   async remove(filePath: string): Promise<void> {
286 |     const stats = await fs.stat(filePath);
287 |     if (stats.isDirectory()) {
288 |       await fs.rm(filePath, { recursive: true, force: true });
289 |     } else {
290 |       await fs.unlink(filePath);
291 |     }
292 |   },
293 | 
294 |   /**
295 |    * Copies a file or directory
296 |    * @param src - The source path
297 |    * @param dest - The destination path
298 |    * @throws {DocumentError} For file system errors
299 |    */
300 |   async copy(src: string, dest: string): Promise<void> {
301 |     const stats = await fs.stat(src);
302 | 
303 |     if (stats.isDirectory()) {
304 |       await this.copyDir(src, dest);
305 |     } else {
306 |       await fs.copyFile(src, dest);
307 |     }
308 |   },
309 | 
310 |   /**
311 |    * Copies a directory recursively
312 |    * @private
313 |    * @param src - The source directory path
314 |    * @param dest - The destination directory path
315 |    * @throws {DocumentError} For file system errors
316 |    */
317 |   async copyDir(src: string, dest: string): Promise<void> {
318 |     await this.ensureDirectory(dest);
319 |     const entries = await fs.readdir(src, { withFileTypes: true });
320 | 
321 |     for (const entry of entries) {
322 |       const srcPath = path.join(src, entry.name);
323 |       const destPath = path.join(dest, entry.name);
324 | 
325 |       if (entry.isDirectory()) {
326 |         await this.copyDir(srcPath, destPath);
327 |       } else {
328 |         await fs.copyFile(srcPath, destPath);
329 |       }
330 |     }
331 |   },
332 | 
333 |   /**
334 |    * Joins an array of paths into a single path
335 |    * @param paths - The paths to join
336 |    * @returns The joined path
337 |    */
338 |   join(...paths: string[]): string {
339 |     return path.join(...paths);
340 |   }
341 | };
342 | 
```

---------------------------------------------------------------------------


## File: FileStats.ts
- Path: `/root/git/codewrangler/src/infrastructure/filesystem/FileStats.ts`
- Size: 1.94 KB
- Extension: .ts
- Lines of code: 64
- Content:

```ts
 1 | import { Stats } from "fs";
 2 | import fs from "fs/promises";
 3 | 
 4 | import { DocumentError } from "../../core/errors/DocumentError";
 5 | import { FileNotFoundError } from "../../core/errors/FileNotFoundError";
 6 | import { IAccessFlags, IFileStats } from "../../types/type";
 7 | 
 8 | class FileStatsService {
 9 |   public async getStats(filePath: string): Promise<IFileStats> {
10 |     const stats = await this.getBasicStats(filePath);
11 |     const accessFlags = await this.checkAccess(filePath);
12 |     return this.mapStatsToFileInfo(stats, accessFlags);
13 |   }
14 |   private async getBasicStats(filePath: string): Promise<Stats> {
15 |     try {
16 |       return await fs.stat(filePath);
17 |     } catch (error) {
18 |       this.handleStatError(error as NodeJS.ErrnoException, filePath);
19 |       throw error; // TypeScript requires this
20 |     }
21 |   }
22 | 
23 |   private handleStatError(
24 |     error: NodeJS.ErrnoException,
25 |     filePath: string
26 |   ): never {
27 |     if (error.code === "ENOENT") {
28 |       throw new FileNotFoundError(filePath);
29 |     }
30 |     throw new DocumentError(String(error), filePath);
31 |   }
32 | 
33 |   private async checkAccess(filePath: string): Promise<IAccessFlags> {
34 |     const check = async (mode: number): Promise<boolean> => {
35 |       try {
36 |         await fs.access(filePath, mode);
37 |         return true;
38 |       } catch {
39 |         return false;
40 |       }
41 |     };
42 | 
43 |     return {
44 |       readable: await check(fs.constants.R_OK),
45 |       writable: await check(fs.constants.W_OK),
46 |       executable: await check(fs.constants.X_OK)
47 |     };
48 |   }
49 | 
50 |   private mapStatsToFileInfo(
51 |     stats: Stats,
52 |     accessFlags: IAccessFlags
53 |   ): IFileStats {
54 |     return {
55 |       size: stats.size,
56 |       created: stats.birthtime,
57 |       modified: stats.mtime,
58 |       accessed: stats.atime,
59 |       isDirectory: stats.isDirectory(),
60 |       isFile: stats.isFile(),
61 |       permissions: accessFlags
62 |     };
63 |   }
64 | }
65 | 
66 | export const fileStatsService = async (
67 |   filePath: string
68 | ): Promise<IFileStats> => {
69 |   const fileStatsService = new FileStatsService();
70 |   return await fileStatsService.getStats(filePath);
71 | };
72 | 
```

---------------------------------------------------------------------------


## File: JsonReader.ts
- Path: `/root/git/codewrangler/src/infrastructure/filesystem/JsonReader.ts`
- Size: 1.53 KB
- Extension: .ts
- Lines of code: 46
- Content:

```ts
 1 | import fs from "fs/promises";
 2 | 
 3 | import { documentFactory } from "./DocumentFactory";
 4 | import { DocumentError } from "../../core/errors/DocumentError";
 5 | import { FileNotFoundError } from "../../core/errors/FileNotFoundError";
 6 | 
 7 | export class JsonReader {
 8 |   public async readJsonSync(filePath: string): Promise<object> {
 9 |     try {
10 |       const absolutePath = this.validatePath(filePath);
11 |       const content = await this.readFileContent(absolutePath, filePath);
12 |       return this.parseJsonContent(content, filePath);
13 |     } catch (error) {
14 |       if (error instanceof DocumentError) {
15 |         throw error;
16 |       }
17 |       throw new DocumentError(String(error), filePath);
18 |     }
19 |   }
20 |   private validatePath(filePath: string): string {
21 |     const absolutePath = documentFactory.resolve(filePath);
22 |     if (!documentFactory.exists(absolutePath)) {
23 |       throw new FileNotFoundError(filePath);
24 |     }
25 |     return absolutePath;
26 |   }
27 | 
28 |   private async readFileContent(
29 |     absolutePath: string,
30 |     filePath: string
31 |   ): Promise<string> {
32 |     const content = await fs.readFile(absolutePath, "utf-8");
33 |     if (!content) {
34 |       throw new DocumentError(`File is empty`, filePath);
35 |     }
36 |     return content;
37 |   }
38 | 
39 |   private parseJsonContent(content: string, filePath: string): object {
40 |     try {
41 |       return JSON.parse(content);
42 |     } catch (error) {
43 |       throw new DocumentError(`Invalid JSON: ${String(error)}`, filePath);
44 |     }
45 |   }
46 | }
47 | 
48 | export const jsonReader = async (path: string): Promise<object> => {
49 |   const jsonReader = new JsonReader();
50 |   return await jsonReader.readJsonSync(path);
51 | };
52 | 
```

---------------------------------------------------------------------------


## File: TemplateEngine.ts
- Path: `/root/git/codewrangler/src/infrastructure/templates/TemplateEngine.ts`
- Size: 4.14 KB
- Extension: .ts
- Lines of code: 129
- Content:

```ts
  1 | import { ZodObject, z } from "zod";
  2 | 
  3 | import { TemplateType } from "../../types/template";
  4 | import { Config } from "../../utils/config";
  5 | import { logger } from "../../utils/logger";
  6 | import { documentFactory } from "../filesystem/DocumentFactory";
  7 | 
  8 | type TemplateValue = z.ZodType<string | number | boolean | undefined>;
  9 | 
 10 | export class Template<
 11 |   T extends Record<string, TemplateValue> = Record<string, TemplateValue>
 12 | > {
 13 |   private _content: string = "";
 14 |   private schema: ZodObject<T>;
 15 | 
 16 |   public constructor(
 17 |     private type: TemplateType,
 18 |     schema: ZodObject<T>
 19 |   ) {
 20 |     // convert all fields to optional
 21 |     const optionalFields = Object.fromEntries(
 22 |       Object.entries(schema.shape).map(([key, value]) => [
 23 |         key,
 24 |         value.optional()
 25 |       ])
 26 |     );
 27 |     this.schema = schema.extend(optionalFields) as unknown as ZodObject<T>;
 28 |   }
 29 | 
 30 |   public async load(
 31 |     path: string,
 32 |     additionalFields?: Record<string, z.ZodSchema<string>>
 33 |   ): Promise<void> {
 34 |     this._content = await documentFactory.readFile(path);
 35 |     if (additionalFields) {
 36 |       this.schema = this.schema.extend(additionalFields) as ZodObject<T>;
 37 |     }
 38 |     this.validate();
 39 |   }
 40 | 
 41 |   public static getTemplateDir(config: Config): string {
 42 |     const dir = documentFactory.join(
 43 |       config.get("rootDir") as string,
 44 |       config.get("templatesDir") as string
 45 |     );
 46 |     if (!documentFactory.exists(dir)) {
 47 |       throw new Error(`Templates directory not found: ${dir}`);
 48 |     }
 49 |     return dir;
 50 |   }
 51 | 
 52 |   public get content(): string {
 53 |     if (!this._content) {
 54 |       throw new Error(`Template content is not loaded for ${this.type}`);
 55 |     }
 56 |     return this._content;
 57 |   }
 58 | 
 59 |   public static async create<T extends Record<string, TemplateValue>>(
 60 |     type: TemplateType,
 61 |     schema: ZodObject<T>,
 62 |     path: string,
 63 |     additionalFields?: Record<string, z.ZodSchema<string>>
 64 |   ): Promise<Template<T>> {
 65 |     const template = new Template(type, schema);
 66 |     await template.load(path, additionalFields);
 67 |     return template;
 68 |   }
 69 | 
 70 |   public render(data: Record<string, string | number | boolean>): string {
 71 |     try {
 72 |       this.validateData(data);
 73 |       return this.replaceTokens(data);
 74 |     } catch {
 75 |       throw new Error(`Template content validation failed for ${this.type}`);
 76 |     }
 77 |   }
 78 | 
 79 |   private validateData(data: Record<string, string | number | boolean>): void {
 80 |     this.schema.parse(data);
 81 |     this.validateRequiredTokens(data);
 82 |   }
 83 | 
 84 |   private validateRequiredTokens(
 85 |     data: Record<string, string | number | boolean>
 86 |   ): void {
 87 |     const contentTokens = this.getTemplateTokens();
 88 |     const missingTokens = this.findMissingRequiredTokens(contentTokens, data);
 89 | 
 90 |     if (missingTokens.length > 0) {
 91 |       throw new Error(
 92 |         `Missing required values for tokens: ${missingTokens.join(", ")}`
 93 |       );
 94 |     }
 95 |   }
 96 | 
 97 |   private findMissingRequiredTokens(
 98 |     tokens: string[],
 99 |     data: Record<string, string | number | boolean>
100 |   ): string[] {
101 |     return tokens.filter(token => {
102 |       const isRequired = this.schema.shape[token]?.isOptional() === false;
103 |       return isRequired && !(token in data);
104 |     });
105 |   }
106 | 
107 |   private getTemplateTokens(): string[] {
108 |     const tokenRegex = /\{\{(\w+)\}\}/g;
109 |     const tokens: string[] = [];
110 |     let match;
111 | 
112 |     while ((match = tokenRegex.exec(this.content)) !== null) {
113 |       const token = match[1];
114 |       if (token === undefined) {
115 |         throw new Error(`Invalid template content for ${this.type}`);
116 |       }
117 |       tokens.push(token);
118 |     }
119 | 
120 |     return tokens;
121 |   }
122 | 
123 |   private replaceTokens(
124 |     data: Record<string, string | number | boolean>
125 |   ): string {
126 |     const contentTokens = this.getTemplateTokens();
127 |     const pattern = new RegExp(`\\{\\{(${contentTokens.join("|")})\\}\\}`, "g");
128 | 
129 |     return this.content.replace(pattern, (_, key) =>
130 |       key in data ? String(data[key]) : `{{${key}}}`
131 |     );
132 |   }
133 | 
134 |   private validate(): void {
135 |     const tokens = this.getTemplateTokens();
136 |     const requiredFields = Object.keys(this.schema.shape);
137 |     const missingRequired = requiredFields.filter(
138 |       field => !tokens.includes(field)
139 |     );
140 | 
141 |     if (missingRequired.length > 0) {
142 |       logger.warn(
143 |         `Missing required tokens in ${this.type} template: ${missingRequired.join(
144 |           ", "
145 |         )}`
146 |       );
147 |     }
148 |   }
149 | }
150 | 
```

---------------------------------------------------------------------------


## File: zod.ts
- Path: `/root/git/codewrangler/src/infrastructure/templates/zod.ts`
- Size: 1.23 KB
- Extension: .ts
- Lines of code: 38
- Content:

```ts
 1 | import { z } from "zod";
 2 | 
 3 | const OTHER_KEYS = [
 4 |   "PROJECT_NAME",
 5 |   "GENERATION_DATE",
 6 |   "DIRECTORY_STRUCTURE",
 7 |   "TOTAL_FILES",
 8 |   "TOTAL_DIRECTORIES",
 9 |   "TOTAL_SIZE"
10 | ] as const;
11 | 
12 | export type OtherKeys = (typeof OTHER_KEYS)[number];
13 | 
14 | export const OTHER_KEYS_SCHEMA = z.enum(OTHER_KEYS);
15 | 
16 | export const baseTemplateSchema = z.object({
17 |   PROJECT_NAME: z.string(),
18 |   GENERATION_DATE: z.string().datetime(),
19 |   DIRECTORY_STRUCTURE: z.string(),
20 |   TOTAL_FILES: z.number(),
21 |   TOTAL_DIRECTORIES: z.number(),
22 |   TOTAL_SIZE: z.number(),
23 |   CONTENT: z.string()
24 | });
25 | 
26 | export type BaseTemplate = z.infer<typeof baseTemplateSchema>;
27 | export type BaseTemplateString = keyof BaseTemplate;
28 | 
29 | export const fileTemplateSchema = z.object({
30 |   FILE_NAME: z.string(),
31 |   FILE_EXTENSION: z.string(),
32 |   FILE_SIZE: z.number(),
33 |   FILE_CONTENTS: z.string()
34 | });
35 | 
36 | export type FileTemplate = z.infer<typeof fileTemplateSchema>;
37 | export type FileTemplateString = keyof FileTemplate;
38 | 
39 | export const directoryTemplateSchema = z.object({
40 |   DIRECTORY_NAME: z.string(),
41 |   DIRECTORY_PATH: z.string(),
42 |   DIRECTORY_SIZE: z.number(),
43 |   DIRECTORY_CONTENT: z.string()
44 | });
45 | 
46 | export type DirectoryTemplate = z.infer<typeof directoryTemplateSchema>;
47 | export type DirectoryTemplateString = keyof DirectoryTemplate;
48 | 
```

---------------------------------------------------------------------------


## File: DocumentTreeBuilder.ts
- Path: `/root/git/codewrangler/src/services/builder/DocumentTreeBuilder.ts`
- Size: 1.56 KB
- Extension: .ts
- Lines of code: 43
- Content:

```ts
 1 | import { INodeTree, NodeTreeBuilder } from "./NodeTreeBuilder";
 2 | import { RenderableDirectory } from "../../core/entities/NodeDirectory";
 3 | import { RenderableFile } from "../../core/entities/NodeFile";
 4 | import { FILE_TYPE } from "../../types/type";
 5 | import { Config } from "../../utils/config";
 6 | import { logger } from "../../utils/logger";
 7 | 
 8 | export class DocumentTreeBuilder {
 9 |   private root: RenderableDirectory | RenderableFile | undefined;
10 |   private builder: NodeTreeBuilder;
11 |   public constructor(config: Config) {
12 |     this.builder = new NodeTreeBuilder(config);
13 |   }
14 | 
15 |   public async build(): Promise<void> {
16 |     try {
17 |       // Build file tree structure
18 |       const fileTree = await this.builder.build();
19 | 
20 |       // Convert file tree to Document tree
21 |       this.root = await this.createDocumentStructure(fileTree);
22 | 
23 |       // Initialize the entire document tree
24 |       await this.root.bundle();
25 |     } catch (error) {
26 |       logger.error("Error building document tree", error as Error);
27 |       throw error;
28 |     }
29 |   }
30 | 
31 |   private async createDocumentStructure(
32 |     node: INodeTree
33 |   ): Promise<RenderableDirectory | RenderableFile> {
34 |     if (node.type === FILE_TYPE.Directory) {
35 |       const directory = new RenderableDirectory(node.name, node.path);
36 | 
37 |       if (node.children) {
38 |         // Recursively create children
39 |         for (const child of node.children) {
40 |           const childDocument = await this.createDocumentStructure(child);
41 |           directory.addChild(childDocument);
42 |         }
43 |       }
44 | 
45 |       return directory;
46 |     } else {
47 |       return new RenderableFile(node.name, node.path);
48 |     }
49 |   }
50 | }
51 | 
```

---------------------------------------------------------------------------


## File: FileHidden.ts
- Path: `/root/git/codewrangler/src/services/builder/FileHidden.ts`
- Size: 893.00 B
- Extension: .ts
- Lines of code: 25
- Content:

```ts
 1 | import { minimatch } from "minimatch";
 2 | 
 3 | import { Config } from "../../utils/config";
 4 | 
 5 | export default class FileHidden {
 6 |   private ignoreHiddenFiles: boolean;
 7 |   private patterns: string[];
 8 |   private additionalIgnoreFiles: string[];
 9 | 
10 |   public constructor(config: Config) {
11 |     this.ignoreHiddenFiles = config.get("ignoreHiddenFiles") as boolean;
12 |     this.patterns = [...config.get("excludePatterns")];
13 |     this.additionalIgnoreFiles = config.get("additionalIgnoreFiles");
14 |   }
15 | 
16 |   public shouldExclude(fileName: string): boolean {
17 |     if (this.ignoreHiddenFiles && fileName.startsWith(".")) {
18 |       return true;
19 |     }
20 | 
21 |     if (this.patterns.some(pattern => minimatch(fileName, pattern))) {
22 |       return true;
23 |     }
24 | 
25 |     if (this.additionalIgnoreFiles.some(file => minimatch(fileName, file))) {
26 |       // Additional ignore files are always excluded
27 |       return true;
28 |     }
29 | 
30 |     return false;
31 |   }
32 | }
33 | 
```

---------------------------------------------------------------------------


## File: NodeTreeBuilder.ts
- Path: `/root/git/codewrangler/src/services/builder/NodeTreeBuilder.ts`
- Size: 3.14 KB
- Extension: .ts
- Lines of code: 101
- Content:

```ts
  1 | import FileHidden from "./FileHidden";
  2 | import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
  3 | import { fileStatsService } from "../../infrastructure/filesystem/FileStats";
  4 | import { FILE_TYPE, FileType } from "../../types/type";
  5 | import { Config, ConfigOptions } from "../../utils/config";
  6 | 
  7 | export interface INodeTree {
  8 |   name: string;
  9 |   path: string;
 10 |   type: FileType;
 11 |   children?: INodeTree[];
 12 | }
 13 | 
 14 | export interface INodeTreeBuilderOptions
 15 |   extends Pick<
 16 |     ConfigOptions,
 17 |     | "additionalIgnoreFiles"
 18 |     | "maxDepth"
 19 |     | "excludePatterns"
 20 |     | "dir"
 21 |     | "followSymlinks"
 22 |   > {
 23 |   pattern: RegExp;
 24 |   returnType: "paths" | "details";
 25 | }
 26 | 
 27 | export class NodeTreeBuilder {
 28 |   private config: Config;
 29 |   private options: INodeTreeBuilderOptions;
 30 |   private fileHidden: FileHidden;
 31 | 
 32 |   public constructor(config: Config) {
 33 |     this.config = config;
 34 |     this.options = this.initializeOptions();
 35 |     this.fileHidden = new FileHidden(config);
 36 |   }
 37 | 
 38 |   public async build(): Promise<INodeTree> {
 39 |     const rootDir = this.options.dir;
 40 |     if (!documentFactory.exists(rootDir)) {
 41 |       throw new Error(`Directory ${rootDir} does not exist`);
 42 |     }
 43 |     return await this.buildTree(rootDir);
 44 |   }
 45 | 
 46 |   private initializeOptions(): INodeTreeBuilderOptions {
 47 |     return {
 48 |       dir: this.config.get("dir"),
 49 |       pattern: new RegExp(this.config.get("pattern")),
 50 |       maxDepth: this.config.get("maxDepth"),
 51 |       excludePatterns: this.config.get("excludePatterns"),
 52 |       additionalIgnoreFiles: this.config.get("additionalIgnoreFiles"),
 53 |       returnType: "details",
 54 |       followSymlinks: false
 55 |     };
 56 |   }
 57 | 
 58 |   private async createNode(nodePath: string): Promise<INodeTree> {
 59 |     const stats = await fileStatsService(nodePath);
 60 |     const name = documentFactory.baseName(nodePath);
 61 | 
 62 |     return {
 63 |       name,
 64 |       path: nodePath,
 65 |       type: stats.isDirectory ? FILE_TYPE.Directory : FILE_TYPE.File
 66 |     };
 67 |   }
 68 | 
 69 |   private shouldProcessChildren(node: INodeTree, depth: number): boolean {
 70 |     const isDirectory = node.type === FILE_TYPE.Directory;
 71 |     const withinDepthLimit =
 72 |       !this.options.maxDepth || depth < this.options.maxDepth;
 73 |     return isDirectory && withinDepthLimit;
 74 |   }
 75 | 
 76 |   private async processChildren(
 77 |     nodePath: string,
 78 |     depth: number
 79 |   ): Promise<INodeTree[]> {
 80 |     const entries = await documentFactory.readDir(nodePath);
 81 |     const children: INodeTree[] = [];
 82 | 
 83 |     for (const entry of entries) {
 84 |       const childNode = await this.processChild(nodePath, entry, depth);
 85 |       if (childNode) {
 86 |         children.push(childNode);
 87 |       }
 88 |     }
 89 | 
 90 |     return children;
 91 |   }
 92 | 
 93 |   private async processChild(
 94 |     parentPath: string,
 95 |     entry: string,
 96 |     depth: number
 97 |   ): Promise<INodeTree | null> {
 98 |     if (this.fileHidden.shouldExclude(entry)) {
 99 |       return null;
100 |     }
101 | 
102 |     const childPath = documentFactory.join(parentPath, entry);
103 |     return await this.buildTree(childPath, depth + 1);
104 |   }
105 | 
106 |   private async buildTree(
107 |     nodePath: string,
108 |     depth: number = 0
109 |   ): Promise<INodeTree> {
110 |     const node = await this.createNode(nodePath);
111 | 
112 |     if (this.shouldProcessChildren(node, depth)) {
113 |       node.children = await this.processChildren(nodePath, depth);
114 |     }
115 | 
116 |     return node;
117 |   }
118 | }
119 | 
```

---------------------------------------------------------------------------


## File: RenderStrategy.ts
- Path: `/root/git/codewrangler/src/services/renderer/RenderStrategy.ts`
- Size: 4.15 KB
- Extension: .ts
- Lines of code: 129
- Content:

```ts
  1 | import { NodeDirectory } from "../../core/entities/NodeDirectory";
  2 | import { NodeFile } from "../../core/entities/NodeFile";
  3 | import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
  4 | import { Template } from "../../infrastructure/templates/TemplateEngine";
  5 | import {
  6 |   BaseTemplate,
  7 |   DirectoryTemplate,
  8 |   FileTemplate,
  9 |   baseTemplateSchema,
 10 |   directoryTemplateSchema,
 11 |   fileTemplateSchema
 12 | } from "../../infrastructure/templates/zod";
 13 | import { TemplateType } from "../../types/template";
 14 | import { Config, OutputFormatExtension } from "../../utils/config";
 15 | 
 16 | interface IContentRenderer {
 17 |   renderFile: (file: NodeFile) => string;
 18 |   renderDirectory: (directory: NodeDirectory) => string;
 19 | }
 20 | 
 21 | interface ITemplateLoader {
 22 |   loadTemplates: () => Promise<void>;
 23 | }
 24 | 
 25 | interface IDocumentRenderer {
 26 |   render: (rootDirectory: NodeDirectory) => string;
 27 |   dispose: () => void;
 28 | }
 29 | 
 30 | export interface IRenderStrategy
 31 |   extends IContentRenderer,
 32 |     ITemplateLoader,
 33 |     IDocumentRenderer {}
 34 | 
 35 | export abstract class BaseRenderStrategy implements IRenderStrategy {
 36 |   protected extension: OutputFormatExtension;
 37 |   protected templates: Record<TemplateType, Template | null>;
 38 |   protected config: Config;
 39 | 
 40 |   protected constructor(config: Config, extension: OutputFormatExtension) {
 41 |     this.config = config;
 42 |     this.templates = {
 43 |       page: null,
 44 |       file: null,
 45 |       directory: null
 46 |     };
 47 |     this.extension = extension;
 48 |   }
 49 | 
 50 |   public async loadTemplates(): Promise<void> {
 51 |     const templateDir = Template.getTemplateDir(this.config);
 52 |     this.templates = {
 53 |       page: await Template.create(
 54 |         "page",
 55 |         baseTemplateSchema,
 56 |         documentFactory.join(templateDir, `page.${this.extension}`)
 57 |       ),
 58 |       file: await Template.create(
 59 |         "file",
 60 |         fileTemplateSchema,
 61 |         documentFactory.join(templateDir, `file.${this.extension}`)
 62 |       ),
 63 |       directory: await Template.create(
 64 |         "directory",
 65 |         directoryTemplateSchema,
 66 |         documentFactory.join(templateDir, `directory.${this.extension}`)
 67 |       )
 68 |     };
 69 |   }
 70 | 
 71 |   public renderFile(file: NodeFile): string {
 72 |     if (!this.templates.file) {
 73 |       throw new Error("File template is not loaded");
 74 |     }
 75 |     return this.replaceSelectors(this.templates.file.content, {
 76 |       FILE_NAME: file.name,
 77 |       FILE_EXTENSION: file.extension,
 78 |       FILE_SIZE: file.size,
 79 |       FILE_CONTENTS: file.content || "",
 80 |       ...file.props
 81 |     });
 82 |   }
 83 | 
 84 |   public renderDirectory(directory: NodeDirectory): string {
 85 |     const content = directory.children
 86 |       .map(
 87 |         child =>
 88 |           child instanceof NodeFile
 89 |             ? this.renderFile(child)
 90 |             : this.renderDirectory(child) // save the rendering result on the object after bundling execution
 91 |       )
 92 |       .join("");
 93 |     if (!this.templates.directory) {
 94 |       throw new Error("Directory template is not loaded");
 95 |     }
 96 |     return this.replaceSelectors(this.templates.directory.content, {
 97 |       DIRECTORY_NAME: directory.name,
 98 |       DIRECTORY_PATH: directory.path,
 99 |       DIRECTORY_SIZE: directory.size,
100 |       DIRECTORY_CONTENT: content,
101 |       ...directory.props
102 |     });
103 |   }
104 | 
105 |   public render(rootDirectory: NodeDirectory): string {
106 |     const directoryContent = this.renderDirectory(rootDirectory);
107 |     if (!this.templates.page) {
108 |       throw new Error("Page template is not loaded");
109 |     }
110 |     return this.replaceSelectors(this.templates.page.content, {
111 |       PROJECT_NAME:
112 |         this.config.get("projectName") || rootDirectory.name || "Project",
113 |       GENERATION_DATE: new Date().toLocaleDateString(),
114 |       DIRECTORY_STRUCTURE: directoryContent,
115 |       TOTAL_FILES: rootDirectory.length,
116 |       TOTAL_DIRECTORIES: rootDirectory.deepLength,
117 |       TOTAL_SIZE: rootDirectory.size,
118 |       CONTENT: directoryContent
119 |     });
120 |   }
121 | 
122 |   public dispose(): void {
123 |     this.templates = {
124 |       page: null,
125 |       file: null,
126 |       directory: null
127 |     };
128 |   }
129 | 
130 |   protected replaceSelectors(
131 |     template: string,
132 |     values: BaseTemplate | FileTemplate | DirectoryTemplate
133 |   ): string {
134 |     return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
135 |       const typedKey = key as keyof typeof values;
136 |       return values[typedKey] !== undefined
137 |         ? String(values[typedKey])
138 |         : `{{${key}}}`;
139 |     });
140 |   }
141 | }
142 | 
```

---------------------------------------------------------------------------


## File: HTMLStrategy.ts
- Path: `/root/git/codewrangler/src/services/renderer/strategies/HTMLStrategy.ts`
- Size: 965.00 B
- Extension: .ts
- Lines of code: 26
- Content:

```ts
 1 | import { NodeFile } from "../../../core/entities/NodeFile";
 2 | import { Config } from "../../../utils/config";
 3 | import { OUTPUT_FORMATS } from "../../../utils/config/schema";
 4 | import { BaseRenderStrategy } from "../RenderStrategy";
 5 | 
 6 | export class HTMLRenderStrategy extends BaseRenderStrategy {
 7 |   public constructor(config: Config) {
 8 |     super(config, OUTPUT_FORMATS.html);
 9 |   }
10 | 
11 |   public override renderFile(file: NodeFile): string {
12 |     const rendered = super.renderFile(file);
13 |     return this.processCodeBlock(rendered, file.extension.replace(".", ""));
14 |   }
15 | 
16 |   protected processCodeBlock(content: string, language: string): string {
17 |     return `<pre><code class="language-${language}">${this.escapeHtml(
18 |       content
19 |     )}</code></pre>`;
20 |   }
21 | 
22 |   private escapeHtml(content: string): string {
23 |     return content
24 |       .replace(/&/g, "&amp;")
25 |       .replace(/</g, "&lt;")
26 |       .replace(/>/g, "&gt;")
27 |       .replace(/"/g, "&quot;")
28 |       .replace(/'/g, "&#039;");
29 |   }
30 | }
31 | 
```

---------------------------------------------------------------------------


## File: MarkdownStrategy.ts
- Path: `/root/git/codewrangler/src/services/renderer/strategies/MarkdownStrategy.ts`
- Size: 689.00 B
- Extension: .ts
- Lines of code: 16
- Content:

```ts
 1 | import { NodeFile } from "../../../core/entities/NodeFile";
 2 | import { Config } from "../../../utils/config";
 3 | import { OUTPUT_FORMATS } from "../../../utils/config/schema";
 4 | import { BaseRenderStrategy } from "../RenderStrategy";
 5 | 
 6 | export class MarkdownStrategy extends BaseRenderStrategy {
 7 |   public constructor(config: Config) {
 8 |     super(config, OUTPUT_FORMATS.markdown);
 9 |   }
10 | 
11 |   public override renderFile(file: NodeFile): string {
12 |     const rendered = super.renderFile(file);
13 |     return this.processCodeBlock(rendered, file.extension.replace(".", ""));
14 |   }
15 | 
16 |   protected processCodeBlock(content: string, language: string): string {
17 |     return `\`\`\`${language}\n${content}\n\`\`\``;
18 |   }
19 | }
20 | 
```

---------------------------------------------------------------------------


## File: template.ts
- Path: `/root/git/codewrangler/src/types/template.ts`
- Size: 229.00 B
- Extension: .ts
- Lines of code: 7
- Content:

```ts
 1 | import { z } from "zod";
 2 | 
 3 | export type TemplateType = "page" | "file" | "directory";
 4 | 
 5 | export interface ITemplateContent<T> {
 6 |   content: string;
 7 |   schema: z.ZodSchema<T>;
 8 |   additionalFields?: Record<string, z.ZodSchema<string>>;
 9 | }
10 | 
```

---------------------------------------------------------------------------


## File: type.ts
- Path: `/root/git/codewrangler/src/types/type.ts`
- Size: 907.00 B
- Extension: .ts
- Lines of code: 44
- Content:

```ts
 1 | export const FILE_TYPE = {
 2 |   File: "file",
 3 |   Directory: "directory"
 4 | } as const;
 5 | 
 6 | export type FileType = (typeof FILE_TYPE)[keyof typeof FILE_TYPE];
 7 | 
 8 | export interface IAccessFlags {
 9 |   readable: boolean;
10 |   writable: boolean;
11 |   executable: boolean;
12 | }
13 | 
14 | export interface IFileStats {
15 |   size: number;
16 |   created: Date;
17 |   modified: Date;
18 |   accessed: Date;
19 |   isDirectory: boolean;
20 |   isFile: boolean;
21 |   permissions: IAccessFlags;
22 | }
23 | 
24 | export interface IReadOptions {
25 |   encoding?: BufferEncoding;
26 |   flag?: string;
27 | }
28 | 
29 | export interface IWriteOptions extends IReadOptions {
30 |   mode?: number;
31 |   flag?: string;
32 | }
33 | 
34 | export interface IDirectoryOptions {
35 |   recursive?: boolean;
36 |   mode?: number;
37 | }
38 | 
39 | export interface IFileTreeItem {
40 |   path: string;
41 |   type: FileType;
42 |   stats?: IFileStats;
43 | }
44 | 
45 | export interface IPropsNode {
46 |   name: string;
47 |   path: string;
48 |   deep: number;
49 |   size: number;
50 |   extension?: string;
51 |   stats?: IFileStats;
52 | }
53 | 
```

---------------------------------------------------------------------------


## File: Config.ts
- Path: `/root/git/codewrangler/src/utils/config/Config.ts`
- Size: 2.50 KB
- Extension: .ts
- Lines of code: 83
- Content:

```ts
 1 | import { z } from "zod";
 2 | 
 3 | import {
 4 |   ConfigKeys,
 5 |   ConfigOptions,
 6 |   DEFAULT_CONFIG,
 7 |   configSchema
 8 | } from "./schema";
 9 | import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
10 | import { JsonReader } from "../../infrastructure/filesystem/JsonReader";
11 | import { logger } from "../logger/Logger";
12 | 
13 | export class Config {
14 |   private static instance: Config | undefined;
15 |   private config: ConfigOptions;
16 |   private jsonReader: JsonReader;
17 | 
18 |   private constructor() {
19 |     this.jsonReader = new JsonReader();
20 |     this.config = configSchema.parse(DEFAULT_CONFIG);
21 |   }
22 | 
23 |   public static async load(): Promise<Config> {
24 |     if (!Config.instance) {
25 |       Config.instance = new Config();
26 |       await Config.instance.loadUserConfig();
27 |     }
28 |     return Config.instance;
29 |   }
30 | 
31 |   public get<T extends ConfigKeys>(key: T): ConfigOptions[T] {
32 |     return this.config[key] as ConfigOptions[T];
33 |   }
34 | 
35 |   public set(
36 |     key: keyof ConfigOptions,
37 |     value: ConfigOptions[keyof ConfigOptions]
38 |   ): void {
39 |     const updatedConfig = { ...this.config, [key]: value };
40 |     try {
41 |       configSchema.parse(updatedConfig);
42 |       this.config = updatedConfig;
43 |     } catch (error) {
44 |       if (error instanceof z.ZodError) {
45 |         logger.error(`Invalid configuration value: ${error.errors}`);
46 |       }
47 |       throw error;
48 |     }
49 |   }
50 |   public getAll(): ConfigOptions {
51 |     return this.config;
52 |   }
53 |   public reset(): void {
54 |     this.config = DEFAULT_CONFIG;
55 |   }
56 |   public static destroy(): void {
57 |     Config.instance = undefined;
58 |   }
59 |   public override(config: Partial<ConfigOptions>): void {
60 |     const newOverrideConfig = { ...this.config, ...config };
61 |     try {
62 |       configSchema.parse(newOverrideConfig);
63 |       this.config = newOverrideConfig;
64 |     } catch (error) {
65 |       if (error instanceof z.ZodError) {
66 |         logger.error(`Invalid configuration value: ${error.errors}`);
67 |       }
68 |       throw error;
69 |     }
70 |   }
71 | 
72 |   private async loadUserConfig(): Promise<void> {
73 |     try {
74 |       const configPath = documentFactory.resolve(this.config.codeConfigFile);
75 |       const userConfig = await this.jsonReader.readJsonSync(configPath);
76 |       this.config = configSchema.parse({ ...this.config, ...userConfig });
77 |     } catch (error) {
78 |       this.handleConfigError(error);
79 |     }
80 |   }
81 | 
82 |   private handleConfigError(error: unknown): void {
83 |     if (error instanceof z.ZodError) {
84 |       const details = error.errors
85 |         .map(err => `${err.path.join(".")}: ${err.message}`)
86 |         .join(", ");
87 |       throw new Error(`Configuration validation failed: ${details}`);
88 |     }
89 |     throw error;
90 |   }
91 | }
92 | 
```

---------------------------------------------------------------------------


## File: index.ts
- Path: `/root/git/codewrangler/src/utils/config/index.ts`
- Size: 52.00 B
- Extension: .ts
- Lines of code: 2
- Content:

```ts
1 | export * from "./Config";
2 | export * from "./schema";
3 | 
```

---------------------------------------------------------------------------


## File: schema.ts
- Path: `/root/git/codewrangler/src/utils/config/schema.ts`
- Size: 2.42 KB
- Extension: .ts
- Lines of code: 64
- Content:

```ts
 1 | import { z } from "zod";
 2 | 
 3 | import { LOG_VALUES } from "../logger/Logger";
 4 | 
 5 | export const OUTPUT_FORMATS = {
 6 |   markdown: "md",
 7 |   html: "html"
 8 | } as const;
 9 | 
10 | export type OutputFormats = typeof OUTPUT_FORMATS;
11 | export type OutputFormatName = keyof OutputFormats;
12 | export type OutputFormatExtension = OutputFormats[OutputFormatName];
13 | 
14 | export const outputFormatSchema = z.enum(["markdown", "html"] as const);
15 | 
16 | export const fileExtensionSchema = z.enum(["md", "html"] as const);
17 | 
18 | export type OutputFormat = z.infer<typeof outputFormatSchema>;
19 | export type FileExtension = z.infer<typeof fileExtensionSchema>;
20 | 
21 | export const FILE_EXTENSION: Record<OutputFormat, FileExtension> = {
22 |   markdown: "md",
23 |   html: "html"
24 | };
25 | 
26 | export const configSchema = z
27 |   .object({
28 |     dir: z.string().default(process.cwd()),
29 |     rootDir: z.string().default(process.cwd()),
30 |     templatesDir: z.string().default("public/templates"),
31 |     pattern: z
32 |       .string()
33 |       .regex(/^.*$/, "Pattern must be a valid regex")
34 |       .default(".*"),
35 |     outputFile: z.string().default("output"),
36 |     logLevel: z.enum(LOG_VALUES as [string, ...string[]]).default("INFO"),
37 |     outputFormat: z.array(outputFormatSchema).default(["markdown"]),
38 |     maxFileSize: z.number().positive().default(1048576),
39 |     maxDepth: z.number().default(100),
40 |     excludePatterns: z
41 |       .array(z.string())
42 |       .default(["node_modules/**", "**/*.test.ts", "dist/**"]),
43 |     ignoreHiddenFiles: z.boolean().default(true),
44 |     additionalIgnoreFiles: z.array(z.string()).optional().default([]),
45 |     projectName: z.string().optional(),
46 |     followSymlinks: z.boolean().default(false),
47 |     codeConfigFile: z
48 |       .string()
49 |       .regex(/\.json$/, "Config file must end with .json")
50 |       .default("public/codewrangler.json")
51 |   })
52 |   .strict();
53 | 
54 | export type ConfigOptions = z.infer<typeof configSchema>;
55 | // get a type listing all the keys of the config
56 | export type ConfigKeys = keyof ConfigOptions;
57 | 
58 | export const DEFAULT_CONFIG: ConfigOptions = {
59 |   dir: process.cwd(), // current working directory, where the command is run
60 |   rootDir: process.cwd(),
61 |   templatesDir: "public/templates",
62 |   pattern: ".*",
63 |   outputFile: "output",
64 |   logLevel: "INFO",
65 |   outputFormat: ["markdown"],
66 |   maxFileSize: 1048576,
67 |   maxDepth: 100,
68 |   codeConfigFile: "public/codewrangler.json",
69 |   projectName: undefined,
70 |   followSymlinks: false,
71 |   ignoreHiddenFiles: true, // Default value
72 |   additionalIgnoreFiles: [],
73 |   excludePatterns: ["node_modules/**", "**/*.test.ts", "dist/**"]
74 | };
75 | 
```

---------------------------------------------------------------------------


## File: ProgressBar.ts
- Path: `/root/git/codewrangler/src/utils/helpers/ProgressBar.ts`
- Size: 1.49 KB
- Extension: .ts
- Lines of code: 57
- Content:

```ts
 1 | import cliProgress from "cli-progress";
 2 | 
 3 | export class ProgressBar {
 4 |   private bar: cliProgress.SingleBar;
 5 |   private intervalId: NodeJS.Timeout | null = null;
 6 |   private currentValue: number = 0;
 7 | 
 8 |   public constructor(private total: number = 100) {
 9 |     this.bar = new cliProgress.SingleBar(
10 |       {},
11 |       cliProgress.Presets.shades_classic
12 |     );
13 |   }
14 | 
15 |   public start(): ProgressBar {
16 |     this.bar.start(this.total, 0);
17 |     this.intervalId = setInterval(() => this.simulateProgress(), 200);
18 |     return this;
19 |   }
20 | 
21 |   public update(value: number): ProgressBar {
22 |     this.currentValue = value;
23 |     this.bar.update(value);
24 |     return this;
25 |   }
26 | 
27 |   public stop(): ProgressBar {
28 |     if (this.intervalId) {
29 |       clearInterval(this.intervalId);
30 |       this.intervalId = null;
31 |     }
32 |     this.bar.update(this.total);
33 |     this.bar.stop();
34 |     return this;
35 |   }
36 | 
37 |   public async execute<T>(fn: () => Promise<T>): Promise<T> {
38 |     this.start();
39 |     try {
40 |       return await fn();
41 |     } finally {
42 |       this.stop();
43 |     }
44 |   }
45 | 
46 |   private simulateProgress(): void {
47 |     const remainingProgress = this.total - this.currentValue;
48 |     const increment = Math.random() * remainingProgress * 0.1;
49 |     this.currentValue = Math.min(
50 |       this.currentValue + increment,
51 |       this.total * 0.95
52 |     );
53 |     this.bar.update(this.currentValue);
54 |   }
55 | }
56 | 
57 | export async function progressBar(
58 |   total: number,
59 |   callback: () => Promise<void>
60 | ): Promise<void> {
61 |   const bar = new ProgressBar(total);
62 |   await bar.execute(async () => {
63 |     await callback();
64 |   });
65 | }
66 | 
```

---------------------------------------------------------------------------


## File: Logger.ts
- Path: `/root/git/codewrangler/src/utils/logger/Logger.ts`
- Size: 1.99 KB
- Extension: .ts
- Lines of code: 69
- Content:

```ts
 1 | /* eslint-disable no-console */
 2 | import colors from "colors";
 3 | 
 4 | import { Config } from "../config/Config";
 5 | 
 6 | export const LOG_LEVEL = {
 7 |   ERROR: 0,
 8 |   WARN: 1,
 9 |   INFO: 2,
10 |   DEBUG: 3
11 | } as const;
12 | 
13 | type LogLevel = (typeof LOG_LEVEL)[keyof typeof LOG_LEVEL];
14 | export type LogLevelString = keyof typeof LOG_LEVEL;
15 | export const LOG_VALUES = Object.keys(LOG_LEVEL) as LogLevelString[];
16 | 
17 | export class Logger {
18 |   private static instance: Logger;
19 |   private config: Config | null = null;
20 | 
21 |   private constructor() {}
22 |   public static load(): Logger {
23 |     if (!Logger.instance) {
24 |       Logger.instance = new Logger();
25 |     }
26 |     return Logger.instance;
27 |   }
28 |   public setConfig(config: Config): Logger {
29 |     this.config = config;
30 |     return this;
31 |   }
32 |   public setLogLevel(logLevel: LogLevelString): Logger {
33 |     if (this.config) {
34 |       this.config.set("logLevel", logLevel);
35 |     }
36 |     return this;
37 |   }
38 | 
39 |   private get logLevel(): LogLevel {
40 |     const configLogLevel = this.config?.get("logLevel") as
41 |       | LogLevelString
42 |       | undefined;
43 |     return configLogLevel ? LOG_LEVEL[configLogLevel] : LOG_LEVEL.ERROR;
44 |   }
45 | 
46 |   public error(message: string, error?: Error, ...other: unknown[]): void {
47 |     if (this.logLevel >= LOG_LEVEL.ERROR) {
48 |       console.log(colors.red(`[ERROR] ${message}`), ...other);
49 |       if (error instanceof Error && error.stack) {
50 |         console.log(colors.red(error.stack));
51 |       }
52 |     }
53 |   }
54 | 
55 |   public warn(message: string): void {
56 |     if (this.logLevel >= LOG_LEVEL.WARN) {
57 |       console.log(colors.yellow(`[WARN] ${message}`));
58 |     }
59 |   }
60 | 
61 |   public info(message: string): void {
62 |     if (this.logLevel >= LOG_LEVEL.INFO) {
63 |       console.log(colors.blue(`[INFO] ${message}`));
64 |     }
65 |   }
66 | 
67 |   public debug(message: string): void {
68 |     if (this.logLevel >= LOG_LEVEL.DEBUG) {
69 |       console.log(colors.gray(`[DEBUG] ${message}`));
70 |     }
71 |   }
72 | 
73 |   public success(message: string): void {
74 |     console.log(colors.green(message));
75 |   }
76 | 
77 |   public log(message: string): void {
78 |     console.log(message);
79 |   }
80 | }
81 | 
82 | export const logger = Logger.load();
83 | 
```

---------------------------------------------------------------------------


## File: index.ts
- Path: `/root/git/codewrangler/src/utils/logger/index.ts`
- Size: 26.00 B
- Extension: .ts
- Lines of code: 1
- Content:

```ts
1 | export * from "./Logger";
2 | 
```

---------------------------------------------------------------------------

