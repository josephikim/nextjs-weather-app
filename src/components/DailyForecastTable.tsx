import { Table } from 'react-bootstrap'
import { WeatherApiDailyData } from 'schemas/weatherApiDailyData'
import { useLocalData } from 'hooks/useLocalData'
import { getShortDisplayDay } from 'utils/weather'

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

interface DailyForecastTableProps {
  data: WeatherApiDailyData
}

const getDailyForecastTableRows = (input: any) => {
  const result: DailyForecastTableRow[] = []
  for (let i = 0; i < input.time.length; i++) {
    result.push({
      dayShort: getShortDisplayDay(input.time[i]),
      date: input.time[i],
      tempHigh: input.temperature2mMax[i],
      tempLow: input.temperature2mMin[i],
      precipitation: input.precipitationSum[i],
      windSpeed: input.windSpeed10mMax[i],
      windDirection: input.windDirection10mDominant[i],
      weatherCode: input.weatherCode[i],
    })
  }
  return result
}

const DailyForecastTable = ({ data }: DailyForecastTableProps) => {
  const {
    state: { temperatureUnit },
  } = useLocalData()
  const rowData = getDailyForecastTableRows(data)

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
          <th>Precipitation ({data.precipitationSumUnit})</th>
          <th>Wind Speed({data.windSpeed10mMaxUnit})</th>
          <th>Direction({data.windDirection10mDominantUnit})</th>
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
