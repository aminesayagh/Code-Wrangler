import { z } from "zod";

import { IDocumentConfig, documentConfigSchema } from "./schema";
import { IDocumentCommandConfig, IDocumentCommandOptions } from "./types";
import { documentFactory } from "../../../../infrastructure/filesystem/DocumentFactory";
import {
  CLIConfigSource,
  Config,
  IConfig,
  IJobConfig,
  ILoadConfigResult,
  JobConfig
} from "../../../../utils/config";
import { normalizePattern } from "../../../../utils/pattern";

type IDocumentCommandInputOptions = Partial<IDocumentCommandOptions>;

export class DocumentConfigSource extends CLIConfigSource<
  IDocumentCommandOptions,
  IDocumentCommandConfig,
  IDocumentConfig
> {
  public constructor(args: string, options: IDocumentCommandInputOptions) {
    super(
      [args],
      options,
      documentConfigSchema as z.ZodSchema<IDocumentConfig>
    );
  }

  public async load(): Promise<ILoadConfigResult<IDocumentCommandConfig>> {
    const rawConfig = this.parseArgs(); // parse to a raw config of key value pairs
    console.log(rawConfig);
    const validConfig = this.validate(rawConfig); // validate the raw config
    const transformedConfig = this.transform(validConfig); // transform the valid config to the final config
    console.log(
      "transformedConfig",
      Config.merge<IConfig>(transformedConfig),
      JobConfig.merge<IJobConfig>(transformedConfig)
    );
    return await Promise.resolve({
      config: Config.merge<IConfig>(transformedConfig),
      jobConfig: [JobConfig.merge<IJobConfig>(transformedConfig)],
      input: transformedConfig
    });
  }

  public static create(
    args: string,
    options: IDocumentCommandInputOptions
  ): Promise<ILoadConfigResult<IDocumentCommandConfig>> {
    return new DocumentConfigSource(args, options).load();
  }

  private transform(config: IDocumentConfig): IDocumentCommandConfig {
    return {
      ...config,
      outputFormat: config.outputFormat,
      pattern: normalizePattern(config.pattern),
      excludePatterns: config.excludePatterns,
      additionalIgnore: config.additionalIgnore,
      rootDir: documentFactory.resolve(config.rootDir),
      ignoreHidden: config.ignoreHidden,
      followSymlinks: config.followSymlinks,
      verbose: config.verbose,
      outputFile: config.outputFile
        ? this.normalizeOutputFile(config.outputFile)
        : undefined
    };
  }

  private validate(config: IDocumentCommandInputOptions): IDocumentConfig {
    return this.schema.parse(config);
  }

  private parseArgs(): IDocumentCommandInputOptions {
    return {
      pattern: this.args[0],
      verbose: this.options.verbose,
      outputFormat: this.options.format,
      rootDir: this.options.dir,
      outputFile: this.options.output,
      excludePatterns: this.options.exclude,
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
