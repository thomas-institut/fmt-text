import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));

export default {
  input: [
    'src/FmtText.ts',
    'src/FmtTextFactory.ts',
    'src/FmtTextToken.ts',
    'src/FmtTextTokenFactory.ts',
    'src/FontSize.ts',
    'src/FontStyle.ts',
    'src/FontWeight.ts',
    'src/MarkType.ts',
    'src/ParagraphStyle.ts',
    'src/VerticalAlign.ts',
    'src/FmtTextRenderer.ts',
    'src/HtmlRenderer.ts'
  ],
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    nodeResolve(), // Locates modules using Node.js resolution algorithm
    commonjs(),    // Converts CommonJS modules (like some node_modules) to ES6
    typescript({
      tsconfig: './tsconfig.json', // Path to your tsconfig.json
      declaration: true, // Ensure declarations are generated
      declarationDir: 'dist', // Output directory for .d.ts files
    }),
    babel({
      babelHelpers: 'bundled', // Or 'runtime' if you use @babel/runtime
      exclude: 'node_modules/**', // Don't transpile node_modules
      presets: [
        ['@babel/preset-env', {
          targets: {
            node: '18', // Target Node.js 18 for Node.js build
            esmodules: true, // Or specific browsers for browser build
          },
          modules: false, // Important for Rollup to handle ES modules
        }],
      ],
      // Optionally, define different babel configurations for different outputs if needed
      // For example, if your UMD build needs to target older browsers more aggressively
    }),
  ],
  // Mark external dependencies to not be bundled into your library.
  // For example, if you depend on 'lodash', it should be a peerDependency
  external: Object.keys(pkg.dependencies || {}).concat(Object.keys(pkg.peerDependencies || {})),
};