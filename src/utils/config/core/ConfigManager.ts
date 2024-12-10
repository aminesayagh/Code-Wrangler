import { TConfigExtended } from "../schema/types";

export abstract class ConfigManager<T extends TConfigExtended> {
  private static random: number = 0;
  protected config: T;

  public constructor(initConfig: T) {
    this.config = ConfigManager.merge<T>(initConfig);
    this.validate(this.config);
  }

  public get<K extends keyof T>(key: K): T[K] {
    return this.config[key] as T[K];
  }

  public set(key: keyof T, value: T[keyof T]): void {
    if (value === undefined) {
      return;
    }
    const updatedConfig = { ...this.config, [key]: value };
    try {
      this.validate(updatedConfig);
      this.config = updatedConfig;
    } catch (error) {
      this.handleConfigError(error);
    }
  }

  public getAll(): T {
    // Return a copy of the config object
    return { ...this.config };
  }

  public static generateName<T extends { name?: string }>(config: T): string {
    if (typeof config?.name === "string") {
      return config.name;
    }
    ConfigManager.random++;
    return `config-code-wrangler-${ConfigManager.random}`;
  }

  public static merge<T extends TConfigExtended>(
    config: Partial<T>,
    defaultConfig?: Omit<T, "name">
  ): T {
    if (
      !config ||
      Object.keys(config).length === 0 ||
      config.name === undefined
    ) {
      return {
        ...defaultConfig,
        name: ConfigManager.generateName(config),
        ...config
      } as T;
    }
    return { ...defaultConfig, ...config } as T;
  }

  protected abstract validate(config: T): T;

  protected abstract handleConfigError(error: unknown): void;
}
