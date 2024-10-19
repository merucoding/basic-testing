// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
// import { readFileAsynchronously, } from '.';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

jest.mock('path');
jest.mock('fs');
jest.mock('fs/promises');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const mockCallback = jest.fn();
    doStuffByTimeout(mockCallback, 2000);
    expect(setTimeout).toHaveBeenCalledWith(mockCallback, 2000);
  });

  test('should call callback only after timeout', () => {
    const mockCallback = jest.fn();
    doStuffByTimeout(mockCallback, 2000);
    jest.advanceTimersByTime(2000);
    expect(mockCallback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const mockCallback = jest.fn();
    doStuffByInterval(mockCallback, 2000);
    expect(setInterval).toHaveBeenCalledWith(mockCallback, 2000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mockCallback = jest.fn();
    doStuffByInterval(mockCallback, 2000);

    jest.advanceTimersByTime(2000);
    expect(mockCallback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(2000);
    expect(mockCallback).toHaveBeenCalledTimes(2); 
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const spyJoin = jest.spyOn(path, 'join');
    await readFileAsynchronously('text.txt');
    expect(spyJoin).toHaveBeenCalledWith(__dirname, 'text.txt');
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const res = await readFileAsynchronously('text.txt');
    expect(res).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsPromises, 'readFile').mockResolvedValue('Hello');

    const res = await readFileAsynchronously('text.txt');
    expect(res).toBe('Hello');
  });
});
