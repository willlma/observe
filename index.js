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


const now = Date.now();
const day = 864e5;
const sentences = [{
  id: 1,
  text: 'I walked my dog',
  occurrences: [
    { timestamp: now, quantities: [1] },
    { timestamp: now - day, quantities: [1] },
    { timestamp: now - day * 3, quantities: [1] }
  ]
}, {
  id: 2,
  text: 'I walked my cat',
  occurrences: [
    { timestamp: now - (day * 2), quantities: [1] },
    { timestamp: now - (day * 4), quantities: [1] }
  ]
}, {
  id: 3,
  text: 'I walked Matt\'s cat',
  occurrences: [
    { timestamp: now - day, quantities: [1] },
    { timestamp: now - (day * 5), quantities: [1] }
  ]
}, {
  id: 4,
  text: 'I walked Matt\'s dog',
  occurrences: [
    { timestamp: now - (day * 7), quantities: [1] },
    { timestamp: now - (day * 8), quantities: [1] }
  ]
}, {
  id: 5,
  text: 'I ran \\d miles',
  occurrences: [
    { timestamp: now, quantities: [3] },
    { timestamp: now - day, quantities: [4.5] },
    { timestamp: now - day * 3, quantities: [1.8] }
  ]
}, {
  id: 6,
  text: 'Nicole and I made pasta',
  occurrences: [
    { timestamp: now - day, quantities: [1] }
  ]
}];
const initialState = undefined;//{ sentences };
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
