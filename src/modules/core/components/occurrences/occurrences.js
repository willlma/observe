// @flow
import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { normalFontSize } from 'src/styles/variables';
import type { Occurrence } from 'src/libs/types';
import Time from './time';
import Quantity from './quantity';

type Props = {
  isDiscrete: boolean,
  occurrences: Occurrence[],
  is24Hour: boolean,
  updateOccurrence: (number, Occurrence) => void
};

export default class Occurrences extends PureComponent<Props> {
  render() {
    return this.props.occurrences.map(this.renderOccurrence);
  }

  renderOccurrence = (occurrence: Occurrence, index: number) => {
    const { isDiscrete, is24Hour } = this.props;
    return (
      <View key={occurrence.time} style={styles.row}>
        <Time
          index={index}
          updateDate={this.updateDate}
          styles={styles}
          time={occurrence.time}
          is24Hour={is24Hour}
        />
        {!isDiscrete &&
          <Quantity
            index={index}
            updateQuantity={this.updateQuantity}
            quantity={occurrence.quantities[0]}
            styles={styles}
          />
        }
      </View>
    );
  }

  updateDate = (index: number, date: Date) => {
    const { occurrences, updateOccurrence } = this.props;
    const occurrence = occurrences[index];
    occurrence.time = date;
    updateOccurrence(index, occurrence);
  }

  updateQuantity = (index: number, quantity: number) => {
    const { occurrences, updateOccurrence } = this.props;
    const occurrence = occurrences[index];
    occurrence.quantities[0] = quantity;
    updateOccurrence(index, occurrence);
  }
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  text: { fontSize: normalFontSize, lineHeight: 50 }
});
