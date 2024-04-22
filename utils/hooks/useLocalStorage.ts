import { ILocalStorageKeys } from '@lib/generalTypes';

export const localStorageKeys: ILocalStorageKeys = {
  storageUUID: 'NWTCOllX2k',
  storageUserName: 'WS3j8Gyz8Q',
};

export const useLocalStorage = () => {
  /**
   * Sets a value to a key in `localStorage`
   * @param key Desired key to change
   * @param value The desired raw value, the function will handle parsing it
   */
  const set = <T>(key: keyof ILocalStorageKeys, value: T) => {
    localStorage.setItem(localStorageKeys[key], JSON.stringify(value));
  };
  /**
   * Gets a value from a key in `localStorage`
   * @param key Desired key to get
   * @param defaultValue if provided sets new key/value incase the desired key was not found
   */
  const get = <T>(key: keyof ILocalStorageKeys, defaultValue?: T) => {
    const value = localStorage.getItem(localStorageKeys[key]);
    if (value && typeof value !== 'undefined') {
      return JSON.parse(value) as T;
    }
    if (
      typeof defaultValue !== 'undefined' &&
      (typeof value === 'undefined' || !value)
    ) {
      set(key, defaultValue);
      return defaultValue;
    }
    return null;
  };

  const resetLocalStorage = () => {
    Object.entries(localStorageKeys).forEach(([k, v]) => {
      localStorage.removeItem(v);
    });
  };

  return { getValue: get, setValue: set, resetLocalStorage };
};
