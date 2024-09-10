'use client';
import {Card, Button} from 'react-bootstrap';
import Link from 'next/link';

const CamHamCard = () => {
    return (
        <div className="m-10 flex flex-row space-x-5 md:space-x-10">
            <Link 
            href={"https://www.artic.edu/"} 
            target="_blank"
            className='group'>
                <Card className="h-40 m-w-40 lg:h-40 bg-neutral rounded-lg hover:border-2 hover:border-primary relative">
                    <Card.Body className="pt-5 pb-2 text-center">
                        <Card.Title className='text-md md:text-2xl bg-clip-text text-transparent bg-gradient-to-br from-neon-magenta via-neon-cyan to-neon-pink"'>Art Institute of Chicago</Card.Title>
                        <Card.Text className='p-2 md:pt-8 text-sm md:text-md text-secondary'>Find more collections or Arts and Events.</Card.Text>
                    </Card.Body>
                    <div className="text-xs  md:text-sm note absolute -top-10 md:-top-8 right-0 text-primary p-2 rounded hidden group-hover:block">
                        Click to see their website
                    </div>
                </Card>
            </Link>

            <Link 
            href={"https://www.harvardartmuseums.org/"} 
            target="_blank"
            className='group'>
                <Card className="h-40 m-w-40 lg:h-40 bg-neutral rounded-lg hover:border-2 hover:border-primary relative">
                    <Card.Body className="pt-5 pb-2 text-center">
                        <Card.Title className='text-md md:text-2xl bg-clip-text text-transparent bg-gradient-to-br from-neon-magenta via-neon-cyan to-neon-pink"'>Harvard Art Museum</Card.Title>
                        <Card.Text className='p-2 md:pt-8 text-sm md:text-md text-secondary'>Find more collections or Arts and Events.</Card.Text>
                    </Card.Body>
                    <div className="text-xs md:text-sm note absolute -top-10 md:-top-8 right-0 text-primary p-2 rounded hidden group-hover:block">
                        Click to see their website
                    </div>
                </Card>
            </Link>    
        </div>
    )
}

export default CamHamCard;