// @flow
import React from 'react';
import { StyleSheet } from 'react-native';
import { halfMarginWidth } from 'src/styles/variables';
import type { Comparison as ComparisonT, Sentence } from 'src/libs/types';
import Card from './card';
import Comparison from './comparison';

type Props = {
  comparisons: ComparisonT[],
  sentences: Sentence[]
}

export default ({ comparisons, sentences }: Props) => (
  comparisons.length ?
    <Card style={styles.card}>
      {comparisons.map(({ commonSubstr, diffs }) => (
        <Comparison
          key={commonSubstr}
          commonSubstr={commonSubstr}
          diffs={diffs}
          sentences={sentences}
        />
      ))}
    </Card> :
    null
);

const styles = StyleSheet.create({
  card: { padding: halfMarginWidth }
});
