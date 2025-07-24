import { Route, Routes } from "react-router-dom"
import Layout from "../Layouts/Layout"
import HomePage from "../pages/Home/HomePage"
import ProductsListing from "../pages/Products/ProductsListing"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
      {/* home Page */}
      <Route index element={<HomePage />} />
      </Route>

      <Route path="/products" element={<Layout />}>
        {/* product listing */}
        <Route index element={<ProductsListing />} />
      </Route>


    </Routes>
  )
}

export default AppRoutes