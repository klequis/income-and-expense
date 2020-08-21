import React, { useEffect, useCallback, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import Paper from '@material-ui/core/Paper'
import shortid from 'shortid'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import Rule from 'ui/Rule'
import { isNil, append } from 'ramda'

// eslint-disable-next-line
import { green, blue, red } from 'logger'

const useStyles = makeStyles({
  paper: {
    padding: 8
  },
  modifiedValue: {
    marginBottom: 4
  },
  rulesTitle: {
    fontWeight: 'bold',
    fontSize: '1.2em',
    paddingTop: 8,
    paddingBottom: 4
  },
  rulesTitleWrapper: {
    display: 'flex',
    alignItems: 'center'
  }
})

const groupOrigValues = array => {
  const grouped = array.reduce((acc, str) => {
    const key = str
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(str)
    return acc
  }, {})
  return Object.keys(grouped).map(key => {
    return <div key={grouped[key]}>{`${key} (${grouped[key].length})`}</div>
  })
}

const Page = ({ page, allRules }) => {
  const [id, setId] = useState()
  const [_orig, _setOrig] = useState([])
  const [_category1, _setCategory1] = useState([])
  const [_category2, _setCategory2] = useState([])
  const [_ruleIds, _setRuleIds] = useState([])

  const getRule = ruleId => {
    const r = allRules.find(r => r._id === ruleId)
    if (isNil(r)) {
      red('Page.getRule ERROR', `rule ${ruleId} not found`)
      return []
    }
    return r
  }

  useEffect(() => {
    const { _id, orig, category1, category2, ruleIds } = page
    setId(_id)
    _setOrig(orig)
    _setCategory1(category1)
    _setCategory2(category2)
    _setRuleIds(ruleIds)
    // const fullRules = rules.map(ruleId => getRule(ruleId))
    // _setRules(fullRules)
  }, [page])

  const classes = useStyles()

  // const handleNewRuleClick = async () => {
  //   _setRules(
  //     append({
  //       _id: 'newRule',
  //       criteria: [],
  //       actions: []
  //     })
  //   )
  // }

  return (
    <Paper className={classes.paper}>
      <div className={classes.modifiedValue}>
        <b>Modified value</b>
        <div>{id}</div>
        {_category1.map(c => (
          <div key={shortid.generate()}>{c}</div>
        ))}
        {_category2.map(c => (
          <div key={shortid.generate()}>{c}</div>
        ))}
      </div>
      <b>Original value(s)</b>
      <div>{groupOrigValues(_orig)}</div>
      <div>
        <div className={classes.rulesTitleWrapper}>
          <div className={classes.rulesTitle}>Rules</div>
          <IconButton /*onClick={handleNewRuleClick}*/>
            <AddIcon />
          </IconButton>
        </div>

        {_ruleIds.map(ruleId => {
          return <Rule key={ruleId} rule={getRule(ruleId)} />
        })}
      </div>
    </Paper>
  )
}

export default Page
