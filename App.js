import React, { useState } from 'react';
import { createStore, combineReducers } from 'redux';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';

import TabNavigator from './navigation/screen-navigation';
import waterReducer from './store/water-reducer';

const rootReducer = combineReducers({
  water: waterReducer
});

const fetchFonts = () => {
  return Font.loadAsync({
    'inconsolata-regular': require('./assets/fonts/Inconsolata-Regular.ttf'),
    'inconsolata-bold': require('./assets/fonts/Inconsolata-Bold.ttf')
  });
};

const store = createStore(rootReducer);

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  return (
  <Provider store={store}>
    <TabNavigator />
  </Provider>
  );
}
