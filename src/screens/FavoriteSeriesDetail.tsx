/**
 * FavoriteFavoriteSeriesDetail.tsx
 * Renders the screen that shows favorite series details
 */

import React, {
  useState,
  useEffect
} from 'react';

import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
  ImageURISource,
  useWindowDimensions,
  Alert,
  Button
} from 'react-native';

// Third part components
import RenderHtml, { HTMLSource } from 'react-native-render-html';
import DropDownPicker from 'react-native-dropdown-picker';

//Entities
import SeasonModel from '../model/SeasonModel';

//Services
import *  as Services from '../api/services';

//Translation
import { translate } from '../locales';

//Styling
import styles from '../styles/appStyles';
import SeriesModel from '../model/SeriesModel';
import { ComponentColors } from '../styles/colors';

//Redux
import { store } from "../redux";
import { connect } from "react-redux";
import { AppState } from '../redux/reducers/appReducer';
import * as AppActions from "../redux/actions/appActions";

const { height } = Dimensions.get('window')

//Season dropbox itens interface
type SeasonDropboxItems = {
  label: string;
  value: number;
}

//Main FunctionalComponent
const FavoriteSeriesDetail: React.FC<ReduxType> = ({
  favoriteSelectedSerieId,
  favoriteShowSeriesDetail,
  favoriteSelectedSeasonNumber,
  favoriteSeriesIds,
}) => {
  //Holds the selected SeriesModel instance
  const [serie, setSerie] = useState<SeriesModel>();

  //Holds the Animation state
  const [state, setState] = useState({
    opacity: new Animated.Value(0),
    container: new Animated.Value(height),
    modal: new Animated.Value(height)
  })

  //Map containing all SeasonModel for the seleted Serie
  const [seasonsMap, setSeasonsMap] = useState<Map<number, SeasonModel>>();

  //Seasons Dropbox values
  const [openSeasonsDropbox, setOpenSeasonsDropbox] = useState(false);
  const [seasonValue, setSeasonValue] = useState<number | null>(null);
  const [seasonItems, setSeasonItems] = useState<SeasonDropboxItems[]>([]);

  //List of episodes for the selected season
  const [episodesList, setEpisodesList] = useState(<></>);

  //load the selected Serie when favoriteSelectedSerieId changes
  useEffect(() => {
    const loadSerie = async (favoriteSelectedSerieId: number) => {
      if (favoriteSelectedSerieId) {
        setSerie(await Services.getSeriesModelById(favoriteSelectedSerieId));
      }
    }
    loadSerie(favoriteSelectedSerieId);
  }, [favoriteSelectedSerieId])

  //create seasonsMap when the SeriesModel instance changes
  useEffect(() => {
    //reset SeasonValue and EpidoseListas the serie has changed
    setSeasonValue(null);
    setEpisodesList(<></>);
    const loadSeasonsMap = async () => {
      if (favoriteSelectedSerieId) {
        setSeasonsMap(await Services.getSeasonsMap(favoriteSelectedSerieId));
      }
    }
    loadSeasonsMap();
  }, [serie])

  //populates populateSeasonsDropbox when seasonsMap changes
  useEffect(() => {
    populateSeasonsDropbox();
    setSeasonValue(favoriteSelectedSeasonNumber);
  }, [seasonsMap])

  // Open/Close this screen when 'show' changes
  useEffect(() => {
    if (favoriteShowSeriesDetail) {
      openModal();
    } else {
      closeModal();
    }
  }, [favoriteShowSeriesDetail])

  //create episodesList when SeasonValue for dropbox changes
  useEffect(() => {
    createEpisodesList();
  }, [seasonValue])

  //Open modal animation
  const openModal = async () => {
    Animated.sequence([
      Animated.timing(state.container, { toValue: 0, duration: 100, useNativeDriver: false }),
      Animated.timing(state.opacity, { toValue: 1, duration: 300, useNativeDriver: false }),
      Animated.spring(state.modal, { toValue: 0, bounciness: 5, useNativeDriver: true })
    ]).start()
  }

  //Close modal animation
  const closeModal = () => {
    Animated.sequence([
      Animated.timing(state.modal, { toValue: height, duration: 250, useNativeDriver: true }),
      Animated.timing(state.opacity, { toValue: 0, duration: 300, useNativeDriver: false }),
      Animated.timing(state.container, { toValue: height, duration: 100, useNativeDriver: false }),
    ]).start()
  }

  const onCloseClick = () => {
    store.dispatch(AppActions.setFavoriteShowSeriesDetail(false));
  }

  const onSeasonSelected = (seasonNumber: number) => {
    store.dispatch(AppActions.setFavoriteSelectedSeasonNumber(seasonNumber));
    setSeasonValue(seasonNumber);
  }

  const removeFromFavorite = (seriesId: number) => {
    const index = favoriteSeriesIds.indexOf(seriesId.toString());
    let newArray = favoriteSeriesIds.slice();
    if (index == -1) {
      newArray.push(seriesId.toString());
    } else {
      newArray = [
        ...newArray.slice(0, index),
        ...newArray.slice(index + 1, newArray.length)
      ]
    }
    store.dispatch(AppActions.setFavoriteSeriesIds(newArray));
    store.dispatch(AppActions.setFavoriteShowSeriesDetail(false));
    Services.saveFavoriteSeriesIds(newArray);
  }

  const populateSeasonsDropbox = () => {
    const items = [];
    if (seasonsMap) {
      for (let [key, value] of seasonsMap) {
        items.push({
          label: translate('Season') + ' ' + value.number,
          value: value.number,
        });
      }
      setSeasonItems(items);
    }
  }

  const imageURISource: ImageURISource = {
    uri: serie ? (serie.image ? serie.image.medium : undefined) : undefined
  }

  const imageSource: ImageURISource = imageURISource.uri == undefined ? require("../images/image-not-found.png") : imageURISource;
  const { width } = useWindowDimensions();

  const htmlSummary: HTMLSource = {
    html: (serie ? serie.summary : "")
  };

  const getSerieView = (serie?: SeriesModel) => {
    if (serie?.genres) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.serieName}>{serie?.name}</Text>
        </View>
      )
    }
    return;
  }

  const getGenresView = (serie?: SeriesModel) => {
    if (serie?.genres) {
      return (<Text style={styles.serieDetails}>({serie.genres.join()})</Text>)
    }
    return;
  }

  const getDaysView = (serie?: SeriesModel) => {
    if (serie?.schedule.days) {
      return (<Text style={styles.serieDetails}>{serie.schedule.days.join()}</Text>)
    }
    return;
  }

  const getTimeView = (serie?: SeriesModel) => {
    if (serie?.schedule.days) {
      return (<Text style={styles.serieDetails}>{serie?.schedule.time}</Text>)
    }
    return;
  }

  const onEpisodeClick = (episodeId: number) => {
    store.dispatch(AppActions.setFavoriteSelectedEpisodeId(episodeId));
    store.dispatch(AppActions.setFavoriteShowEpisodeDetail(true));
  }

  const createEpisodesList = () => {
    if (serie?.genres && seasonValue && seasonsMap) {
      const season = seasonsMap.get(seasonValue);
      if (season) {
        const episodes = season.episodes;
        setEpisodesList(
          <>
            <Text style={{ ...styles.serieDetails, marginTop: 15, margin: 5, textAlign: 'left' }}>{translate('Episodes') + ' - ' + translate('Season') + ' ' + season.number}  </Text>
            {episodes.map(
              (episode, key) => {
                return (
                  <View key={key}>
                    <TouchableOpacity
                      style={{ marginTop: 10 }}
                      onPress={() => onEpisodeClick(episode.id)}>
                      <Text style={{ ...styles.link, marginLeft: 5, textAlign: 'left' }}>{(episode.number) + ' - ' + (episode.name)}  </Text>
                    </TouchableOpacity>
                  </View>
                )
              }
            )}
          </>
        )
      }
    }
  }

  const getHeaderView = (serie?: SeriesModel) => {
    if (serie) {
      const imagePath = favoriteSeriesIds.indexOf(serie.id.toString()) > -1 ? require('../images/heart_full.png') : require('../images/heart_empty.png');
      return (
        <View style={{ ...styles.viewHorizontalCentered, margin: 10 }}>
          <View style={{ flexDirection: 'row', margin: 5 }}>
            <Text style={{ ...styles.serieName }}>{translate('Serie_Detail')}</Text>
          </View>
          <TouchableOpacity onPress={() => onFavoriteCkick(serie.id)}>
            <Image
              style={styles.inputIcon}
              source={imagePath}
            />
          </TouchableOpacity>
        </View>
      )
    }
  }


  const onFavoriteCkick = (seriesId: number) => {
    return Alert.alert(
      translate("Are_your_sure"),
      translate("Remove_this_series_from_favorite"),
      [
        {text: "Yes", onPress: () => {
          removeFromFavorite(seriesId);
        },
      },
      {text: "No",},
      ]
    );
  };

  return (
    <Animated.View
      style={[styles.modalContainer, {
        opacity: state.opacity,
        transform: [
          { translateY: state.container }
        ]
      }]}
    >
      <Animated.View
        style={[styles.modalView, {
          backgroundColor: ComponentColors.LightContentBackground,
          transform: [
            { translateY: state.modal }
          ]
        }]}
      >
        <View style={{ ...styles.container, justifyContent: 'space-between' }}>
          {getHeaderView(serie)}
          <View style={{ ...styles.content, flex: 1 }}>
            <View style={styles.separator} />
            <View style={{ ...styles.viewHorizontalLeft, justifyContent: 'center' }}>
              <View style={{ marginTop: 10, alignItems: 'baseline' }}>
                <Image
                  style={styles.cardImage}
                  source={imageSource}
                />
              </View>
              <View style={{ flex: 1, margin: 5 }}>
                {getSerieView(serie)}
                {getGenresView(serie)}
                {getDaysView(serie)}
                {getTimeView(serie)}
                <View style={{ flex: 1 }}></View>
              </View>
            </View>

            <View style={{ flex: 1 }}>
              <ScrollView contentContainerStyle={{ flexGrow: 1 }} scrollEventThrottle={16}>
                <View style={{ flexDirection: 'row', margin: 5 }}>
                  <Text style={{ ...styles.serieDetails }}>{translate('Summary')}</Text>
                </View>
                <View style={{ ...styles.summaryView }}>
                  <RenderHtml
                    contentWidth={width}
                    source={htmlSummary}
                  />
                </View>
                <DropDownPicker style={{ marginTop: 10 }}
                  placeholder={translate('Select_a_season')}
                  open={openSeasonsDropbox}
                  value={seasonValue}
                  items={seasonItems}
                  setOpen={setOpenSeasonsDropbox}
                  setValue={setSeasonValue}
                  setItems={setSeasonItems}
                  listMode="SCROLLVIEW"
                  onChangeValue={() => onSeasonSelected}
                />
                {episodesList}
              </ScrollView>
            </View>
          </View>
          <View style={{ margin: 10, alignItems: 'center' }}>
            <TouchableOpacity style={styles.closeButton} onPress={() => onCloseClick()}>
              <Text style={styles.textButton}>{translate('Close')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </Animated.View >
  );
};

const mapStateToProps = (appState: AppState) => {
  return (
    {
      favoriteSelectedSerieId: appState.favoriteSelectedSerieId,
      favoriteSelectedSeasonNumber: appState.favoriteSelectedSeasonNumber,
      favoriteShowSeriesDetail: appState.favoriteShowSeriesDetail,
      favoriteSeriesIds: appState.favoriteSeriesIds,
    }
  )
};

type ReduxType = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(FavoriteSeriesDetail);