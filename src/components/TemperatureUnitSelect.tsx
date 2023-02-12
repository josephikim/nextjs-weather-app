import { TemperatureUnit } from 'hooks/useLocalData'
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
          <span>°F</span>
          <span> / </span>
          <a
            id="c"
            href="#"
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
            href="#"
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
