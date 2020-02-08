import React, { useState, useRef } from 'react'
import { useDrop } from 'react-dnd'

import Card from './DraggableCard'
import { CARD_HEIGHT, CARD_MARGIN, OFFSET_HEIGHT } from '../../../constants.js'

const getPlaceholderIndex = (y, scrollY) => {
  // shift placeholder if y position more than card height / 2
  const yPos = y - OFFSET_HEIGHT + scrollY
  let placeholderIndex
  if (yPos < CARD_HEIGHT / 2) {
    placeholderIndex = -1 // place at the start
  } else {
    placeholderIndex = Math.floor(
      (yPos - CARD_HEIGHT / 2) / (CARD_HEIGHT + CARD_MARGIN)
    )
  }
  return placeholderIndex
}

const CardViaHooks = ({
  moveCard,
  x,
  cards,
  isScrolling,
  startScrolling,
  stopScrolling,
  ...props
}) => {
  /** state placeholderindex */
  const [{ placeholderIndex }, setPosition] = useState({ placeholderIndex: -1 })
  const refEl = useRef(null)

  const [{ isOver, canDrop, item }, connectDrag] = useDrop({
    accept: 'card',
    drop(props, monitor) {
      document.getElementById(monitor.getItem().id).style.display = 'block'

      const lastX = monitor.getItem().x
      const lastY = monitor.getItem().y
      const nextX = x
      let nextY = placeholderIndex

      if (lastY > nextY) {
        // move top
        nextY += 1
      } else if (lastX !== nextX) {
        // insert into another list
        nextY += 1
      }

      if (lastX === nextX && lastY === nextY) {
        // if position equel
        return
      }

      moveCard(lastX, lastY, nextX, nextY)
    },
    hover(props, monitor) {
      // defines where placeholder is rendered
      const newPlaceholderIndex = getPlaceholderIndex(
        monitor.getClientOffset().y,
        refEl.current.scrollTop
      )

      // horizontal scroll
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

      setPosition({ placeholderIndex: newPlaceholderIndex })
      // when drag begins, we hide the card and only display cardDragPreview
      const itemElement = monitor.getItem()
      document.getElementById(itemElement.id).style.display = 'none'
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      item: monitor.getItem()
    })
  })

  let isPlaceHold = false
  let cardList = []
  cards.forEach((itemx, i) => {
    if (isOver && canDrop) {
      isPlaceHold = false
      if (i === 0 && placeholderIndex === -1) {
        cardList.push(<div key="placeholder" className="item placeholder" />)
      } else if (placeholderIndex > i) {
        isPlaceHold = true
      }
    }

    if (itemx !== undefined) {
      cardList.push(
        <Card
          x={x}
          y={i}
          item={itemx}
          key={itemx.id}
          stopScrolling={stopScrolling} // this.props.stopScrolling
        />
      )
    }
    if (isOver && canDrop && placeholderIndex === i) {
      cardList.push(<div key="placeholder" className="item placeholder" />)
    }
  })

  // if placeholder index is greater than array.length, display placeholder as last
  if (isPlaceHold) {
    cardList.push(<div key="placeholder" className="item placeholder" />)
  }

  // if there is no items in cards currently, display a placeholder anyway
  if (isOver && canDrop && cards.length === 0) {
    cardList.push(<div key="placeholder" className="item placeholder" />)
  }

  connectDrag(refEl)
  return (
    <div ref={refEl} className="desk-items">
      {cardList}
    </div>
  )
}

export default CardViaHooks
