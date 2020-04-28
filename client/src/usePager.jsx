import { useState, useEffect, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import * as R from 'ramda'
import { sortDirections } from 'global-constants'

// eslint-disable-next-line
import { green, red, yellow } from 'logger'

const sortData = (fieldName, direction, data) => {
  if (direction === sortDirections.ascending) {
    const a = R.sortWith([R.ascend(R.prop(fieldName))])(data)
    yellow('a', a)
    return a
  }
  const b = R.sortWith([R.descend(R.prop(fieldName))])(data)
  yellow('b', b)
  return b
}

/**
 *
 * @param {function} selector function to be called with useSelector
 */

const usePager = ({
  numRowsPerPage,
  sortField,
  sortDirection = sortDirections.ascending
}) => {
  const [_startEndPage, _setStartEndPage] = useState({
    start: null,
    end: null
  })

  let _newStart
  let _newEnd
  yellow('_startEndPage.start', _startEndPage.start)
  yellow('_startEndPage.end', _startEndPage.end)

  // first time
  if (R.isNil(_startEndPage.start)) {
    _newStart = 0
  }
  if (R.isNil(_startEndPage.end)) {
    _newEnd = numRowsPerPage
  }
  yellow('_newStart', _newStart)
  yellow('_newEnd', _newEnd)


  const init = ({
    numRowsPerPage,
    initialSortField,
    initialSortDirection = sortDirections.ascending
  }) => {
    return 'a'
  }

  const data = useSelector((state) => state.viewData)

  // yellow('data', data)


  export const next = () => {
    _newStart = _newStart + numRowsPerPage
    _newEnd = _newEnd + numRowsPerPage
  }

  export const previous = () => {
    _newStart = _newStart + numRowsPerPage
    _newEnd = _newEnd + numRowsPerPage
  }

  return R.slice(_newStart, _newEnd, sortData(sortField, sortDirection, data))
}

export { usePager }

// const usePagerX = (
//   numRowsPerPage,
//   forwardOrBack,
//   sortField,
//   sortDirection,
//   data
// ) => {
//   // yellow('data', data)
//   // const [_currentPages, _setCurrentPages] = useState([])
//   const [_numRowsPerPage, _setNumRowsPerPage] = useState(numRowsPerPage || 10)
//   const [_startEndPage, _setStartEndPage] = useState({
//     start: 0,
//     end: _numRowsPerPage
//   })
//   let _currentPages
//   useEffect(() => {
//     if (numRowsPerPage !== _numRowsPerPage) {
//       _setNumRowsPerPage(numRowsPerPage)
//     }
//     const _increment =
//       forwardOrBack === direction.forward ? numRowsPerPage : -numRowsPerPage
//     const _newStart = _startEndPage.start + _increment
//     const _newEnd = _startEndPage.end + _increment
//     _setStartEndPage({
//       start: _newStart,
//       end: _newEnd
//     })

//     // _setCurrentPages(R.slice(_newStart, _newEnd)(sortData(sortField, sortDirection, data)))
//     const sortedData = sortData(sortField, sortDirection, data)
//     yellow('sortedData', sortedData)
//     _currentPages = R.slice(_newStart, _newEnd, sortedData)
//     yellow('_currentPages', _currentPages)
//   }, [])
//   // const getCurrentPages = _currentPages

//   return _currentPages
// }



// const ex = () => {
//   const [_startEndPage, _setStartEndPage] = useState({
//     start: null,
//     end: null
//   })

//   let _newStart
//   let _newEnd

//   useEffect(() => {
//     // first time
//     if (R.isNil(_startEndPage.start)) {
//       _newStart = 0
//     }
//     if (R.isNil(_startEndPage.end)) {
//       _newEnd = numRowsPerPage
//     }
//     console.log('in: _newStart', _newStart)
//     console.log('in: _newEnd', _newEnd)
//   }, [])

//   console.log('out: _newStart', _newStart)
//   console.log('out: _newEnd', _newEnd)

// }
