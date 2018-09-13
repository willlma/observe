// @flow
import React from 'react';
import { VictoryBar, VictoryLine, VictoryChart, VictoryAxis } from 'victory-native';
import type { Datum } from 'src/libs/types';
import { gray } from 'src/styles/colors';

const tickCount = (weekData) => {
  const max = Math.max(...weekData.map((datum) => datum.y)) + 1;
  return max > 5 ? null : max;
};

const tickFormat = (tick) => (Number.isInteger(tick) ? tick : null);

type Props = { isDiscrete: boolean, weekData: Datum[] }

export default function ({ isDiscrete, weekData }: Props) {
  const ChartType = isDiscrete ? VictoryBar : VictoryLine;

  return (
    <VictoryChart
      domainPadding={16}
      height={180}
      padding={{ top: 50, bottom: 50, left: 50, right: 82 }}
    >
      <VictoryAxis />
      <VictoryAxis
        dependentAxis
        style={yAxisStyle}
        tickCount={tickCount(weekData)}
        tickFormat={tickFormat}
      />
      <ChartType data={weekData} />
    </VictoryChart>
  );
}

const yAxisStyle = {
  labels: { textAnchor: 'middle' },
  grid: { stroke: (tick) => tickFormat(tick) && gray }
};
