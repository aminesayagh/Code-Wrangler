import { z } from "zod";

export const BaseTemplateSchema = z.object({
  PROJECT_NAME: z.string(),
  GENERATION_DATE: z.string().datetime(),
  CONTENT: z.string(),
});

export type BaseTemplate = z.infer<typeof BaseTemplateSchema>;
export type BaseTemplateString = keyof BaseTemplate;

export const FileTemplateSchema = z.object({
  FILE_NAME: z.string(),
  FILE_EXTENSION: z.string(),
  FILE_SIZE: z.number(),
  FILE_CONTENTS: z.string(),
});

export type FileTemplate = z.infer<typeof FileTemplateSchema>;
export type FileTemplateString = keyof FileTemplate;

export const DirectoryTemplateSchema = z.object({
  DIRECTORY_NAME: z.string(),
  DIRECTORY_PATH: z.string(),
  DIRECTORY_SIZE: z.number(),
  CONTENT: z.string(),
});

export type DirectoryTemplate = z.infer<typeof DirectoryTemplateSchema>;
export type DirectoryTemplateString = keyof DirectoryTemplate;
