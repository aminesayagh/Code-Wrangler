#!/usr/bin/env node
import { program } from "commander";
import { CodeWrangler } from "./services/CodeWrangler";

async function main() {
  program
    .version("1.0.0")
    .argument(
      "<pattern>",
      'File pattern to match (e.g., "\\.ts$" for TypeScript files)'
    )
    .option("-d, --dir <dir>", "Directory to search", process.cwd())
    .option("-o, --output <output>", "Output file", "output")
    .action(
      async (pattern: string, options: { dir: string; output: string }) => {
        try {
          const wrangler = new CodeWrangler(options.dir, pattern, options.output);
          await wrangler.execute();
        } catch (error) {
          console.error(error);
        }
      }
    );

  await program.parseAsync(process.argv);
}

main();