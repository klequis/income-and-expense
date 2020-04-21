import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { dataFields } from 'global-constants'

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

const DuplicateTable = ({ rows }) => {
  
  const _classes = useStyles()

  return (
    <TableContainer>
      <Table className={_classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{dataFields.date.description}</TableCell>
            <TableCell >{dataFields.description.description}</TableCell>
            <TableCell align="right">{dataFields.credit.description}</TableCell>
            <TableCell align="right">{dataFields.debit.description}</TableCell>
            <TableCell align="right">{dataFields.type.description}</TableCell>
            <TableCell align="right">{dataFields.duplicate.description}</TableCell>
            <TableCell align="right">{dataFields.duplicateStatus.description}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              {/* <TableCell component="th" scope="row">
                {row.name}
              </TableCell> */}
              <TableCell>{row[dataFields.date.name]}</TableCell>
              <TableCell>{row[dataFields.description.name]}</TableCell>
              <TableCell align="right">{row[dataFields.credit.name]}</TableCell>
              <TableCell align="right">{row[dataFields.debit.name]}</TableCell>
              <TableCell align="right">{row[dataFields.type.name]}</TableCell>
              <TableCell align="right">{row[dataFields.duplicate.name] ? 'yes' : 'no'}</TableCell>
              <TableCell align="right">{row[dataFields.duplicateStatus.name]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DuplicateTable