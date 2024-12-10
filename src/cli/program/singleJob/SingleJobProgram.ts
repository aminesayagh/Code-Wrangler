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
      DocumentCLIBuilder.instance.init();
      await DocumentCLIBuilder.instance.build();
    }
    return DocumentCLIBuilder.instance;
  }

  private init(): this {
    this.program = new ProgramBuilder(this.config)
      .withVersion(this.VERSION)
      .withDescription()
      .withArguments()
      .withOptions()
      .build();

    return this;
  }

  private async build(): Promise<void> {
    const configBuilder = await ConfigBuilder.create();
    this.program.action(
      async (pattern: string, options: IDocumentCommandOptions) => {
        const documentConfigSource = new DocumentConfigSource(pattern, options);
        
        configBuilder.withCLIConfig(documentConfigSource);
        this.config = configBuilder.build();

        const documentCLI = new DocumentCommand(this.config);
        await documentCLI.execute();
      }
    );

    this.program.parse(process.argv);
  }
}
