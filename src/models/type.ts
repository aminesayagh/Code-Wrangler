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

export interface FileTreeOptions {
  /** RegExp pattern to match files */
  pattern?: RegExp;
  /** Maximum depth to traverse (undefined for unlimited) */
  maxDepth?: number;
  /** Include hidden files/directories */
  includeHidden?: boolean;
  /** Return type format */
  returnType: "paths" | "details";
  /** Sort results */
  sort?: {
    by: "name" | "size" | "date";
    order: "asc" | "desc";
  };
  /** Filter function for additional filtering */
  filter?: (path: string) => boolean | Promise<boolean>;
  /** Follow symbolic links */
  followSymlinks?: boolean;
}

export interface FileTreeItem {
  path: string;
  type: FileType;
  stats?: FileStats;
}
