import type { NextPage } from 'next'
import { useLocalData } from 'hooks/useLocalData'
import Forecast from 'components/Forecast'
import classes from 'styles/sass/ForecastPage.module.scss'

const ForecastPage: NextPage = () => {
  const {
    state: { searchResult },
  } = useLocalData()

  const [searchLatitude, searchLongitude] = searchResult.value.split(' ')

  const latitude = searchLatitude ?? '37.77'
  const longitude = searchLongitude ?? '-122.42'

  return (
    <div className={classes.container}>
      <main className={classes.main}>
        <div className={classes.title}>Forecast for {searchResult.label}</div>
        <Forecast latitude={latitude} longitude={longitude} />
      </main>
    </div>
  )
}

export default ForecastPage
