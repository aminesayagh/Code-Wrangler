import { DocumentTree } from "../DocumentTree";
import { MOCK_PATH } from "../../__mocks__/mockFileSystem";

jest.unmock("fs/promises");
jest.unmock("../../utils/DocumentFactory");
jest.unmock("../DocumentTree");

describe("DocumentTree", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should build a tree structure from file paths", async () => {
    const tree = new DocumentTree(MOCK_PATH);
    await tree.buildTree([
      `${MOCK_PATH}/file1.ts`,
      `${MOCK_PATH}/file2.js`,
      `${MOCK_PATH}/dir/file3.ts`,
      `${MOCK_PATH}/dir/file4.js`,
    ]);

    const content = await tree.getContent();
    const expectedContent = [
      "content of file1.ts",
      "content of file2.js",
      "content of file3.ts",
      "content of file4.js",
    ].join("\n\n");

    expect(content).toBe(expectedContent);
  });

  it("should handle nested directories", async () => {
    const tree = new DocumentTree(MOCK_PATH);
    await tree.buildTree([
      `${MOCK_PATH}/dir/file3.ts`,
      `${MOCK_PATH}/dir/file4.js`,
    ]);

    const content = await tree.getContent();
    const expectedContent = ["content of file3.ts", "content of file4.js"].join(
      "\n\n"
    );

    expect(content).toBe(expectedContent);
  });
});
