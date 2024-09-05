

import React from 'react';
import {Col, Card, Button} from 'react-bootstrap';
import Link from 'next/link';

import { useArtContext } from '@/components/useArtContext';


interface ArtCardProps {
    source: string;
    artID: string;
    imgURL: string;
    altText: string;
    title: string;
    artist: string;
    showAddButton: boolean;
    showRemoveButton: boolean;
}

export default function ArtCard({source, artID, imgURL, altText, title, artist, showAddButton, showRemoveButton}: ArtCardProps){

   
    let artDetailsURL= null;
    if (source == 'CAM'){
        artDetailsURL = `/artdetailsCAM/${artID}`;
    }
    else if (source == 'HAM'){
        artDetailsURL = `/artdetailsHAM/${artID}`;
    }
    else{
        artDetailsURL = '/';
    }

    const { collection, addToCollection, removeFromCollection } = useArtContext();
    // event handler for adding art to collection
    const handleAddToCollection = () => {
        
        if (showAddButton){
            addToCollection({source, artID, imgURL, altText, title, artist});
            //console.log('collection: ', collection);
            alert('Added to collection!');
        }
        
    }

    const handleRemoveFromCollection = () => {
        console.log('remove from collection the id: ', artID);
        removeFromCollection(artID);
    }
    
    
    return(
        <Col 
        key= {artID}
        className='w-2/3 rounded mx-auto flex-col align-items-center justify-content-center text-center'>

            <Link 
            href={artDetailsURL} 
            target="_blank">
                <Card className="m-3">
                    <Card.Img variant="top" src={imgURL} alt={altText} className="mx-auto rounded-lg border-4 border-custom-pearl hover:border-custom-pink"/>
                    <Card.Body className="pt-5 pb-2 text-center">
                        <Card.Title className='text-2xl'>{title}</Card.Title>
                        <Card.Text className='text-lg'>{artist}</Card.Text>
                    </Card.Body>
                </Card>
            </Link>
            
            {/*Conditionally render the Add to Collection button based on showAddButton*/}
            {showAddButton &&(
                <Button
                variant="primary"
                className="mx-auto mb-10 bg-custom-pearl text-custom-neon-blue font-bold text-sm py-2 px-2 rounded hover:text-custom-pearl hover:bg-custom-pink" 
                onClick={handleAddToCollection}>
                    Add to Collection
                </Button>
                
            )}

            {/*Conditionally render the Add to Collection button based on showAddButton*/}
            {showRemoveButton &&(
                <Button 
                variant="primary" 
                className="mx-auto className='mb-10' bg-custom-pearl text-custom-neon-blue font-bold text-sm py-2 px-2 rounded hover:text-custom-pearl hover:bg-custom-pink" 
                onClick={handleRemoveFromCollection}>
                    Remove from Collection
                </Button>
                
            )}


        </Col>
    )
}