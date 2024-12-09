import { Command } from "commander";

import { ProgramBuilder } from "./ProgramBuilder";
import { Config, ConfigBuilder } from "../../../utils/config";
import {
  DocumentCommand,
  DocumentConfigSource,
  IDocumentCommandOptions
} from "../../commands/document";

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
    this.program = new ProgramBuilder(this.config)
      .withVersion(this.VERSION)
      .withDescription()
      .withArguments()
      .withOptions()
      .build();

    this.program.action(
      async (pattern: string, options: IDocumentCommandOptions) => {
        const documentConfigSource = new DocumentConfigSource(pattern, options);
        configBuilder.withCLIConfig(documentConfigSource);
        this.config = configBuilder.build();

        const documentCLI = new DocumentCommand(this.config, options);
        await documentCLI.execute();
      }
    );
  }
}
