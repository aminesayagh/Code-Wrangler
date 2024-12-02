import path from "path";

export interface IFileSystem {
  [key: string]: string | IFileSystem;
}

export const MOCK_PATH = path.resolve("src/__mocks__/root");

export const mockFileSystem: IFileSystem = {
  root: {
    "file1.ts": `export const test = "test 1";\n`,
    "file2.js": `export const test = "test 2";`,
    dir: {
      "file3.ts": `export const test = "test 3";`,
      "file4.js": `export const test = "test 4";`
    }
  }
};

export const mockPath = (): string => path.resolve("src/__mocks__/root");

export function isDirectory(path: string): boolean {
  const parts = path.split("/").filter(Boolean);
  let current: IFileSystem | string = mockFileSystem;
  for (const part of parts) {
    const currentPart = (current as IFileSystem)[part] as IFileSystem | string;
    if (typeof currentPart === "string") return false;
    current = currentPart;
  }
  return true;
}

export function getContent(path: string): string | null {
  const parts = path.split("/").filter(Boolean);
  let current: IFileSystem | string = mockFileSystem;
  for (const part of parts) {
    if ((current as IFileSystem)[part] === undefined) {
      console.error("File not found: ", path, "on part: ", part);
      throw new Error(`File not found: ${path}`);
    }
    current = (current as IFileSystem)[part] as IFileSystem | string;
  }
  return typeof current === "string" ? current : null;
}
