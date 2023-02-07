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

  console.log({ forecast })
  if (!forecast) return <div>Loading forecast...</div>

  return (
    <div className={classes.flexContainer}>
      <div className={classes.flexChild}>
        <CurrentWeather
          currentWeather={forecast.currentWeather}
          daily={forecast.daily}
          dailyUnits={forecast.dailyUnits}
          hourly={forecast.hourly}
          hourlyUnits={forecast.hourlyUnits}
        />
      </div>
      <div className={classes.flexChild}>
        <HourlyWeatherGraph
          hourly={forecast.hourly}
          hourlyUnits={forecast.hourlyUnits}
        />
      </div>
      <div className={classes.flexChild}>
        <DailyForecastSummary
          daily={forecast.daily}
          dailyUnits={forecast.dailyUnits}
        />
      </div>
    </div>
  )
}

export default Forecast
