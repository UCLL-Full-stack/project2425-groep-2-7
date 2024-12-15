import React, { useState } from 'react';

interface FilterProps {
  onFilterChange: (filterValue: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [searchText, setSearchText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    onFilterChange(value); // Pass the value to the parent component
  };

  return (
    <div className="flex flex-col justify-center items-center">
  <label htmlFor="search" className="block mb-2 text-white">
    Search Tournaments:
  </label>
  <input
    type="text"
    id="search"
    className="w-2/5 p-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-teal-400"
    placeholder="Search by tournament location/game"
    value={searchText}
    onChange={handleChange}
  />
</div>

  );
};

export default Filter;
