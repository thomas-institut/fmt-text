/*
 *  Copyright (C) 2021 Universität zu Köln
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 */




/*

Essentially a string with some standard attributes, or some empty space

FmtTextToken := {
    type:  glue | text | mark

    type === glue:
       The term 'glue' is taken from Donald Knuth's the TeX book, where it is explained in
       chapter 12. Glue is meant to represent a potentially variable-length space that may or
       may not eventually appear in a representation of the text. It may not appear, for example, in
       a printed version of the text if it is an inter-word space that falls at the end of the line.
       This allows for more sophisticated typesetting in printed form.

       {
          space: a space size in pixels, if negative, defaults to a standard size defined by some typesetting engine
          stretch: extra pixels the space can have, this is only a suggestion, the typesetter
                   algorithm may stretch spaces more than this in extreme situations.
          shrink: number, how many pixels less the space can have; (space - shrink) is the absolute minimum
                  for the space

       }

    type ===  text :
       {
           text: string
           weight:  normal, bold, semibold, light, etc
           style: normal, italic
           size:  number, font size in ems (i.e., relative to a default font size)
           decoration: none, underline, overline, strikethrough
           verticalAlign:  baseline, super, sub
           fontFamily:  string, a font name
           fontStyle: normal, italic
           fontVariant: normal, small-caps, etc
           direction: 'rtl' | 'ltr'
        }

    type === mark:
       {
         markType: string,
         style: string
       }
}



 */


import * as FmtTextTokenType from './FmtTextTokenType'
import * as FontStyle from './FontStyle'
import * as FontSize from './FontSize'
import * as FontWeight from './FontWeight'
import * as VerticalAlign from './VerticalAlign'

export const DEFAULT_GLUE_SPACE = 'normal'

export class FmtTextToken {
  public type: string;
  public text: string = '';
  public fontStyle: string = ' ';
  public fontWeight: string = '';
  public verticalAlign: string = '';
  public fontSize: number = 0;
  public classList: string = '';
  public textDirection: string = '';
  public space: string = '';
  public markType: string = '';
  public style: string = '';
  public width: number = 0;
  public stretch: number = 0;
  public shrink: number = 0;

  constructor (type = FmtTextTokenType.TEXT) {
    this.type = type;

    switch(type) {
      case FmtTextTokenType.TEXT:
        this.text = '';
        this.fontStyle = FontStyle.NORMAL;
        this.fontWeight = FontWeight.NORMAL;
        this.verticalAlign = VerticalAlign.BASELINE;
        this.fontSize = FontSize.NORMAL;
        this.classList = ''  // a space-separated list of arbitrary text labels
        this.textDirection = '' // if empty, inferred from the text, otherwise it can be 'rtl' or 'ltr'
        break

      case FmtTextTokenType.GLUE:
        this.space = DEFAULT_GLUE_SPACE // i.e., default size, whatever that means for the typesetter/presenter context
        this.width = 0;
        this.stretch = 0;
        this.shrink = 0;
        break

      case FmtTextTokenType.MARK:
        this.markType = '';
        this.style = '';
        break

      default:
        console.warn(`Unsupported type in FormattedTextToken constructor: ${type}`);
        this.type = FmtTextTokenType.EMPTY;
    }
  }

  getPlainText(): string {
    return this.type === FmtTextTokenType.GLUE ? ' ' : this.text;
  }

  setText(text: string): FmtTextToken {
    this.text = text
    return this
  }

  setFontSize(fontSize: number): FmtTextToken {
    this.fontSize = fontSize
    return this
  }

  setItalic(): FmtTextToken {
    this.fontStyle = FontStyle.ITALIC
    return this
  }

  setNormalSlant(): FmtTextToken {
    this.fontStyle = FontStyle.NORMAL
    return this
  }

  setBold():FmtTextToken {
    this.fontWeight = FontWeight.BOLD
    return this
  }

  setNormalWeight(): FmtTextToken {
    this.fontWeight = FontWeight.NORMAL
    return this
  }

  setLength(spaceLength: string):FmtTextToken {
    this.space = spaceLength
    return this
  }

  setSuperScript():FmtTextToken {
    this.verticalAlign = VerticalAlign.SUPERSCRIPT
    return this
  }

  setSubScript(): FmtTextToken {
    this.verticalAlign = VerticalAlign.SUBSCRIPT
    return this
  }

  setSmallFont(): FmtTextToken {
    this.fontSize = FontSize.SMALL
    return this
  }

  setClass(classList: string): FmtTextToken {
    this.classList = classList
    return this
  }

  addClass(className: string): FmtTextToken {
    if (this.classList === '') {
      this.classList = className
    } else {
      this.classList += ' '
      this.classList += className
    }
    return this
  }

  removeClass(className: string): FmtTextToken {
    let classArray = this.classList.split(' ')
    this.classList = classArray.filter( (currentClassName) => { return currentClassName !== className}).join(' ')
    return this
  }

  setMarkType(markType: string):FmtTextToken {
    this.type = FmtTextTokenType.MARK
    this.markType = markType
    this.style = ''
    return this
  }

  setStyle(style: string): FmtTextToken {
    this.style = style
    return this
  }

  setTextDirection(textDirection: string): FmtTextToken {
    this.textDirection = textDirection
    return this
  }

  setGlue(width: any, stretch = 0, shrink = 0 ) {
    this.space = ''
    this.width = width
    this.stretch = stretch
    this.shrink = shrink
  }

}