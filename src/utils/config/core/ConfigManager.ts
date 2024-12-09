export abstract class ConfigManager<T extends { name: string }> {
  private static random: number = 0;
  protected config: T;

  public constructor(defaultConfig: Omit<T, "name"> & { name?: string }) {
    this.config = { name: this.generateName(), ...defaultConfig } as T;
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

  public generateName(): string {
    if (typeof this.config?.name === "string") {
      return this.config.name;
    }
    ConfigManager.random++;
    return `config-code-wrangler-${ConfigManager.random}`;
  }

  protected abstract validate(config: T): T;

  protected abstract handleConfigError(error: unknown): void;
}
