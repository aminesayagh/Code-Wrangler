import { z } from "zod";

import { LOG_VALUES, LogLevelString } from "../../logger/Logger";

export const outputFormatSchema = z.enum(["markdown", "html"] as const);

export const fileExtensionSchema = z.enum(["md", "html"] as const);

export const logLevelSchema = z.enum(
  LOG_VALUES as [LogLevelString, ...LogLevelString[]]
);

export const jobConfigSchema = z
  .object({
    name: z.string(),
    description: z.string(),
    pattern: z.string().regex(/^.*$/, "Pattern must be a valid regex"),
    outputFile: z.string().optional(),
    outputFormat: z
      .array(outputFormatSchema),
    rootDir: z.string(),
    excludePatterns: z
      .array(z.string()),
    maxFileSize: z.number().positive(),
    maxDepth: z.number().min(0),
    ignoreHiddenFiles: z.boolean(),
    additionalIgnoreFiles: z.array(z.string()),
    followSymlinks: z.boolean()
  })
  .strict();

export const jobConfigSchemaPartial = jobConfigSchema.partial();

export const jobConfigSchemaFields = Object.keys(
  jobConfigSchema.shape
) as (keyof typeof jobConfigSchema.shape)[];

export const optionalJobConfigSchema = jobConfigSchema.partial();

export const configSchema = z
  .object({
    name: z.string(),
    templatesDir: z.string(),
    codeConfigFile: z.string().regex(/\.json$/, "Config file must end with .json"),
    logLevel: logLevelSchema,
    verbose: z.boolean()
  })
  .strict();

// list of all the fields in the configSchema
export const configSchemaFields = Object.keys(
  configSchema.shape
) as (keyof typeof configSchema.shape)[];

// Propose me a new zod parser based on the configSchema, but with all the fields optional.

export const optionalConfigSchema = configSchema.partial();
