
# Code Documentation
Generated on: 2024-12-08T20:21:17.676Z
Total files: 16

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
    │   │   └── document
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
    ├── demo
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
        │   ├── __tests__
        │   ├── builders
        │   ├── core
        │   ├── schema
        │   └── sources
        │       └── interfaces
        └── logger
            └── __tests__
                └── Logger.test.ts
```


## File: NodeBase.test.ts
- Path: `/root/git/codewrangler/src/core/entities/__tests__/NodeBase.test.ts`
- Size: 3.30 KB
- Extension: .ts
- Lines of code: 109
- Content:

```ts
  1 | import { documentFactory } from "../../../infrastructure/filesystem/DocumentFactory";
  2 | import { INodeContent, NodeBase } from "../NodeBase";
  3 | 
  4 | // Mock DocumentFactory
  5 | jest.mock("../../../infrastructure/filesystem/DocumentFactory", () => ({
  6 |   documentFactory: {
  7 |     exists: jest.fn(),
  8 |     isAbsolute: jest.fn(),
  9 |     resolve: jest.fn(),
 10 |     extension: jest.fn(),
 11 |     size: jest.fn(),
 12 |     readFile: jest.fn(),
 13 |     getStats: jest.fn()
 14 |   }
 15 | }));
 16 | 
 17 | class TestNode extends NodeBase {
 18 |   public async bundle(): Promise<void> {}
 19 |   public render(): INodeContent {
 20 |     return { content: "" };
 21 |   }
 22 | }
 23 | 
 24 | describe("NodeBase", () => {
 25 |   const TEST_PATH = "/test/path";
 26 |   beforeEach(() => {
 27 |     jest.clearAllMocks();
 28 |     (documentFactory.exists as jest.Mock).mockReturnValue(true);
 29 |     (documentFactory.isAbsolute as jest.Mock).mockReturnValue(true);
 30 |     (documentFactory.resolve as jest.Mock).mockImplementation(path => path);
 31 |   });
 32 | 
 33 |   describe("constructor", () => {
 34 |     it("should initialize node with correct props", () => {
 35 |       const testNode = new TestNode("test", TEST_PATH);
 36 |       expect(testNode.name).toBe("test");
 37 |       expect(testNode.path).toBe(TEST_PATH);
 38 |     });
 39 | 
 40 |     it("should throw error for non-existent path", () => {
 41 |       (documentFactory.exists as jest.Mock).mockReturnValue(false);
 42 |       expect(() => new TestNode("test", "/invalid/path")).toThrow(
 43 |         new Error("Path /invalid/path does not exist")
 44 |       );
 45 |     });
 46 | 
 47 |     it("should throw error for non-absolute path", () => {
 48 |       (documentFactory.isAbsolute as jest.Mock).mockReturnValue(false);
 49 |       expect(() => new TestNode("test", "relative/path")).toThrow(
 50 |         new Error("Path relative/path is not absolute")
 51 |       );
 52 |     });
 53 |   });
 54 | 
 55 |   describe("properties", () => {
 56 |     let node: TestNode;
 57 | 
 58 |     beforeEach(() => {
 59 |       node = new TestNode("test", TEST_PATH);
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
 78 |           path: TEST_PATH,
 79 |           size: 100,
 80 |           deep: 2
 81 |         })
 82 |       );
 83 |     });
 84 |   });
 85 | 
 86 |   describe("methods", () => {
 87 |     let node: TestNode;
 88 | 
 89 |     beforeEach(() => {
 90 |       node = new TestNode("test", TEST_PATH);
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
110 |             writable: false
111 |           }
112 |         })
113 |       );
114 |     });
115 | 
116 |     it("should clone correctly", async () => {
117 |       node["size"] = 100;
118 |       const clone = await node.clone();
119 |       expect(clone.size).toBe(100);
120 |       expect(clone.name).toBe("test");
121 |       expect(clone.path).toBe(TEST_PATH);
122 |     });
123 |   });
124 | });
125 | 
```

---------------------------------------------------------------------------


## File: NodeDirectory.test.ts
- Path: `/root/git/codewrangler/src/core/entities/__tests__/NodeDirectory.test.ts`
- Size: 3.33 KB
- Extension: .ts
- Lines of code: 94
- Content:

```ts
  1 | import * as fs from "fs/promises";
  2 | import * as path from "path";
  3 | 
  4 | import { IRenderStrategy } from "../../../services/renderer/RenderStrategy";
  5 | import { INodeContent } from "../NodeBase";
  6 | import { NodeDirectory } from "../NodeDirectory";
  7 | import { NodeFile } from "../NodeFile";
  8 | 
  9 | class TestDirectory extends NodeDirectory {
 10 |   public render(_: IRenderStrategy): INodeContent {
 11 |     return {
 12 |       content: "render"
 13 |     };
 14 |   }
 15 | }
 16 | 
 17 | class TestFile extends NodeFile {
 18 |   public render(_: IRenderStrategy): INodeContent {
 19 |     return {
 20 |       content: "render"
 21 |     };
 22 |   }
 23 | }
 24 | 
 25 | describe("Directory", () => {
 26 |   let testDirectory: TestDirectory;
 27 |   const pwd = process.cwd();
 28 |   const MOCK_PATH = path.resolve(
 29 |     `${pwd}/src/core/entities/__tests__/__node_directory_mocks__`
 30 |   );
 31 | 
 32 |   beforeEach(async () => {
 33 |     jest.clearAllMocks();
 34 |     await fs.mkdir(MOCK_PATH, { recursive: true });
 35 |     await fs.mkdir(path.join(MOCK_PATH, "dir"), { recursive: true });
 36 |     testDirectory = new TestDirectory("dir", path.join(MOCK_PATH, "dir"));
 37 |   });
 38 | 
 39 |   afterEach(async () => {
 40 |     await fs.rm(MOCK_PATH, { recursive: true, force: true });
 41 |   });
 42 | 
 43 |   it("constructor initializes name, path, and extension correctly", () => {
 44 |     expect(testDirectory.name).toBe("dir");
 45 |     expect(testDirectory.path).toBe(path.join(MOCK_PATH, "dir"));
 46 |     expect(testDirectory.children).toEqual([]);
 47 |   });
 48 | 
 49 |   it("addChild throws error for invalid child type", () => {
 50 |     expect(() => testDirectory.addChild({} as NodeFile)).toThrow(
 51 |       "Invalid child type"
 52 |     );
 53 |   });
 54 | 
 55 |   it("Check props value before bundle", () => {
 56 |     const props = testDirectory.props;
 57 |     expect(props).toMatchObject({
 58 |       name: "dir",
 59 |       path: path.join(MOCK_PATH, "dir")
 60 |     });
 61 |   });
 62 | 
 63 |   describe("bundle", () => {
 64 |     const dir = path.join(MOCK_PATH, "dir");
 65 |     beforeEach(async () => {
 66 |       await fs.mkdir(path.join(MOCK_PATH, "dir"), { recursive: true });
 67 |       // create file1, file2, file3, file4
 68 |       await fs.writeFile(path.join(MOCK_PATH, "file1.ts"), "");
 69 |       await fs.writeFile(path.join(MOCK_PATH, "file2.js"), "");
 70 |       await fs.writeFile(path.join(dir, "file3.ts"), "");
 71 |       await fs.writeFile(path.join(dir, "file4.js"), "");
 72 |       jest.clearAllMocks();
 73 |     });
 74 | 
 75 |     it("bundle updates directory properties correctly", async () => {
 76 |       const mockFile1 = new TestFile(
 77 |         "file1.ts",
 78 |         path.join(MOCK_PATH, "file1.ts")
 79 |       );
 80 |       const mockFile2 = new TestFile(
 81 |         "file2.js",
 82 |         path.join(MOCK_PATH, "file2.js")
 83 |       );
 84 |       const mockSubDir = new TestDirectory("dir", path.join(MOCK_PATH, "dir"));
 85 |       const mockFile3 = new TestFile(
 86 |         "file3.ts",
 87 |         path.join(MOCK_PATH, "dir/file3.ts")
 88 |       );
 89 |       const mockFile4 = new TestFile(
 90 |         "file4.js",
 91 |         path.join(MOCK_PATH, "dir/file4.js")
 92 |       );
 93 | 
 94 |       testDirectory.addChild(mockFile1);
 95 |       testDirectory.addChild(mockFile2);
 96 |       testDirectory.addChild(mockSubDir);
 97 |       mockSubDir.addChild(mockFile3);
 98 |       mockSubDir.addChild(mockFile4);
 99 | 
100 |       await testDirectory.bundle(1);
101 | 
102 |       expect(testDirectory.deep).toEqual(expect.any(Number));
103 |       expect(testDirectory.length).toEqual(expect.any(Number)); // Only direct files
104 |       expect(testDirectory.deepLength).toEqual(expect.any(Number)); // Including subdirectory and its file
105 |       expect(testDirectory.size).toEqual(expect.any(Number)); // Sum of all file sizes
106 |     });
107 |   });
108 | });
109 | 
```

---------------------------------------------------------------------------


## File: NodeFile.test.ts
- Path: `/root/git/codewrangler/src/core/entities/__tests__/NodeFile.test.ts`
- Size: 2.01 KB
- Extension: .ts
- Lines of code: 69
- Content:

```ts
 1 | import * as fs from "fs/promises";
 2 | import * as path from "path";
 3 | 
 4 | import { IRenderStrategy } from "../../../services/renderer/RenderStrategy";
 5 | import { INodeContent } from "../NodeBase";
 6 | import { NodeFile } from "../NodeFile";
 7 | 
 8 | class TestFile extends NodeFile {
 9 |   public render(_: IRenderStrategy): INodeContent {
10 |     return {
11 |       content: "render"
12 |     };
13 |   }
14 | }
15 | 
16 | describe("NodeFile", () => {
17 |   let testFile: TestFile;
18 |   const pwd = process.cwd();
19 |   const MOCK_PATH = path.resolve(
20 |     `${pwd}/src/core/entities/__tests__/__node_file_mocks__`
21 |   );
22 |   const testName = "file1.ts";
23 |   const testPath = path.join(MOCK_PATH, testName);
24 | 
25 |   beforeEach(async () => {
26 |     jest.clearAllMocks();
27 |     try {
28 |       await fs.mkdir(MOCK_PATH, { recursive: true });
29 |       await fs.writeFile(testPath, "");
30 |     } catch (error) {
31 |       console.error(error);
32 |     }
33 |     testFile = new TestFile(testName, testPath);
34 |   });
35 | 
36 |   afterEach(async () => {
37 |     await fs.rm(MOCK_PATH, { recursive: true, force: true });
38 |   });
39 | 
40 |   describe("constructor", () => {
41 |     it("initializes name, path, and extension correctly", () => {
42 |       expect(testFile.name).toBe(testName);
43 |       expect(testFile.path).toBe(testPath);
44 |       expect(testFile.extension).toBe(".ts");
45 |     });
46 |   });
47 | 
48 |   describe("bundle", () => {
49 |     it("Check props value before bundle", () => {
50 |       const props = testFile.props;
51 |       expect(props).toMatchObject({
52 |         name: testName,
53 |         path: testPath,
54 |         deep: 0,
55 |         size: 0,
56 |         extension: ".ts"
57 |       });
58 |     });
59 | 
60 |     it("Bundle method sets content correctly", async () => {
61 |       await testFile.bundle();
62 |       const content = "";
63 |       expect(testFile.content).toBe(content);
64 |     });
65 | 
66 |     it("Check props value after bundle", async () => {
67 |       await testFile.bundle();
68 |       const props = testFile.props;
69 |       expect(props).toMatchObject({
70 |         name: expect.any(String),
71 |         path: expect.any(String),
72 |         deep: expect.any(Number),
73 |         size: expect.any(Number),
74 |         extension: expect.any(String)
75 |       });
76 |     });
77 |   });
78 | });
79 | 
```

---------------------------------------------------------------------------


## File: DocumentError.test.ts
- Path: `/root/git/codewrangler/src/core/errors/__tests__/DocumentError.test.ts`
- Size: 5.80 KB
- Extension: .ts
- Lines of code: 139
- Content:

```ts
  1 | import { DirectoryNotFoundError } from "../DirectoryNotFoundError";
  2 | import { DocumentError } from "../DocumentError";
  3 | import { FileNotFoundError } from "../FileNotFoundError";
  4 | 
  5 | describe("Error Classes", () => {
  6 |   const TEST_PATH = "/path/to/file";
  7 | 
  8 |   describe("DocumentError", () => {
  9 |     it("should create an instance with the correct properties for DocumentError", () => {
 10 |       const message = "Test error message";
 11 |       const error = new DocumentError(message, TEST_PATH);
 12 | 
 13 |       expect(error).toBeInstanceOf(Error);
 14 |       expect(error).toBeInstanceOf(DocumentError);
 15 |       expect(error.name).toBe("DocumentError");
 16 |       expect(error.path).toBe(TEST_PATH);
 17 |       expect(error.message).toBe(`Document error at ${TEST_PATH}: ${message}`);
 18 |     });
 19 | 
 20 |     it("should handle empty message and path", () => {
 21 |       const error = new DocumentError("", "");
 22 | 
 23 |       expect(error.name).toBe("DocumentError");
 24 |       expect(error.path).toBe("");
 25 |       expect(error.message).toBe("Document error at : ");
 26 |     });
 27 | 
 28 |     it("should preserve stack trace", () => {
 29 |       const error = new DocumentError("message", "path");
 30 | 
 31 |       expect(error.stack).toBeDefined();
 32 |       expect(error.stack).toContain("DocumentError");
 33 |     });
 34 |   });
 35 | 
 36 |   describe("FileNotFoundError", () => {
 37 |     it("should create an instance with the correct properties for DocumentError", () => {
 38 |       const error = new FileNotFoundError(TEST_PATH);
 39 | 
 40 |       expect(error).toBeInstanceOf(Error);
 41 |       expect(error).toBeInstanceOf(DocumentError);
 42 |       expect(error).toBeInstanceOf(FileNotFoundError);
 43 |       expect(error.name).toBe("FileNotFoundError");
 44 |       expect(error.path).toBe(TEST_PATH);
 45 |       expect(error.message).toBe(
 46 |         `Document error at ${TEST_PATH}: File not found`
 47 |       );
 48 |     });
 49 | 
 50 |     it("should handle empty path", () => {
 51 |       const error = new FileNotFoundError("");
 52 | 
 53 |       expect(error.name).toBe("FileNotFoundError");
 54 |       expect(error.path).toBe("");
 55 |       expect(error.message).toBe("Document error at : File not found");
 56 |     });
 57 | 
 58 |     it("should preserve stack trace for FileNotFoundError", () => {
 59 |       const error = new FileNotFoundError("path");
 60 | 
 61 |       expect(error.stack).toBeDefined();
 62 |       expect(error.stack).toContain("FileNotFoundError");
 63 |     });
 64 | 
 65 |     it("should be catchable as DocumentError", () => {
 66 |       const error = new FileNotFoundError(TEST_PATH);
 67 | 
 68 |       try {
 69 |         throw error;
 70 |       } catch (e) {
 71 |         expect(e instanceof DocumentError).toBe(true);
 72 |       }
 73 |     });
 74 |   });
 75 | 
 76 |   describe("DirectoryNotFoundError", () => {
 77 |     it("should create an instance with the correct properties for DirectoryNotFoundError", () => {
 78 |       const path = "/path/to/directory";
 79 |       const error = new DirectoryNotFoundError(path);
 80 | 
 81 |       expect(error).toBeInstanceOf(Error);
 82 |       expect(error).toBeInstanceOf(DocumentError);
 83 |       expect(error).toBeInstanceOf(DirectoryNotFoundError);
 84 |       expect(error.name).toBe("DirectoryNotFoundError");
 85 |       expect(error.path).toBe(path);
 86 |       expect(error.message).toBe(
 87 |         `Document error at ${path}: Directory not found`
 88 |       );
 89 |     });
 90 | 
 91 |     it("should handle empty path", () => {
 92 |       const error = new DirectoryNotFoundError("");
 93 | 
 94 |       expect(error.name).toBe("DirectoryNotFoundError");
 95 |       expect(error.path).toBe("");
 96 |       expect(error.message).toBe("Document error at : Directory not found");
 97 |     });
 98 | 
 99 |     it("should preserve stack trace for DirectoryNotFoundError", () => {
100 |       const error = new DirectoryNotFoundError("path");
101 | 
102 |       expect(error.stack).toBeDefined();
103 |       expect(error.stack).toContain("DirectoryNotFoundError");
104 |     });
105 | 
106 |     it("should be catchable as DocumentError", () => {
107 |       const error = new DirectoryNotFoundError("/path/to/directory");
108 | 
109 |       try {
110 |         throw error;
111 |       } catch (e: any) {
112 |         expect(e instanceof DocumentError).toBe(true);
113 |       }
114 |     });
115 |   });
116 | 
117 |   describe("Error Hierarchy", () => {
118 |     it("should maintain proper inheritance chain", () => {
119 |       const docError = new DocumentError("message", "path");
120 |       const fileError = new FileNotFoundError("path");
121 |       const dirError = new DirectoryNotFoundError("path");
122 | 
123 |       expect(docError instanceof Error).toBe(true);
124 |       expect(docError instanceof DocumentError).toBe(true);
125 |       expect(fileError instanceof Error).toBe(true);
126 |       expect(fileError instanceof DocumentError).toBe(true);
127 |       expect(fileError instanceof FileNotFoundError).toBe(true);
128 |       expect(dirError instanceof Error).toBe(true);
129 |       expect(dirError instanceof DocumentError).toBe(true);
130 |       expect(dirError instanceof DirectoryNotFoundError).toBe(true);
131 |     });
132 | 
133 |     it("should allow type checking in catch blocks", () => {
134 |       const errors = [
135 |         new DocumentError("message", "path"),
136 |         new FileNotFoundError("path"),
137 |         new DirectoryNotFoundError("path")
138 |       ];
139 | 
140 |       errors.forEach(error => {
141 |         try {
142 |           throw error;
143 |         } catch (e) {
144 |           if (e instanceof DirectoryNotFoundError) {
145 |             expect(e.name).toBe("DirectoryNotFoundError");
146 |           } else if (e instanceof FileNotFoundError) {
147 |             expect(e.name).toBe("FileNotFoundError");
148 |           } else if (e instanceof DocumentError) {
149 |             expect(e.name).toBe("DocumentError");
150 |           }
151 |         }
152 |       });
153 |     });
154 | 
155 |     it("should handle error comparison correctly", () => {
156 |       const docError = new DocumentError("message", "path");
157 |       const fileError = new FileNotFoundError("path");
158 |       const dirError = new DirectoryNotFoundError("path");
159 | 
160 |       expect(fileError instanceof DocumentError).toBe(true);
161 |       expect(dirError instanceof DocumentError).toBe(true);
162 |       expect(docError instanceof FileNotFoundError).toBe(false);
163 |       expect(docError instanceof DirectoryNotFoundError).toBe(false);
164 |       expect(fileError instanceof DirectoryNotFoundError).toBe(false);
165 |       expect(dirError instanceof FileNotFoundError).toBe(false);
166 |     });
167 |   });
168 | });
169 | 
```

---------------------------------------------------------------------------


## File: DocumentFactory.test.ts
- Path: `/root/git/codewrangler/src/infrastructure/filesystem/__tests__/DocumentFactory.test.ts`
- Size: 20.17 KB
- Extension: .ts
- Lines of code: 502
- Content:

```ts
  1 | import * as fs from "fs/promises";
  2 | import * as path from "path";
  3 | 
  4 | import { FILE_TYPE } from "../../../types/type";
  5 | import { documentFactory } from "../DocumentFactory";
  6 | import { fileStatsService } from "../FileStats";
  7 | describe("DocumentFactory", () => {
  8 |   const pwd = process.cwd();
  9 |   const MOCK_PATH = path.resolve(
 10 |     `${pwd}/src/infrastructure/filesystem/__tests__/__mocks__/documentFactory`
 11 |   );
 12 |   const tempDir = path.join(MOCK_PATH, "temp_test");
 13 |   const testFilePath = path.join(tempDir, "test.txt");
 14 |   const emptyFilePath = path.join(tempDir, "empty.txt");
 15 |   const TEST_CONTENT = "test content";
 16 |   const DOCUMENT_ERROR_MESSAGE =
 17 |     "Document error at nonexistent: File not found";
 18 | 
 19 |   beforeEach(async () => {
 20 |     jest.clearAllMocks();
 21 |     await fs.mkdir(MOCK_PATH, { recursive: true });
 22 |     await fs.mkdir(tempDir, { recursive: true });
 23 |     await fs.writeFile(testFilePath, TEST_CONTENT);
 24 |     await fs.writeFile(emptyFilePath, "");
 25 |   });
 26 | 
 27 |   afterEach(async () => {
 28 |     await fs.rm(MOCK_PATH, { recursive: true });
 29 |   });
 30 | 
 31 |   describe("type", () => {
 32 |     it('should return "file" for a file path', async () => {
 33 |       const result = await documentFactory.type(testFilePath);
 34 |       expect(result).toBe(FILE_TYPE.File);
 35 |     });
 36 | 
 37 |     it('should return "directory" for a directory path', async () => {
 38 |       const result = await documentFactory.type(MOCK_PATH);
 39 |       expect(result).toBe(FILE_TYPE.Directory);
 40 |     });
 41 | 
 42 |     it("should throw an error if the path doesn't exist on type method", async () => {
 43 |       await expect(documentFactory.type("nonexistent")).rejects.toThrow(
 44 |         DOCUMENT_ERROR_MESSAGE
 45 |       );
 46 |     });
 47 | 
 48 |     it("should throw an error if the path is a file", async () => {
 49 |       await expect(
 50 |         documentFactory.type(path.join(MOCK_PATH, "file2.ts"))
 51 |       ).rejects.toThrow(
 52 |         `Document error at ${path.join(MOCK_PATH, "file2.ts")}: File not found`
 53 |       );
 54 |     });
 55 |   });
 56 | 
 57 |   describe("size", () => {
 58 |     it("should return the size of a file", async () => {
 59 |       const result = await documentFactory.size(testFilePath);
 60 |       expect(result).toStrictEqual(expect.any(Number));
 61 |     });
 62 | 
 63 |     it("should throw an error if the path doesn't exist on size method", async () => {
 64 |       await expect(documentFactory.size("nonexistent")).rejects.toThrow(
 65 |         DOCUMENT_ERROR_MESSAGE
 66 |       );
 67 |     });
 68 | 
 69 |     it("should throw an error if the path is a directory", async () => {
 70 |       await expect(documentFactory.size(MOCK_PATH)).rejects.toThrow(
 71 |         `Document error at ${MOCK_PATH}: Path is a directory`
 72 |       );
 73 |     });
 74 | 
 75 |     it("should throw a zero size if the file is empty", async () => {
 76 |       const result = await documentFactory.size(emptyFilePath);
 77 |       expect(result).toBe(0);
 78 |     });
 79 |   });
 80 | 
 81 |   describe("readFile", () => {
 82 |     it("should read file content iwth default options", async () => {
 83 |       const content = await documentFactory.readFile(testFilePath);
 84 |       expect(content).toBeDefined();
 85 |       expect(content).toBeTruthy();
 86 |       expect(typeof content).toBe("string");
 87 |     });
 88 | 
 89 |     it("should read file with custom escoding", async () => {
 90 |       const content = await documentFactory.readFile(testFilePath, {
 91 |         encoding: "utf-8"
 92 |       });
 93 |       expect(content).toBeDefined();
 94 |       expect(content).toBeTruthy();
 95 |       expect(typeof content).toBe("string");
 96 |     });
 97 | 
 98 |     it("should throw an error if the path doesn't exist on readFile method", async () => {
 99 |       await expect(documentFactory.readFile("nonexistent")).rejects.toThrow(
100 |         "Document error at nonexistent: Error: ENOENT: no such file or directory, open 'nonexistent'"
101 |       );
102 |     });
103 | 
104 |     it("should throw an error if the path is a directory", async () => {
105 |       await expect(documentFactory.readFile(MOCK_PATH)).rejects.toThrow(
106 |         `Document error at ${MOCK_PATH}: Error: EISDIR: illegal operation on a directory, read`
107 |       );
108 |     });
109 |   });
110 | 
111 |   describe("readDirectory", () => {
112 |     it("should return directory contents with type information", async () => {
113 |       const contents = await documentFactory.readDirectory(MOCK_PATH);
114 |       expect(Array.isArray(contents)).toBe(true);
115 |       expect(contents.length).toBeGreaterThan(0);
116 |       contents.forEach(item => {
117 |         expect(item).toMatchObject({
118 |           name: expect.any(String),
119 |           type: expect.stringMatching(/^(file|directory)$/)
120 |         });
121 |       });
122 |     });
123 | 
124 |     it("should throw error for non-existent directory", async () => {
125 |       await expect(
126 |         documentFactory.readDirectory("nonexistent")
127 |       ).rejects.toThrow();
128 |     });
129 | 
130 |     it("should throw error when trying to read a file as directory", async () => {
131 |       await expect(
132 |         documentFactory.readDirectory(path.join(MOCK_PATH, "file1.ts"))
133 |       ).rejects.toThrow();
134 |     });
135 |   });
136 | 
137 |   describe("exists", () => {
138 |     it("should return true for existing file", () => {
139 |       const exists = documentFactory.exists(testFilePath);
140 |       expect(exists).toBe(true);
141 |     });
142 | 
143 |     it("should return true for existing directory", () => {
144 |       const exists = documentFactory.exists(MOCK_PATH);
145 |       expect(exists).toBe(true);
146 |     });
147 | 
148 |     it("should return false for non-existent path", () => {
149 |       const exists = documentFactory.exists("nonexistent");
150 |       expect(exists).toBe(false);
151 |     });
152 |   });
153 | 
154 |   describe("remove", () => {
155 |     const tempDir = path.join(MOCK_PATH, "temp_remove");
156 | 
157 |     beforeEach(async () => {
158 |       // Create temp directory and test files
159 |       await fs.mkdir(tempDir, { recursive: true });
160 |       await fs.writeFile(path.join(tempDir, "test.txt"), TEST_CONTENT);
161 |     });
162 | 
163 |     afterEach(async () => {
164 |       // Cleanup
165 |       if (await documentFactory.exists(tempDir)) {
166 |         await fs.rm(tempDir, { recursive: true });
167 |       }
168 |     });
169 | 
170 |     it("should remove a file", async () => {
171 |       const filePath = path.join(tempDir, "test.txt");
172 |       await documentFactory.remove(filePath);
173 |       expect(await documentFactory.exists(filePath)).toBe(false);
174 |     });
175 | 
176 |     it("should remove a directory recursively", async () => {
177 |       await documentFactory.remove(tempDir);
178 |       expect(await documentFactory.exists(tempDir)).toBe(false);
179 |     });
180 | 
181 |     it("should throw error when path doesn't exist", async () => {
182 |       await expect(
183 |         documentFactory.remove(path.join(tempDir, "nonexistent"))
184 |       ).rejects.toThrow();
185 |     });
186 |   });
187 | 
188 |   describe("isAbsolute", () => {
189 |     it("should return true for absolute path", () => {
190 |       expect(documentFactory.isAbsolute(MOCK_PATH)).toBe(true);
191 |     });
192 | 
193 |     it("should return false for relative path", () => {
194 |       expect(documentFactory.isAbsolute(path.join("file1.ts"))).toBe(false);
195 |     });
196 | 
197 |     it("should return false for non-existent path", () => {
198 |       expect(documentFactory.isAbsolute("nonexistent")).toBe(false);
199 |     });
200 |   });
201 | 
202 |   describe("extension", () => {
203 |     it("should return extension for file", () => {
204 |       expect(documentFactory.extension("file1.ts")).toBe(".ts");
205 |     });
206 | 
207 |     it("should return empty string for directory", () => {
208 |       expect(documentFactory.extension("directory")).toBe("");
209 |     });
210 | 
211 |     it("should return empty string for non-existent file", () => {
212 |       expect(documentFactory.extension("nonexistent")).toBe("");
213 |     });
214 | 
215 |     it("should return extension for file without two . characters", () => {
216 |       expect(documentFactory.extension("file1.test.ts")).toBe(".ts");
217 |     });
218 |   });
219 | 
220 |   describe("copy", () => {
221 |     const tempDir = path.join(MOCK_PATH, "temp_copy");
222 | 
223 |     beforeEach(async () => {
224 |       await fs.mkdir(tempDir, { recursive: true });
225 |     });
226 | 
227 |     afterEach(async () => {
228 |       await fs.rm(tempDir, { recursive: true });
229 |     });
230 | 
231 |     it("should copy a file", async () => {
232 |       await documentFactory.copy(testFilePath, path.join(tempDir, "file1.ts"));
233 |       expect(documentFactory.exists(path.join(tempDir, "file1.ts"))).toBe(true);
234 |     });
235 |   });
236 | 
237 |   describe("readFileSync", () => {
238 |     const testFilePath = path.join(MOCK_PATH, "temp_test", "test.txt");
239 |     beforeEach(async () => {
240 |       await fs.mkdir(path.join(MOCK_PATH, "temp_test"), { recursive: true });
241 |       await fs.writeFile(testFilePath, TEST_CONTENT);
242 |     });
243 | 
244 |     afterEach(async () => {
245 |       await fs.rm(path.join(MOCK_PATH, "temp_test"), { recursive: true });
246 |     });
247 | 
248 |     it("should read file content synchronously with default options", () => {
249 |       const content = documentFactory.readFileSync(testFilePath);
250 |       expect(content).toBe(TEST_CONTENT);
251 |     });
252 | 
253 |     it("should read file with custom encoding", () => {
254 |       const content = documentFactory.readFileSync(testFilePath, {
255 |         encoding: "utf8"
256 |       });
257 |       expect(content).toBe(TEST_CONTENT);
258 |     });
259 | 
260 |     it("should throw error for non-existent file", () => {
261 |       expect(() => documentFactory.readFileSync("nonexistent")).toThrow();
262 |     });
263 | 
264 |     it("should throw error when reading directory", () => {
265 |       expect(() => documentFactory.readFileSync(tempDir)).toThrow();
266 |     });
267 |   });
268 | 
269 |   describe("writeFile", () => {
270 |     const tempDir = path.join(MOCK_PATH, "temp_write");
271 |     const testFilePath = path.join(tempDir, "test.txt");
272 |     beforeEach(async () => {
273 |       await fs.mkdir(tempDir, { recursive: true });
274 |       await fs.writeFile(testFilePath, TEST_CONTENT);
275 |     });
276 | 
277 |     afterEach(async () => {
278 |       await fs.rm(tempDir, { recursive: true });
279 |     });
280 | 
281 |     it("should write content to file with default options", async () => {
282 |       const newContent = "new content";
283 |       const newFile = path.join(tempDir, "new.txt");
284 | 
285 |       await documentFactory.writeFile(newFile, newContent);
286 |       const content = await fs.readFile(newFile, "utf8");
287 |       expect(content).toBe(newContent);
288 |     });
289 | 
290 |     it("should write content with custom encoding", async () => {
291 |       const newContent = "новый контент"; // non-ASCII content
292 |       const newFile = path.join(tempDir, "encoded.txt");
293 | 
294 |       await documentFactory.writeFile(newFile, newContent, {
295 |         encoding: "utf8"
296 |       });
297 |       const content = await fs.readFile(newFile, "utf8");
298 |       expect(content).toBe(newContent);
299 |     });
300 | 
301 |     it("should overwrite existing file", async () => {
302 |       const newContent = "overwritten content";
303 |       await documentFactory.writeFile(testFilePath, newContent);
304 |       const content = await fs.readFile(testFilePath, "utf8");
305 |       expect(content).toBe(newContent);
306 |     });
307 | 
308 |     it("should throw error when writing to a directory", async () => {
309 |       await expect(
310 |         documentFactory.writeFile(tempDir, "content")
311 |       ).rejects.toThrow();
312 |     });
313 |   });
314 | 
315 |   describe("appendFile", () => {
316 |     const tempDir = path.join(MOCK_PATH, "temp_append");
317 |     const testFilePath = path.join(tempDir, "test.txt");
318 |     beforeEach(async () => {
319 |       await fs.mkdir(tempDir, { recursive: true });
320 |       await fs.writeFile(testFilePath, TEST_CONTENT);
321 |     });
322 | 
323 |     afterEach(async () => {
324 |       await fs.rm(tempDir, { recursive: true });
325 |     });
326 | 
327 |     it("should append content to existing file", async () => {
328 |       const appendContent = " additional content";
329 |       await documentFactory.appendFile(testFilePath, appendContent);
330 |       const content = await fs.readFile(testFilePath, "utf8");
331 |       expect(content).toBe(TEST_CONTENT + appendContent);
332 |     });
333 | 
334 |     it("should create new file if it doesn't exist", async () => {
335 |       const newFile = path.join(tempDir, "append.txt");
336 |       await documentFactory.appendFile(newFile, TEST_CONTENT);
337 |       const content = await fs.readFile(newFile, "utf8");
338 |       expect(content).toBe(TEST_CONTENT);
339 |     });
340 | 
341 |     it("should throw error when appending to a directory", async () => {
342 |       await expect(
343 |         documentFactory.appendFile(tempDir, "content")
344 |       ).rejects.toThrow();
345 |     });
346 |   });
347 | 
348 |   describe("readDir", () => {
349 |     const tempDir = path.join(MOCK_PATH, "temp_readdir");
350 |     beforeEach(async () => {
351 |       await fs.mkdir(tempDir, { recursive: true });
352 |       await fs.writeFile(path.join(tempDir, "file1.txt"), "content1");
353 |       await fs.writeFile(path.join(tempDir, "file2.txt"), "content2");
354 |       await fs.mkdir(path.join(tempDir, "subdir"));
355 |     });
356 | 
357 |     afterEach(async () => {
358 |       await fs.rm(tempDir, { recursive: true });
359 |     });
360 | 
361 |     it("should list directory contents", async () => {
362 |       const contents = await documentFactory.readDir(tempDir);
363 |       expect(contents).toHaveLength(3); // test.txt, file1.txt, file2.txt, subdir
364 |       expect(contents).toContain("file1.txt");
365 |       expect(contents).toContain("file2.txt");
366 |       expect(contents).toContain("subdir");
367 |     });
368 | 
369 |     it("should support withFileTypes option", async () => {
370 |       const contents = await documentFactory.readDir(tempDir, {
371 |         withFileTypes: true
372 |       });
373 |       expect(contents).toHaveLength(3);
374 |     });
375 | 
376 |     it("should throw error for non-existent directory", async () => {
377 |       await expect(documentFactory.readDir("nonexistent")).rejects.toThrow();
378 |     });
379 | 
380 |     it("should throw error when reading a file as directory", async () => {
381 |       await expect(documentFactory.readDir(testFilePath)).rejects.toThrow();
382 |     });
383 |   });
384 | 
385 |   describe("createDir", () => {
386 |     const testFilePath = path.join(MOCK_PATH, "temp_test", "test.txt");
387 |     beforeEach(async () => {
388 |       await fs.mkdir(path.join(MOCK_PATH, "temp_test"), { recursive: true });
389 |       await fs.writeFile(testFilePath, TEST_CONTENT);
390 |     });
391 | 
392 |     afterEach(async () => {
393 |       await fs.rm(path.join(MOCK_PATH, "temp_test"), { recursive: true });
394 |     });
395 | 
396 |     it("should create new directory", async () => {
397 |       const newDir = path.join(tempDir, "newdir");
398 |       await documentFactory.createDir(newDir);
399 |       expect(documentFactory.exists(newDir)).toBe(true);
400 |     });
401 | 
402 |     it("should create nested directories with recursive option", async () => {
403 |       const nestedDir = path.join(tempDir, "nested/deep/dir");
404 |       await documentFactory.createDir(nestedDir, true);
405 |       expect(documentFactory.exists(nestedDir)).toBe(true);
406 |     });
407 | 
408 |     it("should throw error when creating directory with existing file path", async () => {
409 |       await expect(documentFactory.createDir(testFilePath)).rejects.toThrow();
410 |     });
411 |   });
412 | 
413 |   describe("ensureDirectory", () => {
414 |     it("should create directory if it doesn't exist", async () => {
415 |       const newDir = path.join(tempDir, "ensure");
416 |       await documentFactory.ensureDirectory(newDir);
417 |       expect(documentFactory.exists(newDir)).toBe(true);
418 |     });
419 | 
420 |     it("should not throw error if directory already exists", async () => {
421 |       await expect(
422 |         documentFactory.ensureDirectory(tempDir)
423 |       ).resolves.not.toThrow();
424 |     });
425 | 
426 |     it("should respect custom mode option", async () => {
427 |       const newDir = path.join(tempDir, "mode-test");
428 |       await documentFactory.ensureDirectory(newDir, { mode: 0o755 });
429 |       const stats = await fs.stat(newDir);
430 |       const expectedMode =
431 |         process.platform === "win32" // on windows, the default mode is 0o666
432 |           ? 0o666
433 |           : 0o755;
434 |       expect(stats.mode & 0o777).toBe(expectedMode);
435 |     });
436 |   });
437 | 
438 |   describe("baseName", () => {
439 |     it("should return file name from path", () => {
440 |       expect(documentFactory.baseName("/path/to/file.txt")).toBe("file.txt");
441 |     });
442 | 
443 |     it("should return directory name from path", () => {
444 |       expect(documentFactory.baseName("/path/to/dir/")).toBe("dir");
445 |     });
446 | 
447 |     it("should handle paths with multiple extensions", () => {
448 |       expect(documentFactory.baseName("/path/file.test.ts")).toBe(
449 |         "file.test.ts"
450 |       );
451 |     });
452 |   });
453 | 
454 |   describe("join", () => {
455 |     it("should join path segments", () => {
456 |       const joined = documentFactory.join("path", "to", "file.txt");
457 |       expect(joined).toBe(path.join("path", "to", "file.txt"));
458 |     });
459 | 
460 |     it("should handle absolute paths", () => {
461 |       const joined = documentFactory.join("/root", "path", "file.txt");
462 |       expect(joined).toBe(path.join("/root", "path", "file.txt"));
463 |     });
464 | 
465 |     it("should normalize path separators", () => {
466 |       const joined = documentFactory.join("path/to", "file.txt");
467 |       expect(joined).toBe(path.join("path/to", "file.txt"));
468 |     });
469 |   });
470 | 
471 |   // Additional edge cases for existing methods
472 |   describe("edge cases", () => {
473 |     const tempDir = path.join(MOCK_PATH, "temp_edge");
474 |     const testFilePath = path.join(tempDir, "test.txt");
475 |     const symlink = path.join(tempDir, "symlink");
476 | 
477 |     beforeEach(async () => {
478 |       await fs.mkdir(tempDir, { recursive: true });
479 |       // Create the test file before creating the symlink
480 |       await fs.writeFile(testFilePath, TEST_CONTENT);
481 |     });
482 | 
483 |     afterEach(async () => {
484 |       await fs.rm(tempDir, { recursive: true });
485 |     });
486 | 
487 |     it("should handle symlinks when copying", async () => {
488 |       await fs.symlink(testFilePath, symlink); // Create the symlink after the file exists
489 |       const copyPath = path.join(tempDir, "copied-symlink");
490 |       await documentFactory.copy(symlink, copyPath);
491 |       expect(documentFactory.exists(copyPath)).toBe(true);
492 |     });
493 | 
494 |     it("should handle empty directory copying", async () => {
495 |       const emptyDir = path.join(tempDir, "empty");
496 |       await fs.mkdir(emptyDir);
497 |       const copyPath = path.join(tempDir, "copied-empty");
498 |       await documentFactory.copy(emptyDir, copyPath);
499 |       expect(documentFactory.exists(copyPath)).toBe(true);
500 |     });
501 | 
502 |     it("should handle files with special characters", async () => {
503 |       const specialFile = path.join(tempDir, "special$#@!.txt");
504 |       await fs.writeFile(specialFile, "content");
505 |       expect(documentFactory.exists(specialFile)).toBe(true);
506 |       const stats = await fileStatsService(specialFile);
507 |       expect(stats.isFile).toBe(true);
508 |     });
509 |   });
510 | 
511 |   // Test for line 33 (error handling in type method)
512 |   describe("type error handling", () => {
513 |     it("should handle system errors correctly", async () => {
514 |       // Mock the entire fs module
515 |       jest.mock("fs/promises", () => ({
516 |         ...jest.requireActual("fs/promises"),
517 |         stat: jest.fn().mockRejectedValue(new Error("System error"))
518 |       }));
519 | 
520 |       await expect(documentFactory.type("/some/path")).rejects.toThrow(
521 |         "Document error at /some/path: File not found"
522 |       );
523 |     });
524 |   });
525 | 
526 |   describe("checkAccess", () => {
527 |     it("should handle access check failures", async () => {
528 |       const result = await documentFactory.checkAccess("/nonexistent/path");
529 |       expect(result).toEqual({
530 |         readable: false,
531 |         writable: false,
532 |         executable: false
533 |       });
534 |     });
535 |   });
536 | 
537 |   // Test for line 337 (error handling in appendFile)
538 |   describe("appendFile error handling", () => {
539 |     it("should handle appendFile errors", async () => {
540 |       const invalidPath = path.join(tempDir, "nonexistent", "test.txt");
541 |       await expect(
542 |         documentFactory.appendFile(invalidPath, "content")
543 |       ).rejects.toThrow("Document error at");
544 |     });
545 |   });
546 | 
547 |   // Tests for lines 383-389 (directory copying edge cases)
548 |   describe("copyDir edge cases", () => {
549 |     const tempDir = path.join(MOCK_PATH, "temp_edge");
550 |     const sourceDir = path.join(tempDir, "source");
551 |     const targetDir = path.join(tempDir, "target");
552 | 
553 |     beforeEach(async () => {
554 |       // Clean up before each test
555 |       await fs.rm(tempDir, { recursive: true, force: true });
556 |       await fs.mkdir(tempDir, { recursive: true });
557 |     });
558 | 
559 |     afterEach(async () => {
560 |       // Cleanup after each test
561 |       await fs.rm(tempDir, { recursive: true, force: true });
562 |     });
563 | 
564 |     it("should handle errors during directory creation while copying", async () => {
565 |       // Create a source directory with content
566 |       await fs.mkdir(sourceDir);
567 |       await fs.writeFile(path.join(sourceDir, "test.txt"), TEST_CONTENT);
568 | 
569 |       // Mock ensureDirectory to simulate failure
570 |       const originalEnsureDirectory = documentFactory.ensureDirectory;
571 |       documentFactory.ensureDirectory = jest
572 |         .fn()
573 |         .mockRejectedValue(new Error("Permission denied"));
574 | 
575 |       await expect(
576 |         documentFactory.copyDir(sourceDir, targetDir)
577 |       ).rejects.toThrow();
578 | 
579 |       documentFactory.ensureDirectory = originalEnsureDirectory;
580 |     });
581 | 
582 |     it("should handle nested directory structures correctly", async () => {
583 |       const nestedDir = path.join(sourceDir, "nested");
584 | 
585 |       await fs.mkdir(sourceDir);
586 |       await fs.mkdir(nestedDir);
587 |       await fs.writeFile(path.join(sourceDir, "test1.txt"), "content1");
588 |       await fs.writeFile(path.join(nestedDir, "test2.txt"), "content2");
589 | 
590 |       await documentFactory.copyDir(sourceDir, targetDir);
591 | 
592 |       expect(documentFactory.exists(path.join(targetDir, "test1.txt"))).toBe(
593 |         true
594 |       );
595 |       expect(
596 |         documentFactory.exists(path.join(targetDir, "nested", "test2.txt"))
597 |       ).toBe(true);
598 |     });
599 |   });
600 | });
601 | 
```

---------------------------------------------------------------------------


## File: FileStats.test.ts
- Path: `/root/git/codewrangler/src/infrastructure/filesystem/__tests__/FileStats.test.ts`
- Size: 1.58 KB
- Extension: .ts
- Lines of code: 49
- Content:

```ts
 1 | import * as fs from "fs/promises";
 2 | import * as path from "path";
 3 | 
 4 | import { fileStatsService } from "../FileStats";
 5 | 
 6 | describe("FileStatsService", () => {
 7 |   const pwd = process.cwd();
 8 |   const MOCK_PATH = path.resolve(
 9 |     `${pwd}/src/infrastructure/filesystem/__tests__/__mocks__/stats`
10 |   );
11 |   const TEST_CONTENT = "test content";
12 |   const testFilePath = path.join(MOCK_PATH, "test.txt");
13 | 
14 |   beforeEach(async () => {
15 |     await fs.mkdir(MOCK_PATH, { recursive: true });
16 |     await fs.writeFile(testFilePath, TEST_CONTENT);
17 |   });
18 | 
19 |   afterEach(async () => {
20 |     await fs.rm(MOCK_PATH, { recursive: true });
21 |   });
22 | 
23 |   describe("getStats", () => {
24 |     it("should return complete file statistics", async () => {
25 |       const stats = await fileStatsService(testFilePath);
26 |       expect(stats).toMatchObject({
27 |         size: expect.any(Number),
28 |         created: expect.any(Object),
29 |         modified: expect.any(Object),
30 |         accessed: expect.any(Object),
31 |         isDirectory: false,
32 |         isFile: true,
33 |         permissions: {
34 |           readable: true,
35 |           writable: expect.any(Boolean),
36 |           executable: expect.any(Boolean)
37 |         }
38 |       });
39 |     });
40 | 
41 |     it("should return directory statistics", async () => {
42 |       const stats = await fileStatsService(MOCK_PATH);
43 |       expect(stats).toMatchObject({
44 |         size: expect.any(Number),
45 |         isDirectory: true,
46 |         isFile: false
47 |       });
48 |     });
49 | 
50 |     it("should throw error for non-existent path", async () => {
51 |       await expect(fileStatsService("nonexistent")).rejects.toThrow(
52 |         "Document error at nonexistent: File not found"
53 |       );
54 |     });
55 |   });
56 | });
57 | 
```

---------------------------------------------------------------------------


## File: JsonReadert.test.ts
- Path: `/root/git/codewrangler/src/infrastructure/filesystem/__tests__/JsonReadert.test.ts`
- Size: 1.09 KB
- Extension: .ts
- Lines of code: 30
- Content:

```ts
 1 | import * as fs from "fs/promises";
 2 | import * as path from "path";
 3 | 
 4 | import { jsonReader } from "../JsonReader";
 5 | 
 6 | describe("jsonReader", () => {
 7 |   const pwd = process.cwd();
 8 |   const MOCK_PATH = path.resolve(
 9 |     `${pwd}/src/infrastructure/filesystem/__tests__/__mocks__/json`
10 |   );
11 |   const TEST_CONTENT = JSON.stringify({ key: "value" });
12 |   const TEST_FILE_NAME = "test.json";
13 | 
14 |   beforeEach(async () => {
15 |     await fs.mkdir(MOCK_PATH, { recursive: true });
16 |     await fs.writeFile(path.join(MOCK_PATH, TEST_FILE_NAME), TEST_CONTENT);
17 |   });
18 | 
19 |   afterEach(async () => {
20 |     await fs.rm(MOCK_PATH, { recursive: true });
21 |   });
22 | 
23 |   describe("readJsonSync", () => {
24 |     const jsonFilePath = path.join(MOCK_PATH, TEST_FILE_NAME);
25 | 
26 |     it("should successfully read and parse JSON file", async () => {
27 |       const result = await jsonReader(jsonFilePath);
28 |       expect(result).toEqual({ key: "value" });
29 |     });
30 | 
31 |     it("should throw error for non-existent file", async () => {
32 |       await expect(jsonReader("/nonexistent.json")).rejects.toThrow(
33 |         `Document error at /nonexistent.json: File not found`
34 |       );
35 |     });
36 |   });
37 | });
38 | 
```

---------------------------------------------------------------------------


## File: TemplateEngine.test.ts
- Path: `/root/git/codewrangler/src/infrastructure/templates/__tests__/TemplateEngine.test.ts`
- Size: 7.58 KB
- Extension: .ts
- Lines of code: 206
- Content:

```ts
  1 | import { z } from "zod";
  2 | 
  3 | import { logger } from "../../../utils/logger";
  4 | import { documentFactory } from "../../filesystem/DocumentFactory";
  5 | import { Template } from "../TemplateEngine";
  6 | 
  7 | // Mock DocumentFactory
  8 | jest.mock("../../filesystem/DocumentFactory", () => ({
  9 |   documentFactory: {
 10 |     readFile: jest.fn()
 11 |   }
 12 | }));
 13 | 
 14 | // Mock logger
 15 | jest.mock("../../../utils/logger", () => ({
 16 |   logger: {
 17 |     warn: jest.fn() // Mock the warn function
 18 |   }
 19 | }));
 20 | 
 21 | describe("Template", () => {
 22 |   // Basic schema for testing
 23 |   const basicSchema = z.object({
 24 |     TITLE: z.string(),
 25 |     COUNT: z.number(),
 26 |     ACTIVE: z.boolean().optional()
 27 |   });
 28 | 
 29 |   const TEMPLATE_PATH = "test/template";
 30 | 
 31 |   // Reset mocks before each test
 32 |   beforeEach(() => {
 33 |     jest.clearAllMocks();
 34 |   });
 35 | 
 36 |   describe("Constructor and Basic Properties", () => {
 37 |     it("should create a new template instance", () => {
 38 |       const template = new Template("page", basicSchema);
 39 |       expect(template).toBeInstanceOf(Template);
 40 |     });
 41 |   });
 42 | 
 43 |   describe("load", () => {
 44 |     const mockContent =
 45 |       "Hello {{TITLE}}, Count: {{COUNT}}, Active: {{ACTIVE}}, Extra: {{EXTRA}}";
 46 | 
 47 |     beforeEach(() => {
 48 |       (documentFactory.readFile as jest.Mock).mockResolvedValue(mockContent);
 49 |     });
 50 | 
 51 |     it("should load template content successfully", async () => {
 52 |       const template = new Template("page", basicSchema);
 53 |       await template.load(TEMPLATE_PATH);
 54 |       expect(template.content).toBe(mockContent);
 55 |     });
 56 | 
 57 |     it("should handle additional fields during load", async () => {
 58 |       const template = new Template("page", basicSchema);
 59 |       const additionalFields = {
 60 |         EXTRA: z.string()
 61 |       };
 62 |       await template.load(TEMPLATE_PATH, additionalFields);
 63 |       expect(template.content).toBe(mockContent);
 64 |     });
 65 | 
 66 |     it("should throw error when required tokens are missing", async () => {
 67 |       (documentFactory.readFile as jest.Mock).mockResolvedValue(
 68 |         "No tokens here"
 69 |       );
 70 |       const template = new Template("page", basicSchema);
 71 | 
 72 |       await template.load(TEMPLATE_PATH);
 73 |       // check if logger.warn was called
 74 |       expect(logger.warn).toHaveBeenCalledWith(
 75 |         "Missing required tokens in page template: TITLE, COUNT, ACTIVE"
 76 |       );
 77 |     });
 78 | 
 79 |     it("should throw error when DocumentFactory fails", async () => {
 80 |       (documentFactory.readFile as jest.Mock).mockRejectedValue(
 81 |         new Error("File read error")
 82 |       );
 83 |       const template = new Template("page", basicSchema);
 84 | 
 85 |       await expect(template.load(TEMPLATE_PATH)).rejects.toThrow(
 86 |         "File read error"
 87 |       );
 88 |     });
 89 |   });
 90 | 
 91 |   describe("content", () => {
 92 |     it("should throw error when accessing content before loading", () => {
 93 |       const template = new Template("page", basicSchema);
 94 |       expect(() => template.content).toThrow(
 95 |         "Template content is not loaded for page"
 96 |       );
 97 |     });
 98 | 
 99 |     it("should return content after loading", async () => {
100 |       const mockContent = "Hello {{TITLE}}";
101 |       (documentFactory.readFile as jest.Mock).mockResolvedValue(mockContent);
102 | 
103 |       const template = new Template("page", basicSchema);
104 |       await template.load(TEMPLATE_PATH);
105 |       expect(template.content).toBe(mockContent);
106 |     });
107 |   });
108 | 
109 |   describe("create", () => {
110 |     it("should create and load template in one step", async () => {
111 |       const mockContent =
112 |         "Hello {{TITLE}}, Count: {{COUNT}}, Active: {{ACTIVE}}";
113 |       (documentFactory.readFile as jest.Mock).mockResolvedValue(mockContent);
114 | 
115 |       const template = await Template.create(
116 |         "page",
117 |         basicSchema,
118 |         TEMPLATE_PATH
119 |       );
120 |       expect(template).toBeInstanceOf(Template);
121 |       expect(template.content).toBe(mockContent);
122 |     });
123 | 
124 |     it("should create template with additional fields", async () => {
125 |       const mockContent = "Hello {{TITLE}}, Extra: {{EXTRA}}";
126 |       (documentFactory.readFile as jest.Mock).mockResolvedValue(mockContent);
127 | 
128 |       const additionalFields = {
129 |         EXTRA: z.string()
130 |       };
131 | 
132 |       const template = await Template.create(
133 |         "page",
134 |         basicSchema,
135 |         TEMPLATE_PATH,
136 |         additionalFields
137 |       );
138 |       expect(template).toBeInstanceOf(Template);
139 |       expect(template.content).toBe(mockContent);
140 |     });
141 | 
142 |     it("should throw error when creation fails", async () => {
143 |       (documentFactory.readFile as jest.Mock).mockRejectedValue(
144 |         new Error("Creation failed")
145 |       );
146 | 
147 |       await expect(
148 |         Template.create("page", basicSchema, TEMPLATE_PATH)
149 |       ).rejects.toThrow("Creation failed");
150 |     });
151 |   });
152 | 
153 |   describe("render", () => {
154 |     it("should render template with valid values", async () => {
155 |       const mockContent =
156 |         "Hello {{TITLE}}, Count: {{COUNT}}, Active: {{ACTIVE}}";
157 |       (documentFactory.readFile as jest.Mock).mockResolvedValue(mockContent);
158 | 
159 |       const template = new Template("page", basicSchema);
160 |       await template.load(TEMPLATE_PATH);
161 | 
162 |       const rendered = template.render({
163 |         TITLE: "World",
164 |         COUNT: 42,
165 |         ACTIVE: true
166 |       });
167 | 
168 |       expect(rendered).toBe("Hello World, Count: 42, Active: true");
169 |     });
170 | 
171 |     it("should throw error for invalid values", async () => {
172 |       const mockContent = "Hello {{TITLE}}, Count: {{COUNT}}";
173 |       (documentFactory.readFile as jest.Mock).mockResolvedValue(mockContent);
174 | 
175 |       const template = new Template("page", basicSchema);
176 |       await template.load(TEMPLATE_PATH);
177 | 
178 |       expect(() => template.render({ TITLE: 123, COUNT: "invalid" })).toThrow(
179 |         "Template content validation failed for page"
180 |       );
181 |     });
182 | 
183 |     it("should handle missing optional values in template as error", async () => {
184 |       const optionalSchema = z.object({
185 |         REQUIRED: z.string(),
186 |         OPTIONAL: z.string().optional()
187 |       });
188 | 
189 |       const mockContent = "{{REQUIRED}} {{OPTIONAL}}";
190 |       (documentFactory.readFile as jest.Mock).mockResolvedValue(mockContent);
191 | 
192 |       const template = new Template("page", optionalSchema);
193 |       await template.load(TEMPLATE_PATH);
194 | 
195 |       try {
196 |         template.render({ REQUIRED: "Hello" });
197 |       } catch (error: unknown) {
198 |         expect(error).toBeInstanceOf(Error);
199 |         expect((error as Error).message).toBe(
200 |           "Missing required values for tokens: OPTIONAL"
201 |         );
202 |       }
203 |     });
204 | 
205 |     it("should handle complex token patterns", async () => {
206 |       const mockContent = "{{TITLE}} {{TITLE}} {{COUNT}} {{TITLE}}";
207 |       (documentFactory.readFile as jest.Mock).mockResolvedValue(mockContent);
208 | 
209 |       const template = new Template("page", basicSchema);
210 |       await template.load(TEMPLATE_PATH);
211 | 
212 |       const rendered = template.render({
213 |         TITLE: "Hello",
214 |         COUNT: 42,
215 |         ACTIVE: false
216 |       });
217 | 
218 |       expect(rendered).toBe("Hello Hello 42 Hello");
219 |     });
220 |   });
221 | 
222 |   describe("Error Handling", () => {
223 |     it("should handle template with no tokens", async () => {
224 |       const mockContent = "Hello World";
225 |       (documentFactory.readFile as jest.Mock).mockResolvedValue(mockContent);
226 | 
227 |       const template = new Template("page", basicSchema);
228 | 
229 |       await template.load(TEMPLATE_PATH);
230 |       // template should be invalid
231 |       const rendered = template.render({});
232 |       expect(rendered).toBe(mockContent);
233 |     });
234 | 
235 |     it("should handle undefined token values", async () => {
236 |       const mockContent = "Hello {{TITLE}}";
237 |       (documentFactory.readFile as jest.Mock).mockResolvedValue(mockContent);
238 | 
239 |       const template = new Template("page", basicSchema);
240 |       await template.load(TEMPLATE_PATH);
241 | 
242 |       try {
243 |         template.render({});
244 |       } catch (error: unknown) {
245 |         expect(error).toBeInstanceOf(Error);
246 |         expect((error as Error).message).toBe(
247 |           "Missing required values for tokens: TITLE"
248 |         );
249 |       }
250 |     });
251 |   });
252 | });
253 | 
```

---------------------------------------------------------------------------


## File: DocumentTreeBuild.test.ts
- Path: `/root/git/codewrangler/src/services/builder/__tests__/DocumentTreeBuild.test.ts`
- Size: 5.73 KB
- Extension: .ts
- Lines of code: 163
- Content:

```ts
  1 | import { RenderableDirectory } from "../../../core/entities/NodeDirectory";
  2 | import { RenderableFile } from "../../../core/entities/NodeFile";
  3 | import { FILE_TYPE } from "../../../types/type";
  4 | import { JobConfig } from "../../../utils/config";
  5 | import { logger } from "../../../utils/logger";
  6 | import { DocumentTreeBuilder } from "../DocumentTreeBuilder";
  7 | import { NodeTreeBuilder } from "../NodeTreeBuilder";
  8 | 
  9 | jest.mock("../NodeTreeBuilder");
 10 | jest.mock("../../../core/entities/NodeDirectory");
 11 | jest.mock("../../../core/entities/NodeFile");
 12 | jest.mock("../../../utils/logger");
 13 | jest.mock("../../../utils/config");
 14 | 
 15 | describe("DocumentTreeBuilder", () => {
 16 |   let mockConfig: jest.Mocked<JobConfig>;
 17 |   let documentTreeBuilder: DocumentTreeBuilder;
 18 |   let mockNodeTreeBuilder: jest.Mocked<NodeTreeBuilder>;
 19 |   const TEMPLATE_PATH = "/test/test.txt";
 20 | 
 21 |   beforeEach(() => {
 22 |     // Reset all mocks
 23 |     jest.clearAllMocks();
 24 | 
 25 |     // Set up mock config
 26 |     mockConfig = {
 27 |       get: jest.fn()
 28 |     } as unknown as jest.Mocked<JobConfig>;
 29 | 
 30 |     // Set up mock NodeTreeBuilder
 31 |     mockNodeTreeBuilder = {
 32 |       build: jest.fn()
 33 |     } as unknown as jest.Mocked<NodeTreeBuilder>;
 34 | 
 35 |     (NodeTreeBuilder as jest.Mock).mockImplementation(
 36 |       () => mockNodeTreeBuilder
 37 |     );
 38 | 
 39 |     // Create instance of DocumentTreeBuilder
 40 |     documentTreeBuilder = new DocumentTreeBuilder(mockConfig);
 41 |   });
 42 | 
 43 |   describe("build", () => {
 44 |     it("should successfully build a document tree with a single file", async () => {
 45 |       const mockFileNode = {
 46 |         name: "test.txt",
 47 |         path: TEMPLATE_PATH,
 48 |         type: FILE_TYPE.File
 49 |       };
 50 | 
 51 |       mockNodeTreeBuilder.build.mockResolvedValue(mockFileNode);
 52 | 
 53 |       (RenderableFile as jest.Mock).mockImplementation(() => ({
 54 |         bundle: jest.fn().mockResolvedValue(undefined)
 55 |       }));
 56 | 
 57 |       await documentTreeBuilder.build();
 58 | 
 59 |       expect(mockNodeTreeBuilder.build).toHaveBeenCalledTimes(1);
 60 |       expect(RenderableFile).toHaveBeenCalledWith("test.txt", TEMPLATE_PATH);
 61 |     });
 62 | 
 63 |     it("should successfully build a document tree with a directory structure", async () => {
 64 |       const mockTree = {
 65 |         name: "root",
 66 |         path: "/test",
 67 |         type: FILE_TYPE.Directory,
 68 |         children: [
 69 |           {
 70 |             name: "test.txt",
 71 |             path: TEMPLATE_PATH,
 72 |             type: FILE_TYPE.File
 73 |           },
 74 |           {
 75 |             name: "subdir",
 76 |             path: "/test/subdir",
 77 |             type: FILE_TYPE.Directory,
 78 |             children: [
 79 |               {
 80 |                 name: "subfile.txt",
 81 |                 path: "/test/subdir/subfile.txt",
 82 |                 type: FILE_TYPE.File
 83 |               }
 84 |             ]
 85 |           }
 86 |         ]
 87 |       };
 88 | 
 89 |       mockNodeTreeBuilder.build.mockResolvedValue(mockTree);
 90 | 
 91 |       const mockDirectory = {
 92 |         addChild: jest.fn().mockResolvedValue(undefined),
 93 |         bundle: jest.fn().mockResolvedValue(undefined)
 94 |       };
 95 | 
 96 |       (RenderableDirectory as jest.Mock).mockImplementation(
 97 |         () => mockDirectory
 98 |       );
 99 |       (RenderableFile as jest.Mock).mockImplementation(() => ({
100 |         bundle: jest.fn().mockResolvedValue(undefined)
101 |       }));
102 | 
103 |       await documentTreeBuilder.build();
104 | 
105 |       expect(mockNodeTreeBuilder.build).toHaveBeenCalledTimes(1);
106 |       expect(RenderableDirectory).toHaveBeenCalledTimes(2);
107 |       expect(RenderableFile).toHaveBeenCalledTimes(2);
108 |       expect(mockDirectory.addChild).toHaveBeenCalledTimes(3);
109 |     });
110 | 
111 |     it("should handle errors during tree building", async () => {
112 |       const error = new Error("Build failed");
113 |       mockNodeTreeBuilder.build.mockRejectedValue(error);
114 | 
115 |       await expect(documentTreeBuilder.build()).rejects.toThrow("Build failed");
116 |       expect(logger.error).toHaveBeenCalledWith(
117 |         "Error building document tree",
118 |         error
119 |       );
120 |     });
121 | 
122 |     it("should handle errors during document structure creation", async () => {
123 |       const mockTree = {
124 |         name: "root",
125 |         path: "/test",
126 |         type: FILE_TYPE.Directory,
127 |         children: [
128 |           {
129 |             name: "test.txt",
130 |             path: TEMPLATE_PATH,
131 |             type: FILE_TYPE.File
132 |           }
133 |         ]
134 |       };
135 | 
136 |       mockNodeTreeBuilder.build.mockResolvedValue(mockTree);
137 |       (RenderableDirectory as jest.Mock).mockImplementation(() => {
138 |         throw new Error("Failed to create directory");
139 |       });
140 | 
141 |       await expect(documentTreeBuilder.build()).rejects.toThrow(
142 |         "Failed to create directory"
143 |       );
144 |       expect(logger.error).toHaveBeenCalled();
145 |     });
146 | 
147 |     it("should handle errors during bundle process", async () => {
148 |       const mockTree = {
149 |         name: "root",
150 |         path: "/test",
151 |         type: FILE_TYPE.Directory,
152 |         children: []
153 |       };
154 | 
155 |       mockNodeTreeBuilder.build.mockResolvedValue(mockTree);
156 | 
157 |       const mockDirectory = {
158 |         addChild: jest.fn().mockResolvedValue(undefined),
159 |         bundle: jest.fn().mockRejectedValue(new Error("Bundle failed"))
160 |       };
161 | 
162 |       (RenderableDirectory as jest.Mock).mockImplementation(
163 |         () => mockDirectory
164 |       );
165 | 
166 |       await expect(documentTreeBuilder.build()).rejects.toThrow(
167 |         "Bundle failed"
168 |       );
169 |       expect(logger.error).toHaveBeenCalled();
170 |     });
171 | 
172 |     it("should handle empty file trees", async () => {
173 |       const mockTree = {
174 |         name: "root",
175 |         path: "/test",
176 |         type: FILE_TYPE.Directory,
177 |         children: []
178 |       };
179 | 
180 |       mockNodeTreeBuilder.build.mockResolvedValue(mockTree);
181 | 
182 |       const mockDirectory = {
183 |         addChild: jest.fn().mockResolvedValue(undefined),
184 |         bundle: jest.fn().mockResolvedValue(undefined)
185 |       };
186 | 
187 |       (RenderableDirectory as jest.Mock).mockImplementation(
188 |         () => mockDirectory
189 |       );
190 | 
191 |       await documentTreeBuilder.build();
192 | 
193 |       expect(mockDirectory.addChild).not.toHaveBeenCalled();
194 |       expect(mockDirectory.bundle).toHaveBeenCalled();
195 |     });
196 |   });
197 | });
198 | 
```

---------------------------------------------------------------------------


## File: FileHidden.test.ts
- Path: `/root/git/codewrangler/src/services/builder/__tests__/FileHidden.test.ts`
- Size: 5.03 KB
- Extension: .ts
- Lines of code: 128
- Content:

```ts
  1 | import { IJobConfig, JobConfig } from "../../../utils/config";
  2 | import FileHidden from "../FileHidden";
  3 | 
  4 | jest.mock("../../../utils/config", () => ({
  5 |   JobConfig: {
  6 |     load: jest.fn()
  7 |   }
  8 | }));
  9 | 
 10 | describe("FileHidden", () => {
 11 |   let mockConfig: jest.Mocked<JobConfig>;
 12 |   let fileHidden: FileHidden;
 13 | 
 14 |   beforeEach(() => {
 15 |     mockConfig = {
 16 |       get: jest.fn()
 17 |     } as unknown as jest.Mocked<JobConfig>;
 18 | 
 19 |     // Set default mock values
 20 |     mockConfig.get.mockImplementation((key: keyof IJobConfig) => {
 21 |       switch (key) {
 22 |         case "ignoreHiddenFiles":
 23 |           return true;
 24 |         case "excludePatterns":
 25 |           return ["node_modules/**", "**/*.test.ts", "dist/**"];
 26 |         case "additionalIgnoreFiles":
 27 |           return [];
 28 |         default:
 29 |           return "";
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
 87 |           if (key === "additionalIgnoreFiles") {
 88 |             return ["*.log", "temp/**"];
 89 |           }
 90 |           return [];
 91 |         });
 92 |         fileHidden = new FileHidden(mockConfig);
 93 | 
 94 |         expect(fileHidden.shouldExclude("error.log")).toBe(true);
 95 |         expect(fileHidden.shouldExclude("temp/cache.json")).toBe(true);
 96 |       });
 97 | 
 98 |       it("should not exclude files not matching additional ignore patterns", () => {
 99 |         mockConfig.get.mockImplementation((key: string) => {
100 |           if (key === "additionalIgnoreFiles") {
101 |             return ["*.log", "temp/**"];
102 |           }
103 |           return [];
104 |         });
105 |         fileHidden = new FileHidden(mockConfig);
106 | 
107 |         expect(fileHidden.shouldExclude("src/index.ts")).toBe(false);
108 |         expect(fileHidden.shouldExclude("data/cache.json")).toBe(false);
109 |       });
110 |     });
111 | 
112 |     describe("combined patterns handling", () => {
113 |       beforeEach(() => {
114 |         mockConfig.get.mockImplementation((key: keyof IJobConfig) => {
115 |           switch (key) {
116 |             case "ignoreHiddenFiles":
117 |               return true;
118 |             case "excludePatterns":
119 |               return ["*.test.ts", "dist/**"];
120 |             case "additionalIgnoreFiles":
121 |               return ["*.log", "temp/**"];
122 |             default:
123 |               return "";
124 |           }
125 |         });
126 |         fileHidden = new FileHidden(mockConfig);
127 |       });
128 | 
129 |       it("should exclude files matching any exclusion rule", () => {
130 |         // Hidden files
131 |         expect(fileHidden.shouldExclude(".env")).toBe(true);
132 |         // Exclude patterns
133 |         expect(fileHidden.shouldExclude("component.test.ts")).toBe(true);
134 |         expect(fileHidden.shouldExclude("dist/bundle.js")).toBe(true);
135 |         // Additional ignore files
136 |         expect(fileHidden.shouldExclude("error.log")).toBe(true);
137 |         expect(fileHidden.shouldExclude("temp/file.txt")).toBe(true);
138 |       });
139 | 
140 |       it("should not exclude files not matching any exclusion rule", () => {
141 |         expect(fileHidden.shouldExclude("src/index.ts")).toBe(false);
142 |         expect(fileHidden.shouldExclude("package.json")).toBe(false);
143 |         expect(fileHidden.shouldExclude("docs/README.md")).toBe(false);
144 |       });
145 |     });
146 |   });
147 | });
148 | 
```

---------------------------------------------------------------------------


## File: NodeTreeBuilder.test.ts
- Path: `/root/git/codewrangler/src/services/builder/__tests__/NodeTreeBuilder.test.ts`
- Size: 7.72 KB
- Extension: .ts
- Lines of code: 220
- Content:

```ts
  1 | import { documentFactory } from "../../../infrastructure/filesystem/DocumentFactory";
  2 | import { fileStatsService } from "../../../infrastructure/filesystem/FileStats";
  3 | import { FILE_TYPE } from "../../../types/type";
  4 | import { IJobConfig, JobConfig } from "../../../utils/config";
  5 | import FileHidden from "../FileHidden";
  6 | import { NodeTreeBuilder } from "../NodeTreeBuilder";
  7 | 
  8 | jest.mock("../../../utils/config");
  9 | jest.mock("../../../infrastructure/filesystem/DocumentFactory");
 10 | jest.mock("../FileHidden");
 11 | jest.mock("../../../infrastructure/filesystem/FileStats");
 12 | 
 13 | describe("NodeTreeBuilder", () => {
 14 |   let mockConfig: jest.Mocked<JobConfig>;
 15 |   let nodeTreeBuilder: NodeTreeBuilder;
 16 | 
 17 |   beforeEach(() => {
 18 |     jest.clearAllMocks();
 19 | 
 20 |     mockConfig = {
 21 |       get: jest.fn()
 22 |     } as unknown as jest.Mocked<JobConfig>;
 23 | 
 24 |     mockConfig.get.mockImplementation((key: keyof IJobConfig) => {
 25 |       switch (key) {
 26 |         case "rootDir":
 27 |           return "/test/dir";
 28 |         case "pattern":
 29 |           return ".*";
 30 |         case "maxDepth":
 31 |           return 10;
 32 |         case "excludePatterns":
 33 |           return ["node_modules/**"];
 34 |         case "additionalIgnoreFiles":
 35 |           return [];
 36 |         default:
 37 |           return "";
 38 |       }
 39 |     });
 40 | 
 41 |     // Configure FileHidden mock with default behavior
 42 |     (FileHidden as jest.Mock).mockImplementation(() => ({
 43 |       shouldExclude: jest.fn().mockReturnValue(false)
 44 |     }));
 45 | 
 46 |     nodeTreeBuilder = new NodeTreeBuilder(mockConfig);
 47 |   });
 48 | 
 49 |   describe("initialization", () => {
 50 |     it("should initialize with correct config values", () => {
 51 |       expect(mockConfig.get).toHaveBeenCalledWith("rootDir");
 52 |       expect(mockConfig.get).toHaveBeenCalledWith("pattern");
 53 |       expect(mockConfig.get).toHaveBeenCalledWith("maxDepth");
 54 |       expect(mockConfig.get).toHaveBeenCalledWith("excludePatterns");
 55 |       expect(mockConfig.get).toHaveBeenCalledWith("additionalIgnoreFiles");
 56 |     });
 57 |   });
 58 | 
 59 |   describe("build", () => {
 60 |     const SUBDIR_PATH = "/test/dir/subdir";
 61 | 
 62 |     it("should throw error if root directory doesn't exist", async () => {
 63 |       (documentFactory.exists as jest.Mock).mockReturnValue(false);
 64 |       await expect(nodeTreeBuilder.build()).rejects.toThrow(
 65 |         "Directory /test/dir does not exist"
 66 |       );
 67 |     });
 68 | 
 69 |     it("should build root node with no children if directory is empty", async () => {
 70 |       (documentFactory.exists as jest.Mock).mockReturnValue(true);
 71 |       (fileStatsService as jest.Mock).mockResolvedValue({
 72 |         isDirectory: true,
 73 |         isFile: false,
 74 |         size: 0,
 75 |         created: new Date(),
 76 |         modified: new Date(),
 77 |         accessed: new Date(),
 78 |         permissions: {
 79 |           readable: true,
 80 |           writable: true,
 81 |           executable: true
 82 |         }
 83 |       });
 84 |       (documentFactory.baseName as jest.Mock).mockReturnValue("dir");
 85 |       (documentFactory.readDir as jest.Mock).mockResolvedValue([]);
 86 | 
 87 |       const result = await nodeTreeBuilder.build();
 88 | 
 89 |       expect(result).toEqual({
 90 |         name: "dir",
 91 |         path: "/test/dir",
 92 |         type: FILE_TYPE.Directory,
 93 |         children: []
 94 |       });
 95 |     });
 96 | 
 97 |     it("should build tree with files and directories", async () => {
 98 |       (documentFactory.exists as jest.Mock).mockReturnValue(true);
 99 |       (documentFactory.baseName as jest.Mock).mockImplementation(path =>
100 |         path.split("/").pop()
101 |       );
102 |       (documentFactory.join as jest.Mock).mockImplementation((...paths) =>
103 |         paths.join("/")
104 |       );
105 | 
106 |       // Setup mock responses for each path
107 |       const mockStats = new Map([
108 |         ["/test/dir", { isDirectory: true, isFile: false }],
109 |         ["/test/dir/file1.txt", { isDirectory: false, isFile: true }],
110 |         [SUBDIR_PATH, { isDirectory: true, isFile: false }],
111 |         [`${SUBDIR_PATH}/file2.txt`, { isDirectory: false, isFile: true }]
112 |       ]);
113 | 
114 |       (fileStatsService as jest.Mock).mockImplementation(path => ({
115 |         ...mockStats.get(path),
116 |         size: 1000,
117 |         created: new Date(),
118 |         modified: new Date(),
119 |         accessed: new Date(),
120 |         permissions: { readable: true, writable: true, executable: true }
121 |       }));
122 | 
123 |       (documentFactory.readDir as jest.Mock)
124 |         .mockResolvedValueOnce(["file1.txt", "subdir"])
125 |         .mockResolvedValueOnce(["file2.txt"]);
126 | 
127 |       const result = await nodeTreeBuilder.build();
128 | 
129 |       expect(result).toEqual({
130 |         name: "dir",
131 |         path: "/test/dir",
132 |         type: FILE_TYPE.Directory,
133 |         children: [
134 |           {
135 |             name: "file1.txt",
136 |             path: "/test/dir/file1.txt",
137 |             type: FILE_TYPE.File
138 |           },
139 |           {
140 |             name: "subdir",
141 |             path: SUBDIR_PATH,
142 |             type: FILE_TYPE.Directory,
143 |             children: [
144 |               {
145 |                 name: "file2.txt",
146 |                 path: `${SUBDIR_PATH}/file2.txt`,
147 |                 type: FILE_TYPE.File
148 |               }
149 |             ]
150 |           }
151 |         ]
152 |       });
153 |     });
154 | 
155 |     it("should respect maxDepth configuration", async () => {
156 |       mockConfig.get.mockImplementation(key =>
157 |         key === "maxDepth" ? 1 : mockConfig.get(key)
158 |       );
159 | 
160 |       (documentFactory.exists as jest.Mock).mockReturnValue(true);
161 |       (documentFactory.baseName as jest.Mock).mockImplementation(path =>
162 |         path.split("/").pop()
163 |       );
164 |       (documentFactory.join as jest.Mock).mockImplementation((...paths) =>
165 |         paths.join("/")
166 |       );
167 | 
168 |       const mockStats = new Map([
169 |         ["/test/dir", { isDirectory: true, isFile: false }],
170 |         [SUBDIR_PATH, { isDirectory: true, isFile: false }]
171 |       ]);
172 | 
173 |       (fileStatsService as jest.Mock).mockImplementation(path => ({
174 |         ...mockStats.get(path),
175 |         size: 1000,
176 |         created: new Date(),
177 |         modified: new Date(),
178 |         accessed: new Date(),
179 |         permissions: { readable: true, writable: true, executable: true }
180 |       }));
181 | 
182 |       (documentFactory.readDir as jest.Mock).mockResolvedValue(["subdir"]);
183 | 
184 |       const result = await nodeTreeBuilder.build();
185 | 
186 |       expect(result).toEqual({
187 |         name: "dir",
188 |         path: "/test/dir",
189 |         type: FILE_TYPE.Directory,
190 |         children: [
191 |           {
192 |             name: "subdir",
193 |             path: SUBDIR_PATH,
194 |             type: FILE_TYPE.Directory,
195 |             children: [
196 |               {
197 |                 name: "subdir",
198 |                 path: `${SUBDIR_PATH}/subdir`,
199 |                 type: FILE_TYPE.File
200 |               }
201 |             ]
202 |           }
203 |         ]
204 |       });
205 |     });
206 | 
207 |     it("should handle file exclusion", async () => {
208 |       (documentFactory.exists as jest.Mock).mockReturnValue(true);
209 |       (documentFactory.baseName as jest.Mock).mockImplementation(path =>
210 |         path.split("/").pop()
211 |       );
212 |       (documentFactory.join as jest.Mock).mockImplementation((...paths) =>
213 |         paths.join("/")
214 |       );
215 | 
216 |       const mockFileHidden = {
217 |         shouldExclude: jest
218 |           .fn()
219 |           .mockReturnValueOnce(false) // include.txt
220 |           .mockReturnValueOnce(true) // exclude.txt
221 |       };
222 | 
223 |       (FileHidden as jest.Mock).mockImplementation(() => mockFileHidden);
224 | 
225 |       (fileStatsService as jest.Mock).mockImplementation(path => ({
226 |         isDirectory: path === "/test/dir",
227 |         isFile: path !== "/test/dir",
228 |         size: 1000,
229 |         created: new Date(),
230 |         modified: new Date(),
231 |         accessed: new Date(),
232 |         permissions: { readable: true, writable: true, executable: true }
233 |       }));
234 | 
235 |       (documentFactory.readDir as jest.Mock).mockResolvedValue([
236 |         "include.txt",
237 |         "exclude.txt"
238 |       ]);
239 | 
240 |       const result = await nodeTreeBuilder.build();
241 | 
242 |       expect(result.children).toHaveLength(2);
243 |       const children = result.children;
244 |       expect(children).not.toBeNull();
245 |       if (children) {
246 |         const child1 = children[0];
247 |         const child2 = children[1];
248 |         expect(child1?.name).toBe("include.txt");
249 |         expect(child2?.name).toBe("exclude.txt");
250 |       }
251 |     });
252 |   });
253 | });
254 | 
```

---------------------------------------------------------------------------


## File: RenderHTMLStrategy.test.ts
- Path: `/root/git/codewrangler/src/services/renderer/__tests__/RenderHTMLStrategy.test.ts`
- Size: 2.47 KB
- Extension: .ts
- Lines of code: 70
- Content:

```ts
 1 | import { NodeFile } from "../../../core/entities/NodeFile";
 2 | import { Template } from "../../../infrastructure/templates/TemplateEngine";
 3 | import { Config, JobConfig } from "../../../utils/config";
 4 | import { OUTPUT_FORMATS } from "../../../utils/config/schema";
 5 | import { RenderHTMLStrategy } from "../strategies/HTMLStrategy";
 6 | 
 7 | jest.mock("../../../core/entities/NodeFile");
 8 | jest.mock("../../../infrastructure/templates/TemplateEngine");
 9 | jest.mock("../../../utils/config");
10 | 
11 | describe("RenderHTMLStrategy", () => {
12 |   let strategy: RenderHTMLStrategy;
13 |   let mockConfig: jest.Mocked<JobConfig>;
14 |   let mockTemplatePage: jest.Mocked<Template>;
15 |   let mockTemplateDirectory: jest.Mocked<Template>;
16 |   let mockTemplateFile: jest.Mocked<Template>;
17 |   let mockFile: jest.Mocked<NodeFile>;
18 | 
19 |   beforeEach(() => {
20 |     jest.clearAllMocks();
21 | 
22 |     mockConfig = {
23 |       get: jest.fn(),
24 |       global: {} as unknown as Config
25 |     } as unknown as jest.Mocked<JobConfig>;
26 | 
27 |     mockTemplatePage = {
28 |       content: "<html><body>{{CONTENT}}</body></html>",
29 |       render: jest.fn().mockReturnValue("rendered page")
30 |     } as unknown as jest.Mocked<Template>;
31 | 
32 |     mockTemplateDirectory = {
33 |       content: "<div class='directory'>{{DIRECTORY_CONTENT}}</div>",
34 |       render: jest.fn().mockReturnValue("rendered directory")
35 |     } as unknown as jest.Mocked<Template>;
36 | 
37 |     mockTemplateFile = {
38 |       content: "<div class='file'>{{FILE_CONTENTS}}</div>",
39 |       render: jest.fn().mockReturnValue("rendered file")
40 |     } as unknown as jest.Mocked<Template>;
41 | 
42 |     mockFile = {
43 |       name: "test.ts",
44 |       extension: ".ts",
45 |       content: "const test = 'hello';",
46 |       path: "/test/test.ts",
47 |       deep: 1,
48 |       size: 100,
49 |       props: {}
50 |     } as unknown as jest.Mocked<NodeFile>;
51 | 
52 |     strategy = new RenderHTMLStrategy(
53 |       mockConfig,
54 |       mockTemplatePage,
55 |       mockTemplateDirectory,
56 |       mockTemplateFile
57 |     );
58 |   });
59 | 
60 |   describe("initialization", () => {
61 |     it("should be instantiated with correct output format", () => {
62 |       expect(strategy.getName()).toBe(OUTPUT_FORMATS.html);
63 |     });
64 |   });
65 | 
66 |   describe("file rendering", () => {
67 |     it("should render file with HTML code block", () => {
68 |       strategy.renderFile(mockFile);
69 | 
70 |       expect(mockTemplateFile.render).toHaveBeenCalledWith({
71 |         FILE_NAME: "test.ts",
72 |         FILE_EXTENSION: "ts",
73 |         FILE_SIZE: 100,
74 |         FILE_DEPTH: 1,
75 |         FILE_LINES: 1,
76 |         FILE_PATH: "/test/test.ts",
77 |         FILE_CONTENTS: "const test = 'hello';",
78 |         ...mockFile.props
79 |       });
80 |     });
81 |   });
82 | });
83 | 
```

---------------------------------------------------------------------------


## File: RenderMarkdownStrategy.test.ts
- Path: `/root/git/codewrangler/src/services/renderer/__tests__/RenderMarkdownStrategy.test.ts`
- Size: 2.45 KB
- Extension: .ts
- Lines of code: 70
- Content:

```ts
 1 | import { NodeFile } from "../../../core/entities/NodeFile";
 2 | import { Template } from "../../../infrastructure/templates/TemplateEngine";
 3 | import { Config, JobConfig } from "../../../utils/config";
 4 | import { RenderMarkdownStrategy } from "../strategies/MarkdownStrategy";
 5 | 
 6 | jest.mock("../../../core/entities/NodeFile");
 7 | jest.mock("../../../infrastructure/templates/TemplateEngine");
 8 | jest.mock("../../../utils/config");
 9 | 
10 | describe("RenderMarkdownStrategy", () => {
11 |   let strategy: RenderMarkdownStrategy;
12 |   let mockConfig: jest.Mocked<JobConfig>;
13 |   let mockTemplatePage: jest.Mocked<Template>;
14 |   let mockTemplateDirectory: jest.Mocked<Template>;
15 |   let mockTemplateFile: jest.Mocked<Template>;
16 |   let mockFile: jest.Mocked<NodeFile>;
17 | 
18 |   beforeEach(() => {
19 |     jest.clearAllMocks();
20 | 
21 |     mockConfig = {
22 |       get: jest.fn(),
23 |       global: {} as unknown as Config
24 |     } as unknown as jest.Mocked<JobConfig>;
25 | 
26 |     mockTemplatePage = {
27 |       content: "# {{PROJECT_NAME}}\n{{CONTENT}}",
28 |       render: jest.fn().mockReturnValue("rendered page")
29 |     } as unknown as jest.Mocked<Template>;
30 | 
31 |     mockTemplateDirectory = {
32 |       content: "## {{DIRECTORY_NAME}}\n{{DIRECTORY_CONTENT}}",
33 |       render: jest.fn().mockReturnValue("rendered directory")
34 |     } as unknown as jest.Mocked<Template>;
35 | 
36 |     mockTemplateFile = {
37 |       content:
38 |         "### {{FILE_NAME}}\n```{{FILE_EXTENSION}}\n{{FILE_CONTENTS}}\n```",
39 |       render: jest.fn().mockReturnValue("rendered file")
40 |     } as unknown as jest.Mocked<Template>;
41 | 
42 |     mockFile = {
43 |       name: "test.ts",
44 |       extension: ".ts",
45 |       content: "const test = 'hello';",
46 |       path: "/test/test.ts",
47 |       deep: 1,
48 |       size: 100,
49 |       props: {}
50 |     } as unknown as jest.Mocked<NodeFile>;
51 | 
52 |     strategy = new RenderMarkdownStrategy(
53 |       mockConfig,
54 |       mockTemplatePage,
55 |       mockTemplateDirectory,
56 |       mockTemplateFile
57 |     );
58 |   });
59 | 
60 |   describe("initialization", () => {
61 |     it("should be instantiated with correct output format", () => {
62 |       expect(strategy.getName()).toBe("markdown");
63 |     });
64 |   });
65 | 
66 |   describe("file rendering", () => {
67 |     it("should render file with markdown code block", () => {
68 |       strategy.renderFile(mockFile);
69 | 
70 |       expect(mockTemplateFile.render).toHaveBeenCalledWith({
71 |         FILE_NAME: "test.ts",
72 |         FILE_EXTENSION: "ts",
73 |         FILE_SIZE: 100,
74 |         FILE_DEPTH: 1,
75 |         FILE_LINES: 1,
76 |         FILE_PATH: "/test/test.ts",
77 |         FILE_CONTENTS: "const test = 'hello';",
78 |         ...mockFile.props
79 |       });
80 |     });
81 |   });
82 | });
83 | 
```

---------------------------------------------------------------------------


## File: RenderStrategy.test.ts
- Path: `/root/git/codewrangler/src/services/renderer/__tests__/RenderStrategy.test.ts`
- Size: 5.26 KB
- Extension: .ts
- Lines of code: 160
- Content:

```ts
  1 | import { NodeDirectory } from "../../../core/entities/NodeDirectory";
  2 | import { NodeFile } from "../../../core/entities/NodeFile";
  3 | import { Template } from "../../../infrastructure/templates/TemplateEngine";
  4 | import { JobConfig } from "../../../utils/config";
  5 | import { RenderBaseStrategy } from "../RenderStrategy";
  6 | 
  7 | jest.mock("../../../core/entities/NodeFile");
  8 | jest.mock("../../../core/entities/NodeDirectory");
  9 | jest.mock("../../../infrastructure/templates/TemplateEngine");
 10 | jest.mock("../../../utils/config");
 11 | 
 12 | class TestRenderStrategy extends RenderBaseStrategy {
 13 |   public constructor(
 14 |     config: JobConfig,
 15 |     templatePage: Template,
 16 |     templateDirectory: Template,
 17 |     templateFile: Template
 18 |   ) {
 19 |     super(config, "markdown", templatePage, templateDirectory, templateFile);
 20 |   }
 21 | }
 22 | 
 23 | describe("RenderBaseStrategy", () => {
 24 |   const PROJECT_NAME = "Test Project";
 25 |   const RENDERED_FILE = "rendered file";
 26 |   const RENDERED_DIRECTORY = "rendered directory";
 27 |   const RENDERED_PAGE = "rendered page";
 28 | 
 29 |   let mockConfig: jest.Mocked<JobConfig>;
 30 |   let mockTemplatePage: jest.Mocked<Template>;
 31 |   let mockTemplateDirectory: jest.Mocked<Template>;
 32 |   let mockTemplateFile: jest.Mocked<Template>;
 33 |   let strategy: TestRenderStrategy;
 34 |   let mockFile: jest.Mocked<NodeFile>;
 35 |   let mockDirectory: jest.Mocked<NodeDirectory>;
 36 | 
 37 |   beforeEach(() => {
 38 |     jest.clearAllMocks();
 39 | 
 40 |     mockConfig = {
 41 |       get: jest.fn().mockReturnValue(PROJECT_NAME),
 42 |       global: {
 43 |         get: jest.fn().mockReturnValue(PROJECT_NAME)
 44 |       }
 45 |     } as unknown as jest.Mocked<JobConfig>;
 46 | 
 47 |     mockTemplatePage = {
 48 |       content: "page template",
 49 |       render: jest.fn().mockReturnValue(RENDERED_PAGE)
 50 |     } as unknown as jest.Mocked<Template>;
 51 | 
 52 |     mockTemplateDirectory = {
 53 |       content: "directory template",
 54 |       render: jest.fn().mockReturnValue(RENDERED_DIRECTORY)
 55 |     } as unknown as jest.Mocked<Template>;
 56 | 
 57 |     mockTemplateFile = {
 58 |       content: "file template",
 59 |       render: jest.fn().mockReturnValue(RENDERED_FILE)
 60 |     } as unknown as jest.Mocked<Template>;
 61 | 
 62 |     mockFile = {
 63 |       type: "file",
 64 |       name: "test.ts",
 65 |       path: "/test/test.ts",
 66 |       extension: ".ts",
 67 |       content: "test content",
 68 |       size: 100,
 69 |       deep: 1,
 70 |       props: {}
 71 |     } as unknown as jest.Mocked<NodeFile>;
 72 | 
 73 |     mockDirectory = {
 74 |       type: "directory",
 75 |       name: "test",
 76 |       path: "/test",
 77 |       size: 200,
 78 |       length: 2,
 79 |       deepLength: 3,
 80 |       deep: 0,
 81 |       children: [],
 82 |       props: {}
 83 |     } as unknown as jest.Mocked<NodeDirectory>;
 84 | 
 85 |     strategy = new TestRenderStrategy(
 86 |       mockConfig,
 87 |       mockTemplatePage,
 88 |       mockTemplateDirectory,
 89 |       mockTemplateFile
 90 |     );
 91 |   });
 92 | 
 93 |   describe("render", () => {
 94 |     it("should render a directory with nested structure", () => {
 95 |       const childFile = {
 96 |         ...mockFile,
 97 |         name: "child.ts"
 98 |       } as unknown as jest.Mocked<NodeFile>;
 99 |       const subDirectory = {
100 |         ...mockDirectory,
101 |         name: "subdir",
102 |         children: [childFile]
103 |       } as unknown as jest.Mocked<NodeDirectory>;
104 |       mockDirectory.children = [mockFile, subDirectory];
105 | 
106 |       const result = strategy.render(mockDirectory);
107 | 
108 |       expect(mockTemplatePage.render).toHaveBeenCalledWith({
109 |         PROJECT_NAME,
110 |         GENERATION_DATE: expect.any(String),
111 |         TOTAL_FILES: 2,
112 |         TOTAL_DIRECTORIES: 3,
113 |         TOTAL_SIZE: 200,
114 |         CONTENT: RENDERED_DIRECTORY
115 |       });
116 |       expect(result).toBe(RENDERED_PAGE);
117 |     });
118 | 
119 |     it("should render a single file", () => {
120 |       const result = strategy.render(mockFile as NodeFile);
121 | 
122 |       expect(mockTemplatePage.render).toHaveBeenCalledWith({
123 |         PROJECT_NAME,
124 |         GENERATION_DATE: expect.any(String),
125 |         TOTAL_SIZE: 100,
126 |         CONTENT: RENDERED_FILE
127 |       });
128 |       expect(result).toBe(RENDERED_PAGE);
129 |     });
130 | 
131 |     it("should render an empty directory", () => {
132 |       mockDirectory.children = [];
133 | 
134 |       const result = strategy.render(mockDirectory as NodeDirectory);
135 | 
136 |       expect(mockTemplateDirectory.render).toHaveBeenCalledWith({
137 |         DIRECTORY_NAME: "test",
138 |         DIRECTORY_PATH: "/test",
139 |         DIRECTORY_SIZE: 200,
140 |         DIRECTORY_LENGTH: 2,
141 |         DIRECTORY_DEEP_LENGTH: 3,
142 |         DIRECTORY_DEPTH: 0,
143 |         DIRECTORY_CONTENT: "",
144 |         ...mockDirectory.props
145 |       });
146 |       expect(result).toBe(RENDERED_PAGE);
147 |     });
148 |   });
149 | 
150 |   describe("template handling", () => {
151 |     it("should handle file template data", () => {
152 |       strategy.render(mockFile as NodeFile);
153 | 
154 |       expect(mockTemplateFile.render).toHaveBeenCalledWith({
155 |         FILE_NAME: "test.ts",
156 |         FILE_EXTENSION: "ts",
157 |         FILE_SIZE: 100,
158 |         FILE_DEPTH: 1,
159 |         FILE_LINES: 1,
160 |         FILE_PATH: "/test/test.ts",
161 |         FILE_CONTENTS: "test content",
162 |         ...mockFile.props
163 |       });
164 |     });
165 |   });
166 | 
167 |   describe("disposal", () => {
168 |     it("should dispose all templates", () => {
169 |       mockTemplatePage.dispose = jest.fn();
170 |       mockTemplateDirectory.dispose = jest.fn();
171 |       mockTemplateFile.dispose = jest.fn();
172 | 
173 |       strategy.dispose();
174 | 
175 |       expect(mockTemplatePage.dispose).toHaveBeenCalled();
176 |       expect(mockTemplateDirectory.dispose).toHaveBeenCalled();
177 |       expect(mockTemplateFile.dispose).toHaveBeenCalled();
178 |     });
179 |   });
180 | 
181 |   describe("name", () => {
182 |     it("should return the strategy name", () => {
183 |       expect(strategy.getName()).toBe("markdown");
184 |     });
185 |   });
186 | });
187 | 
```

---------------------------------------------------------------------------


## File: RenderStrategyBuilder.test.ts
- Path: `/root/git/codewrangler/src/services/renderer/__tests__/RenderStrategyBuilder.test.ts`
- Size: 4.06 KB
- Extension: .ts
- Lines of code: 109
- Content:

```ts
  1 | import { Template } from "../../../infrastructure/templates/TemplateEngine";
  2 | import {
  3 |   Config,
  4 |   JobConfig,
  5 |   OutputFormat,
  6 |   OutputFormatExtension
  7 | } from "../../../utils/config";
  8 | import { RenderStrategyBuilder } from "../RenderStrategyBuilder";
  9 | import { RenderHTMLStrategy } from "../strategies/HTMLStrategy";
 10 | import { RenderMarkdownStrategy } from "../strategies/MarkdownStrategy";
 11 | 
 12 | jest.mock("../../../infrastructure/templates/TemplateEngine");
 13 | jest.mock("../../../utils/config");
 14 | jest.mock("../strategies/HTMLStrategy");
 15 | jest.mock("../strategies/MarkdownStrategy");
 16 | 
 17 | describe("RenderStrategyBuilder", () => {
 18 |   let builder: RenderStrategyBuilder;
 19 |   let mockConfig: jest.Mocked<JobConfig>;
 20 |   let mockTemplate: jest.Mocked<Template>;
 21 | 
 22 |   beforeEach(() => {
 23 |     jest.clearAllMocks();
 24 | 
 25 |     mockConfig = {
 26 |       get: jest.fn(),
 27 |       global: {} as unknown as Config
 28 |     } as unknown as jest.Mocked<JobConfig>;
 29 | 
 30 |     mockTemplate = {
 31 |       content: "template content"
 32 |     } as unknown as jest.Mocked<Template>;
 33 | 
 34 |     (Template.getTemplateDir as jest.Mock).mockReturnValue("/templates");
 35 |     (Template.create as jest.Mock).mockResolvedValue(mockTemplate);
 36 | 
 37 |     builder = new RenderStrategyBuilder();
 38 |   });
 39 | 
 40 |   describe("configuration", () => {
 41 |     it("should set and store config", () => {
 42 |       const result = builder.setConfig(mockConfig);
 43 | 
 44 |       expect(builder["config"]).toBe(mockConfig);
 45 |       expect(result).toBe(builder);
 46 |     });
 47 | 
 48 |     it("should set and store extension", () => {
 49 |       const result = builder.setExtension("md");
 50 | 
 51 |       expect(builder["extension"]).toBe("md");
 52 |       expect(result).toBe(builder);
 53 |     });
 54 | 
 55 |     it("should set and store name", () => {
 56 |       const result = builder.setName("markdown");
 57 | 
 58 |       expect(builder["name"]).toBe("markdown");
 59 |       expect(result).toBe(builder);
 60 |     });
 61 |   });
 62 | 
 63 |   describe("template loading", () => {
 64 |     beforeEach(() => {
 65 |       builder.setConfig(mockConfig);
 66 |       builder.setExtension("md");
 67 |     });
 68 | 
 69 |     it("should load all required templates", async () => {
 70 |       const result = await builder.loadTemplates();
 71 | 
 72 |       expect(Template.create).toHaveBeenCalledTimes(3);
 73 |       expect(result).toBe(builder);
 74 |       expect(builder["templatePage"]).toBeTruthy();
 75 |       expect(builder["templateDirectory"]).toBeTruthy();
 76 |       expect(builder["templateFile"]).toBeTruthy();
 77 |     });
 78 | 
 79 |     it("should handle template loading errors", async () => {
 80 |       (Template.create as jest.Mock).mockRejectedValue(
 81 |         new Error("Load failed")
 82 |       );
 83 | 
 84 |       await expect(builder.loadTemplates()).rejects.toThrow("Load failed");
 85 |     });
 86 |   });
 87 | 
 88 |   describe("build", () => {
 89 |     it("should build Markdown strategy when configured", async () => {
 90 |       await setupBuilder("markdown", "md");
 91 | 
 92 |       const result = builder.build();
 93 | 
 94 |       expect(result).toBeInstanceOf(RenderMarkdownStrategy);
 95 |     });
 96 | 
 97 |     it("should build HTML strategy when configured", async () => {
 98 |       await setupBuilder("html", "html");
 99 | 
100 |       const result = builder.build();
101 | 
102 |       expect(result).toBeInstanceOf(RenderHTMLStrategy);
103 |     });
104 | 
105 |     it("should throw error if config is missing", () => {
106 |       expect(() => builder.build()).toThrow("Config is required");
107 |     });
108 | 
109 |     it("should throw error if extension is missing", () => {
110 |       builder.setConfig(mockConfig);
111 | 
112 |       expect(() => builder.build()).toThrow("Extension is required");
113 |     });
114 | 
115 |     it("should throw error if name is missing", () => {
116 |       builder.setConfig(mockConfig);
117 |       builder.setExtension("md");
118 | 
119 |       expect(() => builder.build()).toThrow("Name is required");
120 |     });
121 | 
122 |     it("should throw error if templates are not loaded", () => {
123 |       builder.setConfig(mockConfig);
124 |       builder.setExtension("md");
125 |       builder.setName("markdown");
126 | 
127 |       expect(() => builder.build()).toThrow(
128 |         "Templates must be loaded before building"
129 |       );
130 |     });
131 |   });
132 | 
133 |   // Helper function to setup builder with all required configurations
134 |   async function setupBuilder(
135 |     name: OutputFormat,
136 |     extension: OutputFormatExtension
137 |   ): Promise<void> {
138 |     builder.setConfig(mockConfig).setExtension(extension).setName(name);
139 |     await builder.loadTemplates();
140 |   }
141 | });
142 | 
```

---------------------------------------------------------------------------


## File: Logger.test.ts
- Path: `/root/git/codewrangler/src/utils/logger/__tests__/Logger.test.ts`
- Size: 5.32 KB
- Extension: .ts
- Lines of code: 148
- Content:

```ts
  1 | /* eslint-disable no-console */
  2 | import colors from "colors";
  3 | 
  4 | import { Config } from "../../config";
  5 | import { LOG_LEVEL, LOG_VALUES, Logger } from "../Logger";
  6 | 
  7 | jest.mock("../../config");
  8 | jest.spyOn(console, "log").mockImplementation(() => {});
  9 | 
 10 | describe("Logger", () => {
 11 |   let logger: Logger;
 12 |   let mockConfig: jest.Mocked<Config>;
 13 | 
 14 |   beforeEach(() => {
 15 |     jest.clearAllMocks();
 16 | 
 17 |     mockConfig = {
 18 |       get: jest.fn(),
 19 |       set: jest.fn()
 20 |     } as unknown as jest.Mocked<Config>;
 21 | 
 22 |     logger = Logger.load();
 23 |   });
 24 | 
 25 |   describe("Singleton Pattern", () => {
 26 |     it("should create only one instance of Logger", () => {
 27 |       const instance1 = Logger.load();
 28 |       const instance2 = Logger.load();
 29 |       expect(instance1).toBe(instance2);
 30 |     });
 31 |   });
 32 | 
 33 |   describe("Configuration", () => {
 34 |     it("should set config correctly", () => {
 35 |       const result = logger.setConfig(mockConfig);
 36 |       expect(result).toBe(logger);
 37 |       expect(logger["config"]).toBe(mockConfig);
 38 |     });
 39 | 
 40 |     it("should set log level when config is present", () => {
 41 |       logger.setConfig(mockConfig);
 42 |       const result = logger.setLogLevel("DEBUG");
 43 | 
 44 |       expect(result).toBe(logger);
 45 |       expect(mockConfig.set).toHaveBeenCalledWith("logLevel", "DEBUG");
 46 |     });
 47 | 
 48 |     it("should not set log level when config is not present", () => {
 49 |       const result = logger.setLogLevel("DEBUG");
 50 | 
 51 |       expect(result).toBe(logger);
 52 |       expect(mockConfig.set).not.toHaveBeenCalled();
 53 |     });
 54 | 
 55 |     it("should return ERROR level when config returns undefined", () => {
 56 |       logger.setConfig(mockConfig);
 57 |       mockConfig.get.mockReturnValue(undefined);
 58 |       expect(logger["logLevel"]).toBe(LOG_LEVEL.ERROR);
 59 |     });
 60 | 
 61 |     it("should return correct log level from config", () => {
 62 |       logger.setConfig(mockConfig);
 63 |       mockConfig.get.mockReturnValue("DEBUG");
 64 |       expect(logger["logLevel"]).toBe(LOG_LEVEL.DEBUG);
 65 |     });
 66 |   });
 67 | 
 68 |   describe("Logging Methods", () => {
 69 |     beforeEach(() => {
 70 |       logger.setConfig(mockConfig);
 71 |     });
 72 |     const TEST_ERROR = "Test error";
 73 | 
 74 |     describe("error", () => {
 75 |       it("should log error messages when level is ERROR or higher", () => {
 76 |         mockConfig.get.mockReturnValue("ERROR");
 77 |         logger.error(TEST_ERROR);
 78 |         expect(console.log).toHaveBeenCalledWith(
 79 |           colors.red(`[ERROR] ${TEST_ERROR}`)
 80 |         );
 81 |       });
 82 | 
 83 |       it("should log error with stack trace when error object is provided", () => {
 84 |         mockConfig.get.mockReturnValue("ERROR");
 85 |         const error = new Error(TEST_ERROR);
 86 |         logger.error("Error occurred", error);
 87 | 
 88 |         expect(console.log).toHaveBeenCalledWith(
 89 |           colors.red("[ERROR] Error occurred")
 90 |         );
 91 |         expect(console.log).toHaveBeenCalledWith(colors.red(error.stack ?? ""));
 92 |       });
 93 | 
 94 |       it("should log additional arguments", () => {
 95 |         mockConfig.get.mockReturnValue("ERROR");
 96 |         logger.error(TEST_ERROR, undefined, { details: "test" });
 97 |         expect(console.log).toHaveBeenCalledWith(
 98 |           colors.red(`[ERROR] ${TEST_ERROR}`),
 99 |           { details: "test" }
100 |         );
101 |       });
102 |     });
103 | 
104 |     describe("warn", () => {
105 |       it("should log warn messages when level is WARN or higher", () => {
106 |         mockConfig.get.mockReturnValue("WARN");
107 |         logger.warn("Test warning");
108 |         expect(console.log).toHaveBeenCalledWith(
109 |           colors.yellow("[WARN] Test warning")
110 |         );
111 |       });
112 | 
113 |       it("should not log warn messages when level is ERROR", () => {
114 |         mockConfig.get.mockReturnValue("ERROR");
115 |         logger.warn("Test warning");
116 |         expect(console.log).not.toHaveBeenCalled();
117 |       });
118 |     });
119 | 
120 |     describe("info", () => {
121 |       it("should log info messages when level is INFO or higher", () => {
122 |         mockConfig.get.mockReturnValue("INFO");
123 |         logger.info("Test info");
124 |         expect(console.log).toHaveBeenCalledWith(
125 |           colors.blue("[INFO] Test info")
126 |         );
127 |       });
128 | 
129 |       it("should not log info messages when level is WARN", () => {
130 |         mockConfig.get.mockReturnValue("WARN");
131 |         logger.info("Test info");
132 |         expect(console.log).not.toHaveBeenCalled();
133 |       });
134 |     });
135 | 
136 |     describe("debug", () => {
137 |       it("should log debug messages when level is DEBUG", () => {
138 |         mockConfig.get.mockReturnValue("DEBUG");
139 |         logger.debug("Test debug");
140 |         expect(console.log).toHaveBeenCalledWith(
141 |           colors.gray("[DEBUG] Test debug")
142 |         );
143 |       });
144 | 
145 |       it("should not log debug messages when level is INFO", () => {
146 |         mockConfig.get.mockReturnValue("INFO");
147 |         logger.debug("Test debug");
148 |         expect(console.log).not.toHaveBeenCalled();
149 |       });
150 |     });
151 | 
152 |     describe("success", () => {
153 |       it("should always log success messages in green", () => {
154 |         mockConfig.get.mockReturnValue("ERROR");
155 |         logger.success("Operation successful");
156 |         expect(console.log).toHaveBeenCalledWith(
157 |           colors.green("Operation successful")
158 |         );
159 |       });
160 |     });
161 | 
162 |     describe("log", () => {
163 |       it("should always log plain messages without color", () => {
164 |         mockConfig.get.mockReturnValue("ERROR");
165 |         logger.log("Plain message");
166 |         expect(console.log).toHaveBeenCalledWith("Plain message");
167 |       });
168 |     });
169 |   });
170 | 
171 |   describe("Log Values", () => {
172 |     it("should export correct log level values", () => {
173 |       expect(LOG_VALUES).toEqual(["ERROR", "WARN", "INFO", "DEBUG"]);
174 |     });
175 |   });
176 | });
177 | 
```

---------------------------------------------------------------------------

