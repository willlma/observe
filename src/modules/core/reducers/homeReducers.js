// @flow
import ActionTypes from 'src/libs/actionTypes';
import cloneDeep from 'lodash/cloneDeep';
import type { Sentence, Action } from 'src/libs/types';

type SentencesAction =
  | { type: typeof ActionTypes.sentences, sentences: Sentence[] }
  | {
      type: typeof ActionTypes.appendSentence,
      quantities: number[],
      text: string,
      time: Date,
    }
  | {
      type: typeof ActionTypes.mergeSentence,
      index: number,
      quantities: number[],
      time: Date,
    }

export function sentences(state: Sentence[] = [], action: SentencesAction) {
  switch (action.type) {
    case ActionTypes.sentences: return cloneDeep(action.sentences);
    case ActionTypes.appendSentence: {
      const { text, time, quantities } = action;
      const newState = cloneDeep(state);
      newState.push({
        text,
        occurrences: [{ time, quantities }],
        id: state.length + 1
      });
      return newState;
    }
    case ActionTypes.mergeSentence: {
      const { index, time, quantities } = action;
      const newState = cloneDeep(state);
      newState[index].occurrences.push({ time, quantities });
      return newState;
    }
    default: return state;
  }
}

type selectAction = Action & { id: number };
export function selectedSentenceId(state: ?number = null, action: selectAction) {
  switch (action.type) {
    case ActionTypes.selectedSentenceId: return action.id;
    default: return state;
  }
}
