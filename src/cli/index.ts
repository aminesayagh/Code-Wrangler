#!/usr/bin/env node
import { ConfigBuilder } from "../utils/config";
import { DocumentCLIBuilder } from "./program/singleJob/SingleJobProgram";

function errorHandler(error: unknown): void {
  console.error(error);
  process.exit(1);
}

async function main(): Promise<void> {
  try {
    await ConfigBuilder.create();
    await DocumentCLIBuilder.create();
  } catch (error) {
    errorHandler(error);
  }
}

main().catch(() => {
  process.exit(1);
});
