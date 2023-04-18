import type { Location } from '@prisma/client'
import React, { useState, useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import update from 'immutability-helper'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { trpc } from 'utils/trpc'
import ForecastPreview from 'components/ForecastPreview'
import DndMovableItem from 'components/DndMovableItem'
import classes from 'styles/sass/DashboardPage.module.scss'

const DashboardPage = () => {
  const [movableItems, setMovableItems] = useState<Location[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const utils = trpc.useContext()

  const { data: { data: userLocations } = {} } =
    trpc.user.getLocations.useQuery()

  const { mutate: deleteUserLocation } = trpc.user.deleteLocation.useMutation({
    onSuccess() {
      utils.user.getLocations.invalidate()
    },
    onError(error) {
      alert(error.message)
    },
  })

  const { mutate: updateDisplayOrder } =
    trpc.user.updateLocationsDisplayOrder.useMutation({
      onError(error) {
        alert(error.message)
      },
    })

  useEffect(() => {
    // Set backend for React DND
    setIsMobile(window.innerWidth < 600)

    // Update user locations for redirects from auth page
    if (!userLocations || userLocations.length < 1) {
      utils.user.getLocations.invalidate()
    }
  }, [])

  // Update React DND movable items
  useEffect(() => {
    const locations = userLocations?.map((userLocation) => {
      return userLocation.location
    })

    if (locations) {
      setMovableItems(locations)
    }
  }, [userLocations])

  // React DND move handler
  const moveItem = (dragIndex: number, hoverIndex: number) => {
    // Get the dragged element
    const draggedItem = movableItems[dragIndex]
    /*
      - copy the dragged item before hovered element (i.e., [hoverIndex, 0, draggedItem])
      - remove the previous reference of dragged element (i.e., [dragIndex, 1])
      - here we are using this update helper method from immutability-helper package
    */
    setMovableItems(
      update(movableItems, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, draggedItem],
        ],
      })
    )
  }

  // React DND drop handler
  const dropItem = () => {
    const newOrder = movableItems.map((item, index) => {
      return {
        locationId: item.id,
        displayOrder: index,
      }
    })

    updateDisplayOrder(newOrder)
  }

  const closeItem = (e: React.MouseEvent<HTMLElement>, label: string) => {
    e.preventDefault()
    if (movableItems.length === 1) {
      alert('Item cannot be deleted')
      return
    }
    if (window.confirm('Remove item from your dashboard?')) {
      const data = {
        label,
      }
      deleteUserLocation(data)
    }
  }

  let jsx: JSX.Element = <div>Loading dashboard...</div>

  if (userLocations) {
    const items = movableItems.map((item, index) => {
      return (
        <Col md={4} key={index}>
          <DndMovableItem
            item={item}
            index={index}
            key={item.label}
            moveItem={moveItem}
            dropItem={dropItem}
            closeItem={closeItem}
          >
            <ForecastPreview
              label={item.label}
              latitude={item.latitude.toString()}
              longitude={item.longitude.toString()}
            />
          </DndMovableItem>
        </Col>
      )
    })

    jsx = <Row>{items}</Row>
  }

  return (
    <div className={classes.container}>
      <main className={classes.main}>
        <div className={classes.flexContainer}>
          <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
            <Container>{jsx}</Container>
          </DndProvider>
        </div>
      </main>
    </div>
  )
}

DashboardPage.requireAuth = true

export default DashboardPage
