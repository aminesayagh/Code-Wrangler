# Detailed Class Diagrams and Component Lifecycle

## Core Entity Relationships

```mermaid
classDiagram
    class NodeBase {
        #_props: PropsNode
        +constructor(name: string, path: string)
        +validate(): boolean
        +bundle(deep: number)*: Promise~void~
        +render()*: void
        +dispose(): Promise~void~
        +clone(): Promise~NodeBase~
        +props: Record~string, unknown~
        +secondaryProps*: Record~string, unknown~
        __Properties__
        +deep: number
        +size: number
        +name: string
        +path: string
        +stats: FileStats
    }

    class NodeFile {
        -_propsFile: PropsFile
        -_content: string
        +constructor(name: string, pathName: string)
        -initFile(name: string): void
        +bundle(deep: number): Promise~void~
        +render(): void
        __Properties__
        +extension: string
        +content: string
        +secondaryProps: PropsFile
    }

    class NodeDirectory {
        +children: (NodeFile|NodeDirectory)[]
        -_propsDirectory: PropsDirectory
        -_content: ContentType[]
        +constructor(name: string, pathName: string)
        -initDirectory(): void
        +addChild(child: Node): Promise~NodeDirectory~
        +bundle(deep: number): Promise~void~
        +render(): void
        __Properties__
        +length: number
        +deepLength: number
        +content: ContentType[]
        +secondaryProps: PropsDirectory
    }

    %% Rendering Strategy Hierarchy
    class RenderStrategy {
        <<interface>>
        +renderFile(file: NodeFile): string
        +renderDirectory(directory: NodeDirectory): string
        +loadTemplates(): Promise~void~
        +render(rootDirectory: NodeDirectory): Promise~string~
        +dispose(): Promise~void~
    }

    class BaseRenderStrategy {
        #extension: OutputFormatExtension
        #templates: Record~TemplateType, Template~
        #config: Config
        +constructor(config: Config, extension: OutputFormatExtension)
        +renderFile(file: NodeFile): string
        +renderDirectory(directory: NodeDirectory): string
        #replaceSelectors(template: string, values: any): string
        +loadTemplates(): Promise~void~
        +render(rootDirectory: NodeDirectory): Promise~string~
        +dispose(): Promise~void~
    }

    class MarkdownStrategy {
        +constructor(config: Config)
        #processCodeBlock(content: string, language: string): string
        +renderFile(file: NodeFile): string
    }

    class HTMLStrategy {
        +constructor(config: Config)
        #processCodeBlock(content: string, language: string): string
        -escapeHtml(content: string): string
        +renderFile(file: NodeFile): string
    }

    %% Template System
    class Template~T~ {
        -_content: string
        -type: TemplateType
        -schema: ZodObject~T~
        +constructor(type: TemplateType, schema: ZodObject~T~)
        +load(path: string): Promise~void~
        -validate(): void
        -getTemplateTokens(): string[]
        +render(values: T): string
        __Static Methods__
        +create(type, schema, path): Promise~Template~
    }

    %% Document Factory
    class DocumentFactory {
        __Static Methods__
        +type(filePath: string): Promise~FileType~
        +size(filePath: string): Promise~number~
        +getStats(filePath: string): Promise~FileStats~
        +readFile(filePath: string): Promise~string~
        +writeFile(filePath: string, data: string): Promise~void~
        +exists(filePath: string): boolean
        +isAbsolute(filePath: string): boolean
    }

    %% Relationships
    NodeBase <|-- NodeFile
    NodeBase <|-- NodeDirectory
    RenderStrategy <|.. BaseRenderStrategy
    BaseRenderStrategy <|-- MarkdownStrategy
    BaseRenderStrategy <|-- HTMLStrategy
    NodeFile -- DocumentFactory
    NodeDirectory -- DocumentFactory
    Template -- BaseRenderStrategy
```

## State Transitions and Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Initialized: Constructor
    Initialized --> Validated: validate()
    Validated --> Bundled: bundle()
    Bundled --> Rendered: render()
    Rendered --> Disposed: dispose()
    Rendered --> Bundled: reprocess
    Disposed --> [*]

    note right of Initialized
        - Properties initialized
        - Path validated
        - Stats collected
    end note

    note right of Bundled
        - Content loaded
        - Size calculated
        - Dependencies resolved
    end note

    note right of Rendered
        - Content processed
        - Templates applied
        - Output generated
    end note
```

## Component Interactions Flow

```mermaid
sequenceDiagram
    participant CLI
    participant Builder
    participant NodeFile
    participant Template
    participant Strategy
    participant DocumentFactory

    CLI->>Builder: build()
    Builder->>NodeFile: create()
    NodeFile->>DocumentFactory: validate()
    DocumentFactory-->>NodeFile: stats
    Builder->>NodeFile: bundle()
    NodeFile->>DocumentFactory: readFile()
    DocumentFactory-->>NodeFile: content
    Builder->>Strategy: loadTemplates()
    Strategy->>Template: load()
    Template-->>Strategy: template
    Builder->>NodeFile: render()
    NodeFile->>Strategy: renderFile()
    Strategy->>Template: render()
    Template-->>Strategy: output
    Strategy-->>NodeFile: rendered
    NodeFile-->>Builder: complete
```
