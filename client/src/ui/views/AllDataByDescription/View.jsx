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
import * as R from 'ramda'
import InfiniteScroll from 'react-infinite-scroll-component'

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

const View = ({ data }) => {
  // Actions
  const {
    rulesReadRequest,
    viewReadRequest
    // currentViewNameSet
  } = useAppContext()

  // State
  const [_switchState, _setSwitchState] = useState({
    showOmitted: false
  })
  // eslint-disable-next-line
  const [_sort, _setSort] = useState({
    fieldName: dataFields.description.name,
    direction: sortDirections.ascending
  })
  const [_hasMore, _setHasMore] = useState(true)
  const [_visibleData, _setVisibleData] = useState(R.take(100, data))

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

  const getMore = () => {
    green('getMore')
    _setVisibleData(R.take(_visibleData.length + 100, data))
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
          <InfiniteScroll
            dataLength={data.length}
            next={getMore}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            endMessage={<p>All records displayed.</p>}
          >
            {_visibleData.map((doc) => {
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
          </InfiniteScroll>
        </tbody>
      </table>
    </>
  )
}

export default View
