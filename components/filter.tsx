import React from 'react';
import Sort from './sort';

interface FilterProps {
  handleFilterChange: (filter: 'chicago' | 'harvard', checked: boolean) => void;
  handleSortChange: (sortOption: string) => void;
}

const Filter = ({ handleFilterChange, handleSortChange }: FilterProps) => {
  return (
    <div className="w-auto mb-10 mx-auto p-5 text-center">
      <h3 className="text-lg font-semibold mb-2 text-secondary">Filter:</h3>
      <div className="mb-2">
        <input
          type="checkbox"
          id="chicagoFilter"
          className="mr-2"
          onChange={(e) => handleFilterChange('chicago', e.target.checked)}
          defaultChecked
        />
        <label htmlFor="chicagoFilter" className="text-sm text-accent">Chicago Art Museum</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="harvardFilter"
          className="mr-2"
          onChange={(e) => handleFilterChange('harvard', e.target.checked)}
        />
        <label htmlFor="harvardFilter" className="text-sm text-accent">Harvard Art Museum</label>
      </div>

      <Sort handleSortChange={handleSortChange} />
    </div>
  );
};

export default Filter;
