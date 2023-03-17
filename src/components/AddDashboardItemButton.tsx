import { z } from 'zod'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { trpc } from 'utils/trpc'

const createLocationSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  latitude: z.string().min(1, 'Latitude is required'),
  longitude: z.string().min(1, 'Longitude is required'),
})

type CreateLocationInput = z.infer<typeof createLocationSchema>

interface AddDashboardItemButtonProps {
  label: string
  latitude: string
  longitude: string
  isAdded: boolean
}

const AddDashboardItemButton = ({
  label,
  latitude,
  longitude,
  isAdded,
}: AddDashboardItemButtonProps) => {
  const { data: session } = useSession()
  const [isLoading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const utils = trpc.useContext()

  const handleCloseModal = () => setShowModal(false)
  const handleShowModal = () => setShowModal(true)

  const { mutate: createUserLocation } = trpc.user.createLocation.useMutation({
    onSuccess(data) {
      setLoading(false)
      console.log('Location added successfully')
      utils.user.getLocations.invalidate()
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
      createUserLocation(data)
    }
  }, [isLoading])

  const handleClick = () => {
    if (session) {
      if (isAdded) return
      setLoading(true)
    } else {
      handleShowModal()
    }
  }

  return (
    <>
      <Button
        variant={isAdded ? 'success' : 'primary'}
        disabled={isLoading}
        onClick={!isLoading ? handleClick : () => null}
      >
        {isLoading
          ? 'Updating...'
          : isAdded
          ? 'Saved in Dashboard'
          : 'Add to Dashboard'}
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Body>
          To manage your dashboard, please <Link href="/auth">login.</Link>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddDashboardItemButton
