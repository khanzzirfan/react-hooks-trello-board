import React from 'react'
import PropTypes from 'prop-types'
import Board from '../Board/Board'

const propTypes = {
  children: PropTypes.element.isRequired
}

const BaseContainer = props => (
  <main>
    <Board />
  </main>
)

BaseContainer.propTypes = propTypes

export default BaseContainer
