export interface CommandOptions {
  dir?: string;
  output?: string;
  config?: string;
  verbose?: boolean;
  format?: string[];
  maxSize?: number;
  exclude?: string[];
  ignoreHidden?: boolean;
  additionalIgnore?: string[];
}

export interface Command {
  execute(args: string[], options: CommandOptions): Promise<void>;
}
