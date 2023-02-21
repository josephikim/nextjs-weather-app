import { z } from 'zod'
import { trpc } from 'utils/trpc'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'

const createLocationSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  latitude: z.string().min(1, 'Latitude is required'),
  longitude: z.string().min(1, 'Longitude is required'),
})

type CreateLocationInput = z.infer<typeof createLocationSchema>

interface AddUserLocationButtonProps {
  label: string
  latitude: string
  longitude: string
}

const AddUserLocationButton = ({
  label,
  latitude,
  longitude,
}: AddUserLocationButtonProps) => {
  const [isLoading, setLoading] = useState(false)

  const { mutate: addUserLocation } = trpc.addUserLocation.useMutation({
    onSuccess(data) {
      setLoading(false)
      console.log('Location added successfully')
    },
    onError(error) {
      setLoading(false)
      console.log('Error:', error.message)
    },
  })

  useEffect(() => {
    if (isLoading) {
      const data: CreateLocationInput = {
        label,
        latitude,
        longitude,
      }
      addUserLocation(data)
    }
  }, [isLoading])

  const handleClick = () => {
    setLoading(true)
  }

  return (
    <>
      <Button
        variant="primary"
        disabled={isLoading}
        onClick={!isLoading ? handleClick : () => null}
      >
        {isLoading ? 'Updating...' : 'Add to Dashboard'}
      </Button>
    </>
  )
}

export default AddUserLocationButton
