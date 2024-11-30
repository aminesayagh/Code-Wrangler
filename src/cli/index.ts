#!/usr/bin/env node
import { CodeWrangler } from "./CodeWrangler";
import { logger } from "../utils/logger/Logger";

async function main() {
  try {
    await CodeWrangler.run();
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
    } else {
      logger.error("An unknown error occurred");
    }
    process.exit(1);
  }
}

main().catch(() => process.exit(1));
