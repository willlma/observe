// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { Sentence } from 'src/libs/types';
import HomeContent from '../components/homeContent';
import * as actionCreators from '../actionCreators/actionCreators';

type Props = {
  sentences: Sentence[],
  addSentence: Function,
  selectSentence: Function,
  navigation: Object
}
const HomeContainer = (props: Props) => (
  <HomeContent {...props} />
);

HomeContainer.navigationOptions = { header: null };

const mapStateToProps = (state) => ({ sentences: state.sentences });

export default connect(mapStateToProps, actionCreators)(HomeContainer);
