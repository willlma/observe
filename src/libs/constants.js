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
export const android = 'android';
export const ios = 'ios';
export const iconPrefix = `${Platform.OS === ios ? ios : 'md'}-`;
