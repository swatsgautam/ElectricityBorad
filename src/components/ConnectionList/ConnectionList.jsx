import React, {useState} from 'react'
import { useConnections } from '../../context/connectionContext'
import { formatDateFromExcelSerial } from '../../Utils/DateUtils';
import { statusOptions, ownershipOptions, categoryOptions } from '../../Utils/options';
import { filterConnections } from '../../Utils/filterConnectionUtils';
import { calculatePagination, handlePageChange } from '../../Utils/paginationUtils'; 
import ConnectionRows from '../ConnectionRows/ConnectionRows';
import PaginationControls from '../PaginationControls/PaginationControls';
import './ConnectionList.css'

const ConnectionList = () => {
    const {connections, searchTerm, startDate, endDate,setConnections }= useConnections() //Retrieves values from the context
  const [currentPage, setCurrentPage] = useState(1); //Manages the current page number for pagination and Function to update currentPage
  const recordsPerPage = 50; //Sets the number of records per page
  const [editingConnection, setEditingConnection] = useState(null); //Holds the currently edited connection (initially null) & Function to update editingConnection

      
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
    };

    const handleChange = (event) => {
      const { name, value } = event.target;
      setEditingConnection(prev => ({
        ...prev,
        [name]: value
      }));
    };

    //Saves the edited connection back into the list of connections by updating the context with the modified record.
    const handleSave = () => {
      const updatedConnections = connections.map(con =>
        con.ID === editingConnection.ID ? editingConnection : con
      );
      setConnections(updatedConnections);
      setEditingConnection(null);
    };

    //Cancels the editing process by resetting the editingConnection state.
    const handleCancel = () => {
      setEditingConnection(null);
    };

  return (
    <div>
      <div className="table-container">
      <table className='content-table'>
        <thead>
            <tr>
                <th>Applicant ID</th>
                <th>Applicant Name</th>
                <th>Address</th>
                <th>Pincode</th>
                <th>Load Applied in KV</th>
                <th>Ownership</th>
                <th>Category</th>
                <th>Reviewer ID</th>
                <th>Status</th>
                <th>Date of Application</th>
                <th>Govt ID Type</th>
                <th>Actions</th>
            </tr>

        </thead>
        <tbody>
        {currentRecords.map(con => (
              <ConnectionRows
                key={con.ID}
                con={con}
                editingConnection={editingConnection}
                statusOptions={statusOptions}
                ownershipOptions={ownershipOptions}
                categoryOptions={categoryOptions}
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
    </div>
  )
}

export default ConnectionList
