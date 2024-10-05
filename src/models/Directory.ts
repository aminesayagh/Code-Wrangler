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

  getAllFiles(): File[] {
    const documents: File[] = [];
    this.children.forEach(child => {
      if (child instanceof File) {
        documents.push(child);
      } else if (child instanceof Directory) {
        documents.push(...child.getAllFiles());
      }
    });
    return documents;
  }

  async generateContentMarkdown(): Promise<string[]> {
    const files = this.getAllFiles();
    console.log("files :", files);
    const filesContent = await Promise.all(files.map(file => file.getContent()));
    return filesContent;
  }
  
}
