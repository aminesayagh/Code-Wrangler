export interface ICommandOptions {
  verbose: boolean;
}

export interface ICommand {
  execute: (args: string[], options: ICommandOptions) => Promise<void>;
}
