import { z } from "zod";

export const baseTemplateSchema = z.object({
  PROJECT_NAME: z.string(),
  GENERATION_DATE: z.string().datetime(),
  DIRECTORY_STRUCTURE: z.string(),
  TOTAL_SIZE: z.number(),
  CONTENT: z.string()
});

export type BaseTemplate = z.infer<typeof baseTemplateSchema>;
export type BaseTemplateString = keyof BaseTemplate;

export const fileTemplateSchema = z.object({
  FILE_NAME: z.string(),
  FILE_EXTENSION: z.string(),
  FILE_SIZE: z.number(),
  FILE_DEPTH: z.number(),
  FILE_LINES: z.number(),
  FILE_PATH: z.string(),
  FILE_CONTENTS: z.string()
});

export type FileTemplate = z.infer<typeof fileTemplateSchema>;
export type FileTemplateString = keyof FileTemplate;

export const directoryTemplateSchema = z.object({
  DIRECTORY_NAME: z.string(),
  DIRECTORY_PATH: z.string(),
  DIRECTORY_SIZE: z.number(),
  DIRECTORY_LENGTH: z.number(),
  DIRECTORY_DEEP_LENGTH: z.number(),
  DIRECTORY_DEPTH: z.number(),
  DIRECTORY_CONTENT: z.string()
});

export type DirectoryTemplate = z.infer<typeof directoryTemplateSchema>;
export type DirectoryTemplateString = keyof DirectoryTemplate;
