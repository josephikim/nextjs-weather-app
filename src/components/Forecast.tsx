import CurrentWeather from './CurrentWeather'
import HourlyWeatherChart from './HourlyWeatherChart'
import DailyForecastSummary from './DailyForecastSummary'
import DailyForecastTable from './DailyForecastTable'
import classes from 'styles/sass/Forecast.module.scss'

interface ForecastProps {
  data: {
    celsius: string
    fahrenheit: string
  }
}

const Forecast = ({ data }: ForecastProps) => {
  return (
    <div className={classes.container}>
      <div className={classes.child}>
        <CurrentWeather data={data} />
      </div>
      <div className={classes.child}>
        <HourlyWeatherChart data={data} />
      </div>
      <div className={classes.child}>
        <DailyForecastSummary data={data} />
      </div>
      <div className={classes.child}>
        <DailyForecastTable data={data} />
      </div>
    </div>
  )
}

export default Forecast
