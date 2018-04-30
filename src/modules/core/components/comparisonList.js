// @flow
import React from 'react';
import { View } from 'react-native';
import type { Comparison as ComparisonT, Sentence } from 'src/libs/types';
import Comparison from './comparison';

type Props = {
  comparisons: ComparisonT[],
  sentences: Sentence[]
}

export default ({ comparisons, sentences }: Props) =>
  comparisons && (
    <View>
      {comparisons.map(({ commonSubstr, diffs }) => (
        <Comparison
          key={commonSubstr}
          commonSubstr={commonSubstr}
          diffs={diffs}
          sentences={sentences} 
        />
      ))}
    </View>
  );


// const styles = StyleSheet.create({});
