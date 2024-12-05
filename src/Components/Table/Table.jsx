import { useEffect, useState } from "react";
import "./table.css";

const Table = ({ data, columns }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const totalPages = Math.ceil(data.length / pageSize);

  const nextPage = () => {
    if (currentPage === totalPages) {
      return;
    }

    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage === 1) {
      return;
    }

    setCurrentPage((prev) => prev - 1);
  };

  const firstPage = () => {
    if (currentData === 1) {
      return;
    }
    setCurrentPage(1);
  };

  const lastPage = () => {
    if (currentPage === totalPages) {
      return;
    }
    setCurrentPage(totalPages);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(e.target.value);
    setCurrentPage(1);
  };

  const currentData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalRows = data.length;
  const fromVal = (currentPage - 1) * pageSize + 1;
  const toVal =
    currentPage * pageSize > totalRows ? totalRows : currentPage * pageSize;

  const rowWidth = 100 / columns.length;

  if (columns.length === 0 || data.length === 0) {
    return <></>;
  }

  return (
    <>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr className="table-head">
              {columns.map((item) => (
                <th
                  key={item.key}
                  style={
                    item.width
                      ? { width: `${item.width}%` }
                      : { width: `${rowWidth}%` }
                  }
                >
                  {item.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentData.map((row) => {
              return (
                <tr key={row.id}>
                  {columns.map((item, index) => {
                    if (!item.dataIndex) {
                      return (
                        <td key={`${item.key}_${index}`}>{item.render(row)}</td>
                      );
                    }
                    if (item.render) {
                      return (
                        <td key={`${item.key}_${index}`}>
                          {item.render(row[item.dataIndex], row)}
                        </td>
                      );
                    }
                    return (
                      <td key={`${item.key}_${index}`}>
                        {row[item.dataIndex]}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="pagination-wrap">
        <div className="page-size-wrap">
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="page-size-dropdown"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className="pages-wrap">
          <p>{`${fromVal} - ${toVal} of ${totalRows}`}</p>
        </div>

        <div>
          <img
            className={`pagination-icon left ${
              currentPage === 1 ? "disabled" : ""
            }`}
            src="src/assets/right-chevron.png"
            onClick={firstPage}
          />
          <img
            className={`pagination-icon left ${
              currentPage === 1 ? "disabled" : ""
            }`}
            src="src/assets/arrow.png"
            onClick={prevPage}
          />
        </div>

        <div>
          <img
            className={`pagination-icon ${
              currentPage === totalPages ? "disabled" : ""
            }`}
            src="src/assets/arrow.png"
            onClick={nextPage}
          />
          <img
            className={`pagination-icon ${
              currentPage === totalPages ? "disabled" : ""
            }`}
            src="src/assets/right-chevron.png"
            onClick={lastPage}
          />
        </div>
      </div>
    </>
  );
};

export default Table;
