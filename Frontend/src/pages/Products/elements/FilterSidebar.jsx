import React, { useEffect, useState } from 'react'
import { getReq } from '../../../api/axios'
import { 
  FaChevronDown, 
  FaChevronUp, 
  FaFilter, 
  FaTimes, 
  FaTag, 
  FaSearch,
  FaSlidersH,
  FaCheck,
  FaSpinner
} from 'react-icons/fa'

const FilterSidebar = ({ setIsCategories, isCategories }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({});
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await getReq("/v1/category/get-categories");
      setCategories(response?.categories || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setActiveFiltersCount(isCategories.length);
  }, [isCategories]);

  const handleCategories = (e, categorySlug) => {
    e.stopPropagation();
    if (e.target.checked) {
      setIsCategories((prev) => [...prev, categorySlug]);
    } else {
      setIsCategories((prev) => prev.filter((cat) => cat !== categorySlug));
    }
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const clearAllFilters = () => {
    setIsCategories([]);
  };

  // Get unique parent categories
  const uniqueCategories = categories.filter((cat) => cat.parent === null);
  
  // Get subcategories for a parent category
  const getSubCategories = (parentId) => {
    return categories.filter((cat) => cat.parent === parentId);
  };

  // Filter categories based on search
  const filteredCategories = uniqueCategories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Remove a specific filter
  const removeFilter = (categorySlug) => {
    setIsCategories(prev => prev.filter(cat => cat !== categorySlug));
  };

  return (
    <div className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'>
      {/* Header with Gradient */}
      <div className='bg-gradient-to-r from-amber-500 to-orange-500 p-3'>
        <div className='flex items-center justify-between w-full'>
          <div className='flex items-center gap-3 w-[70%]'>
            <div className='bg-white/20 p-2 rounded-xl backdrop-blur-sm'>
              <FaSlidersH className='text-white text-xl' />
            </div>
            <div>
              <h1 className='text-2xl font-bold text-white'>Filters</h1>
              <p className='text-white/80 text-sm mt-1'>
                Refine your product search
              </p>
            </div>
          </div>
          {activeFiltersCount > 0 && (
            <div className='bg-white/20 backdrop-blur-sm py-1 rounded-full w-[30%] flex justify-center'>
              <span className='text-white font-semibold text-[10px]'>
                {activeFiltersCount} active
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Search Categories */}
      <div className='p-5 border-b border-gray-100'>
        <div className='relative'>
          <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm' />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl 
                     focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent
                     transition-all duration-200 text-sm'
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
            >
              <FaTimes className='text-sm' />
            </button>
          )}
        </div>
      </div>

      {/* Categories Section */}
      <div className='p-5'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-2'>
            <FaTag className='text-amber-500 text-sm' />
            <h3 className='font-semibold text-gray-800'>Categories</h3>
          </div>
          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className='text-xs text-red-500 hover:text-red-600 transition-colors flex items-center gap-1'
            >
              <FaTimes className='text-xs' />
              Clear all
            </button>
          )}
        </div>

        {loading ? (
          <div className='flex flex-col items-center justify-center py-12'>
            <FaSpinner className='text-3xl text-amber-500 animate-spin mb-3' />
            <p className='text-sm text-gray-400'>Loading categories...</p>
          </div>
        ) : (
          <div className='space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar'>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat) => {
                const subCategories = getSubCategories(cat._id);
                const hasSubCategories = subCategories.length > 0;
                const isExpanded = expandedCategories[cat._id];
                const isChecked = isCategories.includes(cat.slug);
                
                return (
                  <div key={cat._id} className='group'>
                    <div className='flex items-center justify-between'>
                      <label className='flex items-center flex-1 cursor-pointer group'>
                        <div className='relative'>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => handleCategories(e, cat.slug)}
                            className='w-5 h-5 rounded border-2 border-gray-300 
                                     text-amber-500 focus:ring-2 focus:ring-amber-300 
                                     focus:ring-offset-0 transition-all duration-200 
                                     cursor-pointer'
                          />
                          {isChecked && (
                            <FaCheck className='absolute left-1 top-1 text-white text-xs pointer-events-none' />
                          )}
                        </div>
                        <span className={`ml-3 text-sm font-medium transition-colors duration-200
                                       ${isChecked ? 'text-amber-600' : 'text-gray-700 group-hover:text-amber-600'}`}>
                          {cat.name}
                        </span>
                      </label>
                      
                      {hasSubCategories && (
                        <button
                          onClick={() => toggleCategory(cat._id)}
                          className='p-1 hover:bg-gray-100 rounded-lg transition-all duration-200'
                        >
                          {isExpanded ? (
                            <FaChevronUp className='text-gray-400 text-xs' />
                          ) : (
                            <FaChevronDown className='text-gray-400 text-xs' />
                          )}
                        </button>
                      )}
                    </div>
                    
                    {/* Subcategories */}
                    {hasSubCategories && isExpanded && (
                      <div className='ml-6 mt-2 space-y-2 border-l-2 border-gray-100 pl-4'>
                        {subCategories.map((subCat) => {
                          const isSubChecked = isCategories.includes(subCat.slug);
                          return (
                            <label
                              key={subCat._id}
                              className='flex items-center cursor-pointer group'
                            >
                              <input
                                type="checkbox"
                                value={subCat.slug}
                                checked={isSubChecked}
                                onChange={(e) => handleCategories(e, subCat.slug)}
                                className='w-4 h-4 rounded border-2 border-gray-300 
                                         text-amber-400 focus:ring-2 focus:ring-amber-200
                                         transition-all duration-200 cursor-pointer'
                              />
                              <span className={`ml-3 text-xs transition-colors duration-200
                                             ${isSubChecked ? 'text-amber-600 font-medium' : 'text-gray-500 group-hover:text-amber-600'}`}>
                                {subCat.name}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className='text-center py-8'>
                <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3'>
                  <FaSearch className='text-gray-400 text-2xl' />
                </div>
                <p className='text-sm text-gray-400'>No categories found</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className='p-5 border-t border-gray-100 bg-gray-50'>
          <p className='text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider'>
            Active Filters
          </p>
          <div className='flex flex-wrap gap-2'>
            {isCategories.map((categorySlug) => {
              const category = categories.find(c => c.slug === categorySlug);
              if (!category) return null;
              return (
                <div
                  key={categorySlug}
                  className='inline-flex items-center gap-2 bg-white border border-gray-200 
                           px-3 py-1.5 rounded-full text-sm group hover:border-red-200
                           transition-all duration-200 shadow-sm'
                >
                  <span className='text-gray-700'>{category.name}</span>
                  <button
                    onClick={() => removeFilter(categorySlug)}
                    className='text-gray-400 hover:text-red-500 transition-colors'
                  >
                    <FaTimes className='text-xs' />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Apply Filters Button */}
      <div className='p-5 border-t border-gray-100 bg-white'>
        <button 
          onClick={clearAllFilters}
          className='w-full bg-gradient-to-r from-amber-500 to-orange-500 
                   text-white font-semibold py-3 px-4 rounded-xl
                   hover:from-amber-600 hover:to-orange-600 
                   transform transition-all duration-200 
                   focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2
                   shadow-md hover:shadow-lg active:scale-95
                   disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={activeFiltersCount === 0}
        >
          {activeFiltersCount === 0 ? 'No Active Filters' : `Clear ${activeFiltersCount} Filter${activeFiltersCount > 1 ? 's' : ''}`}
        </button>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #fbbf24;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #f59e0b;
        }
      `}</style>
    </div>
  )
}

export default FilterSidebar