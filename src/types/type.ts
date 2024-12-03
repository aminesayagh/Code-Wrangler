export const FILE_TYPE = {
  File: "file",
  Directory: "directory"
} as const;

export type FileType = (typeof FILE_TYPE)[keyof typeof FILE_TYPE];

export interface IFileStats {
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

export interface IReadOptions {
  encoding?: BufferEncoding;
  flag?: string;
}

export interface IWriteOptions extends IReadOptions {
  mode?: number;
  flag?: string;
}

export interface IDirectoryOptions {
  recursive?: boolean;
  mode?: number;
}

export interface IFileTreeItem {
  path: string;
  type: FileType;
  stats?: IFileStats;
}

export interface IPropsNode {
  name: string;
  path: string;
  deep: number;
  size: number;
  extension?: string;
  stats?: IFileStats;
}
