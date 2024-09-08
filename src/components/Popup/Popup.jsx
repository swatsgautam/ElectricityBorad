import React from 'react'
import { formatDateFromExcelSerial } from '../../Utils/DateUtils';
import './Popup.css';

const Popup = ({ connection, onClose }) => {
    if (!connection) return null; // Don't render anything if there's no connection
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="popup-close" onClick={onClose}>X</button>
        <h2>Connection Details</h2>
        <p><strong>Applicant ID:</strong> {connection.ID_Number}</p>
        <p><strong>Applicant Name:</strong> {connection.Applicant_Name}</p>
        <p><strong>State, District, Pincode:</strong> {`${connection.State}, ${connection.District}, ${connection.Pincode}`}</p>
        <p><strong>Load Applied (in KV):</strong> {connection['Load_Applied (in KV)']}</p>
        <p><strong>Ownership:</strong> {connection.Ownership}</p>
        <p><strong>Category:</strong> {connection.Category}</p>
        <p><strong>Reviewer ID:</strong> {connection.Reviewer_ID}</p>
        <p><strong>Reviewer Name:</strong> {connection.Reviewer_Name}</p>
        <p><strong>Reviewer Comments:</strong> {connection.Reviewer_Comments}</p>
        <p><strong>Date of Application:</strong> {formatDateFromExcelSerial(connection.Date_of_Application)}</p>
        <p><strong>Date of Approval:</strong>{connection.Date_of_Approval ? formatDateFromExcelSerial(connection.Date_of_Approval) : ''}</p>
        <p><strong>Modified Date:</strong> {formatDateFromExcelSerial(connection.Modified_Date)}</p>
        <p><strong>Govt ID Type:</strong> {connection.GovtID_Type}</p>
        <p><strong>Status:</strong> {connection.Status}</p>
      </div>
    </div>
  )
}

export default Popup
