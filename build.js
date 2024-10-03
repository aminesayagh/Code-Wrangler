/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const esbuild = require('esbuild');
const { typescriptPlugin } = require('esbuild-plugin-typescript');

esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    outfile: 'dist/index.js',
    platform: 'node',
    target: 'node14',
    format: 'cjs',
    plugins: [typescriptPlugin()],
    external: ['unified', 'remark-parse', 'remark-stringify', 'unist-util-visit'],
}).catch(() => process.exit(1));