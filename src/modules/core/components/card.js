// @flow
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { white } from 'src/styles/colors';
import { quarterMarginWidth } from 'src/styles/variables';
import { Style } from 'src/libs/types';

type Props = {
  children: React.Node,
  style?: Style
};

export default ({ children, style }: Props) =>
  <View style={[style, styles.card]}>{children}</View>;

const styles = StyleSheet.create({
  card: {
    backgroundColor: white,
    margin: quarterMarginWidth,
    marginBottom: 0,
    borderRadius: 2,
  }
});
