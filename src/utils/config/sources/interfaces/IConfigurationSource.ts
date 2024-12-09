import { z } from "zod";

import { ILoadConfigResult } from "../../schema/types";

export interface IConfigurationSource<T extends object> {
  readonly priority: number;
  readonly schema: z.ZodSchema<T>;
  load: () => Promise<ILoadConfigResult<T>>;
}
