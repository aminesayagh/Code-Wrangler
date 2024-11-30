import { FileTreeBuilder, FileTreeNode } from "./FileTreeBuilder";
import { RenderableDirectory } from "../../core/entities/Directory";
import { RenderableFile } from "../../core/entities/File";
import { RenderStrategy } from "../renderer/RenderStrategy";
import { Config } from "../../utils/config";
import { logger } from "../../utils/logger";
import { FileType } from "../../types/type";

export class DocumentTreeBuilder {
  private root: RenderableDirectory | RenderableFile | undefined;
  private builder: FileTreeBuilder;
  constructor(config: Config, private renderStrategy: RenderStrategy[]) {
    this.builder = new FileTreeBuilder(config);
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
