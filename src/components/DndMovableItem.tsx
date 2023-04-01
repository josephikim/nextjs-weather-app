import React, { useRef } from 'react'
import { Card } from 'react-bootstrap'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from 'utils/reactdnd'
import classes from 'styles/sass/DndMovableItem.module.scss'

const DndMovableItem = ({ item, index, moveItem, dropItem, children }: any) => {
  const ref = useRef(null)

  const [, drop] = useDrop({
    accept: ItemTypes.MOVABLE,
    hover(item: any, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      moveItem(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
    drop(item: any, monitor) {
      if (!ref.current) {
        return
      }

      dropItem()
    },
  })

  const [{ isDragging }, drag] = useDrag(() => ({
    // what type of item this to determine if a drop target accepts it
    type: ItemTypes.MOVABLE,
    // data of the item to be available to the drop methods
    item: { id: item.id, index },
    // method to collect additional data for drop handling like whether is currently being dragged
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      }
    },
  }))

  drag(drop(ref))

  return (
    <Card
      ref={ref}
      style={{ opacity: isDragging ? 0 : 1 }}
      className={classes.movableItem}
    >
      <Card.Title className={classes.cardTitle}>
        <span className={classes.grabHandle}></span>
        {item.label}
      </Card.Title>
      <Card.Body>{children}</Card.Body>
    </Card>
  )
}

export default DndMovableItem
