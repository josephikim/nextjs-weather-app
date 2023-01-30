import { ForecastCurrentWeatherViewModel } from 'viewModels/forecastCurrentWeatherViewModel'
import { TemperatureUnitSelect } from 'components/TemperatureUnitSelect'
import classes from 'styles/sass/CurrentWeather.module.scss'

interface CurrentWeatherProps {
  current: ForecastCurrentWeatherViewModel
}

const CurrentWeather = ({ current }: CurrentWeatherProps) => {
  return (
    <div className="CurrentWeather">
      <div className="flex-container">
        <div className="child">
          <i className="wi wi-wmo4680-1"></i>
          <span className="large">{current.temperature}</span>
          <TemperatureUnitSelect />
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather
