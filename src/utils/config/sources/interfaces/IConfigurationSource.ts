import { z } from "zod";

import { ILoadConfigResult } from "../../schema/types";

// O: Output: The options that will be used to build the config
// V: Valid: The options that will be used to validate the config
export interface IConfigurationSource<O extends object, V extends object = O> {
  readonly priority: number;
  readonly schema: z.ZodSchema<V>;
  load: () => Promise<ILoadConfigResult<O>>;
  loaded: boolean;
}
