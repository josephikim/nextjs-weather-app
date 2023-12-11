import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { Plugin } from 'chart.js'
import { Context } from 'chartjs-plugin-datalabels'
import { WeatherApiHourlyData } from 'schemas/weatherApiHourlyData'
import { DaySelectionRange } from 'hooks/useLocalData'

// set up dayjs plugins
dayjs.extend(utc)
dayjs.extend(timezone)

type ChartData = {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    hidden?: boolean
  }[]
}

export const getHourlyWeatherChartData = (
  data: WeatherApiHourlyData,
  timezone: string,
  daySelection: DaySelectionRange
): ChartData => {
  const startIndex = 0 + 24 * (daySelection - 1)
  const endIndex = 24 + 24 * (daySelection - 1)

  const chartLabels = data.time
    .slice(startIndex, endIndex)
    .map((timestamp) => dayjs.tz(timestamp, timezone).format('h:mma'))

  const chartDatasets = [
    {
      label: 'Temperature',
      data: data.temperature2m.slice(startIndex, endIndex),
      fill: true,
      datalabels: {
        formatter: Math.round,
      },
    },
    {
      label: 'Precipitation',
      data: data.precipitation.slice(startIndex, endIndex),
      hidden: true,
      fill: true,
      datalabels: {
        formatter: function (value: any, context: Context) {
          return Math.round(value * 10) / 10 + ' mm'
        },
      },
    },
    {
      label: 'Humidity',
      data: data.relativeHumidity2m.slice(startIndex, endIndex),
      hidden: true,
      fill: true,
      datalabels: {
        formatter: function (value: any, context: Context) {
          return Math.round(value) + '%'
        },
      },
    },
    {
      label: 'Wind Speed',
      data: data.windSpeed10m.slice(startIndex, endIndex),
      hidden: true,
      fill: true,
      datalabels: {
        formatter: function (value: any, context: Context) {
          return Math.round(value) + ' mph'
        },
      },
    },
  ]

  const result = {
    labels: chartLabels,
    datasets: chartDatasets,
  }

  return result
}

export const htmlLegendPlugin: Plugin = {
  id: 'htmlLegend',
  afterUpdate(chart: any, args: any, options: any) {
    const containerID = 'legend-container'
    const ul = getOrCreateLegendList(chart, containerID)

    // Remove old legend items
    while (ul.firstChild) {
      ul.firstChild.remove()
    }

    // Reuse the built-in legendItems generator
    const items = chart.options.plugins.legend.labels.generateLabels(chart)

    items.forEach((item: any) => {
      const li = document.createElement('li')
      li.style.alignItems = 'center'
      li.style.cursor = 'pointer'
      li.style.display = 'flex'
      li.style.flexDirection = 'row'
      li.style.height = '1rem'

      li.onclick = () => {
        const { type } = chart.config
        if (type === 'pie' || type === 'doughnut') {
          // Pie and doughnut charts only have a single dataset and visibility is per item
          chart.toggleDataVisibility(item.index)
        } else {
          // For line charts, hide visibility for all other datasets
          const iterator = Array.from(Array(items.length).keys())
          const metas = iterator.map((index) => {
            return chart.getDatasetMeta(index)
          })
          metas.forEach((meta: any) => {
            meta.hidden = item.datasetIndex === meta.index ? false : true
          })
        }
        chart.update()
      }

      // Text
      const textContainer = document.createElement('p')
      textContainer.style.color = item.fontColor
      textContainer.style.margin = '0'
      textContainer.style.textDecoration = item.hidden
        ? ''
        : 'solid underline orange 4px'
      textContainer.style.textUnderlineOffset = '10px'

      const text = document.createTextNode(item.text)
      textContainer.appendChild(text)

      li.appendChild(textContainer)
      ul.appendChild(li)
    })
  },
}

const getOrCreateLegendList = (chart: any, id: any) => {
  const legendContainer = document.getElementById(id) as HTMLElement
  let listContainer = legendContainer.querySelector('ul')

  if (!listContainer) {
    listContainer = document.createElement('ul')
    listContainer.style.display = 'flex'
    listContainer.style.justifyContent = 'center'
    listContainer.style.flexDirection = 'row'
    listContainer.style.margin = '0'
    listContainer.style.padding = '0'

    legendContainer.appendChild(listContainer)
  }

  return listContainer
}
