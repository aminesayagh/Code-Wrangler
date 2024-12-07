import { z } from "zod";

import { LOG_VALUES } from "../logger/Logger";

export const OUTPUT_FORMATS = {
  markdown: "md",
  html: "html"
} as const;

export type OutputFormats = typeof OUTPUT_FORMATS;
export type OutputFormatName = keyof OutputFormats;
export type OutputFormatExtension = OutputFormats[OutputFormatName];

export const outputFormatSchema = z.enum(["markdown", "html"] as const);

export const fileExtensionSchema = z.enum(["md", "html"] as const);

export type OutputFormat = z.infer<typeof outputFormatSchema>;
export type FileExtension = z.infer<typeof fileExtensionSchema>;

export const FILE_EXTENSION: Record<OutputFormat, FileExtension> = {
  markdown: "md",
  html: "html"
};

export const configSchema = z
  .object({
    dir: z.string(),
    rootDir: z.string(),
    templatesDir: z.string(),
    pattern: z
      .string()
      .regex(/^.*$/, "Pattern must be a valid regex"),
    outputFile: z.string(),
    logLevel: z.enum(LOG_VALUES as [string, ...string[]]),
    outputFormat: z.array(outputFormatSchema),
    maxFileSize: z.number().positive(),
    maxDepth: z.number(),
    excludePatterns: z.array(z.string()),
    ignoreHiddenFiles: z.boolean(),
    additionalIgnoreFiles: z.array(z.string()).optional(),
    projectName: z.string().optional(),
    verbose: z.boolean(),
    followSymlinks: z.boolean(),
    codeConfigFile: z.string().regex(/\.json$/, "Config file must end with .json")
  })
  .strict();

export type ConfigOptions = z.infer<typeof configSchema>;
// get a type listing all the keys of the config
export type ConfigKeys = keyof ConfigOptions;

const DEFAULT_CONFIG_IGNORE = {
  ignoreHiddenFiles: true, // Default value
  additionalIgnoreFiles: [],
  excludePatterns: ["node_modules/**", "**/*.test.ts", "dist/**"]
};

const DEFAULT_CONFIG_LOG = {
  logLevel: "INFO",
  verbose: false
};

const DEFAULT_CONFIG_LIMITS = {
  maxFileSize: 1048576,
  maxDepth: 100
};

const DEFAULT_CONFIG_PATHS = {
  templatesDir: "public/templates",
  codeConfigFile: "public/codewrangler.json"
};

const DEFAULT_CONFIG_OUTPUT = {
  outputFormat: ["markdown"] as OutputFormat[],
  outputFile: "output"
};

export const DEFAULT_CONFIG: ConfigOptions = {
  dir: process.cwd(), // current working directory, where the command is run
  rootDir: process.cwd(),
  projectName: undefined,
  pattern: ".*",
  followSymlinks: false,
  ...DEFAULT_CONFIG_PATHS,
  ...DEFAULT_CONFIG_LIMITS,
  ...DEFAULT_CONFIG_IGNORE,
  ...DEFAULT_CONFIG_LOG,
  ...DEFAULT_CONFIG_OUTPUT
};
