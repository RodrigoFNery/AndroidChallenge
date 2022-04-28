/**
 * AllSeries.tsx
 * Renders the screen that shows all series cards
 */

//React-Native
import {
  ScrollView,
  View,
  Image,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TouchableOpacity,
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

//if there is a serch still running to avoid trigger other search
var searchIsRunning = false;
var hasPenddingSearch = false;

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

  //Term to be search
  const [searchTerm, setSearchTerm] = useState('');

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

  //Resets searchIsRunning variable when search finishes, then run pendding search if exist
  useEffect(() => {
    searchIsRunning = false;
    if (hasPenddingSearch) {
      hasPenddingSearch = false;
      loadSeriesByName();
    }
  }, [series]);

  //Loads series cards by name when searchTerm changes
  useEffect(() => {
    loadSeriesByName();
  }, [searchTerm]);

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

  //Load series cards by term changes
  const loadSeriesByName = async () => {
    if (searchTerm.trim().length > 0) {
      if (searchIsRunning) {
        hasPenddingSearch = true;
      } else {
        hasPenddingSearch = false;
        searchIsRunning = true;
        setSeries(await Services.searchSeriesByName(searchTerm.trim()));
      }
    } else {
      hasPenddingSearch = false;
      searchIsRunning = true;
      getAllSeries();
    }
  };

  const onSearchChanged = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
    const value = e.nativeEvent.text;
    setSearchTerm(value);
  }

  const onCancelCkick = () => {
    setSearchTerm('');
  }

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

  const getSearchInputView = () => {
    return (
      <View style={{ ...styles.searchContainer, margin: 10 }}>
        <Image
          style={styles.inputIcon}
          source={require('../images/search_icon.png')}
        />
        <TextInput
          style={{ ...styles.textInput, flex:1 }}
          placeholder={translate("Type_a_text_to_search")}
          underlineColorAndroid='transparent'
          value={searchTerm}
          autoCapitalize='none'
          selectTextOnFocus={true}
          onChange={onSearchChanged}
        />
        <TouchableOpacity onPress={() => onCancelCkick()}>
          <Image
            style={styles.inputIcon}
            source={require('../images/cancel_icon.png')}
          />
        </TouchableOpacity>
      </View>
    )
  }

  const getPaginationView = () => {
    if (searchTerm.trim().length == 0) {
      return (
        <Pagination currentPage={currentPage} minPage={1} maxPage={maxPage} goBackward={() => onPreviousPageClick()} goForward={() => onNextPageClick()} goFirst={() => onFirstPageClick()} goLast={() => onLastPageClick()} />
      );
    }
    return (<></>);
  }
  return (
    <View style={{ ...styles.container }}>
      {getSearchInputView()}
      {Object.keys(series).length > 0 && (
        <View style={styles.content}>
          <ScrollView contentContainerStyle={styles.scrollView} scrollEventThrottle={16}>
            {series.map((serie, i) => (
              <Card cardModel={serie} key={i} onPress={() => onSerieclick(serie)} />
            ))}
          </ScrollView>
          {getPaginationView()}
          <SerieDetail />
          <EpisodeDetail />
        </View>
      )}
    </View>
  );
};

export default memo(AllSeries);