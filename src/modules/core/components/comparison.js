// @flow
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { VictoryPie, VictoryTheme } from 'victory-native';
import { showBlanks, getSentence } from 'src/libs/helpers';
import { cloze, splitter } from 'src/libs/constants';
import type { Datum, Diff, Sentence } from 'src/libs/types';

type Props = {
  commonSubstr: string,
  diffs: Diff[],
  sentences: Sentence[]
}

type State = { labelIndex: number }

export default class Comparison extends Component<Props, State> {
  LABEL_TYPES_LENGTH = 3;
  X_ACCESSOR = 'substring';
  state = { labelIndex: 0 }
  onPress = () => {
    const { labelIndex } = this.state;
    const newIndex = labelIndex === this.LABEL_TYPES_LENGTH - 1 ? 0 : labelIndex + 1;
    console.log(`newIndex: ${newIndex}`);
    this.setState({ labelIndex: newIndex });
  }

  events = [{
    target: 'data',
    eventHandlers: { onPress: this.onPress }
  }]

  render() {
    const { commonSubstr, diffs } = this.props;
    return (
      <View>
        <Text>{showBlanks(commonSubstr)}</Text>
        <VictoryPie
          events={this.events}
          height={200}
          theme={VictoryTheme.material}
          data={diffs}
          labels={this.label}
          padding={{ top: 20, left: 50, right: 50, bottom: 50 }}
          x={this.X_ACCESSOR}
          y={this.getY}
        />
      </View>
    );
  }

  label = (diff: Diff) => {
    const total = this.props.diffs.reduce(
      (accumulator: number, { ids }) => accumulator + ids.length,
      0
    );
    const y = this.getY(diff);
    const proportion = y / total;
    return [
      showBlanks(diff[this.X_ACCESSOR]).split(splitter).slice(0, 5).join(splitter),
      y,
      `${Math.round(proportion * 100)}%`
    ][this.state.labelIndex];
  }

  quantitySum = (id: number) => {
    const sentence = getSentence(id, this.props.sentences);
    return (
      sentence &&
      sentence.occurrences.reduce((sum, { quantities }) => sum + quantities[0], 0)
    );
  }

  getY = ({ ids }: Diff) => {
    const { commonSubstr } = this.props;
    return commonSubstr.includes(cloze.digit) ?
      ids.reduce((sum, id) => sum + this.quantitySum(id), 0) :
      ids.length;
  }
}
