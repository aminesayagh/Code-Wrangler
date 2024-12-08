import { z } from "zod";

import { IConfigurationSource } from "./interfaces/IConfigurationSource";

export abstract class CLIConfigSource<T extends object>
  implements IConfigurationSource<T>
{
  public readonly priority = 2;
  public readonly schema: z.ZodSchema<T>;

  public constructor(
    protected readonly args: string[],
    protected readonly options: Partial<T>,
    schema: z.ZodSchema<T>
  ) {
    this.schema = schema;
  }

  public abstract load(): Promise<T>;
}
