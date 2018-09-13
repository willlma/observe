//@flow
import ActionTypes from 'src/libs/actionTypes';
import {
  lastOccurrence,
  removeIndices,
  replaceNumbersAndTime,
  sortOccurrences
} from 'src/libs/helpers';
import type { Occurrence, Navigation, ThunkAction } from 'src/libs/types';
import { isDiscrete } from '../selectors/detailedChartsSelectors';
import { deleteSentences } from './actionCreators';

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
  sortOccurrences(sentence.occurrences);
  dispatch({ type: ActionTypes.updateSentence, index, sentence });
};

export const updateText = (text: string): ThunkAction => (dispatch, getState) => {
  const { index, sentence } = getIndexAndSentence(getState());
  const { genericText, quantities } = replaceNumbersAndTime(text);
  sentence.text = genericText;
  lastOccurrence(sentence).quantities = quantities;
  dispatch({ type: ActionTypes.updateSentence, index, sentence });
};

export const toggleOccurrenceSelected = (index: number): ThunkAction => (
  dispatch,
  getState
) => {
  const { selectedOccurrences } = getState();
  // Dislike this variable name. selectedOccurrences is an array of indices
  const indexIndex = selectedOccurrences.indexOf(index);
  if (indexIndex === -1) selectedOccurrences.push(index);
  else selectedOccurrences.splice(indexIndex, 1);
  dispatch({
    type: ActionTypes.selectedOccurrenceIndices,
    indices: selectedOccurrences
  });
};

export const addOccurrence = (): ThunkAction =>
  (dispatch, getState) => {
    const state = getState();
    const { index, sentence } = getIndexAndSentence(state);
    const quantity = isDiscrete(state) ? 1 : 0;

    sentence.occurrences.push({ time: new Date(), quantities: [quantity] });
    sortOccurrences(sentence.occurrences);
    dispatch({ type: ActionTypes.updateSentence, index, sentence });
  };

export const clearSelectedOccurrences = () => ({
  type: ActionTypes.selectedOccurrenceIndices,
  indices: []
});

export const deleteSentence = (navigation: Navigation): ThunkAction => (
  dispatch,
  getState
) => {
  const { index } = getIndexAndSentence(getState());
  navigation.pop();
  dispatch(deleteSentences([index]));
};


export const deleteSelectedOccurrences = (navigation: Navigation): ThunkAction => (
  dispatch,
  getState
) => {
  const state = getState();
  const { selectedOccurrences } = state;
  const { index, sentence } = getIndexAndSentence(state);
  if (selectedOccurrences.length === sentence.occurrences.length) {
    dispatch(deleteSentence(navigation));
  } else {
    sentence.occurrences = removeIndices(sentence.occurrences, selectedOccurrences);
    dispatch({ type: ActionTypes.updateSentence, index, sentence });
  }
  dispatch(clearSelectedOccurrences());
};
