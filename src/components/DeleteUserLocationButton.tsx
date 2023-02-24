import { z } from 'zod'
import { trpc } from 'utils/trpc'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'

const deleteLocationSchema = z.object({
  label: z.string().min(1, 'Label is required'),
})

type DeleteLocationInput = z.infer<typeof deleteLocationSchema>

interface DeleteUserLocationButtonProps {
  label: string
}

const DeleteUserLocationButton = ({ label }: DeleteUserLocationButtonProps) => {
  const [isLoading, setLoading] = useState(false)

  const { mutate: deleteUserLocation } = trpc.deleteUserLocation.useMutation({
    onSuccess() {
      setLoading(false)
      console.log('Location deleted successfully')
    },
    onError(error) {
      setLoading(false)
      console.log('Error:', error.message)
    },
  })

  useEffect(() => {
    if (isLoading) {
      const data: DeleteLocationInput = {
        label,
      }
      deleteUserLocation(data)
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
        {isLoading ? 'Updating...' : 'Remove from Dashboard'}
      </Button>
    </>
  )
}

export default DeleteUserLocationButton
