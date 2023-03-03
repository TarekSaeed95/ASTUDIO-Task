import { useEffect } from "react";
import { Link } from "react-router-dom"
import { useProducts } from "../../Context/Products/ProductContext";
import { useUser } from "../../Context/User/UserContext";
import Button from "../global/Button";

function Home() {
  const user = useUser();
  const product = useProducts();
  useEffect(()=>{
    user.clearFilter()
    product.clearFilter()
  },[])

  return (
    <div className="flex justify-center mt-96 gap-10 ">
      <Link to="/users"><Button color={"primary"} size={"large"}>Users</Button></Link>
      <Link to="/products"><Button color={"secondary"} size={"large"}>Products</Button></Link>
    </div>
  )
}

export default Home