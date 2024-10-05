import { promises as fs } from "fs";
import { Document } from "./Document";
import path from "path";

export class File extends Document {
  private content: string | null = null;
  public readonly extension: string;
  public size: number;

  constructor(name: string, filePath: string, size: number) {
    super(name, filePath);
    this.extension = path.extname(name);
    this.size = size;
  }

  public async getContent(): Promise<string> {
    if (!this.content) {
      this.content = await fs.readFile(this.path, "utf-8");
    }
    return `
    Name: ${this.name}
    Extension: ${this.extension}
    Size: ${this.formatSize()}
    Content:
    \`\`\`${this.extension} 
    ${this.content}
    \`\`\``;
  }
  public getInfo(): string {
    return `${this.name} (${this.extension}, ${this.formatSize()})`;
  }
  private formatSize(): string {
    const units = ["B", "KB", "MB", "GB", "TB"];
    let size = this.size;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(2)} ${units[unitIndex]}`;
  }
  public async toMarkdown(): Promise<string> {
    let content = `\`\`\`${this.extension}\n`;
    content += `# ${this.name}\n`;
    content += `\n`;
    content += await this.getContent();
    content += `\n\`\`\`\n\n`;
    return content;
  }
  public async toHTML(): Promise<string> {
    let content = `<pre><code class="language-${this.extension}">`;
    content += await this.getContent();
    content += `</code></pre>`;
    return content;
  }
}
