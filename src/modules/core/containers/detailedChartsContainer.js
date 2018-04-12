// @flow
import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { doubleMarginWidth } from 'src/styles/variables';
import type { Comparison, Datum } from 'src/libs/types';
import { getComparisons, getWeekData } from '../selectors/detailedChartsSelectors';
import WeekChart from '../components/weekChart';
import ComparisonList from '../components/comparisonList';

type Props = {
  comparisons: Comparison[],
  weekData: Datum[],
}
const DetailedChartsContainer = ({ comparisons, weekData }: Props) => (
  <ScrollView style={{ padding: doubleMarginWidth }}>
    <WeekChart weekData={weekData} />
    <ComparisonList comparisons={comparisons} />
  </ScrollView>
);

DetailedChartsContainer.navigationOptions = ({ navigation }) =>
  ({ title: navigation.state.params.title });

const mapStateToProps = (state) => ({
  weekData: getWeekData(state),
  comparisons: getComparisons(state),
});

export default connect(mapStateToProps/*, dispatchProps*/)(DetailedChartsContainer);
