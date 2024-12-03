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
    dir: z.string().default(process.cwd()),
    rootDir: z.string().default(process.cwd()),
    templatesDir: z.string().default("public/templates"),
    pattern: z
      .string()
      .regex(/^.*$/, "Pattern must be a valid regex")
      .default(".*"),
    outputFile: z.string().default("output"),
    logLevel: z.enum(LOG_VALUES as [string, ...string[]]).default("INFO"),
    outputFormat: z.array(outputFormatSchema).default(["markdown"]),
    maxFileSize: z.number().positive().default(1048576),
    maxDepth: z.number().default(100),
    excludePatterns: z
      .array(z.string())
      .default(["node_modules/**", "**/*.test.ts", "dist/**"]),
    ignoreHiddenFiles: z.boolean().default(true),
    additionalIgnoreFiles: z.array(z.string()).optional().default([]),
    projectName: z.string().optional(),
    followSymlinks: z.boolean().default(false),
    codeConfigFile: z
      .string()
      .regex(/\.json$/, "Config file must end with .json")
      .default("public/codewrangler.json")
  })
  .strict();

export type ConfigOptions = z.infer<typeof configSchema>;
// get a type listing all the keys of the config
export type ConfigKeys = keyof ConfigOptions;

export const DEFAULT_CONFIG: ConfigOptions = {
  dir: process.cwd(), // current working directory, where the command is run
  rootDir: process.cwd(),
  templatesDir: "public/templates",
  pattern: ".*",
  outputFile: "output",
  logLevel: "INFO",
  outputFormat: ["markdown"],
  maxFileSize: 1048576,
  maxDepth: 100,
  codeConfigFile: "public/codewrangler.json",
  projectName: undefined,
  followSymlinks: false,
  ignoreHiddenFiles: true, // Default value
  additionalIgnoreFiles: [],
  excludePatterns: ["node_modules/**", "**/*.test.ts", "dist/**"]
};
