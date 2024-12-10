#!/bin/bash
# npm run dev "\.ts$" -d ./src -o typescript_files -v

npm run build && npm install -g . && codewrangler "\.ts$" -d ./src -o typescript_files -v 