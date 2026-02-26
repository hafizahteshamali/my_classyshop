import { useEffect, useState } from "react";
import { getReq } from "../../api/axios";
import FilterSidebar from "./elements/FilterSidebar";
import ProductItem from "../../components/ProductItem";

const ProductsListing = () => {

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch Products
  const getAllProducts = async () => {
    try {
      setLoading(true);

      const res = await getReq(`/products?page=${page}`);

      setProducts(res?.data?.products || []);

      // 👇 Backend ke hisaab se adjust karo
      setTotalPages(res?.data?.totalPages || res?.data?.pages || 1);

      setLoading(false);

    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  // 🔹 Call API when page changes
  useEffect(() => {
    getAllProducts();
  }, [page]);

  // 🔹 Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4">

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar */}
          <div className="lg:w-1/4">
            <FilterSidebar />
          </div>

          {/* Products Section */}
          <div className="lg:w-3/4">

            {loading ? (
              <div className="text-center py-20 text-lg font-semibold">
                Loading...
              </div>
            ) : (
              <>
                <div className="flex flex-wrap gap-5 justify-center">
                  {products.length > 0 ? (
                    products.map((product) => (
                      <div
                        className="w-full sm:w-[48%] md:w-[30%]"
                        key={product._id}
                      >
                        <ProductItem data={product} />
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-20 text-lg">
                      No Products Found
                    </div>
                  )}
                </div>
                {/* 🔥 Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-3 py-16 flex-wrap">
                    {/* Prev Button */}
                    <button disabled={page === 1} onClick={() => setPage(page - 1)} className={`px-4 py-2 border rounded 
                        ${page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-black hover:text-white"}`}>
                      Prev
                    </button>
                    {/* Page Numbers */}
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setPage(index + 1)}
                        className={`h-[40px] w-[40px] border rounded 
                          ${page === index + 1 ? "bg-black text-white" : "hover:bg-gray-200"}`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    {/* Next Button */}
                    <button
                      disabled={page === totalPages}
                      onClick={() => setPage(page + 1)}
                      className={`px-4 py-2 border rounded 
                        ${page === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-black hover:text-white"}`}
                    >
                      Next
                    </button>

                  </div>
                )}

              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsListing;
