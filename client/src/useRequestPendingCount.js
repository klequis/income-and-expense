import { useSelector } from 'react-redux'

const useRequestPendingCount = () => {
  const pendingCount = useSelector(state => state.pendingCount)
  return pendingCount
}

export default useRequestPendingCount