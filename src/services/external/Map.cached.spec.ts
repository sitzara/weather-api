import { Address } from '@interfaces/weather.interface';
import Map from './Map.cached';

jest.mock('config', () => ({
  get: jest.fn().mockImplementation(() => ''),
}));

describe('Map.cached', () => {
  describe('getCacheKey', () => {
    test('should return cache key', () => {
      const address: Address = { street: 'Wall Street', streetNumber: '56', town: 'New York', country: 'USA', postalCode: '10005' };
      const cacheKey = new Map().getCacheKey(address);
      expect(cacheKey).toBe('USA+10005+Wall+Street+56+New+York');
    });
  });
});
