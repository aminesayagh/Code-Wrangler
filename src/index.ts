#!/usr/bin/env node
import { CodeWrangler } from "./CodeWrangler";

async function main() {
  try {
    await CodeWrangler.run();
  } catch (error) {
    console.error("Error:", error instanceof Error ? error.message : String(error));
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

main();
