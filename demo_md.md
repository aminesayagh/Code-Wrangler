
# Code Documentation
Generated on: 2024-12-06T15:07:49.024Z
Total files: 12

## Project Structure

```
codewrangler
├── LICENCE.md
├── README.md
├── documentation
│   ├── CLI_DOCUMENTATION.md
│   ├── CONFIGURATION_GUIDE.md
│   ├── CONTRIBUTING.md
│   ├── DETAILED_CLASS_DIAGRAMS_AND_COMPONENT_LIFECYCLE.md
│   ├── RENDERING_STRATEGY_GUIDE.md
│   └── TEMPLATE_SYSTEM_GUIDE.md
├── public
│   └── templates
│       ├── directory.md
│       ├── file.md
│       └── page.md
└── typescript_files.md
```


## File: LICENCE.md
- Path: `/root/git/codewrangler/LICENCE.md`
- Size: 10.69 KB
- Extension: .md
- Lines of code: 169
- Content:

```md
  1 |                                  Apache License
  2 |                            Version 2.0, January 2004
  3 |                         http://www.apache.org/licenses/
  4 | 
  5 | TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION
  6 | 
  7 | 1.  Definitions.
  8 | 
  9 |     "License" shall mean the terms and conditions for use, reproduction,
 10 |     and distribution as defined by Sections 1 through 9 of this document.
 11 | 
 12 |     "Licensor" shall mean the copyright owner or entity authorized by
 13 |     the copyright owner that is granting the License.
 14 | 
 15 |     "Legal Entity" shall mean the union of the acting entity and all
 16 |     other entities that control, are controlled by, or are under common
 17 |     control with that entity. For the purposes of this definition,
 18 |     "control" means (i) the power, direct or indirect, to cause the
 19 |     direction or management of such entity, whether by contract or
 20 |     otherwise, or (ii) ownership of fifty percent (50%) or more of the
 21 |     outstanding shares, or (iii) beneficial ownership of such entity.
 22 | 
 23 |     "You" (or "Your") shall mean an individual or Legal Entity
 24 |     exercising permissions granted by this License.
 25 | 
 26 |     "Source" form shall mean the preferred form for making modifications,
 27 |     including but not limited to software source code, documentation
 28 |     source, and configuration files.
 29 | 
 30 |     "Object" form shall mean any form resulting from mechanical
 31 |     transformation or translation of a Source form, including but
 32 |     not limited to compiled object code, generated documentation,
 33 |     and conversions to other media types.
 34 | 
 35 |     "Work" shall mean the work of authorship, whether in Source or
 36 |     Object form, made available under the License, as indicated by a
 37 |     copyright notice that is included in or attached to the work
 38 |     (an example is provided in the Appendix below).
 39 | 
 40 |     "Derivative Works" shall mean any work, whether in Source or Object
 41 |     form, that is based on (or derived from) the Work and for which the
 42 |     editorial revisions, annotations, elaborations, or other modifications
 43 |     represent, as a whole, an original work of authorship. For the purposes
 44 |     of this License, Derivative Works shall not include works that remain
 45 |     separable from, or merely link (or bind by name) to the interfaces of,
 46 |     the Work and Derivative Works thereof.
 47 | 
 48 |     "Contribution" shall mean any work of authorship, including
 49 |     the original version of the Work and any modifications or additions
 50 |     to that Work or Derivative Works thereof, that is intentionally
 51 |     submitted to Licensor for inclusion in the Work by the copyright owner
 52 |     or by an individual or Legal Entity authorized to submit on behalf of
 53 |     the copyright owner. For the purposes of this definition, "submitted"
 54 |     means any form of electronic, verbal, or written communication sent
 55 |     to the Licensor or its representatives, including but not limited to
 56 |     communication on electronic mailing lists, source code control systems,
 57 |     and issue tracking systems that are managed by, or on behalf of, the
 58 |     Licensor for the purpose of discussing and improving the Work, but
 59 |     excluding communication that is conspicuously marked or otherwise
 60 |     designated in writing by the copyright owner as "Not a Contribution."
 61 | 
 62 |     "Contributor" shall mean Licensor and any individual or Legal Entity
 63 |     on behalf of whom a Contribution has been received by Licensor and
 64 |     subsequently incorporated within the Work.
 65 | 
 66 | 2.  Grant of Copyright License. Subject to the terms and conditions of
 67 |     this License, each Contributor hereby grants to You a perpetual,
 68 |     worldwide, non-exclusive, no-charge, royalty-free, irrevocable
 69 |     copyright license to reproduce, prepare Derivative Works of,
 70 |     publicly display, publicly perform, sublicense, and distribute the
 71 |     Work and such Derivative Works in Source or Object form.
 72 | 
 73 | 3.  Grant of Patent License. Subject to the terms and conditions of
 74 |     this License, each Contributor hereby grants to You a perpetual,
 75 |     worldwide, non-exclusive, no-charge, royalty-free, irrevocable
 76 |     (except as stated in this section) patent license to make, have made,
 77 |     use, offer to sell, sell, import, and otherwise transfer the Work,
 78 |     where such license applies only to those patent claims licensable
 79 |     by such Contributor that are necessarily infringed by their
 80 |     Contribution(s) alone or by combination of their Contribution(s)
 81 |     with the Work to which such Contribution(s) was submitted. If You
 82 |     institute patent litigation against any entity (including a
 83 |     cross-claim or counterclaim in a lawsuit) alleging that the Work
 84 |     or a Contribution incorporated within the Work constitutes direct
 85 |     or contributory patent infringement, then any patent licenses
 86 |     granted to You under this License for that Work shall terminate
 87 |     as of the date such litigation is filed.
 88 | 
 89 | 4.  Redistribution. You may reproduce and distribute copies of the
 90 |     Work or Derivative Works thereof in any medium, with or without
 91 |     modifications, and in Source or Object form, provided that You
 92 |     meet the following conditions:
 93 | 
 94 |     (a) You must give any other recipients of the Work or
 95 |     Derivative Works a copy of this License; and
 96 | 
 97 |     (b) You must cause any modified files to carry prominent notices
 98 |     stating that You changed the files; and
 99 | 
100 |     (c) You must retain, in the Source form of any Derivative Works
101 |     that You distribute, all copyright, patent, trademark, and
102 |     attribution notices from the Source form of the Work,
103 |     excluding those notices that do not pertain to any part of
104 |     the Derivative Works; and
105 | 
106 |     (d) If the Work includes a "NOTICE" text file as part of its
107 |     distribution, then any Derivative Works that You distribute must
108 |     include a readable copy of the attribution notices contained
109 |     within such NOTICE file, excluding those notices that do not
110 |     pertain to any part of the Derivative Works, in at least one
111 |     of the following places: within a NOTICE text file distributed
112 |     as part of the Derivative Works; within the Source form or
113 |     documentation, if provided along with the Derivative Works; or,
114 |     within a display generated by the Derivative Works, if and
115 |     wherever such third-party notices normally appear. The contents
116 |     of the NOTICE file are for informational purposes only and
117 |     do not modify the License. You may add Your own attribution
118 |     notices within Derivative Works that You distribute, alongside
119 |     or as an addendum to the NOTICE text from the Work, provided
120 |     that such additional attribution notices cannot be construed
121 |     as modifying the License.
122 | 
123 |     You may add Your own copyright statement to Your modifications and
124 |     may provide additional or different license terms and conditions
125 |     for use, reproduction, or distribution of Your modifications, or
126 |     for any such Derivative Works as a whole, provided Your use,
127 |     reproduction, and distribution of the Work otherwise complies with
128 |     the conditions stated in this License.
129 | 
130 | 5.  Submission of Contributions. Unless You explicitly state otherwise,
131 |     any Contribution intentionally submitted for inclusion in the Work
132 |     by You to the Licensor shall be under the terms and conditions of
133 |     this License, without any additional terms or conditions.
134 |     Notwithstanding the above, nothing herein shall supersede or modify
135 |     the terms of any separate license agreement you may have executed
136 |     with Licensor regarding such Contributions.
137 | 
138 | 6.  Trademarks. This License does not grant permission to use the trade
139 |     names, trademarks, service marks, or product names of the Licensor,
140 |     except as required for reasonable and customary use in describing the
141 |     origin of the Work and reproducing the content of the NOTICE file.
142 | 
143 | 7.  Disclaimer of Warranty. Unless required by applicable law or
144 |     agreed to in writing, Licensor provides the Work (and each
145 |     Contributor provides its Contributions) on an "AS IS" BASIS,
146 |     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
147 |     implied, including, without limitation, any warranties or conditions
148 |     of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
149 |     PARTICULAR PURPOSE. You are solely responsible for determining the
150 |     appropriateness of using or redistributing the Work and assume any
151 |     risks associated with Your exercise of permissions under this License.
152 | 
153 | 8.  Limitation of Liability. In no event and under no legal theory,
154 |     whether in tort (including negligence), contract, or otherwise,
155 |     unless required by applicable law (such as deliberate and grossly
156 |     negligent acts) or agreed to in writing, shall any Contributor be
157 |     liable to You for damages, including any direct, indirect, special,
158 |     incidental, or consequential damages of any character arising as a
159 |     result of this License or out of the use or inability to use the
160 |     Work (including but not limited to damages for loss of goodwill,
161 |     work stoppage, computer failure or malfunction, or any and all
162 |     other commercial damages or losses), even if such Contributor
163 |     has been advised of the possibility of such damages.
164 | 
165 | 9.  Accepting Warranty or Additional Liability. While redistributing
166 |     the Work or Derivative Works thereof, You may choose to offer,
167 |     and charge a fee for, acceptance of support, warranty, indemnity,
168 |     or other liability obligations and/or rights consistent with this
169 |     License. However, in accepting such obligations, You may act only
170 |     on Your own behalf and on Your sole responsibility, not on behalf
171 |     of any other Contributor, and only if You agree to indemnify,
172 |     defend, and hold each Contributor harmless for any liability
173 |     incurred by, or claims asserted against, such Contributor by reason
174 |     of your accepting any such warranty or additional liability.
175 | 
176 | END OF TERMS AND CONDITIONS
177 | 
178 | APPENDIX: How to apply the Apache License to your work.
179 | 
180 |       To apply the Apache License to your work, attach the following
181 |       boilerplate notice, with the fields enclosed by brackets "[]"
182 |       replaced with your own identifying information. (Don't include
183 |       the brackets!)  The text should be enclosed in the appropriate
184 |       comment syntax for the file format. We also recommend that a
185 |       file or class name and description of purpose be included on the
186 |       same "printed page" as the copyright notice for easier
187 |       identification within third-party archives.
188 | 
189 | Copyright [yyyy] [name of copyright owner]
190 | 
191 | Licensed under the Apache License, Version 2.0 (the "License");
192 | you may not use this file except in compliance with the License.
193 | You may obtain a copy of the License at
194 | 
195 |        http://www.apache.org/licenses/LICENSE-2.0
196 | 
197 | Unless required by applicable law or agreed to in writing, software
198 | distributed under the License is distributed on an "AS IS" BASIS,
199 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
200 | See the License for the specific language governing permissions and
201 | limitations under the License.
202 | 
```

---------------------------------------------------------------------------


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


## File: CLI_DOCUMENTATION.md
- Path: `/root/git/codewrangler/documentation/CLI_DOCUMENTATION.md`
- Size: 0.00 B
- Extension: .md
- Lines of code: 0
- Content:

```md
1 | 
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


## File: typescript_files.md
- Path: `/root/git/codewrangler/typescript_files.md`
- Size: 86.83 KB
- Extension: .md
- Lines of code: 2928
- Content:

```md
   1 | # Project Documentation: src
   2 | 
   3 | ## Overview
   4 | 
   5 | This documentation was automatically generated on 2024-12-06T15:05:56.340Z.
   6 | 
   7 | ## Summary
   8 | 
   9 | - Total Files: 0
  10 | - Total Directories: 73
  11 | - Total Size: 74575
  12 | 
  13 | ## Content of Files
  14 | 
  15 | ### Directory: src
  16 | 
  17 | - **Path:** /root/git/codewrangler/src
  18 | - **Size:** 74575 bytes
  19 | - **Files:** 0
  20 | - **Total Files (including subdirectories):** 42
  21 | - **Depth:** 0
  22 | 
  23 | #### Contents:
  24 | 
  25 | ### Directory: cli
  26 | 
  27 | - **Path:** /root/git/codewrangler/src/cli
  28 | - **Size:** 16160 bytes
  29 | - **Files:** 2
  30 | - **Total Files (including subdirectories):** 8
  31 | - **Depth:** 1
  32 | 
  33 | #### Contents:
  34 | 
  35 | #### File: CodeWrangler.ts
  36 | 
  37 | - **Path:** /root/git/codewrangler/src/cli/CodeWrangler.ts
  38 | - **Extension:** ts
  39 | - **Size:** 1174 bytes
  40 | - **Depth:** 2
  41 | - **Lines:** 37
  42 | 
  43 | ```ts
  44 | import { Command } from "commander";
  45 | 
  46 | import { MainCLICommand } from "./program/mainCLI/MainCLICommand";
  47 | import { ProgramBuilder } from "./program/mainCLI/ProgramBuilder";
  48 | import { Config } from "../utils/config/Config";
  49 | import { IMainCLICommandOptions } from "./program/mainCLI/type";
  50 | 
  51 | export class CodeWrangler {
  52 |   private static instance: CodeWrangler | undefined;
  53 |   private readonly VERSION = "1.0.0";
  54 |   private program: Command;
  55 | 
  56 |   private constructor(private config: Config) {
  57 |     this.program = new ProgramBuilder(config, this.VERSION).build();
  58 |     this.setupCommands();
  59 |   }
  60 | 
  61 |   public static async run(): Promise<boolean> {
  62 |     if (!CodeWrangler.instance) {
  63 |       const config = await Config.load();
  64 |       CodeWrangler.instance = new CodeWrangler(config);
  65 |       await CodeWrangler.instance.program.parseAsync(process.argv);
  66 |       return true;
  67 |     }
  68 |     throw new Error("CodeWrangler already initialized");
  69 |   }
  70 | 
  71 |   private setupCommands(): void {
  72 |     this.program.action(
  73 |       async (pattern: string, options: IMainCLICommandOptions) => {
  74 |         const command = new MainCLICommand(this.config);
  75 |         await command.execute([pattern], options);
  76 |       }
  77 |     );
  78 |   }
  79 | }
  80 | 
  81 | ```
  82 | ### Directory: commands
  83 | 
  84 | - **Path:** /root/git/codewrangler/src/cli/commands
  85 | - **Size:** 9714 bytes
  86 | - **Files:** 3
  87 | - **Total Files (including subdirectories):** 3
  88 | - **Depth:** 2
  89 | 
  90 | #### Contents:
  91 | 
  92 | #### File: Command.ts
  93 | 
  94 | - **Path:** /root/git/codewrangler/src/cli/commands/Command.ts
  95 | - **Extension:** ts
  96 | - **Size:** 1492 bytes
  97 | - **Depth:** 3
  98 | - **Lines:** 51
  99 | 
 100 | ```ts
 101 | /* eslint-disable require-await */
 102 | import { ICommandOptions } from "./types";
 103 | import { Config } from "../../utils/config/Config";
 104 | import { ProgressBar } from "../../utils/helpers/ProgressBar";
 105 | import { logger } from "../../utils/logger/Logger";
 106 | 
 107 | export abstract class BaseCommand<T extends ICommandOptions> {
 108 |   public constructor(protected config: Config) {}
 109 | 
 110 |   public async execute(args: string[], options: T): Promise<void> {
 111 |     try {
 112 |       // Pre-execution phase
 113 |       await this.beforeExecution(args, options);
 114 | 
 115 |       // Progress tracking
 116 |       const progressBar = new ProgressBar(100);
 117 |       await progressBar.execute(async () => {
 118 |         await this.processExecution();
 119 |       });
 120 | 
 121 |       // Post-execution phase
 122 |       await this.afterExecution();
 123 |     } catch (error) {
 124 |       await this.handleError(error);
 125 |       throw error;
 126 |     }
 127 |   }
 128 | 
 129 |   // Template methods that can be overridden
 130 |   protected async beforeExecution(_: string[], options: T): Promise<void> {
 131 |     if (options.verbose) {
 132 |       this.logVerbose();
 133 |     }
 134 |   }
 135 | 
 136 |   protected abstract processExecution(): Promise<void>;
 137 | 
 138 |   protected async afterExecution(): Promise<void> {
 139 |     // Default implementation - override if needed
 140 |   }
 141 | 
 142 |   protected async handleError(error: unknown): Promise<void> {
 143 |     logger.error("Command execution failed:", error as Error);
 144 |   }
 145 | 
 146 |   protected logVerbose(): void {
 147 |     // Default verbose logging - override to add command-specific logs
 148 |     logger.debug("Executing command with verbose logging");
 149 |   }
 150 | }
 151 | 
 152 | ```
 153 | #### File: DemoCommand.ts
 154 | 
 155 | - **Path:** /root/git/codewrangler/src/cli/commands/DemoCommand.ts
 156 | - **Extension:** ts
 157 | - **Size:** 8062 bytes
 158 | - **Depth:** 3
 159 | - **Lines:** 343
 160 | 
 161 | ```ts
 162 | /* eslint-disable max-lines-per-function */
 163 | import { Stats } from "fs";
 164 | import * as fs from "fs/promises";
 165 | import * as path from "path";
 166 | 
 167 | interface IFileInfo {
 168 |   name: string;
 169 |   path: string;
 170 |   content: string;
 171 |   ext: string;
 172 |   size: number;
 173 |   lines: number;
 174 | }
 175 | 
 176 | interface ITreeNode {
 177 |   name: string;
 178 |   path: string;
 179 |   type: "file" | "directory";
 180 |   children: ITreeNode[];
 181 | }
 182 | 
 183 | interface IDocumentConfig {
 184 |   pattern: RegExp;
 185 |   rootDir: string;
 186 |   outputPath: string;
 187 |   excludePatterns: string[];
 188 |   maxFileSize: number;
 189 |   ignoreHidden: boolean;
 190 |   compress: boolean;
 191 | }
 192 | 
 193 | const DEFAULT_CONFIG: IDocumentConfig = {
 194 |   pattern: /.*/,
 195 |   rootDir: process.cwd(),
 196 |   outputPath: "documentation.md",
 197 |   excludePatterns: ["node_modules/**", "**/dist/**", "**/*.test.ts"],
 198 |   maxFileSize: 1024 * 1024, // 1MB
 199 |   ignoreHidden: true,
 200 |   compress: false
 201 | };
 202 | 
 203 | // Tree visualization functions
 204 | const generateTreeSymbols = (depth: number, isLast: boolean[]): string => {
 205 |   if (depth === 0) return "";
 206 | 
 207 |   return (
 208 |     isLast
 209 |       .slice(0, -1)
 210 |       .map(last => (last ? "    " : "│   "))
 211 |       .join("") + (isLast[isLast.length - 1] ? "└── " : "├── ")
 212 |   );
 213 | };
 214 | 
 215 | const createTreeNode = async (
 216 |   nodePath: string,
 217 |   config: IDocumentConfig,
 218 |   relativePath = ""
 219 | ): Promise<ITreeNode | null> => {
 220 |   const stats = await fs.stat(nodePath);
 221 |   const name = path.basename(nodePath);
 222 | 
 223 |   if (!shouldInclude(nodePath, config)) {
 224 |     return null;
 225 |   }
 226 | 
 227 |   if (stats.isDirectory()) {
 228 |     const entries = await fs.readdir(nodePath, { withFileTypes: true });
 229 |     const children: ITreeNode[] = [];
 230 | 
 231 |     for (const entry of entries) {
 232 |       const childNode = await createTreeNode(
 233 |         path.join(nodePath, entry.name),
 234 |         config,
 235 |         path.join(relativePath, name)
 236 |       );
 237 |       if (childNode) children.push(childNode);
 238 |     }
 239 | 
 240 |     return {
 241 |       name,
 242 |       path: relativePath || name,
 243 |       type: "directory",
 244 |       children
 245 |     };
 246 |   } else if (isMatchingFile(nodePath, config)) {
 247 |     return {
 248 |       name,
 249 |       path: relativePath || name,
 250 |       type: "file",
 251 |       children: []
 252 |     };
 253 |   }
 254 | 
 255 |   return null;
 256 | };
 257 | 
 258 | const renderTreeNode = (
 259 |   node: ITreeNode,
 260 |   isLast: boolean[] = [],
 261 |   result: string[] = []
 262 | ): string[] => {
 263 |   const prefix = generateTreeSymbols(isLast.length, isLast);
 264 |   result.push(prefix + node.name);
 265 | 
 266 |   if (node.type === "directory") {
 267 |     node.children.forEach((child, index) => {
 268 |       renderTreeNode(
 269 |         child,
 270 |         [...isLast, index === node.children.length - 1],
 271 |         result
 272 |       );
 273 |     });
 274 |   }
 275 | 
 276 |   return result;
 277 | };
 278 | 
 279 | const isHidden = (filePath: string): boolean => {
 280 |   const baseName = path.basename(filePath);
 281 |   return baseName.startsWith(".");
 282 | };
 283 | 
 284 | const shouldInclude = (
 285 |   filePath: string,
 286 |   { excludePatterns, ignoreHidden }: IDocumentConfig
 287 | ): boolean => {
 288 |   // Check for hidden files if ignoreHidden is enabled
 289 |   if (ignoreHidden && isHidden(filePath)) {
 290 |     return false;
 291 |   }
 292 | 
 293 |   // Check against exclude patterns
 294 |   const isExcluded = excludePatterns.some(pattern =>
 295 |     new RegExp(pattern.replace(/\*/g, ".*")).test(filePath)
 296 |   );
 297 | 
 298 |   return !isExcluded;
 299 | };
 300 | 
 301 | // Pure functions for file operations
 302 | const isMatchingFile = (filePath: string, config: IDocumentConfig): boolean => {
 303 |   if (!config.pattern) {
 304 |     throw new Error("Pattern is not defined in the config");
 305 |   }
 306 | 
 307 |   if (!shouldInclude(filePath, config)) {
 308 |     return false;
 309 |   }
 310 | 
 311 |   return config.pattern.test(filePath);
 312 | };
 313 | 
 314 | const formatSize = (bytes: number): string => {
 315 |   const units = ["B", "KB", "MB", "GB"];
 316 |   let size = bytes;
 317 |   let unitIndex = 0;
 318 | 
 319 |   while (size >= 1024 && unitIndex < units.length - 1) {
 320 |     size /= 1024;
 321 |     unitIndex++;
 322 |   }
 323 | 
 324 |   return `${size.toFixed(2)} ${units[unitIndex]}`;
 325 | };
 326 | 
 327 | // Core file processing functions
 328 | 
 329 | async function* walkDirectory(dir: string): AsyncGenerator<string> {
 330 |   const entries = await fs.readdir(dir, { withFileTypes: true });
 331 | 
 332 |   for (const entry of entries) {
 333 |     const fullPath = path.join(dir, entry.name);
 334 | 
 335 |     if (entry.isDirectory()) {
 336 |       yield* walkDirectory(fullPath);
 337 |     } else {
 338 |       yield fullPath;
 339 |     }
 340 |   }
 341 | }
 342 | 
 343 | const formatContentWithLineNumbers = (content: string): string => {
 344 |   const lines = content.split("\n");
 345 |   const lineNumberWidth = lines.length.toString().length;
 346 | 
 347 |   return lines
 348 |     .map((line, index) => {
 349 |       const lineNumber = (index + 1).toString().padStart(lineNumberWidth, " ");
 350 |       return `${lineNumber} | ${line}`;
 351 |     })
 352 |     .join("\n");
 353 | };
 354 | 
 355 | // Markdown generation functions
 356 | const generateFileSection = (
 357 |   file: IFileInfo,
 358 |   compress: boolean = false
 359 | ): string =>
 360 |   !compress
 361 |     ? `
 362 | ## File: ${file.name}
 363 | - Path: \`${file.path}\`
 364 | - Size: ${formatSize(Number(file.size))}
 365 | - Extension: ${file.ext}
 366 | - Lines of code: ${file.lines}
 367 | - Content:
 368 | 
 369 | \`\`\`${file.ext.slice(1) || "plaintext"}
 370 | ${formatContentWithLineNumbers(file.content)}
 371 | \`\`\`
 372 | 
 373 | ---------------------------------------------------------------------------
 374 | `
 375 |     : `
 376 | ## File: ${file.name}, Path: \`${file.path}\`
 377 | \`\`\`${file.ext.slice(1) || "plaintext"}
 378 | ${formatContentWithLineNumbers(file.content)}
 379 | \`\`\``;
 380 | 
 381 | const generateMarkdownContent = (
 382 |   files: IFileInfo[],
 383 |   treeContent: string,
 384 |   compress: boolean
 385 | ): string =>
 386 |   !compress
 387 |     ? `
 388 | # Code Documentation
 389 | Generated on: ${new Date().toISOString()}
 390 | Total files: ${files.length}
 391 | 
 392 | ## Project Structure
 393 | 
 394 | \`\`\`
 395 | ${treeContent}
 396 | \`\`\`
 397 | 
 398 | ${files.map(file => generateFileSection(file, compress)).join("\n")}
 399 | `
 400 |     : `
 401 | # Code documentation
 402 | \`\`\`
 403 | ${treeContent}
 404 | \`\`\`
 405 | ${files.map(file => generateFileSection(file, compress)).join("\n")}
 406 | `;
 407 | 
 408 | const compressContent = (content: string): string =>
 409 |   content
 410 |     .split("\n")
 411 |     .map(line => line.trim())
 412 |     .filter(line => line !== "")
 413 |     .filter(line => !line.startsWith("//"))
 414 |     .join("\n");
 415 | 
 416 | async function generateFileInfo(
 417 |   filePath: string,
 418 |   stats: Stats,
 419 |   compress: boolean
 420 | ): Promise<IFileInfo> {
 421 |   const content = await fs.readFile(filePath, "utf-8");
 422 |   return {
 423 |     name: path.basename(filePath),
 424 |     path: filePath,
 425 |     content: compress ? compressContent(content) : content,
 426 |     ext: path.extname(filePath),
 427 |     size: stats.size,
 428 |     lines: content.split("\n").filter(line => line.trim() !== "").length
 429 |   };
 430 | }
 431 | 
 432 | // Main function
 433 | async function generateDocumentation(
 434 |   userConfig: Partial<IDocumentConfig> = {}
 435 | ): Promise<void> {
 436 |   try {
 437 |     const config: IDocumentConfig = { ...DEFAULT_CONFIG, ...userConfig };
 438 |     const files: IFileInfo[] = [];
 439 | 
 440 |     // Generate tree structure
 441 |     const rootNode = await createTreeNode(config.rootDir, config);
 442 |     const treeContent = rootNode
 443 |       ? renderTreeNode(rootNode).join("\n")
 444 |       : "No matching files found";
 445 | 
 446 |     for await (const filePath of walkDirectory(config.rootDir)) {
 447 |       if (!isMatchingFile(filePath, config)) {
 448 |         continue;
 449 |       }
 450 |       const stats = await fs.stat(filePath);
 451 |       if (stats.size > config.maxFileSize) {
 452 |         continue;
 453 |       }
 454 |       const fileInfo = await generateFileInfo(filePath, stats, config.compress);
 455 |       files.push(fileInfo);
 456 |     }
 457 | 
 458 |     const markdownContent = generateMarkdownContent(
 459 |       files,
 460 |       treeContent,
 461 |       config.compress
 462 |     );
 463 |     await fs.writeFile(config.outputPath, markdownContent, "utf-8");
 464 |   } catch (error) {
 465 |     console.error("Error generating documentation", error);
 466 |     throw error;
 467 |   }
 468 | }
 469 | 
 470 | if (require.main === module) {
 471 |   generateDocumentation({
 472 |     pattern: /\.ts$/,
 473 |     outputPath: "demo_compressed.md",
 474 |     ignoreHidden: true,
 475 |     excludePatterns: [
 476 |       "node_modules",
 477 |       "dist",
 478 |       "coverage",
 479 |       "**/__tests__",
 480 |       "**/*.test.ts"
 481 |     ],
 482 |     compress: false
 483 |   }).catch(console.error);
 484 |   generateDocumentation({
 485 |     pattern: /\.test.ts$/,
 486 |     outputPath: "demo_test.md",
 487 |     ignoreHidden: true,
 488 |     excludePatterns: [
 489 |       "node_modules",
 490 |       "dist",
 491 |       "coverage",
 492 |       "**/__tests__/__mocks__"
 493 |     ],
 494 |     compress: false
 495 |   }).catch(console.error);
 496 |   generateDocumentation({
 497 |     pattern: /\.md$/,
 498 |     outputPath: "demo_md.md",
 499 |     ignoreHidden: true,
 500 |     excludePatterns: ["node_modules", "dist", "coverage", "*demo*", "src"],
 501 |     compress: false
 502 |   }).catch(console.error);
 503 | }
 504 | 
 505 | ```
 506 | #### File: types.ts
 507 | 
 508 | - **Path:** /root/git/codewrangler/src/cli/commands/types.ts
 509 | - **Extension:** ts
 510 | - **Size:** 160 bytes
 511 | - **Depth:** 3
 512 | - **Lines:** 8
 513 | 
 514 | ```ts
 515 | export interface ICommandOptions {
 516 |   verbose: boolean;
 517 | }
 518 | 
 519 | export interface ICommand {
 520 |   execute: (args: string[], options: ICommandOptions) => Promise<void>;
 521 | }
 522 | 
 523 | ```
 524 | #### File: index.ts
 525 | 
 526 | - **Path:** /root/git/codewrangler/src/cli/index.ts
 527 | - **Extension:** ts
 528 | - **Size:** 416 bytes
 529 | - **Depth:** 2
 530 | - **Lines:** 19
 531 | 
 532 | ```ts
 533 | #!/usr/bin/env node
 534 | import { CodeWrangler } from "./CodeWrangler";
 535 | import { logger } from "../utils/logger/Logger";
 536 | 
 537 | async function main(): Promise<void> {
 538 |   try {
 539 |     await CodeWrangler.run();
 540 |   } catch (error) {
 541 |     if (error instanceof Error) {
 542 |       logger.error(error.message);
 543 |     } else {
 544 |       logger.error("An unknown error occurred");
 545 |     }
 546 |     process.exit(1);
 547 |   }
 548 | }
 549 | 
 550 | main().catch(() => process.exit(1));
 551 | 
 552 | ```
 553 | ### Directory: program
 554 | 
 555 | - **Path:** /root/git/codewrangler/src/cli/program
 556 | - **Size:** 4856 bytes
 557 | - **Files:** 0
 558 | - **Total Files (including subdirectories):** 3
 559 | - **Depth:** 2
 560 | 
 561 | #### Contents:
 562 | 
 563 | ### Directory: mainCLI
 564 | 
 565 | - **Path:** /root/git/codewrangler/src/cli/program/mainCLI
 566 | - **Size:** 4856 bytes
 567 | - **Files:** 3
 568 | - **Total Files (including subdirectories):** 3
 569 | - **Depth:** 3
 570 | 
 571 | #### Contents:
 572 | 
 573 | #### File: MainCLICommand.ts
 574 | 
 575 | - **Path:** /root/git/codewrangler/src/cli/program/mainCLI/MainCLICommand.ts
 576 | - **Extension:** ts
 577 | - **Size:** 2666 bytes
 578 | - **Depth:** 4
 579 | - **Lines:** 77
 580 | 
 581 | ```ts
 582 | import { IMainCLICommandOptions } from "./type";
 583 | import { DocumentOrchestratorBuilder } from "../../../orchestration/DocumentOrchestratorBuilder";
 584 | import { DocumentTreeBuilder } from "../../../services/builder/DocumentTreeBuilder";
 585 | import { renderStrategyFactory } from "../../../services/renderer/RenderStrategyFactory";
 586 | import { OutputFormat } from "../../../utils/config/schema";
 587 | import { logger } from "../../../utils/logger/Logger";
 588 | import { BaseCommand } from "../../commands/Command";
 589 | 
 590 | export class MainCLICommand<
 591 |   T extends IMainCLICommandOptions
 592 | > extends BaseCommand<T> {
 593 |   protected override async beforeExecution(
 594 |     args: string[],
 595 |     options: T
 596 |   ): Promise<void> {
 597 |     await super.beforeExecution(args, options);
 598 |     this.config.set("pattern", args[0]);
 599 |     if (!this.updateOptions(options)) {
 600 |       throw new Error("Invalid configuration value");
 601 |     }
 602 |   }
 603 | 
 604 |   protected override async processExecution(): Promise<void> {
 605 |     const builder = new DocumentTreeBuilder(this.config);
 606 |     const root = await builder.build();
 607 | 
 608 |     const orchestrator = new DocumentOrchestratorBuilder()
 609 |       .setRoot(root)
 610 |       .setConfig(this.config);
 611 | 
 612 |     const outputFormat = this.config.get("outputFormat");
 613 |     const strategies = await renderStrategyFactory.createStrategies(
 614 |       this.config,
 615 |       outputFormat
 616 |     );
 617 | 
 618 |     orchestrator.setStrategies(strategies);
 619 | 
 620 |     const orchestrators = await orchestrator.buildAndExecute();
 621 | 
 622 |     logger.info(`Generated ${orchestrators.length} documents`);
 623 |   }
 624 | 
 625 |   protected override logVerbose(): void {
 626 |     super.logVerbose();
 627 |     logger.debug(
 628 |       `Searching for file matching pattern: ${this.config.get("pattern")}`
 629 |     );
 630 |     logger.debug(
 631 |       `Excluding patterns: ${(this.config.get("excludePatterns") as string[]).join(", ")}`
 632 |     );
 633 |     logger.debug(
 634 |       `Ignoring hidden files: ${this.config.get("ignoreHiddenFiles")}`
 635 |     );
 636 |     logger.debug(`Max file size: ${this.config.get("maxFileSize")} bytes`);
 637 |   }
 638 | 
 639 |   private updateOptions(options: IMainCLICommandOptions): boolean {
 640 |     try {
 641 |       this.config.set("dir", options["dir"]);
 642 |       this.config.set("codeConfigFile", options["config"]);
 643 |       this.config.set("logLevel", options["verbose"] ? "DEBUG" : "INFO");
 644 |       this.config.set(
 645 |         "outputFormat",
 646 |         options["format"] as unknown as OutputFormat[]
 647 |       );
 648 |       this.config.set("outputFile", options["output"]);
 649 |       this.config.set("ignoreHiddenFiles", options["ignoreHidden"]);
 650 |       this.config.set("additionalIgnoreFiles", options["additionalIgnore"]);
 651 |     } catch (error) {
 652 |       logger.error(`Invalid configuration value: ${error}`);
 653 |       return false;
 654 |     }
 655 |     return true;
 656 |   }
 657 | }
 658 | 
 659 | ```
 660 | #### File: ProgramBuilder.ts
 661 | 
 662 | - **Path:** /root/git/codewrangler/src/cli/program/mainCLI/ProgramBuilder.ts
 663 | - **Extension:** ts
 664 | - **Size:** 1924 bytes
 665 | - **Depth:** 4
 666 | - **Lines:** 76
 667 | 
 668 | ```ts
 669 | import { Command } from "commander";
 670 | 
 671 | import { Config } from "../../../utils/config/Config";
 672 | 
 673 | export class ProgramBuilder {
 674 |   private program: Command;
 675 | 
 676 |   public constructor(
 677 |     private config: Config,
 678 |     private version: string
 679 |   ) {
 680 |     this.program = new Command();
 681 |   }
 682 | 
 683 |   public build(): Command {
 684 |     this.buildVersion().buildDescription().buildArguments().buildOptions();
 685 |     return this.program;
 686 |   }
 687 | 
 688 |   private buildVersion(): ProgramBuilder {
 689 |     this.program.version(this.version);
 690 |     return this;
 691 |   }
 692 | 
 693 |   private buildDescription(): ProgramBuilder {
 694 |     this.program.description("CodeWrangler is a tool for generating code");
 695 |     return this;
 696 |   }
 697 | 
 698 |   private buildArguments(): ProgramBuilder {
 699 |     this.program.argument(
 700 |       "<pattern>",
 701 |       'File pattern to match (e.g., "\\.ts$" for TypeScript files)'
 702 |     );
 703 |     return this;
 704 |   }
 705 | 
 706 |   // eslint-disable-next-line max-lines-per-function
 707 |   private buildOptions(): ProgramBuilder {
 708 |     this.program
 709 |       .option("-d, --dir <dir>", "Directory to search", this.config.get("dir"))
 710 |       .option(
 711 |         "-c, --config <config>",
 712 |         "Config file",
 713 |         this.config.get("codeConfigFile")
 714 |       )
 715 |       .option("-v, --verbose", "Verbose mode", this.config.get("logLevel"))
 716 |       .option(
 717 |         "-f, --format <format>",
 718 |         "Output format",
 719 |         this.config.get("outputFormat")
 720 |       )
 721 |       .option(
 722 |         "-o, --output <output>",
 723 |         "Output file",
 724 |         this.config.get("outputFile")
 725 |       )
 726 |       .option(
 727 |         "-e, --exclude <exclude>",
 728 |         "Exclude patterns",
 729 |         this.config.get("excludePatterns")
 730 |       )
 731 |       .option(
 732 |         "-i, --ignore-hidden",
 733 |         "Ignore hidden files",
 734 |         this.config.get("ignoreHiddenFiles")
 735 |       )
 736 |       .option(
 737 |         "-a, --additional-ignore <additional-ignore>",
 738 |         "Additional ignore patterns",
 739 |         this.config.get("additionalIgnoreFiles")
 740 |       );
 741 |     return this;
 742 |   }
 743 | }
 744 | 
 745 | ```
 746 | #### File: type.ts
 747 | 
 748 | - **Path:** /root/git/codewrangler/src/cli/program/mainCLI/type.ts
 749 | - **Extension:** ts
 750 | - **Size:** 266 bytes
 751 | - **Depth:** 4
 752 | - **Lines:** 12
 753 | 
 754 | ```ts
 755 | import { ICommandOptions } from "../../commands/types";
 756 | 
 757 | export interface IMainCLICommandOptions extends ICommandOptions {
 758 |   dir: string;
 759 |   config: string;
 760 |   format: string;
 761 |   output: string;
 762 |   exclude: string;
 763 |   ignoreHidden: boolean;
 764 |   additionalIgnore: string;
 765 | }
 766 | 
 767 | ```
 768 | ### Directory: core
 769 | 
 770 | - **Path:** /root/git/codewrangler/src/core
 771 | - **Size:** 8762 bytes
 772 | - **Files:** 0
 773 | - **Total Files (including subdirectories):** 7
 774 | - **Depth:** 1
 775 | 
 776 | #### Contents:
 777 | 
 778 | ### Directory: entities
 779 | 
 780 | - **Path:** /root/git/codewrangler/src/core/entities
 781 | - **Size:** 7918 bytes
 782 | - **Files:** 3
 783 | - **Total Files (including subdirectories):** 3
 784 | - **Depth:** 2
 785 | 
 786 | #### Contents:
 787 | 
 788 | #### File: NodeBase.ts
 789 | 
 790 | - **Path:** /root/git/codewrangler/src/core/entities/NodeBase.ts
 791 | - **Extension:** ts
 792 | - **Size:** 2775 bytes
 793 | - **Depth:** 3
 794 | - **Lines:** 125
 795 | 
 796 | ```ts
 797 | import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
 798 | import { IRenderStrategy } from "../../services/renderer/RenderStrategy";
 799 | import { IFileStats, IPropsNode } from "../../types/type";
 800 | 
 801 | const defaultProps: IPropsNode = {
 802 |   name: "",
 803 |   path: "",
 804 |   deep: 0,
 805 |   size: 0, // size of the node from the children nodes
 806 |   stats: {
 807 |     size: 0, // size of the node from the file system
 808 |     created: new Date(),
 809 |     modified: new Date(),
 810 |     accessed: new Date(),
 811 |     isDirectory: false,
 812 |     isFile: false,
 813 |     permissions: {
 814 |       readable: false,
 815 |       writable: false,
 816 |       executable: false
 817 |     }
 818 |   }
 819 | };
 820 | 
 821 | export interface INodeContent {
 822 |   content: string;
 823 | }
 824 | 
 825 | interface INodeLifeCycle {
 826 |   validate: () => boolean;
 827 |   bundle: (deep: number) => Promise<void>;
 828 |   render: (strategy: IRenderStrategy) => INodeContent;
 829 |   dispose: () => void;
 830 |   clone: () => NodeBase;
 831 | }
 832 | 
 833 | export abstract class NodeBase implements INodeLifeCycle {
 834 |   protected _props: IPropsNode = { ...defaultProps };
 835 | 
 836 |   public constructor(
 837 |     _name: string,
 838 |     private originalPath: string
 839 |   ) {
 840 |     this.initNode(_name, originalPath);
 841 |     this.validate();
 842 |   }
 843 | 
 844 |   public validate(): boolean {
 845 |     if (!documentFactory.exists(this.path)) {
 846 |       throw new Error(`Path ${this.originalPath} does not exist`);
 847 |     }
 848 |     if (!documentFactory.isAbsolute(this.path)) {
 849 |       throw new Error(`Path ${this.originalPath} is not absolute`);
 850 |     }
 851 |     return true;
 852 |   }
 853 | 
 854 |   // abstract methods
 855 |   public abstract bundle(deep: number): Promise<void>;
 856 |   public abstract render(strategy: IRenderStrategy): INodeContent;
 857 | 
 858 |   // getters and setters
 859 |   // deep
 860 |   public get deep(): number {
 861 |     return this._props.deep;
 862 |   }
 863 |   public set deep(deep: number) {
 864 |     this._props.deep = deep;
 865 |   }
 866 | 
 867 |   // size
 868 |   public get size(): number {
 869 |     return this._props.size;
 870 |   }
 871 |   public set size(size: number) {
 872 |     this._props.size = size;
 873 |   }
 874 | 
 875 |   // name
 876 |   public get name(): string {
 877 |     return this._props.name;
 878 |   }
 879 |   public set name(name: string) {
 880 |     this._props.name = name;
 881 |   }
 882 | 
 883 |   // path
 884 |   public get path(): string {
 885 |     return this._props.path;
 886 |   }
 887 |   public set path(path: string) {
 888 |     this._props.path = path;
 889 |   }
 890 | 
 891 |   // stats
 892 |   public get stats(): IFileStats | undefined {
 893 |     return this._props.stats;
 894 |   }
 895 |   public set stats(stats: IFileStats | undefined) {
 896 |     this._props.stats = stats;
 897 |   }
 898 | 
 899 |   // props
 900 |   public get props(): IPropsNode {
 901 |     return {
 902 |       ...this._props
 903 |     };
 904 |   }
 905 | 
 906 |   public dispose(): void {
 907 |     this._props = { ...defaultProps };
 908 |   }
 909 | 
 910 |   public clone(): NodeBase {
 911 |     return Object.assign(Object.create(this), this);
 912 |   }
 913 | 
 914 |   private initNode(name: string, path: string): void {
 915 |     this.deep = 0;
 916 |     this.size = 0;
 917 |     this.name = name;
 918 |     this.path = documentFactory.resolve(path);
 919 |   }
 920 | }
 921 | 
 922 | ```
 923 | #### File: NodeDirectory.ts
 924 | 
 925 | - **Path:** /root/git/codewrangler/src/core/entities/NodeDirectory.ts
 926 | - **Extension:** ts
 927 | - **Size:** 3142 bytes
 928 | - **Depth:** 3
 929 | - **Lines:** 108
 930 | 
 931 | ```ts
 932 | import { INodeContent, NodeBase } from "./NodeBase";
 933 | import { NodeFile } from "./NodeFile";
 934 | import { fileStatsService } from "../../infrastructure/filesystem/FileStats";
 935 | import { IRenderStrategy } from "../../services/renderer/RenderStrategy";
 936 | import { IPropsDirectoryNode } from "../../types/type";
 937 | 
 938 | interface IPropsDirectory {
 939 |   length: number;
 940 |   deepLength: number;
 941 |   numberOfFiles: number;
 942 |   numberOfDirectories: number;
 943 | }
 944 | 
 945 | const defaultPropsDirectory: IPropsDirectory = {
 946 |   length: 0,
 947 |   deepLength: 0,
 948 |   numberOfFiles: 0,
 949 |   numberOfDirectories: 0
 950 | };
 951 | 
 952 | export abstract class NodeDirectory extends NodeBase {
 953 |   public readonly type = "directory";
 954 |   public children: (NodeFile | NodeDirectory)[] = [];
 955 |   private _propsDirectory: IPropsDirectory = { ...defaultPropsDirectory };
 956 | 
 957 |   public constructor(name: string, pathName: string) {
 958 |     super(name, pathName);
 959 |     this.initDirectory();
 960 |   }
 961 |   // getters and setters
 962 |   public get length(): number {
 963 |     return this._propsDirectory.length;
 964 |   }
 965 |   public set length(length: number) {
 966 |     this._propsDirectory.length = length;
 967 |   }
 968 |   public get deepLength(): number {
 969 |     return this._propsDirectory.deepLength;
 970 |   }
 971 |   public set deepLength(deepLength: number) {
 972 |     this._propsDirectory.deepLength = deepLength;
 973 |   }
 974 |   public get numberOfFiles(): number {
 975 |     return this._propsDirectory.numberOfFiles;
 976 |   }
 977 |   public set numberOfFiles(numberOfFiles: number) {
 978 |     this._propsDirectory.numberOfFiles = numberOfFiles;
 979 |   }
 980 |   public override get props(): IPropsDirectoryNode {
 981 |     return {
 982 |       ...super.props,
 983 |       ...this._propsDirectory
 984 |     };
 985 |   }
 986 | 
 987 |   public addChild(child: NodeFile | NodeDirectory): NodeDirectory {
 988 |     if (!(child instanceof NodeFile || child instanceof NodeDirectory)) {
 989 |       throw new Error("Invalid child type");
 990 |     }
 991 |     this.children.push(child);
 992 |     return this;
 993 |   }
 994 | 
 995 |   public async bundle(deep: number = 0): Promise<void> {
 996 |     // set the deep of the directory
 997 |     this.deep = deep;
 998 | 
 999 |     // bundle all children
1000 |     await Promise.all(this.children.map(child => child.bundle(deep + 1)));
1001 | 
1002 |     // set the length of the directory
1003 |     this.length = this.children.filter(child => child.type === "file").length;
1004 |     this.numberOfFiles =
1005 |       this.length +
1006 |       this.children
1007 |         .filter(child => child.type === "directory")
1008 |         .reduce((acc, child) => acc + child.numberOfFiles, 0);
1009 | 
1010 |     // set the deep length of the directory
1011 |     this.deepLength = this.children.reduce(
1012 |       (acc, child) =>
1013 |         acc + (child instanceof NodeDirectory ? child.deepLength + 1 : 1),
1014 |       0
1015 |     );
1016 | 
1017 |     // set the size of the directory
1018 |     this.size = this.children.reduce((acc, child) => acc + child.size, 0);
1019 | 
1020 |     // set stats
1021 |     this.stats = await fileStatsService(this.path);
1022 |   }
1023 | 
1024 |   public abstract override render(strategy: IRenderStrategy): INodeContent;
1025 | 
1026 |   private initDirectory(): void {
1027 |     this.children = [];
1028 |     this._propsDirectory = { ...defaultPropsDirectory };
1029 |   }
1030 | }
1031 | 
1032 | export class RenderableDirectory extends NodeDirectory {
1033 |   public override render(strategy: IRenderStrategy): INodeContent {
1034 |     return {
1035 |       content: strategy.renderDirectory(this)
1036 |     };
1037 |   }
1038 | }
1039 | 
1040 | ```
1041 | #### File: NodeFile.ts
1042 | 
1043 | - **Path:** /root/git/codewrangler/src/core/entities/NodeFile.ts
1044 | - **Extension:** ts
1045 | - **Size:** 2001 bytes
1046 | - **Depth:** 3
1047 | - **Lines:** 74
1048 | 
1049 | ```ts
1050 | import { INodeContent, NodeBase } from "./NodeBase";
1051 | import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
1052 | import { fileStatsService } from "../../infrastructure/filesystem/FileStats";
1053 | import { IRenderStrategy } from "../../services/renderer/RenderStrategy";
1054 | import { IPropsFileNode } from "../../types/type";
1055 | 
1056 | export abstract class NodeFile extends NodeBase {
1057 |   public readonly type = "file";
1058 |   private _extension: string = "";
1059 |   private _content: string | null = null;
1060 | 
1061 |   public constructor(name: string, pathName: string) {
1062 |     super(name, pathName);
1063 |     this.initFile(name);
1064 |   }
1065 | 
1066 |   // getters and setters
1067 |   // extension
1068 |   public get extension(): string {
1069 |     return this._extension;
1070 |   }
1071 |   protected set extension(extension: string) {
1072 |     this._extension = extension;
1073 |   }
1074 |   // content
1075 |   public get content(): string | null {
1076 |     return this._content;
1077 |   }
1078 |   protected set content(content: string | null) {
1079 |     this._content = content;
1080 |   }
1081 |   // secondary props
1082 |   public override get props(): IPropsFileNode {
1083 |     return {
1084 |       ...super.props,
1085 |       extension: this.extension
1086 |     };
1087 |   }
1088 | 
1089 |   // bundle
1090 |   public async bundle(deep: number = 0): Promise<void> {
1091 |     // set the deep of the file
1092 |     this.deep = deep;
1093 |     // set the size of the file
1094 |     this.size = await documentFactory.size(this.path);
1095 |     // set the content of the file
1096 |     this.content = await documentFactory.readFile(this.path);
1097 |     // set the stats of the file
1098 |     this.stats = await fileStatsService(this.path);
1099 |   }
1100 | 
1101 |   // render
1102 |   public abstract override render(strategy: IRenderStrategy): INodeContent;
1103 | 
1104 |   private initFile(name: string): void {
1105 |     this.extension = documentFactory.extension(name);
1106 |     this._content = null;
1107 |   }
1108 | }
1109 | 
1110 | export class RenderableFile extends NodeFile {
1111 |   // render
1112 |   public override render(strategy: IRenderStrategy): INodeContent {
1113 |     return {
1114 |       content: strategy.renderFile(this)
1115 |     };
1116 |   }
1117 | 
1118 |   // dispose
1119 |   public override dispose(): void {
1120 |     super.dispose();
1121 |   }
1122 | }
1123 | 
1124 | ```
1125 | ### Directory: __tests__
1126 | 
1127 | - **Path:** /root/git/codewrangler/src/core/entities/__tests__
1128 | - **Size:** 0 bytes
1129 | - **Files:** 0
1130 | - **Total Files (including subdirectories):** 0
1131 | - **Depth:** 3
1132 | 
1133 | #### Contents:
1134 | 
1135 | ### Directory: errors
1136 | 
1137 | - **Path:** /root/git/codewrangler/src/core/errors
1138 | - **Size:** 844 bytes
1139 | - **Files:** 4
1140 | - **Total Files (including subdirectories):** 4
1141 | - **Depth:** 2
1142 | 
1143 | #### Contents:
1144 | 
1145 | #### File: DirectoryNotFoundError.ts
1146 | 
1147 | - **Path:** /root/git/codewrangler/src/core/errors/DirectoryNotFoundError.ts
1148 | - **Extension:** ts
1149 | - **Size:** 235 bytes
1150 | - **Depth:** 3
1151 | - **Lines:** 9
1152 | 
1153 | ```ts
1154 | import { DocumentError } from "./DocumentError";
1155 | 
1156 | export class DirectoryNotFoundError extends DocumentError {
1157 |   public constructor(path: string) {
1158 |     super("Directory not found", path);
1159 |     this.name = "DirectoryNotFoundError";
1160 |   }
1161 | }
1162 | 
1163 | ```
1164 | #### File: DocumentError.ts
1165 | 
1166 | - **Path:** /root/git/codewrangler/src/core/errors/DocumentError.ts
1167 | - **Extension:** ts
1168 | - **Size:** 216 bytes
1169 | - **Depth:** 3
1170 | - **Lines:** 10
1171 | 
1172 | ```ts
1173 | export class DocumentError extends Error {
1174 |   public constructor(
1175 |     message: string,
1176 |     public readonly path: string
1177 |   ) {
1178 |     super(`Document error at ${path}: ${message}`);
1179 |     this.name = "DocumentError";
1180 |   }
1181 | }
1182 | 
1183 | ```
1184 | #### File: FileNotFoundError.ts
1185 | 
1186 | - **Path:** /root/git/codewrangler/src/core/errors/FileNotFoundError.ts
1187 | - **Extension:** ts
1188 | - **Size:** 220 bytes
1189 | - **Depth:** 3
1190 | - **Lines:** 9
1191 | 
1192 | ```ts
1193 | import { DocumentError } from "./DocumentError";
1194 | 
1195 | export class FileNotFoundError extends DocumentError {
1196 |   public constructor(path: string) {
1197 |     super("File not found", path);
1198 |     this.name = "FileNotFoundError";
1199 |   }
1200 | }
1201 | 
1202 | ```
1203 | ### Directory: __tests__
1204 | 
1205 | - **Path:** /root/git/codewrangler/src/core/errors/__tests__
1206 | - **Size:** 0 bytes
1207 | - **Files:** 0
1208 | - **Total Files (including subdirectories):** 0
1209 | - **Depth:** 3
1210 | 
1211 | #### Contents:
1212 | 
1213 | #### File: index.ts
1214 | 
1215 | - **Path:** /root/git/codewrangler/src/core/errors/index.ts
1216 | - **Extension:** ts
1217 | - **Size:** 173 bytes
1218 | - **Depth:** 3
1219 | - **Lines:** 4
1220 | 
1221 | ```ts
1222 | export { DocumentError } from "./DocumentError";
1223 | export { DirectoryNotFoundError } from "./DirectoryNotFoundError";
1224 | export { FileNotFoundError } from "./FileNotFoundError";
1225 | 
1226 | ```
1227 | ### Directory: infrastructure
1228 | 
1229 | - **Path:** /root/git/codewrangler/src/infrastructure
1230 | - **Size:** 19243 bytes
1231 | - **Files:** 0
1232 | - **Total Files (including subdirectories):** 5
1233 | - **Depth:** 1
1234 | 
1235 | #### Contents:
1236 | 
1237 | ### Directory: filesystem
1238 | 
1239 | - **Path:** /root/git/codewrangler/src/infrastructure/filesystem
1240 | - **Size:** 13662 bytes
1241 | - **Files:** 3
1242 | - **Total Files (including subdirectories):** 3
1243 | - **Depth:** 2
1244 | 
1245 | #### Contents:
1246 | 
1247 | #### File: DocumentFactory.ts
1248 | 
1249 | - **Path:** /root/git/codewrangler/src/infrastructure/filesystem/DocumentFactory.ts
1250 | - **Extension:** ts
1251 | - **Size:** 10107 bytes
1252 | - **Depth:** 3
1253 | - **Lines:** 350
1254 | 
1255 | ```ts
1256 | import { ObjectEncodingOptions } from "fs";
1257 | import * as fsSync from "fs";
1258 | import * as fs from "fs/promises";
1259 | import * as path from "path";
1260 | 
1261 | import { fileStatsService } from "./FileStats";
1262 | import { DocumentError, FileNotFoundError } from "../../core/errors";
1263 | import {
1264 |   FILE_TYPE,
1265 |   FileType,
1266 |   IDirectoryOptions,
1267 |   IReadOptions,
1268 |   IWriteOptions
1269 | } from "../../types/type";
1270 | 
1271 | export const documentFactory = {
1272 |   /**
1273 |    * Gets the type of a file system entry
1274 |    * @param filePath - The path to check
1275 |    * @returns The type of the file system entry (File or Directory)
1276 |    * @throws {FileNotFoundError} If the path doesn't exist
1277 |    * @throws {DocumentError} For other file system errors
1278 |    */
1279 |   async type(filePath: string): Promise<FileType> {
1280 |     try {
1281 |       const stats = await fs.stat(filePath);
1282 |       return stats.isDirectory() ? FILE_TYPE.Directory : FILE_TYPE.File;
1283 |     } catch (error) {
1284 |       if ((error as NodeJS.ErrnoException).code === "ENOENT") {
1285 |         throw new FileNotFoundError(filePath);
1286 |       }
1287 |       throw new DocumentError(String(error), filePath);
1288 |     }
1289 |   },
1290 | 
1291 |   /**
1292 |    * Gets file size in bytes
1293 |    * @param filePath - The path to the file
1294 |    * @returns The size of the file in bytes
1295 |    * @throws {FileNotFoundError} If the file doesn't exist
1296 |    * @throws {DocumentError} For other file system errors or if path is a directory
1297 |    */
1298 |   async size(filePath: string): Promise<number> {
1299 |     const isDirectory = (await this.type(filePath)) === FILE_TYPE.Directory;
1300 |     if (isDirectory) {
1301 |       throw new DocumentError("Path is a directory", filePath);
1302 |     }
1303 |     const stats = await fileStatsService(filePath);
1304 |     return stats.size;
1305 |   },
1306 | 
1307 |   /**
1308 |    * Resolves a path to an absolute path
1309 |    * @param filePath - The path to resolve
1310 |    * @returns The absolute path
1311 |    */
1312 |   resolve(filePath: string): string {
1313 |     return path.resolve(filePath);
1314 |   },
1315 | 
1316 |   /**
1317 |    * Checks various access flags for a path
1318 |    * @private
1319 |    * @param filePath - The path to check access for
1320 |    * @returns An object containing readable, writable, and executable permission flags
1321 |    */
1322 |   async checkAccess(filePath: string): Promise<{
1323 |     readable: boolean;
1324 |     writable: boolean;
1325 |     executable: boolean;
1326 |   }> {
1327 |     const check = async (mode: number): Promise<boolean> => {
1328 |       try {
1329 |         await fs.access(filePath, mode);
1330 |         return true;
1331 |       } catch {
1332 |         return false;
1333 |       }
1334 |     };
1335 | 
1336 |     return {
1337 |       readable: await check(fs.constants.R_OK),
1338 |       writable: await check(fs.constants.W_OK),
1339 |       executable: await check(fs.constants.X_OK)
1340 |     };
1341 |   },
1342 | 
1343 |   /**
1344 |    * Reads the entire contents of a file synchronously
1345 |    * @param filePath - The path to the file
1346 |    * @param options - The options for the read operation
1347 |    * @returns The contents of the file as a string
1348 |    * @throws {Error} If the file cannot be read
1349 |    */
1350 |   readFileSync(filePath: string, options: IReadOptions = {}): string {
1351 |     return fsSync.readFileSync(filePath, {
1352 |       encoding: options.encoding ?? "utf-8",
1353 |       flag: options.flag
1354 |     });
1355 |   },
1356 | 
1357 |   /**
1358 |    * Reads the entire contents of a file
1359 |    * @param filePath - The path to the file
1360 |    * @param options - The options for the read operation
1361 |    * @returns The contents of the file as a string
1362 |    * @throws {FileNotFoundError} If the file doesn't exist
1363 |    * @throws {DocumentError} For other file system errors
1364 |    */
1365 |   async readFile(
1366 |     filePath: string,
1367 |     options: IReadOptions = {}
1368 |   ): Promise<string> {
1369 |     try {
1370 |       return await fs.readFile(filePath, {
1371 |         encoding: options.encoding ?? "utf-8",
1372 |         flag: options.flag
1373 |       });
1374 |     } catch (error) {
1375 |       if ((error as NodeJS.ErrnoException).code === "ENOENT") {
1376 |         throw new FileNotFoundError(filePath);
1377 |       }
1378 |       throw new DocumentError(String(error), filePath);
1379 |     }
1380 |   },
1381 | 
1382 |   /**
1383 |    * Writes data to a file, replacing the file if it already exists
1384 |    * @param filePath - The path to the file
1385 |    * @param data - The data to write
1386 |    * @param options - The options for the write operation
1387 |    * @throws {DocumentError} For file system errors
1388 |    */
1389 |   async writeFile(
1390 |     filePath: string,
1391 |     data: string | Buffer,
1392 |     options: IWriteOptions = {}
1393 |   ): Promise<void> {
1394 |     try {
1395 |       // Ensure parent directory exists
1396 |       const parentDir = path.dirname(filePath);
1397 |       await fs.mkdir(parentDir, { recursive: true });
1398 | 
1399 |       // Write the file
1400 |       await fs.writeFile(filePath, data, {
1401 |         encoding: options.encoding ?? "utf-8",
1402 |         mode: options.mode,
1403 |         flag: options.flag
1404 |       });
1405 |     } catch (error) {
1406 |       if (error instanceof DocumentError) {
1407 |         throw error;
1408 |       }
1409 |       throw new DocumentError(String(error), filePath);
1410 |     }
1411 |   },
1412 | 
1413 |   /**
1414 |    * Appends data to a file
1415 |    * @param filePath - The path to the file
1416 |    * @param content - The content to append
1417 |    * @param options - The options for the write operation
1418 |    * @throws {DocumentError} For file system errors
1419 |    */
1420 |   async appendFile(
1421 |     filePath: string,
1422 |     content: string,
1423 |     options: IWriteOptions = {}
1424 |   ): Promise<void> {
1425 |     try {
1426 |       await fs.appendFile(filePath, content, {
1427 |         encoding: options.encoding ?? "utf-8",
1428 |         mode: options.mode,
1429 |         flag: options.flag
1430 |       });
1431 |     } catch (error) {
1432 |       throw new DocumentError(String(error), filePath);
1433 |     }
1434 |   },
1435 | 
1436 |   /**
1437 |    * Reads the contents of a directory
1438 |    * @param dirPath - The path to the directory
1439 |    * @param options - The options for the read operation
1440 |    * @returns An array of file and directory names in the directory
1441 |    * @throws {Error} If the directory cannot be read
1442 |    */
1443 |   async readDir(
1444 |     dirPath: string,
1445 |     options?: { withFileTypes?: boolean }
1446 |   ): Promise<string[]> {
1447 |     return await fs.readdir(dirPath, options as ObjectEncodingOptions);
1448 |   },
1449 | 
1450 |   /**
1451 |    * Creates a directory if it doesn't exist
1452 |    * @param dirPath - The path where to create the directory
1453 |    * @param recursive - Whether to create parent directories if they don't exist
1454 |    * @throws {DocumentError} For file system errors
1455 |    */
1456 |   async createDir(dirPath: string, recursive = true): Promise<void> {
1457 |     await fs.mkdir(dirPath, { recursive });
1458 |   },
1459 | 
1460 |   /**
1461 |    * Gets the base name of a file
1462 |    * @param filePath - The path to the file
1463 |    * @returns The base name of the file (last portion of the path)
1464 |    */
1465 |   baseName(filePath: string): string {
1466 |     return path.basename(filePath);
1467 |   },
1468 | 
1469 |   /**
1470 |    * Gets the extension of a file
1471 |    * @param filePath - The path to the file
1472 |    * @returns The extension of the file including the dot (e.g., '.txt')
1473 |    */
1474 |   extension(filePath: string): string {
1475 |     return path.extname(filePath);
1476 |   },
1477 | 
1478 |   /**
1479 |    * Checks if a file or directory exists
1480 |    * @param filePath - The path to check
1481 |    * @returns True if the file or directory exists, false otherwise
1482 |    */
1483 |   exists(filePath: string): boolean {
1484 |     try {
1485 |       fsSync.accessSync(filePath);
1486 |       return true;
1487 |     } catch {
1488 |       return false;
1489 |     }
1490 |   },
1491 | 
1492 |   /**
1493 |    * Checks if a path is absolute
1494 |    * @param filePath - The path to check
1495 |    * @returns True if the path is absolute, false otherwise
1496 |    */
1497 |   isAbsolute(filePath: string): boolean {
1498 |     return path.isAbsolute(filePath);
1499 |   },
1500 | 
1501 |   /**
1502 |    * Gets directory contents with type information
1503 |    * @param dirPath - The path to the directory
1504 |    * @returns An array of objects containing name and type information for each entry
1505 |    * @throws {DocumentError} If path is not a directory or other errors occur
1506 |    */
1507 |   async readDirectory(
1508 |     dirPath: string
1509 |   ): Promise<Array<{ name: string; type: FileType }>> {
1510 |     try {
1511 |       const entries = await fs.readdir(dirPath, { withFileTypes: true });
1512 |       return entries.map(entry => ({
1513 |         name: entry.name,
1514 |         type: entry.isDirectory() ? FILE_TYPE.Directory : FILE_TYPE.File
1515 |       }));
1516 |     } catch (error) {
1517 |       throw new DocumentError(String(error), dirPath);
1518 |     }
1519 |   },
1520 | 
1521 |   /**
1522 |    * Creates a directory if it doesn't exist
1523 |    * @param dirPath - The path where to create the directory
1524 |    * @param options - Options for directory creation including recursive and mode
1525 |    * @throws {DocumentError} For file system errors
1526 |    */
1527 |   async ensureDirectory(
1528 |     dirPath: string,
1529 |     options: IDirectoryOptions = {}
1530 |   ): Promise<void> {
1531 |     try {
1532 |       if (!this.exists(dirPath)) {
1533 |         await fs.mkdir(dirPath, {
1534 |           recursive: options.recursive ?? true,
1535 |           mode: options.mode
1536 |         });
1537 |       }
1538 |     } catch (error) {
1539 |       throw new DocumentError(String(error), dirPath);
1540 |     }
1541 |   },
1542 | 
1543 |   /**
1544 |    * Removes a file or directory
1545 |    * @param filePath - The path to remove
1546 |    * @throws {DocumentError} For file system errors
1547 |    */
1548 |   async remove(filePath: string): Promise<void> {
1549 |     const stats = await fs.stat(filePath);
1550 |     if (stats.isDirectory()) {
1551 |       await fs.rm(filePath, { recursive: true, force: true });
1552 |     } else {
1553 |       await fs.unlink(filePath);
1554 |     }
1555 |   },
1556 | 
1557 |   /**
1558 |    * Copies a file or directory
1559 |    * @param src - The source path
1560 |    * @param dest - The destination path
1561 |    * @throws {DocumentError} For file system errors
1562 |    */
1563 |   async copy(src: string, dest: string): Promise<void> {
1564 |     const stats = await fs.stat(src);
1565 | 
1566 |     if (stats.isDirectory()) {
1567 |       await this.copyDir(src, dest);
1568 |     } else {
1569 |       await fs.copyFile(src, dest);
1570 |     }
1571 |   },
1572 | 
1573 |   /**
1574 |    * Copies a directory recursively
1575 |    * @private
1576 |    * @param src - The source directory path
1577 |    * @param dest - The destination directory path
1578 |    * @throws {DocumentError} For file system errors
1579 |    */
1580 |   async copyDir(src: string, dest: string): Promise<void> {
1581 |     await this.ensureDirectory(dest);
1582 |     const entries = await fs.readdir(src, { withFileTypes: true });
1583 | 
1584 |     for (const entry of entries) {
1585 |       const srcPath = path.join(src, entry.name);
1586 |       const destPath = path.join(dest, entry.name);
1587 | 
1588 |       if (entry.isDirectory()) {
1589 |         await this.copyDir(srcPath, destPath);
1590 |       } else {
1591 |         await fs.copyFile(srcPath, destPath);
1592 |       }
1593 |     }
1594 |   },
1595 | 
1596 |   /**
1597 |    * Joins an array of paths into a single path
1598 |    * @param paths - The paths to join
1599 |    * @returns The joined path
1600 |    */
1601 |   join(...paths: string[]): string {
1602 |     return path.join(...paths);
1603 |   }
1604 | };
1605 | 
1606 | ```
1607 | #### File: FileStats.ts
1608 | 
1609 | - **Path:** /root/git/codewrangler/src/infrastructure/filesystem/FileStats.ts
1610 | - **Extension:** ts
1611 | - **Size:** 1987 bytes
1612 | - **Depth:** 3
1613 | - **Lines:** 72
1614 | 
1615 | ```ts
1616 | import { Stats } from "fs";
1617 | import fs from "fs/promises";
1618 | 
1619 | import { DocumentError } from "../../core/errors/DocumentError";
1620 | import { FileNotFoundError } from "../../core/errors/FileNotFoundError";
1621 | import { IAccessFlags, IFileStats } from "../../types/type";
1622 | 
1623 | class FileStatsService {
1624 |   public async getStats(filePath: string): Promise<IFileStats> {
1625 |     const stats = await this.getBasicStats(filePath);
1626 |     const accessFlags = await this.checkAccess(filePath);
1627 |     return this.mapStatsToFileInfo(stats, accessFlags);
1628 |   }
1629 |   private async getBasicStats(filePath: string): Promise<Stats> {
1630 |     try {
1631 |       return await fs.stat(filePath);
1632 |     } catch (error) {
1633 |       this.handleStatError(error as NodeJS.ErrnoException, filePath);
1634 |       throw error; // TypeScript requires this
1635 |     }
1636 |   }
1637 | 
1638 |   private handleStatError(
1639 |     error: NodeJS.ErrnoException,
1640 |     filePath: string
1641 |   ): never {
1642 |     if (error.code === "ENOENT") {
1643 |       throw new FileNotFoundError(filePath);
1644 |     }
1645 |     throw new DocumentError(String(error), filePath);
1646 |   }
1647 | 
1648 |   private async checkAccess(filePath: string): Promise<IAccessFlags> {
1649 |     const check = async (mode: number): Promise<boolean> => {
1650 |       try {
1651 |         await fs.access(filePath, mode);
1652 |         return true;
1653 |       } catch {
1654 |         return false;
1655 |       }
1656 |     };
1657 | 
1658 |     return {
1659 |       readable: await check(fs.constants.R_OK),
1660 |       writable: await check(fs.constants.W_OK),
1661 |       executable: await check(fs.constants.X_OK)
1662 |     };
1663 |   }
1664 | 
1665 |   private mapStatsToFileInfo(
1666 |     stats: Stats,
1667 |     accessFlags: IAccessFlags
1668 |   ): IFileStats {
1669 |     return {
1670 |       size: stats.size,
1671 |       created: stats.birthtime,
1672 |       modified: stats.mtime,
1673 |       accessed: stats.atime,
1674 |       isDirectory: stats.isDirectory(),
1675 |       isFile: stats.isFile(),
1676 |       permissions: accessFlags
1677 |     };
1678 |   }
1679 | }
1680 | 
1681 | export const fileStatsService = async (
1682 |   filePath: string
1683 | ): Promise<IFileStats> => {
1684 |   const fileStatsService = new FileStatsService();
1685 |   return await fileStatsService.getStats(filePath);
1686 | };
1687 | 
1688 | ```
1689 | #### File: JsonReader.ts
1690 | 
1691 | - **Path:** /root/git/codewrangler/src/infrastructure/filesystem/JsonReader.ts
1692 | - **Extension:** ts
1693 | - **Size:** 1568 bytes
1694 | - **Depth:** 3
1695 | - **Lines:** 52
1696 | 
1697 | ```ts
1698 | import fs from "fs/promises";
1699 | 
1700 | import { documentFactory } from "./DocumentFactory";
1701 | import { DocumentError } from "../../core/errors/DocumentError";
1702 | import { FileNotFoundError } from "../../core/errors/FileNotFoundError";
1703 | 
1704 | export class JsonReader {
1705 |   public async readJsonSync(filePath: string): Promise<object> {
1706 |     try {
1707 |       const absolutePath = this.validatePath(filePath);
1708 |       const content = await this.readFileContent(absolutePath, filePath);
1709 |       return this.parseJsonContent(content, filePath);
1710 |     } catch (error) {
1711 |       if (error instanceof DocumentError) {
1712 |         throw error;
1713 |       }
1714 |       throw new DocumentError(String(error), filePath);
1715 |     }
1716 |   }
1717 |   private validatePath(filePath: string): string {
1718 |     const absolutePath = documentFactory.resolve(filePath);
1719 |     if (!documentFactory.exists(absolutePath)) {
1720 |       throw new FileNotFoundError(filePath);
1721 |     }
1722 |     return absolutePath;
1723 |   }
1724 | 
1725 |   private async readFileContent(
1726 |     absolutePath: string,
1727 |     filePath: string
1728 |   ): Promise<string> {
1729 |     const content = await fs.readFile(absolutePath, "utf-8");
1730 |     if (!content) {
1731 |       throw new DocumentError(`File is empty`, filePath);
1732 |     }
1733 |     return content;
1734 |   }
1735 | 
1736 |   private parseJsonContent(content: string, filePath: string): object {
1737 |     try {
1738 |       return JSON.parse(content);
1739 |     } catch (error) {
1740 |       throw new DocumentError(`Invalid JSON: ${String(error)}`, filePath);
1741 |     }
1742 |   }
1743 | }
1744 | 
1745 | export const jsonReader = async (path: string): Promise<object> => {
1746 |   const jsonReader = new JsonReader();
1747 |   return await jsonReader.readJsonSync(path);
1748 | };
1749 | 
1750 | ```
1751 | ### Directory: __tests__
1752 | 
1753 | - **Path:** /root/git/codewrangler/src/infrastructure/filesystem/__tests__
1754 | - **Size:** 0 bytes
1755 | - **Files:** 0
1756 | - **Total Files (including subdirectories):** 0
1757 | - **Depth:** 3
1758 | 
1759 | #### Contents:
1760 | 
1761 | ### Directory: __mocks__
1762 | 
1763 | - **Path:** /root/git/codewrangler/src/infrastructure/filesystem/__tests__/__mocks__
1764 | - **Size:** 0 bytes
1765 | - **Files:** 0
1766 | - **Total Files (including subdirectories):** 0
1767 | - **Depth:** 4
1768 | 
1769 | #### Contents:
1770 | 
1771 | ### Directory: templates
1772 | 
1773 | - **Path:** /root/git/codewrangler/src/infrastructure/templates
1774 | - **Size:** 5581 bytes
1775 | - **Files:** 2
1776 | - **Total Files (including subdirectories):** 2
1777 | - **Depth:** 2
1778 | 
1779 | #### Contents:
1780 | 
1781 | #### File: TemplateEngine.ts
1782 | 
1783 | - **Path:** /root/git/codewrangler/src/infrastructure/templates/TemplateEngine.ts
1784 | - **Extension:** ts
1785 | - **Size:** 4369 bytes
1786 | - **Depth:** 3
1787 | - **Lines:** 157
1788 | 
1789 | ```ts
1790 | import { ZodObject, z } from "zod";
1791 | 
1792 | import { TemplateType } from "../../types/template";
1793 | import { Config } from "../../utils/config";
1794 | import { logger } from "../../utils/logger";
1795 | import { documentFactory } from "../filesystem/DocumentFactory";
1796 | 
1797 | type TemplateValue = z.ZodType<string | number | boolean | undefined>;
1798 | 
1799 | export class Template<
1800 |   T extends Record<string, TemplateValue> = Record<string, TemplateValue>
1801 | > {
1802 |   private _content: string = "";
1803 |   private schema: ZodObject<T>;
1804 | 
1805 |   public constructor(
1806 |     private type: TemplateType,
1807 |     schema: ZodObject<T>
1808 |   ) {
1809 |     // convert all fields to optional
1810 |     const optionalFields = Object.fromEntries(
1811 |       Object.entries(schema.shape).map(([key, value]) => [
1812 |         key,
1813 |         value.optional()
1814 |       ])
1815 |     );
1816 |     this.schema = schema.extend(optionalFields) as unknown as ZodObject<T>;
1817 |   }
1818 | 
1819 |   public async load(
1820 |     path: string,
1821 |     additionalFields?: Record<string, z.ZodSchema<string>>
1822 |   ): Promise<void> {
1823 |     this._content = await documentFactory.readFile(path);
1824 |     if (additionalFields) {
1825 |       this.schema = this.schema.extend(additionalFields) as ZodObject<T>;
1826 |     }
1827 |     this.validate();
1828 |   }
1829 | 
1830 |   public static getTemplateDir(config: Config): string {
1831 |     const dir = documentFactory.join(
1832 |       config.get("rootDir") as string,
1833 |       config.get("templatesDir") as string
1834 |     );
1835 |     if (!documentFactory.exists(dir)) {
1836 |       throw new Error(`Templates directory not found: ${dir}`);
1837 |     }
1838 |     return dir;
1839 |   }
1840 | 
1841 |   public get content(): string {
1842 |     if (!this._content) {
1843 |       throw new Error(`Template content is not loaded for ${this.type}`);
1844 |     }
1845 |     return this._content;
1846 |   }
1847 | 
1848 |   public static async create<T extends Record<string, TemplateValue>>(
1849 |     type: TemplateType,
1850 |     schema: ZodObject<T>,
1851 |     path: string,
1852 |     additionalFields?: Record<string, z.ZodSchema<string>>
1853 |   ): Promise<Template<T>> {
1854 |     const template = new Template(type, schema);
1855 |     await template.load(path, additionalFields);
1856 |     return template;
1857 |   }
1858 | 
1859 |   public render(data: Record<string, string | number | boolean>): string {
1860 |     try {
1861 |       this.validateData(data);
1862 |       return this.replaceTokens(data);
1863 |     } catch (error) {
1864 |       if (error instanceof Error) {
1865 |         throw new Error(`Template content validation failed for ${this.type}`);
1866 |       }
1867 |       throw error;
1868 |     }
1869 |   }
1870 | 
1871 |   public dispose(): void {
1872 |     this._content = "";
1873 |   }
1874 | 
1875 |   private validateData(data: Record<string, string | number | boolean>): void {
1876 |     this.schema.parse(data);
1877 |     this.validateRequiredTokens(data);
1878 |   }
1879 | 
1880 |   private validateRequiredTokens(
1881 |     data: Record<string, string | number | boolean>
1882 |   ): void {
1883 |     const contentTokens = this.getTemplateTokens();
1884 |     const missingTokens = this.findMissingRequiredTokens(contentTokens, data);
1885 | 
1886 |     if (missingTokens.length > 0) {
1887 |       throw new Error(
1888 |         `Missing required values for tokens: ${missingTokens.join(", ")}`
1889 |       );
1890 |     }
1891 |   }
1892 | 
1893 |   private findMissingRequiredTokens(
1894 |     tokens: string[],
1895 |     data: Record<string, string | number | boolean>
1896 |   ): string[] {
1897 |     return tokens.filter(token => {
1898 |       const isRequired = this.schema.shape[token]?.isOptional() === false;
1899 |       return isRequired && !(token in data);
1900 |     });
1901 |   }
1902 | 
1903 |   private getTemplateTokens(): string[] {
1904 |     const tokenRegex = /\{\{(\w+)\}\}/g;
1905 |     const tokens: string[] = [];
1906 |     let match;
1907 | 
1908 |     while ((match = tokenRegex.exec(this.content)) !== null) {
1909 |       const token = match[1];
1910 |       if (token === undefined) {
1911 |         throw new Error(`Invalid template content for ${this.type}`);
1912 |       }
1913 |       tokens.push(token);
1914 |     }
1915 | 
1916 |     return tokens;
1917 |   }
1918 | 
1919 |   private replaceTokens(
1920 |     data: Record<string, string | number | boolean>
1921 |   ): string {
1922 |     const contentTokens = this.getTemplateTokens();
1923 |     const pattern = new RegExp(`\\{\\{(${contentTokens.join("|")})\\}\\}`, "g");
1924 | 
1925 |     return this.content.replace(pattern, (_, key) =>
1926 |       key in data ? String(data[key]) : `{{${key}}}`
1927 |     );
1928 |   }
1929 | 
1930 |   private validate(): void {
1931 |     const tokens = this.getTemplateTokens();
1932 |     const requiredFields = Object.keys(this.schema.shape);
1933 |     const missingRequired = requiredFields.filter(
1934 |       field => !tokens.includes(field)
1935 |     );
1936 | 
1937 |     if (missingRequired.length > 0) {
1938 |       logger.warn(
1939 |         `Missing required tokens in ${this.type} template: ${missingRequired.join(
1940 |           ", "
1941 |         )}`
1942 |       );
1943 |     }
1944 |   }
1945 | }
1946 | 
1947 | ```
1948 | ### Directory: __tests__
1949 | 
1950 | - **Path:** /root/git/codewrangler/src/infrastructure/templates/__tests__
1951 | - **Size:** 0 bytes
1952 | - **Files:** 0
1953 | - **Total Files (including subdirectories):** 0
1954 | - **Depth:** 3
1955 | 
1956 | #### Contents:
1957 | 
1958 | #### File: zod.ts
1959 | 
1960 | - **Path:** /root/git/codewrangler/src/infrastructure/templates/zod.ts
1961 | - **Extension:** ts
1962 | - **Size:** 1212 bytes
1963 | - **Depth:** 3
1964 | - **Lines:** 42
1965 | 
1966 | ```ts
1967 | import { z } from "zod";
1968 | 
1969 | export const baseTemplateSchema = z.object({
1970 |   PROJECT_NAME: z.string(),
1971 |   GENERATION_DATE: z.string().datetime(),
1972 |   DIRECTORY_STRUCTURE: z.string(),
1973 |   TOTAL_SIZE: z.number(),
1974 |   TOTAL_FILES: z.number(),
1975 |   TOTAL_DIRECTORIES: z.number(),
1976 |   CONTENT: z.string()
1977 | });
1978 | 
1979 | export type BaseTemplate = z.infer<typeof baseTemplateSchema>;
1980 | export type BaseTemplateString = keyof BaseTemplate;
1981 | 
1982 | export const fileTemplateSchema = z.object({
1983 |   FILE_NAME: z.string(),
1984 |   FILE_EXTENSION: z.string(),
1985 |   FILE_SIZE: z.number(),
1986 |   FILE_DEPTH: z.number(),
1987 |   FILE_LINES: z.number(),
1988 |   FILE_PATH: z.string(),
1989 |   FILE_CONTENTS: z.string()
1990 | });
1991 | 
1992 | export type FileTemplate = z.infer<typeof fileTemplateSchema>;
1993 | export type FileTemplateString = keyof FileTemplate;
1994 | 
1995 | export const directoryTemplateSchema = z.object({
1996 |   DIRECTORY_NAME: z.string(),
1997 |   DIRECTORY_PATH: z.string(),
1998 |   DIRECTORY_SIZE: z.number(),
1999 |   DIRECTORY_LENGTH: z.number(),
2000 |   DIRECTORY_DEEP_LENGTH: z.number(),
2001 |   DIRECTORY_DEPTH: z.number(),
2002 |   DIRECTORY_NUMBER_OF_FILES: z.number(),
2003 |   DIRECTORY_CONTENT: z.string()
2004 | });
2005 | 
2006 | export type DirectoryTemplate = z.infer<typeof directoryTemplateSchema>;
2007 | export type DirectoryTemplateString = keyof DirectoryTemplate;
2008 | 
2009 | ```
2010 | ### Directory: orchestration
2011 | 
2012 | - **Path:** /root/git/codewrangler/src/orchestration
2013 | - **Size:** 5232 bytes
2014 | - **Files:** 3
2015 | - **Total Files (including subdirectories):** 6
2016 | - **Depth:** 1
2017 | 
2018 | #### Contents:
2019 | 
2020 | #### File: DocumentOrchestrator.ts
2021 | 
2022 | - **Path:** /root/git/codewrangler/src/orchestration/DocumentOrchestrator.ts
2023 | - **Extension:** ts
2024 | - **Size:** 2826 bytes
2025 | - **Depth:** 2
2026 | - **Lines:** 94
2027 | 
2028 | ```ts
2029 | import { IDocumentOrchestrator } from "./interfaces/IDocumentOrchestrator";
2030 | import { NodeDirectory } from "../core/entities/NodeDirectory";
2031 | import { NodeFile } from "../core/entities/NodeFile";
2032 | import { documentFactory } from "../infrastructure/filesystem/DocumentFactory";
2033 | import { IRenderStrategy } from "../services/renderer/RenderStrategy";
2034 | import { Config } from "../utils/config/Config";
2035 | import { OUTPUT_FORMATS, OutputFormat } from "../utils/config/schema";
2036 | import { logger } from "../utils/logger/Logger";
2037 | 
2038 | export class DocumentOrchestrator implements IDocumentOrchestrator {
2039 |   private strategy: IRenderStrategy | null = null;
2040 | 
2041 |   private constructor(
2042 |     private readonly root: NodeDirectory | NodeFile,
2043 |     private readonly config: Config
2044 |   ) {}
2045 | 
2046 |   public static create(
2047 |     root: NodeDirectory | NodeFile,
2048 |     config: Config
2049 |   ): DocumentOrchestrator {
2050 |     const orchestrator = new DocumentOrchestrator(root, config);
2051 |     orchestrator.initialize();
2052 |     return orchestrator;
2053 |   }
2054 | 
2055 |   public setStrategy(strategy: IRenderStrategy): this {
2056 |     this.strategy = strategy;
2057 |     return this;
2058 |   }
2059 | 
2060 |   public async build(): Promise<void> {
2061 |     try {
2062 |       if (!this.strategy) {
2063 |         throw new Error("Strategy is not set");
2064 |       }
2065 | 
2066 |       const content = this.strategy.render(this.root as NodeDirectory);
2067 |       const outputFormat = this.strategy.getName();
2068 |       const outputPath = this.resolveOutputPath(outputFormat);
2069 |       await this.ensureOutputDirectory(outputPath);
2070 |       await this.writeOutput(outputPath, content);
2071 | 
2072 |       logger.success(`Document built successfully at ${outputPath}`);
2073 |     } catch (error) {
2074 |       logger.error("Failed to build document", error as Error);
2075 |       throw error;
2076 |     }
2077 |   }
2078 | 
2079 |   public getStrategyName(): string {
2080 |     return this.strategy?.getName() ?? "Unknown";
2081 |   }
2082 | 
2083 |   public dispose(): void {
2084 |     this.strategy?.dispose();
2085 |   }
2086 | 
2087 |   private initialize(): void {
2088 |     this.validateStructure();
2089 |   }
2090 | 
2091 |   private validateStructure(): void {
2092 |     if (!(this.root.type == "directory") && !(this.root.type == "file")) {
2093 |       throw new Error("Invalid root node type");
2094 |     }
2095 |   }
2096 | 
2097 |   private resolveOutputPath(outputFormat: OutputFormat): string {
2098 |     const outputFile = this.config.get("outputFile");
2099 |     return documentFactory.resolve(
2100 |       `${outputFile}.${OUTPUT_FORMATS[outputFormat]}`
2101 |     );
2102 |   }
2103 | 
2104 |   private async ensureOutputDirectory(outputPath: string): Promise<void> {
2105 |     const directory = documentFactory.baseName(outputPath);
2106 |     if (
2107 |       outputPath.endsWith(`.${OUTPUT_FORMATS.html}`) ||
2108 |       outputPath.endsWith(`.${OUTPUT_FORMATS.markdown}`)
2109 |     ) {
2110 |       return;
2111 |     }
2112 |     await documentFactory.ensureDirectory(directory);
2113 |   }
2114 | 
2115 |   private async writeOutput(
2116 |     outputPath: string,
2117 |     content: string
2118 |   ): Promise<void> {
2119 |     await documentFactory.writeFile(outputPath, content);
2120 |   }
2121 | }
2122 | 
2123 | ```
2124 | #### File: DocumentOrchestratorBuilder.ts
2125 | 
2126 | - **Path:** /root/git/codewrangler/src/orchestration/DocumentOrchestratorBuilder.ts
2127 | - **Extension:** ts
2128 | - **Size:** 2018 bytes
2129 | - **Depth:** 2
2130 | - **Lines:** 72
2131 | 
2132 | ```ts
2133 | import { DocumentOrchestrator } from "./DocumentOrchestrator";
2134 | import { NodeDirectory } from "../core/entities/NodeDirectory";
2135 | import { NodeFile } from "../core/entities/NodeFile";
2136 | import { IRenderStrategy } from "../services/renderer/RenderStrategy";
2137 | import { Config } from "../utils/config/Config";
2138 | import { logger } from "../utils/logger/Logger";
2139 | 
2140 | export class DocumentOrchestratorBuilder {
2141 |   private root: NodeDirectory | NodeFile | null = null;
2142 |   private config: Config | null = null;
2143 |   private strategies: IRenderStrategy[] = [];
2144 | 
2145 |   public setRoot(root: NodeDirectory | NodeFile): this {
2146 |     this.root = root;
2147 |     return this;
2148 |   }
2149 | 
2150 |   public setConfig(config: Config): this {
2151 |     this.config = config;
2152 |     return this;
2153 |   }
2154 | 
2155 |   public addStrategy(strategy: IRenderStrategy): this {
2156 |     this.strategies.push(strategy);
2157 |     return this;
2158 |   }
2159 | 
2160 |   public setStrategies(strategies: IRenderStrategy[]): this {
2161 |     this.strategies = strategies;
2162 |     return this;
2163 |   }
2164 | 
2165 |   public async build(): Promise<DocumentOrchestrator[]> {
2166 |     if (!this.root || !this.config) {
2167 |       throw new Error("Missing required components for DocumentOrchestrator");
2168 |     }
2169 | 
2170 |     if (this.strategies.length === 0) {
2171 |       throw new Error("At least one render strategy is required");
2172 |     }
2173 | 
2174 |     const orchestrators: DocumentOrchestrator[] = [];
2175 | 
2176 |     for (const strategy of this.strategies) {
2177 |       const orchestrator = await DocumentOrchestrator.create(
2178 |         this.root,
2179 |         this.config
2180 |       );
2181 |       orchestrator.setStrategy(strategy);
2182 |       orchestrators.push(orchestrator);
2183 |     }
2184 | 
2185 |     return orchestrators;
2186 |   }
2187 |   public async buildAndExecute(): Promise<DocumentOrchestrator[]> {
2188 |     const orchestrators = await this.build();
2189 | 
2190 |     for (const orchestrator of orchestrators) {
2191 |       try {
2192 |         await orchestrator.build();
2193 |       } catch (error) {
2194 |         logger.error(
2195 |           `Failed to build documentation with strategy ${orchestrator.getStrategyName()}`,
2196 |           error as Error
2197 |         );
2198 |       }
2199 |     }
2200 | 
2201 |     return orchestrators;
2202 |   }
2203 | }
2204 | 
2205 | ```
2206 | #### File: index.ts
2207 | 
2208 | - **Path:** /root/git/codewrangler/src/orchestration/index.ts
2209 | - **Extension:** ts
2210 | - **Size:** 0 bytes
2211 | - **Depth:** 2
2212 | - **Lines:** 1
2213 | 
2214 | ```ts
2215 | 
2216 | ```
2217 | ### Directory: interfaces
2218 | 
2219 | - **Path:** /root/git/codewrangler/src/orchestration/interfaces
2220 | - **Size:** 388 bytes
2221 | - **Files:** 3
2222 | - **Total Files (including subdirectories):** 3
2223 | - **Depth:** 2
2224 | 
2225 | #### Contents:
2226 | 
2227 | #### File: IDocumentMetadata.ts
2228 | 
2229 | - **Path:** /root/git/codewrangler/src/orchestration/interfaces/IDocumentMetadata.ts
2230 | - **Extension:** ts
2231 | - **Size:** 132 bytes
2232 | - **Depth:** 3
2233 | - **Lines:** 8
2234 | 
2235 | ```ts
2236 | export interface IDocumentMetadata {
2237 |   title: string;
2238 |   description: string;
2239 |   author: string;
2240 |   date: string;
2241 |   version: string;
2242 | }
2243 | 
2244 | ```
2245 | #### File: IDocumentOrchestrator.ts
2246 | 
2247 | - **Path:** /root/git/codewrangler/src/orchestration/interfaces/IDocumentOrchestrator.ts
2248 | - **Extension:** ts
2249 | - **Size:** 256 bytes
2250 | - **Depth:** 3
2251 | - **Lines:** 9
2252 | 
2253 | ```ts
2254 | import { IRenderStrategy } from "../../services/renderer/RenderStrategy";
2255 | 
2256 | export interface IDocumentOrchestrator {
2257 |   setStrategy: (strategy: IRenderStrategy) => this;
2258 |   getStrategyName: () => string;
2259 |   build: () => Promise<void>;
2260 |   dispose: () => void;
2261 | }
2262 | 
2263 | ```
2264 | #### File: index.ts
2265 | 
2266 | - **Path:** /root/git/codewrangler/src/orchestration/interfaces/index.ts
2267 | - **Extension:** ts
2268 | - **Size:** 0 bytes
2269 | - **Depth:** 3
2270 | - **Lines:** 1
2271 | 
2272 | ```ts
2273 | 
2274 | ```
2275 | ### Directory: services
2276 | 
2277 | - **Path:** /root/git/codewrangler/src/services
2278 | - **Size:** 14713 bytes
2279 | - **Files:** 0
2280 | - **Total Files (including subdirectories):** 8
2281 | - **Depth:** 1
2282 | 
2283 | #### Contents:
2284 | 
2285 | ### Directory: builder
2286 | 
2287 | - **Path:** /root/git/codewrangler/src/services/builder
2288 | - **Size:** 5920 bytes
2289 | - **Files:** 3
2290 | - **Total Files (including subdirectories):** 3
2291 | - **Depth:** 2
2292 | 
2293 | #### Contents:
2294 | 
2295 | #### File: DocumentTreeBuilder.ts
2296 | 
2297 | - **Path:** /root/git/codewrangler/src/services/builder/DocumentTreeBuilder.ts
2298 | - **Extension:** ts
2299 | - **Size:** 1814 bytes
2300 | - **Depth:** 3
2301 | - **Lines:** 59
2302 | 
2303 | ```ts
2304 | import { INodeTree, NodeTreeBuilder } from "./NodeTreeBuilder";
2305 | import { RenderableDirectory } from "../../core/entities/NodeDirectory";
2306 | import { RenderableFile } from "../../core/entities/NodeFile";
2307 | import { FILE_TYPE } from "../../types/type";
2308 | import { Config } from "../../utils/config";
2309 | import { logger } from "../../utils/logger";
2310 | 
2311 | export class DocumentTreeBuilder {
2312 |   private root: RenderableDirectory | RenderableFile | undefined;
2313 |   private builder: NodeTreeBuilder;
2314 |   public constructor(config: Config) {
2315 |     this.builder = new NodeTreeBuilder(config);
2316 |   }
2317 | 
2318 |   public async build(): Promise<RenderableDirectory | RenderableFile> {
2319 |     try {
2320 |       // Build file tree structure
2321 |       const fileTree = await this.builder.build();
2322 | 
2323 |       // Convert file tree to Document tree
2324 |       this.root = await this.createDocumentStructure(fileTree);
2325 | 
2326 |       // Initialize the entire document tree
2327 |       await this.root.bundle();
2328 | 
2329 |       if (!this.root) {
2330 |         throw new Error("No files found matching the specified pattern");
2331 |       }
2332 | 
2333 |       logger.info("Document tree built successfully");
2334 | 
2335 |       return this.root;
2336 |     } catch (error) {
2337 |       logger.error("Error building document tree", error as Error);
2338 |       throw error;
2339 |     }
2340 |   }
2341 | 
2342 |   private async createDocumentStructure(
2343 |     node: INodeTree
2344 |   ): Promise<RenderableDirectory | RenderableFile> {
2345 |     if (node.type === FILE_TYPE.Directory) {
2346 |       const directory = new RenderableDirectory(node.name, node.path);
2347 | 
2348 |       if (node.children) {
2349 |         // Recursively create children
2350 |         for (const child of node.children) {
2351 |           const childDocument = await this.createDocumentStructure(child);
2352 |           directory.addChild(childDocument);
2353 |         }
2354 |       }
2355 | 
2356 |       return directory;
2357 |     } else {
2358 |       return new RenderableFile(node.name, node.path);
2359 |     }
2360 |   }
2361 | }
2362 | 
2363 | ```
2364 | #### File: FileHidden.ts
2365 | 
2366 | - **Path:** /root/git/codewrangler/src/services/builder/FileHidden.ts
2367 | - **Extension:** ts
2368 | - **Size:** 893 bytes
2369 | - **Depth:** 3
2370 | - **Lines:** 33
2371 | 
2372 | ```ts
2373 | import { minimatch } from "minimatch";
2374 | 
2375 | import { Config } from "../../utils/config";
2376 | 
2377 | export default class FileHidden {
2378 |   private ignoreHiddenFiles: boolean;
2379 |   private patterns: string[];
2380 |   private additionalIgnoreFiles: string[];
2381 | 
2382 |   public constructor(config: Config) {
2383 |     this.ignoreHiddenFiles = config.get("ignoreHiddenFiles") as boolean;
2384 |     this.patterns = [...config.get("excludePatterns")];
2385 |     this.additionalIgnoreFiles = config.get("additionalIgnoreFiles");
2386 |   }
2387 | 
2388 |   public shouldExclude(fileName: string): boolean {
2389 |     if (this.ignoreHiddenFiles && fileName.startsWith(".")) {
2390 |       return true;
2391 |     }
2392 | 
2393 |     if (this.patterns.some(pattern => minimatch(fileName, pattern))) {
2394 |       return true;
2395 |     }
2396 | 
2397 |     if (this.additionalIgnoreFiles.some(file => minimatch(fileName, file))) {
2398 |       // Additional ignore files are always excluded
2399 |       return true;
2400 |     }
2401 | 
2402 |     return false;
2403 |   }
2404 | }
2405 | 
2406 | ```
2407 | #### File: NodeTreeBuilder.ts
2408 | 
2409 | - **Path:** /root/git/codewrangler/src/services/builder/NodeTreeBuilder.ts
2410 | - **Extension:** ts
2411 | - **Size:** 3213 bytes
2412 | - **Depth:** 3
2413 | - **Lines:** 119
2414 | 
2415 | ```ts
2416 | import FileHidden from "./FileHidden";
2417 | import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
2418 | import { fileStatsService } from "../../infrastructure/filesystem/FileStats";
2419 | import { FILE_TYPE, FileType } from "../../types/type";
2420 | import { Config, ConfigOptions } from "../../utils/config";
2421 | 
2422 | export interface INodeTree {
2423 |   name: string;
2424 |   path: string;
2425 |   type: FileType;
2426 |   children?: INodeTree[];
2427 | }
2428 | 
2429 | export interface INodeTreeBuilderOptions
2430 |   extends Pick<
2431 |     ConfigOptions,
2432 |     | "additionalIgnoreFiles"
2433 |     | "maxDepth"
2434 |     | "excludePatterns"
2435 |     | "dir"
2436 |     | "followSymlinks"
2437 |   > {
2438 |   pattern: RegExp;
2439 |   returnType: "paths" | "details";
2440 | }
2441 | 
2442 | export class NodeTreeBuilder {
2443 |   private config: Config;
2444 |   private options: INodeTreeBuilderOptions;
2445 |   private fileHidden: FileHidden;
2446 | 
2447 |   public constructor(config: Config) {
2448 |     this.config = config;
2449 |     this.options = this.initializeOptions();
2450 |     this.fileHidden = new FileHidden(config);
2451 |   }
2452 | 
2453 |   public async build(): Promise<INodeTree> {
2454 |     const rootDir = this.options.dir;
2455 |     if (!documentFactory.exists(rootDir)) {
2456 |       throw new Error(`Directory ${rootDir} does not exist`);
2457 |     }
2458 |     return await this.buildTree(rootDir);
2459 |   }
2460 | 
2461 |   private initializeOptions(): INodeTreeBuilderOptions {
2462 |     return {
2463 |       dir: this.config.get("dir"),
2464 |       pattern: new RegExp(this.config.get("pattern")),
2465 |       maxDepth: this.config.get("maxDepth"),
2466 |       excludePatterns: this.config.get("excludePatterns"),
2467 |       additionalIgnoreFiles: this.config.get("additionalIgnoreFiles"),
2468 |       returnType: "details",
2469 |       followSymlinks: false
2470 |     };
2471 |   }
2472 | 
2473 |   private async createNode(nodePath: string): Promise<INodeTree> {
2474 |     const stats = await fileStatsService(nodePath);
2475 |     const name = documentFactory.baseName(nodePath);
2476 | 
2477 |     return {
2478 |       name,
2479 |       path: nodePath,
2480 |       type: stats.isDirectory ? FILE_TYPE.Directory : FILE_TYPE.File
2481 |     };
2482 |   }
2483 | 
2484 |   private shouldProcessChildren(node: INodeTree, depth: number): boolean {
2485 |     const isDirectory = node.type === FILE_TYPE.Directory;
2486 |     const withinDepthLimit =
2487 |       !this.options.maxDepth || depth < this.options.maxDepth;
2488 |     return isDirectory && withinDepthLimit;
2489 |   }
2490 | 
2491 |   private async processChildren(
2492 |     nodePath: string,
2493 |     depth: number
2494 |   ): Promise<INodeTree[]> {
2495 |     const entries = await documentFactory.readDir(nodePath);
2496 |     const children: INodeTree[] = [];
2497 | 
2498 |     for (const entry of entries) {
2499 |       const childNode = await this.processChild(nodePath, entry, depth);
2500 |       if (childNode) {
2501 |         children.push(childNode);
2502 |       }
2503 |     }
2504 | 
2505 |     return children;
2506 |   }
2507 | 
2508 |   private async processChild(
2509 |     parentPath: string,
2510 |     entry: string,
2511 |     depth: number
2512 |   ): Promise<INodeTree | null> {
2513 |     if (this.fileHidden.shouldExclude(entry)) {
2514 |       return null;
2515 |     }
2516 | 
2517 |     const childPath = documentFactory.join(parentPath, entry);
2518 |     return await this.buildTree(childPath, depth + 1);
2519 |   }
2520 | 
2521 |   private async buildTree(
2522 |     nodePath: string,
2523 |     depth: number = 0
2524 |   ): Promise<INodeTree> {
2525 |     const node = await this.createNode(nodePath);
2526 | 
2527 |     if (this.shouldProcessChildren(node, depth)) {
2528 |       node.children = await this.processChildren(nodePath, depth);
2529 |     }
2530 | 
2531 |     return node;
2532 |   }
2533 | }
2534 | 
2535 | ```
2536 | ### Directory: __tests__
2537 | 
2538 | - **Path:** /root/git/codewrangler/src/services/builder/__tests__
2539 | - **Size:** 0 bytes
2540 | - **Files:** 0
2541 | - **Total Files (including subdirectories):** 0
2542 | - **Depth:** 3
2543 | 
2544 | #### Contents:
2545 | 
2546 | ### Directory: renderer
2547 | 
2548 | - **Path:** /root/git/codewrangler/src/services/renderer
2549 | - **Size:** 8793 bytes
2550 | - **Files:** 3
2551 | - **Total Files (including subdirectories):** 5
2552 | - **Depth:** 2
2553 | 
2554 | #### Contents:
2555 | 
2556 | #### File: RenderStrategy.ts
2557 | 
2558 | - **Path:** /root/git/codewrangler/src/services/renderer/RenderStrategy.ts
2559 | - **Extension:** ts
2560 | - **Size:** 3388 bytes
2561 | - **Depth:** 3
2562 | - **Lines:** 109
2563 | 
2564 | ```ts
2565 | import { NodeDirectory } from "../../core/entities/NodeDirectory";
2566 | import { NodeFile } from "../../core/entities/NodeFile";
2567 | import { Template } from "../../infrastructure/templates/TemplateEngine";
2568 | import {
2569 |   BaseTemplate,
2570 |   DirectoryTemplate,
2571 |   FileTemplate
2572 | } from "../../infrastructure/templates/zod";
2573 | import { Config, OutputFormat } from "../../utils/config";
2574 | 
2575 | interface IContentRenderer {
2576 |   renderFile: (file: NodeFile) => string;
2577 |   renderDirectory: (directory: NodeDirectory) => string;
2578 | }
2579 | 
2580 | interface IDocumentRenderer {
2581 |   render: (rootDirectory: NodeDirectory) => string;
2582 |   dispose: () => void;
2583 | }
2584 | 
2585 | export interface IRenderStrategy extends IContentRenderer, IDocumentRenderer {
2586 |   getName: () => OutputFormat;
2587 | }
2588 | 
2589 | export abstract class RenderBaseStrategy implements IRenderStrategy {
2590 |   protected templatePage: Template;
2591 |   protected templateDirectory: Template;
2592 |   protected templateFile: Template;
2593 | 
2594 |   protected constructor(
2595 |     private readonly config: Config,
2596 |     public readonly name: OutputFormat,
2597 |     templatePage: Template,
2598 |     templateDirectory: Template,
2599 |     templateFile: Template
2600 |   ) {
2601 |     this.templatePage = templatePage;
2602 |     this.templateDirectory = templateDirectory;
2603 |     this.templateFile = templateFile;
2604 |   }
2605 | 
2606 |   public getName(): OutputFormat {
2607 |     return this.name;
2608 |   }
2609 | 
2610 |   public renderFile(file: NodeFile): string {
2611 |     return this.templateFile.render({
2612 |       FILE_NAME: file.name,
2613 |       FILE_EXTENSION: file.extension.replace(".", ""),
2614 |       FILE_SIZE: file.size,
2615 |       FILE_DEPTH: file.deep,
2616 |       FILE_LINES: file.content?.split("\n").length || 0,
2617 |       FILE_PATH: file.path,
2618 |       FILE_CONTENTS: file.content || ""
2619 |     } as FileTemplate & Record<string, string>);
2620 |   }
2621 | 
2622 |   public renderDirectory(directory: NodeDirectory): string {
2623 |     const content = this.renderChildren(directory.children);
2624 | 
2625 |     return this.templateDirectory.render({
2626 |       DIRECTORY_NAME: directory.name,
2627 |       DIRECTORY_PATH: directory.path,
2628 |       DIRECTORY_SIZE: directory.size,
2629 |       DIRECTORY_LENGTH: directory.length,
2630 |       DIRECTORY_NUMBER_OF_FILES: directory.numberOfFiles,
2631 |       DIRECTORY_DEEP_LENGTH: directory.deepLength,
2632 |       DIRECTORY_DEPTH: directory.deep,
2633 |       DIRECTORY_CONTENT: content
2634 |     } as DirectoryTemplate & Record<string, string>);
2635 |   }
2636 | 
2637 |   public render(rootDirectory: NodeDirectory | NodeFile): string {
2638 |     const rootContent = this.renderNode(rootDirectory);
2639 | 
2640 |     const templateConfig = {
2641 |       PROJECT_NAME:
2642 |         this.config.get("projectName") || rootDirectory.name || "Project",
2643 |       GENERATION_DATE: new Date().toISOString(),
2644 |       TOTAL_SIZE: rootDirectory.size,
2645 |       CONTENT: rootContent
2646 |     } as BaseTemplate & Record<string, string>;
2647 | 
2648 |     if (rootDirectory.type === "directory") {
2649 |       templateConfig["TOTAL_FILES"] = rootDirectory.length;
2650 |       templateConfig["TOTAL_DIRECTORIES"] = rootDirectory.deepLength;
2651 |     }
2652 | 
2653 |     return this.templatePage.render(templateConfig);
2654 |   }
2655 | 
2656 |   public dispose(): void {
2657 |     this.templatePage.dispose();
2658 |     this.templateDirectory.dispose();
2659 |     this.templateFile.dispose();
2660 |   }
2661 | 
2662 |   protected renderNode(node: NodeFile | NodeDirectory): string {
2663 |     return node.type === "file"
2664 |       ? this.renderFile(node)
2665 |       : this.renderDirectory(node);
2666 |   }
2667 | 
2668 |   protected renderChildren(children: (NodeFile | NodeDirectory)[]): string {
2669 |     if (!children) return "";
2670 |     return children.map(child => this.renderNode(child)).join("");
2671 |   }
2672 | }
2673 | 
2674 | ```
2675 | #### File: RenderStrategyBuilder.ts
2676 | 
2677 | - **Path:** /root/git/codewrangler/src/services/renderer/RenderStrategyBuilder.ts
2678 | - **Extension:** ts
2679 | - **Size:** 3112 bytes
2680 | - **Depth:** 3
2681 | - **Lines:** 105
2682 | 
2683 | ```ts
2684 | import { RenderBaseStrategy } from "./RenderStrategy";
2685 | import { RenderHTMLStrategy } from "./strategies/HTMLStrategy";
2686 | import { RenderMarkdownStrategy } from "./strategies/MarkdownStrategy";
2687 | import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
2688 | import { Template } from "../../infrastructure/templates/TemplateEngine";
2689 | import {
2690 |   baseTemplateSchema,
2691 |   directoryTemplateSchema,
2692 |   fileTemplateSchema
2693 | } from "../../infrastructure/templates/zod";
2694 | import { Config, OutputFormatExtension } from "../../utils/config";
2695 | 
2696 | export class RenderStrategyBuilder {
2697 |   private config: Config | null = null;
2698 |   private extension: OutputFormatExtension | null = null;
2699 |   private name: string | null = null;
2700 |   private templatePage: Template | null = null;
2701 |   private templateDirectory: Template | null = null;
2702 |   private templateFile: Template | null = null;
2703 | 
2704 |   public setConfig(config: Config): RenderStrategyBuilder {
2705 |     this.config = config;
2706 |     return this;
2707 |   }
2708 | 
2709 |   public setExtension(extension: OutputFormatExtension): RenderStrategyBuilder {
2710 |     this.extension = extension;
2711 |     return this;
2712 |   }
2713 | 
2714 |   public setName(name: string): RenderStrategyBuilder {
2715 |     this.name = name;
2716 |     return this;
2717 |   }
2718 | 
2719 |   public async loadTemplates(): Promise<RenderStrategyBuilder> {
2720 |     if (!this.config) {
2721 |       throw new Error("Config is required");
2722 |     }
2723 | 
2724 |     const templateDir = Template.getTemplateDir(this.config);
2725 | 
2726 |     this.templatePage = await this.loadTemplatePage(templateDir);
2727 |     this.templateDirectory = await this.loadTemplateDirectory(templateDir);
2728 |     this.templateFile = await this.loadTemplateFile(templateDir);
2729 | 
2730 |     return this;
2731 |   }
2732 | 
2733 |   public build(): RenderBaseStrategy {
2734 |     this.validate();
2735 | 
2736 |     const concreteRenderStrategy =
2737 |       this.name === "Markdown" ? RenderMarkdownStrategy : RenderHTMLStrategy;
2738 | 
2739 |     return new concreteRenderStrategy(
2740 |       this.config as Config,
2741 |       this.templatePage as Template,
2742 |       this.templateDirectory as Template,
2743 |       this.templateFile as Template
2744 |     );
2745 |   }
2746 | 
2747 |   private validate(): boolean {
2748 |     if (!this.config) {
2749 |       throw new Error("Config is required");
2750 |     }
2751 |     if (!this.extension) {
2752 |       throw new Error("Extension is required");
2753 |     }
2754 |     if (!this.name) {
2755 |       throw new Error("Name is required");
2756 |     }
2757 |     if (!this.templatePage || !this.templateDirectory || !this.templateFile) {
2758 |       throw new Error("Templates must be loaded before building");
2759 |     }
2760 | 
2761 |     return true;
2762 |   }
2763 | 
2764 |   private loadTemplateFile(templateDir: string): Promise<Template> {
2765 |     return Template.create(
2766 |       "file",
2767 |       fileTemplateSchema,
2768 |       documentFactory.join(templateDir, `file.${this.extension}`)
2769 |     );
2770 |   }
2771 | 
2772 |   private loadTemplateDirectory(templateDir: string): Promise<Template> {
2773 |     return Template.create(
2774 |       "directory",
2775 |       directoryTemplateSchema,
2776 |       documentFactory.join(templateDir, `directory.${this.extension}`)
2777 |     );
2778 |   }
2779 | 
2780 |   private loadTemplatePage(templateDir: string): Promise<Template> {
2781 |     return Template.create(
2782 |       "page",
2783 |       baseTemplateSchema,
2784 |       documentFactory.join(templateDir, `page.${this.extension}`)
2785 |     );
2786 |   }
2787 | }
2788 | 
2789 | ```
2790 | #### File: RenderStrategyFactory.ts
2791 | 
2792 | - **Path:** /root/git/codewrangler/src/services/renderer/RenderStrategyFactory.ts
2793 | - **Extension:** ts
2794 | - **Size:** 1367 bytes
2795 | - **Depth:** 3
2796 | - **Lines:** 47
2797 | 
2798 | ```ts
2799 | import { RenderBaseStrategy } from "./RenderStrategy";
2800 | import { RenderStrategyBuilder } from "./RenderStrategyBuilder";
2801 | import { Config } from "../../utils/config/Config";
2802 | import { OutputFormat } from "../../utils/config/schema";
2803 | 
2804 | // Factory function for common render strategies
2805 | export const renderStrategyFactory = {
2806 |   async createMarkdownStrategy(config: Config): Promise<RenderBaseStrategy> {
2807 |     return await new RenderStrategyBuilder()
2808 |       .setConfig(config)
2809 |       .setExtension("md")
2810 |       .setName("Markdown")
2811 |       .loadTemplates()
2812 |       .then(builder => builder.build());
2813 |   },
2814 | 
2815 |   async createHTMLStrategy(config: Config): Promise<RenderBaseStrategy> {
2816 |     return await new RenderStrategyBuilder()
2817 |       .setConfig(config)
2818 |       .setExtension("html")
2819 |       .setName("HTML")
2820 |       .loadTemplates()
2821 |       .then(builder => builder.build());
2822 |   },
2823 | 
2824 |   async createStrategies(
2825 |     config: Config,
2826 |     formats: OutputFormat[]
2827 |   ): Promise<RenderBaseStrategy[]> {
2828 |     return await Promise.all(
2829 |       formats.map(format => this.createStrategy(config, format))
2830 |     );
2831 |   },
2832 | 
2833 |   async createStrategy(
2834 |     config: Config,
2835 |     format: OutputFormat
2836 |   ): Promise<RenderBaseStrategy> {
2837 |     switch (format) {
2838 |       case "markdown":
2839 |         return await this.createMarkdownStrategy(config);
2840 |       case "html":
2841 |         return await this.createHTMLStrategy(config);
2842 |     }
2843 |   }
2844 | };
2845 | 
2846 | ```
2847 | ### Directory: __tests__
2848 | 
2849 | - **Path:** /root/git/codewrangler/src/services/renderer/__tests__
2850 | - **Size:** 0 bytes
2851 | - **Files:** 0
2852 | - **Total Files (including subdirectories):** 0
2853 | - **Depth:** 3
2854 | 
2855 | #### Contents:
2856 | 
2857 | ### Directory: strategies
2858 | 
2859 | - **Path:** /root/git/codewrangler/src/services/renderer/strategies
2860 | - **Size:** 926 bytes
2861 | - **Files:** 2
2862 | - **Total Files (including subdirectories):** 2
2863 | - **Depth:** 3
2864 | 
2865 | #### Contents:
2866 | 
2867 | #### File: HTMLStrategy.ts
2868 | 
2869 | - **Path:** /root/git/codewrangler/src/services/renderer/strategies/HTMLStrategy.ts
2870 | - **Extension:** ts
2871 | - **Size:** 459 bytes
2872 | - **Depth:** 4
2873 | - **Lines:** 15
2874 | 
2875 | ```ts
2876 | import { Template } from "../../../infrastructure/templates/TemplateEngine";
2877 | import { Config } from "../../../utils/config";
2878 | import { RenderBaseStrategy } from "../RenderStrategy";
2879 | 
2880 | export class RenderHTMLStrategy extends RenderBaseStrategy {
2881 |   public constructor(
2882 |     config: Config,
2883 |     templatePage: Template,
2884 |     templateDirectory: Template,
2885 |     templateFile: Template
2886 |   ) {
2887 |     super(config, "html", templatePage, templateDirectory, templateFile);
2888 |   }
2889 | }
2890 | 
2891 | ```
2892 | #### File: MarkdownStrategy.ts
2893 | 
2894 | - **Path:** /root/git/codewrangler/src/services/renderer/strategies/MarkdownStrategy.ts
2895 | - **Extension:** ts
2896 | - **Size:** 467 bytes
2897 | - **Depth:** 4
2898 | - **Lines:** 15
2899 | 
2900 | ```ts
2901 | import { Template } from "../../../infrastructure/templates/TemplateEngine";
2902 | import { Config } from "../../../utils/config";
2903 | import { RenderBaseStrategy } from "../RenderStrategy";
2904 | 
2905 | export class RenderMarkdownStrategy extends RenderBaseStrategy {
2906 |   public constructor(
2907 |     config: Config,
2908 |     templatePage: Template,
2909 |     templateDirectory: Template,
2910 |     templateFile: Template
2911 |   ) {
2912 |     super(config, "markdown", templatePage, templateDirectory, templateFile);
2913 |   }
2914 | }
2915 | 
2916 | ```
2917 | ### Directory: types
2918 | 
2919 | - **Path:** /root/git/codewrangler/src/types
2920 | - **Size:** 1314 bytes
2921 | - **Files:** 2
2922 | - **Total Files (including subdirectories):** 2
2923 | - **Depth:** 1
2924 | 
2925 | #### Contents:
2926 | 
2927 | #### File: template.ts
2928 | 
2929 | - **Path:** /root/git/codewrangler/src/types/template.ts
2930 | - **Extension:** ts
2931 | - **Size:** 229 bytes
2932 | - **Depth:** 2
2933 | - **Lines:** 10
2934 | 
2935 | ```ts
2936 | import { z } from "zod";
2937 | 
2938 | export type TemplateType = "page" | "file" | "directory";
2939 | 
2940 | export interface ITemplateContent<T> {
2941 |   content: string;
2942 |   schema: z.ZodSchema<T>;
2943 |   additionalFields?: Record<string, z.ZodSchema<string>>;
2944 | }
2945 | 
2946 | ```
2947 | #### File: type.ts
2948 | 
2949 | - **Path:** /root/git/codewrangler/src/types/type.ts
2950 | - **Extension:** ts
2951 | - **Size:** 1085 bytes
2952 | - **Depth:** 2
2953 | - **Lines:** 62
2954 | 
2955 | ```ts
2956 | export const FILE_TYPE = {
2957 |   File: "file",
2958 |   Directory: "directory"
2959 | } as const;
2960 | 
2961 | export type FileType = (typeof FILE_TYPE)[keyof typeof FILE_TYPE];
2962 | 
2963 | export interface IAccessFlags {
2964 |   readable: boolean;
2965 |   writable: boolean;
2966 |   executable: boolean;
2967 | }
2968 | 
2969 | export interface IFileStats {
2970 |   size: number;
2971 |   created: Date;
2972 |   modified: Date;
2973 |   accessed: Date;
2974 |   isDirectory: boolean;
2975 |   isFile: boolean;
2976 |   permissions: IAccessFlags;
2977 | }
2978 | 
2979 | export interface IReadOptions {
2980 |   encoding?: BufferEncoding;
2981 |   flag?: string;
2982 | }
2983 | 
2984 | export interface IWriteOptions extends IReadOptions {
2985 |   mode?: number;
2986 |   flag?: string;
2987 | }
2988 | 
2989 | export interface IDirectoryOptions {
2990 |   recursive?: boolean;
2991 |   mode?: number;
2992 | }
2993 | 
2994 | export interface IFileTreeItem {
2995 |   path: string;
2996 |   type: FileType;
2997 |   stats?: IFileStats;
2998 | }
2999 | 
3000 | export interface IPropsNode {
3001 |   name: string;
3002 |   path: string;
3003 |   deep: number;
3004 |   size: number;
3005 |   extension?: string;
3006 |   stats?: IFileStats;
3007 | }
3008 | 
3009 | export interface IPropsDirectoryNode extends IPropsNode {
3010 |   deepLength: number;
3011 |   length: number;
3012 | }
3013 | 
3014 | export interface IPropsFileNode extends IPropsNode {
3015 |   extension: string;
3016 | }
3017 | 
3018 | ```
3019 | ### Directory: utils
3020 | 
3021 | - **Path:** /root/git/codewrangler/src/utils
3022 | - **Size:** 9151 bytes
3023 | - **Files:** 0
3024 | - **Total Files (including subdirectories):** 6
3025 | - **Depth:** 1
3026 | 
3027 | #### Contents:
3028 | 
3029 | ### Directory: config
3030 | 
3031 | - **Path:** /root/git/codewrangler/src/utils/config
3032 | - **Size:** 5536 bytes
3033 | - **Files:** 3
3034 | - **Total Files (including subdirectories):** 3
3035 | - **Depth:** 2
3036 | 
3037 | #### Contents:
3038 | 
3039 | #### File: Config.ts
3040 | 
3041 | - **Path:** /root/git/codewrangler/src/utils/config/Config.ts
3042 | - **Extension:** ts
3043 | - **Size:** 2621 bytes
3044 | - **Depth:** 3
3045 | - **Lines:** 95
3046 | 
3047 | ```ts
3048 | import { z } from "zod";
3049 | 
3050 | import {
3051 |   ConfigKeys,
3052 |   ConfigOptions,
3053 |   DEFAULT_CONFIG,
3054 |   configSchema
3055 | } from "./schema";
3056 | import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
3057 | import { JsonReader } from "../../infrastructure/filesystem/JsonReader";
3058 | import { logger } from "../logger/Logger";
3059 | 
3060 | export class Config {
3061 |   private static instance: Config | undefined;
3062 |   private config: ConfigOptions;
3063 |   private jsonReader: JsonReader;
3064 | 
3065 |   private constructor() {
3066 |     this.jsonReader = new JsonReader();
3067 |     this.config = configSchema.parse(DEFAULT_CONFIG);
3068 |   }
3069 | 
3070 |   public static async load(): Promise<Config> {
3071 |     if (!Config.instance) {
3072 |       Config.instance = new Config();
3073 |       await Config.instance.loadUserConfig();
3074 |     }
3075 |     return Config.instance;
3076 |   }
3077 | 
3078 |   public get<T extends ConfigKeys>(key: T): ConfigOptions[T] {
3079 |     return this.config[key] as ConfigOptions[T];
3080 |   }
3081 | 
3082 |   public set(
3083 |     key: keyof ConfigOptions,
3084 |     value: ConfigOptions[keyof ConfigOptions] | undefined
3085 |   ): void {
3086 |     if (value === undefined) {
3087 |       return;
3088 |     }
3089 |     const updatedConfig = { ...this.config, [key]: value };
3090 |     try {
3091 |       configSchema.parse(updatedConfig);
3092 |       this.config = updatedConfig;
3093 |     } catch (error) {
3094 |       if (error instanceof z.ZodError) {
3095 |         logger.error(`Invalid configuration value: ${error.errors}`);
3096 |       }
3097 |       throw error;
3098 |     }
3099 |   }
3100 |   public getAll(): ConfigOptions {
3101 |     return this.config;
3102 |   }
3103 |   public reset(): void {
3104 |     this.config = DEFAULT_CONFIG;
3105 |   }
3106 |   public static destroy(): void {
3107 |     Config.instance = undefined;
3108 |   }
3109 |   public override(config: Partial<ConfigOptions>): void {
3110 |     const newOverrideConfig = { ...this.config, ...config };
3111 |     try {
3112 |       configSchema.parse(newOverrideConfig);
3113 |       this.config = newOverrideConfig;
3114 |     } catch (error) {
3115 |       if (error instanceof z.ZodError) {
3116 |         logger.error(`Invalid configuration value: ${error.errors}`);
3117 |       }
3118 |       throw error;
3119 |     }
3120 |   }
3121 | 
3122 |   private async loadUserConfig(): Promise<void> {
3123 |     try {
3124 |       const configPath = documentFactory.resolve(this.config.codeConfigFile);
3125 |       const userConfig = await this.jsonReader.readJsonSync(configPath);
3126 |       this.config = configSchema.parse({ ...this.config, ...userConfig });
3127 |     } catch (error) {
3128 |       this.handleConfigError(error);
3129 |     }
3130 |   }
3131 | 
3132 |   private handleConfigError(error: unknown): void {
3133 |     if (error instanceof z.ZodError) {
3134 |       const details = error.errors
3135 |         .map(err => `${err.path.join(".")}: ${err.message}`)
3136 |         .join(", ");
3137 |       throw new Error(`Configuration validation failed: ${details}`);
3138 |     }
3139 |     throw error;
3140 |   }
3141 | }
3142 | 
3143 | ```
3144 | ### Directory: __tests__
3145 | 
3146 | - **Path:** /root/git/codewrangler/src/utils/config/__tests__
3147 | - **Size:** 0 bytes
3148 | - **Files:** 0
3149 | - **Total Files (including subdirectories):** 0
3150 | - **Depth:** 3
3151 | 
3152 | #### Contents:
3153 | 
3154 | #### File: index.ts
3155 | 
3156 | - **Path:** /root/git/codewrangler/src/utils/config/index.ts
3157 | - **Extension:** ts
3158 | - **Size:** 52 bytes
3159 | - **Depth:** 3
3160 | - **Lines:** 3
3161 | 
3162 | ```ts
3163 | export * from "./Config";
3164 | export * from "./schema";
3165 | 
3166 | ```
3167 | #### File: schema.ts
3168 | 
3169 | - **Path:** /root/git/codewrangler/src/utils/config/schema.ts
3170 | - **Extension:** ts
3171 | - **Size:** 2863 bytes
3172 | - **Depth:** 3
3173 | - **Lines:** 97
3174 | 
3175 | ```ts
3176 | import { z } from "zod";
3177 | 
3178 | import { LOG_VALUES } from "../logger/Logger";
3179 | 
3180 | export const OUTPUT_FORMATS = {
3181 |   markdown: "md",
3182 |   html: "html"
3183 | } as const;
3184 | 
3185 | export type OutputFormats = typeof OUTPUT_FORMATS;
3186 | export type OutputFormatName = keyof OutputFormats;
3187 | export type OutputFormatExtension = OutputFormats[OutputFormatName];
3188 | 
3189 | export const outputFormatSchema = z.enum(["markdown", "html"] as const);
3190 | 
3191 | export const fileExtensionSchema = z.enum(["md", "html"] as const);
3192 | 
3193 | export type OutputFormat = z.infer<typeof outputFormatSchema>;
3194 | export type FileExtension = z.infer<typeof fileExtensionSchema>;
3195 | 
3196 | export const FILE_EXTENSION: Record<OutputFormat, FileExtension> = {
3197 |   markdown: "md",
3198 |   html: "html"
3199 | };
3200 | 
3201 | export const configSchema = z
3202 |   .object({
3203 |     dir: z.string().default(process.cwd()),
3204 |     rootDir: z.string().default(process.cwd()),
3205 |     templatesDir: z.string().default("public/templates"),
3206 |     pattern: z
3207 |       .string()
3208 |       .regex(/^.*$/, "Pattern must be a valid regex")
3209 |       .default(".*"),
3210 |     outputFile: z.string().default("output"),
3211 |     logLevel: z.enum(LOG_VALUES as [string, ...string[]]).default("INFO"),
3212 |     outputFormat: z.array(outputFormatSchema).default(["markdown"]),
3213 |     maxFileSize: z.number().positive().default(1048576),
3214 |     maxDepth: z.number().default(100),
3215 |     excludePatterns: z
3216 |       .array(z.string())
3217 |       .default(["node_modules/**", "**/*.test.ts", "dist/**"]),
3218 |     ignoreHiddenFiles: z.boolean().default(true),
3219 |     additionalIgnoreFiles: z.array(z.string()).optional().default([]),
3220 |     projectName: z.string().optional(),
3221 |     verbose: z.boolean().default(false),
3222 |     followSymlinks: z.boolean().default(false),
3223 |     codeConfigFile: z
3224 |       .string()
3225 |       .regex(/\.json$/, "Config file must end with .json")
3226 |       .default("public/codewrangler.json")
3227 |   })
3228 |   .strict();
3229 | 
3230 | export type ConfigOptions = z.infer<typeof configSchema>;
3231 | // get a type listing all the keys of the config
3232 | export type ConfigKeys = keyof ConfigOptions;
3233 | 
3234 | const DEFAULT_CONFIG_IGNORE = {
3235 |   ignoreHiddenFiles: true, // Default value
3236 |   additionalIgnoreFiles: [],
3237 |   excludePatterns: ["node_modules/**", "**/*.test.ts", "dist/**"]
3238 | };
3239 | 
3240 | const DEFAULT_CONFIG_LOG = {
3241 |   logLevel: "INFO",
3242 |   verbose: false
3243 | };
3244 | 
3245 | const DEFAULT_CONFIG_LIMITS = {
3246 |   maxFileSize: 1048576,
3247 |   maxDepth: 100
3248 | };
3249 | 
3250 | const DEFAULT_CONFIG_PATHS = {
3251 |   templatesDir: "public/templates",
3252 |   codeConfigFile: "public/codewrangler.json"
3253 | };
3254 | 
3255 | const DEFAULT_CONFIG_OUTPUT = {
3256 |   outputFormat: ["markdown"] as OutputFormat[],
3257 |   outputFile: "output"
3258 | };
3259 | 
3260 | export const DEFAULT_CONFIG: ConfigOptions = {
3261 |   dir: process.cwd(), // current working directory, where the command is run
3262 |   rootDir: process.cwd(),
3263 |   projectName: undefined,
3264 |   pattern: ".*",
3265 |   followSymlinks: false,
3266 |   ...DEFAULT_CONFIG_PATHS,
3267 |   ...DEFAULT_CONFIG_LIMITS,
3268 |   ...DEFAULT_CONFIG_IGNORE,
3269 |   ...DEFAULT_CONFIG_LOG,
3270 |   ...DEFAULT_CONFIG_OUTPUT
3271 | };
3272 | 
3273 | ```
3274 | ### Directory: helpers
3275 | 
3276 | - **Path:** /root/git/codewrangler/src/utils/helpers
3277 | - **Size:** 1554 bytes
3278 | - **Files:** 1
3279 | - **Total Files (including subdirectories):** 1
3280 | - **Depth:** 2
3281 | 
3282 | #### Contents:
3283 | 
3284 | #### File: ProgressBar.ts
3285 | 
3286 | - **Path:** /root/git/codewrangler/src/utils/helpers/ProgressBar.ts
3287 | - **Extension:** ts
3288 | - **Size:** 1554 bytes
3289 | - **Depth:** 3
3290 | - **Lines:** 68
3291 | 
3292 | ```ts
3293 | import cliProgress from "cli-progress";
3294 | 
3295 | export class ProgressBar {
3296 |   private bar: cliProgress.SingleBar;
3297 |   private intervalId: NodeJS.Timeout | null = null;
3298 |   private currentValue: number = 0;
3299 | 
3300 |   public constructor(private total: number = 100) {
3301 |     this.bar = new cliProgress.SingleBar(
3302 |       {},
3303 |       cliProgress.Presets.shades_classic
3304 |     );
3305 |   }
3306 | 
3307 |   public start(): ProgressBar {
3308 |     this.bar.start(this.total, 0, {
3309 |       compress: true
3310 |     });
3311 |     this.intervalId = setInterval(() => this.simulateProgress(), 200);
3312 |     return this;
3313 |   }
3314 | 
3315 |   public update(value: number): ProgressBar {
3316 |     this.currentValue = value;
3317 |     this.bar.update(value);
3318 |     return this;
3319 |   }
3320 | 
3321 |   public stop(): ProgressBar {
3322 |     if (this.intervalId) {
3323 |       clearInterval(this.intervalId);
3324 |       this.intervalId = null;
3325 |     }
3326 |     this.bar.update(this.total);
3327 |     this.bar.stop();
3328 |     return this;
3329 |   }
3330 | 
3331 |   public async execute<T>(fn: () => Promise<T>): Promise<T> {
3332 |     this.start();
3333 |     try {
3334 |       return await fn();
3335 |     } finally {
3336 |       this.stop();
3337 |     }
3338 |   }
3339 | 
3340 |   private simulateProgress(): void {
3341 |     const remainingProgress = this.total - this.currentValue;
3342 |     const increment = Math.random() * remainingProgress * 0.1;
3343 |     this.currentValue = Math.min(
3344 |       this.currentValue + increment,
3345 |       this.total * 0.95
3346 |     );
3347 |     this.bar.update(this.currentValue);
3348 |   }
3349 | }
3350 | 
3351 | export async function progressBar(
3352 |   total: number,
3353 |   callback: () => Promise<void>
3354 | ): Promise<void> {
3355 |   const bar = new ProgressBar(total);
3356 |   await bar.execute(async () => {
3357 |     await callback();
3358 |   });
3359 | }
3360 | 
3361 | ```
3362 | ### Directory: __tests__
3363 | 
3364 | - **Path:** /root/git/codewrangler/src/utils/helpers/__tests__
3365 | - **Size:** 0 bytes
3366 | - **Files:** 0
3367 | - **Total Files (including subdirectories):** 0
3368 | - **Depth:** 3
3369 | 
3370 | #### Contents:
3371 | 
3372 | ### Directory: logger
3373 | 
3374 | - **Path:** /root/git/codewrangler/src/utils/logger
3375 | - **Size:** 2061 bytes
3376 | - **Files:** 2
3377 | - **Total Files (including subdirectories):** 2
3378 | - **Depth:** 2
3379 | 
3380 | #### Contents:
3381 | 
3382 | #### File: Logger.ts
3383 | 
3384 | - **Path:** /root/git/codewrangler/src/utils/logger/Logger.ts
3385 | - **Extension:** ts
3386 | - **Size:** 2035 bytes
3387 | - **Depth:** 3
3388 | - **Lines:** 83
3389 | 
3390 | ```ts
3391 | /* eslint-disable no-console */
3392 | import colors from "colors";
3393 | 
3394 | import { Config } from "../config/Config";
3395 | 
3396 | export const LOG_LEVEL = {
3397 |   ERROR: 0,
3398 |   WARN: 1,
3399 |   INFO: 2,
3400 |   DEBUG: 3
3401 | } as const;
3402 | 
3403 | type LogLevel = (typeof LOG_LEVEL)[keyof typeof LOG_LEVEL];
3404 | export type LogLevelString = keyof typeof LOG_LEVEL;
3405 | export const LOG_VALUES = Object.keys(LOG_LEVEL) as LogLevelString[];
3406 | 
3407 | export class Logger {
3408 |   private static instance: Logger;
3409 |   private config: Config | null = null;
3410 | 
3411 |   private constructor() {}
3412 |   public static load(): Logger {
3413 |     if (!Logger.instance) {
3414 |       Logger.instance = new Logger();
3415 |     }
3416 |     return Logger.instance;
3417 |   }
3418 |   public setConfig(config: Config): Logger {
3419 |     this.config = config;
3420 |     return this;
3421 |   }
3422 |   public setLogLevel(logLevel: LogLevelString): Logger {
3423 |     if (this.config) {
3424 |       this.config.set("logLevel", logLevel);
3425 |     }
3426 |     return this;
3427 |   }
3428 | 
3429 |   private get logLevel(): LogLevel {
3430 |     const configLogLevel = this.config?.get("logLevel") as
3431 |       | LogLevelString
3432 |       | undefined;
3433 |     return configLogLevel ? LOG_LEVEL[configLogLevel] : LOG_LEVEL.ERROR;
3434 |   }
3435 | 
3436 |   public error(message: string, error?: Error, ...other: unknown[]): void {
3437 |     if (this.logLevel >= LOG_LEVEL.ERROR) {
3438 |       console.log(colors.red(`[ERROR] ${message}`), ...other);
3439 |       if (error instanceof Error && error.stack) {
3440 |         console.log(colors.red(error.stack));
3441 |       }
3442 |     }
3443 |   }
3444 | 
3445 |   public warn(message: string): void {
3446 |     if (this.logLevel >= LOG_LEVEL.WARN) {
3447 |       console.log(colors.yellow(`[WARN] ${message}`));
3448 |     }
3449 |   }
3450 | 
3451 |   public info(message: string): void {
3452 |     if (this.logLevel >= LOG_LEVEL.INFO) {
3453 |       console.log(colors.blue(`[INFO] ${message}`));
3454 |     }
3455 |   }
3456 | 
3457 |   public debug(message: string): void {
3458 |     if (this.logLevel >= LOG_LEVEL.DEBUG) {
3459 |       console.log(colors.gray(`[DEBUG] ${message}`));
3460 |     }
3461 |   }
3462 | 
3463 |   public success(message: string): void {
3464 |     console.log(colors.green(message));
3465 |   }
3466 | 
3467 |   public log(message: string): void {
3468 |     console.log(message);
3469 |   }
3470 | }
3471 | 
3472 | export const logger = Logger.load();
3473 | 
3474 | ```
3475 | ### Directory: __tests__
3476 | 
3477 | - **Path:** /root/git/codewrangler/src/utils/logger/__tests__
3478 | - **Size:** 0 bytes
3479 | - **Files:** 0
3480 | - **Total Files (including subdirectories):** 0
3481 | - **Depth:** 3
3482 | 
3483 | #### Contents:
3484 | 
3485 | #### File: index.ts
3486 | 
3487 | - **Path:** /root/git/codewrangler/src/utils/logger/index.ts
3488 | - **Extension:** ts
3489 | - **Size:** 26 bytes
3490 | - **Depth:** 3
3491 | - **Lines:** 2
3492 | 
3493 | ```ts
3494 | export * from "./Logger";
3495 | 
3496 | ```
3497 | 
3498 | 
```

---------------------------------------------------------------------------

