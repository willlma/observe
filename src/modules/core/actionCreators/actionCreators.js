// @flow
import chrono from 'chrono-node';
import moment from 'moment';
import ActionTypes from 'src/libs/actionTypes';
import { Regex, cloze } from 'src/libs/constants';
import { getItem } from 'src/services/storage';

export function startup() {
  return (dispatch: Function) => {
    console.log('startup');
    getItem('sentences').then((sentences) => {
      console.dir(sentences);
      if (sentences) {
        sentences = sentences.map((sentence) => ({
          ...sentence,
          occurrances: sentence.occurrences.map((occurrance) => ({
            ...occurrance,
            time: Date.parse(occurrance.time)
          }))
        }));
        dispatch({ type: ActionTypes.sentences, sentences });
      }
    }).catch((err) => {
      console.log('failed to get sentences from local storage. Error:');
      console.log(err);
    });
  };
}

function replaceNumbersAndTime(text) {
  const quantities: number[] = [];
  const times = chrono.parse(text);
  let time = new Date();
  if (times.length) {
    // TODO: if (times.length > 1) create alert
    time = times[0].start.date();
    if (time > new Date()) {
      time = moment(time).subtract(1, 'week').toDate();
    }
    text = text.replace(times[0].text, '');
  }
  text = text.trim().replace(Regex.number, (match) => {
    quantities.push(Number.parseFloat(match));
    return cloze.digit;
  });
  return { genericText: text, quantities, time };
}

export function addSentence(text: string) {
  return (dispatch: Function, getState: Function) => {
    const { genericText, quantities, time } = replaceNumbersAndTime(text);
    const { sentences } = getState();
    const index = sentences.findIndex((sen) => sen.text === genericText);
    if (!quantities.length) quantities.push(1);
    if (index !== -1) {
      dispatch({ type: ActionTypes.mergeSentence, index, time, quantities });
    } else {
      dispatch({
        type: ActionTypes.appendSentence,
        quantities,
        text: genericText,
        time,
      });
    }
  };
}

export const selectSentence = (id: number) => (
  { type: ActionTypes.selectedSentenceId, id }
);
