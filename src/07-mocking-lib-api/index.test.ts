// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => {
  const originalModule = jest.requireActual('lodash');

  return {
    __esModule: true,
    ...originalModule,
    throttle: jest.fn((fn) => fn),
  };
});

const relativePath = 'posts';

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const spyAxios = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(relativePath);
    expect(spyAxios).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const axiosCreate = axios.create();
    jest.spyOn(axios, 'create').mockReturnValue(axiosCreate);
    const spy = jest.spyOn(axiosCreate, 'get').mockResolvedValue({ data: 'response' });

    await throttledGetDataFromApi(relativePath);
    expect(spy).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const axiosCreate = axios.create();
    jest.spyOn(axios, 'create').mockReturnValue(axiosCreate);
    jest.spyOn(axiosCreate, 'get').mockResolvedValue({ data: 'response' });

    const response = await throttledGetDataFromApi(relativePath);
    expect(response).toBe('response');
  });
});
