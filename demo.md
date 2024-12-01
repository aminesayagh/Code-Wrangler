
# Code Documentation
Generated on: 2024-12-01T18:06:46.012Z
Total files: 46

## Project Structure

```
codewrangler
├── coverage
├── dist
├── documentation
├── node_modules
├── public
│   └── templates
└── src
    ├── __mocks__
    │   ├── mockFileSystem.ts
    │   └── root
    │       ├── dir
    │       │   └── file3.ts
    │       ├── file1.ts
    │       └── temp_test
    │           ├── ensure
    │           └── mode-test
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
    │   │   ├── NodeDIrectory.ts
    │   │   ├── NodeFile.ts
    │   │   └── __tests__
    │   │       ├── NodeBase.test.ts
    │   │       ├── NodeDIrectory.test.ts
    │   │       └── NodeFile.test.ts
    │   └── errors
    │       ├── DirectoryNotFoundError.ts
    │       ├── DocumentError.ts
    │       ├── FileNotFoundError.ts
    │       └── index.ts
    ├── infrastructure
    │   ├── filesystem
    │   │   ├── DocumentFactory.ts
    │   │   └── __tests__
    │   │       └── DocumentFactory.test.ts
    │   └── templates
    │       ├── TemplateEngine.ts
    │       ├── __tests__
    │       │   └── TemplateEngine.test.ts
    │       └── zod.ts
    ├── services
    │   ├── builder
    │   │   ├── DocumentTreeBuilder.ts
    │   │   ├── FileHidden.ts
    │   │   ├── FileTreeBuilder.ts
    │   │   └── __tests__
    │   │       ├── DocumentTreeBuild.test.ts
    │   │       ├── FileHidden.test.ts
    │   │       └── FileTreeBuilder.test.ts
    │   └── renderer
    │       ├── RenderStrategy.ts
    │       ├── __tests__
    │       │   ├── HTMLStrategy.test.ts
    │       │   ├── MarkdownStrategy.test.ts
    │       │   └── RenderStrategy.test.ts
    │       └── strategies
    │           ├── HTMLStrategy.ts
    │           └── MarkdownStrategy.ts
    ├── types
    │   ├── template.ts
    │   └── type.ts
    └── utils
        ├── config
        │   ├── Config.ts
        │   ├── __tests__
        │   │   └── Config.test.ts
        │   ├── index.ts
        │   └── schema.ts
        ├── helpers
        │   └── ProgressBar.ts
        └── logger
            ├── Logger.ts
            ├── __tests__
            │   └── Logger.test.ts
            └── index.ts
```


## File: mockFileSystem.ts
- Path: `/root/git/codewrangler/src/__mocks__/mockFileSystem.ts`
- Size: 1.36 KB
- Extension: .ts
- Lines of code: 38
- Content:

```ts
 1 | import path from "path";
 2 | 
 3 | export interface IFileSystem {
 4 |   [key: string]: string | IFileSystem;
 5 | }
 6 | 
 7 | export const MOCK_PATH = path.resolve("src/__mocks__/root");
 8 | 
 9 | export const mockFileSystem: IFileSystem = {
10 |   root: {
11 |     "file1.ts": `export const test = "test 1";\n`,
12 |     "file2.js": `export const test = "test 2";`,
13 |     dir: {
14 |       "file3.ts": `export const test = "test 3";`,
15 |       "file4.js": `export const test = "test 4";`,
16 |     },
17 |   },
18 | };
19 | 
20 | export const mockPath = (): string => path.resolve("src/__mocks__/root");
21 | 
22 | export function isDirectory(path: string): boolean {
23 |   const parts = path.split("/").filter(Boolean);
24 |   let current: IFileSystem | string = mockFileSystem;
25 |   for (const part of parts) {
26 |     const currentPart = (current as IFileSystem)[part] as IFileSystem | string;
27 |     if (typeof currentPart === "string") return false;
28 |     current = currentPart;
29 |   }
30 |   return true;
31 | }
32 | 
33 | export function getContent(path: string): string | null {
34 |   const parts = path.split("/").filter(Boolean);
35 |   let current: IFileSystem | string = mockFileSystem;
36 |   for (const part of parts) {
37 |     if ((current as IFileSystem)[part] === undefined) {
38 |       console.error("File not found: ", path, "on part: ", part);
39 |       throw new Error(`File not found: ${path}`);
40 |     }
41 |     current = (current as IFileSystem)[part] as IFileSystem | string;
42 |   }
43 |   return typeof current === "string" ? current : null;
44 | }
45 | 
```

---------------------------------------------------------------------------


## File: file3.ts
- Path: `/root/git/codewrangler/src/__mocks__/root/dir/file3.ts`
- Size: 29.00 B
- Extension: .ts
- Lines of code: 1
- Content:

```ts
1 | export const test = "test 3";
```

---------------------------------------------------------------------------


## File: file1.ts
- Path: `/root/git/codewrangler/src/__mocks__/root/file1.ts`
- Size: 30.00 B
- Extension: .ts
- Lines of code: 1
- Content:

```ts
1 | export const test = "test 1";
2 | 
```

---------------------------------------------------------------------------


## File: CodeWrangler.ts
- Path: `/root/git/codewrangler/src/cli/CodeWrangler.ts`
- Size: 1.21 KB
- Extension: .ts
- Lines of code: 32
- Content:

```ts
 1 | import { Command } from "commander";
 2 | import { Config } from "../utils/config/Config";
 3 | import { GenerateCommand } from "./commands/GenerateCommand";
 4 | import { ProgramBuilder } from "./program/ProgramBuilder";
 5 | import { ICommandOptions } from "./commands/types";
 6 | 
 7 | export class CodeWrangler {
 8 |   private static instance: CodeWrangler | undefined;
 9 |   private readonly VERSION = "1.0.0";
10 |   private config: Config;
11 |   private program: Command;
12 |   private generateCommand: GenerateCommand;
13 | 
14 |   private constructor(config: Config) {
15 |     this.config = config;
16 |     this.generateCommand = new GenerateCommand(this.config);
17 |     this.program = new ProgramBuilder(this.config, this.VERSION).build();
18 | 
19 |     this.setupCommands();
20 |   }
21 | 
22 |   private setupCommands(): void {
23 |     this.program.action(async (pattern: string, options: ICommandOptions) => {
24 |       await this.generateCommand.execute([pattern], options);
25 |     });
26 |   }
27 | 
28 |   public static async run(): Promise<boolean> {
29 |     if (!CodeWrangler.instance) {
30 |       const config = await Config.load();
31 |       CodeWrangler.instance = new CodeWrangler(config);
32 |       await CodeWrangler.instance.program.parseAsync(process.argv);
33 |       return true;
34 |     }
35 |     throw new Error("CodeWrangler already initialized");
36 |   }
37 | }
38 | 
```

---------------------------------------------------------------------------


## File: DemoCommand.ts
- Path: `/root/git/codewrangler/src/cli/commands/DemoCommand.ts`
- Size: 6.41 KB
- Extension: .ts
- Lines of code: 231
- Content:

```ts
  1 | import * as fs from "fs/promises";
  2 | import * as path from "path";
  3 | 
  4 | interface IFileInfo {
  5 |   name: string;
  6 |   path: string;
  7 |   content: string;
  8 |   ext: string;
  9 |   size: number;
 10 |   lines: number;
 11 | }
 12 | 
 13 | interface ITreeNode {
 14 |   name: string;
 15 |   path: string;
 16 |   type: "file" | "directory";
 17 |   children: ITreeNode[];
 18 | }
 19 | 
 20 | interface IDocumentConfig {
 21 |   pattern: RegExp;
 22 |   rootDir: string;
 23 |   outputPath: string;
 24 |   excludePatterns: string[];
 25 |   maxFileSize: number;
 26 |   ignoreHidden: boolean;
 27 | }
 28 | 
 29 | const DEFAULT_CONFIG: IDocumentConfig = {
 30 |   pattern: /.*/,
 31 |   rootDir: process.cwd(),
 32 |   outputPath: "documentation.md",
 33 |   excludePatterns: ["node_modules/**", "**/dist/**", "**/*.test.ts"],
 34 |   maxFileSize: 1024 * 1024, // 1MB
 35 |   ignoreHidden: true,
 36 | };
 37 | 
 38 | // Tree visualization functions
 39 | const generateTreeSymbols = (depth: number, isLast: boolean[]): string => {
 40 |   if (depth === 0) return "";
 41 | 
 42 |   return (
 43 |     isLast
 44 |       .slice(0, -1)
 45 |       .map((last) => (last ? "    " : "│   "))
 46 |       .join("") + (isLast[isLast.length - 1] ? "└── " : "├── ")
 47 |   );
 48 | };
 49 | 
 50 | const createTreeNode = async (
 51 |   nodePath: string,
 52 |   config: IDocumentConfig,
 53 |   relativePath = ""
 54 | ): Promise<ITreeNode | null> => {
 55 |   const stats = await fs.stat(nodePath);
 56 |   const name = path.basename(nodePath);
 57 | 
 58 |   if (!shouldInclude(nodePath, config)) {
 59 |     return null;
 60 |   }
 61 | 
 62 |   if (stats.isDirectory()) {
 63 |     const entries = await fs.readdir(nodePath, { withFileTypes: true });
 64 |     const children: ITreeNode[] = [];
 65 | 
 66 |     for (const entry of entries) {
 67 |       const childNode = await createTreeNode(
 68 |         path.join(nodePath, entry.name),
 69 |         config,
 70 |         path.join(relativePath, name)
 71 |       );
 72 |       if (childNode) children.push(childNode);
 73 |     }
 74 | 
 75 |     return {
 76 |       name,
 77 |       path: relativePath || name,
 78 |       type: "directory",
 79 |       children,
 80 |     };
 81 |   } else if (isMatchingFile(nodePath, config)) {
 82 |     return {
 83 |       name,
 84 |       path: relativePath || name,
 85 |       type: "file",
 86 |       children: [],
 87 |     };
 88 |   }
 89 | 
 90 |   return null;
 91 | };
 92 | 
 93 | const renderTreeNode = (
 94 |   node: ITreeNode,
 95 |   isLast: boolean[] = [],
 96 |   result: string[] = []
 97 | ): string[] => {
 98 |   const prefix = generateTreeSymbols(isLast.length, isLast);
 99 |   result.push(prefix + node.name);
100 | 
101 |   if (node.type === "directory") {
102 |     node.children.forEach((child, index) => {
103 |       renderTreeNode(
104 |         child,
105 |         [...isLast, index === node.children.length - 1],
106 |         result
107 |       );
108 |     });
109 |   }
110 | 
111 |   return result;
112 | };
113 | 
114 | const isHidden = (filePath: string): boolean => {
115 |   const baseName = path.basename(filePath);
116 |   return baseName.startsWith(".");
117 | };
118 | 
119 | const shouldInclude = (
120 |   filePath: string,
121 |   { excludePatterns, ignoreHidden }: IDocumentConfig
122 | ): boolean => {
123 |   // Check for hidden files if ignoreHidden is enabled
124 |   if (ignoreHidden && isHidden(filePath)) {
125 |     return false;
126 |   }
127 | 
128 |   // Check against exclude patterns
129 |   const isExcluded = excludePatterns.some((pattern) =>
130 |     new RegExp(pattern.replace(/\*/g, ".*")).test(filePath)
131 |   );
132 | 
133 |   return !isExcluded;
134 | };
135 | 
136 | // Pure functions for file operations
137 | const isMatchingFile = (filePath: string, config: IDocumentConfig): boolean => {
138 |   if (!config.pattern) {
139 |     throw new Error("Pattern is not defined in the config");
140 |   }
141 | 
142 |   if (!shouldInclude(filePath, config)) {
143 |     return false;
144 |   }
145 | 
146 |   return config.pattern.test(filePath);
147 | };
148 | 
149 | const formatSize = (bytes: number): string => {
150 |   const units = ["B", "KB", "MB", "GB"];
151 |   let size = bytes;
152 |   let unitIndex = 0;
153 | 
154 |   while (size >= 1024 && unitIndex < units.length - 1) {
155 |     size /= 1024;
156 |     unitIndex++;
157 |   }
158 | 
159 |   return `${size.toFixed(2)} ${units[unitIndex]}`;
160 | };
161 | 
162 | // Core file processing functions
163 | 
164 | async function* walkDirectory(dir: string): AsyncGenerator<string> {
165 |   const entries = await fs.readdir(dir, { withFileTypes: true });
166 | 
167 |   for (const entry of entries) {
168 |     const fullPath = path.join(dir, entry.name);
169 | 
170 |     if (entry.isDirectory()) {
171 |       yield* walkDirectory(fullPath);
172 |     } else {
173 |       yield fullPath;
174 |     }
175 |   }
176 | }
177 | 
178 | const formatContentWithLineNumbers = (content: string): string => {
179 |   const lines = content.split("\n");
180 |   const lineNumberWidth = lines.length.toString().length;
181 | 
182 |   return lines
183 |     .map((line, index) => {
184 |       const lineNumber = (index + 1).toString().padStart(lineNumberWidth, " ");
185 |       return `${lineNumber} | ${line}`;
186 |     })
187 |     .join("\n");
188 | };
189 | 
190 | // Markdown generation functions
191 | const generateFileSection = (file: IFileInfo): string => `
192 | ## File: ${file.name}
193 | - Path: \`${file.path}\`
194 | - Size: ${formatSize(Number(file.size))}
195 | - Extension: ${file.ext}
196 | - Lines of code: ${file.lines}
197 | - Content:
198 | 
199 | \`\`\`${file.ext.slice(1) || "plaintext"}
200 | ${formatContentWithLineNumbers(file.content)}
201 | \`\`\`
202 | 
203 | ---------------------------------------------------------------------------
204 | `;
205 | 
206 | const generateMarkdownContent = (
207 |   files: IFileInfo[],
208 |   treeContent: string
209 | ): string => `
210 | # Code Documentation
211 | Generated on: ${new Date().toISOString()}
212 | Total files: ${files.length}
213 | 
214 | ## Project Structure
215 | 
216 | \`\`\`
217 | ${treeContent}
218 | \`\`\`
219 | 
220 | ${files.map(generateFileSection).join("\n")}
221 | `;
222 | 
223 | // Main function
224 | async function generateDocumentation(
225 |   userConfig: Partial<IDocumentConfig> = {}
226 | ): Promise<void> {
227 |   try {
228 |     const config: IDocumentConfig = { ...DEFAULT_CONFIG, ...userConfig };
229 |     const files: IFileInfo[] = [];
230 | 
231 |     // Generate tree structure
232 |     const rootNode = await createTreeNode(config.rootDir, config);
233 |     const treeContent = rootNode
234 |       ? renderTreeNode(rootNode).join("\n")
235 |       : "No matching files found";
236 | 
237 |     for await (const filePath of walkDirectory(config.rootDir)) {
238 |       if (isMatchingFile(filePath, config)) {
239 |         const stats = await fs.stat(filePath);
240 |         if (stats.size <= config.maxFileSize) {
241 |           const content = await fs.readFile(filePath, "utf-8");
242 |           files.push({
243 |             name: path.basename(filePath),
244 |             path: filePath,
245 |             content,
246 |             ext: path.extname(filePath),
247 |             size: stats.size,
248 |             lines: content.split("\n").filter((line) => line.trim() !== "")
249 |               .length,
250 |           });
251 |         }
252 |       }
253 |     }
254 | 
255 |     const markdownContent = generateMarkdownContent(files, treeContent);
256 |     await fs.writeFile(config.outputPath, markdownContent, "utf-8");
257 |   } catch (error) {
258 |     console.error("Error generating documentation", error);
259 |     throw error;
260 |   }
261 | }
262 | 
263 | if (require.main === module) {
264 |   generateDocumentation({
265 |     pattern: /\.ts$/,
266 |     outputPath: "documentation.md",
267 |     ignoreHidden: true,
268 |     excludePatterns: [
269 |       "node_modules/**",
270 |       "**/dist/**",
271 |       "coverage/**",
272 |     ],
273 |   }).catch(console.error);
274 | }
275 | 
```

---------------------------------------------------------------------------


## File: GenerateCommand.ts
- Path: `/root/git/codewrangler/src/cli/commands/GenerateCommand.ts`
- Size: 1.88 KB
- Extension: .ts
- Lines of code: 50
- Content:

```ts
 1 | import { ICommand, ICommandOptions } from "./types";
 2 | import { Config } from "../../utils/config/Config";
 3 | import { logger } from "../../utils/logger/Logger";
 4 | import { DocumentTreeBuilder } from "../../services/builder/DocumentTreeBuilder";
 5 | import { MarkdownStrategy } from "../../services/renderer/strategies/MarkdownStrategy";
 6 | import { HTMLRenderStrategy } from "../../services/renderer/strategies/HTMLStrategy";
 7 | 
 8 | export class GenerateCommand implements ICommand {
 9 |   constructor(private config: Config) {}
10 | 
11 |   private logVerbose(): void {
12 |     logger.debug(
13 |       `Searching for file matching pattern: ${this.config.get("pattern")}`
14 |     );
15 |     logger.debug(
16 |       `Excluding patterns: ${(
17 |         this.config.get("excludePatterns") as string[]
18 |       ).join(", ")}`
19 |     );
20 |     logger.debug(
21 |       `Ignoring hidden files: ${this.config.get("ignoreHiddenFiles")}`
22 |     );
23 |     logger.debug(`Max file size: ${this.config.get("maxFileSize")} bytes`);
24 |   }
25 | 
26 |   async execute(args: string[], options: ICommandOptions): Promise<void> {
27 |     try {
28 |       // Override config with command options
29 |       this.config.override({ ...options, pattern: args[0] });
30 | 
31 |       // Log verbose information if enabled
32 |       if (options.verbose) {
33 |         this.logVerbose();
34 |       }
35 | 
36 |       // Execute document tree building
37 |       const outputFormat = this.config.get("outputFormat");
38 |       const renderStrategies = outputFormat.map((format) => {
39 |         switch (format) {
40 |           case "markdown":
41 |             return new MarkdownStrategy(this.config);
42 |           case "html":
43 |             return new HTMLRenderStrategy(this.config);
44 |           default:
45 |             throw new Error(`Unsupported output format: ${format}`);
46 |         }
47 |       });
48 |       const builder = new DocumentTreeBuilder(this.config, renderStrategies);
49 |       await builder.build();
50 |     } catch (error) {
51 |       logger.error("Generation failed:", error as Error);
52 |       throw error;
53 |     }
54 |   }
55 | }
56 | 
```

---------------------------------------------------------------------------


## File: types.ts
- Path: `/root/git/codewrangler/src/cli/commands/types.ts`
- Size: 331.00 B
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
14 |   execute(args: string[], options: ICommandOptions): Promise<void>;
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
- Size: 1.57 KB
- Extension: .ts
- Lines of code: 57
- Content:

```ts
 1 | 
 2 | import { Command } from 'commander';
 3 | import { Config } from '../../utils/config/Config';
 4 | 
 5 | export class ProgramBuilder {
 6 |   private program: Command;
 7 |   
 8 |   constructor(
 9 |     private config: Config,
10 |     private version: string
11 |   ) {
12 |     this.program = new Command();
13 |   }
14 | 
15 |   build(): Command {
16 |     return this.program
17 |       .version(this.version)
18 |       .description("CodeWrangler is a tool for generating code")
19 |       .argument(
20 |         "<pattern>",
21 |         'File pattern to match (e.g., "\\.ts$" for TypeScript files)'
22 |       )
23 |       .option("-d, --dir <dir>", "Directory to search", this.config.get("dir"))
24 |       .option(
25 |         "-o, --output <output>",
26 |         "Output file",
27 |         this.config.get("outputFile")
28 |       )
29 |       .option(
30 |         "-c, --config <config>",
31 |         "Config file",
32 |         this.config.get("codeConfigFile")
33 |       )
34 |       .option("-v, --verbose", "Verbose mode", this.config.get("logLevel"))
35 |       .option(
36 |         "-f, --format <format>",
37 |         "Output format",
38 |         this.config.get("outputFormat")
39 |       )
40 |       .option(
41 |         "-s, --max-size <max-size>",
42 |         "Max file size",
43 |         this.config.get("maxFileSize").toString()
44 |       )
45 |       .option(
46 |         "-e, --exclude <exclude>",
47 |         "Exclude patterns",
48 |         this.config.get("excludePatterns")
49 |       )
50 |       .option(
51 |         "-i, --ignore-hidden",
52 |         "Ignore hidden files",
53 |         this.config.get("ignoreHiddenFiles")
54 |       )
55 |       .option(
56 |         "-a, --additional-ignore <additional-ignore>",
57 |         "Additional ignore patterns",
58 |         this.config.get("additionalIgnoreFiles")
59 |       );
60 |   }
61 | }
62 | 
```

---------------------------------------------------------------------------


## File: NodeBase.ts
- Path: `/root/git/codewrangler/src/core/entities/NodeBase.ts`
- Size: 2.64 KB
- Extension: .ts
- Lines of code: 104
- Content:

```ts
  1 | import { IFileStats, IPropsNode } from "../../types/type";
  2 | import { DocumentFactory } from "../../infrastructure/filesystem/DocumentFactory";
  3 | 
  4 | const defaultProps: IPropsNode = {
  5 |   name: "",
  6 |   path: "",
  7 |   deep: 0,
  8 |   size: 0, // size of the node from the children nodes
  9 |   stats: {
 10 |     size: 0, // size of the node from the file system
 11 |     created: new Date(),
 12 |     modified: new Date(),
 13 |     accessed: new Date(),
 14 |     isDirectory: false,
 15 |     isFile: false,
 16 |     permissions: {
 17 |       readable: false,
 18 |       writable: false,
 19 |       executable: false,
 20 |     },
 21 |   },
 22 | };
 23 | 
 24 | interface INodeLifeCycle {
 25 |   validate(): boolean;
 26 |   bundle(deep: number): Promise<void>;
 27 |   render(): void;
 28 |   dispose(): Promise<void>;
 29 |   clone(): Promise<NodeBase>;
 30 | }
 31 | 
 32 | export abstract class NodeBase implements INodeLifeCycle {
 33 |   protected _props: IPropsNode = { ...defaultProps };
 34 | 
 35 |   constructor(_name: string, _path: string) {
 36 |     // check if path is absolute or a valid path
 37 |     this.initNode(_name, _path);
 38 |     this.validate();
 39 |   }
 40 | 
 41 |   private validatePath(path: string): boolean {
 42 |     if (!DocumentFactory.exists(path)) {
 43 |       throw new Error("Path does not exist");
 44 |     }
 45 |     if (!DocumentFactory.isAbsolute(path)) {
 46 |       throw new Error("Path is not absolute");
 47 |     }
 48 |     return true;
 49 |   }
 50 | 
 51 |   public validate(): boolean {
 52 |     return this.validatePath(this.path);
 53 |   }
 54 | 
 55 |   private initNode(name: string, path: string): void {
 56 |     this.deep = 0;
 57 |     this.size = 0;
 58 |     this.name = name;
 59 |     this.path = DocumentFactory.resolve(path);
 60 |   }
 61 | 
 62 |   // abstract methods
 63 |   abstract bundle(deep: number): Promise<void>;
 64 |   abstract render(): void;
 65 |   abstract get secondaryProps(): Record<string, unknown> | undefined;
 66 | 
 67 |   // getters and setters
 68 |   // deep
 69 |   get deep(): number {
 70 |     return this._props.deep;
 71 |   }
 72 |   protected set deep(deep: number) {
 73 |     this._props.deep = deep;
 74 |   }
 75 | 
 76 |   // size
 77 |   get size(): number {
 78 |     return this._props.size;
 79 |   }
 80 |   protected set size(size: number) {
 81 |     this._props.size = size;
 82 |   }
 83 | 
 84 |   // name
 85 |   get name(): string {
 86 |     return this._props.name;
 87 |   }
 88 |   protected set name(name: string) {
 89 |     this._props.name = name;
 90 |   }
 91 | 
 92 |   // path
 93 |   get path(): string {
 94 |     return this._props.path;
 95 |   }
 96 |   protected set path(path: string) {
 97 |     this._props.path = path;
 98 |   }
 99 | 
100 |   // stats
101 |   get stats(): IFileStats | undefined {
102 |     return this._props.stats;
103 |   }
104 |   protected set stats(stats: IFileStats | undefined) {
105 |     this._props.stats = stats;
106 |   }
107 | 
108 |   // props
109 |   get props(): IPropsNode {
110 |     return { ...this._props, ...this.secondaryProps };
111 |   }
112 | 
113 |   public async dispose(): Promise<void> {
114 |     this._props = { ...defaultProps };
115 |   }
116 | 
117 |   public async clone(): Promise<NodeBase> {
118 |     return Object.assign(Object.create(this), this);
119 |   }
120 | }
121 | 
```

---------------------------------------------------------------------------


## File: NodeDIrectory.ts
- Path: `/root/git/codewrangler/src/core/entities/NodeDIrectory.ts`
- Size: 2.60 KB
- Extension: .ts
- Lines of code: 84
- Content:

```ts
  1 | import { NodeFile } from "./NodeFile";
  2 | import { NodeBase } from "./NodeBase";
  3 | import { IRenderStrategy } from "../../services/renderer/RenderStrategy";
  4 | import { DocumentFactory } from "../../infrastructure/filesystem/DocumentFactory";
  5 | 
  6 | interface IPropsDirectory {
  7 |   length: number;
  8 |   deepLength: number;
  9 | }
 10 | 
 11 | const defaultPropsDirectory: IPropsDirectory = {
 12 |   length: 0,
 13 |   deepLength: 0,
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
 24 | 
 25 |   private initDirectory(): void {
 26 |     this.children = [];
 27 |     this._propsDirectory = { ...defaultPropsDirectory };
 28 |   }
 29 | 
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
 43 |   public get secondaryProps(): Record<string, unknown> {
 44 |     return {
 45 |       ...this._propsDirectory,
 46 |     };
 47 |   }
 48 | 
 49 |   public async addChild(
 50 |     child: NodeFile | NodeDirectory
 51 |   ): Promise<NodeDirectory> {
 52 |     if (!(child instanceof NodeFile || child instanceof NodeDirectory)) {
 53 |       throw new Error("Invalid child type");
 54 |     }
 55 |     this.children.push(child);
 56 |     return this;
 57 |   }
 58 | 
 59 |   public async bundle(deep: number = 0): Promise<void> {
 60 |     // set the deep of the directory
 61 |     this.deep = deep;
 62 | 
 63 |     // bundle all children
 64 |     await Promise.all(this.children.map((child) => child.bundle(deep + 1)));
 65 | 
 66 |     // set the length of the directory
 67 |     this.length = this.children.filter(
 68 |       (child) => child instanceof NodeFile
 69 |     ).length;
 70 | 
 71 |     // set the deep length of the directory
 72 |     this.deepLength = this.children.reduce(
 73 |       (acc, child) =>
 74 |         acc + (child instanceof NodeDirectory ? child.deepLength + 1 : 1),
 75 |       0
 76 |     );
 77 | 
 78 |     // set the size of the directory
 79 |     this.size = this.children.reduce((acc, child) => acc + child.size, 0);
 80 | 
 81 |     // set stats
 82 |     this.stats = await DocumentFactory.getStats(this.path);
 83 |   }
 84 | 
 85 |   public abstract override render(): void;
 86 | }
 87 | 
 88 | export class RenderableDirectory extends NodeDirectory {
 89 |   constructor(
 90 |     name: string,
 91 |     pathName: string,
 92 |     private renderStrategy: IRenderStrategy[]
 93 |   ) {
 94 |     super(name, pathName);
 95 |   }
 96 | 
 97 |   public render(): void {
 98 |     this.renderStrategy.map((strategy) => strategy.renderDirectory(this));
 99 |   }
100 | }
101 | 
```

---------------------------------------------------------------------------


## File: NodeFile.ts
- Path: `/root/git/codewrangler/src/core/entities/NodeFile.ts`
- Size: 2.17 KB
- Extension: .ts
- Lines of code: 76
- Content:

```ts
 1 | import { DocumentFactory } from "../../infrastructure/filesystem/DocumentFactory";
 2 | import { NodeBase } from "./NodeBase";
 3 | import { IRenderStrategy } from "../../services/renderer/RenderStrategy";
 4 | 
 5 | interface IPropsFile {
 6 |   extension: string;
 7 | }
 8 | 
 9 | const defaultPropsFile: IPropsFile = {
10 |   extension: "",
11 | };
12 | 
13 | export abstract class NodeFile extends NodeBase {
14 |   private _propsFile: IPropsFile = { ...defaultPropsFile };
15 |   private _content: string | null = null;
16 | 
17 |   public constructor(name: string, pathName: string) {
18 |     super(name, pathName);
19 |     this.initFile(name);
20 |   }
21 | 
22 |   private initFile(name: string): void {
23 |     this._propsFile = { ...defaultPropsFile };
24 |     this.extension = DocumentFactory.extension(name);
25 |     this._content = null;
26 |   }
27 | 
28 |   // getters and setters
29 |   // extension
30 |   public get extension(): string {
31 |     return this._propsFile.extension;
32 |   }
33 |   protected set extension(extension: string) {
34 |     this._propsFile.extension = extension;
35 |   }
36 |   // content
37 |   public get content(): string | null {
38 |     return this._content;
39 |   }
40 |   protected set content(content: string | null) {
41 |     this._content = content;
42 |   }
43 |   // secondary props
44 |   public get secondaryProps(): Record<string, unknown> | undefined {
45 |     return {
46 |       extension: this.extension,
47 |     };
48 |   }
49 | 
50 |   // bundle
51 |   public async bundle(deep: number = 0): Promise<void> {
52 |     // set the deep of the file
53 |     this.deep = deep;
54 |     // set the size of the file
55 |     this.size = await DocumentFactory.size(this.path);
56 |     // set the content of the file
57 |     this.content = await DocumentFactory.readFile(this.path);
58 |     // set the stats of the file
59 |     this.stats = await DocumentFactory.getStats(this.path);
60 |   }
61 | 
62 |   // render
63 |   public abstract override render(): void;
64 | }
65 | 
66 | export class RenderableFile extends NodeFile {
67 |   constructor(
68 |     name: string,
69 |     pathName: string,
70 |     private renderStrategy: IRenderStrategy[]
71 |   ) {
72 |     super(name, pathName);
73 |   }
74 | 
75 |   // render
76 |   public render(): void {
77 |     this.renderStrategy.map((strategy) => strategy.renderFile(this));
78 |   }
79 | 
80 |   // dispose
81 |   public override async dispose(): Promise<void> {
82 |     await super.dispose();
83 |     await Promise.all(
84 |       this.renderStrategy.map((strategy) => strategy.dispose())
85 |     );
86 |   }
87 | }
88 | 
```

---------------------------------------------------------------------------


## File: NodeBase.test.ts
- Path: `/root/git/codewrangler/src/core/entities/__tests__/NodeBase.test.ts`
- Size: 3.25 KB
- Extension: .ts
- Lines of code: 109
- Content:

```ts
  1 | import { NodeBase } from "../NodeBase";
  2 | import { DocumentFactory } from "../../../infrastructure/filesystem/DocumentFactory";
  3 | 
  4 | // Mock DocumentFactory
  5 | jest.mock("../../../infrastructure/filesystem/DocumentFactory", () => ({
  6 |   DocumentFactory: {
  7 |     exists: jest.fn(),
  8 |     isAbsolute: jest.fn(),
  9 |     resolve: jest.fn(),
 10 |     extension: jest.fn(),
 11 |     size: jest.fn(),
 12 |     readFile: jest.fn(),
 13 |     getStats: jest.fn(),
 14 |   },
 15 | }));
 16 | 
 17 | class TestNode extends NodeBase {
 18 |   async bundle(): Promise<void> {}
 19 |   render(): void {}
 20 |   get secondaryProps(): Record<string, unknown> | undefined {
 21 |     return {};
 22 |   }
 23 | }
 24 | 
 25 | describe("NodeBase", () => {
 26 |   beforeEach(() => {
 27 |     jest.clearAllMocks();
 28 |     (DocumentFactory.exists as jest.Mock).mockReturnValue(true);
 29 |     (DocumentFactory.isAbsolute as jest.Mock).mockReturnValue(true);
 30 |     (DocumentFactory.resolve as jest.Mock).mockImplementation((path) => path);
 31 |   });
 32 | 
 33 |   describe("constructor", () => {
 34 |     it("should initialize node with correct props", () => {
 35 |       const testNode = new TestNode("test", "/test/path");
 36 |       expect(testNode.name).toBe("test");
 37 |       expect(testNode.path).toBe("/test/path");
 38 |     });
 39 | 
 40 |     it("should throw error for non-existent path", () => {
 41 |       (DocumentFactory.exists as jest.Mock).mockReturnValue(false);
 42 |       expect(() => new TestNode("test", "/invalid/path")).toThrow(
 43 |         "Path does not exist"
 44 |       );
 45 |     });
 46 | 
 47 |     it("should throw error for non-absolute path", () => {
 48 |       (DocumentFactory.isAbsolute as jest.Mock).mockReturnValue(false);
 49 |       expect(() => new TestNode("test", "relative/path")).toThrow(
 50 |         "Path is not absolute"
 51 |       );
 52 |     });
 53 |   });
 54 | 
 55 |   describe("properties", () => {
 56 |     let node: TestNode;
 57 | 
 58 |     beforeEach(() => {
 59 |       node = new TestNode("test", "/test/path");
 60 |     });
 61 | 
 62 |     it("should get and set deep property", () => {
 63 |       node["deep"] = 2;
 64 |       expect(node.deep).toBe(2);
 65 |     });
 66 | 
 67 |     it("should get and set size property", () => {
 68 |       node["size"] = 100;
 69 |       expect(node.size).toBe(100);
 70 |     });
 71 | 
 72 |     it("should get combined props", () => {
 73 |       node["size"] = 100;
 74 |       node["deep"] = 2;
 75 |       expect(node.props).toEqual(
 76 |         expect.objectContaining({
 77 |           name: "test",
 78 |           path: "/test/path",
 79 |           size: 100,
 80 |           deep: 2,
 81 |         })
 82 |       );
 83 |     });
 84 |   });
 85 | 
 86 |   describe("methods", () => {
 87 |     let node: TestNode;
 88 | 
 89 |     beforeEach(() => {
 90 |       node = new TestNode("test", "/test/path");
 91 |     });
 92 | 
 93 |     it("should dispose correctly", async () => {
 94 |       node["size"] = 100;
 95 |       await node.dispose();
 96 |       expect(node.size).toBe(0);
 97 |       expect(node.name).toBe("");
 98 |       expect(node.path).toBe("");
 99 |       expect(node.stats).toEqual(
100 |         expect.objectContaining({
101 |           size: expect.any(Number),
102 |           isDirectory: false,
103 |           isFile: false,
104 |           created: expect.any(Date),
105 |           accessed: expect.any(Date),
106 |           modified: expect.any(Date),
107 |           permissions: {
108 |             executable: false,
109 |             readable: false,
110 |             writable: false,
111 |           },
112 |         })
113 |       );
114 |     });
115 | 
116 |     it("should clone correctly", async () => {
117 |       node["size"] = 100;
118 |       const clone = await node.clone();
119 |       expect(clone.size).toBe(100);
120 |       expect(clone.name).toBe("test");
121 |       expect(clone.path).toBe("/test/path");
122 |     });
123 |   });
124 | });
125 | 
```

---------------------------------------------------------------------------


## File: NodeDIrectory.test.ts
- Path: `/root/git/codewrangler/src/core/entities/__tests__/NodeDIrectory.test.ts`
- Size: 2.08 KB
- Extension: .ts
- Lines of code: 51
- Content:

```ts
 1 | import { NodeDirectory } from "../NodeDIrectory";
 2 | import { NodeFile } from "../NodeFile";
 3 | import { mockPath } from "../../../__mocks__/mockFileSystem";
 4 | 
 5 | class TestDirectory extends NodeDirectory {
 6 |   render(): string {
 7 |     return "render";
 8 |   }
 9 | }
10 | 
11 | class TestFile extends NodeFile {
12 |   public render(): void {}
13 | }
14 | 
15 | describe("Directory", () => {
16 |   let testDirectory: TestDirectory;
17 | 
18 |   beforeEach(() => {
19 |     testDirectory = new TestDirectory("dir", mockPath() + "/dir");
20 |   });
21 | 
22 |   test("constructor initializes name, path, and extension correctly", () => {
23 |     expect(testDirectory.name).toBe("dir");
24 |     expect(testDirectory.path).toBe(mockPath() + "/dir");
25 |     expect(testDirectory.children).toEqual([]);
26 |   });
27 | 
28 |   test("addChild throws error for invalid child type", async () => {
29 |     await expect(testDirectory.addChild({} as NodeFile)).rejects.toThrow(
30 |       "Invalid child type"
31 |     );
32 |   });
33 | 
34 |   test("Check props value before bundle", () => {
35 |     const props = testDirectory.props;
36 |     expect(props).toMatchObject({
37 |       name: "dir",
38 |       path: mockPath() + "/dir",
39 |     });
40 |   });
41 | 
42 |   test("bundle updates directory properties correctly", async () => {
43 |     const mockFile1 = new TestFile("file1.ts", mockPath() + "/file1.ts");
44 |     const mockFile2 = new TestFile("file2.js", mockPath() + "/file2.js");
45 |     const mockSubDir = new TestDirectory("dir", mockPath() + "/dir");
46 |     const mockFile3 = new TestFile("file3.ts", mockPath() + "/dir/file3.ts");
47 |     const mockFile4 = new TestFile("file4.js", mockPath() + "/dir/file4.js");
48 | 
49 |     await testDirectory.addChild(mockFile1);
50 |     await testDirectory.addChild(mockFile2);
51 |     await testDirectory.addChild(mockSubDir);
52 |     await mockSubDir.addChild(mockFile3);
53 |     await mockSubDir.addChild(mockFile4);
54 | 
55 |     await testDirectory.bundle(1);
56 | 
57 |     expect(testDirectory.deep).toEqual(expect.any(Number));
58 |     expect(testDirectory.length).toEqual(expect.any(Number)); // Only direct files
59 |     expect(testDirectory.deepLength).toEqual(expect.any(Number)); // Including subdirectory and its file
60 |     expect(testDirectory.size).toEqual(expect.any(Number)); // Sum of all file sizes
61 |   });
62 | });
63 | 
```

---------------------------------------------------------------------------


## File: NodeFile.test.ts
- Path: `/root/git/codewrangler/src/core/entities/__tests__/NodeFile.test.ts`
- Size: 1.33 KB
- Extension: .ts
- Lines of code: 45
- Content:

```ts
 1 | import { NodeFile } from "../NodeFile";
 2 | import { getContent, mockPath } from "../../../__mocks__/mockFileSystem";
 3 | 
 4 | class TestFile extends NodeFile {
 5 |   public render(): void {
 6 |   }
 7 | }
 8 | 
 9 | describe("NodeFile", () => {
10 |   let testFile: TestFile;
11 |   const testName = "file1.ts";
12 |   const testPath = mockPath() + "/" + testName;
13 | 
14 |   beforeEach(() => {
15 |     testFile = new TestFile(testName, testPath);
16 |   });
17 | 
18 |   test("constructor initializes name, path, and extension correctly", () => {
19 |     expect(testFile.name).toBe(testName);
20 |     expect(testFile.path).toBe(testPath);
21 |     expect(testFile.extension).toBe(".ts");
22 |   });
23 | 
24 |   test("Check props value before bundle", () => {
25 |     const props = testFile.props;
26 |     expect(props).toMatchObject({
27 |       name: testName,
28 |       path: testPath,
29 |       deep: 0,
30 |       size: 0,
31 |       extension: ".ts",
32 |     });
33 |   });
34 | 
35 |   test("Bundle method sets content correctly", async () => {
36 |     await testFile.bundle();
37 |     const content = getContent("root/file1.ts");
38 |     expect(testFile.content).toBe(content);
39 |   });
40 | 
41 |   test("Check props value after bundle", async () => {
42 |     await testFile.bundle();
43 |     const props = testFile.props;
44 |     expect(props).toMatchObject({
45 |       name: expect.any(String),
46 |       path: expect.any(String),
47 |       deep: expect.any(Number),
48 |       size: expect.any(Number),
49 |       extension: expect.any(String),
50 |     });
51 |   });
52 | });
53 | 
```

---------------------------------------------------------------------------


## File: DirectoryNotFoundError.ts
- Path: `/root/git/codewrangler/src/core/errors/DirectoryNotFoundError.ts`
- Size: 228.00 B
- Extension: .ts
- Lines of code: 7
- Content:

```ts
1 | import { DocumentError } from "./DocumentError";
2 | 
3 | export class DirectoryNotFoundError extends DocumentError {
4 |   constructor(path: string) {
5 |     super("Directory not found", path);
6 |     this.name = "DirectoryNotFoundError";
7 |   }
8 | }
9 | 
```

---------------------------------------------------------------------------


## File: DocumentError.ts
- Path: `/root/git/codewrangler/src/core/errors/DocumentError.ts`
- Size: 197.00 B
- Extension: .ts
- Lines of code: 6
- Content:

```ts
1 | export class DocumentError extends Error {
2 |   constructor(message: string, public readonly path: string) {
3 |     super(`Document error at ${path}: ${message}`);
4 |     this.name = "DocumentError";
5 |   }
6 | }
7 | 
```

---------------------------------------------------------------------------


## File: FileNotFoundError.ts
- Path: `/root/git/codewrangler/src/core/errors/FileNotFoundError.ts`
- Size: 213.00 B
- Extension: .ts
- Lines of code: 7
- Content:

```ts
1 | import { DocumentError } from "./DocumentError";
2 | 
3 | export class FileNotFoundError extends DocumentError {
4 |   constructor(path: string) {
5 |     super("File not found", path);
6 |     this.name = "FileNotFoundError";
7 |   }
8 | }
9 | 
```

---------------------------------------------------------------------------


## File: index.ts
- Path: `/root/git/codewrangler/src/core/errors/index.ts`
- Size: 243.00 B
- Extension: .ts
- Lines of code: 4
- Content:

```ts
1 | import { DocumentError } from "./DocumentError";
2 | import { DirectoryNotFoundError } from "./DirectoryNotFoundError";
3 | import { FileNotFoundError } from "./FileNotFoundError";
4 | 
5 | export { DocumentError, DirectoryNotFoundError, FileNotFoundError };
6 | 
```

---------------------------------------------------------------------------


## File: DocumentFactory.ts
- Path: `/root/git/codewrangler/src/infrastructure/filesystem/DocumentFactory.ts`
- Size: 11.38 KB
- Extension: .ts
- Lines of code: 370
- Content:

```ts
  1 | import { ObjectEncodingOptions } from "fs";
  2 | import * as fs from "fs/promises";
  3 | import * as fsSync from "fs";
  4 | import * as path from "path";
  5 | 
  6 | import { DocumentError, FileNotFoundError } from "../../core/errors";
  7 | import {
  8 |   FileType,
  9 |   IDirectoryOptions,
 10 |   IFileStats,
 11 |   IReadOptions,
 12 |   IWriteOptions,
 13 | } from "../../types/type";
 14 | 
 15 | export const DocumentFactory = {
 16 |   VERSION: "1.0.0",
 17 | 
 18 |   /**
 19 |    * Gets the type of a file system entry
 20 |    * @param filePath - The path to check
 21 |    * @returns The type of the file system entry (File or Directory)
 22 |    * @throws {FileNotFoundError} If the path doesn't exist
 23 |    * @throws {DocumentError} For other file system errors
 24 |    */
 25 |   async type(filePath: string): Promise<FileType> {
 26 |     try {
 27 |       const stats = await fs.stat(filePath);
 28 |       return stats.isDirectory() ? FileType.Directory : FileType.File;
 29 |     } catch (error) {
 30 |       if ((error as NodeJS.ErrnoException).code === "ENOENT") {
 31 |         throw new FileNotFoundError(filePath);
 32 |       }
 33 |       throw new DocumentError(String(error), filePath);
 34 |     }
 35 |   },
 36 | 
 37 |   /**
 38 |    * Gets file size in bytes
 39 |    * @param filePath - The path to the file
 40 |    * @returns The size of the file in bytes
 41 |    * @throws {FileNotFoundError} If the file doesn't exist
 42 |    * @throws {DocumentError} For other file system errors or if path is a directory
 43 |    */
 44 |   async size(filePath: string): Promise<number> {
 45 |     const isDirectory = (await this.type(filePath)) === FileType.Directory;
 46 |     if (isDirectory) {
 47 |       throw new DocumentError("Path is a directory", filePath);
 48 |     }
 49 |     const stats = await this.getStats(filePath);
 50 |     return stats.size;
 51 |   },
 52 | 
 53 |   /**
 54 |    * Resolves a path to an absolute path
 55 |    * @param filePath - The path to resolve
 56 |    * @returns The absolute path
 57 |    */
 58 |   resolve(filePath: string): string {
 59 |     return path.resolve(filePath);
 60 |   },
 61 | 
 62 |   /**
 63 |    * Gets detailed file statistics
 64 |    * @param filePath - The path to get stats for
 65 |    * @returns Detailed file statistics including size, dates, and permissions
 66 |    * @throws {FileNotFoundError} If the path doesn't exist
 67 |    * @throws {DocumentError} For other file system errors
 68 |    */
 69 |   async getStats(filePath: string): Promise<IFileStats> {
 70 |     try {
 71 |       const stats = await fs.stat(filePath);
 72 |       const accessFlags = await this.checkAccess(filePath);
 73 | 
 74 |       return {
 75 |         size: stats.size,
 76 |         created: stats.birthtime,
 77 |         modified: stats.mtime,
 78 |         accessed: stats.atime,
 79 |         isDirectory: stats.isDirectory(),
 80 |         isFile: stats.isFile(),
 81 |         permissions: {
 82 |           readable: accessFlags.readable,
 83 |           writable: accessFlags.writable,
 84 |           executable: accessFlags.executable,
 85 |         },
 86 |       };
 87 |     } catch (error) {
 88 |       if ((error as NodeJS.ErrnoException).code === "ENOENT") {
 89 |         throw new FileNotFoundError(filePath);
 90 |       }
 91 |       throw new DocumentError(String(error), filePath);
 92 |     }
 93 |   },
 94 | 
 95 |   /**
 96 |    * Checks various access flags for a path
 97 |    * @private
 98 |    * @param filePath - The path to check access for
 99 |    * @returns An object containing readable, writable, and executable permission flags
100 |    */
101 |   async checkAccess(filePath: string): Promise<{
102 |     readable: boolean;
103 |     writable: boolean;
104 |     executable: boolean;
105 |   }> {
106 |     const check = async (mode: number): Promise<boolean> => {
107 |       try {
108 |         await fs.access(filePath, mode);
109 |         return true;
110 |       } catch {
111 |         return false;
112 |       }
113 |     };
114 | 
115 |     return {
116 |       readable: await check(fs.constants.R_OK),
117 |       writable: await check(fs.constants.W_OK),
118 |       executable: await check(fs.constants.X_OK),
119 |     };
120 |   },
121 | 
122 |   /**
123 |    * Reads the entire contents of a file synchronously
124 |    * @param filePath - The path to the file
125 |    * @param options - The options for the read operation
126 |    * @returns The contents of the file as a string
127 |    * @throws {Error} If the file cannot be read
128 |    */
129 |   readFileSync(filePath: string, options: IReadOptions = {}): string {
130 |     return fsSync.readFileSync(filePath, {
131 |       encoding: options.encoding ?? "utf-8",
132 |       flag: options.flag,
133 |     });
134 |   },
135 | 
136 |   async readJsonSync(filePath: string): Promise<object> {
137 |     try {
138 |       // Resolve the absolute path
139 |       const absolutePath = this.resolve(filePath);
140 | 
141 |       // Check if file exists first
142 |       if (!this.exists(absolutePath)) {
143 |         throw new Error(`File not found: ${absolutePath}`);
144 |       }
145 | 
146 |       const fileContents = await fs.readFile(absolutePath, "utf-8");
147 |       if (!fileContents) {
148 |         throw new Error(`File is empty: ${absolutePath}`);
149 |       }
150 | 
151 |       try {
152 |         return JSON.parse(fileContents);
153 |       } catch (parseError) {
154 |         throw new Error(
155 |           `Invalid JSON in file ${absolutePath}: ${String(parseError)}`
156 |         );
157 |       }
158 |     } catch (error) {
159 |       throw new DocumentError(String(error), filePath);
160 |     }
161 |   },
162 | 
163 |   /**
164 |    * Reads the entire contents of a file
165 |    * @param filePath - The path to the file
166 |    * @param options - The options for the read operation
167 |    * @returns The contents of the file as a string
168 |    * @throws {FileNotFoundError} If the file doesn't exist
169 |    * @throws {DocumentError} For other file system errors
170 |    */
171 |   async readFile(
172 |     filePath: string,
173 |     options: IReadOptions = {}
174 |   ): Promise<string> {
175 |     try {
176 |       return await fs.readFile(filePath, {
177 |         encoding: options.encoding ?? "utf-8",
178 |         flag: options.flag,
179 |       });
180 |     } catch (error) {
181 |       if ((error as NodeJS.ErrnoException).code === "ENOENT") {
182 |         throw new FileNotFoundError(filePath);
183 |       }
184 |       throw new DocumentError(String(error), filePath);
185 |     }
186 |   },
187 | 
188 |   /**
189 |    * Writes data to a file, replacing the file if it already exists
190 |    * @param filePath - The path to the file
191 |    * @param data - The data to write
192 |    * @param options - The options for the write operation
193 |    * @throws {DocumentError} For file system errors
194 |    */
195 |   async writeFile(
196 |     filePath: string,
197 |     data: string | Buffer,
198 |     options: IWriteOptions = {}
199 |   ): Promise<void> {
200 |     try {
201 |       await fs.writeFile(filePath, data, {
202 |         encoding: options.encoding ?? "utf-8",
203 |         mode: options.mode,
204 |         flag: options.flag,
205 |       });
206 |     } catch (error) {
207 |       throw new DocumentError(String(error), filePath);
208 |     }
209 |   },
210 | 
211 |   /**
212 |    * Appends data to a file
213 |    * @param filePath - The path to the file
214 |    * @param content - The content to append
215 |    * @param options - The options for the write operation
216 |    * @throws {DocumentError} For file system errors
217 |    */
218 |   async appendFile(
219 |     filePath: string,
220 |     content: string,
221 |     options: IWriteOptions = {}
222 |   ): Promise<void> {
223 |     try {
224 |       await fs.appendFile(filePath, content, {
225 |         encoding: options.encoding ?? "utf-8",
226 |         mode: options.mode,
227 |         flag: options.flag,
228 |       });
229 |     } catch (error) {
230 |       throw new DocumentError(String(error), filePath);
231 |     }
232 |   },
233 | 
234 |   /**
235 |    * Reads the contents of a directory
236 |    * @param dirPath - The path to the directory
237 |    * @param options - The options for the read operation
238 |    * @returns An array of file and directory names in the directory
239 |    * @throws {Error} If the directory cannot be read
240 |    */
241 |   async readDir(
242 |     dirPath: string,
243 |     options?: { withFileTypes?: boolean }
244 |   ): Promise<string[]> {
245 |     return await fs.readdir(dirPath, options as ObjectEncodingOptions);
246 |   },
247 | 
248 |   /**
249 |    * Creates a directory if it doesn't exist
250 |    * @param dirPath - The path where to create the directory
251 |    * @param recursive - Whether to create parent directories if they don't exist
252 |    * @throws {DocumentError} For file system errors
253 |    */
254 |   async createDir(dirPath: string, recursive = true): Promise<void> {
255 |     await fs.mkdir(dirPath, { recursive });
256 |   },
257 | 
258 |   /**
259 |    * Gets the base name of a file
260 |    * @param filePath - The path to the file
261 |    * @returns The base name of the file (last portion of the path)
262 |    */
263 |   baseName(filePath: string): string {
264 |     return path.basename(filePath);
265 |   },
266 | 
267 |   /**
268 |    * Gets the extension of a file
269 |    * @param filePath - The path to the file
270 |    * @returns The extension of the file including the dot (e.g., '.txt')
271 |    */
272 |   extension(filePath: string): string {
273 |     return path.extname(filePath);
274 |   },
275 | 
276 |   /**
277 |    * Checks if a file or directory exists
278 |    * @param filePath - The path to check
279 |    * @returns True if the file or directory exists, false otherwise
280 |    */
281 |   exists(filePath: string): boolean {
282 |     try {
283 |       fsSync.accessSync(filePath);
284 |       return true;
285 |     } catch {
286 |       return false;
287 |     }
288 |   },
289 | 
290 |   /**
291 |    * Checks if a path is absolute
292 |    * @param filePath - The path to check
293 |    * @returns True if the path is absolute, false otherwise
294 |    */
295 |   isAbsolute(filePath: string): boolean {
296 |     return path.isAbsolute(filePath);
297 |   },
298 | 
299 |   /**
300 |    * Gets directory contents with type information
301 |    * @param dirPath - The path to the directory
302 |    * @returns An array of objects containing name and type information for each entry
303 |    * @throws {DocumentError} If path is not a directory or other errors occur
304 |    */
305 |   async readDirectory(
306 |     dirPath: string
307 |   ): Promise<Array<{ name: string; type: FileType }>> {
308 |     try {
309 |       const entries = await fs.readdir(dirPath, { withFileTypes: true });
310 |       return entries.map((entry) => ({
311 |         name: entry.name,
312 |         type: entry.isDirectory() ? FileType.Directory : FileType.File,
313 |       }));
314 |     } catch (error) {
315 |       throw new DocumentError(String(error), dirPath);
316 |     }
317 |   },
318 | 
319 |   /**
320 |    * Creates a directory if it doesn't exist
321 |    * @param dirPath - The path where to create the directory
322 |    * @param options - Options for directory creation including recursive and mode
323 |    * @throws {DocumentError} For file system errors
324 |    */
325 |   async ensureDirectory(
326 |     dirPath: string,
327 |     options: IDirectoryOptions = {}
328 |   ): Promise<void> {
329 |     try {
330 |       if (!this.exists(dirPath)) {
331 |         await fs.mkdir(dirPath, {
332 |           recursive: options.recursive ?? true,
333 |           mode: options.mode,
334 |         });
335 |       }
336 |     } catch (error) {
337 |       throw new DocumentError(String(error), dirPath);
338 |     }
339 |   },
340 | 
341 |   /**
342 |    * Removes a file or directory
343 |    * @param filePath - The path to remove
344 |    * @throws {DocumentError} For file system errors
345 |    */
346 |   async remove(filePath: string): Promise<void> {
347 |     const stats = await fs.stat(filePath);
348 |     if (stats.isDirectory()) {
349 |       await fs.rm(filePath, { recursive: true, force: true });
350 |     } else {
351 |       await fs.unlink(filePath);
352 |     }
353 |   },
354 | 
355 |   /**
356 |    * Copies a file or directory
357 |    * @param src - The source path
358 |    * @param dest - The destination path
359 |    * @throws {DocumentError} For file system errors
360 |    */
361 |   async copy(src: string, dest: string): Promise<void> {
362 |     const stats = await fs.stat(src);
363 | 
364 |     if (stats.isDirectory()) {
365 |       await this.copyDir(src, dest);
366 |     } else {
367 |       await fs.copyFile(src, dest);
368 |     }
369 |   },
370 | 
371 |   /**
372 |    * Copies a directory recursively
373 |    * @private
374 |    * @param src - The source directory path
375 |    * @param dest - The destination directory path
376 |    * @throws {DocumentError} For file system errors
377 |    */
378 |   async copyDir(src: string, dest: string): Promise<void> {
379 |     await this.ensureDirectory(dest);
380 |     const entries = await fs.readdir(src, { withFileTypes: true });
381 | 
382 |     for (const entry of entries) {
383 |       const srcPath = path.join(src, entry.name);
384 |       const destPath = path.join(dest, entry.name);
385 | 
386 |       if (entry.isDirectory()) {
387 |         await this.copyDir(srcPath, destPath);
388 |       } else {
389 |         await fs.copyFile(srcPath, destPath);
390 |       }
391 |     }
392 |   },
393 | 
394 |   /**
395 |    * Joins an array of paths into a single path
396 |    * @param paths - The paths to join
397 |    * @returns The joined path
398 |    */
399 |   join(...paths: string[]): string {
400 |     return path.join(...paths);
401 |   },
402 | };
403 | 
```

---------------------------------------------------------------------------


## File: DocumentFactory.test.ts
- Path: `/root/git/codewrangler/src/infrastructure/filesystem/__tests__/DocumentFactory.test.ts`
- Size: 17.79 KB
- Extension: .ts
- Lines of code: 456
- Content:

```ts
  1 | import * as path from "path";
  2 | import * as fs from "fs/promises";
  3 | 
  4 | import { MOCK_PATH } from "../../../__mocks__/mockFileSystem";
  5 | import { DocumentFactory } from "../DocumentFactory";
  6 | import { FileType } from "../../../types/type";
  7 | 
  8 | describe("DocumentFactory", () => {
  9 |   const tempDir = path.join(MOCK_PATH, "temp_test");
 10 |   const testFilePath = path.join(tempDir, "test.txt");
 11 |   const testContent = "test content";
 12 | 
 13 |   beforeEach(() => {
 14 |     jest.clearAllMocks();
 15 |   });
 16 | 
 17 |   describe("type", () => {
 18 |     it('should return "file" for a file path', async () => {
 19 |       const result = await DocumentFactory.type(
 20 |         path.join(MOCK_PATH, "file1.ts")
 21 |       );
 22 |       expect(result).toBe(FileType.File);
 23 |     });
 24 | 
 25 |     it('should return "directory" for a directory path', async () => {
 26 |       const result = await DocumentFactory.type(MOCK_PATH);
 27 |       expect(result).toBe(FileType.Directory);
 28 |     });
 29 | 
 30 |     it("should throw an error if the path doesn't exist", async () => {
 31 |       await expect(DocumentFactory.type("nonexistent")).rejects.toThrow(
 32 |         "Document error at nonexistent: File not found"
 33 |       );
 34 |     });
 35 | 
 36 |     it("should throw an error if the path is a file", async () => {
 37 |       await expect(
 38 |         DocumentFactory.type(path.join(MOCK_PATH, "file2.ts"))
 39 |       ).rejects.toThrow(
 40 |         `Document error at ${path.join(MOCK_PATH, "file2.ts")}: File not found`
 41 |       );
 42 |     });
 43 |   });
 44 | 
 45 |   describe("size", () => {
 46 |     it("should return the size of a file", async () => {
 47 |       const result = await DocumentFactory.size(
 48 |         path.join(MOCK_PATH, "file1.ts")
 49 |       );
 50 |       expect(result).toStrictEqual(expect.any(Number));
 51 |     });
 52 | 
 53 |     it("should throw an error if the path doesn't exist", async () => {
 54 |       await expect(DocumentFactory.size("nonexistent")).rejects.toThrow(
 55 |         "Document error at nonexistent: File not found"
 56 |       );
 57 |     });
 58 | 
 59 |     it("should throw an error if the path is a directory", async () => {
 60 |       await expect(DocumentFactory.size(MOCK_PATH)).rejects.toThrow(
 61 |         `Document error at ${MOCK_PATH}: Path is a directory`
 62 |       );
 63 |     });
 64 | 
 65 |     it("should throw a zero size if the file is empty", async () => {
 66 |       const result = await DocumentFactory.size(
 67 |         path.join(MOCK_PATH, "empty.txt")
 68 |       );
 69 |       expect(result).toBe(0);
 70 |     });
 71 |   });
 72 |   describe("getStats", () => {
 73 |     it("should return complete file statistics", async () => {
 74 |       const stats = await DocumentFactory.getStats(
 75 |         path.join(MOCK_PATH, "file1.ts")
 76 |       );
 77 |       expect(stats).toMatchObject({
 78 |         size: expect.any(Number),
 79 |         created: expect.any(Object),
 80 |         modified: expect.any(Object),
 81 |         accessed: expect.any(Object),
 82 |         isDirectory: false,
 83 |         isFile: true,
 84 |         permissions: {
 85 |           readable: true,
 86 |           writable: expect.any(Boolean),
 87 |           executable: expect.any(Boolean),
 88 |         },
 89 |       });
 90 |     });
 91 | 
 92 |     it("should return directory statistics", async () => {
 93 |       const stats = await DocumentFactory.getStats(MOCK_PATH);
 94 |       expect(stats).toMatchObject({
 95 |         size: expect.any(Number),
 96 |         isDirectory: true,
 97 |         isFile: false,
 98 |       });
 99 |     });
100 | 
101 |     it("should throw error for non-existent path", async () => {
102 |       await expect(DocumentFactory.getStats("nonexistent")).rejects.toThrow(
103 |         "Document error at nonexistent: File not found"
104 |       );
105 |     });
106 |   });
107 | 
108 |   describe("readFile", () => {
109 |     it("should read file content iwth default options", async () => {
110 |       const content = await DocumentFactory.readFile(
111 |         path.join(MOCK_PATH, "file1.ts")
112 |       );
113 |       expect(content).toBeDefined();
114 |       expect(content).toBeTruthy();
115 |       expect(typeof content).toBe("string");
116 |     });
117 | 
118 |     it("should read file with custom escoding", async () => {
119 |       const content = await DocumentFactory.readFile(
120 |         path.join(MOCK_PATH, "file1.ts"),
121 |         { encoding: "utf-8" }
122 |       );
123 |       expect(content).toBeDefined();
124 |       expect(content).toBeTruthy();
125 |       expect(typeof content).toBe("string");
126 |     });
127 | 
128 |     it("should throw an error if the path doesn't exist", async () => {
129 |       await expect(DocumentFactory.readFile("nonexistent")).rejects.toThrow(
130 |         "Document error at nonexistent: File not found"
131 |       );
132 |     });
133 | 
134 |     it("should throw an error if the path is a directory", async () => {
135 |       await expect(DocumentFactory.readFile(MOCK_PATH)).rejects.toThrow(
136 |         `Document error at ${MOCK_PATH}: Error: EISDIR: illegal operation on a directory, read`
137 |       );
138 |     });
139 |   });
140 | 
141 |   describe("readDirectory", () => {
142 |     it("should return directory contents with type information", async () => {
143 |       const contents = await DocumentFactory.readDirectory(MOCK_PATH);
144 |       expect(Array.isArray(contents)).toBe(true);
145 |       expect(contents.length).toBeGreaterThan(0);
146 |       contents.forEach((item) => {
147 |         expect(item).toMatchObject({
148 |           name: expect.any(String),
149 |           type: expect.stringMatching(/^(file|directory)$/),
150 |         });
151 |       });
152 |     });
153 | 
154 |     it("should throw error for non-existent directory", async () => {
155 |       await expect(
156 |         DocumentFactory.readDirectory("nonexistent")
157 |       ).rejects.toThrow();
158 |     });
159 | 
160 |     it("should throw error when trying to read a file as directory", async () => {
161 |       await expect(
162 |         DocumentFactory.readDirectory(path.join(MOCK_PATH, "file1.ts"))
163 |       ).rejects.toThrow();
164 |     });
165 |   });
166 | 
167 |   describe("exists", () => {
168 |     it("should return true for existing file", () => {
169 |       const exists = DocumentFactory.exists(path.join(MOCK_PATH, "file1.ts"));
170 |       expect(exists).toBe(true);
171 |     });
172 | 
173 |     it("should return true for existing directory", () => {
174 |       const exists = DocumentFactory.exists(MOCK_PATH);
175 |       expect(exists).toBe(true);
176 |     });
177 | 
178 |     it("should return false for non-existent path", () => {
179 |       const exists = DocumentFactory.exists("nonexistent");
180 |       expect(exists).toBe(false);
181 |     });
182 |   });
183 | 
184 |   describe("remove", () => {
185 |     const tempDir = path.join(MOCK_PATH, "temp_remove");
186 | 
187 |     beforeEach(async () => {
188 |       // Create temp directory and test files
189 |       await fs.mkdir(tempDir, { recursive: true });
190 |       await fs.writeFile(path.join(tempDir, "test.txt"), "test content");
191 |     });
192 | 
193 |     afterEach(async () => {
194 |       // Cleanup
195 |       if (await DocumentFactory.exists(tempDir)) {
196 |         await fs.rm(tempDir, { recursive: true });
197 |       }
198 |     });
199 | 
200 |     it("should remove a file", async () => {
201 |       const filePath = path.join(tempDir, "test.txt");
202 |       await DocumentFactory.remove(filePath);
203 |       expect(await DocumentFactory.exists(filePath)).toBe(false);
204 |     });
205 | 
206 |     it("should remove a directory recursively", async () => {
207 |       await DocumentFactory.remove(tempDir);
208 |       expect(await DocumentFactory.exists(tempDir)).toBe(false);
209 |     });
210 | 
211 |     it("should throw error when path doesn't exist", async () => {
212 |       await expect(
213 |         DocumentFactory.remove(path.join(tempDir, "nonexistent"))
214 |       ).rejects.toThrow();
215 |     });
216 |   });
217 | 
218 |   describe("isAbsolute", () => {
219 |     it("should return true for absolute path", () => {
220 |       expect(DocumentFactory.isAbsolute(MOCK_PATH)).toBe(true);
221 |     });
222 | 
223 |     it("should return false for relative path", () => {
224 |       expect(DocumentFactory.isAbsolute(path.join("file1.ts"))).toBe(false);
225 |     });
226 | 
227 |     it("should return false for non-existent path", () => {
228 |       expect(DocumentFactory.isAbsolute("nonexistent")).toBe(false);
229 |     });
230 |   });
231 | 
232 |   describe("extension", () => {
233 |     it("should return extension for file", () => {
234 |       expect(DocumentFactory.extension("file1.ts")).toBe(".ts");
235 |     });
236 | 
237 |     it("should return empty string for directory", () => {
238 |       expect(DocumentFactory.extension("directory")).toBe("");
239 |     });
240 | 
241 |     it("should return empty string for non-existent file", () => {
242 |       expect(DocumentFactory.extension("nonexistent")).toBe("");
243 |     });
244 | 
245 |     it("should return extension for file without two . characters", () => {
246 |       expect(DocumentFactory.extension("file1.test.ts")).toBe(".ts");
247 |     });
248 |   });
249 | 
250 |   describe("copy", () => {
251 |     const tempDir = path.join(MOCK_PATH, "temp_copy");
252 | 
253 |     beforeEach(async () => {
254 |       await fs.mkdir(tempDir, { recursive: true });
255 |     });
256 | 
257 |     afterEach(async () => {
258 |       await fs.rm(tempDir, { recursive: true });
259 |     });
260 | 
261 |     it("should copy a file", async () => {
262 |       await DocumentFactory.copy(
263 |         path.join(MOCK_PATH, "file1.ts"),
264 |         path.join(tempDir, "file1.ts")
265 |       );
266 |       expect(await DocumentFactory.exists(path.join(tempDir, "file1.ts"))).toBe(
267 |         true
268 |       );
269 |     });
270 |   });
271 | 
272 |   describe("readFileSync", () => {
273 |     const testFilePath = path.join(MOCK_PATH, "temp_test", "test.txt");
274 |     beforeEach(async () => {
275 |       await fs.mkdir(path.join(MOCK_PATH, "temp_test"), { recursive: true });
276 |       await fs.writeFile(testFilePath, testContent);
277 |     });
278 | 
279 |     afterEach(async () => {
280 |       await fs.rm(path.join(MOCK_PATH, "temp_test"), { recursive: true });
281 |     });
282 | 
283 |     it("should read file content synchronously with default options", () => {
284 |       const content = DocumentFactory.readFileSync(testFilePath);
285 |       expect(content).toBe(testContent);
286 |     });
287 | 
288 |     it("should read file with custom encoding", () => {
289 |       const content = DocumentFactory.readFileSync(testFilePath, {
290 |         encoding: "utf8",
291 |       });
292 |       expect(content).toBe(testContent);
293 |     });
294 | 
295 |     it("should throw error for non-existent file", () => {
296 |       expect(() => DocumentFactory.readFileSync("nonexistent")).toThrow();
297 |     });
298 | 
299 |     it("should throw error when reading directory", () => {
300 |       expect(() => DocumentFactory.readFileSync(tempDir)).toThrow();
301 |     });
302 |   });
303 | 
304 |   describe("writeFile", () => {
305 |     const tempDir = path.join(MOCK_PATH, "temp_write");
306 |     const testFilePath = path.join(tempDir, "test.txt");
307 |     beforeEach(async () => {
308 |       await fs.mkdir(tempDir, { recursive: true });
309 |       await fs.writeFile(testFilePath, testContent);
310 |     });
311 | 
312 |     afterEach(async () => {
313 |       await fs.rm(tempDir, { recursive: true });
314 |     });
315 | 
316 |     it("should write content to file with default options", async () => {
317 |       const newContent = "new content";
318 |       const newFile = path.join(tempDir, "new.txt");
319 | 
320 |       await DocumentFactory.writeFile(newFile, newContent);
321 |       const content = await fs.readFile(newFile, "utf8");
322 |       expect(content).toBe(newContent);
323 |     });
324 | 
325 |     it("should write content with custom encoding", async () => {
326 |       const newContent = "новый контент"; // non-ASCII content
327 |       const newFile = path.join(tempDir, "encoded.txt");
328 | 
329 |       await DocumentFactory.writeFile(newFile, newContent, {
330 |         encoding: "utf8",
331 |       });
332 |       const content = await fs.readFile(newFile, "utf8");
333 |       expect(content).toBe(newContent);
334 |     });
335 | 
336 |     it("should overwrite existing file", async () => {
337 |       const newContent = "overwritten content";
338 |       await DocumentFactory.writeFile(testFilePath, newContent);
339 |       const content = await fs.readFile(testFilePath, "utf8");
340 |       expect(content).toBe(newContent);
341 |     });
342 | 
343 |     it("should throw error when writing to a directory", async () => {
344 |       await expect(
345 |         DocumentFactory.writeFile(tempDir, "content")
346 |       ).rejects.toThrow();
347 |     });
348 |   });
349 | 
350 |   describe("appendFile", () => {
351 |     const tempDir = path.join(MOCK_PATH, "temp_append");
352 |     const testFilePath = path.join(tempDir, "test.txt");
353 |     beforeEach(async () => {
354 |       await fs.mkdir(tempDir, { recursive: true });
355 |       await fs.writeFile(testFilePath, testContent);
356 |     });
357 | 
358 |     afterEach(async () => {
359 |       await fs.rm(tempDir, { recursive: true });
360 |     });
361 | 
362 |     it("should append content to existing file", async () => {
363 |       const appendContent = " additional content";
364 |       await DocumentFactory.appendFile(testFilePath, appendContent);
365 |       const content = await fs.readFile(testFilePath, "utf8");
366 |       expect(content).toBe(testContent + appendContent);
367 |     });
368 | 
369 |     it("should create new file if it doesn't exist", async () => {
370 |       const newFile = path.join(tempDir, "append.txt");
371 |       await DocumentFactory.appendFile(newFile, testContent);
372 |       const content = await fs.readFile(newFile, "utf8");
373 |       expect(content).toBe(testContent);
374 |     });
375 | 
376 |     it("should throw error when appending to a directory", async () => {
377 |       await expect(
378 |         DocumentFactory.appendFile(tempDir, "content")
379 |       ).rejects.toThrow();
380 |     });
381 |   });
382 | 
383 |   describe("readDir", () => {
384 |     const tempDir = path.join(MOCK_PATH, "temp_readdir");
385 |     beforeEach(async () => {
386 |       await fs.mkdir(tempDir, { recursive: true });
387 |       await fs.writeFile(path.join(tempDir, "file1.txt"), "content1");
388 |       await fs.writeFile(path.join(tempDir, "file2.txt"), "content2");
389 |       await fs.mkdir(path.join(tempDir, "subdir"));
390 |     });
391 | 
392 |     afterEach(async () => {
393 |       await fs.rm(tempDir, { recursive: true });
394 |     });
395 | 
396 |     it("should list directory contents", async () => {
397 |       const contents = await DocumentFactory.readDir(tempDir);
398 |       expect(contents).toHaveLength(3); // test.txt, file1.txt, file2.txt, subdir
399 |       expect(contents).toContain("file1.txt");
400 |       expect(contents).toContain("file2.txt");
401 |       expect(contents).toContain("subdir");
402 |     });
403 | 
404 |     it("should support withFileTypes option", async () => {
405 |       const contents = await DocumentFactory.readDir(tempDir, {
406 |         withFileTypes: true,
407 |       });
408 |       expect(contents).toHaveLength(3);
409 |     });
410 | 
411 |     it("should throw error for non-existent directory", async () => {
412 |       await expect(DocumentFactory.readDir("nonexistent")).rejects.toThrow();
413 |     });
414 | 
415 |     it("should throw error when reading a file as directory", async () => {
416 |       await expect(DocumentFactory.readDir(testFilePath)).rejects.toThrow();
417 |     });
418 |   });
419 | 
420 |   describe("createDir", () => {
421 |     const testFilePath = path.join(MOCK_PATH, "temp_test", "test.txt");
422 |     beforeEach(async () => {
423 |       await fs.mkdir(path.join(MOCK_PATH, "temp_test"), { recursive: true });
424 |       await fs.writeFile(testFilePath, testContent);
425 |     });
426 | 
427 |     afterEach(async () => {
428 |       await fs.rm(path.join(MOCK_PATH, "temp_test"), { recursive: true });
429 |     });
430 | 
431 |     it("should create new directory", async () => {
432 |       const newDir = path.join(tempDir, "newdir");
433 |       await DocumentFactory.createDir(newDir);
434 |       expect(await DocumentFactory.exists(newDir)).toBe(true);
435 |     });
436 | 
437 |     it("should create nested directories with recursive option", async () => {
438 |       const nestedDir = path.join(tempDir, "nested/deep/dir");
439 |       await DocumentFactory.createDir(nestedDir, true);
440 |       expect(await DocumentFactory.exists(nestedDir)).toBe(true);
441 |     });
442 | 
443 |     it("should throw error when creating directory with existing file path", async () => {
444 |       await expect(DocumentFactory.createDir(testFilePath)).rejects.toThrow();
445 |     });
446 |   });
447 | 
448 |   describe("ensureDirectory", () => {
449 |     it("should create directory if it doesn't exist", async () => {
450 |       const newDir = path.join(tempDir, "ensure");
451 |       await DocumentFactory.ensureDirectory(newDir);
452 |       expect(await DocumentFactory.exists(newDir)).toBe(true);
453 |     });
454 | 
455 |     it("should not throw error if directory already exists", async () => {
456 |       await expect(
457 |         DocumentFactory.ensureDirectory(tempDir)
458 |       ).resolves.not.toThrow();
459 |     });
460 | 
461 |     it("should respect custom mode option", async () => {
462 |       const newDir = path.join(tempDir, "mode-test");
463 |       await DocumentFactory.ensureDirectory(newDir, { mode: 0o755 });
464 |       const stats = await fs.stat(newDir);
465 |       expect(stats.mode & 0o777).toBe(0o755);
466 |     });
467 |   });
468 | 
469 |   describe("baseName", () => {
470 |     it("should return file name from path", () => {
471 |       expect(DocumentFactory.baseName("/path/to/file.txt")).toBe("file.txt");
472 |     });
473 | 
474 |     it("should return directory name from path", () => {
475 |       expect(DocumentFactory.baseName("/path/to/dir/")).toBe("dir");
476 |     });
477 | 
478 |     it("should handle paths with multiple extensions", () => {
479 |       expect(DocumentFactory.baseName("/path/file.test.ts")).toBe(
480 |         "file.test.ts"
481 |       );
482 |     });
483 |   });
484 | 
485 |   describe("join", () => {
486 |     it("should join path segments", () => {
487 |       const joined = DocumentFactory.join("path", "to", "file.txt");
488 |       expect(joined).toBe(path.join("path", "to", "file.txt"));
489 |     });
490 | 
491 |     it("should handle absolute paths", () => {
492 |       const joined = DocumentFactory.join("/root", "path", "file.txt");
493 |       expect(joined).toBe(path.join("/root", "path", "file.txt"));
494 |     });
495 | 
496 |     it("should normalize path separators", () => {
497 |       const joined = DocumentFactory.join("path/to", "file.txt");
498 |       expect(joined).toBe(path.join("path/to", "file.txt"));
499 |     });
500 |   });
501 | 
502 |   // Additional edge cases for existing methods
503 |   describe("edge cases", () => {
504 |     const tempDir = path.join(MOCK_PATH, "temp_edge");
505 |     const testFilePath = path.join(tempDir, "test.txt");
506 |     const symlink = path.join(tempDir, "symlink");
507 | 
508 |     beforeEach(async () => {
509 |       await fs.mkdir(tempDir, { recursive: true });
510 |       // Create the test file before creating the symlink
511 |       await fs.writeFile(testFilePath, "test content");
512 |     });
513 | 
514 |     afterEach(async () => {
515 |       await fs.rm(tempDir, { recursive: true });
516 |     });
517 | 
518 |     it("should handle symlinks when copying", async () => {
519 |       await fs.symlink(testFilePath, symlink); // Create the symlink after the file exists
520 |       const copyPath = path.join(tempDir, "copied-symlink");
521 |       await DocumentFactory.copy(symlink, copyPath);
522 |       expect(await DocumentFactory.exists(copyPath)).toBe(true);
523 |     });
524 | 
525 |     it("should handle empty directory copying", async () => {
526 |       const emptyDir = path.join(tempDir, "empty");
527 |       await fs.mkdir(emptyDir);
528 |       const copyPath = path.join(tempDir, "copied-empty");
529 |       await DocumentFactory.copy(emptyDir, copyPath);
530 |       expect(await DocumentFactory.exists(copyPath)).toBe(true);
531 |     });
532 | 
533 |     it("should handle files with special characters", async () => {
534 |       const specialFile = path.join(tempDir, "special$#@!.txt");
535 |       await fs.writeFile(specialFile, "content");
536 |       expect(await DocumentFactory.exists(specialFile)).toBe(true);
537 |       const stats = await DocumentFactory.getStats(specialFile);
538 |       expect(stats.isFile).toBe(true);
539 |     });
540 |   });
541 | });
542 | 
```

---------------------------------------------------------------------------


## File: TemplateEngine.ts
- Path: `/root/git/codewrangler/src/infrastructure/templates/TemplateEngine.ts`
- Size: 2.60 KB
- Extension: .ts
- Lines of code: 83
- Content:

```ts
 1 | import { ZodObject, z } from "zod";
 2 | import { TemplateType } from "../../types/template";
 3 | 
 4 | import { DocumentFactory } from "../filesystem/DocumentFactory";
 5 | 
 6 | type TemplateValue = z.ZodType<string | number | boolean>;
 7 | 
 8 | export class Template<
 9 |   T extends Record<string, TemplateValue> = Record<string, TemplateValue>
10 | > {
11 |   private _content: string = "";
12 | 
13 |   public constructor(
14 |     private type: TemplateType,
15 |     private schema: ZodObject<T>
16 |   ) {}
17 | 
18 |   public async load(
19 |     path: string,
20 |     additionalFields?: Record<string, z.ZodSchema<string>>
21 |   ): Promise<void> {
22 |     this._content = await DocumentFactory.readFile(path);
23 |     if (additionalFields) {
24 |       this.schema = this.schema.extend(additionalFields) as ZodObject<T>;
25 |     }
26 |     this.validate();
27 |   }
28 | 
29 |   public get content(): string {
30 |     if (!this._content) {
31 |       throw new Error(`Template content is not loaded for ${this.type}`);
32 |     }
33 |     return this._content;
34 |   }
35 | 
36 |   private validate(): void {
37 |     const tokens = this.getTemplateTokens();
38 |     const requiredFields = Object.keys(this.schema.shape);
39 |     const missingRequired = requiredFields.filter(
40 |       (field) => !tokens.includes(field)
41 |     );
42 | 
43 |     if (missingRequired.length > 0) {
44 |       throw new Error(
45 |         `Missing required tokens in ${
46 |           this.type
47 |         } template: ${missingRequired.join(", ")}`
48 |       );
49 |     }
50 |   }
51 | 
52 |   public static async create<T extends Record<string, TemplateValue>>(
53 |     type: TemplateType,
54 |     schema: ZodObject<T>,
55 |     path: string,
56 |     additionalFields?: Record<string, z.ZodSchema<string>>
57 |   ): Promise<Template<T>> {
58 |     const template = new Template(type, schema);
59 |     await template.load(path, additionalFields);
60 |     return template;
61 |   }
62 | 
63 |   private getTemplateTokens(): string[] {
64 |     const tokenRegex = /\{\{(\w+)\}\}/g;
65 |     const tokens: string[] = [];
66 |     let match;
67 | 
68 |     while ((match = tokenRegex.exec(this.content)) !== null) {
69 |       const token = match[1];
70 |       if (token === undefined) {
71 |         throw new Error(`Invalid template content for ${this.type}`);
72 |       }
73 |       tokens.push(token);
74 |     }
75 | 
76 |     return tokens;
77 |   }
78 | 
79 |   public render(values: Record<string, string | number | boolean>): string {
80 |     try {
81 |       this.schema.parse(values);
82 |       return this.content.replace(/\{\{(\w+)\}\}/g, (_, key) =>
83 |         values[key] !== undefined ? String(values[key]) : `{{${key}}}`
84 |       );
85 |     } catch (error) {
86 |       if (error instanceof z.ZodError) {
87 |         throw new Error(
88 |           `Template content validation failed for ${this.type}: ${error.errors
89 |             .map((e) => `${e.path.join(".")}: ${e.message}`)
90 |             .join(", ")}`
91 |         );
92 |       }
93 |       throw error;
94 |     }
95 |   }
96 | }
97 | 
```

---------------------------------------------------------------------------


## File: TemplateEngine.test.ts
- Path: `/root/git/codewrangler/src/infrastructure/templates/__tests__/TemplateEngine.test.ts`
- Size: 0.00 B
- Extension: .ts
- Lines of code: 0
- Content:

```ts
1 | 
```

---------------------------------------------------------------------------


## File: zod.ts
- Path: `/root/git/codewrangler/src/infrastructure/templates/zod.ts`
- Size: 987.00 B
- Extension: .ts
- Lines of code: 28
- Content:

```ts
 1 | import { z } from "zod";
 2 | 
 3 | export const BaseTemplateSchema = z.object({
 4 |   PROJECT_NAME: z.string(),
 5 |   GENERATION_DATE: z.string().datetime(),
 6 |   DIRECTORY_STRUCTURE: z.string(),
 7 |   TOTAL_FILES: z.number(),
 8 |   TOTAL_DIRECTORIES: z.number(),
 9 |   TOTAL_SIZE: z.number(),
10 |   CONTENT: z.string(),
11 | });
12 | 
13 | export type BaseTemplate = z.infer<typeof BaseTemplateSchema>;
14 | export type BaseTemplateString = keyof BaseTemplate;
15 | 
16 | export const FileTemplateSchema = z.object({
17 |   FILE_NAME: z.string(),
18 |   FILE_EXTENSION: z.string(),
19 |   FILE_SIZE: z.number(),
20 |   FILE_CONTENTS: z.string(),
21 | });
22 | 
23 | export type FileTemplate = z.infer<typeof FileTemplateSchema>;
24 | export type FileTemplateString = keyof FileTemplate;
25 | 
26 | export const DirectoryTemplateSchema = z.object({
27 |   DIRECTORY_NAME: z.string(),
28 |   DIRECTORY_PATH: z.string(),
29 |   DIRECTORY_SIZE: z.number(),
30 |   CONTENT: z.string(),
31 | });
32 | 
33 | export type DirectoryTemplate = z.infer<typeof DirectoryTemplateSchema>;
34 | export type DirectoryTemplateString = keyof DirectoryTemplate;
35 | 
```

---------------------------------------------------------------------------


## File: DocumentTreeBuilder.ts
- Path: `/root/git/codewrangler/src/services/builder/DocumentTreeBuilder.ts`
- Size: 1.73 KB
- Extension: .ts
- Lines of code: 48
- Content:

```ts
 1 | import { FileTreeBuilder, IFileTreeNode } from "./FileTreeBuilder";
 2 | import { RenderableDirectory } from "../../core/entities/NodeDIrectory";
 3 | import { RenderableFile } from "../../core/entities/NodeFile";
 4 | import { IRenderStrategy } from "../renderer/RenderStrategy";
 5 | import { Config } from "../../utils/config";
 6 | import { logger } from "../../utils/logger";
 7 | import { FileType } from "../../types/type";
 8 | 
 9 | export class DocumentTreeBuilder {
10 |   private root: RenderableDirectory | RenderableFile | undefined;
11 |   private builder: FileTreeBuilder;
12 |   constructor(config: Config, private renderStrategy: IRenderStrategy[]) {
13 |     this.builder = new FileTreeBuilder(config);
14 |   }
15 | 
16 |   async build(): Promise<void> {
17 |     try {
18 |       // Build file tree structure
19 |       const fileTree = await this.builder.build();
20 | 
21 |       // Convert file tree to Document tree
22 |       this.root = await this.createDocumentStructure(fileTree);
23 | 
24 |       // Initialize the entire document tree
25 |       await this.root.bundle();
26 |     } catch (error) {
27 |       logger.error("Error building document tree", error as Error);
28 |       throw error;
29 |     }
30 |   }
31 | 
32 |   private async createDocumentStructure(
33 |     node: IFileTreeNode
34 |   ): Promise<RenderableDirectory | RenderableFile> {
35 |     if (node.type === FileType.Directory) {
36 |       const directory = new RenderableDirectory(
37 |         node.name,
38 |         node.path,
39 |         this.renderStrategy
40 |       );
41 | 
42 |       if (node.children) {
43 |         // Recursively create children
44 |         for (const child of node.children) {
45 |           const childDocument = await this.createDocumentStructure(child);
46 |           await directory.addChild(childDocument);
47 |         }
48 |       }
49 | 
50 |       return directory;
51 |     } else {
52 |       return new RenderableFile(node.name, node.path, this.renderStrategy);
53 |     }
54 |   }
55 | }
56 | 
```

---------------------------------------------------------------------------


## File: FileHidden.ts
- Path: `/root/git/codewrangler/src/services/builder/FileHidden.ts`
- Size: 889.00 B
- Extension: .ts
- Lines of code: 25
- Content:

```ts
 1 | import { Config } from "../../utils/config";
 2 | import { minimatch } from "minimatch";
 3 | 
 4 | export default class FileHidden {
 5 |   private ignoreHiddenFiles: boolean;
 6 |   private patterns: string[];
 7 |   private additionalIgnoreFiles: string[];
 8 | 
 9 |   constructor(config: Config) {
10 |     this.ignoreHiddenFiles = config.get("ignoreHiddenFiles") as boolean;
11 |     this.patterns = [...config.get("excludePatterns")];
12 |     this.additionalIgnoreFiles = config.get("additionalIgnoreFiles");
13 |   }
14 | 
15 |   public shouldExclude(fileName: string): boolean {
16 |     if (this.ignoreHiddenFiles && fileName.startsWith(".")) {
17 |       return true;
18 |     }
19 | 
20 |     if (this.patterns.some((pattern) => minimatch(fileName, pattern))) {
21 |       return true;
22 |     }
23 | 
24 |     if (this.additionalIgnoreFiles.some((file) => minimatch(fileName, file))) {
25 |       // Additional ignore files are always excluded
26 |       return true;
27 |     }
28 | 
29 |     return false;
30 |   }
31 | }
32 | 
```

---------------------------------------------------------------------------


## File: FileTreeBuilder.ts
- Path: `/root/git/codewrangler/src/services/builder/FileTreeBuilder.ts`
- Size: 2.60 KB
- Extension: .ts
- Lines of code: 86
- Content:

```ts
  1 | import { Config, ConfigOptions } from "../../utils/config";
  2 | import { DocumentFactory } from "../../infrastructure/filesystem/DocumentFactory";
  3 | import { FileType } from "../../types/type";
  4 | import FileHidden from "./FileHidden";
  5 | 
  6 | export interface IFileTreeNode {
  7 |   name: string;
  8 |   path: string;
  9 |   type: FileType;
 10 |   children?: IFileTreeNode[];
 11 | }
 12 | 
 13 | export interface IFileTreeBuilderOptions
 14 |   extends Pick<
 15 |     ConfigOptions,
 16 |     | "additionalIgnoreFiles"
 17 |     | "maxDepth"
 18 |     | "excludePatterns"
 19 |     | "dir"
 20 |     | "followSymlinks"
 21 |   > {
 22 |   pattern: RegExp;
 23 |   returnType: "paths" | "details";
 24 | }
 25 | 
 26 | export class FileTreeBuilder {
 27 |   private config: Config;
 28 |   private options: IFileTreeBuilderOptions;
 29 |   private fileHidden: FileHidden;
 30 | 
 31 |   constructor(config: Config) {
 32 |     this.config = config;
 33 |     this.options = this.initializeOptions();
 34 |     this.fileHidden = new FileHidden(config);
 35 |   }
 36 | 
 37 |   private initializeOptions(): IFileTreeBuilderOptions {
 38 |     return {
 39 |       dir: this.config.get("dir"),
 40 |       pattern: new RegExp(this.config.get("pattern")),
 41 |       maxDepth: this.config.get("maxDepth"),
 42 |       excludePatterns: this.config.get("excludePatterns"),
 43 |       additionalIgnoreFiles: this.config.get("additionalIgnoreFiles"),
 44 |       returnType: "details",
 45 |       followSymlinks: false,
 46 |     };
 47 |   }
 48 |   public async build(): Promise<IFileTreeNode> {
 49 |     const rootDir = this.options.dir;
 50 |     if (!DocumentFactory.exists(rootDir)) {
 51 |       throw new Error(`Directory ${rootDir} does not exist`);
 52 |     }
 53 |     return await this.buildTree(rootDir);
 54 |   }
 55 | 
 56 |   private async buildTree(
 57 |     nodePath: string,
 58 |     depth: number = 0
 59 |   ): Promise<IFileTreeNode> {
 60 |     const stats = await DocumentFactory.getStats(nodePath);
 61 |     const name = DocumentFactory.baseName(nodePath);
 62 | 
 63 |     const node: IFileTreeNode = {
 64 |       name,
 65 |       path: nodePath,
 66 |       type: stats.isDirectory ? FileType.Directory : FileType.File,
 67 |     };
 68 | 
 69 |     if (stats.isDirectory) {
 70 |       // Check depth limit
 71 |       if (
 72 |         this.options.maxDepth !== undefined &&
 73 |         depth >= this.options.maxDepth
 74 |       ) {
 75 |         return node;
 76 |       }
 77 | 
 78 |       // Read directory entries
 79 |       const entries = await DocumentFactory.readDir(nodePath);
 80 |       const children: IFileTreeNode[] = [];
 81 | 
 82 |       for (const entry of entries) {
 83 |         const childPath = DocumentFactory.join(nodePath, entry);
 84 | 
 85 |         // Skip if should be excluded
 86 |         if (this.fileHidden.shouldExclude(entry)) {
 87 |           continue;
 88 |         }
 89 | 
 90 |         // Recursively build tree for child
 91 |         const childNode = await this.buildTree(childPath, depth + 1);
 92 |         children.push(childNode);
 93 |       }
 94 | 
 95 |       node.children = children;
 96 |     }
 97 | 
 98 |     return node;
 99 |   }
100 | }
101 | 
```

---------------------------------------------------------------------------


## File: DocumentTreeBuild.test.ts
- Path: `/root/git/codewrangler/src/services/builder/__tests__/DocumentTreeBuild.test.ts`
- Size: 0.00 B
- Extension: .ts
- Lines of code: 0
- Content:

```ts
1 | 
```

---------------------------------------------------------------------------


## File: FileHidden.test.ts
- Path: `/root/git/codewrangler/src/services/builder/__tests__/FileHidden.test.ts`
- Size: 5.09 KB
- Extension: .ts
- Lines of code: 132
- Content:

```ts
  1 | import { Config } from "../../../utils/config";
  2 | import FileHidden from "../FileHidden";
  3 | 
  4 | jest.mock("../../../utils/config", () => ({
  5 |   Config: {
  6 |     load: jest.fn(),
  7 |   },
  8 | }));
  9 | 
 10 | describe("FileHidden", () => {
 11 |   let mockConfig: jest.Mocked<Config>;
 12 |   let fileHidden: FileHidden;
 13 | 
 14 |   beforeEach(() => {
 15 |     mockConfig = {
 16 |       get: jest.fn(),
 17 |     } as unknown as jest.Mocked<Config>;
 18 | 
 19 |     // Set default mock values
 20 |     mockConfig.get.mockImplementation((key: string) => {
 21 |       switch (key) {
 22 |         case "ignoreHiddenFiles":
 23 |           return true;
 24 |         case "excludePatterns":
 25 |           return ["node_modules/**", "**/*.test.ts", "dist/**"];
 26 |         case "additionalIgnoreFiles":
 27 |           return [];
 28 |         default:
 29 |           return undefined;
 30 |       }
 31 |     });
 32 | 
 33 |     fileHidden = new FileHidden(mockConfig);
 34 |   });
 35 | 
 36 |   describe("shouldExclude", () => {
 37 |     describe("hidden files handling", () => {
 38 |       it("should exclude hidden files when ignoredHiddenFiles is true", () => {
 39 |         expect(fileHidden.shouldExclude(".hidden")).toBe(true);
 40 |         expect(fileHidden.shouldExclude(".git")).toBe(true);
 41 |         expect(fileHidden.shouldExclude(".vscode")).toBe(true);
 42 |       });
 43 | 
 44 |       it("should not exclude hidden files when ignoreHiddenFiles is false", () => {
 45 |         mockConfig.get.mockImplementation((key: string) =>
 46 |           key === "ignoreHiddenFiles" ? false : []
 47 |         );
 48 |         fileHidden = new FileHidden(mockConfig);
 49 | 
 50 |         expect(fileHidden.shouldExclude(".hidden")).toBe(false);
 51 |         expect(fileHidden.shouldExclude(".git")).toBe(false);
 52 |         expect(fileHidden.shouldExclude(".vscode")).toBe(false);
 53 |       });
 54 |     });
 55 | 
 56 |     describe("exclude patterns handling", () => {
 57 |       it("should exclude files matching exclude patterns", () => {
 58 |         expect(fileHidden.shouldExclude("node_modules/package/file.ts")).toBe(
 59 |           true
 60 |         );
 61 |         expect(fileHidden.shouldExclude("src/file.test.ts")).toBe(true);
 62 |         expect(fileHidden.shouldExclude("dist/file.js")).toBe(true);
 63 |       });
 64 | 
 65 |       it("should not exclude files not matching exclude patterns", () => {
 66 |         expect(fileHidden.shouldExclude("src/component.ts")).toBe(false);
 67 |         expect(fileHidden.shouldExclude("package.json")).toBe(false);
 68 |         expect(fileHidden.shouldExclude("README.md")).toBe(false);
 69 |       });
 70 | 
 71 |       it("should handle empty exclude patterns", () => {
 72 |         mockConfig.get.mockImplementation((key: string) =>
 73 |           key === "excludePatterns" ? [] : []
 74 |         );
 75 |         fileHidden = new FileHidden(mockConfig);
 76 | 
 77 |         expect(fileHidden.shouldExclude("node_modules/package/index.js")).toBe(
 78 |           false
 79 |         );
 80 |         expect(fileHidden.shouldExclude("src/component.test.ts")).toBe(false);
 81 |       });
 82 |     });
 83 | 
 84 |     describe("additional ignore files handling", () => {
 85 |       it("should exclude files matching additional ignore patterns", () => {
 86 |         mockConfig.get.mockImplementation((key: string) => {
 87 |           switch (key) {
 88 |             case "additionalIgnoreFiles":
 89 |               return ["*.log", "temp/**"];
 90 |             default:
 91 |               return [];
 92 |           }
 93 |         });
 94 |         fileHidden = new FileHidden(mockConfig);
 95 | 
 96 |         expect(fileHidden.shouldExclude("error.log")).toBe(true);
 97 |         expect(fileHidden.shouldExclude("temp/cache.json")).toBe(true);
 98 |       });
 99 | 
100 |       it("should not exclude files not matching additional ignore patterns", () => {
101 |         mockConfig.get.mockImplementation((key: string) => {
102 |           switch (key) {
103 |             case "additionalIgnoreFiles":
104 |               return ["*.log", "temp/**"];
105 |             default:
106 |               return [];
107 |           }
108 |         });
109 |         fileHidden = new FileHidden(mockConfig);
110 | 
111 |         expect(fileHidden.shouldExclude("src/index.ts")).toBe(false);
112 |         expect(fileHidden.shouldExclude("data/cache.json")).toBe(false);
113 |       });
114 |     });
115 | 
116 |     describe("combined patterns handling", () => {
117 |       beforeEach(() => {
118 |         mockConfig.get.mockImplementation((key: string) => {
119 |           switch (key) {
120 |             case "ignoreHiddenFiles":
121 |               return true;
122 |             case "excludePatterns":
123 |               return ["*.test.ts", "dist/**"];
124 |             case "additionalIgnoreFiles":
125 |               return ["*.log", "temp/**"];
126 |             default:
127 |               return undefined;
128 |           }
129 |         });
130 |         fileHidden = new FileHidden(mockConfig);
131 |       });
132 | 
133 |       it("should exclude files matching any exclusion rule", () => {
134 |         // Hidden files
135 |         expect(fileHidden.shouldExclude(".env")).toBe(true);
136 |         // Exclude patterns
137 |         expect(fileHidden.shouldExclude("component.test.ts")).toBe(true);
138 |         expect(fileHidden.shouldExclude("dist/bundle.js")).toBe(true);
139 |         // Additional ignore files
140 |         expect(fileHidden.shouldExclude("error.log")).toBe(true);
141 |         expect(fileHidden.shouldExclude("temp/file.txt")).toBe(true);
142 |       });
143 | 
144 |       it("should not exclude files not matching any exclusion rule", () => {
145 |         expect(fileHidden.shouldExclude("src/index.ts")).toBe(false);
146 |         expect(fileHidden.shouldExclude("package.json")).toBe(false);
147 |         expect(fileHidden.shouldExclude("docs/README.md")).toBe(false);
148 |       });
149 |     });
150 |   });
151 | });
152 | 
```

---------------------------------------------------------------------------


## File: FileTreeBuilder.test.ts
- Path: `/root/git/codewrangler/src/services/builder/__tests__/FileTreeBuilder.test.ts`
- Size: 0.00 B
- Extension: .ts
- Lines of code: 0
- Content:

```ts
1 | 
```

---------------------------------------------------------------------------


## File: RenderStrategy.ts
- Path: `/root/git/codewrangler/src/services/renderer/RenderStrategy.ts`
- Size: 4.37 KB
- Extension: .ts
- Lines of code: 134
- Content:

```ts
  1 | import { NodeFile } from "../../core/entities/NodeFile";
  2 | import { NodeDirectory } from "../../core/entities/NodeDIrectory";
  3 | import { Config, OutputFormatExtension } from "../../utils/config";
  4 | import { DocumentFactory } from "../../infrastructure/filesystem/DocumentFactory";
  5 | import { Template } from "../../infrastructure/templates/TemplateEngine";
  6 | import {
  7 |   BaseTemplate,
  8 |   BaseTemplateSchema,
  9 |   DirectoryTemplate,
 10 |   DirectoryTemplateSchema,
 11 |   FileTemplate,
 12 |   FileTemplateSchema,
 13 | } from "../../infrastructure/templates/zod";
 14 | import { TemplateType } from "../../types/template";
 15 | 
 16 | interface IContentRenderer {
 17 |   renderFile(file: NodeFile): string;
 18 |   renderDirectory(directory: NodeDirectory): string;
 19 | }
 20 | 
 21 | interface ITemplateLoader {
 22 |   loadTemplates(): Promise<void>;
 23 | }
 24 | 
 25 | interface IDocumentRenderer {
 26 |   render(rootDirectory: NodeDirectory): Promise<string>;
 27 |   dispose(): Promise<void>;
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
 45 |       directory: null,
 46 |     };
 47 |     this.extension = extension;
 48 |   }
 49 | 
 50 |   async loadTemplates(): Promise<void> {
 51 |     const templateDir = DocumentFactory.join(
 52 |       this.config.get("rootDir") as string,
 53 |       this.config.get("templatesDir") as string
 54 |     );
 55 |     // check if the templates directory exists
 56 |     if (!DocumentFactory.exists(templateDir)) {
 57 |       throw new Error(`Templates directory not found: ${templateDir}`);
 58 |     }
 59 | 
 60 |     this.templates = {
 61 |       page: await Template.create(
 62 |         "page",
 63 |         BaseTemplateSchema,
 64 |         DocumentFactory.join(templateDir, `page.${this.extension}`)
 65 |       ),
 66 |       file: await Template.create(
 67 |         "file",
 68 |         FileTemplateSchema,
 69 |         DocumentFactory.join(templateDir, `file.${this.extension}`)
 70 |       ),
 71 |       directory: await Template.create(
 72 |         "directory",
 73 |         DirectoryTemplateSchema,
 74 |         DocumentFactory.join(templateDir, `directory.${this.extension}`)
 75 |       ),
 76 |     };
 77 |   }
 78 | 
 79 |   public renderFile(file: NodeFile): string {
 80 |     if (!this.templates.file) {
 81 |       throw new Error("File template is not loaded");
 82 |     }
 83 |     return this.replaceSelectors(this.templates.file.content, {
 84 |       FILE_NAME: file.name,
 85 |       FILE_EXTENSION: file.extension,
 86 |       FILE_SIZE: file.size,
 87 |       FILE_CONTENTS: file.content || "",
 88 |     });
 89 |   }
 90 | 
 91 |   public renderDirectory(directory: NodeDirectory): string {
 92 |     const content = directory.children
 93 |       .map(
 94 |         (child) =>
 95 |           child instanceof NodeFile
 96 |             ? this.renderFile(child)
 97 |             : this.renderDirectory(child) // save the rendering result on the object after bundling execution
 98 |       )
 99 |       .join("");
100 |     if (!this.templates.directory) {
101 |       throw new Error("Directory template is not loaded");
102 |     }
103 |     return this.replaceSelectors(this.templates.directory.content, {
104 |       DIRECTORY_NAME: directory.name,
105 |       DIRECTORY_PATH: directory.path,
106 |       DIRECTORY_SIZE: directory.size,
107 |       CONTENT: content,
108 |     });
109 |   }
110 | 
111 |   protected replaceSelectors(
112 |     template: string,
113 |     values: BaseTemplate | FileTemplate | DirectoryTemplate
114 |   ): string {
115 |     return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
116 |       const typedKey = key as keyof typeof values;
117 |       return values[typedKey] !== undefined
118 |         ? String(values[typedKey])
119 |         : `{{${key}}}`;
120 |     });
121 |   }
122 | 
123 |   public async render(rootDirectory: NodeDirectory): Promise<string> {
124 |     const directoryContent = this.renderDirectory(rootDirectory);
125 |     if (!this.templates.page) {
126 |       throw new Error("Page template is not loaded");
127 |     }
128 |     return this.replaceSelectors(this.templates.page.content, {
129 |       PROJECT_NAME:
130 |         this.config.get("projectName") || rootDirectory.name || "Project",
131 |       GENERATION_DATE: new Date().toLocaleDateString(),
132 |       DIRECTORY_STRUCTURE: directoryContent,
133 |       TOTAL_FILES: rootDirectory.length,
134 |       TOTAL_DIRECTORIES: rootDirectory.deepLength,
135 |       TOTAL_SIZE: rootDirectory.size,
136 |       CONTENT: directoryContent,
137 |     });
138 |   }
139 | 
140 |   public async dispose(): Promise<void> {
141 |     this.templates = {
142 |       page: null,
143 |       file: null,
144 |       directory: null,
145 |     };
146 |   }
147 | }
148 | 
```

---------------------------------------------------------------------------


## File: HTMLStrategy.test.ts
- Path: `/root/git/codewrangler/src/services/renderer/__tests__/HTMLStrategy.test.ts`
- Size: 0.00 B
- Extension: .ts
- Lines of code: 0
- Content:

```ts
1 | 
```

---------------------------------------------------------------------------


## File: MarkdownStrategy.test.ts
- Path: `/root/git/codewrangler/src/services/renderer/__tests__/MarkdownStrategy.test.ts`
- Size: 0.00 B
- Extension: .ts
- Lines of code: 0
- Content:

```ts
1 | 
```

---------------------------------------------------------------------------


## File: RenderStrategy.test.ts
- Path: `/root/git/codewrangler/src/services/renderer/__tests__/RenderStrategy.test.ts`
- Size: 0.00 B
- Extension: .ts
- Lines of code: 0
- Content:

```ts
1 | 
```

---------------------------------------------------------------------------


## File: HTMLStrategy.ts
- Path: `/root/git/codewrangler/src/services/renderer/strategies/HTMLStrategy.ts`
- Size: 958.00 B
- Extension: .ts
- Lines of code: 26
- Content:

```ts
 1 | import { BaseRenderStrategy } from "../RenderStrategy";
 2 | import { Config } from "../../../utils/config";
 3 | import { NodeFile } from "../../../core/entities/NodeFile";
 4 | import { OUTPUT_FORMATS } from "../../../utils/config/schema";
 5 | 
 6 | export class HTMLRenderStrategy extends BaseRenderStrategy {
 7 |   constructor(config: Config) {
 8 |     super(config, OUTPUT_FORMATS.html);
 9 |   }
10 | 
11 |   protected processCodeBlock(content: string, language: string): string {
12 |     return `<pre><code class="language-${language}">${this.escapeHtml(
13 |       content
14 |     )}</code></pre>`;
15 |   }
16 | 
17 |   private escapeHtml(content: string): string {
18 |     return content
19 |       .replace(/&/g, "&amp;")
20 |       .replace(/</g, "&lt;")
21 |       .replace(/>/g, "&gt;")
22 |       .replace(/"/g, "&quot;")
23 |       .replace(/'/g, "&#039;");
24 |   }
25 | 
26 |   public override renderFile(file: NodeFile): string {
27 |     const rendered = super.renderFile(file);
28 |     return this.processCodeBlock(rendered, file.extension.replace(".", ""));
29 |   }
30 | }
31 | 
```

---------------------------------------------------------------------------


## File: MarkdownStrategy.ts
- Path: `/root/git/codewrangler/src/services/renderer/strategies/MarkdownStrategy.ts`
- Size: 682.00 B
- Extension: .ts
- Lines of code: 16
- Content:

```ts
 1 | import { BaseRenderStrategy } from "../RenderStrategy";
 2 | import { Config } from "../../../utils/config";
 3 | import { OUTPUT_FORMATS } from "../../../utils/config/schema";
 4 | import { NodeFile } from "../../../core/entities/NodeFile";
 5 | 
 6 | export class MarkdownStrategy extends BaseRenderStrategy {
 7 |   constructor(config: Config) {
 8 |     super(config, OUTPUT_FORMATS.markdown);
 9 |   }
10 | 
11 |   protected processCodeBlock(content: string, language: string): string {
12 |     return `\`\`\`${language}\n${content}\n\`\`\``;
13 |   }
14 | 
15 |   public override renderFile(file: NodeFile): string {
16 |     const rendered = super.renderFile(file);
17 |     return this.processCodeBlock(rendered, file.extension.replace(".", ""));
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
- Size: 869.00 B
- Extension: .ts
- Lines of code: 43
- Content:

```ts
 1 | export const FileType = {
 2 |   File: "file",
 3 |   Directory: "directory",
 4 | } as const;
 5 | 
 6 | export type FileType = (typeof FileType)[keyof typeof FileType];
 7 | 
 8 | export interface IFileStats {
 9 |   size: number;
10 |   created: Date;
11 |   modified: Date;
12 |   accessed: Date;
13 |   isDirectory: boolean;
14 |   isFile: boolean;
15 |   permissions: {
16 |     readable: boolean;
17 |     writable: boolean;
18 |     executable: boolean;
19 |   };
20 | }
21 | 
22 | export interface IReadOptions {
23 |   encoding?: BufferEncoding;
24 |   flag?: string;
25 | }
26 | 
27 | export interface IWriteOptions extends IReadOptions {
28 |   mode?: number;
29 |   flag?: string;
30 | }
31 | 
32 | export interface IDirectoryOptions {
33 |   recursive?: boolean;
34 |   mode?: number;
35 | }
36 | 
37 | export interface IFileTreeItem {
38 |   path: string;
39 |   type: FileType;
40 |   stats?: IFileStats;
41 | }
42 | 
43 | export interface IPropsNode {
44 |   name: string;
45 |   path: string;
46 |   deep: number;
47 |   size: number;
48 |   extension?: string;
49 |   stats?: IFileStats;
50 | }
51 | 
```

---------------------------------------------------------------------------


## File: Config.ts
- Path: `/root/git/codewrangler/src/utils/config/Config.ts`
- Size: 2.86 KB
- Extension: .ts
- Lines of code: 99
- Content:

```ts
  1 | import { z } from "zod";
  2 | import { logger } from "../logger/Logger";
  3 | import { DocumentFactory } from "../../infrastructure/filesystem/DocumentFactory";
  4 | import {
  5 |   ConfigKeys,
  6 |   ConfigOptions,
  7 |   ConfigSchema,
  8 |   DEFAULT_CONFIG,
  9 | } from "./schema";
 10 | 
 11 | export class Config {
 12 |   private static instance: Config | undefined;
 13 |   private config: ConfigOptions;
 14 | 
 15 |   private constructor() {
 16 |     this.config = ConfigSchema.parse(DEFAULT_CONFIG);
 17 |   }
 18 | 
 19 |   public static async load(): Promise<Config> {
 20 |     if (!Config.instance) {
 21 |       Config.instance = new Config();
 22 |       await Config.instance.initialize();
 23 |     }
 24 |     return Config.instance;
 25 |   }
 26 |   private async initialize(): Promise<Config> {
 27 |     try {
 28 |       const currentDirConfig = DocumentFactory.join(
 29 |         process.cwd(),
 30 |         this.config.codeConfigFile
 31 |       );
 32 | 
 33 |       if (DocumentFactory.exists(currentDirConfig)) {
 34 |         const fileContent = await DocumentFactory.readFile(currentDirConfig);
 35 | 
 36 |         if (!fileContent.trim()) {
 37 |           throw new Error(`Configuration file is empty: ${currentDirConfig}`);
 38 |         }
 39 | 
 40 |         let userConfig;
 41 |         try {
 42 |           userConfig = JSON.parse(fileContent);
 43 |         } catch {
 44 |           throw new Error(
 45 |             `Invalid JSON in configuration file: ${currentDirConfig}`
 46 |           );
 47 |         }
 48 | 
 49 |         // Validate and merge configurations
 50 |         const validatedConfig = ConfigSchema.parse({
 51 |           ...this.config,
 52 |           ...userConfig,
 53 |         });
 54 | 
 55 |         this.config = validatedConfig;
 56 |       }
 57 |     } catch (error) {
 58 |       if (error instanceof z.ZodError) {
 59 |         const details = error.errors
 60 |           .map((err) => `${err.path.join(".")}: ${err.message}`)
 61 |           .join(", ");
 62 |         throw new Error(`Configuration validation failed: ${details}`);
 63 |       }
 64 |       throw error;
 65 |     }
 66 |     return this;
 67 |   }
 68 | 
 69 |   public get<T extends ConfigKeys>(key: T): ConfigOptions[T] {
 70 |     return this.config[key] as ConfigOptions[T];
 71 |   }
 72 | 
 73 |   public set(
 74 |     key: keyof ConfigOptions,
 75 |     value: ConfigOptions[keyof ConfigOptions]
 76 |   ): void {
 77 |     const updatedConfig = { ...this.config, [key]: value };
 78 |     try {
 79 |       ConfigSchema.parse(updatedConfig);
 80 |       this.config = updatedConfig;
 81 |     } catch (error) {
 82 |       if (error instanceof z.ZodError) {
 83 |         logger.error(`Invalid configuration value: ${error.errors}`);
 84 |       }
 85 |       throw error;
 86 |     }
 87 |   }
 88 |   public getAll(): ConfigOptions {
 89 |     return this.config;
 90 |   }
 91 |   public reset(): void {
 92 |     this.config = DEFAULT_CONFIG;
 93 |   }
 94 |   public static destroy(): void {
 95 |     Config.instance = undefined;
 96 |   }
 97 |   public override(config: Partial<ConfigOptions>): void {
 98 |     const newOverrideConfig = { ...this.config, ...config };
 99 |     try {
100 |       ConfigSchema.parse(newOverrideConfig);
101 |       this.config = newOverrideConfig;
102 |     } catch (error) {
103 |       if (error instanceof z.ZodError) {
104 |         logger.error(`Invalid configuration value: ${error.errors}`);
105 |       }
106 |       throw error;
107 |     }
108 |   }
109 | }
110 | 
```

---------------------------------------------------------------------------


## File: Config.test.ts
- Path: `/root/git/codewrangler/src/utils/config/__tests__/Config.test.ts`
- Size: 5.12 KB
- Extension: .ts
- Lines of code: 137
- Content:

```ts
  1 | import { DocumentFactory } from "../../../infrastructure/filesystem/DocumentFactory";
  2 | import { Config } from "../Config";
  3 | import { DEFAULT_CONFIG } from "../schema";
  4 | import { logger } from "../../logger/Logger";
  5 | 
  6 | jest.mock("../../../infrastructure/filesystem/DocumentFactory");
  7 | jest.mock("../../logger/Logger", () => ({
  8 |   logger: {
  9 |     error: jest.fn(),
 10 |   },
 11 |   LOG_VALUES: ["ERROR", "WARN", "INFO", "DEBUG"],
 12 | }));
 13 | 
 14 | describe("Config", () => {
 15 |   let config: Config;
 16 | 
 17 |   beforeEach(async () => {
 18 |     // Reset mocks
 19 |     jest.resetAllMocks();
 20 |     (DocumentFactory.exists as jest.Mock).mockReturnValue(false);
 21 |     (DocumentFactory.readFile as jest.Mock).mockResolvedValue(
 22 |       JSON.stringify(DEFAULT_CONFIG)
 23 |     );
 24 |     (DocumentFactory.join as jest.Mock).mockImplementation((...args) =>
 25 |       args.join("/")
 26 |     );
 27 | 
 28 |     // Destroy singleton instance before each test
 29 |     Config.destroy();
 30 |     config = await Config.load();
 31 |   });
 32 | 
 33 |   afterEach(() => {
 34 |     Config.destroy();
 35 |   });
 36 | 
 37 |   describe("Singleton Management", () => {
 38 |     it("load returns the same instance", async () => {
 39 |       const instance1 = await Config.load();
 40 |       const instance2 = await Config.load();
 41 |       expect(instance1).toBe(instance2);
 42 |     });
 43 | 
 44 |     it("destroy removes the singleton instance", async () => {
 45 |       const instance1 = await Config.load();
 46 |       Config.destroy();
 47 |       const instance2 = await Config.load();
 48 |       expect(instance1).not.toBe(instance2);
 49 |     });
 50 | 
 51 |     it("reset restores default configuration", async () => {
 52 |       config.set("outputFile", "custom-output");
 53 |       config.reset();
 54 |       expect(config.getAll()).toEqual(DEFAULT_CONFIG);
 55 |     });
 56 |   });
 57 | 
 58 |   describe("Configuration Loading", () => {
 59 |     it("loads default config when no config file exists", async () => {
 60 |       (DocumentFactory.exists as jest.Mock).mockReturnValue(false);
 61 |       Config.destroy();
 62 |       const newConfig = await Config.load();
 63 |       expect(newConfig.getAll()).toEqual(DEFAULT_CONFIG);
 64 |     });
 65 | 
 66 |     it("loads and merges custom config when file exists", async () => {
 67 |       const customConfig = {
 68 |         outputFile: "custom-output",
 69 |         logLevel: "DEBUG" as const,
 70 |       };
 71 | 
 72 |       (DocumentFactory.exists as jest.Mock).mockReturnValue(true);
 73 |       (DocumentFactory.readFile as jest.Mock).mockResolvedValue(
 74 |         JSON.stringify(customConfig)
 75 |       );
 76 | 
 77 |       Config.destroy();
 78 |       const newConfig = await Config.load();
 79 | 
 80 |       expect(newConfig.get("outputFile")).toBe(customConfig.outputFile);
 81 |       expect(newConfig.get("logLevel")).toBe(customConfig.logLevel);
 82 |     });
 83 | 
 84 |     it("throws error when config file is empty", async () => {
 85 |       (DocumentFactory.exists as jest.Mock).mockReturnValue(true);
 86 |       (DocumentFactory.readFile as jest.Mock).mockResolvedValue("  ");
 87 | 
 88 |       Config.destroy();
 89 |       await expect(Config.load()).rejects.toThrow(
 90 |         "Configuration file is empty"
 91 |       );
 92 |     });
 93 | 
 94 |     it("throws error when config file contains invalid JSON", async () => {
 95 |       (DocumentFactory.exists as jest.Mock).mockReturnValue(true);
 96 |       (DocumentFactory.readFile as jest.Mock).mockResolvedValue("invalid json");
 97 | 
 98 |       Config.destroy();
 99 |       await expect(Config.load()).rejects.toThrow(
100 |         "Invalid JSON in configuration file"
101 |       );
102 |     });
103 |   });
104 | 
105 |   describe("Configuration Operations", () => {
106 |     describe("get", () => {
107 |       it("returns correct values after initialization", async () => {
108 |         expect(config.get("dir")).toBe(DEFAULT_CONFIG.dir);
109 |         expect(config.get("pattern")).toBe(DEFAULT_CONFIG.pattern);
110 |         expect(config.get("outputFile")).toBe(DEFAULT_CONFIG.outputFile);
111 |       });
112 |     });
113 | 
114 |     describe("set", () => {
115 |       it("updates single value successfully", () => {
116 |         config.set("outputFile", "new-output");
117 |         expect(config.get("outputFile")).toBe("new-output");
118 |       });
119 | 
120 |       it("maintains other values when setting one value", () => {
121 |         const originalConfig = config.getAll();
122 |         config.set("outputFile", "new-output");
123 |         expect(config.get("pattern")).toBe(originalConfig.pattern);
124 |       });
125 | 
126 |       it("throws error for invalid values", () => {
127 |         expect(() => {
128 |           config.set("maxFileSize", -1);
129 |         }).toThrow();
130 |         expect(logger.error).toHaveBeenCalled();
131 |       });
132 |     });
133 | 
134 |     describe("override", () => {
135 |       it("successfully overrides multiple values", () => {
136 |         const overrides = {
137 |           outputFile: "custom-output",
138 |           logLevel: "DEBUG" as const,
139 |           maxFileSize: 2048576,
140 |         };
141 | 
142 |         config.override(overrides);
143 | 
144 |         expect(config.get("outputFile")).toBe(overrides.outputFile);
145 |         expect(config.get("logLevel")).toBe(overrides.logLevel);
146 |         expect(config.get("maxFileSize")).toBe(overrides.maxFileSize);
147 |       });
148 | 
149 |       it("maintains unaffected values after override", () => {
150 |         const originalPattern = config.get("pattern");
151 |         config.override({ outputFile: "custom-output" });
152 |         expect(config.get("pattern")).toBe(originalPattern);
153 |       });
154 | 
155 |       it("throws error for invalid override values", () => {
156 |         expect(() => {
157 |           config.override({ maxFileSize: -1 });
158 |         }).toThrow();
159 |         expect(logger.error).toHaveBeenCalled();
160 |       });
161 |     });
162 |   });
163 | });
164 | 
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
 2 | import { LOG_VALUES } from "../logger/Logger";
 3 | 
 4 | export const OUTPUT_FORMATS = {
 5 |   markdown: "md",
 6 |   html: "html",
 7 | } as const;
 8 | 
 9 | export type OutputFormats = typeof OUTPUT_FORMATS;
10 | export type OutputFormatName = keyof OutputFormats;
11 | export type OutputFormatExtension = OutputFormats[OutputFormatName];
12 | 
13 | export const OutputFormatSchema = z.enum(["markdown", "html"] as const);
14 | 
15 | export const FileExtensionSchema = z.enum(["md", "html"] as const);
16 | 
17 | export type OutputFormat = z.infer<typeof OutputFormatSchema>;
18 | export type FileExtension = z.infer<typeof FileExtensionSchema>;
19 | 
20 | export const FILE_EXTENSION: Record<OutputFormat, FileExtension> = {
21 |   markdown: "md",
22 |   html: "html",
23 | };
24 | 
25 | export const ConfigSchema = z
26 |   .object({
27 |     dir: z.string().default(process.cwd()),
28 |     rootDir: z.string().default(process.cwd()),
29 |     templatesDir: z.string().default("public/templates"),
30 |     pattern: z
31 |       .string()
32 |       .regex(/^.*$/, "Pattern must be a valid regex")
33 |       .default(".*"),
34 |     outputFile: z.string().default("output"),
35 |     logLevel: z.enum(LOG_VALUES as [string, ...string[]]).default("INFO"),
36 |     outputFormat: z.array(OutputFormatSchema).default(["markdown"]),
37 |     maxFileSize: z.number().positive().default(1048576),
38 |     maxDepth: z.number().default(100),
39 |     excludePatterns: z
40 |       .array(z.string())
41 |       .default(["node_modules/**", "**/*.test.ts", "dist/**"]),
42 |     ignoreHiddenFiles: z.boolean().default(true),
43 |     additionalIgnoreFiles: z.array(z.string()).optional().default([]),
44 |     projectName: z.string().optional(),
45 |     followSymlinks: z.boolean().default(false),
46 |     codeConfigFile: z
47 |       .string()
48 |       .regex(/\.json$/, "Config file must end with .json")
49 |       .default("public/codewrangler.json"),
50 |   })
51 |   .strict();
52 | 
53 | export type ConfigOptions = z.infer<typeof ConfigSchema>;
54 | // get a type listing all the keys of the config
55 | export type ConfigKeys = keyof ConfigOptions;
56 | 
57 | export const DEFAULT_CONFIG: ConfigOptions = {
58 |   dir: process.cwd(), // current working directory, where the command is run
59 |   rootDir: process.cwd(),
60 |   templatesDir: "public/templates",
61 |   pattern: ".*",
62 |   outputFile: "output",
63 |   logLevel: "INFO",
64 |   outputFormat: ["markdown"],
65 |   maxFileSize: 1048576,
66 |   maxDepth: 100,
67 |   codeConfigFile: "public/codewrangler.json",
68 |   projectName: undefined,
69 |   followSymlinks: false,
70 |   ignoreHiddenFiles: true, // Default value
71 |   additionalIgnoreFiles: [],
72 |   excludePatterns: ["node_modules/**", "**/*.test.ts", "dist/**"],
73 | };
74 | 
```

---------------------------------------------------------------------------


## File: ProgressBar.ts
- Path: `/root/git/codewrangler/src/utils/helpers/ProgressBar.ts`
- Size: 1.45 KB
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
 8 |   constructor(private total: number = 100) {
 9 |     this.bar = new cliProgress.SingleBar(
10 |       {},
11 |       cliProgress.Presets.shades_classic
12 |     );
13 |   }
14 | 
15 |   private simulateProgress(): void {
16 |     const remainingProgress = this.total - this.currentValue;
17 |     const increment = Math.random() * remainingProgress * 0.1;
18 |     this.currentValue = Math.min(
19 |       this.currentValue + increment,
20 |       this.total * 0.95
21 |     );
22 |     this.bar.update(this.currentValue);
23 |   }
24 | 
25 |   start(): ProgressBar {
26 |     this.bar.start(this.total, 0);
27 |     this.intervalId = setInterval(() => this.simulateProgress(), 200);
28 |     return this;
29 |   }
30 | 
31 |   update(value: number): ProgressBar {
32 |     this.currentValue = value;
33 |     this.bar.update(value);
34 |     return this;
35 |   }
36 | 
37 |   stop(): ProgressBar {
38 |     if (this.intervalId) {
39 |       clearInterval(this.intervalId);
40 |       this.intervalId = null;
41 |     }
42 |     this.bar.update(this.total);
43 |     this.bar.stop();
44 |     return this;
45 |   }
46 | 
47 |   async execute<T>(fn: () => Promise<T>): Promise<T> {
48 |     this.start();
49 |     try {
50 |       return await fn();
51 |     } finally {
52 |       this.stop();
53 |     }
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
- Size: 1.98 KB
- Extension: .ts
- Lines of code: 69
- Content:

```ts
 1 | /* eslint-disable no-console */
 2 | import colors from "colors";
 3 | import { Config } from "../config/Config";
 4 | 
 5 | export const LogLevel = {
 6 |   ERROR: 0,
 7 |   WARN: 1,
 8 |   INFO: 2,
 9 |   DEBUG: 3,
10 | } as const;
11 | 
12 | type LogLevel = (typeof LogLevel)[keyof typeof LogLevel];
13 | export type LogLevelString = keyof typeof LogLevel;
14 | export const LOG_VALUES = Object.keys(LogLevel) as LogLevelString[];
15 | 
16 | export class Logger {
17 |   private static instance: Logger;
18 |   private config: Config | null = null;
19 | 
20 |   private constructor() {}
21 |   public static load(): Logger {
22 |     if (!Logger.instance) {
23 |       Logger.instance = new Logger();
24 |     }
25 |     return Logger.instance;
26 |   }
27 |   public setConfig(config: Config): Logger {
28 |     this.config = config;
29 |     return this;
30 |   }
31 |   public setLogLevel(logLevel: LogLevelString): Logger {
32 |     if (this.config) {
33 |       this.config.set("logLevel", logLevel);
34 |     }
35 |     return this;
36 |   }
37 | 
38 |   private get logLevel(): LogLevel {
39 |     const configLogLevel = this.config?.get("logLevel") as
40 |       | LogLevelString
41 |       | undefined;
42 |     return configLogLevel ? LogLevel[configLogLevel] : LogLevel.ERROR;
43 |   }
44 | 
45 |   public error(message: string, error?: Error, ...other: unknown[]): void {
46 |     if (this.logLevel >= LogLevel.ERROR) {
47 |       console.log(colors.red(`[ERROR] ${message}`), ...other);
48 |       if (error instanceof Error && error.stack) {
49 |         console.log(colors.red(error.stack));
50 |       }
51 |     }
52 |   }
53 | 
54 |   public warn(message: string): void {
55 |     if (this.logLevel >= LogLevel.WARN) {
56 |       console.log(colors.yellow(`[WARN] ${message}`));
57 |     }
58 |   }
59 | 
60 |   public info(message: string): void {
61 |     if (this.logLevel >= LogLevel.INFO) {
62 |       console.log(colors.blue(`[INFO] ${message}`));
63 |     }
64 |   }
65 | 
66 |   public debug(message: string): void {
67 |     if (this.logLevel >= LogLevel.DEBUG) {
68 |       console.log(colors.gray(`[DEBUG] ${message}`));
69 |     }
70 |   }
71 | 
72 |   public success(message: string): void {
73 |     console.log(colors.green(message));
74 |   }
75 | 
76 |   public log(message: string): void {
77 |     console.log(message);
78 |   }
79 | }
80 | 
81 | export const logger = Logger.load();
82 | 
```

---------------------------------------------------------------------------


## File: Logger.test.ts
- Path: `/root/git/codewrangler/src/utils/logger/__tests__/Logger.test.ts`
- Size: 0.00 B
- Extension: .ts
- Lines of code: 0
- Content:

```ts
1 | 
```

---------------------------------------------------------------------------


## File: index.ts
- Path: `/root/git/codewrangler/src/utils/logger/index.ts`
- Size: 25.00 B
- Extension: .ts
- Lines of code: 1
- Content:

```ts
1 | export * from "./Logger";
```

---------------------------------------------------------------------------

