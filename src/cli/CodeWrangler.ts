import { Command } from "commander";
import { Config } from "../utils/config/Config";
import { GenerateCommand } from "./commands/GenerateCommand";
import { ProgramBuilder } from "./program/ProgramBuilder";
import { CommandOptions } from "./commands/types";

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

  private setupCommands(): void {
    this.program.action(async (pattern: string, options: CommandOptions) => {
      await this.generateCommand.execute([pattern], options);
    });
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
}
