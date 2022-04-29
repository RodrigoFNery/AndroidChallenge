/**
 * services.ts
 * Privides functions to acess the server API
 */

//Network
import axios, { AxiosResponse } from 'axios';
import CardModel from '../model/CardModel';
import EpisodeModel from '../model/EpisodeModel';
import SeasonModel from '../model/SeasonModel';

import AsyncStorage from "@react-native-community/async-storage";

//Entities
import SeriesModel from '../model/SeriesModel';

const BASE_URL = "https://api.tvmaze.com/";
const SHOW_INDEX_URL = BASE_URL + "shows";                  //URL: /shows?page=:num
const SHOW_MAIN_INFO_URL = BASE_URL + "shows/";             //URL: /shows/:id

const SHOW_SEASONS_URL = BASE_URL + "shows/";
const SHOW_SEASONS_SUFIX = "/seasons";                     //URL: /shows/:id/seasons

const SHOW_EPISODES_URL = BASE_URL + "shows/";
const SHOW_EPISODES_SUFIX = "/episodes";                          //URL: /shows/:id/episodes

const SHOW_EPISODE_BY_ID_URL = BASE_URL + "episodes/";             //URL: /episodes/:id
// const SHOW_EPISODES__BY_ID_SUFIX = "/episodes";                          //URL: /episodes/:id

const SHOW_SEARCH_URL = BASE_URL + "search/shows";          //URL: /search/shows?q=:query

//favorite series storage key
const FAVORITE_SERIES = 'FAVORITE_SERIES';

//The interface for Search by name resultset
interface SearchResultSet {
    score: number;
    show: CardModel;
}

// This function uses binary search to found the total number of pages
export const countPages = async () => {
    let first = 1;
    let last = 1;
    let lastExceededMax = false;
    let found = false;
    while (!found) {
        try {
            const data = await getCardModelsByPage(last);
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

export const getCardModelsByPage = async (page: number = 1) => {
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

export const searchCardModelsByName = async (name: string = '') => {
    try {
        const { data, status } = await axios.get<SearchResultSet[]>(
            `${SHOW_SEARCH_URL}`, {
            params: {
                q: name,
            },
            headers: {
                Accept: 'application/json',
            },
        });
        if (data) {
            const result: CardModel[] = [];
            data.map((entry, key) => {
                const cardModel: CardModel = entry.show;
                result.push(cardModel);
            })
            return result;
        } else {
            return [];
        }
    } catch (error) {
        return [];
    }
};

export const getSeriesModelById = async (serieId: number) => {
    try {
        const { data, status } = await axios.get<SeriesModel>(
            `${SHOW_MAIN_INFO_URL}` + serieId, {
            headers: {
                Accept: 'application/json',
            },
        });
        return data;
    } catch (error) {
        console.log('getMainInfo.error:' + JSON.stringify(error))
        return;
    }
};


export const getSeasonModelsBySeriesId = async (serieId: number) => {
    try {
        const { data, status } = await axios.get<SeasonModel[]>(
            `${SHOW_SEASONS_URL}` + serieId + `${SHOW_SEASONS_SUFIX}`, {
            headers: {
                Accept: 'application/json',
            },
        });
        return data;
    } catch (error) {
        return [];
    }
};

export const getEpisodeModelsBySeriesId = async (serieId: number) => {
    try {
        const { data, status } = await axios.get<EpisodeModel[]>(
            `${SHOW_EPISODES_URL}` + serieId + `${SHOW_EPISODES_SUFIX}`, {
            headers: {
                Accept: 'application/json',
            },
        });
        return data;
    } catch (error) {
        return [];
    }
};

export const getEpisodeModelById = async (episodeId: number) => {
    try {
        const { data, status } = await axios.get<EpisodeModel>(
            `${SHOW_EPISODE_BY_ID_URL}` + episodeId, {
            headers: {
                Accept: 'application/json',
            },
        });
        return data;
    } catch (error) {
        return;
    }
};

//Load favorite series from local storage
export const getCardModels = async (seriesIds: string[]) => {
    let newSeries: CardModel[] = [];
    try {
        if (seriesIds.length > 0) {
            await asyncForEach(seriesIds, async (id: string) => {
                const seriesModel: SeriesModel | undefined = await getSeriesModelById(Number.parseInt(id));
                if (seriesModel) {
                    const cardModel: CardModel = {
                        id: seriesModel.id,
                        image: seriesModel.image,
                        name: seriesModel.name,
                    }
                    newSeries.push(cardModel);
                }
            });
        }
    } catch (error) {
        console.log('loadFavoriteSeries.error' + (error as Error).message);
    }
    return newSeries;
}


export const getSeasonsMap = async (serieId: number) => {
    return await createSeasonMap(serieId);
}

const createSeasonMap = async (serieId: number) => {
    const episodes = await getEpisodeModelsBySeriesId(serieId);
    const map = new Map<number, SeasonModel>();
    if (serieId && episodes.length > 0) {
        episodes.map((episode) => {
            if (episode.season) {
                let season = map.get(episode.season);
                let episodeList: EpisodeModel[];
                if (season == undefined) {
                    // create new Epidose array
                    episodeList = [];
                    // create new Season
                    season = {
                        number: episode.season,
                        serieId: serieId,
                        episodes: episodeList,
                    }
                    map.set(episode.season, season);
                }
                //add episode to the Season
                season.episodes.push(episode);
            }
        })
    }
    return map;
}

//Load favorite series Ids from local storage
export const loadFavoriteSeriesIds = async () => {
    let seriesIds: string[] = []
    try {
        const value = await AsyncStorage.getItem(FAVORITE_SERIES);
        if (value !== null) {
            seriesIds = value.split(',');
        }
    } catch (error) {
        console.log('loadFavoriteSeriesIds.error' + (error as Error).message);
    }
    return seriesIds;
}

export const asyncForEach = async (array: any, callback: Function) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }


//Load favorite series from local storage
export const loadFavoriteSeries = async () => {
    let newSeries: CardModel[] = [];
    try {
        const seriesIds: string[] = await loadFavoriteSeriesIds();
        if (seriesIds.length > 0) {
            await asyncForEach(seriesIds, async (id: string) => {
                const seriesModel: SeriesModel | undefined = await getSeriesModelById(Number.parseInt(id));
                if (seriesModel) {
                    const cardModel: CardModel = {
                        id: seriesModel.id,
                        image: seriesModel.image,
                        name: seriesModel.name,
                    }
                    newSeries.push(cardModel);
                }
            });
        }
    } catch (error) {
        console.log('loadFavoriteSeries.error' + (error as Error).message);
    }
    return newSeries;
}

export const saveFavoriteSeries = async (series: CardModel[]) => {
    const seriesIds: string[] = [];
    if (series.length > 0) {
        series.map((serie, key) => {
            seriesIds.push(serie.id.toString());
        })
    }
    saveFavoriteSeriesIds(seriesIds);
}

export const saveFavoriteSeriesIds = async (seriesIds: string[]) => {
    try {
        await AsyncStorage.setItem(FAVORITE_SERIES, seriesIds.join());
    } catch (error) {
        console.log('saveFavoriteSeries.error' + (error as Error).message);
    }
}
