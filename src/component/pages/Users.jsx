import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUser } from "../../Context/User/UserContext";
import FiltersController from "../filters/FiltersController";
import Button from "../global/Button";
import Pagination from "../global/Pagination";
import Spinner from "../global/Spinner";
import TableData from "../global/TableData";
import TableHead from "../global/TableHead";
function Users() {
  const user = useUser();

  return (
    <div>
      <Link to="/" className="block ml-auto w-fit mr-8 -mt-8 mb-8">
        <Button color="error">
          <FaArrowCircleLeft className="mr-4 text-lg" />
          Back to main
        </Button>
      </Link>
      <FiltersController
        birthDate
        context={user}
        filtersName={["lastName", "email"]}
        tabOptions={["All Genders", "Male", "Female"]}
      />
      <div className="mx-8 relative overflow-y-auto min-h-[400px] max-h-[calc(100vh-466px)]  ">
        <table className="border-spacing-x-1 m-auto ">
          <TableHead titles={user.keys} />
          <TableData context={user} />
        </table>
        {user.loading && (
          <div
            className={`container m-auto flex justify-center absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2`}
          >
            <Spinner context={user} />
          </div>
        )}
      </div>
      <Pagination data={user} />
    </div>
  );
}

export default Users;
