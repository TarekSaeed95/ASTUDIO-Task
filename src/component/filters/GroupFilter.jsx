import { useRef, useState } from "react";
import Button from "../global/Button";
import { capitalize } from "../global/helpers";
function GroupFilter({ filters, setFilter }) {
  const [filtersArr, setFiltersArr] = useState(
    new Array(filters.length).fill(false)
  );
  const filterRef = [...new Array(filters.length).fill(useRef())];
  function filterHandler(key, ref) {
    if (key === "lastName") {
      ref = capitalize(ref);
    }
    setFilter(key, ref);
  }
  function displayHandler(currentIndex) {
    setFiltersArr((prev) =>
      prev.map((filter, j) =>
        j == currentIndex ? (filter = !filter) : (filter = false)
      )
    );
  }
  let filterElement = filters.map((filter, i) => (
    <div
      key={i}
      className="border-r-2 h-full pr-4 border-[gray] flex items-center gap-4"
    >
      <Button size={"small"} onClick={() => displayHandler(i)}>
        {filter == "lastName" ? "Last name" : capitalize(filter)}
      </Button>
      {filtersArr[i] == true && (
        <>
          <input
            type="text"
            name={filter}
            ref={filterRef[i]}
            className="input border-1 border-black input-sm"
          />
          <Button
            color={"primary"}
            size={"small"}
            onClick={() =>
              filterHandler(
                filterRef[i].current.name,
                filterRef[i].current.value
              )
            }
          >
            Filter
          </Button>
        </>
      )}
    </div>
  ));
  return filterElement;
}

export default GroupFilter;
