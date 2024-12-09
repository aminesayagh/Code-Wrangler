#!/bin/bash

tsc ./src/demo/demo.ts --outDir ./dist/demo
node ./dist/demo/demo.js
