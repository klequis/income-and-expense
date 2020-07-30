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
// import { usePageContext } from 'pageContext'
import { useAppContext } from 'appContext'
import isNilOrEmpty from 'lib/isNilOrEmpty'

// eslint-disable-next-line
import { green, red, yellow, orange, logRender } from 'logger'

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

const isCategorized = doc => {
  return (isNilOrEmpty(doc.category1) || doc.category1.toLowerCase() === 'none') ? false : true
}

const View = ({ data }) => {
  // const { init, next, previous, atStart, atEnd, rows, rowsPerPage, totalRows } = usePageContext()

  const {
    rulesReadRequest,
    viewReadRequest,
    // currentViewNameSet
  } = useAppContext()


  const [_switchState, _setSwitchState] = useState({
    showOmitted: false,
    uncategorizedOnly: true,
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

  return (
    <>
      {logRender('View')}
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
        <FormControlLabel
          control={
            <Switch
              checked={_switchState.uncategorizedOnly}
              onChange={_handleSwitchChange('uncategorizedOnly')}
              value="uncategorizedOnly"
            />
          }
          label="Uncategorized Only"
        />
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
          {data.map((doc) => {
            const { _id, omit } = doc
            if (_switchState.showOmitted === false && omit) {
              return null
            }
            if (_switchState.uncategorizedOnly && isCategorized(doc)) {
              return null
            }
            return (
              <TR
                key={_id}
                doc={doc}
                // showOmitted={_switchState.showOmitted}
                updateRulesAndView={_updateRulesAndView}
                // view={views.allDataByDescription}
              />
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default View