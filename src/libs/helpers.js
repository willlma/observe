// @flow
import chrono from 'chrono-node';
import moment from 'moment';
import { cloze, day, Regex } from 'src/libs/constants';
import type { Occurrence, Sentence } from 'src/libs/types';

export const showBlanks = (text: string) =>
  text.replace(cloze.word, '[…]').replace(cloze.digit, 'x');

export const getSentence = (id: number, sentences: Sentence[]) =>
  sentences.find((sen) => sen.id === id) || { occurrences: [] };

export const lastOccurrence = (sentence: Sentence) => {
  const { occurrences } = sentence;
  return occurrences[occurrences.length - 1];
};

export const lastOccurrenceText = (occurrence: Occurrence, sentence: Sentence) =>
  sentence.text.replace(cloze.digit, occurrence.quantities[0].toString());

export function replaceNumbersAndTime(text: string) {
  const quantities: number[] = [];
  const times = chrono.parse(text);
  let time = new Date();
  if (times.length) {
    // TODO: if (times.length > 1) create alert
    time = times[0].start.date();
    if (time > new Date()) {
      const subtract = moment(time) > moment().endOf(day) ? 'week' : day;
      time = moment(time).subtract(1, subtract).toDate();
      // TODO: alert if time is in the future
    }
    text = text.replace(times[0].text, '');
  }
  text = text.trim().replace(Regex.number, (match) => {
    quantities.push(Number.parseFloat(match));
    return cloze.digit;
  });
  if (!quantities.length) quantities.push(1);
  return { genericText: text, quantities, time };
}

export function removeIndices(array: Array<any>, indices: number[]): Array<any> {
  let i = 0;
  indices.sort();
  return array.filter((item, index) => {
    if (indices[i] !== index) return true;
    i++;
    return false;
  });
}

export const sortOccurrences = (occurrences: Occurrence[]) =>
  occurrences.sort((a, b) => b.time - a.time);
