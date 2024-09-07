import React from 'react';

interface SortProps {
  handleSortChange: (sortOption: string) => void;
}

const Sort = ({ handleSortChange }: SortProps) => {
  return (
    <div className="w-auto mx-auto p-5 text-center">
      <select
        id="sort-select"
        onChange={(e) => handleSortChange(e.target.value)}
        className="w-full p-2 rounded text-secondary bg-neutral border-0 hover:border-2 border-primary"
      >
        <option value="default">Select</option>
        <option value="title">Title</option>
        <option value="artist">Artist</option>
      </select>
    </div>
  );
};

export default Sort;
