import { INodeTree, NodeTreeBuilder } from "./NodeTreeBuilder";
import { RenderableDirectory } from "../../core/entities/NodeDirectory";
import { RenderableFile } from "../../core/entities/NodeFile";
import { FILE_TYPE } from "../../types/type";
import { JobConfig } from "../../utils/config";
import { logger } from "../../utils/logger";

export class DocumentTreeBuilder {
  private root: RenderableDirectory | RenderableFile | undefined;
  private builder: NodeTreeBuilder;
  public constructor(config: JobConfig) {
    this.builder = new NodeTreeBuilder(config);
  }

  public async build(): Promise<RenderableDirectory | RenderableFile> {
    try {
      // Build file tree structure
      const fileTree = await this.builder.build();

      // Convert file tree to Document tree
      this.root = await this.createDocumentStructure(fileTree);

      // Initialize the entire document tree
      await this.root.bundle();

      if (!this.root) {
        throw new Error("No files found matching the specified pattern");
      }

      logger.info("Document tree built successfully");

      return this.root;
    } catch (error) {
      logger.error("Error building document tree", error as Error);
      throw error;
    }
  }

  private async createDocumentStructure(
    node: INodeTree
  ): Promise<RenderableDirectory | RenderableFile> {
    if (node.type !== FILE_TYPE.Directory)
      return new RenderableFile(node.name, node.path);
    const directory = new RenderableDirectory(node.name, node.path);

    if (node.children) {
      // Recursively create children
      for (const child of node.children) {
        const childDocument = await this.createDocumentStructure(child);
        directory.addChild(childDocument);
      }
    }

    return directory;
  }
}
