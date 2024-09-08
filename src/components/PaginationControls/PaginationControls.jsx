import React from 'react'
import './PaginationControls.css'

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination">
      <button
        className="button"
        onClick={() => onPageChange('previous')}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button
        className="button"
        onClick={() => onPageChange('next')}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  )
}

export default PaginationControls
