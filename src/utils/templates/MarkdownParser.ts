import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { Node } from "unist";
import { visit } from "unist-util-visit";

const NodeType = {
    heading: "heading",
    paragraph: "paragraph",
    list: "list",
    code: "code",
    quote: "quote",
    link: "link",
    image: "image",
    table: "table",
    other: "other",
}

type NodeType = typeof NodeType[keyof typeof NodeType];

interface MarkdownSection {
    type: NodeType;
    depth?: number;
    children?: MarkdownSection[];
    value?: string;
}

export class MarkdownParser {
    private ast: Node;
    constructor(private readonly markdown: string) {
        this.ast = unified().use(remarkParse).use(remarkStringify).parse(this.markdown);
    }

    private static parseHeading(node: Node): MarkdownSection {
        const headingNode = node as any;
        const newSection: MarkdownSection = {
          type: 'section',
          depth: headingNode.depth,
          children: [],
        };

        if (headingNode.children && headingNode.children[0]) {
          newSection.value = headingNode.children[0].value;
        }

        return newSection;
    }
    private static parseParagraph(node: Node): MarkdownSection {
        const paragraphNode = node as any;
        return {
            type: NodeType.paragraph,
            value: paragraphNode.children?.map((child: MarkdownSection) => child.value).join("") || "",
        }
    }


    public toJSON(): MarkdownSection[] {
        const json: MarkdownSection[] = [];
        let currentSection: MarkdownSection | null = null;
        
        visit(this.ast, (node) => {
            if (node.type === "heading") {
                const newSection = MarkdownParser.parseHeading(node);
                if (!currentSection || newSection.depth! <= (currentSection.depth || 0)) {
                    json.push(newSection);
                    currentSection = newSection;
                } else {
                    currentSection?.children?.push(newSection);
                }
            } else if (node.type === "paragraph") {
                const newSection = MarkdownParser.parseParagraph(node);
                if (!currentSection) {
                    json.push(newSection);
                    currentSection = newSection;
                } else {
                    currentSection.children?.push(newSection);
                }
            }
        });
        return json;
    }

    public static fromJSON(json: MarkdownSection[]): string {
        const ast = {
            type: "root",
            children: MarkdownParser.jsonToAst(json),
        }
        return unified().use(remarkStringify).stringify(ast as any);
    }
    private static jsonToAst(json: MarkdownSection[]): any[] {
        return json.flatMap((section) => {
          const result: any[] = [
            {
              type: 'heading',
              depth: section.depth || 1,
              children: [{ type: 'text', value: section.value || '' }],
            },
          ];
    
          if (section.children) {
            result.push(
              ...section.children.map((child) => {
                if (child.type === 'section') {
                  return MarkdownParser.jsonToAst([child]);
                } else {
                  return {
                    type: 'paragraph',
                    children: [{ type: 'text', value: child.value || '' }],
                  };
                }
              }).flat()
            );
          }
    
          return result;
        });
    }
    
    public updateSection(sectionName: string, newContent: string): void {
        const json = this.toJSON();
        const updatedJson = this.updateSectionInJson(json, sectionName, newContent);
        
        this.ast = unified().use(remarkParse).parse(MarkdownParser.fromJSON(updatedJson)) as any;
    }
    private updateSectionInJson(json: MarkdownSection[], sectionName: string, newContent: string): MarkdownSection[] {
        return json.map((section) => {
            if (section.value === sectionName) {
              return {
                ...section,
                children: [{ type: 'paragraph', value: newContent }],
              };
            } else if (section.children) {
              return {
                ...section,
                children: this.updateSectionInJson(section.children, sectionName, newContent),
              };
            }
            return section;
        });
    }
    public toString(): string {
        return unified().use(remarkStringify).stringify(this.ast as any);
    }
}