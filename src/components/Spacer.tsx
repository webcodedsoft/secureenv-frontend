import React from 'react'

type Props = {
  width?: number
  height?: number
}

const Spacer: React.FC<Props> = ({ width = 0, height = 0 }) => {
  return <div style={{ width: `${width}px`, height: `${height}px` }} />
}

export default Spacer
