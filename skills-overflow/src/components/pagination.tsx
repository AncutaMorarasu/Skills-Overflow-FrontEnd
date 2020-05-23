import React, { useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import { useHistory } from "react-router-dom";

function DownPagination(props: any) {

  const { pageNo, total, handleSelect } = props;
  const history = useHistory();

  const [pageNumbers, setPageNumber] = useState<number[]>([]);

  // Logic for displaying page numbers - https://stackoverflow.com/questions/40232847/how-to-implement-pagination-in-reactjs
  useEffect(() => {
    //handleFlag(), doar in cazul in care faceam smecheria cu parintele

    console.log("the PAGE NUMBER inside useEffect which is also passed to the method is " + pageNo);
    console.log("the TOTAL number of posts inside useEffect which is also passed to the method is " + total);

    let p = calculatePageNos();
    setPageNumber(p);
  }, [total || pageNo]);

  const calculatePageNos = () => {
    let pageNumbers: number[] = [];
    let maxPage = Math.ceil(total / 10);

    let parsedNo = parseInt(pageNo);

    //initial e -1, ca vreau ca atunci cand e 0 sa se redirecteze fix unde vreau eu
    if (total < 0) return pageNumbers;
    // if (total == 0)
    // {
    //   history.replace({
    //     pathname: '/no-posts'
    //   })
    //   return pageNumbers; // nu a gasit pagina; aici il pot retrimite pe o pagina de postari
    // } 
    if (total < 10) { pageNumbers.push(0); return pageNumbers; }

    if (maxPage > 4) {
      let lastPage = (parsedNo === 0 || parsedNo === 1) ? 2 : Math.min(parsedNo + 1, maxPage);
      let firstPage = (parsedNo === maxPage || parsedNo === maxPage - 1) ? maxPage - 2 : Math.max(parsedNo - 1, 0);
      for (let i = firstPage; i <= lastPage; i++) { pageNumbers.push(i); }
    }
    if (maxPage <= 4) {
      for (let i = 0; i < maxPage; i++) {
        pageNumbers.push(i);
      }
    }
    console.log("this is when I return pageNumbers: " + pageNumbers)
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