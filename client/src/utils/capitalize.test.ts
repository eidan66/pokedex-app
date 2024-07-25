import { capitalizeFirstLetter } from './capitalize';

describe('capitalizeFirstLetter', () => {
  it('should capitalize the first letter of a given string', () => {
    expect(capitalizeFirstLetter('hello')).toBe('Hello');
  });

  it('should return the same string if the first letter is already capitalized', () => {
    expect(capitalizeFirstLetter('Hello')).toBe('Hello');
  });

  it('should handle an empty string', () => {
    expect(capitalizeFirstLetter('')).toBe('');
  });

  it('should handle a single character string', () => {
    expect(capitalizeFirstLetter('a')).toBe('A');
    expect(capitalizeFirstLetter('A')).toBe('A');
  });

  it('should return the input if it is not a string', () => {
    // @ts-ignore: TypeScript will give a type error, but we're testing edge cases here
    expect(capitalizeFirstLetter(123)).toBe(123);
    // @ts-ignore: TypeScript will give a type error, but we're testing edge cases here
    expect(capitalizeFirstLetter(null)).toBe(null);
    // @ts-ignore: TypeScript will give a type error, but we're testing edge cases here
    expect(capitalizeFirstLetter(undefined)).toBe(undefined);
  });
});
