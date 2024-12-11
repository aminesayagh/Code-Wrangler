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

CodeWrangler is an intelligent documentation assistant that automatically creates comprehensive knowledge bases from your code repositories. It's designed to bridge the gap between your codebase and AI language models like ChatGPT and Claude, making it easier to have meaningful conversations about your code.

## Future & Plugin Marketplace

CodeWrangler is evolving into a vibrant ecosystem where developers can both use and create specialized documentation tools. Our plugin marketplace will enable you to transform your code documentation in unlimited ways - from generating architectural diagrams and dependency maps, to creating interactive documentation sites, to producing custom AI training datasets.

Every development team has different documentation needs. Need to analyze security patterns? Install a security scanning plugin. Want to generate API documentation? There's a plugin for that. Building documentation for a specific framework or language? Use language-specific plugins that understand your code's unique patterns.

The marketplace will be a platform where documentation solutions come together. Developers can contribute their own plugins, monetize their documentation tools, and help build a community of documentation automation tools. The possibilities are endless - from team onboarding tools to code analysis utilities to specialized AI integration plugins.

Whether you're documenting a small project or a large enterprise codebase, the marketplace will have a plugin to match your specific use case - and if it doesn't, you can build and share your own. Join us in building the future of code documentation automation.

## Development Status and Demo

This library is currently in active development. The core functionality has been implemented, but there are still some features and improvements that are in progress. We welcome any feedback or contributions from the community as we work towards a stable release.

![Demo](./demo.md)

## Quick Start

### Installation

Supports Node.js 18.x and above

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
# Project Documentation: {{PROJECT_NAME}}

## Overview

This documentation was automatically generated on {{GENERATION_DATE}}.

## Directory Structure

\`\`\`
{{DIRECTORY_STRUCTURE}}
\`\`\`

## File Contents

{{DIRECTORY_CONTENT}}

## Summary

- Total Files: {{TOTAL_FILES}}
- Total Directories: {{TOTAL_DIRECTORIES}}
- Total Size: {{TOTAL_SIZE}}
```

#### File Template

```md
### File: {{NAME}}

- **Path:** {{PATH}}
- **Extension:** {{EXTENSION}}
- **Size:** {{SIZE}} bytes
- **Depth:** {{DEEP}}
- **Lines:** {{LINES}}

### Content:

\`\`\`{{EXTENSION}}
{{CONTENT}}
\`\`\`
```

#### Directory Template

```md
### Directory: {{NAME}}

- **Path:** {{PATH}}
- **Size:** {{SIZE}} bytes
- **Files:** {{LENGTH}}
- **Total Files (including subdirectories):** {{DEEP_LENGTH}}
- **Depth:** {{DEEP}}

#### Contents:

{{CONTENT}}
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
    "tree-visualizer": {
      "enabled": true,
      "format": "ascii"
    },
    "compress": {
      "enabled": true
    },
    "ai-summary": {
      "enabled": true,
      "model": "gpt-4"
    },
    "relative-documentation": {
      "enabled": true
    }
  }
}
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

We welcome contributions! Please see our [Contributing Guide](./documentation/CONTRIBUTING.md) for details

## License

Apache 2.0 License - See [LICENSE](LICENSE.md) for details.

Built with ❤️ by the CodeWrangler team

For more information, visit our [Documentation](documentation/CONTRIBUTING.md).
For check out the [Demo](demo/demo.md)
For communicate with the team, visit our [Discussions](https://github.com/aminesayagh/Code-Wrangler/discussions) or [Issues](https://github.com/aminesayagh/Code-Wrangler/issues)
