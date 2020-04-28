import React from 'react'
import usePager from 'usePager'

const Pager = (data) => {
  const _prevClick = () => {}
  const _nextClick = () => {}
  // const _data = usePager(2, '', _sort.fieldName, _sort.direction, data)
  return (
    <div>
      <button onClick={_prevClick}>Previous</button>
      <button onClick={_nextClick}>Next</button>
    </div>
  )
}

export default Pager
