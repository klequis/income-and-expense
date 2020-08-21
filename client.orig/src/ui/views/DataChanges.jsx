import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'


import { connect } from 'react-redux'
import { compose } from 'recompose'
import { dataChangesReadRequest } from 'store/views/actions'
import { ruleCreateRequestAction, rulesReadRequestAction, ruleNew } from 'store/rules/actions'

import { getRules } from 'store/rules/selectors'
import { getDataChanges } from 'store/views/selectors'


import Page from './Page'

// eslint-disable-next-line
import { green, blue, red } from 'logger'

const useStyles = makeStyles({
  
  pageCount: {
    marginBottom: 8
  },
  actions: {
    marginBottom: 8
  },
  actionButton: {
    marginRight: 8
  }
})

const DataChanges = ({
  data,
  allRules,
  dataChangesReadRequest,
  rulesReadRequest,
  ruleCreateRequest
}) => {
  const [pageIdx, setPageIdx] = useState(0)
  const [gotoIdx, setGotoIdx] = useState(0)
  const [loading, setLoading] = useState(true)
  
  const classes = useStyles()

  useEffect(() => {
    ;(async () => {
      try {
        await dataChangesReadRequest('data-changes')
        await rulesReadRequest()
        setLoading(false)
      } catch (e) {
        console.log('TheError', e)
      }
    })()
  }, [dataChangesReadRequest, rulesReadRequest])

  const handlePageGotoChange = (e, action) => {
    const { value } = e.target
    const currPageIdx = Number(pageIdx)

    if (action === 'incrementPage') {
      const newIdx = currPageIdx + 1
      setPageIdx(newIdx)
      setGotoIdx(newIdx)
    }
    if (action === 'decrementPage') {
      const newIdx = currPageIdx - 1
      setPageIdx(newIdx)
      setGotoIdx(newIdx)
    }
    if (action === 'goto') {
      setGotoIdx(value)
      if (value !== '') {
        setPageIdx(Number(value))
      }
    }
  }

  

  if (loading) return <h1>Loading</h1>

  return (
    <div>
      <div className={classes.pageCount}>
        page {pageIdx} of {data.length}
      </div>
      <div className={classes.actions}>
        <Button
          className={classes.actionButton}
          name="decrementPage"
          id="decrementPage"
          onClick={(e) => handlePageGotoChange(e, 'decrementPage')}
          size="small"
          variant="outlined"
        >
          Previous
        </Button>
        <Button
          name="incrementPage"
          id="incrementPage"
          onClick={(e) => handlePageGotoChange(e, 'incrementPage')}
          size="small"
          variant="outlined"
        >
          Next
        </Button>
        <div>
          <input
            type="text"
            name="goto"
            value={gotoIdx}
            onChange={(e) => handlePageGotoChange(e, 'goto')}
          />
        </div>
      </div>
      <Page page={data[pageIdx]} allRules={allRules} />
      {/* <Paper className={classes.paper}>
        <div className={classes.modifiedValue}>
          <b>Modified value</b>
          <div>{data[pageIdx]._id}</div>
          {data[pageIdx].category1.map(c => (
            <div key={shortid.generate()}>{c}</div>
          ))}
          {data[pageIdx].category2.map(c => (
            <div key={shortid.generate()}>{c}</div>
          ))}
        </div>
        <b>Original value(s)</b>
        <div>{groupOrigValues(data[pageIdx].orig)}</div>
        <div>
          <div className={classes.rulesTitleWrapper}>
            <div className={classes.rulesTitle}>Rules</div>
            <IconButton onClick={handleNewRuleClick}><AddIcon /></IconButton>
          </div>
          
          
          {data[pageIdx].rules.map(ruleId => {
            return ruleId === 'newRule'
              ? <Rule key={shortid.generate()} rule={newRule} />
              : <Rule key={shortid.generate()} rule={getRule(ruleId)} />
          })}
        </div>
      </Paper> */}
    </div>
  )
}

const actions = {
  dataChangesReadRequest,
  ruleCreateRequest,
  rulesReadRequest
}

const mapStateToProps = state => {
  return {
    data: getDataChanges(state),
    allRules: getRules(state)
  }
}

export default compose(connect(mapStateToProps, actions))(DataChanges)
