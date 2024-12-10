import { z } from "zod";

import { outputFormatSchema } from "../../../../utils/config";

export const documentConfigSchema = z
  .object({
    name: z.string().optional(),
    pattern: z.string().default("**/*"),
    outputFormat: outputFormatSchema.default("markdown"),
    rootDir: z.string().default("."),
    outputFile: z.string().optional(),
    excludePatterns: z.string().optional(),
    ignoreHidden: z.boolean().default(true),
    additionalIgnore: z.array(z.string()).optional(),
    followSymlinks: z.boolean().default(true),
    verbose: z.boolean().default(false)
  })
  .strict();

export type IDocumentConfig = z.infer<typeof documentConfigSchema>;
