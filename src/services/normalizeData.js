import { days, periods } from 'src/libs/constants';

function getDay(date: Date) {
  // this is 0-based on Monday instead of Sunday
  const day = date.getDay();
  return day === 0 ? 6 : day - 1;
}

// TODO: match type
export function normalizeData(sentence: Sentence) {
  const monday = new Date();
  monday.setDate(monday.getDate() - getDay(monday));
  periods.forEach((period) => {
    monday[`set${period}`](0);
  });
  const data = days.map((day) => ({ day, times: 0 }));
  sentence.timestamps.forEach((timestamp) => {
    if (timestamp < monday.getTime()) return;
    const dayNumber = getDay(new Date(timestamp));
    data[dayNumber].times++;
  });
  return data;
}
