import { ForecastDailyDataViewModel } from 'viewModels/forecastDailyDataViewModel'
import DailyForecastSummaryItem from 'components/DailyForecastSummaryItem'
import classes from 'styles/sass/DailyForecastSummary.module.scss'
import { getDisplayDay } from 'utils/weather'

interface DailyForecastSummaryProps {
  daily: ForecastDailyDataViewModel
}

const DailyForecastSummary = ({ daily }: DailyForecastSummaryProps) => {
  const dateIterator = Array.from(Array(7).keys())

  const jsx = dateIterator.map((index) => {
    const displayMinTemp = Math.round(daily.temperature_2m_min[index])
    const displayMaxTemp = Math.round(daily.temperature_2m_max[index])
    const displayDay = getDisplayDay(daily.time[index])
    return (
      <div className={classes.flexChild} key={daily.time[index]}>
        <DailyForecastSummaryItem
          day={displayDay}
          minTemp={displayMinTemp}
          maxTemp={displayMaxTemp}
          weathercode={daily.weathercode[index]}
          daySelectKey={index + 1}
        />
      </div>
    )
  })

  return <div className={classes.flexContainer}>{jsx}</div>
}

export default DailyForecastSummary
