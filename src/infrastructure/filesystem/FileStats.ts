import { Stats } from "fs";
import fs from "fs/promises";

import { DocumentError } from "../../core/errors/DocumentError";
import { FileNotFoundError } from "../../core/errors/FileNotFoundError";
import { IAccessFlags, IFileStats } from "../../types/type";

class FileStatsService {
  public async getStats(filePath: string): Promise<IFileStats> {
    const stats = await this.getBasicStats(filePath);
    const accessFlags = await this.checkAccess(filePath);
    return this.mapStatsToFileInfo(stats, accessFlags);
  }
  private async getBasicStats(filePath: string): Promise<Stats> {
    try {
      return await fs.stat(filePath);
    } catch (error) {
      this.handleStatError(error as NodeJS.ErrnoException, filePath);
      throw error; // TypeScript requires this
    }
  }

  private handleStatError(
    error: NodeJS.ErrnoException,
    filePath: string
  ): never {
    if (error.code === "ENOENT") {
      throw new FileNotFoundError(filePath);
    }
    throw new DocumentError(String(error), filePath);
  }

  private async checkAccess(filePath: string): Promise<IAccessFlags> {
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
  }

  private mapStatsToFileInfo(
    stats: Stats,
    accessFlags: IAccessFlags
  ): IFileStats {
    return {
      size: stats.size,
      created: stats.birthtime,
      modified: stats.mtime,
      accessed: stats.atime,
      isDirectory: stats.isDirectory(),
      isFile: stats.isFile(),
      permissions: accessFlags
    };
  }
}

export const fileStatsService = async (
  filePath: string
): Promise<IFileStats> => {
  const fileStatsService = new FileStatsService();
  return await fileStatsService.getStats(filePath);
};
