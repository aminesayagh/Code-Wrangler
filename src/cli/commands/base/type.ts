// Command command interfaces
export interface ICommandOptions {
  verbose?: boolean;
}

export interface ICommand<T extends ICommandOptions = ICommandOptions> {
  execute: (options: T) => Promise<void>;
}
