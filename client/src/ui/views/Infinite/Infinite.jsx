import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import * as R from 'ramda'

// eslint-disable-next-line
import { green, red, yellow, orange, logRender } from 'logger'

const style = {
  height: 30,
  border: '1px solid green',
  margin: 6,
  padding: 8
}

const Infinite = ({ data }) => {
  // green('Infinite: data.length', data.length)
  const [allData, setAllData] = useState([])
  const [items, setItems] = useState([])
  // const [items, setItems] = useState(R.take(100, allData))
  const [hasMore, setHasMore] = useState(true)
  
  green('items', items.length)
  
  // const data = useMemo(useSelector(state => state.viewData))
  
  // const data = useSelector(state => state.viewData)  
  
  useEffect(() => {
    // green('data', data)
    setAllData(data)
    setItems(R.take(100, data))
  }, [])

  
  const fetchMoreData = () => {
    if (items.length >= allData.length) {
      setHasMore(false)
      return
    }
    // setItems(items.concat(Array.from({ length: 20 })))
    setItems(R.take(items.length + 10, allData))
    
  }
  green('hi ************************8')  
  return (
    <div>
      <h1>demo: react-infinite-scroll-component</h1>
      <hr />
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {items.map((i, index) => {
          // green('i', i)
          return (<div style={style} key={index}>
            {i.description}
          </div>)
        })}
      </InfiniteScroll>
    </div>
  )
}

export default Infinite
