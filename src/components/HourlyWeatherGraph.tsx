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
import { getDailyChartData, htmlLegendPlugin } from 'utils/chartjs'
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
    <>
      <div id="legend-container" className={classes.legendContainer}></div>
      <div className={classes.chartContainer}>
        <Line
          data={chartData}
          plugins={[htmlLegendPlugin]}
          options={{
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Hourly Weather',
              },
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
                ticks: {
                  // For a category axis, the val is the index so the lookup via getLabelForValue is needed
                  callback: function (val, index) {
                    // Hide every 2nd and 3rd tick label
                    return index % 3 === 0
                      ? this.getLabelForValue(val as number)
                      : ''
                  },
                },
              },
            },
          }}
        />
      </div>
    </>
  )
}

export default HourlyWeatherGraph
