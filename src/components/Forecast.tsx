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
    <div className={classes.flexContainer}>
      <div className={classes.flexChild}>
        <CurrentWeather data={data} />
      </div>
      <div className={classes.flexChild}>
        <HourlyWeatherChart data={data} />
      </div>
      <div className={classes.flexChild}>
        <DailyForecastSummary data={data} />
      </div>
      <div className={classes.flexChild}>
        <DailyForecastTable data={data} />
      </div>
    </div>
  )
}

export default Forecast
