import React, { useCallback, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import TR from './TR'
import { useFinanceContext } from 'financeContext'
import SortButtons from 'ui/elements/SortButtons'
import { sortWith, prop, ascend, descend } from 'ramda'
import {
  dataFields,
  sortDirections,
  views,
  duplicateStatus
} from 'global-constants'

// eslint-disable-next-line
import { green, red } from 'logger'
import { yellow } from '@material-ui/core/colors'

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

const AllDataByDescription = () => {
  // Actions
  const {
    rulesReadRequest,
    viewReadRequest,
    currentViewNameSet
  } = useFinanceContext()

  // State

  const [_switchState, _setSwitchState] = useState({
    // showOrigDescription: false,
    showOmitted: false
  })
  const [_sort, _setSort] = useState({
    fieldName: dataFields.description.name,
    direction: sortDirections.ascending
  })

  const [_rowsLoaded, _setRowsLoaded] = useState(0)

  const _updateRulesAndView = useCallback(async () => {
    await rulesReadRequest()
    await viewReadRequest(views.allDataByDescription)
  }, [rulesReadRequest, viewReadRequest])

  // Effects

  useEffect(() => {
    ;(async () => {
      await _updateRulesAndView()
      currentViewNameSet(views.allDataByDescription)
    })()
  }, [currentViewNameSet, _updateRulesAndView])

  // Local vars
  const _viewData = useSelector((state) => state.viewData)
  const _totalNumRows = _viewData.length
  const _classes = useStyles()

  // Methods

  if (_viewData.length === 0) {
    return <h1>Getting data</h1>
  }

  const getViewData = () => {
    const { fieldName, direction } = _sort
    if (direction === sortDirections.ascending) {
      return sortWith([ascend(prop(fieldName))])(_viewData)
    }
    return sortWith([descend(prop(fieldName))])(_viewData)
  }

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

  // const RowsLoading = () => {

  // }

  const updateCount = () => {
    _setRowsLoaded(_rowsLoaded + 1)
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
        {/* <span>Loading row {_rowsLoaded} of {_totalNumRows}</span> */}
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
          {getViewData().map((doc) => {
            
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

export default AllDataByDescription
