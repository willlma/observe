// @flow
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import { marginWidth } from 'src/styles/variables';
import { gray, lightGray } from 'src/styles/colors';
import { splitter } from 'src/libs/constants';

const timeDiff = (previousTime, time) => {
  const diff = moment(time).from(previousTime).split(splitter);
  diff.splice(-1);
  return diff.join(splitter);
};

type Props = { previousTime: Date, time: Date }
export default ({ previousTime, time }: Props) =>
  <View style={styles.interval}>
    <Text style={styles.text}>{timeDiff(previousTime, time)}</Text>
    <View style={styles.line} />
  </View>;

const styles = StyleSheet.create({
  interval: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  line: {
    borderBottomColor: lightGray,
    borderBottomWidth: 1,
    flex: 1,
  },
  text: {
    color: gray,
    marginRight: marginWidth,
  }
});
