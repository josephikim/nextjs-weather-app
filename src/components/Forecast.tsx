import { trpc } from 'utils/trpc'
import { useLocalData } from 'hooks/useLocalData'
import CurrentWeather from './CurrentWeather'
import HourlyWeatherGraph from './HourlyWeatherGraph'
import DailyForecastSummary from './DailyForecastSummary'
import classes from 'styles/sass/Forecast.module.scss'

interface ForecastProps {
  latitude: string
  longitude: string
}

const Forecast = ({ latitude, longitude }: ForecastProps) => {
  const { data: forecast } = trpc.getForecast.useQuery({
    latitude,
    longitude,
  })

  if (!forecast) return <div>Loading forecast...</div>

  return (
    <div className={classes.flexContainer}>
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
