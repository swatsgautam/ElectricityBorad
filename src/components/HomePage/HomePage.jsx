import React from 'react'

import {Link} from 'react-router-dom' 
import './HomePage.css'
import SearchBar from '../SearchBar/SearchBar'
import DateFilter from '../DateFilter/DateFilter'
import ConnectionList from '../ConnectionList/ConnectionList'

const HomePage = () => {
  return (
    <div className='container'>
      <h2>Connection List</h2>      
      <div className="controls-row">
        <div className="search-bar-container">
          <SearchBar />
        </div>
        <div className="date-filter-container">
          <DateFilter />
        </div>
      </div>
      {/* <div className='chart-div'>
        <Link to="/chart" className='view-chart'>
          View Connection Chart
        </Link>
      </div> */}
      <ConnectionList />
     
    </div>
  )
}

export default HomePage
