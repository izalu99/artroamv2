const HARVARD_ART_MUSEUMS_API_URL = process.env.NEXT_PUBLIC_HARVARD_ART_MUSEUMS_BASE_API_URL as string;
const HARVARD_API_KEY = process.env.NEXT_PUBLIC_HARVARD_API_KEY as string;

import { throttle } from 'lodash';

// Define types for the response data structure
export interface ArtDataHAM {
  id: string;
  title: string;
  people?: { name: string }[];
  images?: { url: string }[];
}

interface HarvardApiResponse<T> {
  records: T[];
}

// Throttle function to limit the number of API calls
const json = throttle(async (endpoint: string): Promise<HarvardApiResponse<ArtDataHAM>> => {
  if (!HARVARD_API_KEY) {
    throw new Error('API key is missing');
  }
  const url = `${HARVARD_ART_MUSEUMS_API_URL}${endpoint}&apikey=${HARVARD_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Fetch error. Error loading ${endpoint} (${response.status})`);
    }
    const data: HarvardApiResponse<ArtDataHAM> = await response.json();
    return data;
  } catch (error) {
    console.error('Harvard Art Museum API request error: ', error);
    throw error;
  }
}, 1000); // Limit to 1 call per second

/**
 * Function to search for art pieces in Harvard Art Museums
 * @param query The search query string
 * @returns The JSON data from the API
 */
export const searchDataHAM = async (query: string): Promise<HarvardApiResponse<ArtDataHAM>> => {
  const endpoint = `object?q=${query}`;
  const response = await json(endpoint);
  return response;
}

/**
 * Function to get the image URL of an art piece
 * @param url The base URL of the image
 * @returns The full URL of the image with width parameter
 */
export const imgURLHAM = (url: string): string => `${url}/`;
/**
 * Helper function to get the artist's name
 * @param art The art object containing artist information
 * @returns The artist's name or 'Unknown artist'
 */
export const getArtistName = (art: ArtDataHAM): string => {
  if (art.people && art.people.length > 0) {
    return art.people[0].name;
  }
  return 'Unknown artist';
}

/**
 * Function to get details of the art piece from Harvard by ID
 * @param id The art piece ID
 * @returns The JSON data from the API
 */
export const getArtDetailsHAM = async (id: string): Promise<HarvardApiResponse<ArtDataHAM>> => {
  try {
    const response = await json(`object?q=${id}`);
    return response;
  } catch (error) {
    console.error('Harvard Art Museum API request error: ', error);
    throw error;
  }
}
