/**
 * services.ts
 * Privides functions to acess the server API
 */

//Network
import axios, { AxiosResponse } from 'axios';

//Entities
import CardModel from '../model/CardModel';

const BASE_URL = "https://api.tvmaze.com/";
const SHOW_INDEX_URL = BASE_URL + "shows";           //URL: /shows?page=:num
const SHOW_SEARCH_URL = BASE_URL + "search/shows";   //URL: /search/shows?q=:query

// This function uses binary search to found the total number of pages
export const countPages = async () => {
    let first = 1;
    let last = 1;
    let lastExceededMax = false;
    let found = false;
    while (!found) {
        try {
            const data = await fetchAllSeries(last);
            const diff = last - first;
            if (data.length === 0) {
                //last is above max page
                lastExceededMax = true;
                last = last - (diff / 2);
            } else {
                //last is below max page
                if (lastExceededMax) {
                    // last has already exceeded the max page
                    if (Math.abs(diff) == 1) {
                        //last is addjacent to firstPage, so this is the max page.
                        found = true;
                    } else {
                        //narrow the range to half of the previous range
                        first = last;
                        last = last + (diff / 2);
                    }
                } else {
                    // last has not exceeded the max page yet, so just double its value
                    first = last;
                    last = last * 2;
                }
            }
        } catch (error) {
            console.log('countPages.error:' + (error as Error).message);
            found = true;
            return last - 1;
        }
    }
    return last - 1;
};

export const fetchAllSeries = async (page: number = 1) => {
    try {
        const { data, status } = await axios.get<CardModel[]>(
            `${SHOW_INDEX_URL}`, {
            params: {
                page: page,
            },
            headers: {
                Accept: 'application/json',
            },
        });
        return data;
    } catch (error) {
        return [];
    }
};