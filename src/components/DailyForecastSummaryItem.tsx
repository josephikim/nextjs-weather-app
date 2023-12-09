import { Card } from 'react-bootstrap'
import { DaySelectionRange, useLocalData } from 'hooks/useLocalData'
import classes from 'styles/sass/DailyForecastSummaryItem.module.scss'

interface DailyForecastSummaryItemProps {
  day: string
  minTemp: number
  maxTemp: number
  weathercode: number
  daySelectKey: number
}

const DailyForecastSummaryItem = ({
  day,
  minTemp,
  maxTemp,
  weathercode,
  daySelectKey,
}: DailyForecastSummaryItemProps) => {
  const {
    dispatch,
    state: { daySelection },
  } = useLocalData()
  return (
    <Card
      className={`text-center ${classes.card} ${
        daySelection === daySelectKey && classes.selected
      }`}
      onClick={(e) =>
        dispatch({
          type: 'UPDATE_DAY_SELECTION',
          payload: daySelectKey as DaySelectionRange,
        })
      }
    >
      <Card.Body>
        <div className={classes.flexContainer}>
          <div className={classes.flexChild}>
            <div>{day}</div>
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
      </Card.Body>
    </Card>
  )
}

export default DailyForecastSummaryItem
