import React, { useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";

function DownPagination(props: any) {

  const { pageNo, total, handleSelect } = props;

  const [pageNumbers, setPageNumber] = useState<number[]>([]);

  // Logic for displaying page numbers - https://stackoverflow.com/questions/40232847/how-to-implement-pagination-in-reactjs
  useEffect(() => {
    //handleFlag(), doar in cazul in care faceam smecheria cu parintele

    let numberOfPages = calculatePageNos();
    setPageNumber(numberOfPages);
  }, [pageNumbers[0]]);

  const calculatePageNos = () => {
    let pageNumbers: number[] = [];
    let maxPage = Math.ceil(total / 10) + 1;

    let parsedNo = parseInt(pageNo);

    if (maxPage > 4) {
      let lastPage = (parsedNo === 0 || parsedNo === 1) ? 2 : Math.min(parsedNo + 1, maxPage);
      console.log("this is the last page", Math.min(parsedNo + 1, maxPage))
      console.log("this is pageno+1", parsedNo + 1)
      let firstPage = (parsedNo === maxPage || parsedNo === maxPage - 1) ? maxPage - 2 : Math.max(parsedNo - 1, 0);
      for (let i = firstPage; i <= lastPage; i++) { pageNumbers.push(i); }
    }
    if (maxPage <= 4) {
      for (let i = 0; i <= maxPage; i++) { pageNumbers.push(i); }
    }
    console.log('this is the number of pages: ' + pageNumbers)
    console.log('this is the max number of pages: ' + maxPage)
    return pageNumbers;
  }

  //am schimbat de la pageNumberz, pe care o primea de la parinte
  const renderPageNumberss = pageNumbers.map((number: number) => {
    return (
      <Pagination.Item key={number} onClick={handleSelect} active={number === pageNo}>
        {/* div div div div div div div div div div div div   */}
        {number + 1}
      </Pagination.Item>
    );
  }
  );

  return (
    <div>
      <Pagination>
        {renderPageNumberss}
      </Pagination>
    </div>
  )
}

export default DownPagination;