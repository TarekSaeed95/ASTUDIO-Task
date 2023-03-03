import { createTableHead } from "./helpers";

function TableHead({ titles }) {
  return (
    <thead className="bg-blue">
      <tr className="uppercase m-auto ">
        {titles && titles.length > 0 && createTableHead(titles)}
      </tr>
    </thead>
  );
}

export default TableHead;
