### Codebase Overview

`@thomas-inst/fmt-text` is a TypeScript library for representing and rendering formatted text. It is published as an npm package with both ESM and CJS outputs.

### Project Structure

- `src/` — Source code (TypeScript)
  - `FmtText.ts` — Core formatted text data structures and utilities
  - `FmtTextTokenType.ts` — Token type definitions
  - `FontSize.ts`, `FontStyle.ts`, `FontWeight.ts` — Font property enums/types
  - `MarkType.ts` — Mark type definitions
  - `ParagraphStyle.ts` — Paragraph styling definitions
  - `VerticalAlign.ts` — Vertical alignment definitions
  - `index.ts` — Public API barrel export
  - `Renderer/` — Rendering implementations
    - `FmtTextRenderer.ts` — Base renderer
    - `AsyncFmtTextRenderer.ts` — Async renderer
    - `HtmlRenderer.ts` — HTML output renderer
- `test/` — Test files
- `dist/` — Build output (generated)

### Testing

- **Framework:** [Vitest](https://vitest.dev/) (v4+)
- **Run all tests:** `npm test` (runs `vitest run`)
- **Test location:** `test/**/*.test.ts`
- **Config:** `vitest.config.ts` (globals enabled, Node environment)

### Building

- **Bundler:** Rollup (config in `rollup.config.js`)
- **Build command:** `npm run build`
- **TypeScript config:** `tsconfig.json`

### Rules for Code Generation

1. **All existing tests must pass.** Before submitting any change, run `npm test` and verify that every existing test passes.
2. **Preserve existing functionality.** Current methods must retain their behavior unless the task explicitly states otherwise.
3. **Unit tests for new methods.** Every new method or function must have accompanying unit tests.
4. **Update tests when functionality changes.** If a task requires changing the behavior of an existing method, the corresponding tests must be updated to reflect the new behavior.
