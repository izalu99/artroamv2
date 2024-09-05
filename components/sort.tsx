import React from 'react';

interface SortProps {
  handleSortChange: (sortOption: string) => void;
}

const Sort = ({ handleSortChange }: SortProps) => {
  return (
    <div className="w-auto mb-10 mx-auto p-5 text-center">
      <h3 className="text-lg font-semibold mb-2 text-secondary ">Sort:</h3>
      <select
        id="sort-select"
        onChange={(e) => handleSortChange(e.target.value)}
        className="w-full p-2 rounded text-accent bg-neutral border border-primary"
      >
        <option value="default">Select</option>
        <option value="title">Title</option>
        <option value="artist">Artist</option>
      </select>
    </div>
  );
};

export default Sort;
