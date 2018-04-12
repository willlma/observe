// @flow
import ActionTypes from 'src/libs/actionTypes';
import cloneDeep from 'lodash/cloneDeep';
import type { Sentence, Action } from 'src/libs/types';

type sentencesAction = Action & {
  sentences?: Sentence[],
  quantities?: number[],
  text?: string,
  timestamp?: number,
  index?: number
}

export function sentences(state: Sentence[] = [], action: sentencesAction) {
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

type selectAction = Action & { id: number };
export function selectedSentenceId(state: ?number = null, action: selectAction) {
  switch (action.type) {
    case ActionTypes.selectedSentenceId: return action.id;
    default: return state;
  }
}
