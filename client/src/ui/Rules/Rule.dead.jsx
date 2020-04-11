import React, { useState, useEffect } from 'react'
import RuleView from './RuleView'

import { makeStyles } from '@material-ui/styles'

// eslint-disable-next-line
import { green, red } from 'logger'

const useStyles = makeStyles({
  rule: {
    display: 'flex',
    alignItems: 'flex-end',
    width: '100%'
  },
})

const Rule = ({
  ruleId,
  rule,
}) => {


  const _classes = useStyles()


  

  return (
    <div key={ruleId} className={_classes.rule}>
      <RuleView ruleId={ruleId} rule={rule} />
    </div>
  )
}


export default Rule

