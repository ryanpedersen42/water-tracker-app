import { UPDATE_WATER_GOAL, ADJUST_WATER, RESET_WATER, APP_READY } from './water-constants';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const setNewGoal = (newGoal) => {
  try {
    AsyncStorage.setItem('waterGoal', JSON.stringify(newGoal));
  } catch(err) {
    console.log(err)
  }
  return { type: UPDATE_WATER_GOAL, payload: newGoal };
};

export const updateDailyConsumption = (adjustedWater) => {
  try {
    AsyncStorage.setItem('waterProgress', JSON.stringify(adjustedWater))
  } catch(err) {
    console.log(err)
  }
  return { type: ADJUST_WATER, payload: adjustedWater } 
}

export const resetDailyConsumption = () => {
  try {
    AsyncStorage.setItem('waterProgress', JSON.stringify(0))
  } catch(err) {
    console.log(err)
  }
  return { type: RESET_WATER }
}

export const setAppReady = () => {
  return { type: APP_READY }
}