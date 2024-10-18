// Uncomment the code below and write your tests
import { getBankAccount, InsufficientFundsError, TransferFailedError, SynchronizationFailedError } from '.';
import lodash from 'lodash';

const account1 = getBankAccount(500);
const account2 = getBankAccount(50);
const amount = 600;

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(account1.getBalance()).toBe(500);
    expect(account2.getBalance()).toBe(50);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account1.withdraw(amount)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account1.transfer(amount, account2)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account1.transfer(400, account1)).toThrow(TransferFailedError);
    expect(() => account2.transfer(10, account2)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    account1.deposit(500);
    expect(account1.getBalance()).toBe(1000);
  });

  test('should withdraw money', () => {
    account1.withdraw(200);
    expect(account1.getBalance()).toBe(800);
  });

  test('should transfer money', () => {
    account1.transfer(100, account2);
    expect(account1.getBalance()).toBe(700);
    expect(account2.getBalance()).toBe(150);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(lodash, 'random').mockReturnValue(1200);
    const res = await account1.fetchBalance();
    expect(typeof res).toBe('number');

    // console.log(res); 1200
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(lodash, 'random').mockReturnValue(1000);
    await account1.synchronizeBalance();
    expect(account1.getBalance()).toBe(1000);

    // console.log(account1.getBalance()); 1000
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(lodash, 'random').mockReturnValue(0);
    await expect(account1.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError);
  });
});
