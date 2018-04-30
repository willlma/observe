// @flow
export type Action = {| type: string |};
export type Diff = { substring: string, ids: number[] };
export type Comparison = { commonSubstr: string, diffs: Diff[] };
export type Datum = { x: string, y: number };
export type Occurrence = { time: Date, quantities: number[] };
export type Sentence = {id: number, text: string, occurrences: Occurrence[] };
