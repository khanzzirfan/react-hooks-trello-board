import React from 'react'

import { useDragLayer } from 'react-dnd'

import CardDragPreview from './CardDragPreview'
import snapToGrid from './snapToGrid'

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100000
}

const getItemStyles = (initialOffset, currentOffset, isSnapToGrid) => {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none'
    }
  }
  let { x, y } = currentOffset
  if (isSnapToGrid) {
    x -= initialOffset.x
    y -= initialOffset.y
    ;[x, y] = snapToGrid(x, y)
    x += initialOffset.x
    y += initialOffset.y
  }
  const transform = `translate(${x}px, ${y}px)`
  return {
    transform,
    WebkitTransform: transform
  }
}

const CustomDragLayer = props => {
  const {
    itemType,
    isDragging,
    item,
    initialOffset,
    currentOffset
  } = useDragLayer(monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }))
  function renderItem() {
    switch (itemType) {
      case 'card':
        return <CardDragPreview card={item} />
      default:
        return null
    }
  }
  if (!isDragging) {
    return null
  }
  return (
    <div style={layerStyles}>
      <div
        style={getItemStyles(initialOffset, currentOffset, props.snapToGrid)}>
        {renderItem()}
      </div>
    </div>
  )
}
export default CustomDragLayer
