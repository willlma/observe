// @flow
import React from 'react';
import { connect } from 'react-redux';
import { gray, white } from 'src/styles/colors';
import type {
  Comparison,
  Datum,
  Navigation,
  Occurrence,
  Sentence
} from 'src/libs/types';
import { getSentence } from '../selectors/homeSelectors';
import {
  getComparisons,
  getWeekData,
  isDiscrete
} from '../selectors/detailedChartsSelectors';
import * as detailedChartsActionCreators from '../actionCreators/detailedChartsActionCreators';
import DetailedChartsContent from '../components/detailedChartsContent';
import HeaderTitle from '../components/detailedChartsHeader/title';
import HeaderLeft from '../components/detailedChartsHeader/left';
import DeleteOccurrences from '../components/detailedChartsHeader/deleteOccurrences';
import GeneralActions from '../components/detailedChartsHeader/generalActions';

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

const DetailedChartsContainer = (props: Props) =>
  <DetailedChartsContent {...props} />;

DetailedChartsContainer.navigationOptions = ({ navigation }) => {
  const { params = {} } = navigation.state;
  if (params.selectMode) {
    return {
      headerLeft: HeaderLeft,
      headerRight: <DeleteOccurrences navigation={navigation} />,
      headerTintColor: white,
      headerStyle: { backgroundColor: gray }
    };
  }
  return {
    headerTitle: HeaderTitle,
    headerRight: <GeneralActions navigation={navigation} />
  };
};

const mapStateToProps = (state) => ({
  weekData: getWeekData(state),
  comparisons: getComparisons(state),
  isDiscrete: isDiscrete(state),
  occurrences: getSentence(state).occurrences,
  sentences: state.sentences,
  selectedOccurrences: state.selectedOccurrences,
  is24Hour: state.is24Hour
});

export default connect(
  mapStateToProps,
  detailedChartsActionCreators
)(DetailedChartsContainer);
