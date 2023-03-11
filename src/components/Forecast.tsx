import { trpc } from 'utils/trpc'
import { useLocalData } from 'hooks/useLocalData'
import CreateUserLocationButton from 'components/CreateUserLocationButton'
import DeleteUserLocationButton from 'components/DeleteUserLocationButton'
import CurrentWeather from 'components/CurrentWeather'
import HourlyWeatherGraph from 'components/HourlyWeatherGraph'
import DailyForecastSummary from 'components/DailyForecastSummary'
import classes from 'styles/sass/Forecast.module.scss'

interface ForecastProps {
  label: string
  latitude: string
  longitude: string
}

const Forecast = ({ label, latitude, longitude }: ForecastProps) => {
  const {
    state: { temperatureUnit },
  } = useLocalData()

  const { data: { data: forecast } = {} } = trpc.user.getForecast.useQuery({
    latitude,
    longitude,
    temperatureUnit,
  })

  if (!forecast) {
    return <div>Loading forecast...</div>
  }

  return (
    <div className={classes.flexContainer}>
      <div className={classes.flexChild}>
        <div className={classes.title}>Current forecast for {label}</div>
        <CreateUserLocationButton
          label={label}
          latitude={latitude}
          longitude={longitude}
        />
        <DeleteUserLocationButton label={label} />
      </div>
      <div className={classes.flexChild}>
        <CurrentWeather
          current_weather={forecast.current_weather}
          daily={forecast.daily}
          daily_units={forecast.daily_units}
          hourly={forecast.hourly}
          hourly_units={forecast.hourly_units}
        />
      </div>
      <div className={classes.flexChild}>
        <HourlyWeatherGraph hourly={forecast.hourly} />
      </div>
      <div className={classes.flexChild}>
        <DailyForecastSummary daily={forecast.daily} />
      </div>
    </div>
  )
}

export default Forecast
