// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import HeaderButtons, { Item } from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  deleteSelectedOccurrences
} from 'src/modules/core/actionCreators/detailedChartsActionCreators';
import { iconPrefix } from 'src/libs/constants';
import { halfMarginWidth, iconSize } from 'src/styles/variables';
import type { Navigation } from 'src/libs/types';

type Props = {
  navigation: Navigation,
  deleteSelectedOccurrences: (navigation: Navigation) => void
}

class DeleteOccurrences extends PureComponent<Props> {
  trashIcon = `${iconPrefix}trash`

  render() {
    return (
      <HeaderButtons IconComponent={Icon} iconSize={iconSize}>
        <Item
          buttonWrapperStyle={{ marginRight: halfMarginWidth }}
          iconName={this.trashIcon}
          onPress={this.deleteOccurrences}
          title='Delete'
        />
      </HeaderButtons>
    );
  }

  deleteOccurrences = () =>
    this.props.deleteSelectedOccurrences(this.props.navigation);
}

export default connect(null, { deleteSelectedOccurrences })(DeleteOccurrences);
