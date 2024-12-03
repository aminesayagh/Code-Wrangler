import { DocumentError } from "../DocumentError";
import { FileNotFoundError } from "../FileNotFoundError";
import { DirectoryNotFoundError } from "../DirectoryNotFoundError";

describe("Error Classes", () => {
  describe("DocumentError", () => {
    it("should create an instance with the correct properties", () => {
      const path = "/path/to/file";
      const message = "Test error message";
      const error = new DocumentError(message, path);

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(DocumentError);
      expect(error.name).toBe("DocumentError");
      expect(error.path).toBe(path);
      expect(error.message).toBe(`Document error at ${path}: ${message}`);
    });

    it("should handle empty message and path", () => {
      const error = new DocumentError("", "");

      expect(error.name).toBe("DocumentError");
      expect(error.path).toBe("");
      expect(error.message).toBe("Document error at : ");
    });

    it("should preserve stack trace", () => {
      const error = new DocumentError("message", "path");

      expect(error.stack).toBeDefined();
      expect(error.stack).toContain("DocumentError");
    });
  });

  describe("FileNotFoundError", () => {
    it("should create an instance with the correct properties", () => {
      const path = "/path/to/file";
      const error = new FileNotFoundError(path);

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(DocumentError);
      expect(error).toBeInstanceOf(FileNotFoundError);
      expect(error.name).toBe("FileNotFoundError");
      expect(error.path).toBe(path);
      expect(error.message).toBe(`Document error at ${path}: File not found`);
    });

    it("should handle empty path", () => {
      const error = new FileNotFoundError("");

      expect(error.name).toBe("FileNotFoundError");
      expect(error.path).toBe("");
      expect(error.message).toBe("Document error at : File not found");
    });

    it("should preserve stack trace", () => {
      const error = new FileNotFoundError("path");

      expect(error.stack).toBeDefined();
      expect(error.stack).toContain("FileNotFoundError");
    });

    it("should be catchable as DocumentError", () => {
      const error = new FileNotFoundError("/path/to/file");

      try {
        throw error;
      } catch (e) {
        expect(e instanceof DocumentError).toBe(true);
      }
    });
  });

  describe("DirectoryNotFoundError", () => {
    it("should create an instance with the correct properties", () => {
      const path = "/path/to/directory";
      const error = new DirectoryNotFoundError(path);

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(DocumentError);
      expect(error).toBeInstanceOf(DirectoryNotFoundError);
      expect(error.name).toBe("DirectoryNotFoundError");
      expect(error.path).toBe(path);
      expect(error.message).toBe(
        `Document error at ${path}: Directory not found`
      );
    });

    it("should handle empty path", () => {
      const error = new DirectoryNotFoundError("");

      expect(error.name).toBe("DirectoryNotFoundError");
      expect(error.path).toBe("");
      expect(error.message).toBe("Document error at : Directory not found");
    });

    it("should preserve stack trace", () => {
      const error = new DirectoryNotFoundError("path");

      expect(error.stack).toBeDefined();
      expect(error.stack).toContain("DirectoryNotFoundError");
    });

    it("should be catchable as DocumentError", () => {
      const error = new DirectoryNotFoundError("/path/to/directory");

      try {
        throw error;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        expect(e instanceof DocumentError).toBe(true);
      }
    });
  });

  describe("Error Hierarchy", () => {
    it("should maintain proper inheritance chain", () => {
      const docError = new DocumentError("message", "path");
      const fileError = new FileNotFoundError("path");
      const dirError = new DirectoryNotFoundError("path");

      expect(docError instanceof Error).toBe(true);
      expect(docError instanceof DocumentError).toBe(true);
      expect(fileError instanceof Error).toBe(true);
      expect(fileError instanceof DocumentError).toBe(true);
      expect(fileError instanceof FileNotFoundError).toBe(true);
      expect(dirError instanceof Error).toBe(true);
      expect(dirError instanceof DocumentError).toBe(true);
      expect(dirError instanceof DirectoryNotFoundError).toBe(true);
    });

    it("should allow type checking in catch blocks", () => {
      const errors = [
        new DocumentError("message", "path"),
        new FileNotFoundError("path"),
        new DirectoryNotFoundError("path")
      ];

      errors.forEach(error => {
        try {
          throw error;
        } catch (e) {
          if (e instanceof DirectoryNotFoundError) {
            expect(e.name).toBe("DirectoryNotFoundError");
          } else if (e instanceof FileNotFoundError) {
            expect(e.name).toBe("FileNotFoundError");
          } else if (e instanceof DocumentError) {
            expect(e.name).toBe("DocumentError");
          }
        }
      });
    });

    it("should handle error comparison correctly", () => {
      const docError = new DocumentError("message", "path");
      const fileError = new FileNotFoundError("path");
      const dirError = new DirectoryNotFoundError("path");

      expect(fileError instanceof DocumentError).toBe(true);
      expect(dirError instanceof DocumentError).toBe(true);
      expect(docError instanceof FileNotFoundError).toBe(false);
      expect(docError instanceof DirectoryNotFoundError).toBe(false);
      expect(fileError instanceof DirectoryNotFoundError).toBe(false);
      expect(dirError instanceof FileNotFoundError).toBe(false);
    });
  });
});
