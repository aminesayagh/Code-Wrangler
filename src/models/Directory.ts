import { Document } from "./Document";
import { File } from "./File";

export class Directory extends Document {
  public children: (File | Directory)[] = [];

  async addChild(child: File | Directory): Promise<void> {
    this.children.push(child);
  }

  async getContent(): Promise<string> {
    const childrenContent = await Promise.all(this.children.map(child => child.getContent()));
    return childrenContent.join('\n\n');
  }

  getInfo(): string {
    return `${this.name} (${this.children.length} items)`;
  }
}
