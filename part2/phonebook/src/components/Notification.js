import React from 'react'

const Notification = ({ message, type}) => {
    console.log('m', message)
    console.log('type', type)
    if (message === null) {
      return null
    }
  
    const className = `message ${type}`
    return (
      <div className={className}>{message}</div>
    )
}

export default Notification