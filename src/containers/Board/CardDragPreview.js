import React from 'react'
import PropTypes from 'prop-types'

import Card from './Cards/Card'

const styles = {
  display: 'inline-block',
  transform: 'rotate(-7deg)',
  WebkitTransform: 'rotate(-7deg)'
}

const propTypes = {
  card: PropTypes.object
}

const CardDragPreview = props => {
  const cardDragStyle = {
    ...styles,
    width: `${props.card.clientWidth || 243}px`,
    height: `${props.card.clientHeight || 243}px`
  }

  return (
    <div style={cardDragStyle}>
      <Card item={props.card.item} />
    </div>
  )
}

CardDragPreview.propTypes = propTypes

export default CardDragPreview
