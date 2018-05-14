// @flow
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import type { Action, Sentence } from 'src/libs/types';
import { lastOccurrence, lastOccurrenceText } from 'src/libs/helpers';
import SentenceComponent from './sentence';

type Props = {
  navigate: Function,
  sentences: Sentence[],
  selectSentence: (number) => Action
};

export default class SentenceList extends PureComponent<Props> {
  render() {
    const { sentences } = this.props;
    if (!sentences.length) return null;
    return <View>{sentences.sort(this.timeSort).map(this.renderSentence)}</View>;
  }

  timeSort = (a: Sentence, b: Sentence) =>
    lastOccurrence(a).time - lastOccurrence(b).time

  renderSentence = (sentence: Sentence) => {
    const { navigate, selectSentence } = this.props;
    const occurrence = lastOccurrence(sentence);

    return (
      <SentenceComponent
        key={`sentence-${sentence.id}`}
        id={sentence.id}
        navigate={navigate}
        occurrence={occurrence}
        selectSentence={selectSentence}
        text={lastOccurrenceText(occurrence, sentence)}
      />
    );
  }
}
