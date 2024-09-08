
export const calculatePagination = (totalItems, itemsPerPage, currentPage) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
    return {
      totalPages,
      indexOfFirstItem,
      indexOfLastItem,
      currentPage
    };
  };
  
  export const handlePageChange = (currentPage, setCurrentPage, totalPages, direction) => {
    const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  