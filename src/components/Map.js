import MapboxGL from '@react-native-mapbox-gl/maps';
import React from 'react';
import { View } from 'react-native';
import { makeStyles } from 'react-native-elements';

MapboxGL.setAccessToken(
  'sk.eyJ1IjoiaGlremVuIiwiYSI6ImNsMnpqbmM4ZTFnOTkza3Bma3A5dWQ3aWkifQ.MH1CCMN2VGpmPqrJdmo4Aw',
);
const useStyles = makeStyles({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  map: {
    flex: 1,
  },
  page: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
    justifyContent: 'center',
  },
});

const RNMap = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        style={styles.map}
        styleURL={MapboxGL.StyleURL.Street}
        zoomLevel={16}
        centerCoordinate={[20.66611, -103.35607]}>
        <MapboxGL.Camera
          zoomLevel={16}
          centerCoordinate={[3.33624, 6.57901]}
          animationMode={'flyTo'}
          animationDuration={0}
          followUserLocation
        />
        <MapboxGL.UserLocation visible={true}/>
      </MapboxGL.MapView>
    </View>
  );
};

export default RNMap;
