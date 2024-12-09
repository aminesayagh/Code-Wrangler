import { z } from "zod";

export const documentConfigSchema = z
  .object({
    name: z.string().default("document"),
    pattern: z.string().default("**/*.{js,ts,jsx,tsx}"),
    outputFormat: z.string().default("json"),
    rootDir: z.string().default("."),
    outputFile: z.string().optional(),
    excludePatterns: z.array(z.string()).optional(),
    ignoreHidden: z.boolean().default(true),
    additionalIgnore: z.array(z.string()).optional(),
    followSymlinks: z.boolean().default(true),
    verbose: z.boolean().default(false)
  })
  .strict();
