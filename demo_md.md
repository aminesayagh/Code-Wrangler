
# Code Documentation
Generated on: 2024-12-10T12:26:11.653Z
Total files: 11

## Project Structure

```
codewrangler
├── README.md
├── documentation
│   ├── CLI.md
│   ├── CONFIG.md
│   ├── CONFIGURATION_GUIDE.md
│   ├── CONTRIBUTING.md
│   ├── DETAILED_CLASS_DIAGRAMS_AND_COMPONENT_LIFECYCLE.md
│   ├── RENDERING_STRATEGY_GUIDE.md
│   └── TEMPLATE_SYSTEM_GUIDE.md
└── public
    └── templates
        ├── directory.md
        ├── file.md
        └── page.md
```


## File: README.md
- Path: `/root/git/codewrangler/README.md`
- Size: 8.81 KB
- Extension: .md
- Lines of code: 272
- Content:

```md
  1 | # CodeWrangler
  2 | 
  3 | CodeWrangler is an extensible documentation automation platform that transforms code repositories into structured knowledge bases. Built with a powerful plugin architecture, it enables seamless integration with AI services, documentation generators, and analysis tools.
  4 | 
  5 | ## Table of Contents
  6 | 
  7 | - [Overview](#overview)
  8 | - [Key Features](#key-features)
  9 | - [Demo](#demo)
 10 | - [Quick Start](#quick-start)
 11 | - [Template System](#template-system)
 12 | - [Command Line Interface](#command-line-interface)
 13 | - [Configuration](#configuration)
 14 | - [Plugin System](#plugin-system)
 15 | - [Advanced Usage](#advanced-usage)
 16 | - [Development](#development)
 17 | - [Contributing](#contributing)
 18 | 
 19 | ## Overview
 20 | 
 21 | CodeWrangler is an intelligent documentation assistant that automatically creates comprehensive knowledge bases from your code repositories. It's designed to bridge the gap between your codebase and AI language models like ChatGPT and Claude, making it easier to have meaningful conversations about your code.
 22 | 
 23 | ## Key Features
 24 | 
 25 | - 🌳 **Smart Repository Scanning**: Advanced file tree generation with intelligent filtering and customizable ignore patterns
 26 | - 🔌 **Plugin Architecture**: Extensible pipeline system supporting custom documentation workflows and integrations
 27 | - 🤖 **AI Integration Ready**: Built-in support for LLM-powered documentation enhancement and code analysis
 28 | - 📦 **Template Engine**: Flexible template system supporting multiple output formats and custom variables
 29 | - ⚡ **High Performance**: Parallel processing and caching capabilities for efficient handling of large repositories
 30 | - 🔄 **Incremental Updates**: Smart change detection for efficient documentation maintenance
 31 | 
 32 | ## Development Status and Demo
 33 | 
 34 | This library is currently in active development. The core functionality has been implemented, but there are still some features and improvements that are in progress. We welcome any feedback or contributions from the community as we work towards a stable release.
 35 | 
 36 | ![Demo](./demo.md)
 37 | 
 38 | ## Quick Start
 39 | 
 40 | ### Installation
 41 | 
 42 | Supports Node.js 18.x and above
 43 | 
 44 | ```bash
 45 | npm install -g codewrangler
 46 | ```
 47 | 
 48 | ### Basic Usage
 49 | 
 50 | ```bash
 51 | # Generate documentation for TypeScript files
 52 | cw "\.ts$" --output typescript-docs
 53 | 
 54 | # Watch mode with custom template
 55 | cw "\.js$" --template-dir ./my-templates --watch
 56 | 
 57 | # Generate documentation with AI analysis
 58 | cw "\.py$" --output python-docs --enable-ai-analysis
 59 | ```
 60 | 
 61 | ## Template System
 62 | 
 63 | CodeWrangler uses a powerful templating system that supports customization at multiple levels.
 64 | 
 65 | ### Directory Structure
 66 | 
 67 | ```
 68 | templates/
 69 | ├── page.md          # Overall documentation template
 70 | ├── directory.md     # Directory entry template
 71 | └── file.md         # File entry template
 72 | ```
 73 | 
 74 | ### Template Variables
 75 | 
 76 | #### Page Template
 77 | 
 78 | ```md
 79 | # Project Documentation: {{PROJECT_NAME}}
 80 | 
 81 | ## Overview
 82 | 
 83 | This documentation was automatically generated on {{GENERATION_DATE}}.
 84 | 
 85 | ## Directory Structure
 86 | 
 87 | \`\`\`
 88 | {{DIRECTORY_STRUCTURE}}
 89 | \`\`\`
 90 | 
 91 | ## File Contents
 92 | 
 93 | {{DIRECTORY_CONTENT}}
 94 | 
 95 | ## Summary
 96 | 
 97 | - Total Files: {{TOTAL_FILES}}
 98 | - Total Directories: {{TOTAL_DIRECTORIES}}
 99 | - Total Size: {{TOTAL_SIZE}}
100 | ```
101 | 
102 | #### File Template
103 | 
104 | ```md
105 | ### File: {{NAME}}
106 | 
107 | - **Path:** {{PATH}}
108 | - **Extension:** {{EXTENSION}}
109 | - **Size:** {{SIZE}} bytes
110 | - **Depth:** {{DEEP}}
111 | - **Lines:** {{LINES}}
112 | 
113 | ### Content:
114 | 
115 | \`\`\`{{EXTENSION}}
116 | {{CONTENT}}
117 | \`\`\`
118 | ```
119 | 
120 | #### Directory Template
121 | 
122 | ```md
123 | ### Directory: {{NAME}}
124 | 
125 | - **Path:** {{PATH}}
126 | - **Size:** {{SIZE}} bytes
127 | - **Files:** {{LENGTH}}
128 | - **Total Files (including subdirectories):** {{DEEP_LENGTH}}
129 | - **Depth:** {{DEEP}}
130 | 
131 | #### Contents:
132 | 
133 | {{CONTENT}}
134 | ```
135 | 
136 | ### Custom Templates
137 | 
138 | Create your own templates by placing them in a custom directory:
139 | 
140 | ```bash
141 | mkdir custom-templates
142 | echo "# {{PROJECT_NAME}}" > custom-templates/page.md
143 | cw "\.ts$" --template-dir ./custom-templates
144 | ```
145 | 
146 | ## Command Line Interface
147 | 
148 | ```bash
149 | Usage: cw [options] <pattern>
150 | 
151 | Arguments:
152 |   pattern                         File pattern to match (e.g., "\.ts$")
153 | 
154 | Options:
155 |   -V, --version                  Display version information
156 |   -d, --dir <dir>               Directory to search (default: current)
157 |   -o, --output <name>           Output file name (default: "output")
158 |   -t, --template-dir <dir>      Custom templates directory
159 |   -c, --config <path>           Config file path
160 |   --watch                       Watch for file changes
161 |   -h, --help                    Display help information
162 | ```
163 | 
164 | ## Configuration
165 | 
166 | ### Configuration File (codewrangler.json)
167 | 
168 | ```json
169 | {
170 |   "core": {
171 |     "dir": "./src",
172 |     "pattern": "\\.ts$",
173 |     "outputFile": "documentation"
174 |   },
175 |   "templates": {
176 |     "directory": "./templates",
177 |     "variables": {
178 |       "AUTHOR": "Your Name",
179 |       "VERSION": "1.0.0"
180 |     }
181 |   },
182 |   "plugins": {
183 |     "tree-visualizer": {
184 |       "enabled": true,
185 |       "format": "ascii"
186 |     },
187 |     "compress": {
188 |       "enabled": true
189 |     },
190 |     "ai-summary": {
191 |       "enabled": true,
192 |       "model": "gpt-4"
193 |     },
194 |     "relative-documentation": {
195 |       "enabled": true
196 |     }
197 |   }
198 | }
199 | ```
200 | 
201 | ## Plugin System
202 | 
203 | CodeWrangler supports plugins for extending functionality. Plugins can hook into various stages of the documentation process.
204 | 
205 | ### 1. Repository Tree Visualizer
206 | - Generates visual and textual representations of repository structure
207 | - Features:
208 |   - ASCII tree visualization
209 |   - Interactive HTML tree view
210 |   - Directory size analysis
211 |   - Custom ignore patterns
212 |   - Multiple export formats (ASCII, HTML, JSON)
213 | - Use Case: Quickly understand project structure and organization
214 | 
215 | ### 2. Smart Prompt Engine
216 | - Enhances AI interactions by providing contextual code references
217 | - Features:
218 |   - Links questions to specific code files and line numbers
219 |   - Maintains conversation history with code context
220 |   - Suggests relevant files for current discussion
221 |   - Tracks code changes during conversation
222 |   - Generates contextual prompts for better AI responses
223 | - Use Case: More efficient and context-aware AI assistance
224 | 
225 | ### 3. Documentation Crawler
226 | - Automatically aggregates and indexes library documentation
227 | - Features:
228 |   - Identifies project dependencies
229 |   - Scrapes official documentation sites
230 |   - Creates offline documentation cache
231 |   - Integrates with popular package managers (npm, pip, composer)
232 |   - Generates dependency graphs
233 | - Use Case: Centralized documentation access and dependency understanding
234 | 
235 | ### 4. Environment Analyzer
236 | - Analyzes and reports on development environment configuration
237 | - Features:
238 |   - Runtime environment detection
239 |   - Installed tools and versions
240 |   - System capabilities assessment
241 |   - Configuration compatibility checks
242 |   - Environment-specific recommendations
243 | - Use Case: Environment-aware assistance and troubleshooting
244 | 
245 | ### 5. Code Summarizer
246 | - Creates concise versions of code files by removing non-essential parts
247 | - Features:
248 |   - Smart comment preservation
249 |   - Redundant code detection
250 |   - Configuration file summarization
251 |   - Custom summarization rules
252 |   - Diff view support
253 | - Use Case: Focus on essential code components
254 | 
255 | ### Creating a Plugin (In development)
256 | 
257 | ```typescript
258 | import { Plugin, BaseNode } from "codewrangler";
259 | 
260 | export class CustomPlugin implements Plugin {
261 |   name = "custom-plugin";
262 | 
263 |   async beforeScan(options: ScanOptions): Promise<void> {
264 |     // Pre-scan setup
265 |   }
266 | 
267 |   async afterRender(content: string): Promise<string> {
268 |     // Post-render modifications
269 |     return modifiedContent;
270 |   }
271 | }
272 | ```
273 | 
274 | ### Using Plugins
275 | 
276 | ```typescript
277 | const pipeline = new DocumentationPipeline()
278 |   .use(new TypeScriptDocsPlugin())
279 |   .use(new AIAnalysisPlugin())
280 |   .use(new CustomPlugin());
281 | 
282 | await pipeline.process({
283 |   input: "./src",
284 |   pattern: ".ts$",
285 | });
286 | ```
287 | 
288 | ## Advanced Usage
289 | 
290 | ### AI Integration Example
291 | 
292 | ```typescript
293 | import { LangChain } from "langchain";
294 | 
295 | const pipeline = new DocumentationPipeline().use(
296 |   new LangChainPlugin({
297 |     prompt: `
298 |       Analyze this codebase and provide:
299 |       1. Architecture overview
300 |       2. Key components
301 |       3. Improvement suggestions
302 |     `,
303 |     model: "gpt-4",
304 |   })
305 | );
306 | ```
307 | 
308 | ### Custom Template Example
309 | 
310 | ```typescript
311 | const customTemplate = new Template({
312 |   content: `
313 |     # {{PROJECT_NAME}}
314 |     Author: {{AUTHOR}}
315 |     
316 |     ## Analysis
317 |     {{AI_ANALYSIS}}
318 |     
319 |     ## Components
320 |     {{COMPONENTS}}
321 |   `,
322 | });
323 | ```
324 | 
325 | ## Development
326 | 
327 | ### Prerequisites
328 | 
329 | - Node.js 18+
330 | - TypeScript 4.5+
331 | - npm or yarn
332 | 
333 | ### Setup
334 | 
335 | ```bash
336 | # Clone repository
337 | git clone https://github.com/aminesayagh/Code-Wrangler
338 | 
339 | # Install dependencies
340 | cd codewrangler
341 | npm install
342 | 
343 | # Build project
344 | npm run build
345 | 
346 | # Run tests
347 | npm test
348 | ```
349 | 
350 | ## Contributing
351 | 
352 | We welcome contributions! Please see our [Contributing Guide](./documentation/CONTRIBUTING.md) for details on:
353 | 
354 | ## License
355 | 
356 | Apache 2.0 License - See [LICENSE](LICENSE.md) for details.
357 | 
358 | Built with ❤️ by the CodeWrangler team
359 | 
360 | For more information, visit our [Documentation](documentation/CONTRIBUTING.md).
361 | For check out the [Demo](demo/demo.md)
362 | For communicate with the team, visit our [Discussions](https://github.com/aminesayagh/Code-Wrangler/discussions) or [Issues](https://github.com/aminesayagh/Code-Wrangler/issues)
363 | 
```

---------------------------------------------------------------------------


## File: CLI.md
- Path: `/root/git/codewrangler/documentation/CLI.md`
- Size: 4.27 KB
- Extension: .md
- Lines of code: 125
- Content:

```md
  1 | # CodeWrangler CLI Documentation
  2 | 
  3 | ## Overview
  4 | 
  5 | CodeWrangler is a powerful documentation generator that creates comprehensive documentation from your codebase using pattern matching. It supports multiple output formats and provides flexible configuration options.
  6 | 
  7 | ## Installation
  8 | 
  9 | ```bash
 10 | npm install -g codewrangler
 11 | ```
 12 | 
 13 | ## Basic Usage
 14 | 
 15 | Generate documentation for your codebase using:
 16 | 
 17 | ```bash
 18 | codewrangler document "<pattern>" [options]
 19 | ```
 20 | 
 21 | ### Quick Start Examples
 22 | 
 23 | ```bash
 24 | # Document all TypeScript files
 25 | codewrangler document "**/*.ts"
 26 | 
 27 | # Document specific directories with markdown output
 28 | codewrangler document "src/**/*.{ts,js}" -f markdown -o docs/documentation.md
 29 | 
 30 | # Generate both HTML and Markdown documentation
 31 | codewrangler document "lib/**/*.js" -f markdown html -o docs/output
 32 | ```
 33 | 
 34 | ## Command: `document`
 35 | 
 36 | The `document` command analyzes your codebase and generates documentation based on the specified pattern.
 37 | 
 38 | ### Pattern Syntax
 39 | 
 40 | The pattern uses glob syntax to match files:
 41 | - `**/*.ts` - all TypeScript files in any subdirectory
 42 | - `src/**/*.{js,ts}` - all JavaScript and TypeScript files in src directory
 43 | - `lib/*.js` - JavaScript files in the lib directory only
 44 | 
 45 | ### Options
 46 | 
 47 | | Option | Alias | Description | Default |
 48 | |--------|-------|-------------|---------|
 49 | | `--format <formats...>` | `-f` | Output formats (markdown, html) | `markdown` |
 50 | | `--dir <directory>` | `-d` | Root directory to start search | Current directory |
 51 | | `--output <file>` | `-o` | Output file or directory | `documentation.md` |
 52 | | `--exclude <patterns...>` | `-e` | Patterns to exclude | `[]` |
 53 | | `--ignore-hidden` | | Ignore hidden files and directories | `true` |
 54 | | `--additional-ignore <patterns...>` | `-a` | Additional patterns to ignore | `[]` |
 55 | | `--verbose` | `-v` | Enable verbose output | `false` |
 56 | 
 57 | ### Output Formats
 58 | 
 59 | CodeWrangler supports the following output formats:
 60 | 
 61 | 1. **Markdown** (`.md`)
 62 |    - Clean, readable documentation
 63 |    - Compatible with GitHub and other markdown viewers
 64 |    - Includes code syntax highlighting
 65 | 
 66 | 2. **HTML** (`.html`)
 67 |    - Interactive documentation
 68 |    - Syntax highlighted code blocks
 69 |    - Collapsible sections
 70 |    - Easy navigation
 71 | 
 72 | ## Configuration
 73 | 
 74 | ### Using a Configuration File
 75 | 
 76 | Create a `codewrangler.json` in your project root:
 77 | 
 78 | ```json
 79 | {
 80 |   "projectName": "My Project",
 81 |   "templatesDir": "templates",
 82 |   "logLevel": "INFO",
 83 |   "verbose": false,
 84 |   "jobs": [
 85 |     {
 86 |       "name": "typescript",
 87 |       "pattern": "**/*.ts",
 88 |       "outputFormat": ["markdown"],
 89 |       "excludePatterns": ["**/*.test.ts", "node_modules/**"],
 90 |       "ignoreHiddenFiles": true
 91 |     }
 92 |   ]
 93 | }
 94 | ```
 95 | 
 96 | ### Default Exclusions
 97 | 
 98 | The following patterns are excluded by default:
 99 | - `node_modules/**`
100 | - `**/dist/**`
101 | - `**/*.test.ts`
102 | - Hidden files (when `ignoreHidden` is true)
103 | 
104 | ## Examples
105 | 
106 | ### Basic Documentation
107 | 
108 | Generate markdown documentation for TypeScript files:
109 | 
110 | ```bash
111 | codewrangler document "**/*.ts" -o docs/typescript.md
112 | ```
113 | 
114 | ### Multiple Output Formats
115 | 
116 | Generate both HTML and Markdown documentation:
117 | 
118 | ```bash
119 | codewrangler document "src/**/*.{js,ts}" -f markdown html -o docs/output
120 | ```
121 | 
122 | ### Custom Exclusions
123 | 
124 | Exclude test files and specific directories:
125 | 
126 | ```bash
127 | codewrangler document "**/*.ts" \
128 |   -e "**/*.test.ts" "**/__tests__/**" \
129 |   -o docs/code.md
130 | ```
131 | 
132 | ### Verbose Output
133 | 
134 | Enable detailed logging for troubleshooting:
135 | 
136 | ```bash
137 | codewrangler document "src/**/*.ts" -v
138 | ```
139 | 
140 | ## Best Practices
141 | 
142 | 1. **Pattern Specificity**
143 |    - Use specific patterns to target relevant files
144 |    - Exclude test files and build artifacts
145 | 
146 | 2. **Output Organization**
147 |    - Use meaningful output file names
148 |    - Create separate documentation for different parts of your codebase
149 | 
150 | 3. **Performance**
151 |    - Exclude unnecessary directories
152 |    - Use specific patterns to reduce file scanning
153 | 
154 | ## Troubleshooting
155 | 
156 | Common issues and solutions:
157 | 
158 | 1. **No Files Found**
159 |    - Check if the pattern matches your files
160 |    - Use verbose mode to see which files are being processed
161 |    - Verify excluded patterns aren't too broad
162 | 
163 | 2. **Output Files Not Generated**
164 |    - Ensure output directory exists
165 |    - Check write permissions
166 |    - Verify output path is valid
167 | 
168 | 3. **Missing Content**
169 |    - Check file size limits
170 |    - Verify file permissions
171 |    - Enable verbose mode for detailed logging
172 | 
173 | ## Support
174 | 
175 | For issues and feature requests, please visit:
176 | https://github.com/aminesayagh/Code-Wrangler/issues
177 | 
```

---------------------------------------------------------------------------


## File: CONFIG.md
- Path: `/root/git/codewrangler/documentation/CONFIG.md`
- Size: 5.07 KB
- Extension: .md
- Lines of code: 151
- Content:

```md
  1 | # Configuration Guide
  2 | 
  3 | This guide explains how to configure CodeWrangler to suit your documentation needs. CodeWrangler supports multiple configuration methods and allows you to define multiple documentation jobs.
  4 | 
  5 | ## Configuration Methods
  6 | 
  7 | Configuration can be specified in three ways, listed in order of precedence (highest to lowest):
  8 | 
  9 | 1. Command Line Interface (CLI) arguments
 10 | 2. Configuration file (`codewrangler.json`)
 11 | 3. Default settings
 12 | 
 13 | ## Global Configuration
 14 | 
 15 | Global settings affect the overall behavior of CodeWrangler:
 16 | 
 17 | ```json
 18 | {
 19 |   "projectName": "MyProject",
 20 |   "templatesDir": "public/templates",
 21 |   "codeConfigFile": "codewrangler.json",
 22 |   "logLevel": "INFO",
 23 |   "verbose": false
 24 | }
 25 | ```
 26 | 
 27 | | Field | Type | Default | Description |
 28 | |-------|------|---------|-------------|
 29 | | `projectName` | string | "CodeWrangler" | Name of your project |
 30 | | `templatesDir` | string | "public/templates" | Directory containing documentation templates |
 31 | | `codeConfigFile` | string | "codewrangler.json" | Path to configuration file |
 32 | | `logLevel` | string | "INFO" | Log level (ERROR, WARN, INFO, DEBUG) |
 33 | | `verbose` | boolean | false | Enable verbose logging |
 34 | 
 35 | ## Jobs Configuration
 36 | 
 37 | Documentation tasks are defined as jobs. Each job specifies what files to process and how to process them:
 38 | 
 39 | ```json
 40 | {
 41 |   "jobs": [
 42 |     {
 43 |       "name": "typescript-docs",
 44 |       "pattern": "\\.ts$",
 45 |       "rootDir": "./src",
 46 |       "outputFile": "docs/typescript",
 47 |       "outputFormat": ["markdown"],
 48 |       "excludePatterns": ["**/*.test.ts"],
 49 |       "maxFileSize": 1048576,
 50 |       "maxDepth": 100,
 51 |       "ignoreHiddenFiles": true,
 52 |       "additionalIgnoreFiles": [],
 53 |       "followSymlinks": false
 54 |     }
 55 |   ]
 56 | }
 57 | ```
 58 | 
 59 | ### Job Fields
 60 | 
 61 | | Field | Type | Default | Description |
 62 | |-------|------|---------|-------------|
 63 | | `name` | string | Required | Unique identifier for the job |
 64 | | `pattern` | string | Required | Regex pattern for matching files |
 65 | | `rootDir` | string | Current directory | Root directory to start file scanning |
 66 | | `outputFile` | string | Required | Output file path (extension will be added based on format) |
 67 | | `outputFormat` | string[] | ["markdown"] | Output formats ("markdown" and/or "html") |
 68 | | `excludePatterns` | string[] | ["node_modules/**", "**/*.test.ts", "dist/**"] | Glob patterns for files to exclude |
 69 | | `maxFileSize` | number | 1048576 (1MB) | Maximum file size in bytes to process |
 70 | | `maxDepth` | number | 100 | Maximum directory depth to traverse |
 71 | | `ignoreHiddenFiles` | boolean | true | Whether to ignore hidden files (starting with .) |
 72 | | `additionalIgnoreFiles` | string[] | [] | Additional files/patterns to ignore |
 73 | | `followSymlinks` | boolean | false | Whether to follow symbolic links |
 74 | 
 75 | ## Usage Examples
 76 | 
 77 | ### Command Line
 78 | 
 79 | Create documentation for TypeScript files:
 80 | ```bash
 81 | codewrangler "\\.ts$" --dir ./src --output docs/typescript
 82 | ```
 83 | 
 84 | This will create a new job with the specified settings.
 85 | 
 86 | ### Configuration File
 87 | 
 88 | Create a `codewrangler.json` file in your project root:
 89 | 
 90 | ```json
 91 | {
 92 |   "projectName": "MyProject",
 93 |   "logLevel": "INFO",
 94 |   "jobs": [
 95 |     {
 96 |       "name": "typescript-docs",
 97 |       "pattern": "\\.ts$",
 98 |       "rootDir": "./src",
 99 |       "outputFile": "docs/typescript",
100 |       "excludePatterns": ["**/*.test.ts"]
101 |     },
102 |     {
103 |       "name": "test-docs",
104 |       "pattern": "\\.test.ts$",
105 |       "rootDir": "./tests",
106 |       "outputFile": "docs/tests",
107 |       "maxDepth": 3
108 |     }
109 |   ]
110 | }
111 | ```
112 | 
113 | This configuration:
114 | - Sets up two documentation jobs
115 | - First job documents TypeScript source files, excluding tests
116 | - Second job specifically documents test files
117 | - Uses default values for unspecified settings
118 | 
119 | ### Multiple Output Formats
120 | 
121 | Generate documentation in both Markdown and HTML:
122 | 
123 | ```json
124 | {
125 |   "jobs": [
126 |     {
127 |       "name": "full-docs",
128 |       "pattern": "\\.ts$",
129 |       "outputFile": "docs/typescript",
130 |       "outputFormat": ["markdown", "html"]
131 |     }
132 |   ]
133 | }
134 | ```
135 | 
136 | ### Advanced Pattern Matching
137 | 
138 | Use regex patterns to match specific files:
139 | 
140 | ```json
141 | {
142 |   "jobs": [
143 |     {
144 |       "name": "component-docs",
145 |       "pattern": "components/.+\\.tsx?$",
146 |       "outputFile": "docs/components",
147 |       "excludePatterns": [
148 |         "**/__tests__/**",
149 |         "**/*.stories.tsx"
150 |       ]
151 |     }
152 |   ]
153 | }
154 | ```
155 | 
156 | ## Best Practices
157 | 
158 | 1. **Job Names**: Use descriptive names for jobs to easily identify their purpose
159 | 2. **Patterns**: Test regex patterns to ensure they match intended files
160 | 3. **Output Files**: Use descriptive paths that reflect the documentation content
161 | 4. **Exclusions**: Start with default exclusions and add project-specific patterns
162 | 5. **File Size**: Adjust `maxFileSize` based on your largest expected source files
163 | 6. **Depth**: Set `maxDepth` to avoid processing unnecessarily deep directories
164 | 
165 | ## Troubleshooting
166 | 
167 | If documentation is not generating as expected:
168 | 
169 | 1. Enable verbose logging:
170 |    ```json
171 |    {
172 |      "verbose": true,
173 |      "logLevel": "DEBUG"
174 |    }
175 |    ```
176 | 
177 | 2. Check file patterns are matching:
178 |    - Ensure regex patterns are properly escaped
179 |    - Test patterns against your file structure
180 |    - Check `excludePatterns` aren't too broad
181 | 
182 | 3. Verify output location:
183 |    - Ensure output directory exists
184 |    - Check write permissions
185 |    - Confirm no conflicts between jobs
186 | 
```

---------------------------------------------------------------------------


## File: CONFIGURATION_GUIDE.md
- Path: `/root/git/codewrangler/documentation/CONFIGURATION_GUIDE.md`
- Size: 0.00 B
- Extension: .md
- Lines of code: 0
- Content:

```md
1 | 
```

---------------------------------------------------------------------------


## File: CONTRIBUTING.md
- Path: `/root/git/codewrangler/documentation/CONTRIBUTING.md`
- Size: 6.98 KB
- Extension: .md
- Lines of code: 177
- Content:

```md
  1 | # CodeWrangler Architecture Documentation
  2 | 
  3 | ## Table of Contents
  4 | 
  5 | - [Overview](#overview)
  6 | - [Architectural Principles](#architectural-principles)
  7 | - [Branching Strategy](#branching-strategy)
  8 | - [Core Components](#core-components)
  9 | - [Design Patterns](#design-patterns)
 10 | - [Data Flow](#data-flow)
 11 | - [Extension Points](#extension-points)
 12 | - [Configuration](#configuration)
 13 | - [Getting Started for Contributors](#getting-started-for-contributors)
 14 | - [Next Steps](#next-steps)
 15 | 
 16 | ## Overview
 17 | 
 18 | CodeWrangler is a TypeScript-based library designed to generate documentation from code repositories using regex patterns. It employs a modular architecture that separates concerns into distinct layers, making it both maintainable and extensible.
 19 | 
 20 | ## Architectural Principles
 21 | 
 22 | The library follows several key architectural principles:
 23 | 
 24 | - **Separation of Concerns**: Each major component has a specific responsibility and is isolated in its own module.
 25 | - **Open/Closed Principle**: The system is open for extension but closed for modification, particularly in the rendering strategies.
 26 | - **Dependency Injection**: Components receive their dependencies through constructor injection, promoting loose coupling.
 27 | - **Single Responsibility**: Each class has a single, well-defined purpose within the system.
 28 | 
 29 | ## Test Driven Development
 30 | 
 31 | Test Driven Development is a core principle in the development of CodeWrangler:
 32 | 
 33 | - The library is designed to be highly testable, with a focus on:
 34 |   - Unit testing
 35 |   - Integration testing
 36 | - Each class has its own dedicated test file that:
 37 |   - Contains the test cases for that class
 38 |   - Is located in the `__tests__` folder
 39 |   - Uses the same name as the class file with `.test.ts` extension
 40 | 
 41 | ## Branching Strategy
 42 | 
 43 | - The library uses a feature-based branching strategy.
 44 | - Each feature should have its own branch.
 45 | - The main branch is protected and requires a code review before merging.
 46 | 
 47 | - `feature/*`: Feature development branches
 48 | - `main`: Protected branch for stable releases
 49 | 
 50 | ## Core Components
 51 | 
 52 | ### Component Architecture Diagram
 53 | 
 54 | ```mermaid
 55 | graph TD
 56 |     CLI[CLI Layer] --> |Commands| Core[Core Layer]
 57 |     CLI --> |Configuration| Utils[Utils Layer]
 58 |     Core --> |File Operations| Infrastructure[Infrastructure Layer]
 59 |     Core --> |Rendering| Services[Services Layer]
 60 |     Infrastructure --> |Templates| Services
 61 |     Services --> |File System| Infrastructure
 62 |     Utils --> |Config & Logging| All[All Components]
 63 | ```
 64 | 
 65 | ### Layer Responsibility
 66 | 
 67 | ### 1. CLI Layer
 68 | 
 69 | **Purpose:** Provides the command-line interface for the library
 70 | 
 71 | **Key Components:**
 72 | 
 73 | - **CodeWrangler:** Main entry point and command orchestrator
 74 | - **ProgramBuilder:** Constructs the CLI program with all available commands
 75 | - **GenerateCommand:** Handles document generation requests
 76 | 
 77 | ### 2. Core Layer
 78 | 
 79 | **Purpose:** Contains the domain models and core business logic
 80 | 
 81 | **Key Components:**
 82 | 
 83 | - **NodeBase:** Abstract base class for file system nodes
 84 | - **NodeFile:** Represents file entities
 85 | - **NodeDirectory:** Represents directory entities
 86 | - **Error Handlers:** Specialized error types for different scenarios
 87 | 
 88 | ### 3. Infrastructure Layer
 89 | 
 90 | **Purpose:** Handles external system interactions and provides core services
 91 | 
 92 | **Key Components:**
 93 | 
 94 | - **DocumentFactory:** Manages file system operations
 95 | - **Template:** Handles template loading and rendering
 96 | - **Data validation schemas:** Using Zod for schema validation
 97 | 
 98 | ### 4. Services Layer
 99 | 
100 | **Purpose:** Implements business logic and processing algorithms
101 | 
102 | **Key Components:**
103 | 
104 | - **DocumentTreeBuilder:** Constructs the document tree representation
105 | - **NodeTreeBuilder:** Builds the node tree
106 | - **RenderStrategy:** Abstract rendering strategy
107 | - **Rendering Implementations:** Concrete implementations for different formats
108 | 
109 | ### 5. Utils Layer
110 | 
111 | **Purpose:** Provides cross-cutting concerns and utilities
112 | 
113 | **Key Components:**
114 | 
115 | - **Config:** Configuration management system
116 | - **Logger:** Logging service
117 | - **Common Utilities:** Helper functions and shared utilities
118 | 
119 | ## Design Patterns
120 | 
121 | The library implements several design patterns to solve common architectural challenges:
122 | 
123 | ### 1. Strategy Pattern
124 | 
125 | Used in the rendering system to allow different output formats:
126 | 
127 | ```typescript
128 | classDiagram
129 |     class RenderStrategy {
130 |         <<interface>>
131 |         +renderFile()
132 |         +renderDirectory()
133 |         +loadTemplates()
134 |     }
135 |     RenderStrategy <|-- MarkdownStrategy
136 |     RenderStrategy <|-- HTMLStrategy
137 | ```
138 | 
139 | ### 2. Factory Pattern
140 | 
141 | Implemented in DocumentFactory to handle file system operations:
142 | 
143 | ```typescript
144 | classDiagram
145 |     class DocumentFactory {
146 |         +static create()
147 |         +static readFile()
148 |         +static writeFile()
149 |         +static getStats()
150 |     }
151 | ```
152 | 
153 | ### 3. Singleton Pattern
154 | 
155 | Used in configuration and logging services:
156 | 
157 | ```typescript
158 | classDiagram
159 |     class Config {
160 |         -static instance: Config
161 |         +static load()
162 |         -constructor()
163 |     }
164 | ```
165 | 
166 | ## Data Flow
167 | 
168 | The typical data flow through the system follows these steps:
169 | 
170 | 1. Command Initialization
171 | 
172 |    - CLI parses command-line arguments
173 |    - Configuration is loaded and validated
174 | 
175 | 2. Tree Building
176 | 
177 |    - File system is scanned based on provided patterns
178 |    - Document tree is constructed from file system nodes
179 | 
180 | 3. Processing
181 | 
182 |    - Templates are loaded and validated
183 |    - Content is processed according to file types
184 | 
185 | 4. Rendering
186 |    - Appropriate rendering strategy is selected
187 |    - Output is generated in the requested format
188 | 
189 | ## Extension Points
190 | 
191 | The library provides several extension points for customization:
192 | 
193 | ### Rendering Strategies
194 | 
195 | - Create new strategies by implementing the RenderStrategy interface
196 | - Add support for new output formats
197 | 
198 | ### Template System
199 | 
200 | - Custom template definitions
201 | - New template types and schemas
202 | 
203 | ### Command System
204 | 
205 | - Additional CLI commands
206 | - New command options and flags
207 | 
208 | ## Configuration
209 | 
210 | The system is configured through multiple layers:
211 | 
212 | - Default Configuration: Built-in defaults for all settings
213 | - Config File: Local configuration file (codewrangler.json)
214 | - Command Line: Runtime arguments that override other settings
215 | 
216 | ## Getting Started for Contributors
217 | 
218 | ### Prerequisites
219 | 
220 | - Node.js and npm installed
221 | - TypeScript development environment
222 | - Basic understanding of file system operations
223 | 
224 | ### Setup
225 | 
226 | ```bash
227 | git clone https://github.com/aminesayagh/Code-Wrangler
228 | cd Code-Wrangler
229 | npm install
230 | ```
231 | 
232 | ### Development workflow
233 | 
234 | ```bash
235 | npm run build
236 | npm run test
237 | npm run lint
238 | ```
239 | 
240 | ### Best Practices
241 | 
242 | When contributing to the codebase:
243 | 
244 | - Follow the established architectural patterns
245 | - Maintain clear separation of concerns
246 | - Write unit tests for new functionality
247 | - Document public APIs and significant changes
248 | - Use dependency injection for new components
249 | - Handle errors appropriately at each layer
250 | 
251 | ## Next Steps
252 | 
253 | - [CLI Documentation](./documentation/CLI_DOCUMENTATION.md)
254 | - [Template System Guide](./documentation/TEMPLATE_SYSTEM_GUIDE.md)
255 | - [Detailed Class Diagrams and Component Lifecycle](./documentation/DETAILED_CLASS_DIAGRAMS_AND_COMPONENT_LIFECYCLE.md)
256 | - [Rendering Strategy Guide](./documentation/RENDERING_STRATEGY_GUIDE.md)
257 | - [Configuration Guide](./documentation/CONFIGURATION_GUIDE.md)
258 | 
```

---------------------------------------------------------------------------


## File: DETAILED_CLASS_DIAGRAMS_AND_COMPONENT_LIFECYCLE.md
- Path: `/root/git/codewrangler/documentation/DETAILED_CLASS_DIAGRAMS_AND_COMPONENT_LIFECYCLE.md`
- Size: 6.96 KB
- Extension: .md
- Lines of code: 225
- Content:

```md
  1 | # Detailed Class Diagrams and Component Lifecycle
  2 | 
  3 | ## Core Entity Relationships
  4 | 
  5 | ```mermaid
  6 | classDiagram
  7 |     %% Interfaces
  8 |     class FileStats {
  9 |         <<interface>>
 10 |         +size: number
 11 |         +created: Date
 12 |         +modified: Date
 13 |         +accessed: Date
 14 |         +isDirectory: boolean
 15 |         +isFile: boolean
 16 |         +permissions: FilePermissions
 17 |     }
 18 | 
 19 |     class FilePermissions {
 20 |         <<interface>>
 21 |         +readable: boolean
 22 |         +writable: boolean
 23 |         +executable: boolean
 24 |     }
 25 | 
 26 |     class PropsNode {
 27 |         <<interface>>
 28 |         +name: string
 29 |         +path: string
 30 |         +deep: number
 31 |         +size: number
 32 |         +stats: FileStats
 33 |         +extension?: string
 34 |     }
 35 | 
 36 |     class NodeLifeCycle {
 37 |         <<interface>>
 38 |         +validate(): boolean
 39 |         +bundle(deep: number): Promise<void>
 40 |         +render(): void
 41 |         +dispose(): Promise<void>
 42 |         +clone(): Promise<NodeBase>
 43 |     }
 44 | 
 45 |     class RenderStrategy {
 46 |         <<interface>>
 47 |         +renderFile(file: NodeFile): string
 48 |         +renderDirectory(directory: NodeDirectory): string
 49 |         +loadTemplates(): Promise~void~
 50 |         +render(rootDirectory: NodeDirectory): Promise~string~
 51 |         +dispose(): Promise~void~
 52 |     }
 53 | 
 54 |     %% Abstract Base Classes
 55 |     class NodeBase {
 56 |         <<abstract>>
 57 |         #_props: PropsNode
 58 |         +constructor(name: string, path: string)
 59 |         -initNode(name: string, path: string): void
 60 |         +validate(): boolean
 61 |         +bundle(deep: number)*: Promise~void~
 62 |         +render()*: void
 63 |         +dispose(): Promise~void~
 64 |         +clone(): Promise~NodeBase~
 65 |         __Properties__
 66 |         +deep: number
 67 |         +size: number
 68 |         +name: string
 69 |         +path: string
 70 |         +stats: FileStats
 71 |         +props: Record~string, unknown~
 72 |         +secondaryProps*: Record~string, unknown~
 73 |     }
 74 | 
 75 |     class NodeDirectory {
 76 |         <<abstract>>
 77 |         +children: (NodeFile|NodeDirectory)[]
 78 |         -_propsDirectory: PropsDirectory
 79 |         +constructor(name: string, pathName: string)
 80 |         -initDirectory(): void
 81 |         +addChild(child: NodeBase): Promise~NodeDirectory~
 82 |         +bundle(deep: number): Promise~void~
 83 |         +render()*: void
 84 |         __Properties__
 85 |         +length: number
 86 |         +deepLength: number
 87 |         +secondaryProps*: Record~string, unknown~
 88 |     }
 89 | 
 90 |     class NodeFile {
 91 |         <<abstract>>
 92 |         -_propsFile: PropsFile
 93 |         -_content: string
 94 |         +constructor(name: string, pathName: string)
 95 |         -initFile(name: string): void
 96 |         +bundle(deep: number): Promise~void~
 97 |         +render()*: void
 98 |         __Properties__
 99 |         +extension: string
100 |         +content: string
101 |         +secondaryProps*: Record~string, unknown~
102 |     }
103 | 
104 |     %% Concrete Classes
105 |     class RenderableDirectory {
106 |         -renderStrategy: RenderStrategy[]
107 |         +constructor(name: string, pathName: string, strategy: RenderStrategy[])
108 |         +render(): void
109 |     }
110 | 
111 |     class RenderableFile {
112 |         -renderStrategy: RenderStrategy[]
113 |         +constructor(name: string, pathName: string, strategy: RenderStrategy[])
114 |         +render(): void
115 |         +dispose(): Promise~void~
116 |     }
117 | 
118 |     %% Tree Builder
119 |     class NodeTreeBuilder {
120 |         -config: Config
121 |         -options: NodeTreeBuilderOptions
122 |         -fileHidden: FileHidden
123 |         +constructor(config: Config)
124 |         +build(): Promise~FileTreeNode~
125 |         -buildTree(nodePath: string, depth: number): Promise~FileTreeNode~
126 |     }
127 | 
128 |     class DocumentTreeBuilder {
129 |         -root: RenderableDirectory|RenderableFile
130 |         -builder: NodeTreeBuilder
131 |         +constructor(config: Config, renderStrategy: RenderStrategy[])
132 |         +build(): Promise~void~
133 |         -createDocumentStructure(node: FileTreeNode): Promise~RenderableDirectory|RenderableFile~
134 |     }
135 | 
136 |     %% Template Engine
137 |     class TemplateEngine {
138 |         -schema: Record~string, unknown~
139 |         +constructor()
140 |         +load(path: string): Promise~void~
141 |         +render(data: Record~string, unknown~): string
142 |         +getTemplateTokens(): string[]
143 |         +dispose(): Promise~void~
144 |     }
145 | 
146 |     %% Hidden Files Filter
147 |     class FileHidden {
148 |         -ignoreHiddenFiles: boolean
149 |         -patterns: string[]
150 |         -additionalIgnoreFiles: string[]
151 |         +constructor(config: Config)
152 |         +shouldExclude(fileName: string): boolean
153 |     }
154 | 
155 |     %% Render Strategy
156 |     class IRenderStrategy {
157 |         <<interface>>
158 |         +renderFile(file: NodeFile): string
159 |         +renderDirectory(directory: NodeDirectory): string
160 |         +loadTemplates(): Promise~void~
161 |         +render(rootDirectory: NodeDirectory): Promise~string~
162 |         +dispose(): Promise~void~
163 |     }
164 | 
165 |     class BaseRenderStrategy {
166 |         <<abstract>>
167 |         -config: Config
168 |         -extension: OutputFormatExtension
169 |         -templates: Record~TemplateType, Template~
170 |         +constructor(config: Config, extension: OutputFormatExtension)
171 |     }
172 | 
173 |     %% Relationships
174 |     NodeLifeCycle <|-- NodeBase: implements
175 |     NodeBase <|-- NodeFile: extends
176 |     NodeBase <|-- NodeDirectory: extends
177 |     NodeFile <|-- RenderableFile: extends
178 |     NodeDirectory <|-- RenderableDirectory: extends
179 |     NodeBase .. PropsNode: implements
180 |     PropsNode .. FileStats: implements
181 |     FileStats .. FilePermissions: implements
182 |     NodeTreeBuilder o-- FileHidden: uses
183 |     DocumentTreeBuilder o-- NodeTreeBuilder: uses
184 |     RenderableFile o-- BaseRenderStrategy: extends
185 |     RenderStrategy <|-- BaseRenderStrategy: implements
186 |     IRenderStrategy <|-- RenderStrategy: implements
187 |     RenderableDirectory o-- BaseRenderStrategy: extends
188 |     BaseRenderStrategy <|-- RenderStrategy: implements
189 |     NodeDirectory o-- NodeFile: contains
190 |     NodeDirectory o-- NodeDirectory: contains
191 | ```
192 | 
193 | ## State Transitions and Lifecycle
194 | 
195 | ```mermaid
196 | stateDiagram-v2
197 |     [*] --> Initialized: Constructor
198 |     Initialized --> Validated: validate()
199 |     Validated --> Bundled: bundle()
200 |     Bundled --> Rendered: render()
201 |     Rendered --> Disposed: dispose()
202 |     Rendered --> Bundled: reprocess
203 |     Disposed --> [*]
204 | 
205 |     note right of Initialized
206 |         - Properties initialized
207 |         - Path validated
208 |         - Stats collected
209 |     end note
210 | 
211 |     note right of Bundled
212 |         - Content loaded
213 |         - Size calculated
214 |         - Dependencies resolved
215 |     end note
216 | 
217 |     note right of Rendered
218 |         - Content processed
219 |         - Templates applied
220 |         - Output generated
221 |     end note
222 | ```
223 | 
224 | ## Component Interactions Flow
225 | 
226 | ```mermaid
227 | sequenceDiagram
228 |     participant CLI
229 |     participant Builder
230 |     participant NodeFile
231 |     participant Template
232 |     participant Strategy
233 |     participant DocumentFactory
234 | 
235 |     CLI->>Builder: build()
236 |     Builder->>NodeFile: create()
237 |     NodeFile->>DocumentFactory: validate()
238 |     DocumentFactory-->>NodeFile: stats
239 |     Builder->>NodeFile: bundle()
240 |     NodeFile->>DocumentFactory: readFile()
241 |     DocumentFactory-->>NodeFile: content
242 |     Builder->>Strategy: loadTemplates()
243 |     Strategy->>Template: load()
244 |     Template-->>Strategy: template
245 |     Builder->>NodeFile: render()
246 |     NodeFile->>Strategy: renderFile()
247 |     Strategy->>Template: render()
248 |     Template-->>Strategy: output
249 |     Strategy-->>NodeFile: rendered
250 |     NodeFile-->>Builder: complete
251 | ```
252 | 
```

---------------------------------------------------------------------------


## File: RENDERING_STRATEGY_GUIDE.md
- Path: `/root/git/codewrangler/documentation/RENDERING_STRATEGY_GUIDE.md`
- Size: 0.00 B
- Extension: .md
- Lines of code: 0
- Content:

```md
1 | 
```

---------------------------------------------------------------------------


## File: TEMPLATE_SYSTEM_GUIDE.md
- Path: `/root/git/codewrangler/documentation/TEMPLATE_SYSTEM_GUIDE.md`
- Size: 0.00 B
- Extension: .md
- Lines of code: 0
- Content:

```md
1 | 
```

---------------------------------------------------------------------------


## File: directory.md
- Path: `/root/git/codewrangler/public/templates/directory.md`
- Size: 284.00 B
- Extension: .md
- Lines of code: 8
- Content:

```md
 1 | ### Directory: {{DIRECTORY_NAME}}
 2 | 
 3 | - **Path:** {{DIRECTORY_PATH}}
 4 | - **Size:** {{DIRECTORY_SIZE}} bytes
 5 | - **Files:** {{DIRECTORY_LENGTH}}
 6 | - **Total Files (including subdirectories):** {{DIRECTORY_NUMBER_OF_FILES}}
 7 | - **Depth:** {{DIRECTORY_DEPTH}}
 8 | 
 9 | #### Contents:
10 | 
11 | {{DIRECTORY_CONTENT}}
```

---------------------------------------------------------------------------


## File: file.md
- Path: `/root/git/codewrangler/public/templates/file.md`
- Size: 221.00 B
- Extension: .md
- Lines of code: 9
- Content:

```md
 1 | #### File: {{FILE_NAME}}
 2 | 
 3 | - **Path:** {{FILE_PATH}}
 4 | - **Extension:** {{FILE_EXTENSION}}
 5 | - **Size:** {{FILE_SIZE}} bytes
 6 | - **Depth:** {{FILE_DEPTH}}
 7 | - **Lines:** {{FILE_LINES}}
 8 | 
 9 | ```{{FILE_EXTENSION}}
10 | {{FILE_CONTENTS}}
11 | ```
12 | 
```

---------------------------------------------------------------------------


## File: page.md
- Path: `/root/git/codewrangler/public/templates/page.md`
- Size: 277.00 B
- Extension: .md
- Lines of code: 9
- Content:

```md
 1 | # Project Documentation: {{PROJECT_NAME}}
 2 | 
 3 | ## Overview
 4 | 
 5 | This documentation was automatically generated on {{GENERATION_DATE}}.
 6 | 
 7 | ## Summary
 8 | 
 9 | - Total Files: {{TOTAL_FILES}}
10 | - Total Directories: {{TOTAL_DIRECTORIES}}
11 | - Total Size: {{TOTAL_SIZE}}
12 | 
13 | ## Content of Files
14 | 
15 | {{CONTENT}}
16 | 
```

---------------------------------------------------------------------------

