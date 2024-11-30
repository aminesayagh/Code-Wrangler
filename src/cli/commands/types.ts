export interface ICommandOptions {
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

export interface ICommand {
  execute(args: string[], options: ICommandOptions): Promise<void>;
}
