// @flow
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { navy } from 'src/styles/colors';
import type {
  Comparison,
  Datum,
  Navigation,
  Occurrence,
  Sentence
} from 'src/libs/types';
import Card from './card';
import WeekChart from './weekChart';
import ComparisonList from './comparisonList';
import Occurrences from './occurrences';

type Props = {
  comparisons: Comparison[],
  is24Hour: boolean,
  isDiscrete: boolean,
  navigation: Navigation,
  occurrences: Occurrence[],
  selectedOccurrences: number[],
  sentences: Sentence[],
  weekData: Datum[],
  toggleOccurrenceSelected: (number) => void,
  updateOccurrence: (occurrenceIndex: number, occurrence: Occurrence) => void
}

const DetailedChartsContent = ({
  comparisons,
  is24Hour,
  isDiscrete: discrete,
  navigation,
  occurrences,
  sentences,
  selectedOccurrences,
  weekData,
  toggleOccurrenceSelected,
  updateOccurrence,
}: Props) => (
  <ScrollView style={styles.container}>
    <Card><WeekChart isDiscrete={discrete} weekData={weekData} /></Card>
    <ComparisonList comparisons={comparisons} sentences={sentences} />
    <Occurrences
      is24Hour={is24Hour}
      isDiscrete={discrete}
      occurrences={occurrences}
      navigation={navigation}
      selectedOccurrences={selectedOccurrences}
      toggleOccurrenceSelected={toggleOccurrenceSelected}
      updateOccurrence={updateOccurrence}
    />
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: navy,
    flex: 1
  }
});

export default DetailedChartsContent;
