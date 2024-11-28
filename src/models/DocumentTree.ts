import { FileTreeBuilder, FileTreeNode } from "./FileTreeBuilder";
import { RenderableDirectory } from "./Directory";
import { RenderStrategy } from "./RenderStrategy";
import { Config } from "../utils/Config";
import { logger } from "../utils/Logger";
import { FileType } from "../type";
import { RenderableFile } from "./File";

export class DocumentTree {
  private root: RenderableDirectory | RenderableFile | undefined;
  private builder: FileTreeBuilder;
  private renderStrategy: RenderStrategy;

  constructor(config: Config, renderStrategy: RenderStrategy) {
    this.builder = new FileTreeBuilder(config);
    this.renderStrategy = renderStrategy;
  }

  async build(): Promise<void> {
    try {
      // Build file tree structure
      const fileTree = await this.builder.build();

      // Convert file tree to Document tree
      this.root = await this.createDocumentStructure(fileTree);

      // Initialize the entire document tree
      await this.root.bundle();
    } catch (error) {
      logger.error("Error building document tree", error as Error);
      throw error;
    }
  }

  private async createDocumentStructure(
    node: FileTreeNode
  ): Promise<RenderableDirectory | RenderableFile> {
    if (node.type === FileType.Directory) {
      const directory = new RenderableDirectory(
        node.name,
        node.path,
        this.renderStrategy
      );

      if (node.children) {
        // Recursively create children
        for (const child of node.children) {
          const childDocument = await this.createDocumentStructure(child);
          await directory.addChild(childDocument);
        }
      }

      return directory;
    } else {
      return new RenderableFile(node.name, node.path, this.renderStrategy);
    }
  }
}
