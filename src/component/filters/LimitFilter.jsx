import React, { useRef } from "react";

function LimitFilter({ setLimit }) {
  const limitInput = useRef();
  function limitHandler() {
    limitInput.current.value ? setLimit(+limitInput.current.value) : "";
  }
  return (
    <div className="border-r-2 h-full pr-4 border-[gray] flex items-center gap-4">
      <select
        className="mr-2 input input-sm text-md border-black border-2"
        id="entries"
        ref={limitInput}
        onChange={limitHandler}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
      <label htmlFor="entries">Entries</label>
    </div>
  );
}

export default LimitFilter;
