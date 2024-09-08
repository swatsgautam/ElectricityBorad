// Function to combine state, district, and pincode into a single string
export const getStateDistrictPincodeValue = (editingConnection) => {
    return `${editingConnection.State || ''}, ${editingConnection.District || ''}, ${editingConnection.Pincode || ''}`;
};

// Handle changes in state, district, and pincode input
export const handleCombinedInputChange = (event, handleChange) => {
    const value = event.target.value;
    // Split the input by commas, trim spaces, and filter out empty strings
    const parts = value.split(',').map(part => part.trim()).filter(part => part !== '');

    // Set default values if parts are less than 3
    const [state = '', district = '', pincode = ''] = parts;

    // Call handleChange for each field
    handleChange({ target: { name: 'State', value: state } });
    handleChange({ target: { name: 'District', value: district } });
    handleChange({ target: { name: 'Pincode', value: pincode } });
};

// Handle changes for Reviewer ID and Reviewer Name
export const handleReviewerChange = (event, reviewers, handleChange) => {
    const { name, value } = event.target;

    // Update the selected field (either Reviewer_ID or Reviewer_Name)
    handleChange({ target: { name, value } });

    if (name === 'Reviewer_ID') {
        const selectedReviewer = reviewers.find(reviewer => String(reviewer.ID) === String(value));

        if (selectedReviewer) {
            handleChange({ target: { name: 'Reviewer_Name', value: selectedReviewer.Name } });
        }
    } else if (name === 'Reviewer_Name') {
        const selectedReviewer = reviewers.find(reviewer => reviewer.Name === value);
        if (selectedReviewer) {
            handleChange({ target: { name: 'Reviewer_ID', value: selectedReviewer.ID } });
        }
    }
};
