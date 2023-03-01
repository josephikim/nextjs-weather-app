import dayjs from 'dayjs'
import { Plugin } from 'chart.js'
import { ForecastHourlyDataViewModel } from 'viewModels/forecastHourlyDataViewModel'
import { DaySelectionRange } from 'hooks/useLocalData'

type ChartData = {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    tension: number
  }[]
}

export const getDailyChartData = (
  data: ForecastHourlyDataViewModel,
  daySelection: DaySelectionRange
): ChartData => {
  const startIndex = 0 + 24 * (daySelection - 1)
  const endIndex = 24 + 24 * (daySelection - 1)

  const chartLabels = data.time
    .slice(startIndex, endIndex)
    .map((timestamp) => dayjs(timestamp).format('h:mma'))

  const chartDatasets = [
    {
      label: 'Temperature',
      data: data.temperature_2m.slice(startIndex, endIndex),
      tension: 0.3,
    },
    {
      label: 'Precipitation',
      data: data.precipitation.slice(startIndex, endIndex),
      tension: 0.3,
      hidden: true,
    },
    {
      label: 'Humidity',
      data: data.relativehumidity_2m.slice(startIndex, endIndex),
      tension: 0.3,
      hidden: true,
    },
    {
      label: 'Wind Speed',
      data: data.windspeed_10m.slice(startIndex, endIndex),
      tension: 0.3,
      hidden: true,
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
      li.style.marginLeft = '10px'
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

      // Color box
      const boxSpan = document.createElement('span')
      boxSpan.style.background = item.fillStyle
      boxSpan.style.borderColor = item.strokeStyle
      boxSpan.style.borderWidth = item.lineWidth + 'px'
      boxSpan.style.display = 'inline-block'
      boxSpan.style.height = '20px'
      boxSpan.style.marginRight = '10px'
      boxSpan.style.width = '20px'

      // Text
      const textContainer = document.createElement('p')
      textContainer.style.color = item.fontColor
      textContainer.style.margin = '0'
      textContainer.style.padding = '0'
      textContainer.style.textDecoration = item.hidden ? 'line-through' : ''

      const text = document.createTextNode(item.text)
      textContainer.appendChild(text)

      li.appendChild(boxSpan)
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
