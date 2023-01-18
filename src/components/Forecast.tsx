import type { ForecastViewModel } from 'viewModels/forecastViewModel'
import CurrentConditions from './CurrentConditions'
import DailyConditionsGraph from './DailyConditionsGraph'
import WeeklyForecast from './WeeklyForecast'
import classes from 'styles/sass/Forecast.module.scss'

type ForecastProps = ForecastViewModel

const Forecast = ({
  current_weather,
  hourly,
  hourly_units,
  daily,
  daily_units,
}: ForecastProps) => {
  return (
    <div className="Forecast">
      <div className="flex-container">
        <div className="child">
          <CurrentConditions current={current_weather} />
        </div>
        <div className="child">
          <DailyConditionsGraph hourly={hourly} units={hourly_units} />
        </div>
        <div className="child">
          <WeeklyForecast daily={daily} units={daily_units} />
        </div>
      </div>
    </div>
  )
}

export default Forecast
