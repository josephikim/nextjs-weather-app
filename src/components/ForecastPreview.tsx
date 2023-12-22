import React from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { Unit } from '@openmeteo/sdk/unit'
import { trpc } from 'utils/trpc'
import { getWmoDescription } from 'utils/meteo'
import { degToCompass } from 'utils/weather'
import { useLocalData } from 'hooks/useLocalData'
import TemperatureUnitSelect from 'components/TemperatureUnitSelect'
import displayUnits from 'assets/displayUnits.json'
import classes from 'styles/sass/ForecastPreview.module.scss'

// set up dayjs plugins
dayjs.extend(utc)
dayjs.extend(timezone)

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

  const { data: forecast } = trpc.getWeather.useQuery({
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

  const displayWeatherIcon = `wi-wmo4680-${json.current.weatherCode}`
  const displayTemp = Math.round(json.current.temperature2m)
  const displayCondition = getWmoDescription(json.current.weatherCode)
  const displayHumidity = Math.round(json.hourly.relativeHumidity2m[0])
  const displayHumidityUnit =
    displayUnits[
      Unit[json.hourly.relativeHumidity2mUnit] as keyof typeof displayUnits
    ]
  const displayPrecipitation = Math.trunc(json.daily.precipitationSum[0])
  const displayPrecipitationUnit =
    displayUnits[
      Unit[json.daily.precipitationSumUnit] as keyof typeof displayUnits
    ]
  const displayWindSpeed = Math.round(json.current.windSpeed10m)
  const displayWindSpeedUnit =
    displayUnits[
      Unit[json.current.windSpeed10mUnit] as keyof typeof displayUnits
    ]
  const displayWindDirection = degToCompass(json.current.windDirection10m)
  const forecastUrl = `forecast?location=${encodeURIComponent(
    location
  )}&latitude=${latitude}&longitude=${longitude}`

  return (
    <>
      <div className={classes.contentBlock}>
        <div className={classes.flexContainer}>
          <div className={classes.flexChild}>
            <i className={`${classes.icon} wi ${displayWeatherIcon}`}></i>
            <i className={classes.condition}>{displayCondition}</i>
          </div>
          <div className={classes.flexChild}>
            <div className={classes.temperature}>
              <p>{displayTemp}</p>
            </div>
            <TemperatureUnitSelect />
          </div>
        </div>
      </div>
      <div className={classes.contentBlock}>
        <div className={classes.flexContainer}>
          <div className={classes.flexChild}>
            <span>Relative Humidity:</span>
          </div>
          <div className={classes.flexChild}>
            <span>
              {displayHumidity} {displayHumidityUnit}
            </span>
          </div>
        </div>
        <div className={classes.flexContainer}>
          <div className={classes.flexChild}>
            <span>24-Hr Precipitation:</span>
          </div>
          <div className={classes.flexChild}>
            <span>
              {displayPrecipitation} {displayPrecipitationUnit}
            </span>
          </div>
        </div>
        <div className={classes.flexContainer}>
          <div className={classes.flexChild}>
            <span>Wind Speed:</span>
          </div>
          <div className={classes.flexChild}>
            <span>
              {displayWindSpeed} {displayWindSpeedUnit}
            </span>
          </div>
        </div>
        <div className={classes.flexContainer}>
          <div className={classes.flexChild}>
            <span>Wind Direction:</span>
          </div>
          <div className={classes.flexChild}>
            <span>{displayWindDirection}</span>
          </div>
        </div>
      </div>
      <div className={`${classes.contentBlock} ${classes.forecastLink}`}>
        <Link href={forecastUrl}>{'more details \u2192'}</Link>
      </div>
    </>
  )
}

export default ForecastPreview
