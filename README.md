# fmt-text

The goal of this package is to provide a device-independent way of representing formatted text
that retains enough formatting information as to be able to typeset and/or render text
more accurately in different contexts (screen, print, etc.).

## Installation

```bash
npm install @thomas-inst/fmt-text
```

## Data Structures

### FmtText

`FmtText` is the core data structure: an array of `FmtTextToken` objects, where each token
represents a piece of formatted text, a variable-length space, or a structural mark.

```typescript
type FmtText = FmtTextToken[];
```

A `FmtTextToken` is one of the following:

#### Text Token

Represents a run of text with optional formatting attributes.

```typescript
interface FmtTextTextToken {
  type: 'text';
  text: string;
  fontStyle?: string;      // e.g. 'italic'
  fontWeight?: string;     // e.g. 'bold'
  verticalAlign?: string;  // e.g. 'subscript', 'superscript'
  fontSize?: number;       // in ems (1 = default)
  classList?: string;      // space-separated display classes
  textDirection?: '' | 'ltr' | 'rtl';
}
```

All formatting properties are optional. When omitted or empty, the typesetter uses its defaults.

#### Glue Token

Represents a potentially variable-length space between text tokens. The term *glue* is borrowed
from Donald Knuth's *The TeXbook* (chapter 12): glue can stretch or shrink to allow for
more sophisticated typesetting, and may be suppressed entirely (e.g. an inter-word space
that falls at the end of a line).

```typescript
interface FmtTextGlueToken {
  type: 'glue';
  space?: string;    // style/kind of space, e.g. 'normal', 'em'
  width?: number;    // base width in pixels
  stretch?: number;  // extra pixels the space can grow
  shrink?: number;   // pixels the space can shrink (width - shrink = minimum)
}
```

#### Mark Token

Represents a structural or graphical mark such as a paragraph break, section break, icon, or
symbol. A renderer may display it graphically or use it purely as a structural delimiter.

```typescript
interface FmtTextMarkToken {
  type: 'mark';
  markType: string;   // e.g. 'par', 'section', 'footnote', 'icon'
  style?: string;     // e.g. 'h1', 'h2' for paragraphs
  altText?: string;   // fallback text when graphical output is unavailable
}
```

#### Empty Token

A no-op token that carries no content. Useful as a placeholder.

```typescript
interface FmtTextEmptyToken {
  type: 'empty';
}
```

### CompactFmtText

`CompactFmtText` is a compact representation of `FmtText` designed for serialization and storage.
Plain strings replace simple text and glue tokens that have no extra formatting attributes,
and adjacent strings are consolidated into a single string.

```typescript
type CompactFmtText = (FmtTextToken | string)[] | string;
```

For example, a `FmtText` array like:

```typescript
[
  { type: 'text', text: 'Hello' },
  { type: 'glue' },
  { type: 'text', text: 'world' }
]
```

becomes the `CompactFmtText` string `"Hello world"`.

When a token carries formatting information (e.g. bold text or a mark), it stays as a full
token object in the array:

```typescript
[
  "Hello ",
  { type: 'text', text: 'world', fontWeight: 'bold' }
]
```

Use `toCompactFmtText()` and `fromCompactFmtText()` to convert between the two formats.

## Utility Functions

| Function | Description |
|---|---|
| `fromString(str)` | Parses a plain string into `FmtText`, splitting on whitespace into text and glue tokens. |
| `fromCompactFmtText(input)` | Converts a `CompactFmtText` into a full `FmtText`. |
| `toCompactFmtText(fmtText)` | Converts a `FmtText` into its compact representation. |
| `getPlainText(fmtText)` | Extracts the plain text content from a `FmtText`, replacing glue with spaces. |
| `getNormalizedFmtText(fmtText)` | Returns a new `FmtText` with all tokens normalized (empty/default properties removed). |
| `getCleanFmtText(fmtText)` | Returns a normalized `FmtText` with truly empty tokens removed. |
| `newTextToken(text)` | Creates a new text token. |
| `newGlueToken(width?, stretch?, shrink?)` | Creates a new glue token. |
| `newMarkToken(markType, style?)` | Creates a new mark token. |
| `newParagraphMark(style?)` | Creates a paragraph mark token. |

## Constants

The package provides predefined constants for common formatting values:

- **FontStyle**: `FONT_STYLE_NORMAL`, `FONT_STYLE_ITALIC`
- **FontWeight**: `FONT_WEIGHT_NORMAL`, `FONT_WEIGHT_BOLD`
- **FontSize**: `FONT_SIZE_DEFAULT` (1), `FONT_SIZE_SMALL` (0.8), `FONT_SIZE_SUPERSCRIPT` (0.7), `FONT_SIZE_SUBSCRIPT` (0.7)
- **VerticalAlign**: `VALIGN_BASELINE`, `VALIGN_SUBSCRIPT`, `VALIGN_SUPERSCRIPT`
- **ParagraphStyle**: `PAR_STYLE_NORMAL`, `PAR_STYLE_H1`, `PAR_STYLE_H2`, `PAR_STYLE_H3`
- **MarkType**: `MARK_TYPE_PARAGRAPH`, `MARK_TYPE_SECTION`
- **TokenType**: `TOKEN_TYPE_EMPTY`, `TOKEN_TYPE_TEXT`, `TOKEN_TYPE_GLUE`, `TOKEN_TYPE_MARK`

## License

GPL-3.0
