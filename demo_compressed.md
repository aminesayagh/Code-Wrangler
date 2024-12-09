
# Code Documentation
Generated on: 2024-12-09T10:15:35.547Z
Total files: 61

## Project Structure

```
codewrangler
├── demo
├── documentation
├── public
│   └── templates
└── src
    ├── cli
    │   ├── commands
    │   │   ├── base
    │   │   │   ├── BaseCommand.ts
    │   │   │   ├── index.ts
    │   │   │   └── type.ts
    │   │   └── document
    │   │       ├── DocumentCommand.ts
    │   │       ├── config
    │   │       │   ├── DocumentConfigSource.ts
    │   │       │   ├── schema.ts
    │   │       │   └── types.ts
    │   │       └── index.ts
    │   ├── index.ts
    │   └── program
    │       ├── index.ts
    │       └── singleJob
    │           ├── ProgramBuilder.ts
    │           ├── SingleJobProgram.ts
    │           └── index.ts
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
    ├── demo
    │   └── demo.ts
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
        │   ├── builders
        │   │   ├── ConfigBuilder.ts
        │   │   └── index.ts
        │   ├── core
        │   │   ├── Config.ts
        │   │   ├── ConfigManager.ts
        │   │   ├── JobConfig.ts
        │   │   ├── JobManager.ts
        │   │   └── index.ts
        │   ├── index.ts
        │   ├── schema
        │   │   ├── defaults.ts
        │   │   ├── index.ts
        │   │   ├── types.ts
        │   │   └── validation.ts
        │   └── sources
        │       ├── CLIConfigSource.ts
        │       ├── FileConfigSource.ts
        │       ├── index.ts
        │       └── interfaces
        │           └── IConfigurationSource.ts
        ├── logger
        │   ├── Logger.ts
        │   └── index.ts
        └── pattern.ts
```


## File: BaseCommand.ts
- Path: `/root/git/codewrangler/src/cli/commands/base/BaseCommand.ts`
- Size: 1001.00 B
- Extension: .ts
- Lines of code: 32
- Content:

```ts
 1 | import { ICommand, ICommandOptions } from "./type";
 2 | import { Config } from "../../../utils/config";
 3 | import { logger } from "../../../utils/logger";
 4 | 
 5 | export abstract class BaseCommand<T extends ICommandOptions>
 6 |   implements ICommand<T>
 7 | {
 8 |   public constructor(
 9 |     protected readonly config: Config,
10 |     protected readonly options: T
11 |   ) {}
12 | 
13 |   public async execute(): Promise<void> {
14 |     try {
15 |       await this.beforeExecution();
16 |       await this.processExecution();
17 |       await this.afterExecution();
18 |     } catch (error) {
19 |       this.handleError(error);
20 |       throw error;
21 |     }
22 |   }
23 | 
24 |   protected abstract processExecution(): Promise<void>;
25 |   protected abstract logVerbose(): void;
26 | 
27 |   protected async beforeExecution(): Promise<void> {
28 |     if (this.config.get("verbose")) {
29 |       await Promise.resolve(this.logVerbose());
30 |     }
31 |   }
32 |   protected abstract afterExecution(): Promise<void>;
33 | 
34 |   protected handleError(error: unknown): void {
35 |     logger.error("Command execution failed", error as Error);
36 |   }
37 | }
38 | 
```

---------------------------------------------------------------------------


## File: index.ts
- Path: `/root/git/codewrangler/src/cli/commands/base/index.ts`
- Size: 55.00 B
- Extension: .ts
- Lines of code: 2
- Content:

```ts
1 | export * from "./BaseCommand";
2 | export * from "./type";
3 | 
```

---------------------------------------------------------------------------


## File: type.ts
- Path: `/root/git/codewrangler/src/cli/commands/base/type.ts`
- Size: 206.00 B
- Extension: .ts
- Lines of code: 7
- Content:

```ts
1 | // Command command interfaces
2 | export interface ICommandOptions {
3 |   verbose?: boolean;
4 | }
5 | 
6 | export interface ICommand<T extends ICommandOptions = ICommandOptions> {
7 |   execute: (options: T) => Promise<void>;
8 | }
9 | 
```

---------------------------------------------------------------------------


## File: DocumentCommand.ts
- Path: `/root/git/codewrangler/src/cli/commands/document/DocumentCommand.ts`
- Size: 1.63 KB
- Extension: .ts
- Lines of code: 40
- Content:

```ts
 1 | import { DocumentOrchestratorBuilder } from "../../../orchestration/DocumentOrchestratorBuilder";
 2 | import { DocumentTreeBuilder } from "../../../services/builder/DocumentTreeBuilder";
 3 | import { logger } from "../../../utils/logger";
 4 | import { BaseCommand } from "../base";
 5 | import { IDocumentCommandOptions } from "./config/types";
 6 | 
 7 | export class DocumentCommand extends BaseCommand<IDocumentCommandOptions> {
 8 |   protected override async beforeExecution(): Promise<void> {
 9 |     this.logVerbose();
10 |     await super.beforeExecution();
11 |   }
12 | 
13 |   protected override async processExecution(): Promise<void> {
14 |     await this.config.jobManager.executeJobs(async job => {
15 |       const builder = new DocumentTreeBuilder(job);
16 |       const root = await builder.build();
17 | 
18 |       const orchestrator = new DocumentOrchestratorBuilder()
19 |         .setRoot(root)
20 |         .setConfig(this.config)
21 |         .setJobs([job]);
22 | 
23 |       const orchestrators = await orchestrator.buildAndExecute();
24 | 
25 |       logger.info(`Generated ${orchestrators.length} documents`);
26 |     });
27 |   }
28 | 
29 |   protected override logVerbose(): void {
30 |     logger.debug(
31 |       `Searching for file matching pattern: ${this.config.defaultJob.get("pattern")}`
32 |     );
33 |     logger.debug(
34 |       `Excluding patterns: ${(this.config.defaultJob.get("excludePatterns") as string[]).join(", ")}`
35 |     );
36 |     logger.debug(
37 |       `Ignoring hidden files: ${this.config.defaultJob.get("ignoreHiddenFiles")}`
38 |     );
39 |     logger.debug(
40 |       `Max file size: ${this.config.defaultJob.get("maxFileSize")} bytes`
41 |     );
42 |   }
43 | 
44 |   protected override async afterExecution(): Promise<void> {
45 |     await Promise.resolve(logger.info("Document generation completed"));
46 |   }
47 | }
48 | 
```

---------------------------------------------------------------------------


## File: DocumentConfigSource.ts
- Path: `/root/git/codewrangler/src/cli/commands/document/config/DocumentConfigSource.ts`
- Size: 2.08 KB
- Extension: .ts
- Lines of code: 57
- Content:

```ts
 1 | import { z } from "zod";
 2 | 
 3 | import { documentConfigSchema } from "./schema";
 4 | import { IDocumentCommandOptions } from "./types";
 5 | import { documentFactory } from "../../../../infrastructure/filesystem/DocumentFactory";
 6 | import { CLIConfigSource } from "../../../../utils/config";
 7 | import { normalizePattern } from "../../../../utils/pattern";
 8 | 
 9 | type IDocumentCommandInputOptions = Partial<IDocumentCommandOptions>;
10 | 
11 | export class DocumentConfigSource extends CLIConfigSource<IDocumentCommandOptions> {
12 |   public constructor(args: string, options: IDocumentCommandInputOptions) {
13 |     super(
14 |       [args],
15 |       options,
16 |       documentConfigSchema as z.ZodSchema<IDocumentCommandOptions>
17 |     );
18 |   }
19 | 
20 |   public load(): Promise<IDocumentCommandOptions> {
21 |     const rawConfig = this.parseArgs();
22 |     const validConfig = this.validate(rawConfig);
23 |     return Promise.resolve(this.transform(validConfig));
24 |   }
25 | 
26 |   public static create(
27 |     args: string,
28 |     options: IDocumentCommandInputOptions
29 |   ): Promise<IDocumentCommandOptions> {
30 |     return new DocumentConfigSource(args, options).load();
31 |   }
32 | 
33 |   private transform(config: IDocumentCommandOptions): IDocumentCommandOptions {
34 |     return {
35 |       ...config,
36 |       pattern: normalizePattern(config.pattern),
37 |       rootDir: documentFactory.resolve(config.rootDir ?? "."),
38 |       outputFile: this.normalizeOutputFile(config.outputFile ?? "")
39 |     };
40 |   }
41 | 
42 |   private validate(
43 |     config: IDocumentCommandInputOptions
44 |   ): IDocumentCommandOptions {
45 |     return this.schema.parse(config);
46 |   }
47 | 
48 |   private parseArgs(): IDocumentCommandInputOptions {
49 |     return {
50 |       pattern: this.args[0],
51 |       verbose: this.options.verbose,
52 |       outputFormat: this.options.outputFormat,
53 |       rootDir: this.options.rootDir,
54 |       outputFile: this.options.outputFile,
55 |       excludePatterns: this.options.excludePatterns,
56 |       ignoreHidden: this.options.ignoreHidden,
57 |       additionalIgnore: this.options.additionalIgnore
58 |     };
59 |   }
60 | 
61 |   private normalizeOutputFile(outputFile: string): string {
62 |     return documentFactory.isAbsolute(outputFile)
63 |       ? outputFile
64 |       : documentFactory.resolve(outputFile ?? "");
65 |   }
66 | }
67 | 
```

---------------------------------------------------------------------------


## File: schema.ts
- Path: `/root/git/codewrangler/src/cli/commands/document/config/schema.ts`
- Size: 555.00 B
- Extension: .ts
- Lines of code: 15
- Content:

```ts
 1 | import { z } from "zod";
 2 | 
 3 | export const documentConfigSchema = z
 4 |   .object({
 5 |     name: z.string().default("document"),
 6 |     pattern: z.string().default("**/*.{js,ts,jsx,tsx}"),
 7 |     outputFormat: z.string().default("json"),
 8 |     rootDir: z.string().default("."),
 9 |     outputFile: z.string().optional(),
10 |     excludePatterns: z.array(z.string()).optional(),
11 |     ignoreHidden: z.boolean().default(true),
12 |     additionalIgnore: z.array(z.string()).optional(),
13 |     followSymlinks: z.boolean().default(true),
14 |     verbose: z.boolean().default(false)
15 |   })
16 |   .strict();
17 | 
```

---------------------------------------------------------------------------


## File: types.ts
- Path: `/root/git/codewrangler/src/cli/commands/document/config/types.ts`
- Size: 350.00 B
- Extension: .ts
- Lines of code: 13
- Content:

```ts
 1 | import { ICommandOptions } from "../../base";
 2 | 
 3 | export interface IDocumentCommandOptions extends ICommandOptions {
 4 |   name: string;
 5 |   pattern: string;
 6 |   outputFormat: string;
 7 |   rootDir: string;
 8 |   outputFile?: string;
 9 |   excludePatterns?: string[];
10 |   ignoreHidden: boolean;
11 |   additionalIgnore?: string[];
12 |   followSymlinks: boolean;
13 |   verbose: boolean;
14 | }
15 | 
```

---------------------------------------------------------------------------


## File: index.ts
- Path: `/root/git/codewrangler/src/cli/commands/document/index.ts`
- Size: 114.00 B
- Extension: .ts
- Lines of code: 3
- Content:

```ts
1 | export * from "./DocumentCommand";
2 | export * from "./config/DocumentConfigSource";
3 | export * from "./config/types";
4 | 
```

---------------------------------------------------------------------------


## File: index.ts
- Path: `/root/git/codewrangler/src/cli/index.ts`
- Size: 433.00 B
- Extension: .ts
- Lines of code: 17
- Content:

```ts
 1 | import { ConfigBuilder } from "../utils/config";
 2 | import { DocumentCLIBuilder } from "./program/singleJob/SingleJobProgram";
 3 | 
 4 | function errorHandler(error: unknown): void {
 5 |   console.error(error);
 6 |   process.exit(1);
 7 | }
 8 | 
 9 | async function main(): Promise<void> {
10 |   try {
11 |     await ConfigBuilder.create();
12 |     await DocumentCLIBuilder.create();
13 |   } catch (error) {
14 |     errorHandler(error);
15 |   }
16 | }
17 | 
18 | main().catch(() => {
19 |   process.exit(1);
20 | });
21 | 
```

---------------------------------------------------------------------------


## File: index.ts
- Path: `/root/git/codewrangler/src/cli/program/index.ts`
- Size: 42.00 B
- Extension: .ts
- Lines of code: 1
- Content:

```ts
1 | export * as singleJob from "./singleJob";
2 | 
```

---------------------------------------------------------------------------


## File: ProgramBuilder.ts
- Path: `/root/git/codewrangler/src/cli/program/singleJob/ProgramBuilder.ts`
- Size: 1.86 KB
- Extension: .ts
- Lines of code: 67
- Content:

```ts
 1 | import { Command } from "commander";
 2 | 
 3 | import { Config } from "../../../utils/config";
 4 | 
 5 | export class ProgramBuilder {
 6 |   private program: Command;
 7 | 
 8 |   public constructor(private config: Config) {
 9 |     this.program = new Command();
10 |   }
11 | 
12 |   public build(): Command {
13 |     return this.program;
14 |   }
15 | 
16 |   public withVersion(version: string): ProgramBuilder {
17 |     this.program.version(version);
18 |     return this;
19 |   }
20 | 
21 |   public withDescription(): ProgramBuilder {
22 |     this.program.description("CodeWrangler is a tool for generating code");
23 |     return this;
24 |   }
25 | 
26 |   public withArguments(): ProgramBuilder {
27 |     this.program.argument(
28 |       "<pattern>",
29 |       'File pattern to match (e.g., "\\.ts$" for TypeScript files)'
30 |     );
31 |     return this;
32 |   }
33 | 
34 |   // eslint-disable-next-line max-lines-per-function
35 |   public withOptions(): ProgramBuilder {
36 |     this.program
37 |       .option(
38 |         "-d, --dir <dir>",
39 |         "Directory to search",
40 |         this.config.defaultJob.get("rootDir")
41 |       )
42 |       .option(
43 |         "-c, --config <config>",
44 |         "Config file",
45 |         this.config.get("codeConfigFile")
46 |       )
47 |       .option("-v, --verbose", "Verbose mode", this.config.get("logLevel"))
48 |       .option(
49 |         "-f, --format <format>",
50 |         "Output format",
51 |         this.config.defaultJob.get("outputFormat")
52 |       )
53 |       .option(
54 |         "-o, --output <output>",
55 |         "Output file",
56 |         this.config.defaultJob.get("outputFile")
57 |       )
58 |       .option(
59 |         "-e, --exclude <exclude>",
60 |         "Exclude patterns",
61 |         this.config.defaultJob.get("excludePatterns")
62 |       )
63 |       .option(
64 |         "-i, --ignore-hidden",
65 |         "Ignore hidden files",
66 |         this.config.defaultJob.get("ignoreHiddenFiles")
67 |       )
68 |       .option(
69 |         "-a, --additional-ignore <additional-ignore>",
70 |         "Additional ignore patterns",
71 |         this.config.defaultJob.get("additionalIgnoreFiles")
72 |       );
73 |     return this;
74 |   }
75 | }
76 | 
```

---------------------------------------------------------------------------


## File: SingleJobProgram.ts
- Path: `/root/git/codewrangler/src/cli/program/singleJob/SingleJobProgram.ts`
- Size: 1.51 KB
- Extension: .ts
- Lines of code: 46
- Content:

```ts
 1 | import { Command } from "commander";
 2 | 
 3 | import { ProgramBuilder } from "./ProgramBuilder";
 4 | import { Config, ConfigBuilder } from "../../../utils/config";
 5 | import {
 6 |   DocumentCommand,
 7 |   DocumentConfigSource,
 8 |   IDocumentCommandOptions
 9 | } from "../../commands/document";
10 | 
11 | export class DocumentCLIBuilder {
12 |   private static instance: DocumentCLIBuilder | undefined;
13 |   private config: Config;
14 |   private program!: Command;
15 |   private VERSION = "1.0.0";
16 | 
17 |   private constructor() {
18 |     this.config = Config.getInstance();
19 |   }
20 | 
21 |   public static async create(): Promise<DocumentCLIBuilder> {
22 |     if (!DocumentCLIBuilder.instance) {
23 |       DocumentCLIBuilder.instance = new DocumentCLIBuilder();
24 |       DocumentCLIBuilder.instance.init();
25 |       await DocumentCLIBuilder.instance.build();
26 |     }
27 |     return DocumentCLIBuilder.instance;
28 |   }
29 | 
30 |   private init(): this {
31 |     this.program = new ProgramBuilder(this.config)
32 |       .withVersion(this.VERSION)
33 |       .withDescription()
34 |       .withArguments()
35 |       .withOptions()
36 |       .build();
37 | 
38 |     return this;
39 |   }
40 | 
41 |   private async build(): Promise<void> {
42 |     const configBuilder = await ConfigBuilder.create();
43 |     this.program.action(
44 |       async (pattern: string, options: IDocumentCommandOptions) => {
45 |         const documentConfigSource = new DocumentConfigSource(pattern, options);
46 |         configBuilder.withCLIConfig(documentConfigSource);
47 |         this.config = configBuilder.build();
48 | 
49 |         const documentCLI = new DocumentCommand(this.config, options);
50 |         await documentCLI.execute();
51 |       }
52 |     );
53 |   }
54 | }
55 | 
```

---------------------------------------------------------------------------


## File: index.ts
- Path: `/root/git/codewrangler/src/cli/program/singleJob/index.ts`
- Size: 70.00 B
- Extension: .ts
- Lines of code: 2
- Content:

```ts
1 | export * from "./SingleJobProgram";
2 | export * from "./ProgramBuilder";
3 | 
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
- Size: 3.06 KB
- Extension: .ts
- Lines of code: 94
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
 71 |     this.bundleMetrics();
 72 |     this.stats = await fileStatsService(this.path);
 73 |   }
 74 | 
 75 |   public abstract override render(strategy: IRenderStrategy): INodeContent;
 76 | 
 77 |   private bundleMetrics(): void {
 78 |     // Calculate directory metrics in a single pass
 79 |     const metrics = this.children.reduce(
 80 |       (acc, child) => ({
 81 |         length: acc.length + (child.type === "file" ? 1 : 0),
 82 |         numberOfFiles:
 83 |           acc.numberOfFiles + (child.type === "file" ? 1 : child.numberOfFiles),
 84 |         deepLength:
 85 |           acc.deepLength +
 86 |           (child instanceof NodeDirectory ? child.deepLength + 1 : 1),
 87 |         size: acc.size + child.size
 88 |       }),
 89 |       { length: 0, numberOfFiles: 0, deepLength: 0, size: 0 }
 90 |     );
 91 | 
 92 |     Object.assign(this, metrics);
 93 |   }
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


## File: demo.ts
- Path: `/root/git/codewrangler/src/demo/demo.ts`
- Size: 7.99 KB
- Extension: .ts
- Lines of code: 307
- Content:

```ts
  1 | /* eslint-disable no-magic-numbers */
  2 | /* eslint-disable max-lines-per-function */
  3 | import { Stats } from "fs";
  4 | import * as fs from "fs/promises";
  5 | import * as path from "path";
  6 | 
  7 | interface IFileInfo {
  8 |   name: string;
  9 |   path: string;
 10 |   content: string;
 11 |   ext: string;
 12 |   size: number;
 13 |   lines: number;
 14 | }
 15 | 
 16 | interface ITreeNode {
 17 |   name: string;
 18 |   path: string;
 19 |   type: "file" | "directory";
 20 |   children: ITreeNode[];
 21 | }
 22 | 
 23 | interface IDocumentConfig {
 24 |   pattern: RegExp;
 25 |   rootDir: string;
 26 |   outputPath: string;
 27 |   excludePatterns: string[];
 28 |   maxFileSize: number;
 29 |   ignoreHidden: boolean;
 30 |   compress: boolean;
 31 | }
 32 | 
 33 | const DEFAULT_CONFIG: IDocumentConfig = {
 34 |   pattern: /.*/,
 35 |   rootDir: process.cwd(),
 36 |   outputPath: "documentation.md",
 37 |   excludePatterns: ["node_modules/**", "**/dist/**", "**/*.test.ts"],
 38 |   maxFileSize: 1024 * 1024, // 1MB
 39 |   ignoreHidden: true,
 40 |   compress: false
 41 | };
 42 | 
 43 | // Tree visualization functions
 44 | const generateTreeSymbols = (depth: number, isLast: boolean[]): string => {
 45 |   if (depth === 0) return "";
 46 | 
 47 |   return (
 48 |     isLast
 49 |       .slice(0, -1)
 50 |       .map(last => (last ? "    " : "│   "))
 51 |       .join("") + (isLast[isLast.length - 1] ? "└── " : "├── ")
 52 |   );
 53 | };
 54 | 
 55 | const createTreeNode = async (
 56 |   nodePath: string,
 57 |   config: IDocumentConfig,
 58 |   relativePath = ""
 59 | ): Promise<ITreeNode | null> => {
 60 |   const stats = await fs.stat(nodePath);
 61 |   const name = path.basename(nodePath);
 62 | 
 63 |   if (!shouldInclude(nodePath, config)) {
 64 |     return null;
 65 |   }
 66 | 
 67 |   if (stats.isDirectory()) {
 68 |     const entries = await fs.readdir(nodePath, { withFileTypes: true });
 69 |     const children: ITreeNode[] = [];
 70 | 
 71 |     for (const entry of entries) {
 72 |       const childNode = await createTreeNode(
 73 |         path.join(nodePath, entry.name),
 74 |         config,
 75 |         path.join(relativePath, name)
 76 |       );
 77 |       if (childNode) children.push(childNode);
 78 |     }
 79 | 
 80 |     return {
 81 |       name,
 82 |       path: relativePath || name,
 83 |       type: "directory",
 84 |       children
 85 |     };
 86 |   } else if (isMatchingFile(nodePath, config)) {
 87 |     return {
 88 |       name,
 89 |       path: relativePath || name,
 90 |       type: "file",
 91 |       children: []
 92 |     };
 93 |   }
 94 | 
 95 |   return null;
 96 | };
 97 | 
 98 | const renderTreeNode = (
 99 |   node: ITreeNode,
100 |   isLast: boolean[] = [],
101 |   result: string[] = []
102 | ): string[] => {
103 |   const prefix = generateTreeSymbols(isLast.length, isLast);
104 |   result.push(prefix + node.name);
105 | 
106 |   if (node.type === "directory") {
107 |     node.children.forEach((child, index) => {
108 |       renderTreeNode(
109 |         child,
110 |         [...isLast, index === node.children.length - 1],
111 |         result
112 |       );
113 |     });
114 |   }
115 | 
116 |   return result;
117 | };
118 | 
119 | const isHidden = (filePath: string): boolean => {
120 |   const baseName = path.basename(filePath);
121 |   return baseName.startsWith(".");
122 | };
123 | 
124 | const shouldInclude = (
125 |   filePath: string,
126 |   { excludePatterns, ignoreHidden }: IDocumentConfig
127 | ): boolean => {
128 |   // Check for hidden files if ignoreHidden is enabled
129 |   if (ignoreHidden && isHidden(filePath)) {
130 |     return false;
131 |   }
132 | 
133 |   // Check against exclude patterns
134 |   const isExcluded = excludePatterns.some(pattern =>
135 |     new RegExp(pattern.replace(/\*/g, ".*")).test(filePath)
136 |   );
137 | 
138 |   return !isExcluded;
139 | };
140 | 
141 | // Pure functions for file operations
142 | const isMatchingFile = (filePath: string, config: IDocumentConfig): boolean => {
143 |   if (!config.pattern) {
144 |     throw new Error("Pattern is not defined in the config");
145 |   }
146 | 
147 |   if (!shouldInclude(filePath, config)) {
148 |     return false;
149 |   }
150 | 
151 |   return config.pattern.test(filePath);
152 | };
153 | 
154 | const formatSize = (bytes: number): string => {
155 |   const units = ["B", "KB", "MB", "GB"];
156 |   let size = bytes;
157 |   let unitIndex = 0;
158 | 
159 |   while (size >= 1024 && unitIndex < units.length - 1) {
160 |     size /= 1024;
161 |     unitIndex++;
162 |   }
163 | 
164 |   return `${size.toFixed(2)} ${units[unitIndex]}`;
165 | };
166 | 
167 | // Core file processing functions
168 | 
169 | async function* walkDirectory(dir: string): AsyncGenerator<string> {
170 |   const entries = await fs.readdir(dir, { withFileTypes: true });
171 | 
172 |   for (const entry of entries) {
173 |     const fullPath = path.join(dir, entry.name);
174 | 
175 |     if (entry.isDirectory()) {
176 |       yield* walkDirectory(fullPath);
177 |     } else {
178 |       yield fullPath;
179 |     }
180 |   }
181 | }
182 | 
183 | const formatContentWithLineNumbers = (content: string): string => {
184 |   const lines = content.split("\n");
185 |   const lineNumberWidth = lines.length.toString().length;
186 | 
187 |   return lines
188 |     .map((line, index) => {
189 |       const lineNumber = (index + 1).toString().padStart(lineNumberWidth, " ");
190 |       return `${lineNumber} | ${line}`;
191 |     })
192 |     .join("\n");
193 | };
194 | 
195 | // Markdown generation functions
196 | const generateFileSection = (
197 |   file: IFileInfo,
198 |   compress: boolean = false
199 | ): string =>
200 |   !compress
201 |     ? `
202 | ## File: ${file.name}
203 | - Path: \`${file.path}\`
204 | - Size: ${formatSize(Number(file.size))}
205 | - Extension: ${file.ext}
206 | - Lines of code: ${file.lines}
207 | - Content:
208 | 
209 | \`\`\`${file.ext.slice(1) || "plaintext"}
210 | ${formatContentWithLineNumbers(file.content)}
211 | \`\`\`
212 | 
213 | ---------------------------------------------------------------------------
214 | `
215 |     : `
216 | ## File: ${file.name}, Path: \`${file.path}\`
217 | \`\`\`${file.ext.slice(1) || "plaintext"}
218 | ${formatContentWithLineNumbers(file.content)}
219 | \`\`\``;
220 | 
221 | const generateMarkdownContent = (
222 |   files: IFileInfo[],
223 |   treeContent: string,
224 |   compress: boolean
225 | ): string =>
226 |   !compress
227 |     ? `
228 | # Code Documentation
229 | Generated on: ${new Date().toISOString()}
230 | Total files: ${files.length}
231 | 
232 | ## Project Structure
233 | 
234 | \`\`\`
235 | ${treeContent}
236 | \`\`\`
237 | 
238 | ${files.map(file => generateFileSection(file, compress)).join("\n")}
239 | `
240 |     : `
241 | # Code documentation
242 | \`\`\`
243 | ${treeContent}
244 | \`\`\`
245 | ${files.map(file => generateFileSection(file, compress)).join("\n")}
246 | `;
247 | 
248 | const compressContent = (content: string): string =>
249 |   content
250 |     .split("\n")
251 |     .map(line => line.trim())
252 |     .filter(line => line !== "")
253 |     .filter(line => !line.startsWith("//"))
254 |     .join("\n");
255 | 
256 | async function generateFileInfo(
257 |   filePath: string,
258 |   stats: Stats,
259 |   compress: boolean
260 | ): Promise<IFileInfo> {
261 |   const content = await fs.readFile(filePath, "utf-8");
262 |   return {
263 |     name: path.basename(filePath),
264 |     path: filePath,
265 |     content: compress ? compressContent(content) : content,
266 |     ext: path.extname(filePath),
267 |     size: stats.size,
268 |     lines: content.split("\n").filter(line => line.trim() !== "").length
269 |   };
270 | }
271 | 
272 | // Main function
273 | async function generateDocumentation(
274 |   userConfig: Partial<IDocumentConfig> = {}
275 | ): Promise<void> {
276 |   try {
277 |     const config: IDocumentConfig = { ...DEFAULT_CONFIG, ...userConfig };
278 |     const files: IFileInfo[] = [];
279 | 
280 |     // Generate tree structure
281 |     const rootNode = await createTreeNode(config.rootDir, config);
282 |     const treeContent = rootNode
283 |       ? renderTreeNode(rootNode).join("\n")
284 |       : "No matching files found";
285 | 
286 |     for await (const filePath of walkDirectory(config.rootDir)) {
287 |       if (!isMatchingFile(filePath, config)) {
288 |         continue;
289 |       }
290 |       const stats = await fs.stat(filePath);
291 |       if (stats.size > config.maxFileSize) {
292 |         continue;
293 |       }
294 |       const fileInfo = await generateFileInfo(filePath, stats, config.compress);
295 |       files.push(fileInfo);
296 |     }
297 | 
298 |     const markdownContent = generateMarkdownContent(
299 |       files,
300 |       treeContent,
301 |       config.compress
302 |     );
303 |     await fs.writeFile(config.outputPath, markdownContent, "utf-8");
304 |   } catch (error) {
305 |     console.error("Error generating documentation", error);
306 |     throw error;
307 |   }
308 | }
309 | 
310 | if (require.main === module) {
311 |   generateDocumentation({
312 |     pattern: /\.ts$/,
313 |     outputPath: "demo_compressed.md",
314 |     ignoreHidden: true,
315 |     excludePatterns: [
316 |       "node_modules",
317 |       "dist",
318 |       "coverage",
319 |       "**/__tests__",
320 |       "**/*.test.ts"
321 |     ],
322 |     compress: false
323 |   }).catch(console.error);
324 |   generateDocumentation({
325 |     pattern: /\.test.ts$/,
326 |     outputPath: "demo_test.md",
327 |     ignoreHidden: true,
328 |     excludePatterns: [
329 |       "node_modules",
330 |       "dist",
331 |       "coverage",
332 |       "**/__tests__/__mocks__"
333 |     ],
334 |     compress: false
335 |   }).catch(console.error);
336 |   generateDocumentation({
337 |     pattern: /\.md$/,
338 |     outputPath: "demo_md.md",
339 |     ignoreHidden: true,
340 |     excludePatterns: [
341 |       "node_modules",
342 |       "dist",
343 |       "coverage",
344 |       "*demo*",
345 |       "src",
346 |       "demo*",
347 |       "demo",
348 |       "LICENCE.md"
349 |     ],
350 |     compress: false
351 |   }).catch(console.error);
352 | }
353 | 
```

---------------------------------------------------------------------------


## File: DocumentFactory.ts
- Path: `/root/git/codewrangler/src/infrastructure/filesystem/DocumentFactory.ts`
- Size: 9.98 KB
- Extension: .ts
- Lines of code: 331
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
 61 |   async check(filePath: string, mode: number): Promise<boolean> {
 62 |     try {
 63 |       await fs.access(filePath, mode);
 64 |       return true;
 65 |     } catch {
 66 |       return false;
 67 |     }
 68 |   },
 69 | 
 70 |   /**
 71 |    * Checks various access flags for a path
 72 |    * @private
 73 |    * @param filePath - The path to check access for
 74 |    * @returns An object containing readable, writable, and executable permission flags
 75 |    */
 76 |   async checkAccess(filePath: string): Promise<{
 77 |     readable: boolean;
 78 |     writable: boolean;
 79 |     executable: boolean;
 80 |   }> {
 81 |     return {
 82 |       readable: await this.check(filePath, fs.constants.R_OK),
 83 |       writable: await this.check(filePath, fs.constants.W_OK),
 84 |       executable: await this.check(filePath, fs.constants.X_OK)
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
120 |       this.handleError(error, filePath);
121 |       throw null;
122 |     }
123 |   },
124 | 
125 |   /**
126 |    * Writes data to a file, replacing the file if it already exists
127 |    * @param filePath - The path to the file
128 |    * @param data - The data to write
129 |    * @param options - The options for the write operation
130 |    * @throws {DocumentError} For file system errors
131 |    */
132 |   async writeFile(
133 |     filePath: string,
134 |     data: string | Buffer,
135 |     options: IWriteOptions = {}
136 |   ): Promise<void> {
137 |     try {
138 |       // Write the file
139 |       await fs.writeFile(filePath, data, {
140 |         encoding: options.encoding ?? "utf-8",
141 |         mode: options.mode,
142 |         flag: options.flag
143 |       });
144 |     } catch (error) {
145 |       this.handleError(error, filePath);
146 |     }
147 |   },
148 | 
149 |   /**
150 |    * Appends data to a file
151 |    * @param filePath - The path to the file
152 |    * @param content - The content to append
153 |    * @param options - The options for the write operation
154 |    * @throws {DocumentError} For file system errors
155 |    */
156 |   async appendFile(
157 |     filePath: string,
158 |     content: string,
159 |     options: IWriteOptions = {}
160 |   ): Promise<void> {
161 |     try {
162 |       await fs.appendFile(filePath, content, {
163 |         encoding: options.encoding ?? "utf-8",
164 |         mode: options.mode,
165 |         flag: options.flag
166 |       });
167 |     } catch (error) {
168 |       this.handleError(error, filePath);
169 |     }
170 |   },
171 | 
172 |   /**
173 |    * Reads the contents of a directory
174 |    * @param dirPath - The path to the directory
175 |    * @param options - The options for the read operation
176 |    * @returns An array of file and directory names in the directory
177 |    * @throws {Error} If the directory cannot be read
178 |    */
179 |   async readDir(
180 |     dirPath: string,
181 |     options?: { withFileTypes?: boolean }
182 |   ): Promise<string[]> {
183 |     return await fs.readdir(dirPath, options as ObjectEncodingOptions);
184 |   },
185 | 
186 |   /**
187 |    * Creates a directory if it doesn't exist
188 |    * @param dirPath - The path where to create the directory
189 |    * @param recursive - Whether to create parent directories if they don't exist
190 |    * @throws {DocumentError} For file system errors
191 |    */
192 |   async createDir(dirPath: string, recursive = true): Promise<void> {
193 |     await fs.mkdir(dirPath, { recursive });
194 |   },
195 | 
196 |   /**
197 |    * Gets the base name of a file
198 |    * @param filePath - The path to the file
199 |    * @returns The base name of the file (last portion of the path)
200 |    */
201 |   baseName(filePath: string): string {
202 |     return path.basename(filePath);
203 |   },
204 | 
205 |   /**
206 |    * Gets the extension of a file
207 |    * @param filePath - The path to the file
208 |    * @returns The extension of the file including the dot (e.g., '.txt')
209 |    */
210 |   extension(filePath: string): string {
211 |     return path.extname(filePath);
212 |   },
213 | 
214 |   /**
215 |    * Checks if a file or directory exists
216 |    * @param filePath - The path to check
217 |    * @returns True if the file or directory exists, false otherwise
218 |    */
219 |   exists(filePath: string): boolean {
220 |     try {
221 |       fsSync.accessSync(filePath);
222 |       return true;
223 |     } catch {
224 |       return false;
225 |     }
226 |   },
227 | 
228 |   /**
229 |    * Checks if a path is absolute
230 |    * @param filePath - The path to check
231 |    * @returns True if the path is absolute, false otherwise
232 |    */
233 |   isAbsolute(filePath: string): boolean {
234 |     return path.isAbsolute(filePath);
235 |   },
236 | 
237 |   /**
238 |    * Gets directory contents with type information
239 |    * @param dirPath - The path to the directory
240 |    * @returns An array of objects containing name and type information for each entry
241 |    * @throws {DocumentError} If path is not a directory or other errors occur
242 |    */
243 |   async readDirectory(
244 |     dirPath: string
245 |   ): Promise<Array<{ name: string; type: FileType }>> {
246 |     try {
247 |       const entries = await fs.readdir(dirPath, { withFileTypes: true });
248 |       return entries.map(entry => ({
249 |         name: entry.name,
250 |         type: entry.isDirectory() ? FILE_TYPE.Directory : FILE_TYPE.File
251 |       }));
252 |     } catch (error) {
253 |       this.handleError(error, dirPath);
254 |       return [];
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
276 |       this.handleError(error, dirPath);
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
340 |   },
341 | 
342 |   /**
343 |    * Handles errors
344 |    * @param error - The error to handle
345 |    * @param filePath - The path to the file
346 |    * @throws {DocumentError} If the error is not an instance of DocumentError
347 |    */
348 |   handleError(error: unknown, filePath: string): void {
349 |     if (error instanceof DocumentError) {
350 |       throw error;
351 |     }
352 |     if (error instanceof FileNotFoundError) {
353 |       throw error;
354 |     }
355 |     throw new DocumentError(String(error), filePath);
356 |   }
357 | };
358 | 
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
- Size: 4.28 KB
- Extension: .ts
- Lines of code: 135
- Content:

```ts
  1 | import { ZodObject, z } from "zod";
  2 | 
  3 | import { TemplateType } from "../../types/template";
  4 | import { JobConfig } from "../../utils/config";
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
 41 |   public static getTemplateDir(config: JobConfig): string {
 42 |     const dir = documentFactory.join(
 43 |       config.get("rootDir") as string,
 44 |       config.global.get("templatesDir") as string
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
- Size: 2.71 KB
- Extension: .ts
- Lines of code: 78
- Content:

```ts
 1 | import { IDocumentOrchestrator } from "./interfaces/IDocumentOrchestrator";
 2 | import { NodeDirectory } from "../core/entities/NodeDirectory";
 3 | import { NodeFile } from "../core/entities/NodeFile";
 4 | import { documentFactory } from "../infrastructure/filesystem/DocumentFactory";
 5 | import { IRenderStrategy } from "../services/renderer/RenderStrategy";
 6 | import { JobConfig } from "../utils/config";
 7 | import { OUTPUT_FORMATS, OutputFormat } from "../utils/config/schema";
 8 | import { logger } from "../utils/logger/Logger";
 9 | 
10 | export class DocumentOrchestrator implements IDocumentOrchestrator {
11 |   private strategy: IRenderStrategy | null = null;
12 | 
13 |   private constructor(
14 |     private readonly root: NodeDirectory | NodeFile,
15 |     private readonly job: JobConfig
16 |   ) {}
17 | 
18 |   public static create(
19 |     root: NodeDirectory | NodeFile,
20 |     job: JobConfig
21 |   ): DocumentOrchestrator {
22 |     const orchestrator = new DocumentOrchestrator(root, job);
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
39 |       const outputPath = this.resolveOutputPath(this.strategy.getName());
40 |       await this.ensureOutputDirectory(outputPath);
41 |       await this.writeOutput(outputPath, content);
42 | 
43 |       logger.success(`Document built successfully at ${outputPath}`);
44 |     } catch (error) {
45 |       logger.error("Failed to build document", error as Error);
46 |       throw error;
47 |     }
48 |   }
49 | 
50 |   public getStrategyName(): string {
51 |     return this.strategy?.getName() ?? "Unknown";
52 |   }
53 | 
54 |   public dispose(): void {
55 |     this.strategy?.dispose();
56 |   }
57 | 
58 |   private initialize(): void {
59 |     this.validateStructure();
60 |   }
61 | 
62 |   private validateStructure(): void {
63 |     if (!(this.root.type == "directory") && !(this.root.type == "file")) {
64 |       throw new Error("Invalid root node type");
65 |     }
66 |   }
67 | 
68 |   private resolveOutputPath(outputFormat: OutputFormat): string {
69 |     const outputFile = this.job.get("outputFile");
70 |     return documentFactory.resolve(
71 |       `${outputFile}.${OUTPUT_FORMATS[outputFormat]}`
72 |     );
73 |   }
74 | 
75 |   private async ensureOutputDirectory(outputPath: string): Promise<void> {
76 |     const directory = documentFactory.baseName(outputPath);
77 |     if (
78 |       outputPath.endsWith(`.${OUTPUT_FORMATS.html}`) ||
79 |       outputPath.endsWith(`.${OUTPUT_FORMATS.markdown}`)
80 |     ) {
81 |       return;
82 |     }
83 |     await documentFactory.ensureDirectory(directory);
84 |   }
85 | 
86 |   private async writeOutput(
87 |     outputPath: string,
88 |     content: string
89 |   ): Promise<void> {
90 |     await documentFactory.writeFile(outputPath, content);
91 |   }
92 | }
93 | 
```

---------------------------------------------------------------------------


## File: DocumentOrchestratorBuilder.ts
- Path: `/root/git/codewrangler/src/orchestration/DocumentOrchestratorBuilder.ts`
- Size: 2.11 KB
- Extension: .ts
- Lines of code: 65
- Content:

```ts
 1 | import { DocumentOrchestrator } from "./DocumentOrchestrator";
 2 | import { NodeDirectory } from "../core/entities/NodeDirectory";
 3 | import { NodeFile } from "../core/entities/NodeFile";
 4 | import { renderStrategyFactory } from "../services/renderer/RenderStrategyFactory";
 5 | import { Config, JobConfig } from "../utils/config";
 6 | import { logger } from "../utils/logger/Logger";
 7 | 
 8 | export class DocumentOrchestratorBuilder {
 9 |   private root: NodeDirectory | NodeFile | null = null;
10 |   private config: Config | null = null;
11 |   private jobs: JobConfig[] = [];
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
23 |   public setJobs(jobs: JobConfig[]): this {
24 |     this.jobs = jobs;
25 |     return this;
26 |   }
27 | 
28 |   public async build(): Promise<DocumentOrchestrator[]> {
29 |     this.validate();
30 |     const orchestrators: DocumentOrchestrator[] = [];
31 | 
32 |     for (const job of this.jobs) {
33 |       const outputFormat = job.get("outputFormat");
34 |       const strategies = await renderStrategyFactory.createStrategies(
35 |         job,
36 |         outputFormat
37 |       );
38 |       for (const strategy of strategies) {
39 |         const orchestrator = DocumentOrchestrator.create(
40 |           this.root as NodeDirectory | NodeFile,
41 |           job as JobConfig
42 |         );
43 |         orchestrator.setStrategy(strategy);
44 |         orchestrators.push(orchestrator);
45 |       }
46 |     }
47 | 
48 |     return orchestrators;
49 |   }
50 |   public async buildAndExecute(): Promise<DocumentOrchestrator[]> {
51 |     const orchestrators = await this.build();
52 | 
53 |     for (const orchestrator of orchestrators) {
54 |       try {
55 |         await orchestrator.build();
56 |       } catch (error) {
57 |         logger.error(
58 |           `Failed to build documentation with strategy ${orchestrator.getStrategyName()}`,
59 |           error as Error
60 |         );
61 |       }
62 |     }
63 | 
64 |     return orchestrators;
65 |   }
66 | 
67 |   private validate(): void {
68 |     if (!this.root || !this.config) {
69 |       throw new Error("Missing required components for DocumentOrchestrator");
70 |     }
71 | 
72 |     if (this.jobs.length === 0) {
73 |       throw new Error("At least one job is required");
74 |     }
75 |   }
76 | }
77 | 
```

---------------------------------------------------------------------------


## File: index.ts
- Path: `/root/git/codewrangler/src/orchestration/index.ts`
- Size: 70.00 B
- Extension: .ts
- Lines of code: 2
- Content:

```ts
1 | export * from "./DocumentOrchestrator";
2 | export * from "./interfaces";
3 | 
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
- Size: 78.00 B
- Extension: .ts
- Lines of code: 2
- Content:

```ts
1 | export * from "./IDocumentMetadata";
2 | export * from "./IDocumentOrchestrator";
3 | 
```

---------------------------------------------------------------------------


## File: DocumentTreeBuilder.ts
- Path: `/root/git/codewrangler/src/services/builder/DocumentTreeBuilder.ts`
- Size: 1.74 KB
- Extension: .ts
- Lines of code: 46
- Content:

```ts
 1 | import { INodeTree, NodeTreeBuilder } from "./NodeTreeBuilder";
 2 | import { RenderableDirectory } from "../../core/entities/NodeDirectory";
 3 | import { RenderableFile } from "../../core/entities/NodeFile";
 4 | import { FILE_TYPE } from "../../types/type";
 5 | import { JobConfig } from "../../utils/config";
 6 | import { logger } from "../../utils/logger";
 7 | 
 8 | export class DocumentTreeBuilder {
 9 |   private root: RenderableDirectory | RenderableFile | undefined;
10 |   private builder: NodeTreeBuilder;
11 |   public constructor(config: JobConfig) {
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
42 |     if (node.type !== FILE_TYPE.Directory)
43 |       return new RenderableFile(node.name, node.path);
44 |     const directory = new RenderableDirectory(node.name, node.path);
45 | 
46 |     if (node.children) {
47 |       // Recursively create children
48 |       for (const child of node.children) {
49 |         const childDocument = await this.createDocumentStructure(child);
50 |         directory.addChild(childDocument);
51 |       }
52 |     }
53 | 
54 |     return directory;
55 |   }
56 | }
57 | 
```

---------------------------------------------------------------------------


## File: FileHidden.ts
- Path: `/root/git/codewrangler/src/services/builder/FileHidden.ts`
- Size: 899.00 B
- Extension: .ts
- Lines of code: 25
- Content:

```ts
 1 | import { minimatch } from "minimatch";
 2 | 
 3 | import { JobConfig } from "../../utils/config";
 4 | 
 5 | export default class FileHidden {
 6 |   private ignoreHiddenFiles: boolean;
 7 |   private patterns: string[];
 8 |   private additionalIgnoreFiles: string[];
 9 | 
10 |   public constructor(config: JobConfig) {
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
- Size: 3.16 KB
- Extension: .ts
- Lines of code: 101
- Content:

```ts
  1 | import FileHidden from "./FileHidden";
  2 | import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
  3 | import { fileStatsService } from "../../infrastructure/filesystem/FileStats";
  4 | import { FILE_TYPE, FileType } from "../../types/type";
  5 | import { IJobConfig, JobConfig } from "../../utils/config";
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
 16 |     IJobConfig,
 17 |     | "additionalIgnoreFiles"
 18 |     | "maxDepth"
 19 |     | "excludePatterns"
 20 |     | "rootDir"
 21 |     | "followSymlinks"
 22 |   > {
 23 |   pattern: RegExp;
 24 |   returnType: "paths" | "details";
 25 | }
 26 | 
 27 | export class NodeTreeBuilder {
 28 |   private config: JobConfig;
 29 |   private options: INodeTreeBuilderOptions;
 30 |   private fileHidden: FileHidden;
 31 | 
 32 |   public constructor(config: JobConfig) {
 33 |     this.config = config;
 34 |     this.options = this.initializeOptions();
 35 |     this.fileHidden = new FileHidden(config);
 36 |   }
 37 | 
 38 |   public async build(): Promise<INodeTree> {
 39 |     const rootDir = this.options.rootDir;
 40 |     if (!documentFactory.exists(rootDir)) {
 41 |       throw new Error(`Directory ${rootDir} does not exist`);
 42 |     }
 43 |     return await this.buildTree(rootDir);
 44 |   }
 45 | 
 46 |   private initializeOptions(): INodeTreeBuilderOptions {
 47 |     return {
 48 |       rootDir: this.config.get("rootDir"),
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
- Size: 3.42 KB
- Extension: .ts
- Lines of code: 94
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
  9 | import { JobConfig, OutputFormat } from "../../utils/config";
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
 31 |     private readonly config: JobConfig,
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
 77 |       PROJECT_NAME: this.getProjectName(rootDirectory.name),
 78 |       GENERATION_DATE: new Date().toISOString(),
 79 |       TOTAL_SIZE: rootDirectory.size,
 80 |       CONTENT: rootContent
 81 |     } as BaseTemplate & Record<string, string>;
 82 | 
 83 |     if (rootDirectory.type === "directory") {
 84 |       templateConfig["TOTAL_FILES"] = rootDirectory.length;
 85 |       templateConfig["TOTAL_DIRECTORIES"] = rootDirectory.deepLength;
 86 |     }
 87 | 
 88 |     return this.templatePage.render(templateConfig);
 89 |   }
 90 | 
 91 |   public dispose(): void {
 92 |     this.templatePage.dispose();
 93 |     this.templateDirectory.dispose();
 94 |     this.templateFile.dispose();
 95 |   }
 96 | 
 97 |   protected getProjectName(otherName?: string): string {
 98 |     return this.config.global.get("projectName") || otherName || "Project";
 99 |   }
100 | 
101 |   protected renderNode(node: NodeFile | NodeDirectory): string {
102 |     return node.type === "file"
103 |       ? this.renderFile(node)
104 |       : this.renderDirectory(node);
105 |   }
106 | 
107 |   protected renderChildren(children: (NodeFile | NodeDirectory)[]): string {
108 |     if (!children) return "";
109 |     return children.map(child => this.renderNode(child)).join("");
110 |   }
111 | }
112 | 
```

---------------------------------------------------------------------------


## File: RenderStrategyBuilder.ts
- Path: `/root/git/codewrangler/src/services/renderer/RenderStrategyBuilder.ts`
- Size: 4.20 KB
- Extension: .ts
- Lines of code: 139
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
 11 | import {
 12 |   JobConfig,
 13 |   OutputFormat,
 14 |   OutputFormatExtension
 15 | } from "../../utils/config";
 16 | 
 17 | export class RenderStrategyBuilder {
 18 |   private config: JobConfig | null = null;
 19 |   private extension: OutputFormatExtension | null = null;
 20 |   private name: OutputFormat | null = null;
 21 |   private templatePage: Template | null = null;
 22 |   private templateDirectory: Template | null = null;
 23 |   private templateFile: Template | null = null;
 24 | 
 25 |   /**
 26 |    * @param config - The configuration to use for the strategy.
 27 |    * @returns The builder instance.
 28 |    */
 29 |   public setConfig(config: JobConfig): RenderStrategyBuilder {
 30 |     this.config = config;
 31 |     return this;
 32 |   }
 33 | 
 34 |   /**
 35 |    * @param extension - The extension to use for the strategy.
 36 |    * @returns The builder instance.
 37 |    */
 38 |   public setExtension(extension: OutputFormatExtension): RenderStrategyBuilder {
 39 |     this.extension = extension;
 40 |     return this;
 41 |   }
 42 | 
 43 |   /**
 44 |    * @param name - The name to use for the strategy.
 45 |    * @returns The builder instance.
 46 |    */
 47 |   public setName(name: OutputFormat): RenderStrategyBuilder {
 48 |     this.name = name;
 49 |     return this;
 50 |   }
 51 | 
 52 |   /**
 53 |    * @returns The builder instance.
 54 |    */
 55 |   public async loadTemplates(): Promise<RenderStrategyBuilder> {
 56 |     if (!this.config) {
 57 |       throw new Error("Config is required");
 58 |     }
 59 | 
 60 |     const templateDir = Template.getTemplateDir(this.config);
 61 | 
 62 |     this.templatePage = await this.loadTemplatePage(templateDir);
 63 |     this.templateDirectory = await this.loadTemplateDirectory(templateDir);
 64 |     this.templateFile = await this.loadTemplateFile(templateDir);
 65 | 
 66 |     return this;
 67 |   }
 68 | 
 69 |   /**
 70 |    * @returns The built strategy.
 71 |    */
 72 |   public build(): RenderBaseStrategy {
 73 |     this.validate();
 74 | 
 75 |     const concreteRenderStrategy = this.getRenderStrategy();
 76 | 
 77 |     return new concreteRenderStrategy(
 78 |       this.config as JobConfig,
 79 |       this.templatePage as Template,
 80 |       this.templateDirectory as Template,
 81 |       this.templateFile as Template
 82 |     );
 83 |   }
 84 | 
 85 |   /**
 86 |    * @returns The render strategy.
 87 |    */
 88 |   private getRenderStrategy():
 89 |     | typeof RenderMarkdownStrategy
 90 |     | typeof RenderHTMLStrategy {
 91 |     switch (this.name) {
 92 |       case "markdown":
 93 |         return RenderMarkdownStrategy;
 94 |       case "html":
 95 |         return RenderHTMLStrategy;
 96 |       default:
 97 |         throw new Error(`Unsupported output format: ${this.name}`);
 98 |     }
 99 |   }
100 | 
101 |   /**
102 |    * @returns Whether the builder is valid.
103 |    */
104 |   private validate(): boolean {
105 |     if (!this.config) {
106 |       throw new Error("Config is required");
107 |     }
108 |     if (!this.extension) {
109 |       throw new Error("Extension is required");
110 |     }
111 |     if (!this.name) {
112 |       throw new Error("Name is required");
113 |     }
114 |     if (!this.templatePage || !this.templateDirectory || !this.templateFile) {
115 |       throw new Error("Templates must be loaded before building");
116 |     }
117 | 
118 |     return true;
119 |   }
120 | 
121 |   /**
122 |    * @param templateDir - The directory to load the template from.
123 |    * @returns The loaded template.
124 |    */
125 |   private loadTemplateFile(templateDir: string): Promise<Template> {
126 |     return Template.create(
127 |       "file",
128 |       fileTemplateSchema,
129 |       documentFactory.join(templateDir, `file.${this.extension}`)
130 |     );
131 |   }
132 | 
133 |   /**
134 |    * @param templateDir - The directory to load the template from.
135 |    * @returns The loaded template.
136 |    */
137 |   private loadTemplateDirectory(templateDir: string): Promise<Template> {
138 |     return Template.create(
139 |       "directory",
140 |       directoryTemplateSchema,
141 |       documentFactory.join(templateDir, `directory.${this.extension}`)
142 |     );
143 |   }
144 | 
145 |   /**
146 |    * @param templateDir - The directory to load the template from.
147 |    * @returns The loaded template.
148 |    */
149 |   private loadTemplatePage(templateDir: string): Promise<Template> {
150 |     return Template.create(
151 |       "page",
152 |       baseTemplateSchema,
153 |       documentFactory.join(templateDir, `page.${this.extension}`)
154 |     );
155 |   }
156 | }
157 | 
```

---------------------------------------------------------------------------


## File: RenderStrategyFactory.ts
- Path: `/root/git/codewrangler/src/services/renderer/RenderStrategyFactory.ts`
- Size: 1.85 KB
- Extension: .ts
- Lines of code: 55
- Content:

```ts
 1 | import { RenderBaseStrategy } from "./RenderStrategy";
 2 | import { RenderStrategyBuilder } from "./RenderStrategyBuilder";
 3 | import { JobConfig } from "../../utils/config";
 4 | import { OutputFormat } from "../../utils/config/schema";
 5 | 
 6 | // Factory function for common render strategies
 7 | export const renderStrategyFactory = {
 8 |   cache: new Map<string, RenderBaseStrategy>(),
 9 | 
10 |   async createMarkdownStrategy(config: JobConfig): Promise<RenderBaseStrategy> {
11 |     return await new RenderStrategyBuilder()
12 |       .setConfig(config)
13 |       .setExtension("md")
14 |       .setName("markdown")
15 |       .loadTemplates()
16 |       .then(builder => builder.build());
17 |   },
18 | 
19 |   async createHTMLStrategy(config: JobConfig): Promise<RenderBaseStrategy> {
20 |     return await new RenderStrategyBuilder()
21 |       .setConfig(config)
22 |       .setExtension("html")
23 |       .setName("html")
24 |       .loadTemplates()
25 |       .then(builder => builder.build());
26 |   },
27 | 
28 |   async createStrategies(
29 |     config: JobConfig,
30 |     formats: OutputFormat[]
31 |   ): Promise<RenderBaseStrategy[]> {
32 |     return await Promise.all(
33 |       formats.map(format => this.createStrategy(config, format))
34 |     );
35 |   },
36 | 
37 |   /**
38 |    * Creates a strategy for the given config and format.
39 |    * @param config - The job config.
40 |    * @param format - The output format.
41 |    * @returns The strategy.
42 |    */
43 |   async createStrategy(
44 |     config: JobConfig,
45 |     format: OutputFormat
46 |   ): Promise<RenderBaseStrategy> {
47 |     const key = `${config.get("name")}-${format}`;
48 |     if (this.cache.has(key)) return this.cache.get(key) as RenderBaseStrategy;
49 | 
50 |     let strategy: RenderBaseStrategy;
51 |     if (format === "markdown") {
52 |       strategy = await this.createMarkdownStrategy(config);
53 |     } else if (format === "html") {
54 |       strategy = await this.createHTMLStrategy(config);
55 |     } else {
56 |       throw new Error(`Unknown format: ${format}`);
57 |     }
58 | 
59 |     this.cache.set(key, strategy);
60 |     return strategy;
61 |   }
62 | };
63 | 
```

---------------------------------------------------------------------------


## File: HTMLStrategy.ts
- Path: `/root/git/codewrangler/src/services/renderer/strategies/HTMLStrategy.ts`
- Size: 465.00 B
- Extension: .ts
- Lines of code: 13
- Content:

```ts
 1 | import { Template } from "../../../infrastructure/templates/TemplateEngine";
 2 | import { JobConfig } from "../../../utils/config";
 3 | import { RenderBaseStrategy } from "../RenderStrategy";
 4 | 
 5 | export class RenderHTMLStrategy extends RenderBaseStrategy {
 6 |   public constructor(
 7 |     config: JobConfig,
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
- Size: 473.00 B
- Extension: .ts
- Lines of code: 13
- Content:

```ts
 1 | import { Template } from "../../../infrastructure/templates/TemplateEngine";
 2 | import { JobConfig } from "../../../utils/config";
 3 | import { RenderBaseStrategy } from "../RenderStrategy";
 4 | 
 5 | export class RenderMarkdownStrategy extends RenderBaseStrategy {
 6 |   public constructor(
 7 |     config: JobConfig,
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


## File: ConfigBuilder.ts
- Path: `/root/git/codewrangler/src/utils/config/builders/ConfigBuilder.ts`
- Size: 1.24 KB
- Extension: .ts
- Lines of code: 39
- Content:

```ts
 1 | import { logger } from "../../logger";
 2 | import { Config } from "../core";
 3 | import { ConfigOptions } from "../schema";
 4 | import { CLIConfigSource } from "../sources/CLIConfigSource";
 5 | import { FileConfigSource } from "../sources/FileConfigSource";
 6 | 
 7 | export class ConfigBuilder {
 8 |   private static instance: ConfigBuilder;
 9 |   private config: Config;
10 | 
11 |   private constructor(config: Config) {
12 |     this.config = config;
13 |   }
14 | 
15 |   public static async create(): Promise<ConfigBuilder> {
16 |     if (!ConfigBuilder.instance) {
17 |       ConfigBuilder.instance = new ConfigBuilder(await Config.load());
18 |       logger.info("ConfigBuilder created");
19 |     }
20 |     return ConfigBuilder.instance;
21 |   }
22 | 
23 |   public withFileConfig(filePath: string): ConfigBuilder {
24 |     this.config.addSource(new FileConfigSource(filePath));
25 |     return this;
26 |   }
27 | 
28 |   public withCLIConfig<I extends object>(
29 |     cliConfig: CLIConfigSource<I>
30 |   ): ConfigBuilder {
31 |     this.config.addSource(cliConfig);
32 |     return this;
33 |   }
34 | 
35 |   public withOverride(override: Partial<ConfigOptions>): ConfigBuilder {
36 |     this.config.override(override);
37 |     return this;
38 |   }
39 | 
40 |   public build(): Config {
41 |     this.config.loadSources().catch(error => {
42 |       logger.error("Failed to load configuration sources", error);
43 |     });
44 |     return this.config;
45 |   }
46 | }
47 | 
```

---------------------------------------------------------------------------


## File: index.ts
- Path: `/root/git/codewrangler/src/utils/config/builders/index.ts`
- Size: 33.00 B
- Extension: .ts
- Lines of code: 1
- Content:

```ts
1 | export * from "./ConfigBuilder";
2 | 
```

---------------------------------------------------------------------------


## File: Config.ts
- Path: `/root/git/codewrangler/src/utils/config/core/Config.ts`
- Size: 4.58 KB
- Extension: .ts
- Lines of code: 156
- Content:

```ts
  1 | import { z } from "zod";
  2 | 
  3 | import { ConfigManager } from "./ConfigManager";
  4 | import { JobConfig } from "./JobConfig";
  5 | import { JobManager } from "./JobManager";
  6 | import { logger } from "../../logger";
  7 | import {
  8 |   ConfigOptions,
  9 |   DEFAULT_CONFIG,
 10 |   DEFAULT_JOB_CONFIG,
 11 |   IConfig,
 12 |   configSchema
 13 | } from "../schema";
 14 | import { IConfigurationSource } from "../sources/interfaces/IConfigurationSource";
 15 | 
 16 | export class Config extends ConfigManager<IConfig> {
 17 |   private static instance: Config | undefined;
 18 |   public defaultJob: JobConfig = new JobConfig(DEFAULT_JOB_CONFIG, this);
 19 |   public jobManager: JobManager;
 20 |   private sources: IConfigurationSource<Partial<ConfigOptions>>[] = [];
 21 | 
 22 |   /**
 23 |    * Constructor for the Config class.
 24 |    */
 25 |   private constructor() {
 26 |     super(DEFAULT_CONFIG);
 27 |     this.validate(this.config);
 28 |     this.jobManager = new JobManager(this);
 29 |   }
 30 | 
 31 |   /**
 32 |    * Loads the configuration.
 33 |    * @returns The Config instance.
 34 |    */
 35 |   public static async load(): Promise<Config> {
 36 |     if (!Config.instance) {
 37 |       Config.instance = new Config();
 38 |       logger.setConfig(Config.getInstance());
 39 |       await Config.instance.loadSources();
 40 |     }
 41 |     return Config.instance;
 42 |   }
 43 | 
 44 |   /**
 45 |    * Resets the configuration to the default values.
 46 |    */
 47 |   public reset(): void {
 48 |     logger.info("Resetting config to default");
 49 |     this.config = DEFAULT_CONFIG;
 50 |   }
 51 | 
 52 |   /**
 53 |    * Adds a new configuration source.
 54 |    * @param source - The configuration source to add.
 55 |    */
 56 |   public addSource(source: IConfigurationSource<Partial<ConfigOptions>>): void {
 57 |     this.sources.push(source);
 58 |     this.sources.sort((a, b) => a.priority - b.priority);
 59 |     this.loadSources().catch(error => {
 60 |       logger.error("Failed to reload configuration sources", error);
 61 |     });
 62 |   }
 63 | 
 64 |   /**
 65 |    * Destroys the Config instance.
 66 |    */
 67 |   public static destroy(): void {
 68 |     Config.instance = undefined;
 69 |   }
 70 | 
 71 |   /**
 72 |    * Returns the Config instance.
 73 |    * @returns The Config instance.
 74 |    * @throws An error if the Config instance is not initialized.
 75 |    */
 76 |   public static getInstance(): Config {
 77 |     if (!Config.instance) {
 78 |       throw new Error("Config must be initialized before use");
 79 |     }
 80 |     return Config.instance;
 81 |   }
 82 | 
 83 |   /**
 84 |    * Overrides the configuration with a new set of values.
 85 |    * @param config - The new configuration values.
 86 |    */
 87 |   public override(config: Partial<ConfigOptions>): void {
 88 |     const newOverrideConfig = { ...this.config, ...config };
 89 |     try {
 90 |       configSchema.parse(newOverrideConfig);
 91 |       this.config = newOverrideConfig;
 92 |     } catch (error) {
 93 |       if (error instanceof z.ZodError) {
 94 |         logger.error(`Invalid configuration value: ${error.errors}`);
 95 |       }
 96 |       throw error;
 97 |     }
 98 |   }
 99 | 
100 |   /**
101 |    * Loads the configuration sources.
102 |    */
103 |   public async loadSources(): Promise<void> {
104 |     let mergedConfig = { ...DEFAULT_CONFIG };
105 | 
106 |     await this.navigateSource(async source => {
107 |       const sourceConfig = await source.load();
108 |       // Merge jobs separately
109 |       if (sourceConfig.jobs) {
110 |         this.jobManager.mergeJobs(sourceConfig.jobs);
111 |       }
112 |       // Merge other config properties
113 |       mergedConfig = {
114 |         ...mergedConfig,
115 |         ...sourceConfig,
116 |         jobs: this.jobManager.getJobs().map(job => job.getAll())
117 |       };
118 |     });
119 | 
120 |     this.validate(mergedConfig);
121 |   }
122 | 
123 |   /**
124 |    * Validates the configuration.
125 |    * @param config - The configuration to validate.
126 |    */
127 |   protected validate(config: IConfig): IConfig {
128 |     try {
129 |       return configSchema.parse(config);
130 |     } catch (error) {
131 |       this.handleConfigError(error);
132 |       throw error; // Re-throw the error to be handled by the caller
133 |     }
134 |   }
135 | 
136 |   /**
137 |    * Handles configuration validation errors.
138 |    * @param error - The error to handle.
139 |    * @throws An error if the configuration is invalid.
140 |    */
141 |   protected handleConfigError(error: unknown): void {
142 |     if (error instanceof z.ZodError) {
143 |       const details = error.errors
144 |         .map(err => `${err.path.join(".")}: ${err.message}`)
145 |         .join(", ");
146 |       logger.error(`Configuration validation failed: ${details}`);
147 |       throw new Error("Configuration validation failed");
148 |     }
149 |     throw error;
150 |   }
151 | 
152 |   /**
153 |    * Navigates through the configuration sources.
154 |    * @param callback - The callback to execute for each source.
155 |    */
156 |   private async navigateSource(
157 |     callback: (
158 |       source: IConfigurationSource<Partial<ConfigOptions>>
159 |     ) => Promise<void>
160 |   ): Promise<void> {
161 |     for (const source of this.sources) {
162 |       try {
163 |         await callback(source);
164 |       } catch (error) {
165 |         logger.error(
166 |           `Failed to navigate configuration source: ${error instanceof Error ? error.message : String(error)}`
167 |         );
168 |       }
169 |     }
170 |   }
171 | }
172 | 
```

---------------------------------------------------------------------------


## File: ConfigManager.ts
- Path: `/root/git/codewrangler/src/utils/config/core/ConfigManager.ts`
- Size: 712.00 B
- Extension: .ts
- Lines of code: 26
- Content:

```ts
 1 | export abstract class ConfigManager<T> {
 2 |   protected config: T;
 3 | 
 4 |   public constructor(defaultConfig: T) {
 5 |     this.config = defaultConfig;
 6 |   }
 7 | 
 8 |   public get<K extends keyof T>(key: K): T[K] {
 9 |     return this.config[key] as T[K];
10 |   }
11 | 
12 |   public set(key: keyof T, value: T[keyof T]): void {
13 |     if (value === undefined) {
14 |       return;
15 |     }
16 |     const updatedConfig = { ...this.config, [key]: value };
17 |     try {
18 |       this.validate(updatedConfig);
19 |       this.config = updatedConfig;
20 |     } catch (error) {
21 |       this.handleConfigError(error);
22 |     }
23 |   }
24 | 
25 |   public getAll(): T {
26 |     return this.config;
27 |   }
28 | 
29 |   protected abstract validate(config: T): T;
30 | 
31 |   protected abstract handleConfigError(error: unknown): void;
32 | }
33 | 
```

---------------------------------------------------------------------------


## File: JobConfig.ts
- Path: `/root/git/codewrangler/src/utils/config/core/JobConfig.ts`
- Size: 840.00 B
- Extension: .ts
- Lines of code: 26
- Content:

```ts
 1 | import { z } from "zod";
 2 | 
 3 | import { Config } from "./Config";
 4 | import { ConfigManager } from "./ConfigManager";
 5 | import { logger } from "../../logger";
 6 | import { IJobConfig, jobConfigSchema } from "../schema";
 7 | 
 8 | export class JobConfig extends ConfigManager<IJobConfig> {
 9 |   public constructor(
10 |     jobConfig: IJobConfig,
11 |     public global: Config
12 |   ) {
13 |     super(jobConfig);
14 |   }
15 | 
16 |   protected validate(config: IJobConfig): IJobConfig {
17 |     return jobConfigSchema.parse(config);
18 |   }
19 | 
20 |   protected handleConfigError(error: unknown): void {
21 |     if (error instanceof z.ZodError) {
22 |       const details = error.errors
23 |         .map(err => `${err.path.join(".")}: ${err.message}`)
24 |         .join(", ");
25 |       logger.error(`Configuration validation failed: ${details}`);
26 |       throw new Error("Configuration validation failed");
27 |     }
28 |     throw error;
29 |   }
30 | }
31 | 
```

---------------------------------------------------------------------------


## File: JobManager.ts
- Path: `/root/git/codewrangler/src/utils/config/core/JobManager.ts`
- Size: 2.31 KB
- Extension: .ts
- Lines of code: 80
- Content:

```ts
 1 | import { logger } from "../../logger";
 2 | import { DEFAULT_JOB_CONFIG, IJobConfig } from "../schema";
 3 | import { Config } from "./Config";
 4 | import { JobConfig } from "./JobConfig";
 5 | 
 6 | export interface IJobManager {
 7 |   registerJob: (jobConfig: IJobConfig) => void;
 8 |   mergeJobs: (newJobs: IJobConfig[]) => void;
 9 |   getJobs: () => JobConfig[];
10 | }
11 | 
12 | export class JobManager implements IJobManager {
13 |   private jobs: Map<string, JobConfig> = new Map();
14 |   private global: Config;
15 | 
16 |   /**
17 |    * Initializes a new JobManager instance.
18 |    * @param config - The main configuration.
19 |    */
20 |   public constructor(global: Config) {
21 |     this.global = global;
22 |   }
23 | 
24 |   /**
25 |    * Registers a new job.
26 |    * @param jobConfig - The job config to register.
27 |    */
28 |   public registerJob(jobConfig: Partial<IJobConfig>): void {
29 |     const mergedConfig = this.mergeWithDefaults(jobConfig);
30 |     this.jobs.set(mergedConfig.name, new JobConfig(mergedConfig, this.global));
31 |   }
32 | 
33 |   /**
34 |    * Merges new jobs with existing jobs.
35 |    * @param newJobs - The new jobs to merge.
36 |    */
37 |   public mergeJobs(newJobs: IJobConfig[]): void {
38 |     for (const job of newJobs) {
39 |       const existing = this.jobs.get(job.name);
40 |       if (existing) {
41 |         this.jobs.set(
42 |           job.name,
43 |           new JobConfig({ ...existing.getAll(), ...job }, this.global)
44 |         );
45 |       } else {
46 |         this.jobs.set(job.name, new JobConfig(job, this.global));
47 |       }
48 |     }
49 |   }
50 | 
51 |   /**
52 |    * Returns all registered jobs.
53 |    * @returns An array of JobConfig instances.
54 |    */
55 |   public getJobs(): JobConfig[] {
56 |     return Array.from(this.jobs.values());
57 |   }
58 | 
59 |   public async executeJobs<T>(
60 |     callback: (job: JobConfig) => Promise<T>
61 |   ): Promise<(T | undefined)[]> {
62 |     return await Promise.all(
63 |       this.getJobs().map(async job => {
64 |         try {
65 |           return await callback(job);
66 |         } catch (error) {
67 |           this.handleError(error, job);
68 |           return undefined;
69 |         }
70 |       })
71 |     );
72 |   }
73 | 
74 |   /**
75 |    * Merges the job config with the default job config.
76 |    * @param jobConfig - The job config to merge.
77 |    * @returns The merged job config.
78 |    */
79 |   private mergeWithDefaults(jobConfig: Partial<IJobConfig>): IJobConfig {
80 |     return {
81 |       ...DEFAULT_JOB_CONFIG,
82 |       ...jobConfig
83 |     };
84 |   }
85 | 
86 |   private handleError(error: unknown, job: JobConfig): void {
87 |     logger.error(`Error in job ${job.get("name")}: ${error}`);
88 |   }
89 | }
90 | 
```

---------------------------------------------------------------------------


## File: index.ts
- Path: `/root/git/codewrangler/src/utils/config/core/index.ts`
- Size: 85.00 B
- Extension: .ts
- Lines of code: 3
- Content:

```ts
1 | export * from "./Config";
2 | export * from "./JobManager";
3 | export * from "./JobConfig";
4 | 
```

---------------------------------------------------------------------------


## File: index.ts
- Path: `/root/git/codewrangler/src/utils/config/index.ts`
- Size: 105.00 B
- Extension: .ts
- Lines of code: 4
- Content:

```ts
1 | export * from "./schema";
2 | export * from "./core";
3 | export * from "./sources";
4 | export * from "./builders";
5 | 
```

---------------------------------------------------------------------------


## File: defaults.ts
- Path: `/root/git/codewrangler/src/utils/config/schema/defaults.ts`
- Size: 714.00 B
- Extension: .ts
- Lines of code: 24
- Content:

```ts
 1 | import { IConfig, IJobConfig, OutputFormat } from "./types";
 2 | import { LogLevelString } from "../../logger/Logger";
 3 | 
 4 | export const DEFAULT_JOB_CONFIG: IJobConfig = {
 5 |   name: "default",
 6 |   description: "Default job",
 7 |   rootDir: process.cwd(),
 8 |   outputFormat: ["markdown"] as OutputFormat[],
 9 |   excludePatterns: [],
10 |   maxFileSize: 1048576,
11 |   maxDepth: 100,
12 |   ignoreHiddenFiles: true,
13 |   additionalIgnoreFiles: [],
14 |   followSymlinks: false,
15 |   pattern: "**/*",
16 |   outputFile: "output.md"
17 | };
18 | 
19 | export const DEFAULT_CONFIG: IConfig = {
20 |   projectName: "CodeWrangler",
21 |   templatesDir: "public/templates", // TODO:
22 |   codeConfigFile: "public/codewrangler.json",
23 |   logLevel: "INFO" as LogLevelString,
24 |   verbose: false,
25 |   jobs: []
26 | };
27 | 
```

---------------------------------------------------------------------------


## File: index.ts
- Path: `/root/git/codewrangler/src/utils/config/schema/index.ts`
- Size: 83.00 B
- Extension: .ts
- Lines of code: 3
- Content:

```ts
1 | export * from "./validation";
2 | export * from "./defaults";
3 | export * from "./types";
4 | 
```

---------------------------------------------------------------------------


## File: types.ts
- Path: `/root/git/codewrangler/src/utils/config/schema/types.ts`
- Size: 1001.00 B
- Extension: .ts
- Lines of code: 35
- Content:

```ts
 1 | import { LogLevelString } from "../../logger/Logger";
 2 | 
 3 | export const OUTPUT_FORMATS = {
 4 |   markdown: "md",
 5 |   html: "html"
 6 | } as const;
 7 | 
 8 | export type OutputFormats = typeof OUTPUT_FORMATS;
 9 | export type OutputFormat = keyof typeof OUTPUT_FORMATS;
10 | export type OutputFormatName = keyof OutputFormats;
11 | export type OutputFormatExtension = OutputFormats[OutputFormatName];
12 | export type ConfigKeys = keyof IConfig;
13 | 
14 | export interface IJobConfig {
15 |   name: string;
16 |   description: string;
17 |   pattern: string;
18 |   outputFile: string;
19 |   rootDir: string;
20 |   excludePatterns: string[];
21 |   maxFileSize: number;
22 |   maxDepth: number;
23 |   ignoreHiddenFiles: boolean;
24 |   outputFormat: OutputFormatName[];
25 |   followSymlinks: boolean;
26 |   additionalIgnoreFiles: string[];
27 | }
28 | 
29 | interface IConfigBase {
30 |   projectName: string;
31 |   templatesDir: string;
32 |   codeConfigFile: string;
33 |   logLevel: LogLevelString;
34 |   verbose: boolean;
35 | }
36 | 
37 | export interface IConfig extends IConfigBase {
38 |   jobs?: IJobConfig[];
39 | }
40 | 
41 | export type ConfigOptions = Partial<IConfig>;
42 | 
```

---------------------------------------------------------------------------


## File: validation.ts
- Path: `/root/git/codewrangler/src/utils/config/schema/validation.ts`
- Size: 1.34 KB
- Extension: .ts
- Lines of code: 38
- Content:

```ts
 1 | import { z } from "zod";
 2 | 
 3 | import { LOG_VALUES, LogLevelString } from "../../logger/Logger";
 4 | 
 5 | export const outputFormatSchema = z.enum(["markdown", "html"] as const);
 6 | 
 7 | export const fileExtensionSchema = z.enum(["md", "html"] as const);
 8 | 
 9 | export const logLevelSchema = z.enum(
10 |   LOG_VALUES as [LogLevelString, ...LogLevelString[]]
11 | );
12 | 
13 | export const jobConfigSchema = z
14 |   .object({
15 |     name: z.string(),
16 |     description: z.string(),
17 |     pattern: z.string().regex(/^.*$/, "Pattern must be a valid regex"),
18 |     outputFile: z.string(),
19 |     outputFormat: z.array(outputFormatSchema),
20 |     rootDir: z.string(),
21 |     excludePatterns: z.array(z.string()),
22 |     maxFileSize: z.number().positive(),
23 |     maxDepth: z.number(),
24 |     ignoreHiddenFiles: z.boolean(),
25 |     additionalIgnoreFiles: z.array(z.string()),
26 |     followSymlinks: z.boolean()
27 |   })
28 |   .strict();
29 | 
30 | export const optionalJobConfigSchema = jobConfigSchema.partial();
31 | 
32 | export const configSchema = z
33 |   .object({
34 |     projectName: z.string(),
35 |     templatesDir: z.string(),
36 |     codeConfigFile: z
37 |       .string()
38 |       .regex(/\.json$/, "Config file must end with .json"),
39 |     logLevel: logLevelSchema,
40 |     verbose: z.boolean(),
41 |     jobs: z.array(jobConfigSchema)
42 |   })
43 |   .strict();
44 | 
45 | // Propose me a new zod parser based on the configSchema, but with all the fields optional.
46 | 
47 | export const optionalConfigSchema = configSchema.partial();
48 | 
```

---------------------------------------------------------------------------


## File: CLIConfigSource.ts
- Path: `/root/git/codewrangler/src/utils/config/sources/CLIConfigSource.ts`
- Size: 480.00 B
- Extension: .ts
- Lines of code: 16
- Content:

```ts
 1 | import { z } from "zod";
 2 | 
 3 | import { IConfigurationSource } from "./interfaces/IConfigurationSource";
 4 | 
 5 | export abstract class CLIConfigSource<T extends object>
 6 |   implements IConfigurationSource<T>
 7 | {
 8 |   public readonly priority = 2;
 9 |   public readonly schema: z.ZodSchema<T>;
10 | 
11 |   public constructor(
12 |     protected readonly args: string[],
13 |     protected readonly options: Partial<T>,
14 |     schema: z.ZodSchema<T>
15 |   ) {
16 |     this.schema = schema;
17 |   }
18 | 
19 |   public abstract load(): Promise<T>;
20 | }
21 | 
```

---------------------------------------------------------------------------


## File: FileConfigSource.ts
- Path: `/root/git/codewrangler/src/utils/config/sources/FileConfigSource.ts`
- Size: 1.15 KB
- Extension: .ts
- Lines of code: 30
- Content:

```ts
 1 | import { z } from "zod";
 2 | 
 3 | import { IConfigurationSource } from "./interfaces/IConfigurationSource";
 4 | import { JsonReader } from "../../../infrastructure/filesystem/JsonReader";
 5 | import { logger } from "../../logger";
 6 | import { IConfig } from "../schema";
 7 | import { DEFAULT_CONFIG } from "../schema/defaults";
 8 | import { optionalConfigSchema } from "../schema/validation";
 9 | 
10 | export class FileConfigSource
11 |   implements IConfigurationSource<Partial<IConfig>>
12 | {
13 |   public readonly priority = 1;
14 |   public readonly schema: z.ZodSchema<Partial<IConfig>>;
15 |   public inputFileConfig: object | undefined;
16 |   private jsonReader: JsonReader;
17 | 
18 |   public constructor(private readonly filePath: string) {
19 |     this.jsonReader = new JsonReader();
20 |     this.schema = optionalConfigSchema;
21 |   }
22 | 
23 |   public async load(): Promise<Partial<IConfig>> {
24 |     try {
25 |       this.inputFileConfig = await this.jsonReader.readJsonSync(this.filePath);
26 |       return optionalConfigSchema.parse(this.inputFileConfig);
27 |     } catch (error) {
28 |       logger.warn(
29 |         `Failed to load configuration from ${this.filePath}: ${error instanceof Error ? error.message : String(error)}`
30 |       );
31 |       return DEFAULT_CONFIG;
32 |     }
33 |   }
34 | }
35 | 
```

---------------------------------------------------------------------------


## File: index.ts
- Path: `/root/git/codewrangler/src/utils/config/sources/index.ts`
- Size: 122.00 B
- Extension: .ts
- Lines of code: 3
- Content:

```ts
1 | export * from "./FileConfigSource";
2 | export * from "./CLIConfigSource";
3 | export * from "./interfaces/IConfigurationSource";
4 | 
```

---------------------------------------------------------------------------


## File: IConfigurationSource.ts
- Path: `/root/git/codewrangler/src/utils/config/sources/interfaces/IConfigurationSource.ts`
- Size: 176.00 B
- Extension: .ts
- Lines of code: 6
- Content:

```ts
1 | import { z } from "zod";
2 | 
3 | export interface IConfigurationSource<T extends object> {
4 |   readonly priority: number;
5 |   readonly schema: z.ZodSchema<T>;
6 |   load: () => Promise<T>;
7 | }
8 | 
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
 4 | import { Config } from "../config/core/Config";
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


## File: pattern.ts
- Path: `/root/git/codewrangler/src/utils/pattern.ts`
- Size: 122.00 B
- Extension: .ts
- Lines of code: 3
- Content:

```ts
1 | export function normalizePattern(pattern: string): string {
2 |   return pattern.startsWith("^") ? pattern : `^${pattern}`;
3 | }
4 | 
```

---------------------------------------------------------------------------

