import type { NextPage } from 'next'
import { useLocalData } from 'hooks/useLocalData'
import Forecast from 'components/Forecast'
import classes from 'styles/sass/ForecastPage.module.scss'

const ForecastPage: NextPage = () => {
  const {
    state: { searchResult },
  } = useLocalData()

  const [searchLatitude, searchLongitude] = searchResult.value.split(' ')

  const latitude = searchLatitude
  const longitude = searchLongitude

  return (
    <div className={classes.container}>
      <main className={classes.main}>
        <Forecast
          label={searchResult.label}
          latitude={latitude}
          longitude={longitude}
        />
      </main>
    </div>
  )
}

export default ForecastPage
