/**
 * AllSeries.tsx
 * Renders the screen that shows all series cards
 */

//React-Native
import {
  ScrollView,
  View
} from 'react-native';

//React
import React,
{
  memo,
  useState,
  useEffect
} from 'react';

//Entities
import CardModel from '../model/CardModel';

//Services
import *  as Services from '../api/services';

//Translation
import { translate } from '../locales';

//Components
import Card from '../components/Card';
import Pagination from '../components/Pagination';

//Screens
import SerieDetail from './SerieDetail';
import EpisodeDetail from './EpisodeDetail';

//Styling
import styles from '../styles/appStyles';

//Redux
import { store } from "../redux";
import * as AppActions from "../redux/actions/appActions";

//Main Functional Component
const AllSeries = () => {
  //Search keys
  const KEYS_TO_FILTERS = ['firstName', 'lastName'];

  //hold series cards of current page
  const [series, setSeries] = useState<CardModel[]>([]);
  
  //Current page shown
  const [currentPage, setCurrentPage] = useState(1);
  
  //Total number of pages
  const [maxPage, setMaxPage] = useState(1);

  const onSerieclick = (serie: CardModel) => {
    store.dispatch(AppActions.setSelectedSerieId(serie.id));
    store.dispatch(AppActions.setShowSerieDetail(true));
    store.dispatch(AppActions.setShowEpisodeDetail(false));
  }

  //Counts the total number of pages using Binary Search logic
  const countPages = async () => {
    const p = await Services.countPages();
    setMaxPage(p);
  };

  //Load series cards for the current page
  const getAllSeries = async () => {
    setSeries(await Services.getAllSeries(currentPage));
  };

  //Counts the total number of pages and load series for the current page cards when screen is loaded
  useEffect(() => {
    countPages().then(() => {
      getAllSeries();
    })
  }, []);

  //Loads series cards for the current page when currentPage changes
  useEffect(() => {
    getAllSeries();
  }, [currentPage]);


  const onFirstPageClick = async () => {
    if (currentPage > 1) {
      setCurrentPage(1);
    }
  };

  const onPreviousPageClick = async () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onNextPageClick = async () => {
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const onLastPageClick = async () => {
    if (currentPage < maxPage) {
      setCurrentPage(maxPage);
    }
  };

  return (
    <>
      {Object.keys(series).length > 0 && (
        <View style={styles.content}>
          <ScrollView contentContainerStyle={styles.scrollView} scrollEventThrottle={16}>
            {series.map((serie, i) => (
              <Card cardModel={serie} key={i} onPress={() => onSerieclick(serie)} />
            ))}
          </ScrollView>
          <Pagination currentPage={currentPage} minPage={1} maxPage={maxPage} goBackward={() => onPreviousPageClick()} goForward={() => onNextPageClick()} goFirst={() => onFirstPageClick()} goLast={() => onLastPageClick()} />
          <SerieDetail />
          <EpisodeDetail />
        </View>
      )}
    </>
  );
};

export default memo(AllSeries);