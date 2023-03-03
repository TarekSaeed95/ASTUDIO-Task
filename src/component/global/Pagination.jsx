function Pagination({ data }) {
  const { pages, setCurrentPage, currentPage } = data;
  let dummyArr;
  let pagesBtn;
  if (pages) {
    dummyArr = Array(pages).fill(0);
  }
  if (dummyArr) {
    pagesBtn = dummyArr.map((_, i) => (
      <button
        key={i}
        className={`btn ${i + 1 == currentPage ? "btn-active" : ""}`}
        onClick={() => {
          setCurrentPage(i + 1);
        }}
      >
        {i + 1}
      </button>
    ));
  }
  return <div className="btn-group flex justify-center my-8 ">{pagesBtn}</div>;
}

export default Pagination;
