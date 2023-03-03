import { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchFilter({ setSearchInput, searchInput: searchInputs }) {
  const [search, setSearch] = useState(false);
  const searchInput = useRef();
  function searchHandler() {
    searchInput.current.value
      ? setSearchInput(searchInput.current.value)
      : setSearchInput("");
  }

  return (
    <div className="border-r-2 h-full pr-4 border-[gray] flex items-center gap-4">
      <FaSearch
        onClick={() => setSearch((prev) => !prev)}
        className="cursor-pointer"
      />
      {search && (
        <>
          <input
            type="text"
            ref={searchInput}
            className="input border-1 border-black input-sm"
          />
          <button className="btn btn-primary btn-xs" onClick={searchHandler}>
            Search
          </button>
        </>
      )}
    </div>
  );
}

export default SearchFilter;
