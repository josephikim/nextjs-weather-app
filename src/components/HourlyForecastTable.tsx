import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { Unit } from '@openmeteo/sdk/unit'
import { Table } from 'react-bootstrap'
import { getShortDisplayDay, degToCompass } from 'utils/weather'
import { useLocalData } from 'hooks/useLocalData'
import displayUnits from 'assets/displayUnits.json'
import classes from 'styles/sass/HourlyForecastTable.module.scss'

// set up dayjs plugins
dayjs.extend(utc)
dayjs.extend(timezone)

interface HourlyForecastTableRow {
  dayShort: string
  date: string
  time: string
  tempHigh: string
  tempLow: string
  precipitation: string
  windSpeed: string
  windDirection: string
}

// convert hourly weather values to display format
const getHourlyForecastTableRows = (
  hourlyData: any,
  timezone: string,
  temperatureUnit: string
) => {
  const displayPrecipitationUnit =
    displayUnits[
      Unit[hourlyData.precipitationUnit] as keyof typeof displayUnits
    ]
  const displayWindSpeedUnit =
    displayUnits[Unit[hourlyData.windSpeed10mUnit] as keyof typeof displayUnits]
  const result: HourlyForecastTableRow[] = []

  for (let i = 0; i < hourlyData.time.length; i++) {
    result.push({
      dayShort: getShortDisplayDay(hourlyData.time[i], timezone),
      date: dayjs.tz(hourlyData.time[i], timezone).format('MM/DD/YYYY'),
      time: dayjs.tz(hourlyData.time[i], timezone).format('h:mm a'),
      tempHigh: `${Math.round(
        hourlyData.temperature2m[i]
      )}\u00B0${temperatureUnit.toUpperCase()}`,
      tempLow: `${Math.round(
        hourlyData.temperature2m[i]
      )}\u00B0${temperatureUnit.toUpperCase()}`,
      precipitation: `${Math.trunc(
        hourlyData.precipitation[i]
      )} ${displayPrecipitationUnit}`,
      windSpeed: `${Math.round(
        hourlyData.windSpeed10m[i]
      )} ${displayWindSpeedUnit}`,
      windDirection: degToCompass(hourlyData.windDirection10m[i]),
    })
  }
  return result
}

interface HourlyForecastTableProps {
  data: {
    celsius: string
    fahrenheit: string
  }
}

const HourlyForecastTable = ({ data }: HourlyForecastTableProps) => {
  const {
    state: { temperatureUnit },
  } = useLocalData()

  const json =
    temperatureUnit === 'c'
      ? JSON.parse(data.celsius)
      : JSON.parse(data.fahrenheit)

  const rowData = getHourlyForecastTableRows(
    json.hourly,
    json.timezone,
    temperatureUnit
  )

  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th></th>
          <th title="Date">Date</th>
          <th title="Time">Time</th>
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
          <tr key={`hourly-row-data-${row.date}-${row.time}`}>
            <td>{row.dayShort}</td>
            <td>{row.date}</td>
            <td>{row.time}</td>
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

export default HourlyForecastTable
