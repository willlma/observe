// @flow
import React, { PureComponent } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import type { Sentence } from 'src/libs/types';
import { inputFontSize, marginWidth } from 'src/styles/variables';
import { navy, white } from 'src/styles/colors';
import { ios } from 'src/libs/constants';
import TextBox from './textBox';
import Sentences from './sentences';

type Props = {
  sentences: Sentence[],
  addSentence: Function,
  selectSentence: Function,
  navigation: Object
}

const PlatformView = (props) => (Platform.OS === ios ?
  <KeyboardAvoidingView
    behavior='padding'
    enabled
    keyboardVerticalOffset={42}
    {...props}
  /> :
  <View {...props} />
);

export default class HomeContent extends PureComponent<Props> {
  render() {
    const { navigation, sentences, selectSentence, addSentence } = this.props;
    return (
      <PlatformView style={styles.container}>
        <Sentences
          navigate={navigation.navigate}
          sentences={sentences}
          selectSentence={selectSentence}
        />
        {!sentences.length &&
          <View>
            <Text style={styles.text}>
              Eg:
              <Text style={styles.italic}> I ran 4 miles yesterday</Text>
            </Text>
          </View>
        }
        <TextBox addSentence={addSentence} />
      </PlatformView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: navy,
  },
  text: {
    color: white,
    padding: marginWidth,
    fontSize: inputFontSize
  },
  italic: { fontStyle: 'italic' }
});
