import { Command } from "commander";

import { DocumentCLI } from "./DocumentCli";
import { DocumentCLIConfig } from "./DocumentCLIConfig";
import { ProgramBuilder } from "./ProgramBuilder";
import { IDocumentCommandOptions } from "./types";
import { Config, ConfigBuilder } from "../../../utils/config";

export class DocumentCLIBuilder {
  private static instance: DocumentCLIBuilder | undefined;
  private config: Config;
  private program!: Command;
  private VERSION = "1.0.0";

  private constructor() {
    this.config = Config.getInstance();
  }

  public static async create(): Promise<DocumentCLIBuilder> {
    if (!DocumentCLIBuilder.instance) {
      DocumentCLIBuilder.instance = new DocumentCLIBuilder();
      await DocumentCLIBuilder.instance.init();
    }
    return DocumentCLIBuilder.instance;
  }

  private async init(): Promise<void> {
    const configBuilder = await ConfigBuilder.create();
    this.program = new ProgramBuilder(this.config, this.VERSION).build();

    this.program.action((pattern: string, options: IDocumentCommandOptions) => {
      const documentCLIConfig = new DocumentCLIConfig(pattern, options);
      configBuilder.withCLIConfig(documentCLIConfig);
    });

    this.config = configBuilder.build();

    const documentCLI = new DocumentCLI(this.config);
    await documentCLI.create();
  }
}
