import * as actionTypes from "../actions/actionTypes"
import { updateState } from "../../utilities/reducre"


const initState = {
  currentScreen: null
}



const updateCurrentScreen = (state, action) => {
  return (
      updateState(state, {
          currentScreen: action.currentScreen
      })
  )
}

export const appReducer = (state=initState, action) => {
  switch(action.type){
      case actionTypes.CURRENT_SCREEN: return updateCurrentScreen(state, action);
      default:
          return state
  }
}