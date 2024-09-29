import { promises as fs } from "fs";
import { Document } from "./Document";

export class File extends Document {
  private _content: string | null = null;
  async getContent(): Promise<string> {
    if (!this._content) {
      this._content = await fs.readFile(this.path, "utf-8");
    }
    return this._content;
  }
}