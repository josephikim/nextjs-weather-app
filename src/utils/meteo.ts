export const getWeather = async (coordinates: string) => {
  console.log({ coordinates })
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=48.8567&longitude=2.3510&hourly=temperature_2m,weathercode`
  )

  return response.json()
}
