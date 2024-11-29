import { z } from "zod";
import { LOG_VALUES } from "../logger/Logger";

export const OUTPUT_FORMATS = {
  markdown: "md",
  html: "html",
} as const;

export type OutputFormats = typeof OUTPUT_FORMATS;
export type OutputFormatName = keyof OutputFormats;
export type OutputFormatExtension = OutputFormats[OutputFormatName];

const OUTPUT_FORMATS_KEYS = Object.keys(OUTPUT_FORMATS) as OutputFormatName[];
const OUTPUT_FORMATS_VALUES = Object.values(
  OUTPUT_FORMATS
) as OutputFormatExtension[];

export const OutputFormatSchema = z.enum(
  OUTPUT_FORMATS_KEYS as [string, ...string[]]
);
export const FileExtensionSchema = z.enum(
  OUTPUT_FORMATS_VALUES as [string, ...string[]]
);
export type OutputFormat = z.infer<typeof OutputFormatSchema>;
export type FileExtension = z.infer<typeof FileExtensionSchema>;

export const FILE_EXTENSION: Record<OutputFormat, FileExtension> = {
  markdown: "md",
  html: "html",
};

export const ConfigSchema = z
  .object({
    dir: z.string().default(process.cwd()),
    rootDir: z.string().default(process.cwd()),
    pattern: z
      .string()
      .regex(/^.*$/, "Pattern must be a valid regex")
      .default(".*"),
    outputFile: z.string().default("output"),
    logLevel: z.enum(LOG_VALUES as [string, ...string[]]).default("INFO"),
    outputFormat: z.array(OutputFormatSchema).default(["markdown"]),
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
      .default("codewrangler.json"),
  })
  .strict();

export type ConfigOptions = z.infer<typeof ConfigSchema>;
// get a type listing all the keys of the config
export type ConfigKeys = keyof ConfigOptions;

export const DEFAULT_CONFIG: ConfigOptions = {
  dir: process.cwd(), // current working directory, where the command is run
  rootDir: process.cwd(),
  pattern: ".*",
  outputFile: "output",
  logLevel: "INFO",
  outputFormat: ["markdown"],
  maxFileSize: 1048576,
  maxDepth: 100,
  codeConfigFile: "codewrangler.json",
  projectName: undefined,
  followSymlinks: false,
  ignoreHiddenFiles: true, // Default value
  additionalIgnoreFiles: [],
  excludePatterns: ["node_modules/**", "**/*.test.ts", "dist/**"],
};
