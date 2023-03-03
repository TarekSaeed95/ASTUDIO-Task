import Pagination from "../global/Pagination";
import TableData from "../global/TableData";
import TableHead from "../global/TableHead";
import { useProducts } from "../../Context/Products/ProductContext";
import Spinner from "../global/Spinner";
import FiltersController from "../filters/FiltersController";
import { Link } from "react-router-dom";
import Button from "../global/Button";
import { FaArrowCircleLeft } from "react-icons/fa";
function Products() {
  const product = useProducts();

  return (
    <div>
      <Link className="block ml-auto w-fit mr-8 -mt-8 mb-8" to="/">
        <Button color="error">
          <FaArrowCircleLeft className="mr-4 text-lg" />
          Back to main
        </Button>
      </Link>
      <FiltersController
        context={product}
        filtersName={["title"]}
        tabOptions={["All category", "laptops"]}
      />
      <div className="mx-8 relative overflow-y-auto min-h-[580px] max-h-[calc((100vh-466px))]  ">
        <table className="border-spacing-x-1  m-auto w-[1000px] ">
          <TableHead titles={product.keys} />
          <TableData context={product} />
        </table>
        {product.loading && (
          <div
            className={`container m-auto flex justify-center absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2`}
          >
            <Spinner context={product} />
          </div>
        )}
      </div>
      <Pagination data={product} />
    </div>
  );
}

export default Products;
