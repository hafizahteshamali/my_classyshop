import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const data = [
  {
    id: 1,
    title: 'Shop by Category',
    content: (
      <ul className="space-y-1">
        <li><input type="checkbox" /> <span>Shirts</span></li>
        <li><input type="checkbox" /> <span>Trousers</span></li>
        <li><input type="checkbox" /> <span>Shoes</span></li>
        <li><input type="checkbox" /> <span>Watches</span></li>
      </ul>
    ),
  },
  {
    id: 2,
    title: 'Filter by Price',
    content: (
      <div className="space-y-2">
        <input type="range" min={0} max={1000} className="w-full" />
        <div className="flex justify-between text-sm text-gray-500">
          <span>$0</span>
          <span>$1000</span>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: 'Filter by Ratings',
    content: (
      <ul className="space-y-1">
        <li><input type="checkbox" /> <span>5 Stars</span></li>
        <li><input type="checkbox" /> <span>4 Stars & Up</span></li>
        <li><input type="checkbox" /> <span>3 Stars & Up</span></li>
        <li><input type="checkbox" /> <span>2 Stars & Up</span></li>
      </ul>
    ),
  },
];

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen w-[90%] md:w-[25%] p-4 bg-gray-50">
      {data.map((item, index) => (
        <div key={item.id} className="rounded-lg border mb-2 bg-white shadow-sm">
          {/* Accordion Header */}
          <button
            className="w-full flex justify-between items-center p-4 text-left font-medium text-gray-700 hover:bg-gray-100 transition"
            onClick={() => toggleAccordion(index)}
          >
            {item.title}
            {openIndex === index ? (
              <FiChevronUp className="text-xl" />
            ) : (
              <FiChevronDown className="text-xl" />
            )}
          </button>

          {/* Accordion Content */}
          {openIndex === index && (
            <div className="p-4 text-sm text-gray-700">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
