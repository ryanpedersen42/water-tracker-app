import { UPDATE_WATER_GOAL, ADJUST_WATER } from './water-constants';

export const updateWaterGoal = (newGoal) => {
  return { type: UPDATE_WATER_GOAL, payload: newGoal };
};

export const reduceWater = (newGoal) => {
  return { type: REDUCE_WATER, payload: newGoal}
}

export const setGoal = (newGoal) => {
  return { type: REDUCE_WATER, payload: newGoal}
}

export const updateDailyConsumption = (adjustedWater) => {
  return { type: ADJUST_WATER, payload: adjustedWater } 
}