const { performOperation, toNumber, parseArgs, modulo, power, squareRoot } = require('../calculator');

describe('Calculator basic operations', () => {
  test('2 + 3 = 5', () => {
    expect(performOperation('+', 2, 3)).toBe(5);
    expect(performOperation('add', 2, 3)).toBe(5);
  });

  test('10 - 4 = 6', () => {
    expect(performOperation('-', 10, 4)).toBe(6);
    expect(performOperation('subtract', 10, 4)).toBe(6);
  });

  test('45 * 2 = 90', () => {
    expect(performOperation('*', 45, 2)).toBe(90);
    expect(performOperation('multiply', 45, 2)).toBe(90);
  });

  test('20 / 5 = 4', () => {
    expect(performOperation('/', 20, 5)).toBe(4);
    expect(performOperation('divide', 20, 5)).toBe(4);
  });
});

describe('Calculator edge cases and parsing', () => {
  test('Division by zero throws', () => {
    expect(() => performOperation('/', 5, 0)).toThrow(/Division by zero/);
  });

  test('Floating point arithmetic', () => {
    expect(performOperation('+', 2.5, 1.2)).toBeCloseTo(3.7, 8);
    expect(performOperation('/', 1, 3)).toBeCloseTo(0.3333333333, 8);
  });

  test('toNumber converts valid numbers and rejects invalid', () => {
    expect(toNumber('3.14')).toBeCloseTo(3.14);
    expect(toNumber('abc')).toBeNull();
    expect(toNumber('')).toBeNull();
  });

  test('parseArgs supports both forms', () => {
    expect(parseArgs(['+', '2', '3'])).toEqual({ op: '+', aArg: '2', bArg: '3' });
    expect(parseArgs(['2', '+', '3'])).toEqual({ op: '+', aArg: '2', bArg: '3' });
    expect(parseArgs(['add', '2', '3'])).toEqual({ op: 'add', aArg: '2', bArg: '3' });
  });

  test('parseArgs throws on bad args', () => {
    expect(() => parseArgs([])).toThrow();
    expect(() => parseArgs(['1'])).toThrow();
    expect(() => parseArgs(['1','2'])).toThrow();
  });
});

// Extended operations tests: modulo, power, squareRoot
describe('Extended operations: modulo, power, square root', () => {
  test('5 % 2 = 1 (modulo)', () => {
    expect(modulo(5, 2)).toBe(1);
    expect(performOperation('%', 5, 2)).toBe(1);
    expect(performOperation('mod', 5, 2)).toBe(1);
  });

  test('Modulo by zero throws', () => {
    expect(() => modulo(5, 0)).toThrow(/Division by zero/);
    expect(() => performOperation('%', 5, 0)).toThrow(/Division by zero/);
  });

  test('2 ^ 3 = 8 (power)', () => {
    expect(power(2, 3)).toBe(8);
    expect(performOperation('**', 2, 3)).toBe(8);
    expect(performOperation('^', 2, 3)).toBe(8);
    expect(performOperation('pow', 2, 3)).toBe(8);
  });

  test('square root of 16 = 4', () => {
    expect(squareRoot(16)).toBe(4);
    expect(performOperation('sqrt', 16)).toBe(4);
  });

  test('square root of negative number throws', () => {
    expect(() => squareRoot(-9)).toThrow(/Square root of negative/);
    expect(() => performOperation('sqrt', -9)).toThrow(/Square root of negative/);
  });
});
