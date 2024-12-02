#!/bin/bash

tsc ./src/cli/commands/DemoCommand.ts --outDir ./dist/cli/commands
node ./dist/cli/commands/DemoCommand.js
