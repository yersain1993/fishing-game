import { useState, useEffect } from "react";

export const usePagination = (itemList, itemQuantityPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isNext, setIsNext] = useState(false);
  const [isPrevious, setIsPrevious] = useState(false);

  const totalPages = Math.ceil(itemList.length / itemQuantityPerPage);

  const lowerLimit = (currentPage - 1) * itemQuantityPerPage;
  const upperLimit = currentPage * itemQuantityPerPage - 1;

  const listSlice = itemList.slice(lowerLimit, upperLimit + 1);

  const nextPage = () => {
    const newPage = currentPage + 1;
    isPrevious && setIsPrevious(!isPrevious);
    setIsNext(true);
    if (newPage <= totalPages) setCurrentPage(newPage);

  };

  const previousPage = () => {
    isNext && setIsNext(!isNext);
    setIsPrevious(true);
    const newPage = currentPage - 1;
    if (newPage >= 1) setCurrentPage(newPage);
  };

  const changePageTo = (newPage) => {
    if (newPage < 1) setCurrentPage(1);
    else if (newPage > totalPages) setCurrentPage(totalPages);
    else setCurrentPage(newPage);
  };

  const pages = Array(totalPages)
    .fill()
    .map((_, i) => i + 1);

  useEffect(() => {
    changePageTo(currentPage);
  }, [itemList, itemQuantityPerPage]);

  return {
    currentPage,
    listSlice,
    pages,
    isNext,
    isPrevious,
    nextPage,
    previousPage,
    changePageTo,
  };
};