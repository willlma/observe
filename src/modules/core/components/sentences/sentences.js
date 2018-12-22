// @flow
import React, { PureComponent } from 'react';
import {
  FlatList,
  LayoutAnimation,
  Platform,
  StyleSheet,
  UIManager,
  View
} from 'react-native';
import { latestOccurrence, latestOccurrenceText } from 'src/libs/helpers';
import { android } from 'src/libs/constants';
import type { Action, Sentence as SentenceT } from 'src/libs/types';
import { quarterMarginWidth } from 'src/styles/variables';
import Sentence from './sentence';

if (Platform.OS === android && UIManager.setLayoutAnimationEnabledExperimental) {
  // UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = {
  navigate: Function,
  sentences: SentenceT[],
  selectSentence: (number) => Action
};

export default class SentenceList extends PureComponent<Props> {
  componentWillUpdate() {
    // LayoutAnimation.easeInEaseOut();
  }

  render() {
    const { sentences } = this.props;
    return (
      <FlatList
        data={sentences.sort(this.timeSort)}
        inverted
        keyExtractor={this.keyExtractor}
        renderItem={this.renderSentence}
        style={styles.sentences}
      />
    );
  }

  keyExtractor = ({ id }: SentenceT) => `sentence-${id}`

  timeSort = (a: SentenceT, b: SentenceT) =>
    latestOccurrence(b).time - latestOccurrence(a).time;

  renderSentence = ({ item: sentence }: Object) => {
    const { navigate, selectSentence } = this.props;
    const occurrence = latestOccurrence(sentence);

    return (
      <Sentence
        id={sentence.id}
        navigate={navigate}
        occurrence={occurrence}
        selectSentence={selectSentence}
        text={latestOccurrenceText(occurrence, sentence)}
      />
    );
  }
}

const styles = StyleSheet.create({
  sentences: {
    flex: 1,
    marginBottom: quarterMarginWidth,
  }
});
