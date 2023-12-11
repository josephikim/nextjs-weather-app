import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

// set up dayjs plugins
dayjs.extend(utc)
dayjs.extend(timezone)

// A function to convert azimuth degrees to 16-directional compass abbreviations
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

// A function to return short-form version of day name from date string input
export const getShortDisplayDay = (
  dateStr: string,
  timezone: string
): string => {
  const d = dayjs.tz(dateStr, timezone)
  return d.format('ddd')
}

// A function to convert Celsius to Fahrenheit
export const cToF = (celsius: number): number => {
  const cTemp = celsius
  return (cTemp * 9) / 5 + 32
}

// A function to convert Fahrenheit to Celsius
export const fToC = (fahrenheit: number): number => {
  const fTemp = fahrenheit
  return ((fTemp - 32) * 5) / 9
}
