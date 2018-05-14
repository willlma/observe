// @flow
import React, { PureComponent } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import type { Style } from 'src/libs/types';

const modes = {
  date: 'date',
  time: 'time',
  dateTime: 'datetime'
};

type Props = {
  index: number,
  styles: Style,
  time: Date,
  is24Hour: boolean,
  updateDate: (number, Date) => void
};

type State = {
  datePickerMode: ?string
}

export default class Time extends PureComponent<Props, State> {
  state = { datePickerMode: undefined }

  render() {
    const { styles, time, is24Hour } = this.props;
    const calendarDate = moment(time).calendar(null, {
      lastWeek: 'dddd [at] h:mm A'
    });
    const dateTimeSeperator = ' at ';
    const separatorIndex = calendarDate.indexOf(dateTimeSeperator);
    if (separatorIndex === -1) {
      return (
        <TouchableHighlight onPress={this.onDateTimePress}>
          <Text style={styles.text}>{calendarDate}</Text>
        </TouchableHighlight>
      );
    }
    return (
      <View style={styles.row}>
        <TouchableHighlight onPress={this.onDatePress}>
          <Text style={styles.text}>{calendarDate.substr(0, separatorIndex)}</Text>
        </TouchableHighlight>
        <Text style={styles.text}>{dateTimeSeperator}</Text>
        <TouchableHighlight onPress={this.onTimePress}>
          <Text style={styles.text}>
            {calendarDate.substr(separatorIndex + dateTimeSeperator.length)}
          </Text>
        </TouchableHighlight>
        <DateTimePicker
          date={time}
          is24Hour={is24Hour}
          isVisible={!!this.state.datePickerMode}
          maximumDate={new Date()}
          mode={this.state.datePickerMode}
          onConfirm={this.onConfirm}
          onCancel={this.resetMode}
        />
      </View>
    );
  }

  onDatePress = () => this.setState({ datePickerMode: modes.date })
  onTimePress = () => this.setState({ datePickerMode: modes.time })
  onDateTimePress = () => this.setState({ datePickerMode: modes.dateTime })

  updateDate = (date: Date) => {
    const oldDate = moment(this.props.time);
    return moment(date)
      .hour(oldDate.hour())
      .minute(oldDate.minute())
      .second(oldDate.second())
      .millisecond(oldDate.millisecond())
      .toDate();
  }

  updateTime = (date: Date) => {
    const oldDate = moment(this.props.time);
    return moment(date)
      .year(oldDate.year())
      .month(oldDate.month())
      .day(oldDate.day())
      .toDate();
  }

  resetMode = () => {
    this.setState({ datePickerMode: undefined });
  }

  onConfirm = (date: Date) => {
    const { index, updateDate } = this.props;
    const { datePickerMode } = this.state;
    const newDate = (datePickerMode === modes.date && this.updateDate(date))
      || (datePickerMode === modes.time && this.updateTime(date))
      || date;
    updateDate(index, newDate);
    this.resetMode();
  }
}
