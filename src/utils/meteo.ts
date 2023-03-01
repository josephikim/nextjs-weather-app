import json from 'assets/wmoWeatherCodes.json'

export const getForecast = async (
  latitude: string,
  longitude: string,
  temperatureUnit: string
) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,precipitation&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&current_weather=true&timezone=auto&windspeed_unit=mph&precipitation_unit=mm&temperature_unit=${
    temperatureUnit === 'c' ? 'celsius' : 'fahrenheit'
  }`

  const response = await fetch(url)
  const forecast = await response.json()

  return forecast
}

export const getWmoDescription = (code: number): string => {
  const description = json[code.toString() as keyof typeof json]
  return description
}
