/**
 * AllSeries.tsx
 * Renders the screen that shows all series cards
 */

import React, { memo, useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  ViewProps,
  Image,
  ImageURISource,
  useWindowDimensions,
} from 'react-native';

// Third part components
import RenderHtml, { HTMLSource } from 'react-native-render-html';
import DropDownPicker from 'react-native-dropdown-picker';

//Entities
import EpisodeModel from '../model/EpisodeModel';
import SeasonModel from '../model/SeasonModel';

//Services
import *  as Services from '../api/services';

//Translation
import { translate } from '../locales';

//Components
import Card from '../components/Card';
import Pagination from '../components/Pagination';

//Styling
import styles from '../styles/appStyles';
import SerieModel from '../model/SerieModel';
import { ComponentColors } from '../styles/colors';

//Redux
import { store } from "../redux";
import { connect } from "react-redux";
import { AppState } from '../redux/reducers/appReducer';
import EpisodeDetail from './EpisodeDetail';
import * as AppActions from "../redux/actions/appActions";

const { height } = Dimensions.get('window')

//Interface
interface DetailProps extends ViewProps {
  show: boolean;
  onClose: Function;
}

type SeasonDropboxItems = {
  label: string;
  value: number;
}

type Props = ReduxType & DetailProps;

//FunctionalComponent Detail
const SerieDetail: React.FC<Props> = ({
  show,
  onClose,
  selectedSerieId,
}) => {
  const [serie, setSerie] = useState<SerieModel>();
  const [state, setState] = useState({
    opacity: new Animated.Value(0),
    container: new Animated.Value(height),
    modal: new Animated.Value(height)
  })

  //Episode Modal
  const [modal, setModal] = useState(false)

  //Seasons Map
  const [seasonsMap, setSeasonsMap] = useState<Map<number, SeasonModel>>();

  //Seasons Dropbox values
  const [openSeasonsDropbox, setOpenSeasonsDropbox] = useState(false);
  const [seasonValue, setSeasonValue] = useState(null);
  const [seasonItems, setSeasonItems] = useState<SeasonDropboxItems[]>([]);

  const [episodesList, setEpisodesList] = useState(<></>);

  //load the selected Serie
  useEffect(() => {
    const loadSerie = async (selectedSerieId: number) => {
      if (selectedSerieId) {
        setSerie(await Services.getMainInfo(selectedSerieId));
      }
    }
    loadSerie(selectedSerieId);
  }, [selectedSerieId])

  //create seasonsMap as soon as the Serie loaded
  useEffect(() => {
    //reset SeasonValue and EpidoseListas the serie has changed
    setSeasonValue(null);
    setEpisodesList(<></>);
    const loadSeasonsMap = async () => {
      if (selectedSerieId) {
        setSeasonsMap(await Services.getSeasonsMap(selectedSerieId));
      }
    }
    loadSeasonsMap();
  }, [serie])

  //populates populateSeasonsDropbox as soon as seasonsMap is loaded
  useEffect(() => {
    populateSeasonsDropbox();
  }, [seasonsMap])

  // Open/Close this screen when 'show' changes
  useEffect(() => {
    if (show) {
      openModal();
    } else {
      closeModal();
    }
  }, [show])

  //create episodesList as soon as Season is selected
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

  const getGenresText = (serie?: SerieModel) => {
    if (serie?.genres) {
      return (<Text style={styles.serieDetails}>({serie.genres.join()})</Text>)
    }
    return;
  }

  const getDaysText = (serie?: SerieModel) => {
    if (serie?.schedule.days) {
      return (<Text style={styles.serieDetails}>{serie.schedule.days.join()}</Text>)
    }
    return;
  }

  const onEpisodeClick = (episodeId: number) => {
    store.dispatch(AppActions.setSelectedEpisodeId(episodeId));
    setModal(true);
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
          <View style={{ ...styles.content, flex: 1 }}>
            <View style={styles.modalViewIndicator} />
            {/* <View> */}
            <View style={{ ...styles.viewHorizontalLeft }}>
              <Image
                style={styles.cardImage}
                source={imageSource}
              />
              <View style={{ ...styles.content }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.serieName}>{serie?.name}</Text>
                </View>
                {getGenresText(serie)}
                {getDaysText(serie)}
                <Text style={styles.serieDetails}>{serie?.schedule.time}</Text>
              </View>
            </View>

            <View style={{ flex: 1 }}>
              <ScrollView contentContainerStyle={{ flexGrow: 1 }} scrollEventThrottle={16}>
                <View style={{ flexDirection: 'row' }}>
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
                />
                {episodesList}
              </ScrollView>
            </View>
          </View>
          <View style={{ margin: 10, alignItems: 'center' }}>
            <TouchableOpacity style={styles.closeButton} onPress={() => onClose()}>
              <Text style={styles.textButton}>Close</Text>
            </TouchableOpacity>
          </View>
          <EpisodeDetail show={modal} onClose={() => setModal(false)} />
        </View>
      </Animated.View>
    </Animated.View >
  );
};

const mapStateToProps = (appState: AppState) => {
  return (
    {
      selectedSerieId: appState.selectedSerieId
    }
  )
};

type ReduxType = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(SerieDetail);