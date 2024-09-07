'use client';

import SearchBar from "@/components/common/searchBar";
import { useArtContext } from "@/components/useArtContext";
import Filter from "@/components/common/filter";
import ArtList from "@/components/art/artList";



export default function Home() {

  const {
    query,
    mergedResults,
    handleSearch,
    handleSubmit,
    handleSortChange,
    handleFilterChange,
    loading,
  } = useArtContext();
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='flex flex-col'>
        <SearchBar query={query} handleSearch={handleSearch} handleSubmit={handleSubmit}/>
        <Filter handleFilterChange={handleFilterChange} handleSortChange={handleSortChange}/>
        <ArtList results={mergedResults} loading={loading}/>  
      </div>
    </main>
  );
}
