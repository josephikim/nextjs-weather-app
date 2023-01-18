import { z } from 'zod'
import { CurrentWeatherViewModelSchema } from './currentWeatherViewModel'
import { HourlyUnitsViewModelSchema } from './hourlyUnitsViewModel'
import { HourlyDataViewModelSchema } from './hourlyDataViewModel'
import { DailyUnitsViewModelSchema } from './dailyUnitsViewModel'
import { DailyDataViewModelSchema } from './dailyDataViewModel'

export const ForecastViewModelSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  generationtime_ms: z.number(),
  utc_offset_seconds: z.number(),
  timezone: z.string(),
  timezone_abbreviation: z.string(),
  elevation: z.number(),
  current_weather: CurrentWeatherViewModelSchema,
  hourly_units: HourlyUnitsViewModelSchema,
  hourly: HourlyDataViewModelSchema,
  daily_units: DailyUnitsViewModelSchema,
  daily: DailyDataViewModelSchema,
})

export type ForecastViewModel = z.infer<typeof ForecastViewModelSchema>
