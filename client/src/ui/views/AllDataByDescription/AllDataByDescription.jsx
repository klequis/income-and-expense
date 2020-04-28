import React, { useCallback, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import TR from './TR'
import { useFinanceContext } from 'financeContext'
import SortButtons from 'ui/elements/SortButtons'
import {
  dataFields,
  sortDirections,
  views,
  duplicateStatus
} from 'global-constants'
import { usePageContext } from 'pageContext'

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

const AllDataByDescription = () => {
  // Actions
  const {
    rulesReadRequest,
    viewReadRequest,
    currentViewNameSet
  } = useFinanceContext()

  const { init, next, previous } = usePageContext()

  // State

  const [_switchState, _setSwitchState] = useState({
    // showOrigDescription: false,
    showOmitted: false
  })
  const [_sort, _setSort] = useState({
    fieldName: dataFields.description.name,
    direction: sortDirections.ascending
  })

  const _updateRulesAndView = useCallback(async () => {
    await rulesReadRequest()
    await viewReadRequest(views.allDataByDescription)
  }, [rulesReadRequest, viewReadRequest])

  const [_data, _setData] = useState([])

  // Effects

  useEffect(() => {
    ;(async () => {
      await _updateRulesAndView()
      currentViewNameSet(views.allDataByDescription)
    })()
  }, [currentViewNameSet, _updateRulesAndView])


  useEffect(() => {
    const viewData = init(2, 'description', 'ascending')
    yellow('viewData', viewData)
    _setData(viewData)
  },[])
  // Local vars
  // const _viewData = useSelector((state) => state.viewData)
  // const v1 = useSelector((state) => state.viewData)
  // const _viewData = usePager({
  //   numRowsPerPage: 2,
  //   next: false,
  //   previous: false,
  //   sortField: 'description',
  //   sortDirection: 'ascending'
  // })

  

  const _classes = useStyles()
  

  // Methods

  if (_data.length === 0) {
    return <h1>Getting data</h1>
  }

  

  // const getViewData = () => {
  //   const { fieldName, direction } = _sort
  //   if (direction === sortDirections.ascending) {

  //     return sortWith([ascend(prop(fieldName))])(_viewData)
  //   }
  //   return sortWith([descend(prop(fieldName))])(_viewData)
  // }

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
        <button onClick={_previousClick}>Previous</button>
        <button onClick={_nextClick}>Next</button>
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

export default AllDataByDescription
