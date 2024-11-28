export const FileType = {
  File: "file",
  Directory: "directory",
} as const;

export type FileType = (typeof FileType)[keyof typeof FileType];

export interface FileStats {
  size: number;
  created: Date;
  modified: Date;
  accessed: Date;
  isDirectory: boolean;
  isFile: boolean;
  permissions: {
    readable: boolean;
    writable: boolean;
    executable: boolean;
  };
}

export interface ReadOptions {
  encoding?: BufferEncoding;
  flag?: string;
}

export interface WriteOptions extends ReadOptions {
  mode?: number;
  flag?: string;
}

export interface DirectoryOptions {
  recursive?: boolean;
  mode?: number;
}

export interface FileTreeItem {
  path: string;
  type: FileType;
  stats?: FileStats;
}

export interface PropsNode {
  name: string;
  path: string;
  deep: number;
  size: number;
  extension?: string;
  stats: FileStats;
}
