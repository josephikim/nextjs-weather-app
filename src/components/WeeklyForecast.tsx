import type { DailyDataViewModel } from 'viewModels/dailyDataViewModel'
import type { DailyUnitsViewModel } from 'viewModels/dailyUnitsViewModel'
import WeeklyForecastItem from './WeeklyForecastItem'
import classes from 'styles/sass/WeeklyForecast.module.scss'

interface WeeklyForecastProps {
  daily: DailyDataViewModel
  units: DailyUnitsViewModel
}

const WeeklyForecast = ({ daily, units }: WeeklyForecastProps) => {
  const dateIterator = Array.from(Array(7).keys())
  const forecast = dateIterator.map((index) => {
    return (
      <div className="child" key={daily.time[index]}>
        <WeeklyForecastItem
          date={daily.time[index]}
          minTemp={daily.temperature_2m_min[index]}
          maxTemp={daily.temperature_2m_max[index]}
          weathercode={daily.weathercode[index]}
          minTempUnit={units.temperature_2m_min}
          maxTempUnit={units.temperature_2m_max}
        />
      </div>
    )
  })
  return <div className="flex-container">{forecast}</div>
}

export default WeeklyForecast
