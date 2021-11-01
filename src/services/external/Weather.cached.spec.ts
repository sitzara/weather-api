import { ExternalAddressData } from './interfaces/map.interface';
import Weather from './Weather.cached';

jest.mock('config', () => ({
  get: jest.fn().mockImplementation(() => ''),
}));

describe('Map.cached', () => {
  describe('getCacheKey', () => {
    test('should return cache key', () => {
      const externalDataAddress: ExternalAddressData = { lon: '-74.0088', lat: '40.706' };
      const cacheKey = new Weather().getCacheKey(externalDataAddress);
      expect(cacheKey).toBe('-74.0088+40.706');
    });
  });
});
