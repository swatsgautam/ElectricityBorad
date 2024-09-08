import React from 'react'
import { formatDateFromExcelSerial } from '../../Utils/DateUtils';
import { getStatusClassName } from '../../Utils/StatusUtils';
import './ConnectionRows.css'

const ConnectionRows = ({ con, editingConnection, statusOptions, ownershipOptions, categoryOptions, handleEditClick, handleChange, handleSave, handleCancel }) => {
    return (
        <tr key={con.ID}>
        <td>{con.ID_Number}</td>
        <td>
          {editingConnection && editingConnection.ID === con.ID ? (
            <input
              type="text"
              name="Applicant_Name"
              value={editingConnection.Applicant_Name}
              onChange={handleChange}
              className="edit-form-input"
            />
          ) : (
            con.Applicant_Name
          )}
        </td>
        <td>
          {editingConnection && editingConnection.ID === con.ID ? (
            <input
              type="text"
              name="Pincode"
              value={editingConnection.State}
              onChange={handleChange}
              className="edit-form-input"
            />
          ) : (
            con.State
          )}
        </td>
        <td>
          {editingConnection && editingConnection.ID === con.ID ? (
            <input
              type="text"
              name="Pincode"
              value={editingConnection.Pincode}
              onChange={handleChange}
              className="edit-form-input"
            />
          ) : (
            con.Pincode
          )}
        </td>
        <td>
          {editingConnection && editingConnection.ID === con.ID ? (
            <input
              type="text"
              name="Load_Applied"
              value={editingConnection['Load_Applied (in KV)']}
              onChange={handleChange}
              className="edit-form-input"
            />
          ) : (
            con['Load_Applied (in KV)']
          )}
        </td>
        <td>
          {editingConnection && editingConnection.ID === con.ID ? (
            <select
              name="Ownership"
              value={editingConnection.Ownership}
              onChange={handleChange}
              className="edit-form-input"
            >
              {ownershipOptions.map(owner => (
                <option key={owner} value={owner}>
                  {owner}
                </option>
              ))}
            </select>
          ) : (
            con.Ownership
          )}
        </td>
        <td>
          {editingConnection && editingConnection.ID === con.ID ? (
            <select
              name="Category"
              value={editingConnection.Category}
              onChange={handleChange}
              className="edit-form-input"
            >
              {categoryOptions.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          ) : (
            con.Category
          )}
        </td>
        <td>{con.Reviewer_ID}</td>
        <td>
          <span className={`status-pill ${getStatusClassName(con.Status)}`}>
            {editingConnection && editingConnection.ID === con.ID ? (
              <select
                name="Status"
                value={editingConnection.Status}
                onChange={handleChange}
                className="edit-form-input"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            ) : (
              con.Status
            )}
          </span>
        </td>
        <td>{formatDateFromExcelSerial(con.Date_of_Application)}</td>
        <td>{con.GovtID_Type}</td>
        <td className="action-btn">
          {editingConnection && editingConnection.ID === con.ID ? (
            <>
              <button className="btn-save" onClick={handleSave}>Save</button>
              <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <button className="btn-edit" onClick={() => handleEditClick(con)}>Edit</button>
          )}
        </td>
      </tr>
    
  )
}

export default ConnectionRows
