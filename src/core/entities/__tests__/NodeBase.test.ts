import { NodeBase } from "../NodeBase";
import { DocumentFactory } from "../../../infrastructure/filesystem/DocumentFactory";

// Mock DocumentFactory
jest.mock("../../../infrastructure/filesystem/DocumentFactory", () => ({
  DocumentFactory: {
    exists: jest.fn(),
    isAbsolute: jest.fn(),
    resolve: jest.fn(),
    extension: jest.fn(),
    size: jest.fn(),
    readFile: jest.fn(),
    getStats: jest.fn(),
  },
}));

class TestNode extends NodeBase {
  async bundle(): Promise<void> {}
  render(): void {}
  get secondaryProps(): Record<string, unknown> | undefined {
    return {};
  }
}

describe("NodeBase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (DocumentFactory.exists as jest.Mock).mockReturnValue(true);
    (DocumentFactory.isAbsolute as jest.Mock).mockReturnValue(true);
    (DocumentFactory.resolve as jest.Mock).mockImplementation((path) => path);
  });

  describe("constructor", () => {
    it("should initialize node with correct props", () => {
      const testNode = new TestNode("test", "/test/path");
      expect(testNode.name).toBe("test");
      expect(testNode.path).toBe("/test/path");
    });

    it("should throw error for non-existent path", () => {
      (DocumentFactory.exists as jest.Mock).mockReturnValue(false);
      expect(() => new TestNode("test", "/invalid/path")).toThrow(
        "Path does not exist"
      );
    });

    it("should throw error for non-absolute path", () => {
      (DocumentFactory.isAbsolute as jest.Mock).mockReturnValue(false);
      expect(() => new TestNode("test", "relative/path")).toThrow(
        "Path is not absolute"
      );
    });
  });

  describe("properties", () => {
    let node: TestNode;

    beforeEach(() => {
      node = new TestNode("test", "/test/path");
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
          path: "/test/path",
          size: 100,
          deep: 2,
        })
      );
    });
  });

  describe("methods", () => {
    let node: TestNode;

    beforeEach(() => {
      node = new TestNode("test", "/test/path");
    });

    it("should dispose correctly", async () => {
      node["size"] = 100;
      await node.dispose();
      expect(node.size).toBe(0);
      expect(node.name).toBe("");
      expect(node.path).toBe("");
    });

    it("should clone correctly", async () => {
      node["size"] = 100;
      const clone = await node.clone();
      expect(clone.size).toBe(100);
      expect(clone.name).toBe("test");
      expect(clone.path).toBe("/test/path");
    });
  });
});
