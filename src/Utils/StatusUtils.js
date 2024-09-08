export const getStatusClassName = (status) => {
    switch (status) {
        case 'Approved':
            return 'status-approved';
        case 'Pending':
            return 'status-pending';
        case 'Rejected':
            return 'status-rejected';
        case 'Connection Released':
            return 'status-released';
        default:
            return '';
    }
};