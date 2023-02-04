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
  current: ForecastCurrentWeatherViewModel
  daily: ForecastDailyDataViewModel
  dailyUnits: ForecastDailyUnitsViewModel
  hourly: ForecastHourlyDataViewModel
  hourlyUnits: ForecastHourlyUnitsViewModel
}

const CurrentWeather = ({
  current,
  daily,
  dailyUnits,
  hourly,
  hourlyUnits,
}: CurrentWeatherProps) => {
  const displayDate = dayjs(daily.time[0]).format('dddd MM/DD/YYYY')
  const displayCondition = getWmoDescription(current.weathercode)
  return (
    <div className="CurrentWeather">
      <div className="flex-container">
        <div className="child">
          <i className="wi wi-wmo4680-1"></i>
          <span className="large">{current.temperature}</span>
          <TemperatureUnitSelect />
        </div>
        <div className="child">
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
            <span>{current.windspeed}</span>
            <span>km per hour</span>
          </div>
          <div>
            <span className="heading">Wind Direction: </span>
            <span>{degToCompass(current.winddirection)}</span>
          </div>
        </div>

        <div className="child">
          <div>
            <span>{displayDate}</span>
          </div>
          <div>
            <span>{displayCondition}</span>
          </div>
        </div>
      </div>
      <div className="child"></div>
    </div>
  )
}

export default CurrentWeather
