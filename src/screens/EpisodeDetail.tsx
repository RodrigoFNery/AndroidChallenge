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
import { ComponentColors } from '../styles/colors';

//Redux
import { connect } from "react-redux";
import { AppState } from '../redux/reducers/appReducer';

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
const EpisodeDetail: React.FC<Props> = ({
  show,
  onClose,
  selectedEpisodeId,
}) => {
  const [episode, setEpisode] = useState<EpisodeModel>();
  const [state, setState] = useState({
    opacity: new Animated.Value(0),
    container: new Animated.Value(height),
    modal: new Animated.Value(height)
  })


  //load the selected Serie
  useEffect(() => {
    const loadEpisode = async (selectedEpisodeId: number) => {
      if (selectedEpisodeId) {
        setEpisode(await Services.getEpisodeById(selectedEpisodeId));
      }
    }
    loadEpisode(selectedEpisodeId);
  }, [selectedEpisodeId])

  // Open/Close this screen when 'show' changes
  useEffect(() => {
    if (show) {
      openModal()
    } else {
      closeModal()
    }
  }, [show])

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
            <View style={styles.modalViewIndicator} />
            {/* <View> */}
            <View style={{ ...styles.viewHorizontalLeft }}>
              <Image
                style={styles.cardImage}
                source={imageSource}
              />
              <View style={{ ...styles.content }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.serieName}>{episode?.name}</Text>
                </View>
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
            <TouchableOpacity style={styles.closeButton} onPress={() => onClose()}>
              <Text style={styles.textButton}>Close</Text>
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
      selectedEpisodeId: appState.selectedEpisodeId
    }
  )
};

type ReduxType = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(EpisodeDetail);