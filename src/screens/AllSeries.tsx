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
  ActivityIndicator
} from 'react-native';

//React
import React,
{
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
import SeriesDetail from './SeriesDetail';
import EpisodeDetail from './EpisodeDetail';

//Styling
import styles from '../styles/appStyles';

//Redux
import { store } from "../redux";
import { connect } from "react-redux";
import { AppState } from '../redux/reducers/appReducer';
import * as AppActions from "../redux/actions/appActions";

//if there is a serch still running to avoid trigger other search
var searchIsRunning = false;
var hasPenddingSearch = false;

//tells if page is still loading data
var loading = true;

//Main Functional Component
const AllSeries: React.FC<ReduxType> = ({
  favoriteSeriesIds,
}) => {
  //hold series cards of current page
  const [series, setSeries] = useState<CardModel[]>([]);

  //Current page shown
  const [currentPage, setCurrentPage] = useState(1);

  //Total number of pages
  const [maxPage, setMaxPage] = useState(1);

  //Term to be search
  const [searchTerm, setSearchTerm] = useState('');

  //updates the screen if updateSwitch changes
  const [updateSwitch, setUpdateSwitch] = useState(false);

  //Counts the total number of pages and load series for the current page cards when screen is loaded
  useEffect(() => {
    countPages();
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
    store.dispatch(AppActions.setShowSeriesDetail(true));
    store.dispatch(AppActions.setShowEpisodeDetail(false));
  }

  //Counts the total number of pages using Binary Search logic
  const countPages = async () => {
    Services.countPages().then((p)=>{
      setMaxPage(p);
      getAllSeries();
    })
  };

  //Load series cards for the current page
  const getAllSeries = async () => {
    loading = true;
    setUpdateSwitch(!updateSwitch);
    Services.getCardModelsByPage(currentPage).then((result) => {
      loading = false;
      setSeries(result);
    })    
  };

  //Load series cards by term changes
  const loadSeriesByName = async () => {
    if (searchTerm.trim().length > 0) {
      if (searchIsRunning) {
        hasPenddingSearch = true;
      } else {
        hasPenddingSearch = false;
        searchIsRunning = true;
        Services.searchCardModelsByName(searchTerm.trim()).then((result)=>{
          searchIsRunning = false;
          setSeries(result); 
        })
      }
    } else {
      hasPenddingSearch = false;
      searchIsRunning = false;
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
    {(loading || searchIsRunning ) && ( <ActivityIndicator size="large" />)}
          <ScrollView contentContainerStyle={styles.scrollView} scrollEventThrottle={16}>
            {series.map((serie, i) => (
              <Card cardModel={serie} key={i} onPress={() => onSerieclick(serie)} />
            ))}
          </ScrollView>
          {getPaginationView()}
          <SeriesDetail />
          <EpisodeDetail />
        </View>
      )}
    </View>
  );
};

const mapStateToProps = (appState: AppState) => {
  return (
    {
      favoriteSeriesIds: appState.favoriteSeriesIds,
    }
  )
};

type ReduxType = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(AllSeries);