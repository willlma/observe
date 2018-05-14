// @flow
import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { doubleMarginWidth } from 'src/styles/variables';
import type { Comparison, Datum, Occurrence, Sentence } from 'src/libs/types';
import { getSentence } from '../selectors/homeSelectors';
import {
  getComparisons,
  getWeekData,
  isDiscrete
} from '../selectors/detailedChartsSelectors';
import * as detailedChartsActionCreators from '../actionCreators/detailedChartsActionCreators';
import DetailedChartsTitle from '../components/detailedChartsTitle';
import WeekChart from '../components/weekChart';
import ComparisonList from '../components/comparisonList';
import Occurrences from '../components/occurrences';

type Props = {
  comparisons: Comparison[],
  occurrences: Occurrence[],
  isDiscrete: boolean,
  sentences: Sentence[],
  weekData: Datum[],
  is24Hour: boolean,
  updateOccurrence: (occurrenceIndex: number, occurrence: Occurrence) => void
}
const DetailedChartsContainer = ({
  comparisons,
  isDiscrete: discrete,
  occurrences,
  sentences,
  is24Hour,
  weekData,
  updateOccurrence,
}: Props) => (
  <ScrollView style={{ padding: doubleMarginWidth }}>
    <WeekChart isDiscrete={discrete} weekData={weekData} />
    <ComparisonList comparisons={comparisons} sentences={sentences} />
    <Occurrences
      isDiscrete={discrete}
      occurrences={occurrences}
      is24Hour={is24Hour}
      updateOccurrence={updateOccurrence}
    />
  </ScrollView>
);

DetailedChartsContainer.navigationOptions = { headerTitle: DetailedChartsTitle };

const mapStateToProps = (state) => ({
  weekData: getWeekData(state),
  comparisons: getComparisons(state),
  isDiscrete: isDiscrete(state),
  occurrences: getSentence(state).occurrences,
  sentences: state.sentences,
  is24Hour: state.is24Hour
});

export default connect(
  mapStateToProps,
  detailedChartsActionCreators
)(DetailedChartsContainer);
