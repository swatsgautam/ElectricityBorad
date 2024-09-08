export const formatDateFromExcelSerial = (serialDate) => {
    const baseDate = new Date(1900, 0, 1);
    const adjustedDate = new Date(baseDate.getTime() + (serialDate - 2) * 86400000);
    const day = String(adjustedDate.getDate()).padStart(2, '0');
    const month = String(adjustedDate.getMonth() + 1).padStart(2, '0');
    const year = adjustedDate.getFullYear();
    return `${day}/${month}/${year}`;
  };