// @flow
import React, { PureComponent } from 'react';
import { Text, TextInput, View } from 'react-native';
import { transparent } from 'src/styles/colors';
import { normalFontSize } from 'src/styles/variables';
import type { Style } from 'src/libs/types';

type Props = {
  quantity: number,
  styles: Style,
  updateQuantity: (number) => void
};

type State = { isFocused: boolean, value: string }

export default class Quantity extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { isFocused: false, value: props.quantity.toString() };
  }

  render() {
    const { styles } = this.props;
    return (
      <View style={styles.row}>
        <Text style={styles.text}>: </Text>
        <TextInput
          keyboardType='numeric'
          onBlur={this.onBlur}
          onChangeText={this.onChangeText}
          onFocus={this.onFocus}
          style={{ fontSize: normalFontSize }}
          value={this.state.value}
          underlineColorAndroid={this.state.isFocused ? undefined : transparent}
        />
      </View>
    );
  }

  onChangeText = (text: string) => {
    const { updateQuantity } = this.props;
    const quantity = Number.parseFloat(text);
    if (quantity.toString() === text) {
      // TODO: validation
      updateQuantity(quantity);
    }
    this.setState({ value: text });
  }

  onFocus = () => this.setState({ isFocused: true })
  onBlur = () => this.setState({ isFocused: false })
}
