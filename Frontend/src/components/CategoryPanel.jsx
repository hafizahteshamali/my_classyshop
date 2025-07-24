import { useState } from "react"
import { Link } from "react-router-dom"
import { FiPlus, FiMinus, FiX } from "react-icons/fi"
import { NavData } from "../assets/ConstantData"

const CategoryPanel = ({ open, setOpen, toggleDrawer }) => {
  const [expandedCategories, setExpandedCategories] = useState({
    Fashion: true,
  })

  const handleToggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  const handleClose = () => {
    if (toggleDrawer) {
      toggleDrawer(false)()
    } else {
      setOpen(false)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-[#00000054] z-45 backdrop:blur-2xl transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[280px] p-2 z-50 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header Logo */}
        <Link to="/">
          <img src="/assets/images/logo.jpg" alt="logo" />
        </Link>

        {/* Header Title & Close Button */}
        <div className="flex justify-between mt-4 items-center p-4">
          <h2 className="text-lg font-medium text-gray-700">Shop By Categories</h2>
          <button onClick={handleClose} className="p-1 rounded-full hover:bg-gray-100">
            <FiX size={20} />
          </button>
        </div>

        {/* Categories List */}
        <div className="overflow-y-auto h-[calc(100%-60px)] bg-white rounded-md">
          <ul>
            {NavData.map((item, index) => (
              <li key={index}>
                <div className="flex items-center justify-between px-4 py-2">
                  <Link
                    to={item.url}
                    className="text-gray-800 text-[15px] hover:text-gray-600"
                    onClick={handleClose}
                  >
                    {item.text}
                  </Link>

                  {item.dropDown && item.subMenu && (
                    <button
                      onClick={() => handleToggleCategory(item.text)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      {expandedCategories[item.text] ? (
                        <FiMinus className="border-[2px] text-gray-800 border-gray-700" size={16} />
                      ) : (
                        <FiPlus className="border-[2px] text-gray-800 border-gray-700" size={16} />
                      )}
                    </button>
                  )}
                </div>

                {/* First Level Dropdown */}
                {item.dropDown && item.subMenu && expandedCategories[item.text] && (
                  <ul className="bg-gray-50">
                    {item.subMenu.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <div className="flex items-center justify-between px-4 py-2 pl-8">
                          <Link
                            to={subItem.url}
                            className="text-gray-700 text-[15px] hover:text-gray-900"
                            onClick={handleClose}
                          >
                            {subItem.text}
                          </Link>

                          {subItem.subCategory && subItem.subMenu && (
                            <button
                              onClick={() => handleToggleCategory(`${item.text}-${subItem.text}`)}
                              className="p-1 rounded-full hover:bg-gray-100"
                            >
                              {expandedCategories[`${item.text}-${subItem.text}`] ? (
                                <FiMinus className="border-[2px] text-gray-800 border-gray-700" size={16} />
                              ) : (
                                <FiPlus className="border-[2px] text-gray-800 border-gray-700" size={16} />
                              )}
                            </button>
                          )}
                        </div>

                        {/* Second Level Dropdown */}
                        {subItem.subCategory &&
                          subItem.subMenu &&
                          expandedCategories[`${item.text}-${subItem.text}`] && (
                            <ul>
                              {subItem.subMenu.map((subSubItem, subSubIndex) => (
                                <li key={subSubIndex}>
                                  <Link
                                    to={subSubItem.url}
                                    className="block px-4 py-2 pl-12 text-[15px] text-gray-600 hover:text-gray-800"
                                    onClick={handleClose}
                                  >
                                    {subSubItem.text}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default CategoryPanel
