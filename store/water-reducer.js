import { SET_GOAL, UPDATE_WATER_GOAL, REDUCE_WATER } from './water-constants';

const initialState = {
  waterGoal: 64,
  waterProgress: 10,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_WATER_GOAL:
      return {
        ...state,
        waterGoal: action.payload
      }
      case REDUCE_WATER:
        return {
          ...state,
          waterGoal: action.payload
        }
      case SET_GOAL: 
        return {
          ...state,
          waterGoal: action.payload
        }
      default: 
      return state;
  }
} 