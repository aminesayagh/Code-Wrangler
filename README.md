# CodeWrangler

CodeWrangler is an extensible documentation automation platform that transforms code repositories into structured knowledge bases. Built with a powerful plugin architecture, it enables seamless integration with AI services, documentation generators, and analysis tools.

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Demo](#demo)
- [Quick Start](#quick-start)
- [Template System](#template-system)
- [Command Line Interface](#command-line-interface)
- [Configuration](#configuration)
- [Plugin System](#plugin-system)
- [Advanced Usage](#advanced-usage)
- [Development](#development)
- [Contributing](#contributing)

## Overview

CodeWrangler streamlines the process of generating comprehensive documentation from source code. By leveraging intelligent scanning and customizable templates, it produces consistent, high-quality documentation that can be enhanced through AI-powered analysis.

## Key Features

- 🌳 **Smart Repository Scanning**: Advanced file tree generation with intelligent filtering and customizable ignore patterns
- 🔌 **Plugin Architecture**: Extensible pipeline system supporting custom documentation workflows and integrations
- 🤖 **AI Integration Ready**: Built-in support for LLM-powered documentation enhancement and code analysis
- 📦 **Template Engine**: Flexible template system supporting multiple output formats and custom variables
- ⚡ **High Performance**: Parallel processing and caching capabilities for efficient handling of large repositories
- 🔄 **Incremental Updates**: Smart change detection for efficient documentation maintenance

## Development Status and Demo

This library is currently in active development. The core functionality has been implemented, but there are still some features and improvements that are in progress. We welcome any feedback or contributions from the community as we work towards a stable release.

![Demo](./demo.md)

## Quick Start

### Installation

```bash
npm install -g codewrangler
```

### Basic Usage

```bash
# Generate documentation for TypeScript files
cw "\.ts$" --output typescript-docs

# Watch mode with custom template
cw "\.js$" --template-dir ./my-templates --watch

# Generate documentation with AI analysis
cw "\.py$" --output python-docs --enable-ai-analysis
```

## Template System

CodeWrangler uses a powerful templating system that supports customization at multiple levels.

### Directory Structure

```
templates/
├── page.md          # Overall documentation template
├── directory.md     # Directory entry template
└── file.md         # File entry template
```

### Template Variables

#### Page Template

```md
# {{PROJECT_NAME}}

Generated: {{GENERATION_DATE}}

{{DIRECTORY_STRUCTURE}}

## Content

{{CONTENT}}
```

#### File Template

```md
### {{FILE_NAME}}

{{FILE_EXTENSION}}
{{FILE_CONTENTS}}
```

### Custom Templates

Create your own templates by placing them in a custom directory:

```bash
mkdir custom-templates
echo "# {{PROJECT_NAME}}" > custom-templates/page.md
cw "\.ts$" --template-dir ./custom-templates
```

## Command Line Interface

```bash
Usage: cw [options] <pattern>

Arguments:
  pattern                         File pattern to match (e.g., "\.ts$")

Options:
  -V, --version                  Display version information
  -d, --dir <dir>               Directory to search (default: current)
  -o, --output <name>           Output file name (default: "output")
  -t, --template-dir <dir>      Custom templates directory
  -c, --config <path>           Config file path
  --watch                       Watch for file changes
  -h, --help                    Display help information
```

## Configuration

### Configuration File (codewrangler.json)

```json
{
  "core": {
    "dir": "./src",
    "pattern": "\\.ts$",
    "outputFile": "documentation"
  },
  "templates": {
    "directory": "./templates",
    "variables": {
      "AUTHOR": "Your Name",
      "VERSION": "1.0.0"
    }
  },
  "plugins": {
    "ai-summary": {
      "enabled": true,
      "model": "gpt-4"
    }
  }
}
```

### Environment Variables

```bash
CODEWRANGLER_CONFIG_PATH=./config/codewrangler.json
CODEWRANGLER_TEMPLATE_DIR=./templates
CODEWRANGLER_LOG_LEVEL=DEBUG
```

## Plugin System

CodeWrangler supports plugins for extending functionality. Plugins can hook into various stages of the documentation process.

### 1. Repository Tree Visualizer
- Generates visual and textual representations of repository structure
- Features:
  - ASCII tree visualization
  - Interactive HTML tree view
  - Directory size analysis
  - Custom ignore patterns
  - Multiple export formats (ASCII, HTML, JSON)
- Use Case: Quickly understand project structure and organization

### 2. Smart Prompt Engine
- Enhances AI interactions by providing contextual code references
- Features:
  - Links questions to specific code files and line numbers
  - Maintains conversation history with code context
  - Suggests relevant files for current discussion
  - Tracks code changes during conversation
  - Generates contextual prompts for better AI responses
- Use Case: More efficient and context-aware AI assistance

### 3. Documentation Crawler
- Automatically aggregates and indexes library documentation
- Features:
  - Identifies project dependencies
  - Scrapes official documentation sites
  - Creates offline documentation cache
  - Integrates with popular package managers (npm, pip, composer)
  - Generates dependency graphs
- Use Case: Centralized documentation access and dependency understanding

### 4. Environment Analyzer
- Analyzes and reports on development environment configuration
- Features:
  - Runtime environment detection
  - Installed tools and versions
  - System capabilities assessment
  - Configuration compatibility checks
  - Environment-specific recommendations
- Use Case: Environment-aware assistance and troubleshooting

### 5. Code Summarizer
- Creates concise versions of code files by removing non-essential parts
- Features:
  - Smart comment preservation
  - Redundant code detection
  - Configuration file summarization
  - Custom summarization rules
  - Diff view support
- Use Case: Focus on essential code components

### Creating a Plugin (In development)

```typescript
import { Plugin, BaseNode } from "codewrangler";

export class CustomPlugin implements Plugin {
  name = "custom-plugin";

  async beforeScan(options: ScanOptions): Promise<void> {
    // Pre-scan setup
  }

  async afterRender(content: string): Promise<string> {
    // Post-render modifications
    return modifiedContent;
  }
}
```

### Using Plugins

```typescript
const pipeline = new DocumentationPipeline()
  .use(new TypeScriptDocsPlugin())
  .use(new AIAnalysisPlugin())
  .use(new CustomPlugin());

await pipeline.process({
  input: "./src",
  pattern: ".ts$",
});
```

## Advanced Usage

### AI Integration Example

```typescript
import { LangChain } from "langchain";

const pipeline = new DocumentationPipeline().use(
  new LangChainPlugin({
    prompt: `
      Analyze this codebase and provide:
      1. Architecture overview
      2. Key components
      3. Improvement suggestions
    `,
    model: "gpt-4",
  })
);
```

### Custom Template Example

```typescript
const customTemplate = new Template({
  content: `
    # {{PROJECT_NAME}}
    Author: {{AUTHOR}}
    
    ## Analysis
    {{AI_ANALYSIS}}
    
    ## Components
    {{COMPONENTS}}
  `,
});
```

## Development

### Prerequisites

- Node.js 18+
- TypeScript 4.5+
- npm or yarn

### Setup

```bash
# Clone repository
git clone https://github.com/aminesayagh/Code-Wrangler

# Install dependencies
cd codewrangler
npm install

# Build project
npm run build

# Run tests
npm test
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on:

## License

Apache 2.0 License - See [LICENSE](LICENSE.md) for details.

Built with ❤️ by the CodeWrangler team

For more information, visit our [Documentation](CONTRIBUTING.md).
