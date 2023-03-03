import SingleData from "./SingleData";
function TableData({ context }) {
  const { filteredData } = context;
  let body =
    filteredData.length > 0 &&
    filteredData.map((data) => <SingleData key={data.id} data={data} />);
  return <tbody>{body}</tbody>;
}
export default TableData;
