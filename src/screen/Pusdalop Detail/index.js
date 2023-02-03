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
import axios from '../../utils/axios';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PusdalopDetail(props) {
  //  ini untuk penampung
  const dataDetailPusdalop = props.route.params;
  const pusdalopid = dataDetailPusdalop.all.id;
  const [isLoadingData, setisLoadingData] = useState(false);
  const [inputs, setInputs] = useState([{value: '', image: null}]);
  const [tindakanOptions, setTindakanOptions] = useState([]);
  const [bencanaOptions, setBencanaOptions] = useState([]);
  const [selected, setSelected] = React.useState('');
  const [image, setImage] = useState();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  // akhir penampung
  // yang belum ditampung
  //  - alamat
  //  - id desa
  //  - id kecamatan
  const formHandler = (value, name) => {
    setForm({...form, [name]: value});
  };
  const [form, setForm] = useState({
    id_jenis_bencana: '',
    id_tindakan: '',
    user_pemohon: '',
    isi_aduan: '',
    no_telepon: '',
    nama: '',
    alamat: '',
    id_desa: '',
    id_kecamatan: '',
    lng: '',
    lat: '',
    tindakan_trc: '',
    logpal: '',
    tanggal: '',
  });

  // tes multiple input
  const updatePusdalop = async e => {
    try {
      const datauser = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + datauser,
        },
      };
      setisLoadingData(true);
      const response = await axios.dispatch(
        `/v1/pusdalops/${pusdalopid}`,
        config,
        form,
      );
      alert('sukses');
      setisLoadingData(false);
      console.log(response);
      e.preventDefault();
    } catch (error) {
      alert('error');
    }
  };

  const deletePusdalop = async () => {
    try {
      const datauser = await AsyncStorage.getItem('token');

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + datauser,
        },
      };
      const response = await axios.delete(
        `/v1/pusdalops/${pusdalopid}`,
        config,
      );
      console.log(response);

      alert('Sukses Menghapus Data');
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddInput = () => {
    setInputs([...inputs, {value: '', image: null}]);
  };

  const handleRemoveInput = index => {
    setInputs(inputs.filter((input, i) => i !== index));
  };

  //  end multiple input

  // FOR DROPDOWN

  const getDatatindakan = async () => {
    try {
      const result = await axios.get('/v1/tindakan?page=1&perPage=10');
      let newArray = result.data.rows.map(item => {
        return {key: item.id, value: item.jenis_tindakan};
      });

      setTimeout(() => {
        setTindakanOptions(newArray);
      }, 1000);
      await setSelected(newArray[0]?.key);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataBencana = async (selected = 1) => {
    try {
      const res = await axios.get(
        `/v1/bencana?page=1&perPage=10&tindakanId=${selected}`,
      );
      let newArray = res.data.rows.map(item => {
        return {key: item.id, value: item.sub_jenis};
      });
      setBencanaOptions(newArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDatatindakan();
    getDataBencana();
  }, []);

  // END DROPDWON

  //for image picker

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

  // const cancelImageHandler = () => {
  //   setFormImage({});
  //   setPreview('');
  // };
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
            <Text style={{color: 'white'}}>Pusdalop Detail</Text>
            <Text style={{color: 'white'}}>{dataDetailPusdalop.all.nama}</Text>
          </View>
        </View>
        <View style={style.containerInput}>
          <Text style={{marginBottom: 10, fontSize: 16}}>
            Silahkan isi beberapa data untuk melapor
          </Text>
          <View style={{padding: 5}}>
            <Text style={{marginRight: 5, marginTop: 6}}>Jenis Tindakan</Text>
            {/* <SelectList
              items={tindakanOptions}
              onChange={value => setSelectedTindakan(value)}
              selectedValue={setSelectedTindakan}
              labelExtractor={({jenis_tindakan}) => jenis_tindakan}
              valueExtractor={({id}) => id}
            /> */}
            <SelectList
              onPress={getDatatindakan}
              setSelected={setSelected}
              onChange={setSelected}
              data={tindakanOptions}
              onSelect={() => alert(selected)}
              placeholder={dataDetailPusdalop.all.id_tindakan}
            />
          </View>
          <View>
            <Text>Jenis Bencana</Text>
            <SelectList
              // data={bencanaOptions.rows[0] ? bencanaOptions.rows[0] : ''}
              data={bencanaOptions}
              setSelected={setBencanaOptions}
              disabled={!selected}
              onPress={getDataBencana}
            />
          </View>
          <View>
            <Text>Tanggal Kejadian</Text>
            <TextInput
              placeholder={dataDetailPusdalop.all.tanggal}
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
                formHandler(moment(date).format('YYYY-MM-DD'), 'tanggal');
                // formHandler(tanggal);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>
          <View>
            <Text>Isi Aduan</Text>
            <TextInput
              placeholder={dataDetailPusdalop.all.isi_aduan}
              style={style.inputAduan}
              name="isi_aduan"
              onChangeText={text => formHandler(text, 'isi_aduan')}
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
                onChangeText={text => formHandler(text, 'lat')}
                value={stateMap.latitude}
                placeholder={dataDetailPusdalop.all.lat}
                keyboardType="numeric"
                style={{marginRight: 30}}
              />

              <TextInput
                onChangeText={text => formHandler(text, 'lng')}
                // onChangeText={handleLongitudeChange}
                keyboardType="numeric"
                placeholder={dataDetailPusdalop.all.lng}
                value={stateMap.longitude}
                style={{marginRight: 10}}
              />
              <Pressable style={style.buttonSearchMap} onPress={handleSearch}>
                <Text style={style.textSearchMap}>Cari</Text>
              </Pressable>
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <Text>Upload gambar</Text>
          </View>

          <View
            style={{
              marginBottom: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />

          {/* loop image input */}
          <View>
            {inputs.map((input, index) => (
              <View key={index}>
                <View style={{flexDirection: 'row', padding: 10}}>
                  <View style={{marginRight: 60}}>
                    <Text>Preview Image</Text>
                    <Image
                      source={{uri: image}}
                      style={{width: 200, height: 200}}
                    />
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={{marginRight: 10, width: 60}}
                    onPress={handleLaunchCamera}>
                    <Icon name="camera" size={20} style={{marginLeft: 10}} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{marginRight: 10, width: 60}}
                    onPress={handleLaunchImageLibrary}>
                    <Icon
                      name="folder-images"
                      size={20}
                      style={{marginLeft: 10}}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text>Keterangan</Text>
                  <TextInput
                    placeholder={dataDetailPusdalop.all.risalah[0].ket}
                    style={{
                      height: 100,
                      width: 350,
                      borderWidth: 1,
                      marginLeft: 15,
                      marginTop: 5,
                    }}
                    value={input.value}
                    onChangeText={text => formHandler(text, 'keteranganGambar')}
                  />
                  <Button
                    title="Remove"
                    onPress={() => handleRemoveInput(index)}
                  />
                </View>
              </View>
            ))}
            <Button
              title="Tambahkan Beberapa Gambar"
              onPress={handleAddInput}
            />
          </View>
          {/* end input loop image */}
          <View style={{marginTop: 10}}>
            <Pressable style={style.buttonLogin} onPress={updatePusdalop}>
              <Text style={style.textLogin}>Simpan</Text>
            </Pressable>
            <Pressable style={style.buttonBatal} onPress={deletePusdalop}>
              <Text style={style.textLogin}>Hapus Data</Text>
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
  textLogin: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  buttonSearchMap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 7,
    elevation: 3,
    backgroundColor: '#ff471a',
    width: '30%',
    textAlign: 'center',
    height: 50,
    marginTop: -6,
    marginLeft: 50,
  },
  textSearchMap: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
