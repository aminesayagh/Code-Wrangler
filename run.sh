#!/bin/bash
# npm run dev "\.ts$" -d ./src -o typescript_files -v
npm run build && codewrangler "\.ts$" -d ./src -o typescript_files -v