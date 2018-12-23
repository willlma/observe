// @flow

import { Platform } from 'react-native';

export const cloze = {
  word: '\\w',
  digit: '\\d'
};

export const Regex = {
  wordEnds: /\w\b/g,
  number: /[\d.]+/
};

export const splitter = ' ';
export const day = 'day';
export const android = Platform.OS === 'android';
const iosName = 'ios';
export const ios = Platform.OS === iosName;
export const iconPrefix = `${ios ? iosName : 'md'}-`;
