
import { formatDateFromExcelSerial } from './DateUtils'; // Assuming dateUtils.js contains the date conversion function

export const filterConnections = (connections, searchTerm, startDate, endDate) => {
  return connections.filter(con => {
    const dateOfApplication = formatDateFromExcelSerial(con.Date_of_Application);
    const isWithinDateRange = (!startDate || new Date(dateOfApplication) >= new Date(startDate)) &&
                              (!endDate || new Date(dateOfApplication) <= new Date(endDate));
    const matchesSearchTerm = con.ID_Number.toString().includes(searchTerm);
    return isWithinDateRange && matchesSearchTerm;
  });
};
