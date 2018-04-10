// @flow
import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { VictoryPie, VictoryTheme } from 'victory-native';
import type { Datum, Diff } from 'src/libs/types';

export default class Comparison extends PureComponent {
  props: {
    commonSubstr: string,
    diffs: Diff[]
  }

  LABEL_TYPES_LENGTH = 3;

  state = { labelIndex: 0 }

  events = [{
    target: 'data', //'labels']
    eventHandlers: { onPress: () => {
      const { labelIndex } = this.state;
      this.setState({
        labelIndex: labelIndex === this.LABEL_TYPES_LENGTH - 1 ? 0 : labelIndex + 1
      });
    } }
  }]

  render() {
    const { commonSubstr, diffs } = this.props;
    return (
      <View>
        <Text>{commonSubstr}</Text>
        <VictoryPie
          height={200} width={300} theme={VictoryTheme.material}
          data={diffs} labels={this.label}
          events={this.events}
          x='substring'
          y='ids.length'
        />
      </View>
    );
  }

  label = ({ x, y }: Datum) => {
    const total = this.props.diffs.reduce(
      (accumulator: number, { ids }) => accumulator + ids.length, 0
    );
    const proportion = y / total;
    return [x.substr(0, 20), y, `${Math.round(proportion * 100)}%`][this.state.labelIndex];
  }
}
