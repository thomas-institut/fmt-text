# fmt-text

The goal is to have a device independent way of representing formatted text
that can be typeset and/or rendered in different ways.

Formatted text (`FmtTxt`) is represented in this package as an array of `FmtTextToken`,
each one of which can be:

- **Text**: text formatted in a given font, style, weight, direction, etc.
- **Glue**: empty space of a given width but that can be made bigger or smaller 
  by a typesetter.
- **Mark**: an arbitrary mark that can be represented graphically in different 
  ways by a renderer.

The package provides a number of methods to create and manipulate `FmtText` and
tokens, as well as a number of constants for basic formats.


