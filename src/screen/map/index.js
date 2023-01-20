import React, {useEffect, useState} from 'react';
import {TextInput, View, Text, Button, StyleSheet} from 'react-native';
import {Marker} from 'react-native-maps';
import MapView from 'react-native-maps';
// import {set} from 'react-native-reanimated';r

export default function Map(props) {
  const [stateMap, setStateMap] = useState({
    latitude: null || -7.431391,
    longitude: null || 109.247833,
  });
  const [mapRegion, setMapRegion] = useState({
    latitude: stateMap.latitude || -7.431391,
    longitude: stateMap.longitude || 109.247833,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  // console.log(stateMap);
  const handleLatitudeChange = latitude => {
    setStateMap({...stateMap, latitude: parseFloat(latitude)});
  };
  const handleLongitudeChange = longitude => {
    setStateMap({...stateMap, longitude: parseFloat(longitude)});
  };
  const handleSearch = () => {
    setMapRegion({
      ...mapRegion,
      latitude: stateMap.latitude,
      longitude: stateMap.longitude,
    });
  };

  useEffect(() => {
    if (stateMap.latitude && stateMap.longitude) {
      setMapRegion({
        latitude: stateMap.latitude,
        longitude: stateMap.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [stateMap.latitude, stateMap.longitude]);
  return (
    <View>
      <View style={style.container}>
        <View style={{position: 'absolute', zIndex: 10}}>
          <Text>Latitude:</Text>
          <TextInput
            onChangeText={handleLatitudeChange}
            value={stateMap.latitude}
            placeholder="Latitude"
            keyboardType="numeric"
          />
          <Text>Longitude:</Text>
          <TextInput
            onChangeText={handleLongitudeChange}
            keyboardType="numeric"
            placeholder="Longitude"
            value={stateMap.longitude}
          />
          <Button title="Search" onPress={handleSearch} />
        </View>

        {stateMap.latitude && stateMap.longitude && (
          <MapView style={style.map} initialRegion={mapRegion}>
            <Marker
              draggable
              coordinate={{
                latitude: stateMap.latitude,
                longitude: stateMap.longitude,
              }}
              onDragEnd={e =>
                setStateMap({
                  ...stateMap,
                  latitude: e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude,
                })
              }
            />
            {/* <Marker
              coordinate={{
                latitude: stateMap.latitude,
                longitude: stateMap.longitude,
              }}
            /> */}
          </MapView>
        )}
        {/* <Button title="Update" onPress={handleUpdate} /> */}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  map: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    minWidth: '50%',
    minHeight: '50%',
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
