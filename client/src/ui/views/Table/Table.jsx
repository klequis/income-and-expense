import React, { useCallback, useEffect, useState } from 'react'
import MuiTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import ColumnHeading from './ColumnHeading'
import * as R from 'ramda'
import {
  append,
  ascend,
  compose,
  descend,
  evolve,
  filter,
  flip,
  has,
  map as rMap,
  mergeRight,
  prop,
  sortWith,
  // tap,
  toLower,
  transduce,
  type,
  mapObjIndexed
  // values
} from 'ramda'
import { sortDirections } from 'global-constants'

// eslint-disable-next-line
import { blue, green } from 'logger'

const Table = ({ data, columns, columnSource, initialSortField }) => {
  // State

  const [_sort, _setSort] = useState({
    fieldName: initialSortField,
    direction: sortDirections.ascending
  })
  const [_viewData, _setViewData] = useState([])
  const [_rowCount, _setRowCount] = useState(0)

  // Effects

  useEffect(() => {
    const evolver = filter(Boolean, rMap(prop('formatFn'), columnSource))
    const formattedData = rMap(evolve(evolver))(data)
    _setViewData(formattedData)
  }, [_setViewData, columns, data, columnSource])

  if (_viewData.length === 0) {
    return <h1>Loading</h1>
  }

  // Methods

  const _addSortField = field => data => {
    const sortFieldValue = prop(field, data)
    const y =
      type(sortFieldValue) === 'String'
        ? toLower(sortFieldValue)
        : sortFieldValue
    const withSortField = mergeRight(data, { sortField: y })
    return withSortField
  }

  const _getViewData = () => {
    const { direction, fieldName } = _sort

    return compose(
      sortWith(
        direction === 'ascending'
          ? [ascend(prop('sortField'))]
          : [descend(prop('sortField'))]
      ),
      rMap(_addSortField(fieldName))
    )(_viewData)
  }

  const _updateSort = (fieldName, direction) => {
    // green('_updateSort: fieldName', fieldName)
    // green('_updateSort: direction', direction)
    _setSort({
      fieldName: fieldName,
      direction
    })
  }

  const Row = ({ rowData }) => {
    // green('rowData', rowData)
    return (
      <TableRow>
        {columns.map(c => {
          return <TableCell key={c}>{rowData[c]}</TableCell>
        })}
      </TableRow>
    )
  }

  return (
    <TableContainer>
      <MuiTable size="small">
        <TableHead>
          <TableRow>
            {columns.map(c => (
              <ColumnHeading key={c} fieldName={c} updateSort={_updateSort}>
                {columnSource[c].description}
              </ColumnHeading>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {_getViewData().map(d => {
            _setRowCount(R.inc(_rowCount))
            return <Row key={d._id} rowData={d} />
          })}
        </TableBody>
      </MuiTable>
    </TableContainer>
  )
}

export default Table
