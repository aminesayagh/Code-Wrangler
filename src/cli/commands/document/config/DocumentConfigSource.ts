import { z } from "zod";

import { documentConfigSchema } from "./schema";
import { IDocumentCommandOptions } from "./types";
import { documentFactory } from "../../../../infrastructure/filesystem/DocumentFactory";
import { CLIConfigSource } from "../../../../utils/config";
import { normalizePattern } from "../../../../utils/pattern";

type IDocumentCommandInputOptions = Partial<IDocumentCommandOptions>;

export class DocumentConfigSource extends CLIConfigSource<IDocumentCommandOptions> {
  public constructor(args: string, options: IDocumentCommandInputOptions) {
    super(
      [args],
      options,
      documentConfigSchema as z.ZodSchema<IDocumentCommandOptions>
    );
  }

  public load(): Promise<IDocumentCommandOptions> {
    const rawConfig = this.parseArgs();
    const validConfig = this.validate(rawConfig);
    return Promise.resolve(this.transform(validConfig));
  }

  public static create(
    args: string,
    options: IDocumentCommandInputOptions
  ): Promise<IDocumentCommandOptions> {
    return new DocumentConfigSource(args, options).load();
  }

  private transform(config: IDocumentCommandOptions): IDocumentCommandOptions {
    return {
      ...config,
      pattern: normalizePattern(config.pattern),
      rootDir: documentFactory.resolve(config.rootDir ?? "."),
      outputFile: this.normalizeOutputFile(config.outputFile ?? "")
    };
  }

  private validate(
    config: IDocumentCommandInputOptions
  ): IDocumentCommandOptions {
    return this.schema.parse(config);
  }

  private parseArgs(): IDocumentCommandInputOptions {
    return {
      pattern: this.args[0],
      verbose: this.options.verbose,
      outputFormat: this.options.outputFormat,
      rootDir: this.options.rootDir,
      outputFile: this.options.outputFile,
      excludePatterns: this.options.excludePatterns,
      ignoreHidden: this.options.ignoreHidden,
      additionalIgnore: this.options.additionalIgnore
    };
  }

  private normalizeOutputFile(outputFile: string): string {
    return documentFactory.isAbsolute(outputFile)
      ? outputFile
      : documentFactory.resolve(outputFile ?? "");
  }
}
