// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  // add two numbers
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: -2, b: 8, action: Action.Add, expected: 6 },
  // substrack two numbers
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: -2, b: 8, action: Action.Subtract, expected: -10 },
  { a: -8, b: -2, action: Action.Subtract, expected: -6 },
  // multiply two numbers
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: -2, b: 3, action: Action.Multiply, expected: -6 },
  { a: 1, b: 0, action: Action.Multiply, expected: 0 },
  // divide two numbers
  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 3, b: 6, action: Action.Divide, expected: 0.5 },
  { a: 0, b: 3, action: Action.Divide, expected: 0 },
  // exponentiate two numbers
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: -2, b: 3, action: Action.Exponentiate, expected: -8 },
  // return null for invalid action
  { a: 9, b: 3, action: '%', expected: null },
  { a: 9, b: 3, action: null, expected: null },
  { a: 9, b: 3, action: undefined, expected: null },
  { a: 9, b: 3, action: '', expected: null },
  { a: 9, b: 3, action: 'remainder', expected: null },
  { a: 9, b: 3, action: true, expected: null },
  { a: 9, b: 3, action: false, expected: null },
  // return null for invalid arguments
  { a: '', b: 3, action: Action.Add, expected: null },
  { a: true, b: 3, action: Action.Subtract, expected: null },
  { a: 'false', b: 3, action: Action.Multiply, expected: null },
  { a: null, b: 3, action: Action.Divide, expected: null },
  { a: undefined, b: 3, action: Action.Divide, expected: null },
  { a: '9', b: 3, action: Action.Divide, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('Numbers $a and $b in the action $action should return $expected', ({a, b, action, expected}) => {
    expect(simpleCalculator({a, b, action})).toBe(expected);
  });
});
