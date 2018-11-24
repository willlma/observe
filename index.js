import React from 'react';
import { AppRegistry, SafeAreaView } from 'react-native';
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
import { white } from './src/styles/colors';
// TODO: remove YellowBox in next react-navigation update. See https://github.com/react-navigation/react-navigation/issues/3956
console.ignoredYellowBox = ['Remote debugger', 'Warning: isMounted'];

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
  //<SafeAreaView style={{ flex: 1, backgroundColor: white }}>
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  // </SafeAreaView>
);

AppRegistry.registerComponent('observe', () => observe);
