import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import TD from './TD'
import { format } from 'date-fns'
import Rules from 'ui/Rules'
import isNilOrEmpty from 'lib/isNilOrEmpty'
import { useFinanceContext } from 'financeContext'

// eslint-disable-next-line
import { green, red } from 'logger'

const useStyles = makeStyles({
  tr: {
    backgroundColor: '#3a3a3a',
    width: '100%'
  },
  origDescriptionShow: props => ({
    display: props.showOrigDescription ? 'block' : 'none',
    color: 'rgb(175, 175, 175)'
  })
})

const TR = ({ doc, showOrigDescription, updateRulesAndView }) => {
  // actions

  const { rowIdShowSet } = useFinanceContext()

  // local vars

  const {
    _id,
    acctId,
    category1,
    category2,
    credit,
    date,
    debit,
    description,
    omit,
    origDescription,
    ruleIds,
    type
  } = doc

  const rowIdShow = useSelector(state => state.ui.rowIdShow)
  const _classes = useStyles({ showOrigDescription: showOrigDescription })

  // methods

  const _handleRowClick = () => {
    rowIdShowSet(_id)
  }

  // render

  return (
    <>
      <tr className={_classes.tr} onClick={_handleRowClick}>
        <TD align="left">{format(new Date(date), 'MM/dd/yyyy')}</TD>
        <TD align="right">{acctId}</TD>
        <TD align="left">
          <div>{description}</div>
          <div className={_classes.origDescriptionShow}>{origDescription}</div>
        </TD>
        <TD align="right">{credit}</TD>
        <TD align="right">{debit}</TD>
        <TD align="right">{category1}</TD>
        <TD align="right">{category2}</TD>
        <TD align="right">{type}</TD>
        <TD align="right">{omit ? 'yes' : ''}</TD>
        <TD align="center">
          {isNilOrEmpty(ruleIds)
            ? null
            : ruleIds.map(id => <div key={id}>{id}</div>)}
        </TD>
      </tr>
      {_id === rowIdShow ? (
        <Rules
          docId={_id}
          ruleIds={ruleIds}
          updateRulesAndView={updateRulesAndView}
        />
      ) : null}
    </>
  )
}

export default TR

TR.propTypes = {
  doc: PropTypes.object.isRequired,
  showOrigDescription: PropTypes.bool.isRequired,
  view: PropTypes.string.isRequired
}
