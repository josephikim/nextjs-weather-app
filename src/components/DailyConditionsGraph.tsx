import type { HourlyDataViewModel } from 'viewModels/hourlyDataViewModel'
import type { HourlyUnitsViewModel } from 'viewModels/hourlyUnitsViewModel'

import classes from 'styles/sass/DailyConditionsGraph.module.scss'

interface DailyConditionsGraphProps {
  hourly: HourlyDataViewModel
  units: HourlyUnitsViewModel
}

const DailyConditionsGraph = ({ hourly, units }: DailyConditionsGraphProps) => (
  <div className="DailyConditionsGraph">Graph here</div>
)

export default DailyConditionsGraph
