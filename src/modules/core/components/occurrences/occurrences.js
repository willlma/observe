// @flow
import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import type { Navigation, Occurrence as OccurrenceT } from 'src/libs/types';
import { sortOccurrences } from 'src/libs/helpers';
import Card from '../card';
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
  // wasSelectMode = false

  componentDidUpdate(props: Props) {
    // TODO: wrong props are being supplied. Once this bug is fixed, remove
    // this.wasSelectMode logic and revert to PureComponent
    const { navigation, selectedOccurrences } = this.props;
    const wasSelectMode = !!props.selectedOccurrences.length;
    const selectMode = !!selectedOccurrences.length;
    if (wasSelectMode !== selectMode) navigation.setParams({ selectMode });
  }

  render() {
    /*const { navigation, selectedOccurrences } = this.props;
    const selectMode = !!selectedOccurrences.length;
    if (this.wasSelectMode !== selectMode) {
      this.wasSelectMode = selectMode;
      navigation.setParams({ selectMode });
    }*/
    return (
      <Card>
        <FlatList
          data={sortOccurrences(this.props.occurrences)}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderOccurrence}
        />
      </Card>
    );
  }

  keyExtractor = ({ time }: OccurrenceT) => time.getTime().toString()

  renderOccurrence = ({ item: occurrence, index }: Object) => {
    const { selectedOccurrences, ...other } = this.props;
    return (
      <Occurrence
        index={index}
        isSelected={selectedOccurrences.includes(index)}
        occurrence={occurrence}
        selectMode={!!selectedOccurrences.length}
        {...other}
      />
    );
  }
}
