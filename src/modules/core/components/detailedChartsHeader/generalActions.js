// @flow
import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import HeaderButtons, { Item } from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  addOccurrence,
  deleteSentence
} from 'src/modules/core/actionCreators/detailedChartsActionCreators';
import { iconPrefix } from 'src/libs/constants';
import { halfMarginWidth, iconSize, marginWidth } from 'src/styles/variables';
import type { Navigation } from 'src/libs/types';

type Props = {
  navigation: Navigation,
  addOccurrence: () => void,
  deleteSentence: (navigation: Navigation) => void
}

class GeneralActions extends PureComponent<Props> {
  addIcon = `${iconPrefix}add`
  moreIcon = `${iconPrefix}more`

  render() {
    return (
      <HeaderButtons
        IconComponent={Icon}
        iconSize={iconSize}
        overflowButtonWrapperStyle={styles.rightMargin}
        OverflowIcon={<Icon name={this.moreIcon} size={iconSize} />}
      >
        <Item
          buttonWrapperStyle={styles.halfRightMargin}
          title='Add'
          iconName={this.addIcon}
          onPress={this.props.addOccurrence}
        />
        <Item
          title='Delete'
          show='never'
          onPress={this.deleteSentence}
        />
      </HeaderButtons>
    );
  }

  deleteSentence = () =>
    this.props.deleteSentence(this.props.navigation);
}

const styles = StyleSheet.create({
  rightMargin: {
    marginRight: marginWidth
  },
  halfRightMargin: {
    marginRight: halfMarginWidth
  }
});

export default connect(null, { addOccurrence, deleteSentence })(GeneralActions);
