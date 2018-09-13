// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { Sentence } from 'src/libs/types';
import HomeContent from '../components/homeContent';
import * as actionCreators from '../actionCreators/actionCreators';

type Props = {
  sentences: Sentence[],
  storageReady: boolean,
  navigation: Object,
  addSentence: Function,
  selectSentence: Function,
}

// TODO: Some sort of screen before storage is ready?
const HomeContainer = ({ storageReady, ...other }: Props) => (storageReady ?
  <HomeContent {...other} /> :
  null
);

HomeContainer.navigationOptions = { header: null };

const mapStateToProps = (state) => ({
  sentences: state.sentences,
  storageReady: state.storageReady
});

export default connect(mapStateToProps, actionCreators)(HomeContainer);
