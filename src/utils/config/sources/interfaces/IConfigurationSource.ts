import { z } from "zod";

export interface IConfigurationSource<T extends object> {
  readonly priority: number;
  readonly schema: z.ZodSchema<T>;
  load: () => Promise<T>;
}
