import { DocumentCLIBuilder } from "./document/DocumentCLIBuilder";
import { logger } from "../../utils/logger";

function errorHandler(error: unknown): void {
  if (error instanceof Error) {
    logger.error(error.message);
  } else {
    logger.error("An unknown error occurred");
  }
}
async function main(): Promise<void> {
  await DocumentCLIBuilder.create();
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch(errorHandler);
