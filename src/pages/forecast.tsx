import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Forecast from 'components/Forecast'
import classes from 'styles/sass/ForecastPage.module.scss'

const ForecastPage: NextPage = () => {
  const router = useRouter()

  const label = router.query.label as string
  const latitude = router.query.latitude as string
  const longitude = router.query.longitude as string

  const isParamMissing = !label || !latitude || !longitude

  return (
    <div className={classes.container}>
      {isParamMissing ? (
        <div>Error loading page</div>
      ) : (
        <main className={classes.main}>
          <Forecast label={label} latitude={latitude} longitude={longitude} />
        </main>
      )}
    </div>
  )
}

export default ForecastPage
