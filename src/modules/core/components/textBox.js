// @flow
import React, { Component } from 'react';
import { StyleSheet, TextInput, Keyboard } from 'react-native';
import { inputFontSize, marginWidth, doubleMarginWidth } from 'src/styles/variables';
import { white } from 'src/styles/colors';
import { Regex } from 'src/libs/constants';

class TextBox extends Component {
  props: {
    addSentence: Function,
  };
  state = {
    text: '',
  };
  render = () => (
    <TextInput
      autoCapitalize='sentences' //autoFocus
      placeholder='What have you been up to?'
      onSubmitEditing={this.onSubmit}
      onChangeText={this.onChangeText}
      style={styles.input}
      placeholderTextColor='#AAA'
      underlineColorAndroid='transparent'
    >
      {this.state.text}
    </TextInput>
  );

  onSubmit = () => {
    const quantities: number[] = [];
    const text = this.state.text.trim().replace(Regex.number, (match) => {
      quantities.push(Number.parseFloat(match));
      return '\\d';
    });
    this.props.addSentence(text, quantities);
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
