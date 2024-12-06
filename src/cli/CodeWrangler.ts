import { Command } from "commander";

import { MainCLICommand } from "./program/mainCLI/MainCLICommand";
import { ProgramBuilder } from "./program/mainCLI/ProgramBuilder";
import { Config } from "../utils/config/Config";
import { IMainCLICommandOptions } from "./program/mainCLI/type";

export class CodeWrangler {
  private static instance: CodeWrangler | undefined;
  private readonly VERSION = "1.0.0";
  private program: Command;

  private constructor(private config: Config) {
    this.program = new ProgramBuilder(config, this.VERSION).build();
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
    this.program.action(
      async (pattern: string, options: IMainCLICommandOptions) => {
        const command = new MainCLICommand(this.config);
        await command.execute([pattern], options);
      }
    );
  }
}
