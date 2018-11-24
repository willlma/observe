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
import { lastOccurrence, lastOccurrenceText } from 'src/libs/helpers';
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
    // if (!sentences.length) return null;
    return (
      // <View style={styles.sentences}>
      <FlatList
        data={sentences.sort(this.timeSort)}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderSentence}
        style={styles.sentences}
      />
    );
  }

  keyExtractor = ({ id }: SentenceT) => `sentence-${id}`

timeSort = (a: SentenceT, b: SentenceT) =>
  lastOccurrence(a).time - lastOccurrence(b).time;

  renderSentence = ({ item: sentence }: Object) => {
    const { navigate, selectSentence } = this.props;
    const occurrence = lastOccurrence(sentence);

    return (
      <Sentence
        id={sentence.id}
        navigate={navigate}
        occurrence={occurrence}
        selectSentence={selectSentence}
        text={lastOccurrenceText(occurrence, sentence)}
      />
    );
  }
}

const styles = StyleSheet.create({
  sentences: {
    flex: 1,
    marginBottom: quarterMarginWidth,
    flexDirection: 'column-reverse',
  }
});
