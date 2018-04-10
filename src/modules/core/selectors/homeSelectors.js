import { createSelector } from 'reselect';

const getId = (state) => state.selectedSentenceId;
export const getSentences = (state) => state.sentences;

export const getSentence = createSelector(
  getId,
  getSentences,
  (id, sentences) => sentences.find((sen) => sen.id === id)
);
