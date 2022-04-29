/**
 * AllSeries.tsx
 * Renders the screen that shows all series cards
 */

//React-Native
import {
  ScrollView,
  View,
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


//Components
import Card from '../components/Card';

//Screens
import FavoriteSeriesDetail from './FavoriteSeriesDetail';
import FavoriteEpisodeDetail from './FavoriteEpisodeDetail';

//Styling
import styles from '../styles/appStyles';

//Redux
import { store } from "../redux";
import { connect } from "react-redux";
import { AppState } from '../redux/reducers/appReducer';
import * as AppActions from "../redux/actions/appActions";

//Main Functional Component
const FavoriteSeries: React.FC<ReduxType> = ({
  favoriteSeriesIds
}) => {
  //hold favorite series cards
  const [series, setSeries] = useState<CardModel[]>([]);
  
  //Loads favorites series Ids from local storage when screen is loaded
  useEffect(() => {
    const load = async () => {
      setSeries(await Services.loadFavoriteSeries());
    }
    load();    
  }, []);

  //Loads favorites series Ids from local storage when screen is loaded
  useEffect(() => {
    const load = async () => {
      setSeries(await Services.getCardModels(favoriteSeriesIds));
    }
    load();    
  }, [favoriteSeriesIds]);

  const onSeriesClick = (serie: CardModel) => {
    store.dispatch(AppActions.setFavoriteSelectedSerieId(serie.id));
    store.dispatch(AppActions.setFavoriteShowSeriesDetail(true));
    store.dispatch(AppActions.setFavoriteShowEpisodeDetail(false));
  }

  return (
    <View style={{ ...styles.container }}>
      {Object.keys(series).length > 0 && (
        <View style={styles.content}>
          <ScrollView contentContainerStyle={styles.scrollView} scrollEventThrottle={16}>
            {series.map((serie, i) => (
              <Card cardModel={serie} key={i} onPress={() => onSeriesClick(serie)} />
            ))}
          </ScrollView>
          <FavoriteSeriesDetail />
          <FavoriteEpisodeDetail />
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

export default connect(mapStateToProps)(FavoriteSeries);