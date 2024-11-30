import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  { ignores: ["build.js", "dist", "coverage/", "build/", "*.js"] },
  { files: ["**/*.{js,mjs,cjs,ts}"], ignores: ["build.js", "dist", "coverage/", "build/", "*.js"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];