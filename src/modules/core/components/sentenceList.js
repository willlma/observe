// @flow
import React from 'react';
import { StyleSheet, TouchableHighlight, View, Text, Keyboard } from 'react-native';
import moment from 'moment';
import type Sentence from 'src/libs/types';
import { smallFontSize, normalFontSize, doubleMarginWidth, halfMarginWidth } from 'src/styles/variables';
import { white } from 'src/styles/colors';

type Props = {
  navigate: Function,
  sentences: Sentence[],
  selectSentence: Function
};

function onPress(sentence, navigate, selectSentence) {
  selectSentence(sentence.id);
  navigate('DetailedCharts', { title: sentence.text });
}

function lastOccurance(sentence) {
  const { occurrences } = sentence;
  return occurrences[occurrences.length - 1];
}

function renderSentence(sentence, navigate, selectSentence) {
  const occurance = lastOccurance(sentence);
  const text = sentence.text.replace('\\d', occurance.quantities[0]);
  return (
    <TouchableHighlight
      key={`sentence-${sentence.id}`}
      onPress={() => onPress(sentence, navigate, selectSentence)}
    >
      <View style={styles.background}>
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.time}>{moment(occurance.timestamp).calendar()}</Text>
      </View>
    </TouchableHighlight>
  );
}

export default function ({ navigate, sentences, selectSentence }: Props) {
  if (!sentences.length) return null;
  sentences.sort((a, b) => lastOccurance(a).timestamp - lastOccurance(b).timestamp);
  return (
    <View>
      {sentences.map((sentence) => renderSentence(sentence, navigate, selectSentence))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: doubleMarginWidth,
    marginRight: doubleMarginWidth
  },
  background: {
    backgroundColor: white,
    // elevation: 2,
    padding: halfMarginWidth,
    margin: 3,
    marginBottom: 0,
    borderRadius: 2,
  },
  text: {
    alignSelf: 'flex-start',
    fontSize: normalFontSize,
  },
  time: {
    alignSelf: 'flex-start',
    fontSize: smallFontSize,
    // marginLeft: 8,
  }
});
