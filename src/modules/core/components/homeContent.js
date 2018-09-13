// @flow
import React, { PureComponent } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import type { Sentence } from 'src/libs/types';
import { inputFontSize, marginWidth } from 'src/styles/variables';
import { navy, white } from 'src/styles/colors';
import TextBox from '../components/textBox';
import Sentences from '../components/sentences';

type Props = {
  sentences: Sentence[],
  addSentence: Function,
  selectSentence: Function,
  navigation: Object
}

export default class HomeContent extends PureComponent<Props> {
  render() {
    const { navigation, sentences, selectSentence, addSentence } = this.props;
    return (
      <KeyboardAvoidingView
        behavior='padding'
        enabled
        style={styles.container}
      >
        <Sentences
          navigate={navigation.navigate}
          sentences={sentences}
          selectSentence={selectSentence}
        />
        {!sentences.length &&
          <View>
            <Text style={styles.text}>
              Eg: <Text style={styles.italic}>I ran 4 miles yesterday</Text>
            </Text>
          </View>
        }
        <TextBox addSentence={addSentence} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: navy,
    // flexDirection: 'column-reverse'
  },
  text: {
    color: white,
    padding: marginWidth,
    fontSize: inputFontSize
  },
  italic: { fontStyle: 'italic' }
});
