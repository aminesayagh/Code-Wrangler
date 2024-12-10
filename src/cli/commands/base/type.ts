// Command command interfaces
export interface ICommandOptions {
  verbose?: boolean;
}

export interface ICommand {
  execute: () => Promise<void>;
}
