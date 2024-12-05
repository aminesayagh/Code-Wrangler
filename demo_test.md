
# Code documentation
```
codewrangler
├── demo
├── documentation
├── public
│   └── templates
└── src
    ├── cli
    │   ├── commands
    │   └── program
    ├── core
    │   ├── entities
    │   │   └── __tests__
    │   │       ├── NodeBase.test.ts
    │   │       ├── NodeDirectory.test.ts
    │   │       └── NodeFile.test.ts
    │   └── errors
    │       └── __tests__
    │           └── DocumentError.test.ts
    ├── infrastructure
    │   ├── filesystem
    │   │   └── __tests__
    │   │       ├── DocumentFactory.test.ts
    │   │       ├── FileStats.test.ts
    │   │       └── JsonReadert.test.ts
    │   └── templates
    │       └── __tests__
    │           └── TemplateEngine.test.ts
    ├── orchestration
    │   └── interfaces
    ├── services
    │   ├── builder
    │   │   └── __tests__
    │   │       ├── DocumentTreeBuild.test.ts
    │   │       ├── FileHidden.test.ts
    │   │       └── NodeTreeBuilder.test.ts
    │   └── renderer
    │       ├── __tests__
    │       │   ├── RenderHTMLStrategy.test.ts
    │       │   ├── RenderMarkdownStrategy.test.ts
    │       │   ├── RenderStrategy.test.ts
    │       │   └── RenderStrategyBuilder.test.ts
    │       └── strategies
    ├── types
    └── utils
        ├── config
        │   └── __tests__
        │       └── Config.test.ts
        ├── helpers
        │   └── __tests__
        └── logger
            └── __tests__
                └── Logger.test.ts
```

## File: NodeBase.test.ts, Path: `/root/git/codewrangler/src/core/entities/__tests__/NodeBase.test.ts`
```ts
  1 | import { documentFactory } from "../../../infrastructure/filesystem/DocumentFactory";
  2 | import { INodeContent, NodeBase } from "../NodeBase";
  3 | jest.mock("../../../infrastructure/filesystem/DocumentFactory", () => ({
  4 | documentFactory: {
  5 | exists: jest.fn(),
  6 | isAbsolute: jest.fn(),
  7 | resolve: jest.fn(),
  8 | extension: jest.fn(),
  9 | size: jest.fn(),
 10 | readFile: jest.fn(),
 11 | getStats: jest.fn()
 12 | }
 13 | }));
 14 | class TestNode extends NodeBase {
 15 | public async bundle(): Promise<void> {}
 16 | public render(): INodeContent {
 17 | return { content: "" };
 18 | }
 19 | public get secondaryProps(): Record<string, unknown> | undefined {
 20 | return {};
 21 | }
 22 | }
 23 | describe("NodeBase", () => {
 24 | const TEST_PATH = "/test/path";
 25 | beforeEach(() => {
 26 | jest.clearAllMocks();
 27 | (documentFactory.exists as jest.Mock).mockReturnValue(true);
 28 | (documentFactory.isAbsolute as jest.Mock).mockReturnValue(true);
 29 | (documentFactory.resolve as jest.Mock).mockImplementation(path => path);
 30 | });
 31 | describe("constructor", () => {
 32 | it("should initialize node with correct props", () => {
 33 | const testNode = new TestNode("test", TEST_PATH);
 34 | expect(testNode.name).toBe("test");
 35 | expect(testNode.path).toBe(TEST_PATH);
 36 | });
 37 | it("should throw error for non-existent path", () => {
 38 | (documentFactory.exists as jest.Mock).mockReturnValue(false);
 39 | expect(() => new TestNode("test", "/invalid/path")).toThrow(
 40 | new Error("Path /invalid/path does not exist")
 41 | );
 42 | });
 43 | it("should throw error for non-absolute path", () => {
 44 | (documentFactory.isAbsolute as jest.Mock).mockReturnValue(false);
 45 | expect(() => new TestNode("test", "relative/path")).toThrow(
 46 | new Error("Path relative/path is not absolute")
 47 | );
 48 | });
 49 | });
 50 | describe("properties", () => {
 51 | let node: TestNode;
 52 | beforeEach(() => {
 53 | node = new TestNode("test", TEST_PATH);
 54 | });
 55 | it("should get and set deep property", () => {
 56 | node["deep"] = 2;
 57 | expect(node.deep).toBe(2);
 58 | });
 59 | it("should get and set size property", () => {
 60 | node["size"] = 100;
 61 | expect(node.size).toBe(100);
 62 | });
 63 | it("should get combined props", () => {
 64 | node["size"] = 100;
 65 | node["deep"] = 2;
 66 | expect(node.props).toEqual(
 67 | expect.objectContaining({
 68 | name: "test",
 69 | path: TEST_PATH,
 70 | size: 100,
 71 | deep: 2
 72 | })
 73 | );
 74 | });
 75 | });
 76 | describe("methods", () => {
 77 | let node: TestNode;
 78 | beforeEach(() => {
 79 | node = new TestNode("test", TEST_PATH);
 80 | });
 81 | it("should dispose correctly", async () => {
 82 | node["size"] = 100;
 83 | await node.dispose();
 84 | expect(node.size).toBe(0);
 85 | expect(node.name).toBe("");
 86 | expect(node.path).toBe("");
 87 | expect(node.stats).toEqual(
 88 | expect.objectContaining({
 89 | size: expect.any(Number),
 90 | isDirectory: false,
 91 | isFile: false,
 92 | created: expect.any(Date),
 93 | accessed: expect.any(Date),
 94 | modified: expect.any(Date),
 95 | permissions: {
 96 | executable: false,
 97 | readable: false,
 98 | writable: false
 99 | }
100 | })
101 | );
102 | });
103 | it("should clone correctly", async () => {
104 | node["size"] = 100;
105 | const clone = await node.clone();
106 | expect(clone.size).toBe(100);
107 | expect(clone.name).toBe("test");
108 | expect(clone.path).toBe(TEST_PATH);
109 | });
110 | });
111 | });
```

## File: NodeDirectory.test.ts, Path: `/root/git/codewrangler/src/core/entities/__tests__/NodeDirectory.test.ts`
```ts
 1 | import * as fs from "fs/promises";
 2 | import * as path from "path";
 3 | import { IRenderStrategy } from "../../../services/renderer/RenderStrategy";
 4 | import { INodeContent } from "../NodeBase";
 5 | import { NodeDirectory } from "../NodeDirectory";
 6 | import { NodeFile } from "../NodeFile";
 7 | class TestDirectory extends NodeDirectory {
 8 | public render(_: IRenderStrategy): INodeContent {
 9 | return {
10 | content: "render"
11 | };
12 | }
13 | }
14 | class TestFile extends NodeFile {
15 | public render(_: IRenderStrategy): INodeContent {
16 | return {
17 | content: "render"
18 | };
19 | }
20 | }
21 | describe("Directory", () => {
22 | let testDirectory: TestDirectory;
23 | const pwd = process.cwd();
24 | const MOCK_PATH = path.resolve(
25 | `${pwd}/src/core/entities/__tests__/__node_directory_mocks__`
26 | );
27 | beforeEach(async () => {
28 | jest.clearAllMocks();
29 | await fs.mkdir(MOCK_PATH, { recursive: true });
30 | await fs.mkdir(path.join(MOCK_PATH, "dir"), { recursive: true });
31 | testDirectory = new TestDirectory("dir", path.join(MOCK_PATH, "dir"));
32 | });
33 | afterEach(async () => {
34 | await fs.rm(MOCK_PATH, { recursive: true, force: true });
35 | });
36 | it("constructor initializes name, path, and extension correctly", () => {
37 | expect(testDirectory.name).toBe("dir");
38 | expect(testDirectory.path).toBe(path.join(MOCK_PATH, "dir"));
39 | expect(testDirectory.children).toEqual([]);
40 | });
41 | it("addChild throws error for invalid child type", () => {
42 | expect(() => testDirectory.addChild({} as NodeFile)).toThrow(
43 | "Invalid child type"
44 | );
45 | });
46 | it("Check props value before bundle", () => {
47 | const props = testDirectory.props;
48 | expect(props).toMatchObject({
49 | name: "dir",
50 | path: path.join(MOCK_PATH, "dir")
51 | });
52 | });
53 | describe("bundle", () => {
54 | const dir = path.join(MOCK_PATH, "dir");
55 | beforeEach(async () => {
56 | await fs.mkdir(path.join(MOCK_PATH, "dir"), { recursive: true });
57 | await fs.writeFile(path.join(MOCK_PATH, "file1.ts"), "");
58 | await fs.writeFile(path.join(MOCK_PATH, "file2.js"), "");
59 | await fs.writeFile(path.join(dir, "file3.ts"), "");
60 | await fs.writeFile(path.join(dir, "file4.js"), "");
61 | jest.clearAllMocks();
62 | });
63 | it("bundle updates directory properties correctly", async () => {
64 | const mockFile1 = new TestFile(
65 | "file1.ts",
66 | path.join(MOCK_PATH, "file1.ts")
67 | );
68 | const mockFile2 = new TestFile(
69 | "file2.js",
70 | path.join(MOCK_PATH, "file2.js")
71 | );
72 | const mockSubDir = new TestDirectory("dir", path.join(MOCK_PATH, "dir"));
73 | const mockFile3 = new TestFile(
74 | "file3.ts",
75 | path.join(MOCK_PATH, "dir/file3.ts")
76 | );
77 | const mockFile4 = new TestFile(
78 | "file4.js",
79 | path.join(MOCK_PATH, "dir/file4.js")
80 | );
81 | testDirectory.addChild(mockFile1);
82 | testDirectory.addChild(mockFile2);
83 | testDirectory.addChild(mockSubDir);
84 | mockSubDir.addChild(mockFile3);
85 | mockSubDir.addChild(mockFile4);
86 | await testDirectory.bundle(1);
87 | expect(testDirectory.deep).toEqual(expect.any(Number));
88 | expect(testDirectory.length).toEqual(expect.any(Number)); // Only direct files
89 | expect(testDirectory.deepLength).toEqual(expect.any(Number)); // Including subdirectory and its file
90 | expect(testDirectory.size).toEqual(expect.any(Number)); // Sum of all file sizes
91 | });
92 | });
93 | });
```

## File: NodeFile.test.ts, Path: `/root/git/codewrangler/src/core/entities/__tests__/NodeFile.test.ts`
```ts
 1 | import * as fs from "fs/promises";
 2 | import * as path from "path";
 3 | import { IRenderStrategy } from "../../../services/renderer/RenderStrategy";
 4 | import { INodeContent } from "../NodeBase";
 5 | import { NodeFile } from "../NodeFile";
 6 | class TestFile extends NodeFile {
 7 | public render(_: IRenderStrategy): INodeContent {
 8 | return {
 9 | content: "render"
10 | };
11 | }
12 | }
13 | describe("NodeFile", () => {
14 | let testFile: TestFile;
15 | const pwd = process.cwd();
16 | const MOCK_PATH = path.resolve(
17 | `${pwd}/src/core/entities/__tests__/__node_file_mocks__`
18 | );
19 | const testName = "file1.ts";
20 | const testPath = path.join(MOCK_PATH, testName);
21 | beforeEach(async () => {
22 | jest.clearAllMocks();
23 | try {
24 | await fs.mkdir(MOCK_PATH, { recursive: true });
25 | await fs.writeFile(testPath, "");
26 | } catch (error) {
27 | console.error(error);
28 | }
29 | testFile = new TestFile(testName, testPath);
30 | });
31 | afterEach(async () => {
32 | await fs.rm(MOCK_PATH, { recursive: true, force: true });
33 | });
34 | describe("constructor", () => {
35 | it("initializes name, path, and extension correctly", () => {
36 | expect(testFile.name).toBe(testName);
37 | expect(testFile.path).toBe(testPath);
38 | expect(testFile.extension).toBe(".ts");
39 | });
40 | });
41 | describe("bundle", () => {
42 | it("Check props value before bundle", () => {
43 | const props = testFile.props;
44 | expect(props).toMatchObject({
45 | name: testName,
46 | path: testPath,
47 | deep: 0,
48 | size: 0,
49 | extension: ".ts"
50 | });
51 | });
52 | it("Bundle method sets content correctly", async () => {
53 | await testFile.bundle();
54 | const content = "";
55 | expect(testFile.content).toBe(content);
56 | });
57 | it("Check props value after bundle", async () => {
58 | await testFile.bundle();
59 | const props = testFile.props;
60 | expect(props).toMatchObject({
61 | name: expect.any(String),
62 | path: expect.any(String),
63 | deep: expect.any(Number),
64 | size: expect.any(Number),
65 | extension: expect.any(String)
66 | });
67 | });
68 | });
69 | });
```

## File: DocumentError.test.ts, Path: `/root/git/codewrangler/src/core/errors/__tests__/DocumentError.test.ts`
```ts
  1 | import { DirectoryNotFoundError } from "../DirectoryNotFoundError";
  2 | import { DocumentError } from "../DocumentError";
  3 | import { FileNotFoundError } from "../FileNotFoundError";
  4 | describe("Error Classes", () => {
  5 | const TEST_PATH = "/path/to/file";
  6 | describe("DocumentError", () => {
  7 | it("should create an instance with the correct properties for DocumentError", () => {
  8 | const message = "Test error message";
  9 | const error = new DocumentError(message, TEST_PATH);
 10 | expect(error).toBeInstanceOf(Error);
 11 | expect(error).toBeInstanceOf(DocumentError);
 12 | expect(error.name).toBe("DocumentError");
 13 | expect(error.path).toBe(TEST_PATH);
 14 | expect(error.message).toBe(`Document error at ${TEST_PATH}: ${message}`);
 15 | });
 16 | it("should handle empty message and path", () => {
 17 | const error = new DocumentError("", "");
 18 | expect(error.name).toBe("DocumentError");
 19 | expect(error.path).toBe("");
 20 | expect(error.message).toBe("Document error at : ");
 21 | });
 22 | it("should preserve stack trace", () => {
 23 | const error = new DocumentError("message", "path");
 24 | expect(error.stack).toBeDefined();
 25 | expect(error.stack).toContain("DocumentError");
 26 | });
 27 | });
 28 | describe("FileNotFoundError", () => {
 29 | it("should create an instance with the correct properties for DocumentError", () => {
 30 | const error = new FileNotFoundError(TEST_PATH);
 31 | expect(error).toBeInstanceOf(Error);
 32 | expect(error).toBeInstanceOf(DocumentError);
 33 | expect(error).toBeInstanceOf(FileNotFoundError);
 34 | expect(error.name).toBe("FileNotFoundError");
 35 | expect(error.path).toBe(TEST_PATH);
 36 | expect(error.message).toBe(
 37 | `Document error at ${TEST_PATH}: File not found`
 38 | );
 39 | });
 40 | it("should handle empty path", () => {
 41 | const error = new FileNotFoundError("");
 42 | expect(error.name).toBe("FileNotFoundError");
 43 | expect(error.path).toBe("");
 44 | expect(error.message).toBe("Document error at : File not found");
 45 | });
 46 | it("should preserve stack trace for FileNotFoundError", () => {
 47 | const error = new FileNotFoundError("path");
 48 | expect(error.stack).toBeDefined();
 49 | expect(error.stack).toContain("FileNotFoundError");
 50 | });
 51 | it("should be catchable as DocumentError", () => {
 52 | const error = new FileNotFoundError(TEST_PATH);
 53 | try {
 54 | throw error;
 55 | } catch (e) {
 56 | expect(e instanceof DocumentError).toBe(true);
 57 | }
 58 | });
 59 | });
 60 | describe("DirectoryNotFoundError", () => {
 61 | it("should create an instance with the correct properties for DirectoryNotFoundError", () => {
 62 | const path = "/path/to/directory";
 63 | const error = new DirectoryNotFoundError(path);
 64 | expect(error).toBeInstanceOf(Error);
 65 | expect(error).toBeInstanceOf(DocumentError);
 66 | expect(error).toBeInstanceOf(DirectoryNotFoundError);
 67 | expect(error.name).toBe("DirectoryNotFoundError");
 68 | expect(error.path).toBe(path);
 69 | expect(error.message).toBe(
 70 | `Document error at ${path}: Directory not found`
 71 | );
 72 | });
 73 | it("should handle empty path", () => {
 74 | const error = new DirectoryNotFoundError("");
 75 | expect(error.name).toBe("DirectoryNotFoundError");
 76 | expect(error.path).toBe("");
 77 | expect(error.message).toBe("Document error at : Directory not found");
 78 | });
 79 | it("should preserve stack trace for DirectoryNotFoundError", () => {
 80 | const error = new DirectoryNotFoundError("path");
 81 | expect(error.stack).toBeDefined();
 82 | expect(error.stack).toContain("DirectoryNotFoundError");
 83 | });
 84 | it("should be catchable as DocumentError", () => {
 85 | const error = new DirectoryNotFoundError("/path/to/directory");
 86 | try {
 87 | throw error;
 88 | } catch (e: any) {
 89 | expect(e instanceof DocumentError).toBe(true);
 90 | }
 91 | });
 92 | });
 93 | describe("Error Hierarchy", () => {
 94 | it("should maintain proper inheritance chain", () => {
 95 | const docError = new DocumentError("message", "path");
 96 | const fileError = new FileNotFoundError("path");
 97 | const dirError = new DirectoryNotFoundError("path");
 98 | expect(docError instanceof Error).toBe(true);
 99 | expect(docError instanceof DocumentError).toBe(true);
100 | expect(fileError instanceof Error).toBe(true);
101 | expect(fileError instanceof DocumentError).toBe(true);
102 | expect(fileError instanceof FileNotFoundError).toBe(true);
103 | expect(dirError instanceof Error).toBe(true);
104 | expect(dirError instanceof DocumentError).toBe(true);
105 | expect(dirError instanceof DirectoryNotFoundError).toBe(true);
106 | });
107 | it("should allow type checking in catch blocks", () => {
108 | const errors = [
109 | new DocumentError("message", "path"),
110 | new FileNotFoundError("path"),
111 | new DirectoryNotFoundError("path")
112 | ];
113 | errors.forEach(error => {
114 | try {
115 | throw error;
116 | } catch (e) {
117 | if (e instanceof DirectoryNotFoundError) {
118 | expect(e.name).toBe("DirectoryNotFoundError");
119 | } else if (e instanceof FileNotFoundError) {
120 | expect(e.name).toBe("FileNotFoundError");
121 | } else if (e instanceof DocumentError) {
122 | expect(e.name).toBe("DocumentError");
123 | }
124 | }
125 | });
126 | });
127 | it("should handle error comparison correctly", () => {
128 | const docError = new DocumentError("message", "path");
129 | const fileError = new FileNotFoundError("path");
130 | const dirError = new DirectoryNotFoundError("path");
131 | expect(fileError instanceof DocumentError).toBe(true);
132 | expect(dirError instanceof DocumentError).toBe(true);
133 | expect(docError instanceof FileNotFoundError).toBe(false);
134 | expect(docError instanceof DirectoryNotFoundError).toBe(false);
135 | expect(fileError instanceof DirectoryNotFoundError).toBe(false);
136 | expect(dirError instanceof FileNotFoundError).toBe(false);
137 | });
138 | });
139 | });
```

## File: DocumentFactory.test.ts, Path: `/root/git/codewrangler/src/infrastructure/filesystem/__tests__/DocumentFactory.test.ts`
```ts
  1 | import * as fs from "fs/promises";
  2 | import * as path from "path";
  3 | import { FILE_TYPE } from "../../../types/type";
  4 | import { documentFactory } from "../DocumentFactory";
  5 | import { fileStatsService } from "../FileStats";
  6 | describe("DocumentFactory", () => {
  7 | const pwd = process.cwd();
  8 | const MOCK_PATH = path.resolve(
  9 | `${pwd}/src/infrastructure/filesystem/__tests__/__mocks__/documentFactory`
 10 | );
 11 | const tempDir = path.join(MOCK_PATH, "temp_test");
 12 | const testFilePath = path.join(tempDir, "test.txt");
 13 | const emptyFilePath = path.join(tempDir, "empty.txt");
 14 | const TEST_CONTENT = "test content";
 15 | const DOCUMENT_ERROR_MESSAGE =
 16 | "Document error at nonexistent: File not found";
 17 | beforeEach(async () => {
 18 | jest.clearAllMocks();
 19 | await fs.mkdir(MOCK_PATH, { recursive: true });
 20 | await fs.mkdir(tempDir, { recursive: true });
 21 | await fs.writeFile(testFilePath, TEST_CONTENT);
 22 | await fs.writeFile(emptyFilePath, "");
 23 | });
 24 | afterEach(async () => {
 25 | await fs.rm(MOCK_PATH, { recursive: true });
 26 | });
 27 | describe("type", () => {
 28 | it('should return "file" for a file path', async () => {
 29 | const result = await documentFactory.type(testFilePath);
 30 | expect(result).toBe(FILE_TYPE.File);
 31 | });
 32 | it('should return "directory" for a directory path', async () => {
 33 | const result = await documentFactory.type(MOCK_PATH);
 34 | expect(result).toBe(FILE_TYPE.Directory);
 35 | });
 36 | it("should throw an error if the path doesn't exist on type method", async () => {
 37 | await expect(documentFactory.type("nonexistent")).rejects.toThrow(
 38 | DOCUMENT_ERROR_MESSAGE
 39 | );
 40 | });
 41 | it("should throw an error if the path is a file", async () => {
 42 | await expect(
 43 | documentFactory.type(path.join(MOCK_PATH, "file2.ts"))
 44 | ).rejects.toThrow(
 45 | `Document error at ${path.join(MOCK_PATH, "file2.ts")}: File not found`
 46 | );
 47 | });
 48 | });
 49 | describe("size", () => {
 50 | it("should return the size of a file", async () => {
 51 | const result = await documentFactory.size(testFilePath);
 52 | expect(result).toStrictEqual(expect.any(Number));
 53 | });
 54 | it("should throw an error if the path doesn't exist on size method", async () => {
 55 | await expect(documentFactory.size("nonexistent")).rejects.toThrow(
 56 | DOCUMENT_ERROR_MESSAGE
 57 | );
 58 | });
 59 | it("should throw an error if the path is a directory", async () => {
 60 | await expect(documentFactory.size(MOCK_PATH)).rejects.toThrow(
 61 | `Document error at ${MOCK_PATH}: Path is a directory`
 62 | );
 63 | });
 64 | it("should throw a zero size if the file is empty", async () => {
 65 | const result = await documentFactory.size(emptyFilePath);
 66 | expect(result).toBe(0);
 67 | });
 68 | });
 69 | describe("readFile", () => {
 70 | it("should read file content iwth default options", async () => {
 71 | const content = await documentFactory.readFile(testFilePath);
 72 | expect(content).toBeDefined();
 73 | expect(content).toBeTruthy();
 74 | expect(typeof content).toBe("string");
 75 | });
 76 | it("should read file with custom escoding", async () => {
 77 | const content = await documentFactory.readFile(testFilePath, {
 78 | encoding: "utf-8"
 79 | });
 80 | expect(content).toBeDefined();
 81 | expect(content).toBeTruthy();
 82 | expect(typeof content).toBe("string");
 83 | });
 84 | it("should throw an error if the path doesn't exist on readFile method", async () => {
 85 | await expect(documentFactory.readFile("nonexistent")).rejects.toThrow(
 86 | DOCUMENT_ERROR_MESSAGE
 87 | );
 88 | });
 89 | it("should throw an error if the path is a directory", async () => {
 90 | await expect(documentFactory.readFile(MOCK_PATH)).rejects.toThrow(
 91 | `Document error at ${MOCK_PATH}: Error: EISDIR: illegal operation on a directory, read`
 92 | );
 93 | });
 94 | });
 95 | describe("readDirectory", () => {
 96 | it("should return directory contents with type information", async () => {
 97 | const contents = await documentFactory.readDirectory(MOCK_PATH);
 98 | expect(Array.isArray(contents)).toBe(true);
 99 | expect(contents.length).toBeGreaterThan(0);
100 | contents.forEach(item => {
101 | expect(item).toMatchObject({
102 | name: expect.any(String),
103 | type: expect.stringMatching(/^(file|directory)$/)
104 | });
105 | });
106 | });
107 | it("should throw error for non-existent directory", async () => {
108 | await expect(
109 | documentFactory.readDirectory("nonexistent")
110 | ).rejects.toThrow();
111 | });
112 | it("should throw error when trying to read a file as directory", async () => {
113 | await expect(
114 | documentFactory.readDirectory(path.join(MOCK_PATH, "file1.ts"))
115 | ).rejects.toThrow();
116 | });
117 | });
118 | describe("exists", () => {
119 | it("should return true for existing file", () => {
120 | const exists = documentFactory.exists(testFilePath);
121 | expect(exists).toBe(true);
122 | });
123 | it("should return true for existing directory", () => {
124 | const exists = documentFactory.exists(MOCK_PATH);
125 | expect(exists).toBe(true);
126 | });
127 | it("should return false for non-existent path", () => {
128 | const exists = documentFactory.exists("nonexistent");
129 | expect(exists).toBe(false);
130 | });
131 | });
132 | describe("remove", () => {
133 | const tempDir = path.join(MOCK_PATH, "temp_remove");
134 | beforeEach(async () => {
135 | await fs.mkdir(tempDir, { recursive: true });
136 | await fs.writeFile(path.join(tempDir, "test.txt"), TEST_CONTENT);
137 | });
138 | afterEach(async () => {
139 | if (await documentFactory.exists(tempDir)) {
140 | await fs.rm(tempDir, { recursive: true });
141 | }
142 | });
143 | it("should remove a file", async () => {
144 | const filePath = path.join(tempDir, "test.txt");
145 | await documentFactory.remove(filePath);
146 | expect(await documentFactory.exists(filePath)).toBe(false);
147 | });
148 | it("should remove a directory recursively", async () => {
149 | await documentFactory.remove(tempDir);
150 | expect(await documentFactory.exists(tempDir)).toBe(false);
151 | });
152 | it("should throw error when path doesn't exist", async () => {
153 | await expect(
154 | documentFactory.remove(path.join(tempDir, "nonexistent"))
155 | ).rejects.toThrow();
156 | });
157 | });
158 | describe("isAbsolute", () => {
159 | it("should return true for absolute path", () => {
160 | expect(documentFactory.isAbsolute(MOCK_PATH)).toBe(true);
161 | });
162 | it("should return false for relative path", () => {
163 | expect(documentFactory.isAbsolute(path.join("file1.ts"))).toBe(false);
164 | });
165 | it("should return false for non-existent path", () => {
166 | expect(documentFactory.isAbsolute("nonexistent")).toBe(false);
167 | });
168 | });
169 | describe("extension", () => {
170 | it("should return extension for file", () => {
171 | expect(documentFactory.extension("file1.ts")).toBe(".ts");
172 | });
173 | it("should return empty string for directory", () => {
174 | expect(documentFactory.extension("directory")).toBe("");
175 | });
176 | it("should return empty string for non-existent file", () => {
177 | expect(documentFactory.extension("nonexistent")).toBe("");
178 | });
179 | it("should return extension for file without two . characters", () => {
180 | expect(documentFactory.extension("file1.test.ts")).toBe(".ts");
181 | });
182 | });
183 | describe("copy", () => {
184 | const tempDir = path.join(MOCK_PATH, "temp_copy");
185 | beforeEach(async () => {
186 | await fs.mkdir(tempDir, { recursive: true });
187 | });
188 | afterEach(async () => {
189 | await fs.rm(tempDir, { recursive: true });
190 | });
191 | it("should copy a file", async () => {
192 | await documentFactory.copy(testFilePath, path.join(tempDir, "file1.ts"));
193 | expect(documentFactory.exists(path.join(tempDir, "file1.ts"))).toBe(true);
194 | });
195 | });
196 | describe("readFileSync", () => {
197 | const testFilePath = path.join(MOCK_PATH, "temp_test", "test.txt");
198 | beforeEach(async () => {
199 | await fs.mkdir(path.join(MOCK_PATH, "temp_test"), { recursive: true });
200 | await fs.writeFile(testFilePath, TEST_CONTENT);
201 | });
202 | afterEach(async () => {
203 | await fs.rm(path.join(MOCK_PATH, "temp_test"), { recursive: true });
204 | });
205 | it("should read file content synchronously with default options", () => {
206 | const content = documentFactory.readFileSync(testFilePath);
207 | expect(content).toBe(TEST_CONTENT);
208 | });
209 | it("should read file with custom encoding", () => {
210 | const content = documentFactory.readFileSync(testFilePath, {
211 | encoding: "utf8"
212 | });
213 | expect(content).toBe(TEST_CONTENT);
214 | });
215 | it("should throw error for non-existent file", () => {
216 | expect(() => documentFactory.readFileSync("nonexistent")).toThrow();
217 | });
218 | it("should throw error when reading directory", () => {
219 | expect(() => documentFactory.readFileSync(tempDir)).toThrow();
220 | });
221 | });
222 | describe("writeFile", () => {
223 | const tempDir = path.join(MOCK_PATH, "temp_write");
224 | const testFilePath = path.join(tempDir, "test.txt");
225 | beforeEach(async () => {
226 | await fs.mkdir(tempDir, { recursive: true });
227 | await fs.writeFile(testFilePath, TEST_CONTENT);
228 | });
229 | afterEach(async () => {
230 | await fs.rm(tempDir, { recursive: true });
231 | });
232 | it("should write content to file with default options", async () => {
233 | const newContent = "new content";
234 | const newFile = path.join(tempDir, "new.txt");
235 | await documentFactory.writeFile(newFile, newContent);
236 | const content = await fs.readFile(newFile, "utf8");
237 | expect(content).toBe(newContent);
238 | });
239 | it("should write content with custom encoding", async () => {
240 | const newContent = "новый контент"; // non-ASCII content
241 | const newFile = path.join(tempDir, "encoded.txt");
242 | await documentFactory.writeFile(newFile, newContent, {
243 | encoding: "utf8"
244 | });
245 | const content = await fs.readFile(newFile, "utf8");
246 | expect(content).toBe(newContent);
247 | });
248 | it("should overwrite existing file", async () => {
249 | const newContent = "overwritten content";
250 | await documentFactory.writeFile(testFilePath, newContent);
251 | const content = await fs.readFile(testFilePath, "utf8");
252 | expect(content).toBe(newContent);
253 | });
254 | it("should throw error when writing to a directory", async () => {
255 | await expect(
256 | documentFactory.writeFile(tempDir, "content")
257 | ).rejects.toThrow();
258 | });
259 | });
260 | describe("appendFile", () => {
261 | const tempDir = path.join(MOCK_PATH, "temp_append");
262 | const testFilePath = path.join(tempDir, "test.txt");
263 | beforeEach(async () => {
264 | await fs.mkdir(tempDir, { recursive: true });
265 | await fs.writeFile(testFilePath, TEST_CONTENT);
266 | });
267 | afterEach(async () => {
268 | await fs.rm(tempDir, { recursive: true });
269 | });
270 | it("should append content to existing file", async () => {
271 | const appendContent = " additional content";
272 | await documentFactory.appendFile(testFilePath, appendContent);
273 | const content = await fs.readFile(testFilePath, "utf8");
274 | expect(content).toBe(TEST_CONTENT + appendContent);
275 | });
276 | it("should create new file if it doesn't exist", async () => {
277 | const newFile = path.join(tempDir, "append.txt");
278 | await documentFactory.appendFile(newFile, TEST_CONTENT);
279 | const content = await fs.readFile(newFile, "utf8");
280 | expect(content).toBe(TEST_CONTENT);
281 | });
282 | it("should throw error when appending to a directory", async () => {
283 | await expect(
284 | documentFactory.appendFile(tempDir, "content")
285 | ).rejects.toThrow();
286 | });
287 | });
288 | describe("readDir", () => {
289 | const tempDir = path.join(MOCK_PATH, "temp_readdir");
290 | beforeEach(async () => {
291 | await fs.mkdir(tempDir, { recursive: true });
292 | await fs.writeFile(path.join(tempDir, "file1.txt"), "content1");
293 | await fs.writeFile(path.join(tempDir, "file2.txt"), "content2");
294 | await fs.mkdir(path.join(tempDir, "subdir"));
295 | });
296 | afterEach(async () => {
297 | await fs.rm(tempDir, { recursive: true });
298 | });
299 | it("should list directory contents", async () => {
300 | const contents = await documentFactory.readDir(tempDir);
301 | expect(contents).toHaveLength(3); // test.txt, file1.txt, file2.txt, subdir
302 | expect(contents).toContain("file1.txt");
303 | expect(contents).toContain("file2.txt");
304 | expect(contents).toContain("subdir");
305 | });
306 | it("should support withFileTypes option", async () => {
307 | const contents = await documentFactory.readDir(tempDir, {
308 | withFileTypes: true
309 | });
310 | expect(contents).toHaveLength(3);
311 | });
312 | it("should throw error for non-existent directory", async () => {
313 | await expect(documentFactory.readDir("nonexistent")).rejects.toThrow();
314 | });
315 | it("should throw error when reading a file as directory", async () => {
316 | await expect(documentFactory.readDir(testFilePath)).rejects.toThrow();
317 | });
318 | });
319 | describe("createDir", () => {
320 | const testFilePath = path.join(MOCK_PATH, "temp_test", "test.txt");
321 | beforeEach(async () => {
322 | await fs.mkdir(path.join(MOCK_PATH, "temp_test"), { recursive: true });
323 | await fs.writeFile(testFilePath, TEST_CONTENT);
324 | });
325 | afterEach(async () => {
326 | await fs.rm(path.join(MOCK_PATH, "temp_test"), { recursive: true });
327 | });
328 | it("should create new directory", async () => {
329 | const newDir = path.join(tempDir, "newdir");
330 | await documentFactory.createDir(newDir);
331 | expect(documentFactory.exists(newDir)).toBe(true);
332 | });
333 | it("should create nested directories with recursive option", async () => {
334 | const nestedDir = path.join(tempDir, "nested/deep/dir");
335 | await documentFactory.createDir(nestedDir, true);
336 | expect(documentFactory.exists(nestedDir)).toBe(true);
337 | });
338 | it("should throw error when creating directory with existing file path", async () => {
339 | await expect(documentFactory.createDir(testFilePath)).rejects.toThrow();
340 | });
341 | });
342 | describe("ensureDirectory", () => {
343 | it("should create directory if it doesn't exist", async () => {
344 | const newDir = path.join(tempDir, "ensure");
345 | await documentFactory.ensureDirectory(newDir);
346 | expect(documentFactory.exists(newDir)).toBe(true);
347 | });
348 | it("should not throw error if directory already exists", async () => {
349 | await expect(
350 | documentFactory.ensureDirectory(tempDir)
351 | ).resolves.not.toThrow();
352 | });
353 | it("should respect custom mode option", async () => {
354 | const newDir = path.join(tempDir, "mode-test");
355 | await documentFactory.ensureDirectory(newDir, { mode: 0o755 });
356 | const stats = await fs.stat(newDir);
357 | const expectedMode =
358 | process.platform === "win32" // on windows, the default mode is 0o666
359 | ? 0o666
360 | : 0o755;
361 | expect(stats.mode & 0o777).toBe(expectedMode);
362 | });
363 | });
364 | describe("baseName", () => {
365 | it("should return file name from path", () => {
366 | expect(documentFactory.baseName("/path/to/file.txt")).toBe("file.txt");
367 | });
368 | it("should return directory name from path", () => {
369 | expect(documentFactory.baseName("/path/to/dir/")).toBe("dir");
370 | });
371 | it("should handle paths with multiple extensions", () => {
372 | expect(documentFactory.baseName("/path/file.test.ts")).toBe(
373 | "file.test.ts"
374 | );
375 | });
376 | });
377 | describe("join", () => {
378 | it("should join path segments", () => {
379 | const joined = documentFactory.join("path", "to", "file.txt");
380 | expect(joined).toBe(path.join("path", "to", "file.txt"));
381 | });
382 | it("should handle absolute paths", () => {
383 | const joined = documentFactory.join("/root", "path", "file.txt");
384 | expect(joined).toBe(path.join("/root", "path", "file.txt"));
385 | });
386 | it("should normalize path separators", () => {
387 | const joined = documentFactory.join("path/to", "file.txt");
388 | expect(joined).toBe(path.join("path/to", "file.txt"));
389 | });
390 | });
391 | describe("edge cases", () => {
392 | const tempDir = path.join(MOCK_PATH, "temp_edge");
393 | const testFilePath = path.join(tempDir, "test.txt");
394 | const symlink = path.join(tempDir, "symlink");
395 | beforeEach(async () => {
396 | await fs.mkdir(tempDir, { recursive: true });
397 | await fs.writeFile(testFilePath, TEST_CONTENT);
398 | });
399 | afterEach(async () => {
400 | await fs.rm(tempDir, { recursive: true });
401 | });
402 | it("should handle symlinks when copying", async () => {
403 | await fs.symlink(testFilePath, symlink); // Create the symlink after the file exists
404 | const copyPath = path.join(tempDir, "copied-symlink");
405 | await documentFactory.copy(symlink, copyPath);
406 | expect(documentFactory.exists(copyPath)).toBe(true);
407 | });
408 | it("should handle empty directory copying", async () => {
409 | const emptyDir = path.join(tempDir, "empty");
410 | await fs.mkdir(emptyDir);
411 | const copyPath = path.join(tempDir, "copied-empty");
412 | await documentFactory.copy(emptyDir, copyPath);
413 | expect(documentFactory.exists(copyPath)).toBe(true);
414 | });
415 | it("should handle files with special characters", async () => {
416 | const specialFile = path.join(tempDir, "special$#@!.txt");
417 | await fs.writeFile(specialFile, "content");
418 | expect(documentFactory.exists(specialFile)).toBe(true);
419 | const stats = await fileStatsService(specialFile);
420 | expect(stats.isFile).toBe(true);
421 | });
422 | });
423 | describe("type error handling", () => {
424 | it("should handle system errors correctly", async () => {
425 | jest.mock("fs/promises", () => ({
426 | ...jest.requireActual("fs/promises"),
427 | stat: jest.fn().mockRejectedValue(new Error("System error"))
428 | }));
429 | await expect(documentFactory.type("/some/path")).rejects.toThrow(
430 | "Document error at /some/path: File not found"
431 | );
432 | });
433 | });
434 | describe("checkAccess", () => {
435 | it("should handle access check failures", async () => {
436 | const result = await documentFactory.checkAccess("/nonexistent/path");
437 | expect(result).toEqual({
438 | readable: false,
439 | writable: false,
440 | executable: false
441 | });
442 | });
443 | });
444 | describe("appendFile error handling", () => {
445 | it("should handle appendFile errors", async () => {
446 | const invalidPath = path.join(tempDir, "nonexistent", "test.txt");
447 | await expect(
448 | documentFactory.appendFile(invalidPath, "content")
449 | ).rejects.toThrow("Document error at");
450 | });
451 | });
452 | describe("copyDir edge cases", () => {
453 | const tempDir = path.join(MOCK_PATH, "temp_edge");
454 | const sourceDir = path.join(tempDir, "source");
455 | const targetDir = path.join(tempDir, "target");
456 | beforeEach(async () => {
457 | await fs.rm(tempDir, { recursive: true, force: true });
458 | await fs.mkdir(tempDir, { recursive: true });
459 | });
460 | afterEach(async () => {
461 | await fs.rm(tempDir, { recursive: true, force: true });
462 | });
463 | it("should handle errors during directory creation while copying", async () => {
464 | await fs.mkdir(sourceDir);
465 | await fs.writeFile(path.join(sourceDir, "test.txt"), TEST_CONTENT);
466 | const originalEnsureDirectory = documentFactory.ensureDirectory;
467 | documentFactory.ensureDirectory = jest
468 | .fn()
469 | .mockRejectedValue(new Error("Permission denied"));
470 | await expect(
471 | documentFactory.copyDir(sourceDir, targetDir)
472 | ).rejects.toThrow();
473 | documentFactory.ensureDirectory = originalEnsureDirectory;
474 | });
475 | it("should handle nested directory structures correctly", async () => {
476 | const nestedDir = path.join(sourceDir, "nested");
477 | await fs.mkdir(sourceDir);
478 | await fs.mkdir(nestedDir);
479 | await fs.writeFile(path.join(sourceDir, "test1.txt"), "content1");
480 | await fs.writeFile(path.join(nestedDir, "test2.txt"), "content2");
481 | await documentFactory.copyDir(sourceDir, targetDir);
482 | expect(documentFactory.exists(path.join(targetDir, "test1.txt"))).toBe(
483 | true
484 | );
485 | expect(
486 | documentFactory.exists(path.join(targetDir, "nested", "test2.txt"))
487 | ).toBe(true);
488 | });
489 | });
490 | });
```

## File: FileStats.test.ts, Path: `/root/git/codewrangler/src/infrastructure/filesystem/__tests__/FileStats.test.ts`
```ts
 1 | import * as fs from "fs/promises";
 2 | import * as path from "path";
 3 | import { fileStatsService } from "../FileStats";
 4 | describe("FileStatsService", () => {
 5 | const pwd = process.cwd();
 6 | const MOCK_PATH = path.resolve(
 7 | `${pwd}/src/infrastructure/filesystem/__tests__/__mocks__/stats`
 8 | );
 9 | const TEST_CONTENT = "test content";
10 | const testFilePath = path.join(MOCK_PATH, "test.txt");
11 | beforeEach(async () => {
12 | await fs.mkdir(MOCK_PATH, { recursive: true });
13 | await fs.writeFile(testFilePath, TEST_CONTENT);
14 | });
15 | afterEach(async () => {
16 | await fs.rm(MOCK_PATH, { recursive: true });
17 | });
18 | describe("getStats", () => {
19 | it("should return complete file statistics", async () => {
20 | const stats = await fileStatsService(testFilePath);
21 | expect(stats).toMatchObject({
22 | size: expect.any(Number),
23 | created: expect.any(Object),
24 | modified: expect.any(Object),
25 | accessed: expect.any(Object),
26 | isDirectory: false,
27 | isFile: true,
28 | permissions: {
29 | readable: true,
30 | writable: expect.any(Boolean),
31 | executable: expect.any(Boolean)
32 | }
33 | });
34 | });
35 | it("should return directory statistics", async () => {
36 | const stats = await fileStatsService(MOCK_PATH);
37 | expect(stats).toMatchObject({
38 | size: expect.any(Number),
39 | isDirectory: true,
40 | isFile: false
41 | });
42 | });
43 | it("should throw error for non-existent path", async () => {
44 | await expect(fileStatsService("nonexistent")).rejects.toThrow(
45 | "Document error at nonexistent: File not found"
46 | );
47 | });
48 | });
49 | });
```

## File: JsonReadert.test.ts, Path: `/root/git/codewrangler/src/infrastructure/filesystem/__tests__/JsonReadert.test.ts`
```ts
 1 | import * as fs from "fs/promises";
 2 | import * as path from "path";
 3 | import { jsonReader } from "../JsonReader";
 4 | describe("jsonReader", () => {
 5 | const pwd = process.cwd();
 6 | const MOCK_PATH = path.resolve(
 7 | `${pwd}/src/infrastructure/filesystem/__tests__/__mocks__/json`
 8 | );
 9 | const TEST_CONTENT = JSON.stringify({ key: "value" });
10 | const TEST_FILE_NAME = "test.json";
11 | beforeEach(async () => {
12 | await fs.mkdir(MOCK_PATH, { recursive: true });
13 | await fs.writeFile(path.join(MOCK_PATH, TEST_FILE_NAME), TEST_CONTENT);
14 | });
15 | afterEach(async () => {
16 | await fs.rm(MOCK_PATH, { recursive: true });
17 | });
18 | describe("readJsonSync", () => {
19 | const jsonFilePath = path.join(MOCK_PATH, TEST_FILE_NAME);
20 | it("should successfully read and parse JSON file", async () => {
21 | const result = await jsonReader(jsonFilePath);
22 | expect(result).toEqual({ key: "value" });
23 | });
24 | it("should throw error for non-existent file", async () => {
25 | await expect(jsonReader("/nonexistent.json")).rejects.toThrow(
26 | `Document error at /nonexistent.json: File not found`
27 | );
28 | });
29 | });
30 | });
```

## File: TemplateEngine.test.ts, Path: `/root/git/codewrangler/src/infrastructure/templates/__tests__/TemplateEngine.test.ts`
```ts
  1 | import { z } from "zod";
  2 | import { logger } from "../../../utils/logger";
  3 | import { documentFactory } from "../../filesystem/DocumentFactory";
  4 | import { Template } from "../TemplateEngine";
  5 | jest.mock("../../filesystem/DocumentFactory", () => ({
  6 | documentFactory: {
  7 | readFile: jest.fn()
  8 | }
  9 | }));
 10 | jest.mock("../../../utils/logger", () => ({
 11 | logger: {
 12 | warn: jest.fn() // Mock the warn function
 13 | }
 14 | }));
 15 | describe("Template", () => {
 16 | const basicSchema = z.object({
 17 | TITLE: z.string(),
 18 | COUNT: z.number(),
 19 | ACTIVE: z.boolean().optional()
 20 | });
 21 | const TEMPLATE_PATH = "test/template";
 22 | beforeEach(() => {
 23 | jest.clearAllMocks();
 24 | });
 25 | describe("Constructor and Basic Properties", () => {
 26 | it("should create a new template instance", () => {
 27 | const template = new Template("page", basicSchema);
 28 | expect(template).toBeInstanceOf(Template);
 29 | });
 30 | });
 31 | describe("load", () => {
 32 | const mockContent =
 33 | "Hello {{TITLE}}, Count: {{COUNT}}, Active: {{ACTIVE}}, Extra: {{EXTRA}}";
 34 | beforeEach(() => {
 35 | (documentFactory.readFile as jest.Mock).mockResolvedValue(mockContent);
 36 | });
 37 | it("should load template content successfully", async () => {
 38 | const template = new Template("page", basicSchema);
 39 | await template.load(TEMPLATE_PATH);
 40 | expect(template.content).toBe(mockContent);
 41 | });
 42 | it("should handle additional fields during load", async () => {
 43 | const template = new Template("page", basicSchema);
 44 | const additionalFields = {
 45 | EXTRA: z.string()
 46 | };
 47 | await template.load(TEMPLATE_PATH, additionalFields);
 48 | expect(template.content).toBe(mockContent);
 49 | });
 50 | it("should throw error when required tokens are missing", async () => {
 51 | (documentFactory.readFile as jest.Mock).mockResolvedValue(
 52 | "No tokens here"
 53 | );
 54 | const template = new Template("page", basicSchema);
 55 | await template.load(TEMPLATE_PATH);
 56 | expect(logger.warn).toHaveBeenCalledWith(
 57 | "Missing required tokens in page template: TITLE, COUNT, ACTIVE"
 58 | );
 59 | });
 60 | it("should throw error when DocumentFactory fails", async () => {
 61 | (documentFactory.readFile as jest.Mock).mockRejectedValue(
 62 | new Error("File read error")
 63 | );
 64 | const template = new Template("page", basicSchema);
 65 | await expect(template.load(TEMPLATE_PATH)).rejects.toThrow(
 66 | "File read error"
 67 | );
 68 | });
 69 | });
 70 | describe("content", () => {
 71 | it("should throw error when accessing content before loading", () => {
 72 | const template = new Template("page", basicSchema);
 73 | expect(() => template.content).toThrow(
 74 | "Template content is not loaded for page"
 75 | );
 76 | });
 77 | it("should return content after loading", async () => {
 78 | const mockContent = "Hello {{TITLE}}";
 79 | (documentFactory.readFile as jest.Mock).mockResolvedValue(mockContent);
 80 | const template = new Template("page", basicSchema);
 81 | await template.load(TEMPLATE_PATH);
 82 | expect(template.content).toBe(mockContent);
 83 | });
 84 | });
 85 | describe("create", () => {
 86 | it("should create and load template in one step", async () => {
 87 | const mockContent =
 88 | "Hello {{TITLE}}, Count: {{COUNT}}, Active: {{ACTIVE}}";
 89 | (documentFactory.readFile as jest.Mock).mockResolvedValue(mockContent);
 90 | const template = await Template.create(
 91 | "page",
 92 | basicSchema,
 93 | TEMPLATE_PATH
 94 | );
 95 | expect(template).toBeInstanceOf(Template);
 96 | expect(template.content).toBe(mockContent);
 97 | });
 98 | it("should create template with additional fields", async () => {
 99 | const mockContent = "Hello {{TITLE}}, Extra: {{EXTRA}}";
100 | (documentFactory.readFile as jest.Mock).mockResolvedValue(mockContent);
101 | const additionalFields = {
102 | EXTRA: z.string()
103 | };
104 | const template = await Template.create(
105 | "page",
106 | basicSchema,
107 | TEMPLATE_PATH,
108 | additionalFields
109 | );
110 | expect(template).toBeInstanceOf(Template);
111 | expect(template.content).toBe(mockContent);
112 | });
113 | it("should throw error when creation fails", async () => {
114 | (documentFactory.readFile as jest.Mock).mockRejectedValue(
115 | new Error("Creation failed")
116 | );
117 | await expect(
118 | Template.create("page", basicSchema, TEMPLATE_PATH)
119 | ).rejects.toThrow("Creation failed");
120 | });
121 | });
122 | describe("render", () => {
123 | it("should render template with valid values", async () => {
124 | const mockContent =
125 | "Hello {{TITLE}}, Count: {{COUNT}}, Active: {{ACTIVE}}";
126 | (documentFactory.readFile as jest.Mock).mockResolvedValue(mockContent);
127 | const template = new Template("page", basicSchema);
128 | await template.load(TEMPLATE_PATH);
129 | const rendered = template.render({
130 | TITLE: "World",
131 | COUNT: 42,
132 | ACTIVE: true
133 | });
134 | expect(rendered).toBe("Hello World, Count: 42, Active: true");
135 | });
136 | it("should throw error for invalid values", async () => {
137 | const mockContent = "Hello {{TITLE}}, Count: {{COUNT}}";
138 | (documentFactory.readFile as jest.Mock).mockResolvedValue(mockContent);
139 | const template = new Template("page", basicSchema);
140 | await template.load(TEMPLATE_PATH);
141 | expect(() => template.render({ TITLE: 123, COUNT: "invalid" })).toThrow(
142 | "Template content validation failed for page"
143 | );
144 | });
145 | it("should handle missing optional values in template as error", async () => {
146 | const optionalSchema = z.object({
147 | REQUIRED: z.string(),
148 | OPTIONAL: z.string().optional()
149 | });
150 | const mockContent = "{{REQUIRED}} {{OPTIONAL}}";
151 | (documentFactory.readFile as jest.Mock).mockResolvedValue(mockContent);
152 | const template = new Template("page", optionalSchema);
153 | await template.load(TEMPLATE_PATH);
154 | try {
155 | template.render({ REQUIRED: "Hello" });
156 | } catch (error: unknown) {
157 | expect(error).toBeInstanceOf(Error);
158 | expect((error as Error).message).toBe(
159 | "Missing required values for tokens: OPTIONAL"
160 | );
161 | }
162 | });
163 | it("should handle complex token patterns", async () => {
164 | const mockContent = "{{TITLE}} {{TITLE}} {{COUNT}} {{TITLE}}";
165 | (documentFactory.readFile as jest.Mock).mockResolvedValue(mockContent);
166 | const template = new Template("page", basicSchema);
167 | await template.load(TEMPLATE_PATH);
168 | const rendered = template.render({
169 | TITLE: "Hello",
170 | COUNT: 42,
171 | ACTIVE: false
172 | });
173 | expect(rendered).toBe("Hello Hello 42 Hello");
174 | });
175 | });
176 | describe("Error Handling", () => {
177 | it("should handle template with no tokens", async () => {
178 | const mockContent = "Hello World";
179 | (documentFactory.readFile as jest.Mock).mockResolvedValue(mockContent);
180 | const template = new Template("page", basicSchema);
181 | await template.load(TEMPLATE_PATH);
182 | const rendered = template.render({});
183 | expect(rendered).toBe(mockContent);
184 | });
185 | it("should handle undefined token values", async () => {
186 | const mockContent = "Hello {{TITLE}}";
187 | (documentFactory.readFile as jest.Mock).mockResolvedValue(mockContent);
188 | const template = new Template("page", basicSchema);
189 | await template.load(TEMPLATE_PATH);
190 | try {
191 | template.render({});
192 | } catch (error: unknown) {
193 | expect(error).toBeInstanceOf(Error);
194 | expect((error as Error).message).toBe(
195 | "Missing required values for tokens: TITLE"
196 | );
197 | }
198 | });
199 | });
200 | });
```

## File: DocumentTreeBuild.test.ts, Path: `/root/git/codewrangler/src/services/builder/__tests__/DocumentTreeBuild.test.ts`
```ts
  1 | import { RenderableDirectory } from "../../../core/entities/NodeDirectory";
  2 | import { RenderableFile } from "../../../core/entities/NodeFile";
  3 | import { FILE_TYPE } from "../../../types/type";
  4 | import { Config } from "../../../utils/config";
  5 | import { logger } from "../../../utils/logger";
  6 | import { DocumentTreeBuilder } from "../DocumentTreeBuilder";
  7 | import { NodeTreeBuilder } from "../NodeTreeBuilder";
  8 | jest.mock("../NodeTreeBuilder");
  9 | jest.mock("../../../core/entities/NodeDirectory");
 10 | jest.mock("../../../core/entities/NodeFile");
 11 | jest.mock("../../../utils/logger");
 12 | jest.mock("../../../utils/config");
 13 | describe("DocumentTreeBuilder", () => {
 14 | let mockConfig: jest.Mocked<Config>;
 15 | let documentTreeBuilder: DocumentTreeBuilder;
 16 | let mockNodeTreeBuilder: jest.Mocked<NodeTreeBuilder>;
 17 | const TEMPLATE_PATH = "/test/test.txt";
 18 | beforeEach(() => {
 19 | jest.clearAllMocks();
 20 | mockConfig = {
 21 | get: jest.fn()
 22 | } as unknown as jest.Mocked<Config>;
 23 | mockNodeTreeBuilder = {
 24 | build: jest.fn()
 25 | } as unknown as jest.Mocked<NodeTreeBuilder>;
 26 | (NodeTreeBuilder as jest.Mock).mockImplementation(
 27 | () => mockNodeTreeBuilder
 28 | );
 29 | documentTreeBuilder = new DocumentTreeBuilder(mockConfig);
 30 | });
 31 | describe("build", () => {
 32 | it("should successfully build a document tree with a single file", async () => {
 33 | const mockFileNode = {
 34 | name: "test.txt",
 35 | path: TEMPLATE_PATH,
 36 | type: FILE_TYPE.File
 37 | };
 38 | mockNodeTreeBuilder.build.mockResolvedValue(mockFileNode);
 39 | (RenderableFile as jest.Mock).mockImplementation(() => ({
 40 | bundle: jest.fn().mockResolvedValue(undefined)
 41 | }));
 42 | await documentTreeBuilder.build();
 43 | expect(mockNodeTreeBuilder.build).toHaveBeenCalledTimes(1);
 44 | expect(RenderableFile).toHaveBeenCalledWith("test.txt", TEMPLATE_PATH);
 45 | });
 46 | it("should successfully build a document tree with a directory structure", async () => {
 47 | const mockTree = {
 48 | name: "root",
 49 | path: "/test",
 50 | type: FILE_TYPE.Directory,
 51 | children: [
 52 | {
 53 | name: "test.txt",
 54 | path: TEMPLATE_PATH,
 55 | type: FILE_TYPE.File
 56 | },
 57 | {
 58 | name: "subdir",
 59 | path: "/test/subdir",
 60 | type: FILE_TYPE.Directory,
 61 | children: [
 62 | {
 63 | name: "subfile.txt",
 64 | path: "/test/subdir/subfile.txt",
 65 | type: FILE_TYPE.File
 66 | }
 67 | ]
 68 | }
 69 | ]
 70 | };
 71 | mockNodeTreeBuilder.build.mockResolvedValue(mockTree);
 72 | const mockDirectory = {
 73 | addChild: jest.fn().mockResolvedValue(undefined),
 74 | bundle: jest.fn().mockResolvedValue(undefined)
 75 | };
 76 | (RenderableDirectory as jest.Mock).mockImplementation(
 77 | () => mockDirectory
 78 | );
 79 | (RenderableFile as jest.Mock).mockImplementation(() => ({
 80 | bundle: jest.fn().mockResolvedValue(undefined)
 81 | }));
 82 | await documentTreeBuilder.build();
 83 | expect(mockNodeTreeBuilder.build).toHaveBeenCalledTimes(1);
 84 | expect(RenderableDirectory).toHaveBeenCalledTimes(2);
 85 | expect(RenderableFile).toHaveBeenCalledTimes(2);
 86 | expect(mockDirectory.addChild).toHaveBeenCalledTimes(3);
 87 | });
 88 | it("should handle errors during tree building", async () => {
 89 | const error = new Error("Build failed");
 90 | mockNodeTreeBuilder.build.mockRejectedValue(error);
 91 | await expect(documentTreeBuilder.build()).rejects.toThrow("Build failed");
 92 | expect(logger.error).toHaveBeenCalledWith(
 93 | "Error building document tree",
 94 | error
 95 | );
 96 | });
 97 | it("should handle errors during document structure creation", async () => {
 98 | const mockTree = {
 99 | name: "root",
100 | path: "/test",
101 | type: FILE_TYPE.Directory,
102 | children: [
103 | {
104 | name: "test.txt",
105 | path: TEMPLATE_PATH,
106 | type: FILE_TYPE.File
107 | }
108 | ]
109 | };
110 | mockNodeTreeBuilder.build.mockResolvedValue(mockTree);
111 | (RenderableDirectory as jest.Mock).mockImplementation(() => {
112 | throw new Error("Failed to create directory");
113 | });
114 | await expect(documentTreeBuilder.build()).rejects.toThrow(
115 | "Failed to create directory"
116 | );
117 | expect(logger.error).toHaveBeenCalled();
118 | });
119 | it("should handle errors during bundle process", async () => {
120 | const mockTree = {
121 | name: "root",
122 | path: "/test",
123 | type: FILE_TYPE.Directory,
124 | children: []
125 | };
126 | mockNodeTreeBuilder.build.mockResolvedValue(mockTree);
127 | const mockDirectory = {
128 | addChild: jest.fn().mockResolvedValue(undefined),
129 | bundle: jest.fn().mockRejectedValue(new Error("Bundle failed"))
130 | };
131 | (RenderableDirectory as jest.Mock).mockImplementation(
132 | () => mockDirectory
133 | );
134 | await expect(documentTreeBuilder.build()).rejects.toThrow(
135 | "Bundle failed"
136 | );
137 | expect(logger.error).toHaveBeenCalled();
138 | });
139 | it("should handle empty file trees", async () => {
140 | const mockTree = {
141 | name: "root",
142 | path: "/test",
143 | type: FILE_TYPE.Directory,
144 | children: []
145 | };
146 | mockNodeTreeBuilder.build.mockResolvedValue(mockTree);
147 | const mockDirectory = {
148 | addChild: jest.fn().mockResolvedValue(undefined),
149 | bundle: jest.fn().mockResolvedValue(undefined)
150 | };
151 | (RenderableDirectory as jest.Mock).mockImplementation(
152 | () => mockDirectory
153 | );
154 | await documentTreeBuilder.build();
155 | expect(mockDirectory.addChild).not.toHaveBeenCalled();
156 | expect(mockDirectory.bundle).toHaveBeenCalled();
157 | });
158 | });
159 | });
```

## File: FileHidden.test.ts, Path: `/root/git/codewrangler/src/services/builder/__tests__/FileHidden.test.ts`
```ts
  1 | import { Config } from "../../../utils/config";
  2 | import FileHidden from "../FileHidden";
  3 | jest.mock("../../../utils/config", () => ({
  4 | Config: {
  5 | load: jest.fn()
  6 | }
  7 | }));
  8 | describe("FileHidden", () => {
  9 | let mockConfig: jest.Mocked<Config>;
 10 | let fileHidden: FileHidden;
 11 | beforeEach(() => {
 12 | mockConfig = {
 13 | get: jest.fn()
 14 | } as unknown as jest.Mocked<Config>;
 15 | mockConfig.get.mockImplementation((key: string) => {
 16 | switch (key) {
 17 | case "ignoreHiddenFiles":
 18 | return true;
 19 | case "excludePatterns":
 20 | return ["node_modules/**", "**/*.test.ts", "dist/**"];
 21 | case "additionalIgnoreFiles":
 22 | return [];
 23 | default:
 24 | return undefined;
 25 | }
 26 | });
 27 | fileHidden = new FileHidden(mockConfig);
 28 | });
 29 | describe("shouldExclude", () => {
 30 | describe("hidden files handling", () => {
 31 | it("should exclude hidden files when ignoredHiddenFiles is true", () => {
 32 | expect(fileHidden.shouldExclude(".hidden")).toBe(true);
 33 | expect(fileHidden.shouldExclude(".git")).toBe(true);
 34 | expect(fileHidden.shouldExclude(".vscode")).toBe(true);
 35 | });
 36 | it("should not exclude hidden files when ignoreHiddenFiles is false", () => {
 37 | mockConfig.get.mockImplementation((key: string) =>
 38 | key === "ignoreHiddenFiles" ? false : []
 39 | );
 40 | fileHidden = new FileHidden(mockConfig);
 41 | expect(fileHidden.shouldExclude(".hidden")).toBe(false);
 42 | expect(fileHidden.shouldExclude(".git")).toBe(false);
 43 | expect(fileHidden.shouldExclude(".vscode")).toBe(false);
 44 | });
 45 | });
 46 | describe("exclude patterns handling", () => {
 47 | it("should exclude files matching exclude patterns", () => {
 48 | expect(fileHidden.shouldExclude("node_modules/package/file.ts")).toBe(
 49 | true
 50 | );
 51 | expect(fileHidden.shouldExclude("src/file.test.ts")).toBe(true);
 52 | expect(fileHidden.shouldExclude("dist/file.js")).toBe(true);
 53 | });
 54 | it("should not exclude files not matching exclude patterns", () => {
 55 | expect(fileHidden.shouldExclude("src/component.ts")).toBe(false);
 56 | expect(fileHidden.shouldExclude("package.json")).toBe(false);
 57 | expect(fileHidden.shouldExclude("README.md")).toBe(false);
 58 | });
 59 | it("should handle empty exclude patterns", () => {
 60 | mockConfig.get.mockImplementation((key: string) =>
 61 | key === "excludePatterns" ? [] : []
 62 | );
 63 | fileHidden = new FileHidden(mockConfig);
 64 | expect(fileHidden.shouldExclude("node_modules/package/index.js")).toBe(
 65 | false
 66 | );
 67 | expect(fileHidden.shouldExclude("src/component.test.ts")).toBe(false);
 68 | });
 69 | });
 70 | describe("additional ignore files handling", () => {
 71 | it("should exclude files matching additional ignore patterns", () => {
 72 | mockConfig.get.mockImplementation((key: string) => {
 73 | if (key === "additionalIgnoreFiles") {
 74 | return ["*.log", "temp/**"];
 75 | }
 76 | return [];
 77 | });
 78 | fileHidden = new FileHidden(mockConfig);
 79 | expect(fileHidden.shouldExclude("error.log")).toBe(true);
 80 | expect(fileHidden.shouldExclude("temp/cache.json")).toBe(true);
 81 | });
 82 | it("should not exclude files not matching additional ignore patterns", () => {
 83 | mockConfig.get.mockImplementation((key: string) => {
 84 | if (key === "additionalIgnoreFiles") {
 85 | return ["*.log", "temp/**"];
 86 | }
 87 | return [];
 88 | });
 89 | fileHidden = new FileHidden(mockConfig);
 90 | expect(fileHidden.shouldExclude("src/index.ts")).toBe(false);
 91 | expect(fileHidden.shouldExclude("data/cache.json")).toBe(false);
 92 | });
 93 | });
 94 | describe("combined patterns handling", () => {
 95 | beforeEach(() => {
 96 | mockConfig.get.mockImplementation((key: string) => {
 97 | switch (key) {
 98 | case "ignoreHiddenFiles":
 99 | return true;
100 | case "excludePatterns":
101 | return ["*.test.ts", "dist/**"];
102 | case "additionalIgnoreFiles":
103 | return ["*.log", "temp/**"];
104 | default:
105 | return undefined;
106 | }
107 | });
108 | fileHidden = new FileHidden(mockConfig);
109 | });
110 | it("should exclude files matching any exclusion rule", () => {
111 | expect(fileHidden.shouldExclude(".env")).toBe(true);
112 | expect(fileHidden.shouldExclude("component.test.ts")).toBe(true);
113 | expect(fileHidden.shouldExclude("dist/bundle.js")).toBe(true);
114 | expect(fileHidden.shouldExclude("error.log")).toBe(true);
115 | expect(fileHidden.shouldExclude("temp/file.txt")).toBe(true);
116 | });
117 | it("should not exclude files not matching any exclusion rule", () => {
118 | expect(fileHidden.shouldExclude("src/index.ts")).toBe(false);
119 | expect(fileHidden.shouldExclude("package.json")).toBe(false);
120 | expect(fileHidden.shouldExclude("docs/README.md")).toBe(false);
121 | });
122 | });
123 | });
124 | });
```

## File: NodeTreeBuilder.test.ts, Path: `/root/git/codewrangler/src/services/builder/__tests__/NodeTreeBuilder.test.ts`
```ts
  1 | import { documentFactory } from "../../../infrastructure/filesystem/DocumentFactory";
  2 | import { fileStatsService } from "../../../infrastructure/filesystem/FileStats";
  3 | import { FILE_TYPE } from "../../../types/type";
  4 | import { Config } from "../../../utils/config";
  5 | import FileHidden from "../FileHidden";
  6 | import { NodeTreeBuilder } from "../NodeTreeBuilder";
  7 | jest.mock("../../../utils/config");
  8 | jest.mock("../../../infrastructure/filesystem/DocumentFactory");
  9 | jest.mock("../FileHidden");
 10 | jest.mock("../../../infrastructure/filesystem/FileStats");
 11 | describe("NodeTreeBuilder", () => {
 12 | let mockConfig: jest.Mocked<Config>;
 13 | let nodeTreeBuilder: NodeTreeBuilder;
 14 | beforeEach(() => {
 15 | jest.clearAllMocks();
 16 | mockConfig = {
 17 | get: jest.fn()
 18 | } as unknown as jest.Mocked<Config>;
 19 | mockConfig.get.mockImplementation((key: string) => {
 20 | switch (key) {
 21 | case "dir":
 22 | return "/test/dir";
 23 | case "pattern":
 24 | return ".*";
 25 | case "maxDepth":
 26 | return 10;
 27 | case "excludePatterns":
 28 | return ["node_modules/**"];
 29 | case "additionalIgnoreFiles":
 30 | return [];
 31 | default:
 32 | return undefined;
 33 | }
 34 | });
 35 | (FileHidden as jest.Mock).mockImplementation(() => ({
 36 | shouldExclude: jest.fn().mockReturnValue(false)
 37 | }));
 38 | nodeTreeBuilder = new NodeTreeBuilder(mockConfig);
 39 | });
 40 | describe("initialization", () => {
 41 | it("should initialize with correct config values", () => {
 42 | expect(mockConfig.get).toHaveBeenCalledWith("dir");
 43 | expect(mockConfig.get).toHaveBeenCalledWith("pattern");
 44 | expect(mockConfig.get).toHaveBeenCalledWith("maxDepth");
 45 | expect(mockConfig.get).toHaveBeenCalledWith("excludePatterns");
 46 | expect(mockConfig.get).toHaveBeenCalledWith("additionalIgnoreFiles");
 47 | });
 48 | });
 49 | describe("build", () => {
 50 | const SUBDIR_PATH = "/test/dir/subdir";
 51 | it("should throw error if root directory doesn't exist", async () => {
 52 | (documentFactory.exists as jest.Mock).mockReturnValue(false);
 53 | await expect(nodeTreeBuilder.build()).rejects.toThrow(
 54 | "Directory /test/dir does not exist"
 55 | );
 56 | });
 57 | it("should build root node with no children if directory is empty", async () => {
 58 | (documentFactory.exists as jest.Mock).mockReturnValue(true);
 59 | (fileStatsService as jest.Mock).mockResolvedValue({
 60 | isDirectory: true,
 61 | isFile: false,
 62 | size: 0,
 63 | created: new Date(),
 64 | modified: new Date(),
 65 | accessed: new Date(),
 66 | permissions: {
 67 | readable: true,
 68 | writable: true,
 69 | executable: true
 70 | }
 71 | });
 72 | (documentFactory.baseName as jest.Mock).mockReturnValue("dir");
 73 | (documentFactory.readDir as jest.Mock).mockResolvedValue([]);
 74 | const result = await nodeTreeBuilder.build();
 75 | expect(result).toEqual({
 76 | name: "dir",
 77 | path: "/test/dir",
 78 | type: FILE_TYPE.Directory,
 79 | children: []
 80 | });
 81 | });
 82 | it("should build tree with files and directories", async () => {
 83 | (documentFactory.exists as jest.Mock).mockReturnValue(true);
 84 | (documentFactory.baseName as jest.Mock).mockImplementation(path =>
 85 | path.split("/").pop()
 86 | );
 87 | (documentFactory.join as jest.Mock).mockImplementation((...paths) =>
 88 | paths.join("/")
 89 | );
 90 | const mockStats = new Map([
 91 | ["/test/dir", { isDirectory: true, isFile: false }],
 92 | ["/test/dir/file1.txt", { isDirectory: false, isFile: true }],
 93 | [SUBDIR_PATH, { isDirectory: true, isFile: false }],
 94 | [`${SUBDIR_PATH}/file2.txt`, { isDirectory: false, isFile: true }]
 95 | ]);
 96 | (fileStatsService as jest.Mock).mockImplementation(path => ({
 97 | ...mockStats.get(path),
 98 | size: 1000,
 99 | created: new Date(),
100 | modified: new Date(),
101 | accessed: new Date(),
102 | permissions: { readable: true, writable: true, executable: true }
103 | }));
104 | (documentFactory.readDir as jest.Mock)
105 | .mockResolvedValueOnce(["file1.txt", "subdir"])
106 | .mockResolvedValueOnce(["file2.txt"]);
107 | const result = await nodeTreeBuilder.build();
108 | expect(result).toEqual({
109 | name: "dir",
110 | path: "/test/dir",
111 | type: FILE_TYPE.Directory,
112 | children: [
113 | {
114 | name: "file1.txt",
115 | path: "/test/dir/file1.txt",
116 | type: FILE_TYPE.File
117 | },
118 | {
119 | name: "subdir",
120 | path: SUBDIR_PATH,
121 | type: FILE_TYPE.Directory,
122 | children: [
123 | {
124 | name: "file2.txt",
125 | path: `${SUBDIR_PATH}/file2.txt`,
126 | type: FILE_TYPE.File
127 | }
128 | ]
129 | }
130 | ]
131 | });
132 | });
133 | it("should respect maxDepth configuration", async () => {
134 | mockConfig.get.mockImplementation(key =>
135 | key === "maxDepth" ? 1 : mockConfig.get(key)
136 | );
137 | (documentFactory.exists as jest.Mock).mockReturnValue(true);
138 | (documentFactory.baseName as jest.Mock).mockImplementation(path =>
139 | path.split("/").pop()
140 | );
141 | (documentFactory.join as jest.Mock).mockImplementation((...paths) =>
142 | paths.join("/")
143 | );
144 | const mockStats = new Map([
145 | ["/test/dir", { isDirectory: true, isFile: false }],
146 | [SUBDIR_PATH, { isDirectory: true, isFile: false }]
147 | ]);
148 | (fileStatsService as jest.Mock).mockImplementation(path => ({
149 | ...mockStats.get(path),
150 | size: 1000,
151 | created: new Date(),
152 | modified: new Date(),
153 | accessed: new Date(),
154 | permissions: { readable: true, writable: true, executable: true }
155 | }));
156 | (documentFactory.readDir as jest.Mock).mockResolvedValue(["subdir"]);
157 | const result = await nodeTreeBuilder.build();
158 | expect(result).toEqual({
159 | name: "dir",
160 | path: "/test/dir",
161 | type: FILE_TYPE.Directory,
162 | children: [
163 | {
164 | name: "subdir",
165 | path: SUBDIR_PATH,
166 | type: FILE_TYPE.Directory,
167 | children: [
168 | {
169 | name: "subdir",
170 | path: `${SUBDIR_PATH}/subdir`,
171 | type: FILE_TYPE.File
172 | }
173 | ]
174 | }
175 | ]
176 | });
177 | });
178 | it("should handle file exclusion", async () => {
179 | (documentFactory.exists as jest.Mock).mockReturnValue(true);
180 | (documentFactory.baseName as jest.Mock).mockImplementation(path =>
181 | path.split("/").pop()
182 | );
183 | (documentFactory.join as jest.Mock).mockImplementation((...paths) =>
184 | paths.join("/")
185 | );
186 | const mockFileHidden = {
187 | shouldExclude: jest
188 | .fn()
189 | .mockReturnValueOnce(false) // include.txt
190 | .mockReturnValueOnce(true) // exclude.txt
191 | };
192 | (FileHidden as jest.Mock).mockImplementation(() => mockFileHidden);
193 | (fileStatsService as jest.Mock).mockImplementation(path => ({
194 | isDirectory: path === "/test/dir",
195 | isFile: path !== "/test/dir",
196 | size: 1000,
197 | created: new Date(),
198 | modified: new Date(),
199 | accessed: new Date(),
200 | permissions: { readable: true, writable: true, executable: true }
201 | }));
202 | (documentFactory.readDir as jest.Mock).mockResolvedValue([
203 | "include.txt",
204 | "exclude.txt"
205 | ]);
206 | const result = await nodeTreeBuilder.build();
207 | expect(result.children).toHaveLength(2);
208 | const children = result.children;
209 | expect(children).not.toBeNull();
210 | if (children) {
211 | const child1 = children[0];
212 | const child2 = children[1];
213 | expect(child1?.name).toBe("include.txt");
214 | expect(child2?.name).toBe("exclude.txt");
215 | }
216 | });
217 | });
218 | });
```

## File: RenderHTMLStrategy.test.ts, Path: `/root/git/codewrangler/src/services/renderer/__tests__/RenderHTMLStrategy.test.ts`
```ts
  1 | import { NodeFile } from "../../../core/entities/NodeFile";
  2 | import { Template } from "../../../infrastructure/templates/TemplateEngine";
  3 | import { Config } from "../../../utils/config";
  4 | import { OUTPUT_FORMATS } from "../../../utils/config/schema";
  5 | import { RenderHTMLStrategy } from "../strategies/HTMLStrategy";
  6 | jest.mock("../../../core/entities/NodeFile");
  7 | jest.mock("../../../infrastructure/templates/TemplateEngine");
  8 | jest.mock("../../../utils/config");
  9 | describe("RenderHTMLStrategy", () => {
 10 | let strategy: RenderHTMLStrategy;
 11 | let mockConfig: jest.Mocked<Config>;
 12 | let mockTemplatePage: jest.Mocked<Template>;
 13 | let mockTemplateDirectory: jest.Mocked<Template>;
 14 | let mockTemplateFile: jest.Mocked<Template>;
 15 | let mockFile: jest.Mocked<NodeFile>;
 16 | beforeEach(() => {
 17 | jest.clearAllMocks();
 18 | mockConfig = {
 19 | get: jest.fn()
 20 | } as unknown as jest.Mocked<Config>;
 21 | mockTemplatePage = {
 22 | content: "<html><body>{{CONTENT}}</body></html>",
 23 | render: jest.fn().mockReturnValue("rendered page")
 24 | } as unknown as jest.Mocked<Template>;
 25 | mockTemplateDirectory = {
 26 | content: "<div class='directory'>{{DIRECTORY_CONTENT}}</div>",
 27 | render: jest.fn().mockReturnValue("rendered directory")
 28 | } as unknown as jest.Mocked<Template>;
 29 | mockTemplateFile = {
 30 | content: "<div class='file'>{{FILE_CONTENTS}}</div>",
 31 | render: jest.fn().mockReturnValue("rendered file")
 32 | } as unknown as jest.Mocked<Template>;
 33 | mockFile = {
 34 | name: "test.ts",
 35 | extension: ".ts",
 36 | content: "const test = 'hello';",
 37 | path: "/test/test.ts",
 38 | deep: 1,
 39 | size: 100,
 40 | props: {}
 41 | } as unknown as jest.Mocked<NodeFile>;
 42 | strategy = new RenderHTMLStrategy(
 43 | mockConfig,
 44 | mockTemplatePage,
 45 | mockTemplateDirectory,
 46 | mockTemplateFile
 47 | );
 48 | });
 49 | describe("initialization", () => {
 50 | it("should be instantiated with correct output format", () => {
 51 | expect(strategy.getName()).toBe(OUTPUT_FORMATS.html);
 52 | });
 53 | });
 54 | describe("file rendering", () => {
 55 | it("should render file with HTML code block", () => {
 56 | strategy.renderFile(mockFile);
 57 | expect(mockTemplateFile.render).toHaveBeenCalledWith({
 58 | FILE_NAME: "test.ts",
 59 | FILE_EXTENSION: ".ts",
 60 | FILE_SIZE: 100,
 61 | FILE_DEPTH: 1,
 62 | FILE_LINES: 0,
 63 | FILE_PATH: "/test/test.ts",
 64 | FILE_CONTENTS: "const test = 'hello';",
 65 | ...mockFile.props
 66 | });
 67 | });
 68 | });
 69 | describe("code block formatting", () => {
 70 | it("should format code block with language", () => {
 71 | const content = "test content";
 72 | const result = strategy["processCodeBlock"](content, "typescript");
 73 | expect(result).toBe(
 74 | '<pre><code class="language-typescript">test content</code></pre>'
 75 | );
 76 | });
 77 | it("should format code block without language", () => {
 78 | const content = "test content";
 79 | const result = strategy["processCodeBlock"](content, "");
 80 | expect(result).toBe(
 81 | '<pre><code class="language-">test content</code></pre>'
 82 | );
 83 | });
 84 | it("should handle empty content", () => {
 85 | const result = strategy["processCodeBlock"]("", "typescript");
 86 | expect(result).toBe(
 87 | '<pre><code class="language-typescript"></code></pre>'
 88 | );
 89 | });
 90 | it("should handle multi-line content", () => {
 91 | const content = "line1\nline2\nline3";
 92 | const result = strategy["processCodeBlock"](content, "typescript");
 93 | expect(result).toBe(
 94 | '<pre><code class="language-typescript">line1\nline2\nline3</code></pre>'
 95 | );
 96 | });
 97 | });
 98 | describe("HTML escaping", () => {
 99 | it("should escape HTML special characters", () => {
100 | const content = "<div>Test & 'quote' & \"double\" ></div>";
101 | const result = strategy["escapeHtml"](content);
102 | expect(result).toBe(
103 | "&lt;div&gt;Test &amp; &#039;quote&#039; &amp; &quot;double&quot; &gt;&lt;/div&gt;"
104 | );
105 | });
106 | it("should handle content with no special characters", () => {
107 | const content = "Normal text";
108 | const result = strategy["escapeHtml"](content);
109 | expect(result).toBe("Normal text");
110 | });
111 | it("should handle empty content", () => {
112 | const result = strategy["escapeHtml"]("");
113 | expect(result).toBe("");
114 | });
115 | it("should properly escape code snippets", () => {
116 | const code = `if (x < y && y > 0) { console.log("test"); }`;
117 | const result = strategy["escapeHtml"](code);
118 | expect(result).toBe(
119 | "if (x &lt; y &amp;&amp; y &gt; 0) { console.log(&quot;test&quot;); }"
120 | );
121 | });
122 | });
123 | });
```

## File: RenderMarkdownStrategy.test.ts, Path: `/root/git/codewrangler/src/services/renderer/__tests__/RenderMarkdownStrategy.test.ts`
```ts
 1 | import { NodeFile } from "../../../core/entities/NodeFile";
 2 | import { Template } from "../../../infrastructure/templates/TemplateEngine";
 3 | import { Config } from "../../../utils/config";
 4 | import { OUTPUT_FORMATS } from "../../../utils/config/schema";
 5 | import { RenderMarkdownStrategy } from "../strategies/MarkdownStrategy";
 6 | jest.mock("../../../core/entities/NodeFile");
 7 | jest.mock("../../../infrastructure/templates/TemplateEngine");
 8 | jest.mock("../../../utils/config");
 9 | describe("RenderMarkdownStrategy", () => {
10 | let strategy: RenderMarkdownStrategy;
11 | let mockConfig: jest.Mocked<Config>;
12 | let mockTemplatePage: jest.Mocked<Template>;
13 | let mockTemplateDirectory: jest.Mocked<Template>;
14 | let mockTemplateFile: jest.Mocked<Template>;
15 | let mockFile: jest.Mocked<NodeFile>;
16 | beforeEach(() => {
17 | jest.clearAllMocks();
18 | mockConfig = {
19 | get: jest.fn()
20 | } as unknown as jest.Mocked<Config>;
21 | mockTemplatePage = {
22 | content: "# {{PROJECT_NAME}}\n{{CONTENT}}",
23 | render: jest.fn().mockReturnValue("rendered page")
24 | } as unknown as jest.Mocked<Template>;
25 | mockTemplateDirectory = {
26 | content: "## {{DIRECTORY_NAME}}\n{{DIRECTORY_CONTENT}}",
27 | render: jest.fn().mockReturnValue("rendered directory")
28 | } as unknown as jest.Mocked<Template>;
29 | mockTemplateFile = {
30 | content:
31 | "### {{FILE_NAME}}\n```{{FILE_EXTENSION}}\n{{FILE_CONTENTS}}\n```",
32 | render: jest.fn().mockReturnValue("rendered file")
33 | } as unknown as jest.Mocked<Template>;
34 | mockFile = {
35 | name: "test.ts",
36 | extension: ".ts",
37 | content: "const test = 'hello';",
38 | path: "/test/test.ts",
39 | deep: 1,
40 | size: 100,
41 | props: {}
42 | } as unknown as jest.Mocked<NodeFile>;
43 | strategy = new RenderMarkdownStrategy(
44 | mockConfig,
45 | mockTemplatePage,
46 | mockTemplateDirectory,
47 | mockTemplateFile
48 | );
49 | });
50 | describe("initialization", () => {
51 | it("should be instantiated with correct output format", () => {
52 | expect(strategy.getName()).toBe(OUTPUT_FORMATS.markdown);
53 | });
54 | });
55 | describe("file rendering", () => {
56 | it("should render file with markdown code block", () => {
57 | strategy.renderFile(mockFile);
58 | expect(mockTemplateFile.render).toHaveBeenCalledWith({
59 | FILE_NAME: "test.ts",
60 | FILE_EXTENSION: ".ts",
61 | FILE_SIZE: 100,
62 | FILE_DEPTH: 1,
63 | FILE_LINES: 0,
64 | FILE_PATH: "/test/test.ts",
65 | FILE_CONTENTS: "const test = 'hello';",
66 | ...mockFile.props
67 | });
68 | });
69 | });
70 | describe("code block formatting", () => {
71 | it("should format code block with language", () => {
72 | const content = "test content";
73 | const result = strategy["processCodeBlock"](content, "typescript");
74 | expect(result).toBe("```typescript\ntest content\n```");
75 | });
76 | it("should format code block without language", () => {
77 | const content = "test content";
78 | const result = strategy["processCodeBlock"](content, "");
79 | expect(result).toBe("```\ntest content\n```");
80 | });
81 | it("should handle empty content", () => {
82 | const result = strategy["processCodeBlock"]("", "typescript");
83 | expect(result).toBe("```typescript\n\n```");
84 | });
85 | it("should handle multi-line content", () => {
86 | const content = "line1\nline2\nline3";
87 | const result = strategy["processCodeBlock"](content, "typescript");
88 | expect(result).toBe("```typescript\nline1\nline2\nline3\n```");
89 | });
90 | });
91 | });
```

## File: RenderStrategy.test.ts, Path: `/root/git/codewrangler/src/services/renderer/__tests__/RenderStrategy.test.ts`
```ts
  1 | import { NodeDirectory } from "../../../core/entities/NodeDirectory";
  2 | import { NodeFile } from "../../../core/entities/NodeFile";
  3 | import { Template } from "../../../infrastructure/templates/TemplateEngine";
  4 | import { Config } from "../../../utils/config";
  5 | import { RenderBaseStrategy } from "../RenderStrategy";
  6 | jest.mock("../../../core/entities/NodeFile");
  7 | jest.mock("../../../core/entities/NodeDirectory");
  8 | jest.mock("../../../infrastructure/templates/TemplateEngine");
  9 | jest.mock("../../../utils/config");
 10 | class TestRenderStrategy extends RenderBaseStrategy {
 11 | public constructor(
 12 | config: Config,
 13 | templatePage: Template,
 14 | templateDirectory: Template,
 15 | templateFile: Template
 16 | ) {
 17 | super(config, "test", templatePage, templateDirectory, templateFile);
 18 | }
 19 | }
 20 | describe("RenderBaseStrategy", () => {
 21 | const PROJECT_NAME = "Test Project";
 22 | const RENDERED_FILE = "rendered file";
 23 | const RENDERED_DIRECTORY = "rendered directory";
 24 | const RENDERED_PAGE = "rendered page";
 25 | let mockConfig: jest.Mocked<Config>;
 26 | let mockTemplatePage: jest.Mocked<Template>;
 27 | let mockTemplateDirectory: jest.Mocked<Template>;
 28 | let mockTemplateFile: jest.Mocked<Template>;
 29 | let strategy: TestRenderStrategy;
 30 | let mockFile: jest.Mocked<NodeFile>;
 31 | let mockDirectory: jest.Mocked<NodeDirectory>;
 32 | beforeEach(() => {
 33 | jest.clearAllMocks();
 34 | mockConfig = {
 35 | get: jest.fn().mockReturnValue(PROJECT_NAME)
 36 | } as unknown as jest.Mocked<Config>;
 37 | mockTemplatePage = {
 38 | content: "page template",
 39 | render: jest.fn().mockReturnValue(RENDERED_PAGE)
 40 | } as unknown as jest.Mocked<Template>;
 41 | mockTemplateDirectory = {
 42 | content: "directory template",
 43 | render: jest.fn().mockReturnValue(RENDERED_DIRECTORY)
 44 | } as unknown as jest.Mocked<Template>;
 45 | mockTemplateFile = {
 46 | content: "file template",
 47 | render: jest.fn().mockReturnValue(RENDERED_FILE)
 48 | } as unknown as jest.Mocked<Template>;
 49 | mockFile = {
 50 | type: "file",
 51 | name: "test.ts",
 52 | path: "/test/test.ts",
 53 | extension: ".ts",
 54 | content: "test content",
 55 | size: 100,
 56 | deep: 1,
 57 | props: {}
 58 | } as unknown as jest.Mocked<NodeFile>;
 59 | mockDirectory = {
 60 | type: "directory",
 61 | name: "test",
 62 | path: "/test",
 63 | size: 200,
 64 | length: 2,
 65 | deepLength: 3,
 66 | deep: 0,
 67 | children: [],
 68 | props: {}
 69 | } as unknown as jest.Mocked<NodeDirectory>;
 70 | strategy = new TestRenderStrategy(
 71 | mockConfig,
 72 | mockTemplatePage,
 73 | mockTemplateDirectory,
 74 | mockTemplateFile
 75 | );
 76 | });
 77 | describe("render", () => {
 78 | it("should render a directory with nested structure", () => {
 79 | const childFile = {
 80 | ...mockFile,
 81 | name: "child.ts"
 82 | } as unknown as jest.Mocked<NodeFile>;
 83 | const subDirectory = {
 84 | ...mockDirectory,
 85 | name: "subdir",
 86 | children: [childFile]
 87 | } as unknown as jest.Mocked<NodeDirectory>;
 88 | mockDirectory.children = [mockFile, subDirectory];
 89 | const result = strategy.render(mockDirectory);
 90 | expect(mockTemplatePage.render).toHaveBeenCalledWith({
 91 | PROJECT_NAME,
 92 | GENERATION_DATE: expect.any(String),
 93 | DIRECTORY_STRUCTURE: RENDERED_DIRECTORY,
 94 | TOTAL_SIZE: 200,
 95 | CONTENT: RENDERED_DIRECTORY
 96 | });
 97 | expect(result).toBe(RENDERED_PAGE);
 98 | });
 99 | it("should render a single file", () => {
100 | const result = strategy.render(mockFile as NodeFile);
101 | expect(mockTemplatePage.render).toHaveBeenCalledWith({
102 | PROJECT_NAME,
103 | GENERATION_DATE: expect.any(String),
104 | DIRECTORY_STRUCTURE: RENDERED_FILE,
105 | TOTAL_SIZE: 100,
106 | CONTENT: RENDERED_FILE
107 | });
108 | expect(result).toBe(RENDERED_PAGE);
109 | });
110 | it("should render an empty directory", () => {
111 | mockDirectory.children = [];
112 | const result = strategy.render(mockDirectory as NodeDirectory);
113 | expect(mockTemplateDirectory.render).toHaveBeenCalledWith({
114 | DIRECTORY_NAME: "test",
115 | DIRECTORY_PATH: "/test",
116 | DIRECTORY_SIZE: 200,
117 | DIRECTORY_LENGTH: 2,
118 | DIRECTORY_DEEP_LENGTH: 3,
119 | DIRECTORY_DEPTH: 0,
120 | DIRECTORY_CONTENT: "",
121 | ...mockDirectory.props
122 | });
123 | expect(result).toBe(RENDERED_PAGE);
124 | });
125 | });
126 | describe("template handling", () => {
127 | it("should handle file template data", () => {
128 | strategy.render(mockFile as NodeFile);
129 | expect(mockTemplateFile.render).toHaveBeenCalledWith({
130 | FILE_NAME: "test.ts",
131 | FILE_EXTENSION: ".ts",
132 | FILE_SIZE: 100,
133 | FILE_DEPTH: 1,
134 | FILE_LINES: 0,
135 | FILE_PATH: "/test/test.ts",
136 | FILE_CONTENTS: "test content",
137 | ...mockFile.props
138 | });
139 | });
140 | });
141 | describe("disposal", () => {
142 | it("should dispose all templates", () => {
143 | mockTemplatePage.dispose = jest.fn();
144 | mockTemplateDirectory.dispose = jest.fn();
145 | mockTemplateFile.dispose = jest.fn();
146 | strategy.dispose();
147 | expect(mockTemplatePage.dispose).toHaveBeenCalled();
148 | expect(mockTemplateDirectory.dispose).toHaveBeenCalled();
149 | expect(mockTemplateFile.dispose).toHaveBeenCalled();
150 | });
151 | });
152 | describe("name", () => {
153 | it("should return the strategy name", () => {
154 | expect(strategy.getName()).toBe("test");
155 | });
156 | });
157 | });
```

## File: RenderStrategyBuilder.test.ts, Path: `/root/git/codewrangler/src/services/renderer/__tests__/RenderStrategyBuilder.test.ts`
```ts
  1 | import { Template } from "../../../infrastructure/templates/TemplateEngine";
  2 | import { Config, OutputFormatExtension } from "../../../utils/config";
  3 | import { RenderStrategyBuilder } from "../RenderStrategyBuilder";
  4 | import { RenderHTMLStrategy } from "../strategies/HTMLStrategy";
  5 | import { RenderMarkdownStrategy } from "../strategies/MarkdownStrategy";
  6 | jest.mock("../../../infrastructure/templates/TemplateEngine");
  7 | jest.mock("../../../utils/config");
  8 | jest.mock("../strategies/HTMLStrategy");
  9 | jest.mock("../strategies/MarkdownStrategy");
 10 | describe("RenderStrategyBuilder", () => {
 11 | let builder: RenderStrategyBuilder;
 12 | let mockConfig: jest.Mocked<Config>;
 13 | let mockTemplate: jest.Mocked<Template>;
 14 | beforeEach(() => {
 15 | jest.clearAllMocks();
 16 | mockConfig = {
 17 | get: jest.fn()
 18 | } as unknown as jest.Mocked<Config>;
 19 | mockTemplate = {
 20 | content: "template content"
 21 | } as unknown as jest.Mocked<Template>;
 22 | (Template.getTemplateDir as jest.Mock).mockReturnValue("/templates");
 23 | (Template.create as jest.Mock).mockResolvedValue(mockTemplate);
 24 | builder = new RenderStrategyBuilder();
 25 | });
 26 | describe("configuration", () => {
 27 | it("should set and store config", () => {
 28 | const result = builder.setConfig(mockConfig);
 29 | expect(builder["config"]).toBe(mockConfig);
 30 | expect(result).toBe(builder);
 31 | });
 32 | it("should set and store extension", () => {
 33 | const result = builder.setExtension("md");
 34 | expect(builder["extension"]).toBe("md");
 35 | expect(result).toBe(builder);
 36 | });
 37 | it("should set and store name", () => {
 38 | const result = builder.setName("Markdown");
 39 | expect(builder["name"]).toBe("Markdown");
 40 | expect(result).toBe(builder);
 41 | });
 42 | });
 43 | describe("template loading", () => {
 44 | beforeEach(() => {
 45 | builder.setConfig(mockConfig);
 46 | builder.setExtension("md");
 47 | });
 48 | it("should load all required templates", async () => {
 49 | const result = await builder.loadTemplates();
 50 | expect(Template.create).toHaveBeenCalledTimes(3);
 51 | expect(result).toBe(builder);
 52 | expect(builder["templatePage"]).toBeTruthy();
 53 | expect(builder["templateDirectory"]).toBeTruthy();
 54 | expect(builder["templateFile"]).toBeTruthy();
 55 | });
 56 | it("should handle template loading errors", async () => {
 57 | (Template.create as jest.Mock).mockRejectedValue(
 58 | new Error("Load failed")
 59 | );
 60 | await expect(builder.loadTemplates()).rejects.toThrow("Load failed");
 61 | });
 62 | });
 63 | describe("build", () => {
 64 | it("should build Markdown strategy when configured", async () => {
 65 | await setupBuilder("Markdown", "md");
 66 | const result = builder.build();
 67 | expect(result).toBeInstanceOf(RenderMarkdownStrategy);
 68 | });
 69 | it("should build HTML strategy when configured", async () => {
 70 | await setupBuilder("HTML", "html");
 71 | const result = builder.build();
 72 | expect(result).toBeInstanceOf(RenderHTMLStrategy);
 73 | });
 74 | it("should throw error if config is missing", () => {
 75 | expect(() => builder.build()).toThrow("Config is required");
 76 | });
 77 | it("should throw error if extension is missing", () => {
 78 | builder.setConfig(mockConfig);
 79 | expect(() => builder.build()).toThrow("Extension is required");
 80 | });
 81 | it("should throw error if name is missing", () => {
 82 | builder.setConfig(mockConfig);
 83 | builder.setExtension("md");
 84 | expect(() => builder.build()).toThrow("Name is required");
 85 | });
 86 | it("should throw error if templates are not loaded", () => {
 87 | builder.setConfig(mockConfig);
 88 | builder.setExtension("md");
 89 | builder.setName("Markdown");
 90 | expect(() => builder.build()).toThrow(
 91 | "Templates must be loaded before building"
 92 | );
 93 | });
 94 | });
 95 | async function setupBuilder(
 96 | name: string,
 97 | extension: OutputFormatExtension
 98 | ): Promise<void> {
 99 | builder.setConfig(mockConfig).setExtension(extension).setName(name);
100 | await builder.loadTemplates();
101 | }
102 | });
```

## File: Config.test.ts, Path: `/root/git/codewrangler/src/utils/config/__tests__/Config.test.ts`
```ts
  1 | import { documentFactory } from "../../../infrastructure/filesystem/DocumentFactory";
  2 | import { JsonReader } from "../../../infrastructure/filesystem/JsonReader";
  3 | import { logger } from "../../logger/Logger";
  4 | import { Config } from "../Config";
  5 | import { DEFAULT_CONFIG } from "../schema";
  6 | jest.mock("../../../infrastructure/filesystem/DocumentFactory");
  7 | jest.mock("../../logger/Logger", () => ({
  8 | logger: { error: jest.fn() },
  9 | LOG_VALUES: ["ERROR", "WARN", "INFO", "DEBUG"]
 10 | }));
 11 | jest.mock("../../../infrastructure/filesystem/JsonReader");
 12 | describe("Config", () => {
 13 | let config: Config;
 14 | const TEST_OUTPUT_FILE = "new-output";
 15 | beforeEach(async () => {
 16 | jest.clearAllMocks();
 17 | jest.mocked(JsonReader).mockImplementation(
 18 | () =>
 19 | ({
 20 | readJsonSync: jest.fn().mockResolvedValue({}),
 21 | readFileContent: jest.fn(),
 22 | parseJsonContent: jest.fn(),
 23 | validatePath: jest.fn()
 24 | }) as unknown as JsonReader
 25 | );
 26 | (documentFactory.resolve as jest.Mock).mockReturnValue(
 27 | "/test/codewrangler.json"
 28 | );
 29 | Config.destroy();
 30 | config = await Config.load();
 31 | });
 32 | describe("Singleton", () => {
 33 | it("maintains single instance", async () => {
 34 | const instance1 = await Config.load();
 35 | const instance2 = await Config.load();
 36 | expect(instance1).toBe(instance2);
 37 | });
 38 | it("creates new instance after destroy", async () => {
 39 | const instance1 = await Config.load();
 40 | Config.destroy();
 41 | const instance2 = await Config.load();
 42 | expect(instance1).not.toBe(instance2);
 43 | });
 44 | });
 45 | describe("Configuration Loading", () => {
 46 | it("loads default config when no user config exists", async () => {
 47 | jest.mocked(JsonReader).mockImplementation(
 48 | () =>
 49 | ({
 50 | readJsonSync: jest.fn(),
 51 | resolve: jest.fn(),
 52 | validatePath: jest.fn(),
 53 | readFileContent: jest.fn(),
 54 | parseJsonContent: jest.fn()
 55 | }) as unknown as JsonReader
 56 | );
 57 | Config.destroy();
 58 | const newConfig = await Config.load();
 59 | expect(newConfig.getAll()).toEqual(DEFAULT_CONFIG);
 60 | });
 61 | it("loads and merges user config with defaults", async () => {
 62 | const userConfig = {
 63 | outputFile: TEST_OUTPUT_FILE,
 64 | logLevel: "DEBUG" as const
 65 | };
 66 | jest.mocked(JsonReader).mockImplementation(
 67 | () =>
 68 | ({
 69 | readJsonSync: jest.fn().mockResolvedValue(userConfig),
 70 | resolve: jest.fn(),
 71 | validatePath: jest.fn(),
 72 | readFileContent: jest.fn(),
 73 | parseJsonContent: jest.fn()
 74 | }) as unknown as JsonReader
 75 | );
 76 | Config.destroy();
 77 | const newConfig = await Config.load();
 78 | expect(newConfig.get("outputFile")).toBe(TEST_OUTPUT_FILE);
 79 | expect(newConfig.get("logLevel")).toBe("DEBUG");
 80 | });
 81 | it("handles invalid JSON config", async () => {
 82 | jest.mocked(JsonReader).mockImplementation(
 83 | () =>
 84 | ({
 85 | readJsonSync: jest
 86 | .fn()
 87 | .mockRejectedValue(new Error("Invalid JSON")),
 88 | resolve: jest.fn(),
 89 | validatePath: jest.fn(),
 90 | readFileContent: jest.fn(),
 91 | parseJsonContent: jest.fn()
 92 | }) as unknown as JsonReader
 93 | );
 94 | Config.destroy();
 95 | await expect(Config.load()).rejects.toThrow();
 96 | });
 97 | it("validates merged configuration", async () => {
 98 | const invalidConfig = {
 99 | maxFileSize: -1
100 | };
101 | jest.mocked(JsonReader).mockImplementation(
102 | () =>
103 | ({
104 | readJsonSync: jest.fn().mockResolvedValue(invalidConfig),
105 | resolve: jest.fn(),
106 | validatePath: jest.fn(),
107 | readFileContent: jest.fn(),
108 | parseJsonContent: jest.fn()
109 | }) as unknown as JsonReader
110 | );
111 | Config.destroy();
112 | await expect(Config.load()).rejects.toThrow(
113 | "Configuration validation failed"
114 | );
115 | });
116 | });
117 | describe("Configuration Operations", () => {
118 | it("gets configuration values", () => {
119 | expect(config.get("dir")).toBe(DEFAULT_CONFIG.dir);
120 | expect(config.get("pattern")).toBe(DEFAULT_CONFIG.pattern);
121 | });
122 | it("sets configuration values", () => {
123 | config.set("outputFile", TEST_OUTPUT_FILE);
124 | expect(config.get("outputFile")).toBe(TEST_OUTPUT_FILE);
125 | });
126 | it("validates on set", () => {
127 | expect(() => config.set("maxFileSize", -1)).toThrow();
128 | expect(logger.error).toHaveBeenCalled();
129 | });
130 | it("overrides multiple values", () => {
131 | const overrides = {
132 | outputFile: TEST_OUTPUT_FILE,
133 | logLevel: "DEBUG" as const
134 | };
135 | config.override(overrides);
136 | expect(config.get("outputFile")).toBe(TEST_OUTPUT_FILE);
137 | expect(config.get("logLevel")).toBe("DEBUG");
138 | });
139 | it("resets to defaults", () => {
140 | config.set("outputFile", TEST_OUTPUT_FILE);
141 | config.reset();
142 | expect(config.getAll()).toEqual(DEFAULT_CONFIG);
143 | });
144 | });
145 | });
```

## File: Logger.test.ts, Path: `/root/git/codewrangler/src/utils/logger/__tests__/Logger.test.ts`
```ts
  1 | /* eslint-disable no-console */
  2 | import colors from "colors";
  3 | import { Config } from "../../config/Config";
  4 | import { LOG_LEVEL, LOG_VALUES, Logger } from "../Logger";
  5 | jest.mock("../../config/Config");
  6 | jest.spyOn(console, "log").mockImplementation(() => {});
  7 | describe("Logger", () => {
  8 | let logger: Logger;
  9 | let mockConfig: jest.Mocked<Config>;
 10 | beforeEach(() => {
 11 | jest.clearAllMocks();
 12 | mockConfig = {
 13 | get: jest.fn(),
 14 | set: jest.fn()
 15 | } as unknown as jest.Mocked<Config>;
 16 | logger = Logger.load();
 17 | });
 18 | describe("Singleton Pattern", () => {
 19 | it("should create only one instance of Logger", () => {
 20 | const instance1 = Logger.load();
 21 | const instance2 = Logger.load();
 22 | expect(instance1).toBe(instance2);
 23 | });
 24 | });
 25 | describe("Configuration", () => {
 26 | it("should set config correctly", () => {
 27 | const result = logger.setConfig(mockConfig);
 28 | expect(result).toBe(logger);
 29 | expect(logger["config"]).toBe(mockConfig);
 30 | });
 31 | it("should set log level when config is present", () => {
 32 | logger.setConfig(mockConfig);
 33 | const result = logger.setLogLevel("DEBUG");
 34 | expect(result).toBe(logger);
 35 | expect(mockConfig.set).toHaveBeenCalledWith("logLevel", "DEBUG");
 36 | });
 37 | it("should not set log level when config is not present", () => {
 38 | const result = logger.setLogLevel("DEBUG");
 39 | expect(result).toBe(logger);
 40 | expect(mockConfig.set).not.toHaveBeenCalled();
 41 | });
 42 | it("should return ERROR level when config returns undefined", () => {
 43 | logger.setConfig(mockConfig);
 44 | mockConfig.get.mockReturnValue(undefined);
 45 | expect(logger["logLevel"]).toBe(LOG_LEVEL.ERROR);
 46 | });
 47 | it("should return correct log level from config", () => {
 48 | logger.setConfig(mockConfig);
 49 | mockConfig.get.mockReturnValue("DEBUG");
 50 | expect(logger["logLevel"]).toBe(LOG_LEVEL.DEBUG);
 51 | });
 52 | });
 53 | describe("Logging Methods", () => {
 54 | beforeEach(() => {
 55 | logger.setConfig(mockConfig);
 56 | });
 57 | const TEST_ERROR = "Test error";
 58 | describe("error", () => {
 59 | it("should log error messages when level is ERROR or higher", () => {
 60 | mockConfig.get.mockReturnValue("ERROR");
 61 | logger.error(TEST_ERROR);
 62 | expect(console.log).toHaveBeenCalledWith(
 63 | colors.red(`[ERROR] ${TEST_ERROR}`)
 64 | );
 65 | });
 66 | it("should log error with stack trace when error object is provided", () => {
 67 | mockConfig.get.mockReturnValue("ERROR");
 68 | const error = new Error(TEST_ERROR);
 69 | logger.error("Error occurred", error);
 70 | expect(console.log).toHaveBeenCalledWith(
 71 | colors.red("[ERROR] Error occurred")
 72 | );
 73 | expect(console.log).toHaveBeenCalledWith(colors.red(error.stack ?? ""));
 74 | });
 75 | it("should log additional arguments", () => {
 76 | mockConfig.get.mockReturnValue("ERROR");
 77 | logger.error(TEST_ERROR, undefined, { details: "test" });
 78 | expect(console.log).toHaveBeenCalledWith(
 79 | colors.red(`[ERROR] ${TEST_ERROR}`),
 80 | { details: "test" }
 81 | );
 82 | });
 83 | });
 84 | describe("warn", () => {
 85 | it("should log warn messages when level is WARN or higher", () => {
 86 | mockConfig.get.mockReturnValue("WARN");
 87 | logger.warn("Test warning");
 88 | expect(console.log).toHaveBeenCalledWith(
 89 | colors.yellow("[WARN] Test warning")
 90 | );
 91 | });
 92 | it("should not log warn messages when level is ERROR", () => {
 93 | mockConfig.get.mockReturnValue("ERROR");
 94 | logger.warn("Test warning");
 95 | expect(console.log).not.toHaveBeenCalled();
 96 | });
 97 | });
 98 | describe("info", () => {
 99 | it("should log info messages when level is INFO or higher", () => {
100 | mockConfig.get.mockReturnValue("INFO");
101 | logger.info("Test info");
102 | expect(console.log).toHaveBeenCalledWith(
103 | colors.blue("[INFO] Test info")
104 | );
105 | });
106 | it("should not log info messages when level is WARN", () => {
107 | mockConfig.get.mockReturnValue("WARN");
108 | logger.info("Test info");
109 | expect(console.log).not.toHaveBeenCalled();
110 | });
111 | });
112 | describe("debug", () => {
113 | it("should log debug messages when level is DEBUG", () => {
114 | mockConfig.get.mockReturnValue("DEBUG");
115 | logger.debug("Test debug");
116 | expect(console.log).toHaveBeenCalledWith(
117 | colors.gray("[DEBUG] Test debug")
118 | );
119 | });
120 | it("should not log debug messages when level is INFO", () => {
121 | mockConfig.get.mockReturnValue("INFO");
122 | logger.debug("Test debug");
123 | expect(console.log).not.toHaveBeenCalled();
124 | });
125 | });
126 | describe("success", () => {
127 | it("should always log success messages in green", () => {
128 | mockConfig.get.mockReturnValue("ERROR");
129 | logger.success("Operation successful");
130 | expect(console.log).toHaveBeenCalledWith(
131 | colors.green("Operation successful")
132 | );
133 | });
134 | });
135 | describe("log", () => {
136 | it("should always log plain messages without color", () => {
137 | mockConfig.get.mockReturnValue("ERROR");
138 | logger.log("Plain message");
139 | expect(console.log).toHaveBeenCalledWith("Plain message");
140 | });
141 | });
142 | });
143 | describe("Log Values", () => {
144 | it("should export correct log level values", () => {
145 | expect(LOG_VALUES).toEqual(["ERROR", "WARN", "INFO", "DEBUG"]);
146 | });
147 | });
148 | });
```
