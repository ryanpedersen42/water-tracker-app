import { UPDATE_WATER_GOAL, REDUCE_WATER, ADJUST_WATER } from './water-constants';

const initialState = {
  waterGoal: 64,
  waterProgress: 0,
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
      case ADJUST_WATER: 
        return {
          ...state,
          waterProgress: state.waterProgress + action.payload
        }
      default: 
      return state;
  }
} 