import React, {useState} from 'react'
import { useConnections } from '../../context/connectionContext'
import { statusOptions, ownershipOptions, categoryOptions, reviewerCommentsOptions } from '../../Utils/options';
import { filterConnections } from '../../Utils/filterConnectionUtils';
import { calculatePagination } from '../../Utils/paginationUtils'; 
import ConnectionRows from '../ConnectionRows/ConnectionRows';
import PaginationControls from '../PaginationControls/PaginationControls';
import { reviewers } from '../../Utils/reviewers';
import './ConnectionList.css'

const ConnectionList = () => {
  const {connections, searchTerm, startDate, endDate,setConnections }= useConnections() //Retrieves values from the context
  const [currentPage, setCurrentPage] = useState(1); //Manages the current page number for pagination and Function to update currentPage
  const recordsPerPage = 50; //Sets the number of records per page
  const [editingConnection, setEditingConnection] = useState(null); //Holds the currently edited connection (initially null) & Function to update editingConnection
  const [error, setError] = useState('');
      
  const filteredConnections = filterConnections(connections, searchTerm, startDate, endDate);
  const { totalPages, indexOfFirstItem, indexOfLastItem } = calculatePagination(filteredConnections.length, recordsPerPage, currentPage);
  const currentRecords = filteredConnections.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (direction) => {
    setCurrentPage(prevPage => {
      const newPage = direction === 'next' ? prevPage + 1 : prevPage - 1;
      return Math.max(1, Math.min(newPage, totalPages));
    });
  };

    const handleEditClick = (con) => {
      setEditingConnection(con); //Sets the editingConnection state with the connection that the user wants to edit
      setError('');
    };

    const handleChange = (event) => {
      const { name, value } = event.target;
      if (name === 'Load_Applied (in KV)') {
        if (value > 200) {
          setError('Load Applied in KV cannot exceed 200 KV');
          return; // Prevent the change if validation fails
        }
        else {
          setError(''); // Clear error if the value is valid
        }
      }
      setEditingConnection(prev => ({
        ...prev,
        [name]: value
      }));
    };

    //Saves the edited connection back into the list of connections by updating the context with the modified record.
    const handleSave = () => {
      if (error) return;
      const updatedConnections = connections.map(con =>
        con.ID === editingConnection.ID ? editingConnection : con
      );
      setConnections(updatedConnections);
      setEditingConnection(null);
    };

    //Cancels the editing process by resetting the editingConnection state.
    const handleCancel = () => {
      setEditingConnection(null);
      setError('');
    };

  return (
    <div>
      <div className="table-container">
      <table>
        <thead>
            <tr>
                <th>Applicant ID</th>
                <th>Applicant Name</th>
                <th>Address</th>
                <th>Load Applied in KV</th>
                <th>Ownership</th>
                <th>Category</th>
                <th>Reviewer ID</th>  
                <th>Reviewer Name</th>   
                <th>Reviewer Comments</th>           
                <th>Date of Application</th>
                <th>Date of Approval</th>
                <th>Modified Date</th>
                <th>Govt ID Type</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>

        </thead>
        <tbody className='table-body'>
        {currentRecords.map(con => (
              <ConnectionRows
                key={con.ID}
                con={con}
                editingConnection={editingConnection}
                statusOptions={statusOptions}
                ownershipOptions={ownershipOptions}
                categoryOptions={categoryOptions}
                reviewerCommentsOptions={reviewerCommentsOptions}
                reviewers={reviewers}
                handleEditClick={handleEditClick}
                handleChange={handleChange}
                handleSave={handleSave}
                handleCancel={handleCancel}
              />
            ))}
        </tbody>
      </table>
            <PaginationControls 
             currentPage={currentPage}
             totalPages={totalPages}
             onPageChange={handlePageChange}
           />
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  )
}

export default ConnectionList
