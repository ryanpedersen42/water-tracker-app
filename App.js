import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { Ionicons } from '@expo/vector-icons';

import TabNavigator from './navigation/screen-navigation';

import waterReducer from './store/water-reducer';

const rootReducer = combineReducers({
  water: waterReducer
});

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
    <TabNavigator />
  </Provider>
  );
}
