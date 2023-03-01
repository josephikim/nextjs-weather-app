import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Colors,
  Filler,
  Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'
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
  Colors,
  Filler,
  ChartDataLabels,
  Tooltip
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
              datalabels: {
                align: 'top',
                color: '#808080',
                font: {
                  size: 12,
                  weight: 'bold',
                },
                padding: 6,
                display: function (context) {
                  return context.dataIndex % 3 === 0 // display every third data label
                },
              },
              tooltip: {
                displayColors: false,
                intersect: false,
                mode: 'nearest',
                padding: 6,
              },
            },
            layout: {
              padding: {
                top: 32,
                left: 32,
                right: 32,
              },
            },
            elements: {
              line: {
                tension: 0.3,
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  // For a category axis, the val is the index so the lookup via getLabelForValue is needed
                  callback: function (val, index) {
                    // display every third tick label
                    return index % 3 === 0
                      ? this.getLabelForValue(val as number)
                      : ''
                  },
                },
              },
              y: {
                display: false,
                grid: {
                  display: false,
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
