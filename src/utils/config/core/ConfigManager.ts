export abstract class ConfigManager<T> {
  protected config: T;

  public constructor(defaultConfig: T) {
    this.config = defaultConfig;
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
    return this.config;
  }

  protected abstract validate(config: T): T;

  protected abstract handleConfigError(error: unknown): void;
}
