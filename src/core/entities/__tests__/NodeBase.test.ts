import { documentFactory } from "../../../infrastructure/filesystem/DocumentFactory";
import { INodeContent, NodeBase } from "../NodeBase";

// Mock DocumentFactory
jest.mock("../../../infrastructure/filesystem/DocumentFactory", () => ({
  documentFactory: {
    exists: jest.fn(),
    isAbsolute: jest.fn(),
    resolve: jest.fn(),
    extension: jest.fn(),
    size: jest.fn(),
    readFile: jest.fn(),
    getStats: jest.fn()
  }
}));

class TestNode extends NodeBase {
  public async bundle(): Promise<void> {}
  public render(): INodeContent {
    return { content: "" };
  }
  public get secondaryProps(): Record<string, unknown> | undefined {
    return {};
  }
}

describe("NodeBase", () => {
  const TEST_PATH = "/test/path";
  beforeEach(() => {
    jest.clearAllMocks();
    (documentFactory.exists as jest.Mock).mockReturnValue(true);
    (documentFactory.isAbsolute as jest.Mock).mockReturnValue(true);
    (documentFactory.resolve as jest.Mock).mockImplementation(path => path);
  });

  describe("constructor", () => {
    it("should initialize node with correct props", () => {
      const testNode = new TestNode("test", TEST_PATH);
      expect(testNode.name).toBe("test");
      expect(testNode.path).toBe(TEST_PATH);
    });

    it("should throw error for non-existent path", () => {
      (documentFactory.exists as jest.Mock).mockReturnValue(false);
      expect(() => new TestNode("test", "/invalid/path")).toThrow(
        new Error("Path /invalid/path does not exist")
      );
    });

    it("should throw error for non-absolute path", () => {
      (documentFactory.isAbsolute as jest.Mock).mockReturnValue(false);
      expect(() => new TestNode("test", "relative/path")).toThrow(
        new Error("Path relative/path is not absolute")
      );
    });
  });

  describe("properties", () => {
    let node: TestNode;

    beforeEach(() => {
      node = new TestNode("test", TEST_PATH);
    });

    it("should get and set deep property", () => {
      node["deep"] = 2;
      expect(node.deep).toBe(2);
    });

    it("should get and set size property", () => {
      node["size"] = 100;
      expect(node.size).toBe(100);
    });

    it("should get combined props", () => {
      node["size"] = 100;
      node["deep"] = 2;
      expect(node.props).toEqual(
        expect.objectContaining({
          name: "test",
          path: TEST_PATH,
          size: 100,
          deep: 2
        })
      );
    });
  });

  describe("methods", () => {
    let node: TestNode;

    beforeEach(() => {
      node = new TestNode("test", TEST_PATH);
    });

    it("should dispose correctly", async () => {
      node["size"] = 100;
      await node.dispose();
      expect(node.size).toBe(0);
      expect(node.name).toBe("");
      expect(node.path).toBe("");
      expect(node.stats).toEqual(
        expect.objectContaining({
          size: expect.any(Number),
          isDirectory: false,
          isFile: false,
          created: expect.any(Date),
          accessed: expect.any(Date),
          modified: expect.any(Date),
          permissions: {
            executable: false,
            readable: false,
            writable: false
          }
        })
      );
    });

    it("should clone correctly", async () => {
      node["size"] = 100;
      const clone = await node.clone();
      expect(clone.size).toBe(100);
      expect(clone.name).toBe("test");
      expect(clone.path).toBe(TEST_PATH);
    });
  });
});
