import { useLocalData } from 'hooks/useLocalData'
import classes from 'styles/sass/TemperatureUnitSelect.module.scss'

export const TemperatureUnitSelect = () => {
  const {
    state: { temperatureUnit },
    dispatch,
  } = useLocalData()

  switch (temperatureUnit) {
    case 'f':
      return (
        <div className={classes.wrapper}>
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
        <div className={classes.wrapper}>
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
