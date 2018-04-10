// @flow
import { AsyncStorage } from 'react-native';

export const getItem = (key: string) =>
  AsyncStorage.getItem(key).then((item) => (item ? JSON.parse(item) : item));

export const setItem = (key: string, value: any) =>
  AsyncStorage.setItem(key, JSON.stringify(value));

// TODO: Make this use localStorage (and promisify functions) if in web environment
