
# Code Documentation
Generated on: 2024-12-06T08:46:20.841Z
Total files: 42

## Project Structure

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
    │   │   ├── Command.ts
    │   │   ├── DemoCommand.ts
    │   │   └── types.ts
    │   ├── index.ts
    │   └── program
    │       └── mainCLI
    │           ├── MainCLICommand.ts
    │           ├── ProgramBuilder.ts
    │           └── type.ts
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
    ├── orchestration
    │   ├── DocumentOrchestrator.ts
    │   ├── DocumentOrchestratorBuilder.ts
    │   ├── index.ts
    │   └── interfaces
    │       ├── IDocumentMetadata.ts
    │       ├── IDocumentOrchestrator.ts
    │       └── index.ts
    ├── services
    │   ├── builder
    │   │   ├── DocumentTreeBuilder.ts
    │   │   ├── FileHidden.ts
    │   │   └── NodeTreeBuilder.ts
    │   └── renderer
    │       ├── RenderStrategy.ts
    │       ├── RenderStrategyBuilder.ts
    │       ├── RenderStrategyFactory.ts
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
- Size: 1.15 KB
- Extension: .ts
- Lines of code: 31
- Content:

```ts
 1 | import { Command } from "commander";
 2 | 
 3 | import { MainCLICommand } from "./program/mainCLI/MainCLICommand";
 4 | import { ProgramBuilder } from "./program/mainCLI/ProgramBuilder";
 5 | import { Config } from "../utils/config/Config";
 6 | import { IMainCLICommandOptions } from "./program/mainCLI/type";
 7 | 
 8 | export class CodeWrangler {
 9 |   private static instance: CodeWrangler | undefined;
10 |   private readonly VERSION = "1.0.0";
11 |   private program: Command;
12 | 
13 |   private constructor(private config: Config) {
14 |     this.program = new ProgramBuilder(config, this.VERSION).build();
15 |     this.setupCommands();
16 |   }
17 | 
18 |   public static async run(): Promise<boolean> {
19 |     if (!CodeWrangler.instance) {
20 |       const config = await Config.load();
21 |       CodeWrangler.instance = new CodeWrangler(config);
22 |       await CodeWrangler.instance.program.parseAsync(process.argv);
23 |       return true;
24 |     }
25 |     throw new Error("CodeWrangler already initialized");
26 |   }
27 | 
28 |   private setupCommands(): void {
29 |     this.program.action(
30 |       async (pattern: string, options: IMainCLICommandOptions) => {
31 |         const command = new MainCLICommand(this.config);
32 |         await command.execute([pattern], options);
33 |       }
34 |     );
35 |   }
36 | }
37 | 
```

---------------------------------------------------------------------------


## File: Command.ts
- Path: `/root/git/codewrangler/src/cli/commands/Command.ts`
- Size: 1.46 KB
- Extension: .ts
- Lines of code: 41
- Content:

```ts
 1 | /* eslint-disable require-await */
 2 | import { ICommandOptions } from "./types";
 3 | import { Config } from "../../utils/config/Config";
 4 | import { ProgressBar } from "../../utils/helpers/ProgressBar";
 5 | import { logger } from "../../utils/logger/Logger";
 6 | 
 7 | export abstract class BaseCommand<T extends ICommandOptions> {
 8 |   public constructor(protected config: Config) {}
 9 | 
10 |   public async execute(args: string[], options: T): Promise<void> {
11 |     try {
12 |       // Pre-execution phase
13 |       await this.beforeExecution(args, options);
14 | 
15 |       // Progress tracking
16 |       const progressBar = new ProgressBar(100);
17 |       await progressBar.execute(async () => {
18 |         await this.processExecution();
19 |       });
20 | 
21 |       // Post-execution phase
22 |       await this.afterExecution();
23 |     } catch (error) {
24 |       await this.handleError(error);
25 |       throw error;
26 |     }
27 |   }
28 | 
29 |   // Template methods that can be overridden
30 |   protected async beforeExecution(_: string[], options: T): Promise<void> {
31 |     if (options.verbose) {
32 |       this.logVerbose();
33 |     }
34 |   }
35 | 
36 |   protected abstract processExecution(): Promise<void>;
37 | 
38 |   protected async afterExecution(): Promise<void> {
39 |     // Default implementation - override if needed
40 |   }
41 | 
42 |   protected async handleError(error: unknown): Promise<void> {
43 |     logger.error("Command execution failed:", error as Error);
44 |   }
45 | 
46 |   protected logVerbose(): void {
47 |     // Default verbose logging - override to add command-specific logs
48 |     logger.debug("Executing command with verbose logging");
49 |   }
50 | }
51 | 
```

---------------------------------------------------------------------------


## File: DemoCommand.ts
- Path: `/root/git/codewrangler/src/cli/commands/DemoCommand.ts`
- Size: 7.87 KB
- Extension: .ts
- Lines of code: 297
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
237 | ${files.map(file => generateFileSection(file, compress)).join("\n")}
238 | `
239 |     : `
240 | # Code documentation
241 | \`\`\`
242 | ${treeContent}
243 | \`\`\`
244 | ${files.map(file => generateFileSection(file, compress)).join("\n")}
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
312 |     outputPath: "demo_compressed.md",
313 |     ignoreHidden: true,
314 |     excludePatterns: [
315 |       "node_modules",
316 |       "dist",
317 |       "coverage",
318 |       "**/__tests__",
319 |       "**/*.test.ts"
320 |     ],
321 |     compress: false
322 |   }).catch(console.error);
323 |   generateDocumentation({
324 |     pattern: /\.test.ts$/,
325 |     outputPath: "demo_test.md",
326 |     ignoreHidden: true,
327 |     excludePatterns: [
328 |       "node_modules",
329 |       "dist",
330 |       "coverage",
331 |       "**/__tests__/__mocks__"
332 |     ],
333 |     compress: false
334 |   }).catch(console.error);
335 |   generateDocumentation({
336 |     pattern: /\.md$/,
337 |     outputPath: "demo_md.md",
338 |     ignoreHidden: true,
339 |     excludePatterns: ["node_modules", "dist", "coverage", "*demo*", "src"],
340 |     compress: false
341 |   }).catch(console.error);
342 | }
343 | 
```

---------------------------------------------------------------------------


## File: types.ts
- Path: `/root/git/codewrangler/src/cli/commands/types.ts`
- Size: 160.00 B
- Extension: .ts
- Lines of code: 6
- Content:

```ts
1 | export interface ICommandOptions {
2 |   verbose: boolean;
3 | }
4 | 
5 | export interface ICommand {
6 |   execute: (args: string[], options: ICommandOptions) => Promise<void>;
7 | }
8 | 
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


## File: MainCLICommand.ts
- Path: `/root/git/codewrangler/src/cli/program/mainCLI/MainCLICommand.ts`
- Size: 2.60 KB
- Extension: .ts
- Lines of code: 67
- Content:

```ts
 1 | import { IMainCLICommandOptions } from "./type";
 2 | import { DocumentOrchestratorBuilder } from "../../../orchestration/DocumentOrchestratorBuilder";
 3 | import { DocumentTreeBuilder } from "../../../services/builder/DocumentTreeBuilder";
 4 | import { renderStrategyFactory } from "../../../services/renderer/RenderStrategyFactory";
 5 | import { OutputFormat } from "../../../utils/config/schema";
 6 | import { logger } from "../../../utils/logger/Logger";
 7 | import { BaseCommand } from "../../commands/Command";
 8 | 
 9 | export class MainCLICommand<
10 |   T extends IMainCLICommandOptions
11 | > extends BaseCommand<T> {
12 |   protected override async beforeExecution(
13 |     args: string[],
14 |     options: T
15 |   ): Promise<void> {
16 |     await super.beforeExecution(args, options);
17 |     this.config.set("pattern", args[0]);
18 |     if (!this.updateOptions(options)) {
19 |       throw new Error("Invalid configuration value");
20 |     }
21 |   }
22 | 
23 |   protected override async processExecution(): Promise<void> {
24 |     const builder = new DocumentTreeBuilder(this.config);
25 |     const root = await builder.build();
26 | 
27 |     const orchestrator = new DocumentOrchestratorBuilder()
28 |       .setRoot(root)
29 |       .setConfig(this.config);
30 | 
31 |     const outputFormat = this.config.get("outputFormat");
32 |     const strategies = await renderStrategyFactory.createStrategies(
33 |       this.config,
34 |       outputFormat
35 |     );
36 | 
37 |     orchestrator.setStrategies(strategies);
38 | 
39 |     const orchestrators = await orchestrator.buildAndExecute();
40 | 
41 |     logger.info(`Generated ${orchestrators.length} documents`);
42 |   }
43 | 
44 |   protected override logVerbose(): void {
45 |     super.logVerbose();
46 |     logger.debug(
47 |       `Searching for file matching pattern: ${this.config.get("pattern")}`
48 |     );
49 |     logger.debug(
50 |       `Excluding patterns: ${(this.config.get("excludePatterns") as string[]).join(", ")}`
51 |     );
52 |     logger.debug(
53 |       `Ignoring hidden files: ${this.config.get("ignoreHiddenFiles")}`
54 |     );
55 |     logger.debug(`Max file size: ${this.config.get("maxFileSize")} bytes`);
56 |   }
57 | 
58 |   private updateOptions(options: IMainCLICommandOptions): boolean {
59 |     try {
60 |       this.config.set("dir", options["dir"]);
61 |       this.config.set("codeConfigFile", options["config"]);
62 |       this.config.set("logLevel", options["verbose"] ? "DEBUG" : "INFO");
63 |       this.config.set(
64 |         "outputFormat",
65 |         options["format"] as unknown as OutputFormat[]
66 |       );
67 |       this.config.set("outputFile", options["output"]);
68 |       this.config.set("ignoreHiddenFiles", options["ignoreHidden"]);
69 |       this.config.set("additionalIgnoreFiles", options["additionalIgnore"]);
70 |     } catch (error) {
71 |       logger.error(`Invalid configuration value: ${error}`);
72 |       return false;
73 |     }
74 |     return true;
75 |   }
76 | }
77 | 
```

---------------------------------------------------------------------------


## File: ProgramBuilder.ts
- Path: `/root/git/codewrangler/src/cli/program/mainCLI/ProgramBuilder.ts`
- Size: 1.88 KB
- Extension: .ts
- Lines of code: 67
- Content:

```ts
 1 | import { Command } from "commander";
 2 | 
 3 | import { Config } from "../../../utils/config/Config";
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


## File: type.ts
- Path: `/root/git/codewrangler/src/cli/program/mainCLI/type.ts`
- Size: 266.00 B
- Extension: .ts
- Lines of code: 10
- Content:

```ts
 1 | import { ICommandOptions } from "../../commands/types";
 2 | 
 3 | export interface IMainCLICommandOptions extends ICommandOptions {
 4 |   dir: string;
 5 |   config: string;
 6 |   format: string;
 7 |   output: string;
 8 |   exclude: string;
 9 |   ignoreHidden: boolean;
10 |   additionalIgnore: string;
11 | }
12 | 
```

---------------------------------------------------------------------------


## File: NodeBase.ts
- Path: `/root/git/codewrangler/src/core/entities/NodeBase.ts`
- Size: 2.71 KB
- Extension: .ts
- Lines of code: 108
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
 61 | 
 62 |   // getters and setters
 63 |   // deep
 64 |   public get deep(): number {
 65 |     return this._props.deep;
 66 |   }
 67 |   public set deep(deep: number) {
 68 |     this._props.deep = deep;
 69 |   }
 70 | 
 71 |   // size
 72 |   public get size(): number {
 73 |     return this._props.size;
 74 |   }
 75 |   public set size(size: number) {
 76 |     this._props.size = size;
 77 |   }
 78 | 
 79 |   // name
 80 |   public get name(): string {
 81 |     return this._props.name;
 82 |   }
 83 |   public set name(name: string) {
 84 |     this._props.name = name;
 85 |   }
 86 | 
 87 |   // path
 88 |   public get path(): string {
 89 |     return this._props.path;
 90 |   }
 91 |   public set path(path: string) {
 92 |     this._props.path = path;
 93 |   }
 94 | 
 95 |   // stats
 96 |   public get stats(): IFileStats | undefined {
 97 |     return this._props.stats;
 98 |   }
 99 |   public set stats(stats: IFileStats | undefined) {
100 |     this._props.stats = stats;
101 |   }
102 | 
103 |   // props
104 |   public get props(): IPropsNode {
105 |     return {
106 |       ...this._props
107 |     };
108 |   }
109 | 
110 |   public dispose(): void {
111 |     this._props = { ...defaultProps };
112 |   }
113 | 
114 |   public clone(): NodeBase {
115 |     return Object.assign(Object.create(this), this);
116 |   }
117 | 
118 |   private initNode(name: string, path: string): void {
119 |     this.deep = 0;
120 |     this.size = 0;
121 |     this.name = name;
122 |     this.path = documentFactory.resolve(path);
123 |   }
124 | }
125 | 
```

---------------------------------------------------------------------------


## File: NodeDirectory.ts
- Path: `/root/git/codewrangler/src/core/entities/NodeDirectory.ts`
- Size: 3.07 KB
- Extension: .ts
- Lines of code: 93
- Content:

```ts
  1 | import { INodeContent, NodeBase } from "./NodeBase";
  2 | import { NodeFile } from "./NodeFile";
  3 | import { fileStatsService } from "../../infrastructure/filesystem/FileStats";
  4 | import { IRenderStrategy } from "../../services/renderer/RenderStrategy";
  5 | import { IPropsDirectoryNode } from "../../types/type";
  6 | 
  7 | interface IPropsDirectory {
  8 |   length: number;
  9 |   deepLength: number;
 10 |   numberOfFiles: number;
 11 |   numberOfDirectories: number;
 12 | }
 13 | 
 14 | const defaultPropsDirectory: IPropsDirectory = {
 15 |   length: 0,
 16 |   deepLength: 0,
 17 |   numberOfFiles: 0,
 18 |   numberOfDirectories: 0
 19 | };
 20 | 
 21 | export abstract class NodeDirectory extends NodeBase {
 22 |   public readonly type = "directory";
 23 |   public children: (NodeFile | NodeDirectory)[] = [];
 24 |   private _propsDirectory: IPropsDirectory = { ...defaultPropsDirectory };
 25 | 
 26 |   public constructor(name: string, pathName: string) {
 27 |     super(name, pathName);
 28 |     this.initDirectory();
 29 |   }
 30 |   // getters and setters
 31 |   public get length(): number {
 32 |     return this._propsDirectory.length;
 33 |   }
 34 |   public set length(length: number) {
 35 |     this._propsDirectory.length = length;
 36 |   }
 37 |   public get deepLength(): number {
 38 |     return this._propsDirectory.deepLength;
 39 |   }
 40 |   public set deepLength(deepLength: number) {
 41 |     this._propsDirectory.deepLength = deepLength;
 42 |   }
 43 |   public get numberOfFiles(): number {
 44 |     return this._propsDirectory.numberOfFiles;
 45 |   }
 46 |   public set numberOfFiles(numberOfFiles: number) {
 47 |     this._propsDirectory.numberOfFiles = numberOfFiles;
 48 |   }
 49 |   public override get props(): IPropsDirectoryNode {
 50 |     return {
 51 |       ...super.props,
 52 |       ...this._propsDirectory
 53 |     };
 54 |   }
 55 | 
 56 |   public addChild(child: NodeFile | NodeDirectory): NodeDirectory {
 57 |     if (!(child instanceof NodeFile || child instanceof NodeDirectory)) {
 58 |       throw new Error("Invalid child type");
 59 |     }
 60 |     this.children.push(child);
 61 |     return this;
 62 |   }
 63 | 
 64 |   public async bundle(deep: number = 0): Promise<void> {
 65 |     // set the deep of the directory
 66 |     this.deep = deep;
 67 | 
 68 |     // bundle all children
 69 |     await Promise.all(this.children.map(child => child.bundle(deep + 1)));
 70 | 
 71 |     // set the length of the directory
 72 |     this.length = this.children.filter(child => child.type === "file").length;
 73 |     this.numberOfFiles =
 74 |       this.length +
 75 |       this.children
 76 |         .filter(child => child.type === "directory")
 77 |         .reduce((acc, child) => acc + child.numberOfFiles, 0);
 78 | 
 79 |     // set the deep length of the directory
 80 |     this.deepLength = this.children.reduce(
 81 |       (acc, child) =>
 82 |         acc + (child instanceof NodeDirectory ? child.deepLength + 1 : 1),
 83 |       0
 84 |     );
 85 | 
 86 |     // set the size of the directory
 87 |     this.size = this.children.reduce((acc, child) => acc + child.size, 0);
 88 | 
 89 |     // set stats
 90 |     this.stats = await fileStatsService(this.path);
 91 |   }
 92 | 
 93 |   public abstract override render(strategy: IRenderStrategy): INodeContent;
 94 | 
 95 |   private initDirectory(): void {
 96 |     this.children = [];
 97 |     this._propsDirectory = { ...defaultPropsDirectory };
 98 |   }
 99 | }
100 | 
101 | export class RenderableDirectory extends NodeDirectory {
102 |   public override render(strategy: IRenderStrategy): INodeContent {
103 |     return {
104 |       content: strategy.renderDirectory(this)
105 |     };
106 |   }
107 | }
108 | 
```

---------------------------------------------------------------------------


## File: NodeFile.ts
- Path: `/root/git/codewrangler/src/core/entities/NodeFile.ts`
- Size: 1.95 KB
- Extension: .ts
- Lines of code: 65
- Content:

```ts
 1 | import { INodeContent, NodeBase } from "./NodeBase";
 2 | import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
 3 | import { fileStatsService } from "../../infrastructure/filesystem/FileStats";
 4 | import { IRenderStrategy } from "../../services/renderer/RenderStrategy";
 5 | import { IPropsFileNode } from "../../types/type";
 6 | 
 7 | export abstract class NodeFile extends NodeBase {
 8 |   public readonly type = "file";
 9 |   private _extension: string = "";
10 |   private _content: string | null = null;
11 | 
12 |   public constructor(name: string, pathName: string) {
13 |     super(name, pathName);
14 |     this.initFile(name);
15 |   }
16 | 
17 |   // getters and setters
18 |   // extension
19 |   public get extension(): string {
20 |     return this._extension;
21 |   }
22 |   protected set extension(extension: string) {
23 |     this._extension = extension;
24 |   }
25 |   // content
26 |   public get content(): string | null {
27 |     return this._content;
28 |   }
29 |   protected set content(content: string | null) {
30 |     this._content = content;
31 |   }
32 |   // secondary props
33 |   public override get props(): IPropsFileNode {
34 |     return {
35 |       ...super.props,
36 |       extension: this.extension
37 |     };
38 |   }
39 | 
40 |   // bundle
41 |   public async bundle(deep: number = 0): Promise<void> {
42 |     // set the deep of the file
43 |     this.deep = deep;
44 |     // set the size of the file
45 |     this.size = await documentFactory.size(this.path);
46 |     // set the content of the file
47 |     this.content = await documentFactory.readFile(this.path);
48 |     // set the stats of the file
49 |     this.stats = await fileStatsService(this.path);
50 |   }
51 | 
52 |   // render
53 |   public abstract override render(strategy: IRenderStrategy): INodeContent;
54 | 
55 |   private initFile(name: string): void {
56 |     this.extension = documentFactory.extension(name);
57 |     this._content = null;
58 |   }
59 | }
60 | 
61 | export class RenderableFile extends NodeFile {
62 |   // render
63 |   public override render(strategy: IRenderStrategy): INodeContent {
64 |     return {
65 |       content: strategy.renderFile(this)
66 |     };
67 |   }
68 | 
69 |   // dispose
70 |   public override dispose(): void {
71 |     super.dispose();
72 |   }
73 | }
74 | 
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
- Size: 9.87 KB
- Extension: .ts
- Lines of code: 323
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
140 |       // Ensure parent directory exists
141 |       const parentDir = path.dirname(filePath);
142 |       await fs.mkdir(parentDir, { recursive: true });
143 | 
144 |       // Write the file
145 |       await fs.writeFile(filePath, data, {
146 |         encoding: options.encoding ?? "utf-8",
147 |         mode: options.mode,
148 |         flag: options.flag
149 |       });
150 |     } catch (error) {
151 |       if (error instanceof DocumentError) {
152 |         throw error;
153 |       }
154 |       throw new DocumentError(String(error), filePath);
155 |     }
156 |   },
157 | 
158 |   /**
159 |    * Appends data to a file
160 |    * @param filePath - The path to the file
161 |    * @param content - The content to append
162 |    * @param options - The options for the write operation
163 |    * @throws {DocumentError} For file system errors
164 |    */
165 |   async appendFile(
166 |     filePath: string,
167 |     content: string,
168 |     options: IWriteOptions = {}
169 |   ): Promise<void> {
170 |     try {
171 |       await fs.appendFile(filePath, content, {
172 |         encoding: options.encoding ?? "utf-8",
173 |         mode: options.mode,
174 |         flag: options.flag
175 |       });
176 |     } catch (error) {
177 |       throw new DocumentError(String(error), filePath);
178 |     }
179 |   },
180 | 
181 |   /**
182 |    * Reads the contents of a directory
183 |    * @param dirPath - The path to the directory
184 |    * @param options - The options for the read operation
185 |    * @returns An array of file and directory names in the directory
186 |    * @throws {Error} If the directory cannot be read
187 |    */
188 |   async readDir(
189 |     dirPath: string,
190 |     options?: { withFileTypes?: boolean }
191 |   ): Promise<string[]> {
192 |     return await fs.readdir(dirPath, options as ObjectEncodingOptions);
193 |   },
194 | 
195 |   /**
196 |    * Creates a directory if it doesn't exist
197 |    * @param dirPath - The path where to create the directory
198 |    * @param recursive - Whether to create parent directories if they don't exist
199 |    * @throws {DocumentError} For file system errors
200 |    */
201 |   async createDir(dirPath: string, recursive = true): Promise<void> {
202 |     await fs.mkdir(dirPath, { recursive });
203 |   },
204 | 
205 |   /**
206 |    * Gets the base name of a file
207 |    * @param filePath - The path to the file
208 |    * @returns The base name of the file (last portion of the path)
209 |    */
210 |   baseName(filePath: string): string {
211 |     return path.basename(filePath);
212 |   },
213 | 
214 |   /**
215 |    * Gets the extension of a file
216 |    * @param filePath - The path to the file
217 |    * @returns The extension of the file including the dot (e.g., '.txt')
218 |    */
219 |   extension(filePath: string): string {
220 |     return path.extname(filePath);
221 |   },
222 | 
223 |   /**
224 |    * Checks if a file or directory exists
225 |    * @param filePath - The path to check
226 |    * @returns True if the file or directory exists, false otherwise
227 |    */
228 |   exists(filePath: string): boolean {
229 |     try {
230 |       fsSync.accessSync(filePath);
231 |       return true;
232 |     } catch {
233 |       return false;
234 |     }
235 |   },
236 | 
237 |   /**
238 |    * Checks if a path is absolute
239 |    * @param filePath - The path to check
240 |    * @returns True if the path is absolute, false otherwise
241 |    */
242 |   isAbsolute(filePath: string): boolean {
243 |     return path.isAbsolute(filePath);
244 |   },
245 | 
246 |   /**
247 |    * Gets directory contents with type information
248 |    * @param dirPath - The path to the directory
249 |    * @returns An array of objects containing name and type information for each entry
250 |    * @throws {DocumentError} If path is not a directory or other errors occur
251 |    */
252 |   async readDirectory(
253 |     dirPath: string
254 |   ): Promise<Array<{ name: string; type: FileType }>> {
255 |     try {
256 |       const entries = await fs.readdir(dirPath, { withFileTypes: true });
257 |       return entries.map(entry => ({
258 |         name: entry.name,
259 |         type: entry.isDirectory() ? FILE_TYPE.Directory : FILE_TYPE.File
260 |       }));
261 |     } catch (error) {
262 |       throw new DocumentError(String(error), dirPath);
263 |     }
264 |   },
265 | 
266 |   /**
267 |    * Creates a directory if it doesn't exist
268 |    * @param dirPath - The path where to create the directory
269 |    * @param options - Options for directory creation including recursive and mode
270 |    * @throws {DocumentError} For file system errors
271 |    */
272 |   async ensureDirectory(
273 |     dirPath: string,
274 |     options: IDirectoryOptions = {}
275 |   ): Promise<void> {
276 |     try {
277 |       if (!this.exists(dirPath)) {
278 |         await fs.mkdir(dirPath, {
279 |           recursive: options.recursive ?? true,
280 |           mode: options.mode
281 |         });
282 |       }
283 |     } catch (error) {
284 |       throw new DocumentError(String(error), dirPath);
285 |     }
286 |   },
287 | 
288 |   /**
289 |    * Removes a file or directory
290 |    * @param filePath - The path to remove
291 |    * @throws {DocumentError} For file system errors
292 |    */
293 |   async remove(filePath: string): Promise<void> {
294 |     const stats = await fs.stat(filePath);
295 |     if (stats.isDirectory()) {
296 |       await fs.rm(filePath, { recursive: true, force: true });
297 |     } else {
298 |       await fs.unlink(filePath);
299 |     }
300 |   },
301 | 
302 |   /**
303 |    * Copies a file or directory
304 |    * @param src - The source path
305 |    * @param dest - The destination path
306 |    * @throws {DocumentError} For file system errors
307 |    */
308 |   async copy(src: string, dest: string): Promise<void> {
309 |     const stats = await fs.stat(src);
310 | 
311 |     if (stats.isDirectory()) {
312 |       await this.copyDir(src, dest);
313 |     } else {
314 |       await fs.copyFile(src, dest);
315 |     }
316 |   },
317 | 
318 |   /**
319 |    * Copies a directory recursively
320 |    * @private
321 |    * @param src - The source directory path
322 |    * @param dest - The destination directory path
323 |    * @throws {DocumentError} For file system errors
324 |    */
325 |   async copyDir(src: string, dest: string): Promise<void> {
326 |     await this.ensureDirectory(dest);
327 |     const entries = await fs.readdir(src, { withFileTypes: true });
328 | 
329 |     for (const entry of entries) {
330 |       const srcPath = path.join(src, entry.name);
331 |       const destPath = path.join(dest, entry.name);
332 | 
333 |       if (entry.isDirectory()) {
334 |         await this.copyDir(srcPath, destPath);
335 |       } else {
336 |         await fs.copyFile(srcPath, destPath);
337 |       }
338 |     }
339 |   },
340 | 
341 |   /**
342 |    * Joins an array of paths into a single path
343 |    * @param paths - The paths to join
344 |    * @returns The joined path
345 |    */
346 |   join(...paths: string[]): string {
347 |     return path.join(...paths);
348 |   }
349 | };
350 | 
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
- Size: 4.27 KB
- Extension: .ts
- Lines of code: 135
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
 74 |     } catch (error) {
 75 |       if (error instanceof Error) {
 76 |         throw new Error(`Template content validation failed for ${this.type}`);
 77 |       }
 78 |       throw error;
 79 |     }
 80 |   }
 81 | 
 82 |   public dispose(): void {
 83 |     this._content = "";
 84 |   }
 85 | 
 86 |   private validateData(data: Record<string, string | number | boolean>): void {
 87 |     this.schema.parse(data);
 88 |     this.validateRequiredTokens(data);
 89 |   }
 90 | 
 91 |   private validateRequiredTokens(
 92 |     data: Record<string, string | number | boolean>
 93 |   ): void {
 94 |     const contentTokens = this.getTemplateTokens();
 95 |     const missingTokens = this.findMissingRequiredTokens(contentTokens, data);
 96 | 
 97 |     if (missingTokens.length > 0) {
 98 |       throw new Error(
 99 |         `Missing required values for tokens: ${missingTokens.join(", ")}`
100 |       );
101 |     }
102 |   }
103 | 
104 |   private findMissingRequiredTokens(
105 |     tokens: string[],
106 |     data: Record<string, string | number | boolean>
107 |   ): string[] {
108 |     return tokens.filter(token => {
109 |       const isRequired = this.schema.shape[token]?.isOptional() === false;
110 |       return isRequired && !(token in data);
111 |     });
112 |   }
113 | 
114 |   private getTemplateTokens(): string[] {
115 |     const tokenRegex = /\{\{(\w+)\}\}/g;
116 |     const tokens: string[] = [];
117 |     let match;
118 | 
119 |     while ((match = tokenRegex.exec(this.content)) !== null) {
120 |       const token = match[1];
121 |       if (token === undefined) {
122 |         throw new Error(`Invalid template content for ${this.type}`);
123 |       }
124 |       tokens.push(token);
125 |     }
126 | 
127 |     return tokens;
128 |   }
129 | 
130 |   private replaceTokens(
131 |     data: Record<string, string | number | boolean>
132 |   ): string {
133 |     const contentTokens = this.getTemplateTokens();
134 |     const pattern = new RegExp(`\\{\\{(${contentTokens.join("|")})\\}\\}`, "g");
135 | 
136 |     return this.content.replace(pattern, (_, key) =>
137 |       key in data ? String(data[key]) : `{{${key}}}`
138 |     );
139 |   }
140 | 
141 |   private validate(): void {
142 |     const tokens = this.getTemplateTokens();
143 |     const requiredFields = Object.keys(this.schema.shape);
144 |     const missingRequired = requiredFields.filter(
145 |       field => !tokens.includes(field)
146 |     );
147 | 
148 |     if (missingRequired.length > 0) {
149 |       logger.warn(
150 |         `Missing required tokens in ${this.type} template: ${missingRequired.join(
151 |           ", "
152 |         )}`
153 |       );
154 |     }
155 |   }
156 | }
157 | 
```

---------------------------------------------------------------------------


## File: zod.ts
- Path: `/root/git/codewrangler/src/infrastructure/templates/zod.ts`
- Size: 1.18 KB
- Extension: .ts
- Lines of code: 35
- Content:

```ts
 1 | import { z } from "zod";
 2 | 
 3 | export const baseTemplateSchema = z.object({
 4 |   PROJECT_NAME: z.string(),
 5 |   GENERATION_DATE: z.string().datetime(),
 6 |   DIRECTORY_STRUCTURE: z.string(),
 7 |   TOTAL_SIZE: z.number(),
 8 |   TOTAL_FILES: z.number(),
 9 |   TOTAL_DIRECTORIES: z.number(),
10 |   CONTENT: z.string()
11 | });
12 | 
13 | export type BaseTemplate = z.infer<typeof baseTemplateSchema>;
14 | export type BaseTemplateString = keyof BaseTemplate;
15 | 
16 | export const fileTemplateSchema = z.object({
17 |   FILE_NAME: z.string(),
18 |   FILE_EXTENSION: z.string(),
19 |   FILE_SIZE: z.number(),
20 |   FILE_DEPTH: z.number(),
21 |   FILE_LINES: z.number(),
22 |   FILE_PATH: z.string(),
23 |   FILE_CONTENTS: z.string()
24 | });
25 | 
26 | export type FileTemplate = z.infer<typeof fileTemplateSchema>;
27 | export type FileTemplateString = keyof FileTemplate;
28 | 
29 | export const directoryTemplateSchema = z.object({
30 |   DIRECTORY_NAME: z.string(),
31 |   DIRECTORY_PATH: z.string(),
32 |   DIRECTORY_SIZE: z.number(),
33 |   DIRECTORY_LENGTH: z.number(),
34 |   DIRECTORY_DEEP_LENGTH: z.number(),
35 |   DIRECTORY_DEPTH: z.number(),
36 |   DIRECTORY_NUMBER_OF_FILES: z.number(),
37 |   DIRECTORY_CONTENT: z.string()
38 | });
39 | 
40 | export type DirectoryTemplate = z.infer<typeof directoryTemplateSchema>;
41 | export type DirectoryTemplateString = keyof DirectoryTemplate;
42 | 
```

---------------------------------------------------------------------------


## File: DocumentOrchestrator.ts
- Path: `/root/git/codewrangler/src/orchestration/DocumentOrchestrator.ts`
- Size: 2.76 KB
- Extension: .ts
- Lines of code: 79
- Content:

```ts
 1 | import { IDocumentOrchestrator } from "./interfaces/IDocumentOrchestrator";
 2 | import { NodeDirectory } from "../core/entities/NodeDirectory";
 3 | import { NodeFile } from "../core/entities/NodeFile";
 4 | import { documentFactory } from "../infrastructure/filesystem/DocumentFactory";
 5 | import { IRenderStrategy } from "../services/renderer/RenderStrategy";
 6 | import { Config } from "../utils/config/Config";
 7 | import { OUTPUT_FORMATS, OutputFormat } from "../utils/config/schema";
 8 | import { logger } from "../utils/logger/Logger";
 9 | 
10 | export class DocumentOrchestrator implements IDocumentOrchestrator {
11 |   private strategy: IRenderStrategy | null = null;
12 | 
13 |   private constructor(
14 |     private readonly root: NodeDirectory | NodeFile,
15 |     private readonly config: Config
16 |   ) {}
17 | 
18 |   public static create(
19 |     root: NodeDirectory | NodeFile,
20 |     config: Config
21 |   ): DocumentOrchestrator {
22 |     const orchestrator = new DocumentOrchestrator(root, config);
23 |     orchestrator.initialize();
24 |     return orchestrator;
25 |   }
26 | 
27 |   public setStrategy(strategy: IRenderStrategy): this {
28 |     this.strategy = strategy;
29 |     return this;
30 |   }
31 | 
32 |   public async build(): Promise<void> {
33 |     try {
34 |       if (!this.strategy) {
35 |         throw new Error("Strategy is not set");
36 |       }
37 | 
38 |       const content = this.strategy.render(this.root as NodeDirectory);
39 |       const outputFormat = this.strategy.getName();
40 |       const outputPath = this.resolveOutputPath(outputFormat);
41 |       await this.ensureOutputDirectory(outputPath);
42 |       await this.writeOutput(outputPath, content);
43 | 
44 |       logger.success(`Document built successfully at ${outputPath}`);
45 |     } catch (error) {
46 |       logger.error("Failed to build document", error as Error);
47 |       throw error;
48 |     }
49 |   }
50 | 
51 |   public getStrategyName(): string {
52 |     return this.strategy?.getName() ?? "Unknown";
53 |   }
54 | 
55 |   public dispose(): void {
56 |     this.strategy?.dispose();
57 |   }
58 | 
59 |   private initialize(): void {
60 |     this.validateStructure();
61 |   }
62 | 
63 |   private validateStructure(): void {
64 |     if (!(this.root.type == "directory") && !(this.root.type == "file")) {
65 |       throw new Error("Invalid root node type");
66 |     }
67 |   }
68 | 
69 |   private resolveOutputPath(outputFormat: OutputFormat): string {
70 |     const outputFile = this.config.get("outputFile");
71 |     return documentFactory.resolve(
72 |       `${outputFile}.${OUTPUT_FORMATS[outputFormat]}`
73 |     );
74 |   }
75 | 
76 |   private async ensureOutputDirectory(outputPath: string): Promise<void> {
77 |     const directory = documentFactory.baseName(outputPath);
78 |     if (
79 |       outputPath.endsWith(`.${OUTPUT_FORMATS.html}`) ||
80 |       outputPath.endsWith(`.${OUTPUT_FORMATS.markdown}`)
81 |     ) {
82 |       return;
83 |     }
84 |     await documentFactory.ensureDirectory(directory);
85 |   }
86 | 
87 |   private async writeOutput(
88 |     outputPath: string,
89 |     content: string
90 |   ): Promise<void> {
91 |     await documentFactory.writeFile(outputPath, content);
92 |   }
93 | }
94 | 
```

---------------------------------------------------------------------------


## File: DocumentOrchestratorBuilder.ts
- Path: `/root/git/codewrangler/src/orchestration/DocumentOrchestratorBuilder.ts`
- Size: 1.97 KB
- Extension: .ts
- Lines of code: 59
- Content:

```ts
 1 | import { DocumentOrchestrator } from "./DocumentOrchestrator";
 2 | import { NodeDirectory } from "../core/entities/NodeDirectory";
 3 | import { NodeFile } from "../core/entities/NodeFile";
 4 | import { IRenderStrategy } from "../services/renderer/RenderStrategy";
 5 | import { Config } from "../utils/config/Config";
 6 | import { logger } from "../utils/logger/Logger";
 7 | 
 8 | export class DocumentOrchestratorBuilder {
 9 |   private root: NodeDirectory | NodeFile | null = null;
10 |   private config: Config | null = null;
11 |   private strategies: IRenderStrategy[] = [];
12 | 
13 |   public setRoot(root: NodeDirectory | NodeFile): this {
14 |     this.root = root;
15 |     return this;
16 |   }
17 | 
18 |   public setConfig(config: Config): this {
19 |     this.config = config;
20 |     return this;
21 |   }
22 | 
23 |   public addStrategy(strategy: IRenderStrategy): this {
24 |     this.strategies.push(strategy);
25 |     return this;
26 |   }
27 | 
28 |   public setStrategies(strategies: IRenderStrategy[]): this {
29 |     this.strategies = strategies;
30 |     return this;
31 |   }
32 | 
33 |   public async build(): Promise<DocumentOrchestrator[]> {
34 |     if (!this.root || !this.config) {
35 |       throw new Error("Missing required components for DocumentOrchestrator");
36 |     }
37 | 
38 |     if (this.strategies.length === 0) {
39 |       throw new Error("At least one render strategy is required");
40 |     }
41 | 
42 |     const orchestrators: DocumentOrchestrator[] = [];
43 | 
44 |     for (const strategy of this.strategies) {
45 |       const orchestrator = await DocumentOrchestrator.create(
46 |         this.root,
47 |         this.config
48 |       );
49 |       orchestrator.setStrategy(strategy);
50 |       orchestrators.push(orchestrator);
51 |     }
52 | 
53 |     return orchestrators;
54 |   }
55 |   public async buildAndExecute(): Promise<DocumentOrchestrator[]> {
56 |     const orchestrators = await this.build();
57 | 
58 |     for (const orchestrator of orchestrators) {
59 |       try {
60 |         await orchestrator.build();
61 |       } catch (error) {
62 |         logger.error(
63 |           `Failed to build documentation with strategy ${orchestrator.getStrategyName()}`,
64 |           error as Error
65 |         );
66 |       }
67 |     }
68 | 
69 |     return orchestrators;
70 |   }
71 | }
72 | 
```

---------------------------------------------------------------------------


## File: index.ts
- Path: `/root/git/codewrangler/src/orchestration/index.ts`
- Size: 0.00 B
- Extension: .ts
- Lines of code: 0
- Content:

```ts
1 | 
```

---------------------------------------------------------------------------


## File: IDocumentMetadata.ts
- Path: `/root/git/codewrangler/src/orchestration/interfaces/IDocumentMetadata.ts`
- Size: 132.00 B
- Extension: .ts
- Lines of code: 7
- Content:

```ts
1 | export interface IDocumentMetadata {
2 |   title: string;
3 |   description: string;
4 |   author: string;
5 |   date: string;
6 |   version: string;
7 | }
8 | 
```

---------------------------------------------------------------------------


## File: IDocumentOrchestrator.ts
- Path: `/root/git/codewrangler/src/orchestration/interfaces/IDocumentOrchestrator.ts`
- Size: 256.00 B
- Extension: .ts
- Lines of code: 7
- Content:

```ts
1 | import { IRenderStrategy } from "../../services/renderer/RenderStrategy";
2 | 
3 | export interface IDocumentOrchestrator {
4 |   setStrategy: (strategy: IRenderStrategy) => this;
5 |   getStrategyName: () => string;
6 |   build: () => Promise<void>;
7 |   dispose: () => void;
8 | }
9 | 
```

---------------------------------------------------------------------------


## File: index.ts
- Path: `/root/git/codewrangler/src/orchestration/interfaces/index.ts`
- Size: 0.00 B
- Extension: .ts
- Lines of code: 0
- Content:

```ts
1 | 
```

---------------------------------------------------------------------------


## File: DocumentTreeBuilder.ts
- Path: `/root/git/codewrangler/src/services/builder/DocumentTreeBuilder.ts`
- Size: 1.77 KB
- Extension: .ts
- Lines of code: 48
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
15 |   public async build(): Promise<RenderableDirectory | RenderableFile> {
16 |     try {
17 |       // Build file tree structure
18 |       const fileTree = await this.builder.build();
19 | 
20 |       // Convert file tree to Document tree
21 |       this.root = await this.createDocumentStructure(fileTree);
22 | 
23 |       // Initialize the entire document tree
24 |       await this.root.bundle();
25 | 
26 |       if (!this.root) {
27 |         throw new Error("No files found matching the specified pattern");
28 |       }
29 | 
30 |       logger.info("Document tree built successfully");
31 | 
32 |       return this.root;
33 |     } catch (error) {
34 |       logger.error("Error building document tree", error as Error);
35 |       throw error;
36 |     }
37 |   }
38 | 
39 |   private async createDocumentStructure(
40 |     node: INodeTree
41 |   ): Promise<RenderableDirectory | RenderableFile> {
42 |     if (node.type === FILE_TYPE.Directory) {
43 |       const directory = new RenderableDirectory(node.name, node.path);
44 | 
45 |       if (node.children) {
46 |         // Recursively create children
47 |         for (const child of node.children) {
48 |           const childDocument = await this.createDocumentStructure(child);
49 |           directory.addChild(childDocument);
50 |         }
51 |       }
52 | 
53 |       return directory;
54 |     } else {
55 |       return new RenderableFile(node.name, node.path);
56 |     }
57 |   }
58 | }
59 | 
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
- Size: 3.31 KB
- Extension: .ts
- Lines of code: 92
- Content:

```ts
  1 | import { NodeDirectory } from "../../core/entities/NodeDirectory";
  2 | import { NodeFile } from "../../core/entities/NodeFile";
  3 | import { Template } from "../../infrastructure/templates/TemplateEngine";
  4 | import {
  5 |   BaseTemplate,
  6 |   DirectoryTemplate,
  7 |   FileTemplate
  8 | } from "../../infrastructure/templates/zod";
  9 | import { Config, OutputFormat } from "../../utils/config";
 10 | 
 11 | interface IContentRenderer {
 12 |   renderFile: (file: NodeFile) => string;
 13 |   renderDirectory: (directory: NodeDirectory) => string;
 14 | }
 15 | 
 16 | interface IDocumentRenderer {
 17 |   render: (rootDirectory: NodeDirectory) => string;
 18 |   dispose: () => void;
 19 | }
 20 | 
 21 | export interface IRenderStrategy extends IContentRenderer, IDocumentRenderer {
 22 |   getName: () => OutputFormat;
 23 | }
 24 | 
 25 | export abstract class RenderBaseStrategy implements IRenderStrategy {
 26 |   protected templatePage: Template;
 27 |   protected templateDirectory: Template;
 28 |   protected templateFile: Template;
 29 | 
 30 |   protected constructor(
 31 |     private readonly config: Config,
 32 |     public readonly name: OutputFormat,
 33 |     templatePage: Template,
 34 |     templateDirectory: Template,
 35 |     templateFile: Template
 36 |   ) {
 37 |     this.templatePage = templatePage;
 38 |     this.templateDirectory = templateDirectory;
 39 |     this.templateFile = templateFile;
 40 |   }
 41 | 
 42 |   public getName(): OutputFormat {
 43 |     return this.name;
 44 |   }
 45 | 
 46 |   public renderFile(file: NodeFile): string {
 47 |     return this.templateFile.render({
 48 |       FILE_NAME: file.name,
 49 |       FILE_EXTENSION: file.extension.replace(".", ""),
 50 |       FILE_SIZE: file.size,
 51 |       FILE_DEPTH: file.deep,
 52 |       FILE_LINES: file.content?.split("\n").length || 0,
 53 |       FILE_PATH: file.path,
 54 |       FILE_CONTENTS: file.content || ""
 55 |     } as FileTemplate & Record<string, string>);
 56 |   }
 57 | 
 58 |   public renderDirectory(directory: NodeDirectory): string {
 59 |     const content = this.renderChildren(directory.children);
 60 | 
 61 |     return this.templateDirectory.render({
 62 |       DIRECTORY_NAME: directory.name,
 63 |       DIRECTORY_PATH: directory.path,
 64 |       DIRECTORY_SIZE: directory.size,
 65 |       DIRECTORY_LENGTH: directory.length,
 66 |       DIRECTORY_NUMBER_OF_FILES: directory.numberOfFiles,
 67 |       DIRECTORY_DEEP_LENGTH: directory.deepLength,
 68 |       DIRECTORY_DEPTH: directory.deep,
 69 |       DIRECTORY_CONTENT: content
 70 |     } as DirectoryTemplate & Record<string, string>);
 71 |   }
 72 | 
 73 |   public render(rootDirectory: NodeDirectory | NodeFile): string {
 74 |     const rootContent = this.renderNode(rootDirectory);
 75 | 
 76 |     const templateConfig = {
 77 |       PROJECT_NAME:
 78 |         this.config.get("projectName") || rootDirectory.name || "Project",
 79 |       GENERATION_DATE: new Date().toISOString(),
 80 |       TOTAL_SIZE: rootDirectory.size,
 81 |       CONTENT: rootContent
 82 |     } as BaseTemplate & Record<string, string>;
 83 | 
 84 |     if (rootDirectory.type === "directory") {
 85 |       templateConfig["TOTAL_FILES"] = rootDirectory.length;
 86 |       templateConfig["TOTAL_DIRECTORIES"] = rootDirectory.deepLength;
 87 |     }
 88 | 
 89 |     return this.templatePage.render(templateConfig);
 90 |   }
 91 | 
 92 |   public dispose(): void {
 93 |     this.templatePage.dispose();
 94 |     this.templateDirectory.dispose();
 95 |     this.templateFile.dispose();
 96 |   }
 97 | 
 98 |   protected renderNode(node: NodeFile | NodeDirectory): string {
 99 |     return node.type === "file"
100 |       ? this.renderFile(node)
101 |       : this.renderDirectory(node);
102 |   }
103 | 
104 |   protected renderChildren(children: (NodeFile | NodeDirectory)[]): string {
105 |     if (!children) return "";
106 |     return children.map(child => this.renderNode(child)).join("");
107 |   }
108 | }
109 | 
```

---------------------------------------------------------------------------


## File: RenderStrategyBuilder.ts
- Path: `/root/git/codewrangler/src/services/renderer/RenderStrategyBuilder.ts`
- Size: 3.04 KB
- Extension: .ts
- Lines of code: 88
- Content:

```ts
  1 | import { RenderBaseStrategy } from "./RenderStrategy";
  2 | import { RenderHTMLStrategy } from "./strategies/HTMLStrategy";
  3 | import { RenderMarkdownStrategy } from "./strategies/MarkdownStrategy";
  4 | import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
  5 | import { Template } from "../../infrastructure/templates/TemplateEngine";
  6 | import {
  7 |   baseTemplateSchema,
  8 |   directoryTemplateSchema,
  9 |   fileTemplateSchema
 10 | } from "../../infrastructure/templates/zod";
 11 | import { Config, OutputFormatExtension } from "../../utils/config";
 12 | 
 13 | export class RenderStrategyBuilder {
 14 |   private config: Config | null = null;
 15 |   private extension: OutputFormatExtension | null = null;
 16 |   private name: string | null = null;
 17 |   private templatePage: Template | null = null;
 18 |   private templateDirectory: Template | null = null;
 19 |   private templateFile: Template | null = null;
 20 | 
 21 |   public setConfig(config: Config): RenderStrategyBuilder {
 22 |     this.config = config;
 23 |     return this;
 24 |   }
 25 | 
 26 |   public setExtension(extension: OutputFormatExtension): RenderStrategyBuilder {
 27 |     this.extension = extension;
 28 |     return this;
 29 |   }
 30 | 
 31 |   public setName(name: string): RenderStrategyBuilder {
 32 |     this.name = name;
 33 |     return this;
 34 |   }
 35 | 
 36 |   public async loadTemplates(): Promise<RenderStrategyBuilder> {
 37 |     if (!this.config) {
 38 |       throw new Error("Config is required");
 39 |     }
 40 | 
 41 |     const templateDir = Template.getTemplateDir(this.config);
 42 | 
 43 |     this.templatePage = await this.loadTemplatePage(templateDir);
 44 |     this.templateDirectory = await this.loadTemplateDirectory(templateDir);
 45 |     this.templateFile = await this.loadTemplateFile(templateDir);
 46 | 
 47 |     return this;
 48 |   }
 49 | 
 50 |   public build(): RenderBaseStrategy {
 51 |     this.validate();
 52 | 
 53 |     const concreteRenderStrategy =
 54 |       this.name === "Markdown" ? RenderMarkdownStrategy : RenderHTMLStrategy;
 55 | 
 56 |     return new concreteRenderStrategy(
 57 |       this.config as Config,
 58 |       this.templatePage as Template,
 59 |       this.templateDirectory as Template,
 60 |       this.templateFile as Template
 61 |     );
 62 |   }
 63 | 
 64 |   private validate(): boolean {
 65 |     if (!this.config) {
 66 |       throw new Error("Config is required");
 67 |     }
 68 |     if (!this.extension) {
 69 |       throw new Error("Extension is required");
 70 |     }
 71 |     if (!this.name) {
 72 |       throw new Error("Name is required");
 73 |     }
 74 |     if (!this.templatePage || !this.templateDirectory || !this.templateFile) {
 75 |       throw new Error("Templates must be loaded before building");
 76 |     }
 77 | 
 78 |     return true;
 79 |   }
 80 | 
 81 |   private loadTemplateFile(templateDir: string): Promise<Template> {
 82 |     return Template.create(
 83 |       "file",
 84 |       fileTemplateSchema,
 85 |       documentFactory.join(templateDir, `file.${this.extension}`)
 86 |     );
 87 |   }
 88 | 
 89 |   private loadTemplateDirectory(templateDir: string): Promise<Template> {
 90 |     return Template.create(
 91 |       "directory",
 92 |       directoryTemplateSchema,
 93 |       documentFactory.join(templateDir, `directory.${this.extension}`)
 94 |     );
 95 |   }
 96 | 
 97 |   private loadTemplatePage(templateDir: string): Promise<Template> {
 98 |     return Template.create(
 99 |       "page",
100 |       baseTemplateSchema,
101 |       documentFactory.join(templateDir, `page.${this.extension}`)
102 |     );
103 |   }
104 | }
105 | 
```

---------------------------------------------------------------------------


## File: RenderStrategyFactory.ts
- Path: `/root/git/codewrangler/src/services/renderer/RenderStrategyFactory.ts`
- Size: 1.33 KB
- Extension: .ts
- Lines of code: 42
- Content:

```ts
 1 | import { RenderBaseStrategy } from "./RenderStrategy";
 2 | import { RenderStrategyBuilder } from "./RenderStrategyBuilder";
 3 | import { Config } from "../../utils/config/Config";
 4 | import { OutputFormat } from "../../utils/config/schema";
 5 | 
 6 | // Factory function for common render strategies
 7 | export const renderStrategyFactory = {
 8 |   async createMarkdownStrategy(config: Config): Promise<RenderBaseStrategy> {
 9 |     return await new RenderStrategyBuilder()
10 |       .setConfig(config)
11 |       .setExtension("md")
12 |       .setName("Markdown")
13 |       .loadTemplates()
14 |       .then(builder => builder.build());
15 |   },
16 | 
17 |   async createHTMLStrategy(config: Config): Promise<RenderBaseStrategy> {
18 |     return await new RenderStrategyBuilder()
19 |       .setConfig(config)
20 |       .setExtension("html")
21 |       .setName("HTML")
22 |       .loadTemplates()
23 |       .then(builder => builder.build());
24 |   },
25 | 
26 |   async createStrategies(
27 |     config: Config,
28 |     formats: OutputFormat[]
29 |   ): Promise<RenderBaseStrategy[]> {
30 |     return await Promise.all(
31 |       formats.map(format => this.createStrategy(config, format))
32 |     );
33 |   },
34 | 
35 |   async createStrategy(
36 |     config: Config,
37 |     format: OutputFormat
38 |   ): Promise<RenderBaseStrategy> {
39 |     switch (format) {
40 |       case "markdown":
41 |         return await this.createMarkdownStrategy(config);
42 |       case "html":
43 |         return await this.createHTMLStrategy(config);
44 |     }
45 |   }
46 | };
47 | 
```

---------------------------------------------------------------------------


## File: HTMLStrategy.ts
- Path: `/root/git/codewrangler/src/services/renderer/strategies/HTMLStrategy.ts`
- Size: 459.00 B
- Extension: .ts
- Lines of code: 13
- Content:

```ts
 1 | import { Template } from "../../../infrastructure/templates/TemplateEngine";
 2 | import { Config } from "../../../utils/config";
 3 | import { RenderBaseStrategy } from "../RenderStrategy";
 4 | 
 5 | export class RenderHTMLStrategy extends RenderBaseStrategy {
 6 |   public constructor(
 7 |     config: Config,
 8 |     templatePage: Template,
 9 |     templateDirectory: Template,
10 |     templateFile: Template
11 |   ) {
12 |     super(config, "html", templatePage, templateDirectory, templateFile);
13 |   }
14 | }
15 | 
```

---------------------------------------------------------------------------


## File: MarkdownStrategy.ts
- Path: `/root/git/codewrangler/src/services/renderer/strategies/MarkdownStrategy.ts`
- Size: 467.00 B
- Extension: .ts
- Lines of code: 13
- Content:

```ts
 1 | import { Template } from "../../../infrastructure/templates/TemplateEngine";
 2 | import { Config } from "../../../utils/config";
 3 | import { RenderBaseStrategy } from "../RenderStrategy";
 4 | 
 5 | export class RenderMarkdownStrategy extends RenderBaseStrategy {
 6 |   public constructor(
 7 |     config: Config,
 8 |     templatePage: Template,
 9 |     templateDirectory: Template,
10 |     templateFile: Template
11 |   ) {
12 |     super(config, "markdown", templatePage, templateDirectory, templateFile);
13 |   }
14 | }
15 | 
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
- Size: 1.06 KB
- Extension: .ts
- Lines of code: 51
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
54 | export interface IPropsDirectoryNode extends IPropsNode {
55 |   deepLength: number;
56 |   length: number;
57 | }
58 | 
59 | export interface IPropsFileNode extends IPropsNode {
60 |   extension: string;
61 | }
62 | 
```

---------------------------------------------------------------------------


## File: Config.ts
- Path: `/root/git/codewrangler/src/utils/config/Config.ts`
- Size: 2.56 KB
- Extension: .ts
- Lines of code: 86
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
37 |     value: ConfigOptions[keyof ConfigOptions] | undefined
38 |   ): void {
39 |     if (value === undefined) {
40 |       return;
41 |     }
42 |     const updatedConfig = { ...this.config, [key]: value };
43 |     try {
44 |       configSchema.parse(updatedConfig);
45 |       this.config = updatedConfig;
46 |     } catch (error) {
47 |       if (error instanceof z.ZodError) {
48 |         logger.error(`Invalid configuration value: ${error.errors}`);
49 |       }
50 |       throw error;
51 |     }
52 |   }
53 |   public getAll(): ConfigOptions {
54 |     return this.config;
55 |   }
56 |   public reset(): void {
57 |     this.config = DEFAULT_CONFIG;
58 |   }
59 |   public static destroy(): void {
60 |     Config.instance = undefined;
61 |   }
62 |   public override(config: Partial<ConfigOptions>): void {
63 |     const newOverrideConfig = { ...this.config, ...config };
64 |     try {
65 |       configSchema.parse(newOverrideConfig);
66 |       this.config = newOverrideConfig;
67 |     } catch (error) {
68 |       if (error instanceof z.ZodError) {
69 |         logger.error(`Invalid configuration value: ${error.errors}`);
70 |       }
71 |       throw error;
72 |     }
73 |   }
74 | 
75 |   private async loadUserConfig(): Promise<void> {
76 |     try {
77 |       const configPath = documentFactory.resolve(this.config.codeConfigFile);
78 |       const userConfig = await this.jsonReader.readJsonSync(configPath);
79 |       this.config = configSchema.parse({ ...this.config, ...userConfig });
80 |     } catch (error) {
81 |       this.handleConfigError(error);
82 |     }
83 |   }
84 | 
85 |   private handleConfigError(error: unknown): void {
86 |     if (error instanceof z.ZodError) {
87 |       const details = error.errors
88 |         .map(err => `${err.path.join(".")}: ${err.message}`)
89 |         .join(", ");
90 |       throw new Error(`Configuration validation failed: ${details}`);
91 |     }
92 |     throw error;
93 |   }
94 | }
95 | 
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
- Size: 2.80 KB
- Extension: .ts
- Lines of code: 81
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
46 |     verbose: z.boolean().default(false),
47 |     followSymlinks: z.boolean().default(false),
48 |     codeConfigFile: z
49 |       .string()
50 |       .regex(/\.json$/, "Config file must end with .json")
51 |       .default("public/codewrangler.json")
52 |   })
53 |   .strict();
54 | 
55 | export type ConfigOptions = z.infer<typeof configSchema>;
56 | // get a type listing all the keys of the config
57 | export type ConfigKeys = keyof ConfigOptions;
58 | 
59 | const DEFAULT_CONFIG_IGNORE = {
60 |   ignoreHiddenFiles: true, // Default value
61 |   additionalIgnoreFiles: [],
62 |   excludePatterns: ["node_modules/**", "**/*.test.ts", "dist/**"]
63 | };
64 | 
65 | const DEFAULT_CONFIG_LOG = {
66 |   logLevel: "INFO",
67 |   verbose: false
68 | };
69 | 
70 | const DEFAULT_CONFIG_LIMITS = {
71 |   maxFileSize: 1048576,
72 |   maxDepth: 100
73 | };
74 | 
75 | const DEFAULT_CONFIG_PATHS = {
76 |   templatesDir: "public/templates",
77 |   codeConfigFile: "public/codewrangler.json"
78 | };
79 | 
80 | const DEFAULT_CONFIG_OUTPUT = {
81 |   outputFormat: ["markdown"] as OutputFormat[],
82 |   outputFile: "output"
83 | };
84 | 
85 | export const DEFAULT_CONFIG: ConfigOptions = {
86 |   dir: process.cwd(), // current working directory, where the command is run
87 |   rootDir: process.cwd(),
88 |   projectName: undefined,
89 |   pattern: ".*",
90 |   followSymlinks: false,
91 |   ...DEFAULT_CONFIG_PATHS,
92 |   ...DEFAULT_CONFIG_LIMITS,
93 |   ...DEFAULT_CONFIG_IGNORE,
94 |   ...DEFAULT_CONFIG_LOG,
95 |   ...DEFAULT_CONFIG_OUTPUT
96 | };
97 | 
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

