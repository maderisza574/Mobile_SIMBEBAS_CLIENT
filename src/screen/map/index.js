import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, PermissionsAndroid} from 'react-native';
// import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker} from 'react-native-maps';
// import Geocoder from 'react-native-geocoding';

// Geocoder.init('AIzaSyDehHQYXFEqHlt9I8uBsQ_f3hNMPeKAwmU');
export default function Map(props) {
  // NEW MAP
  const userLocation = {
    coords: {
      accurancy: 0,
      alttitude: 0,
      heading: 0,
      latitude: 0,
      longtitude: 0,
      speed: 0,
    },
    mocked: false,
    timestamp: 0,
  };
  // console.log('INI USERLOCATION', userLocation);
  const [address, setAddress] = useState();
  console.log('INI DATA ADDRESS', address);
  useEffect(() => {
    requestLocationPermission();
    // Geolocation.getCurrentPosition(info => setAddress({userLocation: info}));
  }, []);
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'IJIN LOKASI',
          message: 'ijin LOKASI ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('SUDAH BISA ');
        Geolocation.getCurrentPosition(
          posisi => {
            let posisiAwal = JSON.stringify(posisi);
            setAddress(posisiAwal);
          },
          error => alert('lokasi tidak ditemukan', JSON.stringify(error)),
          {enableHighAccuracy: true, timeout: 2000, maximumAge: 1000},
        );
      } else {
        console.log('GA BISA');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // END NEW MAP

  return (
    <View>
      <View style={styles.container}>
        {/* <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={region => setRegion(region)}>
          {region && (
            <Marker
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
              onPress={() => {
                Geocoder.from(region.latitude, region.longitude)
                  .then(json => {
                    setAddress(json.results[0].formatted_address);
                  })
                  .catch(error => console.warn(error));
              }}
            />
          )}
        </MapView> */}
        {/* <TextInput
          style={styles.address}
          placeholder="Address"
          value={address}
          onChangeText={text => setAddress(text)}
        /> */}
      </View>
      <View>
        <MapView
          style={{height: 300}}
          region={{
            latitude: -7.431391,
            longitude: 109.247833,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}>
          <Marker
            coordinate={{latitude: -7.431391, longitude: 109.247833}}
            // title={lokasi}
          />
          {/* <Marker
            key={user}
            coordinate={{
              latitude: address.coords.latitude,
              longitude: address.coords.longitude,
            }}
            pinColor={'#212121'}
            title={'lokasi saya'}
          /> */}
        </MapView>
        <Text>{address}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    // ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    marginTop: 100,
    height: 100,
    width: 100,
  },
  address: {
    height: 40,
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
});
