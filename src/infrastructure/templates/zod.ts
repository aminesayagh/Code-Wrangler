import { z } from "zod";

const OTHER_KEYS = [
  "PROJECT_NAME",
  "GENERATION_DATE",
  "DIRECTORY_STRUCTURE",
  "TOTAL_FILES",
  "TOTAL_DIRECTORIES",
  "TOTAL_SIZE"
] as const;

export type OtherKeys = (typeof OTHER_KEYS)[number];

export const OTHER_KEYS_SCHEMA = z.enum(OTHER_KEYS);

export const baseTemplateSchema = z.object({
  PROJECT_NAME: z.string(),
  GENERATION_DATE: z.string().datetime(),
  DIRECTORY_STRUCTURE: z.string(),
  TOTAL_FILES: z.number(),
  TOTAL_DIRECTORIES: z.number(),
  TOTAL_SIZE: z.number(),
  CONTENT: z.string()
});

export type BaseTemplate = z.infer<typeof baseTemplateSchema>;
export type BaseTemplateString = keyof BaseTemplate;

export const fileTemplateSchema = z.object({
  FILE_NAME: z.string(),
  FILE_EXTENSION: z.string(),
  FILE_SIZE: z.number(),
  FILE_CONTENTS: z.string()
});

export type FileTemplate = z.infer<typeof fileTemplateSchema>;
export type FileTemplateString = keyof FileTemplate;

export const directoryTemplateSchema = z.object({
  DIRECTORY_NAME: z.string(),
  DIRECTORY_PATH: z.string(),
  DIRECTORY_SIZE: z.number(),
  DIRECTORY_CONTENT: z.string()
});

export type DirectoryTemplate = z.infer<typeof directoryTemplateSchema>;
export type DirectoryTemplateString = keyof DirectoryTemplate;
