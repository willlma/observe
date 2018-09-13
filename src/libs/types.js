// @flow
/* eslint-disable no-use-before-define */
import StyleSheetPropType from 'react-native/Libraries/StyleSheet/StyleSheetPropType';
import ViewStylePropTypes from 'react-native/Libraries/Components/View/ViewStylePropTypes';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';

type State = {|
  +selectedOccurrences: number[],
  +selectedSentenceId: number,
  +sentences: Sentence[],
|}
export type Action = { +type: string };
type Dispatch = (action: Action | ThunkAction | Promise<Action>) => any;
type GetState = () => State
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export const Style = StyleSheetPropType(ViewStylePropTypes);
export type Navigation = NavigationScreenProp<NavigationRoute>

export type Diff = { substring: string, ids: number[] };
export type Comparison = { commonSubstr: string, diffs: Diff[] };
export type Datum = { x: string, y: number };
export type Occurrence = { time: Date, quantities: number[] };
export type Sentence = {id: number, text: string, occurrences: Occurrence[] };
