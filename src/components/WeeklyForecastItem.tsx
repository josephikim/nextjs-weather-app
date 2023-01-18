import classes from 'styles/sass/WeeklyForecastItem.module.scss'

interface WeeklyForecastItemProps {
  date: string
  minTemp: number
  maxTemp: number
  weathercode: number
  minTempUnit: string
  maxTempUnit: string
}

const WeeklyForecastItem = ({
  date,
  minTemp,
  maxTemp,
  weathercode,
  minTempUnit,
  maxTempUnit,
}: WeeklyForecastItemProps) => {
  return (
    <div className="WeeklyForecastItem flex-container">
      <div className="">
        <div className="child">
          {/* <div className="day-abbr">{data.dayAbbr}</div> */}
          <div className="date-short">{date}</div>
          <i className="wi wi-wmo4680-1"></i>
          <div className="temp-hilo">
            {maxTemp}
            <span>&#176;</span>
            <span> / </span>
            {minTemp}
            <span>&#176;</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeeklyForecastItem
