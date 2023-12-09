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
import { getHourlyWeatherChartData, htmlLegendPlugin } from 'utils/chartjs'
import { useLocalData } from 'hooks/useLocalData'
import classes from 'styles/sass/HourlyWeatherChart.module.scss'

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
  data: {
    celsius: string
    fahrenheit: string
  }
}

const HourlyWeatherChart = ({ data }: HourlyWeatherProps) => {
  const {
    state: { daySelection, temperatureUnit },
  } = useLocalData()

  const json =
    temperatureUnit === 'c'
      ? JSON.parse(data.celsius).hourly
      : JSON.parse(data.fahrenheit).hourly

  const chartData = getHourlyWeatherChartData(json, daySelection)

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
                cubicInterpolationMode: 'monotone',
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

export default HourlyWeatherChart
