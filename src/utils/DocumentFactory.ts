import { ObjectEncodingOptions } from "fs";
import * as fs from "fs/promises";
import * as fsSync from "fs";
import * as path from "path";

import {
  FileNotFoundError,
  DirectoryNotFoundError,
  DocumentError,
} from "../models/DocumentError";
import {
  FileType,
  FileStats,
  DirectoryOptions,
  WriteOptions,
  ReadOptions,
  FileTreeOptions,
  FileTreeItem,
} from "../type";

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
   * Gets the extension of a file
   * @param filePath - The path to the file
   * @returns The extension of the file
   */
  static extension(filePath: string): string {
    return path.extname(filePath);
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
      if (!(await this.exists(dirPath))) {
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

  /**
   * Gets a recursive list of all files in a directory with advanced filtering
   * @param dirPath - Starting directory path
   * @param options - Configuration options for tree traversal
   * @throws {DirectoryNotFoundError} If the directory doesn't exist
   * @throws {DocumentError} For other file system errors
   */
  static async getFileTree(
    dirPath: string,
    options: FileTreeOptions
  ): Promise<string[] | FileTreeItem[]> {
    // Validate directory exists
    if (!(await this.exists(dirPath))) {
      throw new DirectoryNotFoundError(dirPath);
    }

    // Initialize results based on return type
    const results: (string | FileTreeItem)[] = [];

    // Create a recursive scan function
    async function scan(
      currentPath: string,
      currentDepth: number
    ): Promise<void> {
      // Check depth limit
      if (options.maxDepth !== undefined && currentDepth > options.maxDepth) {
        return;
      }

      try {
        const entries = await fs.readdir(currentPath, { withFileTypes: true });

        // Process each entry
        await Promise.all(
          entries.map(async (entry) => {
            const fullPath = path.join(currentPath, entry.name);

            // Skip hidden files if not included
            if (
              !options.includeHidden &&
              (entry.name.startsWith(".") || entry.name.startsWith("_"))
            ) {
              return;
            }

            // Handle symlinks
            let isDirectory = entry.isDirectory();
            let stats: FileStats | undefined;

            if (entry.isSymbolicLink() && options.followSymlinks) {
              try {
                stats = await DocumentFactory.getStats(fullPath);
                isDirectory = stats.isDirectory;
              } catch {
                // Skip invalid symlinks
                return;
              }
            }

            // Apply custom filter if provided
            if (options.filter) {
              const shouldInclude = await options.filter(fullPath);
              if (!shouldInclude) {
                return;
              }
            }

            if (isDirectory) {
              // Recurse into directory
              await scan(fullPath, currentDepth + 1);
            } else {
              // Check if file matches pattern
              if (!options.pattern || options.pattern.test(entry.name)) {
                if (options.returnType === "paths") {
                  results.push(fullPath);
                } else {
                  // Get stats if we haven't already
                  if (!stats) {
                    stats = await DocumentFactory.getStats(fullPath);
                  }

                  results.push({
                    path: fullPath,
                    type: FileType.File,
                    stats,
                  });
                }
              }
            }
          })
        );
      } catch (error) {
        throw new DocumentError(
          `Error scanning directory: ${error}`,
          currentPath
        );
      }
    }

    // Start the recursive scan
    await scan(dirPath, 0);

    // Sort results if requested
    if (options.sort) {
      results.sort((a, b) => {
        const aValue = typeof a === "string" ? a : a.path;
        const bValue = typeof b === "string" ? b : b.path;

        if (options.sort!.by === "name") {
          const comparison = aValue.localeCompare(bValue);
          return options.sort!.order === "asc" ? comparison : -comparison;
        }

        if (options.sort!.by === "size" && options.returnType === "details") {
          const aSize = (a as FileTreeItem).stats?.size || 0;
          const bSize = (b as FileTreeItem).stats?.size || 0;
          return options.sort!.order === "asc" ? aSize - bSize : bSize - aSize;
        }

        if (options.sort!.by === "date" && options.returnType === "details") {
          const aTime = (a as FileTreeItem).stats?.modified.getTime() || 0;
          const bTime = (b as FileTreeItem).stats?.modified.getTime() || 0;
          return options.sort!.order === "asc" ? aTime - bTime : bTime - aTime;
        }

        return 0;
      });
    }

    return results as string[] | FileTreeItem[];
  }
}
