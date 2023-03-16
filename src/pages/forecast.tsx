import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Forecast from 'components/Forecast'
import classes from 'styles/sass/ForecastPage.module.scss'

const ForecastPage: NextPage = () => {
  const router = useRouter()

  const label = router.query.label as string
  const latitude = router.query.latitude as string
  const longitude = router.query.longitude as string

  const isQueryParamMissing = !label || !latitude || !longitude

  return (
    <div className={classes.container}>
      <main className={classes.main}>
        {isQueryParamMissing ? (
          <div>Error loading page</div>
        ) : (
          <>
            <Forecast label={label} latitude={latitude} longitude={longitude} />
          </>
        )}
      </main>
    </div>
  )
}

export default ForecastPage
