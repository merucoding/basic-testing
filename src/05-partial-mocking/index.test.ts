// Ваша задача — использовать API Jest для частичной имитации содержимого модуля.
import { mockOne, mockThree, mockTwo, unmockedFunction} from './index';
// import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule = jest.requireActual<typeof import('./index')>('./index');

  return {
    __esModule: true,
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
    jest.resetAllMocks();
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});

    mockOne();
    mockTwo();
    mockThree();

    expect(spy).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    const spy = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(spy).toHaveBeenCalledWith('I am not mocked');
  });
});
