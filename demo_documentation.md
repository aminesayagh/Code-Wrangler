
# Code Documentation
Generated on: 2024-12-04T07:23:27.840Z
Total files: 13

## Project Structure

```
codewrangler
├── CONTRIBUTING.md
├── LICENCE.md
├── README.md
├── _doc.md
├── demo.md
├── documentation
│   ├── CLI_DOCUMENTATION.md
│   ├── CONFIGURATION_GUIDE.md
│   ├── DETAILED_CLASS_DIAGRAMS_AND_COMPONENT_LIFECYCLE.md
│   ├── RENDERING_STRATEGY_GUIDE.md
│   └── TEMPLATE_SYSTEM_GUIDE.md
├── public
│   └── templates
│       ├── directory.md
│       ├── file.md
│       └── page.md
```


## File: CONTRIBUTING.md
- Path: `/root/git/codewrangler/CONTRIBUTING.md`
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
- Size: 7.88 KB
- Extension: .md
- Lines of code: 240
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
 21 | CodeWrangler streamlines the process of generating comprehensive documentation from source code. By leveraging intelligent scanning and customizable templates, it produces consistent, high-quality documentation that can be enhanced through AI-powered analysis.
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
 79 | # {{PROJECT_NAME}}
 80 | 
 81 | Generated: {{GENERATION_DATE}}
 82 | 
 83 | {{DIRECTORY_STRUCTURE}}
 84 | 
 85 | ## Content
 86 | 
 87 | {{CONTENT}}
 88 | ```
 89 | 
 90 | #### File Template
 91 | 
 92 | ```md
 93 | ### {{FILE_NAME}}
 94 | 
 95 | {{FILE_EXTENSION}}
 96 | {{FILE_CONTENTS}}
 97 | ```
 98 | 
 99 | ### Custom Templates
100 | 
101 | Create your own templates by placing them in a custom directory:
102 | 
103 | ```bash
104 | mkdir custom-templates
105 | echo "# {{PROJECT_NAME}}" > custom-templates/page.md
106 | cw "\.ts$" --template-dir ./custom-templates
107 | ```
108 | 
109 | ## Command Line Interface
110 | 
111 | ```bash
112 | Usage: cw [options] <pattern>
113 | 
114 | Arguments:
115 |   pattern                         File pattern to match (e.g., "\.ts$")
116 | 
117 | Options:
118 |   -V, --version                  Display version information
119 |   -d, --dir <dir>               Directory to search (default: current)
120 |   -o, --output <name>           Output file name (default: "output")
121 |   -t, --template-dir <dir>      Custom templates directory
122 |   -c, --config <path>           Config file path
123 |   --watch                       Watch for file changes
124 |   -h, --help                    Display help information
125 | ```
126 | 
127 | ## Configuration
128 | 
129 | ### Configuration File (codewrangler.json)
130 | 
131 | ```json
132 | {
133 |   "core": {
134 |     "dir": "./src",
135 |     "pattern": "\\.ts$",
136 |     "outputFile": "documentation"
137 |   },
138 |   "templates": {
139 |     "directory": "./templates",
140 |     "variables": {
141 |       "AUTHOR": "Your Name",
142 |       "VERSION": "1.0.0"
143 |     }
144 |   },
145 |   "plugins": {
146 |     "ai-summary": {
147 |       "enabled": true,
148 |       "model": "gpt-4"
149 |     }
150 |   }
151 | }
152 | ```
153 | 
154 | ### Environment Variables
155 | 
156 | ```bash
157 | CODEWRANGLER_CONFIG_PATH=./config/codewrangler.json
158 | CODEWRANGLER_TEMPLATE_DIR=./templates
159 | CODEWRANGLER_LOG_LEVEL=DEBUG
160 | ```
161 | 
162 | ## Plugin System
163 | 
164 | CodeWrangler supports plugins for extending functionality. Plugins can hook into various stages of the documentation process.
165 | 
166 | ### 1. Repository Tree Visualizer
167 | - Generates visual and textual representations of repository structure
168 | - Features:
169 |   - ASCII tree visualization
170 |   - Interactive HTML tree view
171 |   - Directory size analysis
172 |   - Custom ignore patterns
173 |   - Multiple export formats (ASCII, HTML, JSON)
174 | - Use Case: Quickly understand project structure and organization
175 | 
176 | ### 2. Smart Prompt Engine
177 | - Enhances AI interactions by providing contextual code references
178 | - Features:
179 |   - Links questions to specific code files and line numbers
180 |   - Maintains conversation history with code context
181 |   - Suggests relevant files for current discussion
182 |   - Tracks code changes during conversation
183 |   - Generates contextual prompts for better AI responses
184 | - Use Case: More efficient and context-aware AI assistance
185 | 
186 | ### 3. Documentation Crawler
187 | - Automatically aggregates and indexes library documentation
188 | - Features:
189 |   - Identifies project dependencies
190 |   - Scrapes official documentation sites
191 |   - Creates offline documentation cache
192 |   - Integrates with popular package managers (npm, pip, composer)
193 |   - Generates dependency graphs
194 | - Use Case: Centralized documentation access and dependency understanding
195 | 
196 | ### 4. Environment Analyzer
197 | - Analyzes and reports on development environment configuration
198 | - Features:
199 |   - Runtime environment detection
200 |   - Installed tools and versions
201 |   - System capabilities assessment
202 |   - Configuration compatibility checks
203 |   - Environment-specific recommendations
204 | - Use Case: Environment-aware assistance and troubleshooting
205 | 
206 | ### 5. Code Summarizer
207 | - Creates concise versions of code files by removing non-essential parts
208 | - Features:
209 |   - Smart comment preservation
210 |   - Redundant code detection
211 |   - Configuration file summarization
212 |   - Custom summarization rules
213 |   - Diff view support
214 | - Use Case: Focus on essential code components
215 | 
216 | ### Creating a Plugin (In development)
217 | 
218 | ```typescript
219 | import { Plugin, BaseNode } from "codewrangler";
220 | 
221 | export class CustomPlugin implements Plugin {
222 |   name = "custom-plugin";
223 | 
224 |   async beforeScan(options: ScanOptions): Promise<void> {
225 |     // Pre-scan setup
226 |   }
227 | 
228 |   async afterRender(content: string): Promise<string> {
229 |     // Post-render modifications
230 |     return modifiedContent;
231 |   }
232 | }
233 | ```
234 | 
235 | ### Using Plugins
236 | 
237 | ```typescript
238 | const pipeline = new DocumentationPipeline()
239 |   .use(new TypeScriptDocsPlugin())
240 |   .use(new AIAnalysisPlugin())
241 |   .use(new CustomPlugin());
242 | 
243 | await pipeline.process({
244 |   input: "./src",
245 |   pattern: ".ts$",
246 | });
247 | ```
248 | 
249 | ## Advanced Usage
250 | 
251 | ### AI Integration Example
252 | 
253 | ```typescript
254 | import { LangChain } from "langchain";
255 | 
256 | const pipeline = new DocumentationPipeline().use(
257 |   new LangChainPlugin({
258 |     prompt: `
259 |       Analyze this codebase and provide:
260 |       1. Architecture overview
261 |       2. Key components
262 |       3. Improvement suggestions
263 |     `,
264 |     model: "gpt-4",
265 |   })
266 | );
267 | ```
268 | 
269 | ### Custom Template Example
270 | 
271 | ```typescript
272 | const customTemplate = new Template({
273 |   content: `
274 |     # {{PROJECT_NAME}}
275 |     Author: {{AUTHOR}}
276 |     
277 |     ## Analysis
278 |     {{AI_ANALYSIS}}
279 |     
280 |     ## Components
281 |     {{COMPONENTS}}
282 |   `,
283 | });
284 | ```
285 | 
286 | ## Development
287 | 
288 | ### Prerequisites
289 | 
290 | - Node.js 18+
291 | - TypeScript 4.5+
292 | - npm or yarn
293 | 
294 | ### Setup
295 | 
296 | ```bash
297 | # Clone repository
298 | git clone https://github.com/aminesayagh/Code-Wrangler
299 | 
300 | # Install dependencies
301 | cd codewrangler
302 | npm install
303 | 
304 | # Build project
305 | npm run build
306 | 
307 | # Run tests
308 | npm test
309 | ```
310 | 
311 | ## Contributing
312 | 
313 | We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on:
314 | 
315 | ## License
316 | 
317 | Apache 2.0 License - See [LICENSE](LICENSE.md) for details.
318 | 
319 | Built with ❤️ by the CodeWrangler team
320 | 
321 | For more information, visit our [Documentation](CONTRIBUTING.md).
322 | 
```

---------------------------------------------------------------------------


## File: _doc.md
- Path: `/root/git/codewrangler/_doc.md`
- Size: 47.28 KB
- Extension: .md
- Lines of code: 1592
- Content:

```md
   1 | Hello Claude, one of my best dreamed library that I would like to achieve on development is a library that can generate a md file to document code repo from a regex expression, to got this done, I first created a bundle that can map all files and generate recursively information from him
   2 | 
   3 | on this discussion, I need your support to complete this library code, and to start, I will share with you the data model based on OOP, that I implement to structure the repo content as a modelling.
   4 | 
   5 | # Tree
   6 | 
   7 | ```
   8 | public/
   9 | |-- templates
  10 | |   |-- directory.md
  11 | |   |-- file.md
  12 | |   └── page.md
  13 | src
  14 | ├── cli
  15 | │   ├── CodeWrangler.ts
  16 | │   ├── commands
  17 | │   │   ├── GenerateCommand.ts
  18 | │   │   └── types.ts
  19 | │   ├── index.ts
  20 | │   └── program
  21 | │       └── ProgramBuilder.ts
  22 | ├── core
  23 | │   ├── entities
  24 | │   │   ├── NodeBase.ts
  25 | │   │   ├── NodeDirectory.ts
  26 | │   │   └── NodeFile.ts
  27 | │   ├── errors
  28 | │   │   ├── DirectoryNotFoundError.ts
  29 | │   │   ├── DocumentError.ts
  30 | │   │   ├── FileNotFoundError.ts
  31 | │   │   └── index.ts
  32 | ├── infrastructure
  33 | │   ├── filesystem
  34 | │   │   └── DocumentFactory.ts
  35 | │   └── templates
  36 | │       ├── Template.ts
  37 | │       └── zod.ts
  38 | ├── services
  39 | │   ├── builder
  40 | │   │   ├── DocumentTreeBuilder.ts
  41 | │   │   └── FileTreeBuilder.ts
  42 | │   └── renderer
  43 | │       ├── RenderStrategy.ts
  44 | │       └── strategies
  45 | │           ├── HTMLStrategy.ts
  46 | │           └── MarkdownStrategy.ts
  47 | ├── types
  48 | │   ├── template.ts
  49 | │   └── type.ts
  50 | └── utils
  51 |     ├── config
  52 |     │   ├── Config.ts
  53 |     │   ├── index.ts
  54 |     │   └── shema.ts
  55 |     └── logger
  56 |         ├── index.ts
  57 |         └── Logger.ts
  58 | ```
  59 | 
  60 | # CLI
  61 | 
  62 | ```typescript
  63 | // cli/CodeWrangler.ts
  64 | import { Command } from "commander";
  65 | import { Config } from "../utils/config/Config";
  66 | import { GenerateCommand } from "./commands/GenerateCommand";
  67 | import { ProgramBuilder } from "./program/ProgramBuilder";
  68 | import { CommandOptions } from "./commands/types";
  69 | 
  70 | export class CodeWrangler {
  71 |   private static instance: CodeWrangler | undefined;
  72 |   private readonly VERSION = "1.0.0";
  73 |   private config: Config;
  74 |   private program: Command;
  75 |   private generateCommand: GenerateCommand;
  76 | 
  77 |   private constructor() {
  78 |     this.config = Config.load();
  79 |     this.generateCommand = new GenerateCommand(this.config);
  80 |     this.program = new ProgramBuilder(this.config, this.VERSION).build();
  81 | 
  82 |     this.setupCommands();
  83 |   }
  84 | 
  85 |   private setupCommands(): void {
  86 |     this.program.action(async (pattern: string, options: CommandOptions) => {
  87 |       await this.generateCommand.execute([pattern], options);
  88 |     });
  89 |   }
  90 | 
  91 |   public static async run(): Promise<boolean> {
  92 |     if (!CodeWrangler.instance) {
  93 |       CodeWrangler.instance = new CodeWrangler();
  94 |       await CodeWrangler.instance.program.parseAsync(process.argv);
  95 |       return true;
  96 |     }
  97 |     throw new Error("CodeWrangler already initialized");
  98 |   }
  99 | }
 100 | ```
 101 | 
 102 | ```typescript
 103 | // cli/index.ts
 104 | #!/usr/bin/env node
 105 | import { CodeWrangler } from "./CodeWrangler";
 106 | import { logger } from "../utils/logger/Logger";
 107 | 
 108 | async function main() {
 109 |   try {
 110 |     await CodeWrangler.run();
 111 |   } catch (error) {
 112 |     if (error instanceof Error) {
 113 |       logger.error(error.message);
 114 |     } else {
 115 |       logger.error("An unknown error occurred");
 116 |     }
 117 |     process.exit(1);
 118 |   }
 119 | }
 120 | 
 121 | main().catch(() => process.exit(1));
 122 | ```
 123 | 
 124 | ```typescript
 125 | import { Command, CommandOptions } from "./types";
 126 | import { Config } from "../../utils/config/Config";
 127 | import { logger } from "../../utils/logger/Logger";
 128 | import { DocumentTreeBuilder } from "../../services/builder/DocumentTreeBuilder";
 129 | import { MarkdownStrategy } from "../../services/renderer/strategies/MarkdownStrategy";
 130 | import { HTMLRenderStrategy } from "../../services/renderer/strategies/HTMLStrategy";
 131 | 
 132 | export class GenerateCommand implements Command {
 133 |   constructor(private config: Config) {}
 134 | 
 135 |   private logVerbose(): void {
 136 |     logger.debug(
 137 |       `Searching for file matching pattern: ${this.config.get("pattern")}`
 138 |     );
 139 |     logger.debug(
 140 |       `Excluding patterns: ${(
 141 |         this.config.get("excludePatterns") as string[]
 142 |       ).join(", ")}`
 143 |     );
 144 |     logger.debug(
 145 |       `Ignoring hidden files: ${this.config.get("ignoreHiddenFiles")}`
 146 |     );
 147 |     logger.debug(`Max file size: ${this.config.get("maxFileSize")} bytes`);
 148 |   }
 149 | 
 150 |   async execute(args: string[], options: CommandOptions): Promise<void> {
 151 |     try {
 152 |       // Override config with command options
 153 |       this.config.override({ ...options, pattern: args[0] });
 154 | 
 155 |       // Log verbose information if enabled
 156 |       if (options.verbose) {
 157 |         this.logVerbose();
 158 |       }
 159 | 
 160 |       // Execute document tree building
 161 |       const outputFormat = this.config.get("outputFormat");
 162 |       const renderStrategies = outputFormat.map((format) => {
 163 |         switch (format) {
 164 |           case "markdown":
 165 |             return new MarkdownStrategy(this.config);
 166 |           case "html":
 167 |             return new HTMLRenderStrategy(this.config);
 168 |           default:
 169 |             throw new Error(`Unsupported output format: ${format}`);
 170 |         }
 171 |       });
 172 |       const builder = new DocumentTreeBuilder(this.config, renderStrategies);
 173 |       await builder.build();
 174 |     } catch (error) {
 175 |       logger.error("Generation failed:", error as Error);
 176 |       throw error;
 177 |     }
 178 |   }
 179 | }
 180 | ```
 181 | 
 182 | ```typescript
 183 | export interface CommandOptions {
 184 |   dir?: string;
 185 |   output?: string;
 186 |   config?: string;
 187 |   verbose?: boolean;
 188 |   format?: string[];
 189 |   maxSize?: number;
 190 |   exclude?: string[];
 191 |   ignoreHidden?: boolean;
 192 |   additionalIgnore?: string[];
 193 | }
 194 | 
 195 | export interface Command {
 196 |   execute(args: string[], options: CommandOptions): Promise<void>;
 197 | }
 198 | ```
 199 | 
 200 | ```typescript
 201 | import { Command } from "commander";
 202 | import { Config } from "../../utils/config/Config";
 203 | 
 204 | export class ProgramBuilder {
 205 |   private program: Command;
 206 | 
 207 |   constructor(private config: Config, private version: string) {
 208 |     this.program = new Command();
 209 |   }
 210 | 
 211 |   build(): Command {
 212 |     return this.program
 213 |       .version(this.version)
 214 |       .description("CodeWrangler is a tool for generating code")
 215 |       .argument(
 216 |         "<pattern>",
 217 |         'File pattern to match (e.g., "\\.ts$" for TypeScript files)'
 218 |       )
 219 |       .option("-d, --dir <dir>", "Directory to search", this.config.get("dir"))
 220 |       .option(
 221 |         "-o, --output <output>",
 222 |         "Output file",
 223 |         this.config.get("outputFile")
 224 |       )
 225 |       .option(
 226 |         "-c, --config <config>",
 227 |         "Config file",
 228 |         this.config.get("codeConfigFile")
 229 |       )
 230 |       .option("-v, --verbose", "Verbose mode", this.config.get("logLevel"))
 231 |       .option(
 232 |         "-f, --format <format>",
 233 |         "Output format",
 234 |         this.config.get("outputFormat")
 235 |       )
 236 |       .option(
 237 |         "-s, --max-size <max-size>",
 238 |         "Max file size",
 239 |         this.config.get("maxFileSize").toString()
 240 |       )
 241 |       .option(
 242 |         "-e, --exclude <exclude>",
 243 |         "Exclude patterns",
 244 |         this.config.get("excludePatterns")
 245 |       )
 246 |       .option(
 247 |         "-i, --ignore-hidden",
 248 |         "Ignore hidden files",
 249 |         this.config.get("ignoreHiddenFiles")
 250 |       )
 251 |       .option(
 252 |         "-a, --additional-ignore <additional-ignore>",
 253 |         "Additional ignore patterns",
 254 |         this.config.get("additionalIgnoreFiles")
 255 |       );
 256 |   }
 257 | }
 258 | ```
 259 | 
 260 | # Core
 261 | 
 262 | ## Entities
 263 | 
 264 | ```typescript
 265 | // core/entities/NodeBase.ts
 266 | import { FileStats, PropsNode } from "../../types/type";
 267 | import { DocumentFactory } from "../../infrastructure/filesystem/DocumentFactory";
 268 | 
 269 | const defaultProps: PropsNode = {
 270 |   name: "",
 271 |   path: "",
 272 |   deep: 0,
 273 |   size: 0, // size of the node from the children nodes
 274 |   stats: {
 275 |     size: 0, // size of the node from the file system
 276 |     created: new Date(),
 277 |     modified: new Date(),
 278 |     accessed: new Date(),
 279 |     isDirectory: false,
 280 |     isFile: false,
 281 |     permissions: {
 282 |       readable: false,
 283 |       writable: false,
 284 |       executable: false,
 285 |     },
 286 |   },
 287 | };
 288 | 
 289 | interface NodeLifeCycle {
 290 |   validate(): boolean;
 291 |   bundle(deep: number): Promise<void>;
 292 |   render(): void;
 293 |   dispose(): Promise<void>;
 294 |   clone(): Promise<NodeBase>;
 295 | }
 296 | 
 297 | export abstract class NodeBase implements NodeLifeCycle {
 298 |   protected _props: PropsNode = { ...defaultProps };
 299 | 
 300 |   constructor(_name: string, _path: string) {
 301 |     // check if path is absolute or a valid path
 302 |     this.initNode(_name, _path);
 303 |     this.validate();
 304 |   }
 305 | 
 306 |   private validatePath(path: string): boolean {
 307 |     if (!DocumentFactory.exists(path)) {
 308 |       throw new Error("Path does not exist");
 309 |     }
 310 |     if (!DocumentFactory.isAbsolute(path)) {
 311 |       throw new Error("Path is not absolute");
 312 |     }
 313 |     return true;
 314 |   }
 315 | 
 316 |   public validate(): boolean {
 317 |     return this.validatePath(this.path);
 318 |   }
 319 | 
 320 |   private initNode(name: string, path: string): void {
 321 |     this.deep = 0;
 322 |     this.size = 0;
 323 |     this.name = name;
 324 |     this.path = DocumentFactory.resolve(path);
 325 |   }
 326 | 
 327 |   // abstract methods
 328 |   abstract bundle(deep: number): Promise<void>;
 329 |   abstract render(): void;
 330 |   abstract get secondaryProps(): Record<string, unknown> | undefined;
 331 | 
 332 |   // getters and setters
 333 |   // deep
 334 |   get deep(): number {
 335 |     return this._props.deep;
 336 |   }
 337 |   protected set deep(deep: number) {
 338 |     this._props.deep = deep;
 339 |   }
 340 | 
 341 |   // size
 342 |   get size(): number {
 343 |     return this._props.size;
 344 |   }
 345 |   protected set size(size: number) {
 346 |     this._props.size = size;
 347 |   }
 348 | 
 349 |   // name
 350 |   get name(): string {
 351 |     return this._props.name;
 352 |   }
 353 |   protected set name(name: string) {
 354 |     this._props.name = name;
 355 |   }
 356 | 
 357 |   // path
 358 |   get path(): string {
 359 |     return this._props.path;
 360 |   }
 361 |   protected set path(path: string) {
 362 |     this._props.path = path;
 363 |   }
 364 | 
 365 |   // stats
 366 |   get stats(): FileStats {
 367 |     return this._props.stats;
 368 |   }
 369 |   protected set stats(stats: FileStats) {
 370 |     this._props.stats = stats;
 371 |   }
 372 | 
 373 |   // props
 374 |   get props() {
 375 |     return { ...this._props, ...this.secondaryProps };
 376 |   }
 377 | 
 378 |   public async dispose(): Promise<void> {
 379 |     this._props.deep = 0;
 380 |     this._props.path = "";
 381 |     this._props.name = "";
 382 |     this._props.stats = { ...defaultProps.stats };
 383 |     this._props.size = 0;
 384 |     this._props = { ...defaultProps };
 385 |   }
 386 | 
 387 |   public async clone(): Promise<NodeBase> {
 388 |     return Object.assign(Object.create(this), this);
 389 |   }
 390 | }
 391 | ```
 392 | 
 393 | ```typescript
 394 | // core/entities/NodeDirectory.ts
 395 | import { NodeFile } from "./NodeFile";
 396 | import { NodeBase } from "./NodeBase";
 397 | import { RenderStrategy } from "../../services/renderer/RenderStrategy";
 398 | import { DocumentFactory } from "../../infrastructure/filesystem/DocumentFactory";
 399 | 
 400 | type ContentType = (string | ContentType)[];
 401 | 
 402 | interface PropsDirectory {
 403 |   length: number;
 404 |   deepLength: number;
 405 | }
 406 | 
 407 | const defaultPropsDirectory: PropsDirectory = {
 408 |   length: 0,
 409 |   deepLength: 0,
 410 | };
 411 | 
 412 | export abstract class NodeDirectory extends NodeBase {
 413 |   public children: (NodeFile | NodeDirectory)[] = [];
 414 |   private _propsDirectory: PropsDirectory = { ...defaultPropsDirectory };
 415 |   private _content: ContentType = [];
 416 | 
 417 |   public constructor(name: string, pathName: string) {
 418 |     super(name, pathName);
 419 |     this.initDirectory();
 420 |   }
 421 | 
 422 |   private initDirectory(): void {
 423 |     this.children = [];
 424 |     this._propsDirectory = { ...defaultPropsDirectory };
 425 |     this._content = [];
 426 |   }
 427 | 
 428 |   // getters and setters
 429 |   public get length(): number {
 430 |     return this._propsDirectory.length;
 431 |   }
 432 |   public set length(length: number) {
 433 |     this._propsDirectory.length = length;
 434 |   }
 435 |   public get deepLength(): number {
 436 |     return this._propsDirectory.deepLength;
 437 |   }
 438 |   public set deepLength(deepLength: number) {
 439 |     this._propsDirectory.deepLength = deepLength;
 440 |   }
 441 |   public get content(): ContentType {
 442 |     return this._content;
 443 |   }
 444 |   public set content(content: ContentType) {
 445 |     this._content = content;
 446 |   }
 447 |   public get secondaryProps(): Record<string, unknown> {
 448 |     return {
 449 |       ...this._propsDirectory,
 450 |     };
 451 |   }
 452 | 
 453 |   public async addChild(
 454 |     child: FileNode | DirectoryNode
 455 |   ): Promise<NodeDirectory> {
 456 |     if (!(child instanceof NodeFile || child instanceof NodeDirectory)) {
 457 |       throw new Error("Invalid child type");
 458 |     }
 459 |     this.children.push(child);
 460 |     return this;
 461 |   }
 462 | 
 463 |   public async bundle(deep: number = 0): Promise<void> {
 464 |     // set the deep of the directory
 465 |     this.deep = deep;
 466 | 
 467 |     // bundle all children
 468 |     await Promise.all(this.children.map((child) => child.bundle(deep + 1)));
 469 | 
 470 |     // set the length of the directory
 471 |     this.length = this.children.filter(
 472 |       (child) => child instanceof FileNode
 473 |     ).length;
 474 | 
 475 |     // set the deep length of the directory
 476 |     this.deepLength = this.children.reduce(
 477 |       (acc, child) =>
 478 |         acc + (child instanceof DirectoryNode ? child.deepLength + 1 : 1),
 479 |       0
 480 |     );
 481 | 
 482 |     // set the size of the directory
 483 |     this.size = this.children.reduce((acc, child) => acc + child.size, 0);
 484 | 
 485 |     // set stats
 486 |     this.stats = await DocumentFactory.getStats(this.path);
 487 |   }
 488 | 
 489 |   public abstract override render(): void;
 490 | }
 491 | 
 492 | export class RenderableDirectory extends DirectoryNode {
 493 |   constructor(
 494 |     name: string,
 495 |     pathName: string,
 496 |     private renderStrategy: RenderStrategy[]
 497 |   ) {
 498 |     super(name, pathName);
 499 |   }
 500 | 
 501 |   public render(): void {
 502 |     this.renderStrategy.map((strategy) => strategy.renderDirectory(this));
 503 |   }
 504 | }
 505 | ```
 506 | 
 507 | ```typescript
 508 | // core/entities/NodeFile.ts
 509 | import { DocumentFactory } from "../../infrastructure/filesystem/DocumentFactory";
 510 | import { NodeBase } from "./NodeBase";
 511 | import { RenderStrategy } from "../../services/renderer/RenderStrategy";
 512 | 
 513 | interface PropsFile {
 514 |   extension: string;
 515 | }
 516 | 
 517 | const defaultPropsFile: PropsFile = {
 518 |   extension: "",
 519 | };
 520 | 
 521 | export abstract class NodeFile extends NodeBase {
 522 |   private _propsFile: PropsFile = { ...defaultPropsFile };
 523 |   private _content: string | null = null;
 524 | 
 525 |   public constructor(name: string, pathName: string) {
 526 |     super(name, pathName);
 527 |     this.initFile(name);
 528 |   }
 529 | 
 530 |   private initFile(name: string): void {
 531 |     this._propsFile = { ...defaultPropsFile };
 532 |     this.extension = DocumentFactory.extension(name);
 533 |     this._content = null;
 534 |   }
 535 | 
 536 |   // getters and setters
 537 |   // extension
 538 |   public get extension(): string {
 539 |     return this._propsFile.extension;
 540 |   }
 541 |   protected set extension(extension: string) {
 542 |     this._propsFile.extension = extension;
 543 |   }
 544 |   // content
 545 |   public get content(): string | null {
 546 |     return this._content;
 547 |   }
 548 |   protected set content(content: string | null) {
 549 |     this._content = content;
 550 |   }
 551 |   // secondary props
 552 |   public get secondaryProps(): Record<string, unknown> | undefined {
 553 |     return {
 554 |       extension: this.extension,
 555 |     };
 556 |   }
 557 | 
 558 |   // bundle
 559 |   public async bundle(deep: number = 0): Promise<void> {
 560 |     // set the deep of the file
 561 |     this.deep = deep;
 562 |     // set the size of the file
 563 |     this.size = await DocumentFactory.size(this.path);
 564 |     // set the content of the file
 565 |     this.content = await DocumentFactory.readFile(this.path);
 566 |     // set the stats of the file
 567 |     this.stats = await DocumentFactory.getStats(this.path);
 568 |   }
 569 | 
 570 |   // render
 571 |   public abstract override render(): void;
 572 | }
 573 | 
 574 | export class RenderableFile extends FileNode {
 575 |   constructor(
 576 |     name: string,
 577 |     pathName: string,
 578 |     private renderStrategy: RenderStrategy[]
 579 |   ) {
 580 |     super(name, pathName);
 581 |   }
 582 | 
 583 |   // render
 584 |   public render(): void {
 585 |     this.renderStrategy.map((strategy) => strategy.renderFile(this));
 586 |   }
 587 | 
 588 |   // dispose
 589 |   public override async dispose(): Promise<void> {
 590 |     await super.dispose();
 591 |     await Promise.all(
 592 |       this.renderStrategy.map((strategy) => strategy.dispose())
 593 |     );
 594 |   }
 595 | }
 596 | ```
 597 | 
 598 | ## Errors
 599 | 
 600 | ```typescript
 601 | // core/errors/DirectoryNotFoundError.ts
 602 | import { DocumentError } from "./DocumentError";
 603 | 
 604 | export class DirectoryNotFoundError extends DocumentError {
 605 |   constructor(path: string) {
 606 |     super("Directory not found", path);
 607 |     this.name = "DirectoryNotFoundError";
 608 |   }
 609 | }
 610 | ```
 611 | 
 612 | ```typescript
 613 | // core/errors/DocumentError.ts
 614 | export class DocumentError extends Error {
 615 |   constructor(message: string, public readonly path: string) {
 616 |     super(`Document error at ${path}: ${message}`);
 617 |     this.name = "DocumentError";
 618 |   }
 619 | }
 620 | ```
 621 | 
 622 | ```typescript
 623 | // core/errors/FileNotFoundError.ts
 624 | import { DocumentError } from "./DocumentError";
 625 | 
 626 | export class FileNotFoundError extends DocumentError {
 627 |   constructor(path: string) {
 628 |     super("File not found", path);
 629 |     this.name = "FileNotFoundError";
 630 |   }
 631 | }
 632 | ```
 633 | 
 634 | ```typescript
 635 | import { DocumentError } from "./DocumentError";
 636 | import { DirectoryNotFoundError } from "./DirectoryNotFoundError";
 637 | import { FileNotFoundError } from "./FileNotFoundError";
 638 | 
 639 | export { DocumentError, DirectoryNotFoundError, FileNotFoundError };
 640 | ```
 641 | 
 642 | # Infrastructure
 643 | 
 644 | ## Filesystem
 645 | 
 646 | ```typescript
 647 | // infrastructure/filesystem/DocumentFactory.ts
 648 | import { ObjectEncodingOptions } from "fs";
 649 | import * as fs from "fs/promises";
 650 | import * as fsSync from "fs";
 651 | import * as path from "path";
 652 | 
 653 | import { FileNotFoundError, DocumentError } from "../../core/errors";
 654 | import {
 655 |   FileType,
 656 |   FileStats,
 657 |   DirectoryOptions,
 658 |   WriteOptions,
 659 |   ReadOptions,
 660 | } from "../../types/type";
 661 | 
 662 | export class DocumentFactory {
 663 |   /**
 664 |    * Gets the type of a file system entry
 665 |    * @throws {FileNotFoundError} If the path doesn't exist
 666 |    * @throws {DocumentError} For other file system errors
 667 |    */
 668 |   static async type(filePath: string): Promise<FileType> {
 669 |     try {
 670 |       const stats = await fs.stat(filePath);
 671 |       return stats.isDirectory() ? FileType.Directory : FileType.File;
 672 |     } catch (error) {
 673 |       if ((error as NodeJS.ErrnoException).code === "ENOENT") {
 674 |         throw new FileNotFoundError(filePath);
 675 |       }
 676 |       throw new DocumentError(String(error), filePath);
 677 |     }
 678 |   }
 679 | 
 680 |   /**
 681 |    * Gets file size in bytes
 682 |    * @throws {FileNotFoundError} If the file doesn't exist
 683 |    * @throws {DocumentError} For other file system errors
 684 |    */
 685 |   static async size(filePath: string): Promise<number> {
 686 |     const isDirectory = (await this.type(filePath)) === FileType.Directory;
 687 |     if (isDirectory) {
 688 |       throw new DocumentError("Path is a directory", filePath);
 689 |     }
 690 |     const stats = await this.getStats(filePath);
 691 |     return stats.size;
 692 |   }
 693 | 
 694 |   /**
 695 |    * Resolves a path to an absolute path
 696 |    * @param filePath - The path to resolve
 697 |    * @returns The absolute path
 698 |    */
 699 |   static resolve(filePath: string): string {
 700 |     return path.resolve(filePath);
 701 |   }
 702 | 
 703 |   /**
 704 |    * Gets detailed file statistics
 705 |    * @throws {FileNotFoundError} If the path doesn't exist
 706 |    * @throws {DocumentError} For other file system errors
 707 |    */
 708 |   static async getStats(filePath: string): Promise<FileStats> {
 709 |     try {
 710 |       const stats = await fs.stat(filePath);
 711 |       const accessFlags = await this.checkAccess(filePath);
 712 | 
 713 |       return {
 714 |         size: stats.size,
 715 |         created: stats.birthtime,
 716 |         modified: stats.mtime,
 717 |         accessed: stats.atime,
 718 |         isDirectory: stats.isDirectory(),
 719 |         isFile: stats.isFile(),
 720 |         permissions: {
 721 |           readable: accessFlags.readable,
 722 |           writable: accessFlags.writable,
 723 |           executable: accessFlags.executable,
 724 |         },
 725 |       };
 726 |     } catch (error) {
 727 |       if ((error as NodeJS.ErrnoException).code === "ENOENT") {
 728 |         throw new FileNotFoundError(filePath);
 729 |       }
 730 |       throw new DocumentError(String(error), filePath);
 731 |     }
 732 |   }
 733 | 
 734 |   /**
 735 |    * Checks various access flags for a path
 736 |    * @private
 737 |    */
 738 |   private static async checkAccess(filePath: string): Promise<{
 739 |     readable: boolean;
 740 |     writable: boolean;
 741 |     executable: boolean;
 742 |   }> {
 743 |     const check = async (mode: number): Promise<boolean> => {
 744 |       try {
 745 |         await fs.access(filePath, mode);
 746 |         return true;
 747 |       } catch {
 748 |         return false;
 749 |       }
 750 |     };
 751 | 
 752 |     return {
 753 |       readable: await check(fs.constants.R_OK),
 754 |       writable: await check(fs.constants.W_OK),
 755 |       executable: await check(fs.constants.X_OK),
 756 |     };
 757 |   }
 758 | 
 759 |   static readFileSync(filePath: string, options: ReadOptions = {}): string {
 760 |     return fsSync.readFileSync(filePath, {
 761 |       encoding: options.encoding ?? "utf-8",
 762 |       flag: options.flag,
 763 |     });
 764 |   }
 765 | 
 766 |   /**
 767 |    * Reads the entire contents of a file
 768 |    * @throws {FileNotFoundError} If the file doesn't exist
 769 |    * @throws {DocumentError} For other file system errors
 770 |    */
 771 |   static async readFile(
 772 |     filePath: string,
 773 |     options: ReadOptions = {}
 774 |   ): Promise<string> {
 775 |     try {
 776 |       return await fs.readFile(filePath, {
 777 |         encoding: options.encoding ?? "utf-8",
 778 |         flag: options.flag,
 779 |       });
 780 |     } catch (error) {
 781 |       if ((error as NodeJS.ErrnoException).code === "ENOENT") {
 782 |         throw new FileNotFoundError(filePath);
 783 |       }
 784 |       throw new DocumentError(String(error), filePath);
 785 |     }
 786 |   }
 787 | 
 788 |   /**
 789 |    * Writes data to a file, replacing the file if it already exists
 790 |    * @throws {DocumentError} For file system errors
 791 |    */
 792 |   static async writeFile(
 793 |     filePath: string,
 794 |     data: string | Buffer,
 795 |     options: WriteOptions = {}
 796 |   ): Promise<void> {
 797 |     try {
 798 |       await fs.writeFile(filePath, data, {
 799 |         encoding: options.encoding ?? "utf-8",
 800 |         mode: options.mode,
 801 |         flag: options.flag,
 802 |       });
 803 |     } catch (error) {
 804 |       throw new DocumentError(String(error), filePath);
 805 |     }
 806 |   }
 807 | 
 808 |   /**
 809 |    * Appends data to a file
 810 |    * @throws {DocumentError} For file system errors
 811 |    */
 812 |   static async appendFile(
 813 |     filePath: string,
 814 |     content: string,
 815 |     options: WriteOptions = {}
 816 |   ): Promise<void> {
 817 |     await fs.appendFile(filePath, content, {
 818 |       encoding: options.encoding ?? "utf-8",
 819 |       flag: options.flag,
 820 |     });
 821 |   }
 822 | 
 823 |   /**
 824 |    * Reads the contents of a directory
 825 |    */
 826 |   static async readDir(
 827 |     dirPath: string,
 828 |     options?: { withFileTypes?: boolean }
 829 |   ): Promise<string[]> {
 830 |     return await fs.readdir(dirPath, options as ObjectEncodingOptions);
 831 |   }
 832 | 
 833 |   /**
 834 |    * Creates a directory if it doesn't exist
 835 |    * @throws {DocumentError} For file system errors
 836 |    */
 837 |   static async createDir(dirPath: string, recursive = true): Promise<void> {
 838 |     await fs.mkdir(dirPath, { recursive });
 839 |   }
 840 | 
 841 |   /**
 842 |    * Gets the base name of a file
 843 |    * @param filePath - The path to the file
 844 |    * @returns The base name of the file
 845 |    */
 846 |   static baseName(filePath: string): string {
 847 |     return path.basename(filePath);
 848 |   }
 849 | 
 850 |   /**
 851 |    * Gets the extension of a file
 852 |    * @param filePath - The path to the file
 853 |    * @returns The extension of the file
 854 |    */
 855 |   static extension(filePath: string): string {
 856 |     return path.extname(filePath);
 857 |   }
 858 | 
 859 |   /**
 860 |    * Checks if a file or directory exists
 861 |    */
 862 |   static exists(filePath: string): boolean {
 863 |     try {
 864 |       fsSync.accessSync(filePath);
 865 |       return true;
 866 |     } catch {
 867 |       return false;
 868 |     }
 869 |   }
 870 | 
 871 |   static isAbsolute(filePath: string): boolean {
 872 |     return path.isAbsolute(filePath);
 873 |   }
 874 | 
 875 |   /**
 876 |    * Gets directory contents with type information
 877 |    * @throws {DocumentError} If path is not a directory or other errors
 878 |    */
 879 |   static async readDirectory(
 880 |     dirPath: string
 881 |   ): Promise<Array<{ name: string; type: FileType }>> {
 882 |     try {
 883 |       const entries = await fs.readdir(dirPath, { withFileTypes: true });
 884 |       return entries.map((entry) => ({
 885 |         name: entry.name,
 886 |         type: entry.isDirectory() ? FileType.Directory : FileType.File,
 887 |       }));
 888 |     } catch (error) {
 889 |       throw new DocumentError(String(error), dirPath);
 890 |     }
 891 |   }
 892 |   /**
 893 |    * Creates a directory if it doesn't exist
 894 |    * @throws {DocumentError} For file system errors
 895 |    */
 896 |   static async ensureDirectory(
 897 |     dirPath: string,
 898 |     options: DirectoryOptions = {}
 899 |   ): Promise<void> {
 900 |     try {
 901 |       if (!this.exists(dirPath)) {
 902 |         await fs.mkdir(dirPath, {
 903 |           recursive: options.recursive ?? true,
 904 |           mode: options.mode,
 905 |         });
 906 |       }
 907 |     } catch (error) {
 908 |       throw new DocumentError(String(error), dirPath);
 909 |     }
 910 |   }
 911 | 
 912 |   static async remove(filePath: string): Promise<void> {
 913 |     const stats = await fs.stat(filePath);
 914 |     if (stats.isDirectory()) {
 915 |       await fs.rm(filePath, { recursive: true, force: true });
 916 |     } else {
 917 |       await fs.unlink(filePath);
 918 |     }
 919 |   }
 920 | 
 921 |   // File/Directory Copy Operations
 922 |   static async copy(src: string, dest: string): Promise<void> {
 923 |     const stats = await fs.stat(src);
 924 | 
 925 |     if (stats.isDirectory()) {
 926 |       await this.copyDir(src, dest);
 927 |     } else {
 928 |       await fs.copyFile(src, dest);
 929 |     }
 930 |   }
 931 | 
 932 |   private static async copyDir(src: string, dest: string): Promise<void> {
 933 |     await this.ensureDirectory(dest);
 934 |     const entries = await fs.readdir(src, { withFileTypes: true });
 935 | 
 936 |     for (const entry of entries) {
 937 |       const srcPath = path.join(src, entry.name);
 938 |       const destPath = path.join(dest, entry.name);
 939 | 
 940 |       if (entry.isDirectory()) {
 941 |         await this.copyDir(srcPath, destPath);
 942 |       } else {
 943 |         await fs.copyFile(srcPath, destPath);
 944 |       }
 945 |     }
 946 |   }
 947 | 
 948 |   public static join(...paths: string[]): string {
 949 |     return path.join(...paths);
 950 |   }
 951 | }
 952 | ```
 953 | 
 954 | ## Templates
 955 | 
 956 | ```typescript
 957 | // infrastructure/templates/TemplateEngine.ts
 958 | import { z, ZodObject } from "zod";
 959 | import { TemplateType } from "../../types/template";
 960 | 
 961 | import { DocumentFactory } from "../filesystem/DocumentFactory";
 962 | import { FILE_EXTENSION, Config, FileExtension } from "../../utils/config";
 963 | 
 964 | type TemplateValue = z.ZodType<string | number | boolean>;
 965 | 
 966 | export class Template<
 967 |   T extends Record<string, TemplateValue> = Record<string, TemplateValue>
 968 | > {
 969 |   private _content: string = "";
 970 | 
 971 |   public constructor(
 972 |     private type: TemplateType,
 973 |     private schema: ZodObject<T>
 974 |   ) {}
 975 | 
 976 |   public async load(
 977 |     path: string,
 978 |     additionalFields?: Record<string, z.ZodSchema<string>>
 979 |   ): Promise<void> {
 980 |     this._content = await DocumentFactory.readFile(path);
 981 |     if (additionalFields) {
 982 |       this.schema = this.schema.extend(additionalFields) as ZodObject<T>;
 983 |     }
 984 |     this.validate();
 985 |   }
 986 | 
 987 |   public get content(): string {
 988 |     if (!this._content) {
 989 |       throw new Error(`Template content is not loaded for ${this.type}`);
 990 |     }
 991 |     return this._content;
 992 |   }
 993 | 
 994 |   private validate() {
 995 |     const tokens = this.getTemplateTokens();
 996 |     const requiredFields = Object.keys(this.schema.shape);
 997 |     const missingRequired = requiredFields.filter(
 998 |       (field) => !tokens.includes(field)
 999 |     );
1000 | 
1001 |     if (missingRequired.length > 0) {
1002 |       throw new Error(
1003 |         `Missing required tokens in ${
1004 |           this.type
1005 |         } template: ${missingRequired.join(", ")}`
1006 |       );
1007 |     }
1008 |   }
1009 | 
1010 |   public static async create<T extends Record<string, TemplateValue>>(
1011 |     type: TemplateType,
1012 |     schema: ZodObject<T>,
1013 |     path: string,
1014 |     additionalFields?: Record<string, z.ZodSchema<string>>
1015 |   ): Promise<Template<T>> {
1016 |     const template = new Template(type, schema);
1017 |     await template.load(path, additionalFields);
1018 |     return template;
1019 |   }
1020 | 
1021 |   private getTemplateTokens(): string[] {
1022 |     const tokenRegex = /\{\{(\w+)\}\}/g;
1023 |     const tokens: string[] = [];
1024 |     let match;
1025 | 
1026 |     while ((match = tokenRegex.exec(this.content)) !== null) {
1027 |       tokens.push(match[1]!);
1028 |     }
1029 | 
1030 |     return tokens;
1031 |   }
1032 | 
1033 |   public render(values: Record<string, string | number | boolean>): string {
1034 |     try {
1035 |       this.schema.parse(values);
1036 |       return this.content.replace(/\{\{(\w+)\}\}/g, (_, key) =>
1037 |         values[key] !== undefined ? String(values[key]) : `{{${key}}}`
1038 |       );
1039 |     } catch (error) {
1040 |       if (error instanceof z.ZodError) {
1041 |         throw new Error(
1042 |           `Template content validation failed for ${this.type}: ${error.errors
1043 |             .map((e) => `${e.path.join(".")}: ${e.message}`)
1044 |             .join(", ")}`
1045 |         );
1046 |       }
1047 |       throw error;
1048 |     }
1049 |   }
1050 | 
1051 |   static get templateFileExtensions(): FileExtension[] {
1052 |     const config = Config.load();
1053 |     return config.get("outputFormat").map((format) => FILE_EXTENSION[format]);
1054 |   }
1055 | }
1056 | ```
1057 | 
1058 | ```typescript
1059 | // infrastructure/templates/zod.ts
1060 | import { z } from "zod";
1061 | 
1062 | export const BaseTemplateSchema = z.object({
1063 |   PROJECT_NAME: z.string(),
1064 |   GENERATION_DATE: z.string().datetime(),
1065 |   DIRECTORY_STRUCTURE: z.string(),
1066 |   TOTAL_FILES: z.number(),
1067 |   TOTAL_DIRECTORIES: z.number(),
1068 |   TOTAL_SIZE: z.number(),
1069 |   CONTENT: z.string(),
1070 | });
1071 | 
1072 | export type BaseTemplate = z.infer<typeof BaseTemplateSchema>;
1073 | export type BaseTemplateString = keyof BaseTemplate;
1074 | 
1075 | export const FileTemplateSchema = z.object({
1076 |   FILE_NAME: z.string(),
1077 |   FILE_EXTENSION: z.string(),
1078 |   FILE_SIZE: z.number(),
1079 |   FILE_CONTENTS: z.string(),
1080 | });
1081 | 
1082 | export type FileTemplate = z.infer<typeof FileTemplateSchema>;
1083 | export type FileTemplateString = keyof FileTemplate;
1084 | 
1085 | export const DirectoryTemplateSchema = z.object({
1086 |   DIRECTORY_NAME: z.string(),
1087 |   DIRECTORY_PATH: z.string(),
1088 |   DIRECTORY_SIZE: z.number(),
1089 |   CONTENT: z.string(),
1090 | });
1091 | 
1092 | export type DirectoryTemplate = z.infer<typeof DirectoryTemplateSchema>;
1093 | export type DirectoryTemplateString = keyof DirectoryTemplate;
1094 | ```
1095 | 
1096 | ## Services
1097 | 
1098 | ### Builder
1099 | 
1100 | ```typescript
1101 | // services/builder/DocumentTreeBuilder.ts
1102 | import { FileTreeBuilder, FileTreeNode } from "./FileTreeBuilder";
1103 | import { RenderableDirectory } from "../../core/entities/NodeDIrectory";
1104 | import { RenderableFile } from "../../core/entities/NodeFile";
1105 | import { RenderStrategy } from "../renderer/RenderStrategy";
1106 | import { Config } from "../../utils/config";
1107 | import { logger } from "../../utils/logger";
1108 | import { FileType } from "../../types/type";
1109 | 
1110 | export class DocumentTreeBuilder {
1111 |   private root: RenderableDirectory | RenderableFile | undefined;
1112 |   private builder: FileTreeBuilder;
1113 |   constructor(config: Config, private renderStrategy: RenderStrategy[]) {
1114 |     this.builder = new FileTreeBuilder(config);
1115 |   }
1116 | 
1117 |   async build(): Promise<void> {
1118 |     try {
1119 |       // Build file tree structure
1120 |       const fileTree = await this.builder.build();
1121 | 
1122 |       // Convert file tree to Document tree
1123 |       this.root = await this.createDocumentStructure(fileTree);
1124 | 
1125 |       // Initialize the entire document tree
1126 |       await this.root.bundle();
1127 |     } catch (error) {
1128 |       logger.error("Error building document tree", error as Error);
1129 |       throw error;
1130 |     }
1131 |   }
1132 | 
1133 |   private async createDocumentStructure(
1134 |     node: FileTreeNode
1135 |   ): Promise<RenderableDirectory | RenderableFile> {
1136 |     if (node.type === FileType.Directory) {
1137 |       const directory = new RenderableDirectory(
1138 |         node.name,
1139 |         node.path,
1140 |         this.renderStrategy
1141 |       );
1142 | 
1143 |       if (node.children) {
1144 |         // Recursively create children
1145 |         for (const child of node.children) {
1146 |           const childDocument = await this.createDocumentStructure(child);
1147 |           await directory.addChild(childDocument);
1148 |         }
1149 |       }
1150 | 
1151 |       return directory;
1152 |     } else {
1153 |       return new RenderableFile(node.name, node.path, this.renderStrategy);
1154 |     }
1155 |   }
1156 | }
1157 | ```
1158 | 
1159 | ```typescript
1160 | // services/builder/FileTreeBuilder.ts
1161 | import { Config, ConfigOptions } from "../../utils/config";
1162 | import { DocumentFactory } from "../../infrastructure/filesystem/DocumentFactory";
1163 | import { FileType } from "../../types/type";
1164 | import { minimatch } from "minimatch";
1165 | 
1166 | export interface FileTreeNode {
1167 |   name: string;
1168 |   path: string;
1169 |   type: FileType;
1170 |   children?: FileTreeNode[];
1171 | }
1172 | 
1173 | export interface FileTreeBuilderOptions
1174 |   extends Pick<
1175 |     ConfigOptions,
1176 |     | "additionalIgnoreFiles"
1177 |     | "maxDepth"
1178 |     | "excludePatterns"
1179 |     | "dir"
1180 |     | "followSymlinks"
1181 |   > {
1182 |   pattern: RegExp;
1183 |   returnType: "paths" | "details";
1184 | }
1185 | 
1186 | class FileHidden {
1187 |   private ignoreHiddenFiles: boolean;
1188 |   private patterns: string[];
1189 |   private additionalIgnoreFiles: string[];
1190 | 
1191 |   constructor(config: Config) {
1192 |     this.ignoreHiddenFiles = config.get("ignoreHiddenFiles") as boolean;
1193 |     this.patterns = [...config.get("excludePatterns")];
1194 |     this.additionalIgnoreFiles = config.get("additionalIgnoreFiles");
1195 |   }
1196 | 
1197 |   public shouldExclude(fileName: string): boolean {
1198 |     if (this.ignoreHiddenFiles && fileName.startsWith(".")) {
1199 |       return true;
1200 |     }
1201 | 
1202 |     if (this.patterns.some((pattern) => minimatch(fileName, pattern))) {
1203 |       return true;
1204 |     }
1205 | 
1206 |     if (this.additionalIgnoreFiles.some((file) => minimatch(fileName, file))) {
1207 |       // Additional ignore files are always excluded
1208 |       return true;
1209 |     }
1210 | 
1211 |     return false;
1212 |   }
1213 | }
1214 | 
1215 | export class FileTreeBuilder {
1216 |   private config: Config;
1217 |   private options: FileTreeBuilderOptions;
1218 |   private fileHidden: FileHidden;
1219 | 
1220 |   constructor(config: Config) {
1221 |     this.config = config;
1222 |     this.options = this.initializeOptions();
1223 |     this.fileHidden = new FileHidden(config);
1224 |   }
1225 | 
1226 |   private initializeOptions(): FileTreeBuilderOptions {
1227 |     return {
1228 |       dir: this.config.get("dir"),
1229 |       pattern: new RegExp(this.config.get("pattern")),
1230 |       maxDepth: this.config.get("maxDepth"),
1231 |       excludePatterns: this.config.get("excludePatterns"),
1232 |       additionalIgnoreFiles: this.config.get("additionalIgnoreFiles"),
1233 |       returnType: "details",
1234 |       followSymlinks: false,
1235 |     };
1236 |   }
1237 |   public async build(): Promise<FileTreeNode> {
1238 |     const rootDir = this.options.dir;
1239 |     if (!DocumentFactory.exists(rootDir)) {
1240 |       throw new Error(`Directory ${rootDir} does not exist`);
1241 |     }
1242 |     return await this.buildTree(rootDir);
1243 |   }
1244 | 
1245 |   private async buildTree(
1246 |     nodePath: string,
1247 |     depth: number = 0
1248 |   ): Promise<FileTreeNode> {
1249 |     const stats = await DocumentFactory.getStats(nodePath);
1250 |     const name = DocumentFactory.baseName(nodePath);
1251 | 
1252 |     const node: FileTreeNode = {
1253 |       name,
1254 |       path: nodePath,
1255 |       type: stats.isDirectory ? FileType.Directory : FileType.File,
1256 |     };
1257 | 
1258 |     if (stats.isDirectory) {
1259 |       // Check depth limit
1260 |       if (
1261 |         this.options.maxDepth !== undefined &&
1262 |         depth >= this.options.maxDepth
1263 |       ) {
1264 |         return node;
1265 |       }
1266 | 
1267 |       // Read directory entries
1268 |       const entries = await DocumentFactory.readDir(nodePath);
1269 |       const children: FileTreeNode[] = [];
1270 | 
1271 |       for (const entry of entries) {
1272 |         const childPath = DocumentFactory.join(nodePath, entry);
1273 | 
1274 |         // Skip if should be excluded
1275 |         if (this.fileHidden.shouldExclude(entry)) {
1276 |           continue;
1277 |         }
1278 | 
1279 |         // Recursively build tree for child
1280 |         const childNode = await this.buildTree(childPath, depth + 1);
1281 |         children.push(childNode);
1282 |       }
1283 | 
1284 |       node.children = children;
1285 |     }
1286 | 
1287 |     return node;
1288 |   }
1289 | }
1290 | ```
1291 | 
1292 | ### Renderer
1293 | 
1294 | ```typescript
1295 | // services/renderer/RenderStrategy.ts
1296 | import { NodeFile } from "../../core/entities/NodeFile";
1297 | import { NodeDirectory } from "../../core/entities/NodeDIrectory";
1298 | import { Config, OutputFormatExtension } from "../../utils/config";
1299 | import { DocumentFactory } from "../../infrastructure/filesystem/DocumentFactory";
1300 | import { Template } from "../../infrastructure/templates/TemplateEngine";
1301 | import {
1302 |   BaseTemplateSchema,
1303 |   FileTemplateSchema,
1304 |   DirectoryTemplateSchema,
1305 |   BaseTemplate,
1306 |   FileTemplate,
1307 |   DirectoryTemplate,
1308 | } from "../../infrastructure/templates/zod";
1309 | import { TemplateType } from "../../types/template";
1310 | 
1311 | interface ContentRenderer {
1312 |   renderFile(file: NodeFile): string;
1313 |   renderDirectory(directory: NodeDirectory): string;
1314 | }
1315 | 
1316 | interface TemplateLoader {
1317 |   loadTemplates(): Promise<void>;
1318 | }
1319 | 
1320 | interface DocumentRenderer {
1321 |   render(rootDirectory: NodeDirectory): Promise<string>;
1322 |   dispose(): Promise<void>;
1323 | }
1324 | 
1325 | export interface RenderStrategy
1326 |   extends ContentRenderer,
1327 |     TemplateLoader,
1328 |     DocumentRenderer {}
1329 | 
1330 | export abstract class BaseRenderStrategy implements RenderStrategy {
1331 |   protected extension: OutputFormatExtension;
1332 |   protected templates: Record<TemplateType, Template | null>;
1333 |   protected config: Config;
1334 | 
1335 |   protected constructor(config: Config, extension: OutputFormatExtension) {
1336 |     this.config = config;
1337 |     this.templates = {
1338 |       page: null,
1339 |       file: null,
1340 |       directory: null,
1341 |     };
1342 |     this.extension = extension;
1343 |   }
1344 | 
1345 |   async loadTemplates(): Promise<void> {
1346 |     const templateDir = DocumentFactory.join(
1347 |       this.config.get("rootDir") as string,
1348 |       this.config.get("templatesDir") as string
1349 |     );
1350 |     // check if the templates directory exists
1351 |     if (!DocumentFactory.exists(templateDir)) {
1352 |       throw new Error(`Templates directory not found: ${templateDir}`);
1353 |     }
1354 | 
1355 |     this.templates = {
1356 |       page: await Template.create(
1357 |         "page",
1358 |         BaseTemplateSchema,
1359 |         DocumentFactory.join(templateDir, `page.${this.extension}`)
1360 |       ),
1361 |       file: await Template.create(
1362 |         "file",
1363 |         FileTemplateSchema,
1364 |         DocumentFactory.join(templateDir, `file.${this.extension}`)
1365 |       ),
1366 |       directory: await Template.create(
1367 |         "directory",
1368 |         DirectoryTemplateSchema,
1369 |         DocumentFactory.join(templateDir, `directory.${this.extension}`)
1370 |       ),
1371 |     };
1372 |   }
1373 | 
1374 |   public renderFile(file: NodeFile): string {
1375 |     if (!this.templates.file) {
1376 |       throw new Error("File template is not loaded");
1377 |     }
1378 |     return this.replaceSelectors(this.templates.file.content, {
1379 |       FILE_NAME: file.name,
1380 |       FILE_EXTENSION: file.extension,
1381 |       FILE_SIZE: file.size,
1382 |       FILE_CONTENTS: file.content || "",
1383 |     });
1384 |   }
1385 | 
1386 |   public renderDirectory(directory: NodeDirectory): string {
1387 |     const content = directory.children
1388 |       .map(
1389 |         (child) =>
1390 |           child instanceof NodeFile
1391 |             ? this.renderFile(child)
1392 |             : this.renderDirectory(child) // save the rendering result on the object after bundling execution
1393 |       )
1394 |       .join("");
1395 |     if (!this.templates.directory) {
1396 |       throw new Error("Directory template is not loaded");
1397 |     }
1398 |     return this.replaceSelectors(this.templates.directory.content, {
1399 |       DIRECTORY_NAME: directory.name,
1400 |       DIRECTORY_PATH: directory.path,
1401 |       DIRECTORY_SIZE: directory.size,
1402 |       CONTENT: content,
1403 |     });
1404 |   }
1405 | 
1406 |   protected replaceSelectors(
1407 |     template: string,
1408 |     values: BaseTemplate | FileTemplate | DirectoryTemplate
1409 |   ): string {
1410 |     return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
1411 |       const typedKey = key as keyof typeof values;
1412 |       return values[typedKey] !== undefined
1413 |         ? String(values[typedKey])
1414 |         : `{{${key}}}`;
1415 |     });
1416 |   }
1417 | 
1418 |   public async render(rootDirectory: NodeDirectory): Promise<string> {
1419 |     const directoryContent = this.renderDirectory(rootDirectory);
1420 |     if (!this.templates.page) {
1421 |       throw new Error("Page template is not loaded");
1422 |     }
1423 |     return this.replaceSelectors(this.templates.page.content, {
1424 |       PROJECT_NAME:
1425 |         this.config.get("projectName") || rootDirectory.name || "Project",
1426 |       GENERATION_DATE: new Date().toLocaleDateString(),
1427 |       DIRECTORY_STRUCTURE: directoryContent,
1428 |       TOTAL_FILES: rootDirectory.length,
1429 |       TOTAL_DIRECTORIES: rootDirectory.deepLength,
1430 |       TOTAL_SIZE: rootDirectory.size,
1431 |       CONTENT: directoryContent,
1432 |     });
1433 |   }
1434 | 
1435 |   public async dispose(): Promise<void> {
1436 |     this.templates = {
1437 |       page: null,
1438 |       file: null,
1439 |       directory: null,
1440 |     };
1441 |   }
1442 | }
1443 | ```
1444 | 
1445 | ```typescript
1446 | // services/renderer/strategies/HTMLStrategy.ts
1447 | import { BaseRenderStrategy } from "../RenderStrategy";
1448 | import { Config } from "../../../utils/config";
1449 | import { NodeFile } from "../../../core/entities/NodeFile";
1450 | import { OUTPUT_FORMATS } from "../../../utils/config/shema";
1451 | 
1452 | export class HTMLRenderStrategy extends BaseRenderStrategy {
1453 |   constructor(config: Config) {
1454 |     super(config, OUTPUT_FORMATS.html);
1455 |   }
1456 | 
1457 |   protected processCodeBlock(content: string, language: string): string {
1458 |     return `<pre><code class="language-${language}">${this.escapeHtml(
1459 |       content
1460 |     )}</code></pre>`;
1461 |   }
1462 | 
1463 |   private escapeHtml(content: string): string {
1464 |     return content
1465 |       .replace(/&/g, "&amp;")
1466 |       .replace(/</g, "&lt;")
1467 |       .replace(/>/g, "&gt;")
1468 |       .replace(/"/g, "&quot;")
1469 |       .replace(/'/g, "&#039;");
1470 |   }
1471 | 
1472 |   public override renderFile(file: NodeFile): string {
1473 |     const rendered = super.renderFile(file);
1474 |     return this.processCodeBlock(rendered, file.extension.replace(".", ""));
1475 |   }
1476 | }
1477 | ```
1478 | 
1479 | ```typescript
1480 | // services/renderer/strategies/MarkdownStrategy.ts
1481 | import { BaseRenderStrategy } from "../RenderStrategy";
1482 | import { Config } from "../../../utils/config";
1483 | import { OUTPUT_FORMATS } from "../../../utils/config/shema";
1484 | import { NodeFile } from "../../../core/entities/NodeFile";
1485 | 
1486 | export class MarkdownStrategy extends BaseRenderStrategy {
1487 |   constructor(config: Config) {
1488 |     super(config, OUTPUT_FORMATS.markdown);
1489 |   }
1490 | 
1491 |   protected processCodeBlock(content: string, language: string): string {
1492 |     return `\`\`\`${language}\n${content}\n\`\`\``;
1493 |   }
1494 | 
1495 |   public override renderFile(file: NodeFile): string {
1496 |     const rendered = super.renderFile(file);
1497 |     return this.processCodeBlock(rendered, file.extension.replace(".", ""));
1498 |   }
1499 | }
1500 | ```
1501 | 
1502 | # Types
1503 | 
1504 | ```typescript
1505 | // types/template.ts
1506 | import { z } from "zod";
1507 | 
1508 | export type TemplateType = "page" | "file" | "directory";
1509 | 
1510 | export interface TemplateContent<T> {
1511 |   content: string;
1512 |   schema: z.ZodSchema<T>;
1513 |   additionalFields?: Record<string, z.ZodSchema<string>>;
1514 | }
1515 | ```
1516 | 
1517 | ```typescript
1518 | // types/type.ts
1519 | export const FileType = {
1520 |   File: "file",
1521 |   Directory: "directory",
1522 | } as const;
1523 | 
1524 | export type FileType = (typeof FileType)[keyof typeof FileType];
1525 | 
1526 | export interface FileStats {
1527 |   size: number;
1528 |   created: Date;
1529 |   modified: Date;
1530 |   accessed: Date;
1531 |   isDirectory: boolean;
1532 |   isFile: boolean;
1533 |   permissions: {
1534 |     readable: boolean;
1535 |     writable: boolean;
1536 |     executable: boolean;
1537 |   };
1538 | }
1539 | 
1540 | export interface ReadOptions {
1541 |   encoding?: BufferEncoding;
1542 |   flag?: string;
1543 | }
1544 | 
1545 | export interface WriteOptions extends ReadOptions {
1546 |   mode?: number;
1547 |   flag?: string;
1548 | }
1549 | 
1550 | export interface DirectoryOptions {
1551 |   recursive?: boolean;
1552 |   mode?: number;
1553 | }
1554 | 
1555 | export interface FileTreeItem {
1556 |   path: string;
1557 |   type: FileType;
1558 |   stats?: FileStats;
1559 | }
1560 | 
1561 | export interface PropsNode {
1562 |   name: string;
1563 |   path: string;
1564 |   deep: number;
1565 |   size: number;
1566 |   extension?: string;
1567 |   stats: FileStats;
1568 | }
1569 | ```
1570 | 
1571 | # Utils
1572 | 
1573 | ```typescript
1574 | // utils/config/Config.ts
1575 | import { z } from "zod";
1576 | import { logger } from "../logger/Logger";
1577 | import { DocumentFactory } from "../../infrastructure/filesystem/DocumentFactory";
1578 | import {
1579 |   ConfigSchema,
1580 |   ConfigOptions,
1581 |   DEFAULT_CONFIG,
1582 |   ConfigKeys,
1583 | } from "./shema";
1584 | 
1585 | export class Config {
1586 |   private static instance: Config | undefined;
1587 |   private config: ConfigOptions;
1588 | 
1589 |   private constructor() {
1590 |     this.config = this.loodConfig();
1591 |   }
1592 | 
1593 |   public static load(): Config {
1594 |     if (!Config.instance) {
1595 |       Config.instance = new Config();
1596 |     }
1597 |     return Config.instance;
1598 |   }
1599 |   private loodConfig(): ConfigOptions {
1600 |     const defaultConfig = ConfigSchema.parse(DEFAULT_CONFIG);
1601 | 
1602 |     const currentDirConfig = DocumentFactory.join(
1603 |       process.cwd(),
1604 |       defaultConfig.codeConfigFile
1605 |     );
1606 |     if (DocumentFactory.exists(currentDirConfig)) {
1607 |       const userConfig = JSON.parse(
1608 |         DocumentFactory.readFileSync(currentDirConfig)
1609 |       );
1610 |       return { ...defaultConfig, ...userConfig };
1611 |     }
1612 | 
1613 |     return defaultConfig;
1614 |   }
1615 |   public get<T extends ConfigKeys>(key: T): ConfigOptions[T] {
1616 |     return this.config[key] as ConfigOptions[T];
1617 |   }
1618 | 
1619 |   public set(
1620 |     key: keyof ConfigOptions,
1621 |     value: ConfigOptions[keyof ConfigOptions]
1622 |   ): void {
1623 |     const updatedConfig = { ...this.config, [key]: value };
1624 |     try {
1625 |       ConfigSchema.parse(updatedConfig);
1626 |       this.config = updatedConfig;
1627 |     } catch (error) {
1628 |       if (error instanceof z.ZodError) {
1629 |         logger.error(`Invalid configuration value: ${error.errors}`);
1630 |       }
1631 |       throw error;
1632 |     }
1633 |   }
1634 |   public getAll(): ConfigOptions {
1635 |     return this.config;
1636 |   }
1637 |   public reset(): void {
1638 |     this.config = DEFAULT_CONFIG;
1639 |   }
1640 |   public static destroy(): void {
1641 |     Config.instance = undefined;
1642 |   }
1643 |   public override(config: Partial<ConfigOptions>): void {
1644 |     const newOverrideConfig = { ...this.config, ...config };
1645 |     try {
1646 |       ConfigSchema.parse(newOverrideConfig);
1647 |       this.config = newOverrideConfig;
1648 |     } catch (error) {
1649 |       if (error instanceof z.ZodError) {
1650 |         logger.error(`Invalid configuration value: ${error.errors}`);
1651 |       }
1652 |       throw error;
1653 |     }
1654 |   }
1655 | }
1656 | ```
1657 | 
1658 | ```typescript
1659 | // utils/logger/shema.ts
1660 | import { z } from "zod";
1661 | import { LOG_VALUES } from "../logger/Logger";
1662 | 
1663 | export const OUTPUT_FORMATS = {
1664 |   markdown: "md",
1665 |   html: "html",
1666 | } as const;
1667 | 
1668 | export type OutputFormats = typeof OUTPUT_FORMATS;
1669 | export type OutputFormatName = keyof OutputFormats;
1670 | export type OutputFormatExtension = OutputFormats[OutputFormatName];
1671 | 
1672 | export const OutputFormatSchema = z.enum(["markdown", "html"] as const);
1673 | 
1674 | export const FileExtensionSchema = z.enum(["md", "html"] as const);
1675 | 
1676 | export type OutputFormat = z.infer<typeof OutputFormatSchema>;
1677 | export type FileExtension = z.infer<typeof FileExtensionSchema>;
1678 | 
1679 | export const FILE_EXTENSION: Record<OutputFormat, FileExtension> = {
1680 |   markdown: "md",
1681 |   html: "html",
1682 | };
1683 | 
1684 | export const ConfigSchema = z
1685 |   .object({
1686 |     dir: z.string().default(process.cwd()),
1687 |     rootDir: z.string().default(process.cwd()),
1688 |     templatesDir: z.string().default("public/templates"),
1689 |     pattern: z
1690 |       .string()
1691 |       .regex(/^.*$/, "Pattern must be a valid regex")
1692 |       .default(".*"),
1693 |     outputFile: z.string().default("output"),
1694 |     logLevel: z.enum(LOG_VALUES as [string, ...string[]]).default("INFO"),
1695 |     outputFormat: z.array(OutputFormatSchema).default(["markdown"]),
1696 |     maxFileSize: z.number().positive().default(1048576),
1697 |     maxDepth: z.number().default(100),
1698 |     excludePatterns: z
1699 |       .array(z.string())
1700 |       .default(["node_modules/**", "**/*.test.ts", "dist/**"]),
1701 |     ignoreHiddenFiles: z.boolean().default(true),
1702 |     additionalIgnoreFiles: z.array(z.string()).optional().default([]),
1703 |     projectName: z.string().optional(),
1704 |     followSymlinks: z.boolean().default(false),
1705 |     codeConfigFile: z
1706 |       .string()
1707 |       .regex(/\.json$/, "Config file must end with .json")
1708 |       .default("codewrangler.json"),
1709 |   })
1710 |   .strict();
1711 | 
1712 | export type ConfigOptions = z.infer<typeof ConfigSchema>;
1713 | // get a type listing all the keys of the config
1714 | export type ConfigKeys = keyof ConfigOptions;
1715 | 
1716 | export const DEFAULT_CONFIG: ConfigOptions = {
1717 |   dir: process.cwd(), // current working directory, where the command is run
1718 |   rootDir: process.cwd(),
1719 |   templatesDir: "public/templates",
1720 |   pattern: ".*",
1721 |   outputFile: "output",
1722 |   logLevel: "INFO",
1723 |   outputFormat: ["markdown"],
1724 |   maxFileSize: 1048576,
1725 |   maxDepth: 100,
1726 |   codeConfigFile: "codewrangler.json",
1727 |   projectName: undefined,
1728 |   followSymlinks: false,
1729 |   ignoreHiddenFiles: true, // Default value
1730 |   additionalIgnoreFiles: [],
1731 |   excludePatterns: ["node_modules/**", "**/*.test.ts", "dist/**"],
1732 | };
1733 | ```
1734 | 
1735 | ```typescript
1736 | // utils/config/index.ts
1737 | export * from "./Config";
1738 | export * from "./shema";
1739 | ```
1740 | 
1741 | ```typescript
1742 | // utils/logger/index.ts
1743 | export * from "./Logger";
1744 | ```
1745 | 
1746 | ```typescript
1747 | // utils/logger/Logger.ts
1748 | import colors from "colors";
1749 | import { Config } from "../config/Config";
1750 | 
1751 | export const LogLevel = {
1752 |   ERROR: 0,
1753 |   WARN: 1,
1754 |   INFO: 2,
1755 |   DEBUG: 3,
1756 | } as const;
1757 | 
1758 | type LogLevel = (typeof LogLevel)[keyof typeof LogLevel];
1759 | export type LogLevelString = keyof typeof LogLevel;
1760 | export const LOG_VALUES = Object.keys(LogLevel) as LogLevelString[];
1761 | 
1762 | class Logger {
1763 |   private static instance: Logger;
1764 |   private config: Config | null = null;
1765 | 
1766 |   private constructor() {}
1767 |   public static load(): Logger {
1768 |     if (!Logger.instance) {
1769 |       Logger.instance = new Logger();
1770 |     }
1771 |     return Logger.instance;
1772 |   }
1773 |   public setConfig(config: Config) {
1774 |     this.config = config;
1775 |   }
1776 |   public setLogLevel(logLevel: LogLevelString) {
1777 |     if (this.config) {
1778 |       this.config.set("logLevel", logLevel);
1779 |     }
1780 |   }
1781 | 
1782 |   private get logLevel(): LogLevel {
1783 |     const configLogLevel = this.config?.get("logLevel") as
1784 |       | LogLevelString
1785 |       | undefined;
1786 |     return configLogLevel ? LogLevel[configLogLevel] : LogLevel.ERROR;
1787 |   }
1788 | 
1789 |   public error(message: string, error?: Error, ...other: unknown[]) {
1790 |     if (this.logLevel >= LogLevel.ERROR) {
1791 |       console.log(colors.red(`[ERROR] ${message}`), ...other);
1792 |       if (error instanceof Error && error.stack) {
1793 |         console.log(colors.red(error.stack));
1794 |       }
1795 |     }
1796 |   }
1797 | 
1798 |   public warn(message: string) {
1799 |     if (this.logLevel >= LogLevel.WARN) {
1800 |       console.log(colors.yellow(`[WARN] ${message}`));
1801 |     }
1802 |   }
1803 | 
1804 |   public info(message: string) {
1805 |     if (this.logLevel >= LogLevel.INFO) {
1806 |       console.log(colors.blue(`[INFO] ${message}`));
1807 |     }
1808 |   }
1809 | 
1810 |   public debug(message: string) {
1811 |     if (this.logLevel >= LogLevel.DEBUG) {
1812 |       console.log(colors.gray(`[DEBUG] ${message}`));
1813 |     }
1814 |   }
1815 | 
1816 |   public success(message: string) {
1817 |     console.log(colors.green(message));
1818 |   }
1819 | 
1820 |   public log(message: string) {
1821 |     console.log(message);
1822 |   }
1823 | }
1824 | 
1825 | export const logger = Logger.load();
1826 | ```
1827 | 
```

---------------------------------------------------------------------------


## File: demo.md
- Path: `/root/git/codewrangler/demo.md`
- Size: 82.42 KB
- Extension: .md
- Lines of code: 2655
- Content:

```md
   1 | 
   2 | # Code Documentation
   3 | Generated on: 2024-12-04T07:15:06.458Z
   4 | Total files: 32
   5 | 
   6 | ## Project Structure
   7 | 
   8 | ```
   9 | codewrangler
  10 | ├── public
  11 | │   └── templates
  12 | └── src
  13 |     ├── cli
  14 |     │   ├── CodeWrangler.ts
  15 |     │   ├── commands
  16 |     │   │   ├── DemoCommand.ts
  17 |     │   │   ├── GenerateCommand.ts
  18 |     │   │   └── types.ts
  19 |     │   ├── index.ts
  20 |     │   └── program
  21 |     │       └── ProgramBuilder.ts
  22 |     ├── core
  23 |     │   ├── entities
  24 |     │   │   ├── NodeBase.ts
  25 |     │   │   ├── NodeDirectory.ts
  26 |     │   │   └── NodeFile.ts
  27 |     │   └── errors
  28 |     │       ├── DirectoryNotFoundError.ts
  29 |     │       ├── DocumentError.ts
  30 |     │       ├── FileNotFoundError.ts
  31 |     │       └── index.ts
  32 |     ├── infrastructure
  33 |     │   ├── filesystem
  34 |     │   │   ├── DocumentFactory.ts
  35 |     │   │   ├── FileStats.ts
  36 |     │   │   └── JsonReader.ts
  37 |     │   └── templates
  38 |     │       ├── TemplateEngine.ts
  39 |     │       └── zod.ts
  40 |     ├── services
  41 |     │   ├── builder
  42 |     │   │   ├── DocumentTreeBuilder.ts
  43 |     │   │   ├── FileHidden.ts
  44 |     │   │   └── NodeTreeBuilder.ts
  45 |     │   └── renderer
  46 |     │       ├── RenderStrategy.ts
  47 |     │       └── strategies
  48 |     │           ├── HTMLStrategy.ts
  49 |     │           └── MarkdownStrategy.ts
  50 |     ├── types
  51 |     │   ├── template.ts
  52 |     │   └── type.ts
  53 |     └── utils
  54 |         ├── config
  55 |         │   ├── Config.ts
  56 |         │   ├── index.ts
  57 |         │   └── schema.ts
  58 |         ├── helpers
  59 |         │   └── ProgressBar.ts
  60 |         └── logger
  61 |             ├── Logger.ts
  62 |             └── index.ts
  63 | ```
  64 | 
  65 | 
  66 | ## File: CodeWrangler.ts
  67 | - Path: `/root/git/codewrangler/src/cli/CodeWrangler.ts`
  68 | - Size: 1.21 KB
  69 | - Extension: .ts
  70 | - Lines of code: 32
  71 | - Content:
  72 | 
  73 | ```ts
  74 |  1 | import { Command } from "commander";
  75 |  2 | 
  76 |  3 | import { GenerateCommand } from "./commands/GenerateCommand";
  77 |  4 | import { ICommandOptions } from "./commands/types";
  78 |  5 | import { ProgramBuilder } from "./program/ProgramBuilder";
  79 |  6 | import { Config } from "../utils/config/Config";
  80 |  7 | 
  81 |  8 | export class CodeWrangler {
  82 |  9 |   private static instance: CodeWrangler | undefined;
  83 | 10 |   private readonly VERSION = "1.0.0";
  84 | 11 |   private config: Config;
  85 | 12 |   private program: Command;
  86 | 13 |   private generateCommand: GenerateCommand;
  87 | 14 | 
  88 | 15 |   private constructor(config: Config) {
  89 | 16 |     this.config = config;
  90 | 17 |     this.generateCommand = new GenerateCommand(this.config);
  91 | 18 |     this.program = new ProgramBuilder(this.config, this.VERSION).build();
  92 | 19 | 
  93 | 20 |     this.setupCommands();
  94 | 21 |   }
  95 | 22 | 
  96 | 23 |   public static async run(): Promise<boolean> {
  97 | 24 |     if (!CodeWrangler.instance) {
  98 | 25 |       const config = await Config.load();
  99 | 26 |       CodeWrangler.instance = new CodeWrangler(config);
 100 | 27 |       await CodeWrangler.instance.program.parseAsync(process.argv);
 101 | 28 |       return true;
 102 | 29 |     }
 103 | 30 |     throw new Error("CodeWrangler already initialized");
 104 | 31 |   }
 105 | 32 | 
 106 | 33 |   private setupCommands(): void {
 107 | 34 |     this.program.action(async (pattern: string, options: ICommandOptions) => {
 108 | 35 |       await this.generateCommand.execute([pattern], options);
 109 | 36 |     });
 110 | 37 |   }
 111 | 38 | }
 112 | 39 | 
 113 | ```
 114 | 
 115 | ---------------------------------------------------------------------------
 116 | 
 117 | 
 118 | ## File: DemoCommand.ts
 119 | - Path: `/root/git/codewrangler/src/cli/commands/DemoCommand.ts`
 120 | - Size: 7.39 KB
 121 | - Extension: .ts
 122 | - Lines of code: 279
 123 | - Content:
 124 | 
 125 | ```ts
 126 |   1 | /* eslint-disable max-lines-per-function */
 127 |   2 | import { Stats } from "fs";
 128 |   3 | import * as fs from "fs/promises";
 129 |   4 | import * as path from "path";
 130 |   5 | 
 131 |   6 | interface IFileInfo {
 132 |   7 |   name: string;
 133 |   8 |   path: string;
 134 |   9 |   content: string;
 135 |  10 |   ext: string;
 136 |  11 |   size: number;
 137 |  12 |   lines: number;
 138 |  13 | }
 139 |  14 | 
 140 |  15 | interface ITreeNode {
 141 |  16 |   name: string;
 142 |  17 |   path: string;
 143 |  18 |   type: "file" | "directory";
 144 |  19 |   children: ITreeNode[];
 145 |  20 | }
 146 |  21 | 
 147 |  22 | interface IDocumentConfig {
 148 |  23 |   pattern: RegExp;
 149 |  24 |   rootDir: string;
 150 |  25 |   outputPath: string;
 151 |  26 |   excludePatterns: string[];
 152 |  27 |   maxFileSize: number;
 153 |  28 |   ignoreHidden: boolean;
 154 |  29 |   compress: boolean;
 155 |  30 | }
 156 |  31 | 
 157 |  32 | const DEFAULT_CONFIG: IDocumentConfig = {
 158 |  33 |   pattern: /.*/,
 159 |  34 |   rootDir: process.cwd(),
 160 |  35 |   outputPath: "documentation.md",
 161 |  36 |   excludePatterns: ["node_modules/**", "**/dist/**", "**/*.test.ts"],
 162 |  37 |   maxFileSize: 1024 * 1024, // 1MB
 163 |  38 |   ignoreHidden: true,
 164 |  39 |   compress: false
 165 |  40 | };
 166 |  41 | 
 167 |  42 | // Tree visualization functions
 168 |  43 | const generateTreeSymbols = (depth: number, isLast: boolean[]): string => {
 169 |  44 |   if (depth === 0) return "";
 170 |  45 | 
 171 |  46 |   return (
 172 |  47 |     isLast
 173 |  48 |       .slice(0, -1)
 174 |  49 |       .map(last => (last ? "    " : "│   "))
 175 |  50 |       .join("") + (isLast[isLast.length - 1] ? "└── " : "├── ")
 176 |  51 |   );
 177 |  52 | };
 178 |  53 | 
 179 |  54 | const createTreeNode = async (
 180 |  55 |   nodePath: string,
 181 |  56 |   config: IDocumentConfig,
 182 |  57 |   relativePath = ""
 183 |  58 | ): Promise<ITreeNode | null> => {
 184 |  59 |   const stats = await fs.stat(nodePath);
 185 |  60 |   const name = path.basename(nodePath);
 186 |  61 | 
 187 |  62 |   if (!shouldInclude(nodePath, config)) {
 188 |  63 |     return null;
 189 |  64 |   }
 190 |  65 | 
 191 |  66 |   if (stats.isDirectory()) {
 192 |  67 |     const entries = await fs.readdir(nodePath, { withFileTypes: true });
 193 |  68 |     const children: ITreeNode[] = [];
 194 |  69 | 
 195 |  70 |     for (const entry of entries) {
 196 |  71 |       const childNode = await createTreeNode(
 197 |  72 |         path.join(nodePath, entry.name),
 198 |  73 |         config,
 199 |  74 |         path.join(relativePath, name)
 200 |  75 |       );
 201 |  76 |       if (childNode) children.push(childNode);
 202 |  77 |     }
 203 |  78 | 
 204 |  79 |     return {
 205 |  80 |       name,
 206 |  81 |       path: relativePath || name,
 207 |  82 |       type: "directory",
 208 |  83 |       children
 209 |  84 |     };
 210 |  85 |   } else if (isMatchingFile(nodePath, config)) {
 211 |  86 |     return {
 212 |  87 |       name,
 213 |  88 |       path: relativePath || name,
 214 |  89 |       type: "file",
 215 |  90 |       children: []
 216 |  91 |     };
 217 |  92 |   }
 218 |  93 | 
 219 |  94 |   return null;
 220 |  95 | };
 221 |  96 | 
 222 |  97 | const renderTreeNode = (
 223 |  98 |   node: ITreeNode,
 224 |  99 |   isLast: boolean[] = [],
 225 | 100 |   result: string[] = []
 226 | 101 | ): string[] => {
 227 | 102 |   const prefix = generateTreeSymbols(isLast.length, isLast);
 228 | 103 |   result.push(prefix + node.name);
 229 | 104 | 
 230 | 105 |   if (node.type === "directory") {
 231 | 106 |     node.children.forEach((child, index) => {
 232 | 107 |       renderTreeNode(
 233 | 108 |         child,
 234 | 109 |         [...isLast, index === node.children.length - 1],
 235 | 110 |         result
 236 | 111 |       );
 237 | 112 |     });
 238 | 113 |   }
 239 | 114 | 
 240 | 115 |   return result;
 241 | 116 | };
 242 | 117 | 
 243 | 118 | const isHidden = (filePath: string): boolean => {
 244 | 119 |   const baseName = path.basename(filePath);
 245 | 120 |   return baseName.startsWith(".");
 246 | 121 | };
 247 | 122 | 
 248 | 123 | const shouldInclude = (
 249 | 124 |   filePath: string,
 250 | 125 |   { excludePatterns, ignoreHidden }: IDocumentConfig
 251 | 126 | ): boolean => {
 252 | 127 |   // Check for hidden files if ignoreHidden is enabled
 253 | 128 |   if (ignoreHidden && isHidden(filePath)) {
 254 | 129 |     return false;
 255 | 130 |   }
 256 | 131 | 
 257 | 132 |   // Check against exclude patterns
 258 | 133 |   const isExcluded = excludePatterns.some(pattern =>
 259 | 134 |     new RegExp(pattern.replace(/\*/g, ".*")).test(filePath)
 260 | 135 |   );
 261 | 136 | 
 262 | 137 |   return !isExcluded;
 263 | 138 | };
 264 | 139 | 
 265 | 140 | // Pure functions for file operations
 266 | 141 | const isMatchingFile = (filePath: string, config: IDocumentConfig): boolean => {
 267 | 142 |   if (!config.pattern) {
 268 | 143 |     throw new Error("Pattern is not defined in the config");
 269 | 144 |   }
 270 | 145 | 
 271 | 146 |   if (!shouldInclude(filePath, config)) {
 272 | 147 |     return false;
 273 | 148 |   }
 274 | 149 | 
 275 | 150 |   return config.pattern.test(filePath);
 276 | 151 | };
 277 | 152 | 
 278 | 153 | const formatSize = (bytes: number): string => {
 279 | 154 |   const units = ["B", "KB", "MB", "GB"];
 280 | 155 |   let size = bytes;
 281 | 156 |   let unitIndex = 0;
 282 | 157 | 
 283 | 158 |   while (size >= 1024 && unitIndex < units.length - 1) {
 284 | 159 |     size /= 1024;
 285 | 160 |     unitIndex++;
 286 | 161 |   }
 287 | 162 | 
 288 | 163 |   return `${size.toFixed(2)} ${units[unitIndex]}`;
 289 | 164 | };
 290 | 165 | 
 291 | 166 | // Core file processing functions
 292 | 167 | 
 293 | 168 | async function* walkDirectory(dir: string): AsyncGenerator<string> {
 294 | 169 |   const entries = await fs.readdir(dir, { withFileTypes: true });
 295 | 170 | 
 296 | 171 |   for (const entry of entries) {
 297 | 172 |     const fullPath = path.join(dir, entry.name);
 298 | 173 | 
 299 | 174 |     if (entry.isDirectory()) {
 300 | 175 |       yield* walkDirectory(fullPath);
 301 | 176 |     } else {
 302 | 177 |       yield fullPath;
 303 | 178 |     }
 304 | 179 |   }
 305 | 180 | }
 306 | 181 | 
 307 | 182 | const formatContentWithLineNumbers = (content: string): string => {
 308 | 183 |   const lines = content.split("\n");
 309 | 184 |   const lineNumberWidth = lines.length.toString().length;
 310 | 185 | 
 311 | 186 |   return lines
 312 | 187 |     .map((line, index) => {
 313 | 188 |       const lineNumber = (index + 1).toString().padStart(lineNumberWidth, " ");
 314 | 189 |       return `${lineNumber} | ${line}`;
 315 | 190 |     })
 316 | 191 |     .join("\n");
 317 | 192 | };
 318 | 193 | 
 319 | 194 | // Markdown generation functions
 320 | 195 | const generateFileSection = (
 321 | 196 |   file: IFileInfo,
 322 | 197 |   compress: boolean = false
 323 | 198 | ): string =>
 324 | 199 |   !compress
 325 | 200 |     ? `
 326 | 201 | ## File: ${file.name}
 327 | 202 | - Path: \`${file.path}\`
 328 | 203 | - Size: ${formatSize(Number(file.size))}
 329 | 204 | - Extension: ${file.ext}
 330 | 205 | - Lines of code: ${file.lines}
 331 | 206 | - Content:
 332 | 207 | 
 333 | 208 | \`\`\`${file.ext.slice(1) || "plaintext"}
 334 | 209 | ${formatContentWithLineNumbers(file.content)}
 335 | 210 | \`\`\`
 336 | 211 | 
 337 | 212 | ---------------------------------------------------------------------------
 338 | 213 | `
 339 | 214 |     : `
 340 | 215 | ## File: ${file.name}, Path: \`${file.path}\`
 341 | 216 | \`\`\`${file.ext.slice(1) || "plaintext"}
 342 | 217 | ${formatContentWithLineNumbers(file.content)}
 343 | 218 | \`\`\``;
 344 | 219 | 
 345 | 220 | const generateMarkdownContent = (
 346 | 221 |   files: IFileInfo[],
 347 | 222 |   treeContent: string,
 348 | 223 |   compress: boolean
 349 | 224 | ): string =>
 350 | 225 |   !compress
 351 | 226 |     ? `
 352 | 227 | # Code Documentation
 353 | 228 | Generated on: ${new Date().toISOString()}
 354 | 229 | Total files: ${files.length}
 355 | 230 | 
 356 | 231 | ## Project Structure
 357 | 232 | 
 358 | 233 | \`\`\`
 359 | 234 | ${treeContent}
 360 | 235 | \`\`\`
 361 | 236 | 
 362 | 237 | ${files.map(file => generateFileSection(file)).join("\n")}
 363 | 238 | `
 364 | 239 |     : `
 365 | 240 | # Code documentation
 366 | 241 | \`\`\`
 367 | 242 | ${treeContent}
 368 | 243 | \`\`\`
 369 | 244 | ${files.map(file => generateFileSection(file, true)).join("\n")}
 370 | 245 | `;
 371 | 246 | 
 372 | 247 | const compressContent = (content: string): string =>
 373 | 248 |   content
 374 | 249 |     .split("\n")
 375 | 250 |     .map(line => line.trim())
 376 | 251 |     .filter(line => line !== "")
 377 | 252 |     .filter(line => !line.startsWith("//"))
 378 | 253 |     .join("\n");
 379 | 254 | 
 380 | 255 | async function generateFileInfo(
 381 | 256 |   filePath: string,
 382 | 257 |   stats: Stats,
 383 | 258 |   compress: boolean
 384 | 259 | ): Promise<IFileInfo> {
 385 | 260 |   const content = await fs.readFile(filePath, "utf-8");
 386 | 261 |   return {
 387 | 262 |     name: path.basename(filePath),
 388 | 263 |     path: filePath,
 389 | 264 |     content: compress ? compressContent(content) : content,
 390 | 265 |     ext: path.extname(filePath),
 391 | 266 |     size: stats.size,
 392 | 267 |     lines: content.split("\n").filter(line => line.trim() !== "").length
 393 | 268 |   };
 394 | 269 | }
 395 | 270 | 
 396 | 271 | // Main function
 397 | 272 | async function generateDocumentation(
 398 | 273 |   userConfig: Partial<IDocumentConfig> = {}
 399 | 274 | ): Promise<void> {
 400 | 275 |   try {
 401 | 276 |     const config: IDocumentConfig = { ...DEFAULT_CONFIG, ...userConfig };
 402 | 277 |     const files: IFileInfo[] = [];
 403 | 278 | 
 404 | 279 |     // Generate tree structure
 405 | 280 |     const rootNode = await createTreeNode(config.rootDir, config);
 406 | 281 |     const treeContent = rootNode
 407 | 282 |       ? renderTreeNode(rootNode).join("\n")
 408 | 283 |       : "No matching files found";
 409 | 284 | 
 410 | 285 |     for await (const filePath of walkDirectory(config.rootDir)) {
 411 | 286 |       if (!isMatchingFile(filePath, config)) {
 412 | 287 |         continue;
 413 | 288 |       }
 414 | 289 |       const stats = await fs.stat(filePath);
 415 | 290 |       if (stats.size > config.maxFileSize) {
 416 | 291 |         continue;
 417 | 292 |       }
 418 | 293 |       const fileInfo = await generateFileInfo(filePath, stats, config.compress);
 419 | 294 |       files.push(fileInfo);
 420 | 295 |     }
 421 | 296 | 
 422 | 297 |     const markdownContent = generateMarkdownContent(
 423 | 298 |       files,
 424 | 299 |       treeContent,
 425 | 300 |       config.compress
 426 | 301 |     );
 427 | 302 |     await fs.writeFile(config.outputPath, markdownContent, "utf-8");
 428 | 303 |   } catch (error) {
 429 | 304 |     console.error("Error generating documentation", error);
 430 | 305 |     throw error;
 431 | 306 |   }
 432 | 307 | }
 433 | 308 | 
 434 | 309 | if (require.main === module) {
 435 | 310 |   generateDocumentation({
 436 | 311 |     pattern: /\.ts$/,
 437 | 312 |     outputPath: "demo.md",
 438 | 313 |     ignoreHidden: true,
 439 | 314 |     excludePatterns: [
 440 | 315 |       "node_modules",
 441 | 316 |       "dist",
 442 | 317 |       "documentation",
 443 | 318 |       "coverage",
 444 | 319 |       "**/__tests__",
 445 | 320 |       "**/*.test.ts"
 446 | 321 |     ],
 447 | 322 |     compress: false
 448 | 323 |   }).catch(console.error);
 449 | 324 | }
 450 | 325 | 
 451 | ```
 452 | 
 453 | ---------------------------------------------------------------------------
 454 | 
 455 | 
 456 | ## File: GenerateCommand.ts
 457 | - Path: `/root/git/codewrangler/src/cli/commands/GenerateCommand.ts`
 458 | - Size: 1.74 KB
 459 | - Extension: .ts
 460 | - Lines of code: 49
 461 | - Content:
 462 | 
 463 | ```ts
 464 |  1 | import { ICommand, ICommandOptions } from "./types";
 465 |  2 | import { DocumentTreeBuilder } from "../../services/builder/DocumentTreeBuilder";
 466 |  3 | import { HTMLRenderStrategy } from "../../services/renderer/strategies/HTMLStrategy";
 467 |  4 | import { MarkdownStrategy } from "../../services/renderer/strategies/MarkdownStrategy";
 468 |  5 | import { Config } from "../../utils/config/Config";
 469 |  6 | import { logger } from "../../utils/logger/Logger";
 470 |  7 | 
 471 |  8 | const CONFIG_FROM_FORMAT = {
 472 |  9 |   markdown: MarkdownStrategy,
 473 | 10 |   html: HTMLRenderStrategy
 474 | 11 | } as const;
 475 | 12 | 
 476 | 13 | export class GenerateCommand implements ICommand {
 477 | 14 |   public constructor(private config: Config) {}
 478 | 15 | 
 479 | 16 |   public async execute(
 480 | 17 |     args: string[],
 481 | 18 |     options: ICommandOptions
 482 | 19 |   ): Promise<void> {
 483 | 20 |     try {
 484 | 21 |       // Override config with command options
 485 | 22 |       this.config.override({ ...options, pattern: args[0] });
 486 | 23 | 
 487 | 24 |       // Log verbose information if enabled
 488 | 25 |       if (options.verbose) {
 489 | 26 |         this.logVerbose();
 490 | 27 |       }
 491 | 28 | 
 492 | 29 |       // Execute document tree building
 493 | 30 |       const outputFormat = this.config.get("outputFormat");
 494 | 31 |       outputFormat.map(format => new CONFIG_FROM_FORMAT[format](this.config));
 495 | 32 |       const builder = new DocumentTreeBuilder(this.config);
 496 | 33 |       await builder.build();
 497 | 34 | 
 498 | 35 |       // Execute rendering
 499 | 36 |     } catch (error) {
 500 | 37 |       logger.error("Generation failed:", error as Error);
 501 | 38 |       throw error;
 502 | 39 |     }
 503 | 40 |   }
 504 | 41 | 
 505 | 42 |   private logVerbose(): void {
 506 | 43 |     logger.debug(
 507 | 44 |       `Searching for file matching pattern: ${this.config.get("pattern")}`
 508 | 45 |     );
 509 | 46 |     logger.debug(
 510 | 47 |       `Excluding patterns: ${(
 511 | 48 |         this.config.get("excludePatterns") as string[]
 512 | 49 |       ).join(", ")}`
 513 | 50 |     );
 514 | 51 |     logger.debug(
 515 | 52 |       `Ignoring hidden files: ${this.config.get("ignoreHiddenFiles")}`
 516 | 53 |     );
 517 | 54 |     logger.debug(`Max file size: ${this.config.get("maxFileSize")} bytes`);
 518 | 55 |   }
 519 | 56 | }
 520 | 57 | 
 521 | ```
 522 | 
 523 | ---------------------------------------------------------------------------
 524 | 
 525 | 
 526 | ## File: types.ts
 527 | - Path: `/root/git/codewrangler/src/cli/commands/types.ts`
 528 | - Size: 335.00 B
 529 | - Extension: .ts
 530 | - Lines of code: 14
 531 | - Content:
 532 | 
 533 | ```ts
 534 |  1 | export interface ICommandOptions {
 535 |  2 |   dir?: string;
 536 |  3 |   output?: string;
 537 |  4 |   config?: string;
 538 |  5 |   verbose?: boolean;
 539 |  6 |   format?: string[];
 540 |  7 |   maxSize?: number;
 541 |  8 |   exclude?: string[];
 542 |  9 |   ignoreHidden?: boolean;
 543 | 10 |   additionalIgnore?: string[];
 544 | 11 | }
 545 | 12 | 
 546 | 13 | export interface ICommand {
 547 | 14 |   execute: (args: string[], options: ICommandOptions) => Promise<void>;
 548 | 15 | }
 549 | 16 | 
 550 | ```
 551 | 
 552 | ---------------------------------------------------------------------------
 553 | 
 554 | 
 555 | ## File: index.ts
 556 | - Path: `/root/git/codewrangler/src/cli/index.ts`
 557 | - Size: 416.00 B
 558 | - Extension: .ts
 559 | - Lines of code: 16
 560 | - Content:
 561 | 
 562 | ```ts
 563 |  1 | #!/usr/bin/env node
 564 |  2 | import { CodeWrangler } from "./CodeWrangler";
 565 |  3 | import { logger } from "../utils/logger/Logger";
 566 |  4 | 
 567 |  5 | async function main(): Promise<void> {
 568 |  6 |   try {
 569 |  7 |     await CodeWrangler.run();
 570 |  8 |   } catch (error) {
 571 |  9 |     if (error instanceof Error) {
 572 | 10 |       logger.error(error.message);
 573 | 11 |     } else {
 574 | 12 |       logger.error("An unknown error occurred");
 575 | 13 |     }
 576 | 14 |     process.exit(1);
 577 | 15 |   }
 578 | 16 | }
 579 | 17 | 
 580 | 18 | main().catch(() => process.exit(1));
 581 | 19 | 
 582 | ```
 583 | 
 584 | ---------------------------------------------------------------------------
 585 | 
 586 | 
 587 | ## File: ProgramBuilder.ts
 588 | - Path: `/root/git/codewrangler/src/cli/program/ProgramBuilder.ts`
 589 | - Size: 1.88 KB
 590 | - Extension: .ts
 591 | - Lines of code: 67
 592 | - Content:
 593 | 
 594 | ```ts
 595 |  1 | import { Command } from "commander";
 596 |  2 | 
 597 |  3 | import { Config } from "../../utils/config/Config";
 598 |  4 | 
 599 |  5 | export class ProgramBuilder {
 600 |  6 |   private program: Command;
 601 |  7 | 
 602 |  8 |   public constructor(
 603 |  9 |     private config: Config,
 604 | 10 |     private version: string
 605 | 11 |   ) {
 606 | 12 |     this.program = new Command();
 607 | 13 |   }
 608 | 14 | 
 609 | 15 |   public build(): Command {
 610 | 16 |     this.buildVersion().buildDescription().buildArguments().buildOptions();
 611 | 17 |     return this.program;
 612 | 18 |   }
 613 | 19 | 
 614 | 20 |   private buildVersion(): ProgramBuilder {
 615 | 21 |     this.program.version(this.version);
 616 | 22 |     return this;
 617 | 23 |   }
 618 | 24 | 
 619 | 25 |   private buildDescription(): ProgramBuilder {
 620 | 26 |     this.program.description("CodeWrangler is a tool for generating code");
 621 | 27 |     return this;
 622 | 28 |   }
 623 | 29 | 
 624 | 30 |   private buildArguments(): ProgramBuilder {
 625 | 31 |     this.program.argument(
 626 | 32 |       "<pattern>",
 627 | 33 |       'File pattern to match (e.g., "\\.ts$" for TypeScript files)'
 628 | 34 |     );
 629 | 35 |     return this;
 630 | 36 |   }
 631 | 37 | 
 632 | 38 |   // eslint-disable-next-line max-lines-per-function
 633 | 39 |   private buildOptions(): ProgramBuilder {
 634 | 40 |     this.program
 635 | 41 |       .option("-d, --dir <dir>", "Directory to search", this.config.get("dir"))
 636 | 42 |       .option(
 637 | 43 |         "-c, --config <config>",
 638 | 44 |         "Config file",
 639 | 45 |         this.config.get("codeConfigFile")
 640 | 46 |       )
 641 | 47 |       .option("-v, --verbose", "Verbose mode", this.config.get("logLevel"))
 642 | 48 |       .option(
 643 | 49 |         "-f, --format <format>",
 644 | 50 |         "Output format",
 645 | 51 |         this.config.get("outputFormat")
 646 | 52 |       )
 647 | 53 |       .option(
 648 | 54 |         "-o, --output <output>",
 649 | 55 |         "Output file",
 650 | 56 |         this.config.get("outputFile")
 651 | 57 |       )
 652 | 58 |       .option(
 653 | 59 |         "-e, --exclude <exclude>",
 654 | 60 |         "Exclude patterns",
 655 | 61 |         this.config.get("excludePatterns")
 656 | 62 |       )
 657 | 63 |       .option(
 658 | 64 |         "-i, --ignore-hidden",
 659 | 65 |         "Ignore hidden files",
 660 | 66 |         this.config.get("ignoreHiddenFiles")
 661 | 67 |       )
 662 | 68 |       .option(
 663 | 69 |         "-a, --additional-ignore <additional-ignore>",
 664 | 70 |         "Additional ignore patterns",
 665 | 71 |         this.config.get("additionalIgnoreFiles")
 666 | 72 |       );
 667 | 73 |     return this;
 668 | 74 |   }
 669 | 75 | }
 670 | 76 | 
 671 | ```
 672 | 
 673 | ---------------------------------------------------------------------------
 674 | 
 675 | 
 676 | ## File: NodeBase.ts
 677 | - Path: `/root/git/codewrangler/src/core/entities/NodeBase.ts`
 678 | - Size: 2.74 KB
 679 | - Extension: .ts
 680 | - Lines of code: 110
 681 | - Content:
 682 | 
 683 | ```ts
 684 |   1 | import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
 685 |   2 | import { IRenderStrategy } from "../../services/renderer/RenderStrategy";
 686 |   3 | import { IFileStats, IPropsNode } from "../../types/type";
 687 |   4 | 
 688 |   5 | const defaultProps: IPropsNode = {
 689 |   6 |   name: "",
 690 |   7 |   path: "",
 691 |   8 |   deep: 0,
 692 |   9 |   size: 0, // size of the node from the children nodes
 693 |  10 |   stats: {
 694 |  11 |     size: 0, // size of the node from the file system
 695 |  12 |     created: new Date(),
 696 |  13 |     modified: new Date(),
 697 |  14 |     accessed: new Date(),
 698 |  15 |     isDirectory: false,
 699 |  16 |     isFile: false,
 700 |  17 |     permissions: {
 701 |  18 |       readable: false,
 702 |  19 |       writable: false,
 703 |  20 |       executable: false
 704 |  21 |     }
 705 |  22 |   }
 706 |  23 | };
 707 |  24 | 
 708 |  25 | export interface INodeContent {
 709 |  26 |   content: string;
 710 |  27 | }
 711 |  28 | 
 712 |  29 | interface INodeLifeCycle {
 713 |  30 |   validate: () => boolean;
 714 |  31 |   bundle: (deep: number) => Promise<void>;
 715 |  32 |   render: (strategy: IRenderStrategy) => INodeContent;
 716 |  33 |   dispose: () => void;
 717 |  34 |   clone: () => NodeBase;
 718 |  35 | }
 719 |  36 | 
 720 |  37 | export abstract class NodeBase implements INodeLifeCycle {
 721 |  38 |   protected _props: IPropsNode = { ...defaultProps };
 722 |  39 | 
 723 |  40 |   public constructor(
 724 |  41 |     _name: string,
 725 |  42 |     private originalPath: string
 726 |  43 |   ) {
 727 |  44 |     this.initNode(_name, originalPath);
 728 |  45 |     this.validate();
 729 |  46 |   }
 730 |  47 | 
 731 |  48 |   public validate(): boolean {
 732 |  49 |     if (!documentFactory.exists(this.path)) {
 733 |  50 |       throw new Error(`Path ${this.originalPath} does not exist`);
 734 |  51 |     }
 735 |  52 |     if (!documentFactory.isAbsolute(this.path)) {
 736 |  53 |       throw new Error(`Path ${this.originalPath} is not absolute`);
 737 |  54 |     }
 738 |  55 |     return true;
 739 |  56 |   }
 740 |  57 | 
 741 |  58 |   // abstract methods
 742 |  59 |   public abstract bundle(deep: number): Promise<void>;
 743 |  60 |   public abstract render(strategy: IRenderStrategy): INodeContent;
 744 |  61 |   public abstract get secondaryProps(): Record<string, unknown> | undefined;
 745 |  62 | 
 746 |  63 |   // getters and setters
 747 |  64 |   // deep
 748 |  65 |   get deep(): number {
 749 |  66 |     return this._props.deep;
 750 |  67 |   }
 751 |  68 |   set deep(deep: number) {
 752 |  69 |     this._props.deep = deep;
 753 |  70 |   }
 754 |  71 | 
 755 |  72 |   // size
 756 |  73 |   get size(): number {
 757 |  74 |     return this._props.size;
 758 |  75 |   }
 759 |  76 |   set size(size: number) {
 760 |  77 |     this._props.size = size;
 761 |  78 |   }
 762 |  79 | 
 763 |  80 |   // name
 764 |  81 |   get name(): string {
 765 |  82 |     return this._props.name;
 766 |  83 |   }
 767 |  84 |   set name(name: string) {
 768 |  85 |     this._props.name = name;
 769 |  86 |   }
 770 |  87 | 
 771 |  88 |   // path
 772 |  89 |   get path(): string {
 773 |  90 |     return this._props.path;
 774 |  91 |   }
 775 |  92 |   set path(path: string) {
 776 |  93 |     this._props.path = path;
 777 |  94 |   }
 778 |  95 | 
 779 |  96 |   // stats
 780 |  97 |   get stats(): IFileStats | undefined {
 781 |  98 |     return this._props.stats;
 782 |  99 |   }
 783 | 100 |   set stats(stats: IFileStats | undefined) {
 784 | 101 |     this._props.stats = stats;
 785 | 102 |   }
 786 | 103 | 
 787 | 104 |   // props
 788 | 105 |   get props(): IPropsNode {
 789 | 106 |     return {
 790 | 107 |       ...this._props,
 791 | 108 |       ...this.secondaryProps
 792 | 109 |     };
 793 | 110 |   }
 794 | 111 | 
 795 | 112 |   public dispose(): void {
 796 | 113 |     this._props = { ...defaultProps };
 797 | 114 |   }
 798 | 115 | 
 799 | 116 |   public clone(): NodeBase {
 800 | 117 |     return Object.assign(Object.create(this), this);
 801 | 118 |   }
 802 | 119 | 
 803 | 120 |   private initNode(name: string, path: string): void {
 804 | 121 |     this.deep = 0;
 805 | 122 |     this.size = 0;
 806 | 123 |     this.name = name;
 807 | 124 |     this.path = documentFactory.resolve(path);
 808 | 125 |   }
 809 | 126 | }
 810 | 127 | 
 811 | ```
 812 | 
 813 | ---------------------------------------------------------------------------
 814 | 
 815 | 
 816 | ## File: NodeDirectory.ts
 817 | - Path: `/root/git/codewrangler/src/core/entities/NodeDirectory.ts`
 818 | - Size: 2.50 KB
 819 | - Extension: .ts
 820 | - Lines of code: 77
 821 | - Content:
 822 | 
 823 | ```ts
 824 |  1 | import { INodeContent, NodeBase } from "./NodeBase";
 825 |  2 | import { NodeFile } from "./NodeFile";
 826 |  3 | import { fileStatsService } from "../../infrastructure/filesystem/FileStats";
 827 |  4 | import { IRenderStrategy } from "../../services/renderer/RenderStrategy";
 828 |  5 | 
 829 |  6 | interface IPropsDirectory {
 830 |  7 |   length: number;
 831 |  8 |   deepLength: number;
 832 |  9 | }
 833 | 10 | 
 834 | 11 | const defaultPropsDirectory: IPropsDirectory = {
 835 | 12 |   length: 0,
 836 | 13 |   deepLength: 0
 837 | 14 | };
 838 | 15 | 
 839 | 16 | export abstract class NodeDirectory extends NodeBase {
 840 | 17 |   public children: (NodeFile | NodeDirectory)[] = [];
 841 | 18 |   private _propsDirectory: IPropsDirectory = { ...defaultPropsDirectory };
 842 | 19 | 
 843 | 20 |   public constructor(name: string, pathName: string) {
 844 | 21 |     super(name, pathName);
 845 | 22 |     this.initDirectory();
 846 | 23 |   }
 847 | 24 |   // getters and setters
 848 | 25 |   public get length(): number {
 849 | 26 |     return this._propsDirectory.length;
 850 | 27 |   }
 851 | 28 |   public set length(length: number) {
 852 | 29 |     this._propsDirectory.length = length;
 853 | 30 |   }
 854 | 31 |   public get deepLength(): number {
 855 | 32 |     return this._propsDirectory.deepLength;
 856 | 33 |   }
 857 | 34 |   public set deepLength(deepLength: number) {
 858 | 35 |     this._propsDirectory.deepLength = deepLength;
 859 | 36 |   }
 860 | 37 |   public get secondaryProps(): Record<string, unknown> {
 861 | 38 |     return {
 862 | 39 |       ...this._propsDirectory
 863 | 40 |     };
 864 | 41 |   }
 865 | 42 | 
 866 | 43 |   public addChild(child: NodeFile | NodeDirectory): NodeDirectory {
 867 | 44 |     if (!(child instanceof NodeFile || child instanceof NodeDirectory)) {
 868 | 45 |       throw new Error("Invalid child type");
 869 | 46 |     }
 870 | 47 |     this.children.push(child);
 871 | 48 |     return this;
 872 | 49 |   }
 873 | 50 | 
 874 | 51 |   public async bundle(deep: number = 0): Promise<void> {
 875 | 52 |     // set the deep of the directory
 876 | 53 |     this.deep = deep;
 877 | 54 | 
 878 | 55 |     // bundle all children
 879 | 56 |     await Promise.all(this.children.map(child => child.bundle(deep + 1)));
 880 | 57 | 
 881 | 58 |     // set the length of the directory
 882 | 59 |     this.length = this.children.filter(
 883 | 60 |       child => child instanceof NodeFile
 884 | 61 |     ).length;
 885 | 62 | 
 886 | 63 |     // set the deep length of the directory
 887 | 64 |     this.deepLength = this.children.reduce(
 888 | 65 |       (acc, child) =>
 889 | 66 |         acc + (child instanceof NodeDirectory ? child.deepLength + 1 : 1),
 890 | 67 |       0
 891 | 68 |     );
 892 | 69 | 
 893 | 70 |     // set the size of the directory
 894 | 71 |     this.size = this.children.reduce((acc, child) => acc + child.size, 0);
 895 | 72 | 
 896 | 73 |     // set stats
 897 | 74 |     this.stats = await fileStatsService(this.path);
 898 | 75 |   }
 899 | 76 | 
 900 | 77 |   public abstract override render(strategy: IRenderStrategy): INodeContent;
 901 | 78 | 
 902 | 79 |   private initDirectory(): void {
 903 | 80 |     this.children = [];
 904 | 81 |     this._propsDirectory = { ...defaultPropsDirectory };
 905 | 82 |   }
 906 | 83 | }
 907 | 84 | 
 908 | 85 | export class RenderableDirectory extends NodeDirectory {
 909 | 86 |   public override render(strategy: IRenderStrategy): INodeContent {
 910 | 87 |     return {
 911 | 88 |       content: strategy.renderDirectory(this)
 912 | 89 |     };
 913 | 90 |   }
 914 | 91 | }
 915 | 92 | 
 916 | ```
 917 | 
 918 | ---------------------------------------------------------------------------
 919 | 
 920 | 
 921 | ## File: NodeFile.ts
 922 | - Path: `/root/git/codewrangler/src/core/entities/NodeFile.ts`
 923 | - Size: 2.08 KB
 924 | - Extension: .ts
 925 | - Lines of code: 69
 926 | - Content:
 927 | 
 928 | ```ts
 929 |  1 | import { INodeContent, NodeBase } from "./NodeBase";
 930 |  2 | import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
 931 |  3 | import { fileStatsService } from "../../infrastructure/filesystem/FileStats";
 932 |  4 | import { IRenderStrategy } from "../../services/renderer/RenderStrategy";
 933 |  5 | 
 934 |  6 | interface IPropsFile {
 935 |  7 |   extension: string;
 936 |  8 | }
 937 |  9 | 
 938 | 10 | const defaultPropsFile: IPropsFile = {
 939 | 11 |   extension: ""
 940 | 12 | };
 941 | 13 | 
 942 | 14 | export abstract class NodeFile extends NodeBase {
 943 | 15 |   private _propsFile: IPropsFile = { ...defaultPropsFile };
 944 | 16 |   private _content: string | null = null;
 945 | 17 | 
 946 | 18 |   public constructor(name: string, pathName: string) {
 947 | 19 |     super(name, pathName);
 948 | 20 |     this.initFile(name);
 949 | 21 |   }
 950 | 22 | 
 951 | 23 |   // getters and setters
 952 | 24 |   // extension
 953 | 25 |   public get extension(): string {
 954 | 26 |     return this._propsFile.extension;
 955 | 27 |   }
 956 | 28 |   protected set extension(extension: string) {
 957 | 29 |     this._propsFile.extension = extension;
 958 | 30 |   }
 959 | 31 |   // content
 960 | 32 |   public get content(): string | null {
 961 | 33 |     return this._content;
 962 | 34 |   }
 963 | 35 |   protected set content(content: string | null) {
 964 | 36 |     this._content = content;
 965 | 37 |   }
 966 | 38 |   // secondary props
 967 | 39 |   public get secondaryProps(): Record<string, unknown> | undefined {
 968 | 40 |     return {
 969 | 41 |       extension: this.extension
 970 | 42 |     };
 971 | 43 |   }
 972 | 44 | 
 973 | 45 |   // bundle
 974 | 46 |   public async bundle(deep: number = 0): Promise<void> {
 975 | 47 |     // set the deep of the file
 976 | 48 |     this.deep = deep;
 977 | 49 |     // set the size of the file
 978 | 50 |     this.size = await documentFactory.size(this.path);
 979 | 51 |     // set the content of the file
 980 | 52 |     this.content = await documentFactory.readFile(this.path);
 981 | 53 |     // set the stats of the file
 982 | 54 |     this.stats = await fileStatsService(this.path);
 983 | 55 |   }
 984 | 56 | 
 985 | 57 |   // render
 986 | 58 |   public abstract override render(strategy: IRenderStrategy): INodeContent;
 987 | 59 | 
 988 | 60 |   private initFile(name: string): void {
 989 | 61 |     this._propsFile = { ...defaultPropsFile };
 990 | 62 |     this.extension = documentFactory.extension(name);
 991 | 63 |     this._content = null;
 992 | 64 |   }
 993 | 65 | }
 994 | 66 | 
 995 | 67 | export class RenderableFile extends NodeFile {
 996 | 68 |   // render
 997 | 69 |   public override render(strategy: IRenderStrategy): INodeContent {
 998 | 70 |     return {
 999 | 71 |       content: strategy.renderFile(this)
1000 | 72 |     };
1001 | 73 |   }
1002 | 74 | 
1003 | 75 |   // dispose
1004 | 76 |   public override async dispose(): Promise<void> {
1005 | 77 |     await super.dispose();
1006 | 78 |   }
1007 | 79 | }
1008 | 80 | 
1009 | ```
1010 | 
1011 | ---------------------------------------------------------------------------
1012 | 
1013 | 
1014 | ## File: DirectoryNotFoundError.ts
1015 | - Path: `/root/git/codewrangler/src/core/errors/DirectoryNotFoundError.ts`
1016 | - Size: 235.00 B
1017 | - Extension: .ts
1018 | - Lines of code: 7
1019 | - Content:
1020 | 
1021 | ```ts
1022 | 1 | import { DocumentError } from "./DocumentError";
1023 | 2 | 
1024 | 3 | export class DirectoryNotFoundError extends DocumentError {
1025 | 4 |   public constructor(path: string) {
1026 | 5 |     super("Directory not found", path);
1027 | 6 |     this.name = "DirectoryNotFoundError";
1028 | 7 |   }
1029 | 8 | }
1030 | 9 | 
1031 | ```
1032 | 
1033 | ---------------------------------------------------------------------------
1034 | 
1035 | 
1036 | ## File: DocumentError.ts
1037 | - Path: `/root/git/codewrangler/src/core/errors/DocumentError.ts`
1038 | - Size: 216.00 B
1039 | - Extension: .ts
1040 | - Lines of code: 9
1041 | - Content:
1042 | 
1043 | ```ts
1044 |  1 | export class DocumentError extends Error {
1045 |  2 |   public constructor(
1046 |  3 |     message: string,
1047 |  4 |     public readonly path: string
1048 |  5 |   ) {
1049 |  6 |     super(`Document error at ${path}: ${message}`);
1050 |  7 |     this.name = "DocumentError";
1051 |  8 |   }
1052 |  9 | }
1053 | 10 | 
1054 | ```
1055 | 
1056 | ---------------------------------------------------------------------------
1057 | 
1058 | 
1059 | ## File: FileNotFoundError.ts
1060 | - Path: `/root/git/codewrangler/src/core/errors/FileNotFoundError.ts`
1061 | - Size: 220.00 B
1062 | - Extension: .ts
1063 | - Lines of code: 7
1064 | - Content:
1065 | 
1066 | ```ts
1067 | 1 | import { DocumentError } from "./DocumentError";
1068 | 2 | 
1069 | 3 | export class FileNotFoundError extends DocumentError {
1070 | 4 |   public constructor(path: string) {
1071 | 5 |     super("File not found", path);
1072 | 6 |     this.name = "FileNotFoundError";
1073 | 7 |   }
1074 | 8 | }
1075 | 9 | 
1076 | ```
1077 | 
1078 | ---------------------------------------------------------------------------
1079 | 
1080 | 
1081 | ## File: index.ts
1082 | - Path: `/root/git/codewrangler/src/core/errors/index.ts`
1083 | - Size: 173.00 B
1084 | - Extension: .ts
1085 | - Lines of code: 3
1086 | - Content:
1087 | 
1088 | ```ts
1089 | 1 | export { DocumentError } from "./DocumentError";
1090 | 2 | export { DirectoryNotFoundError } from "./DirectoryNotFoundError";
1091 | 3 | export { FileNotFoundError } from "./FileNotFoundError";
1092 | 4 | 
1093 | ```
1094 | 
1095 | ---------------------------------------------------------------------------
1096 | 
1097 | 
1098 | ## File: DocumentFactory.ts
1099 | - Path: `/root/git/codewrangler/src/infrastructure/filesystem/DocumentFactory.ts`
1100 | - Size: 9.64 KB
1101 | - Extension: .ts
1102 | - Lines of code: 316
1103 | - Content:
1104 | 
1105 | ```ts
1106 |   1 | import { ObjectEncodingOptions } from "fs";
1107 |   2 | import * as fsSync from "fs";
1108 |   3 | import * as fs from "fs/promises";
1109 |   4 | import * as path from "path";
1110 |   5 | 
1111 |   6 | import { fileStatsService } from "./FileStats";
1112 |   7 | import { DocumentError, FileNotFoundError } from "../../core/errors";
1113 |   8 | import {
1114 |   9 |   FILE_TYPE,
1115 |  10 |   FileType,
1116 |  11 |   IDirectoryOptions,
1117 |  12 |   IReadOptions,
1118 |  13 |   IWriteOptions
1119 |  14 | } from "../../types/type";
1120 |  15 | 
1121 |  16 | export const documentFactory = {
1122 |  17 |   /**
1123 |  18 |    * Gets the type of a file system entry
1124 |  19 |    * @param filePath - The path to check
1125 |  20 |    * @returns The type of the file system entry (File or Directory)
1126 |  21 |    * @throws {FileNotFoundError} If the path doesn't exist
1127 |  22 |    * @throws {DocumentError} For other file system errors
1128 |  23 |    */
1129 |  24 |   async type(filePath: string): Promise<FileType> {
1130 |  25 |     try {
1131 |  26 |       const stats = await fs.stat(filePath);
1132 |  27 |       return stats.isDirectory() ? FILE_TYPE.Directory : FILE_TYPE.File;
1133 |  28 |     } catch (error) {
1134 |  29 |       if ((error as NodeJS.ErrnoException).code === "ENOENT") {
1135 |  30 |         throw new FileNotFoundError(filePath);
1136 |  31 |       }
1137 |  32 |       throw new DocumentError(String(error), filePath);
1138 |  33 |     }
1139 |  34 |   },
1140 |  35 | 
1141 |  36 |   /**
1142 |  37 |    * Gets file size in bytes
1143 |  38 |    * @param filePath - The path to the file
1144 |  39 |    * @returns The size of the file in bytes
1145 |  40 |    * @throws {FileNotFoundError} If the file doesn't exist
1146 |  41 |    * @throws {DocumentError} For other file system errors or if path is a directory
1147 |  42 |    */
1148 |  43 |   async size(filePath: string): Promise<number> {
1149 |  44 |     const isDirectory = (await this.type(filePath)) === FILE_TYPE.Directory;
1150 |  45 |     if (isDirectory) {
1151 |  46 |       throw new DocumentError("Path is a directory", filePath);
1152 |  47 |     }
1153 |  48 |     const stats = await fileStatsService(filePath);
1154 |  49 |     return stats.size;
1155 |  50 |   },
1156 |  51 | 
1157 |  52 |   /**
1158 |  53 |    * Resolves a path to an absolute path
1159 |  54 |    * @param filePath - The path to resolve
1160 |  55 |    * @returns The absolute path
1161 |  56 |    */
1162 |  57 |   resolve(filePath: string): string {
1163 |  58 |     return path.resolve(filePath);
1164 |  59 |   },
1165 |  60 | 
1166 |  61 |   /**
1167 |  62 |    * Checks various access flags for a path
1168 |  63 |    * @private
1169 |  64 |    * @param filePath - The path to check access for
1170 |  65 |    * @returns An object containing readable, writable, and executable permission flags
1171 |  66 |    */
1172 |  67 |   async checkAccess(filePath: string): Promise<{
1173 |  68 |     readable: boolean;
1174 |  69 |     writable: boolean;
1175 |  70 |     executable: boolean;
1176 |  71 |   }> {
1177 |  72 |     const check = async (mode: number): Promise<boolean> => {
1178 |  73 |       try {
1179 |  74 |         await fs.access(filePath, mode);
1180 |  75 |         return true;
1181 |  76 |       } catch {
1182 |  77 |         return false;
1183 |  78 |       }
1184 |  79 |     };
1185 |  80 | 
1186 |  81 |     return {
1187 |  82 |       readable: await check(fs.constants.R_OK),
1188 |  83 |       writable: await check(fs.constants.W_OK),
1189 |  84 |       executable: await check(fs.constants.X_OK)
1190 |  85 |     };
1191 |  86 |   },
1192 |  87 | 
1193 |  88 |   /**
1194 |  89 |    * Reads the entire contents of a file synchronously
1195 |  90 |    * @param filePath - The path to the file
1196 |  91 |    * @param options - The options for the read operation
1197 |  92 |    * @returns The contents of the file as a string
1198 |  93 |    * @throws {Error} If the file cannot be read
1199 |  94 |    */
1200 |  95 |   readFileSync(filePath: string, options: IReadOptions = {}): string {
1201 |  96 |     return fsSync.readFileSync(filePath, {
1202 |  97 |       encoding: options.encoding ?? "utf-8",
1203 |  98 |       flag: options.flag
1204 |  99 |     });
1205 | 100 |   },
1206 | 101 | 
1207 | 102 |   /**
1208 | 103 |    * Reads the entire contents of a file
1209 | 104 |    * @param filePath - The path to the file
1210 | 105 |    * @param options - The options for the read operation
1211 | 106 |    * @returns The contents of the file as a string
1212 | 107 |    * @throws {FileNotFoundError} If the file doesn't exist
1213 | 108 |    * @throws {DocumentError} For other file system errors
1214 | 109 |    */
1215 | 110 |   async readFile(
1216 | 111 |     filePath: string,
1217 | 112 |     options: IReadOptions = {}
1218 | 113 |   ): Promise<string> {
1219 | 114 |     try {
1220 | 115 |       return await fs.readFile(filePath, {
1221 | 116 |         encoding: options.encoding ?? "utf-8",
1222 | 117 |         flag: options.flag
1223 | 118 |       });
1224 | 119 |     } catch (error) {
1225 | 120 |       if ((error as NodeJS.ErrnoException).code === "ENOENT") {
1226 | 121 |         throw new FileNotFoundError(filePath);
1227 | 122 |       }
1228 | 123 |       throw new DocumentError(String(error), filePath);
1229 | 124 |     }
1230 | 125 |   },
1231 | 126 | 
1232 | 127 |   /**
1233 | 128 |    * Writes data to a file, replacing the file if it already exists
1234 | 129 |    * @param filePath - The path to the file
1235 | 130 |    * @param data - The data to write
1236 | 131 |    * @param options - The options for the write operation
1237 | 132 |    * @throws {DocumentError} For file system errors
1238 | 133 |    */
1239 | 134 |   async writeFile(
1240 | 135 |     filePath: string,
1241 | 136 |     data: string | Buffer,
1242 | 137 |     options: IWriteOptions = {}
1243 | 138 |   ): Promise<void> {
1244 | 139 |     try {
1245 | 140 |       await fs.writeFile(filePath, data, {
1246 | 141 |         encoding: options.encoding ?? "utf-8",
1247 | 142 |         mode: options.mode,
1248 | 143 |         flag: options.flag
1249 | 144 |       });
1250 | 145 |     } catch (error) {
1251 | 146 |       throw new DocumentError(String(error), filePath);
1252 | 147 |     }
1253 | 148 |   },
1254 | 149 | 
1255 | 150 |   /**
1256 | 151 |    * Appends data to a file
1257 | 152 |    * @param filePath - The path to the file
1258 | 153 |    * @param content - The content to append
1259 | 154 |    * @param options - The options for the write operation
1260 | 155 |    * @throws {DocumentError} For file system errors
1261 | 156 |    */
1262 | 157 |   async appendFile(
1263 | 158 |     filePath: string,
1264 | 159 |     content: string,
1265 | 160 |     options: IWriteOptions = {}
1266 | 161 |   ): Promise<void> {
1267 | 162 |     try {
1268 | 163 |       await fs.appendFile(filePath, content, {
1269 | 164 |         encoding: options.encoding ?? "utf-8",
1270 | 165 |         mode: options.mode,
1271 | 166 |         flag: options.flag
1272 | 167 |       });
1273 | 168 |     } catch (error) {
1274 | 169 |       throw new DocumentError(String(error), filePath);
1275 | 170 |     }
1276 | 171 |   },
1277 | 172 | 
1278 | 173 |   /**
1279 | 174 |    * Reads the contents of a directory
1280 | 175 |    * @param dirPath - The path to the directory
1281 | 176 |    * @param options - The options for the read operation
1282 | 177 |    * @returns An array of file and directory names in the directory
1283 | 178 |    * @throws {Error} If the directory cannot be read
1284 | 179 |    */
1285 | 180 |   async readDir(
1286 | 181 |     dirPath: string,
1287 | 182 |     options?: { withFileTypes?: boolean }
1288 | 183 |   ): Promise<string[]> {
1289 | 184 |     return await fs.readdir(dirPath, options as ObjectEncodingOptions);
1290 | 185 |   },
1291 | 186 | 
1292 | 187 |   /**
1293 | 188 |    * Creates a directory if it doesn't exist
1294 | 189 |    * @param dirPath - The path where to create the directory
1295 | 190 |    * @param recursive - Whether to create parent directories if they don't exist
1296 | 191 |    * @throws {DocumentError} For file system errors
1297 | 192 |    */
1298 | 193 |   async createDir(dirPath: string, recursive = true): Promise<void> {
1299 | 194 |     await fs.mkdir(dirPath, { recursive });
1300 | 195 |   },
1301 | 196 | 
1302 | 197 |   /**
1303 | 198 |    * Gets the base name of a file
1304 | 199 |    * @param filePath - The path to the file
1305 | 200 |    * @returns The base name of the file (last portion of the path)
1306 | 201 |    */
1307 | 202 |   baseName(filePath: string): string {
1308 | 203 |     return path.basename(filePath);
1309 | 204 |   },
1310 | 205 | 
1311 | 206 |   /**
1312 | 207 |    * Gets the extension of a file
1313 | 208 |    * @param filePath - The path to the file
1314 | 209 |    * @returns The extension of the file including the dot (e.g., '.txt')
1315 | 210 |    */
1316 | 211 |   extension(filePath: string): string {
1317 | 212 |     return path.extname(filePath);
1318 | 213 |   },
1319 | 214 | 
1320 | 215 |   /**
1321 | 216 |    * Checks if a file or directory exists
1322 | 217 |    * @param filePath - The path to check
1323 | 218 |    * @returns True if the file or directory exists, false otherwise
1324 | 219 |    */
1325 | 220 |   exists(filePath: string): boolean {
1326 | 221 |     try {
1327 | 222 |       fsSync.accessSync(filePath);
1328 | 223 |       return true;
1329 | 224 |     } catch {
1330 | 225 |       return false;
1331 | 226 |     }
1332 | 227 |   },
1333 | 228 | 
1334 | 229 |   /**
1335 | 230 |    * Checks if a path is absolute
1336 | 231 |    * @param filePath - The path to check
1337 | 232 |    * @returns True if the path is absolute, false otherwise
1338 | 233 |    */
1339 | 234 |   isAbsolute(filePath: string): boolean {
1340 | 235 |     return path.isAbsolute(filePath);
1341 | 236 |   },
1342 | 237 | 
1343 | 238 |   /**
1344 | 239 |    * Gets directory contents with type information
1345 | 240 |    * @param dirPath - The path to the directory
1346 | 241 |    * @returns An array of objects containing name and type information for each entry
1347 | 242 |    * @throws {DocumentError} If path is not a directory or other errors occur
1348 | 243 |    */
1349 | 244 |   async readDirectory(
1350 | 245 |     dirPath: string
1351 | 246 |   ): Promise<Array<{ name: string; type: FileType }>> {
1352 | 247 |     try {
1353 | 248 |       const entries = await fs.readdir(dirPath, { withFileTypes: true });
1354 | 249 |       return entries.map(entry => ({
1355 | 250 |         name: entry.name,
1356 | 251 |         type: entry.isDirectory() ? FILE_TYPE.Directory : FILE_TYPE.File
1357 | 252 |       }));
1358 | 253 |     } catch (error) {
1359 | 254 |       throw new DocumentError(String(error), dirPath);
1360 | 255 |     }
1361 | 256 |   },
1362 | 257 | 
1363 | 258 |   /**
1364 | 259 |    * Creates a directory if it doesn't exist
1365 | 260 |    * @param dirPath - The path where to create the directory
1366 | 261 |    * @param options - Options for directory creation including recursive and mode
1367 | 262 |    * @throws {DocumentError} For file system errors
1368 | 263 |    */
1369 | 264 |   async ensureDirectory(
1370 | 265 |     dirPath: string,
1371 | 266 |     options: IDirectoryOptions = {}
1372 | 267 |   ): Promise<void> {
1373 | 268 |     try {
1374 | 269 |       if (!this.exists(dirPath)) {
1375 | 270 |         await fs.mkdir(dirPath, {
1376 | 271 |           recursive: options.recursive ?? true,
1377 | 272 |           mode: options.mode
1378 | 273 |         });
1379 | 274 |       }
1380 | 275 |     } catch (error) {
1381 | 276 |       throw new DocumentError(String(error), dirPath);
1382 | 277 |     }
1383 | 278 |   },
1384 | 279 | 
1385 | 280 |   /**
1386 | 281 |    * Removes a file or directory
1387 | 282 |    * @param filePath - The path to remove
1388 | 283 |    * @throws {DocumentError} For file system errors
1389 | 284 |    */
1390 | 285 |   async remove(filePath: string): Promise<void> {
1391 | 286 |     const stats = await fs.stat(filePath);
1392 | 287 |     if (stats.isDirectory()) {
1393 | 288 |       await fs.rm(filePath, { recursive: true, force: true });
1394 | 289 |     } else {
1395 | 290 |       await fs.unlink(filePath);
1396 | 291 |     }
1397 | 292 |   },
1398 | 293 | 
1399 | 294 |   /**
1400 | 295 |    * Copies a file or directory
1401 | 296 |    * @param src - The source path
1402 | 297 |    * @param dest - The destination path
1403 | 298 |    * @throws {DocumentError} For file system errors
1404 | 299 |    */
1405 | 300 |   async copy(src: string, dest: string): Promise<void> {
1406 | 301 |     const stats = await fs.stat(src);
1407 | 302 | 
1408 | 303 |     if (stats.isDirectory()) {
1409 | 304 |       await this.copyDir(src, dest);
1410 | 305 |     } else {
1411 | 306 |       await fs.copyFile(src, dest);
1412 | 307 |     }
1413 | 308 |   },
1414 | 309 | 
1415 | 310 |   /**
1416 | 311 |    * Copies a directory recursively
1417 | 312 |    * @private
1418 | 313 |    * @param src - The source directory path
1419 | 314 |    * @param dest - The destination directory path
1420 | 315 |    * @throws {DocumentError} For file system errors
1421 | 316 |    */
1422 | 317 |   async copyDir(src: string, dest: string): Promise<void> {
1423 | 318 |     await this.ensureDirectory(dest);
1424 | 319 |     const entries = await fs.readdir(src, { withFileTypes: true });
1425 | 320 | 
1426 | 321 |     for (const entry of entries) {
1427 | 322 |       const srcPath = path.join(src, entry.name);
1428 | 323 |       const destPath = path.join(dest, entry.name);
1429 | 324 | 
1430 | 325 |       if (entry.isDirectory()) {
1431 | 326 |         await this.copyDir(srcPath, destPath);
1432 | 327 |       } else {
1433 | 328 |         await fs.copyFile(srcPath, destPath);
1434 | 329 |       }
1435 | 330 |     }
1436 | 331 |   },
1437 | 332 | 
1438 | 333 |   /**
1439 | 334 |    * Joins an array of paths into a single path
1440 | 335 |    * @param paths - The paths to join
1441 | 336 |    * @returns The joined path
1442 | 337 |    */
1443 | 338 |   join(...paths: string[]): string {
1444 | 339 |     return path.join(...paths);
1445 | 340 |   }
1446 | 341 | };
1447 | 342 | 
1448 | ```
1449 | 
1450 | ---------------------------------------------------------------------------
1451 | 
1452 | 
1453 | ## File: FileStats.ts
1454 | - Path: `/root/git/codewrangler/src/infrastructure/filesystem/FileStats.ts`
1455 | - Size: 1.94 KB
1456 | - Extension: .ts
1457 | - Lines of code: 64
1458 | - Content:
1459 | 
1460 | ```ts
1461 |  1 | import { Stats } from "fs";
1462 |  2 | import fs from "fs/promises";
1463 |  3 | 
1464 |  4 | import { DocumentError } from "../../core/errors/DocumentError";
1465 |  5 | import { FileNotFoundError } from "../../core/errors/FileNotFoundError";
1466 |  6 | import { IAccessFlags, IFileStats } from "../../types/type";
1467 |  7 | 
1468 |  8 | class FileStatsService {
1469 |  9 |   public async getStats(filePath: string): Promise<IFileStats> {
1470 | 10 |     const stats = await this.getBasicStats(filePath);
1471 | 11 |     const accessFlags = await this.checkAccess(filePath);
1472 | 12 |     return this.mapStatsToFileInfo(stats, accessFlags);
1473 | 13 |   }
1474 | 14 |   private async getBasicStats(filePath: string): Promise<Stats> {
1475 | 15 |     try {
1476 | 16 |       return await fs.stat(filePath);
1477 | 17 |     } catch (error) {
1478 | 18 |       this.handleStatError(error as NodeJS.ErrnoException, filePath);
1479 | 19 |       throw error; // TypeScript requires this
1480 | 20 |     }
1481 | 21 |   }
1482 | 22 | 
1483 | 23 |   private handleStatError(
1484 | 24 |     error: NodeJS.ErrnoException,
1485 | 25 |     filePath: string
1486 | 26 |   ): never {
1487 | 27 |     if (error.code === "ENOENT") {
1488 | 28 |       throw new FileNotFoundError(filePath);
1489 | 29 |     }
1490 | 30 |     throw new DocumentError(String(error), filePath);
1491 | 31 |   }
1492 | 32 | 
1493 | 33 |   private async checkAccess(filePath: string): Promise<IAccessFlags> {
1494 | 34 |     const check = async (mode: number): Promise<boolean> => {
1495 | 35 |       try {
1496 | 36 |         await fs.access(filePath, mode);
1497 | 37 |         return true;
1498 | 38 |       } catch {
1499 | 39 |         return false;
1500 | 40 |       }
1501 | 41 |     };
1502 | 42 | 
1503 | 43 |     return {
1504 | 44 |       readable: await check(fs.constants.R_OK),
1505 | 45 |       writable: await check(fs.constants.W_OK),
1506 | 46 |       executable: await check(fs.constants.X_OK)
1507 | 47 |     };
1508 | 48 |   }
1509 | 49 | 
1510 | 50 |   private mapStatsToFileInfo(
1511 | 51 |     stats: Stats,
1512 | 52 |     accessFlags: IAccessFlags
1513 | 53 |   ): IFileStats {
1514 | 54 |     return {
1515 | 55 |       size: stats.size,
1516 | 56 |       created: stats.birthtime,
1517 | 57 |       modified: stats.mtime,
1518 | 58 |       accessed: stats.atime,
1519 | 59 |       isDirectory: stats.isDirectory(),
1520 | 60 |       isFile: stats.isFile(),
1521 | 61 |       permissions: accessFlags
1522 | 62 |     };
1523 | 63 |   }
1524 | 64 | }
1525 | 65 | 
1526 | 66 | export const fileStatsService = async (
1527 | 67 |   filePath: string
1528 | 68 | ): Promise<IFileStats> => {
1529 | 69 |   const fileStatsService = new FileStatsService();
1530 | 70 |   return await fileStatsService.getStats(filePath);
1531 | 71 | };
1532 | 72 | 
1533 | ```
1534 | 
1535 | ---------------------------------------------------------------------------
1536 | 
1537 | 
1538 | ## File: JsonReader.ts
1539 | - Path: `/root/git/codewrangler/src/infrastructure/filesystem/JsonReader.ts`
1540 | - Size: 1.53 KB
1541 | - Extension: .ts
1542 | - Lines of code: 46
1543 | - Content:
1544 | 
1545 | ```ts
1546 |  1 | import fs from "fs/promises";
1547 |  2 | 
1548 |  3 | import { documentFactory } from "./DocumentFactory";
1549 |  4 | import { DocumentError } from "../../core/errors/DocumentError";
1550 |  5 | import { FileNotFoundError } from "../../core/errors/FileNotFoundError";
1551 |  6 | 
1552 |  7 | export class JsonReader {
1553 |  8 |   public async readJsonSync(filePath: string): Promise<object> {
1554 |  9 |     try {
1555 | 10 |       const absolutePath = this.validatePath(filePath);
1556 | 11 |       const content = await this.readFileContent(absolutePath, filePath);
1557 | 12 |       return this.parseJsonContent(content, filePath);
1558 | 13 |     } catch (error) {
1559 | 14 |       if (error instanceof DocumentError) {
1560 | 15 |         throw error;
1561 | 16 |       }
1562 | 17 |       throw new DocumentError(String(error), filePath);
1563 | 18 |     }
1564 | 19 |   }
1565 | 20 |   private validatePath(filePath: string): string {
1566 | 21 |     const absolutePath = documentFactory.resolve(filePath);
1567 | 22 |     if (!documentFactory.exists(absolutePath)) {
1568 | 23 |       throw new FileNotFoundError(filePath);
1569 | 24 |     }
1570 | 25 |     return absolutePath;
1571 | 26 |   }
1572 | 27 | 
1573 | 28 |   private async readFileContent(
1574 | 29 |     absolutePath: string,
1575 | 30 |     filePath: string
1576 | 31 |   ): Promise<string> {
1577 | 32 |     const content = await fs.readFile(absolutePath, "utf-8");
1578 | 33 |     if (!content) {
1579 | 34 |       throw new DocumentError(`File is empty`, filePath);
1580 | 35 |     }
1581 | 36 |     return content;
1582 | 37 |   }
1583 | 38 | 
1584 | 39 |   private parseJsonContent(content: string, filePath: string): object {
1585 | 40 |     try {
1586 | 41 |       return JSON.parse(content);
1587 | 42 |     } catch (error) {
1588 | 43 |       throw new DocumentError(`Invalid JSON: ${String(error)}`, filePath);
1589 | 44 |     }
1590 | 45 |   }
1591 | 46 | }
1592 | 47 | 
1593 | 48 | export const jsonReader = async (path: string): Promise<object> => {
1594 | 49 |   const jsonReader = new JsonReader();
1595 | 50 |   return await jsonReader.readJsonSync(path);
1596 | 51 | };
1597 | 52 | 
1598 | ```
1599 | 
1600 | ---------------------------------------------------------------------------
1601 | 
1602 | 
1603 | ## File: TemplateEngine.ts
1604 | - Path: `/root/git/codewrangler/src/infrastructure/templates/TemplateEngine.ts`
1605 | - Size: 4.14 KB
1606 | - Extension: .ts
1607 | - Lines of code: 129
1608 | - Content:
1609 | 
1610 | ```ts
1611 |   1 | import { ZodObject, z } from "zod";
1612 |   2 | 
1613 |   3 | import { TemplateType } from "../../types/template";
1614 |   4 | import { Config } from "../../utils/config";
1615 |   5 | import { logger } from "../../utils/logger";
1616 |   6 | import { documentFactory } from "../filesystem/DocumentFactory";
1617 |   7 | 
1618 |   8 | type TemplateValue = z.ZodType<string | number | boolean | undefined>;
1619 |   9 | 
1620 |  10 | export class Template<
1621 |  11 |   T extends Record<string, TemplateValue> = Record<string, TemplateValue>
1622 |  12 | > {
1623 |  13 |   private _content: string = "";
1624 |  14 |   private schema: ZodObject<T>;
1625 |  15 | 
1626 |  16 |   public constructor(
1627 |  17 |     private type: TemplateType,
1628 |  18 |     schema: ZodObject<T>
1629 |  19 |   ) {
1630 |  20 |     // convert all fields to optional
1631 |  21 |     const optionalFields = Object.fromEntries(
1632 |  22 |       Object.entries(schema.shape).map(([key, value]) => [
1633 |  23 |         key,
1634 |  24 |         value.optional()
1635 |  25 |       ])
1636 |  26 |     );
1637 |  27 |     this.schema = schema.extend(optionalFields) as unknown as ZodObject<T>;
1638 |  28 |   }
1639 |  29 | 
1640 |  30 |   public async load(
1641 |  31 |     path: string,
1642 |  32 |     additionalFields?: Record<string, z.ZodSchema<string>>
1643 |  33 |   ): Promise<void> {
1644 |  34 |     this._content = await documentFactory.readFile(path);
1645 |  35 |     if (additionalFields) {
1646 |  36 |       this.schema = this.schema.extend(additionalFields) as ZodObject<T>;
1647 |  37 |     }
1648 |  38 |     this.validate();
1649 |  39 |   }
1650 |  40 | 
1651 |  41 |   public static getTemplateDir(config: Config): string {
1652 |  42 |     const dir = documentFactory.join(
1653 |  43 |       config.get("rootDir") as string,
1654 |  44 |       config.get("templatesDir") as string
1655 |  45 |     );
1656 |  46 |     if (!documentFactory.exists(dir)) {
1657 |  47 |       throw new Error(`Templates directory not found: ${dir}`);
1658 |  48 |     }
1659 |  49 |     return dir;
1660 |  50 |   }
1661 |  51 | 
1662 |  52 |   public get content(): string {
1663 |  53 |     if (!this._content) {
1664 |  54 |       throw new Error(`Template content is not loaded for ${this.type}`);
1665 |  55 |     }
1666 |  56 |     return this._content;
1667 |  57 |   }
1668 |  58 | 
1669 |  59 |   public static async create<T extends Record<string, TemplateValue>>(
1670 |  60 |     type: TemplateType,
1671 |  61 |     schema: ZodObject<T>,
1672 |  62 |     path: string,
1673 |  63 |     additionalFields?: Record<string, z.ZodSchema<string>>
1674 |  64 |   ): Promise<Template<T>> {
1675 |  65 |     const template = new Template(type, schema);
1676 |  66 |     await template.load(path, additionalFields);
1677 |  67 |     return template;
1678 |  68 |   }
1679 |  69 | 
1680 |  70 |   public render(data: Record<string, string | number | boolean>): string {
1681 |  71 |     try {
1682 |  72 |       this.validateData(data);
1683 |  73 |       return this.replaceTokens(data);
1684 |  74 |     } catch {
1685 |  75 |       throw new Error(`Template content validation failed for ${this.type}`);
1686 |  76 |     }
1687 |  77 |   }
1688 |  78 | 
1689 |  79 |   private validateData(data: Record<string, string | number | boolean>): void {
1690 |  80 |     this.schema.parse(data);
1691 |  81 |     this.validateRequiredTokens(data);
1692 |  82 |   }
1693 |  83 | 
1694 |  84 |   private validateRequiredTokens(
1695 |  85 |     data: Record<string, string | number | boolean>
1696 |  86 |   ): void {
1697 |  87 |     const contentTokens = this.getTemplateTokens();
1698 |  88 |     const missingTokens = this.findMissingRequiredTokens(contentTokens, data);
1699 |  89 | 
1700 |  90 |     if (missingTokens.length > 0) {
1701 |  91 |       throw new Error(
1702 |  92 |         `Missing required values for tokens: ${missingTokens.join(", ")}`
1703 |  93 |       );
1704 |  94 |     }
1705 |  95 |   }
1706 |  96 | 
1707 |  97 |   private findMissingRequiredTokens(
1708 |  98 |     tokens: string[],
1709 |  99 |     data: Record<string, string | number | boolean>
1710 | 100 |   ): string[] {
1711 | 101 |     return tokens.filter(token => {
1712 | 102 |       const isRequired = this.schema.shape[token]?.isOptional() === false;
1713 | 103 |       return isRequired && !(token in data);
1714 | 104 |     });
1715 | 105 |   }
1716 | 106 | 
1717 | 107 |   private getTemplateTokens(): string[] {
1718 | 108 |     const tokenRegex = /\{\{(\w+)\}\}/g;
1719 | 109 |     const tokens: string[] = [];
1720 | 110 |     let match;
1721 | 111 | 
1722 | 112 |     while ((match = tokenRegex.exec(this.content)) !== null) {
1723 | 113 |       const token = match[1];
1724 | 114 |       if (token === undefined) {
1725 | 115 |         throw new Error(`Invalid template content for ${this.type}`);
1726 | 116 |       }
1727 | 117 |       tokens.push(token);
1728 | 118 |     }
1729 | 119 | 
1730 | 120 |     return tokens;
1731 | 121 |   }
1732 | 122 | 
1733 | 123 |   private replaceTokens(
1734 | 124 |     data: Record<string, string | number | boolean>
1735 | 125 |   ): string {
1736 | 126 |     const contentTokens = this.getTemplateTokens();
1737 | 127 |     const pattern = new RegExp(`\\{\\{(${contentTokens.join("|")})\\}\\}`, "g");
1738 | 128 | 
1739 | 129 |     return this.content.replace(pattern, (_, key) =>
1740 | 130 |       key in data ? String(data[key]) : `{{${key}}}`
1741 | 131 |     );
1742 | 132 |   }
1743 | 133 | 
1744 | 134 |   private validate(): void {
1745 | 135 |     const tokens = this.getTemplateTokens();
1746 | 136 |     const requiredFields = Object.keys(this.schema.shape);
1747 | 137 |     const missingRequired = requiredFields.filter(
1748 | 138 |       field => !tokens.includes(field)
1749 | 139 |     );
1750 | 140 | 
1751 | 141 |     if (missingRequired.length > 0) {
1752 | 142 |       logger.warn(
1753 | 143 |         `Missing required tokens in ${this.type} template: ${missingRequired.join(
1754 | 144 |           ", "
1755 | 145 |         )}`
1756 | 146 |       );
1757 | 147 |     }
1758 | 148 |   }
1759 | 149 | }
1760 | 150 | 
1761 | ```
1762 | 
1763 | ---------------------------------------------------------------------------
1764 | 
1765 | 
1766 | ## File: zod.ts
1767 | - Path: `/root/git/codewrangler/src/infrastructure/templates/zod.ts`
1768 | - Size: 1.23 KB
1769 | - Extension: .ts
1770 | - Lines of code: 38
1771 | - Content:
1772 | 
1773 | ```ts
1774 |  1 | import { z } from "zod";
1775 |  2 | 
1776 |  3 | const OTHER_KEYS = [
1777 |  4 |   "PROJECT_NAME",
1778 |  5 |   "GENERATION_DATE",
1779 |  6 |   "DIRECTORY_STRUCTURE",
1780 |  7 |   "TOTAL_FILES",
1781 |  8 |   "TOTAL_DIRECTORIES",
1782 |  9 |   "TOTAL_SIZE"
1783 | 10 | ] as const;
1784 | 11 | 
1785 | 12 | export type OtherKeys = (typeof OTHER_KEYS)[number];
1786 | 13 | 
1787 | 14 | export const OTHER_KEYS_SCHEMA = z.enum(OTHER_KEYS);
1788 | 15 | 
1789 | 16 | export const baseTemplateSchema = z.object({
1790 | 17 |   PROJECT_NAME: z.string(),
1791 | 18 |   GENERATION_DATE: z.string().datetime(),
1792 | 19 |   DIRECTORY_STRUCTURE: z.string(),
1793 | 20 |   TOTAL_FILES: z.number(),
1794 | 21 |   TOTAL_DIRECTORIES: z.number(),
1795 | 22 |   TOTAL_SIZE: z.number(),
1796 | 23 |   CONTENT: z.string()
1797 | 24 | });
1798 | 25 | 
1799 | 26 | export type BaseTemplate = z.infer<typeof baseTemplateSchema>;
1800 | 27 | export type BaseTemplateString = keyof BaseTemplate;
1801 | 28 | 
1802 | 29 | export const fileTemplateSchema = z.object({
1803 | 30 |   FILE_NAME: z.string(),
1804 | 31 |   FILE_EXTENSION: z.string(),
1805 | 32 |   FILE_SIZE: z.number(),
1806 | 33 |   FILE_CONTENTS: z.string()
1807 | 34 | });
1808 | 35 | 
1809 | 36 | export type FileTemplate = z.infer<typeof fileTemplateSchema>;
1810 | 37 | export type FileTemplateString = keyof FileTemplate;
1811 | 38 | 
1812 | 39 | export const directoryTemplateSchema = z.object({
1813 | 40 |   DIRECTORY_NAME: z.string(),
1814 | 41 |   DIRECTORY_PATH: z.string(),
1815 | 42 |   DIRECTORY_SIZE: z.number(),
1816 | 43 |   DIRECTORY_CONTENT: z.string()
1817 | 44 | });
1818 | 45 | 
1819 | 46 | export type DirectoryTemplate = z.infer<typeof directoryTemplateSchema>;
1820 | 47 | export type DirectoryTemplateString = keyof DirectoryTemplate;
1821 | 48 | 
1822 | ```
1823 | 
1824 | ---------------------------------------------------------------------------
1825 | 
1826 | 
1827 | ## File: DocumentTreeBuilder.ts
1828 | - Path: `/root/git/codewrangler/src/services/builder/DocumentTreeBuilder.ts`
1829 | - Size: 1.56 KB
1830 | - Extension: .ts
1831 | - Lines of code: 43
1832 | - Content:
1833 | 
1834 | ```ts
1835 |  1 | import { INodeTree, NodeTreeBuilder } from "./NodeTreeBuilder";
1836 |  2 | import { RenderableDirectory } from "../../core/entities/NodeDirectory";
1837 |  3 | import { RenderableFile } from "../../core/entities/NodeFile";
1838 |  4 | import { FILE_TYPE } from "../../types/type";
1839 |  5 | import { Config } from "../../utils/config";
1840 |  6 | import { logger } from "../../utils/logger";
1841 |  7 | 
1842 |  8 | export class DocumentTreeBuilder {
1843 |  9 |   private root: RenderableDirectory | RenderableFile | undefined;
1844 | 10 |   private builder: NodeTreeBuilder;
1845 | 11 |   public constructor(config: Config) {
1846 | 12 |     this.builder = new NodeTreeBuilder(config);
1847 | 13 |   }
1848 | 14 | 
1849 | 15 |   public async build(): Promise<void> {
1850 | 16 |     try {
1851 | 17 |       // Build file tree structure
1852 | 18 |       const fileTree = await this.builder.build();
1853 | 19 | 
1854 | 20 |       // Convert file tree to Document tree
1855 | 21 |       this.root = await this.createDocumentStructure(fileTree);
1856 | 22 | 
1857 | 23 |       // Initialize the entire document tree
1858 | 24 |       await this.root.bundle();
1859 | 25 |     } catch (error) {
1860 | 26 |       logger.error("Error building document tree", error as Error);
1861 | 27 |       throw error;
1862 | 28 |     }
1863 | 29 |   }
1864 | 30 | 
1865 | 31 |   private async createDocumentStructure(
1866 | 32 |     node: INodeTree
1867 | 33 |   ): Promise<RenderableDirectory | RenderableFile> {
1868 | 34 |     if (node.type === FILE_TYPE.Directory) {
1869 | 35 |       const directory = new RenderableDirectory(node.name, node.path);
1870 | 36 | 
1871 | 37 |       if (node.children) {
1872 | 38 |         // Recursively create children
1873 | 39 |         for (const child of node.children) {
1874 | 40 |           const childDocument = await this.createDocumentStructure(child);
1875 | 41 |           directory.addChild(childDocument);
1876 | 42 |         }
1877 | 43 |       }
1878 | 44 | 
1879 | 45 |       return directory;
1880 | 46 |     } else {
1881 | 47 |       return new RenderableFile(node.name, node.path);
1882 | 48 |     }
1883 | 49 |   }
1884 | 50 | }
1885 | 51 | 
1886 | ```
1887 | 
1888 | ---------------------------------------------------------------------------
1889 | 
1890 | 
1891 | ## File: FileHidden.ts
1892 | - Path: `/root/git/codewrangler/src/services/builder/FileHidden.ts`
1893 | - Size: 893.00 B
1894 | - Extension: .ts
1895 | - Lines of code: 25
1896 | - Content:
1897 | 
1898 | ```ts
1899 |  1 | import { minimatch } from "minimatch";
1900 |  2 | 
1901 |  3 | import { Config } from "../../utils/config";
1902 |  4 | 
1903 |  5 | export default class FileHidden {
1904 |  6 |   private ignoreHiddenFiles: boolean;
1905 |  7 |   private patterns: string[];
1906 |  8 |   private additionalIgnoreFiles: string[];
1907 |  9 | 
1908 | 10 |   public constructor(config: Config) {
1909 | 11 |     this.ignoreHiddenFiles = config.get("ignoreHiddenFiles") as boolean;
1910 | 12 |     this.patterns = [...config.get("excludePatterns")];
1911 | 13 |     this.additionalIgnoreFiles = config.get("additionalIgnoreFiles");
1912 | 14 |   }
1913 | 15 | 
1914 | 16 |   public shouldExclude(fileName: string): boolean {
1915 | 17 |     if (this.ignoreHiddenFiles && fileName.startsWith(".")) {
1916 | 18 |       return true;
1917 | 19 |     }
1918 | 20 | 
1919 | 21 |     if (this.patterns.some(pattern => minimatch(fileName, pattern))) {
1920 | 22 |       return true;
1921 | 23 |     }
1922 | 24 | 
1923 | 25 |     if (this.additionalIgnoreFiles.some(file => minimatch(fileName, file))) {
1924 | 26 |       // Additional ignore files are always excluded
1925 | 27 |       return true;
1926 | 28 |     }
1927 | 29 | 
1928 | 30 |     return false;
1929 | 31 |   }
1930 | 32 | }
1931 | 33 | 
1932 | ```
1933 | 
1934 | ---------------------------------------------------------------------------
1935 | 
1936 | 
1937 | ## File: NodeTreeBuilder.ts
1938 | - Path: `/root/git/codewrangler/src/services/builder/NodeTreeBuilder.ts`
1939 | - Size: 3.14 KB
1940 | - Extension: .ts
1941 | - Lines of code: 101
1942 | - Content:
1943 | 
1944 | ```ts
1945 |   1 | import FileHidden from "./FileHidden";
1946 |   2 | import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
1947 |   3 | import { fileStatsService } from "../../infrastructure/filesystem/FileStats";
1948 |   4 | import { FILE_TYPE, FileType } from "../../types/type";
1949 |   5 | import { Config, ConfigOptions } from "../../utils/config";
1950 |   6 | 
1951 |   7 | export interface INodeTree {
1952 |   8 |   name: string;
1953 |   9 |   path: string;
1954 |  10 |   type: FileType;
1955 |  11 |   children?: INodeTree[];
1956 |  12 | }
1957 |  13 | 
1958 |  14 | export interface INodeTreeBuilderOptions
1959 |  15 |   extends Pick<
1960 |  16 |     ConfigOptions,
1961 |  17 |     | "additionalIgnoreFiles"
1962 |  18 |     | "maxDepth"
1963 |  19 |     | "excludePatterns"
1964 |  20 |     | "dir"
1965 |  21 |     | "followSymlinks"
1966 |  22 |   > {
1967 |  23 |   pattern: RegExp;
1968 |  24 |   returnType: "paths" | "details";
1969 |  25 | }
1970 |  26 | 
1971 |  27 | export class NodeTreeBuilder {
1972 |  28 |   private config: Config;
1973 |  29 |   private options: INodeTreeBuilderOptions;
1974 |  30 |   private fileHidden: FileHidden;
1975 |  31 | 
1976 |  32 |   public constructor(config: Config) {
1977 |  33 |     this.config = config;
1978 |  34 |     this.options = this.initializeOptions();
1979 |  35 |     this.fileHidden = new FileHidden(config);
1980 |  36 |   }
1981 |  37 | 
1982 |  38 |   public async build(): Promise<INodeTree> {
1983 |  39 |     const rootDir = this.options.dir;
1984 |  40 |     if (!documentFactory.exists(rootDir)) {
1985 |  41 |       throw new Error(`Directory ${rootDir} does not exist`);
1986 |  42 |     }
1987 |  43 |     return await this.buildTree(rootDir);
1988 |  44 |   }
1989 |  45 | 
1990 |  46 |   private initializeOptions(): INodeTreeBuilderOptions {
1991 |  47 |     return {
1992 |  48 |       dir: this.config.get("dir"),
1993 |  49 |       pattern: new RegExp(this.config.get("pattern")),
1994 |  50 |       maxDepth: this.config.get("maxDepth"),
1995 |  51 |       excludePatterns: this.config.get("excludePatterns"),
1996 |  52 |       additionalIgnoreFiles: this.config.get("additionalIgnoreFiles"),
1997 |  53 |       returnType: "details",
1998 |  54 |       followSymlinks: false
1999 |  55 |     };
2000 |  56 |   }
2001 |  57 | 
2002 |  58 |   private async createNode(nodePath: string): Promise<INodeTree> {
2003 |  59 |     const stats = await fileStatsService(nodePath);
2004 |  60 |     const name = documentFactory.baseName(nodePath);
2005 |  61 | 
2006 |  62 |     return {
2007 |  63 |       name,
2008 |  64 |       path: nodePath,
2009 |  65 |       type: stats.isDirectory ? FILE_TYPE.Directory : FILE_TYPE.File
2010 |  66 |     };
2011 |  67 |   }
2012 |  68 | 
2013 |  69 |   private shouldProcessChildren(node: INodeTree, depth: number): boolean {
2014 |  70 |     const isDirectory = node.type === FILE_TYPE.Directory;
2015 |  71 |     const withinDepthLimit =
2016 |  72 |       !this.options.maxDepth || depth < this.options.maxDepth;
2017 |  73 |     return isDirectory && withinDepthLimit;
2018 |  74 |   }
2019 |  75 | 
2020 |  76 |   private async processChildren(
2021 |  77 |     nodePath: string,
2022 |  78 |     depth: number
2023 |  79 |   ): Promise<INodeTree[]> {
2024 |  80 |     const entries = await documentFactory.readDir(nodePath);
2025 |  81 |     const children: INodeTree[] = [];
2026 |  82 | 
2027 |  83 |     for (const entry of entries) {
2028 |  84 |       const childNode = await this.processChild(nodePath, entry, depth);
2029 |  85 |       if (childNode) {
2030 |  86 |         children.push(childNode);
2031 |  87 |       }
2032 |  88 |     }
2033 |  89 | 
2034 |  90 |     return children;
2035 |  91 |   }
2036 |  92 | 
2037 |  93 |   private async processChild(
2038 |  94 |     parentPath: string,
2039 |  95 |     entry: string,
2040 |  96 |     depth: number
2041 |  97 |   ): Promise<INodeTree | null> {
2042 |  98 |     if (this.fileHidden.shouldExclude(entry)) {
2043 |  99 |       return null;
2044 | 100 |     }
2045 | 101 | 
2046 | 102 |     const childPath = documentFactory.join(parentPath, entry);
2047 | 103 |     return await this.buildTree(childPath, depth + 1);
2048 | 104 |   }
2049 | 105 | 
2050 | 106 |   private async buildTree(
2051 | 107 |     nodePath: string,
2052 | 108 |     depth: number = 0
2053 | 109 |   ): Promise<INodeTree> {
2054 | 110 |     const node = await this.createNode(nodePath);
2055 | 111 | 
2056 | 112 |     if (this.shouldProcessChildren(node, depth)) {
2057 | 113 |       node.children = await this.processChildren(nodePath, depth);
2058 | 114 |     }
2059 | 115 | 
2060 | 116 |     return node;
2061 | 117 |   }
2062 | 118 | }
2063 | 119 | 
2064 | ```
2065 | 
2066 | ---------------------------------------------------------------------------
2067 | 
2068 | 
2069 | ## File: RenderStrategy.ts
2070 | - Path: `/root/git/codewrangler/src/services/renderer/RenderStrategy.ts`
2071 | - Size: 4.15 KB
2072 | - Extension: .ts
2073 | - Lines of code: 129
2074 | - Content:
2075 | 
2076 | ```ts
2077 |   1 | import { NodeDirectory } from "../../core/entities/NodeDirectory";
2078 |   2 | import { NodeFile } from "../../core/entities/NodeFile";
2079 |   3 | import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
2080 |   4 | import { Template } from "../../infrastructure/templates/TemplateEngine";
2081 |   5 | import {
2082 |   6 |   BaseTemplate,
2083 |   7 |   DirectoryTemplate,
2084 |   8 |   FileTemplate,
2085 |   9 |   baseTemplateSchema,
2086 |  10 |   directoryTemplateSchema,
2087 |  11 |   fileTemplateSchema
2088 |  12 | } from "../../infrastructure/templates/zod";
2089 |  13 | import { TemplateType } from "../../types/template";
2090 |  14 | import { Config, OutputFormatExtension } from "../../utils/config";
2091 |  15 | 
2092 |  16 | interface IContentRenderer {
2093 |  17 |   renderFile: (file: NodeFile) => string;
2094 |  18 |   renderDirectory: (directory: NodeDirectory) => string;
2095 |  19 | }
2096 |  20 | 
2097 |  21 | interface ITemplateLoader {
2098 |  22 |   loadTemplates: () => Promise<void>;
2099 |  23 | }
2100 |  24 | 
2101 |  25 | interface IDocumentRenderer {
2102 |  26 |   render: (rootDirectory: NodeDirectory) => string;
2103 |  27 |   dispose: () => void;
2104 |  28 | }
2105 |  29 | 
2106 |  30 | export interface IRenderStrategy
2107 |  31 |   extends IContentRenderer,
2108 |  32 |     ITemplateLoader,
2109 |  33 |     IDocumentRenderer {}
2110 |  34 | 
2111 |  35 | export abstract class BaseRenderStrategy implements IRenderStrategy {
2112 |  36 |   protected extension: OutputFormatExtension;
2113 |  37 |   protected templates: Record<TemplateType, Template | null>;
2114 |  38 |   protected config: Config;
2115 |  39 | 
2116 |  40 |   protected constructor(config: Config, extension: OutputFormatExtension) {
2117 |  41 |     this.config = config;
2118 |  42 |     this.templates = {
2119 |  43 |       page: null,
2120 |  44 |       file: null,
2121 |  45 |       directory: null
2122 |  46 |     };
2123 |  47 |     this.extension = extension;
2124 |  48 |   }
2125 |  49 | 
2126 |  50 |   public async loadTemplates(): Promise<void> {
2127 |  51 |     const templateDir = Template.getTemplateDir(this.config);
2128 |  52 |     this.templates = {
2129 |  53 |       page: await Template.create(
2130 |  54 |         "page",
2131 |  55 |         baseTemplateSchema,
2132 |  56 |         documentFactory.join(templateDir, `page.${this.extension}`)
2133 |  57 |       ),
2134 |  58 |       file: await Template.create(
2135 |  59 |         "file",
2136 |  60 |         fileTemplateSchema,
2137 |  61 |         documentFactory.join(templateDir, `file.${this.extension}`)
2138 |  62 |       ),
2139 |  63 |       directory: await Template.create(
2140 |  64 |         "directory",
2141 |  65 |         directoryTemplateSchema,
2142 |  66 |         documentFactory.join(templateDir, `directory.${this.extension}`)
2143 |  67 |       )
2144 |  68 |     };
2145 |  69 |   }
2146 |  70 | 
2147 |  71 |   public renderFile(file: NodeFile): string {
2148 |  72 |     if (!this.templates.file) {
2149 |  73 |       throw new Error("File template is not loaded");
2150 |  74 |     }
2151 |  75 |     return this.replaceSelectors(this.templates.file.content, {
2152 |  76 |       FILE_NAME: file.name,
2153 |  77 |       FILE_EXTENSION: file.extension,
2154 |  78 |       FILE_SIZE: file.size,
2155 |  79 |       FILE_CONTENTS: file.content || "",
2156 |  80 |       ...file.props
2157 |  81 |     });
2158 |  82 |   }
2159 |  83 | 
2160 |  84 |   public renderDirectory(directory: NodeDirectory): string {
2161 |  85 |     const content = directory.children
2162 |  86 |       .map(
2163 |  87 |         child =>
2164 |  88 |           child instanceof NodeFile
2165 |  89 |             ? this.renderFile(child)
2166 |  90 |             : this.renderDirectory(child) // save the rendering result on the object after bundling execution
2167 |  91 |       )
2168 |  92 |       .join("");
2169 |  93 |     if (!this.templates.directory) {
2170 |  94 |       throw new Error("Directory template is not loaded");
2171 |  95 |     }
2172 |  96 |     return this.replaceSelectors(this.templates.directory.content, {
2173 |  97 |       DIRECTORY_NAME: directory.name,
2174 |  98 |       DIRECTORY_PATH: directory.path,
2175 |  99 |       DIRECTORY_SIZE: directory.size,
2176 | 100 |       DIRECTORY_CONTENT: content,
2177 | 101 |       ...directory.props
2178 | 102 |     });
2179 | 103 |   }
2180 | 104 | 
2181 | 105 |   public render(rootDirectory: NodeDirectory): string {
2182 | 106 |     const directoryContent = this.renderDirectory(rootDirectory);
2183 | 107 |     if (!this.templates.page) {
2184 | 108 |       throw new Error("Page template is not loaded");
2185 | 109 |     }
2186 | 110 |     return this.replaceSelectors(this.templates.page.content, {
2187 | 111 |       PROJECT_NAME:
2188 | 112 |         this.config.get("projectName") || rootDirectory.name || "Project",
2189 | 113 |       GENERATION_DATE: new Date().toLocaleDateString(),
2190 | 114 |       DIRECTORY_STRUCTURE: directoryContent,
2191 | 115 |       TOTAL_FILES: rootDirectory.length,
2192 | 116 |       TOTAL_DIRECTORIES: rootDirectory.deepLength,
2193 | 117 |       TOTAL_SIZE: rootDirectory.size,
2194 | 118 |       CONTENT: directoryContent
2195 | 119 |     });
2196 | 120 |   }
2197 | 121 | 
2198 | 122 |   public dispose(): void {
2199 | 123 |     this.templates = {
2200 | 124 |       page: null,
2201 | 125 |       file: null,
2202 | 126 |       directory: null
2203 | 127 |     };
2204 | 128 |   }
2205 | 129 | 
2206 | 130 |   protected replaceSelectors(
2207 | 131 |     template: string,
2208 | 132 |     values: BaseTemplate | FileTemplate | DirectoryTemplate
2209 | 133 |   ): string {
2210 | 134 |     return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
2211 | 135 |       const typedKey = key as keyof typeof values;
2212 | 136 |       return values[typedKey] !== undefined
2213 | 137 |         ? String(values[typedKey])
2214 | 138 |         : `{{${key}}}`;
2215 | 139 |     });
2216 | 140 |   }
2217 | 141 | }
2218 | 142 | 
2219 | ```
2220 | 
2221 | ---------------------------------------------------------------------------
2222 | 
2223 | 
2224 | ## File: HTMLStrategy.ts
2225 | - Path: `/root/git/codewrangler/src/services/renderer/strategies/HTMLStrategy.ts`
2226 | - Size: 965.00 B
2227 | - Extension: .ts
2228 | - Lines of code: 26
2229 | - Content:
2230 | 
2231 | ```ts
2232 |  1 | import { NodeFile } from "../../../core/entities/NodeFile";
2233 |  2 | import { Config } from "../../../utils/config";
2234 |  3 | import { OUTPUT_FORMATS } from "../../../utils/config/schema";
2235 |  4 | import { BaseRenderStrategy } from "../RenderStrategy";
2236 |  5 | 
2237 |  6 | export class HTMLRenderStrategy extends BaseRenderStrategy {
2238 |  7 |   public constructor(config: Config) {
2239 |  8 |     super(config, OUTPUT_FORMATS.html);
2240 |  9 |   }
2241 | 10 | 
2242 | 11 |   public override renderFile(file: NodeFile): string {
2243 | 12 |     const rendered = super.renderFile(file);
2244 | 13 |     return this.processCodeBlock(rendered, file.extension.replace(".", ""));
2245 | 14 |   }
2246 | 15 | 
2247 | 16 |   protected processCodeBlock(content: string, language: string): string {
2248 | 17 |     return `<pre><code class="language-${language}">${this.escapeHtml(
2249 | 18 |       content
2250 | 19 |     )}</code></pre>`;
2251 | 20 |   }
2252 | 21 | 
2253 | 22 |   private escapeHtml(content: string): string {
2254 | 23 |     return content
2255 | 24 |       .replace(/&/g, "&amp;")
2256 | 25 |       .replace(/</g, "&lt;")
2257 | 26 |       .replace(/>/g, "&gt;")
2258 | 27 |       .replace(/"/g, "&quot;")
2259 | 28 |       .replace(/'/g, "&#039;");
2260 | 29 |   }
2261 | 30 | }
2262 | 31 | 
2263 | ```
2264 | 
2265 | ---------------------------------------------------------------------------
2266 | 
2267 | 
2268 | ## File: MarkdownStrategy.ts
2269 | - Path: `/root/git/codewrangler/src/services/renderer/strategies/MarkdownStrategy.ts`
2270 | - Size: 689.00 B
2271 | - Extension: .ts
2272 | - Lines of code: 16
2273 | - Content:
2274 | 
2275 | ```ts
2276 |  1 | import { NodeFile } from "../../../core/entities/NodeFile";
2277 |  2 | import { Config } from "../../../utils/config";
2278 |  3 | import { OUTPUT_FORMATS } from "../../../utils/config/schema";
2279 |  4 | import { BaseRenderStrategy } from "../RenderStrategy";
2280 |  5 | 
2281 |  6 | export class MarkdownStrategy extends BaseRenderStrategy {
2282 |  7 |   public constructor(config: Config) {
2283 |  8 |     super(config, OUTPUT_FORMATS.markdown);
2284 |  9 |   }
2285 | 10 | 
2286 | 11 |   public override renderFile(file: NodeFile): string {
2287 | 12 |     const rendered = super.renderFile(file);
2288 | 13 |     return this.processCodeBlock(rendered, file.extension.replace(".", ""));
2289 | 14 |   }
2290 | 15 | 
2291 | 16 |   protected processCodeBlock(content: string, language: string): string {
2292 | 17 |     return `\`\`\`${language}\n${content}\n\`\`\``;
2293 | 18 |   }
2294 | 19 | }
2295 | 20 | 
2296 | ```
2297 | 
2298 | ---------------------------------------------------------------------------
2299 | 
2300 | 
2301 | ## File: template.ts
2302 | - Path: `/root/git/codewrangler/src/types/template.ts`
2303 | - Size: 229.00 B
2304 | - Extension: .ts
2305 | - Lines of code: 7
2306 | - Content:
2307 | 
2308 | ```ts
2309 |  1 | import { z } from "zod";
2310 |  2 | 
2311 |  3 | export type TemplateType = "page" | "file" | "directory";
2312 |  4 | 
2313 |  5 | export interface ITemplateContent<T> {
2314 |  6 |   content: string;
2315 |  7 |   schema: z.ZodSchema<T>;
2316 |  8 |   additionalFields?: Record<string, z.ZodSchema<string>>;
2317 |  9 | }
2318 | 10 | 
2319 | ```
2320 | 
2321 | ---------------------------------------------------------------------------
2322 | 
2323 | 
2324 | ## File: type.ts
2325 | - Path: `/root/git/codewrangler/src/types/type.ts`
2326 | - Size: 907.00 B
2327 | - Extension: .ts
2328 | - Lines of code: 44
2329 | - Content:
2330 | 
2331 | ```ts
2332 |  1 | export const FILE_TYPE = {
2333 |  2 |   File: "file",
2334 |  3 |   Directory: "directory"
2335 |  4 | } as const;
2336 |  5 | 
2337 |  6 | export type FileType = (typeof FILE_TYPE)[keyof typeof FILE_TYPE];
2338 |  7 | 
2339 |  8 | export interface IAccessFlags {
2340 |  9 |   readable: boolean;
2341 | 10 |   writable: boolean;
2342 | 11 |   executable: boolean;
2343 | 12 | }
2344 | 13 | 
2345 | 14 | export interface IFileStats {
2346 | 15 |   size: number;
2347 | 16 |   created: Date;
2348 | 17 |   modified: Date;
2349 | 18 |   accessed: Date;
2350 | 19 |   isDirectory: boolean;
2351 | 20 |   isFile: boolean;
2352 | 21 |   permissions: IAccessFlags;
2353 | 22 | }
2354 | 23 | 
2355 | 24 | export interface IReadOptions {
2356 | 25 |   encoding?: BufferEncoding;
2357 | 26 |   flag?: string;
2358 | 27 | }
2359 | 28 | 
2360 | 29 | export interface IWriteOptions extends IReadOptions {
2361 | 30 |   mode?: number;
2362 | 31 |   flag?: string;
2363 | 32 | }
2364 | 33 | 
2365 | 34 | export interface IDirectoryOptions {
2366 | 35 |   recursive?: boolean;
2367 | 36 |   mode?: number;
2368 | 37 | }
2369 | 38 | 
2370 | 39 | export interface IFileTreeItem {
2371 | 40 |   path: string;
2372 | 41 |   type: FileType;
2373 | 42 |   stats?: IFileStats;
2374 | 43 | }
2375 | 44 | 
2376 | 45 | export interface IPropsNode {
2377 | 46 |   name: string;
2378 | 47 |   path: string;
2379 | 48 |   deep: number;
2380 | 49 |   size: number;
2381 | 50 |   extension?: string;
2382 | 51 |   stats?: IFileStats;
2383 | 52 | }
2384 | 53 | 
2385 | ```
2386 | 
2387 | ---------------------------------------------------------------------------
2388 | 
2389 | 
2390 | ## File: Config.ts
2391 | - Path: `/root/git/codewrangler/src/utils/config/Config.ts`
2392 | - Size: 2.50 KB
2393 | - Extension: .ts
2394 | - Lines of code: 83
2395 | - Content:
2396 | 
2397 | ```ts
2398 |  1 | import { z } from "zod";
2399 |  2 | 
2400 |  3 | import {
2401 |  4 |   ConfigKeys,
2402 |  5 |   ConfigOptions,
2403 |  6 |   DEFAULT_CONFIG,
2404 |  7 |   configSchema
2405 |  8 | } from "./schema";
2406 |  9 | import { documentFactory } from "../../infrastructure/filesystem/DocumentFactory";
2407 | 10 | import { JsonReader } from "../../infrastructure/filesystem/JsonReader";
2408 | 11 | import { logger } from "../logger/Logger";
2409 | 12 | 
2410 | 13 | export class Config {
2411 | 14 |   private static instance: Config | undefined;
2412 | 15 |   private config: ConfigOptions;
2413 | 16 |   private jsonReader: JsonReader;
2414 | 17 | 
2415 | 18 |   private constructor() {
2416 | 19 |     this.jsonReader = new JsonReader();
2417 | 20 |     this.config = configSchema.parse(DEFAULT_CONFIG);
2418 | 21 |   }
2419 | 22 | 
2420 | 23 |   public static async load(): Promise<Config> {
2421 | 24 |     if (!Config.instance) {
2422 | 25 |       Config.instance = new Config();
2423 | 26 |       await Config.instance.loadUserConfig();
2424 | 27 |     }
2425 | 28 |     return Config.instance;
2426 | 29 |   }
2427 | 30 | 
2428 | 31 |   public get<T extends ConfigKeys>(key: T): ConfigOptions[T] {
2429 | 32 |     return this.config[key] as ConfigOptions[T];
2430 | 33 |   }
2431 | 34 | 
2432 | 35 |   public set(
2433 | 36 |     key: keyof ConfigOptions,
2434 | 37 |     value: ConfigOptions[keyof ConfigOptions]
2435 | 38 |   ): void {
2436 | 39 |     const updatedConfig = { ...this.config, [key]: value };
2437 | 40 |     try {
2438 | 41 |       configSchema.parse(updatedConfig);
2439 | 42 |       this.config = updatedConfig;
2440 | 43 |     } catch (error) {
2441 | 44 |       if (error instanceof z.ZodError) {
2442 | 45 |         logger.error(`Invalid configuration value: ${error.errors}`);
2443 | 46 |       }
2444 | 47 |       throw error;
2445 | 48 |     }
2446 | 49 |   }
2447 | 50 |   public getAll(): ConfigOptions {
2448 | 51 |     return this.config;
2449 | 52 |   }
2450 | 53 |   public reset(): void {
2451 | 54 |     this.config = DEFAULT_CONFIG;
2452 | 55 |   }
2453 | 56 |   public static destroy(): void {
2454 | 57 |     Config.instance = undefined;
2455 | 58 |   }
2456 | 59 |   public override(config: Partial<ConfigOptions>): void {
2457 | 60 |     const newOverrideConfig = { ...this.config, ...config };
2458 | 61 |     try {
2459 | 62 |       configSchema.parse(newOverrideConfig);
2460 | 63 |       this.config = newOverrideConfig;
2461 | 64 |     } catch (error) {
2462 | 65 |       if (error instanceof z.ZodError) {
2463 | 66 |         logger.error(`Invalid configuration value: ${error.errors}`);
2464 | 67 |       }
2465 | 68 |       throw error;
2466 | 69 |     }
2467 | 70 |   }
2468 | 71 | 
2469 | 72 |   private async loadUserConfig(): Promise<void> {
2470 | 73 |     try {
2471 | 74 |       const configPath = documentFactory.resolve(this.config.codeConfigFile);
2472 | 75 |       const userConfig = await this.jsonReader.readJsonSync(configPath);
2473 | 76 |       this.config = configSchema.parse({ ...this.config, ...userConfig });
2474 | 77 |     } catch (error) {
2475 | 78 |       this.handleConfigError(error);
2476 | 79 |     }
2477 | 80 |   }
2478 | 81 | 
2479 | 82 |   private handleConfigError(error: unknown): void {
2480 | 83 |     if (error instanceof z.ZodError) {
2481 | 84 |       const details = error.errors
2482 | 85 |         .map(err => `${err.path.join(".")}: ${err.message}`)
2483 | 86 |         .join(", ");
2484 | 87 |       throw new Error(`Configuration validation failed: ${details}`);
2485 | 88 |     }
2486 | 89 |     throw error;
2487 | 90 |   }
2488 | 91 | }
2489 | 92 | 
2490 | ```
2491 | 
2492 | ---------------------------------------------------------------------------
2493 | 
2494 | 
2495 | ## File: index.ts
2496 | - Path: `/root/git/codewrangler/src/utils/config/index.ts`
2497 | - Size: 52.00 B
2498 | - Extension: .ts
2499 | - Lines of code: 2
2500 | - Content:
2501 | 
2502 | ```ts
2503 | 1 | export * from "./Config";
2504 | 2 | export * from "./schema";
2505 | 3 | 
2506 | ```
2507 | 
2508 | ---------------------------------------------------------------------------
2509 | 
2510 | 
2511 | ## File: schema.ts
2512 | - Path: `/root/git/codewrangler/src/utils/config/schema.ts`
2513 | - Size: 2.42 KB
2514 | - Extension: .ts
2515 | - Lines of code: 64
2516 | - Content:
2517 | 
2518 | ```ts
2519 |  1 | import { z } from "zod";
2520 |  2 | 
2521 |  3 | import { LOG_VALUES } from "../logger/Logger";
2522 |  4 | 
2523 |  5 | export const OUTPUT_FORMATS = {
2524 |  6 |   markdown: "md",
2525 |  7 |   html: "html"
2526 |  8 | } as const;
2527 |  9 | 
2528 | 10 | export type OutputFormats = typeof OUTPUT_FORMATS;
2529 | 11 | export type OutputFormatName = keyof OutputFormats;
2530 | 12 | export type OutputFormatExtension = OutputFormats[OutputFormatName];
2531 | 13 | 
2532 | 14 | export const outputFormatSchema = z.enum(["markdown", "html"] as const);
2533 | 15 | 
2534 | 16 | export const fileExtensionSchema = z.enum(["md", "html"] as const);
2535 | 17 | 
2536 | 18 | export type OutputFormat = z.infer<typeof outputFormatSchema>;
2537 | 19 | export type FileExtension = z.infer<typeof fileExtensionSchema>;
2538 | 20 | 
2539 | 21 | export const FILE_EXTENSION: Record<OutputFormat, FileExtension> = {
2540 | 22 |   markdown: "md",
2541 | 23 |   html: "html"
2542 | 24 | };
2543 | 25 | 
2544 | 26 | export const configSchema = z
2545 | 27 |   .object({
2546 | 28 |     dir: z.string().default(process.cwd()),
2547 | 29 |     rootDir: z.string().default(process.cwd()),
2548 | 30 |     templatesDir: z.string().default("public/templates"),
2549 | 31 |     pattern: z
2550 | 32 |       .string()
2551 | 33 |       .regex(/^.*$/, "Pattern must be a valid regex")
2552 | 34 |       .default(".*"),
2553 | 35 |     outputFile: z.string().default("output"),
2554 | 36 |     logLevel: z.enum(LOG_VALUES as [string, ...string[]]).default("INFO"),
2555 | 37 |     outputFormat: z.array(outputFormatSchema).default(["markdown"]),
2556 | 38 |     maxFileSize: z.number().positive().default(1048576),
2557 | 39 |     maxDepth: z.number().default(100),
2558 | 40 |     excludePatterns: z
2559 | 41 |       .array(z.string())
2560 | 42 |       .default(["node_modules/**", "**/*.test.ts", "dist/**"]),
2561 | 43 |     ignoreHiddenFiles: z.boolean().default(true),
2562 | 44 |     additionalIgnoreFiles: z.array(z.string()).optional().default([]),
2563 | 45 |     projectName: z.string().optional(),
2564 | 46 |     followSymlinks: z.boolean().default(false),
2565 | 47 |     codeConfigFile: z
2566 | 48 |       .string()
2567 | 49 |       .regex(/\.json$/, "Config file must end with .json")
2568 | 50 |       .default("public/codewrangler.json")
2569 | 51 |   })
2570 | 52 |   .strict();
2571 | 53 | 
2572 | 54 | export type ConfigOptions = z.infer<typeof configSchema>;
2573 | 55 | // get a type listing all the keys of the config
2574 | 56 | export type ConfigKeys = keyof ConfigOptions;
2575 | 57 | 
2576 | 58 | export const DEFAULT_CONFIG: ConfigOptions = {
2577 | 59 |   dir: process.cwd(), // current working directory, where the command is run
2578 | 60 |   rootDir: process.cwd(),
2579 | 61 |   templatesDir: "public/templates",
2580 | 62 |   pattern: ".*",
2581 | 63 |   outputFile: "output",
2582 | 64 |   logLevel: "INFO",
2583 | 65 |   outputFormat: ["markdown"],
2584 | 66 |   maxFileSize: 1048576,
2585 | 67 |   maxDepth: 100,
2586 | 68 |   codeConfigFile: "public/codewrangler.json",
2587 | 69 |   projectName: undefined,
2588 | 70 |   followSymlinks: false,
2589 | 71 |   ignoreHiddenFiles: true, // Default value
2590 | 72 |   additionalIgnoreFiles: [],
2591 | 73 |   excludePatterns: ["node_modules/**", "**/*.test.ts", "dist/**"]
2592 | 74 | };
2593 | 75 | 
2594 | ```
2595 | 
2596 | ---------------------------------------------------------------------------
2597 | 
2598 | 
2599 | ## File: ProgressBar.ts
2600 | - Path: `/root/git/codewrangler/src/utils/helpers/ProgressBar.ts`
2601 | - Size: 1.49 KB
2602 | - Extension: .ts
2603 | - Lines of code: 57
2604 | - Content:
2605 | 
2606 | ```ts
2607 |  1 | import cliProgress from "cli-progress";
2608 |  2 | 
2609 |  3 | export class ProgressBar {
2610 |  4 |   private bar: cliProgress.SingleBar;
2611 |  5 |   private intervalId: NodeJS.Timeout | null = null;
2612 |  6 |   private currentValue: number = 0;
2613 |  7 | 
2614 |  8 |   public constructor(private total: number = 100) {
2615 |  9 |     this.bar = new cliProgress.SingleBar(
2616 | 10 |       {},
2617 | 11 |       cliProgress.Presets.shades_classic
2618 | 12 |     );
2619 | 13 |   }
2620 | 14 | 
2621 | 15 |   public start(): ProgressBar {
2622 | 16 |     this.bar.start(this.total, 0);
2623 | 17 |     this.intervalId = setInterval(() => this.simulateProgress(), 200);
2624 | 18 |     return this;
2625 | 19 |   }
2626 | 20 | 
2627 | 21 |   public update(value: number): ProgressBar {
2628 | 22 |     this.currentValue = value;
2629 | 23 |     this.bar.update(value);
2630 | 24 |     return this;
2631 | 25 |   }
2632 | 26 | 
2633 | 27 |   public stop(): ProgressBar {
2634 | 28 |     if (this.intervalId) {
2635 | 29 |       clearInterval(this.intervalId);
2636 | 30 |       this.intervalId = null;
2637 | 31 |     }
2638 | 32 |     this.bar.update(this.total);
2639 | 33 |     this.bar.stop();
2640 | 34 |     return this;
2641 | 35 |   }
2642 | 36 | 
2643 | 37 |   public async execute<T>(fn: () => Promise<T>): Promise<T> {
2644 | 38 |     this.start();
2645 | 39 |     try {
2646 | 40 |       return await fn();
2647 | 41 |     } finally {
2648 | 42 |       this.stop();
2649 | 43 |     }
2650 | 44 |   }
2651 | 45 | 
2652 | 46 |   private simulateProgress(): void {
2653 | 47 |     const remainingProgress = this.total - this.currentValue;
2654 | 48 |     const increment = Math.random() * remainingProgress * 0.1;
2655 | 49 |     this.currentValue = Math.min(
2656 | 50 |       this.currentValue + increment,
2657 | 51 |       this.total * 0.95
2658 | 52 |     );
2659 | 53 |     this.bar.update(this.currentValue);
2660 | 54 |   }
2661 | 55 | }
2662 | 56 | 
2663 | 57 | export async function progressBar(
2664 | 58 |   total: number,
2665 | 59 |   callback: () => Promise<void>
2666 | 60 | ): Promise<void> {
2667 | 61 |   const bar = new ProgressBar(total);
2668 | 62 |   await bar.execute(async () => {
2669 | 63 |     await callback();
2670 | 64 |   });
2671 | 65 | }
2672 | 66 | 
2673 | ```
2674 | 
2675 | ---------------------------------------------------------------------------
2676 | 
2677 | 
2678 | ## File: Logger.ts
2679 | - Path: `/root/git/codewrangler/src/utils/logger/Logger.ts`
2680 | - Size: 1.99 KB
2681 | - Extension: .ts
2682 | - Lines of code: 69
2683 | - Content:
2684 | 
2685 | ```ts
2686 |  1 | /* eslint-disable no-console */
2687 |  2 | import colors from "colors";
2688 |  3 | 
2689 |  4 | import { Config } from "../config/Config";
2690 |  5 | 
2691 |  6 | export const LOG_LEVEL = {
2692 |  7 |   ERROR: 0,
2693 |  8 |   WARN: 1,
2694 |  9 |   INFO: 2,
2695 | 10 |   DEBUG: 3
2696 | 11 | } as const;
2697 | 12 | 
2698 | 13 | type LogLevel = (typeof LOG_LEVEL)[keyof typeof LOG_LEVEL];
2699 | 14 | export type LogLevelString = keyof typeof LOG_LEVEL;
2700 | 15 | export const LOG_VALUES = Object.keys(LOG_LEVEL) as LogLevelString[];
2701 | 16 | 
2702 | 17 | export class Logger {
2703 | 18 |   private static instance: Logger;
2704 | 19 |   private config: Config | null = null;
2705 | 20 | 
2706 | 21 |   private constructor() {}
2707 | 22 |   public static load(): Logger {
2708 | 23 |     if (!Logger.instance) {
2709 | 24 |       Logger.instance = new Logger();
2710 | 25 |     }
2711 | 26 |     return Logger.instance;
2712 | 27 |   }
2713 | 28 |   public setConfig(config: Config): Logger {
2714 | 29 |     this.config = config;
2715 | 30 |     return this;
2716 | 31 |   }
2717 | 32 |   public setLogLevel(logLevel: LogLevelString): Logger {
2718 | 33 |     if (this.config) {
2719 | 34 |       this.config.set("logLevel", logLevel);
2720 | 35 |     }
2721 | 36 |     return this;
2722 | 37 |   }
2723 | 38 | 
2724 | 39 |   private get logLevel(): LogLevel {
2725 | 40 |     const configLogLevel = this.config?.get("logLevel") as
2726 | 41 |       | LogLevelString
2727 | 42 |       | undefined;
2728 | 43 |     return configLogLevel ? LOG_LEVEL[configLogLevel] : LOG_LEVEL.ERROR;
2729 | 44 |   }
2730 | 45 | 
2731 | 46 |   public error(message: string, error?: Error, ...other: unknown[]): void {
2732 | 47 |     if (this.logLevel >= LOG_LEVEL.ERROR) {
2733 | 48 |       console.log(colors.red(`[ERROR] ${message}`), ...other);
2734 | 49 |       if (error instanceof Error && error.stack) {
2735 | 50 |         console.log(colors.red(error.stack));
2736 | 51 |       }
2737 | 52 |     }
2738 | 53 |   }
2739 | 54 | 
2740 | 55 |   public warn(message: string): void {
2741 | 56 |     if (this.logLevel >= LOG_LEVEL.WARN) {
2742 | 57 |       console.log(colors.yellow(`[WARN] ${message}`));
2743 | 58 |     }
2744 | 59 |   }
2745 | 60 | 
2746 | 61 |   public info(message: string): void {
2747 | 62 |     if (this.logLevel >= LOG_LEVEL.INFO) {
2748 | 63 |       console.log(colors.blue(`[INFO] ${message}`));
2749 | 64 |     }
2750 | 65 |   }
2751 | 66 | 
2752 | 67 |   public debug(message: string): void {
2753 | 68 |     if (this.logLevel >= LOG_LEVEL.DEBUG) {
2754 | 69 |       console.log(colors.gray(`[DEBUG] ${message}`));
2755 | 70 |     }
2756 | 71 |   }
2757 | 72 | 
2758 | 73 |   public success(message: string): void {
2759 | 74 |     console.log(colors.green(message));
2760 | 75 |   }
2761 | 76 | 
2762 | 77 |   public log(message: string): void {
2763 | 78 |     console.log(message);
2764 | 79 |   }
2765 | 80 | }
2766 | 81 | 
2767 | 82 | export const logger = Logger.load();
2768 | 83 | 
2769 | ```
2770 | 
2771 | ---------------------------------------------------------------------------
2772 | 
2773 | 
2774 | ## File: index.ts
2775 | - Path: `/root/git/codewrangler/src/utils/logger/index.ts`
2776 | - Size: 26.00 B
2777 | - Extension: .ts
2778 | - Lines of code: 1
2779 | - Content:
2780 | 
2781 | ```ts
2782 | 1 | export * from "./Logger";
2783 | 2 | 
2784 | ```
2785 | 
2786 | ---------------------------------------------------------------------------
2787 | 
2788 | 
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
- Size: 209.00 B
- Extension: .md
- Lines of code: 8
- Content:

```md
 1 | ### Directory: {{NAME}}
 2 | 
 3 | - **Path:** {{PATH}}
 4 | - **Size:** {{SIZE}} bytes
 5 | - **Files:** {{LENGTH}}
 6 | - **Total Files (including subdirectories):** {{DEEP_LENGTH}}
 7 | - **Depth:** {{DEEP}}
 8 | 
 9 | #### Contents:
10 | 
11 | {{CONTENT}}
```

---------------------------------------------------------------------------


## File: file.md
- Path: `/root/git/codewrangler/public/templates/file.md`
- Size: 172.00 B
- Extension: .md
- Lines of code: 9
- Content:

```md
 1 | #### File: {{NAME}}
 2 | 
 3 | - **Path:** {{PATH}}
 4 | - **Extension:** {{EXTENSION}}
 5 | - **Size:** {{SIZE}} bytes
 6 | - **Depth:** {{DEEP}}
 7 | 
 8 | ##### Content:
 9 | 
10 | ```{{EXTENSION}}
11 | {{CONTENT}}
12 | ```
13 | 
```

---------------------------------------------------------------------------


## File: page.md
- Path: `/root/git/codewrangler/public/templates/page.md`
- Size: 341.00 B
- Extension: .md
- Lines of code: 13
- Content:

```md
 1 | # Project Documentation: {{PROJECT_NAME}}
 2 | 
 3 | ## Overview
 4 | 
 5 | This documentation was automatically generated on {{GENERATION_DATE}}.
 6 | 
 7 | ## Directory Structure
 8 | 
 9 | ```
10 | {{DIRECTORY_STRUCTURE}}
11 | ```
12 | 
13 | ## File Contents
14 | 
15 | {{DIRECTORY_CONTENT}}
16 | 
17 | ## Summary
18 | 
19 | - Total Files: {{TOTAL_FILES}}
20 | - Total Directories: {{TOTAL_DIRECTORIES}}
21 | - Total Size: {{TOTAL_SIZE}}
22 | 
```

---------------------------------------------------------------------------

