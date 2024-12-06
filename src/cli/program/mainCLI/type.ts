import { ICommandOptions } from "../../commands/types";

export interface IMainCLICommandOptions extends ICommandOptions {
  dir: string;
  config: string;
  format: string;
  output: string;
  exclude: string;
  ignoreHidden: boolean;
  additionalIgnore: string;
}
