// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TextInput } from 'react-native';
import { getSentence } from 'src/modules/core/selectors/homeSelectors';
import {
  updateText
} from 'src/modules/core/actionCreators/detailedChartsActionCreators';
import { transparent } from 'src/styles/colors';
import { inputFontSize } from 'src/styles/variables';
import { latestOccurrence, latestOccurrenceText, showBlanks } from 'src/libs/helpers';
import type { Action, Sentence } from 'src/libs/types';

type Props = {
  sentence: Sentence,
  selectMode: boolean,
  updateText: (string) => Action
};
type State = { isFocused: boolean, text: string }


class HeaderTitle extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      text: showBlanks(props.sentence.text)
    };
  }

  render() {
    return !this.props.selectMode &&
      <TextInput
        onBlur={this.onBlur}
        onChangeText={this.onChangeText}
        onFocus={this.onFocus}
        style={styles.inputFontSize}
        value={this.state.text}
        underlineColorAndroid={this.state.isFocused ? undefined : transparent}
      />;
  }

  editingText = (sentence) => latestOccurrenceText(latestOccurrence(sentence), sentence)

  onFocus = () => {
    this.setState({
      isFocused: true,
      text: this.editingText(this.props.sentence)
    });
  }
  onBlur = () => {
    this.setState({
      isFocused: false,
      text: showBlanks(this.props.sentence.text)
    });
  }

  onChangeText = (text: string) => {
    this.props.updateText(text);
    this.setState({ text: this.editingText(this.props.sentence) });
  }
}

const styles = StyleSheet.create({ inputFontSize: { fontSize: inputFontSize } });

const mapStateToProps = (state) => ({
  sentence: getSentence(state),
  selectMode: !!state.selectedOccurrences.length
});

export default connect(mapStateToProps, { updateText })(HeaderTitle);
