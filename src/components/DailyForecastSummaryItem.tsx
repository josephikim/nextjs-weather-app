import classes from 'styles/sass/DailyForecastItem.module.scss'

interface DailyForecastItemProps {
  date: string
  minTemp: number
  maxTemp: number
  weathercode: number
  minTempUnit: string
  maxTempUnit: string
}

const DailyForecastItem = ({
  date,
  minTemp,
  maxTemp,
  weathercode,
  minTempUnit,
  maxTempUnit,
}: DailyForecastItemProps) => {
  return (
    <div className="DailyForecastItem flex-container">
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

export default DailyForecastItem
