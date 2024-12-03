import * as fs from "fs/promises";
import * as path from "path";

interface IFileInfo {
  name: string;
  path: string;
  content: string;
  ext: string;
  size: number;
  lines: number;
}

interface ITreeNode {
  name: string;
  path: string;
  type: "file" | "directory";
  children: ITreeNode[];
}

interface IDocumentConfig {
  pattern: RegExp;
  rootDir: string;
  outputPath: string;
  excludePatterns: string[];
  maxFileSize: number;
  ignoreHidden: boolean;
}

const DEFAULT_CONFIG: IDocumentConfig = {
  pattern: /.*/,
  rootDir: process.cwd(),
  outputPath: "documentation.md",
  excludePatterns: ["node_modules/**", "**/dist/**", "**/*.test.ts"],
  maxFileSize: 1024 * 1024, // 1MB
  ignoreHidden: true
};

// Tree visualization functions
const generateTreeSymbols = (depth: number, isLast: boolean[]): string => {
  if (depth === 0) return "";

  return (
    isLast
      .slice(0, -1)
      .map(last => (last ? "    " : "│   "))
      .join("") + (isLast[isLast.length - 1] ? "└── " : "├── ")
  );
};

const createTreeNode = async (
  nodePath: string,
  config: IDocumentConfig,
  relativePath = ""
): Promise<ITreeNode | null> => {
  const stats = await fs.stat(nodePath);
  const name = path.basename(nodePath);

  if (!shouldInclude(nodePath, config)) {
    return null;
  }

  if (stats.isDirectory()) {
    const entries = await fs.readdir(nodePath, { withFileTypes: true });
    const children: ITreeNode[] = [];

    for (const entry of entries) {
      const childNode = await createTreeNode(
        path.join(nodePath, entry.name),
        config,
        path.join(relativePath, name)
      );
      if (childNode) children.push(childNode);
    }

    return {
      name,
      path: relativePath || name,
      type: "directory",
      children
    };
  } else if (isMatchingFile(nodePath, config)) {
    return {
      name,
      path: relativePath || name,
      type: "file",
      children: []
    };
  }

  return null;
};

const renderTreeNode = (
  node: ITreeNode,
  isLast: boolean[] = [],
  result: string[] = []
): string[] => {
  const prefix = generateTreeSymbols(isLast.length, isLast);
  result.push(prefix + node.name);

  if (node.type === "directory") {
    node.children.forEach((child, index) => {
      renderTreeNode(
        child,
        [...isLast, index === node.children.length - 1],
        result
      );
    });
  }

  return result;
};

const isHidden = (filePath: string): boolean => {
  const baseName = path.basename(filePath);
  return baseName.startsWith(".");
};

const shouldInclude = (
  filePath: string,
  { excludePatterns, ignoreHidden }: IDocumentConfig
): boolean => {
  // Check for hidden files if ignoreHidden is enabled
  if (ignoreHidden && isHidden(filePath)) {
    return false;
  }

  // Check against exclude patterns
  const isExcluded = excludePatterns.some(pattern =>
    new RegExp(pattern.replace(/\*/g, ".*")).test(filePath)
  );

  return !isExcluded;
};

// Pure functions for file operations
const isMatchingFile = (filePath: string, config: IDocumentConfig): boolean => {
  if (!config.pattern) {
    throw new Error("Pattern is not defined in the config");
  }

  if (!shouldInclude(filePath, config)) {
    return false;
  }

  return config.pattern.test(filePath);
};

const formatSize = (bytes: number): string => {
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
};

// Core file processing functions

async function* walkDirectory(dir: string): AsyncGenerator<string> {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      yield* walkDirectory(fullPath);
    } else {
      yield fullPath;
    }
  }
}

const formatContentWithLineNumbers = (content: string): string => {
  const lines = content.split("\n");
  const lineNumberWidth = lines.length.toString().length;

  return lines
    .map((line, index) => {
      const lineNumber = (index + 1).toString().padStart(lineNumberWidth, " ");
      return `${lineNumber} | ${line}`;
    })
    .join("\n");
};

// Markdown generation functions
const generateFileSection = (file: IFileInfo): string => `
## File: ${file.name}
- Path: \`${file.path}\`
- Size: ${formatSize(Number(file.size))}
- Extension: ${file.ext}
- Lines of code: ${file.lines}
- Content:

\`\`\`${file.ext.slice(1) || "plaintext"}
${formatContentWithLineNumbers(file.content)}
\`\`\`

---------------------------------------------------------------------------
`;

const generateMarkdownContent = (
  files: IFileInfo[],
  treeContent: string
): string => `
# Code Documentation
Generated on: ${new Date().toISOString()}
Total files: ${files.length}

## Project Structure

\`\`\`
${treeContent}
\`\`\`

${files.map(generateFileSection).join("\n")}
`;

// Main function
async function generateDocumentation(
  userConfig: Partial<IDocumentConfig> = {}
): Promise<void> {
  try {
    const config: IDocumentConfig = { ...DEFAULT_CONFIG, ...userConfig };
    const files: IFileInfo[] = [];

    // Generate tree structure
    const rootNode = await createTreeNode(config.rootDir, config);
    const treeContent = rootNode
      ? renderTreeNode(rootNode).join("\n")
      : "No matching files found";

    for await (const filePath of walkDirectory(config.rootDir)) {
      if (isMatchingFile(filePath, config)) {
        const stats = await fs.stat(filePath);
        if (stats.size <= config.maxFileSize) {
          const content = await fs.readFile(filePath, "utf-8");
          files.push({
            name: path.basename(filePath),
            path: filePath,
            content,
            ext: path.extname(filePath),
            size: stats.size,
            lines: content.split("\n").filter(line => line.trim() !== "").length
          });
        }
      }
    }

    const markdownContent = generateMarkdownContent(files, treeContent);
    await fs.writeFile(config.outputPath, markdownContent, "utf-8");
  } catch (error) {
    console.error("Error generating documentation", error);
    throw error;
  }
}

if (require.main === module) {
  generateDocumentation({
    pattern: /\.ts$/,
    outputPath: "demo.md",
    ignoreHidden: true,
    excludePatterns: ["node_modules/**", "**/dist/**", "coverage/**"]
  }).catch(console.error);
}
