import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./component/pages/Home";

import "./index.css";
import { UserProvider } from "./Context/User/UserContext";
import { ProductProvider } from "./Context/Products/ProductContext";
import Users from "./component/pages/Users";
import Products from "./component/pages/Products";
import Navbar from "./component/global/Navbar";

function App() {
  return (
    <ProductProvider>
      <UserProvider>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<Users />} />
              <Route path="/products" element={<Products />} />
            </Routes>
          </div>
        </Router>
      </UserProvider>
    </ProductProvider>
  );
}
export default App;
