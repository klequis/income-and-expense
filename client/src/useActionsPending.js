import { useSelector } from 'react-redux'
import * as R from 'ramda'
import { red } from 'logger'

const useActionsPending = () => {

  const actionsPending = useSelector((state) => state.actionsPending)

  const actionsPendingCount = actionsPending.length

  const actionIsPending = (key) => {
    const ret = R.includes(key, actionsPending)
    red('useActionsPending: key', key)
    red('useActionsPending: actionsPendingCount', actionsPendingCount)
    red('useActionsPending: actionsPending', actionsPending)
    red('useActionsPending: ret', ret)
    return 
  }

  return {
    actionsPendingCount,
    actionIsPending
  }
}

export default useActionsPending
