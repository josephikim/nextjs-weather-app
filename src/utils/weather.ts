import dayjs from 'dayjs'
import json from 'assets/worldCities.json'

const pickRandom = (array: string[]): string => {
  return array[Math.floor(Math.random() * array.length)]
}

export const getRandomCity = (): [string, string] => {
  const countries = Object.keys(json)
  const randomCountry = pickRandom(countries)
  const cities = json[randomCountry as keyof typeof json]
  const randomCity = pickRandom(cities)
  return [randomCity, randomCountry]
}

export const c2fInt = (c: number): number => {
  return Math.round((c * 9) / 5 + 32)
}

export const degToCompass = (num: number): string => {
  const val = Math.floor(num / 22.5 + 0.5)
  const arr = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ]
  return arr[val % 16]
}

export const getDisplayDay = (dateStr: string): string => {
  const d = dayjs(dateStr)
  return d.format('ddd')
}
