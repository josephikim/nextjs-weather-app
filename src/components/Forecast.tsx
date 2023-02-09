import { trpc } from 'utils/trpc'
import CurrentWeather from './CurrentWeather'
import HourlyWeatherGraph from './HourlyWeatherGraph'
import DailyForecastSummary from './DailyForecastSummary'
import classes from 'styles/sass/Forecast.module.scss'

interface ForecastProps {
  location: string
}

const Forecast = ({ location }: ForecastProps) => {
  const { data: forecast } = trpc.getForecast.useQuery({
    coordinates: location ?? 'default',
  })

  if (!forecast) return <div>Loading forecast...</div>

  return (
    <div className={classes.flexContainer}>
      forecast
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
