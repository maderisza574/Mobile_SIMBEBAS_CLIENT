import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  PermissionsAndroid,
  Pressable,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {SelectList} from 'react-native-dropdown-select-list';
import DatePicker from 'react-native-date-picker';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function Pusdalops() {
  const [form, setForm] = useState({});
  console.log(form);
  //for image picker
  const [image, setImage] = useState();
  // console.log(image);
  // for Date picker
  const [date, setDate] = useState(new Date());
  // console.log(date);
  const [open, setOpen] = useState(false);
  // for dropdown
  const [tindakan, setTindakan] = React.useState('');
  const [bencana, setBencana] = React.useState('');
  const [bencanaPenangulangan, setbencanaPenangulangan] = React.useState('');
  const [latitude, setlatitude] = useState();
  const [longitude, setlongiude] = useState();
  const handleChangeForm = (value, name) => {
    setForm({...form, [name]: value});
  };

  const dataTindakan = [
    {
      key: '1',
      value: 'Pencegahan',
    },
    {key: '2', value: 'Penangulangan'},
  ];
  const dataBencana = [
    {
      key: '1',
      value: 'Kerja Bakti',
    },
  ];
  const dataPenangulangan = [
    {
      key: '1',
      value: 'Banjir Bandang',
    },
  ];
  // for camera
  const handleLaunchCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message: 'Cool Photo App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchCamera(
          {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 200,
            maxWidth: 200,
          },
          response => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            }
            if (response.errorCode) {
              console.log('ImagePicker Error: ', response.errorMessage);
            }
            if (response.assets) {
              const source = {
                uri: response.assets[0].uri,
                type: response.assets[0].type,
                name: response.assets[0].fileName,
              };
              setImage(response.assets[0].uri);
              // setImage({...image, image: source});
            }
          },
        );
      } else {
        console.log('Camera permission denied');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleLaunchImageLibrary = async () => {
    const photo = await launchImageLibrary({
      mediaType: 'photo',
      maxWidth: 100,
    });
    const formData = new FormData();
    formData.append('image', {
      name: photo.assets[0].fileName,
      type: photo.assets[0].type,
      uri: photo.assets[0].uri,
    });
    setImage(photo.assets[0].uri);
  };
  // const openCamera = async () => {
  //   let options = {
  //     saveToPhotos: true,
  //     mediaType: 'photo',
  //   };
  //   const granted = await PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.CAMERA,
  //   );
  //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //     const result = await launchCamera(options);
  //     setImage(result.assets[0].uri);
  //   }
  // };
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
      <ScrollView>
        <View style={style.titleScreen}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: -3,
            }}>
            <Icon
              name="news"
              size={40}
              color={'white'}
              style={{marginLeft: 10}}
            />
            <Text style={{color: 'white'}}>Lapor Bencana</Text>
          </View>
        </View>
        <View style={style.containerInput}>
          <Text style={{marginBottom: 10, fontSize: 16}}>
            Silahkan isi beberapa data untuk melapor
          </Text>
          <View style={{padding: 5}}>
            <Text style={{marginRight: 5, marginTop: 6}}>Jenis Tindakan</Text>
            <SelectList
              setSelected={val => setTindakan(val)}
              data={dataTindakan}
              save="value"
              placeholder="Pilih Jenis Tindakan"
            />
          </View>
          <View>
            <Text>Jenis Bencana</Text>
            {tindakan === 'Pencegahan' ? (
              <SelectList
                setSelected={() => setBencana()}
                data={dataBencana}
                save="value"
                placeholder="Masukan Jenis Bencana"
              />
            ) : tindakan === 'Penangulangan' ? (
              <SelectList
                setSelected={() => setbencanaPenangulangan()}
                data={dataPenangulangan}
                save="value"
                placeholder="Masukan Jenis Bencana"
              />
            ) : (
              <SelectList placeholder="Masukan Jenis Tindakan Terlebih dahulu" />
            )}
          </View>
          <View>
            <Text>Tanggal Kejadian</Text>
            <TextInput
              placeholder={date.toLocaleDateString()}
              style={{borderWidth: 1, borderRadius: 10}}
            />
            <Pressable style={style.buttonLogin} onPress={() => setOpen(true)}>
              <Text style={style.textLogin}>Pilih Tanggal dan waktu</Text>
            </Pressable>
            {/* <Button
              title="Pilih Tanggal dan waktu"
              onPress={() => setOpen(true)}
            /> */}
            <DatePicker
              modal
              open={open}
              date={date}
              onConfirm={date => {
                setOpen(false);
                setDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>
          <View>
            <Text>Isi Aduan</Text>
            <TextInput
              placeholder="Masukan Isi Aduan"
              style={style.inputAduan}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Titik Lokasi Terjadinya Bencana</Text>
            <View>
              <MapView
                initialRegion={mapRegion}
                style={{flex: 1, height: 200, width: 380}}>
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
              </MapView>
            </View>
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <TextInput
                onChangeText={handleLatitudeChange}
                value={stateMap.latitude}
                placeholder="Latitude"
                keyboardType="numeric"
              />

              <TextInput
                onChangeText={handleLongitudeChange}
                keyboardType="numeric"
                placeholder="Longitude"
                value={stateMap.longitude}
              />
              <Button title="Search" onPress={handleSearch} />
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <Text>Upload gambar</Text>
          </View>
          <View style={{flexDirection: 'row', padding: 10}}>
            <View style={{marginRight: 60}}>
              <Text>Preview Image</Text>
              <Image source={{uri: image}} style={{width: 200, height: 200}} />
            </View>
          </View>
          <View
            style={{
              marginBottom: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{marginRight: 10, width: 60}}
              onPress={handleLaunchCamera}>
              <Icon name="camera" size={20} style={{marginLeft: 10}} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginRight: 10, width: 60}}
              onPress={handleLaunchImageLibrary}>
              <Icon name="folder-images" size={20} style={{marginLeft: 10}} />
            </TouchableOpacity>
          </View>
          <View>
            <Text>Keterangan</Text>
            <TextInput
              placeholder="Masukan Keterangan gambar"
              style={{
                height: 100,
                width: 350,
                borderWidth: 1,
                marginLeft: 15,
                marginTop: 5,
              }}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Pressable style={style.buttonLogin}>
              <Text style={style.textLogin}>Kirim</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  inputAduan: {
    width: 380,
    height: 200,
    borderWidth: 1,
    marginLeft: 5,
    marginTop: 10,
  },
  titleScreen: {
    backgroundColor: '#FF6A16',
    color: 'white',
    height: 100,
  },
  containerInput: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderRadius: 30,
    padding: 6,
    width: '100%',
    // height: 500,
    position: 'relative',
    marginTop: -30,
  },
  buttonLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 7,
    elevation: 3,
    backgroundColor: '#ff471a',
    width: '100%',
    textAlign: 'center',
    height: 50,
    marginTop: 30,
  },
  textLogin: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
