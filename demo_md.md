
# Code Documentation
Generated on: 2024-12-06T08:46:20.785Z
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
- Size: 85.96 KB
- Extension: .md
- Lines of code: 2897
- Content:

```md
   1 | # Project Documentation: src
   2 | 
   3 | ## Overview
   4 | 
   5 | This documentation was automatically generated on 2024-12-05T20:17:03.250Z.
   6 | 
   7 | ## Summary
   8 | 
   9 | - Total Files: 0
  10 | - Total Directories: 71
  11 | - Total Size: 74075
  12 | 
  13 | ## Content of Files
  14 | 
  15 | ### Directory: src
  16 | 
  17 | - **Path:** /root/git/codewrangler/src
  18 | - **Size:** 74075 bytes
  19 | - **Files:** 0
  20 | - **Total Files (including subdirectories):** 41
  21 | - **Depth:** 0
  22 | 
  23 | #### Contents:
  24 | 
  25 | ### Directory: cli
  26 | 
  27 | - **Path:** /root/git/codewrangler/src/cli
  28 | - **Size:** 15854 bytes
  29 | - **Files:** 2
  30 | - **Total Files (including subdirectories):** 7
  31 | - **Depth:** 1
  32 | 
  33 | #### Contents:
  34 | 
  35 | #### File: CodeWrangler.ts
  36 | 
  37 | - **Path:** /root/git/codewrangler/src/cli/CodeWrangler.ts
  38 | - **Extension:** ts
  39 | - **Size:** 1073 bytes
  40 | - **Depth:** 2
  41 | - **Lines:** 34
  42 | 
  43 | ```ts
  44 | import { Command } from "commander";
  45 | 
  46 | import { MainCICommand } from "./commands/MainCICommand";
  47 | import { ProgramBuilder } from "./program/ProgramBuilder";
  48 | import { Config } from "../utils/config/Config";
  49 | 
  50 | export class CodeWrangler {
  51 |   private static instance: CodeWrangler | undefined;
  52 |   private readonly VERSION = "1.0.0";
  53 |   private program: Command;
  54 | 
  55 |   private constructor(private config: Config) {
  56 |     this.program = new ProgramBuilder(config, this.VERSION).build();
  57 |     this.setupCommands();
  58 |   }
  59 | 
  60 |   public static async run(): Promise<boolean> {
  61 |     if (!CodeWrangler.instance) {
  62 |       const config = await Config.load();
  63 |       CodeWrangler.instance = new CodeWrangler(config);
  64 |       await CodeWrangler.instance.program.parseAsync(process.argv);
  65 |       return true;
  66 |     }
  67 |     throw new Error("CodeWrangler already initialized");
  68 |   }
  69 | 
  70 |   private setupCommands(): void {
  71 |     this.program.action(async (pattern: string, options: Record<string, string>) => {
  72 |       const command = new MainCICommand(this.config);
  73 |       await command.execute([pattern], options);
  74 |     });
  75 |   }
  76 | }
  77 | 
  78 | ```
  79 | ### Directory: commands
  80 | 
  81 | - **Path:** /root/git/codewrangler/src/cli/commands
  82 | - **Size:** 12445 bytes
  83 | - **Files:** 4
  84 | - **Total Files (including subdirectories):** 4
  85 | - **Depth:** 2
  86 | 
  87 | #### Contents:
  88 | 
  89 | #### File: Command.ts
  90 | 
  91 | - **Path:** /root/git/codewrangler/src/cli/commands/Command.ts
  92 | - **Extension:** ts
  93 | - **Size:** 1517 bytes
  94 | - **Depth:** 3
  95 | - **Lines:** 57
  96 | 
  97 | ```ts
  98 | /* eslint-disable require-await */
  99 | import { ICommandOptions } from "./types";
 100 | import { Config } from "../../utils/config/Config";
 101 | import { ProgressBar } from "../../utils/helpers/ProgressBar";
 102 | import { logger } from "../../utils/logger/Logger";
 103 | 
 104 | export abstract class BaseCommand {
 105 |   public constructor(protected config: Config) {}
 106 | 
 107 |   public async execute(
 108 |     args: string[],
 109 |     options: ICommandOptions
 110 |   ): Promise<void> {
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
 130 |   protected async beforeExecution(
 131 |     _: string[],
 132 |     options: ICommandOptions
 133 |   ): Promise<void> {
 134 |     if (options.verbose) {
 135 |       this.logVerbose();
 136 |     }
 137 |   }
 138 | 
 139 |   protected abstract processExecution(): Promise<void>;
 140 | 
 141 |   protected async afterExecution(): Promise<void> {
 142 |     // Default implementation - override if needed
 143 |   }
 144 | 
 145 |   protected async handleError(error: unknown): Promise<void> {
 146 |     logger.error("Command execution failed:", error as Error);
 147 |   }
 148 | 
 149 |   protected logVerbose(): void {
 150 |     // Default verbose logging - override to add command-specific logs
 151 |     logger.debug("Executing command with verbose logging");
 152 |   }
 153 | }
 154 | 
 155 | ```
 156 | #### File: DemoCommand.ts
 157 | 
 158 | - **Path:** /root/git/codewrangler/src/cli/commands/DemoCommand.ts
 159 | - **Extension:** ts
 160 | - **Size:** 8025 bytes
 161 | - **Depth:** 3
 162 | - **Lines:** 342
 163 | 
 164 | ```ts
 165 | /* eslint-disable max-lines-per-function */
 166 | import { Stats } from "fs";
 167 | import * as fs from "fs/promises";
 168 | import * as path from "path";
 169 | 
 170 | interface IFileInfo {
 171 |   name: string;
 172 |   path: string;
 173 |   content: string;
 174 |   ext: string;
 175 |   size: number;
 176 |   lines: number;
 177 | }
 178 | 
 179 | interface ITreeNode {
 180 |   name: string;
 181 |   path: string;
 182 |   type: "file" | "directory";
 183 |   children: ITreeNode[];
 184 | }
 185 | 
 186 | interface IDocumentConfig {
 187 |   pattern: RegExp;
 188 |   rootDir: string;
 189 |   outputPath: string;
 190 |   excludePatterns: string[];
 191 |   maxFileSize: number;
 192 |   ignoreHidden: boolean;
 193 |   compress: boolean;
 194 | }
 195 | 
 196 | const DEFAULT_CONFIG: IDocumentConfig = {
 197 |   pattern: /.*/,
 198 |   rootDir: process.cwd(),
 199 |   outputPath: "documentation.md",
 200 |   excludePatterns: ["node_modules/**", "**/dist/**", "**/*.test.ts"],
 201 |   maxFileSize: 1024 * 1024, // 1MB
 202 |   ignoreHidden: true,
 203 |   compress: false
 204 | };
 205 | 
 206 | // Tree visualization functions
 207 | const generateTreeSymbols = (depth: number, isLast: boolean[]): string => {
 208 |   if (depth === 0) return "";
 209 | 
 210 |   return (
 211 |     isLast
 212 |       .slice(0, -1)
 213 |       .map(last => (last ? "    " : "│   "))
 214 |       .join("") + (isLast[isLast.length - 1] ? "└── " : "├── ")
 215 |   );
 216 | };
 217 | 
 218 | const createTreeNode = async (
 219 |   nodePath: string,
 220 |   config: IDocumentConfig,
 221 |   relativePath = ""
 222 | ): Promise<ITreeNode | null> => {
 223 |   const stats = await fs.stat(nodePath);
 224 |   const name = path.basename(nodePath);
 225 | 
 226 |   if (!shouldInclude(nodePath, config)) {
 227 |     return null;
 228 |   }
 229 | 
 230 |   if (stats.isDirectory()) {
 231 |     const entries = await fs.readdir(nodePath, { withFileTypes: true });
 232 |     const children: ITreeNode[] = [];
 233 | 
 234 |     for (const entry of entries) {
 235 |       const childNode = await createTreeNode(
 236 |         path.join(nodePath, entry.name),
 237 |         config,
 238 |         path.join(relativePath, name)
 239 |       );
 240 |       if (childNode) children.push(childNode);
 241 |     }
 242 | 
 243 |     return {
 244 |       name,
 245 |       path: relativePath || name,
 246 |       type: "directory",
 247 |       children
 248 |     };
 249 |   } else if (isMatchingFile(nodePath, config)) {
 250 |     return {
 251 |       name,
 252 |       path: relativePath || name,
 253 |       type: "file",
 254 |       children: []
 255 |     };
 256 |   }
 257 | 
 258 |   return null;
 259 | };
 260 | 
 261 | const renderTreeNode = (
 262 |   node: ITreeNode,
 263 |   isLast: boolean[] = [],
 264 |   result: string[] = []
 265 | ): string[] => {
 266 |   const prefix = generateTreeSymbols(isLast.length, isLast);
 267 |   result.push(prefix + node.name);
 268 | 
 269 |   if (node.type === "directory") {
 270 |     node.children.forEach((child, index) => {
 271 |       renderTreeNode(
 272 |         child,
 273 |         [...isLast, index === node.children.length - 1],
 274 |         result
 275 |       );
 276 |     });
 277 |   }
 278 | 
 279 |   return result;
 280 | };
 281 | 
 282 | const isHidden = (filePath: string): boolean => {
 283 |   const baseName = path.basename(filePath);
 284 |   return baseName.startsWith(".");
 285 | };
 286 | 
 287 | const shouldInclude = (
 288 |   filePath: string,
 289 |   { excludePatterns, ignoreHidden }: IDocumentConfig
 290 | ): boolean => {
 291 |   // Check for hidden files if ignoreHidden is enabled
 292 |   if (ignoreHidden && isHidden(filePath)) {
 293 |     return false;
 294 |   }
 295 | 
 296 |   // Check against exclude patterns
 297 |   const isExcluded = excludePatterns.some(pattern =>
 298 |     new RegExp(pattern.replace(/\*/g, ".*")).test(filePath)
 299 |   );
 300 | 
 301 |   return !isExcluded;
 302 | };
 303 | 
 304 | // Pure functions for file operations
 305 | const isMatchingFile = (filePath: string, config: IDocumentConfig): boolean => {
 306 |   if (!config.pattern) {
 307 |     throw new Error("Pattern is not defined in the config");
 308 |   }
 309 | 
 310 |   if (!shouldInclude(filePath, config)) {
 311 |     return false;
 312 |   }
 313 | 
 314 |   return config.pattern.test(filePath);
 315 | };
 316 | 
 317 | const formatSize = (bytes: number): string => {
 318 |   const units = ["B", "KB", "MB", "GB"];
 319 |   let size = bytes;
 320 |   let unitIndex = 0;
 321 | 
 322 |   while (size >= 1024 && unitIndex < units.length - 1) {
 323 |     size /= 1024;
 324 |     unitIndex++;
 325 |   }
 326 | 
 327 |   return `${size.toFixed(2)} ${units[unitIndex]}`;
 328 | };
 329 | 
 330 | // Core file processing functions
 331 | 
 332 | async function* walkDirectory(dir: string): AsyncGenerator<string> {
 333 |   const entries = await fs.readdir(dir, { withFileTypes: true });
 334 | 
 335 |   for (const entry of entries) {
 336 |     const fullPath = path.join(dir, entry.name);
 337 | 
 338 |     if (entry.isDirectory()) {
 339 |       yield* walkDirectory(fullPath);
 340 |     } else {
 341 |       yield fullPath;
 342 |     }
 343 |   }
 344 | }
 345 | 
 346 | const formatContentWithLineNumbers = (content: string): string => {
 347 |   const lines = content.split("\n");
 348 |   const lineNumberWidth = lines.length.toString().length;
 349 | 
 350 |   return lines
 351 |     .map((line, index) => {
 352 |       const lineNumber = (index + 1).toString().padStart(lineNumberWidth, " ");
 353 |       return `${lineNumber} | ${line}`;
 354 |     })
 355 |     .join("\n");
 356 | };
 357 | 
 358 | // Markdown generation functions
 359 | const generateFileSection = (
 360 |   file: IFileInfo,
 361 |   compress: boolean = false
 362 | ): string =>
 363 |   !compress
 364 |     ? `
 365 | ## File: ${file.name}
 366 | - Path: \`${file.path}\`
 367 | - Size: ${formatSize(Number(file.size))}
 368 | - Extension: ${file.ext}
 369 | - Lines of code: ${file.lines}
 370 | - Content:
 371 | 
 372 | \`\`\`${file.ext.slice(1) || "plaintext"}
 373 | ${formatContentWithLineNumbers(file.content)}
 374 | \`\`\`
 375 | 
 376 | ---------------------------------------------------------------------------
 377 | `
 378 |     : `
 379 | ## File: ${file.name}, Path: \`${file.path}\`
 380 | \`\`\`${file.ext.slice(1) || "plaintext"}
 381 | ${formatContentWithLineNumbers(file.content)}
 382 | \`\`\``;
 383 | 
 384 | const generateMarkdownContent = (
 385 |   files: IFileInfo[],
 386 |   treeContent: string,
 387 |   compress: boolean
 388 | ): string =>
 389 |   !compress
 390 |     ? `
 391 | # Code Documentation
 392 | Generated on: ${new Date().toISOString()}
 393 | Total files: ${files.length}
 394 | 
 395 | ## Project Structure
 396 | 
 397 | \`\`\`
 398 | ${treeContent}
 399 | \`\`\`
 400 | 
 401 | ${files.map(file => generateFileSection(file)).join("\n")}
 402 | `
 403 |     : `
 404 | # Code documentation
 405 | \`\`\`
 406 | ${treeContent}
 407 | \`\`\`
 408 | ${files.map(file => generateFileSection(file, true)).join("\n")}
 409 | `;
 410 | 
 411 | const compressContent = (content: string): string =>
 412 |   content
 413 |     .split("\n")
 414 |     .map(line => line.trim())
 415 |     .filter(line => line !== "")
 416 |     .filter(line => !line.startsWith("//"))
 417 |     .join("\n");
 418 | 
 419 | async function generateFileInfo(
 420 |   filePath: string,
 421 |   stats: Stats,
 422 |   compress: boolean
 423 | ): Promise<IFileInfo> {
 424 |   const content = await fs.readFile(filePath, "utf-8");
 425 |   return {
 426 |     name: path.basename(filePath),
 427 |     path: filePath,
 428 |     content: compress ? compressContent(content) : content,
 429 |     ext: path.extname(filePath),
 430 |     size: stats.size,
 431 |     lines: content.split("\n").filter(line => line.trim() !== "").length
 432 |   };
 433 | }
 434 | 
 435 | // Main function
 436 | async function generateDocumentation(
 437 |   userConfig: Partial<IDocumentConfig> = {}
 438 | ): Promise<void> {
 439 |   try {
 440 |     const config: IDocumentConfig = { ...DEFAULT_CONFIG, ...userConfig };
 441 |     const files: IFileInfo[] = [];
 442 | 
 443 |     // Generate tree structure
 444 |     const rootNode = await createTreeNode(config.rootDir, config);
 445 |     const treeContent = rootNode
 446 |       ? renderTreeNode(rootNode).join("\n")
 447 |       : "No matching files found";
 448 | 
 449 |     for await (const filePath of walkDirectory(config.rootDir)) {
 450 |       if (!isMatchingFile(filePath, config)) {
 451 |         continue;
 452 |       }
 453 |       const stats = await fs.stat(filePath);
 454 |       if (stats.size > config.maxFileSize) {
 455 |         continue;
 456 |       }
 457 |       const fileInfo = await generateFileInfo(filePath, stats, config.compress);
 458 |       files.push(fileInfo);
 459 |     }
 460 | 
 461 |     const markdownContent = generateMarkdownContent(
 462 |       files,
 463 |       treeContent,
 464 |       config.compress
 465 |     );
 466 |     await fs.writeFile(config.outputPath, markdownContent, "utf-8");
 467 |   } catch (error) {
 468 |     console.error("Error generating documentation", error);
 469 |     throw error;
 470 |   }
 471 | }
 472 | 
 473 | if (require.main === module) {
 474 |   generateDocumentation({
 475 |     pattern: /\.ts$/,
 476 |     outputPath: "demo_compressed.md",
 477 |     ignoreHidden: true,
 478 |     excludePatterns: [
 479 |       "node_modules",
 480 |       "dist",
 481 |       "coverage",
 482 |       "**/__tests__",
 483 |       "**/*.test.ts"
 484 |     ],
 485 |     compress: true
 486 |   }).catch(console.error);
 487 |   generateDocumentation({
 488 |     pattern: /\.test.ts$/,
 489 |     outputPath: "demo_test.md",
 490 |     ignoreHidden: true,
 491 |     excludePatterns: [
 492 |       "node_modules",
 493 |       "dist",
 494 |       "coverage",
 495 |       "**/__tests__/__mocks__"
 496 |     ],
 497 |     compress: true
 498 |   }).catch(console.error);
 499 |   generateDocumentation({
 500 |     pattern: /\.md$/,
 501 |     outputPath: "demo_md.md",
 502 |     ignoreHidden: true,
 503 |     excludePatterns: ["node_modules", "dist", "coverage", "*demo*", "src"]
 504 |   }).catch(console.error);
 505 | }
 506 | 
 507 | ```
 508 | #### File: MainCICommand.ts
 509 | 
 510 | - **Path:** /root/git/codewrangler/src/cli/commands/MainCICommand.ts
 511 | - **Extension:** ts
 512 | - **Size:** 2568 bytes
 513 | - **Depth:** 3
 514 | - **Lines:** 74
 515 | 
 516 | ```ts
 517 | import { BaseCommand } from "./Command";
 518 | import { DocumentOrchestratorBuilder } from "../../orchestration/DocumentOrchestratorBuilder";
 519 | import { DocumentTreeBuilder } from "../../services/builder/DocumentTreeBuilder";
 520 | import { renderStrategyFactory } from "../../services/renderer/RenderStrategyFactory";
 521 | import { OutputFormat } from "../../utils/config/schema";
 522 | import { logger } from "../../utils/logger/Logger";
 523 | 
 524 | export class MainCICommand extends BaseCommand {
 525 |   protected override async beforeExecution(
 526 |     args: string[],
 527 |     options: Record<string, string>
 528 |   ): Promise<void> {
 529 |     await super.beforeExecution(args, options);
 530 |     this.config.set("pattern", args[0]);
 531 |     if (!this.updateOptions(options)) {
 532 |       throw new Error("Invalid configuration value");
 533 |     }
 534 |   }
 535 | 
 536 |   protected override async processExecution(): Promise<void> {
 537 |     const builder = new DocumentTreeBuilder(this.config);
 538 |     const root = await builder.build();
 539 | 
 540 |     const orchestrator = new DocumentOrchestratorBuilder()
 541 |       .setRoot(root)
 542 |       .setConfig(this.config);
 543 | 
 544 |     const outputFormat = this.config.get("outputFormat");
 545 |     const strategies = await renderStrategyFactory.createStrategies(
 546 |       this.config,
 547 |       outputFormat
 548 |     );
 549 | 
 550 |     orchestrator.setStrategies(strategies);
 551 | 
 552 |     const orchestrators = await orchestrator.buildAndExecute();
 553 | 
 554 |     logger.info(`Generated ${orchestrators.length} documents`);
 555 |   }
 556 | 
 557 |   protected override logVerbose(): void {
 558 |     super.logVerbose();
 559 |     logger.debug(
 560 |       `Searching for file matching pattern: ${this.config.get("pattern")}`
 561 |     );
 562 |     logger.debug(
 563 |       `Excluding patterns: ${(this.config.get("excludePatterns") as string[]).join(", ")}`
 564 |     );
 565 |     logger.debug(
 566 |       `Ignoring hidden files: ${this.config.get("ignoreHiddenFiles")}`
 567 |     );
 568 |     logger.debug(`Max file size: ${this.config.get("maxFileSize")} bytes`);
 569 |   }
 570 | 
 571 |   private updateOptions(options: Record<string, string>): boolean {
 572 |     try {
 573 |       this.config.set("dir", options["dir"]);
 574 |       this.config.set("codeConfigFile", options["config"]);
 575 |       this.config.set("logLevel", options["verbose"] ? "DEBUG" : "INFO");
 576 |       this.config.set(
 577 |         "outputFormat",
 578 |         options["format"] as unknown as OutputFormat[]
 579 |       );
 580 |       this.config.set("outputFile", options["output"]);
 581 |       this.config.set("ignoreHiddenFiles", options["ignoreHidden"]);
 582 |       this.config.set("additionalIgnoreFiles", options["additionalIgnore"]);
 583 |     } catch (error) {
 584 |       logger.error(`Invalid configuration value: ${error}`);
 585 |       return false;
 586 |     }
 587 |     return true;
 588 |   }
 589 | }
 590 | 
 591 | ```
 592 | #### File: types.ts
 593 | 
 594 | - **Path:** /root/git/codewrangler/src/cli/commands/types.ts
 595 | - **Extension:** ts
 596 | - **Size:** 335 bytes
 597 | - **Depth:** 3
 598 | - **Lines:** 16
 599 | 
 600 | ```ts
 601 | export interface ICommandOptions {
 602 |   dir?: string;
 603 |   output?: string;
 604 |   config?: string;
 605 |   verbose?: boolean;
 606 |   format?: string[];
 607 |   maxSize?: number;
 608 |   exclude?: string[];
 609 |   ignoreHidden?: boolean;
 610 |   additionalIgnore?: string[];
 611 | }
 612 | 
 613 | export interface ICommand {
 614 |   execute: (args: string[], options: ICommandOptions) => Promise<void>;
 615 | }
 616 | 
 617 | ```
 618 | #### File: index.ts
 619 | 
 620 | - **Path:** /root/git/codewrangler/src/cli/index.ts
 621 | - **Extension:** ts
 622 | - **Size:** 416 bytes
 623 | - **Depth:** 2
 624 | - **Lines:** 19
 625 | 
 626 | ```ts
 627 | #!/usr/bin/env node
 628 | import { CodeWrangler } from "./CodeWrangler";
 629 | import { logger } from "../utils/logger/Logger";
 630 | 
 631 | async function main(): Promise<void> {
 632 |   try {
 633 |     await CodeWrangler.run();
 634 |   } catch (error) {
 635 |     if (error instanceof Error) {
 636 |       logger.error(error.message);
 637 |     } else {
 638 |       logger.error("An unknown error occurred");
 639 |     }
 640 |     process.exit(1);
 641 |   }
 642 | }
 643 | 
 644 | main().catch(() => process.exit(1));
 645 | 
 646 | ```
 647 | ### Directory: program
 648 | 
 649 | - **Path:** /root/git/codewrangler/src/cli/program
 650 | - **Size:** 1920 bytes
 651 | - **Files:** 1
 652 | - **Total Files (including subdirectories):** 1
 653 | - **Depth:** 2
 654 | 
 655 | #### Contents:
 656 | 
 657 | #### File: ProgramBuilder.ts
 658 | 
 659 | - **Path:** /root/git/codewrangler/src/cli/program/ProgramBuilder.ts
 660 | - **Extension:** ts
 661 | - **Size:** 1920 bytes
 662 | - **Depth:** 3
 663 | - **Lines:** 76
 664 | 
 665 | ```ts
 666 | import { Command } from "commander";
 667 | 
 668 | import { Config } from "../../utils/config/Config";
 669 | 
 670 | export class ProgramBuilder {
 671 |   private program: Command;
 672 | 
 673 |   public constructor(
 674 |     private config: Config,
 675 |     private version: string
 676 |   ) {
 677 |     this.program = new Command();
 678 |   }
 679 | 
 680 |   public build(): Command {
 681 |     this.buildVersion().buildDescription().buildArguments().buildOptions();
 682 |     return this.program;
 683 |   }
 684 | 
 685 |   private buildVersion(): ProgramBuilder {
 686 |     this.program.version(this.version);
 687 |     return this;
 688 |   }
 689 | 
 690 |   private buildDescription(): ProgramBuilder {
 691 |     this.program.description("CodeWrangler is a tool for generating code");
 692 |     return this;
 693 |   }
 694 | 
 695 |   private buildArguments(): ProgramBuilder {
 696 |     this.program.argument(
 697 |       "<pattern>",
 698 |       'File pattern to match (e.g., "\\.ts$" for TypeScript files)'
 699 |     );
 700 |     return this;
 701 |   }
 702 | 
 703 |   // eslint-disable-next-line max-lines-per-function
 704 |   private buildOptions(): ProgramBuilder {
 705 |     this.program
 706 |       .option("-d, --dir <dir>", "Directory to search", this.config.get("dir"))
 707 |       .option(
 708 |         "-c, --config <config>",
 709 |         "Config file",
 710 |         this.config.get("codeConfigFile")
 711 |       )
 712 |       .option("-v, --verbose", "Verbose mode", this.config.get("logLevel"))
 713 |       .option(
 714 |         "-f, --format <format>",
 715 |         "Output format",
 716 |         this.config.get("outputFormat")
 717 |       )
 718 |       .option(
 719 |         "-o, --output <output>",
 720 |         "Output file",
 721 |         this.config.get("outputFile")
 722 |       )
 723 |       .option(
 724 |         "-e, --exclude <exclude>",
 725 |         "Exclude patterns",
 726 |         this.config.get("excludePatterns")
 727 |       )
 728 |       .option(
 729 |         "-i, --ignore-hidden",
 730 |         "Ignore hidden files",
 731 |         this.config.get("ignoreHiddenFiles")
 732 |       )
 733 |       .option(
 734 |         "-a, --additional-ignore <additional-ignore>",
 735 |         "Additional ignore patterns",
 736 |         this.config.get("additionalIgnoreFiles")
 737 |       )
 738 |     return this;
 739 |   }
 740 | }
 741 | 
 742 | ```
 743 | ### Directory: core
 744 | 
 745 | - **Path:** /root/git/codewrangler/src/core
 746 | - **Size:** 8762 bytes
 747 | - **Files:** 0
 748 | - **Total Files (including subdirectories):** 7
 749 | - **Depth:** 1
 750 | 
 751 | #### Contents:
 752 | 
 753 | ### Directory: entities
 754 | 
 755 | - **Path:** /root/git/codewrangler/src/core/entities
 756 | - **Size:** 7918 bytes
 757 | - **Files:** 3
 758 | - **Total Files (including subdirectories):** 3
 759 | - **Depth:** 2
 760 | 
 761 | #### Contents:
 762 | 
 763 | #### File: NodeBase.ts
 764 | 
 765 | - **Path:** /root/git/codewrangler/src/core/entities/NodeBase.ts
 766 | - **Extension:** ts
 767 | - **Size:** 2775 bytes
 768 | - **Depth:** 3
 769 | - **Lines:** 125
 770 | 
 771 | ```ts
 772 | import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
 773 | import { IRenderStrategy } from "../../services/renderer/RenderStrategy";
 774 | import { IFileStats, IPropsNode } from "../../types/type";
 775 | 
 776 | const defaultProps: IPropsNode = {
 777 |   name: "",
 778 |   path: "",
 779 |   deep: 0,
 780 |   size: 0, // size of the node from the children nodes
 781 |   stats: {
 782 |     size: 0, // size of the node from the file system
 783 |     created: new Date(),
 784 |     modified: new Date(),
 785 |     accessed: new Date(),
 786 |     isDirectory: false,
 787 |     isFile: false,
 788 |     permissions: {
 789 |       readable: false,
 790 |       writable: false,
 791 |       executable: false
 792 |     }
 793 |   }
 794 | };
 795 | 
 796 | export interface INodeContent {
 797 |   content: string;
 798 | }
 799 | 
 800 | interface INodeLifeCycle {
 801 |   validate: () => boolean;
 802 |   bundle: (deep: number) => Promise<void>;
 803 |   render: (strategy: IRenderStrategy) => INodeContent;
 804 |   dispose: () => void;
 805 |   clone: () => NodeBase;
 806 | }
 807 | 
 808 | export abstract class NodeBase implements INodeLifeCycle {
 809 |   protected _props: IPropsNode = { ...defaultProps };
 810 | 
 811 |   public constructor(
 812 |     _name: string,
 813 |     private originalPath: string
 814 |   ) {
 815 |     this.initNode(_name, originalPath);
 816 |     this.validate();
 817 |   }
 818 | 
 819 |   public validate(): boolean {
 820 |     if (!documentFactory.exists(this.path)) {
 821 |       throw new Error(`Path ${this.originalPath} does not exist`);
 822 |     }
 823 |     if (!documentFactory.isAbsolute(this.path)) {
 824 |       throw new Error(`Path ${this.originalPath} is not absolute`);
 825 |     }
 826 |     return true;
 827 |   }
 828 | 
 829 |   // abstract methods
 830 |   public abstract bundle(deep: number): Promise<void>;
 831 |   public abstract render(strategy: IRenderStrategy): INodeContent;
 832 | 
 833 |   // getters and setters
 834 |   // deep
 835 |   public get deep(): number {
 836 |     return this._props.deep;
 837 |   }
 838 |   public set deep(deep: number) {
 839 |     this._props.deep = deep;
 840 |   }
 841 | 
 842 |   // size
 843 |   public get size(): number {
 844 |     return this._props.size;
 845 |   }
 846 |   public set size(size: number) {
 847 |     this._props.size = size;
 848 |   }
 849 | 
 850 |   // name
 851 |   public get name(): string {
 852 |     return this._props.name;
 853 |   }
 854 |   public set name(name: string) {
 855 |     this._props.name = name;
 856 |   }
 857 | 
 858 |   // path
 859 |   public get path(): string {
 860 |     return this._props.path;
 861 |   }
 862 |   public set path(path: string) {
 863 |     this._props.path = path;
 864 |   }
 865 | 
 866 |   // stats
 867 |   public get stats(): IFileStats | undefined {
 868 |     return this._props.stats;
 869 |   }
 870 |   public set stats(stats: IFileStats | undefined) {
 871 |     this._props.stats = stats;
 872 |   }
 873 | 
 874 |   // props
 875 |   public get props(): IPropsNode {
 876 |     return {
 877 |       ...this._props
 878 |     };
 879 |   }
 880 | 
 881 |   public dispose(): void {
 882 |     this._props = { ...defaultProps };
 883 |   }
 884 | 
 885 |   public clone(): NodeBase {
 886 |     return Object.assign(Object.create(this), this);
 887 |   }
 888 | 
 889 |   private initNode(name: string, path: string): void {
 890 |     this.deep = 0;
 891 |     this.size = 0;
 892 |     this.name = name;
 893 |     this.path = documentFactory.resolve(path);
 894 |   }
 895 | }
 896 | 
 897 | ```
 898 | #### File: NodeDirectory.ts
 899 | 
 900 | - **Path:** /root/git/codewrangler/src/core/entities/NodeDirectory.ts
 901 | - **Extension:** ts
 902 | - **Size:** 3142 bytes
 903 | - **Depth:** 3
 904 | - **Lines:** 108
 905 | 
 906 | ```ts
 907 | import { INodeContent, NodeBase } from "./NodeBase";
 908 | import { NodeFile } from "./NodeFile";
 909 | import { fileStatsService } from "../../infrastructure/filesystem/FileStats";
 910 | import { IRenderStrategy } from "../../services/renderer/RenderStrategy";
 911 | import { IPropsDirectoryNode } from "../../types/type";
 912 | 
 913 | interface IPropsDirectory {
 914 |   length: number;
 915 |   deepLength: number;
 916 |   numberOfFiles: number;
 917 |   numberOfDirectories: number;
 918 | }
 919 | 
 920 | const defaultPropsDirectory: IPropsDirectory = {
 921 |   length: 0,
 922 |   deepLength: 0,
 923 |   numberOfFiles: 0,
 924 |   numberOfDirectories: 0
 925 | };
 926 | 
 927 | export abstract class NodeDirectory extends NodeBase {
 928 |   public readonly type = "directory";
 929 |   public children: (NodeFile | NodeDirectory)[] = [];
 930 |   private _propsDirectory: IPropsDirectory = { ...defaultPropsDirectory };
 931 | 
 932 |   public constructor(name: string, pathName: string) {
 933 |     super(name, pathName);
 934 |     this.initDirectory();
 935 |   }
 936 |   // getters and setters
 937 |   public get length(): number {
 938 |     return this._propsDirectory.length;
 939 |   }
 940 |   public set length(length: number) {
 941 |     this._propsDirectory.length = length;
 942 |   }
 943 |   public get deepLength(): number {
 944 |     return this._propsDirectory.deepLength;
 945 |   }
 946 |   public set deepLength(deepLength: number) {
 947 |     this._propsDirectory.deepLength = deepLength;
 948 |   }
 949 |   public get numberOfFiles(): number {
 950 |     return this._propsDirectory.numberOfFiles;
 951 |   }
 952 |   public set numberOfFiles(numberOfFiles: number) {
 953 |     this._propsDirectory.numberOfFiles = numberOfFiles;
 954 |   }
 955 |   public override get props(): IPropsDirectoryNode {
 956 |     return {
 957 |       ...super.props,
 958 |       ...this._propsDirectory
 959 |     };
 960 |   }
 961 | 
 962 |   public addChild(child: NodeFile | NodeDirectory): NodeDirectory {
 963 |     if (!(child instanceof NodeFile || child instanceof NodeDirectory)) {
 964 |       throw new Error("Invalid child type");
 965 |     }
 966 |     this.children.push(child);
 967 |     return this;
 968 |   }
 969 | 
 970 |   public async bundle(deep: number = 0): Promise<void> {
 971 |     // set the deep of the directory
 972 |     this.deep = deep;
 973 | 
 974 |     // bundle all children
 975 |     await Promise.all(this.children.map(child => child.bundle(deep + 1)));
 976 | 
 977 |     // set the length of the directory
 978 |     this.length = this.children.filter(child => child.type === "file").length;
 979 |     this.numberOfFiles =
 980 |       this.length +
 981 |       this.children
 982 |         .filter(child => child.type === "directory")
 983 |         .reduce((acc, child) => acc + child.numberOfFiles, 0);
 984 | 
 985 |     // set the deep length of the directory
 986 |     this.deepLength = this.children.reduce(
 987 |       (acc, child) =>
 988 |         acc + (child instanceof NodeDirectory ? child.deepLength + 1 : 1),
 989 |       0
 990 |     );
 991 | 
 992 |     // set the size of the directory
 993 |     this.size = this.children.reduce((acc, child) => acc + child.size, 0);
 994 | 
 995 |     // set stats
 996 |     this.stats = await fileStatsService(this.path);
 997 |   }
 998 | 
 999 |   public abstract override render(strategy: IRenderStrategy): INodeContent;
1000 | 
1001 |   private initDirectory(): void {
1002 |     this.children = [];
1003 |     this._propsDirectory = { ...defaultPropsDirectory };
1004 |   }
1005 | }
1006 | 
1007 | export class RenderableDirectory extends NodeDirectory {
1008 |   public override render(strategy: IRenderStrategy): INodeContent {
1009 |     return {
1010 |       content: strategy.renderDirectory(this)
1011 |     };
1012 |   }
1013 | }
1014 | 
1015 | ```
1016 | #### File: NodeFile.ts
1017 | 
1018 | - **Path:** /root/git/codewrangler/src/core/entities/NodeFile.ts
1019 | - **Extension:** ts
1020 | - **Size:** 2001 bytes
1021 | - **Depth:** 3
1022 | - **Lines:** 74
1023 | 
1024 | ```ts
1025 | import { INodeContent, NodeBase } from "./NodeBase";
1026 | import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
1027 | import { fileStatsService } from "../../infrastructure/filesystem/FileStats";
1028 | import { IRenderStrategy } from "../../services/renderer/RenderStrategy";
1029 | import { IPropsFileNode } from "../../types/type";
1030 | 
1031 | export abstract class NodeFile extends NodeBase {
1032 |   public readonly type = "file";
1033 |   private _extension: string = "";
1034 |   private _content: string | null = null;
1035 | 
1036 |   public constructor(name: string, pathName: string) {
1037 |     super(name, pathName);
1038 |     this.initFile(name);
1039 |   }
1040 | 
1041 |   // getters and setters
1042 |   // extension
1043 |   public get extension(): string {
1044 |     return this._extension;
1045 |   }
1046 |   protected set extension(extension: string) {
1047 |     this._extension = extension;
1048 |   }
1049 |   // content
1050 |   public get content(): string | null {
1051 |     return this._content;
1052 |   }
1053 |   protected set content(content: string | null) {
1054 |     this._content = content;
1055 |   }
1056 |   // secondary props
1057 |   public override get props(): IPropsFileNode {
1058 |     return {
1059 |       ...super.props,
1060 |       extension: this.extension
1061 |     };
1062 |   }
1063 | 
1064 |   // bundle
1065 |   public async bundle(deep: number = 0): Promise<void> {
1066 |     // set the deep of the file
1067 |     this.deep = deep;
1068 |     // set the size of the file
1069 |     this.size = await documentFactory.size(this.path);
1070 |     // set the content of the file
1071 |     this.content = await documentFactory.readFile(this.path);
1072 |     // set the stats of the file
1073 |     this.stats = await fileStatsService(this.path);
1074 |   }
1075 | 
1076 |   // render
1077 |   public abstract override render(strategy: IRenderStrategy): INodeContent;
1078 | 
1079 |   private initFile(name: string): void {
1080 |     this.extension = documentFactory.extension(name);
1081 |     this._content = null;
1082 |   }
1083 | }
1084 | 
1085 | export class RenderableFile extends NodeFile {
1086 |   // render
1087 |   public override render(strategy: IRenderStrategy): INodeContent {
1088 |     return {
1089 |       content: strategy.renderFile(this)
1090 |     };
1091 |   }
1092 | 
1093 |   // dispose
1094 |   public override dispose(): void {
1095 |     super.dispose();
1096 |   }
1097 | }
1098 | 
1099 | ```
1100 | ### Directory: __tests__
1101 | 
1102 | - **Path:** /root/git/codewrangler/src/core/entities/__tests__
1103 | - **Size:** 0 bytes
1104 | - **Files:** 0
1105 | - **Total Files (including subdirectories):** 0
1106 | - **Depth:** 3
1107 | 
1108 | #### Contents:
1109 | 
1110 | ### Directory: errors
1111 | 
1112 | - **Path:** /root/git/codewrangler/src/core/errors
1113 | - **Size:** 844 bytes
1114 | - **Files:** 4
1115 | - **Total Files (including subdirectories):** 4
1116 | - **Depth:** 2
1117 | 
1118 | #### Contents:
1119 | 
1120 | #### File: DirectoryNotFoundError.ts
1121 | 
1122 | - **Path:** /root/git/codewrangler/src/core/errors/DirectoryNotFoundError.ts
1123 | - **Extension:** ts
1124 | - **Size:** 235 bytes
1125 | - **Depth:** 3
1126 | - **Lines:** 9
1127 | 
1128 | ```ts
1129 | import { DocumentError } from "./DocumentError";
1130 | 
1131 | export class DirectoryNotFoundError extends DocumentError {
1132 |   public constructor(path: string) {
1133 |     super("Directory not found", path);
1134 |     this.name = "DirectoryNotFoundError";
1135 |   }
1136 | }
1137 | 
1138 | ```
1139 | #### File: DocumentError.ts
1140 | 
1141 | - **Path:** /root/git/codewrangler/src/core/errors/DocumentError.ts
1142 | - **Extension:** ts
1143 | - **Size:** 216 bytes
1144 | - **Depth:** 3
1145 | - **Lines:** 10
1146 | 
1147 | ```ts
1148 | export class DocumentError extends Error {
1149 |   public constructor(
1150 |     message: string,
1151 |     public readonly path: string
1152 |   ) {
1153 |     super(`Document error at ${path}: ${message}`);
1154 |     this.name = "DocumentError";
1155 |   }
1156 | }
1157 | 
1158 | ```
1159 | #### File: FileNotFoundError.ts
1160 | 
1161 | - **Path:** /root/git/codewrangler/src/core/errors/FileNotFoundError.ts
1162 | - **Extension:** ts
1163 | - **Size:** 220 bytes
1164 | - **Depth:** 3
1165 | - **Lines:** 9
1166 | 
1167 | ```ts
1168 | import { DocumentError } from "./DocumentError";
1169 | 
1170 | export class FileNotFoundError extends DocumentError {
1171 |   public constructor(path: string) {
1172 |     super("File not found", path);
1173 |     this.name = "FileNotFoundError";
1174 |   }
1175 | }
1176 | 
1177 | ```
1178 | ### Directory: __tests__
1179 | 
1180 | - **Path:** /root/git/codewrangler/src/core/errors/__tests__
1181 | - **Size:** 0 bytes
1182 | - **Files:** 0
1183 | - **Total Files (including subdirectories):** 0
1184 | - **Depth:** 3
1185 | 
1186 | #### Contents:
1187 | 
1188 | #### File: index.ts
1189 | 
1190 | - **Path:** /root/git/codewrangler/src/core/errors/index.ts
1191 | - **Extension:** ts
1192 | - **Size:** 173 bytes
1193 | - **Depth:** 3
1194 | - **Lines:** 4
1195 | 
1196 | ```ts
1197 | export { DocumentError } from "./DocumentError";
1198 | export { DirectoryNotFoundError } from "./DirectoryNotFoundError";
1199 | export { FileNotFoundError } from "./FileNotFoundError";
1200 | 
1201 | ```
1202 | ### Directory: infrastructure
1203 | 
1204 | - **Path:** /root/git/codewrangler/src/infrastructure
1205 | - **Size:** 19273 bytes
1206 | - **Files:** 0
1207 | - **Total Files (including subdirectories):** 5
1208 | - **Depth:** 1
1209 | 
1210 | #### Contents:
1211 | 
1212 | ### Directory: filesystem
1213 | 
1214 | - **Path:** /root/git/codewrangler/src/infrastructure/filesystem
1215 | - **Size:** 13662 bytes
1216 | - **Files:** 3
1217 | - **Total Files (including subdirectories):** 3
1218 | - **Depth:** 2
1219 | 
1220 | #### Contents:
1221 | 
1222 | #### File: DocumentFactory.ts
1223 | 
1224 | - **Path:** /root/git/codewrangler/src/infrastructure/filesystem/DocumentFactory.ts
1225 | - **Extension:** ts
1226 | - **Size:** 10107 bytes
1227 | - **Depth:** 3
1228 | - **Lines:** 350
1229 | 
1230 | ```ts
1231 | import { ObjectEncodingOptions } from "fs";
1232 | import * as fsSync from "fs";
1233 | import * as fs from "fs/promises";
1234 | import * as path from "path";
1235 | 
1236 | import { fileStatsService } from "./FileStats";
1237 | import { DocumentError, FileNotFoundError } from "../../core/errors";
1238 | import {
1239 |   FILE_TYPE,
1240 |   FileType,
1241 |   IDirectoryOptions,
1242 |   IReadOptions,
1243 |   IWriteOptions
1244 | } from "../../types/type";
1245 | 
1246 | export const documentFactory = {
1247 |   /**
1248 |    * Gets the type of a file system entry
1249 |    * @param filePath - The path to check
1250 |    * @returns The type of the file system entry (File or Directory)
1251 |    * @throws {FileNotFoundError} If the path doesn't exist
1252 |    * @throws {DocumentError} For other file system errors
1253 |    */
1254 |   async type(filePath: string): Promise<FileType> {
1255 |     try {
1256 |       const stats = await fs.stat(filePath);
1257 |       return stats.isDirectory() ? FILE_TYPE.Directory : FILE_TYPE.File;
1258 |     } catch (error) {
1259 |       if ((error as NodeJS.ErrnoException).code === "ENOENT") {
1260 |         throw new FileNotFoundError(filePath);
1261 |       }
1262 |       throw new DocumentError(String(error), filePath);
1263 |     }
1264 |   },
1265 | 
1266 |   /**
1267 |    * Gets file size in bytes
1268 |    * @param filePath - The path to the file
1269 |    * @returns The size of the file in bytes
1270 |    * @throws {FileNotFoundError} If the file doesn't exist
1271 |    * @throws {DocumentError} For other file system errors or if path is a directory
1272 |    */
1273 |   async size(filePath: string): Promise<number> {
1274 |     const isDirectory = (await this.type(filePath)) === FILE_TYPE.Directory;
1275 |     if (isDirectory) {
1276 |       throw new DocumentError("Path is a directory", filePath);
1277 |     }
1278 |     const stats = await fileStatsService(filePath);
1279 |     return stats.size;
1280 |   },
1281 | 
1282 |   /**
1283 |    * Resolves a path to an absolute path
1284 |    * @param filePath - The path to resolve
1285 |    * @returns The absolute path
1286 |    */
1287 |   resolve(filePath: string): string {
1288 |     return path.resolve(filePath);
1289 |   },
1290 | 
1291 |   /**
1292 |    * Checks various access flags for a path
1293 |    * @private
1294 |    * @param filePath - The path to check access for
1295 |    * @returns An object containing readable, writable, and executable permission flags
1296 |    */
1297 |   async checkAccess(filePath: string): Promise<{
1298 |     readable: boolean;
1299 |     writable: boolean;
1300 |     executable: boolean;
1301 |   }> {
1302 |     const check = async (mode: number): Promise<boolean> => {
1303 |       try {
1304 |         await fs.access(filePath, mode);
1305 |         return true;
1306 |       } catch {
1307 |         return false;
1308 |       }
1309 |     };
1310 | 
1311 |     return {
1312 |       readable: await check(fs.constants.R_OK),
1313 |       writable: await check(fs.constants.W_OK),
1314 |       executable: await check(fs.constants.X_OK)
1315 |     };
1316 |   },
1317 | 
1318 |   /**
1319 |    * Reads the entire contents of a file synchronously
1320 |    * @param filePath - The path to the file
1321 |    * @param options - The options for the read operation
1322 |    * @returns The contents of the file as a string
1323 |    * @throws {Error} If the file cannot be read
1324 |    */
1325 |   readFileSync(filePath: string, options: IReadOptions = {}): string {
1326 |     return fsSync.readFileSync(filePath, {
1327 |       encoding: options.encoding ?? "utf-8",
1328 |       flag: options.flag
1329 |     });
1330 |   },
1331 | 
1332 |   /**
1333 |    * Reads the entire contents of a file
1334 |    * @param filePath - The path to the file
1335 |    * @param options - The options for the read operation
1336 |    * @returns The contents of the file as a string
1337 |    * @throws {FileNotFoundError} If the file doesn't exist
1338 |    * @throws {DocumentError} For other file system errors
1339 |    */
1340 |   async readFile(
1341 |     filePath: string,
1342 |     options: IReadOptions = {}
1343 |   ): Promise<string> {
1344 |     try {
1345 |       return await fs.readFile(filePath, {
1346 |         encoding: options.encoding ?? "utf-8",
1347 |         flag: options.flag
1348 |       });
1349 |     } catch (error) {
1350 |       if ((error as NodeJS.ErrnoException).code === "ENOENT") {
1351 |         throw new FileNotFoundError(filePath);
1352 |       }
1353 |       throw new DocumentError(String(error), filePath);
1354 |     }
1355 |   },
1356 | 
1357 |   /**
1358 |    * Writes data to a file, replacing the file if it already exists
1359 |    * @param filePath - The path to the file
1360 |    * @param data - The data to write
1361 |    * @param options - The options for the write operation
1362 |    * @throws {DocumentError} For file system errors
1363 |    */
1364 |   async writeFile(
1365 |     filePath: string,
1366 |     data: string | Buffer,
1367 |     options: IWriteOptions = {}
1368 |   ): Promise<void> {
1369 |     try {
1370 |       // Ensure parent directory exists
1371 |       const parentDir = path.dirname(filePath);
1372 |       await fs.mkdir(parentDir, { recursive: true });
1373 | 
1374 |       // Write the file
1375 |       await fs.writeFile(filePath, data, {
1376 |         encoding: options.encoding ?? "utf-8",
1377 |         mode: options.mode,
1378 |         flag: options.flag
1379 |       });
1380 |     } catch (error) {
1381 |       if (error instanceof DocumentError) {
1382 |         throw error;
1383 |       }
1384 |       throw new DocumentError(String(error), filePath);
1385 |     }
1386 |   },
1387 | 
1388 |   /**
1389 |    * Appends data to a file
1390 |    * @param filePath - The path to the file
1391 |    * @param content - The content to append
1392 |    * @param options - The options for the write operation
1393 |    * @throws {DocumentError} For file system errors
1394 |    */
1395 |   async appendFile(
1396 |     filePath: string,
1397 |     content: string,
1398 |     options: IWriteOptions = {}
1399 |   ): Promise<void> {
1400 |     try {
1401 |       await fs.appendFile(filePath, content, {
1402 |         encoding: options.encoding ?? "utf-8",
1403 |         mode: options.mode,
1404 |         flag: options.flag
1405 |       });
1406 |     } catch (error) {
1407 |       throw new DocumentError(String(error), filePath);
1408 |     }
1409 |   },
1410 | 
1411 |   /**
1412 |    * Reads the contents of a directory
1413 |    * @param dirPath - The path to the directory
1414 |    * @param options - The options for the read operation
1415 |    * @returns An array of file and directory names in the directory
1416 |    * @throws {Error} If the directory cannot be read
1417 |    */
1418 |   async readDir(
1419 |     dirPath: string,
1420 |     options?: { withFileTypes?: boolean }
1421 |   ): Promise<string[]> {
1422 |     return await fs.readdir(dirPath, options as ObjectEncodingOptions);
1423 |   },
1424 | 
1425 |   /**
1426 |    * Creates a directory if it doesn't exist
1427 |    * @param dirPath - The path where to create the directory
1428 |    * @param recursive - Whether to create parent directories if they don't exist
1429 |    * @throws {DocumentError} For file system errors
1430 |    */
1431 |   async createDir(dirPath: string, recursive = true): Promise<void> {
1432 |     await fs.mkdir(dirPath, { recursive });
1433 |   },
1434 | 
1435 |   /**
1436 |    * Gets the base name of a file
1437 |    * @param filePath - The path to the file
1438 |    * @returns The base name of the file (last portion of the path)
1439 |    */
1440 |   baseName(filePath: string): string {
1441 |     return path.basename(filePath);
1442 |   },
1443 | 
1444 |   /**
1445 |    * Gets the extension of a file
1446 |    * @param filePath - The path to the file
1447 |    * @returns The extension of the file including the dot (e.g., '.txt')
1448 |    */
1449 |   extension(filePath: string): string {
1450 |     return path.extname(filePath);
1451 |   },
1452 | 
1453 |   /**
1454 |    * Checks if a file or directory exists
1455 |    * @param filePath - The path to check
1456 |    * @returns True if the file or directory exists, false otherwise
1457 |    */
1458 |   exists(filePath: string): boolean {
1459 |     try {
1460 |       fsSync.accessSync(filePath);
1461 |       return true;
1462 |     } catch {
1463 |       return false;
1464 |     }
1465 |   },
1466 | 
1467 |   /**
1468 |    * Checks if a path is absolute
1469 |    * @param filePath - The path to check
1470 |    * @returns True if the path is absolute, false otherwise
1471 |    */
1472 |   isAbsolute(filePath: string): boolean {
1473 |     return path.isAbsolute(filePath);
1474 |   },
1475 | 
1476 |   /**
1477 |    * Gets directory contents with type information
1478 |    * @param dirPath - The path to the directory
1479 |    * @returns An array of objects containing name and type information for each entry
1480 |    * @throws {DocumentError} If path is not a directory or other errors occur
1481 |    */
1482 |   async readDirectory(
1483 |     dirPath: string
1484 |   ): Promise<Array<{ name: string; type: FileType }>> {
1485 |     try {
1486 |       const entries = await fs.readdir(dirPath, { withFileTypes: true });
1487 |       return entries.map(entry => ({
1488 |         name: entry.name,
1489 |         type: entry.isDirectory() ? FILE_TYPE.Directory : FILE_TYPE.File
1490 |       }));
1491 |     } catch (error) {
1492 |       throw new DocumentError(String(error), dirPath);
1493 |     }
1494 |   },
1495 | 
1496 |   /**
1497 |    * Creates a directory if it doesn't exist
1498 |    * @param dirPath - The path where to create the directory
1499 |    * @param options - Options for directory creation including recursive and mode
1500 |    * @throws {DocumentError} For file system errors
1501 |    */
1502 |   async ensureDirectory(
1503 |     dirPath: string,
1504 |     options: IDirectoryOptions = {}
1505 |   ): Promise<void> {
1506 |     try {
1507 |       if (!this.exists(dirPath)) {
1508 |         await fs.mkdir(dirPath, {
1509 |           recursive: options.recursive ?? true,
1510 |           mode: options.mode
1511 |         });
1512 |       }
1513 |     } catch (error) {
1514 |       throw new DocumentError(String(error), dirPath);
1515 |     }
1516 |   },
1517 | 
1518 |   /**
1519 |    * Removes a file or directory
1520 |    * @param filePath - The path to remove
1521 |    * @throws {DocumentError} For file system errors
1522 |    */
1523 |   async remove(filePath: string): Promise<void> {
1524 |     const stats = await fs.stat(filePath);
1525 |     if (stats.isDirectory()) {
1526 |       await fs.rm(filePath, { recursive: true, force: true });
1527 |     } else {
1528 |       await fs.unlink(filePath);
1529 |     }
1530 |   },
1531 | 
1532 |   /**
1533 |    * Copies a file or directory
1534 |    * @param src - The source path
1535 |    * @param dest - The destination path
1536 |    * @throws {DocumentError} For file system errors
1537 |    */
1538 |   async copy(src: string, dest: string): Promise<void> {
1539 |     const stats = await fs.stat(src);
1540 | 
1541 |     if (stats.isDirectory()) {
1542 |       await this.copyDir(src, dest);
1543 |     } else {
1544 |       await fs.copyFile(src, dest);
1545 |     }
1546 |   },
1547 | 
1548 |   /**
1549 |    * Copies a directory recursively
1550 |    * @private
1551 |    * @param src - The source directory path
1552 |    * @param dest - The destination directory path
1553 |    * @throws {DocumentError} For file system errors
1554 |    */
1555 |   async copyDir(src: string, dest: string): Promise<void> {
1556 |     await this.ensureDirectory(dest);
1557 |     const entries = await fs.readdir(src, { withFileTypes: true });
1558 | 
1559 |     for (const entry of entries) {
1560 |       const srcPath = path.join(src, entry.name);
1561 |       const destPath = path.join(dest, entry.name);
1562 | 
1563 |       if (entry.isDirectory()) {
1564 |         await this.copyDir(srcPath, destPath);
1565 |       } else {
1566 |         await fs.copyFile(srcPath, destPath);
1567 |       }
1568 |     }
1569 |   },
1570 | 
1571 |   /**
1572 |    * Joins an array of paths into a single path
1573 |    * @param paths - The paths to join
1574 |    * @returns The joined path
1575 |    */
1576 |   join(...paths: string[]): string {
1577 |     return path.join(...paths);
1578 |   }
1579 | };
1580 | 
1581 | ```
1582 | #### File: FileStats.ts
1583 | 
1584 | - **Path:** /root/git/codewrangler/src/infrastructure/filesystem/FileStats.ts
1585 | - **Extension:** ts
1586 | - **Size:** 1987 bytes
1587 | - **Depth:** 3
1588 | - **Lines:** 72
1589 | 
1590 | ```ts
1591 | import { Stats } from "fs";
1592 | import fs from "fs/promises";
1593 | 
1594 | import { DocumentError } from "../../core/errors/DocumentError";
1595 | import { FileNotFoundError } from "../../core/errors/FileNotFoundError";
1596 | import { IAccessFlags, IFileStats } from "../../types/type";
1597 | 
1598 | class FileStatsService {
1599 |   public async getStats(filePath: string): Promise<IFileStats> {
1600 |     const stats = await this.getBasicStats(filePath);
1601 |     const accessFlags = await this.checkAccess(filePath);
1602 |     return this.mapStatsToFileInfo(stats, accessFlags);
1603 |   }
1604 |   private async getBasicStats(filePath: string): Promise<Stats> {
1605 |     try {
1606 |       return await fs.stat(filePath);
1607 |     } catch (error) {
1608 |       this.handleStatError(error as NodeJS.ErrnoException, filePath);
1609 |       throw error; // TypeScript requires this
1610 |     }
1611 |   }
1612 | 
1613 |   private handleStatError(
1614 |     error: NodeJS.ErrnoException,
1615 |     filePath: string
1616 |   ): never {
1617 |     if (error.code === "ENOENT") {
1618 |       throw new FileNotFoundError(filePath);
1619 |     }
1620 |     throw new DocumentError(String(error), filePath);
1621 |   }
1622 | 
1623 |   private async checkAccess(filePath: string): Promise<IAccessFlags> {
1624 |     const check = async (mode: number): Promise<boolean> => {
1625 |       try {
1626 |         await fs.access(filePath, mode);
1627 |         return true;
1628 |       } catch {
1629 |         return false;
1630 |       }
1631 |     };
1632 | 
1633 |     return {
1634 |       readable: await check(fs.constants.R_OK),
1635 |       writable: await check(fs.constants.W_OK),
1636 |       executable: await check(fs.constants.X_OK)
1637 |     };
1638 |   }
1639 | 
1640 |   private mapStatsToFileInfo(
1641 |     stats: Stats,
1642 |     accessFlags: IAccessFlags
1643 |   ): IFileStats {
1644 |     return {
1645 |       size: stats.size,
1646 |       created: stats.birthtime,
1647 |       modified: stats.mtime,
1648 |       accessed: stats.atime,
1649 |       isDirectory: stats.isDirectory(),
1650 |       isFile: stats.isFile(),
1651 |       permissions: accessFlags
1652 |     };
1653 |   }
1654 | }
1655 | 
1656 | export const fileStatsService = async (
1657 |   filePath: string
1658 | ): Promise<IFileStats> => {
1659 |   const fileStatsService = new FileStatsService();
1660 |   return await fileStatsService.getStats(filePath);
1661 | };
1662 | 
1663 | ```
1664 | #### File: JsonReader.ts
1665 | 
1666 | - **Path:** /root/git/codewrangler/src/infrastructure/filesystem/JsonReader.ts
1667 | - **Extension:** ts
1668 | - **Size:** 1568 bytes
1669 | - **Depth:** 3
1670 | - **Lines:** 52
1671 | 
1672 | ```ts
1673 | import fs from "fs/promises";
1674 | 
1675 | import { documentFactory } from "./DocumentFactory";
1676 | import { DocumentError } from "../../core/errors/DocumentError";
1677 | import { FileNotFoundError } from "../../core/errors/FileNotFoundError";
1678 | 
1679 | export class JsonReader {
1680 |   public async readJsonSync(filePath: string): Promise<object> {
1681 |     try {
1682 |       const absolutePath = this.validatePath(filePath);
1683 |       const content = await this.readFileContent(absolutePath, filePath);
1684 |       return this.parseJsonContent(content, filePath);
1685 |     } catch (error) {
1686 |       if (error instanceof DocumentError) {
1687 |         throw error;
1688 |       }
1689 |       throw new DocumentError(String(error), filePath);
1690 |     }
1691 |   }
1692 |   private validatePath(filePath: string): string {
1693 |     const absolutePath = documentFactory.resolve(filePath);
1694 |     if (!documentFactory.exists(absolutePath)) {
1695 |       throw new FileNotFoundError(filePath);
1696 |     }
1697 |     return absolutePath;
1698 |   }
1699 | 
1700 |   private async readFileContent(
1701 |     absolutePath: string,
1702 |     filePath: string
1703 |   ): Promise<string> {
1704 |     const content = await fs.readFile(absolutePath, "utf-8");
1705 |     if (!content) {
1706 |       throw new DocumentError(`File is empty`, filePath);
1707 |     }
1708 |     return content;
1709 |   }
1710 | 
1711 |   private parseJsonContent(content: string, filePath: string): object {
1712 |     try {
1713 |       return JSON.parse(content);
1714 |     } catch (error) {
1715 |       throw new DocumentError(`Invalid JSON: ${String(error)}`, filePath);
1716 |     }
1717 |   }
1718 | }
1719 | 
1720 | export const jsonReader = async (path: string): Promise<object> => {
1721 |   const jsonReader = new JsonReader();
1722 |   return await jsonReader.readJsonSync(path);
1723 | };
1724 | 
1725 | ```
1726 | ### Directory: __tests__
1727 | 
1728 | - **Path:** /root/git/codewrangler/src/infrastructure/filesystem/__tests__
1729 | - **Size:** 0 bytes
1730 | - **Files:** 0
1731 | - **Total Files (including subdirectories):** 0
1732 | - **Depth:** 3
1733 | 
1734 | #### Contents:
1735 | 
1736 | ### Directory: __mocks__
1737 | 
1738 | - **Path:** /root/git/codewrangler/src/infrastructure/filesystem/__tests__/__mocks__
1739 | - **Size:** 0 bytes
1740 | - **Files:** 0
1741 | - **Total Files (including subdirectories):** 0
1742 | - **Depth:** 4
1743 | 
1744 | #### Contents:
1745 | 
1746 | ### Directory: templates
1747 | 
1748 | - **Path:** /root/git/codewrangler/src/infrastructure/templates
1749 | - **Size:** 5611 bytes
1750 | - **Files:** 2
1751 | - **Total Files (including subdirectories):** 2
1752 | - **Depth:** 2
1753 | 
1754 | #### Contents:
1755 | 
1756 | #### File: TemplateEngine.ts
1757 | 
1758 | - **Path:** /root/git/codewrangler/src/infrastructure/templates/TemplateEngine.ts
1759 | - **Extension:** ts
1760 | - **Size:** 4399 bytes
1761 | - **Depth:** 3
1762 | - **Lines:** 158
1763 | 
1764 | ```ts
1765 | import { ZodObject, z } from "zod";
1766 | 
1767 | import { TemplateType } from "../../types/template";
1768 | import { Config } from "../../utils/config";
1769 | import { logger } from "../../utils/logger";
1770 | import { documentFactory } from "../filesystem/DocumentFactory";
1771 | 
1772 | type TemplateValue = z.ZodType<string | number | boolean | undefined>;
1773 | 
1774 | export class Template<
1775 |   T extends Record<string, TemplateValue> = Record<string, TemplateValue>
1776 | > {
1777 |   private _content: string = "";
1778 |   private schema: ZodObject<T>;
1779 | 
1780 |   public constructor(
1781 |     private type: TemplateType,
1782 |     schema: ZodObject<T>
1783 |   ) {
1784 |     // convert all fields to optional
1785 |     const optionalFields = Object.fromEntries(
1786 |       Object.entries(schema.shape).map(([key, value]) => [
1787 |         key,
1788 |         value.optional()
1789 |       ])
1790 |     );
1791 |     this.schema = schema.extend(optionalFields) as unknown as ZodObject<T>;
1792 |   }
1793 | 
1794 |   public async load(
1795 |     path: string,
1796 |     additionalFields?: Record<string, z.ZodSchema<string>>
1797 |   ): Promise<void> {
1798 |     this._content = await documentFactory.readFile(path);
1799 |     if (additionalFields) {
1800 |       this.schema = this.schema.extend(additionalFields) as ZodObject<T>;
1801 |     }
1802 |     this.validate();
1803 |   }
1804 | 
1805 |   public static getTemplateDir(config: Config): string {
1806 |     const dir = documentFactory.join(
1807 |       config.get("rootDir") as string,
1808 |       config.get("templatesDir") as string
1809 |     );
1810 |     if (!documentFactory.exists(dir)) {
1811 |       throw new Error(`Templates directory not found: ${dir}`);
1812 |     }
1813 |     return dir;
1814 |   }
1815 | 
1816 |   public get content(): string {
1817 |     if (!this._content) {
1818 |       throw new Error(`Template content is not loaded for ${this.type}`);
1819 |     }
1820 |     return this._content;
1821 |   }
1822 | 
1823 |   public static async create<T extends Record<string, TemplateValue>>(
1824 |     type: TemplateType,
1825 |     schema: ZodObject<T>,
1826 |     path: string,
1827 |     additionalFields?: Record<string, z.ZodSchema<string>>
1828 |   ): Promise<Template<T>> {
1829 |     const template = new Template(type, schema);
1830 |     await template.load(path, additionalFields);
1831 |     return template;
1832 |   }
1833 | 
1834 |   public render(data: Record<string, string | number | boolean>): string {
1835 |     try {
1836 |       this.validateData(data);
1837 |       return this.replaceTokens(data);
1838 |     } catch (error) {
1839 |       if (error instanceof Error) {
1840 |         console.error(error);
1841 |         throw new Error(`Template content validation failed for ${this.type}`);
1842 |       }
1843 |       throw error;
1844 |     }
1845 |   }
1846 | 
1847 |   public dispose(): void {
1848 |     this._content = "";
1849 |   }
1850 | 
1851 |   private validateData(data: Record<string, string | number | boolean>): void {
1852 |     this.schema.parse(data);
1853 |     this.validateRequiredTokens(data);
1854 |   }
1855 | 
1856 |   private validateRequiredTokens(
1857 |     data: Record<string, string | number | boolean>
1858 |   ): void {
1859 |     const contentTokens = this.getTemplateTokens();
1860 |     const missingTokens = this.findMissingRequiredTokens(contentTokens, data);
1861 | 
1862 |     if (missingTokens.length > 0) {
1863 |       throw new Error(
1864 |         `Missing required values for tokens: ${missingTokens.join(", ")}`
1865 |       );
1866 |     }
1867 |   }
1868 | 
1869 |   private findMissingRequiredTokens(
1870 |     tokens: string[],
1871 |     data: Record<string, string | number | boolean>
1872 |   ): string[] {
1873 |     return tokens.filter(token => {
1874 |       const isRequired = this.schema.shape[token]?.isOptional() === false;
1875 |       return isRequired && !(token in data);
1876 |     });
1877 |   }
1878 | 
1879 |   private getTemplateTokens(): string[] {
1880 |     const tokenRegex = /\{\{(\w+)\}\}/g;
1881 |     const tokens: string[] = [];
1882 |     let match;
1883 | 
1884 |     while ((match = tokenRegex.exec(this.content)) !== null) {
1885 |       const token = match[1];
1886 |       if (token === undefined) {
1887 |         throw new Error(`Invalid template content for ${this.type}`);
1888 |       }
1889 |       tokens.push(token);
1890 |     }
1891 | 
1892 |     return tokens;
1893 |   }
1894 | 
1895 |   private replaceTokens(
1896 |     data: Record<string, string | number | boolean>
1897 |   ): string {
1898 |     const contentTokens = this.getTemplateTokens();
1899 |     const pattern = new RegExp(`\\{\\{(${contentTokens.join("|")})\\}\\}`, "g");
1900 | 
1901 |     return this.content.replace(pattern, (_, key) =>
1902 |       key in data ? String(data[key]) : `{{${key}}}`
1903 |     );
1904 |   }
1905 | 
1906 |   private validate(): void {
1907 |     const tokens = this.getTemplateTokens();
1908 |     const requiredFields = Object.keys(this.schema.shape);
1909 |     const missingRequired = requiredFields.filter(
1910 |       field => !tokens.includes(field)
1911 |     );
1912 | 
1913 |     if (missingRequired.length > 0) {
1914 |       logger.warn(
1915 |         `Missing required tokens in ${this.type} template: ${missingRequired.join(
1916 |           ", "
1917 |         )}`
1918 |       );
1919 |     }
1920 |   }
1921 | }
1922 | 
1923 | ```
1924 | ### Directory: __tests__
1925 | 
1926 | - **Path:** /root/git/codewrangler/src/infrastructure/templates/__tests__
1927 | - **Size:** 0 bytes
1928 | - **Files:** 0
1929 | - **Total Files (including subdirectories):** 0
1930 | - **Depth:** 3
1931 | 
1932 | #### Contents:
1933 | 
1934 | #### File: zod.ts
1935 | 
1936 | - **Path:** /root/git/codewrangler/src/infrastructure/templates/zod.ts
1937 | - **Extension:** ts
1938 | - **Size:** 1212 bytes
1939 | - **Depth:** 3
1940 | - **Lines:** 42
1941 | 
1942 | ```ts
1943 | import { z } from "zod";
1944 | 
1945 | export const baseTemplateSchema = z.object({
1946 |   PROJECT_NAME: z.string(),
1947 |   GENERATION_DATE: z.string().datetime(),
1948 |   DIRECTORY_STRUCTURE: z.string(),
1949 |   TOTAL_SIZE: z.number(),
1950 |   TOTAL_FILES: z.number(),
1951 |   TOTAL_DIRECTORIES: z.number(),
1952 |   CONTENT: z.string()
1953 | });
1954 | 
1955 | export type BaseTemplate = z.infer<typeof baseTemplateSchema>;
1956 | export type BaseTemplateString = keyof BaseTemplate;
1957 | 
1958 | export const fileTemplateSchema = z.object({
1959 |   FILE_NAME: z.string(),
1960 |   FILE_EXTENSION: z.string(),
1961 |   FILE_SIZE: z.number(),
1962 |   FILE_DEPTH: z.number(),
1963 |   FILE_LINES: z.number(),
1964 |   FILE_PATH: z.string(),
1965 |   FILE_CONTENTS: z.string()
1966 | });
1967 | 
1968 | export type FileTemplate = z.infer<typeof fileTemplateSchema>;
1969 | export type FileTemplateString = keyof FileTemplate;
1970 | 
1971 | export const directoryTemplateSchema = z.object({
1972 |   DIRECTORY_NAME: z.string(),
1973 |   DIRECTORY_PATH: z.string(),
1974 |   DIRECTORY_SIZE: z.number(),
1975 |   DIRECTORY_LENGTH: z.number(),
1976 |   DIRECTORY_DEEP_LENGTH: z.number(),
1977 |   DIRECTORY_DEPTH: z.number(),
1978 |   DIRECTORY_NUMBER_OF_FILES: z.number(),
1979 |   DIRECTORY_CONTENT: z.string()
1980 | });
1981 | 
1982 | export type DirectoryTemplate = z.infer<typeof directoryTemplateSchema>;
1983 | export type DirectoryTemplateString = keyof DirectoryTemplate;
1984 | 
1985 | ```
1986 | ### Directory: orchestration
1987 | 
1988 | - **Path:** /root/git/codewrangler/src/orchestration
1989 | - **Size:** 5232 bytes
1990 | - **Files:** 3
1991 | - **Total Files (including subdirectories):** 6
1992 | - **Depth:** 1
1993 | 
1994 | #### Contents:
1995 | 
1996 | #### File: DocumentOrchestrator.ts
1997 | 
1998 | - **Path:** /root/git/codewrangler/src/orchestration/DocumentOrchestrator.ts
1999 | - **Extension:** ts
2000 | - **Size:** 2826 bytes
2001 | - **Depth:** 2
2002 | - **Lines:** 94
2003 | 
2004 | ```ts
2005 | import { IDocumentOrchestrator } from "./interfaces/IDocumentOrchestrator";
2006 | import { NodeDirectory } from "../core/entities/NodeDirectory";
2007 | import { NodeFile } from "../core/entities/NodeFile";
2008 | import { documentFactory } from "../infrastructure/filesystem/DocumentFactory";
2009 | import { IRenderStrategy } from "../services/renderer/RenderStrategy";
2010 | import { Config } from "../utils/config/Config";
2011 | import { OUTPUT_FORMATS, OutputFormat } from "../utils/config/schema";
2012 | import { logger } from "../utils/logger/Logger";
2013 | 
2014 | export class DocumentOrchestrator implements IDocumentOrchestrator {
2015 |   private strategy: IRenderStrategy | null = null;
2016 | 
2017 |   private constructor(
2018 |     private readonly root: NodeDirectory | NodeFile,
2019 |     private readonly config: Config
2020 |   ) {}
2021 | 
2022 |   public static create(
2023 |     root: NodeDirectory | NodeFile,
2024 |     config: Config
2025 |   ): DocumentOrchestrator {
2026 |     const orchestrator = new DocumentOrchestrator(root, config);
2027 |     orchestrator.initialize();
2028 |     return orchestrator;
2029 |   }
2030 | 
2031 |   public setStrategy(strategy: IRenderStrategy): this {
2032 |     this.strategy = strategy;
2033 |     return this;
2034 |   }
2035 | 
2036 |   public async build(): Promise<void> {
2037 |     try {
2038 |       if (!this.strategy) {
2039 |         throw new Error("Strategy is not set");
2040 |       }
2041 | 
2042 |       const content = this.strategy.render(this.root as NodeDirectory);
2043 |       const outputFormat = this.strategy.getName();
2044 |       const outputPath = this.resolveOutputPath(outputFormat);
2045 |       await this.ensureOutputDirectory(outputPath);
2046 |       await this.writeOutput(outputPath, content);
2047 | 
2048 |       logger.success(`Document built successfully at ${outputPath}`);
2049 |     } catch (error) {
2050 |       logger.error("Failed to build document", error as Error);
2051 |       throw error;
2052 |     }
2053 |   }
2054 | 
2055 |   public getStrategyName(): string {
2056 |     return this.strategy?.getName() ?? "Unknown";
2057 |   }
2058 | 
2059 |   public dispose(): void {
2060 |     this.strategy?.dispose();
2061 |   }
2062 | 
2063 |   private initialize(): void {
2064 |     this.validateStructure();
2065 |   }
2066 | 
2067 |   private validateStructure(): void {
2068 |     if (!(this.root.type == "directory") && !(this.root.type == "file")) {
2069 |       throw new Error("Invalid root node type");
2070 |     }
2071 |   }
2072 | 
2073 |   private resolveOutputPath(outputFormat: OutputFormat): string {
2074 |     const outputFile = this.config.get("outputFile");
2075 |     return documentFactory.resolve(
2076 |       `${outputFile}.${OUTPUT_FORMATS[outputFormat]}`
2077 |     );
2078 |   }
2079 | 
2080 |   private async ensureOutputDirectory(outputPath: string): Promise<void> {
2081 |     const directory = documentFactory.baseName(outputPath);
2082 |     if (
2083 |       outputPath.endsWith(`.${OUTPUT_FORMATS.html}`) ||
2084 |       outputPath.endsWith(`.${OUTPUT_FORMATS.markdown}`)
2085 |     ) {
2086 |       return;
2087 |     }
2088 |     await documentFactory.ensureDirectory(directory);
2089 |   }
2090 | 
2091 |   private async writeOutput(
2092 |     outputPath: string,
2093 |     content: string
2094 |   ): Promise<void> {
2095 |     await documentFactory.writeFile(outputPath, content);
2096 |   }
2097 | }
2098 | 
2099 | ```
2100 | #### File: DocumentOrchestratorBuilder.ts
2101 | 
2102 | - **Path:** /root/git/codewrangler/src/orchestration/DocumentOrchestratorBuilder.ts
2103 | - **Extension:** ts
2104 | - **Size:** 2018 bytes
2105 | - **Depth:** 2
2106 | - **Lines:** 72
2107 | 
2108 | ```ts
2109 | import { DocumentOrchestrator } from "./DocumentOrchestrator";
2110 | import { NodeDirectory } from "../core/entities/NodeDirectory";
2111 | import { NodeFile } from "../core/entities/NodeFile";
2112 | import { IRenderStrategy } from "../services/renderer/RenderStrategy";
2113 | import { Config } from "../utils/config/Config";
2114 | import { logger } from "../utils/logger/Logger";
2115 | 
2116 | export class DocumentOrchestratorBuilder {
2117 |   private root: NodeDirectory | NodeFile | null = null;
2118 |   private config: Config | null = null;
2119 |   private strategies: IRenderStrategy[] = [];
2120 | 
2121 |   public setRoot(root: NodeDirectory | NodeFile): this {
2122 |     this.root = root;
2123 |     return this;
2124 |   }
2125 | 
2126 |   public setConfig(config: Config): this {
2127 |     this.config = config;
2128 |     return this;
2129 |   }
2130 | 
2131 |   public addStrategy(strategy: IRenderStrategy): this {
2132 |     this.strategies.push(strategy);
2133 |     return this;
2134 |   }
2135 | 
2136 |   public setStrategies(strategies: IRenderStrategy[]): this {
2137 |     this.strategies = strategies;
2138 |     return this;
2139 |   }
2140 | 
2141 |   public async build(): Promise<DocumentOrchestrator[]> {
2142 |     if (!this.root || !this.config) {
2143 |       throw new Error("Missing required components for DocumentOrchestrator");
2144 |     }
2145 | 
2146 |     if (this.strategies.length === 0) {
2147 |       throw new Error("At least one render strategy is required");
2148 |     }
2149 | 
2150 |     const orchestrators: DocumentOrchestrator[] = [];
2151 | 
2152 |     for (const strategy of this.strategies) {
2153 |       const orchestrator = await DocumentOrchestrator.create(
2154 |         this.root,
2155 |         this.config
2156 |       );
2157 |       orchestrator.setStrategy(strategy);
2158 |       orchestrators.push(orchestrator);
2159 |     }
2160 | 
2161 |     return orchestrators;
2162 |   }
2163 |   public async buildAndExecute(): Promise<DocumentOrchestrator[]> {
2164 |     const orchestrators = await this.build();
2165 | 
2166 |     for (const orchestrator of orchestrators) {
2167 |       try {
2168 |         await orchestrator.build();
2169 |       } catch (error) {
2170 |         logger.error(
2171 |           `Failed to build documentation with strategy ${orchestrator.getStrategyName()}`,
2172 |           error as Error
2173 |         );
2174 |       }
2175 |     }
2176 | 
2177 |     return orchestrators;
2178 |   }
2179 | }
2180 | 
2181 | ```
2182 | #### File: index.ts
2183 | 
2184 | - **Path:** /root/git/codewrangler/src/orchestration/index.ts
2185 | - **Extension:** ts
2186 | - **Size:** 0 bytes
2187 | - **Depth:** 2
2188 | - **Lines:** 1
2189 | 
2190 | ```ts
2191 | 
2192 | ```
2193 | ### Directory: interfaces
2194 | 
2195 | - **Path:** /root/git/codewrangler/src/orchestration/interfaces
2196 | - **Size:** 388 bytes
2197 | - **Files:** 3
2198 | - **Total Files (including subdirectories):** 3
2199 | - **Depth:** 2
2200 | 
2201 | #### Contents:
2202 | 
2203 | #### File: IDocumentMetadata.ts
2204 | 
2205 | - **Path:** /root/git/codewrangler/src/orchestration/interfaces/IDocumentMetadata.ts
2206 | - **Extension:** ts
2207 | - **Size:** 132 bytes
2208 | - **Depth:** 3
2209 | - **Lines:** 8
2210 | 
2211 | ```ts
2212 | export interface IDocumentMetadata {
2213 |   title: string;
2214 |   description: string;
2215 |   author: string;
2216 |   date: string;
2217 |   version: string;
2218 | }
2219 | 
2220 | ```
2221 | #### File: IDocumentOrchestrator.ts
2222 | 
2223 | - **Path:** /root/git/codewrangler/src/orchestration/interfaces/IDocumentOrchestrator.ts
2224 | - **Extension:** ts
2225 | - **Size:** 256 bytes
2226 | - **Depth:** 3
2227 | - **Lines:** 9
2228 | 
2229 | ```ts
2230 | import { IRenderStrategy } from "../../services/renderer/RenderStrategy";
2231 | 
2232 | export interface IDocumentOrchestrator {
2233 |   setStrategy: (strategy: IRenderStrategy) => this;
2234 |   getStrategyName: () => string;
2235 |   build: () => Promise<void>;
2236 |   dispose: () => void;
2237 | }
2238 | 
2239 | ```
2240 | #### File: index.ts
2241 | 
2242 | - **Path:** /root/git/codewrangler/src/orchestration/interfaces/index.ts
2243 | - **Extension:** ts
2244 | - **Size:** 0 bytes
2245 | - **Depth:** 3
2246 | - **Lines:** 1
2247 | 
2248 | ```ts
2249 | 
2250 | ```
2251 | ### Directory: services
2252 | 
2253 | - **Path:** /root/git/codewrangler/src/services
2254 | - **Size:** 14713 bytes
2255 | - **Files:** 0
2256 | - **Total Files (including subdirectories):** 8
2257 | - **Depth:** 1
2258 | 
2259 | #### Contents:
2260 | 
2261 | ### Directory: builder
2262 | 
2263 | - **Path:** /root/git/codewrangler/src/services/builder
2264 | - **Size:** 5920 bytes
2265 | - **Files:** 3
2266 | - **Total Files (including subdirectories):** 3
2267 | - **Depth:** 2
2268 | 
2269 | #### Contents:
2270 | 
2271 | #### File: DocumentTreeBuilder.ts
2272 | 
2273 | - **Path:** /root/git/codewrangler/src/services/builder/DocumentTreeBuilder.ts
2274 | - **Extension:** ts
2275 | - **Size:** 1814 bytes
2276 | - **Depth:** 3
2277 | - **Lines:** 59
2278 | 
2279 | ```ts
2280 | import { INodeTree, NodeTreeBuilder } from "./NodeTreeBuilder";
2281 | import { RenderableDirectory } from "../../core/entities/NodeDirectory";
2282 | import { RenderableFile } from "../../core/entities/NodeFile";
2283 | import { FILE_TYPE } from "../../types/type";
2284 | import { Config } from "../../utils/config";
2285 | import { logger } from "../../utils/logger";
2286 | 
2287 | export class DocumentTreeBuilder {
2288 |   private root: RenderableDirectory | RenderableFile | undefined;
2289 |   private builder: NodeTreeBuilder;
2290 |   public constructor(config: Config) {
2291 |     this.builder = new NodeTreeBuilder(config);
2292 |   }
2293 | 
2294 |   public async build(): Promise<RenderableDirectory | RenderableFile> {
2295 |     try {
2296 |       // Build file tree structure
2297 |       const fileTree = await this.builder.build();
2298 | 
2299 |       // Convert file tree to Document tree
2300 |       this.root = await this.createDocumentStructure(fileTree);
2301 | 
2302 |       // Initialize the entire document tree
2303 |       await this.root.bundle();
2304 | 
2305 |       if (!this.root) {
2306 |         throw new Error("No files found matching the specified pattern");
2307 |       }
2308 | 
2309 |       logger.info("Document tree built successfully");
2310 | 
2311 |       return this.root;
2312 |     } catch (error) {
2313 |       logger.error("Error building document tree", error as Error);
2314 |       throw error;
2315 |     }
2316 |   }
2317 | 
2318 |   private async createDocumentStructure(
2319 |     node: INodeTree
2320 |   ): Promise<RenderableDirectory | RenderableFile> {
2321 |     if (node.type === FILE_TYPE.Directory) {
2322 |       const directory = new RenderableDirectory(node.name, node.path);
2323 | 
2324 |       if (node.children) {
2325 |         // Recursively create children
2326 |         for (const child of node.children) {
2327 |           const childDocument = await this.createDocumentStructure(child);
2328 |           directory.addChild(childDocument);
2329 |         }
2330 |       }
2331 | 
2332 |       return directory;
2333 |     } else {
2334 |       return new RenderableFile(node.name, node.path);
2335 |     }
2336 |   }
2337 | }
2338 | 
2339 | ```
2340 | #### File: FileHidden.ts
2341 | 
2342 | - **Path:** /root/git/codewrangler/src/services/builder/FileHidden.ts
2343 | - **Extension:** ts
2344 | - **Size:** 893 bytes
2345 | - **Depth:** 3
2346 | - **Lines:** 33
2347 | 
2348 | ```ts
2349 | import { minimatch } from "minimatch";
2350 | 
2351 | import { Config } from "../../utils/config";
2352 | 
2353 | export default class FileHidden {
2354 |   private ignoreHiddenFiles: boolean;
2355 |   private patterns: string[];
2356 |   private additionalIgnoreFiles: string[];
2357 | 
2358 |   public constructor(config: Config) {
2359 |     this.ignoreHiddenFiles = config.get("ignoreHiddenFiles") as boolean;
2360 |     this.patterns = [...config.get("excludePatterns")];
2361 |     this.additionalIgnoreFiles = config.get("additionalIgnoreFiles");
2362 |   }
2363 | 
2364 |   public shouldExclude(fileName: string): boolean {
2365 |     if (this.ignoreHiddenFiles && fileName.startsWith(".")) {
2366 |       return true;
2367 |     }
2368 | 
2369 |     if (this.patterns.some(pattern => minimatch(fileName, pattern))) {
2370 |       return true;
2371 |     }
2372 | 
2373 |     if (this.additionalIgnoreFiles.some(file => minimatch(fileName, file))) {
2374 |       // Additional ignore files are always excluded
2375 |       return true;
2376 |     }
2377 | 
2378 |     return false;
2379 |   }
2380 | }
2381 | 
2382 | ```
2383 | #### File: NodeTreeBuilder.ts
2384 | 
2385 | - **Path:** /root/git/codewrangler/src/services/builder/NodeTreeBuilder.ts
2386 | - **Extension:** ts
2387 | - **Size:** 3213 bytes
2388 | - **Depth:** 3
2389 | - **Lines:** 119
2390 | 
2391 | ```ts
2392 | import FileHidden from "./FileHidden";
2393 | import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
2394 | import { fileStatsService } from "../../infrastructure/filesystem/FileStats";
2395 | import { FILE_TYPE, FileType } from "../../types/type";
2396 | import { Config, ConfigOptions } from "../../utils/config";
2397 | 
2398 | export interface INodeTree {
2399 |   name: string;
2400 |   path: string;
2401 |   type: FileType;
2402 |   children?: INodeTree[];
2403 | }
2404 | 
2405 | export interface INodeTreeBuilderOptions
2406 |   extends Pick<
2407 |     ConfigOptions,
2408 |     | "additionalIgnoreFiles"
2409 |     | "maxDepth"
2410 |     | "excludePatterns"
2411 |     | "dir"
2412 |     | "followSymlinks"
2413 |   > {
2414 |   pattern: RegExp;
2415 |   returnType: "paths" | "details";
2416 | }
2417 | 
2418 | export class NodeTreeBuilder {
2419 |   private config: Config;
2420 |   private options: INodeTreeBuilderOptions;
2421 |   private fileHidden: FileHidden;
2422 | 
2423 |   public constructor(config: Config) {
2424 |     this.config = config;
2425 |     this.options = this.initializeOptions();
2426 |     this.fileHidden = new FileHidden(config);
2427 |   }
2428 | 
2429 |   public async build(): Promise<INodeTree> {
2430 |     const rootDir = this.options.dir;
2431 |     if (!documentFactory.exists(rootDir)) {
2432 |       throw new Error(`Directory ${rootDir} does not exist`);
2433 |     }
2434 |     return await this.buildTree(rootDir);
2435 |   }
2436 | 
2437 |   private initializeOptions(): INodeTreeBuilderOptions {
2438 |     return {
2439 |       dir: this.config.get("dir"),
2440 |       pattern: new RegExp(this.config.get("pattern")),
2441 |       maxDepth: this.config.get("maxDepth"),
2442 |       excludePatterns: this.config.get("excludePatterns"),
2443 |       additionalIgnoreFiles: this.config.get("additionalIgnoreFiles"),
2444 |       returnType: "details",
2445 |       followSymlinks: false
2446 |     };
2447 |   }
2448 | 
2449 |   private async createNode(nodePath: string): Promise<INodeTree> {
2450 |     const stats = await fileStatsService(nodePath);
2451 |     const name = documentFactory.baseName(nodePath);
2452 | 
2453 |     return {
2454 |       name,
2455 |       path: nodePath,
2456 |       type: stats.isDirectory ? FILE_TYPE.Directory : FILE_TYPE.File
2457 |     };
2458 |   }
2459 | 
2460 |   private shouldProcessChildren(node: INodeTree, depth: number): boolean {
2461 |     const isDirectory = node.type === FILE_TYPE.Directory;
2462 |     const withinDepthLimit =
2463 |       !this.options.maxDepth || depth < this.options.maxDepth;
2464 |     return isDirectory && withinDepthLimit;
2465 |   }
2466 | 
2467 |   private async processChildren(
2468 |     nodePath: string,
2469 |     depth: number
2470 |   ): Promise<INodeTree[]> {
2471 |     const entries = await documentFactory.readDir(nodePath);
2472 |     const children: INodeTree[] = [];
2473 | 
2474 |     for (const entry of entries) {
2475 |       const childNode = await this.processChild(nodePath, entry, depth);
2476 |       if (childNode) {
2477 |         children.push(childNode);
2478 |       }
2479 |     }
2480 | 
2481 |     return children;
2482 |   }
2483 | 
2484 |   private async processChild(
2485 |     parentPath: string,
2486 |     entry: string,
2487 |     depth: number
2488 |   ): Promise<INodeTree | null> {
2489 |     if (this.fileHidden.shouldExclude(entry)) {
2490 |       return null;
2491 |     }
2492 | 
2493 |     const childPath = documentFactory.join(parentPath, entry);
2494 |     return await this.buildTree(childPath, depth + 1);
2495 |   }
2496 | 
2497 |   private async buildTree(
2498 |     nodePath: string,
2499 |     depth: number = 0
2500 |   ): Promise<INodeTree> {
2501 |     const node = await this.createNode(nodePath);
2502 | 
2503 |     if (this.shouldProcessChildren(node, depth)) {
2504 |       node.children = await this.processChildren(nodePath, depth);
2505 |     }
2506 | 
2507 |     return node;
2508 |   }
2509 | }
2510 | 
2511 | ```
2512 | ### Directory: __tests__
2513 | 
2514 | - **Path:** /root/git/codewrangler/src/services/builder/__tests__
2515 | - **Size:** 0 bytes
2516 | - **Files:** 0
2517 | - **Total Files (including subdirectories):** 0
2518 | - **Depth:** 3
2519 | 
2520 | #### Contents:
2521 | 
2522 | ### Directory: renderer
2523 | 
2524 | - **Path:** /root/git/codewrangler/src/services/renderer
2525 | - **Size:** 8793 bytes
2526 | - **Files:** 3
2527 | - **Total Files (including subdirectories):** 5
2528 | - **Depth:** 2
2529 | 
2530 | #### Contents:
2531 | 
2532 | #### File: RenderStrategy.ts
2533 | 
2534 | - **Path:** /root/git/codewrangler/src/services/renderer/RenderStrategy.ts
2535 | - **Extension:** ts
2536 | - **Size:** 3388 bytes
2537 | - **Depth:** 3
2538 | - **Lines:** 109
2539 | 
2540 | ```ts
2541 | import { NodeDirectory } from "../../core/entities/NodeDirectory";
2542 | import { NodeFile } from "../../core/entities/NodeFile";
2543 | import { Template } from "../../infrastructure/templates/TemplateEngine";
2544 | import {
2545 |   BaseTemplate,
2546 |   DirectoryTemplate,
2547 |   FileTemplate
2548 | } from "../../infrastructure/templates/zod";
2549 | import { Config, OutputFormat } from "../../utils/config";
2550 | 
2551 | interface IContentRenderer {
2552 |   renderFile: (file: NodeFile) => string;
2553 |   renderDirectory: (directory: NodeDirectory) => string;
2554 | }
2555 | 
2556 | interface IDocumentRenderer {
2557 |   render: (rootDirectory: NodeDirectory) => string;
2558 |   dispose: () => void;
2559 | }
2560 | 
2561 | export interface IRenderStrategy extends IContentRenderer, IDocumentRenderer {
2562 |   getName: () => OutputFormat;
2563 | }
2564 | 
2565 | export abstract class RenderBaseStrategy implements IRenderStrategy {
2566 |   protected templatePage: Template;
2567 |   protected templateDirectory: Template;
2568 |   protected templateFile: Template;
2569 | 
2570 |   protected constructor(
2571 |     private readonly config: Config,
2572 |     public readonly name: OutputFormat,
2573 |     templatePage: Template,
2574 |     templateDirectory: Template,
2575 |     templateFile: Template
2576 |   ) {
2577 |     this.templatePage = templatePage;
2578 |     this.templateDirectory = templateDirectory;
2579 |     this.templateFile = templateFile;
2580 |   }
2581 | 
2582 |   public getName(): OutputFormat {
2583 |     return this.name;
2584 |   }
2585 | 
2586 |   public renderFile(file: NodeFile): string {
2587 |     return this.templateFile.render({
2588 |       FILE_NAME: file.name,
2589 |       FILE_EXTENSION: file.extension.replace(".", ""),
2590 |       FILE_SIZE: file.size,
2591 |       FILE_DEPTH: file.deep,
2592 |       FILE_LINES: file.content?.split("\n").length || 0,
2593 |       FILE_PATH: file.path,
2594 |       FILE_CONTENTS: file.content || ""
2595 |     } as FileTemplate & Record<string, string>);
2596 |   }
2597 | 
2598 |   public renderDirectory(directory: NodeDirectory): string {
2599 |     const content = this.renderChildren(directory.children);
2600 | 
2601 |     return this.templateDirectory.render({
2602 |       DIRECTORY_NAME: directory.name,
2603 |       DIRECTORY_PATH: directory.path,
2604 |       DIRECTORY_SIZE: directory.size,
2605 |       DIRECTORY_LENGTH: directory.length,
2606 |       DIRECTORY_NUMBER_OF_FILES: directory.numberOfFiles,
2607 |       DIRECTORY_DEEP_LENGTH: directory.deepLength,
2608 |       DIRECTORY_DEPTH: directory.deep,
2609 |       DIRECTORY_CONTENT: content
2610 |     } as DirectoryTemplate & Record<string, string>);
2611 |   }
2612 | 
2613 |   public render(rootDirectory: NodeDirectory | NodeFile): string {
2614 |     const rootContent = this.renderNode(rootDirectory);
2615 | 
2616 |     const templateConfig = {
2617 |       PROJECT_NAME:
2618 |         this.config.get("projectName") || rootDirectory.name || "Project",
2619 |       GENERATION_DATE: new Date().toISOString(),
2620 |       TOTAL_SIZE: rootDirectory.size,
2621 |       CONTENT: rootContent
2622 |     } as BaseTemplate & Record<string, string>;
2623 | 
2624 |     if (rootDirectory.type === "directory") {
2625 |       templateConfig["TOTAL_FILES"] = rootDirectory.length;
2626 |       templateConfig["TOTAL_DIRECTORIES"] = rootDirectory.deepLength;
2627 |     }
2628 | 
2629 |     return this.templatePage.render(templateConfig);
2630 |   }
2631 | 
2632 |   public dispose(): void {
2633 |     this.templatePage.dispose();
2634 |     this.templateDirectory.dispose();
2635 |     this.templateFile.dispose();
2636 |   }
2637 | 
2638 |   protected renderNode(node: NodeFile | NodeDirectory): string {
2639 |     return node.type === "file"
2640 |       ? this.renderFile(node)
2641 |       : this.renderDirectory(node);
2642 |   }
2643 | 
2644 |   protected renderChildren(children: (NodeFile | NodeDirectory)[]): string {
2645 |     if (!children) return "";
2646 |     return children.map(child => this.renderNode(child)).join("");
2647 |   }
2648 | }
2649 | 
2650 | ```
2651 | #### File: RenderStrategyBuilder.ts
2652 | 
2653 | - **Path:** /root/git/codewrangler/src/services/renderer/RenderStrategyBuilder.ts
2654 | - **Extension:** ts
2655 | - **Size:** 3112 bytes
2656 | - **Depth:** 3
2657 | - **Lines:** 105
2658 | 
2659 | ```ts
2660 | import { RenderBaseStrategy } from "./RenderStrategy";
2661 | import { RenderHTMLStrategy } from "./strategies/HTMLStrategy";
2662 | import { RenderMarkdownStrategy } from "./strategies/MarkdownStrategy";
2663 | import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
2664 | import { Template } from "../../infrastructure/templates/TemplateEngine";
2665 | import {
2666 |   baseTemplateSchema,
2667 |   directoryTemplateSchema,
2668 |   fileTemplateSchema
2669 | } from "../../infrastructure/templates/zod";
2670 | import { Config, OutputFormatExtension } from "../../utils/config";
2671 | 
2672 | export class RenderStrategyBuilder {
2673 |   private config: Config | null = null;
2674 |   private extension: OutputFormatExtension | null = null;
2675 |   private name: string | null = null;
2676 |   private templatePage: Template | null = null;
2677 |   private templateDirectory: Template | null = null;
2678 |   private templateFile: Template | null = null;
2679 | 
2680 |   public setConfig(config: Config): RenderStrategyBuilder {
2681 |     this.config = config;
2682 |     return this;
2683 |   }
2684 | 
2685 |   public setExtension(extension: OutputFormatExtension): RenderStrategyBuilder {
2686 |     this.extension = extension;
2687 |     return this;
2688 |   }
2689 | 
2690 |   public setName(name: string): RenderStrategyBuilder {
2691 |     this.name = name;
2692 |     return this;
2693 |   }
2694 | 
2695 |   public async loadTemplates(): Promise<RenderStrategyBuilder> {
2696 |     if (!this.config) {
2697 |       throw new Error("Config is required");
2698 |     }
2699 | 
2700 |     const templateDir = Template.getTemplateDir(this.config);
2701 | 
2702 |     this.templatePage = await this.loadTemplatePage(templateDir);
2703 |     this.templateDirectory = await this.loadTemplateDirectory(templateDir);
2704 |     this.templateFile = await this.loadTemplateFile(templateDir);
2705 | 
2706 |     return this;
2707 |   }
2708 | 
2709 |   public build(): RenderBaseStrategy {
2710 |     this.validate();
2711 | 
2712 |     const concreteRenderStrategy =
2713 |       this.name === "Markdown" ? RenderMarkdownStrategy : RenderHTMLStrategy;
2714 | 
2715 |     return new concreteRenderStrategy(
2716 |       this.config as Config,
2717 |       this.templatePage as Template,
2718 |       this.templateDirectory as Template,
2719 |       this.templateFile as Template
2720 |     );
2721 |   }
2722 | 
2723 |   private validate(): boolean {
2724 |     if (!this.config) {
2725 |       throw new Error("Config is required");
2726 |     }
2727 |     if (!this.extension) {
2728 |       throw new Error("Extension is required");
2729 |     }
2730 |     if (!this.name) {
2731 |       throw new Error("Name is required");
2732 |     }
2733 |     if (!this.templatePage || !this.templateDirectory || !this.templateFile) {
2734 |       throw new Error("Templates must be loaded before building");
2735 |     }
2736 | 
2737 |     return true;
2738 |   }
2739 | 
2740 |   private loadTemplateFile(templateDir: string): Promise<Template> {
2741 |     return Template.create(
2742 |       "file",
2743 |       fileTemplateSchema,
2744 |       documentFactory.join(templateDir, `file.${this.extension}`)
2745 |     );
2746 |   }
2747 | 
2748 |   private loadTemplateDirectory(templateDir: string): Promise<Template> {
2749 |     return Template.create(
2750 |       "directory",
2751 |       directoryTemplateSchema,
2752 |       documentFactory.join(templateDir, `directory.${this.extension}`)
2753 |     );
2754 |   }
2755 | 
2756 |   private loadTemplatePage(templateDir: string): Promise<Template> {
2757 |     return Template.create(
2758 |       "page",
2759 |       baseTemplateSchema,
2760 |       documentFactory.join(templateDir, `page.${this.extension}`)
2761 |     );
2762 |   }
2763 | }
2764 | 
2765 | ```
2766 | #### File: RenderStrategyFactory.ts
2767 | 
2768 | - **Path:** /root/git/codewrangler/src/services/renderer/RenderStrategyFactory.ts
2769 | - **Extension:** ts
2770 | - **Size:** 1367 bytes
2771 | - **Depth:** 3
2772 | - **Lines:** 47
2773 | 
2774 | ```ts
2775 | import { RenderBaseStrategy } from "./RenderStrategy";
2776 | import { RenderStrategyBuilder } from "./RenderStrategyBuilder";
2777 | import { Config } from "../../utils/config/Config";
2778 | import { OutputFormat } from "../../utils/config/schema";
2779 | 
2780 | // Factory function for common render strategies
2781 | export const renderStrategyFactory = {
2782 |   async createMarkdownStrategy(config: Config): Promise<RenderBaseStrategy> {
2783 |     return await new RenderStrategyBuilder()
2784 |       .setConfig(config)
2785 |       .setExtension("md")
2786 |       .setName("Markdown")
2787 |       .loadTemplates()
2788 |       .then(builder => builder.build());
2789 |   },
2790 | 
2791 |   async createHTMLStrategy(config: Config): Promise<RenderBaseStrategy> {
2792 |     return await new RenderStrategyBuilder()
2793 |       .setConfig(config)
2794 |       .setExtension("html")
2795 |       .setName("HTML")
2796 |       .loadTemplates()
2797 |       .then(builder => builder.build());
2798 |   },
2799 | 
2800 |   async createStrategies(
2801 |     config: Config,
2802 |     formats: OutputFormat[]
2803 |   ): Promise<RenderBaseStrategy[]> {
2804 |     return await Promise.all(
2805 |       formats.map(format => this.createStrategy(config, format))
2806 |     );
2807 |   },
2808 | 
2809 |   async createStrategy(
2810 |     config: Config,
2811 |     format: OutputFormat
2812 |   ): Promise<RenderBaseStrategy> {
2813 |     switch (format) {
2814 |       case "markdown":
2815 |         return await this.createMarkdownStrategy(config);
2816 |       case "html":
2817 |         return await this.createHTMLStrategy(config);
2818 |     }
2819 |   }
2820 | };
2821 | 
2822 | ```
2823 | ### Directory: __tests__
2824 | 
2825 | - **Path:** /root/git/codewrangler/src/services/renderer/__tests__
2826 | - **Size:** 0 bytes
2827 | - **Files:** 0
2828 | - **Total Files (including subdirectories):** 0
2829 | - **Depth:** 3
2830 | 
2831 | #### Contents:
2832 | 
2833 | ### Directory: strategies
2834 | 
2835 | - **Path:** /root/git/codewrangler/src/services/renderer/strategies
2836 | - **Size:** 926 bytes
2837 | - **Files:** 2
2838 | - **Total Files (including subdirectories):** 2
2839 | - **Depth:** 3
2840 | 
2841 | #### Contents:
2842 | 
2843 | #### File: HTMLStrategy.ts
2844 | 
2845 | - **Path:** /root/git/codewrangler/src/services/renderer/strategies/HTMLStrategy.ts
2846 | - **Extension:** ts
2847 | - **Size:** 459 bytes
2848 | - **Depth:** 4
2849 | - **Lines:** 15
2850 | 
2851 | ```ts
2852 | import { Template } from "../../../infrastructure/templates/TemplateEngine";
2853 | import { Config } from "../../../utils/config";
2854 | import { RenderBaseStrategy } from "../RenderStrategy";
2855 | 
2856 | export class RenderHTMLStrategy extends RenderBaseStrategy {
2857 |   public constructor(
2858 |     config: Config,
2859 |     templatePage: Template,
2860 |     templateDirectory: Template,
2861 |     templateFile: Template
2862 |   ) {
2863 |     super(config, "html", templatePage, templateDirectory, templateFile);
2864 |   }
2865 | }
2866 | 
2867 | ```
2868 | #### File: MarkdownStrategy.ts
2869 | 
2870 | - **Path:** /root/git/codewrangler/src/services/renderer/strategies/MarkdownStrategy.ts
2871 | - **Extension:** ts
2872 | - **Size:** 467 bytes
2873 | - **Depth:** 4
2874 | - **Lines:** 15
2875 | 
2876 | ```ts
2877 | import { Template } from "../../../infrastructure/templates/TemplateEngine";
2878 | import { Config } from "../../../utils/config";
2879 | import { RenderBaseStrategy } from "../RenderStrategy";
2880 | 
2881 | export class RenderMarkdownStrategy extends RenderBaseStrategy {
2882 |   public constructor(
2883 |     config: Config,
2884 |     templatePage: Template,
2885 |     templateDirectory: Template,
2886 |     templateFile: Template
2887 |   ) {
2888 |     super(config, "markdown", templatePage, templateDirectory, templateFile);
2889 |   }
2890 | }
2891 | 
2892 | ```
2893 | ### Directory: types
2894 | 
2895 | - **Path:** /root/git/codewrangler/src/types
2896 | - **Size:** 1314 bytes
2897 | - **Files:** 2
2898 | - **Total Files (including subdirectories):** 2
2899 | - **Depth:** 1
2900 | 
2901 | #### Contents:
2902 | 
2903 | #### File: template.ts
2904 | 
2905 | - **Path:** /root/git/codewrangler/src/types/template.ts
2906 | - **Extension:** ts
2907 | - **Size:** 229 bytes
2908 | - **Depth:** 2
2909 | - **Lines:** 10
2910 | 
2911 | ```ts
2912 | import { z } from "zod";
2913 | 
2914 | export type TemplateType = "page" | "file" | "directory";
2915 | 
2916 | export interface ITemplateContent<T> {
2917 |   content: string;
2918 |   schema: z.ZodSchema<T>;
2919 |   additionalFields?: Record<string, z.ZodSchema<string>>;
2920 | }
2921 | 
2922 | ```
2923 | #### File: type.ts
2924 | 
2925 | - **Path:** /root/git/codewrangler/src/types/type.ts
2926 | - **Extension:** ts
2927 | - **Size:** 1085 bytes
2928 | - **Depth:** 2
2929 | - **Lines:** 62
2930 | 
2931 | ```ts
2932 | export const FILE_TYPE = {
2933 |   File: "file",
2934 |   Directory: "directory"
2935 | } as const;
2936 | 
2937 | export type FileType = (typeof FILE_TYPE)[keyof typeof FILE_TYPE];
2938 | 
2939 | export interface IAccessFlags {
2940 |   readable: boolean;
2941 |   writable: boolean;
2942 |   executable: boolean;
2943 | }
2944 | 
2945 | export interface IFileStats {
2946 |   size: number;
2947 |   created: Date;
2948 |   modified: Date;
2949 |   accessed: Date;
2950 |   isDirectory: boolean;
2951 |   isFile: boolean;
2952 |   permissions: IAccessFlags;
2953 | }
2954 | 
2955 | export interface IReadOptions {
2956 |   encoding?: BufferEncoding;
2957 |   flag?: string;
2958 | }
2959 | 
2960 | export interface IWriteOptions extends IReadOptions {
2961 |   mode?: number;
2962 |   flag?: string;
2963 | }
2964 | 
2965 | export interface IDirectoryOptions {
2966 |   recursive?: boolean;
2967 |   mode?: number;
2968 | }
2969 | 
2970 | export interface IFileTreeItem {
2971 |   path: string;
2972 |   type: FileType;
2973 |   stats?: IFileStats;
2974 | }
2975 | 
2976 | export interface IPropsNode {
2977 |   name: string;
2978 |   path: string;
2979 |   deep: number;
2980 |   size: number;
2981 |   extension?: string;
2982 |   stats?: IFileStats;
2983 | }
2984 | 
2985 | export interface IPropsDirectoryNode extends IPropsNode {
2986 |   deepLength: number;
2987 |   length: number;
2988 | }
2989 | 
2990 | export interface IPropsFileNode extends IPropsNode {
2991 |   extension: string;
2992 | }
2993 | 
2994 | ```
2995 | ### Directory: utils
2996 | 
2997 | - **Path:** /root/git/codewrangler/src/utils
2998 | - **Size:** 8927 bytes
2999 | - **Files:** 0
3000 | - **Total Files (including subdirectories):** 6
3001 | - **Depth:** 1
3002 | 
3003 | #### Contents:
3004 | 
3005 | ### Directory: config
3006 | 
3007 | - **Path:** /root/git/codewrangler/src/utils/config
3008 | - **Size:** 5239 bytes
3009 | - **Files:** 3
3010 | - **Total Files (including subdirectories):** 3
3011 | - **Depth:** 2
3012 | 
3013 | #### Contents:
3014 | 
3015 | #### File: Config.ts
3016 | 
3017 | - **Path:** /root/git/codewrangler/src/utils/config/Config.ts
3018 | - **Extension:** ts
3019 | - **Size:** 2649 bytes
3020 | - **Depth:** 3
3021 | - **Lines:** 96
3022 | 
3023 | ```ts
3024 | import { z } from "zod";
3025 | 
3026 | import {
3027 |   ConfigKeys,
3028 |   ConfigOptions,
3029 |   DEFAULT_CONFIG,
3030 |   configSchema
3031 | } from "./schema";
3032 | import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
3033 | import { JsonReader } from "../../infrastructure/filesystem/JsonReader";
3034 | import { logger } from "../logger/Logger";
3035 | 
3036 | export class Config {
3037 |   private static instance: Config | undefined;
3038 |   private config: ConfigOptions;
3039 |   private jsonReader: JsonReader;
3040 | 
3041 |   private constructor() {
3042 |     this.jsonReader = new JsonReader();
3043 |     this.config = configSchema.parse(DEFAULT_CONFIG);
3044 |     logger.setConfig(this);
3045 |   }
3046 | 
3047 |   public static async load(): Promise<Config> {
3048 |     if (!Config.instance) {
3049 |       Config.instance = new Config();
3050 |       await Config.instance.loadUserConfig();
3051 |     }
3052 |     return Config.instance;
3053 |   }
3054 | 
3055 |   public get<T extends ConfigKeys>(key: T): ConfigOptions[T] {
3056 |     return this.config[key] as ConfigOptions[T];
3057 |   }
3058 | 
3059 |   public set(
3060 |     key: keyof ConfigOptions,
3061 |     value: ConfigOptions[keyof ConfigOptions] | undefined
3062 |   ): void {
3063 |     if (value === undefined) {
3064 |       return;
3065 |     }
3066 |     const updatedConfig = { ...this.config, [key]: value };
3067 |     try {
3068 |       configSchema.parse(updatedConfig);
3069 |       this.config = updatedConfig;
3070 |     } catch (error) {
3071 |       if (error instanceof z.ZodError) {
3072 |         logger.error(`Invalid configuration value: ${error.errors}`);
3073 |       }
3074 |       throw error;
3075 |     }
3076 |   }
3077 |   public getAll(): ConfigOptions {
3078 |     return this.config;
3079 |   }
3080 |   public reset(): void {
3081 |     this.config = DEFAULT_CONFIG;
3082 |   }
3083 |   public static destroy(): void {
3084 |     Config.instance = undefined;
3085 |   }
3086 |   public override(config: Partial<ConfigOptions>): void {
3087 |     const newOverrideConfig = { ...this.config, ...config };
3088 |     try {
3089 |       configSchema.parse(newOverrideConfig);
3090 |       this.config = newOverrideConfig;
3091 |     } catch (error) {
3092 |       if (error instanceof z.ZodError) {
3093 |         logger.error(`Invalid configuration value: ${error.errors}`);
3094 |       }
3095 |       throw error;
3096 |     }
3097 |   }
3098 | 
3099 |   private async loadUserConfig(): Promise<void> {
3100 |     try {
3101 |       const configPath = documentFactory.resolve(this.config.codeConfigFile);
3102 |       const userConfig = await this.jsonReader.readJsonSync(configPath);
3103 |       this.config = configSchema.parse({ ...this.config, ...userConfig });
3104 |     } catch (error) {
3105 |       this.handleConfigError(error);
3106 |     }
3107 |   }
3108 | 
3109 |   private handleConfigError(error: unknown): void {
3110 |     if (error instanceof z.ZodError) {
3111 |       const details = error.errors
3112 |         .map(err => `${err.path.join(".")}: ${err.message}`)
3113 |         .join(", ");
3114 |       throw new Error(`Configuration validation failed: ${details}`);
3115 |     }
3116 |     throw error;
3117 |   }
3118 | }
3119 | 
3120 | ```
3121 | ### Directory: __tests__
3122 | 
3123 | - **Path:** /root/git/codewrangler/src/utils/config/__tests__
3124 | - **Size:** 0 bytes
3125 | - **Files:** 0
3126 | - **Total Files (including subdirectories):** 0
3127 | - **Depth:** 3
3128 | 
3129 | #### Contents:
3130 | 
3131 | #### File: index.ts
3132 | 
3133 | - **Path:** /root/git/codewrangler/src/utils/config/index.ts
3134 | - **Extension:** ts
3135 | - **Size:** 52 bytes
3136 | - **Depth:** 3
3137 | - **Lines:** 3
3138 | 
3139 | ```ts
3140 | export * from "./Config";
3141 | export * from "./schema";
3142 | 
3143 | ```
3144 | #### File: schema.ts
3145 | 
3146 | - **Path:** /root/git/codewrangler/src/utils/config/schema.ts
3147 | - **Extension:** ts
3148 | - **Size:** 2538 bytes
3149 | - **Depth:** 3
3150 | - **Lines:** 77
3151 | 
3152 | ```ts
3153 | import { z } from "zod";
3154 | 
3155 | import { LOG_VALUES } from "../logger/Logger";
3156 | 
3157 | export const OUTPUT_FORMATS = {
3158 |   markdown: "md",
3159 |   html: "html"
3160 | } as const;
3161 | 
3162 | export type OutputFormats = typeof OUTPUT_FORMATS;
3163 | export type OutputFormatName = keyof OutputFormats;
3164 | export type OutputFormatExtension = OutputFormats[OutputFormatName];
3165 | 
3166 | export const outputFormatSchema = z.enum(["markdown", "html"] as const);
3167 | 
3168 | export const fileExtensionSchema = z.enum(["md", "html"] as const);
3169 | 
3170 | export type OutputFormat = z.infer<typeof outputFormatSchema>;
3171 | export type FileExtension = z.infer<typeof fileExtensionSchema>;
3172 | 
3173 | export const FILE_EXTENSION: Record<OutputFormat, FileExtension> = {
3174 |   markdown: "md",
3175 |   html: "html"
3176 | };
3177 | 
3178 | export const configSchema = z
3179 |   .object({
3180 |     dir: z.string().default(process.cwd()),
3181 |     rootDir: z.string().default(process.cwd()),
3182 |     templatesDir: z.string().default("public/templates"),
3183 |     pattern: z
3184 |       .string()
3185 |       .regex(/^.*$/, "Pattern must be a valid regex")
3186 |       .default(".*"),
3187 |     outputFile: z.string().default("output"),
3188 |     logLevel: z.enum(LOG_VALUES as [string, ...string[]]).default("INFO"),
3189 |     outputFormat: z.array(outputFormatSchema).default(["markdown"]),
3190 |     maxFileSize: z.number().positive().default(1048576),
3191 |     maxDepth: z.number().default(100),
3192 |     excludePatterns: z
3193 |       .array(z.string())
3194 |       .default(["node_modules/**", "**/*.test.ts", "dist/**"]),
3195 |     ignoreHiddenFiles: z.boolean().default(true),
3196 |     additionalIgnoreFiles: z.array(z.string()).optional().default([]),
3197 |     projectName: z.string().optional(),
3198 |     verbose: z.boolean().default(false),
3199 |     followSymlinks: z.boolean().default(false),
3200 |     codeConfigFile: z
3201 |       .string()
3202 |       .regex(/\.json$/, "Config file must end with .json")
3203 |       .default("public/codewrangler.json")
3204 |   })
3205 |   .strict();
3206 | 
3207 | export type ConfigOptions = z.infer<typeof configSchema>;
3208 | // get a type listing all the keys of the config
3209 | export type ConfigKeys = keyof ConfigOptions;
3210 | 
3211 | export const DEFAULT_CONFIG: ConfigOptions = {
3212 |   dir: process.cwd(), // current working directory, where the command is run
3213 |   rootDir: process.cwd(),
3214 |   templatesDir: "public/templates",
3215 |   pattern: ".*",
3216 |   outputFile: "output",
3217 |   logLevel: "INFO",
3218 |   outputFormat: ["markdown"],
3219 |   maxFileSize: 1048576,
3220 |   maxDepth: 100,
3221 |   codeConfigFile: "public/codewrangler.json",
3222 |   projectName: undefined,
3223 |   verbose: false,
3224 |   followSymlinks: false,
3225 |   ignoreHiddenFiles: true, // Default value
3226 |   additionalIgnoreFiles: [],
3227 |   excludePatterns: ["node_modules/**", "**/*.test.ts", "dist/**"]
3228 | };
3229 | 
3230 | ```
3231 | ### Directory: helpers
3232 | 
3233 | - **Path:** /root/git/codewrangler/src/utils/helpers
3234 | - **Size:** 1524 bytes
3235 | - **Files:** 1
3236 | - **Total Files (including subdirectories):** 1
3237 | - **Depth:** 2
3238 | 
3239 | #### Contents:
3240 | 
3241 | #### File: ProgressBar.ts
3242 | 
3243 | - **Path:** /root/git/codewrangler/src/utils/helpers/ProgressBar.ts
3244 | - **Extension:** ts
3245 | - **Size:** 1524 bytes
3246 | - **Depth:** 3
3247 | - **Lines:** 66
3248 | 
3249 | ```ts
3250 | import cliProgress from "cli-progress";
3251 | 
3252 | export class ProgressBar {
3253 |   private bar: cliProgress.SingleBar;
3254 |   private intervalId: NodeJS.Timeout | null = null;
3255 |   private currentValue: number = 0;
3256 | 
3257 |   public constructor(private total: number = 100) {
3258 |     this.bar = new cliProgress.SingleBar(
3259 |       {},
3260 |       cliProgress.Presets.shades_classic
3261 |     );
3262 |   }
3263 | 
3264 |   public start(): ProgressBar {
3265 |     this.bar.start(this.total, 0);
3266 |     this.intervalId = setInterval(() => this.simulateProgress(), 200);
3267 |     return this;
3268 |   }
3269 | 
3270 |   public update(value: number): ProgressBar {
3271 |     this.currentValue = value;
3272 |     this.bar.update(value);
3273 |     return this;
3274 |   }
3275 | 
3276 |   public stop(): ProgressBar {
3277 |     if (this.intervalId) {
3278 |       clearInterval(this.intervalId);
3279 |       this.intervalId = null;
3280 |     }
3281 |     this.bar.update(this.total);
3282 |     this.bar.stop();
3283 |     return this;
3284 |   }
3285 | 
3286 |   public async execute<T>(fn: () => Promise<T>): Promise<T> {
3287 |     this.start();
3288 |     try {
3289 |       return await fn();
3290 |     } finally {
3291 |       this.stop();
3292 |     }
3293 |   }
3294 | 
3295 |   private simulateProgress(): void {
3296 |     const remainingProgress = this.total - this.currentValue;
3297 |     const increment = Math.random() * remainingProgress * 0.1;
3298 |     this.currentValue = Math.min(
3299 |       this.currentValue + increment,
3300 |       this.total * 0.95
3301 |     );
3302 |     this.bar.update(this.currentValue);
3303 |   }
3304 | }
3305 | 
3306 | export async function progressBar(
3307 |   total: number,
3308 |   callback: () => Promise<void>
3309 | ): Promise<void> {
3310 |   const bar = new ProgressBar(total);
3311 |   await bar.execute(async () => {
3312 |     await callback();
3313 |   });
3314 | }
3315 | 
3316 | ```
3317 | ### Directory: __tests__
3318 | 
3319 | - **Path:** /root/git/codewrangler/src/utils/helpers/__tests__
3320 | - **Size:** 0 bytes
3321 | - **Files:** 0
3322 | - **Total Files (including subdirectories):** 0
3323 | - **Depth:** 3
3324 | 
3325 | #### Contents:
3326 | 
3327 | ### Directory: logger
3328 | 
3329 | - **Path:** /root/git/codewrangler/src/utils/logger
3330 | - **Size:** 2164 bytes
3331 | - **Files:** 2
3332 | - **Total Files (including subdirectories):** 2
3333 | - **Depth:** 2
3334 | 
3335 | #### Contents:
3336 | 
3337 | #### File: Logger.ts
3338 | 
3339 | - **Path:** /root/git/codewrangler/src/utils/logger/Logger.ts
3340 | - **Extension:** ts
3341 | - **Size:** 2138 bytes
3342 | - **Depth:** 3
3343 | - **Lines:** 85
3344 | 
3345 | ```ts
3346 | /* eslint-disable no-console */
3347 | import colors from "colors";
3348 | 
3349 | import { Config } from "../config/Config";
3350 | 
3351 | export const LOG_LEVEL = {
3352 |   ERROR: 0,
3353 |   WARN: 1,
3354 |   INFO: 2,
3355 |   DEBUG: 3
3356 | } as const;
3357 | 
3358 | type LogLevel = (typeof LOG_LEVEL)[keyof typeof LOG_LEVEL];
3359 | export type LogLevelString = keyof typeof LOG_LEVEL;
3360 | export const LOG_VALUES = Object.keys(LOG_LEVEL) as LogLevelString[];
3361 | 
3362 | export class Logger {
3363 |   private static instance: Logger;
3364 |   private config: Config | null = null;
3365 | 
3366 |   private constructor() {}
3367 |   public static load(): Logger {
3368 |     if (!Logger.instance) {
3369 |       Logger.instance = new Logger();
3370 |     }
3371 |     return Logger.instance;
3372 |   }
3373 |   public setConfig(config: Config): Logger {
3374 |     this.config = config;
3375 |     return this;
3376 |   }
3377 |   public setLogLevel(logLevel: LogLevelString): Logger {
3378 |     if (this.config) {
3379 |       this.config.set("logLevel", logLevel);
3380 |     }
3381 |     return this;
3382 |   }
3383 | 
3384 |   private get logLevel(): LogLevel {
3385 |     console.log("getLogLevel", this.config?.get("logLevel"));
3386 |     const configLogLevel = this.config?.get("logLevel") as
3387 |       | LogLevelString
3388 |       | undefined;
3389 |     return configLogLevel ? LOG_LEVEL[configLogLevel] : LOG_LEVEL.ERROR;
3390 |   }
3391 | 
3392 |   public error(message: string, error?: Error, ...other: unknown[]): void {
3393 |     if (this.logLevel >= LOG_LEVEL.ERROR) {
3394 |       console.log(colors.red(`[ERROR] ${message}`), ...other);
3395 |       if (error instanceof Error && error.stack) {
3396 |         console.log(colors.red(error.stack));
3397 |       }
3398 |     }
3399 |   }
3400 | 
3401 |   public warn(message: string): void {
3402 |     if (this.logLevel >= LOG_LEVEL.WARN) {
3403 |       console.log(colors.yellow(`[WARN] ${message}`));
3404 |     }
3405 |   }
3406 | 
3407 |   public info(message: string): void {
3408 |     if (this.logLevel >= LOG_LEVEL.INFO) {
3409 |       console.log(colors.blue(`[INFO] ${message}`));
3410 |     }
3411 |   }
3412 | 
3413 |   public debug(message: string): void {
3414 |     console.log("debug", this.logLevel);
3415 |     if (this.logLevel >= LOG_LEVEL.DEBUG) {
3416 |       console.log(colors.gray(`[DEBUG] ${message}`));
3417 |     }
3418 |   }
3419 | 
3420 |   public success(message: string): void {
3421 |     console.log(colors.green(message));
3422 |   }
3423 | 
3424 |   public log(message: string): void {
3425 |     console.log(message);
3426 |   }
3427 | }
3428 | 
3429 | export const logger = Logger.load();
3430 | 
3431 | ```
3432 | ### Directory: __tests__
3433 | 
3434 | - **Path:** /root/git/codewrangler/src/utils/logger/__tests__
3435 | - **Size:** 0 bytes
3436 | - **Files:** 0
3437 | - **Total Files (including subdirectories):** 0
3438 | - **Depth:** 3
3439 | 
3440 | #### Contents:
3441 | 
3442 | #### File: index.ts
3443 | 
3444 | - **Path:** /root/git/codewrangler/src/utils/logger/index.ts
3445 | - **Extension:** ts
3446 | - **Size:** 26 bytes
3447 | - **Depth:** 3
3448 | - **Lines:** 2
3449 | 
3450 | ```ts
3451 | export * from "./Logger";
3452 | 
3453 | ```
3454 | 
3455 | 
```

---------------------------------------------------------------------------

