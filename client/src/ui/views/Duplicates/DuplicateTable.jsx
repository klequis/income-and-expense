import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import MuiTableRow from '@material-ui/core/TableRow'
import Checkbox from '@material-ui/core/Checkbox'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { dataFields, duplicateStatus } from 'global-constants'

// eslint-disable-next-line
import { green } from 'logger'

/*
  acctId,
  date,
  description,
  credit,
  debit,
  type,
  duplicate,
  duplicateStatus
*/

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
})

const TableRow = ({ rowData }) => {
  const [_isDuplicate, _setIsDuplicate] = useState(
    rowData[dataFields.duplicate.name]
  )
  const [_duplicateStatus, _setDuplicateStatus] = useState(
    rowData[dataFields.duplicateStatus.name]
  )
  const handleDuplicateCheckChange = (event) => {
    _setIsDuplicate(event.target.checked)
  }

  const handleDuplicateStatusChange = (event) => {
    _setDuplicateStatus(event.target.value)
  }

  return (
    <MuiTableRow>
      <TableCell>{rowData[dataFields.date.name]}</TableCell>
      <TableCell>{rowData[dataFields.description.name]}</TableCell>
      <TableCell align="right">{rowData[dataFields.credit.name]}</TableCell>
      <TableCell align="right">{rowData[dataFields.debit.name]}</TableCell>
      <TableCell align="right">{rowData[dataFields.type.name]}</TableCell>
      <TableCell align="right">
        <Checkbox
          checked={_isDuplicate}
          onChange={handleDuplicateCheckChange}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      </TableCell>
      <TableCell align="right">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={_duplicateStatus}
          onChange={handleDuplicateStatusChange}
        >
          <MenuItem value={duplicateStatus.duplicateNew}>
            {duplicateStatus.duplicateNew}
          </MenuItem>
          <MenuItem value={duplicateStatus.duplicatePending}>
            {duplicateStatus.duplicatePending}
          </MenuItem>
          <MenuItem value={duplicateStatus.duplicateRefunded}>
            {duplicateStatus.duplicateRefunded}
          </MenuItem>
          <MenuItem value={duplicateStatus.duplicateNotRefunded}>
            {duplicateStatus.duplicateNotRefunded}
          </MenuItem>
        </Select>
      </TableCell>
    </MuiTableRow>
  )
}

const DuplicateTable = ({ rows }) => {
  const _classes = useStyles()

  return (
    <TableContainer>
      <Table className={_classes.table} aria-label="simple table">
        <TableHead>
          <MuiTableRow>
            <TableCell>{dataFields.date.description}</TableCell>
            <TableCell>{dataFields.description.description}</TableCell>
            <TableCell align="right">{dataFields.credit.description}</TableCell>
            <TableCell align="right">{dataFields.debit.description}</TableCell>
            <TableCell align="right">{dataFields.type.description}</TableCell>
            <TableCell align="right">
              {dataFields.duplicate.description}
            </TableCell>
            <TableCell align="right">
              {dataFields.duplicateStatus.description}
            </TableCell>
          </MuiTableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            return <TableRow key={row._id} rowData={row} />
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DuplicateTable
