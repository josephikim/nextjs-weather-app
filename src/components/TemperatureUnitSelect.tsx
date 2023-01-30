import { useLocalData } from 'hooks/useLocalData'

export const TemperatureUnitSelect = () => {
  const {
    state: { temperatureUnit },
    dispatch,
  } = useLocalData()

  switch (temperatureUnit) {
    case 'f':
      return (
        <div className="temperatureUnitSelect">
          <span className="small">°F</span>
          <span className="small"> / </span>
          <a
            id="celsius"
            onClick={() => dispatch({ type: 'SWITCH_TEMPERATURE_UNIT' })}
            className="small"
          >
            °C
          </a>
        </div>
      )
    case 'c':
      return (
        <div className="temperatureUnitSelect">
          <a
            id="fahrenheit"
            onClick={() => dispatch({ type: 'SWITCH_TEMPERATURE_UNIT' })}
            className="small"
          >
            °F
          </a>
          <span className="small"> / </span>
          <span className="small">°C</span>
        </div>
      )
  }
}
