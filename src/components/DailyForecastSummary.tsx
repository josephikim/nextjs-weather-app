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
      ? JSON.parse(data.celsius)
      : JSON.parse(data.fahrenheit)

  const dateIterator = Array.from(Array(7).keys())

  const jsx = dateIterator.map((index) => {
    const displayMinTemp = Math.round(json.daily.temperature2mMin[index])
    const displayMaxTemp = Math.round(json.daily.temperature2mMax[index])
    const dateString = json.daily.time[index]
    const displayDay = getShortDisplayDay(dateString, json.timezone)
    return (
      <div className={classes.flexChild} key={dateString}>
        <DailyForecastSummaryItem
          day={displayDay}
          minTemp={displayMinTemp}
          maxTemp={displayMaxTemp}
          weathercode={json.daily.weatherCode[index]}
          daySelectKey={index + 1}
        />
      </div>
    )
  })

  return <div className={classes.flexContainer}>{jsx}</div>
}

export default DailyForecastSummary
