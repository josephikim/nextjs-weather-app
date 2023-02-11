import { ApiResponseModel, ApiResponseModelSchema } from 'models/meteo'
import json from 'assets/wmoWeatherCodes.json'

export const getForecast = async (
  latitude: string,
  longitude: string
): Promise<ApiResponseModel> => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,precipitation&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&current_weather=true&timezone=auto`

  const response = await fetch(url)
  const forecastJson = await response.json()
  const forecast = ApiResponseModelSchema.parse(forecastJson)

  return forecast
}

export const getWmoDescription = (code: number): string => {
  const description = json[code.toString() as keyof typeof json]
  return description
}
