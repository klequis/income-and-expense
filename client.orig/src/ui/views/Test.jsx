import React, { useEffect } from 'react'

const Test = ({ updateRulesAndView }) => {

  useEffect(() => {
    ;(async () => {
      await updateRulesAndView('all-data-by-description')
    })()
    // eslint-disable-next-line
  }, [])


  return (
    <>
      <div>
        test{' '}
        {typeof test === 'function' ? 'is a function' : 'is NOT a function'}
      </div>
      <div>
        updateRulesAndView{' '}
        {typeof updateRulesAndView === 'function'
          ? 'is a function'
          : 'is NOT a function'}
      </div>
      <div>updateRulesAndView is a {typeof updateRulesAndView}</div>
    </>
  )
}

export default Test
