import { fetchWeatherApi } from 'openmeteo'
import json from 'assets/wmoWeatherCodes.json'
import { authRouter } from 'backend/routers/auth.router'

export const getWeatherData = async (
  latitudeInput: string,
  longitudeInput: string
) => {
  // Note: If param 'temperature_unit' is not set, all temperature values will be returned in Celsius
  const params = {
    latitude: latitudeInput,
    longitude: longitudeInput,
    timezone: 'auto',
    current: [
      'temperature_2m',
      'weather_code',
      'wind_speed_10m',
      'wind_direction_10m',
    ],
    hourly: [
      'temperature_2m',
      'relative_humidity_2m',
      'precipitation',
      'wind_speed_10m',
      'wind_direction_10m',
    ],
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'precipitation_sum',
      'wind_speed_10m_max',
      'wind_direction_10m_dominant',
    ],
  }
  const url = 'https://api.open-meteo.com/v1/forecast'
  const responses = await fetchWeatherApi(url, params)

  // Helper function to form time ranges
  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step)

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0]

  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds()
  const timezone = response.timezone()
  const timezoneAbbreviation = response.timezoneAbbreviation()
  const latitude = response.latitude()
  const longitude = response.longitude()
  const current = response.current()!
  const hourly = response.hourly()!
  const daily = response.daily()!

  // Note: The order of weather variables in the URL query and the indices below need to match!
  // Note2: API returns typed arrays (Float32Array) for weather-related variables. We are converting to JS arrays in order to validate schema with Zod.
  const weatherData = {
    latitude: latitude,
    longitude: longitude,
    timezone,
    timezoneAbbreviation,
    current: {
      time: new Date(
        (Number(current.time()) + utcOffsetSeconds) * 1000
      ).toISOString(),
      temperature2m: current.variables(0)!.value(),
      temperature2mUnit: current.variables(0)!.unit(),
      weatherCode: current.variables(1)!.value(),
      weatherCodeUnit: current.variables(1)!.unit(),
      windSpeed10m: current.variables(2)!.value(),
      windSpeed10mUnit: current.variables(2)!.unit(),
      windDirection10m: current.variables(3)!.value(),
      windDirection10mUnit: current.variables(3)!.unit(),
    },
    hourly: {
      time: range(
        Number(hourly.time()),
        Number(hourly.timeEnd()),
        hourly.interval()
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000).toISOString()),
      temperature2m: Array.from(hourly.variables(0)!.valuesArray()!),
      temperature2mUnit: hourly.variables(0)!.unit()!,
      relativeHumidity2m: Array.from(hourly.variables(1)!.valuesArray()!),
      relativeHumidity2mUnit: hourly.variables(1)!.unit()!,
      precipitation: Array.from(hourly.variables(2)!.valuesArray()!),
      precipitationUnit: hourly.variables(2)!.unit()!,
      windSpeed10m: Array.from(hourly.variables(3)!.valuesArray()!),
      windSpeed10mUnit: hourly.variables(3)!.unit()!,
      windDirection10m: Array.from(hourly.variables(4)!.valuesArray()!),
      windDirection10mUnit: hourly.variables(4)!.unit()!,
    },
    daily: {
      time: range(
        Number(daily.time()),
        Number(daily.timeEnd()),
        daily.interval()
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000).toISOString()),
      weatherCode: Array.from(daily.variables(0)!.valuesArray()!),
      weatherCodeUnit: daily.variables(0)!.unit()!,
      temperature2mMax: Array.from(daily.variables(1)!.valuesArray()!),
      temperature2mMaxUnit: daily.variables(1)!.unit()!,
      temperature2mMin: Array.from(daily.variables(2)!.valuesArray()!),
      temperature2mMinUnit: daily.variables(2)!.unit()!,
      precipitationSum: Array.from(daily.variables(3)!.valuesArray()!),
      precipitationSumUnit: daily.variables(3)!.unit()!,
      windSpeed10mMax: Array.from(daily.variables(4)!.valuesArray()!),
      windSpeed10mMaxUnit: daily.variables(4)!.unit()!,
      windDirection10mDominant: Array.from(daily.variables(5)!.valuesArray()!),
      windDirection10mDominantUnit: daily.variables(5)!.unit()!,
    },
  }

  return weatherData
}

export const getWmoDescription = (code: number): string => {
  const description = json[code.toString() as keyof typeof json]
  return description
}
