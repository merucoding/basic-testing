// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({a: 1, b: 2, action: Action.Add})).toBe(3);
    expect(simpleCalculator({a: -2, b: 8, action: Action.Add})).toBe(6);

  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({a: 5, b: 2, action: Action.Subtract})).toBe(3);
    expect(simpleCalculator({a: -2, b: 8, action: Action.Subtract})).toBe(-10);
    expect(simpleCalculator({a: -8, b: -2, action: Action.Subtract})).toBe(-6);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({a: 1, b: 2, action: Action.Multiply})).toBe(2);
    expect(simpleCalculator({a: -2, b: 3, action: Action.Multiply})).toBe(-6);
    expect(simpleCalculator({a: 1, b: 0, action: Action.Multiply})).toBe(0);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({a: 8, b: 2, action: Action.Divide})).toBe(4);
    expect(simpleCalculator({a: 3, b: 6, action: Action.Divide})).toBe(0.5);
    expect(simpleCalculator({a: 0, b: 3, action: Action.Divide})).toBe(0);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({a: 3, b: 3, action: Action.Exponentiate})).toBe(27);
    expect(simpleCalculator({a: -2, b: 3, action: Action.Exponentiate})).toBe(-8);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({a: 9, b: 3, action: '%'})).toBeNull();
    expect(simpleCalculator({a: 9, b: 3, action: null})).toBeNull();
    expect(simpleCalculator({a: 9, b: 3, action: undefined})).toBeNull();
    expect(simpleCalculator({a: 9, b: 3, action: ''})).toBeNull();
    expect(simpleCalculator({a: 9, b: 3, action: 'remainder'})).toBeNull();
    expect(simpleCalculator({a: 9, b: 3, action: true})).toBeNull();
    expect(simpleCalculator({a: 9, b: 3, action: false})).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({a: '', b: 3, action: Action.Add})).toBeNull();
    expect(simpleCalculator({a: true, b: 3, action: Action.Subtract})).toBeNull();
    expect(simpleCalculator({a: 'false', b: 3, action: Action.Multiply})).toBeNull();
    expect(simpleCalculator({a: null, b: 3, action: Action.Divide})).toBeNull();
    expect(simpleCalculator({a: undefined, b: 3, action: Action.Divide})).toBeNull();
    expect(simpleCalculator({a: '9', b: 3, action: Action.Divide})).toBeNull();
  });
});
