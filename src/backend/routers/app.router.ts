import { z } from 'zod'
import { publicProcedure, router } from 'backend/trpc'
import { getForecast } from 'utils/meteo'
import { ForecastViewModel } from 'viewModels/forecastViewModel'

export const appRouter = router({
  getForecast: publicProcedure
    .input(
      z.object({
        coordinates: z.string(),
      })
    )
    .query(async ({ input }) => {
      const response = await getForecast('test')
      const json = await response.json()

      const forecastViewData: ForecastViewModel = {
        isDefaultLocation: true,
        location: {
          latitude: json.latitude,
          longitude: json.longitude,
          generationtime_ms: json.generationtime_ms,
          utc_offset_seconds: json.utc_offset_seconds,
          timezone: json.timezone,
          timezone_abbreviation: json.timezone_abbreviation,
          elevation: json.elevation,
        },
        currentWeather: json.current_weather,
        hourly: json.hourly,
        hourlyUnits: json.hourly_units,
        daily: json.daily,
        dailyUnits: json.daily_units,
      }

      return forecastViewData
    }),
})

// export type definition of API
export type AppRouter = typeof appRouter
