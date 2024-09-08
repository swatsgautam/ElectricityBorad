import React, { useState } from 'react'
import { useConnections } from '../../context/connectionContext'
import './SearchBar.css';

const SearchBar = () => {
    const { setSearchTerm } = useConnections(); // Assuming search term state management is done in context
    const [input, setInput] = useState('');

    const handleChange = (event) => {
        setInput(event.target.value);
        setSearchTerm(event.target.value); // Update the search term in context
    };

  return (
    <div className="search-bar">
      <input
                type="text"
                placeholder="Search by Applicant ID"
                value={input}
                onChange={handleChange}
                className="search-input"
            />
    </div>
  )
}

export default SearchBar
