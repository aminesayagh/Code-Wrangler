import { Command } from "commander";

import { GenerateCommand } from "./commands/GenerateCommand";
import { ICommandOptions } from "./commands/types";
import { ProgramBuilder } from "./program/ProgramBuilder";
import { Config } from "../utils/config/Config";

export class CodeWrangler {
  private static instance: CodeWrangler | undefined;
  private readonly VERSION = "1.0.0";
  private config: Config;
  private program: Command;
  private generateCommand: GenerateCommand;

  private constructor(config: Config) {
    this.config = config;
    this.generateCommand = new GenerateCommand(this.config);
    this.program = new ProgramBuilder(this.config, this.VERSION).build();

    this.setupCommands();
  }

  public static async run(): Promise<boolean> {
    if (!CodeWrangler.instance) {
      const config = await Config.load();
      CodeWrangler.instance = new CodeWrangler(config);
      await CodeWrangler.instance.program.parseAsync(process.argv);
      return true;
    }
    throw new Error("CodeWrangler already initialized");
  }

  private setupCommands(): void {
    this.program.action(async (pattern: string, options: ICommandOptions) => {
      await this.generateCommand.execute([pattern], options);
    });
  }
}
