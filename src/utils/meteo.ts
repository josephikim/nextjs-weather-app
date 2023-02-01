import json from 'assets/wmoWeatherCodes.json'

export const getForecast = async (coordinates: string) => {
  console.log({ coordinates })
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=48.8567&longitude=2.3510&hourly=temperature_2m,relativehumidity_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&current_weather=true&timezone=auto`
  )

  return response
}

export const getWmoDescription = (code: number): string => {
  const description = json[code.toString() as keyof typeof json]
  return description
}
