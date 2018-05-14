// @flow
import React, { Component } from 'react';
import { StyleSheet, TextInput, Keyboard } from 'react-native';
import { inputFontSize, marginWidth } from 'src/styles/variables';
import { white, transparent } from 'src/styles/colors';

type Props = { addSentence: Function }
type State = { text: string }

class TextBox extends Component<Props, State> {
  state = { text: '' };

  render = () => (
    <TextInput
      autoCapitalize='sentences' //autoFocus
      placeholder='What have you been up to?'
      onSubmitEditing={this.onSubmit}
      onChangeText={this.onChangeText}
      style={styles.input}
      placeholderTextColor='#AAA'
      underlineColorAndroid={transparent}
    >
      {this.state.text}
    </TextInput>
  );

  onSubmit = () => {
    this.props.addSentence(this.state.text.trim());
    this.setState({ text: '' });
    Keyboard.dismiss();
  };

  onChangeText = (text: string) => {
    this.setState({ text });
  };
}

const styles = StyleSheet.create({
  input: {
    fontSize: inputFontSize,
    // margin: marginWidth,
    // marginTop: 100,
    // marginBottom: doubleMarginWidth,
    paddingLeft: marginWidth,
    paddingRight: marginWidth,
    elevation: 5,
    // maxWidth: 500,
    backgroundColor: white,
  },
});

export default TextBox;
