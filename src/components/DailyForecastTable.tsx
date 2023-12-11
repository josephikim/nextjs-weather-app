import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { Unit } from '@openmeteo/sdk/unit'
import { Table } from 'react-bootstrap'
import { getShortDisplayDay, degToCompass } from 'utils/weather'
import { useLocalData } from 'hooks/useLocalData'
import displayUnits from 'assets/displayUnits.json'
import classes from 'styles/sass/DailyForecastTable.module.scss'

// set up dayjs plugins
dayjs.extend(utc)
dayjs.extend(timezone)

interface DailyForecastTableRow {
  dayShort: string
  date: string
  tempHigh: string
  tempLow: string
  precipitation: string
  windSpeed: string
  windDirection: string
  weatherCode: number
}

// convert daily weather values to display format
const getDailyForecastTableRows = (
  dailyData: any,
  timezone: string,
  temperatureUnit: string
) => {
  const displayPrecipitationUnit =
    displayUnits[
      Unit[dailyData.precipitationSumUnit] as keyof typeof displayUnits
    ]
  const displayWindSpeedUnit =
    displayUnits[
      Unit[dailyData.windSpeed10mMaxUnit] as keyof typeof displayUnits
    ]
  const result: DailyForecastTableRow[] = []

  for (let i = 0; i < dailyData.time.length; i++) {
    result.push({
      dayShort: getShortDisplayDay(dailyData.time[i], timezone),
      date: dayjs.tz(dailyData.time[i], timezone).format('MM/DD/YYYY'),
      tempHigh: `${Math.round(
        dailyData.temperature2mMax[i]
      )}\u00B0${temperatureUnit.toUpperCase()}`,
      tempLow: `${Math.round(
        dailyData.temperature2mMin[i]
      )}\u00B0${temperatureUnit.toUpperCase()}`,
      precipitation: `${Math.trunc(
        dailyData.precipitationSum[i]
      )} ${displayPrecipitationUnit}`,
      windSpeed: `${Math.round(
        dailyData.windSpeed10mMax[i]
      )} ${displayWindSpeedUnit}`,
      windDirection: degToCompass(dailyData.windDirection10mDominant[i]),
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

  const rowData = getDailyForecastTableRows(
    json.daily,
    json.timezone,
    temperatureUnit
  )

  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th></th>
          <th title="Date">Date</th>
          <th title="High Temperature">High</th>
          <th title="Low Temperature">Low</th>
          <th>
            <i
              className={`wi wi-rain ${classes.icon}`}
              title="Precipitation"
            ></i>
          </th>
          <th>
            <i
              className={`wi wi-strong-wind ${classes.icon}`}
              title="Wind Speed"
            ></i>
          </th>
          <th>
            <i
              className={`wi wi-wind-direction ${classes.icon}`}
              title="Wind Direction"
            ></i>
          </th>
        </tr>
      </thead>
      <tbody>
        {rowData.map((row) => (
          <tr key={row.date}>
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
