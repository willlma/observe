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
      blurOnSubmit={false}
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
    const text = this.state.text.trim();
    if (text) this.props.addSentence(this.state.text.trim());
    this.setState({ text: '' });
    // Keyboard.dismiss();
  };

  onChangeText = (text: string) => {
    this.setState({ text });
  };
}

const styles = StyleSheet.create({
  input: {
    fontSize: inputFontSize,
    paddingLeft: marginWidth,
    paddingRight: marginWidth,
    backgroundColor: white,
    height: 50
  },
});

export default TextBox;
