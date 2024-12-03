import { z } from "zod";

import { logger } from "../../../utils/logger";
import { documentFactory } from "../../filesystem/DocumentFactory";
import { Template } from "../TemplateEngine";

// Mock DocumentFactory
jest.mock("../../filesystem/DocumentFactory", () => ({
  documentFactory: {
    readFile: jest.fn()
  }
}));

// Mock logger
jest.mock("../../../utils/logger", () => ({
  logger: {
    warn: jest.fn() // Mock the warn function
  }
}));

describe("Template", () => {
  // Basic schema for testing
  const basicSchema = z.object({
    TITLE: z.string(),
    COUNT: z.number(),
    ACTIVE: z.boolean().optional()
  });

  const TEMPLATE_PATH = "test/template";

  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Constructor and Basic Properties", () => {
    it("should create a new template instance", () => {
      const template = new Template("page", basicSchema);
      expect(template).toBeInstanceOf(Template);
    });
  });

  describe("load", () => {
    const mockContent =
      "Hello {{TITLE}}, Count: {{COUNT}}, Active: {{ACTIVE}}, Extra: {{EXTRA}}";

    beforeEach(() => {
      (documentFactory.readFile as jest.Mock).mockResolvedValue(mockContent);
    });

    it("should load template content successfully", async () => {
      const template = new Template("page", basicSchema);
      await template.load(TEMPLATE_PATH);
      expect(template.content).toBe(mockContent);
    });

    it("should handle additional fields during load", async () => {
      const template = new Template("page", basicSchema);
      const additionalFields = {
        EXTRA: z.string()
      };
      await template.load(TEMPLATE_PATH, additionalFields);
      expect(template.content).toBe(mockContent);
    });

    it("should throw error when required tokens are missing", async () => {
      (documentFactory.readFile as jest.Mock).mockResolvedValue(
        "No tokens here"
      );
      const template = new Template("page", basicSchema);

      await template.load(TEMPLATE_PATH);
      // check if logger.warn was called
      expect(logger.warn).toHaveBeenCalledWith(
        "Missing required tokens in page template: TITLE, COUNT, ACTIVE"
      );
    });

    it("should throw error when DocumentFactory fails", async () => {
      (documentFactory.readFile as jest.Mock).mockRejectedValue(
        new Error("File read error")
      );
      const template = new Template("page", basicSchema);

      await expect(template.load(TEMPLATE_PATH)).rejects.toThrow(
        "File read error"
      );
    });
  });

  describe("content", () => {
    it("should throw error when accessing content before loading", () => {
      const template = new Template("page", basicSchema);
      expect(() => template.content).toThrow(
        "Template content is not loaded for page"
      );
    });

    it("should return content after loading", async () => {
      const mockContent = "Hello {{TITLE}}";
      (documentFactory.readFile as jest.Mock).mockResolvedValue(mockContent);

      const template = new Template("page", basicSchema);
      await template.load(TEMPLATE_PATH);
      expect(template.content).toBe(mockContent);
    });
  });

  describe("create", () => {
    it("should create and load template in one step", async () => {
      const mockContent =
        "Hello {{TITLE}}, Count: {{COUNT}}, Active: {{ACTIVE}}";
      (documentFactory.readFile as jest.Mock).mockResolvedValue(mockContent);

      const template = await Template.create(
        "page",
        basicSchema,
        TEMPLATE_PATH
      );
      expect(template).toBeInstanceOf(Template);
      expect(template.content).toBe(mockContent);
    });

    it("should create template with additional fields", async () => {
      const mockContent = "Hello {{TITLE}}, Extra: {{EXTRA}}";
      (documentFactory.readFile as jest.Mock).mockResolvedValue(mockContent);

      const additionalFields = {
        EXTRA: z.string()
      };

      const template = await Template.create(
        "page",
        basicSchema,
        TEMPLATE_PATH,
        additionalFields
      );
      expect(template).toBeInstanceOf(Template);
      expect(template.content).toBe(mockContent);
    });

    it("should throw error when creation fails", async () => {
      (documentFactory.readFile as jest.Mock).mockRejectedValue(
        new Error("Creation failed")
      );

      await expect(
        Template.create("page", basicSchema, TEMPLATE_PATH)
      ).rejects.toThrow("Creation failed");
    });
  });

  describe("render", () => {
    it("should render template with valid values", async () => {
      const mockContent =
        "Hello {{TITLE}}, Count: {{COUNT}}, Active: {{ACTIVE}}";
      (documentFactory.readFile as jest.Mock).mockResolvedValue(mockContent);

      const template = new Template("page", basicSchema);
      await template.load(TEMPLATE_PATH);

      const rendered = template.render({
        TITLE: "World",
        COUNT: 42,
        ACTIVE: true
      });

      expect(rendered).toBe("Hello World, Count: 42, Active: true");
    });

    it("should throw error for invalid values", async () => {
      const mockContent = "Hello {{TITLE}}, Count: {{COUNT}}";
      (documentFactory.readFile as jest.Mock).mockResolvedValue(mockContent);

      const template = new Template("page", basicSchema);
      await template.load(TEMPLATE_PATH);

      expect(() => template.render({ TITLE: 123, COUNT: "invalid" })).toThrow(
        "Template content validation failed for page"
      );
    });

    it("should handle missing optional values in template as error", async () => {
      const optionalSchema = z.object({
        REQUIRED: z.string(),
        OPTIONAL: z.string().optional()
      });

      const mockContent = "{{REQUIRED}} {{OPTIONAL}}";
      (documentFactory.readFile as jest.Mock).mockResolvedValue(mockContent);

      const template = new Template("page", optionalSchema);
      await template.load(TEMPLATE_PATH);

      try {
        template.render({ REQUIRED: "Hello" });
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toBe(
          "Missing required values for tokens: OPTIONAL"
        );
      }
    });

    it("should handle complex token patterns", async () => {
      const mockContent = "{{TITLE}} {{TITLE}} {{COUNT}} {{TITLE}}";
      (documentFactory.readFile as jest.Mock).mockResolvedValue(mockContent);

      const template = new Template("page", basicSchema);
      await template.load(TEMPLATE_PATH);

      const rendered = template.render({
        TITLE: "Hello",
        COUNT: 42,
        ACTIVE: false
      });

      expect(rendered).toBe("Hello Hello 42 Hello");
    });
  });

  describe("Error Handling", () => {
    it("should handle template with no tokens", async () => {
      const mockContent = "Hello World";
      (documentFactory.readFile as jest.Mock).mockResolvedValue(mockContent);

      const template = new Template("page", basicSchema);

      await template.load(TEMPLATE_PATH);
      // template should be invalid
      const rendered = template.render({});
      expect(rendered).toBe(mockContent);
    });

    it("should handle undefined token values", async () => {
      const mockContent = "Hello {{TITLE}}";
      (documentFactory.readFile as jest.Mock).mockResolvedValue(mockContent);

      const template = new Template("page", basicSchema);
      await template.load(TEMPLATE_PATH);

      try {
        template.render({});
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toBe(
          "Missing required values for tokens: TITLE"
        );
      }
    });
  });
});
