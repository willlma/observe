//@flow
import ActionTypes from 'src/libs/actionTypes';
import { lastOccurrence, replaceNumbersAndTime } from 'src/libs/helpers';
import type { ThunkAction, Occurrence } from 'src/libs/types';

const getIndexAndSentence = (state) => {
  const { selectedSentenceId, sentences } = state;
  const index = sentences.findIndex((sen) => sen.id === selectedSentenceId);
  const sentence = sentences[index];
  return { index, sentence };
};

export const updateOccurrence = (
  occurrenceIndex: number,
  occurrence: Occurrence
): ThunkAction => (dispatch, getState) => {
  const { index, sentence } = getIndexAndSentence(getState());
  sentence.occurrences[occurrenceIndex] = occurrence;
  dispatch({ type: ActionTypes.updateSentence, index, sentence });
};

export const updateText = (text: string): ThunkAction => (dispatch, getState) => {
  const { index, sentence } = getIndexAndSentence(getState());
  const { genericText, quantities } = replaceNumbersAndTime(text);
  sentence.text = genericText;
  lastOccurrence(sentence).quantities = quantities;
  dispatch({ type: ActionTypes.updateSentence, index, sentence });
};
