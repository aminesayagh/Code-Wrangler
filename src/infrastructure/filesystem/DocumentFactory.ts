import { ObjectEncodingOptions } from "fs";
import * as fs from "fs/promises";
import * as fsSync from "fs";
import * as path from "path";

import { DocumentError, FileNotFoundError } from "../../core/errors";
import {
  FileType,
  IDirectoryOptions,
  IFileStats,
  IReadOptions,
  IWriteOptions,
} from "../../types/type";

export class DocumentFactory {
  public static VERSION = "1.0.0";

  /**
   * Gets the type of a file system entry
   * @param filePath - The path to check
   * @returns The type of the file system entry (File or Directory)
   * @throws {FileNotFoundError} If the path doesn't exist
   * @throws {DocumentError} For other file system errors
   */
  static async type(filePath: string): Promise<FileType> {
    try {
      const stats = await fs.stat(filePath);
      return stats.isDirectory() ? FileType.Directory : FileType.File;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        throw new FileNotFoundError(filePath);
      }
      throw new DocumentError(String(error), filePath);
    }
  }

  /**
   * Gets file size in bytes
   * @param filePath - The path to the file
   * @returns The size of the file in bytes
   * @throws {FileNotFoundError} If the file doesn't exist
   * @throws {DocumentError} For other file system errors or if path is a directory
   */
  static async size(filePath: string): Promise<number> {
    const isDirectory = (await this.type(filePath)) === FileType.Directory;
    if (isDirectory) {
      throw new DocumentError("Path is a directory", filePath);
    }
    const stats = await this.getStats(filePath);
    return stats.size;
  }

  /**
   * Resolves a path to an absolute path
   * @param filePath - The path to resolve
   * @returns The absolute path
   */
  static resolve(filePath: string): string {
    return path.resolve(filePath);
  }

  /**
   * Gets detailed file statistics
   * @param filePath - The path to get stats for
   * @returns Detailed file statistics including size, dates, and permissions
   * @throws {FileNotFoundError} If the path doesn't exist
   * @throws {DocumentError} For other file system errors
   */
  static async getStats(filePath: string): Promise<IFileStats> {
    try {
      const stats = await fs.stat(filePath);
      const accessFlags = await this.checkAccess(filePath);

      return {
        size: stats.size,
        created: stats.birthtime,
        modified: stats.mtime,
        accessed: stats.atime,
        isDirectory: stats.isDirectory(),
        isFile: stats.isFile(),
        permissions: {
          readable: accessFlags.readable,
          writable: accessFlags.writable,
          executable: accessFlags.executable,
        },
      };
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        throw new FileNotFoundError(filePath);
      }
      throw new DocumentError(String(error), filePath);
    }
  }

  /**
   * Checks various access flags for a path
   * @private
   * @param filePath - The path to check access for
   * @returns An object containing readable, writable, and executable permission flags
   */
  private static async checkAccess(filePath: string): Promise<{
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
      executable: await check(fs.constants.X_OK),
    };
  }

  /**
   * Reads the entire contents of a file synchronously
   * @param filePath - The path to the file
   * @param options - The options for the read operation
   * @returns The contents of the file as a string
   * @throws {Error} If the file cannot be read
   */
  static readFileSync(filePath: string, options: IReadOptions = {}): string {
    return fsSync.readFileSync(filePath, {
      encoding: options.encoding ?? "utf-8",
      flag: options.flag,
    });
  }

  static async readJsonSync(filePath: string): Promise<object> {
    try {
      // Resolve the absolute path
      const absolutePath = this.resolve(filePath);

      // Check if file exists first
      if (!this.exists(absolutePath)) {
        throw new Error(`File not found: ${absolutePath}`);
      }

      const fileContents = await fs.readFile(absolutePath, "utf-8");
      if (!fileContents) {
        throw new Error(`File is empty: ${absolutePath}`);
      }

      try {
        return JSON.parse(fileContents);
      } catch (parseError) {
        throw new Error(
          `Invalid JSON in file ${absolutePath}: ${String(parseError)}`
        );
      }
    } catch (error) {
      throw new DocumentError(String(error), filePath);
    }
  }

  /**
   * Reads the entire contents of a file
   * @param filePath - The path to the file
   * @param options - The options for the read operation
   * @returns The contents of the file as a string
   * @throws {FileNotFoundError} If the file doesn't exist
   * @throws {DocumentError} For other file system errors
   */
  static async readFile(
    filePath: string,
    options: IReadOptions = {}
  ): Promise<string> {
    try {
      return await fs.readFile(filePath, {
        encoding: options.encoding ?? "utf-8",
        flag: options.flag,
      });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        throw new FileNotFoundError(filePath);
      }
      throw new DocumentError(String(error), filePath);
    }
  }

  /**
   * Writes data to a file, replacing the file if it already exists
   * @param filePath - The path to the file
   * @param data - The data to write
   * @param options - The options for the write operation
   * @throws {DocumentError} For file system errors
   */
  static async writeFile(
    filePath: string,
    data: string | Buffer,
    options: IWriteOptions = {}
  ): Promise<void> {
    try {
      await fs.writeFile(filePath, data, {
        encoding: options.encoding ?? "utf-8",
        mode: options.mode,
        flag: options.flag,
      });
    } catch (error) {
      throw new DocumentError(String(error), filePath);
    }
  }

  /**
   * Appends data to a file
   * @param filePath - The path to the file
   * @param content - The content to append
   * @param options - The options for the write operation
   * @throws {DocumentError} For file system errors
   */
  static async appendFile(
    filePath: string,
    content: string,
    options: IWriteOptions = {}
  ): Promise<void> {
    try {
      await fs.appendFile(filePath, content, {
        encoding: options.encoding ?? "utf-8",
        mode: options.mode,
        flag: options.flag,
      });
    } catch (error) {
      throw new DocumentError(String(error), filePath);
    }
  }

  /**
   * Reads the contents of a directory
   * @param dirPath - The path to the directory
   * @param options - The options for the read operation
   * @returns An array of file and directory names in the directory
   * @throws {Error} If the directory cannot be read
   */
  static async readDir(
    dirPath: string,
    options?: { withFileTypes?: boolean }
  ): Promise<string[]> {
    return await fs.readdir(dirPath, options as ObjectEncodingOptions);
  }

  /**
   * Creates a directory if it doesn't exist
   * @param dirPath - The path where to create the directory
   * @param recursive - Whether to create parent directories if they don't exist
   * @throws {DocumentError} For file system errors
   */
  static async createDir(dirPath: string, recursive = true): Promise<void> {
    await fs.mkdir(dirPath, { recursive });
  }

  /**
   * Gets the base name of a file
   * @param filePath - The path to the file
   * @returns The base name of the file (last portion of the path)
   */
  static baseName(filePath: string): string {
    return path.basename(filePath);
  }

  /**
   * Gets the extension of a file
   * @param filePath - The path to the file
   * @returns The extension of the file including the dot (e.g., '.txt')
   */
  static extension(filePath: string): string {
    return path.extname(filePath);
  }

  /**
   * Checks if a file or directory exists
   * @param filePath - The path to check
   * @returns True if the file or directory exists, false otherwise
   */
  static exists(filePath: string): boolean {
    try {
      fsSync.accessSync(filePath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Checks if a path is absolute
   * @param filePath - The path to check
   * @returns True if the path is absolute, false otherwise
   */
  static isAbsolute(filePath: string): boolean {
    return path.isAbsolute(filePath);
  }

  /**
   * Gets directory contents with type information
   * @param dirPath - The path to the directory
   * @returns An array of objects containing name and type information for each entry
   * @throws {DocumentError} If path is not a directory or other errors occur
   */
  static async readDirectory(
    dirPath: string
  ): Promise<Array<{ name: string; type: FileType }>> {
    try {
      const entries = await fs.readdir(dirPath, { withFileTypes: true });
      return entries.map((entry) => ({
        name: entry.name,
        type: entry.isDirectory() ? FileType.Directory : FileType.File,
      }));
    } catch (error) {
      throw new DocumentError(String(error), dirPath);
    }
  }

  /**
   * Creates a directory if it doesn't exist
   * @param dirPath - The path where to create the directory
   * @param options - Options for directory creation including recursive and mode
   * @throws {DocumentError} For file system errors
   */
  static async ensureDirectory(
    dirPath: string,
    options: IDirectoryOptions = {}
  ): Promise<void> {
    try {
      if (!this.exists(dirPath)) {
        await fs.mkdir(dirPath, {
          recursive: options.recursive ?? true,
          mode: options.mode,
        });
      }
    } catch (error) {
      throw new DocumentError(String(error), dirPath);
    }
  }

  /**
   * Removes a file or directory
   * @param filePath - The path to remove
   * @throws {DocumentError} For file system errors
   */
  static async remove(filePath: string): Promise<void> {
    const stats = await fs.stat(filePath);
    if (stats.isDirectory()) {
      await fs.rm(filePath, { recursive: true, force: true });
    } else {
      await fs.unlink(filePath);
    }
  }

  /**
   * Copies a file or directory
   * @param src - The source path
   * @param dest - The destination path
   * @throws {DocumentError} For file system errors
   */
  static async copy(src: string, dest: string): Promise<void> {
    const stats = await fs.stat(src);

    if (stats.isDirectory()) {
      await this.copyDir(src, dest);
    } else {
      await fs.copyFile(src, dest);
    }
  }

  /**
   * Copies a directory recursively
   * @private
   * @param src - The source directory path
   * @param dest - The destination directory path
   * @throws {DocumentError} For file system errors
   */
  private static async copyDir(src: string, dest: string): Promise<void> {
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
  }

  /**
   * Joins an array of paths into a single path
   * @param paths - The paths to join
   * @returns The joined path
   */
  public static join(...paths: string[]): string {
    return path.join(...paths);
  }
}
