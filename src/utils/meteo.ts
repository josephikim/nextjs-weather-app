export const getForecast = async (coordinates: string) => {
  console.log({ coordinates })
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=48.8567&longitude=2.3510&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&current_weather=true&timezone=auto`
  )

  return response
}
