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
import { useLocalData } from 'hooks/useLocalData'
import { getDailyChartData } from 'utils/weather'
import { ForecastHourlyDataViewModel } from 'viewModels/forecastHourlyDataViewModel'
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
}

const HourlyWeatherGraph = ({ hourly }: HourlyWeatherProps) => {
  const {
    state: { daySelection },
  } = useLocalData()
  const chartData = getDailyChartData(hourly, daySelection)
  return (
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
  )
}

export default HourlyWeatherGraph
