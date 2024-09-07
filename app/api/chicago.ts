import { throttle } from 'lodash';


const ART_INSTITUTE_CHICAGO_API_URL = process.env.NEXT_PUBLIC_ART_INSTITUTE_CHICAGO_BASE_API_URL as string;



// Define types for the response data structure
export interface ArtDataCAM {
  id: string;
  title: string;
  artist_title: string;
  image_id: string;
  web_url: string;
}

interface ChicagoApiResponse<T> {
  data: T[];
}


// Throttle function to limit the number of API calls
const chicago_json = throttle(async (endpoint: string): Promise<ChicagoApiResponse<ArtDataCAM>> => {
  // API url
  const url = `${ART_INSTITUTE_CHICAGO_API_URL}${endpoint}`;

  try {
    // Fetch data from API
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Fetch error. Error loading ${endpoint} (${response.status})`);
    }
    // Convert response to JSON
    const data: ChicagoApiResponse<ArtDataCAM> = await response.json();
    return data;
  } catch (error: any) {
    console.error('Chicago Art Museum API request error: ', error.message);
    throw error;
  }
}, 1000); // Limit to 1 call per second

// Fields to be retrieved from the API
const fields = ['id', 'title', 'artist_title', 'image_id', 'web_url'];

/**
 * Function to search for art pieces in Chicago Art Museum
 * @param query The search query string
 * @returns The JSON data from the API
 */
export const searchDataCAM = async (query: string): Promise<ChicagoApiResponse<ArtDataCAM>> => {
  const endpoint = `search?q=${query}&fields=${fields.join(',')}`;
  // Call the throttle function
  const response = await chicago_json(endpoint);
  return response;
}

/**
 * Function to get the image URL of an art piece
 * @param id The image ID
 * @returns The URL of the image
 */
export const imgURLCAM = (id: string): string =>
  `https://www.artic.edu/iiif/2/${id}/full/350,/0/default.jpg`; // The 350 is width

/**
 * Function to get art details by ID from Chicago Art Museum
 * @param id The artwork ID
 * @returns The JSON data from the API
 */
export const getArtDetailsCAM = async (id: string): Promise<ChicagoApiResponse<ArtDataCAM>> => {
  // API url
  const url = `https://api.artic.edu/api/v1/artworks/${id}/manifest.json`;


  try {
    // Fetch data from API
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Fetch error. Error loading ${id} (${response.status})`);
    }
    // Convert response to JSON
    const data: ChicagoApiResponse<ArtDataCAM> = await response.json();
    return data;
  } catch (error: any) {
    console.error('Chicago Art Museum API request error: ', error.message);
    throw error;
  }
}
