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

  const { data: { data: userLocations } = {} } =
    trpc.user.getLocations.useQuery()

  const locations = userLocations?.map((userLocation) => {
    return userLocation.location
  })

  if (locations && movableItems && movableItems.length < 1) {
    setMovableItems(locations)
  }

  useEffect(() => {
    setIsMobile(window.innerWidth < 600)
  }, [])

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

  let jsx: React.ReactElement | React.ReactElement[] = (
    <div>Loading dashboard...</div>
  )

  const gridTemplate: JSX.Element = (
    <div className="row" id="container">
      <div className="col-4"></div>
      <div className="col-4"></div>
      <div className="col-4"></div>
    </div>
  )

  if (movableItems && movableItems.length < 1) {
    jsx = <span>No items found</span>
  } else if (movableItems) {
    const items = movableItems.map((location, index) => {
      return (
        <Col md={4} key={index}>
          <DndMovableItem
            item={location}
            index={index}
            key={location.label}
            moveItem={moveItem}
          >
            <ForecastPreview
              label={location.label}
              latitude={location.latitude.toString()}
              longitude={location.longitude.toString()}
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

export default DashboardPage
