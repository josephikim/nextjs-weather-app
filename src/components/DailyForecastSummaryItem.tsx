import classes from 'styles/sass/DailyForecastSummaryItem.module.scss'

interface DailyForecastSummaryItemProps {
  date: string
  minTemp: number
  maxTemp: number
  weathercode: number
  minTempUnit: string
  maxTempUnit: string
}

const DailyForecastSummaryItem = ({
  date,
  minTemp,
  maxTemp,
  weathercode,
  minTempUnit,
  maxTempUnit,
}: DailyForecastSummaryItemProps) => {
  return (
    <div className={classes.flexContainer}>
      <div className={classes.flexChild}>
        {/* <div className="day-abbr">{data.dayAbbr}</div> */}
        <div className={classes.date}>{date}</div>
        <i className={`${classes.icon} wi wi-wmo4680-1`}></i>
        <div className={classes.tempRange}>
          <div className={classes.hi}>
            {maxTemp}
            <span>&#176;</span>
          </div>
          <div className={classes.lo}>
            {minTemp}
            <span>&#176;</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DailyForecastSummaryItem
