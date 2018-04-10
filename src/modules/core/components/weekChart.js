// @flow
import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory-native';
import moment from 'moment';
import type Sentence from 'src/libs/types';
import { days, periods } from 'src/libs/constants';


function getDay(date: Date) {
  // this is 0-based on Monday instead of Sunday
  const day = date.getDay();
  return day === 0 ? 6 : day - 1;
}

function normalizeData(sentence: Sentence) {
  const monday = new Date();
  monday.setDate(monday.getDate() - getDay(monday));
  periods.forEach((period) => {
    monday[`set${period}`](0);
  });

  const data = days.map((day, i) => ({ day: i, quantity: 0 }));
  sentence.occurrences.forEach((occurrence) => {
    const { timestamp, quantities } = occurrence;
    if (timestamp < monday.getTime()) return;
    const dayNumber = getDay(new Date(timestamp));
    data[dayNumber].quantity += quantities[0];
  });
  return data;
}

const tickCount = (data) => Math.min(
  2,
  Math.ceil(Math.max.apply(null, data.map((datum) => datum.quantity))) || 1
);

type Props = {
  sentence: Sentence
}

export default function ({ sentence }: Props) {
  const data = normalizeData(sentence);
  return (
    <VictoryChart domainPadding={{ x: 50 }} height={100} width={200} padding={30}>
      <VictoryAxis
        tickValues={[0, 1, 2, 3, 4, 5, 6]}
        tickFormat={days}
      />
      <VictoryAxis
        style={style}
        dependentAxis
        tickCount={tickCount(data)}
        tickFormat={(tick) => Math.round(tick)}
      />
      <VictoryBar data={data} x='day' y='quantity' />
    </VictoryChart>
  );
}

const style = {
  labels: { textAnchor: 'middle' }
};
