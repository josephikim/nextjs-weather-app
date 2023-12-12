import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import CurrentWeather from './CurrentWeather'
import HourlyWeatherChart from './HourlyWeatherChart'
import DailyForecastSummary from './DailyForecastSummary'
import DailyForecastTable from './DailyForecastTable'
import HourlyForecastTable from './HourlyForecastTable'
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
        <Tabs
          defaultActiveKey="daily"
          id="tabbed-forecast-tables"
          className="mb-3"
          variant="pills"
        >
          <Tab eventKey="daily" title="Daily Weather">
            <div className={classes.child}>
              <DailyForecastTable data={data} />
            </div>
          </Tab>
          <Tab eventKey="hourly" title="Hourly Weather">
            <div className={classes.child}>
              <HourlyForecastTable data={data} />
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default Forecast
