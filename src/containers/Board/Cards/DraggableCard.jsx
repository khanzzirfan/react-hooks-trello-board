import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useDrag, DragPreviewImage } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import Card from './Card'

const imgSrc = getEmptyImage()

const CardComponent = ({ item, x, y, stopScrolling }) => {
  const ref = useRef(null)

  const [{ display }, connectDrag, preview] = useDrag({
    item: { id: item.id, type: 'card' },

    begin() {
      // dispatch to redux store that drag is started
      const { id, title } = item
      const { clientWidth, clientHeight } = ref.current
      return { id, title, item, x, y, clientWidth, clientHeight }
    },

    end(props, monitor) {
      document.getElementById(monitor.getItem().id).style.display = 'block'
      stopScrolling()
    },
    options: {
      arePropsEqual: function arePropsEqual(props, otherProps) {
        let isEqual = true
        if (
          props.item.id === otherProps.item.id &&
          props.x === otherProps.x &&
          props.y === otherProps.y
        ) {
          isEqual = true
        } else {
          isEqual = false
        }
        return isEqual
      }
    },
    isDragging(monitor) {
      const isDragging = item && item.id === monitor.getItem().id
      return isDragging
    },
    collect: monitor => {
      const result = {
        display: monitor.isDragging() ? 0.5 : 1,
        opacity: monitor.isDragging() ? 0.5 : 1,
        isDragging: monitor.isDragging()
      }
      return result
    }
  })
  connectDrag(ref)
  return (
    <>
      <DragPreviewImage connect={preview} src={imgSrc.src} />
      <div ref={ref}>
        <Card style={{ display }} item={item} />
      </div>
    </>
  )
}

CardComponent.propTypes = {
  item: PropTypes.object,
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number,
  stopScrolling: PropTypes.func
}

export default CardComponent
