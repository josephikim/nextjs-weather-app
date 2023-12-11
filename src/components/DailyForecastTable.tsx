import { Table } from 'react-bootstrap'
import { getShortDisplayDay } from 'utils/weather'
import { useLocalData } from 'hooks/useLocalData'

interface DailyForecastTableRow {
  dayShort: string
  date: string
  tempHigh: number
  tempLow: number
  precipitation: number
  windSpeed: number
  windDirection: number
  weatherCode: number
}

const getDailyForecastTableRows = (dailyData: any, timezone: string) => {
  const result: DailyForecastTableRow[] = []
  for (let i = 0; i < dailyData.time.length; i++) {
    result.push({
      dayShort: getShortDisplayDay(dailyData.time[i], timezone),
      date: dailyData.time[i],
      tempHigh: dailyData.temperature2mMax[i],
      tempLow: dailyData.temperature2mMin[i],
      precipitation: dailyData.precipitationSum[i],
      windSpeed: dailyData.windSpeed10mMax[i],
      windDirection: dailyData.windDirection10mDominant[i],
      weatherCode: dailyData.weatherCode[i],
    })
  }
  return result
}

interface DailyForecastTableProps {
  data: {
    celsius: string
    fahrenheit: string
  }
}

const DailyForecastTable = ({ data }: DailyForecastTableProps) => {
  const {
    state: { temperatureUnit },
  } = useLocalData()

  const json =
    temperatureUnit === 'c'
      ? JSON.parse(data.celsius)
      : JSON.parse(data.fahrenheit)

  const rowData = getDailyForecastTableRows(json.daily, json.timezone)

  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th>Date</th>
          <th>
            High <span>&#176;</span>
            {`${temperatureUnit.toUpperCase()}`}
          </th>
          <th>
            Low <span>&#176;</span>
            {`${temperatureUnit.toUpperCase()}`}
          </th>
          <th>Precipitation ({json.daily.precipitationSumUnit})</th>
          <th>Wind Speed({json.daily.windSpeed10mMaxUnit})</th>
          <th>Direction({json.daily.windDirection10mDominantUnit})</th>
        </tr>
      </thead>
      <tbody>
        {rowData.map((row) => (
          <tr key={row.date}>
            <td>
              <i className={`wi wi-wmo4680-${row.weatherCode}`}></i>
            </td>
            <td>{row.dayShort}</td>
            <td>{row.date}</td>
            <td>{row.tempHigh}</td>
            <td>{row.tempLow}</td>
            <td>{row.precipitation}</td>
            <td>{row.windSpeed}</td>
            <td>{row.windDirection}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default DailyForecastTable
