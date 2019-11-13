import { SET_GOAL, UPDATE_WATER_GOAL } from './water-constants';

export const updateWaterGoal = (newGoal) => {
  return { type: UPDATE_WATER_GOAL, payload: newGoal };
};

export const reduceWater = (newGoal) => {
  return { type: REDUCE_WATER, payload: newGoal}
}

export const setGoal = (newGoal) => {
  return { type: REDUCE_WATER, payload: newGoal}
}