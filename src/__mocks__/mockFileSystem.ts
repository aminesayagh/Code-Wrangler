type FileSystem = {
  [key: string]: string | FileSystem;
};

export const mockFileSystem: FileSystem = {
  "root": {
    "file1.ts": "content of file1.ts",
    "file2.js": "content of file2.js",
    dir: {
      "file3.ts": "content of file3.ts",
      "file4.js": "content of file4.js",
    },
  },
};

export const MOCK_PATH = "src/__mocks__/root";

export function isDirectory(path: string): boolean {
  const parts = path.split("/").filter(Boolean);
  let current: FileSystem | string = mockFileSystem;
  for (const part of parts) {
    const currentPart = (current as FileSystem)[part] as FileSystem | string;
    if (typeof currentPart === "string") return false;
    current = currentPart;
  }
  return true;
}

export function getContent(path: string): string | null {
  const parts = path.split("/").filter(Boolean);
  let current: FileSystem | string = mockFileSystem;
  for (const part of parts) {
    if ((current as FileSystem)[part] === undefined) {
        console.error("File not found: ", path, "on part: ", part);
        throw new Error(`File not found: ${path}`);
    }
    current = (current as FileSystem)[part] as FileSystem | string;
  }
  return typeof current === "string" ? current : null;
}
