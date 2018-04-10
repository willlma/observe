// @flow
import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { doubleMarginWidth } from 'src/styles/variables';
import type { Sentence, Comparison } from 'src/libs/types';
import { getSentence } from '../selectors/homeSelectors';
import { getComparisons } from '../selectors/detailedChartsSelectors';
import WeekChart from '../components/weekChart';
import ComparisonList from '../components/comparisonList';

type Props = {
  comparisons: Comparison[],
  sentence: Sentence,
}
const DetailedChartsContainer = ({ comparisons, sentence }: Props) => (
  <ScrollView style={{ padding: doubleMarginWidth }}>
    <WeekChart sentence={sentence} />
    <ComparisonList comparisons={comparisons} />
  </ScrollView>
);

DetailedChartsContainer.navigationOptions = ({ navigation }) => ({
  title: navigation.state.params.title
});

const mapStateToProps = (state) => ({
  sentence: getSentence(state),
  comparisons: getComparisons(state),
});

export default connect(mapStateToProps/*, dispatchProps*/)(DetailedChartsContainer);
