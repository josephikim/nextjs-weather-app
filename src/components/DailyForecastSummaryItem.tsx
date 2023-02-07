import classes from 'styles/sass/DailyForecastSummaryItem.module.scss'

interface DailyForecastSummaryItemProps {
  date: string
  minTemp: number
  maxTemp: number
  weathercode: number
}

const DailyForecastSummaryItem = ({
  date,
  minTemp,
  maxTemp,
  weathercode,
}: DailyForecastSummaryItemProps) => {
  return (
    <div className={classes.flexContainer}>
      <div className={classes.flexChild}>
        <div>{date}</div>
      </div>
      <div className={classes.flexChild}>
        <i className={`${classes.icon} wi wi-wmo4680-${weathercode}`}></i>
      </div>
      <div className={classes.flexChild}>
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
