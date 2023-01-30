import { z } from 'zod'
import { ForecastLocationViewModelSchema } from 'viewModels/forecastLocationViewModel'
import { ForecastCurrentWeatherViewModelSchema } from './forecastCurrentWeatherViewModel'
import { ForecastHourlyUnitsViewModelSchema } from './forecastHourlyUnitsViewModel'
import { ForecastHourlyDataViewModelSchema } from './forecastHourlyDataViewModel'
import { ForecastDailyUnitsViewModelSchema } from './forecastDailyUnitsViewModel'
import { ForecastDailyDataViewModelSchema } from './forecastDailyDataViewModel'

export const ForecastViewModelSchema = z.object({
  isDefaultLocation: z.boolean(),
  location: ForecastLocationViewModelSchema,
  currentWeather: ForecastCurrentWeatherViewModelSchema,
  hourlyUnits: ForecastHourlyUnitsViewModelSchema,
  hourly: ForecastHourlyDataViewModelSchema,
  dailyUnits: ForecastDailyUnitsViewModelSchema,
  daily: ForecastDailyDataViewModelSchema,
})

export type ForecastViewModel = z.infer<typeof ForecastViewModelSchema>
