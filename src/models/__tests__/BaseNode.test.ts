import { BaseNode } from "../BaseNode";

class TestNode extends BaseNode {
  async bundle(deep: number): Promise<void> {
    this._deep = deep;
    this._size = 100; // Arbitrary size for testing
  }

  render(): void {
    // Empty implementation for testing
  }

  get secondaryProps(): Record<string, unknown> | undefined {
    return { testProp: "testValue" };
  }
}

describe("BaseNode", () => {
  let testNode: TestNode;
  beforeEach(() => {
    testNode = new TestNode("test", "/test/path");
  });

  it("should create a new BaseNode", () => {
    // @ts-expect-error - This is a test
    const node = new BaseNode("test", "./test");
    expect(node).toBeDefined();
  });

  test("constructor initializes name and path correctly", () => {
    expect(testNode.name).toBe("test");
    expect(testNode.path).toBe("/test/path");
  });

  test("deep getter returns correct value", async () => {
    await testNode.bundle(3);
    expect(testNode.deep).toBe(3);
  });

  test("size getter returns correct value", async () => {
    await testNode.bundle(3);
    expect(testNode.size).toBe(100);
  });

  test("props getter returns correct value", async () => {
    await testNode.bundle(3);
    expect(testNode.props).toEqual({
      name: "test",
      path: "/test/path",
      deep: 3,
      size: 100,
      testProp: "testValue"
    });
  });

  test("secondaryProps getter returns correct value", () => {
    expect(testNode.secondaryProps).toEqual({ testProp: "testValue" });
  });

  test("bundle method sets deep and size correctly", async () => {
    await testNode.bundle(3);
    expect(testNode.deep).toBe(3);
    expect(testNode.size).toBe(100);
  });
});
