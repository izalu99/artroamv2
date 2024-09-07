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
    const [showFloatingText, setShowFloatingText] = useState<boolean>(false);
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


    useEffect(() => {
        if (isMinimized) {
            setShowFloatingText(true);
            const timer = setTimeout(() => {
                setShowFloatingText(false);
            }, 2000); // 3 seconds then hide
            return () => clearTimeout(timer);
        }
    }, [isMinimized]);


    const toggleMinimize = () => {
        setIsMinimized((prev) => !prev);
    };

    const handleMouseEnter = () => {
        if (isMinimized) {
            setShowFloatingText(true);
        }
    };

    const handleMouseLeave = () => {
        if (isMinimized) {
            setShowFloatingText(false);
        }
    };
        

    return (
        <div className="flex flex-col items-center space-y-8 mx-10 bg-base-100 min-h-screen">
            <div className='relative w-full flex flex-col justify-between'>
                <h1 className="text-4xl text-primary font-bold align-middle text-center neon-text">Compare Arts</h1>
                <p className="mt-20 text-center text-secondary text-neon"> Select two arts to compare them side by side.</p>
                {/* Minimize button */}
                <button 
                onClick={toggleMinimize}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave} 
                className="btn text-secondary border border-primary hover:bg-primary hover:text-base-100 absolute top-0 right-0 mb-5">
                    {isMinimized ? (
                        <span><FontAwesomeIcon icon={faCaretDown} className="text-xl" /></span>
                    ) : (
                        <span><FontAwesomeIcon icon={faCaretUp} className="text-xl" /></span>
                    )}
                </button>

                {/* Floating text */}
                {showFloatingText && (
                    <div className="absolute top-0 right-0 mt-12 mr-5 bg-transparent text-secondary text-neon p-2 shadow-lg">
                        Click the caret to see the selected arts
                    </div>
                )}

                {/* Horizontally scrollable Compare list */}
                {!isMinimized && (
                    <div className="flex overflow-x-auto py-4 space-x-6 w-full items-center justify-center scrollbar-hide">
                        {collection.length === 0 ? (
                            <div className="mt-50 align-text-bottom text-center text-secondary">
                                No added Art yet to be compared.
                            </div>
                        ) : (
                            collection.map((art: any) => (
                                <div 
                                    key={art?.artID} 
                                    className="min-w-[300px] max-w-[300px] flex-shrink-0 flex flex-col justify-between active:border hover:border-primary rounded-lg p-4">
                                    <div className="flex flex-grow">
                                        <ArtCard
                                            source={art?.source}
                                            artID={art?.artID}
                                            imgURL={art?.imgURL}
                                            altText={art?.altText}
                                            title={art?.title}
                                            artist={art?.artist}
                                            showAddButton={false}
                                            showRemoveButton={true}
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
                                        showAddButton={false}
                                        showRemoveButton={true}
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