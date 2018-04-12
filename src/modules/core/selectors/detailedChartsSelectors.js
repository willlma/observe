// @flow
import { createSelector } from 'reselect';
import moment from 'moment';
import { cloze } from 'src/libs/constants';
import { getSentence, getSentences } from './homeSelectors';

const splitter = ' ';

const getWords = ({ text }) => text.split(splitter);

function getPointer(baseWords, words) {
  let pointer;
  words.every((word, i) => {
    if (baseWords[i] === word) return true;
    pointer = i;
    return false;
  });
  return pointer;
}

const getSubstr = (words, start, fromEnd) =>
  words.slice(start, fromEnd ? -fromEnd : undefined).join(splitter);

const toArray = (comparisons) =>
  Object.keys(comparisons)
    .map((commonSubstr) => ({
      commonSubstr,
      diffs: Object.keys(comparisons[commonSubstr]).map((substring) => ({
        substring,
        ids: comparisons[commonSubstr][substring]
      }))
    }))
    .sort((a, b) => b.commonSubstr.length - a.commonSubstr.length);

export const getComparisons = createSelector(getSentence, getSentences, (sentence, sentences) => {
  if (!sentence) return [];
  const comparisons = {};
  const baseWords = getWords(sentence);
  sentences.forEach((sen) => {
    const words = getWords(sen);
    const pointer = getPointer(baseWords, words);

    if (!pointer) return;

    let commonSubstr = baseWords.slice(0, pointer).join(splitter);
    const reversePointer = getPointer([...baseWords].reverse(), [...words].reverse());
    const baseSubstr = getSubstr(baseWords, pointer, reversePointer);
    const diffSubstr = getSubstr(words, pointer, reversePointer);

    if (reversePointer) {
      commonSubstr += ` ${cloze.word}  ${baseWords.slice(-reversePointer).join(splitter)}`;
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
});

export const getWeekData = createSelector(getSentence, (sentence) => {
  const weekData = [];
  const daysPerWeek = 7;
  const weekAgo = moment().startOf('day').subtract(daysPerWeek - 1, 'days');
  for (let i = daysPerWeek; i--;) {
    weekData.push({ x: moment().subtract(i, 'days').format('dd'), y: 0 });
  }
  sentence.occurrences.forEach(({ timestamp, quantities }) => {
    const time = moment(timestamp);
    if (time.isBefore(weekAgo)) return;
    const index = daysPerWeek - 1 - moment().diff(time, 'days');
    weekData[index].y += quantities[0];
  });
  return weekData;
});
