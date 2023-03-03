export const createTableHead = (keys) => {
  return keys.map((key, i) => (
    <th key={i} className="p-4 border-4 border-grey">
      {key}
    </th>
  ));
};
export const fillTableData = (keys) => {
  return keys.map((key, i) => (
    <td key={i} className="p-4 border-4 border-grey">
      {key}
    </td>
  ));
};
export const useFetch = async (request, url) => {
  const response = await request.get(url);
  const data = await response.data;
  return data;
};
export const useFilter = (state, rowDataArr) => {
  if (state.searchInput.length) {
    let searchedData = rowDataArr.filter((data) => {
      let values = Object.values(data);
      return values.some((value) => {
        return value
          .toString()
          .toLowerCase()
          .indexOf(state.searchInput.toLowerCase().trim()) != -1
          ? true
          : false;
      });
    });
    state.isSearching = false;
    return searchedData;
  }
};
export const capitalize = (word) => {
  return word.slice(0, 1).toUpperCase() + word.slice(1);
};
