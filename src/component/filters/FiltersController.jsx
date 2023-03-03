import Button from "../global/Button";
import BirthFilter from "./BirthFilter";
import GroupFilter from "./GroupFilter";
import LimitFilter from "./LimitFilter";
import SearchFilter from "./SearchFilter";
import TabFilter from "./TabFilter";

function FiltersController({ context, filtersName, tabOptions, birthDate }) {
  const { setFilter, setSearchInput, setLimit, clearFilter, searchInput } =
    context;
  return (
    <div className="container h-[32px]  flex items-center flex-wrap justify-center w-full	 gap-5 ml-4 xl:mb-16 mb-32  mx-8">
      <LimitFilter setLimit={setLimit} />
      <SearchFilter setSearchInput={setSearchInput} searchInput={searchInput} />
      <GroupFilter setFilter={setFilter} filters={filtersName} />
      {birthDate && <BirthFilter setFilter={setFilter} />}
      <TabFilter
        setFilter={setFilter}
        clearFilter={clearFilter}
        options={tabOptions}
      />
      <Button color={"warning"} onClick={clearFilter}>
        Reset filters
      </Button>
    </div>
  );
}

export default FiltersController;
