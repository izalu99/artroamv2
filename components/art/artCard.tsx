

import React, { useState } from 'react';
import {Col, Card, Button} from 'react-bootstrap';
import Link from 'next/link';


import { useArtContext } from '@/components/useArtContext';



export interface ArtCardProps {
    source: string;
    artID: string;
    imgURL: string;
    altText: string;
    title: string;
    artist: string;
}

export default function ArtCard({source, artID, imgURL, altText, title, artist}: ArtCardProps){


    

    let artDetailsURL= null;
    if (source == 'CAM'){
        const modifiedTitle = title.replace(/ /g, '-').toLowerCase();
        artDetailsURL = `${process.env.NEXT_PUBLIC_ART_INSTITUTE_CHICAGO_BASE_DETAILS_URL}${artID}/${modifiedTitle}`;
    }
    else if (source == 'HAM'){
        artDetailsURL = `${process.env.NEXT_PUBLIC_HARVARD_ART_MUSEUMS_BASE_DETAILS_URL}${artID}`;
    }
    else{
        artDetailsURL = '/';
    }

    const { addToCollection, removeFromCollection, collection } = useArtContext();


    // find out if the art piece is already in the collection
    const artInCollection = collection.find((item) => item.artID === artID);
    
    // event handler for adding art to collection
    const handleAddToCollection = () => {
        const artPiece = {source, artID, imgURL, altText, title, artist};
        addToCollection(artPiece); 
    }

    const handleRemoveFromCollection = () => {
        removeFromCollection(artID);
    }
    
    
    return(
        <Col 
        key= {artID}
        className='w-2/3 mx-auto flex-col align-items-center justify-content-center text-center'>

            <Link 
            href={artDetailsURL} 
            target="_blank"
            className='group'>
                <Card className="bg-neutral rounded-lg hover:border-2 hover:border-primary relative shadow-lg">
                    <Card.Img variant="top" src={imgURL} alt={altText} className="mx-auto rounded-t-lg"/>
                    <Card.Body className="pt-5 pb-2 text-center">
                        <Card.Title className='text-sm md:text-xl lg:text-2xl text-primary'>{title}</Card.Title>
                        <Card.Text className='text-xs md:text-sm lg:text-md text-secondary'>{artist}</Card.Text>
                    </Card.Body>
                    <div className="note absolute top-0 right-0 bg-neutral-900 text-xs sm:text-sm md:text-md lg:text-lg text-primary p-2 rounded hidden group-hover:block">
                        Click to see more details
                    </div>
                </Card>
            </Link>            
            {/*Conditionally render the Add to Collection button based on showAddButton*/}
            {!artInCollection && (
                <Button
                className="mx-auto mt-3 mb-10 font-bold text-xs sm:text-sm md:text-md lg:text-lg py-2 px-2 text-secondary border-0 bg-transparent p-2 rounded-lg hover:text-primary hover:bg-transparent" 
                onClick={handleAddToCollection}>
                    Add to Compare List
                </Button>
                
            )}

            {/*Conditionally render the Add to Compare list button based on showAddButton*/}
            {artInCollection && (
                <Button 
                className="mx-auto mt-3 mb-10 font-bold text-xs sm:text-sm md:text-md lg:text-lg py-2 px-2 text-secondary border-0 bg-transparent p-2 rounded-lg hover:text-primary hover:bg-transparent" 
                onClick={handleRemoveFromCollection}>
                    Remove from Compare List
                </Button>
                
            )}


        </Col>
    )
}