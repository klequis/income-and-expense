import React from 'react'
import { makeStyles } from '@material-ui/styles'
import iSortAscending from './sortAscending.svg'
import iSortDescending from './sortDescending.svg'
import { sortDirections } from 'global-constants'

// eslint-disable-next-line
import { green, red } from 'logger'

const buttonHeight = 10

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexFlow: 'column nowrap',
    width: 15
  },
  icon: {
    height: buttonHeight,
    width: buttonHeight,
    userSelect: 'none'
  },
  button: {
    backgroundColor: 'transparent',
    border: 'none',
    padding: 0,
    height: buttonHeight,
    width: buttonHeight,
    userSelect: 'none',
    cursor: 'pointer'
  }
})

export const SortButtons = ({ fieldName, updateSort }) => {

  const _classes = useStyles()

  const _sortAscending = () => {
    
    updateSort(fieldName, sortDirections.ascending)
  }

  const _sortDescending = () => {
    updateSort(fieldName, sortDirections.descending)
  }

  return (
    <span className={_classes.wrapper}>
      <button className={_classes.button} onClick={_sortAscending}>
        <img
          src={iSortAscending}
          alt="sort ascending"
          className={_classes.icon}
        />
      </button>
      <button className={_classes.button} onClick={_sortDescending}>
        <img
          src={iSortDescending}
          alt="sort descinding"
          className={_classes.icon}
        />
      </button>
    </span>
  )
}

export default SortButtons

/* MUI version

export const SortButtons = () => {
  const _classes = useStyles()
  return (
    <div className={_classes.wrapper}>
      <IconButton>
        <img src={iSortAscending} alt='sort ascending'  className={_classes.icon} />
      </IconButton>
      <IconButton>
      <img src={iSortDescending} alt='sort descinding'  className={_classes.icon}/>
      </IconButton>
    </div>
  )
}

*/
