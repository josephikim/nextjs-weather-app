import { trpc } from 'utils/trpc'
import { WeatherApiResponse } from 'schemas/weatherApiResponse'
import CurrentWeather from './CurrentWeather'
import HourlyWeatherGraph from './HourlyWeatherGraph'
import DailyForecastSummary from './DailyForecastSummary'
import AddDashboardItemButton from './AddDashboardItemButton'
import DailyForecastTable from './DailyForecastTable'
import classes from 'styles/sass/Forecast.module.scss'

interface ForecastProps {
  label: string
  latitude: string
  longitude: string
}

const Forecast = ({ label, latitude, longitude }: ForecastProps) => {
  const { data: { data: forecast } = {} } = trpc.user.getForecast.useQuery({
    latitude,
    longitude,
  })

  const { data: { data: locations } = {} } = trpc.user.getLocations.useQuery()
  const isUserLocation = locations?.some(
    (location) => location.location.label === label
  )

  if (!forecast) {
    return <div>Loading forecast...</div>
  }

  return (
    <div className={classes.flexContainer}>
      <div className={classes.flexChild}>
        <div className={classes.titleContainer}>
          <span className={classes.title}>Current forecast for {label}</span>
          <span>
            <AddDashboardItemButton
              label={label}
              latitude={latitude}
              longitude={longitude}
              isAdded={!!isUserLocation}
            />
          </span>
        </div>
      </div>
      <div className={classes.flexChild}>
        <CurrentWeather data={forecast} />
      </div>
      <div className={classes.flexChild}>
        <HourlyWeatherGraph data={forecast.hourly} />
      </div>
      <div className={classes.flexChild}>
        <DailyForecastSummary data={forecast.daily} />
      </div>
      <div className={classes.flexChild}>
        <DailyForecastTable data={forecast.daily} />
      </div>
    </div>
  )
}

export default Forecast
