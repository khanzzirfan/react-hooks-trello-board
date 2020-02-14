import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import Cards from './Cards'
import { CardTypes } from './cardTypes'

const CardsContainer = ({
  id,
  item,
  x,
  moveCard,
  moveList,
  // isDragging,
  startScrolling,
  stopScrolling,
  isScrolling
}) => {
  const ref = useRef(null)
  const [{ isDragging }, connectDrag] = useDrag({
    item: { id, type: CardTypes.CARD },
    begin() {
      return {
        id,
        x
      }
    },
    end() {
      stopScrolling()
    },
    collect: monitor => {
      const result = {
        isDragging: monitor.isDragging()
      }
      return result
    }
  })
  const [, connectDrop] = useDrop({
    accept: CardTypes.CARD,
    canDrop() {
      return false
    },
    hover(monitor) {
      if (!isScrolling) {
        if (window.innerWidth - monitor.getClientOffset().x < 200) {
          startScrolling('toRight')
        } else if (monitor.getClientOffset().x < 200) {
          startScrolling('toLeft')
        }
      } else {
        if (
          window.innerWidth - monitor.getClientOffset().x > 200 &&
          monitor.getClientOffset().x > 200
        ) {
          stopScrolling()
        }
      }
      const { id: listId } = monitor.getItem()
      const nextX = id

      if (listId !== nextX) {
        moveList(listId, x)
      }
    }
  })

  connectDrag(ref)
  connectDrop(ref)
  const opacity = isDragging ? 0.5 : 1

  return (
    <div ref={ref} className="desk" style={{ opacity }}>
      <div className="desk-head">
        <div className="desk-name">{item.name}</div>
      </div>
      <Cards
        moveCard={moveCard}
        x={x}
        cards={item.cards}
        startScrolling={startScrolling}
        stopScrolling={stopScrolling}
        isScrolling={isScrolling}
      />
    </div>
  )
}

export default CardsContainer
