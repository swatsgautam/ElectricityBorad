import React, {useState}from 'react'
import { useConnections } from '../../context/connectionContext';
import './DateFilter.css'

const DateFilter = () => {
    const { setStartDate, setEndDate } = useConnections();
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    const handleStartChange = (event) => {
        setStart(event.target.value);
    };

    const handleEndChange = (event) => {
        setEnd(event.target.value);
    };

    const handleApplyFilter = () => {
        setStartDate(start);
        setEndDate(end);
    };
  return (
    <div className="date-filter">
      <input
                type="date"
                value={start}
                onChange={handleStartChange}
                placeholder="Start Date"
                className="date-input"
            />
            <input
                type="date"
                value={end}
                onChange={handleEndChange}
                placeholder="End Date"
                className="date-input"
            />
            <button onClick={handleApplyFilter} className="filter-button">Search</button>
    </div>
  )
}

export default DateFilter
