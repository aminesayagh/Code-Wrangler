import { z } from "zod";

export type TemplateType = "page" | "file" | "directory";

export interface TemplateContent<T> {
  content: string;
  schema: z.ZodSchema<T>;
  additionalFields?: Record<string, z.ZodSchema<string>>;
}
