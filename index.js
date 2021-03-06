import React from 'react';
import { AppRegistry } from 'react-native';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import throttle from 'lodash/throttle';
import HomeContainer from './src/modules/core/containers/homeContainer';
import DetailedChartsContainer from './src/modules/core/containers/detailedChartsContainer';
import * as homeReducers from './src/modules/core/reducers/homeReducers';
import * as detailedChartsReducers from './src/modules/core/reducers/detailedChartsReducers';
import * as settingsReducers from './src/reducers/settingsReducers';
import { setItem } from './src/services/storage';
import { startup } from './src/modules/core/actionCreators/actionCreators';

const initialState = undefined;
const rootReducer = combineReducers({
  ...detailedChartsReducers,
  ...homeReducers,
  ...settingsReducers
});
const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
store.subscribe(throttle(() => {
  setItem('sentences', store.getState().sentences);
}, 1000));
store.dispatch(startup());

const AppNavigator = createAppContainer(createStackNavigator({
  Home: { screen: HomeContainer },
  DetailedCharts: { screen: DetailedChartsContainer }
}, { headerMode: 'screen' }));

const observe = () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
);

AppRegistry.registerComponent('observe', () => observe);
