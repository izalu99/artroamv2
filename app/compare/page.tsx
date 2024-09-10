'use client'
import { useEffect, useState, useRef } from "react";
import { useArtContext } from "@/components/useArtContext";
import ArtCard from "@/components/art/artCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";


const ComparePage = () => {
    const { collection } = useArtContext();
    const [selectedArts, setSelectedArts] = useState<any[]>([]);
    const [isMinimized, setIsMinimized] = useState<boolean>(false);
    const scrollRef = useRef<HTMLDivElement>(null);


    const handleSelect = (art: any) => {
        setSelectedArts((prevSelected) => {
            if (prevSelected.some((selectedArt) => selectedArt.artID === art.artID)) {
                return prevSelected.filter((selectedArt) => selectedArt.artID !== art.artID);
            } else if (prevSelected.length < 2) {
                return [...prevSelected, art];
            } else {
                return [prevSelected[1], art];
            }
        });
    };

    useEffect(() => {
        if (selectedArts.length === 2) {
            setIsMinimized(true);
            scrollRef.current?.scrollIntoView({ behavior: "instant"});

        }
    }, [selectedArts]);


    // Deselect arts that are removed from the collection
    useEffect(() => {
        setSelectedArts((prevSelected) =>
            prevSelected.filter((selectedArt) =>
                collection.some((art: any) => art.artID === selectedArt.artID)
            )
        );
    }, [collection]);



    const toggleMinimize = () => {
        setIsMinimized((prev) => !prev);
    };

    
        

    return (
        <div className="flex flex-col items-center space-y-8 sm:mx-10 bg-transparent min-h-screen">
            <div className='relative w-full flex flex-col justify-between'>
                <h1 className="text-xl md:text-2xl lg:text-4xl bg-gradient-to-r bg-clip-text font-bold align-middle text-center from-neon-cyan via-neon-magenta-500 to-neon-cyan text-transparent">Compare Arts</h1>
                <p className="mt-10 md:mt-20 text-center text-secondary text-neon"> Select two arts to compare them side by side.</p>
                {/* Minimize button */}
                <button 
                onClick={toggleMinimize}
                className="btn text-secondary border border-primary hover:bg-primary hover:text-base-100 absolute top-0 right-0 mb-5">
                    {isMinimized ? (
                        <span><FontAwesomeIcon icon={faCaretDown} className="text-xl" /></span>
                    ) : (
                        <span><FontAwesomeIcon icon={faCaretUp} className="text-xl" /></span>
                    )}
                </button>

                {/* Floating text */}
                {isMinimized && (
                    <div className="absolute top-0 right-0 mt-12 mr-5 bg-transparent text-secondary animate-fadeIn p-2 shadow-lg">
                        Click the caret to see the selected arts
                    </div>
                )}

                {/* Horizontally scrollable Compare list */}
                {!isMinimized && (
                    <div className="flex overflow-x-auto space-x-4 md:space-x-6 w-full py-4 items-center justify-start scrollbar-hide px-4 sm:px-10">
                        {collection.length === 0 ? (
                            <div className="mt-10 md:mt-50 align-text-bottom text-center text-secondary">
                                No added Art yet to be compared.
                            </div>
                        ) : (
                            collection.map((art: any) => (
                                <div 
                                    key={art?.artID} 
                                    className="min-w-[150px] sm:min-w-[200px] md:min-w-[300px] max-w-[150px] sm:max-w-[200px] md:max-w-[300px] flex-shrink-0 flex flex-col justify-between active:border hover:border-primary rounded-lg p-2 sm:p-4">
                                    <div className="flex flex-grow">
                                        <ArtCard
                                            source={art?.source}
                                            artID={art?.artID}
                                            imgURL={art?.imgURL}
                                            altText={art?.altText}
                                            title={art?.title}
                                            artist={art?.artist}
                                        />
                                    </div>
                                    <button
                                        onClick={() => handleSelect(art)}
                                        className="mt-2 w-full btn btn-accent"
                                    >
                                        {selectedArts.some((selectedArt) => selectedArt.artID === art.artID)
                                            ? "Deselect"
                                            : "Select"}
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Selected arts grid */}
            <div className="w-full rounded-lg pt-10">
                {selectedArts.length > 0 && <h2 className="text-2xl text-primary font-bold align-middle text-center neon-text">Compare Selected Arts</h2>}
                {selectedArts.length > 0 && (
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-1">
                        {selectedArts.map((art: any) => (
                            <div key={art.artID} className="flex flex-col border-2 border-accent items-center">
                                <div className="flex flex-grow justify-center items-center">
                                    <ArtCard
                                        source={art?.source}
                                        artID={art?.artID}
                                        imgURL={art?.imgURL}
                                        altText={art?.altText}
                                        title={art?.title}
                                        artist={art?.artist}
                                    />
                                </div>
                                <button onClick={() => handleSelect(art)} className="mt-2 w-full btn btn-accent">
                                    {selectedArts.some((selectedArt) => selectedArt.artID === art.artID)
                                        ? "Deselect"
                                        : "Select"}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ComparePage;