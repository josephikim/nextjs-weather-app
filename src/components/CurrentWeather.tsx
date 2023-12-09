import dayjs from 'dayjs'
import { getWmoDescription } from 'utils/meteo'
import { degToCompass } from 'utils/weather'
import { useLocalData } from 'hooks/useLocalData'
import TemperatureUnitSelect from 'components/TemperatureUnitSelect'
import classes from 'styles/sass/CurrentWeather.module.scss'

interface CurrentWeatherProps {
  data: {
    celsius: string
    fahrenheit: string
  }
}

const CurrentWeather = ({ data }: CurrentWeatherProps) => {
  const {
    state: { temperatureUnit },
  } = useLocalData()

  const json =
    temperatureUnit === 'c'
      ? JSON.parse(data.celsius)
      : JSON.parse(data.fahrenheit)

  const displayDay = dayjs(json.daily.time[0]).format('dddd')
  const displayDate = dayjs(json.daily.time[0]).format('MM/DD/YYYY')
  const displayCondition = getWmoDescription(json.current.weatherCode)

  return (
    <div className={classes.flexContainer}>
      <div className={classes.flexChild}>
        <i
          className={`${classes.icon} wi wi-wmo4680-${json.current.weatherCode}`}
        ></i>
        <div className={classes.alignTop}>
          <span className={classes.temperature}>
            {json.current.temperature2m}
          </span>
          <TemperatureUnitSelect />
        </div>
      </div>
      <div className={classes.flexChild}>
        <div className={classes.fieldName}>
          <span className="heading">Precipitation (24 Hr):</span>
        </div>
        <div className={classes.fieldValue}>
          <span>{Math.trunc(json.daily.precipitationSum[0])} </span>
          <span>{json.daily.precipitationSumUnit}</span>
        </div>
        <div className={classes.fieldName}>
          <span className="heading">Humidity:</span>
        </div>
        <div className={classes.fieldValue}>
          <span>{json.hourly.relativeHumidity2m[0]}</span>
          <span>{json.hourly.relativeHumidity2mUnit}</span>
        </div>

        <div className={classes.fieldName}>
          <span className="heading">Wind Speed:</span>
        </div>
        <div className={classes.fieldValue}>
          <span>{json.current.windSpeed10m} </span>
          <span>mph</span>
        </div>

        <div className={classes.fieldName}>
          <span className="heading">Wind Direction:</span>
        </div>
        <div className={classes.fieldValue}>
          <span>{degToCompass(json.current.windDirection10m)}</span>
        </div>
      </div>

      <div className={classes.flexChild}>
        <div>{displayDay}</div>
        <div>{displayDate}</div>
        <div>{displayCondition}</div>
      </div>
    </div>
  )
}

export default CurrentWeather
