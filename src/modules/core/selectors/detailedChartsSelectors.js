// @flow
import { createSelector } from 'reselect';
import moment from 'moment';
import { cloze, day, splitter } from 'src/libs/constants';
import { getSentence, getSentences } from './homeSelectors';

const getWords = ({ text = '' }) => text.split(splitter);

const getPointer = (baseWords, words) => {
  const index = words.findIndex((word, i) => baseWords[i] !== word);
  return index !== -1 && index;
};

const getSubstr = (words, start, fromEnd) =>
  words.slice(start, fromEnd ? -fromEnd : undefined).join(splitter);

const toArray = (comparisons) =>
  Object.keys(comparisons).map((commonSubstr) => ({
    commonSubstr,
    diffs: Object.keys(comparisons[commonSubstr]).map((substring) => ({
      substring,
      ids: comparisons[commonSubstr][substring]
    }))
  })).sort((a, b) => b.commonSubstr.length - a.commonSubstr.length);

export const getComparisons = createSelector(
  getSentence,
  getSentences,
  (sentence, sentences) => {
    if (!sentence) return [];
    const comparisons = {};
    const baseWords = getWords(sentence);
    sentences.forEach((sen) => {
      const words = getWords(sen);
      const pointer = getPointer(baseWords, words);

      if (!pointer) return;

      let commonSubstr = baseWords.slice(0, pointer).join(splitter);
      const reversePointer = getPointer(
        [...baseWords].reverse(),
        [...words].reverse()
      );
      const baseSubstr = getSubstr(baseWords, pointer, reversePointer);
      const diffSubstr = getSubstr(words, pointer, reversePointer);

      if (reversePointer) {
        const sentenceEnd = baseWords.slice(-reversePointer).join(splitter);
        commonSubstr += ` ${cloze.word}  ${sentenceEnd}`;
      }

      if (!comparisons[commonSubstr]) {
        comparisons[commonSubstr] = { [baseSubstr]: [sentence.id] };
      }

      if (!comparisons[commonSubstr][diffSubstr]) {
        comparisons[commonSubstr][diffSubstr] = [];
      }

      comparisons[commonSubstr][diffSubstr].push(sen.id);
    });
    return toArray(comparisons);
  }
);


export const getWeekData = createSelector(getSentence, (sentence) => {
  const weekData = [];
  const daysPerWeek = 7;
  const weekAgo = moment().startOf(day).subtract(daysPerWeek - 1, day);
  for (let i = daysPerWeek; i--;) {
    weekData.push({ x: moment().subtract(i, day).format('dd'), y: 0 });
  }
  sentence.occurrences.forEach(({ time, quantities }) => {
    const date = moment(time).startOf(day);
    if (date.isBefore(weekAgo)) return;
    const index = daysPerWeek - 1 - moment().startOf(day).diff(date, day);
    weekData[index].y += quantities[0];
  });
  return weekData;
});

export const isDiscrete = createSelector(getSentence, ({ occurrences }) =>
  occurrences.every(
    ({ quantities }) => quantities.length === 1 && quantities[0] === 1
  )
);
