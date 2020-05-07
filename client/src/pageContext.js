import React, { useState, useContext } from 'react'
import { useSelector } from 'react-redux'
import * as R from 'ramda'
import { sortDirections } from 'global-constants'

export const PageContext = React.createContext()
export const usePageContext = () => useContext(PageContext)

// eslint-disable-next-line
import { green, red, yellow, purple } from 'logger'

const getNewStart = ({
  currentStart,
  rowsPerPage,
  maxRows,
  next = false,
  previous = false
}) => {
  if (next) {
    if (currentStart + rowsPerPage >= maxRows) {
      return maxRows
    } else {
      return currentStart + rowsPerPage
    }
  }

  if (previous) {
    if (currentStart - rowsPerPage <= 0) {
      return 0
    } else {
      return currentStart - rowsPerPage
    }
  }

  throw new Error(
    'pageContext.getNewStart: one of next or previous must be true'
  )
}

const getNewEnd = ({
  currentEnd,
  rowsPerPage,
  maxRows,
  next = false,
  previous = false
}) => {
  if (next) {
    if (currentEnd + rowsPerPage >= maxRows) {
      return maxRows
    } else {
      return currentEnd + rowsPerPage
    }
  }

  if (previous) {
    if (currentEnd - rowsPerPage <= 0) {
      return 0
    } else {
      return currentEnd - rowsPerPage
    }
  }

  throw new Error('pageContext.getNewEnd: one of next or previous must be true')
}

const _sortData = (sortField, direction, data) => {
  // console.group('_sortData')
  // purple('fieldName', sortField)
  // purple('direction', direction)
  // console.groupEnd()
  if (direction === sortDirections.ascending) {
    return R.sortWith([R.ascend(R.prop(sortField))])(data)
  }
  return R.sortWith([R.descend(R.prop(sortField))])(data)
}

export const PageProvider = ({ children }) => {
  // state
  const [_rows, _setRows] = useState({
    start: 0,
    end: 0
  })
  const [_rowsPerPage, _setRowsPerPage] = useState(0)
  const [_sort, _setSort] = useState({
    field: 'description',
    direction: 'ascending'
  })
  const [_atStart, _setAtStart] = useState(true)
  const [_atEnd, _setAtEnd] = useState(false)
  const [_totalRows, _setTotalRows] = useState(0)


  // local vars
  const data = useSelector((state) => state.viewData)
  
  const init = (
    numRowsPerPage = 10,
    sortField,
    sortDirection = 'ascending'
  ) => {
    yellow('pageContext init - start')
    _setRowsPerPage(numRowsPerPage)
    _setSort({ field: sortField, direction: sortDirection })
    _setRows({ start: 0, end: numRowsPerPage })
    _setAtStart(true)
    _setAtEnd(data.length === numRowsPerPage ? true : false)
    _setTotalRows(data.length)
    yellow('pageContext init - end')
    return R.slice(0, numRowsPerPage, _sortData(sortField, sortDirection, data))
  }

  const sort = (field, direction) => {
    _sortData(field, direction, data)
  }

  const next = () => {
    const newStart = getNewStart({
      currentStart: _rows.start,
      rowsPerPage: _rowsPerPage,
      maxRows: data.length,
      next: true
    })
    const newEnd = getNewEnd({
      currentEnd: _rows.end,
      rowsPerPage: _rowsPerPage,
      maxRows: data.length,
      next: true
    })
    _setAtStart(false)
    _setAtEnd(newEnd === data.length ? true : false)
    _setRows({ start: newStart, end: newEnd })
    console.group('next')
    yellow('newStart', newStart)
    yellow('newEnd', newEnd)
    yellow('data.length', data.length)
    console.groupEnd()
    return R.slice(
      newStart,
      newEnd,
      _sortData(_sort.field, _sort.direction, data)

    )
  }

  const previous = () => {
    const newStart = getNewStart({
      currentStart: _rows.start,
      rowsPerPage: _rowsPerPage,
      maxRows: data.length,
      previous: true
    })
    const newEnd = getNewEnd({
      currentEnd: _rows.end,
      rowsPerPage: _rowsPerPage,
      maxRows: data.length,
      previous: true
    })
    _setAtStart(newStart === 0)
    _setAtEnd(data.length === _rowsPerPage ? true : false)
    _setRows({ start: newStart, end: newEnd })
    return R.slice(
      newStart,
      newEnd,
      _sortData(_sort.field, _sort.direction, data)
    )
  }

  return (
    <PageContext.Provider
      value={{
        init,
        next,
        previous,
        sort,
        rows:  {start: _rows.start, end: _rows.end },
        rowsPerPage: _rowsPerPage,
        atStart: _atStart,
        atEnd: _atEnd,
        totalRows: _totalRows
      }}
    >
      {children}
    </PageContext.Provider>
  )
}
