import { ForecastHourlyDataViewModel } from 'viewModels/forecastHourlyDataViewModel'
import { ForecastHourlyUnitsViewModel } from 'viewModels/forecastHourlyUnitsViewModel'

import classes from 'styles/sass/HourlyWeatherGraph.module.scss'

interface HourlyWeatherProps {
  hourly: ForecastHourlyDataViewModel
  hourlyUnits: ForecastHourlyUnitsViewModel
}

const HourlyWeatherGraph = ({ hourly, hourlyUnits }: HourlyWeatherProps) => {
  return (
    <div className="HourlyWeatherGraph">
      <div className="flex-container">graph here</div>
    </div>
  )
}

export default HourlyWeatherGraph
