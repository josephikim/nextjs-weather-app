import type { NextPage } from 'next'
import { useLocalData } from 'hooks/useLocalData'
import Forecast from 'components/Forecast'
import classes from 'styles/sass/ForecastPage.module.scss'

const ForecastPage: NextPage = () => {
  const {
    state: { searchData },
  } = useLocalData()

  const [searchLatitude, searchLongitude] = searchData.value.split(' ')

  const latitude = searchLatitude ?? '48.8567'
  const longitude = searchLongitude ?? '2.351'

  return (
    <div className={classes.container}>
      <main className={classes.main}>
        <div className={classes.title}>Forecast for {searchData.label}</div>
        <Forecast latitude={latitude} longitude={longitude} />
      </main>
    </div>
  )
}

export default ForecastPage
