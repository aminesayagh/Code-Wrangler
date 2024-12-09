# CodeWrangler CLI Documentation

## Overview

CodeWrangler is a powerful documentation generator that creates comprehensive documentation from your codebase using pattern matching. It supports multiple output formats and provides flexible configuration options.

## Installation

```bash
npm install -g codewrangler
```

## Basic Usage

Generate documentation for your codebase using:

```bash
codewrangler document "<pattern>" [options]
```

### Quick Start Examples

```bash
# Document all TypeScript files
codewrangler document "**/*.ts"

# Document specific directories with markdown output
codewrangler document "src/**/*.{ts,js}" -f markdown -o docs/documentation.md

# Generate both HTML and Markdown documentation
codewrangler document "lib/**/*.js" -f markdown html -o docs/output
```

## Command: `document`

The `document` command analyzes your codebase and generates documentation based on the specified pattern.

### Pattern Syntax

The pattern uses glob syntax to match files:
- `**/*.ts` - all TypeScript files in any subdirectory
- `src/**/*.{js,ts}` - all JavaScript and TypeScript files in src directory
- `lib/*.js` - JavaScript files in the lib directory only

### Options

| Option | Alias | Description | Default |
|--------|-------|-------------|---------|
| `--format <formats...>` | `-f` | Output formats (markdown, html) | `markdown` |
| `--dir <directory>` | `-d` | Root directory to start search | Current directory |
| `--output <file>` | `-o` | Output file or directory | `documentation.md` |
| `--exclude <patterns...>` | `-e` | Patterns to exclude | `[]` |
| `--ignore-hidden` | | Ignore hidden files and directories | `true` |
| `--additional-ignore <patterns...>` | `-a` | Additional patterns to ignore | `[]` |
| `--verbose` | `-v` | Enable verbose output | `false` |

### Output Formats

CodeWrangler supports the following output formats:

1. **Markdown** (`.md`)
   - Clean, readable documentation
   - Compatible with GitHub and other markdown viewers
   - Includes code syntax highlighting

2. **HTML** (`.html`)
   - Interactive documentation
   - Syntax highlighted code blocks
   - Collapsible sections
   - Easy navigation

## Configuration

### Using a Configuration File

Create a `codewrangler.json` in your project root:

```json
{
  "projectName": "My Project",
  "templatesDir": "templates",
  "logLevel": "INFO",
  "verbose": false,
  "jobs": [
    {
      "name": "typescript",
      "pattern": "**/*.ts",
      "outputFormat": ["markdown"],
      "excludePatterns": ["**/*.test.ts", "node_modules/**"],
      "ignoreHiddenFiles": true
    }
  ]
}
```

### Default Exclusions

The following patterns are excluded by default:
- `node_modules/**`
- `**/dist/**`
- `**/*.test.ts`
- Hidden files (when `ignoreHidden` is true)

## Examples

### Basic Documentation

Generate markdown documentation for TypeScript files:

```bash
codewrangler document "**/*.ts" -o docs/typescript.md
```

### Multiple Output Formats

Generate both HTML and Markdown documentation:

```bash
codewrangler document "src/**/*.{js,ts}" -f markdown html -o docs/output
```

### Custom Exclusions

Exclude test files and specific directories:

```bash
codewrangler document "**/*.ts" \
  -e "**/*.test.ts" "**/__tests__/**" \
  -o docs/code.md
```

### Verbose Output

Enable detailed logging for troubleshooting:

```bash
codewrangler document "src/**/*.ts" -v
```

## Best Practices

1. **Pattern Specificity**
   - Use specific patterns to target relevant files
   - Exclude test files and build artifacts

2. **Output Organization**
   - Use meaningful output file names
   - Create separate documentation for different parts of your codebase

3. **Performance**
   - Exclude unnecessary directories
   - Use specific patterns to reduce file scanning

## Troubleshooting

Common issues and solutions:

1. **No Files Found**
   - Check if the pattern matches your files
   - Use verbose mode to see which files are being processed
   - Verify excluded patterns aren't too broad

2. **Output Files Not Generated**
   - Ensure output directory exists
   - Check write permissions
   - Verify output path is valid

3. **Missing Content**
   - Check file size limits
   - Verify file permissions
   - Enable verbose mode for detailed logging

## Support

For issues and feature requests, please visit:
https://github.com/aminesayagh/Code-Wrangler/issues
