# Configuration Guide

This guide explains how to configure CodeWrangler to suit your documentation needs. CodeWrangler supports multiple configuration methods and allows you to define multiple documentation jobs.

## Configuration Methods

Configuration can be specified in three ways, listed in order of precedence (highest to lowest):

1. Command Line Interface (CLI) arguments
2. Configuration file (`codewrangler.json`)
3. Default settings

## Global Configuration

Global settings affect the overall behavior of CodeWrangler:

```json
{
  "projectName": "MyProject",
  "templatesDir": "public/templates",
  "codeConfigFile": "codewrangler.json",
  "logLevel": "INFO",
  "verbose": false
}
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `projectName` | string | "CodeWrangler" | Name of your project |
| `templatesDir` | string | "public/templates" | Directory containing documentation templates |
| `codeConfigFile` | string | "codewrangler.json" | Path to configuration file |
| `logLevel` | string | "INFO" | Log level (ERROR, WARN, INFO, DEBUG) |
| `verbose` | boolean | false | Enable verbose logging |

## Jobs Configuration

Documentation tasks are defined as jobs. Each job specifies what files to process and how to process them:

```json
{
  "jobs": [
    {
      "name": "typescript-docs",
      "pattern": "\\.ts$",
      "rootDir": "./src",
      "outputFile": "docs/typescript",
      "outputFormat": ["markdown"],
      "excludePatterns": ["**/*.test.ts"],
      "maxFileSize": 1048576,
      "maxDepth": 100,
      "ignoreHiddenFiles": true,
      "additionalIgnoreFiles": [],
      "followSymlinks": false
    }
  ]
}
```

### Job Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `name` | string | Required | Unique identifier for the job |
| `pattern` | string | Required | Regex pattern for matching files |
| `rootDir` | string | Current directory | Root directory to start file scanning |
| `outputFile` | string | Required | Output file path (extension will be added based on format) |
| `outputFormat` | string[] | ["markdown"] | Output formats ("markdown" and/or "html") |
| `excludePatterns` | string[] | ["node_modules/**", "**/*.test.ts", "dist/**"] | Glob patterns for files to exclude |
| `maxFileSize` | number | 1048576 (1MB) | Maximum file size in bytes to process |
| `maxDepth` | number | 100 | Maximum directory depth to traverse |
| `ignoreHiddenFiles` | boolean | true | Whether to ignore hidden files (starting with .) |
| `additionalIgnoreFiles` | string[] | [] | Additional files/patterns to ignore |
| `followSymlinks` | boolean | false | Whether to follow symbolic links |

## Usage Examples

### Command Line

Create documentation for TypeScript files:
```bash
codewrangler "\\.ts$" --dir ./src --output docs/typescript
```

This will create a new job with the specified settings.

### Configuration File

Create a `codewrangler.json` file in your project root:

```json
{
  "projectName": "MyProject",
  "logLevel": "INFO",
  "jobs": [
    {
      "name": "typescript-docs",
      "pattern": "\\.ts$",
      "rootDir": "./src",
      "outputFile": "docs/typescript",
      "excludePatterns": ["**/*.test.ts"]
    },
    {
      "name": "test-docs",
      "pattern": "\\.test.ts$",
      "rootDir": "./tests",
      "outputFile": "docs/tests",
      "maxDepth": 3
    }
  ]
}
```

This configuration:
- Sets up two documentation jobs
- First job documents TypeScript source files, excluding tests
- Second job specifically documents test files
- Uses default values for unspecified settings

### Multiple Output Formats

Generate documentation in both Markdown and HTML:

```json
{
  "jobs": [
    {
      "name": "full-docs",
      "pattern": "\\.ts$",
      "outputFile": "docs/typescript",
      "outputFormat": ["markdown", "html"]
    }
  ]
}
```

### Advanced Pattern Matching

Use regex patterns to match specific files:

```json
{
  "jobs": [
    {
      "name": "component-docs",
      "pattern": "components/.+\\.tsx?$",
      "outputFile": "docs/components",
      "excludePatterns": [
        "**/__tests__/**",
        "**/*.stories.tsx"
      ]
    }
  ]
}
```

## Best Practices

1. **Job Names**: Use descriptive names for jobs to easily identify their purpose
2. **Patterns**: Test regex patterns to ensure they match intended files
3. **Output Files**: Use descriptive paths that reflect the documentation content
4. **Exclusions**: Start with default exclusions and add project-specific patterns
5. **File Size**: Adjust `maxFileSize` based on your largest expected source files
6. **Depth**: Set `maxDepth` to avoid processing unnecessarily deep directories

## Troubleshooting

If documentation is not generating as expected:

1. Enable verbose logging:
   ```json
   {
     "verbose": true,
     "logLevel": "DEBUG"
   }
   ```

2. Check file patterns are matching:
   - Ensure regex patterns are properly escaped
   - Test patterns against your file structure
   - Check `excludePatterns` aren't too broad

3. Verify output location:
   - Ensure output directory exists
   - Check write permissions
   - Confirm no conflicts between jobs
