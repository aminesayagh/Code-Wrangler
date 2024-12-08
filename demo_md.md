
# Code Documentation
Generated on: 2024-12-08T08:56:11.533Z
Total files: 13

## Project Structure

```
codewrangler
├── LICENCE.md
├── README.md
├── documentation
│   ├── CLI_DOCUMENTATION.md
│   ├── CONFIG.md
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


## File: CONFIG.md
- Path: `/root/git/codewrangler/documentation/CONFIG.md`
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
- Size: 86.74 KB
- Extension: .md
- Lines of code: 2925
- Content:

```md
   1 | # Project Documentation: src
   2 | 
   3 | ## Overview
   4 | 
   5 | This documentation was automatically generated on 2024-12-06T15:26:23.790Z.
   6 | 
   7 | ## Summary
   8 | 
   9 | - Total Files: 0
  10 | - Total Directories: 73
  11 | - Total Size: 74481
  12 | 
  13 | ## Content of Files
  14 | 
  15 | ### Directory: src
  16 | 
  17 | - **Path:** /root/git/codewrangler/src
  18 | - **Size:** 74481 bytes
  19 | - **Files:** 0
  20 | - **Total Files (including subdirectories):** 42
  21 | - **Depth:** 0
  22 | 
  23 | #### Contents:
  24 | 
  25 | ### Directory: cli
  26 | 
  27 | - **Path:** /root/git/codewrangler/src/cli
  28 | - **Size:** 16068 bytes
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
  85 | - **Size:** 9545 bytes
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
  96 | - **Size:** 1323 bytes
  97 | - **Depth:** 3
  98 | - **Lines:** 47
  99 | 
 100 | ```ts
 101 | /* eslint-disable require-await */
 102 | import { ICommandOptions } from "./types";
 103 | import { Config } from "../../utils/config/Config";
 104 | import { logger } from "../../utils/logger/Logger";
 105 | 
 106 | export abstract class BaseCommand<T extends ICommandOptions> {
 107 |   public constructor(protected config: Config) {}
 108 | 
 109 |   public async execute(args: string[], options: T): Promise<void> {
 110 |     try {
 111 |       // Pre-execution phase
 112 |       await this.beforeExecution(args, options);
 113 | 
 114 |       // Progress tracking
 115 |       await this.processExecution();
 116 | 
 117 |       // Post-execution phase
 118 |       await this.afterExecution();
 119 |     } catch (error) {
 120 |       await this.handleError(error);
 121 |       throw error;
 122 |     }
 123 |   }
 124 | 
 125 |   // Template methods that can be overridden
 126 |   protected async beforeExecution(_: string[], options: T): Promise<void> {
 127 |     if (options.verbose) {
 128 |       this.logVerbose();
 129 |     }
 130 |   }
 131 | 
 132 |   protected abstract processExecution(): Promise<void>;
 133 | 
 134 |   protected async afterExecution(): Promise<void> {
 135 |     // Default implementation - override if needed
 136 |   }
 137 | 
 138 |   protected async handleError(error: unknown): Promise<void> {
 139 |     logger.error("Command execution failed:", error as Error);
 140 |   }
 141 | 
 142 |   protected logVerbose(): void {
 143 |     // Default verbose logging - override to add command-specific logs
 144 |     logger.debug("Executing command with verbose logging");
 145 |   }
 146 | }
 147 | 
 148 | ```
 149 | #### File: DemoCommand.ts
 150 | 
 151 | - **Path:** /root/git/codewrangler/src/cli/commands/DemoCommand.ts
 152 | - **Extension:** ts
 153 | - **Size:** 8062 bytes
 154 | - **Depth:** 3
 155 | - **Lines:** 343
 156 | 
 157 | ```ts
 158 | /* eslint-disable max-lines-per-function */
 159 | import { Stats } from "fs";
 160 | import * as fs from "fs/promises";
 161 | import * as path from "path";
 162 | 
 163 | interface IFileInfo {
 164 |   name: string;
 165 |   path: string;
 166 |   content: string;
 167 |   ext: string;
 168 |   size: number;
 169 |   lines: number;
 170 | }
 171 | 
 172 | interface ITreeNode {
 173 |   name: string;
 174 |   path: string;
 175 |   type: "file" | "directory";
 176 |   children: ITreeNode[];
 177 | }
 178 | 
 179 | interface IDocumentConfig {
 180 |   pattern: RegExp;
 181 |   rootDir: string;
 182 |   outputPath: string;
 183 |   excludePatterns: string[];
 184 |   maxFileSize: number;
 185 |   ignoreHidden: boolean;
 186 |   compress: boolean;
 187 | }
 188 | 
 189 | const DEFAULT_CONFIG: IDocumentConfig = {
 190 |   pattern: /.*/,
 191 |   rootDir: process.cwd(),
 192 |   outputPath: "documentation.md",
 193 |   excludePatterns: ["node_modules/**", "**/dist/**", "**/*.test.ts"],
 194 |   maxFileSize: 1024 * 1024, // 1MB
 195 |   ignoreHidden: true,
 196 |   compress: false
 197 | };
 198 | 
 199 | // Tree visualization functions
 200 | const generateTreeSymbols = (depth: number, isLast: boolean[]): string => {
 201 |   if (depth === 0) return "";
 202 | 
 203 |   return (
 204 |     isLast
 205 |       .slice(0, -1)
 206 |       .map(last => (last ? "    " : "│   "))
 207 |       .join("") + (isLast[isLast.length - 1] ? "└── " : "├── ")
 208 |   );
 209 | };
 210 | 
 211 | const createTreeNode = async (
 212 |   nodePath: string,
 213 |   config: IDocumentConfig,
 214 |   relativePath = ""
 215 | ): Promise<ITreeNode | null> => {
 216 |   const stats = await fs.stat(nodePath);
 217 |   const name = path.basename(nodePath);
 218 | 
 219 |   if (!shouldInclude(nodePath, config)) {
 220 |     return null;
 221 |   }
 222 | 
 223 |   if (stats.isDirectory()) {
 224 |     const entries = await fs.readdir(nodePath, { withFileTypes: true });
 225 |     const children: ITreeNode[] = [];
 226 | 
 227 |     for (const entry of entries) {
 228 |       const childNode = await createTreeNode(
 229 |         path.join(nodePath, entry.name),
 230 |         config,
 231 |         path.join(relativePath, name)
 232 |       );
 233 |       if (childNode) children.push(childNode);
 234 |     }
 235 | 
 236 |     return {
 237 |       name,
 238 |       path: relativePath || name,
 239 |       type: "directory",
 240 |       children
 241 |     };
 242 |   } else if (isMatchingFile(nodePath, config)) {
 243 |     return {
 244 |       name,
 245 |       path: relativePath || name,
 246 |       type: "file",
 247 |       children: []
 248 |     };
 249 |   }
 250 | 
 251 |   return null;
 252 | };
 253 | 
 254 | const renderTreeNode = (
 255 |   node: ITreeNode,
 256 |   isLast: boolean[] = [],
 257 |   result: string[] = []
 258 | ): string[] => {
 259 |   const prefix = generateTreeSymbols(isLast.length, isLast);
 260 |   result.push(prefix + node.name);
 261 | 
 262 |   if (node.type === "directory") {
 263 |     node.children.forEach((child, index) => {
 264 |       renderTreeNode(
 265 |         child,
 266 |         [...isLast, index === node.children.length - 1],
 267 |         result
 268 |       );
 269 |     });
 270 |   }
 271 | 
 272 |   return result;
 273 | };
 274 | 
 275 | const isHidden = (filePath: string): boolean => {
 276 |   const baseName = path.basename(filePath);
 277 |   return baseName.startsWith(".");
 278 | };
 279 | 
 280 | const shouldInclude = (
 281 |   filePath: string,
 282 |   { excludePatterns, ignoreHidden }: IDocumentConfig
 283 | ): boolean => {
 284 |   // Check for hidden files if ignoreHidden is enabled
 285 |   if (ignoreHidden && isHidden(filePath)) {
 286 |     return false;
 287 |   }
 288 | 
 289 |   // Check against exclude patterns
 290 |   const isExcluded = excludePatterns.some(pattern =>
 291 |     new RegExp(pattern.replace(/\*/g, ".*")).test(filePath)
 292 |   );
 293 | 
 294 |   return !isExcluded;
 295 | };
 296 | 
 297 | // Pure functions for file operations
 298 | const isMatchingFile = (filePath: string, config: IDocumentConfig): boolean => {
 299 |   if (!config.pattern) {
 300 |     throw new Error("Pattern is not defined in the config");
 301 |   }
 302 | 
 303 |   if (!shouldInclude(filePath, config)) {
 304 |     return false;
 305 |   }
 306 | 
 307 |   return config.pattern.test(filePath);
 308 | };
 309 | 
 310 | const formatSize = (bytes: number): string => {
 311 |   const units = ["B", "KB", "MB", "GB"];
 312 |   let size = bytes;
 313 |   let unitIndex = 0;
 314 | 
 315 |   while (size >= 1024 && unitIndex < units.length - 1) {
 316 |     size /= 1024;
 317 |     unitIndex++;
 318 |   }
 319 | 
 320 |   return `${size.toFixed(2)} ${units[unitIndex]}`;
 321 | };
 322 | 
 323 | // Core file processing functions
 324 | 
 325 | async function* walkDirectory(dir: string): AsyncGenerator<string> {
 326 |   const entries = await fs.readdir(dir, { withFileTypes: true });
 327 | 
 328 |   for (const entry of entries) {
 329 |     const fullPath = path.join(dir, entry.name);
 330 | 
 331 |     if (entry.isDirectory()) {
 332 |       yield* walkDirectory(fullPath);
 333 |     } else {
 334 |       yield fullPath;
 335 |     }
 336 |   }
 337 | }
 338 | 
 339 | const formatContentWithLineNumbers = (content: string): string => {
 340 |   const lines = content.split("\n");
 341 |   const lineNumberWidth = lines.length.toString().length;
 342 | 
 343 |   return lines
 344 |     .map((line, index) => {
 345 |       const lineNumber = (index + 1).toString().padStart(lineNumberWidth, " ");
 346 |       return `${lineNumber} | ${line}`;
 347 |     })
 348 |     .join("\n");
 349 | };
 350 | 
 351 | // Markdown generation functions
 352 | const generateFileSection = (
 353 |   file: IFileInfo,
 354 |   compress: boolean = false
 355 | ): string =>
 356 |   !compress
 357 |     ? `
 358 | ## File: ${file.name}
 359 | - Path: \`${file.path}\`
 360 | - Size: ${formatSize(Number(file.size))}
 361 | - Extension: ${file.ext}
 362 | - Lines of code: ${file.lines}
 363 | - Content:
 364 | 
 365 | \`\`\`${file.ext.slice(1) || "plaintext"}
 366 | ${formatContentWithLineNumbers(file.content)}
 367 | \`\`\`
 368 | 
 369 | ---------------------------------------------------------------------------
 370 | `
 371 |     : `
 372 | ## File: ${file.name}, Path: \`${file.path}\`
 373 | \`\`\`${file.ext.slice(1) || "plaintext"}
 374 | ${formatContentWithLineNumbers(file.content)}
 375 | \`\`\``;
 376 | 
 377 | const generateMarkdownContent = (
 378 |   files: IFileInfo[],
 379 |   treeContent: string,
 380 |   compress: boolean
 381 | ): string =>
 382 |   !compress
 383 |     ? `
 384 | # Code Documentation
 385 | Generated on: ${new Date().toISOString()}
 386 | Total files: ${files.length}
 387 | 
 388 | ## Project Structure
 389 | 
 390 | \`\`\`
 391 | ${treeContent}
 392 | \`\`\`
 393 | 
 394 | ${files.map(file => generateFileSection(file, compress)).join("\n")}
 395 | `
 396 |     : `
 397 | # Code documentation
 398 | \`\`\`
 399 | ${treeContent}
 400 | \`\`\`
 401 | ${files.map(file => generateFileSection(file, compress)).join("\n")}
 402 | `;
 403 | 
 404 | const compressContent = (content: string): string =>
 405 |   content
 406 |     .split("\n")
 407 |     .map(line => line.trim())
 408 |     .filter(line => line !== "")
 409 |     .filter(line => !line.startsWith("//"))
 410 |     .join("\n");
 411 | 
 412 | async function generateFileInfo(
 413 |   filePath: string,
 414 |   stats: Stats,
 415 |   compress: boolean
 416 | ): Promise<IFileInfo> {
 417 |   const content = await fs.readFile(filePath, "utf-8");
 418 |   return {
 419 |     name: path.basename(filePath),
 420 |     path: filePath,
 421 |     content: compress ? compressContent(content) : content,
 422 |     ext: path.extname(filePath),
 423 |     size: stats.size,
 424 |     lines: content.split("\n").filter(line => line.trim() !== "").length
 425 |   };
 426 | }
 427 | 
 428 | // Main function
 429 | async function generateDocumentation(
 430 |   userConfig: Partial<IDocumentConfig> = {}
 431 | ): Promise<void> {
 432 |   try {
 433 |     const config: IDocumentConfig = { ...DEFAULT_CONFIG, ...userConfig };
 434 |     const files: IFileInfo[] = [];
 435 | 
 436 |     // Generate tree structure
 437 |     const rootNode = await createTreeNode(config.rootDir, config);
 438 |     const treeContent = rootNode
 439 |       ? renderTreeNode(rootNode).join("\n")
 440 |       : "No matching files found";
 441 | 
 442 |     for await (const filePath of walkDirectory(config.rootDir)) {
 443 |       if (!isMatchingFile(filePath, config)) {
 444 |         continue;
 445 |       }
 446 |       const stats = await fs.stat(filePath);
 447 |       if (stats.size > config.maxFileSize) {
 448 |         continue;
 449 |       }
 450 |       const fileInfo = await generateFileInfo(filePath, stats, config.compress);
 451 |       files.push(fileInfo);
 452 |     }
 453 | 
 454 |     const markdownContent = generateMarkdownContent(
 455 |       files,
 456 |       treeContent,
 457 |       config.compress
 458 |     );
 459 |     await fs.writeFile(config.outputPath, markdownContent, "utf-8");
 460 |   } catch (error) {
 461 |     console.error("Error generating documentation", error);
 462 |     throw error;
 463 |   }
 464 | }
 465 | 
 466 | if (require.main === module) {
 467 |   generateDocumentation({
 468 |     pattern: /\.ts$/,
 469 |     outputPath: "demo_compressed.md",
 470 |     ignoreHidden: true,
 471 |     excludePatterns: [
 472 |       "node_modules",
 473 |       "dist",
 474 |       "coverage",
 475 |       "**/__tests__",
 476 |       "**/*.test.ts"
 477 |     ],
 478 |     compress: false
 479 |   }).catch(console.error);
 480 |   generateDocumentation({
 481 |     pattern: /\.test.ts$/,
 482 |     outputPath: "demo_test.md",
 483 |     ignoreHidden: true,
 484 |     excludePatterns: [
 485 |       "node_modules",
 486 |       "dist",
 487 |       "coverage",
 488 |       "**/__tests__/__mocks__"
 489 |     ],
 490 |     compress: false
 491 |   }).catch(console.error);
 492 |   generateDocumentation({
 493 |     pattern: /\.md$/,
 494 |     outputPath: "demo_md.md",
 495 |     ignoreHidden: true,
 496 |     excludePatterns: ["node_modules", "dist", "coverage", "*demo*", "src"],
 497 |     compress: false
 498 |   }).catch(console.error);
 499 | }
 500 | 
 501 | ```
 502 | #### File: types.ts
 503 | 
 504 | - **Path:** /root/git/codewrangler/src/cli/commands/types.ts
 505 | - **Extension:** ts
 506 | - **Size:** 160 bytes
 507 | - **Depth:** 3
 508 | - **Lines:** 8
 509 | 
 510 | ```ts
 511 | export interface ICommandOptions {
 512 |   verbose: boolean;
 513 | }
 514 | 
 515 | export interface ICommand {
 516 |   execute: (args: string[], options: ICommandOptions) => Promise<void>;
 517 | }
 518 | 
 519 | ```
 520 | #### File: index.ts
 521 | 
 522 | - **Path:** /root/git/codewrangler/src/cli/index.ts
 523 | - **Extension:** ts
 524 | - **Size:** 416 bytes
 525 | - **Depth:** 2
 526 | - **Lines:** 19
 527 | 
 528 | ```ts
 529 | #!/usr/bin/env node
 530 | import { CodeWrangler } from "./CodeWrangler";
 531 | import { logger } from "../utils/logger/Logger";
 532 | 
 533 | async function main(): Promise<void> {
 534 |   try {
 535 |     await CodeWrangler.run();
 536 |   } catch (error) {
 537 |     if (error instanceof Error) {
 538 |       logger.error(error.message);
 539 |     } else {
 540 |       logger.error("An unknown error occurred");
 541 |     }
 542 |     process.exit(1);
 543 |   }
 544 | }
 545 | 
 546 | main().catch(() => process.exit(1));
 547 | 
 548 | ```
 549 | ### Directory: program
 550 | 
 551 | - **Path:** /root/git/codewrangler/src/cli/program
 552 | - **Size:** 4933 bytes
 553 | - **Files:** 0
 554 | - **Total Files (including subdirectories):** 3
 555 | - **Depth:** 2
 556 | 
 557 | #### Contents:
 558 | 
 559 | ### Directory: mainCLI
 560 | 
 561 | - **Path:** /root/git/codewrangler/src/cli/program/mainCLI
 562 | - **Size:** 4933 bytes
 563 | - **Files:** 3
 564 | - **Total Files (including subdirectories):** 3
 565 | - **Depth:** 3
 566 | 
 567 | #### Contents:
 568 | 
 569 | #### File: MainCLICommand.ts
 570 | 
 571 | - **Path:** /root/git/codewrangler/src/cli/program/mainCLI/MainCLICommand.ts
 572 | - **Extension:** ts
 573 | - **Size:** 2743 bytes
 574 | - **Depth:** 4
 575 | - **Lines:** 79
 576 | 
 577 | ```ts
 578 | import { IMainCLICommandOptions } from "./type";
 579 | import { DocumentOrchestratorBuilder } from "../../../orchestration/DocumentOrchestratorBuilder";
 580 | import { DocumentTreeBuilder } from "../../../services/builder/DocumentTreeBuilder";
 581 | import { renderStrategyFactory } from "../../../services/renderer/RenderStrategyFactory";
 582 | import { OutputFormat } from "../../../utils/config/schema";
 583 | import { logger } from "../../../utils/logger/Logger";
 584 | import { BaseCommand } from "../../commands/Command";
 585 | 
 586 | export class MainCLICommand<
 587 |   T extends IMainCLICommandOptions
 588 | > extends BaseCommand<T> {
 589 |   protected override async beforeExecution(
 590 |     args: string[],
 591 |     options: T
 592 |   ): Promise<void> {
 593 |     this.config.set("pattern", args[0]);
 594 |     if (!this.updateOptions(options)) {
 595 |       throw new Error("Invalid configuration value");
 596 |     }
 597 |     this.logVerbose();
 598 |     await super.beforeExecution(args, options);
 599 |   }
 600 | 
 601 |   protected override async processExecution(): Promise<void> {
 602 |     const builder = new DocumentTreeBuilder(this.config);
 603 |     const root = await builder.build();
 604 | 
 605 |     const orchestrator = new DocumentOrchestratorBuilder()
 606 |       .setRoot(root)
 607 |       .setConfig(this.config);
 608 | 
 609 |     const outputFormat = this.config.get("outputFormat");
 610 |     const strategies = await renderStrategyFactory.createStrategies(
 611 |       this.config,
 612 |       outputFormat
 613 |     );
 614 | 
 615 |     orchestrator.setStrategies(strategies);
 616 | 
 617 |     const orchestrators = await orchestrator.buildAndExecute();
 618 | 
 619 |     logger.info(`Generated ${orchestrators.length} documents`);
 620 |   }
 621 | 
 622 |   protected override logVerbose(): void {
 623 |     super.logVerbose();
 624 |     logger.debug(
 625 |       `Searching for file matching pattern: ${this.config.get("pattern")}`
 626 |     );
 627 |     logger.debug(
 628 |       `Excluding patterns: ${(this.config.get("excludePatterns") as string[]).join(", ")}`
 629 |     );
 630 |     logger.debug(
 631 |       `Ignoring hidden files: ${this.config.get("ignoreHiddenFiles")}`
 632 |     );
 633 |     logger.debug(`Max file size: ${this.config.get("maxFileSize")} bytes`);
 634 |   }
 635 | 
 636 |   private updateOptions(options: IMainCLICommandOptions): boolean {
 637 |     try {
 638 |       this.config.set("dir", options["dir"]);
 639 |       this.config.set("codeConfigFile", options["config"]);
 640 |       this.config.set("logLevel", options["verbose"] ? "DEBUG" : "INFO");
 641 |       this.config.set("verbose", options["verbose"]);
 642 |       this.config.set(
 643 |         "outputFormat",
 644 |         options["format"] as unknown as OutputFormat[]
 645 |       );
 646 |       this.config.set("outputFile", options["output"]);
 647 |       this.config.set("ignoreHiddenFiles", options["ignoreHidden"]);
 648 |       this.config.set("additionalIgnoreFiles", options["additionalIgnore"]);
 649 |     } catch (error) {
 650 |       logger.error(`Invalid configuration value: ${error}`);
 651 |       return false;
 652 |     }
 653 |     return true;
 654 |   }
 655 | }
 656 | 
 657 | ```
 658 | #### File: ProgramBuilder.ts
 659 | 
 660 | - **Path:** /root/git/codewrangler/src/cli/program/mainCLI/ProgramBuilder.ts
 661 | - **Extension:** ts
 662 | - **Size:** 1924 bytes
 663 | - **Depth:** 4
 664 | - **Lines:** 76
 665 | 
 666 | ```ts
 667 | import { Command } from "commander";
 668 | 
 669 | import { Config } from "../../../utils/config/Config";
 670 | 
 671 | export class ProgramBuilder {
 672 |   private program: Command;
 673 | 
 674 |   public constructor(
 675 |     private config: Config,
 676 |     private version: string
 677 |   ) {
 678 |     this.program = new Command();
 679 |   }
 680 | 
 681 |   public build(): Command {
 682 |     this.buildVersion().buildDescription().buildArguments().buildOptions();
 683 |     return this.program;
 684 |   }
 685 | 
 686 |   private buildVersion(): ProgramBuilder {
 687 |     this.program.version(this.version);
 688 |     return this;
 689 |   }
 690 | 
 691 |   private buildDescription(): ProgramBuilder {
 692 |     this.program.description("CodeWrangler is a tool for generating code");
 693 |     return this;
 694 |   }
 695 | 
 696 |   private buildArguments(): ProgramBuilder {
 697 |     this.program.argument(
 698 |       "<pattern>",
 699 |       'File pattern to match (e.g., "\\.ts$" for TypeScript files)'
 700 |     );
 701 |     return this;
 702 |   }
 703 | 
 704 |   // eslint-disable-next-line max-lines-per-function
 705 |   private buildOptions(): ProgramBuilder {
 706 |     this.program
 707 |       .option("-d, --dir <dir>", "Directory to search", this.config.get("dir"))
 708 |       .option(
 709 |         "-c, --config <config>",
 710 |         "Config file",
 711 |         this.config.get("codeConfigFile")
 712 |       )
 713 |       .option("-v, --verbose", "Verbose mode", this.config.get("logLevel"))
 714 |       .option(
 715 |         "-f, --format <format>",
 716 |         "Output format",
 717 |         this.config.get("outputFormat")
 718 |       )
 719 |       .option(
 720 |         "-o, --output <output>",
 721 |         "Output file",
 722 |         this.config.get("outputFile")
 723 |       )
 724 |       .option(
 725 |         "-e, --exclude <exclude>",
 726 |         "Exclude patterns",
 727 |         this.config.get("excludePatterns")
 728 |       )
 729 |       .option(
 730 |         "-i, --ignore-hidden",
 731 |         "Ignore hidden files",
 732 |         this.config.get("ignoreHiddenFiles")
 733 |       )
 734 |       .option(
 735 |         "-a, --additional-ignore <additional-ignore>",
 736 |         "Additional ignore patterns",
 737 |         this.config.get("additionalIgnoreFiles")
 738 |       );
 739 |     return this;
 740 |   }
 741 | }
 742 | 
 743 | ```
 744 | #### File: type.ts
 745 | 
 746 | - **Path:** /root/git/codewrangler/src/cli/program/mainCLI/type.ts
 747 | - **Extension:** ts
 748 | - **Size:** 266 bytes
 749 | - **Depth:** 4
 750 | - **Lines:** 12
 751 | 
 752 | ```ts
 753 | import { ICommandOptions } from "../../commands/types";
 754 | 
 755 | export interface IMainCLICommandOptions extends ICommandOptions {
 756 |   dir: string;
 757 |   config: string;
 758 |   format: string;
 759 |   output: string;
 760 |   exclude: string;
 761 |   ignoreHidden: boolean;
 762 |   additionalIgnore: string;
 763 | }
 764 | 
 765 | ```
 766 | ### Directory: core
 767 | 
 768 | - **Path:** /root/git/codewrangler/src/core
 769 | - **Size:** 8762 bytes
 770 | - **Files:** 0
 771 | - **Total Files (including subdirectories):** 7
 772 | - **Depth:** 1
 773 | 
 774 | #### Contents:
 775 | 
 776 | ### Directory: entities
 777 | 
 778 | - **Path:** /root/git/codewrangler/src/core/entities
 779 | - **Size:** 7918 bytes
 780 | - **Files:** 3
 781 | - **Total Files (including subdirectories):** 3
 782 | - **Depth:** 2
 783 | 
 784 | #### Contents:
 785 | 
 786 | #### File: NodeBase.ts
 787 | 
 788 | - **Path:** /root/git/codewrangler/src/core/entities/NodeBase.ts
 789 | - **Extension:** ts
 790 | - **Size:** 2775 bytes
 791 | - **Depth:** 3
 792 | - **Lines:** 125
 793 | 
 794 | ```ts
 795 | import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
 796 | import { IRenderStrategy } from "../../services/renderer/RenderStrategy";
 797 | import { IFileStats, IPropsNode } from "../../types/type";
 798 | 
 799 | const defaultProps: IPropsNode = {
 800 |   name: "",
 801 |   path: "",
 802 |   deep: 0,
 803 |   size: 0, // size of the node from the children nodes
 804 |   stats: {
 805 |     size: 0, // size of the node from the file system
 806 |     created: new Date(),
 807 |     modified: new Date(),
 808 |     accessed: new Date(),
 809 |     isDirectory: false,
 810 |     isFile: false,
 811 |     permissions: {
 812 |       readable: false,
 813 |       writable: false,
 814 |       executable: false
 815 |     }
 816 |   }
 817 | };
 818 | 
 819 | export interface INodeContent {
 820 |   content: string;
 821 | }
 822 | 
 823 | interface INodeLifeCycle {
 824 |   validate: () => boolean;
 825 |   bundle: (deep: number) => Promise<void>;
 826 |   render: (strategy: IRenderStrategy) => INodeContent;
 827 |   dispose: () => void;
 828 |   clone: () => NodeBase;
 829 | }
 830 | 
 831 | export abstract class NodeBase implements INodeLifeCycle {
 832 |   protected _props: IPropsNode = { ...defaultProps };
 833 | 
 834 |   public constructor(
 835 |     _name: string,
 836 |     private originalPath: string
 837 |   ) {
 838 |     this.initNode(_name, originalPath);
 839 |     this.validate();
 840 |   }
 841 | 
 842 |   public validate(): boolean {
 843 |     if (!documentFactory.exists(this.path)) {
 844 |       throw new Error(`Path ${this.originalPath} does not exist`);
 845 |     }
 846 |     if (!documentFactory.isAbsolute(this.path)) {
 847 |       throw new Error(`Path ${this.originalPath} is not absolute`);
 848 |     }
 849 |     return true;
 850 |   }
 851 | 
 852 |   // abstract methods
 853 |   public abstract bundle(deep: number): Promise<void>;
 854 |   public abstract render(strategy: IRenderStrategy): INodeContent;
 855 | 
 856 |   // getters and setters
 857 |   // deep
 858 |   public get deep(): number {
 859 |     return this._props.deep;
 860 |   }
 861 |   public set deep(deep: number) {
 862 |     this._props.deep = deep;
 863 |   }
 864 | 
 865 |   // size
 866 |   public get size(): number {
 867 |     return this._props.size;
 868 |   }
 869 |   public set size(size: number) {
 870 |     this._props.size = size;
 871 |   }
 872 | 
 873 |   // name
 874 |   public get name(): string {
 875 |     return this._props.name;
 876 |   }
 877 |   public set name(name: string) {
 878 |     this._props.name = name;
 879 |   }
 880 | 
 881 |   // path
 882 |   public get path(): string {
 883 |     return this._props.path;
 884 |   }
 885 |   public set path(path: string) {
 886 |     this._props.path = path;
 887 |   }
 888 | 
 889 |   // stats
 890 |   public get stats(): IFileStats | undefined {
 891 |     return this._props.stats;
 892 |   }
 893 |   public set stats(stats: IFileStats | undefined) {
 894 |     this._props.stats = stats;
 895 |   }
 896 | 
 897 |   // props
 898 |   public get props(): IPropsNode {
 899 |     return {
 900 |       ...this._props
 901 |     };
 902 |   }
 903 | 
 904 |   public dispose(): void {
 905 |     this._props = { ...defaultProps };
 906 |   }
 907 | 
 908 |   public clone(): NodeBase {
 909 |     return Object.assign(Object.create(this), this);
 910 |   }
 911 | 
 912 |   private initNode(name: string, path: string): void {
 913 |     this.deep = 0;
 914 |     this.size = 0;
 915 |     this.name = name;
 916 |     this.path = documentFactory.resolve(path);
 917 |   }
 918 | }
 919 | 
 920 | ```
 921 | #### File: NodeDirectory.ts
 922 | 
 923 | - **Path:** /root/git/codewrangler/src/core/entities/NodeDirectory.ts
 924 | - **Extension:** ts
 925 | - **Size:** 3142 bytes
 926 | - **Depth:** 3
 927 | - **Lines:** 108
 928 | 
 929 | ```ts
 930 | import { INodeContent, NodeBase } from "./NodeBase";
 931 | import { NodeFile } from "./NodeFile";
 932 | import { fileStatsService } from "../../infrastructure/filesystem/FileStats";
 933 | import { IRenderStrategy } from "../../services/renderer/RenderStrategy";
 934 | import { IPropsDirectoryNode } from "../../types/type";
 935 | 
 936 | interface IPropsDirectory {
 937 |   length: number;
 938 |   deepLength: number;
 939 |   numberOfFiles: number;
 940 |   numberOfDirectories: number;
 941 | }
 942 | 
 943 | const defaultPropsDirectory: IPropsDirectory = {
 944 |   length: 0,
 945 |   deepLength: 0,
 946 |   numberOfFiles: 0,
 947 |   numberOfDirectories: 0
 948 | };
 949 | 
 950 | export abstract class NodeDirectory extends NodeBase {
 951 |   public readonly type = "directory";
 952 |   public children: (NodeFile | NodeDirectory)[] = [];
 953 |   private _propsDirectory: IPropsDirectory = { ...defaultPropsDirectory };
 954 | 
 955 |   public constructor(name: string, pathName: string) {
 956 |     super(name, pathName);
 957 |     this.initDirectory();
 958 |   }
 959 |   // getters and setters
 960 |   public get length(): number {
 961 |     return this._propsDirectory.length;
 962 |   }
 963 |   public set length(length: number) {
 964 |     this._propsDirectory.length = length;
 965 |   }
 966 |   public get deepLength(): number {
 967 |     return this._propsDirectory.deepLength;
 968 |   }
 969 |   public set deepLength(deepLength: number) {
 970 |     this._propsDirectory.deepLength = deepLength;
 971 |   }
 972 |   public get numberOfFiles(): number {
 973 |     return this._propsDirectory.numberOfFiles;
 974 |   }
 975 |   public set numberOfFiles(numberOfFiles: number) {
 976 |     this._propsDirectory.numberOfFiles = numberOfFiles;
 977 |   }
 978 |   public override get props(): IPropsDirectoryNode {
 979 |     return {
 980 |       ...super.props,
 981 |       ...this._propsDirectory
 982 |     };
 983 |   }
 984 | 
 985 |   public addChild(child: NodeFile | NodeDirectory): NodeDirectory {
 986 |     if (!(child instanceof NodeFile || child instanceof NodeDirectory)) {
 987 |       throw new Error("Invalid child type");
 988 |     }
 989 |     this.children.push(child);
 990 |     return this;
 991 |   }
 992 | 
 993 |   public async bundle(deep: number = 0): Promise<void> {
 994 |     // set the deep of the directory
 995 |     this.deep = deep;
 996 | 
 997 |     // bundle all children
 998 |     await Promise.all(this.children.map(child => child.bundle(deep + 1)));
 999 | 
1000 |     // set the length of the directory
1001 |     this.length = this.children.filter(child => child.type === "file").length;
1002 |     this.numberOfFiles =
1003 |       this.length +
1004 |       this.children
1005 |         .filter(child => child.type === "directory")
1006 |         .reduce((acc, child) => acc + child.numberOfFiles, 0);
1007 | 
1008 |     // set the deep length of the directory
1009 |     this.deepLength = this.children.reduce(
1010 |       (acc, child) =>
1011 |         acc + (child instanceof NodeDirectory ? child.deepLength + 1 : 1),
1012 |       0
1013 |     );
1014 | 
1015 |     // set the size of the directory
1016 |     this.size = this.children.reduce((acc, child) => acc + child.size, 0);
1017 | 
1018 |     // set stats
1019 |     this.stats = await fileStatsService(this.path);
1020 |   }
1021 | 
1022 |   public abstract override render(strategy: IRenderStrategy): INodeContent;
1023 | 
1024 |   private initDirectory(): void {
1025 |     this.children = [];
1026 |     this._propsDirectory = { ...defaultPropsDirectory };
1027 |   }
1028 | }
1029 | 
1030 | export class RenderableDirectory extends NodeDirectory {
1031 |   public override render(strategy: IRenderStrategy): INodeContent {
1032 |     return {
1033 |       content: strategy.renderDirectory(this)
1034 |     };
1035 |   }
1036 | }
1037 | 
1038 | ```
1039 | #### File: NodeFile.ts
1040 | 
1041 | - **Path:** /root/git/codewrangler/src/core/entities/NodeFile.ts
1042 | - **Extension:** ts
1043 | - **Size:** 2001 bytes
1044 | - **Depth:** 3
1045 | - **Lines:** 74
1046 | 
1047 | ```ts
1048 | import { INodeContent, NodeBase } from "./NodeBase";
1049 | import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
1050 | import { fileStatsService } from "../../infrastructure/filesystem/FileStats";
1051 | import { IRenderStrategy } from "../../services/renderer/RenderStrategy";
1052 | import { IPropsFileNode } from "../../types/type";
1053 | 
1054 | export abstract class NodeFile extends NodeBase {
1055 |   public readonly type = "file";
1056 |   private _extension: string = "";
1057 |   private _content: string | null = null;
1058 | 
1059 |   public constructor(name: string, pathName: string) {
1060 |     super(name, pathName);
1061 |     this.initFile(name);
1062 |   }
1063 | 
1064 |   // getters and setters
1065 |   // extension
1066 |   public get extension(): string {
1067 |     return this._extension;
1068 |   }
1069 |   protected set extension(extension: string) {
1070 |     this._extension = extension;
1071 |   }
1072 |   // content
1073 |   public get content(): string | null {
1074 |     return this._content;
1075 |   }
1076 |   protected set content(content: string | null) {
1077 |     this._content = content;
1078 |   }
1079 |   // secondary props
1080 |   public override get props(): IPropsFileNode {
1081 |     return {
1082 |       ...super.props,
1083 |       extension: this.extension
1084 |     };
1085 |   }
1086 | 
1087 |   // bundle
1088 |   public async bundle(deep: number = 0): Promise<void> {
1089 |     // set the deep of the file
1090 |     this.deep = deep;
1091 |     // set the size of the file
1092 |     this.size = await documentFactory.size(this.path);
1093 |     // set the content of the file
1094 |     this.content = await documentFactory.readFile(this.path);
1095 |     // set the stats of the file
1096 |     this.stats = await fileStatsService(this.path);
1097 |   }
1098 | 
1099 |   // render
1100 |   public abstract override render(strategy: IRenderStrategy): INodeContent;
1101 | 
1102 |   private initFile(name: string): void {
1103 |     this.extension = documentFactory.extension(name);
1104 |     this._content = null;
1105 |   }
1106 | }
1107 | 
1108 | export class RenderableFile extends NodeFile {
1109 |   // render
1110 |   public override render(strategy: IRenderStrategy): INodeContent {
1111 |     return {
1112 |       content: strategy.renderFile(this)
1113 |     };
1114 |   }
1115 | 
1116 |   // dispose
1117 |   public override dispose(): void {
1118 |     super.dispose();
1119 |   }
1120 | }
1121 | 
1122 | ```
1123 | ### Directory: __tests__
1124 | 
1125 | - **Path:** /root/git/codewrangler/src/core/entities/__tests__
1126 | - **Size:** 0 bytes
1127 | - **Files:** 0
1128 | - **Total Files (including subdirectories):** 0
1129 | - **Depth:** 3
1130 | 
1131 | #### Contents:
1132 | 
1133 | ### Directory: errors
1134 | 
1135 | - **Path:** /root/git/codewrangler/src/core/errors
1136 | - **Size:** 844 bytes
1137 | - **Files:** 4
1138 | - **Total Files (including subdirectories):** 4
1139 | - **Depth:** 2
1140 | 
1141 | #### Contents:
1142 | 
1143 | #### File: DirectoryNotFoundError.ts
1144 | 
1145 | - **Path:** /root/git/codewrangler/src/core/errors/DirectoryNotFoundError.ts
1146 | - **Extension:** ts
1147 | - **Size:** 235 bytes
1148 | - **Depth:** 3
1149 | - **Lines:** 9
1150 | 
1151 | ```ts
1152 | import { DocumentError } from "./DocumentError";
1153 | 
1154 | export class DirectoryNotFoundError extends DocumentError {
1155 |   public constructor(path: string) {
1156 |     super("Directory not found", path);
1157 |     this.name = "DirectoryNotFoundError";
1158 |   }
1159 | }
1160 | 
1161 | ```
1162 | #### File: DocumentError.ts
1163 | 
1164 | - **Path:** /root/git/codewrangler/src/core/errors/DocumentError.ts
1165 | - **Extension:** ts
1166 | - **Size:** 216 bytes
1167 | - **Depth:** 3
1168 | - **Lines:** 10
1169 | 
1170 | ```ts
1171 | export class DocumentError extends Error {
1172 |   public constructor(
1173 |     message: string,
1174 |     public readonly path: string
1175 |   ) {
1176 |     super(`Document error at ${path}: ${message}`);
1177 |     this.name = "DocumentError";
1178 |   }
1179 | }
1180 | 
1181 | ```
1182 | #### File: FileNotFoundError.ts
1183 | 
1184 | - **Path:** /root/git/codewrangler/src/core/errors/FileNotFoundError.ts
1185 | - **Extension:** ts
1186 | - **Size:** 220 bytes
1187 | - **Depth:** 3
1188 | - **Lines:** 9
1189 | 
1190 | ```ts
1191 | import { DocumentError } from "./DocumentError";
1192 | 
1193 | export class FileNotFoundError extends DocumentError {
1194 |   public constructor(path: string) {
1195 |     super("File not found", path);
1196 |     this.name = "FileNotFoundError";
1197 |   }
1198 | }
1199 | 
1200 | ```
1201 | ### Directory: __tests__
1202 | 
1203 | - **Path:** /root/git/codewrangler/src/core/errors/__tests__
1204 | - **Size:** 0 bytes
1205 | - **Files:** 0
1206 | - **Total Files (including subdirectories):** 0
1207 | - **Depth:** 3
1208 | 
1209 | #### Contents:
1210 | 
1211 | #### File: index.ts
1212 | 
1213 | - **Path:** /root/git/codewrangler/src/core/errors/index.ts
1214 | - **Extension:** ts
1215 | - **Size:** 173 bytes
1216 | - **Depth:** 3
1217 | - **Lines:** 4
1218 | 
1219 | ```ts
1220 | export { DocumentError } from "./DocumentError";
1221 | export { DirectoryNotFoundError } from "./DirectoryNotFoundError";
1222 | export { FileNotFoundError } from "./FileNotFoundError";
1223 | 
1224 | ```
1225 | ### Directory: infrastructure
1226 | 
1227 | - **Path:** /root/git/codewrangler/src/infrastructure
1228 | - **Size:** 19243 bytes
1229 | - **Files:** 0
1230 | - **Total Files (including subdirectories):** 5
1231 | - **Depth:** 1
1232 | 
1233 | #### Contents:
1234 | 
1235 | ### Directory: filesystem
1236 | 
1237 | - **Path:** /root/git/codewrangler/src/infrastructure/filesystem
1238 | - **Size:** 13662 bytes
1239 | - **Files:** 3
1240 | - **Total Files (including subdirectories):** 3
1241 | - **Depth:** 2
1242 | 
1243 | #### Contents:
1244 | 
1245 | #### File: DocumentFactory.ts
1246 | 
1247 | - **Path:** /root/git/codewrangler/src/infrastructure/filesystem/DocumentFactory.ts
1248 | - **Extension:** ts
1249 | - **Size:** 10107 bytes
1250 | - **Depth:** 3
1251 | - **Lines:** 350
1252 | 
1253 | ```ts
1254 | import { ObjectEncodingOptions } from "fs";
1255 | import * as fsSync from "fs";
1256 | import * as fs from "fs/promises";
1257 | import * as path from "path";
1258 | 
1259 | import { fileStatsService } from "./FileStats";
1260 | import { DocumentError, FileNotFoundError } from "../../core/errors";
1261 | import {
1262 |   FILE_TYPE,
1263 |   FileType,
1264 |   IDirectoryOptions,
1265 |   IReadOptions,
1266 |   IWriteOptions
1267 | } from "../../types/type";
1268 | 
1269 | export const documentFactory = {
1270 |   /**
1271 |    * Gets the type of a file system entry
1272 |    * @param filePath - The path to check
1273 |    * @returns The type of the file system entry (File or Directory)
1274 |    * @throws {FileNotFoundError} If the path doesn't exist
1275 |    * @throws {DocumentError} For other file system errors
1276 |    */
1277 |   async type(filePath: string): Promise<FileType> {
1278 |     try {
1279 |       const stats = await fs.stat(filePath);
1280 |       return stats.isDirectory() ? FILE_TYPE.Directory : FILE_TYPE.File;
1281 |     } catch (error) {
1282 |       if ((error as NodeJS.ErrnoException).code === "ENOENT") {
1283 |         throw new FileNotFoundError(filePath);
1284 |       }
1285 |       throw new DocumentError(String(error), filePath);
1286 |     }
1287 |   },
1288 | 
1289 |   /**
1290 |    * Gets file size in bytes
1291 |    * @param filePath - The path to the file
1292 |    * @returns The size of the file in bytes
1293 |    * @throws {FileNotFoundError} If the file doesn't exist
1294 |    * @throws {DocumentError} For other file system errors or if path is a directory
1295 |    */
1296 |   async size(filePath: string): Promise<number> {
1297 |     const isDirectory = (await this.type(filePath)) === FILE_TYPE.Directory;
1298 |     if (isDirectory) {
1299 |       throw new DocumentError("Path is a directory", filePath);
1300 |     }
1301 |     const stats = await fileStatsService(filePath);
1302 |     return stats.size;
1303 |   },
1304 | 
1305 |   /**
1306 |    * Resolves a path to an absolute path
1307 |    * @param filePath - The path to resolve
1308 |    * @returns The absolute path
1309 |    */
1310 |   resolve(filePath: string): string {
1311 |     return path.resolve(filePath);
1312 |   },
1313 | 
1314 |   /**
1315 |    * Checks various access flags for a path
1316 |    * @private
1317 |    * @param filePath - The path to check access for
1318 |    * @returns An object containing readable, writable, and executable permission flags
1319 |    */
1320 |   async checkAccess(filePath: string): Promise<{
1321 |     readable: boolean;
1322 |     writable: boolean;
1323 |     executable: boolean;
1324 |   }> {
1325 |     const check = async (mode: number): Promise<boolean> => {
1326 |       try {
1327 |         await fs.access(filePath, mode);
1328 |         return true;
1329 |       } catch {
1330 |         return false;
1331 |       }
1332 |     };
1333 | 
1334 |     return {
1335 |       readable: await check(fs.constants.R_OK),
1336 |       writable: await check(fs.constants.W_OK),
1337 |       executable: await check(fs.constants.X_OK)
1338 |     };
1339 |   },
1340 | 
1341 |   /**
1342 |    * Reads the entire contents of a file synchronously
1343 |    * @param filePath - The path to the file
1344 |    * @param options - The options for the read operation
1345 |    * @returns The contents of the file as a string
1346 |    * @throws {Error} If the file cannot be read
1347 |    */
1348 |   readFileSync(filePath: string, options: IReadOptions = {}): string {
1349 |     return fsSync.readFileSync(filePath, {
1350 |       encoding: options.encoding ?? "utf-8",
1351 |       flag: options.flag
1352 |     });
1353 |   },
1354 | 
1355 |   /**
1356 |    * Reads the entire contents of a file
1357 |    * @param filePath - The path to the file
1358 |    * @param options - The options for the read operation
1359 |    * @returns The contents of the file as a string
1360 |    * @throws {FileNotFoundError} If the file doesn't exist
1361 |    * @throws {DocumentError} For other file system errors
1362 |    */
1363 |   async readFile(
1364 |     filePath: string,
1365 |     options: IReadOptions = {}
1366 |   ): Promise<string> {
1367 |     try {
1368 |       return await fs.readFile(filePath, {
1369 |         encoding: options.encoding ?? "utf-8",
1370 |         flag: options.flag
1371 |       });
1372 |     } catch (error) {
1373 |       if ((error as NodeJS.ErrnoException).code === "ENOENT") {
1374 |         throw new FileNotFoundError(filePath);
1375 |       }
1376 |       throw new DocumentError(String(error), filePath);
1377 |     }
1378 |   },
1379 | 
1380 |   /**
1381 |    * Writes data to a file, replacing the file if it already exists
1382 |    * @param filePath - The path to the file
1383 |    * @param data - The data to write
1384 |    * @param options - The options for the write operation
1385 |    * @throws {DocumentError} For file system errors
1386 |    */
1387 |   async writeFile(
1388 |     filePath: string,
1389 |     data: string | Buffer,
1390 |     options: IWriteOptions = {}
1391 |   ): Promise<void> {
1392 |     try {
1393 |       // Ensure parent directory exists
1394 |       const parentDir = path.dirname(filePath);
1395 |       await fs.mkdir(parentDir, { recursive: true });
1396 | 
1397 |       // Write the file
1398 |       await fs.writeFile(filePath, data, {
1399 |         encoding: options.encoding ?? "utf-8",
1400 |         mode: options.mode,
1401 |         flag: options.flag
1402 |       });
1403 |     } catch (error) {
1404 |       if (error instanceof DocumentError) {
1405 |         throw error;
1406 |       }
1407 |       throw new DocumentError(String(error), filePath);
1408 |     }
1409 |   },
1410 | 
1411 |   /**
1412 |    * Appends data to a file
1413 |    * @param filePath - The path to the file
1414 |    * @param content - The content to append
1415 |    * @param options - The options for the write operation
1416 |    * @throws {DocumentError} For file system errors
1417 |    */
1418 |   async appendFile(
1419 |     filePath: string,
1420 |     content: string,
1421 |     options: IWriteOptions = {}
1422 |   ): Promise<void> {
1423 |     try {
1424 |       await fs.appendFile(filePath, content, {
1425 |         encoding: options.encoding ?? "utf-8",
1426 |         mode: options.mode,
1427 |         flag: options.flag
1428 |       });
1429 |     } catch (error) {
1430 |       throw new DocumentError(String(error), filePath);
1431 |     }
1432 |   },
1433 | 
1434 |   /**
1435 |    * Reads the contents of a directory
1436 |    * @param dirPath - The path to the directory
1437 |    * @param options - The options for the read operation
1438 |    * @returns An array of file and directory names in the directory
1439 |    * @throws {Error} If the directory cannot be read
1440 |    */
1441 |   async readDir(
1442 |     dirPath: string,
1443 |     options?: { withFileTypes?: boolean }
1444 |   ): Promise<string[]> {
1445 |     return await fs.readdir(dirPath, options as ObjectEncodingOptions);
1446 |   },
1447 | 
1448 |   /**
1449 |    * Creates a directory if it doesn't exist
1450 |    * @param dirPath - The path where to create the directory
1451 |    * @param recursive - Whether to create parent directories if they don't exist
1452 |    * @throws {DocumentError} For file system errors
1453 |    */
1454 |   async createDir(dirPath: string, recursive = true): Promise<void> {
1455 |     await fs.mkdir(dirPath, { recursive });
1456 |   },
1457 | 
1458 |   /**
1459 |    * Gets the base name of a file
1460 |    * @param filePath - The path to the file
1461 |    * @returns The base name of the file (last portion of the path)
1462 |    */
1463 |   baseName(filePath: string): string {
1464 |     return path.basename(filePath);
1465 |   },
1466 | 
1467 |   /**
1468 |    * Gets the extension of a file
1469 |    * @param filePath - The path to the file
1470 |    * @returns The extension of the file including the dot (e.g., '.txt')
1471 |    */
1472 |   extension(filePath: string): string {
1473 |     return path.extname(filePath);
1474 |   },
1475 | 
1476 |   /**
1477 |    * Checks if a file or directory exists
1478 |    * @param filePath - The path to check
1479 |    * @returns True if the file or directory exists, false otherwise
1480 |    */
1481 |   exists(filePath: string): boolean {
1482 |     try {
1483 |       fsSync.accessSync(filePath);
1484 |       return true;
1485 |     } catch {
1486 |       return false;
1487 |     }
1488 |   },
1489 | 
1490 |   /**
1491 |    * Checks if a path is absolute
1492 |    * @param filePath - The path to check
1493 |    * @returns True if the path is absolute, false otherwise
1494 |    */
1495 |   isAbsolute(filePath: string): boolean {
1496 |     return path.isAbsolute(filePath);
1497 |   },
1498 | 
1499 |   /**
1500 |    * Gets directory contents with type information
1501 |    * @param dirPath - The path to the directory
1502 |    * @returns An array of objects containing name and type information for each entry
1503 |    * @throws {DocumentError} If path is not a directory or other errors occur
1504 |    */
1505 |   async readDirectory(
1506 |     dirPath: string
1507 |   ): Promise<Array<{ name: string; type: FileType }>> {
1508 |     try {
1509 |       const entries = await fs.readdir(dirPath, { withFileTypes: true });
1510 |       return entries.map(entry => ({
1511 |         name: entry.name,
1512 |         type: entry.isDirectory() ? FILE_TYPE.Directory : FILE_TYPE.File
1513 |       }));
1514 |     } catch (error) {
1515 |       throw new DocumentError(String(error), dirPath);
1516 |     }
1517 |   },
1518 | 
1519 |   /**
1520 |    * Creates a directory if it doesn't exist
1521 |    * @param dirPath - The path where to create the directory
1522 |    * @param options - Options for directory creation including recursive and mode
1523 |    * @throws {DocumentError} For file system errors
1524 |    */
1525 |   async ensureDirectory(
1526 |     dirPath: string,
1527 |     options: IDirectoryOptions = {}
1528 |   ): Promise<void> {
1529 |     try {
1530 |       if (!this.exists(dirPath)) {
1531 |         await fs.mkdir(dirPath, {
1532 |           recursive: options.recursive ?? true,
1533 |           mode: options.mode
1534 |         });
1535 |       }
1536 |     } catch (error) {
1537 |       throw new DocumentError(String(error), dirPath);
1538 |     }
1539 |   },
1540 | 
1541 |   /**
1542 |    * Removes a file or directory
1543 |    * @param filePath - The path to remove
1544 |    * @throws {DocumentError} For file system errors
1545 |    */
1546 |   async remove(filePath: string): Promise<void> {
1547 |     const stats = await fs.stat(filePath);
1548 |     if (stats.isDirectory()) {
1549 |       await fs.rm(filePath, { recursive: true, force: true });
1550 |     } else {
1551 |       await fs.unlink(filePath);
1552 |     }
1553 |   },
1554 | 
1555 |   /**
1556 |    * Copies a file or directory
1557 |    * @param src - The source path
1558 |    * @param dest - The destination path
1559 |    * @throws {DocumentError} For file system errors
1560 |    */
1561 |   async copy(src: string, dest: string): Promise<void> {
1562 |     const stats = await fs.stat(src);
1563 | 
1564 |     if (stats.isDirectory()) {
1565 |       await this.copyDir(src, dest);
1566 |     } else {
1567 |       await fs.copyFile(src, dest);
1568 |     }
1569 |   },
1570 | 
1571 |   /**
1572 |    * Copies a directory recursively
1573 |    * @private
1574 |    * @param src - The source directory path
1575 |    * @param dest - The destination directory path
1576 |    * @throws {DocumentError} For file system errors
1577 |    */
1578 |   async copyDir(src: string, dest: string): Promise<void> {
1579 |     await this.ensureDirectory(dest);
1580 |     const entries = await fs.readdir(src, { withFileTypes: true });
1581 | 
1582 |     for (const entry of entries) {
1583 |       const srcPath = path.join(src, entry.name);
1584 |       const destPath = path.join(dest, entry.name);
1585 | 
1586 |       if (entry.isDirectory()) {
1587 |         await this.copyDir(srcPath, destPath);
1588 |       } else {
1589 |         await fs.copyFile(srcPath, destPath);
1590 |       }
1591 |     }
1592 |   },
1593 | 
1594 |   /**
1595 |    * Joins an array of paths into a single path
1596 |    * @param paths - The paths to join
1597 |    * @returns The joined path
1598 |    */
1599 |   join(...paths: string[]): string {
1600 |     return path.join(...paths);
1601 |   }
1602 | };
1603 | 
1604 | ```
1605 | #### File: FileStats.ts
1606 | 
1607 | - **Path:** /root/git/codewrangler/src/infrastructure/filesystem/FileStats.ts
1608 | - **Extension:** ts
1609 | - **Size:** 1987 bytes
1610 | - **Depth:** 3
1611 | - **Lines:** 72
1612 | 
1613 | ```ts
1614 | import { Stats } from "fs";
1615 | import fs from "fs/promises";
1616 | 
1617 | import { DocumentError } from "../../core/errors/DocumentError";
1618 | import { FileNotFoundError } from "../../core/errors/FileNotFoundError";
1619 | import { IAccessFlags, IFileStats } from "../../types/type";
1620 | 
1621 | class FileStatsService {
1622 |   public async getStats(filePath: string): Promise<IFileStats> {
1623 |     const stats = await this.getBasicStats(filePath);
1624 |     const accessFlags = await this.checkAccess(filePath);
1625 |     return this.mapStatsToFileInfo(stats, accessFlags);
1626 |   }
1627 |   private async getBasicStats(filePath: string): Promise<Stats> {
1628 |     try {
1629 |       return await fs.stat(filePath);
1630 |     } catch (error) {
1631 |       this.handleStatError(error as NodeJS.ErrnoException, filePath);
1632 |       throw error; // TypeScript requires this
1633 |     }
1634 |   }
1635 | 
1636 |   private handleStatError(
1637 |     error: NodeJS.ErrnoException,
1638 |     filePath: string
1639 |   ): never {
1640 |     if (error.code === "ENOENT") {
1641 |       throw new FileNotFoundError(filePath);
1642 |     }
1643 |     throw new DocumentError(String(error), filePath);
1644 |   }
1645 | 
1646 |   private async checkAccess(filePath: string): Promise<IAccessFlags> {
1647 |     const check = async (mode: number): Promise<boolean> => {
1648 |       try {
1649 |         await fs.access(filePath, mode);
1650 |         return true;
1651 |       } catch {
1652 |         return false;
1653 |       }
1654 |     };
1655 | 
1656 |     return {
1657 |       readable: await check(fs.constants.R_OK),
1658 |       writable: await check(fs.constants.W_OK),
1659 |       executable: await check(fs.constants.X_OK)
1660 |     };
1661 |   }
1662 | 
1663 |   private mapStatsToFileInfo(
1664 |     stats: Stats,
1665 |     accessFlags: IAccessFlags
1666 |   ): IFileStats {
1667 |     return {
1668 |       size: stats.size,
1669 |       created: stats.birthtime,
1670 |       modified: stats.mtime,
1671 |       accessed: stats.atime,
1672 |       isDirectory: stats.isDirectory(),
1673 |       isFile: stats.isFile(),
1674 |       permissions: accessFlags
1675 |     };
1676 |   }
1677 | }
1678 | 
1679 | export const fileStatsService = async (
1680 |   filePath: string
1681 | ): Promise<IFileStats> => {
1682 |   const fileStatsService = new FileStatsService();
1683 |   return await fileStatsService.getStats(filePath);
1684 | };
1685 | 
1686 | ```
1687 | #### File: JsonReader.ts
1688 | 
1689 | - **Path:** /root/git/codewrangler/src/infrastructure/filesystem/JsonReader.ts
1690 | - **Extension:** ts
1691 | - **Size:** 1568 bytes
1692 | - **Depth:** 3
1693 | - **Lines:** 52
1694 | 
1695 | ```ts
1696 | import fs from "fs/promises";
1697 | 
1698 | import { documentFactory } from "./DocumentFactory";
1699 | import { DocumentError } from "../../core/errors/DocumentError";
1700 | import { FileNotFoundError } from "../../core/errors/FileNotFoundError";
1701 | 
1702 | export class JsonReader {
1703 |   public async readJsonSync(filePath: string): Promise<object> {
1704 |     try {
1705 |       const absolutePath = this.validatePath(filePath);
1706 |       const content = await this.readFileContent(absolutePath, filePath);
1707 |       return this.parseJsonContent(content, filePath);
1708 |     } catch (error) {
1709 |       if (error instanceof DocumentError) {
1710 |         throw error;
1711 |       }
1712 |       throw new DocumentError(String(error), filePath);
1713 |     }
1714 |   }
1715 |   private validatePath(filePath: string): string {
1716 |     const absolutePath = documentFactory.resolve(filePath);
1717 |     if (!documentFactory.exists(absolutePath)) {
1718 |       throw new FileNotFoundError(filePath);
1719 |     }
1720 |     return absolutePath;
1721 |   }
1722 | 
1723 |   private async readFileContent(
1724 |     absolutePath: string,
1725 |     filePath: string
1726 |   ): Promise<string> {
1727 |     const content = await fs.readFile(absolutePath, "utf-8");
1728 |     if (!content) {
1729 |       throw new DocumentError(`File is empty`, filePath);
1730 |     }
1731 |     return content;
1732 |   }
1733 | 
1734 |   private parseJsonContent(content: string, filePath: string): object {
1735 |     try {
1736 |       return JSON.parse(content);
1737 |     } catch (error) {
1738 |       throw new DocumentError(`Invalid JSON: ${String(error)}`, filePath);
1739 |     }
1740 |   }
1741 | }
1742 | 
1743 | export const jsonReader = async (path: string): Promise<object> => {
1744 |   const jsonReader = new JsonReader();
1745 |   return await jsonReader.readJsonSync(path);
1746 | };
1747 | 
1748 | ```
1749 | ### Directory: __tests__
1750 | 
1751 | - **Path:** /root/git/codewrangler/src/infrastructure/filesystem/__tests__
1752 | - **Size:** 0 bytes
1753 | - **Files:** 0
1754 | - **Total Files (including subdirectories):** 0
1755 | - **Depth:** 3
1756 | 
1757 | #### Contents:
1758 | 
1759 | ### Directory: __mocks__
1760 | 
1761 | - **Path:** /root/git/codewrangler/src/infrastructure/filesystem/__tests__/__mocks__
1762 | - **Size:** 0 bytes
1763 | - **Files:** 0
1764 | - **Total Files (including subdirectories):** 0
1765 | - **Depth:** 4
1766 | 
1767 | #### Contents:
1768 | 
1769 | ### Directory: templates
1770 | 
1771 | - **Path:** /root/git/codewrangler/src/infrastructure/templates
1772 | - **Size:** 5581 bytes
1773 | - **Files:** 2
1774 | - **Total Files (including subdirectories):** 2
1775 | - **Depth:** 2
1776 | 
1777 | #### Contents:
1778 | 
1779 | #### File: TemplateEngine.ts
1780 | 
1781 | - **Path:** /root/git/codewrangler/src/infrastructure/templates/TemplateEngine.ts
1782 | - **Extension:** ts
1783 | - **Size:** 4369 bytes
1784 | - **Depth:** 3
1785 | - **Lines:** 157
1786 | 
1787 | ```ts
1788 | import { ZodObject, z } from "zod";
1789 | 
1790 | import { TemplateType } from "../../types/template";
1791 | import { Config } from "../../utils/config";
1792 | import { logger } from "../../utils/logger";
1793 | import { documentFactory } from "../filesystem/DocumentFactory";
1794 | 
1795 | type TemplateValue = z.ZodType<string | number | boolean | undefined>;
1796 | 
1797 | export class Template<
1798 |   T extends Record<string, TemplateValue> = Record<string, TemplateValue>
1799 | > {
1800 |   private _content: string = "";
1801 |   private schema: ZodObject<T>;
1802 | 
1803 |   public constructor(
1804 |     private type: TemplateType,
1805 |     schema: ZodObject<T>
1806 |   ) {
1807 |     // convert all fields to optional
1808 |     const optionalFields = Object.fromEntries(
1809 |       Object.entries(schema.shape).map(([key, value]) => [
1810 |         key,
1811 |         value.optional()
1812 |       ])
1813 |     );
1814 |     this.schema = schema.extend(optionalFields) as unknown as ZodObject<T>;
1815 |   }
1816 | 
1817 |   public async load(
1818 |     path: string,
1819 |     additionalFields?: Record<string, z.ZodSchema<string>>
1820 |   ): Promise<void> {
1821 |     this._content = await documentFactory.readFile(path);
1822 |     if (additionalFields) {
1823 |       this.schema = this.schema.extend(additionalFields) as ZodObject<T>;
1824 |     }
1825 |     this.validate();
1826 |   }
1827 | 
1828 |   public static getTemplateDir(config: Config): string {
1829 |     const dir = documentFactory.join(
1830 |       config.get("rootDir") as string,
1831 |       config.get("templatesDir") as string
1832 |     );
1833 |     if (!documentFactory.exists(dir)) {
1834 |       throw new Error(`Templates directory not found: ${dir}`);
1835 |     }
1836 |     return dir;
1837 |   }
1838 | 
1839 |   public get content(): string {
1840 |     if (!this._content) {
1841 |       throw new Error(`Template content is not loaded for ${this.type}`);
1842 |     }
1843 |     return this._content;
1844 |   }
1845 | 
1846 |   public static async create<T extends Record<string, TemplateValue>>(
1847 |     type: TemplateType,
1848 |     schema: ZodObject<T>,
1849 |     path: string,
1850 |     additionalFields?: Record<string, z.ZodSchema<string>>
1851 |   ): Promise<Template<T>> {
1852 |     const template = new Template(type, schema);
1853 |     await template.load(path, additionalFields);
1854 |     return template;
1855 |   }
1856 | 
1857 |   public render(data: Record<string, string | number | boolean>): string {
1858 |     try {
1859 |       this.validateData(data);
1860 |       return this.replaceTokens(data);
1861 |     } catch (error) {
1862 |       if (error instanceof Error) {
1863 |         throw new Error(`Template content validation failed for ${this.type}`);
1864 |       }
1865 |       throw error;
1866 |     }
1867 |   }
1868 | 
1869 |   public dispose(): void {
1870 |     this._content = "";
1871 |   }
1872 | 
1873 |   private validateData(data: Record<string, string | number | boolean>): void {
1874 |     this.schema.parse(data);
1875 |     this.validateRequiredTokens(data);
1876 |   }
1877 | 
1878 |   private validateRequiredTokens(
1879 |     data: Record<string, string | number | boolean>
1880 |   ): void {
1881 |     const contentTokens = this.getTemplateTokens();
1882 |     const missingTokens = this.findMissingRequiredTokens(contentTokens, data);
1883 | 
1884 |     if (missingTokens.length > 0) {
1885 |       throw new Error(
1886 |         `Missing required values for tokens: ${missingTokens.join(", ")}`
1887 |       );
1888 |     }
1889 |   }
1890 | 
1891 |   private findMissingRequiredTokens(
1892 |     tokens: string[],
1893 |     data: Record<string, string | number | boolean>
1894 |   ): string[] {
1895 |     return tokens.filter(token => {
1896 |       const isRequired = this.schema.shape[token]?.isOptional() === false;
1897 |       return isRequired && !(token in data);
1898 |     });
1899 |   }
1900 | 
1901 |   private getTemplateTokens(): string[] {
1902 |     const tokenRegex = /\{\{(\w+)\}\}/g;
1903 |     const tokens: string[] = [];
1904 |     let match;
1905 | 
1906 |     while ((match = tokenRegex.exec(this.content)) !== null) {
1907 |       const token = match[1];
1908 |       if (token === undefined) {
1909 |         throw new Error(`Invalid template content for ${this.type}`);
1910 |       }
1911 |       tokens.push(token);
1912 |     }
1913 | 
1914 |     return tokens;
1915 |   }
1916 | 
1917 |   private replaceTokens(
1918 |     data: Record<string, string | number | boolean>
1919 |   ): string {
1920 |     const contentTokens = this.getTemplateTokens();
1921 |     const pattern = new RegExp(`\\{\\{(${contentTokens.join("|")})\\}\\}`, "g");
1922 | 
1923 |     return this.content.replace(pattern, (_, key) =>
1924 |       key in data ? String(data[key]) : `{{${key}}}`
1925 |     );
1926 |   }
1927 | 
1928 |   private validate(): void {
1929 |     const tokens = this.getTemplateTokens();
1930 |     const requiredFields = Object.keys(this.schema.shape);
1931 |     const missingRequired = requiredFields.filter(
1932 |       field => !tokens.includes(field)
1933 |     );
1934 | 
1935 |     if (missingRequired.length > 0) {
1936 |       logger.warn(
1937 |         `Missing required tokens in ${this.type} template: ${missingRequired.join(
1938 |           ", "
1939 |         )}`
1940 |       );
1941 |     }
1942 |   }
1943 | }
1944 | 
1945 | ```
1946 | ### Directory: __tests__
1947 | 
1948 | - **Path:** /root/git/codewrangler/src/infrastructure/templates/__tests__
1949 | - **Size:** 0 bytes
1950 | - **Files:** 0
1951 | - **Total Files (including subdirectories):** 0
1952 | - **Depth:** 3
1953 | 
1954 | #### Contents:
1955 | 
1956 | #### File: zod.ts
1957 | 
1958 | - **Path:** /root/git/codewrangler/src/infrastructure/templates/zod.ts
1959 | - **Extension:** ts
1960 | - **Size:** 1212 bytes
1961 | - **Depth:** 3
1962 | - **Lines:** 42
1963 | 
1964 | ```ts
1965 | import { z } from "zod";
1966 | 
1967 | export const baseTemplateSchema = z.object({
1968 |   PROJECT_NAME: z.string(),
1969 |   GENERATION_DATE: z.string().datetime(),
1970 |   DIRECTORY_STRUCTURE: z.string(),
1971 |   TOTAL_SIZE: z.number(),
1972 |   TOTAL_FILES: z.number(),
1973 |   TOTAL_DIRECTORIES: z.number(),
1974 |   CONTENT: z.string()
1975 | });
1976 | 
1977 | export type BaseTemplate = z.infer<typeof baseTemplateSchema>;
1978 | export type BaseTemplateString = keyof BaseTemplate;
1979 | 
1980 | export const fileTemplateSchema = z.object({
1981 |   FILE_NAME: z.string(),
1982 |   FILE_EXTENSION: z.string(),
1983 |   FILE_SIZE: z.number(),
1984 |   FILE_DEPTH: z.number(),
1985 |   FILE_LINES: z.number(),
1986 |   FILE_PATH: z.string(),
1987 |   FILE_CONTENTS: z.string()
1988 | });
1989 | 
1990 | export type FileTemplate = z.infer<typeof fileTemplateSchema>;
1991 | export type FileTemplateString = keyof FileTemplate;
1992 | 
1993 | export const directoryTemplateSchema = z.object({
1994 |   DIRECTORY_NAME: z.string(),
1995 |   DIRECTORY_PATH: z.string(),
1996 |   DIRECTORY_SIZE: z.number(),
1997 |   DIRECTORY_LENGTH: z.number(),
1998 |   DIRECTORY_DEEP_LENGTH: z.number(),
1999 |   DIRECTORY_DEPTH: z.number(),
2000 |   DIRECTORY_NUMBER_OF_FILES: z.number(),
2001 |   DIRECTORY_CONTENT: z.string()
2002 | });
2003 | 
2004 | export type DirectoryTemplate = z.infer<typeof directoryTemplateSchema>;
2005 | export type DirectoryTemplateString = keyof DirectoryTemplate;
2006 | 
2007 | ```
2008 | ### Directory: orchestration
2009 | 
2010 | - **Path:** /root/git/codewrangler/src/orchestration
2011 | - **Size:** 5232 bytes
2012 | - **Files:** 3
2013 | - **Total Files (including subdirectories):** 6
2014 | - **Depth:** 1
2015 | 
2016 | #### Contents:
2017 | 
2018 | #### File: DocumentOrchestrator.ts
2019 | 
2020 | - **Path:** /root/git/codewrangler/src/orchestration/DocumentOrchestrator.ts
2021 | - **Extension:** ts
2022 | - **Size:** 2826 bytes
2023 | - **Depth:** 2
2024 | - **Lines:** 94
2025 | 
2026 | ```ts
2027 | import { IDocumentOrchestrator } from "./interfaces/IDocumentOrchestrator";
2028 | import { NodeDirectory } from "../core/entities/NodeDirectory";
2029 | import { NodeFile } from "../core/entities/NodeFile";
2030 | import { documentFactory } from "../infrastructure/filesystem/DocumentFactory";
2031 | import { IRenderStrategy } from "../services/renderer/RenderStrategy";
2032 | import { Config } from "../utils/config/Config";
2033 | import { OUTPUT_FORMATS, OutputFormat } from "../utils/config/schema";
2034 | import { logger } from "../utils/logger/Logger";
2035 | 
2036 | export class DocumentOrchestrator implements IDocumentOrchestrator {
2037 |   private strategy: IRenderStrategy | null = null;
2038 | 
2039 |   private constructor(
2040 |     private readonly root: NodeDirectory | NodeFile,
2041 |     private readonly config: Config
2042 |   ) {}
2043 | 
2044 |   public static create(
2045 |     root: NodeDirectory | NodeFile,
2046 |     config: Config
2047 |   ): DocumentOrchestrator {
2048 |     const orchestrator = new DocumentOrchestrator(root, config);
2049 |     orchestrator.initialize();
2050 |     return orchestrator;
2051 |   }
2052 | 
2053 |   public setStrategy(strategy: IRenderStrategy): this {
2054 |     this.strategy = strategy;
2055 |     return this;
2056 |   }
2057 | 
2058 |   public async build(): Promise<void> {
2059 |     try {
2060 |       if (!this.strategy) {
2061 |         throw new Error("Strategy is not set");
2062 |       }
2063 | 
2064 |       const content = this.strategy.render(this.root as NodeDirectory);
2065 |       const outputFormat = this.strategy.getName();
2066 |       const outputPath = this.resolveOutputPath(outputFormat);
2067 |       await this.ensureOutputDirectory(outputPath);
2068 |       await this.writeOutput(outputPath, content);
2069 | 
2070 |       logger.success(`Document built successfully at ${outputPath}`);
2071 |     } catch (error) {
2072 |       logger.error("Failed to build document", error as Error);
2073 |       throw error;
2074 |     }
2075 |   }
2076 | 
2077 |   public getStrategyName(): string {
2078 |     return this.strategy?.getName() ?? "Unknown";
2079 |   }
2080 | 
2081 |   public dispose(): void {
2082 |     this.strategy?.dispose();
2083 |   }
2084 | 
2085 |   private initialize(): void {
2086 |     this.validateStructure();
2087 |   }
2088 | 
2089 |   private validateStructure(): void {
2090 |     if (!(this.root.type == "directory") && !(this.root.type == "file")) {
2091 |       throw new Error("Invalid root node type");
2092 |     }
2093 |   }
2094 | 
2095 |   private resolveOutputPath(outputFormat: OutputFormat): string {
2096 |     const outputFile = this.config.get("outputFile");
2097 |     return documentFactory.resolve(
2098 |       `${outputFile}.${OUTPUT_FORMATS[outputFormat]}`
2099 |     );
2100 |   }
2101 | 
2102 |   private async ensureOutputDirectory(outputPath: string): Promise<void> {
2103 |     const directory = documentFactory.baseName(outputPath);
2104 |     if (
2105 |       outputPath.endsWith(`.${OUTPUT_FORMATS.html}`) ||
2106 |       outputPath.endsWith(`.${OUTPUT_FORMATS.markdown}`)
2107 |     ) {
2108 |       return;
2109 |     }
2110 |     await documentFactory.ensureDirectory(directory);
2111 |   }
2112 | 
2113 |   private async writeOutput(
2114 |     outputPath: string,
2115 |     content: string
2116 |   ): Promise<void> {
2117 |     await documentFactory.writeFile(outputPath, content);
2118 |   }
2119 | }
2120 | 
2121 | ```
2122 | #### File: DocumentOrchestratorBuilder.ts
2123 | 
2124 | - **Path:** /root/git/codewrangler/src/orchestration/DocumentOrchestratorBuilder.ts
2125 | - **Extension:** ts
2126 | - **Size:** 2018 bytes
2127 | - **Depth:** 2
2128 | - **Lines:** 72
2129 | 
2130 | ```ts
2131 | import { DocumentOrchestrator } from "./DocumentOrchestrator";
2132 | import { NodeDirectory } from "../core/entities/NodeDirectory";
2133 | import { NodeFile } from "../core/entities/NodeFile";
2134 | import { IRenderStrategy } from "../services/renderer/RenderStrategy";
2135 | import { Config } from "../utils/config/Config";
2136 | import { logger } from "../utils/logger/Logger";
2137 | 
2138 | export class DocumentOrchestratorBuilder {
2139 |   private root: NodeDirectory | NodeFile | null = null;
2140 |   private config: Config | null = null;
2141 |   private strategies: IRenderStrategy[] = [];
2142 | 
2143 |   public setRoot(root: NodeDirectory | NodeFile): this {
2144 |     this.root = root;
2145 |     return this;
2146 |   }
2147 | 
2148 |   public setConfig(config: Config): this {
2149 |     this.config = config;
2150 |     return this;
2151 |   }
2152 | 
2153 |   public addStrategy(strategy: IRenderStrategy): this {
2154 |     this.strategies.push(strategy);
2155 |     return this;
2156 |   }
2157 | 
2158 |   public setStrategies(strategies: IRenderStrategy[]): this {
2159 |     this.strategies = strategies;
2160 |     return this;
2161 |   }
2162 | 
2163 |   public async build(): Promise<DocumentOrchestrator[]> {
2164 |     if (!this.root || !this.config) {
2165 |       throw new Error("Missing required components for DocumentOrchestrator");
2166 |     }
2167 | 
2168 |     if (this.strategies.length === 0) {
2169 |       throw new Error("At least one render strategy is required");
2170 |     }
2171 | 
2172 |     const orchestrators: DocumentOrchestrator[] = [];
2173 | 
2174 |     for (const strategy of this.strategies) {
2175 |       const orchestrator = await DocumentOrchestrator.create(
2176 |         this.root,
2177 |         this.config
2178 |       );
2179 |       orchestrator.setStrategy(strategy);
2180 |       orchestrators.push(orchestrator);
2181 |     }
2182 | 
2183 |     return orchestrators;
2184 |   }
2185 |   public async buildAndExecute(): Promise<DocumentOrchestrator[]> {
2186 |     const orchestrators = await this.build();
2187 | 
2188 |     for (const orchestrator of orchestrators) {
2189 |       try {
2190 |         await orchestrator.build();
2191 |       } catch (error) {
2192 |         logger.error(
2193 |           `Failed to build documentation with strategy ${orchestrator.getStrategyName()}`,
2194 |           error as Error
2195 |         );
2196 |       }
2197 |     }
2198 | 
2199 |     return orchestrators;
2200 |   }
2201 | }
2202 | 
2203 | ```
2204 | #### File: index.ts
2205 | 
2206 | - **Path:** /root/git/codewrangler/src/orchestration/index.ts
2207 | - **Extension:** ts
2208 | - **Size:** 0 bytes
2209 | - **Depth:** 2
2210 | - **Lines:** 1
2211 | 
2212 | ```ts
2213 | 
2214 | ```
2215 | ### Directory: interfaces
2216 | 
2217 | - **Path:** /root/git/codewrangler/src/orchestration/interfaces
2218 | - **Size:** 388 bytes
2219 | - **Files:** 3
2220 | - **Total Files (including subdirectories):** 3
2221 | - **Depth:** 2
2222 | 
2223 | #### Contents:
2224 | 
2225 | #### File: IDocumentMetadata.ts
2226 | 
2227 | - **Path:** /root/git/codewrangler/src/orchestration/interfaces/IDocumentMetadata.ts
2228 | - **Extension:** ts
2229 | - **Size:** 132 bytes
2230 | - **Depth:** 3
2231 | - **Lines:** 8
2232 | 
2233 | ```ts
2234 | export interface IDocumentMetadata {
2235 |   title: string;
2236 |   description: string;
2237 |   author: string;
2238 |   date: string;
2239 |   version: string;
2240 | }
2241 | 
2242 | ```
2243 | #### File: IDocumentOrchestrator.ts
2244 | 
2245 | - **Path:** /root/git/codewrangler/src/orchestration/interfaces/IDocumentOrchestrator.ts
2246 | - **Extension:** ts
2247 | - **Size:** 256 bytes
2248 | - **Depth:** 3
2249 | - **Lines:** 9
2250 | 
2251 | ```ts
2252 | import { IRenderStrategy } from "../../services/renderer/RenderStrategy";
2253 | 
2254 | export interface IDocumentOrchestrator {
2255 |   setStrategy: (strategy: IRenderStrategy) => this;
2256 |   getStrategyName: () => string;
2257 |   build: () => Promise<void>;
2258 |   dispose: () => void;
2259 | }
2260 | 
2261 | ```
2262 | #### File: index.ts
2263 | 
2264 | - **Path:** /root/git/codewrangler/src/orchestration/interfaces/index.ts
2265 | - **Extension:** ts
2266 | - **Size:** 0 bytes
2267 | - **Depth:** 3
2268 | - **Lines:** 1
2269 | 
2270 | ```ts
2271 | 
2272 | ```
2273 | ### Directory: services
2274 | 
2275 | - **Path:** /root/git/codewrangler/src/services
2276 | - **Size:** 14713 bytes
2277 | - **Files:** 0
2278 | - **Total Files (including subdirectories):** 8
2279 | - **Depth:** 1
2280 | 
2281 | #### Contents:
2282 | 
2283 | ### Directory: builder
2284 | 
2285 | - **Path:** /root/git/codewrangler/src/services/builder
2286 | - **Size:** 5920 bytes
2287 | - **Files:** 3
2288 | - **Total Files (including subdirectories):** 3
2289 | - **Depth:** 2
2290 | 
2291 | #### Contents:
2292 | 
2293 | #### File: DocumentTreeBuilder.ts
2294 | 
2295 | - **Path:** /root/git/codewrangler/src/services/builder/DocumentTreeBuilder.ts
2296 | - **Extension:** ts
2297 | - **Size:** 1814 bytes
2298 | - **Depth:** 3
2299 | - **Lines:** 59
2300 | 
2301 | ```ts
2302 | import { INodeTree, NodeTreeBuilder } from "./NodeTreeBuilder";
2303 | import { RenderableDirectory } from "../../core/entities/NodeDirectory";
2304 | import { RenderableFile } from "../../core/entities/NodeFile";
2305 | import { FILE_TYPE } from "../../types/type";
2306 | import { Config } from "../../utils/config";
2307 | import { logger } from "../../utils/logger";
2308 | 
2309 | export class DocumentTreeBuilder {
2310 |   private root: RenderableDirectory | RenderableFile | undefined;
2311 |   private builder: NodeTreeBuilder;
2312 |   public constructor(config: Config) {
2313 |     this.builder = new NodeTreeBuilder(config);
2314 |   }
2315 | 
2316 |   public async build(): Promise<RenderableDirectory | RenderableFile> {
2317 |     try {
2318 |       // Build file tree structure
2319 |       const fileTree = await this.builder.build();
2320 | 
2321 |       // Convert file tree to Document tree
2322 |       this.root = await this.createDocumentStructure(fileTree);
2323 | 
2324 |       // Initialize the entire document tree
2325 |       await this.root.bundle();
2326 | 
2327 |       if (!this.root) {
2328 |         throw new Error("No files found matching the specified pattern");
2329 |       }
2330 | 
2331 |       logger.info("Document tree built successfully");
2332 | 
2333 |       return this.root;
2334 |     } catch (error) {
2335 |       logger.error("Error building document tree", error as Error);
2336 |       throw error;
2337 |     }
2338 |   }
2339 | 
2340 |   private async createDocumentStructure(
2341 |     node: INodeTree
2342 |   ): Promise<RenderableDirectory | RenderableFile> {
2343 |     if (node.type === FILE_TYPE.Directory) {
2344 |       const directory = new RenderableDirectory(node.name, node.path);
2345 | 
2346 |       if (node.children) {
2347 |         // Recursively create children
2348 |         for (const child of node.children) {
2349 |           const childDocument = await this.createDocumentStructure(child);
2350 |           directory.addChild(childDocument);
2351 |         }
2352 |       }
2353 | 
2354 |       return directory;
2355 |     } else {
2356 |       return new RenderableFile(node.name, node.path);
2357 |     }
2358 |   }
2359 | }
2360 | 
2361 | ```
2362 | #### File: FileHidden.ts
2363 | 
2364 | - **Path:** /root/git/codewrangler/src/services/builder/FileHidden.ts
2365 | - **Extension:** ts
2366 | - **Size:** 893 bytes
2367 | - **Depth:** 3
2368 | - **Lines:** 33
2369 | 
2370 | ```ts
2371 | import { minimatch } from "minimatch";
2372 | 
2373 | import { Config } from "../../utils/config";
2374 | 
2375 | export default class FileHidden {
2376 |   private ignoreHiddenFiles: boolean;
2377 |   private patterns: string[];
2378 |   private additionalIgnoreFiles: string[];
2379 | 
2380 |   public constructor(config: Config) {
2381 |     this.ignoreHiddenFiles = config.get("ignoreHiddenFiles") as boolean;
2382 |     this.patterns = [...config.get("excludePatterns")];
2383 |     this.additionalIgnoreFiles = config.get("additionalIgnoreFiles");
2384 |   }
2385 | 
2386 |   public shouldExclude(fileName: string): boolean {
2387 |     if (this.ignoreHiddenFiles && fileName.startsWith(".")) {
2388 |       return true;
2389 |     }
2390 | 
2391 |     if (this.patterns.some(pattern => minimatch(fileName, pattern))) {
2392 |       return true;
2393 |     }
2394 | 
2395 |     if (this.additionalIgnoreFiles.some(file => minimatch(fileName, file))) {
2396 |       // Additional ignore files are always excluded
2397 |       return true;
2398 |     }
2399 | 
2400 |     return false;
2401 |   }
2402 | }
2403 | 
2404 | ```
2405 | #### File: NodeTreeBuilder.ts
2406 | 
2407 | - **Path:** /root/git/codewrangler/src/services/builder/NodeTreeBuilder.ts
2408 | - **Extension:** ts
2409 | - **Size:** 3213 bytes
2410 | - **Depth:** 3
2411 | - **Lines:** 119
2412 | 
2413 | ```ts
2414 | import FileHidden from "./FileHidden";
2415 | import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
2416 | import { fileStatsService } from "../../infrastructure/filesystem/FileStats";
2417 | import { FILE_TYPE, FileType } from "../../types/type";
2418 | import { Config, ConfigOptions } from "../../utils/config";
2419 | 
2420 | export interface INodeTree {
2421 |   name: string;
2422 |   path: string;
2423 |   type: FileType;
2424 |   children?: INodeTree[];
2425 | }
2426 | 
2427 | export interface INodeTreeBuilderOptions
2428 |   extends Pick<
2429 |     ConfigOptions,
2430 |     | "additionalIgnoreFiles"
2431 |     | "maxDepth"
2432 |     | "excludePatterns"
2433 |     | "dir"
2434 |     | "followSymlinks"
2435 |   > {
2436 |   pattern: RegExp;
2437 |   returnType: "paths" | "details";
2438 | }
2439 | 
2440 | export class NodeTreeBuilder {
2441 |   private config: Config;
2442 |   private options: INodeTreeBuilderOptions;
2443 |   private fileHidden: FileHidden;
2444 | 
2445 |   public constructor(config: Config) {
2446 |     this.config = config;
2447 |     this.options = this.initializeOptions();
2448 |     this.fileHidden = new FileHidden(config);
2449 |   }
2450 | 
2451 |   public async build(): Promise<INodeTree> {
2452 |     const rootDir = this.options.dir;
2453 |     if (!documentFactory.exists(rootDir)) {
2454 |       throw new Error(`Directory ${rootDir} does not exist`);
2455 |     }
2456 |     return await this.buildTree(rootDir);
2457 |   }
2458 | 
2459 |   private initializeOptions(): INodeTreeBuilderOptions {
2460 |     return {
2461 |       dir: this.config.get("dir"),
2462 |       pattern: new RegExp(this.config.get("pattern")),
2463 |       maxDepth: this.config.get("maxDepth"),
2464 |       excludePatterns: this.config.get("excludePatterns"),
2465 |       additionalIgnoreFiles: this.config.get("additionalIgnoreFiles"),
2466 |       returnType: "details",
2467 |       followSymlinks: false
2468 |     };
2469 |   }
2470 | 
2471 |   private async createNode(nodePath: string): Promise<INodeTree> {
2472 |     const stats = await fileStatsService(nodePath);
2473 |     const name = documentFactory.baseName(nodePath);
2474 | 
2475 |     return {
2476 |       name,
2477 |       path: nodePath,
2478 |       type: stats.isDirectory ? FILE_TYPE.Directory : FILE_TYPE.File
2479 |     };
2480 |   }
2481 | 
2482 |   private shouldProcessChildren(node: INodeTree, depth: number): boolean {
2483 |     const isDirectory = node.type === FILE_TYPE.Directory;
2484 |     const withinDepthLimit =
2485 |       !this.options.maxDepth || depth < this.options.maxDepth;
2486 |     return isDirectory && withinDepthLimit;
2487 |   }
2488 | 
2489 |   private async processChildren(
2490 |     nodePath: string,
2491 |     depth: number
2492 |   ): Promise<INodeTree[]> {
2493 |     const entries = await documentFactory.readDir(nodePath);
2494 |     const children: INodeTree[] = [];
2495 | 
2496 |     for (const entry of entries) {
2497 |       const childNode = await this.processChild(nodePath, entry, depth);
2498 |       if (childNode) {
2499 |         children.push(childNode);
2500 |       }
2501 |     }
2502 | 
2503 |     return children;
2504 |   }
2505 | 
2506 |   private async processChild(
2507 |     parentPath: string,
2508 |     entry: string,
2509 |     depth: number
2510 |   ): Promise<INodeTree | null> {
2511 |     if (this.fileHidden.shouldExclude(entry)) {
2512 |       return null;
2513 |     }
2514 | 
2515 |     const childPath = documentFactory.join(parentPath, entry);
2516 |     return await this.buildTree(childPath, depth + 1);
2517 |   }
2518 | 
2519 |   private async buildTree(
2520 |     nodePath: string,
2521 |     depth: number = 0
2522 |   ): Promise<INodeTree> {
2523 |     const node = await this.createNode(nodePath);
2524 | 
2525 |     if (this.shouldProcessChildren(node, depth)) {
2526 |       node.children = await this.processChildren(nodePath, depth);
2527 |     }
2528 | 
2529 |     return node;
2530 |   }
2531 | }
2532 | 
2533 | ```
2534 | ### Directory: __tests__
2535 | 
2536 | - **Path:** /root/git/codewrangler/src/services/builder/__tests__
2537 | - **Size:** 0 bytes
2538 | - **Files:** 0
2539 | - **Total Files (including subdirectories):** 0
2540 | - **Depth:** 3
2541 | 
2542 | #### Contents:
2543 | 
2544 | ### Directory: renderer
2545 | 
2546 | - **Path:** /root/git/codewrangler/src/services/renderer
2547 | - **Size:** 8793 bytes
2548 | - **Files:** 3
2549 | - **Total Files (including subdirectories):** 5
2550 | - **Depth:** 2
2551 | 
2552 | #### Contents:
2553 | 
2554 | #### File: RenderStrategy.ts
2555 | 
2556 | - **Path:** /root/git/codewrangler/src/services/renderer/RenderStrategy.ts
2557 | - **Extension:** ts
2558 | - **Size:** 3388 bytes
2559 | - **Depth:** 3
2560 | - **Lines:** 109
2561 | 
2562 | ```ts
2563 | import { NodeDirectory } from "../../core/entities/NodeDirectory";
2564 | import { NodeFile } from "../../core/entities/NodeFile";
2565 | import { Template } from "../../infrastructure/templates/TemplateEngine";
2566 | import {
2567 |   BaseTemplate,
2568 |   DirectoryTemplate,
2569 |   FileTemplate
2570 | } from "../../infrastructure/templates/zod";
2571 | import { Config, OutputFormat } from "../../utils/config";
2572 | 
2573 | interface IContentRenderer {
2574 |   renderFile: (file: NodeFile) => string;
2575 |   renderDirectory: (directory: NodeDirectory) => string;
2576 | }
2577 | 
2578 | interface IDocumentRenderer {
2579 |   render: (rootDirectory: NodeDirectory) => string;
2580 |   dispose: () => void;
2581 | }
2582 | 
2583 | export interface IRenderStrategy extends IContentRenderer, IDocumentRenderer {
2584 |   getName: () => OutputFormat;
2585 | }
2586 | 
2587 | export abstract class RenderBaseStrategy implements IRenderStrategy {
2588 |   protected templatePage: Template;
2589 |   protected templateDirectory: Template;
2590 |   protected templateFile: Template;
2591 | 
2592 |   protected constructor(
2593 |     private readonly config: Config,
2594 |     public readonly name: OutputFormat,
2595 |     templatePage: Template,
2596 |     templateDirectory: Template,
2597 |     templateFile: Template
2598 |   ) {
2599 |     this.templatePage = templatePage;
2600 |     this.templateDirectory = templateDirectory;
2601 |     this.templateFile = templateFile;
2602 |   }
2603 | 
2604 |   public getName(): OutputFormat {
2605 |     return this.name;
2606 |   }
2607 | 
2608 |   public renderFile(file: NodeFile): string {
2609 |     return this.templateFile.render({
2610 |       FILE_NAME: file.name,
2611 |       FILE_EXTENSION: file.extension.replace(".", ""),
2612 |       FILE_SIZE: file.size,
2613 |       FILE_DEPTH: file.deep,
2614 |       FILE_LINES: file.content?.split("\n").length || 0,
2615 |       FILE_PATH: file.path,
2616 |       FILE_CONTENTS: file.content || ""
2617 |     } as FileTemplate & Record<string, string>);
2618 |   }
2619 | 
2620 |   public renderDirectory(directory: NodeDirectory): string {
2621 |     const content = this.renderChildren(directory.children);
2622 | 
2623 |     return this.templateDirectory.render({
2624 |       DIRECTORY_NAME: directory.name,
2625 |       DIRECTORY_PATH: directory.path,
2626 |       DIRECTORY_SIZE: directory.size,
2627 |       DIRECTORY_LENGTH: directory.length,
2628 |       DIRECTORY_NUMBER_OF_FILES: directory.numberOfFiles,
2629 |       DIRECTORY_DEEP_LENGTH: directory.deepLength,
2630 |       DIRECTORY_DEPTH: directory.deep,
2631 |       DIRECTORY_CONTENT: content
2632 |     } as DirectoryTemplate & Record<string, string>);
2633 |   }
2634 | 
2635 |   public render(rootDirectory: NodeDirectory | NodeFile): string {
2636 |     const rootContent = this.renderNode(rootDirectory);
2637 | 
2638 |     const templateConfig = {
2639 |       PROJECT_NAME:
2640 |         this.config.get("projectName") || rootDirectory.name || "Project",
2641 |       GENERATION_DATE: new Date().toISOString(),
2642 |       TOTAL_SIZE: rootDirectory.size,
2643 |       CONTENT: rootContent
2644 |     } as BaseTemplate & Record<string, string>;
2645 | 
2646 |     if (rootDirectory.type === "directory") {
2647 |       templateConfig["TOTAL_FILES"] = rootDirectory.length;
2648 |       templateConfig["TOTAL_DIRECTORIES"] = rootDirectory.deepLength;
2649 |     }
2650 | 
2651 |     return this.templatePage.render(templateConfig);
2652 |   }
2653 | 
2654 |   public dispose(): void {
2655 |     this.templatePage.dispose();
2656 |     this.templateDirectory.dispose();
2657 |     this.templateFile.dispose();
2658 |   }
2659 | 
2660 |   protected renderNode(node: NodeFile | NodeDirectory): string {
2661 |     return node.type === "file"
2662 |       ? this.renderFile(node)
2663 |       : this.renderDirectory(node);
2664 |   }
2665 | 
2666 |   protected renderChildren(children: (NodeFile | NodeDirectory)[]): string {
2667 |     if (!children) return "";
2668 |     return children.map(child => this.renderNode(child)).join("");
2669 |   }
2670 | }
2671 | 
2672 | ```
2673 | #### File: RenderStrategyBuilder.ts
2674 | 
2675 | - **Path:** /root/git/codewrangler/src/services/renderer/RenderStrategyBuilder.ts
2676 | - **Extension:** ts
2677 | - **Size:** 3112 bytes
2678 | - **Depth:** 3
2679 | - **Lines:** 105
2680 | 
2681 | ```ts
2682 | import { RenderBaseStrategy } from "./RenderStrategy";
2683 | import { RenderHTMLStrategy } from "./strategies/HTMLStrategy";
2684 | import { RenderMarkdownStrategy } from "./strategies/MarkdownStrategy";
2685 | import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
2686 | import { Template } from "../../infrastructure/templates/TemplateEngine";
2687 | import {
2688 |   baseTemplateSchema,
2689 |   directoryTemplateSchema,
2690 |   fileTemplateSchema
2691 | } from "../../infrastructure/templates/zod";
2692 | import { Config, OutputFormatExtension } from "../../utils/config";
2693 | 
2694 | export class RenderStrategyBuilder {
2695 |   private config: Config | null = null;
2696 |   private extension: OutputFormatExtension | null = null;
2697 |   private name: string | null = null;
2698 |   private templatePage: Template | null = null;
2699 |   private templateDirectory: Template | null = null;
2700 |   private templateFile: Template | null = null;
2701 | 
2702 |   public setConfig(config: Config): RenderStrategyBuilder {
2703 |     this.config = config;
2704 |     return this;
2705 |   }
2706 | 
2707 |   public setExtension(extension: OutputFormatExtension): RenderStrategyBuilder {
2708 |     this.extension = extension;
2709 |     return this;
2710 |   }
2711 | 
2712 |   public setName(name: string): RenderStrategyBuilder {
2713 |     this.name = name;
2714 |     return this;
2715 |   }
2716 | 
2717 |   public async loadTemplates(): Promise<RenderStrategyBuilder> {
2718 |     if (!this.config) {
2719 |       throw new Error("Config is required");
2720 |     }
2721 | 
2722 |     const templateDir = Template.getTemplateDir(this.config);
2723 | 
2724 |     this.templatePage = await this.loadTemplatePage(templateDir);
2725 |     this.templateDirectory = await this.loadTemplateDirectory(templateDir);
2726 |     this.templateFile = await this.loadTemplateFile(templateDir);
2727 | 
2728 |     return this;
2729 |   }
2730 | 
2731 |   public build(): RenderBaseStrategy {
2732 |     this.validate();
2733 | 
2734 |     const concreteRenderStrategy =
2735 |       this.name === "Markdown" ? RenderMarkdownStrategy : RenderHTMLStrategy;
2736 | 
2737 |     return new concreteRenderStrategy(
2738 |       this.config as Config,
2739 |       this.templatePage as Template,
2740 |       this.templateDirectory as Template,
2741 |       this.templateFile as Template
2742 |     );
2743 |   }
2744 | 
2745 |   private validate(): boolean {
2746 |     if (!this.config) {
2747 |       throw new Error("Config is required");
2748 |     }
2749 |     if (!this.extension) {
2750 |       throw new Error("Extension is required");
2751 |     }
2752 |     if (!this.name) {
2753 |       throw new Error("Name is required");
2754 |     }
2755 |     if (!this.templatePage || !this.templateDirectory || !this.templateFile) {
2756 |       throw new Error("Templates must be loaded before building");
2757 |     }
2758 | 
2759 |     return true;
2760 |   }
2761 | 
2762 |   private loadTemplateFile(templateDir: string): Promise<Template> {
2763 |     return Template.create(
2764 |       "file",
2765 |       fileTemplateSchema,
2766 |       documentFactory.join(templateDir, `file.${this.extension}`)
2767 |     );
2768 |   }
2769 | 
2770 |   private loadTemplateDirectory(templateDir: string): Promise<Template> {
2771 |     return Template.create(
2772 |       "directory",
2773 |       directoryTemplateSchema,
2774 |       documentFactory.join(templateDir, `directory.${this.extension}`)
2775 |     );
2776 |   }
2777 | 
2778 |   private loadTemplatePage(templateDir: string): Promise<Template> {
2779 |     return Template.create(
2780 |       "page",
2781 |       baseTemplateSchema,
2782 |       documentFactory.join(templateDir, `page.${this.extension}`)
2783 |     );
2784 |   }
2785 | }
2786 | 
2787 | ```
2788 | #### File: RenderStrategyFactory.ts
2789 | 
2790 | - **Path:** /root/git/codewrangler/src/services/renderer/RenderStrategyFactory.ts
2791 | - **Extension:** ts
2792 | - **Size:** 1367 bytes
2793 | - **Depth:** 3
2794 | - **Lines:** 47
2795 | 
2796 | ```ts
2797 | import { RenderBaseStrategy } from "./RenderStrategy";
2798 | import { RenderStrategyBuilder } from "./RenderStrategyBuilder";
2799 | import { Config } from "../../utils/config/Config";
2800 | import { OutputFormat } from "../../utils/config/schema";
2801 | 
2802 | // Factory function for common render strategies
2803 | export const renderStrategyFactory = {
2804 |   async createMarkdownStrategy(config: Config): Promise<RenderBaseStrategy> {
2805 |     return await new RenderStrategyBuilder()
2806 |       .setConfig(config)
2807 |       .setExtension("md")
2808 |       .setName("Markdown")
2809 |       .loadTemplates()
2810 |       .then(builder => builder.build());
2811 |   },
2812 | 
2813 |   async createHTMLStrategy(config: Config): Promise<RenderBaseStrategy> {
2814 |     return await new RenderStrategyBuilder()
2815 |       .setConfig(config)
2816 |       .setExtension("html")
2817 |       .setName("HTML")
2818 |       .loadTemplates()
2819 |       .then(builder => builder.build());
2820 |   },
2821 | 
2822 |   async createStrategies(
2823 |     config: Config,
2824 |     formats: OutputFormat[]
2825 |   ): Promise<RenderBaseStrategy[]> {
2826 |     return await Promise.all(
2827 |       formats.map(format => this.createStrategy(config, format))
2828 |     );
2829 |   },
2830 | 
2831 |   async createStrategy(
2832 |     config: Config,
2833 |     format: OutputFormat
2834 |   ): Promise<RenderBaseStrategy> {
2835 |     switch (format) {
2836 |       case "markdown":
2837 |         return await this.createMarkdownStrategy(config);
2838 |       case "html":
2839 |         return await this.createHTMLStrategy(config);
2840 |     }
2841 |   }
2842 | };
2843 | 
2844 | ```
2845 | ### Directory: __tests__
2846 | 
2847 | - **Path:** /root/git/codewrangler/src/services/renderer/__tests__
2848 | - **Size:** 0 bytes
2849 | - **Files:** 0
2850 | - **Total Files (including subdirectories):** 0
2851 | - **Depth:** 3
2852 | 
2853 | #### Contents:
2854 | 
2855 | ### Directory: strategies
2856 | 
2857 | - **Path:** /root/git/codewrangler/src/services/renderer/strategies
2858 | - **Size:** 926 bytes
2859 | - **Files:** 2
2860 | - **Total Files (including subdirectories):** 2
2861 | - **Depth:** 3
2862 | 
2863 | #### Contents:
2864 | 
2865 | #### File: HTMLStrategy.ts
2866 | 
2867 | - **Path:** /root/git/codewrangler/src/services/renderer/strategies/HTMLStrategy.ts
2868 | - **Extension:** ts
2869 | - **Size:** 459 bytes
2870 | - **Depth:** 4
2871 | - **Lines:** 15
2872 | 
2873 | ```ts
2874 | import { Template } from "../../../infrastructure/templates/TemplateEngine";
2875 | import { Config } from "../../../utils/config";
2876 | import { RenderBaseStrategy } from "../RenderStrategy";
2877 | 
2878 | export class RenderHTMLStrategy extends RenderBaseStrategy {
2879 |   public constructor(
2880 |     config: Config,
2881 |     templatePage: Template,
2882 |     templateDirectory: Template,
2883 |     templateFile: Template
2884 |   ) {
2885 |     super(config, "html", templatePage, templateDirectory, templateFile);
2886 |   }
2887 | }
2888 | 
2889 | ```
2890 | #### File: MarkdownStrategy.ts
2891 | 
2892 | - **Path:** /root/git/codewrangler/src/services/renderer/strategies/MarkdownStrategy.ts
2893 | - **Extension:** ts
2894 | - **Size:** 467 bytes
2895 | - **Depth:** 4
2896 | - **Lines:** 15
2897 | 
2898 | ```ts
2899 | import { Template } from "../../../infrastructure/templates/TemplateEngine";
2900 | import { Config } from "../../../utils/config";
2901 | import { RenderBaseStrategy } from "../RenderStrategy";
2902 | 
2903 | export class RenderMarkdownStrategy extends RenderBaseStrategy {
2904 |   public constructor(
2905 |     config: Config,
2906 |     templatePage: Template,
2907 |     templateDirectory: Template,
2908 |     templateFile: Template
2909 |   ) {
2910 |     super(config, "markdown", templatePage, templateDirectory, templateFile);
2911 |   }
2912 | }
2913 | 
2914 | ```
2915 | ### Directory: types
2916 | 
2917 | - **Path:** /root/git/codewrangler/src/types
2918 | - **Size:** 1314 bytes
2919 | - **Files:** 2
2920 | - **Total Files (including subdirectories):** 2
2921 | - **Depth:** 1
2922 | 
2923 | #### Contents:
2924 | 
2925 | #### File: template.ts
2926 | 
2927 | - **Path:** /root/git/codewrangler/src/types/template.ts
2928 | - **Extension:** ts
2929 | - **Size:** 229 bytes
2930 | - **Depth:** 2
2931 | - **Lines:** 10
2932 | 
2933 | ```ts
2934 | import { z } from "zod";
2935 | 
2936 | export type TemplateType = "page" | "file" | "directory";
2937 | 
2938 | export interface ITemplateContent<T> {
2939 |   content: string;
2940 |   schema: z.ZodSchema<T>;
2941 |   additionalFields?: Record<string, z.ZodSchema<string>>;
2942 | }
2943 | 
2944 | ```
2945 | #### File: type.ts
2946 | 
2947 | - **Path:** /root/git/codewrangler/src/types/type.ts
2948 | - **Extension:** ts
2949 | - **Size:** 1085 bytes
2950 | - **Depth:** 2
2951 | - **Lines:** 62
2952 | 
2953 | ```ts
2954 | export const FILE_TYPE = {
2955 |   File: "file",
2956 |   Directory: "directory"
2957 | } as const;
2958 | 
2959 | export type FileType = (typeof FILE_TYPE)[keyof typeof FILE_TYPE];
2960 | 
2961 | export interface IAccessFlags {
2962 |   readable: boolean;
2963 |   writable: boolean;
2964 |   executable: boolean;
2965 | }
2966 | 
2967 | export interface IFileStats {
2968 |   size: number;
2969 |   created: Date;
2970 |   modified: Date;
2971 |   accessed: Date;
2972 |   isDirectory: boolean;
2973 |   isFile: boolean;
2974 |   permissions: IAccessFlags;
2975 | }
2976 | 
2977 | export interface IReadOptions {
2978 |   encoding?: BufferEncoding;
2979 |   flag?: string;
2980 | }
2981 | 
2982 | export interface IWriteOptions extends IReadOptions {
2983 |   mode?: number;
2984 |   flag?: string;
2985 | }
2986 | 
2987 | export interface IDirectoryOptions {
2988 |   recursive?: boolean;
2989 |   mode?: number;
2990 | }
2991 | 
2992 | export interface IFileTreeItem {
2993 |   path: string;
2994 |   type: FileType;
2995 |   stats?: IFileStats;
2996 | }
2997 | 
2998 | export interface IPropsNode {
2999 |   name: string;
3000 |   path: string;
3001 |   deep: number;
3002 |   size: number;
3003 |   extension?: string;
3004 |   stats?: IFileStats;
3005 | }
3006 | 
3007 | export interface IPropsDirectoryNode extends IPropsNode {
3008 |   deepLength: number;
3009 |   length: number;
3010 | }
3011 | 
3012 | export interface IPropsFileNode extends IPropsNode {
3013 |   extension: string;
3014 | }
3015 | 
3016 | ```
3017 | ### Directory: utils
3018 | 
3019 | - **Path:** /root/git/codewrangler/src/utils
3020 | - **Size:** 9149 bytes
3021 | - **Files:** 0
3022 | - **Total Files (including subdirectories):** 6
3023 | - **Depth:** 1
3024 | 
3025 | #### Contents:
3026 | 
3027 | ### Directory: config
3028 | 
3029 | - **Path:** /root/git/codewrangler/src/utils/config
3030 | - **Size:** 5564 bytes
3031 | - **Files:** 3
3032 | - **Total Files (including subdirectories):** 3
3033 | - **Depth:** 2
3034 | 
3035 | #### Contents:
3036 | 
3037 | #### File: Config.ts
3038 | 
3039 | - **Path:** /root/git/codewrangler/src/utils/config/Config.ts
3040 | - **Extension:** ts
3041 | - **Size:** 2649 bytes
3042 | - **Depth:** 3
3043 | - **Lines:** 96
3044 | 
3045 | ```ts
3046 | import { z } from "zod";
3047 | 
3048 | import {
3049 |   ConfigKeys,
3050 |   ConfigOptions,
3051 |   DEFAULT_CONFIG,
3052 |   configSchema
3053 | } from "./schema";
3054 | import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
3055 | import { JsonReader } from "../../infrastructure/filesystem/JsonReader";
3056 | import { logger } from "../logger/Logger";
3057 | 
3058 | export class Config {
3059 |   private static instance: Config | undefined;
3060 |   private config: ConfigOptions;
3061 |   private jsonReader: JsonReader;
3062 | 
3063 |   private constructor() {
3064 |     this.jsonReader = new JsonReader();
3065 |     this.config = configSchema.parse(DEFAULT_CONFIG);
3066 |     logger.setConfig(this);
3067 |   }
3068 | 
3069 |   public static async load(): Promise<Config> {
3070 |     if (!Config.instance) {
3071 |       Config.instance = new Config();
3072 |       await Config.instance.loadUserConfig();
3073 |     }
3074 |     return Config.instance;
3075 |   }
3076 | 
3077 |   public get<T extends ConfigKeys>(key: T): ConfigOptions[T] {
3078 |     return this.config[key] as ConfigOptions[T];
3079 |   }
3080 | 
3081 |   public set(
3082 |     key: keyof ConfigOptions,
3083 |     value: ConfigOptions[keyof ConfigOptions] | undefined
3084 |   ): void {
3085 |     if (value === undefined) {
3086 |       return;
3087 |     }
3088 |     const updatedConfig = { ...this.config, [key]: value };
3089 |     try {
3090 |       configSchema.parse(updatedConfig);
3091 |       this.config = updatedConfig;
3092 |     } catch (error) {
3093 |       if (error instanceof z.ZodError) {
3094 |         logger.error(`Invalid configuration value: ${error.errors}`);
3095 |       }
3096 |       throw error;
3097 |     }
3098 |   }
3099 |   public getAll(): ConfigOptions {
3100 |     return this.config;
3101 |   }
3102 |   public reset(): void {
3103 |     this.config = DEFAULT_CONFIG;
3104 |   }
3105 |   public static destroy(): void {
3106 |     Config.instance = undefined;
3107 |   }
3108 |   public override(config: Partial<ConfigOptions>): void {
3109 |     const newOverrideConfig = { ...this.config, ...config };
3110 |     try {
3111 |       configSchema.parse(newOverrideConfig);
3112 |       this.config = newOverrideConfig;
3113 |     } catch (error) {
3114 |       if (error instanceof z.ZodError) {
3115 |         logger.error(`Invalid configuration value: ${error.errors}`);
3116 |       }
3117 |       throw error;
3118 |     }
3119 |   }
3120 | 
3121 |   private async loadUserConfig(): Promise<void> {
3122 |     try {
3123 |       const configPath = documentFactory.resolve(this.config.codeConfigFile);
3124 |       const userConfig = await this.jsonReader.readJsonSync(configPath);
3125 |       this.config = configSchema.parse({ ...this.config, ...userConfig });
3126 |     } catch (error) {
3127 |       this.handleConfigError(error);
3128 |     }
3129 |   }
3130 | 
3131 |   private handleConfigError(error: unknown): void {
3132 |     if (error instanceof z.ZodError) {
3133 |       const details = error.errors
3134 |         .map(err => `${err.path.join(".")}: ${err.message}`)
3135 |         .join(", ");
3136 |       throw new Error(`Configuration validation failed: ${details}`);
3137 |     }
3138 |     throw error;
3139 |   }
3140 | }
3141 | 
3142 | ```
3143 | ### Directory: __tests__
3144 | 
3145 | - **Path:** /root/git/codewrangler/src/utils/config/__tests__
3146 | - **Size:** 0 bytes
3147 | - **Files:** 0
3148 | - **Total Files (including subdirectories):** 0
3149 | - **Depth:** 3
3150 | 
3151 | #### Contents:
3152 | 
3153 | #### File: index.ts
3154 | 
3155 | - **Path:** /root/git/codewrangler/src/utils/config/index.ts
3156 | - **Extension:** ts
3157 | - **Size:** 52 bytes
3158 | - **Depth:** 3
3159 | - **Lines:** 3
3160 | 
3161 | ```ts
3162 | export * from "./Config";
3163 | export * from "./schema";
3164 | 
3165 | ```
3166 | #### File: schema.ts
3167 | 
3168 | - **Path:** /root/git/codewrangler/src/utils/config/schema.ts
3169 | - **Extension:** ts
3170 | - **Size:** 2863 bytes
3171 | - **Depth:** 3
3172 | - **Lines:** 97
3173 | 
3174 | ```ts
3175 | import { z } from "zod";
3176 | 
3177 | import { LOG_VALUES } from "../logger/Logger";
3178 | 
3179 | export const OUTPUT_FORMATS = {
3180 |   markdown: "md",
3181 |   html: "html"
3182 | } as const;
3183 | 
3184 | export type OutputFormats = typeof OUTPUT_FORMATS;
3185 | export type OutputFormatName = keyof OutputFormats;
3186 | export type OutputFormatExtension = OutputFormats[OutputFormatName];
3187 | 
3188 | export const outputFormatSchema = z.enum(["markdown", "html"] as const);
3189 | 
3190 | export const fileExtensionSchema = z.enum(["md", "html"] as const);
3191 | 
3192 | export type OutputFormat = z.infer<typeof outputFormatSchema>;
3193 | export type FileExtension = z.infer<typeof fileExtensionSchema>;
3194 | 
3195 | export const FILE_EXTENSION: Record<OutputFormat, FileExtension> = {
3196 |   markdown: "md",
3197 |   html: "html"
3198 | };
3199 | 
3200 | export const configSchema = z
3201 |   .object({
3202 |     dir: z.string().default(process.cwd()),
3203 |     rootDir: z.string().default(process.cwd()),
3204 |     templatesDir: z.string().default("public/templates"),
3205 |     pattern: z
3206 |       .string()
3207 |       .regex(/^.*$/, "Pattern must be a valid regex")
3208 |       .default(".*"),
3209 |     outputFile: z.string().default("output"),
3210 |     logLevel: z.enum(LOG_VALUES as [string, ...string[]]).default("INFO"),
3211 |     outputFormat: z.array(outputFormatSchema).default(["markdown"]),
3212 |     maxFileSize: z.number().positive().default(1048576),
3213 |     maxDepth: z.number().default(100),
3214 |     excludePatterns: z
3215 |       .array(z.string())
3216 |       .default(["node_modules/**", "**/*.test.ts", "dist/**"]),
3217 |     ignoreHiddenFiles: z.boolean().default(true),
3218 |     additionalIgnoreFiles: z.array(z.string()).optional().default([]),
3219 |     projectName: z.string().optional(),
3220 |     verbose: z.boolean().default(false),
3221 |     followSymlinks: z.boolean().default(false),
3222 |     codeConfigFile: z
3223 |       .string()
3224 |       .regex(/\.json$/, "Config file must end with .json")
3225 |       .default("public/codewrangler.json")
3226 |   })
3227 |   .strict();
3228 | 
3229 | export type ConfigOptions = z.infer<typeof configSchema>;
3230 | // get a type listing all the keys of the config
3231 | export type ConfigKeys = keyof ConfigOptions;
3232 | 
3233 | const DEFAULT_CONFIG_IGNORE = {
3234 |   ignoreHiddenFiles: true, // Default value
3235 |   additionalIgnoreFiles: [],
3236 |   excludePatterns: ["node_modules/**", "**/*.test.ts", "dist/**"]
3237 | };
3238 | 
3239 | const DEFAULT_CONFIG_LOG = {
3240 |   logLevel: "INFO",
3241 |   verbose: false
3242 | };
3243 | 
3244 | const DEFAULT_CONFIG_LIMITS = {
3245 |   maxFileSize: 1048576,
3246 |   maxDepth: 100
3247 | };
3248 | 
3249 | const DEFAULT_CONFIG_PATHS = {
3250 |   templatesDir: "public/templates",
3251 |   codeConfigFile: "public/codewrangler.json"
3252 | };
3253 | 
3254 | const DEFAULT_CONFIG_OUTPUT = {
3255 |   outputFormat: ["markdown"] as OutputFormat[],
3256 |   outputFile: "output"
3257 | };
3258 | 
3259 | export const DEFAULT_CONFIG: ConfigOptions = {
3260 |   dir: process.cwd(), // current working directory, where the command is run
3261 |   rootDir: process.cwd(),
3262 |   projectName: undefined,
3263 |   pattern: ".*",
3264 |   followSymlinks: false,
3265 |   ...DEFAULT_CONFIG_PATHS,
3266 |   ...DEFAULT_CONFIG_LIMITS,
3267 |   ...DEFAULT_CONFIG_IGNORE,
3268 |   ...DEFAULT_CONFIG_LOG,
3269 |   ...DEFAULT_CONFIG_OUTPUT
3270 | };
3271 | 
3272 | ```
3273 | ### Directory: helpers
3274 | 
3275 | - **Path:** /root/git/codewrangler/src/utils/helpers
3276 | - **Size:** 1524 bytes
3277 | - **Files:** 1
3278 | - **Total Files (including subdirectories):** 1
3279 | - **Depth:** 2
3280 | 
3281 | #### Contents:
3282 | 
3283 | #### File: ProgressBar.ts
3284 | 
3285 | - **Path:** /root/git/codewrangler/src/utils/helpers/ProgressBar.ts
3286 | - **Extension:** ts
3287 | - **Size:** 1524 bytes
3288 | - **Depth:** 3
3289 | - **Lines:** 66
3290 | 
3291 | ```ts
3292 | import cliProgress from "cli-progress";
3293 | 
3294 | export class ProgressBar {
3295 |   private bar: cliProgress.SingleBar;
3296 |   private intervalId: NodeJS.Timeout | null = null;
3297 |   private currentValue: number = 0;
3298 | 
3299 |   public constructor(private total: number = 100) {
3300 |     this.bar = new cliProgress.SingleBar(
3301 |       {},
3302 |       cliProgress.Presets.shades_classic
3303 |     );
3304 |   }
3305 | 
3306 |   public start(): ProgressBar {
3307 |     this.bar.start(this.total, 0);
3308 |     this.intervalId = setInterval(() => this.simulateProgress(), 200);
3309 |     return this;
3310 |   }
3311 | 
3312 |   public update(value: number): ProgressBar {
3313 |     this.currentValue = value;
3314 |     this.bar.update(value);
3315 |     return this;
3316 |   }
3317 | 
3318 |   public stop(): ProgressBar {
3319 |     if (this.intervalId) {
3320 |       clearInterval(this.intervalId);
3321 |       this.intervalId = null;
3322 |     }
3323 |     this.bar.update(this.total);
3324 |     this.bar.stop();
3325 |     return this;
3326 |   }
3327 | 
3328 |   public async execute<T>(fn: () => Promise<T>): Promise<T> {
3329 |     this.start();
3330 |     try {
3331 |       return await fn();
3332 |     } finally {
3333 |       this.stop();
3334 |     }
3335 |   }
3336 | 
3337 |   private simulateProgress(): void {
3338 |     const remainingProgress = this.total - this.currentValue;
3339 |     const increment = Math.random() * remainingProgress * 0.1;
3340 |     this.currentValue = Math.min(
3341 |       this.currentValue + increment,
3342 |       this.total * 0.95
3343 |     );
3344 |     this.bar.update(this.currentValue);
3345 |   }
3346 | }
3347 | 
3348 | export async function progressBar(
3349 |   total: number,
3350 |   callback: () => Promise<void>
3351 | ): Promise<void> {
3352 |   const bar = new ProgressBar(total);
3353 |   await bar.execute(async () => {
3354 |     await callback();
3355 |   });
3356 | }
3357 | 
3358 | ```
3359 | ### Directory: __tests__
3360 | 
3361 | - **Path:** /root/git/codewrangler/src/utils/helpers/__tests__
3362 | - **Size:** 0 bytes
3363 | - **Files:** 0
3364 | - **Total Files (including subdirectories):** 0
3365 | - **Depth:** 3
3366 | 
3367 | #### Contents:
3368 | 
3369 | ### Directory: logger
3370 | 
3371 | - **Path:** /root/git/codewrangler/src/utils/logger
3372 | - **Size:** 2061 bytes
3373 | - **Files:** 2
3374 | - **Total Files (including subdirectories):** 2
3375 | - **Depth:** 2
3376 | 
3377 | #### Contents:
3378 | 
3379 | #### File: Logger.ts
3380 | 
3381 | - **Path:** /root/git/codewrangler/src/utils/logger/Logger.ts
3382 | - **Extension:** ts
3383 | - **Size:** 2035 bytes
3384 | - **Depth:** 3
3385 | - **Lines:** 83
3386 | 
3387 | ```ts
3388 | /* eslint-disable no-console */
3389 | import colors from "colors";
3390 | 
3391 | import { Config } from "../config/Config";
3392 | 
3393 | export const LOG_LEVEL = {
3394 |   ERROR: 0,
3395 |   WARN: 1,
3396 |   INFO: 2,
3397 |   DEBUG: 3
3398 | } as const;
3399 | 
3400 | type LogLevel = (typeof LOG_LEVEL)[keyof typeof LOG_LEVEL];
3401 | export type LogLevelString = keyof typeof LOG_LEVEL;
3402 | export const LOG_VALUES = Object.keys(LOG_LEVEL) as LogLevelString[];
3403 | 
3404 | export class Logger {
3405 |   private static instance: Logger;
3406 |   private config: Config | null = null;
3407 | 
3408 |   private constructor() {}
3409 |   public static load(): Logger {
3410 |     if (!Logger.instance) {
3411 |       Logger.instance = new Logger();
3412 |     }
3413 |     return Logger.instance;
3414 |   }
3415 |   public setConfig(config: Config): Logger {
3416 |     this.config = config;
3417 |     return this;
3418 |   }
3419 |   public setLogLevel(logLevel: LogLevelString): Logger {
3420 |     if (this.config) {
3421 |       this.config.set("logLevel", logLevel);
3422 |     }
3423 |     return this;
3424 |   }
3425 | 
3426 |   private get logLevel(): LogLevel {
3427 |     const configLogLevel = this.config?.get("logLevel") as
3428 |       | LogLevelString
3429 |       | undefined;
3430 |     return configLogLevel ? LOG_LEVEL[configLogLevel] : LOG_LEVEL.ERROR;
3431 |   }
3432 | 
3433 |   public error(message: string, error?: Error, ...other: unknown[]): void {
3434 |     if (this.logLevel >= LOG_LEVEL.ERROR) {
3435 |       console.log(colors.red(`[ERROR] ${message}`), ...other);
3436 |       if (error instanceof Error && error.stack) {
3437 |         console.log(colors.red(error.stack));
3438 |       }
3439 |     }
3440 |   }
3441 | 
3442 |   public warn(message: string): void {
3443 |     if (this.logLevel >= LOG_LEVEL.WARN) {
3444 |       console.log(colors.yellow(`[WARN] ${message}`));
3445 |     }
3446 |   }
3447 | 
3448 |   public info(message: string): void {
3449 |     if (this.logLevel >= LOG_LEVEL.INFO) {
3450 |       console.log(colors.blue(`[INFO] ${message}`));
3451 |     }
3452 |   }
3453 | 
3454 |   public debug(message: string): void {
3455 |     if (this.logLevel >= LOG_LEVEL.DEBUG) {
3456 |       console.log(colors.gray(`[DEBUG] ${message}`));
3457 |     }
3458 |   }
3459 | 
3460 |   public success(message: string): void {
3461 |     console.log(colors.green(message));
3462 |   }
3463 | 
3464 |   public log(message: string): void {
3465 |     console.log(message);
3466 |   }
3467 | }
3468 | 
3469 | export const logger = Logger.load();
3470 | 
3471 | ```
3472 | ### Directory: __tests__
3473 | 
3474 | - **Path:** /root/git/codewrangler/src/utils/logger/__tests__
3475 | - **Size:** 0 bytes
3476 | - **Files:** 0
3477 | - **Total Files (including subdirectories):** 0
3478 | - **Depth:** 3
3479 | 
3480 | #### Contents:
3481 | 
3482 | #### File: index.ts
3483 | 
3484 | - **Path:** /root/git/codewrangler/src/utils/logger/index.ts
3485 | - **Extension:** ts
3486 | - **Size:** 26 bytes
3487 | - **Depth:** 3
3488 | - **Lines:** 2
3489 | 
3490 | ```ts
3491 | export * from "./Logger";
3492 | 
3493 | ```
3494 | 
3495 | 
```

---------------------------------------------------------------------------

