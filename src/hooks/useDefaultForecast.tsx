import * as React from 'react'
import { c2fInt } from 'utils/weather'

type TemperatureUnit = 'f' | 'c'
type Theme = 'light' | 'dark'
type Action = { type: 'SWITCH_TEMPERATURE_UNIT' } | { type: 'SWITCH_THEME' }
type Dispatch = (action: Action) => void
type LocalDataProviderProps = { children: React.ReactNode }

type UserState = {
  temperatureUnit: TemperatureUnit
  theme: Theme
}

const INITIAL_STATE = {
  temperatureUnit: 'f',
  theme: 'dark',
} as UserState

const LocalData = React.createContext<
  | {
      state: UserState
      dispatch: Dispatch
    }
  | undefined
>(undefined)

const userReducer = (state: UserState, action: Action): UserState => {
  switch (action.type) {
    case 'SWITCH_TEMPERATURE_UNIT': {
      return {
        ...state,
        temperatureUnit: state.temperatureUnit === 'f' ? 'c' : 'f',
      }
    }
    case 'SWITCH_THEME': {
      return {
        ...state,
        theme: state.theme === 'dark' ? 'light' : 'dark',
      }
    }
    default: {
      throw new Error()
    }
  }
}

const LocalDataProvider = ({ children }: LocalDataProviderProps) => {
  const [state, dispatch] = React.useReducer(userReducer, INITIAL_STATE)
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch }
  return <LocalData.Provider value={value}>{children}</LocalData.Provider>
}

const useLocalData = () => {
  const context = React.useContext(LocalData)
  if (context === undefined) {
    throw new Error('localData must be used within a LocalDataProvider')
  }
  return context
}

export { LocalDataProvider, useLocalData }
