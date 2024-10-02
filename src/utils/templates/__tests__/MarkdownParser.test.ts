import { MarkdownParser } from "../MarkdownParser";

describe("MarkdownParser", () => {
  const sampleMarkdown = `
            # Test Project

## Introduction

This is a test project.

## Features

- Feature 1
- Feature 2

### Subfeature

Nested content.

## Conclusion

End of document.
    `;

  let parser: MarkdownParser;

  beforeEach(() => {
    parser = new MarkdownParser(sampleMarkdown);
  });

  test("should parse markdown to JSON", () => {
    const json = parser.toJSON();
    expect(json).toHaveLength(3);
    expect(json[0]?.value).toBe("Test Project");
    expect(json[1]?.value).toBe("Introduction");
    expect(json[1]?.children).toHaveLength(1);
    expect(json[2]?.value).toBe("Features");
    expect(json[2]?.children).toHaveLength(3);
  });

  test("should convert JSON back to markdown", () => {
    const json = parser.toJSON();
    const regeneratedMarkdown = MarkdownParser.fromJSON(json);
    expect(regeneratedMarkdown.trim()).toBe(sampleMarkdown.trim());
  });

  test("should update a specific section", () => {
    parser.updateSection("Introduction", "Updated introduction content.");
    const updatedMarkdown = parser.toString();
    expect(updatedMarkdown).toContain(
      "## Introduction\n\nUpdated introduction content."
    );
    expect(updatedMarkdown).not.toContain("This is a test project.");
  });

  test("should handle nested sections", () => {
    const json = parser.toJSON();
    expect(json[2]?.children?.[2]?.value).toBe("Subfeature");
    expect(json[2]?.children?.[2]?.children?.[0]?.value).toBe("Nested content.");
  });

  test("should maintain original structure when updating", () => {
    parser.updateSection("Features", "New feature list.");
    const updatedJson = parser.toJSON();
    expect(updatedJson[2]?.children).toHaveLength(1);
    expect(updatedJson[2]?.children?.[0]?.value).toBe("New feature list.");
    expect(updatedJson[2]?.children?.[2]).toBeUndefined();
  });

  test("should handle empty sections", () => {
    parser.updateSection("Conclusion", "");
    const updatedJson = parser.toJSON();
    expect(updatedJson[2]?.children).toHaveLength(0);
  });
});
