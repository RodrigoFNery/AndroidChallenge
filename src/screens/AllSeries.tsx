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

//Styling
import styles from '../styles/appStyles';

const AllSeries = () => {
  const [series, setSeries] = useState<CardModel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const countPages = async () => {
    const p = await Services.countPages();
    setMaxPage(p);
  };

  const getAllSeries = async () => {
    setSeries(await Services.fetchAllSeries(currentPage));
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
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollView} >
            {series.map((serie, i) => (
              <Card cardModel={serie} key={i} />
            ))}
          </ScrollView>
          <Pagination currentPage={currentPage} minPage={1} maxPage={maxPage} goBackward={() => getPreviousPage()} goForward={() => getNextPage()} goFirst={() => getFirstPage()} goLast={() => getLastPage()} />
        </View>
      )}
    </>
  );
};

export default memo(AllSeries);