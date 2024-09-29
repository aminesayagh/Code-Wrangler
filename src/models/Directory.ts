import { Document } from "./Document";

export class Directory extends Document {
  public children: Document[] = [];

  async addChild(child: Document): Promise<void> {
    this.children.push(child);
  }

  async getContent(): Promise<string> {
    const childrenContent = await Promise.all(this.children.map(child => child.getContent()));
    return childrenContent.join('\n\n');
  }
}