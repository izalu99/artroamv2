
import { useArtContext } from "../useArtContext";
import ArtCard from "../art/artCard";
import { imgURLCAM } from "@/app/api/chicago";
import { imgURLHAM } from "@/app/api/harvard";


const RandomArt = () => {


    const { collection } = useArtContext();
    const art = collection[Math.floor(Math.random() * collection.length)];

    return (
        <div className="flex flex-col items-center space-y-8 mx-10 bg-base-100 min-h-screen">
            <div className='relative w-full flex flex-col justify-between'>
                <h1 className="text-4xl bg-gradient-to-r bg-clip-text font-bold align-middle text-center from-neon-cyan via-neon-magenta-500 to-neon-cyan text-transparent">Random Art</h1>
                <p className="mt-20 text-center text-secondary text-neon"> Here is a random art:</p>
            </div>
            <div className="flex flex-col items-center space-y-8">
            <ArtCard
                source = {art.source}
                key={art.id}
                artID={art.id}
                imgURL={art.image_id ? imgURLCAM(art.image_id) : imgURLHAM(art.primaryimageurl)}
                altText={art.thumbnail?.alt_text}
                title={art.title}
                artist={art.artist_title}
            />   
            </div>
        </div>
    );

};

export default RandomArt;