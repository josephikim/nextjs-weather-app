import { WeatherApiDailyData } from 'schemas/weatherApiDailyData'
import DailyForecastSummaryItem from 'components/DailyForecastSummaryItem'
import classes from 'styles/sass/DailyForecastSummary.module.scss'
import { getShortDisplayDay } from 'utils/weather'

interface DailyForecastSummaryProps {
  data: WeatherApiDailyData
}

const DailyForecastSummary = ({ data }: DailyForecastSummaryProps) => {
  const dateIterator = Array.from(Array(7).keys())

  const jsx = dateIterator.map((index) => {
    const displayMinTemp = Math.round(data.temperature2mMin[index])
    const displayMaxTemp = Math.round(data.temperature2mMax[index])
    const dateString = data.time[index]
    const displayDay = getShortDisplayDay(dateString)
    return (
      <div className={classes.flexChild} key={dateString}>
        <DailyForecastSummaryItem
          day={displayDay}
          minTemp={displayMinTemp}
          maxTemp={displayMaxTemp}
          weathercode={data.weatherCode[index]}
          daySelectKey={index + 1}
        />
      </div>
    )
  })

  return <div className={classes.flexContainer}>{jsx}</div>
}

export default DailyForecastSummary
