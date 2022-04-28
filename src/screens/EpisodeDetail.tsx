/**
 * AllSeries.tsx
 * Renders the screen that shows all series cards
 */

import React, { useState, useEffect } from 'react';
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
} from 'react-native';

// Third part components
import RenderHtml, { HTMLSource } from 'react-native-render-html';

//Entities
import EpisodeModel from '../model/EpisodeModel';

//Services
import *  as Services from '../api/services';

//Translation
import { translate } from '../locales';

//Styling
import styles from '../styles/appStyles';
import { ComponentColors } from '../styles/colors';

//Redux
import { store } from "../redux";
import { connect } from "react-redux";
import { AppState } from '../redux/reducers/appReducer';
import * as AppActions from "../redux/actions/appActions";

const { height } = Dimensions.get('window')

//Main Functional Component
const EpisodeDetail: React.FC<ReduxType> = ({
  selectedEpisodeId,
  showEpisodeDetail,
}) => {
  //EpisodeModel instance
  const [episode, setEpisode] = useState<EpisodeModel>();

  //Animation state
  const [state, setState] = useState({
    opacity: new Animated.Value(0),
    container: new Animated.Value(height),
    modal: new Animated.Value(height)
  })

  //load the EpisodeModel when selectedEpisodeId changes
  useEffect(() => {
    const loadEpisode = async (selectedEpisodeId: number) => {
      if (selectedEpisodeId) {
        setEpisode(await Services.getEpisodeById(selectedEpisodeId));
      }
    }
    loadEpisode(selectedEpisodeId);
  }, [selectedEpisodeId])

  // Open/Close this screen when showEpisodeDetail changes
  useEffect(() => {
    if (showEpisodeDetail) {
      openModal();
    } else {
      closeModal();
    }
  }, [showEpisodeDetail])

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

  const getEpisodeNumberView = (episode?: EpisodeModel) => {
    if (episode) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ ...styles.episodeDetails }}>{translate('Episode') + ' ' + (episode?.number)}  </Text>
        </View>
      )
    } else {
      return (<></>)
    }
  }

  const getEpisodeNameView = (episode?: EpisodeModel) => {
    if (episode) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ ...styles.episodeDetails }}>{(episode?.name)}  </Text>
        </View>
      )
    } else {
      return (<></>)
    }
  }

  const getSeasonNameView = (episode?: EpisodeModel) => {
    if (episode) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ ...styles.episodeDetails }}>{'(' + translate('Season') + ' - ' + (episode?.season) + ')'}</Text>
        </View>
      )
    } else {
      return (<></>)
    }
  }

  const onBackClick = () => {
    store.dispatch(AppActions.setShowSerieDetail(true));
    store.dispatch(AppActions.setShowEpisodeDetail(false));
  }

  const imageURISource: ImageURISource = {
    uri: episode ? (episode.image ? episode.image.medium : undefined) : undefined
  }

  const imageSource: ImageURISource = imageURISource.uri == undefined ? require("../images/image-not-found.png") : imageURISource;
  const { width } = useWindowDimensions();

  const htmlSummary: HTMLSource = {
    html: (episode ? episode.summary : "")
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
          <View style={{ ...styles.content, flex: 1 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ ...styles.serieName }}>{translate('Episode_Detail')}</Text>
            </View>
            <View style={styles.separator} />

            <View style={{ ...styles.viewHorizontalLeft }}>
              <Image
                style={styles.cardImage}
                source={imageSource}
              />
              <View style={{ ...styles.content, marginTop:10 }}>
                {getEpisodeNumberView(episode)}
                {getEpisodeNameView(episode)}
                {getSeasonNameView(episode)}
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
              </ScrollView>
            </View>
          </View>
          <View style={{ margin: 10, alignItems: 'center' }}>
            <TouchableOpacity style={styles.closeButton} onPress={() => onBackClick()}>
              <Text style={styles.textButton}>{translate('Back')}</Text>
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
      selectedSeasonNumber: appState.selectedSeasonNumber,
      selectedEpisodeId: appState.selectedEpisodeId,
      showEpisodeDetail: appState.showEpisodeDetail,
    }
  )
};

type ReduxType = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(EpisodeDetail);