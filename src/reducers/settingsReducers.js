// @flow
import ActionTypes from 'src/libs/actionTypes';

type Is24HourAction = {
  type: typeof ActionTypes.is24Hour,
  is24Hour: boolean
};
export const is24Hour = (state: boolean = false, action: Is24HourAction) => {
  switch (action.type) {
    case ActionTypes.is24Hour: return action.is24Hour;
    default: return state;
  }
};
