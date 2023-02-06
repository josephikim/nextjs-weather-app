import { ForecastDailyDataViewModel } from 'viewModels/forecastDailyDataViewModel'
import { ForecastDailyUnitsViewModel } from 'viewModels/forecastDailyUnitsViewModel'
import DailyForecastSummaryItem from './DailyForecastSummaryItem'
import classes from 'styles/sass/DailyForecastSummary.module.scss'

interface DailyForecastSummaryProps {
  daily: ForecastDailyDataViewModel
  dailyUnits: ForecastDailyUnitsViewModel
}

const DailyForecastSummary = ({
  daily,
  dailyUnits,
}: DailyForecastSummaryProps) => {
  const dateIterator = Array.from(Array(7).keys())

  const jsx = dateIterator.map((index) => {
    return (
      <div className={classes.flexChild} key={daily.time[index]}>
        <DailyForecastSummaryItem
          date={daily.time[index]}
          minTemp={daily.temperature_2m_min[index]}
          maxTemp={daily.temperature_2m_max[index]}
          weathercode={daily.weathercode[index]}
          minTempUnit={dailyUnits.temperature_2m_min}
          maxTempUnit={dailyUnits.temperature_2m_max}
        />
      </div>
    )
  })

  return <div className={classes.flexContainer}>{jsx}</div>
}

export default DailyForecastSummary
