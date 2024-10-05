# CodeWrangler

CodeWrangler is a powerful command-line tool designed to generate a comprehensive documentation report from a project directory. It's specifically tailored for developers who need to prepare project overviews for Large Language Models (LLMs) to assist with code generation and analysis tasks.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Options](#options)
- [Configuration](#configuration)
- [Advanced Features](#advanced-features)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Flexible File Matching**: Use regex patterns to find specific files.
- **Configurable**: Easily customize behavior through command-line options or a configuration file.
- **Ignore Patterns**: Exclude files and directories using `.gitignore`-style patterns.
- **Hidden File Handling**: Option to include or exclude hidden files.
- **Max File Size Limit**: Automatically skip files that exceed a specified size.
- **Detailed Logging**: Configurable log levels for debugging and information.
- **Markdown Output**: Output is saved to a markdown file by default for easy viewing and sharing with LLMs.

## Installation

To install CodeWrangler, run the following command in your terminal:

```bash
curl -o- https://raw.githubusercontent.com/aminesayagh/codewrangler/main/install.sh | bash
```

This script will download and install CodeWrangler on your system.

## Getting Started

After installation, you can quickly generate a documentation report for your project:

1. Navigate to your project directory:
   ```bash
   cd /path/to/your/project
   ```

2. Run CodeWrangler with default settings:
   ```bash
   codewrangler ".*"
   ```

This will generate an `output.md` file containing a report of all files in your project.

## Usage

Basic usage:

```bash
codewrangler "<pattern>" [options]
```

### Examples

1. Generate a report for all TypeScript files:
   ```bash
   codewrangler "\.ts$" -d ./src -o typescript_report
   ```

2. Generate a report for both JavaScript and TypeScript files, excluding tests:
   ```bash
   codewrangler "\.(js|ts)$" --exclude-patterns "**/*.test.js,**/*.test.ts" -o js_ts_report
   ```

3. Generate a report with verbose logging:
   ```bash
   codewrangler "\.py$" -v -o python_report
   ```

## Options

- `-d, --dir <dir>`: Directory to search (default: current directory)
- `-o, --output <output>`: Output file name (default: "output")
- `-c, --config <config>`: Path to a custom configuration file
- `-v, --verbose`: Enable verbose logging

## Configuration

CodeWrangler can be configured via a JSON file. By default, it looks for `codewrangler.json` in the current directory. You can specify a different config file using the `-c` option.

Example `codewrangler.json`:

```json
{
  "dir": "./src",
  "pattern": "\\.(ts|js)$",
  "outputFile": "code_compilation",
  "logLevel": "INFO",
  "maxFileSize": 1048576,
  "excludePatterns": ["node_modules/**", "**/*.test.ts"],
  "ignoreHiddenFiles": true
}
```

### Configuration Options

| Option | Description |
|--------|-------------|
| `dir` | Root directory to search |
| `pattern` | Regex pattern for matching files |
| `outputFile` | Name of the output file (without extension) |
| `logLevel` | Logging level ("ERROR", "WARN", "INFO", "DEBUG") |
| `outputFormat` | Output format (currently only "markdown" is supported) |
| `maxFileSize` | Maximum file size in bytes to process |
| `excludePatterns` | Array of glob patterns to exclude |
| `ignoreHiddenFiles` | Whether to ignore hidden files and directories |
| `additionalIgnoreFiles` | Array of additional ignore files to use (e.g., [".gitignore"]) |

## Advanced Features

### Ignore Patterns

CodeWrangler respects `.gitignore`-style patterns specified in the `excludePatterns` configuration option. You can also specify additional ignore files using the `additionalIgnoreFiles` option.

### Hidden Files

By default, CodeWrangler ignores hidden files and directories. You can change this behavior by setting `ignoreHiddenFiles` to `false` in your configuration.

### File Size Limit

Files larger than `maxFileSize` (in bytes) will be skipped. This is useful for avoiding processing of large binary files or data files.

## Next Steps

- [ ] Add support for more output formats (e.g., HTML, JSON)
- [ ] Include more testing, and improve the code coverage.
- [x] Add support for more ignore files (e.g., `.dockerignore`, `.npmignore`)
- [ ] Use LLMs Models to analyze the project and generate a role prompt for the LLM to use for code generation.
- [ ] Inprove the configuration UX, To generate a config tasks from the user, executed by the command line.
- [ ] Add a resume to the workspace env technology and save it on the workspace local configuration.
- [ ] Add a feature that generate the documentation of the project but with a comparision with the previous documentation, and highlight the changes.
- [ ] Claude 3.5 Sonnet API integration with specific project to send the generated documentation as a knowledge base for the project.

## Troubleshooting

### Common Issues

1. **CodeWrangler not found after installation**
   - Ensure that the installation directory is in your system's PATH.
   - Try restarting your terminal session.

2. **No files found matching pattern**
   - Check if your pattern is correct and matches the files you expect.
   - Ensure you're in the correct directory or specify the correct directory with `-d`.

3. **Output file is empty**
   - Verify that the files matching your pattern are not excluded by `excludePatterns` or `ignoreHiddenFiles`.
   - Check if all matching files exceed the `maxFileSize` limit.

For more issues, please check our [GitHub Issues](https://github.com/aminesayagh/codewrangler/issues) page or open a new issue.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.