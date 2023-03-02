import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  PermissionsAndroid,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from '../../utils/axios';
import Icon from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-date-picker';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {SelectList} from 'react-native-dropdown-select-list';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {getDataPusdalopById} from '../../stores/actions/pusdalop';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AsesmenDetail(props) {
  const dispatch = useDispatch();
  const dataPusdalopRedux = useSelector(state => state.pusdalop.data);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [namaBarang, setnamaBarang] = useState('');
  const [dataById, setDataByID] = useState({});
  console.log('INI DATA PUSDALOP', dataById?.data?.tanggal);
  const pusdalopid = props.route.params.pusdalopId;
  // console.log(pusdalopid);
  //  for map
  const [latitude, setlatitude] = useState();
  const [longitude, setlongiude] = useState();
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

  const handlegetPusdalopId = async () => {
    try {
      const datauser = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + datauser,
        },
      };
      const result = await axios.get(`/v1/pusdalops/${pusdalopid}`, config);
      setDataByID(result.data);
    } catch (error) {
      alert('gagal mendapat kan data');
      console.log(error);
    }
  };
  useEffect(() => {
    handlegetPusdalopId();
  }, []);
  // untuk data barang
  const dataBarang = [
    {
      key: '1',
      value: 'Air Mineral',
    },
    {
      key: '2',
      value: 'Air Mineral 29622',
    },
    {
      key: '3',
      value: 'Air Mineral 7122022',
    },
    {
      key: '4',
      value: 'Alat Deteksi',
    },
    {
      key: '4',
      value: 'Alat Kebersihan',
    },
    {
      key: '5',
      value: 'Alat Kesehatan',
    },
  ];
  // Image
  const [image, setImage] = useState();
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
              name="Safety"
              size={40}
              color={'white'}
              style={{marginLeft: 10}}
            />
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'white'}}>Lapor Bencana</Text>
              <Text style={{color: 'white'}}>(ASESMEN)</Text>
            </View>
          </View>
        </View>
        <View style={style.containerInput}>
          <View>
            <Text>Lapor Bencana</Text>
            <Text>Perbaiki Isian Data Bencana</Text>
          </View>
          <View style={{marginTop: 10}}>
            <Text>Jenis Bencana</Text>
            <TextInput
              placeholder={dataById?.data?.tindakan?.jenis_tindakan}
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Tanggal Kejadian</Text>
            <TextInput
              placeholder={dataById?.data?.tanggal}
              style={{borderWidth: 1, borderRadius: 10, marginTop: 5}}
              editable={false}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Titik Lokasi Terjadinya Bencana</Text>
            <View style={style.containerMap}>
              <MapView
                initialRegion={mapRegion}
                style={{flex: 1, height: 300, width: 380}}>
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
          </View>
          <View style={{marginTop: 200}}>
            <Text>Kecamatan</Text>
            <TextInput
              placeholder="Kemrajen"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Desa</Text>
            <TextInput
              placeholder="Desa Sibrama"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Alamat</Text>
            <TextInput
              placeholder="Sibrama,Kec Kemrajen,Kabupaten Banyumas,Jawatengah"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Tanggal Asesmen</Text>
            <TextInput
              placeholder={date.toLocaleDateString()}
              style={{borderWidth: 1, borderRadius: 10, marginTop: 5}}
            />
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
            <Pressable style={style.buttonLogin} onPress={() => setOpen(true)}>
              <Text style={style.textLogin}>Pilih Tanggal dan waktu</Text>
            </Pressable>
            {/* <TextInput
              placeholder="Tanah Longsor"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            /> */}
          </View>
          <View style={{marginTop: 10}}>
            <Text>Dampak</Text>
            <TextInput
              placeholder="Dampak"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Kerusakan Fasum</Text>
            <TextInput
              placeholder="Kerusakan Fasum"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Kerusakan Rumah</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text>Rusak Ringan</Text>
                <TextInput
                  placeholder="Ringan"
                  editable={false}
                  style={{borderWidth: 1, borderRadius: 10}}
                />
              </View>
              <View>
                <Text>Rusak Sedang</Text>
                <TextInput
                  placeholder="Sedang"
                  editable={false}
                  style={{borderWidth: 1, borderRadius: 10}}
                />
              </View>
              <View>
                <Text>Rusak Berat</Text>
                <TextInput
                  placeholder="Berat"
                  editable={false}
                  style={{borderWidth: 1, borderRadius: 10}}
                />
              </View>
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <Text>Kerugian</Text>
            <TextInput
              placeholder="Tanah Longsor"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Korban Luka</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text>Luka Ringan</Text>
                <TextInput
                  placeholder="Ringan"
                  editable={false}
                  style={{borderWidth: 1, borderRadius: 10}}
                />
              </View>
              <View>
                <Text>Luka Sedang</Text>
                <TextInput
                  placeholder="Sedang"
                  editable={false}
                  style={{borderWidth: 1, borderRadius: 10}}
                />
              </View>
              <View>
                <Text>Luka Berat</Text>
                <TextInput
                  placeholder="Berat"
                  editable={false}
                  style={{borderWidth: 1, borderRadius: 10}}
                />
              </View>
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <Text>Korban Jiwa</Text>
            <TextInput
              placeholder="Korban Jiwa"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Cakupan Bencana</Text>
            <TextInput
              placeholder="Cakupan Bencana"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Potensi Bencana Susulan</Text>
            <TextInput
              placeholder="Potensi Bencana Susulan"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Deskripsi Kronologis</Text>
            <TextInput
              placeholder="Kronologis"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Tindakan akan dilakukan</Text>
            <TextInput
              placeholder="Tindakan"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Peralatan yang dibutuhkan</Text>
            <TextInput
              placeholder="Peralatan"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Kebutuhan mendesak</Text>
            <TextInput
              placeholder="Kebutuhan Mendesak"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Unsur terlibat</Text>
            <TextInput
              placeholder="Unsur Terlibat"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Petugas</Text>
            <TextInput
              placeholder="Petugas"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Data Barang Yang Di Butuhkan</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <SelectList
                  setSelected={val => setnamaBarang(val)}
                  data={dataBarang}
                  save="value"
                  placeholder="Pilih Barang"
                />
              </View>
              <View>
                <TextInput
                  placeholder="Qty"
                  editable={false}
                  style={{borderWidth: 1, borderRadius: 10, width: 80}}
                />
              </View>
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <Text>File Gambar</Text>
            <View style={{flexDirection: 'row', padding: 10}}>
              <View style={{marginRight: 60}}>
                <Text>Preview Image</Text>
                <Image
                  source={{uri: image}}
                  style={{width: 200, height: 200}}
                />
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
                <Icon name="folder1" size={20} style={{marginLeft: 10}} />
              </TouchableOpacity>
            </View>
            <View>
              <TextInput
                placeholder="Masukan Keterangan"
                editable={false}
                style={{borderWidth: 1, borderRadius: 10}}
              />
            </View>
          </View>
          <View>
            <Pressable style={style.buttonSimpan}>
              <Text style={style.textLogin}>Simpan</Text>
            </Pressable>
            <Pressable style={style.buttonBatal}>
              <Text style={style.textLogin}>Batal</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
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
    maxHeight: '100%',
    // height: 2800,
    position: 'relative',
    marginTop: -10,
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
  buttonSimpan: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 7,
    elevation: 3,
    backgroundColor: '#1a8cff',
    width: '100%',
    textAlign: 'center',
    height: 50,
    marginTop: 30,
  },
  buttonBatal: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 7,
    elevation: 3,
    backgroundColor: '#ff0000',
    width: '100%',
    textAlign: 'center',
    height: 50,
    marginTop: 10,
  },
  containerMap: {
    width: 100,
    height: 200,
    backgroundColor: '#fff',
    position: 'absolute',
    marginTop: 20,
  },
});
