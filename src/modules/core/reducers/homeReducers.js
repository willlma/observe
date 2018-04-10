// @flow
import ActionTypes from 'src/libs/actionTypes';
import cloneDeep from 'lodash/cloneDeep';
import type { Sentence, Comparison, Action } from 'src/libs/types';

export function sentences(state: Sentence[] = [], action: Action) {
  switch (action.type) {
    case ActionTypes.sentences: return cloneDeep(action.sentences);
    case ActionTypes.appendSentence: {
      const { text, timestamp, quantities } = action;
      const newState = cloneDeep(state);
      newState.push({
        text,
        occurrences: [{ timestamp, quantities }],
        id: state.length + 1
      });
      return newState;
    }
    case ActionTypes.mergeSentence: {
      const { index, timestamp, quantities } = action;
      const newState = cloneDeep(state);
      newState[index].occurrences.push({ timestamp, quantities });
      return newState;
    }
    default: return state;
  }
}

export function selectedSentenceId(state: ?number = null, action: Action) {
  switch (action.type) {
    case ActionTypes.selectedSentenceId: return action.id;
    default: return state;
  }
}
