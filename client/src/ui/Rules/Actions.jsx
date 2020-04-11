import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Action from './Action'
import shortid from 'shortid'
// eslint-disable-next-line
import { green, red } from 'logger'

const Actions = ({ actions, editMode }) => {
  return actions.map(a => <Action key={shortid.generate()} action={a} editMode={editMode} />)
}

export default Actions