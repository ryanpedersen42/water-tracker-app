import React, { useState, useEffect } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import ReduxThunk from 'redux-thunk';

import TabNavigator from './navigation/screen-navigation';
import waterReducer from './store/water-reducer';

const rootReducer = combineReducers({
  water: waterReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'inconsolata-regular': require('./assets/fonts/Inconsolata-Regular.ttf'),
    'inconsolata-bold': require('./assets/fonts/Inconsolata-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  // useEffect(() => {
  //   checkDate()
  // }, []);
  
  // const dispatch = useDispatch()

  // const checkDate = async () => {
  //   let storedDate = await getStoredDate()
  //   let currentDateString = moment().format("MMM Do YY")

  //   if (storedDate) {
  //     if (moment(currentDateString).isAfter(storedDate)) {
  //       try {
  //         await AsyncStorage.setItem('storedDate', currentDateString)
  //         await dispatch(resetDailyConsumption())
  //       } catch(err) {
  //         console.log(err)
  //       }
  //     } 
  //   } else {
  //     try {
  //       await AsyncStorage.setItem('storedDate', currentDateString)
  //     } catch(err) {
  //       console.log(err)
  //     }
  //   }

  // //   if (currentDateString < date2) {
  // //     console.log('greater')
  // //   } else {
  // //     console.log('not')
  // //   }
  // //   await console.log(currentDateString)
  // }

  // const getStoredDate = async () => {
  //   const storedDate = await AsyncStorage.getItem('storedDate')

  //   if (!storedDate) {
  //     const newDate = await moment().format("MMM Do YY");
  //     AsyncStorage.setItem('storedDate', JSON.stringify(newDate))
  //   } else {
  //     return storedDate;
  //   }
  // }

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
