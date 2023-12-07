import React from 'react'
import Link from 'next/link'
// import { useLocalData } from 'hooks/useLocalData'
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
  const { data: { data: forecast } = {} } = trpc.user.getForecast.useQuery({
    latitude,
    longitude,
  })

  if (!forecast) {
    return null
  }

  const forecastRoute = `forecast?label=${encodeURIComponent(
    label
  )}&latitude=${latitude}&longitude=${longitude}`

  const wmoDescription = getWmoDescription(forecast.current.weatherCode)

  return (
    <>
      <div className={classes.contentBlock}>
        <div className={classes.flexContainer}>
          <div className={classes.flexChild}>
            <i
              className={`${classes.icon} wi wi-wmo4680-${forecast.current.weatherCode}`}
            ></i>
          </div>
          <div className={classes.flexChild}>
            <h3 className={classes.temperature}>
              {Math.trunc(forecast.current.temperature2m)}
            </h3>
            <TemperatureUnitSelect />
            <div>{wmoDescription}</div>
          </div>
        </div>
      </div>
      <div className={classes.contentBlock}>
        {/* <div className={classes.flexContainer}>
          <div className={classes.flexChild}>
            <span className="heading">Precipitation (24 Hr): </span>
          </div>
          <div className={classes.flexChild}>
            <span>{Math.trunc(forecast.daily.precipitationSum[0])} </span>
            <span>{forecast.daily.precipitationSumUnit}</span>
          </div>
        </div>
        <div className={classes.flexContainer}>
          <div className={classes.flexChild}>
            <span className="heading">Humidity: </span>
          </div>
          <div className={classes.flexChild}>
            <span>{forecast.hourly.relativeHumidity2m[0]}</span>
            <span>{forecast.hourly.relativeHumidity2mUnit}</span>
          </div>
        </div> */}
        <div className={classes.flexContainer}>
          <div className={classes.flexChild}>
            <span className="heading">Wind Speed: </span>
          </div>
          <div className={classes.flexChild}>
            <span>{forecast.current.windSpeed10m} </span>
            <span>mph</span>
          </div>
        </div>
        <div className={classes.flexContainer}>
          <div className={classes.flexChild}>
            <span className="heading">Wind Direction: </span>
          </div>
          <div className={classes.flexChild}>
            <span>{degToCompass(forecast.current.windDirection10m)}</span>
          </div>
        </div>
      </div>
      <div className={classes.forecastLink}>
        <Link href={forecastRoute}>{'forecast details \u2192'}</Link>
      </div>
    </>
  )
}

export default ForecastPreview
