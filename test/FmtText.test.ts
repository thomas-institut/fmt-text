import { describe, it, expect } from 'vitest';
import { 
  fromString, 
  getPlainText, 
  newTextToken, 
  newGlueToken, 
  newMarkToken,
  fromCompactFmtText, 
  toCompactFmtText,
  getNormalizedFmtText,
  getCleanFmtText
} from '../src';

describe('FmtText', () => {
  describe('fromString', () => {
    it('should convert a simple string to FmtText', () => {
      const text = 'Hello world';
      const fmtText = fromString(text);
      expect(fmtText).toHaveLength(3);
      expect(fmtText[0]).toEqual(newTextToken('Hello'));
      expect(fmtText[1]).toEqual(newGlueToken());
      expect(fmtText[2]).toEqual(newTextToken('world'));
    });

    it('should handle multiple spaces', () => {
      const text = 'Hello  world';
      const fmtText = fromString(text);
      expect(fmtText).toHaveLength(4);
      expect(fmtText[0]).toEqual(newTextToken('Hello'));
      expect(fmtText[1]).toEqual(newGlueToken());
      expect(fmtText[2]).toEqual(newGlueToken());
      expect(fmtText[3]).toEqual(newTextToken('world'));
    });
    
    it('should handle tabs and newlines', () => {
        const text = 'A\tB\nC';
        const fmtText = fromString(text);
        expect(fmtText).toHaveLength(5);
        expect(fmtText[1]).toEqual(newGlueToken());
        expect(fmtText[3]).toEqual(newGlueToken());
        expect(getPlainText(fmtText)).toBe('A B C');
    });
  });

  describe('getPlainText', () => {
    it('should return plain text for FmtText', () => {
      const fmtText = [
        newTextToken('Hello'),
        newGlueToken(),
        newTextToken('world')
      ];
      expect(getPlainText(fmtText)).toBe('Hello world');
    });
    
    it('should handle empty tokens', () => {
        const fmtText = [
            newTextToken('Hello'),
            { type: 'empty' } as any,
            newTextToken('world')
        ];
        expect(getPlainText(fmtText)).toBe('Helloworld');
    });
  });

  describe('CompactFmtText conversions', () => {
    it('should convert from compact format string', () => {
       const compact = 'Hello world';
       const fmtText = fromCompactFmtText(compact);
       expect(getPlainText(fmtText)).toBe('Hello world');
       expect(fmtText).toHaveLength(3);
    });

    it('should convert from compact format array', () => {
        const compact = ['Hello', newGlueToken(), 'world'];
        const fmtText = fromCompactFmtText(compact);
        expect(getPlainText(fmtText)).toBe('Hello world');
        expect(fmtText).toHaveLength(3);
     });

    it('should convert to compact format', () => {
        const fmtText = [
            newTextToken('Hello'),
            newGlueToken(),
            newTextToken('world')
        ];
        const compact = toCompactFmtText(fmtText);
        expect(compact).toEqual('Hello world');
    });

    it('should convert to compact format with marks', () => {
        const fmtText = [
            newTextToken('Hello'),
            newMarkToken('test'),
            newTextToken('world')
        ];
        const compact = toCompactFmtText(fmtText);
        expect(compact).toEqual(['Hello', newMarkToken('test'), 'world']);
    });
  });

  describe('getNormalizedFmtText', () => {
      it('should normalize tokens', () => {
          const fmtText = [
              { type: 'text', text: 'Hello', fontSize: 1, fontStyle: '' } as any
          ];
          const normalized = getNormalizedFmtText(fmtText);
          expect(normalized[0]).toEqual({ type: 'text', text: 'Hello' });
      });
  });

  describe('getCleanFmtText', () => {
      it('should remove empty tokens', () => {
          const fmtText = [
              newTextToken('Hello'),
              { type: 'empty' } as any,
              newTextToken(''),
              newGlueToken(0),
              newTextToken('world')
          ];
          const clean = getCleanFmtText(fmtText);
          expect(clean).toHaveLength(2);
          expect(getPlainText(clean)).toBe('Helloworld');
      });
  });
});
