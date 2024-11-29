import { ObjectEncodingOptions } from "fs";
import * as fs from "fs/promises";
import * as fsSync from "fs";
import * as path from "path";

import { FileNotFoundError, DocumentError } from "../../core/errors";
import {
  FileType,
  FileStats,
  DirectoryOptions,
  WriteOptions,
  ReadOptions,
} from "../../types/type";

export class DocumentFactory {
  /**
   * Gets the type of a file system entry
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
   * @throws {FileNotFoundError} If the file doesn't exist
   * @throws {DocumentError} For other file system errors
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
   * @throws {FileNotFoundError} If the path doesn't exist
   * @throws {DocumentError} For other file system errors
   */
  static async getStats(filePath: string): Promise<FileStats> {
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

  static readFileSync(filePath: string, options: ReadOptions = {}): string {
    return fsSync.readFileSync(filePath, {
      encoding: options.encoding ?? "utf-8",
      flag: options.flag,
    });
  }

  /**
   * Reads the entire contents of a file
   * @throws {FileNotFoundError} If the file doesn't exist
   * @throws {DocumentError} For other file system errors
   */
  static async readFile(
    filePath: string,
    options: ReadOptions = {}
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
   * @throws {DocumentError} For file system errors
   */
  static async writeFile(
    filePath: string,
    data: string | Buffer,
    options: WriteOptions = {}
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
   * @throws {DocumentError} For file system errors
   */
  static async appendFile(
    filePath: string,
    content: string,
    options: WriteOptions = {}
  ): Promise<void> {
    await fs.appendFile(filePath, content, {
      encoding: options.encoding ?? "utf-8",
      flag: options.flag,
    });
  }

  /**
   * Reads the contents of a directory
   */
  static async readDir(
    dirPath: string,
    options?: { withFileTypes?: boolean }
  ): Promise<string[]> {
    return await fs.readdir(dirPath, options as ObjectEncodingOptions);
  }

  /**
   * Creates a directory if it doesn't exist
   * @throws {DocumentError} For file system errors
   */
  static async createDir(dirPath: string, recursive = true): Promise<void> {
    await fs.mkdir(dirPath, { recursive });
  }

  /**
   * Gets the base name of a file
   * @param filePath - The path to the file
   * @returns The base name of the file
   */
  static baseName(filePath: string): string {
    return path.basename(filePath);
  }

  /**
   * Gets the extension of a file
   * @param filePath - The path to the file
   * @returns The extension of the file
   */
  static extension(filePath: string): string {
    return path.extname(filePath);
  }

  /**
   * Checks if a file or directory exists
   */
  static exists(filePath: string): boolean {
    try {
      fsSync.accessSync(filePath);
      return true;
    } catch {
      return false;
    }
  }

  static isAbsolute(filePath: string): boolean {
    return path.isAbsolute(filePath);
  }

  /**
   * Gets directory contents with type information
   * @throws {DocumentError} If path is not a directory or other errors
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
   * @throws {DocumentError} For file system errors
   */
  static async ensureDirectory(
    dirPath: string,
    options: DirectoryOptions = {}
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

  static async remove(filePath: string): Promise<void> {
    const stats = await fs.stat(filePath);
    if (stats.isDirectory()) {
      await fs.rm(filePath, { recursive: true, force: true });
    } else {
      await fs.unlink(filePath);
    }
  }

  // File/Directory Copy Operations
  static async copy(src: string, dest: string): Promise<void> {
    const stats = await fs.stat(src);

    if (stats.isDirectory()) {
      await this.copyDir(src, dest);
    } else {
      await fs.copyFile(src, dest);
    }
  }

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

  public static join(...paths: string[]): string {
    return path.join(...paths);
  }
}
