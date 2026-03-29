import { useEffect, useState } from "react";
import { getReq } from "../../api/axios";
import FilterSidebar from "./elements/FilterSidebar";
import ProductItem from "../../components/ProductItem";
import { FaChevronLeft, FaChevronRight, FaSpinner, FaBoxOpen, FaSlidersH } from "react-icons/fa";

const ProductsListing = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCategories, setIsCategories] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getProductsData = async () => {
    try {
      setLoading(true);
      
      let url = `/products?page=${page}&limit=12&sortBy=${sortBy}&order=${sortOrder}`;
      
      if (isCategories.length > 0) {
        url += `&category=${isCategories.join(",")}`;
      }
      
      const response = await getReq(url);
      setProducts(response?.products || []);
      setTotalPages(response?.pages || 1);
      setTotalProducts(response?.total || 0);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [isCategories, sortBy, sortOrder]);

  useEffect(() => {
    getProductsData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, isCategories, sortBy, sortOrder]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisible = 5;
    let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
          page === 1 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:shadow-sm'
        }`}
      >
        <FaChevronLeft className="text-sm" />
        <span>Previous</span>
      </button>
    );
    
    // First page
    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <span key="dots1" className="px-2 text-gray-400">...</span>
        );
      }
    }
    
    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-10 h-10 rounded-lg transition-all duration-300 ${
            page === i 
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md scale-105' 
              : 'border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
          }`}
        >
          {i}
        </button>
      );
    }
    
    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="dots2" className="px-2 text-gray-400">...</span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
        >
          {totalPages}
        </button>
      );
    }
    
    // Next button
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
          page === totalPages 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:shadow-sm'
        }`}
      >
        <span>Next</span>
        <FaChevronRight className="text-sm" />
      </button>
    );
    
    return buttons;
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
            Our Collection
          </h1>
          <p className="text-gray-500 text-lg">
            Discover amazing products at unbeatable prices
          </p>
          {totalProducts > 0 && (
            <div className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
              <span className="text-sm text-blue-600 font-semibold">
                {totalProducts} Products Available
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
          >
            <FaSlidersH />
          </button>

          {/* Sidebar */}
          <div className={`
            fixed lg:static top-0 left-0 z-40 h-full lg:h-auto w-80 lg:w-80
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            bg-white lg:bg-transparent shadow-lg lg:shadow-none
          `}>
            <div className="p-4 lg:p-0">
              <FilterSidebar 
                setIsCategories={setIsCategories} 
                isCategories={isCategories}
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                onClose={() => setIsSidebarOpen(false)}
              />
            </div>
          </div>

          {/* Overlay for mobile */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Products Section */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">
                    Showing {products.length} of {totalProducts} products
                  </span>
                  <div className="h-4 w-px bg-gray-300" />
                  <div className="flex gap-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        viewMode === "grid" 
                          ? "bg-blue-50 text-blue-600" 
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        viewMode === "list" 
                          ? "bg-blue-50 text-blue-600" 
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={`${sortBy}-${sortOrder}`}
                    onChange={(e) => {
                      const [newSortBy, newSortOrder] = e.target.value.split("-");
                      setSortBy(newSortBy);
                      setSortOrder(newSortOrder);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="createdAt-desc">Newest First</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="relative">
                  <FaSpinner className="text-5xl text-blue-600 animate-spin" />
                  <div className="absolute inset-0 animate-pulse">
                    <div className="w-12 h-12 rounded-full bg-blue-100 opacity-50"></div>
                  </div>
                </div>
                <p className="text-gray-500 text-lg mt-4 animate-pulse">
                  Loading amazing products...
                </p>
              </div>
            ) : (
              <>
                {/* Products Grid/List */}
                {products.length > 0 ? (
                  <div className={
                    viewMode === "grid" 
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                      : "flex flex-col gap-4"
                  }>
                    {products.map((product, index) => (
                      <div
                        key={product._id}
                        className="animate-fade-in-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <ProductItem 
                          data={product} 
                          viewMode={viewMode}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
                      <FaBoxOpen className="text-5xl text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                      No Products Found
                    </h3>
                    <p className="text-gray-500 max-w-md">
                      We couldn't find any products matching your criteria. Try adjusting your filters or browse other categories.
                    </p>
                    {isCategories.length > 0 && (
                      <button
                        onClick={() => setIsCategories([])}
                        className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105"
                      >
                        Clear All Filters
                      </button>
                    )}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && products.length > 0 && (
                  <div className="mt-12 flex justify-center">
                    <div className="flex flex-wrap items-center gap-2">
                      {renderPaginationButtons()}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ProductsListing;