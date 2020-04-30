import React, { useCallback, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import TR from './TR'
import SortButtons from 'ui/elements/SortButtons'
import {
  dataFields,
  sortDirections,
  views
  // duplicateStatus
} from 'global-constants'
import { usePageContext } from 'pageContext'
import { useFinanceContext } from 'financeContext'

// eslint-disable-next-line
import { green, red, yellow } from 'logger'

const useStyles = makeStyles({
  th: {
    display: 'flex',
    flexFlow: 'row nowrap',
    paddingBottom: 5
  },
  thText: {
    marginRight: 10,
    whiteSpace: 'nowrap',
    textTransform: 'capitalize'
  }
})

const View = () => {
  green('view')
  const { init, next, previous, atStart, atEnd, rows, rowsPerPage, totalRows } = usePageContext()

  const {
    rulesReadRequest,
    viewReadRequest,
    currentViewNameSet
  } = useFinanceContext()

  const [_data, _setData] = useState([])
  const [_switchState, _setSwitchState] = useState({
    showOmitted: false
  })
  // eslint-disable-next-line
  const [_sort, _setSort] = useState({
    fieldName: dataFields.description.name,
    direction: sortDirections.ascending
  })

  const _updateRulesAndView = useCallback(async () => {
    await rulesReadRequest()
    await viewReadRequest(views.allDataByDescription)
  }, [rulesReadRequest, viewReadRequest])

  useEffect(() => {
    // REST MUST HAPPEN AFTER CALLS COME BACK
    green('init - start')
    const viewData = init(200, 'description')
    // green('viewData', viewData)

    green('init - end')

    green('_setData - start')
    _setData(viewData)
    green('_setData - end')
  }, [])

  const _classes = useStyles()

  const _handleSwitchChange = (name) => (event) => {
    _setSwitchState({ ..._switchState, [name]: event.target.checked })
  }

  const _updateSort = (fieldName, direction) => {
    _setSort({
      fieldName,
      direction
    })
  }

  const ColumnHeading = ({ fieldName }) => {
    return (
      <th>
        <div className={_classes.th}>
          <span className={_classes.thText}>{fieldName}</span>
          <SortButtons updateSort={_updateSort} fieldName={fieldName} />
        </div>
      </th>
    )
  }

  const _nextClick = () => {
    const newData = next()
    _setData(newData)
  }

  const _previousClick = () => {
    const newData = previous()
    _setData(newData)
  }

  return (
    <>
      <div>
        <FormControlLabel
          control={
            <Switch
              checked={_switchState.showOmitted}
              onChange={_handleSwitchChange('showOmitted')}
              value="showOmitted"
            />
          }
          label="Show Omitted"
        />
        <button disabled={atStart} onClick={_previousClick}>
          Previous
        </button>
        <button disabled={atEnd} onClick={_nextClick}>
          Next
        </button>
        <div>
          rows: {rows.start} to {rows.end} | rowsPerPage: {rowsPerPage} | totalRows: {totalRows}
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <ColumnHeading fieldName={dataFields.date.name} />
            <ColumnHeading fieldName={dataFields.acctId.name} />
            <ColumnHeading fieldName={dataFields.description.name} />
            <ColumnHeading fieldName={dataFields.credit.name} />
            <ColumnHeading fieldName={dataFields.debit.name} />
            <ColumnHeading fieldName={dataFields.category1.name} />
            <ColumnHeading fieldName={dataFields.category2.name} />
            <ColumnHeading fieldName={dataFields.type.name} />
            <ColumnHeading fieldName={dataFields.omit.name} />
          </tr>
        </thead>
        <tbody>
          {_data.map((doc) => {
            const { _id, omit } = doc
            if (_switchState.showOmitted === false && omit) {
              return null
            }
            return (
              <TR
                key={_id}
                doc={doc}
                showOmitted={_switchState.showOmitted}
                updateRulesAndView={_updateRulesAndView}
                view={views.allDataByDescription}
              />
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default View