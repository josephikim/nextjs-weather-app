import React from 'react'
import Link from 'next/link'
import { trpc } from 'utils/trpc'
import { getWmoDescription } from 'utils/meteo'
import { degToCompass } from 'utils/weather'
import { useLocalData } from 'hooks/useLocalData'
import TemperatureUnitSelect from 'components/TemperatureUnitSelect'
import classes from 'styles/sass/ForecastPreview.module.scss'

interface ForecastPreviewProps {
  location: string
  latitude: string
  longitude: string
}

const ForecastPreview = ({
  location,
  latitude,
  longitude,
}: ForecastPreviewProps) => {
  const {
    state: { temperatureUnit },
  } = useLocalData()

  const { data: { data: forecast } = {} } = trpc.user.getWeather.useQuery({
    latitude,
    longitude,
  })

  if (!forecast) {
    return null
  }

  const json =
    temperatureUnit === 'c'
      ? JSON.parse(forecast.celsius)
      : JSON.parse(forecast.fahrenheit)

  const forecastUrl = `forecast?location=${encodeURIComponent(
    location
  )}&latitude=${latitude}&longitude=${longitude}`

  const wmoDescription = getWmoDescription(json.current.weatherCode)

  return (
    <>
      <div className={classes.contentBlock}>
        <div className={classes.flexContainer}>
          <div className={classes.flexChild}>
            <i
              className={`${classes.icon} wi wi-wmo4680-${json.current.weatherCode}`}
            ></i>
          </div>
          <div className={classes.flexChild}>
            <h3 className={classes.temperature}>
              {Math.trunc(json.current.temperature2m)}
            </h3>
            <TemperatureUnitSelect />
            <div>{wmoDescription}</div>
          </div>
        </div>
      </div>
      <div className={classes.contentBlock}>
        <div className={classes.flexContainer}>
          <div className={classes.flexChild}>
            <span className="heading">Precipitation (24 Hr): </span>
          </div>
          <div className={classes.flexChild}>
            <span>{Math.trunc(json.daily.precipitationSum[0])} </span>
            <span>{json.daily.precipitationSumUnit}</span>
          </div>
        </div>
        <div className={classes.flexContainer}>
          <div className={classes.flexChild}>
            <span className="heading">Humidity: </span>
          </div>
          <div className={classes.flexChild}>
            <span>{json.hourly.relativeHumidity2m[0]}</span>
            <span>{json.hourly.relativeHumidity2mUnit}</span>
          </div>
        </div>
        <div className={classes.flexContainer}>
          <div className={classes.flexChild}>
            <span className="heading">Wind Speed: </span>
          </div>
          <div className={classes.flexChild}>
            <span>{json.current.windSpeed10m} </span>
            <span>mph</span>
          </div>
        </div>
        <div className={classes.flexContainer}>
          <div className={classes.flexChild}>
            <span className="heading">Wind Direction: </span>
          </div>
          <div className={classes.flexChild}>
            <span>{degToCompass(json.current.windDirection10m)}</span>
          </div>
        </div>
      </div>
      <div className={classes.forecastLink}>
        <Link href={forecastUrl}>{'forecast details \u2192'}</Link>
      </div>
    </>
  )
}

export default ForecastPreview
