import * as React from 'react'

export type TemperatureUnit = 'f' | 'c'
type Theme = 'light' | 'dark'
type SearchResult = {
  label: string
  value: string
}
type Action =
  | { type: 'UPDATE_TEMPERATURE_UNIT'; payload: TemperatureUnit }
  | { type: 'SWITCH_THEME'; payload: Theme }
  | { type: 'UPDATE_SEARCH_RESULT'; payload: SearchResult }
type Dispatch = (action: Action) => void
type LocalDataProviderProps = { children: React.ReactNode }

type UserState = {
  temperatureUnit: TemperatureUnit
  theme: Theme
  searchResult: SearchResult
}

const INITIAL_STATE = {
  temperatureUnit: 'f',
  theme: 'dark',
  searchResult: {
    label: '',
    value: '',
  },
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
    case 'UPDATE_TEMPERATURE_UNIT': {
      return {
        ...state,
        temperatureUnit: action.payload,
      }
    }
    case 'SWITCH_THEME': {
      return {
        ...state,
        theme: action.payload,
      }
    }
    case 'UPDATE_SEARCH_RESULT': {
      return {
        ...state,
        searchResult: action.payload,
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
