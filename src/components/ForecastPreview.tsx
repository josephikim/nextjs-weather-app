import React from 'react'
import { Button } from 'react-bootstrap'
import { useLocalData } from 'hooks/useLocalData'
import { trpc } from 'utils/trpc'
import { degToCompass } from 'utils/weather'
import { getWmoDescription } from 'utils/meteo'
import TemperatureUnitSelect from 'components/TemperatureUnitSelect'
import classes from 'styles/sass/ForecastPreview.module.scss'
interface ForecastPreviewProps {
  label: string
  latitude: string
  longitude: string
}

const ForecastPreview = ({
  label,
  latitude,
  longitude,
}: ForecastPreviewProps) => {
  const {
    state: { temperatureUnit },
  } = useLocalData()

  const { data: { data: forecast } = {} } = trpc.user.getForecast.useQuery({
    latitude,
    longitude,
    temperatureUnit,
  })

  const forecastRoute = `forecast?label=${encodeURIComponent(
    label
  )}&latitude=${latitude}&longitude=${longitude}`

  if (!forecast) {
    return <></>
  }

  const displayCondition = getWmoDescription(
    forecast.current_weather.weathercode
  )

  return (
    <>
      <div className={classes.flexContainer}>
        <div className={classes.flexChild}>
          <i
            className={`${classes.icon} wi wi-wmo4680-${forecast.current_weather.weathercode}`}
          ></i>
        </div>
        <div className={classes.flexChild}>
          <div className={classes.alignTop}>
            <h3 className={classes.temperature}>
              {forecast.current_weather.temperature}
            </h3>
            <TemperatureUnitSelect />
            <div>{displayCondition}</div>
          </div>
        </div>
      </div>
      <div>
        <span className="heading">24-Hour Precipitation: </span>
        <span>{Math.trunc(forecast.daily.precipitation_sum[0])} </span>
        <span>{forecast.daily_units.precipitation_sum}</span>
      </div>
      <div>
        <span className="heading">Humidity: </span>
        <span>{forecast.hourly.relativehumidity_2m[0]}</span>
        <span>{forecast.hourly_units.relativehumidity_2m}</span>
      </div>
      <div>
        <span className="heading">Wind Speed: </span>
        <span>{forecast.current_weather.windspeed} </span>
        <span>mph</span>
      </div>
      <div>
        <span className="heading">Wind Direction: </span>
        <span>{degToCompass(forecast.current_weather.winddirection)}</span>
      </div>
      <Button variant="primary" href={forecastRoute}>
        View Details
      </Button>
    </>
  )
}

export default ForecastPreview
