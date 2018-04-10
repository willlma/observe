export type Action = { type: string };
export type Diff = { substring: string, ids: number[] };
export type Comparison = { commonSubstr: string, diffs: Diff[] };
export type Datum = { x: string, y: number };
export type Sentence = {text: string, timestamp: number};
