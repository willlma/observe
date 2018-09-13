// @flow
import React, { PureComponent } from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { normalFontSize, halfMarginWidth } from 'src/styles/variables';
import { gray, navy, white, transparent } from 'src/styles/colors';
import type { Occurrence as OccurrenceT } from 'src/libs/types';
import Time from './time';
import Quantity from './quantity';

type Props = {
  index: number,
  is24Hour: boolean,
  isDiscrete: boolean,
  isSelected: boolean,
  occurrence: OccurrenceT,
  selectMode: boolean,
  updateOccurrence: (number, OccurrenceT) => void,
  toggleOccurrenceSelected: (number) => void
};

export default class Occurrence extends PureComponent<Props> {
  render() {
    const { index, isDiscrete, is24Hour, isSelected, occurrence } = this.props;
    const viewStyle = [
      styles.row,
      styles.item,
      index && styles.border,
      isSelected && styles.selected
    ];

    return (
      <TouchableHighlight
        onPress={this.onPress}
        onLongPress={this.onLongPress}
        underlayColor={white}
      >
        <View style={viewStyle}>
          <Time
            updateDate={this.updateDate}
            styles={styles}
            time={occurrence.time}
            is24Hour={is24Hour}
          />
          {!isDiscrete &&
            <Quantity
              updateQuantity={this.updateQuantity}
              quantity={occurrence.quantities[0]}
              styles={styles}
            />
          }
        </View>
      </TouchableHighlight>
    );
  }

  onPress = () => {
    const { index, selectMode, toggleOccurrenceSelected } = this.props;
    if (selectMode) toggleOccurrenceSelected(index);
  }

  onLongPress = () => {
    const { index, selectMode, toggleOccurrenceSelected } = this.props;
    if (!selectMode) toggleOccurrenceSelected(index);
  }

  updateDate = (date: Date) => {
    const { index, occurrence, updateOccurrence } = this.props;
    occurrence.time = date;
    updateOccurrence(index, occurrence);
  }

  updateQuantity = (quantity: number) => {
    const { index, occurrence, updateOccurrence } = this.props;
    occurrence.quantities[0] = quantity;
    updateOccurrence(index, occurrence);
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  item: {
    paddingLeft: halfMarginWidth,
    paddingRight: halfMarginWidth,
  },
  border: {
    borderTopColor: gray,
    borderTopWidth: 1,
  },
  text: { fontSize: normalFontSize, lineHeight: 50 },
  selected: {
    backgroundColor: gray
  }
});
