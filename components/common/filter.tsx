import React from 'react';
import Sort from './sort';

interface FilterProps {
  handleFilterChange: (filter: 'chicago' | 'harvard', checked: boolean) => void;
  handleSortChange: (sortOption: string) => void;
}

const Filter = ({ handleFilterChange, handleSortChange }: FilterProps) => {
  return (
    <div className=" flex flex-wrap justify-center w-auto mb-10 mx-auto text-center">
      <div className="flex flex-row space-x-3 px-3 items-center justify-center">
        <input
          type="checkbox"
          id="chicagoFilter"
          className="rounded-md justify-self-center "
          onChange={(e) => handleFilterChange('chicago', e.target.checked)}
          defaultChecked
        />
        <label htmlFor="chicagoFilter" className="text-sm text-secondary">Chicago Art Museum</label>
      </div>
      <div className='flex flex-row space-x-3 px-3 items-center justify-center'>
        <input
          type="checkbox"
          id="harvardFilter"
          className="rounded-md justify-self-center"
          onChange={(e) => handleFilterChange('harvard', e.target.checked)}
          defaultChecked
        />
        <label htmlFor="harvardFilter" className="text-sm text-secondary">Harvard Art Museum</label>
      </div>

      <Sort handleSortChange={handleSortChange} />
    </div>
  );
};

export default Filter;
