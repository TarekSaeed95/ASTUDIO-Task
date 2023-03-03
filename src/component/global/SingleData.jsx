import { fillTableData } from "./helpers";

function SingleData({ data }) {
  let headElements = fillTableData(Object.values(data));
  return <tr className="text-center bg-sky-700 ">{headElements}</tr>;
}
export default SingleData;
