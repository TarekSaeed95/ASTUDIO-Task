function TabFilter({ options, setFilter, clearFilter }) {
  function optionsHandler(e) {
    if (e.target.children[0].value == e.target.value) {
      clearFilter();
    } else {
      if (options.includes("All Genders")) {
        setFilter("gender", e.target.value.toLowerCase());
      } else {
        setFilter("category", e.target.value.toLowerCase());
      }
    }
  }
  let filterOptions = options.map((opt, i) => (
    <option key={i} id={i} value={opt}>
      {opt}
    </option>
  ));
  return (
    <div className="flex items-center gap-4">
      <select
        onChange={(e) => optionsHandler(e)}
        className="input input-sm text-center  border-black border-2"
      >
        {filterOptions}
      </select>
    </div>
  );
}

export default TabFilter;
