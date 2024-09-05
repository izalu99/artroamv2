"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { searchDataCAM, ArtDataCAM  } from "@/app/api/chicago";
import { searchDataHAM, ArtDataHAM } from '@/app/api/harvard';

interface ArtContextType {
  query: string;
  mergedResults: any[];
  loading: boolean;
  error: Error | null;
  sortOption: string;
  showChicago: boolean;
  showHarvard: boolean;
  collection: any[];
  addToCollection: (artPiece: {}) => void;
  removeFromCollection: (artID: string) => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSortChange: (sort: string) => void;
  handleFilterChange: (filter: 'chicago' | 'harvard', checked: boolean) => void;
}

const ArtContext = createContext<ArtContextType | undefined>(undefined);

export const useArtContext = (): ArtContextType => {
  const context = useContext(ArtContext);
  if (!context) {
    throw new Error('useArtContext must be used within an ArtProvider');
  }
  return context;
};

interface ArtProviderProps {
  children: ReactNode;
}

export const ArtProvider = ({ children }: ArtProviderProps) => {
  const [query, setQuery] = useState<string>('');
  const [camResults, setCamResults] = useState<ArtDataCAM[]>([]);
  const [hamResults, setHamResults] = useState<ArtDataHAM[]>([]);
  const [mergedResults, setMergedResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [showChicago, setShowChicago] = useState<boolean>(true);
  const [showHarvard, setShowHarvard] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>('default');
  const [collection, setCollection] = useState<any[]>([]);

  const addToCollection = (artPiece: {}) => {
    setCollection((prevCollection) => [...prevCollection, artPiece]);
    console.log(collection);
  };

  const removeFromCollection = (artID: string) => {
    console.log('remove from collection:', artID);
    setCollection((prevCollection) =>
      prevCollection.filter((artPiece) => artPiece.id !== artID)
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
  };

  const handleFilterChange = (filter: 'chicago' | 'harvard', checked: boolean) => {
    if (filter === 'chicago') {
      setShowChicago(checked);
    }
    if (filter === 'harvard') {
      setShowHarvard(checked);
    }
  };

  const handleSortChange = (sort: string) => {
    setSortOption(sort);
    setLoading((previous)=> !previous);
  };

  useEffect(() => {
    if (!query || query.length < 3) {
      setCamResults([]);
      setHamResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);

    Promise.all([
      showChicago ? searchDataCAM(query) : Promise.resolve({ data: [] }),
      showHarvard ? searchDataHAM(query) : Promise.resolve({ records: [] }),
    ])
      .then(([camData, hamData]) => {
        const camResults = camData.data.map((art: ArtDataCAM) => ({ ...art, source: 'CAM' }));
        const hamResults = hamData.records
        .filter((art: ArtDataHAM) => art.images && art.images.length > 0)
        .map((art: ArtDataHAM) => ({ ...art, source: 'HAM' }));
        const allResults = [...camResults, ...hamResults];

        setCamResults(sortResults(camResults, sortOption));
        setHamResults(sortResults(hamResults, sortOption));
        setMergedResults(sortResults(allResults, sortOption));
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query, showChicago, showHarvard, sortOption]);

  const sortResults = (results: (ArtDataCAM | ArtDataHAM | any)[], sortOption: string) => {
    if (sortOption === 'title') {
      return results.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    } else if (sortOption === 'artist') {
      return results.sort((a, b) => {
        const artistA = (a as ArtDataCAM).artist_title || getArtistName(a);
        const artistB = (b as ArtDataCAM).artist_title || getArtistName(b);
        return artistA.localeCompare(artistB);
      });
    } else {
      return results; // Return the results as is
    }
  };

  const getArtistName = (art: ArtDataHAM): string => {
    if (art.people && art.people.length > 0) {
      return art.people[0].name;
    }
    return 'Unknown artist';
  };

  const contextValue: ArtContextType = {
    query,
    mergedResults,
    loading,
    error,
    sortOption,
    showChicago,
    showHarvard,
    collection,
    addToCollection,
    removeFromCollection,
    handleSearch,
    handleSubmit,
    handleSortChange,
    handleFilterChange,
  };

  return <ArtContext.Provider value={contextValue}>{children}</ArtContext.Provider>;
};
