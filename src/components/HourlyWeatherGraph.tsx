import { ForecastHourlyDataViewModel } from 'viewModels/forecastHourlyDataViewModel'
import { ForecastHourlyUnitsViewModel } from 'viewModels/forecastHourlyUnitsViewModel'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Colors,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import dayjs from 'dayjs'

import classes from 'styles/sass/HourlyWeatherGraph.module.scss'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Colors
)

interface HourlyWeatherProps {
  hourly: ForecastHourlyDataViewModel
  hourlyUnits: ForecastHourlyUnitsViewModel
}

const HourlyWeatherGraph = ({ hourly, hourlyUnits }: HourlyWeatherProps) => {
  const chartLabels = hourly.time.map((timestamp) =>
    dayjs(timestamp).format('h:mm a')
  )

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Temperature',
        data: hourly.temperature_2m,
        tension: 0.3,
      },
      {
        label: 'Precipitation',
        data: hourly.precipitation,
        tension: 0.3,
      },
      {
        label: 'Humidity',
        data: hourly.relativehumidity_2m,
        tension: 0.3,
      },
      {
        label: 'Wind Speed',
        data: hourly.windspeed_10m,
        tension: 0.3,
      },
    ],
  }
  console.log({ chartData })
  return (
    <div className="HourlyWeatherGraph">
      <div className={classes.chartContainer}>
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Hourly Weather',
              },
              legend: {
                display: true,
              },
            },
          }}
        />
      </div>
    </div>
  )
}

export default HourlyWeatherGraph
