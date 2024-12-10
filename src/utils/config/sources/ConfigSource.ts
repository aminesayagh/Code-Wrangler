export abstract class ConfigSource {
  protected isLoaded: boolean = false;

  public constructor() {
    this.isLoaded = false;
  }

  public get loaded(): boolean {
    return this.isLoaded;
  }
}
