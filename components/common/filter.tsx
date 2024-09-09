import React from 'react';
import Sort from './sort';

interface FilterProps {
  handleFilterChange: (filter: 'chicago' | 'harvard', checked: boolean) => void;
  handleSortChange: (sortOption: string) => void;
}

const Filter = ({ handleFilterChange, handleSortChange }: FilterProps) => {
  return (
    <div className="flex flex-wrap justify-center w-auto mb-10 mx-auto text-center max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
      <div className="flex flex-row space-x-4 pb-10 px-3 items-center justify-center w-full sm:w-auto">
        <input
          type="checkbox"
          id="chicagoFilter"
          className="w-5 h-5 animate-fadeIn rounded-md"
          onChange={(e) => handleFilterChange('chicago', e.target.checked)}
          defaultChecked
        />
        <label htmlFor="chicagoFilter" className="text-sm text-secondary">Chicago Art Museum</label>
      </div>
      <div className='flex flex-row space-x-4 pb-10 px-3 items-center justify-center w-full sm:w-auto'>
        <input
          type="checkbox"
          id="harvardFilter"
          className="w-5 h-5 animate-fadeIn rounded-md"
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
