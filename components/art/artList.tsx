import { imgURLCAM } from "@/app/api/chicago";
import { imgURLHAM, getArtistName } from "@/app/api/harvard";
import ArtCard from "@/components/art/artCard";
import { Row, Col, Container } from 'react-bootstrap';

interface ArtListProps {
  results: any[];
  loading: boolean;
}

const ArtList = ({ results, loading }: ArtListProps) => {
    console.log('results:', results);
    return(
    <Container>
        <div>
            {loading && <p>Loading...</p>}
            {results.length === 0 && !loading && <p>No results found.</p>}
        </div>
        <Row className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {results.map((art:any) => (
                <Col key={art.id}>
                    {art.source == 'CAM' && (
                        <ArtCard
                            source = {art.source}
                            key={art.id}
                            artID={art.id}
                            imgURL={imgURLCAM(art.image_id)}
                            altText={art.thumbnail?.alt_text}
                            title={art.title}
                            artist={art.artist_title}
                            showAddButton={true} // show the Add to Collection button
                            showRemoveButton={false}
                        />    
                    )}

                    {art.source == 'HAM' && (
                        
                        <ArtCard
                            source = {art.source}
                            key={art.id}
                            artID={art.id}
                            imgURL={imgURLHAM(art.primaryimageurl)}
                            altText={art.title}
                            title={art.title}
                            artist={getArtistName(art)}
                            showAddButton={true} // show the Add to Collection button
                            showRemoveButton={false}
                        />
                    )}
                </Col>
            ))}     
        </Row>
    </Container>
    );
}

export default ArtList;