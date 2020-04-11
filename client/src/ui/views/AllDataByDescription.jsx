import React, { useCallback, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import TR from './TR'
import { useFinanceContext } from 'financeContext'
import SortButtons from 'ui/elements/SortButtons'
import { sortWith, prop, ascend, descend, map, mergeRight } from 'ramda'
import { dataFields, sortDirections, views } from 'global-constants'

// eslint-disable-next-line
import { green, red } from 'logger'

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
    showOrigDescription: false,
    showOmitted: false
  })
  const [_sort, _setSort] = useState({
    fieldName: dataFields.description.name,
    direction: sortDirections.ascending
  })

  green('_sort', _sort)

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
  const _classes = useStyles()

  // Methods

  if (_viewData.length === 0) {
    return <h1>Loading</h1>
  }

  green('_sort', _sort)

  const getViewData = () => {
    const { fieldName, direction  } = _sort
    // green('getViewData: _sort', _sort)
    // green('getViewData: fieldName', fieldName)
    // green('getViewData: direction', direction)
    
    //---------------------------------------------------------------------------------
    // // TODO: This should be fixed elsewhere.
    // // TODO: Date is a string & therefore not sorting properly
    // // TODO: The problem likely originates in the server when importing

    // if (fieldName === 'date') {
    //   let ret
    //   const dateSortData = map(
    //     (x) => mergeRight(x, { date: Date.parse(x) })
    //     )(_viewData)
    //   green('dateSortData', dateSortData)
    //   if (direction === sortDirections.ascending) {
    //     ret = sortWith([ascend(prop(fieldName))])(dateSortData)
    //   }
    //   ret = sortWith([descend(prop(fieldName))])(dateSortData)
    //   green('ret', ret)
    //   return ret
    // }

    //---------------------------------------------------------------------------------
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

  return (
    <>
      <FormControlLabel
        control={
          <Switch
            checked={_switchState.showOrigDescription}
            onChange={_handleSwitchChange('showOrigDescription')}
            value="showOrigDesc"
          />
        }
        label="Show Original Description"
      />
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
                showOrigDescription={_switchState.showOrigDescription}
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
