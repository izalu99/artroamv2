'use client';

import SearchBar from "@/components/common/searchBar";
import { useArtContext } from "@/components/useArtContext";
import Filter from "@/components/common/filter";
import ArtList from "@/components/art/artList";



export default function Home() {

  const {
    query,
    mergedResults,
    searchInitiated,
    handleSearch,
    handleSubmit,
    handleSortChange,
    handleFilterChange,
    loading,
  } = useArtContext();
 
  return (
    <main className="flex flex-col items-center justify-between p-18 md:p-24 lg:p-30">
      <div className='flex flex-col'>
        <SearchBar query={query} handleSearch={handleSearch} handleSubmit={handleSubmit}/>
        <Filter handleFilterChange={handleFilterChange} handleSortChange={handleSortChange}/>
        <ArtList results={mergedResults} loading={loading} searchInitiated={searchInitiated}/>  
      </div>
    </main>
  );
}
