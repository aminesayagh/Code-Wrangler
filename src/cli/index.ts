#!/usr/bin/env node
import { CodeWrangler } from "./CodeWrangler";
import { logger } from "../utils/logger/Logger";

function errorHandler(error: unknown): void {
  if (error instanceof Error) {
    logger.error(error.message);
  } else {
    logger.error("An unknown error occurred");
  }
}

async function main(): Promise<void> {
  try {
    await CodeWrangler.run();
  } catch (error) {
    errorHandler(error);
    process.exit(1);
  }
}

main().catch(() => process.exit(1));
