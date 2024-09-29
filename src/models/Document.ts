export abstract class Document {
  constructor(public name: string, public path: string) {}
  abstract getContent(): Promise<string>;
}
