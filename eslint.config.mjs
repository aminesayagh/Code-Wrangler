import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  // Base configuration and ignored paths
  {
    ignores: [
      "build.js",
      "dist/**/*",
      "node_modules/**/*",
      "coverage/**/*",
      "build/**/*",
      "*.js",
      "jest.config.js",
      "src/__mocks__/**/*",
      "eslint.config.mjs"
    ]
  },

  // Global configuration for all files
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest
      },
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module"
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin
    },
    settings: {
      "import/resolver": {
        typescript: true,
        node: true
      }
    }
  },

  // ESLint recommended rules
  pluginJs.configs.recommended,

  // TypeScript-specific configurations
  ...tseslint.configs.recommended,
  ...tseslint.configs.strict,

  // Custom rule overrides and additions
  {
    rules: {
      // TypeScript-specific rules
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": ["error", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_"
      }],
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "interface",
          format: ["PascalCase"],
          prefix: ["I"]
        },
        {
          selector: "typeAlias",
          format: ["PascalCase"]
        }
      ],

      // General code style rules
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "error",
      "no-unused-expressions": "error",
      "no-duplicate-imports": "error",
      "sort-imports": [
        "error",
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false
        }
      ]
    }
  }
];