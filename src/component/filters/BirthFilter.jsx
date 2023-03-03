import { useRef, useState } from "react";
import Button from "../global/Button";

function BirthFilter({ setFilter }) {
  const [showBirth, setShowBirth] = useState(false);
  const birthRef = useRef();
  function filterHandler() {
    setFilter("birthDate", birthRef.current.value);
  }
  return (
    <div className="border-r-2 h-full pr-4 border-[gray] flex items-center flex  gap-4">
      <Button size={"small"} onClick={() => setShowBirth((prev) => !prev)}>
        Birth Date
      </Button>

      {showBirth && (
        <>
          <input className=" input input-xs" type="date" ref={birthRef} />
          <Button size={"small"} color={"primary"} onClick={filterHandler}>
            {" "}
            Filter
          </Button>
        </>
      )}
    </div>
  );
}

export default BirthFilter;
