// @flow
import React, { PureComponent } from 'react';
import { Keyboard, StyleSheet, TouchableHighlight, Text } from 'react-native';
import moment from 'moment';
import type { Action, Occurrence } from 'src/libs/types';
import {
  smallFontSize,
  normalFontSize,
  halfMarginWidth
} from 'src/styles/variables';
import Card from '../card';

type Props = {
  id: number,
  navigate: Function,
  occurrence: Occurrence,
  selectSentence: (number) => Action,
  text: string
};

export default class Sentence extends PureComponent<Props> {
  render() {
    const { occurrence, text } = this.props;
    return (
      <TouchableHighlight onPress={this.onPress}>
        <Card style={styles.card}>
          <Text style={styles.text}>{text}</Text>
          <Text style={styles.time}>{moment(occurrence.time).fromNow()}</Text>
        </Card>
      </TouchableHighlight>
    );
  }

  onPress = () => {
    const { navigate, id, selectSentence } = this.props;
    selectSentence(id);
    navigate('DetailedCharts');
    // Keyboard.dismiss();
  }
}

const styles = StyleSheet.create({
  card: {
    padding: halfMarginWidth
  },
  text: {
    alignSelf: 'flex-start',
    fontSize: normalFontSize,
  },
  time: {
    alignSelf: 'flex-start',
    fontSize: smallFontSize,
  }
});
