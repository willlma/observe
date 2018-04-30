// @flow
import { cloze } from 'src/libs/constants';
import type { Sentence } from 'src/libs/types';

export const showBlanks = (text: string) =>
  text.replace(cloze.word, '[…]').replace(cloze.digit, 'x');

export const getSentence = (id: number, sentences: Sentence[]) =>
  sentences.find((sen) => sen.id === id);
