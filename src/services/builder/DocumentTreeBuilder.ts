import { INodeTree, NodeTreeBuilder } from "./NodeTreeBuilder";
import { RenderableDirectory } from "../../core/entities/NodeDirectory";
import { RenderableFile } from "../../core/entities/NodeFile";
import { FILE_TYPE } from "../../types/type";
import { Config } from "../../utils/config";
import { logger } from "../../utils/logger";

export class DocumentTreeBuilder {
  private root: RenderableDirectory | RenderableFile | undefined;
  private builder: NodeTreeBuilder;
  public constructor(config: Config) {
    this.builder = new NodeTreeBuilder(config);
  }

  public async build(): Promise<void> {
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
    node: INodeTree
  ): Promise<RenderableDirectory | RenderableFile> {
    if (node.type === FILE_TYPE.Directory) {
      const directory = new RenderableDirectory(node.name, node.path);

      if (node.children) {
        // Recursively create children
        for (const child of node.children) {
          const childDocument = await this.createDocumentStructure(child);
          directory.addChild(childDocument);
        }
      }

      return directory;
    } else {
      return new RenderableFile(node.name, node.path);
    }
  }
}
