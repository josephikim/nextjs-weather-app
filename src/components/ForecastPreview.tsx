import { Card, Button } from 'react-bootstrap'
import { useLocalData } from 'hooks/useLocalData'
import { trpc } from 'utils/trpc'
import CurrentWeather from 'components/CurrentWeather'

interface ForecastPreviewProps {
  label: string
  latitude: string
  longitude: string
}

const ForecastPreview = ({
  label,
  latitude,
  longitude,
}: ForecastPreviewProps) => {
  const {
    state: { temperatureUnit },
  } = useLocalData()

  const { data: { data: forecast } = {} } = trpc.user.getForecast.useQuery({
    latitude,
    longitude,
    temperatureUnit,
  })

  const forecastRoute = `forecast?label=${encodeURIComponent(
    label
  )}&latitude=${latitude}&longitude=${longitude}`

  if (!forecast) {
    return <></>
  }

  return (
    <Card key={label}>
      <Card.Body>
        <Card.Title>{label}</Card.Title>
        <CurrentWeather
          current_weather={forecast.current_weather}
          daily={forecast.daily}
          daily_units={forecast.daily_units}
          hourly={forecast.hourly}
          hourly_units={forecast.hourly_units}
        />
        <Button variant="primary" href={forecastRoute}>
          View Details
        </Button>
      </Card.Body>
    </Card>
  )
}

export default ForecastPreview
