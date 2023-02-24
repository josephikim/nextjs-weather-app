import { TemperatureUnit } from 'hooks/useLocalData'
import { useLocalData } from 'hooks/useLocalData'
import classes from 'styles/sass/TemperatureUnitSelect.module.scss'

const TemperatureUnitSelect = () => {
  const {
    state: { temperatureUnit },
    dispatch,
  } = useLocalData()

  switch (temperatureUnit) {
    case 'f':
      return (
        <div className={classes.wrapper}>
          <span>°F</span>
          <span> / </span>
          <a
            id="c"
            className="anchor"
            onClick={(e) =>
              dispatch({
                type: 'UPDATE_TEMPERATURE_UNIT',
                payload: e.currentTarget.id as TemperatureUnit,
              })
            }
          >
            °C
          </a>
        </div>
      )
    case 'c':
      return (
        <div className={classes.wrapper}>
          <a
            id="f"
            className="anchor"
            onClick={(e) =>
              dispatch({
                type: 'UPDATE_TEMPERATURE_UNIT',
                payload: e.currentTarget.id as TemperatureUnit,
              })
            }
          >
            °F
          </a>
          <span> / </span>
          <span>°C</span>
        </div>
      )
  }
}

export default TemperatureUnitSelect
