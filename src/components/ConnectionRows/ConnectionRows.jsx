import React from 'react'
import { formatDateFromExcelSerial } from '../../Utils/DateUtils';
import { getStatusClassName } from '../../Utils/StatusUtils';
import {getStateDistrictPincodeValue, handleCombinedInputChange, handleReviewerChange} from '../../Utils/connectionUtils'
import './ConnectionRows.css'

const ConnectionRows = ({ con, editingConnection,reviewers, statusOptions,reviewerCommentsOptions, ownershipOptions, categoryOptions, handleEditClick, handleChange, handleSave, handleCancel }) => {
  
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
            )
          }
        </td>
        <td>
          {editingConnection && editingConnection.ID === con.ID ? (
              <input
              type="text"
              name="StateDistrictPincode"
              value={getStateDistrictPincodeValue(editingConnection)}
              onChange={(event) => handleCombinedInputChange(event, handleChange)}
              className="edit-form-input"
              placeholder="State, District, Pincode"
            />
            ) : (
              `${con.District},${con.State}, ${con.Pincode}`
            )
          }
        </td>        
        <td>
          {editingConnection && editingConnection.ID === con.ID ? (
            <input
              type="number"
              name="Load_Applied (in KV)"
              value={editingConnection['Load_Applied (in KV)']}
              onChange={handleChange}
              className="edit-form-input"
            />
            ) : (
              con['Load_Applied (in KV)']
            )
          }
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
            )
          }
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
            )
          }
        </td>
        <td>
          {editingConnection && editingConnection.ID === con.ID ? (
            <select
              name="Reviewer_ID"
              value={editingConnection.Reviewer_ID}
              onChange={(event) => handleReviewerChange(event, reviewers, handleChange)}
              className="edit-form-input"
            >
              {reviewers.map(reviewer => (
                <option key={reviewer.ID} value={reviewer.ID}>
                  {reviewer.ID}
                </option>
              ))}
            </select>
            ) : (
              con.Reviewer_ID
            )
          }
        </td>
        <td>
          {editingConnection && editingConnection.ID === con.ID ? (
            <select
              name="Reviewer_Name"
              value={editingConnection.Reviewer_Name}
              onChange={(event) => handleReviewerChange(event, reviewers, handleChange)}
              className="edit-form-input"
            >
              {reviewers.map(reviewer => (
                <option key={reviewer.Name} value={reviewer.Name}>
                  {reviewer.Name}
                </option>
              ))}
            </select>
            ) : (
              con.Reviewer_Name
            )
          }
        </td>
        <td>
          {editingConnection && editingConnection.ID === con.ID ? (
            <select
              name="Reviewer_Comments"
              value={editingConnection.Reviewer_Comments}
              onChange={handleChange}
              className="edit-form-input"
            >
              {reviewerCommentsOptions.map(comments => (
                <option key={comments} value={comments}>
                  {comments}
                </option>
              ))}
            </select>
            ) : (
              con.Reviewer_Comments
            )
          }
        </td>
        <td>{formatDateFromExcelSerial(con.Date_of_Application)}</td>
        <td>{formatDateFromExcelSerial(con.Date_of_Approval)}</td>
        <td>{formatDateFromExcelSerial(con.Modified_Date)}</td>        
        <td>{con.GovtID_Type}</td>
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
              )
            }
          </span>
        </td>
        <td className="action-btn">
          {editingConnection && editingConnection.ID === con.ID ? (
            <>
              <button className="btn-save" onClick={handleSave}>Save</button>
              <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
            </>
            ) : (
              <button className="btn-edit" onClick={() => handleEditClick(con)}>Edit</button>
            )
          }
        </td>
      </tr>
    
  )
}

export default ConnectionRows
