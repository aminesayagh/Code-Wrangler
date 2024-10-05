/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Node } from "unist";
import type { Processor } from "unified";

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
  section: "section"
} as const;

type NodeType = (typeof NodeType)[keyof typeof NodeType];

interface MarkdownSection {
  type: NodeType;
  depth?: number;
  children?: MarkdownSection[];
  value?: string;
}

export class MarkdownParser {
  private ast: Node;
  private unified: Processor;
  private remarkParse: any;
  private remarkStringify: any;
  private visit: any;
  constructor(markdown: string) {
    this.ast = { type: "root" } as any;
    this.unified = {} as Processor;
    this.remarkParse = null;
    this.remarkStringify = null;
    this.visit = null;
    this.init(markdown);
  }

  private async init(markdown: string): Promise<void> {
    const [unified, remarkParse, remarkStringify, { visit }] = await Promise.all([
      import("unified").then((module) => module.unified),
      import("remark-parse"),
      import("remark-stringify"),
      import("unist-util-visit"),
    ]);
    this.unified = unified;
    this.remarkParse = remarkParse.default;
    this.remarkStringify = remarkStringify.default;
    this.visit = visit;

    this.ast = this.unified()
      .use(this.remarkParse)
      .use(this.remarkStringify)
      .parse(markdown);
  }

  private static parseHeading(node: Node): MarkdownSection {
    const headingNode = node as any;
    const newSection: MarkdownSection = {
      type: "section",
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
      value:
        paragraphNode.children
          ?.map((child: MarkdownSection) => child.value)
          .join("") || "",
    };
  }

  public async toJSON(): Promise<MarkdownSection[]> {
    const json: MarkdownSection[] = [];
    let currentSection: MarkdownSection | null = null;

    this.visit(this.ast, (node: Node) => {
      if (node.type === "heading") {
        const newSection = MarkdownParser.parseHeading(node);
        if (
          !currentSection ||
          newSection.depth! <= (currentSection.depth || 0)
        ) {
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

  public static async fromJSON(json: MarkdownSection[]): Promise<string> {
    const [unified, remarkStringify] = await Promise.all([
      import("unified").then((module) => module.unified),
      import("remark-stringify"),
    ]);
    if (!unified || !remarkStringify) {
      throw new Error("MarkdownParser is not initialized");
    }
    const ast = {
      type: "root",
      children: MarkdownParser.jsonToAst(json),
    } as any;
    return unified().use(remarkStringify.default).stringify(ast) as string;
  }
  private static jsonToAst(json: MarkdownSection[]): any[] {
    return json.flatMap((section) => {
      const result: any[] = [
        {
          type: "heading",
          depth: section.depth || 1,
          children: [{ type: "text", value: section.value || "" }],
        },
      ];

      if (section.children) {
        result.push(
          ...section.children
            .map((child) => {
              if (child.type === "section") {
                return MarkdownParser.jsonToAst([child]);
              } else {
                return {
                  type: "paragraph",
                  children: [{ type: "text", value: child.value || "" }],
                };
              }
            })
            .flat()
        );
      }

      return result;
    });
  }

  public async updateSection(
    sectionName: string,
    newContent: string
  ): Promise<void> {
    const json = await this.toJSON();
    const updatedJson = this.updateSectionInJson(json, sectionName, newContent);

    this.ast = this.unified()
      .use(this.remarkParse)
      .parse(await MarkdownParser.fromJSON(updatedJson));
  }
  private updateSectionInJson(
    json: MarkdownSection[],
    sectionName: string,
    newContent: string
  ): MarkdownSection[] {
    return json.map((section) => {
      if (section.value === sectionName) {
        return {
          ...section,
          children: [{ type: "paragraph", value: newContent }],
        };
      } else if (section.children) {
        return {
          ...section,
          children: this.updateSectionInJson(
            section.children,
            sectionName,
            newContent
          ),
        };
      }
      return section;
    });
  }
  public toString(): string {
    return this.unified()
      .use(this.remarkStringify)
      .stringify(this.ast as any) as string;
  }
}
