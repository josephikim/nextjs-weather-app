import dayjs from 'dayjs'
import TemperatureUnitSelect from 'components/TemperatureUnitSelect'
import { degToCompass } from 'utils/weather'
import { getWmoDescription } from 'utils/meteo'
import { WeatherApiResponse } from 'schemas/weatherApiResponse'
import classes from 'styles/sass/CurrentWeather.module.scss'

interface CurrentWeatherProps {
  data: WeatherApiResponse
}

const CurrentWeather = ({ data }: CurrentWeatherProps) => {
  const displayDay = dayjs(data.daily.time[0]).format('dddd')
  const displayDate = dayjs(data.daily.time[0]).format('MM/DD/YYYY')
  const displayCondition = getWmoDescription(data.current.weatherCode)
  return (
    <div className={classes.flexContainer}>
      <div className={classes.flexChild}>
        <i
          className={`${classes.icon} wi wi-wmo4680-${data.current.weatherCode}`}
        ></i>
        <div className={classes.alignTop}>
          <span className={classes.temperature}>
            {data.current.temperature2m}
          </span>
          <TemperatureUnitSelect />
        </div>
      </div>
      <div className={classes.flexChild}>
        <div className={classes.fieldName}>
          <span className="heading">Precipitation (24 Hr):</span>
        </div>
        <div className={classes.fieldValue}>
          <span>{Math.trunc(data.daily.precipitationSum[0])} </span>
          <span>{data.daily.precipitationSumUnit}</span>
        </div>
        <div className={classes.fieldName}>
          <span className="heading">Humidity:</span>
        </div>
        <div className={classes.fieldValue}>
          <span>{data.hourly.relativeHumidity2m[0]}</span>
          <span>{data.hourly.relativeHumidity2mUnit}</span>
        </div>

        <div className={classes.fieldName}>
          <span className="heading">Wind Speed:</span>
        </div>
        <div className={classes.fieldValue}>
          <span>{data.current.windSpeed10m} </span>
          <span>mph</span>
        </div>

        <div className={classes.fieldName}>
          <span className="heading">Wind Direction:</span>
        </div>
        <div className={classes.fieldValue}>
          <span>{degToCompass(data.current.windDirection10m)}</span>
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
