import { ObjectEncodingOptions } from "fs";
import * as fsSync from "fs";
import * as fs from "fs/promises";
import * as path from "path";

import { fileStatsService } from "./FileStats";
import { DocumentError, FileNotFoundError } from "../../core/errors";
import {
  FILE_TYPE,
  FileType,
  IDirectoryOptions,
  IReadOptions,
  IWriteOptions
} from "../../types/type";

export const documentFactory = {
  /**
   * Gets the type of a file system entry
   * @param filePath - The path to check
   * @returns The type of the file system entry (File or Directory)
   * @throws {FileNotFoundError} If the path doesn't exist
   * @throws {DocumentError} For other file system errors
   */
  async type(filePath: string): Promise<FileType> {
    try {
      const stats = await fs.stat(filePath);
      return stats.isDirectory() ? FILE_TYPE.Directory : FILE_TYPE.File;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        throw new FileNotFoundError(filePath);
      }
      throw new DocumentError(String(error), filePath);
    }
  },

  /**
   * Gets file size in bytes
   * @param filePath - The path to the file
   * @returns The size of the file in bytes
   * @throws {FileNotFoundError} If the file doesn't exist
   * @throws {DocumentError} For other file system errors or if path is a directory
   */
  async size(filePath: string): Promise<number> {
    const isDirectory = (await this.type(filePath)) === FILE_TYPE.Directory;
    if (isDirectory) {
      throw new DocumentError("Path is a directory", filePath);
    }
    const stats = await fileStatsService(filePath);
    return stats.size;
  },

  /**
   * Resolves a path to an absolute path
   * @param filePath - The path to resolve
   * @returns The absolute path
   */
  resolve(filePath: string): string {
    return path.resolve(filePath);
  },

  /**
   * Checks various access flags for a path
   * @private
   * @param filePath - The path to check access for
   * @returns An object containing readable, writable, and executable permission flags
   */
  async checkAccess(filePath: string): Promise<{
    readable: boolean;
    writable: boolean;
    executable: boolean;
  }> {
    const check = async (mode: number): Promise<boolean> => {
      try {
        await fs.access(filePath, mode);
        return true;
      } catch {
        return false;
      }
    };

    return {
      readable: await check(fs.constants.R_OK),
      writable: await check(fs.constants.W_OK),
      executable: await check(fs.constants.X_OK)
    };
  },

  /**
   * Reads the entire contents of a file synchronously
   * @param filePath - The path to the file
   * @param options - The options for the read operation
   * @returns The contents of the file as a string
   * @throws {Error} If the file cannot be read
   */
  readFileSync(filePath: string, options: IReadOptions = {}): string {
    return fsSync.readFileSync(filePath, {
      encoding: options.encoding ?? "utf-8",
      flag: options.flag
    });
  },

  /**
   * Reads the entire contents of a file
   * @param filePath - The path to the file
   * @param options - The options for the read operation
   * @returns The contents of the file as a string
   * @throws {FileNotFoundError} If the file doesn't exist
   * @throws {DocumentError} For other file system errors
   */
  async readFile(
    filePath: string,
    options: IReadOptions = {}
  ): Promise<string> {
    try {
      return await fs.readFile(filePath, {
        encoding: options.encoding ?? "utf-8",
        flag: options.flag
      });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        throw new FileNotFoundError(filePath);
      }
      throw new DocumentError(String(error), filePath);
    }
  },

  /**
   * Writes data to a file, replacing the file if it already exists
   * @param filePath - The path to the file
   * @param data - The data to write
   * @param options - The options for the write operation
   * @throws {DocumentError} For file system errors
   */
  async writeFile(
    filePath: string,
    data: string | Buffer,
    options: IWriteOptions = {}
  ): Promise<void> {
    try {
      // Ensure parent directory exists
      const parentDir = path.dirname(filePath);
      await fs.mkdir(parentDir, { recursive: true });

      // Write the file
      await fs.writeFile(filePath, data, {
        encoding: options.encoding ?? "utf-8",
        mode: options.mode,
        flag: options.flag
      });
    } catch (error) {
      if (error instanceof DocumentError) {
        throw error;
      }
      throw new DocumentError(String(error), filePath);
    }
  },

  /**
   * Appends data to a file
   * @param filePath - The path to the file
   * @param content - The content to append
   * @param options - The options for the write operation
   * @throws {DocumentError} For file system errors
   */
  async appendFile(
    filePath: string,
    content: string,
    options: IWriteOptions = {}
  ): Promise<void> {
    try {
      await fs.appendFile(filePath, content, {
        encoding: options.encoding ?? "utf-8",
        mode: options.mode,
        flag: options.flag
      });
    } catch (error) {
      throw new DocumentError(String(error), filePath);
    }
  },

  /**
   * Reads the contents of a directory
   * @param dirPath - The path to the directory
   * @param options - The options for the read operation
   * @returns An array of file and directory names in the directory
   * @throws {Error} If the directory cannot be read
   */
  async readDir(
    dirPath: string,
    options?: { withFileTypes?: boolean }
  ): Promise<string[]> {
    return await fs.readdir(dirPath, options as ObjectEncodingOptions);
  },

  /**
   * Creates a directory if it doesn't exist
   * @param dirPath - The path where to create the directory
   * @param recursive - Whether to create parent directories if they don't exist
   * @throws {DocumentError} For file system errors
   */
  async createDir(dirPath: string, recursive = true): Promise<void> {
    await fs.mkdir(dirPath, { recursive });
  },

  /**
   * Gets the base name of a file
   * @param filePath - The path to the file
   * @returns The base name of the file (last portion of the path)
   */
  baseName(filePath: string): string {
    return path.basename(filePath);
  },

  /**
   * Gets the extension of a file
   * @param filePath - The path to the file
   * @returns The extension of the file including the dot (e.g., '.txt')
   */
  extension(filePath: string): string {
    return path.extname(filePath);
  },

  /**
   * Checks if a file or directory exists
   * @param filePath - The path to check
   * @returns True if the file or directory exists, false otherwise
   */
  exists(filePath: string): boolean {
    try {
      fsSync.accessSync(filePath);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Checks if a path is absolute
   * @param filePath - The path to check
   * @returns True if the path is absolute, false otherwise
   */
  isAbsolute(filePath: string): boolean {
    return path.isAbsolute(filePath);
  },

  /**
   * Gets directory contents with type information
   * @param dirPath - The path to the directory
   * @returns An array of objects containing name and type information for each entry
   * @throws {DocumentError} If path is not a directory or other errors occur
   */
  async readDirectory(
    dirPath: string
  ): Promise<Array<{ name: string; type: FileType }>> {
    try {
      const entries = await fs.readdir(dirPath, { withFileTypes: true });
      return entries.map(entry => ({
        name: entry.name,
        type: entry.isDirectory() ? FILE_TYPE.Directory : FILE_TYPE.File
      }));
    } catch (error) {
      throw new DocumentError(String(error), dirPath);
    }
  },

  /**
   * Creates a directory if it doesn't exist
   * @param dirPath - The path where to create the directory
   * @param options - Options for directory creation including recursive and mode
   * @throws {DocumentError} For file system errors
   */
  async ensureDirectory(
    dirPath: string,
    options: IDirectoryOptions = {}
  ): Promise<void> {
    try {
      if (!this.exists(dirPath)) {
        await fs.mkdir(dirPath, {
          recursive: options.recursive ?? true,
          mode: options.mode
        });
      }
    } catch (error) {
      throw new DocumentError(String(error), dirPath);
    }
  },

  /**
   * Removes a file or directory
   * @param filePath - The path to remove
   * @throws {DocumentError} For file system errors
   */
  async remove(filePath: string): Promise<void> {
    const stats = await fs.stat(filePath);
    if (stats.isDirectory()) {
      await fs.rm(filePath, { recursive: true, force: true });
    } else {
      await fs.unlink(filePath);
    }
  },

  /**
   * Copies a file or directory
   * @param src - The source path
   * @param dest - The destination path
   * @throws {DocumentError} For file system errors
   */
  async copy(src: string, dest: string): Promise<void> {
    const stats = await fs.stat(src);

    if (stats.isDirectory()) {
      await this.copyDir(src, dest);
    } else {
      await fs.copyFile(src, dest);
    }
  },

  /**
   * Copies a directory recursively
   * @private
   * @param src - The source directory path
   * @param dest - The destination directory path
   * @throws {DocumentError} For file system errors
   */
  async copyDir(src: string, dest: string): Promise<void> {
    await this.ensureDirectory(dest);
    const entries = await fs.readdir(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        await this.copyDir(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }
  },

  /**
   * Joins an array of paths into a single path
   * @param paths - The paths to join
   * @returns The joined path
   */
  join(...paths: string[]): string {
    return path.join(...paths);
  }
};
