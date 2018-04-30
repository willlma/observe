import React from 'react';
import { AppRegistry } from 'react-native';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { StackNavigator } from 'react-navigation';
import throttle from 'lodash/throttle';
import HomeContainer from './src/modules/core/containers/homeContainer';
import DetailedChartsContainer from './src/modules/core/containers/detailedChartsContainer';
import * as homeReducers from './src/modules/core/reducers/homeReducers';
import * as detailedChartsReducers from './src/modules/core/reducers/detailedChartsReducers';
import { setItem } from './src/services/storage';
import { startup } from './src/modules/core/actionCreators/actionCreators';
// TODO: remove YellowBox in next react-navigation update. See https://github.com/react-navigation/react-navigation/issues/3956
// import { YellowBox } from 'react-native';
// YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
console.ignoredYellowBox = ['Remote debugger'];
console.ignoredYellowBox = ['Warning: isMounted(...) is deprecated'];

const initialState = undefined;//{ sentences: [{"text":"I walked my dog","occurrences":[{"timestamp":1523485162828,"quantities":[1]}],"id":1},{"text":"I walked my cat","occurrences":[{"timestamp":1523485167920,"quantities":[1]}],"id":2},{"text":"I ran \\d miles","occurrences":[{"timestamp":1523485174797,"quantities":[2]}],"id":3},{"text":"I walked \\d miles","occurrences":[{"timestamp":1523485180059,"quantities":[4]}],"id":4},{"text":"I ate \\dg of sugar","occurrences":[{"timestamp":1523485190486,"quantities":[6]},{"timestamp":1523398941967,"quantities":[7]}],"id":5}] };
const rootReducer = combineReducers({ ...homeReducers, ...detailedChartsReducers });
const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
store.subscribe(throttle(() => {
  setItem('sentences', store.getState().sentences);
}, 1000));
store.dispatch(startup());

const AppNavigator = StackNavigator({
  Home: { screen: HomeContainer },
  DetailedCharts: { screen: DetailedChartsContainer }
}, {
  headerMode: 'screen',
  // navigationOptions: { headerVisible: false }
});

const observe = () => <Provider store={store}><AppNavigator /></Provider>;

AppRegistry.registerComponent('observe', () => observe);
