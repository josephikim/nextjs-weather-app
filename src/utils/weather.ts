import dayjs from 'dayjs'
import { ForecastHourlyDataViewModel } from 'viewModels/forecastHourlyDataViewModel'
import { DaySelectionRange } from 'hooks/useLocalData'
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

type ChartData = {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    tension: number
  }[]
}

export const getDailyChartData = (
  data: ForecastHourlyDataViewModel,
  daySelection: DaySelectionRange
): ChartData => {
  const startIndex = 0 + 24 * (daySelection - 1)
  const endIndex = 24 + 24 * (daySelection - 1)

  const chartLabels = data.time
    .slice(startIndex, endIndex)
    .map((timestamp) => dayjs(timestamp).format('h:mm a'))

  const chartDatasets = [
    {
      label: 'Temperature',
      data: data.temperature_2m.slice(startIndex, endIndex),
      tension: 0.3,
    },
    {
      label: 'Precipitation',
      data: data.precipitation.slice(startIndex, endIndex),
      tension: 0.3,
    },
    {
      label: 'Humidity',
      data: data.relativehumidity_2m.slice(startIndex, endIndex),
      tension: 0.3,
    },
    {
      label: 'Wind Speed',
      data: data.windspeed_10m.slice(startIndex, endIndex),
      tension: 0.3,
    },
  ]

  const result = {
    labels: chartLabels,
    datasets: chartDatasets,
  }

  return result
}
