// @flow
import ActionTypes from 'src/libs/actionTypes';
import cloneDeep from 'lodash/cloneDeep';
import type { Sentence } from 'src/libs/types';

type SentencesAction =
  | { type: typeof ActionTypes.sentences, sentences: Sentence[] }
  | {
      type: typeof ActionTypes.addSentence | typeof ActionTypes.updateSentence,
      index: number,
      sentence: Sentence,
    }

export function sentences(
  state: Sentence[] = [],
  action: SentencesAction
): Sentence[] {
  switch (action.type) {
    case ActionTypes.sentences:
      return cloneDeep(action.sentences);
    case ActionTypes.addSentence: {
      const { sentence } = action;
      const newState = cloneDeep(state);
      newState.push(cloneDeep(sentence));
      return newState;
    }
    case ActionTypes.updateSentence: {
      const { index, sentence } = action;
      const newState = cloneDeep(state);
      newState[index] = cloneDeep(sentence);
      return newState;
    }
    default:
      return state;
  }
}


type selectAction = {type: typeof ActionTypes.selectedSentenceId, id: number };
export function selectedSentenceId(
  state: ?number = null,
  action: selectAction
): ?number {
  switch (action.type) {
    case ActionTypes.selectedSentenceId:
      return action.id;
    default:
      return state;
  }
}
