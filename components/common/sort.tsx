import React from 'react';

interface SortProps {
  handleSortChange: (sortOption: string) => void;
}

const Sort = ({ handleSortChange }: SortProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-xs sm:max-w-md md:max-w-lg p-4 mx-40">
      <label htmlFor="sort-select" className="text-secondary text-sm mb-2">
        Sort by
      </label>
      <select
        id="sort-select"
        onChange={(e) => handleSortChange(e.target.value)}
        className="animate-fadeIn w-full p-2 rounded text-secondary bg-neutral border-0 hover:border-2 border-primary"
      >
        <option value="default">Select</option>
        <option value="title">Title</option>
        <option value="artist">Artist</option>
      </select>
      
    </div>
  );
};

export default Sort;
