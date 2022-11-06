import json from 'assets/worldCities.json'

const pickRandom = (array: string[]) => {
  return array[Math.floor(Math.random() * array.length)]
}

export const getRandomLocation = () => {
  const countries = Object.keys(json)
  const randomCountry = pickRandom(countries)
  const cities = json[randomCountry as keyof typeof json]
  const randomCity = pickRandom(cities)
  return [randomCity, randomCountry]
}
