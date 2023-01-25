import * as React from 'react'

type TemperatureUnit = 'f' | 'c'
type Action = { type: 'SWITCH_TEMPERATURE_UNIT' }
type Dispatch = (action: Action) => void
type UserSettingsProviderProps = { children: React.ReactNode }

type UserSettings = {
  temperatureUnit: TemperatureUnit
}

const INITIAL_STATE = {
  temperatureUnit: 'f',
} as UserSettings

const UserSettings = React.createContext<
  | {
      state: UserSettings
      dispatch: Dispatch
    }
  | undefined
>(undefined)

const userReducer = (state: UserSettings, action: Action): UserSettings => {
  switch (action.type) {
    case 'SWITCH_TEMPERATURE_UNIT': {
      return {
        ...state,
        temperatureUnit: state.temperatureUnit === 'f' ? 'c' : 'f',
      }
    }
    default: {
      throw new Error()
    }
  }
}

const UserSettingsProvider = ({ children }: UserSettingsProviderProps) => {
  const [state, dispatch] = React.useReducer(userReducer, INITIAL_STATE)
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch }
  return <UserSettings.Provider value={value}>{children}</UserSettings.Provider>
}

const useUserSettings = () => {
  const context = React.useContext(UserSettings)
  if (context === undefined) {
    throw new Error(
      'userUserSettings must be used within a UserSettingsProvider'
    )
  }
  return context
}

export { UserSettingsProvider, useUserSettings }
