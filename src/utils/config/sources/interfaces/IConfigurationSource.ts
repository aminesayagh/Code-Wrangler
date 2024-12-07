import { ConfigOptions } from "../../schema";

export interface IConfigurationSource<T extends Partial<ConfigOptions>> {
  readonly priority: number;
  load: () => Promise<T>;
}