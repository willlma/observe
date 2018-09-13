// @flow
import ActionTypes from 'src/libs/actionTypes';
import type { Action } from 'src/libs/types';

type occurrenceIndicesAction = {
  type: typeof ActionTypes.selectedOccurrenceIndices,
  indices: number[]
};

export function selectedOccurrences(
  state: number[] = [],
  action: occurrenceIndicesAction
) {
  switch (action.type) {
    case ActionTypes.selectedOccurrenceIndices: return [...action.indices];
    default: return state;
  }
}
