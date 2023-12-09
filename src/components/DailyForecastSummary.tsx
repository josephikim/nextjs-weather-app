import { getShortDisplayDay } from 'utils/weather'
import { useLocalData } from 'hooks/useLocalData'
import DailyForecastSummaryItem from 'components/DailyForecastSummaryItem'
import classes from 'styles/sass/DailyForecastSummary.module.scss'

interface DailyForecastSummaryProps {
  data: {
    celsius: string
    fahrenheit: string
  }
}

const DailyForecastSummary = ({ data }: DailyForecastSummaryProps) => {
  const {
    state: { temperatureUnit },
  } = useLocalData()

  const json =
    temperatureUnit === 'c'
      ? JSON.parse(data.celsius).daily
      : JSON.parse(data.fahrenheit).daily

  const dateIterator = Array.from(Array(7).keys())

  const jsx = dateIterator.map((index) => {
    const displayMinTemp = Math.round(json.temperature2mMin[index])
    const displayMaxTemp = Math.round(json.temperature2mMax[index])
    const dateString = json.time[index]
    const displayDay = getShortDisplayDay(dateString)
    return (
      <div className={classes.flexChild} key={dateString}>
        <DailyForecastSummaryItem
          day={displayDay}
          minTemp={displayMinTemp}
          maxTemp={displayMaxTemp}
          weathercode={json.weatherCode[index]}
          daySelectKey={index + 1}
        />
      </div>
    )
  })

  return <div className={classes.flexContainer}>{jsx}</div>
}

export default DailyForecastSummary
