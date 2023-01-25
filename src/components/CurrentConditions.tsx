import type { CurrentWeatherViewModel } from 'viewModels/currentWeatherViewModel'
import { TemperatureUnitSelect } from 'components/TemperatureUnitSelect'
import classes from 'styles/sass/CurrentConditions.module.scss'
interface CurrentConditionsProps {
  current: CurrentWeatherViewModel
}

const CurrentConditions = ({ current }: CurrentConditionsProps) => {
  return (
    <div className="CurrentConditions">
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

export default CurrentConditions
