import { UPDATE_WATER_GOAL, REDUCE_WATER, ADJUST_WATER, RESET_WATER, APP_READY } from './water-constants';

const initialState = {
  waterGoal: 80,
  waterProgress: 0,
  isAppReady: false,
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
      case RESET_WATER: 
       return {
         ...state,
         waterProgress: 0
       }
       case APP_READY: 
        return {
          ...state,
          isAppReady: true
        } 
      default: 
        return state;
  }
}