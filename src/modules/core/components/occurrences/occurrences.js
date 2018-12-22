// @flow
import React, { PureComponent } from 'react';
import { FlatList, View } from 'react-native';
import type { Navigation, Occurrence as OccurrenceT } from 'src/libs/types';
import { sortOccurrences } from 'src/libs/helpers';
import Card from '../card';
import Interval from './interval';
import Occurrence from './occurrence';

type Props = {
  is24Hour: boolean,
  isDiscrete: boolean,
  navigation: Navigation,
  occurrences: OccurrenceT[],
  selectedOccurrences: number[],
  updateOccurrence: (number, OccurrenceT) => void,
  toggleOccurrenceSelected: (number) => void
};

export default class Occurrences extends PureComponent<Props> {
  render() {
    return (
      <Card>
        <FlatList
          data={this.props.occurrences}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderDividerAndOccurrence}
        />
      </Card>
    );
  }

  keyExtractor = ({ time }: OccurrenceT) => time.getTime().toString()

  renderDividerAndOccurrence = ({ item: occurrence, index }: Object) => {
    const { occurrences, selectedOccurrences, ...other } = this.props;
    // TODO: check if it's kosher to access other array items in a flatlist renderItem function.
    return (
      <View>
        {!!index &&
          <Interval
            first={false}
            time={occurrence.time}
            previousTime={occurrences[index - 1].time}
          />
        }
        <Occurrence
          index={index}
          isSelected={selectedOccurrences.includes(index)}
          occurrence={occurrence}
          selectMode={!!selectedOccurrences.length}
          {...other}
        />
      </View>
    );
  }
}
