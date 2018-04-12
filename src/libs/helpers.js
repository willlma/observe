// @flow
import { cloze } from 'src/libs/constants';

export const showBlanks = (text: string) =>
  text.replace(cloze.word, '[…]').replace(cloze.digit, 'x');
