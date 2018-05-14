// @flow
import React, { PureComponent } from 'react';
import { ScrollView, View, StyleSheet, Keyboard } from 'react-native';
import type { Sentence } from 'src/libs/types';
import TextBox from '../components/textBox';
import Sentences from '../components/sentences';

type Props = {
  sentences: Sentence[],
  addSentence: Function,
  selectSentence: Function,
  navigation: Object
}

export default class HomeContent extends PureComponent<Props> {
  scrollView: ScrollView

  componentWillMount() {
    Keyboard.addListener('keyboardDidShow', this.scrollToEnd);
  }

  render() {
    const { navigation, sentences, selectSentence, addSentence } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView
          onContentSizeChange={this.scrollToEnd}
          // keyboardDismissMode='on-drag'
          // keyboardShouldPersistTaps='handled'
          ref={(ref) => this.scrollView = ref}
          style={styles.scrollView}
        >
          <Sentences
            navigate={navigation.navigate}
            sentences={sentences}
            selectSentence={selectSentence}
          />
        </ScrollView>
        <TextBox addSentence={addSentence} />
      </View>
    );
  }

  scrollToEnd = () => this.scrollView.scrollToEnd({ animated: true })
}

const styles = StyleSheet.create({
  container: { height: '100%' },
  scrollView: {
    backgroundColor: '#34495e',
    flex: 1
  }
});
