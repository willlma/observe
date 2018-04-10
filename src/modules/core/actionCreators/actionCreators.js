// @flow
import ActionTypes from 'src/libs/actionTypes';
import { getItem } from 'src/services/storage';

export function startup() {
  return (dispatch: Function) => {
    getItem('sentences').then((sentences) => {
      if (sentences) dispatch({ type: ActionTypes.sentences, sentences });
    });
  };
}

export function addSentence(text: string, quantities: number[]) {
  return (dispatch: Function, getState: Function) => {
    const { sentences } = getState();
    const timestamp = Date.now();
    const index = sentences.findIndex((sen) => sen.text === text);
    if (!quantities.length) quantities = [1];
    if (index !== -1) {
      dispatch({ type: ActionTypes.mergeSentence, index, timestamp, quantities });
    } else {
      dispatch({ type: ActionTypes.appendSentence, text, timestamp, quantities });
    }
  };
}

export const selectSentence = (id: number) => (
  { type: ActionTypes.selectedSentenceId, id }
);
