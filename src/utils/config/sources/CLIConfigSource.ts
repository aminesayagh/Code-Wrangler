import { z } from "zod";

import { ConfigSource } from "./ConfigSource";
import { IConfigurationSource } from "./interfaces/IConfigurationSource";
import { ProgramRecord } from "../../../cli/commands/document/config/types";
import { ILoadConfigResult } from "../schema/types";


export abstract class CLIConfigSource<
  I extends ProgramRecord,
  O extends object,
  V extends object = O
> extends ConfigSource implements IConfigurationSource<O, V>
{
  public readonly priority = 2;
  public readonly schema: z.ZodSchema<V>;

  public constructor(
    protected readonly args: string[],
    protected readonly options: Partial<I>,
    schema: z.ZodSchema<V>
  ) {
    super();
    this.schema = schema;
  }

  public abstract load(): Promise<ILoadConfigResult<O>>;
}
