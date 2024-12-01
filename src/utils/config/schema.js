"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_CONFIG = exports.ConfigSchema = exports.FILE_EXTENSION = exports.FileExtensionSchema = exports.OutputFormatSchema = exports.OUTPUT_FORMATS = void 0;
var zod_1 = require("zod");
var Logger_1 = require("../logger/Logger");
exports.OUTPUT_FORMATS = {
    markdown: "md",
    html: "html",
};
exports.OutputFormatSchema = zod_1.z.enum(["markdown", "html"]);
exports.FileExtensionSchema = zod_1.z.enum(["md", "html"]);
exports.FILE_EXTENSION = {
    markdown: "md",
    html: "html",
};
exports.ConfigSchema = zod_1.z
    .object({
    dir: zod_1.z.string().default(process.cwd()),
    rootDir: zod_1.z.string().default(process.cwd()),
    templatesDir: zod_1.z.string().default("public/templates"),
    pattern: zod_1.z
        .string()
        .regex(/^.*$/, "Pattern must be a valid regex")
        .default(".*"),
    outputFile: zod_1.z.string().default("output"),
    logLevel: zod_1.z.enum(Logger_1.LOG_VALUES).default("INFO"),
    outputFormat: zod_1.z.array(exports.OutputFormatSchema).default(["markdown"]),
    maxFileSize: zod_1.z.number().positive().default(1048576),
    maxDepth: zod_1.z.number().default(100),
    excludePatterns: zod_1.z
        .array(zod_1.z.string())
        .default(["node_modules/**", "**/*.test.ts", "dist/**"]),
    ignoreHiddenFiles: zod_1.z.boolean().default(true),
    additionalIgnoreFiles: zod_1.z.array(zod_1.z.string()).optional().default([]),
    projectName: zod_1.z.string().optional(),
    followSymlinks: zod_1.z.boolean().default(false),
    codeConfigFile: zod_1.z
        .string()
        .regex(/\.json$/, "Config file must end with .json")
        .default("public/codewrangler.json"),
})
    .strict();
exports.DEFAULT_CONFIG = {
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
    excludePatterns: ["node_modules/**", "**/*.test.ts", "dist/**"],
};
