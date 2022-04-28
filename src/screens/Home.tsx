/**
 * Home.tsx
 * Renders the main Home screen that shows the TabView with 3 inner screens
 */

//React
import React, { memo } from 'react';

//React-Native
import { useWindowDimensions } from 'react-native';

//TabView
import { TabView, 
  SceneMap, 
  TabBar, 
  SceneRendererProps 
} from 'react-native-tab-view';

//Translation
import { translate } from '../locales'

//Screens
import AllSeries from './AllSeries'
import Favorite from './Favorite'

//Styling
import { ComponentColors } from '../styles/colors';

//Components
import Header from '../components/Header';

//Interfaces
interface HomeProps {
  children: typeof React.Children;
  color?: string
}

//Renders TabView scene
const renderScene = SceneMap({
  allSeries: AllSeries,
  favorite: Favorite,
});

//Main Functional Component
const Home: React.FC<HomeProps> = () => {
  const layout = useWindowDimensions();

  //Holds the TabView selected index
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'allSeries', title: translate('AllSeries') },
    // { key: 'favorite', title: translate('Favorite') },
  ]);

  //Renders TabView tab
  const renderTabBar = (props: SceneRendererProps) => (
    <TabBar 
      {...props}
      navigationState={{ index, routes }}
      position={props.position}
      indicatorStyle={{ backgroundColor: ComponentColors.LightTabBarIndicator, height:3 }}
      style={{ backgroundColor: ComponentColors.LightTabBarBackground }}
    />
  );

  return (
    <>
      <Header/>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props: SceneRendererProps) => renderTabBar(props)}
      />
    </>
  );
}

export default memo(Home);