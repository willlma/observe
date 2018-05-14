// @flow
import React, { PureComponent } from 'react';
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native';
import moment from 'moment';
import type { Action, Occurrence } from 'src/libs/types';
import {
  smallFontSize,
  normalFontSize,
  halfMarginWidth
} from 'src/styles/variables';
import { white } from 'src/styles/colors';

type Props = {
  id: number,
  navigate: Function,
  occurrence: Occurrence,
  selectSentence: (number) => Action,
  text: string
};

export default class Sentence extends PureComponent<Props> {
  render() {
    const { id, occurrence, text } = this.props;
    return (
      <TouchableHighlight
        key={`sentence-${id}`}
        onPress={this.onPress}
      >
        <View style={styles.background}>
          <Text style={styles.text}>{text}</Text>
          <Text style={styles.time}>{moment(occurrence.time).fromNow()}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  onPress = () => {
    const { navigate, id, selectSentence } = this.props;
    selectSentence(id);
    navigate('DetailedCharts');
  }
}

const styles = StyleSheet.create({
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
  }
});
