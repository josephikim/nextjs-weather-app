import { ForecastDailyDataViewModel } from 'viewModels/forecastDailyDataViewModel'
import DailyForecastSummaryItem from './DailyForecastSummaryItem'
import classes from 'styles/sass/DailyForecastSummary.module.scss'

interface DailyForecastSummaryProps {
  daily: ForecastDailyDataViewModel
}

const DailyForecastSummary = ({ daily }: DailyForecastSummaryProps) => {
  const dateIterator = Array.from(Array(7).keys())

  const jsx = dateIterator.map((index) => {
    return (
      <div className={classes.flexChild} key={daily.time[index].toString()}>
        <DailyForecastSummaryItem
          date={daily.time[index].toString()}
          minTemp={daily.temperature_2m_min[index]}
          maxTemp={daily.temperature_2m_max[index]}
          weathercode={daily.weathercode[index]}
        />
      </div>
    )
  })

  return <div className={classes.flexContainer}>{jsx}</div>
}

export default DailyForecastSummary
