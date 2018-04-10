// @flow
import React from 'react';
import { View } from 'react-native';
import type { Comparison as ComparisonT } from 'src/libs/types';
import Comparison from './comparison';

type Props = { comparisons: ComparisonT[] }
export default ({ comparisons }: Props) =>
  comparisons && (
    <View>
      {comparisons.map(({ commonSubstr, diffs }) => (
        <Comparison key={commonSubstr} commonSubstr={commonSubstr} diffs={diffs} />
      ))}
    </View>
  );


// const styles = StyleSheet.create({});
