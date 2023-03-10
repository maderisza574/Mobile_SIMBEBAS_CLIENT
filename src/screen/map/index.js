import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker} from 'react-native-maps';

export default function Map(props) {
  const [latitudedata, setLatitude] = useState('');
  const [longitudedata, setLongitude] = useState('');
  const [address, setAddress] = useState('');
  const [addresscoder, setAddressCoder] = useState('');
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            setRegion({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
          },
          error => {
            if (error.code === error.TIMEOUT) {
              Alert.alert(
                'Error',
                'Position unavailable. Please try again later.',
              );
            } else {
              Alert.alert(
                'Error',
                'An error occurred while retrieving your location.',
              );
            }
          },
          {enableHighAccuracy: true, timeout: 5000},
        );
      } else {
        Alert.alert('Error', 'ALAMAT YANG ANDA MASUKAN SALAH');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const search = () => {
    // console.log('INI DATA LAT', latitude);
    // console.log('INI DATA LONG', longitude);
    // const latitude = parseFloat(address.split(',')[0]);
    // const longitude = parseFloat(address.split(',')[1]);
    const latitude = parseFloat(latitudedata);
    const longitude = parseFloat(longitudedata);
    setRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };
  const getAddressFromLatLng = async (lat, lng) => {
    try {
      const response = await Geocoder.from(lat, lng);
      const address = response.results[0].formatted_address;
      setAddressCoder(address);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Latitude, Longitude"
          value={address}
          onChangeText={text => setAddress(text)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={() => search()}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.searchBar}
          placeholder="Latitude"
          value={latitudedata}
          onChangeText={text => setLatitude(text)}
        />
        <TextInput
          style={styles.searchBar}
          placeholder="Longitude"
          value={longitudedata}
          onChangeText={text => setLongitude(text)}
        />
      </View>
      <MapView style={styles.map} region={region}>
        <Marker
          coordinate={region}
          onDragEnd={e =>
            getAddressFromLatLng(
              e.nativeEvent.coordinate.latitude,
              e.nativeEvent.coordinate.longitude,
            )
          }
          draggable
        />
      </MapView>
      <Text style={styles.address}>{addresscoder}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    margin: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  searchButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    margin: 10,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  map: {
    flex: 1,
  },
  address: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 10,
    fontSize: 18,
  },
});
