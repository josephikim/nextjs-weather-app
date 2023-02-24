import dayjs from 'dayjs'
import { ForecastCurrentWeatherViewModel } from 'viewModels/forecastCurrentWeatherViewModel'
import { ForecastDailyDataViewModel } from 'viewModels/forecastDailyDataViewModel'
import { ForecastDailyUnitsViewModel } from 'viewModels/forecastDailyUnitsViewModel'
import { ForecastHourlyDataViewModel } from 'viewModels/forecastHourlyDataViewModel'
import { ForecastHourlyUnitsViewModel } from 'viewModels/forecastHourlyUnitsViewModel'
import TemperatureUnitSelect from './TemperatureUnitSelect'
import { degToCompass } from 'utils/weather'
import { getWmoDescription } from 'utils/meteo'
import classes from 'styles/sass/CurrentWeather.module.scss'

interface CurrentWeatherProps {
  current_weather: ForecastCurrentWeatherViewModel
  daily: ForecastDailyDataViewModel
  daily_units: ForecastDailyUnitsViewModel
  hourly: ForecastHourlyDataViewModel
  hourly_units: ForecastHourlyUnitsViewModel
}

const CurrentWeather = ({
  current_weather,
  daily,
  daily_units,
  hourly,
  hourly_units,
}: CurrentWeatherProps) => {
  const displayDate = dayjs(daily.time[0]).format('dddd MM/DD/YYYY')
  const displayCondition = getWmoDescription(current_weather.weathercode)
  return (
    <div className={classes.flexContainer}>
      <div className={classes.flexChild}>
        <i
          className={`${classes.icon} wi wi-wmo4680-${current_weather.weathercode}`}
        ></i>
        <div className={classes.alignTop}>
          <span className={classes.temperature}>
            {current_weather.temperature}
          </span>
          <TemperatureUnitSelect />
        </div>
      </div>
      <div className={classes.flexChild}>
        <div>
          <span className="heading">24-Hour Precipitation: </span>
          <span>{Math.trunc(daily.precipitation_sum[0])} </span>
          <span>{daily_units.precipitation_sum + 'es'}</span>
        </div>
        <div>
          <span className="heading">Humidity: </span>
          <span>{hourly.relativehumidity_2m[0]}</span>
          <span>{hourly_units.relativehumidity_2m}</span>
        </div>
        <div>
          <span className="heading">Wind Speed: </span>
          <span>{current_weather.windspeed} </span>
          <span>mph</span>
        </div>
        <div>
          <span className="heading">Wind Direction: </span>
          <span>{degToCompass(current_weather.winddirection)}</span>
        </div>
      </div>

      <div className={classes.flexChild}>
        <div>{displayDate}</div>
        <div>{displayCondition}</div>
      </div>
    </div>
  )
}

export default CurrentWeather
