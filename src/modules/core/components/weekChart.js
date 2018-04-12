// @flow
import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory-native';
import type { Datum } from 'src/libs/types';

const tickCount = (weekData) => {
  const max = Math.max(...weekData.map((datum) => datum.y)) + 1;
  return max > 5 ? null : max;
};

const tickFormat = (tick) => (Number.isInteger(tick) ? tick : null);

export default function ({ weekData }: { weekData: Datum[] }) {
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
      <VictoryBar data={weekData} />
    </VictoryChart>
  );
}

const yAxisStyle = {
  labels: { textAnchor: 'middle' },
  grid: { stroke: (tick) => tickFormat(tick) && '#ccc' }
};
