// import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'


const useGetRuleTmp = () => {
  return useSelector(state => state.ruleTmp)
}

export default useGetRuleTmp