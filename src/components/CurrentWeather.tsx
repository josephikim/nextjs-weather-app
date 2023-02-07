import { ForecastCurrentWeatherViewModel } from 'viewModels/forecastCurrentWeatherViewModel'
import { ForecastDailyDataViewModel } from 'viewModels/forecastDailyDataViewModel'
import { ForecastDailyUnitsViewModel } from 'viewModels/forecastDailyUnitsViewModel'
import { ForecastHourlyDataViewModel } from 'viewModels/forecastHourlyDataViewModel'
import { ForecastHourlyUnitsViewModel } from 'viewModels/forecastHourlyUnitsViewModel'
import { TemperatureUnitSelect } from 'components/TemperatureUnitSelect'
import { degToCompass } from 'utils/weather'
import { getWmoDescription } from 'utils/meteo'
import dayjs from 'dayjs'
import classes from 'styles/sass/CurrentWeather.module.scss'

interface CurrentWeatherProps {
  currentWeather: ForecastCurrentWeatherViewModel
  daily: ForecastDailyDataViewModel
  dailyUnits: ForecastDailyUnitsViewModel
  hourly: ForecastHourlyDataViewModel
  hourlyUnits: ForecastHourlyUnitsViewModel
}

const CurrentWeather = ({
  currentWeather,
  daily,
  dailyUnits,
  hourly,
  hourlyUnits,
}: CurrentWeatherProps) => {
  const displayDate = dayjs(daily.time[0]).format('dddd MM/DD/YYYY')
  const displayCondition = getWmoDescription(currentWeather.weathercode)
  return (
    <div className={classes.flexContainer}>
      <div className={classes.flexChild}>
        <i
          className={`${classes.icon} wi wi-wmo4680-${currentWeather.weathercode}`}
        ></i>
        <div className={classes.alignTop}>
          <span className={classes.temperature}>
            {currentWeather.temperature}
          </span>
          <TemperatureUnitSelect />
        </div>
      </div>
      <div className={classes.flexChild}>
        <div>
          <span className="heading">Precipitation (24 hour): </span>
          <span>{Math.trunc(daily.precipitation_sum[0])}</span>
          <span className="small">{dailyUnits.precipitation_sum}</span>
        </div>
        <div>
          <span className="heading">Humidity: </span>
          <span>{hourly.relativehumidity_2m[0]}</span>
          <span>{hourlyUnits.relativehumidity_2m}</span>
        </div>
        <div>
          <span className="heading">Wind Speed: </span>
          <span>{currentWeather.windspeed}</span>
          <span>km per hour</span>
        </div>
        <div>
          <span className="heading">Wind Direction: </span>
          <span>{degToCompass(currentWeather.winddirection)}</span>
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
