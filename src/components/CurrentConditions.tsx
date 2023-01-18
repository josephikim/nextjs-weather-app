import type { CurrentWeatherViewModel } from 'viewModels/currentWeatherViewModel'
import classes from 'styles/sass/CurrentConditions.module.scss'

interface CurrentConditionsProps {
  current: CurrentWeatherViewModel
}

const CurrentConditions = ({ current }: CurrentConditionsProps) => (
  <div className="CurrentConditions">
    <div className="flex-container">
      <div className="child">
        <i className="wi wi-wmo4680-1"></i>
      </div>
      <div className="child">{current.time}</div>
    </div>
  </div>
)

export default CurrentConditions
