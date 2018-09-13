// @flow
import ActionTypes from 'src/libs/actionTypes';
import { getItem } from 'src/services/storage';
import {
  removeIndices,
  replaceNumbersAndTime,
  sortOccurrences
} from 'src/libs/helpers';
import type { ThunkAction } from 'src/libs/types';

export const startup = (): ThunkAction => (dispatch) => {
  return getItem('sentences').then((sentences) => {
    console.dir(sentences);
    if (sentences) {
      sentences = sentences.map((sentence) => ({
        ...sentence,
        occurrences: sentence.occurrences.map((occurrence) => ({
          ...occurrence,
          time: new Date(occurrence.time)
        }))
      }));
      dispatch({ type: ActionTypes.sentences, sentences });
      // dispatch(selectSentence(1));
    }
    // dispatch({ type: ActionTypes.storageReady, storageReady: true });
  }).catch((err) => {
    console.log('failed to get sentences from local storage. Error:');
    console.log(err);
  });
};

export const addSentence = (text: string): ThunkAction => (dispatch, getState) => {
  const { genericText, quantities, time } = replaceNumbersAndTime(text);
  const { sentences } = getState();
  const index = sentences.findIndex((sen) => sen.text === genericText);
  if (index !== -1) {
    const sentence = sentences[index];
    sentence.occurrences.push({ time, quantities });
    sortOccurrences(sentence.occurrences);
    dispatch({ type: ActionTypes.updateSentence, index, sentence });
  } else {
    dispatch({
      type: ActionTypes.addSentence,
      index,
      sentence: {
        id: sentences.length + 1,
        occurrences: [{ time, quantities }],
        text: genericText,
      }
    });
  }
};

export const selectSentence = (id: number) => (
  { type: ActionTypes.selectedSentenceId, id }
);

export const deleteSentences = (indices: number[]): ThunkAction =>
  (dispatch, getState) => {
    let { sentences } = getState();
    sentences = removeIndices(sentences, indices);
    dispatch({ type: ActionTypes.sentences, sentences });
  };
