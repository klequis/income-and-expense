import React from 'react'
import { makeStyles } from '@material-ui/styles'

// eslint-disable-next-line
import { green, redf } from 'logger'
import { actionTypes } from 'global-constants'

const useStyles = makeStyles({
  editModeWrapper: {
    padding: '4px 8px',
    display: 'flex',
    alignItems: 'flex-end'
  },
  notEditModeWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  notEditModeField: {
    marginRight: 20
  },
  viewModeField: {
    marginRight: 20
  }
})

const ActionView = ({ action: Action }) => {
  const {
    action,
    field,
    findValue,
    numAdditionalChars,
    replaceWithValue,
    category1,
    category2
  } = Action

  const _classes = useStyles()

  if (action === actionTypes.strip) {
    return (
      <div>
        <span className={_classes.viewModeField}>{action}</span>
        <span className={_classes.viewModeField}>{field}</span>
        <span className={_classes.viewModeField}>{findValue}</span>
        <span className={_classes.viewModeField}>{numAdditionalChars}</span>
      </div>
    )
  }
  if (action === actionTypes.replaceAll) {
    return (
      <div>
        <span className={_classes.viewModeField}>{action}</span>
        <span className={_classes.viewModeField}>{field}</span>
        <span className={_classes.viewModeField}>{replaceWithValue}</span>
      </div>
    )
  }
  if (action === actionTypes.categorize) {
    return (
      <div>
        <span className={_classes.viewModeField}>{action}</span>
        <span className={_classes.viewModeField}>{category1}</span>
        <span className={_classes.viewModeField}>{category2}</span>
      </div>
    )
  }
  if (action === actionTypes.omit) {
    return (
      <div>
        <span className={_classes.viewModeField}>{action}</span>
      </div>
    )
  }
}

export default ActionView
