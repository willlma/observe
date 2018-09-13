// @flow
import React from 'react';
import { connect } from 'react-redux';
import { HeaderBackButton } from 'react-navigation';
import {
  clearSelectedOccurrences
} from 'src/modules/core/actionCreators/detailedChartsActionCreators';
import type { Action } from 'src/libs/types';

type Props = { clearSelectedOccurrences: () => Action }

const HeaderLeft = (props: Props) =>
  <HeaderBackButton onPress={props.clearSelectedOccurrences} />;

export default connect(null, { clearSelectedOccurrences })(HeaderLeft);
