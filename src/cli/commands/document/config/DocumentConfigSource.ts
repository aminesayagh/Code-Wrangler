import { z } from "zod";

import { documentConfigSchema } from "./schema";
import { IDocumentCommandOptions } from "./types";
import { documentFactory } from "../../../../infrastructure/filesystem/DocumentFactory";
import { CLIConfigSource, ILoadConfigResult } from "../../../../utils/config";
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

  public async load(): Promise<ILoadConfigResult<IDocumentCommandOptions>> {
    const rawConfig = this.parseArgs(); // parse to a raw config of key value pairs
    const validConfig = this.validate(rawConfig); // validate the raw config
    const transformedConfig = this.transform(validConfig); // transform the valid config to the final config
    return await Promise.resolve({
      config: transformedConfig,
      jobConfig: [],
      input: transformedConfig
    });
  }

  public static create(
    args: string,
    options: IDocumentCommandInputOptions
  ): Promise<ILoadConfigResult<IDocumentCommandOptions>> {
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
