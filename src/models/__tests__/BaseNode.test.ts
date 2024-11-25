import { BaseNode } from "../BaseNode";
import { DocumentFactory } from "../../utils/DocumentFactory";

// Mock DocumentFactory
jest.mock("../../utils/DocumentFactory", () => ({
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

// Create a concrete implementation for testing
class TestNode extends BaseNode {
  async bundle(): Promise<void> {}
  render(): void {}
  get secondaryProps(): Record<string, unknown> | undefined {
    return {};
  }
}

describe("BaseNode", () => {
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
});
