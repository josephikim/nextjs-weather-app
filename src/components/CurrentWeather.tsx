import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { Unit } from '@openmeteo/sdk/unit'
import { getWmoDescription } from 'utils/meteo'
import { degToCompass } from 'utils/weather'
import { useLocalData } from 'hooks/useLocalData'
import TemperatureUnitSelect from 'components/TemperatureUnitSelect'
import displayUnits from 'assets/displayUnits.json'
import classes from 'styles/sass/CurrentWeather.module.scss'

// set up dayjs plugins
dayjs.extend(utc)
dayjs.extend(timezone)

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

  const displayWeatherIcon = `wi-wmo4680-${json.current.weatherCode}`
  const displayTemp = Math.round(json.current.temperature2m)
  const displayDay = dayjs.tz(json.daily.time[0], json.timezone).format('dddd')
  const displayDate = dayjs
    .tz(json.daily.time[0], json.timezone)
    .format('MM/DD/YYYY')
  const displayCondition = getWmoDescription(json.current.weatherCode)
  const displayPrecipitation = Math.trunc(json.daily.precipitationSum[0])
  const displayPrecipitationUnit =
    displayUnits[
      Unit[json.daily.precipitationSumUnit] as keyof typeof displayUnits
    ]
  const displayHumidity = Math.round(json.hourly.relativeHumidity2m[0])
  const displayHumidityUnit =
    displayUnits[
      Unit[json.hourly.relativeHumidity2mUnit] as keyof typeof displayUnits
    ]
  const displayWindSpeed = Math.round(json.current.windSpeed10m)
  const displayWindSpeedUnit =
    displayUnits[
      Unit[json.current.windSpeed10mUnit] as keyof typeof displayUnits
    ]
  const displayWindDirection = degToCompass(json.current.windDirection10m)

  return (
    <div className={classes.flexContainer}>
      <div className={classes.flexChild}>
        <i className={`${classes.icon} wi ${displayWeatherIcon}`}></i>
        <span className={classes.temperature}>
          <p>{displayTemp}</p>
        </span>
        <TemperatureUnitSelect />
      </div>
      <div className={classes.flexChild}>
        <div>{displayDay}</div>
        <div>{displayDate}</div>
        <div>{displayCondition}</div>
      </div>
      <div className={classes.flexChild}>
        <div className={classes.fieldName}>
          <span className="heading">Precipitation (24-hr):</span>
        </div>
        <div className={classes.fieldValue}>
          <span>{displayPrecipitation} </span>
          <span>{displayPrecipitationUnit}</span>
        </div>
        <div className={classes.fieldName}>
          <span className="heading">Humidity:</span>
        </div>
        <div className={classes.fieldValue}>
          <span>{displayHumidity}</span>
          <span>{displayHumidityUnit}</span>
        </div>

        <div className={classes.fieldName}>
          <span className="heading">Wind Speed:</span>
        </div>
        <div className={classes.fieldValue}>
          <span>{displayWindSpeed} </span>
          <span>{displayWindSpeedUnit}</span>
        </div>

        <div className={classes.fieldName}>
          <span className="heading">Wind Direction:</span>
        </div>
        <div className={classes.fieldValue}>
          <span>{displayWindDirection}</span>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather
