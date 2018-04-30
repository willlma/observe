import { createSelector } from 'reselect';
import { getSentence as findSentence } from 'src/libs/helpers';

const getId = (state) => state.selectedSentenceId;
export const getSentences = (state) => state.sentences;

export const getSentence = createSelector(getId, getSentences, findSentence);
