import { IConfigurationSource } from "./interfaces/IConfigurationSource";

export abstract class CLIConfigSource<T extends Record<string, unknown>>
  implements IConfigurationSource<T>
{
  public readonly priority = 2;

  public constructor(
    private readonly args: string[],
    private readonly options: T
  ) {
  }

  public abstract load(): Promise<T>;
}
