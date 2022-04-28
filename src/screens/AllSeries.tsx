/**
 * AllSeries.tsx
 * Renders the screen that shows all series cards
 */

import React, { memo, useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';

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

//Styling
import styles from '../styles/appStyles';

//Redux
import { store } from "../redux";
import * as AppActions from "../redux/actions/appActions";

const AllSeries = () => {
  const [series, setSeries] = useState<CardModel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [modal, setModal] = useState(false)

  const onclick = (serie: CardModel) => {
    store.dispatch(AppActions.setSelectedSerieId(serie.id));
    setModal(true);
  }

  const countPages = async () => {
    const p = await Services.countPages();
    setMaxPage(p);
  };

  const getAllSeries = async () => {
    setSeries(await Services.getAllSeries(currentPage));
  };

  useEffect(() => {
    countPages().then(() => {
      getAllSeries();
    })
  }, []);

  useEffect(() => {
    getAllSeries();
  }, [currentPage]);


  const getFirstPage = async () => {
    if (currentPage > 1) {
      setCurrentPage(1);
    }
  };

  const getPreviousPage = async () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getNextPage = async () => {
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getLastPage = async () => {
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
              <Card cardModel={serie} key={i} onPress={() => onclick(serie)} />
            ))}
          </ScrollView>
          <Pagination currentPage={currentPage} minPage={1} maxPage={maxPage} goBackward={() => getPreviousPage()} goForward={() => getNextPage()} goFirst={() => getFirstPage()} goLast={() => getLastPage()} />
          <SerieDetail show={modal} onClose={() => setModal(false)} />
        </View>
      )}
    </>
  );
};

export default memo(AllSeries);