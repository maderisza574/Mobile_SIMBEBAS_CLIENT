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
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PusdalopDetail() {
  const dataPusdalop = {
    id_jenis_bencana: '1',
    id_tindakan: '1',
    user_pemohon: 'johan',
    isi_aduan: 'tes',
    no_telepon: '089898989',
    nama: 'bencana alam',
    alamat: 'test alamat',
    id_desa: '1',
    id_kecamatan: '1',
    lng: '9898989',
    lat: '67676767',
    tindakan_trc: 'true',
    logpal: 'true',
    //ke:tessss
    //keteranganGambar[1]:tosss
    tanggal: '2023-03-12',
  };
  const [form, setForm] = useState({});
  // tes multiple input
  const [inputs, setInputs] = useState([{value: '', image: null}]);

  const handleAddInput = () => {
    setInputs([...inputs, {value: '', image: null}]);
  };

  const handleInputChange = (text, index) => {
    const newInputs = [...inputs];
    newInputs[index].value = text;
    setInputs(newInputs);
  };
  const handleRemoveInput = index => {
    setInputs(inputs.filter((input, i) => i !== index));
  };
  const handleImageChange = (image, index) => {
    const newInputs = [...inputs];
    newInputs[index].image = image;
    setInputs(newInputs);
  };
  //  end multiple input

  // console.log(form);
  // FOR DROPDOWN
  const [tindakanOptions, setTindakanOptions] = useState([]);
  // console.log(tindakanOptions);
  const [bencanaOptions, setBencanaOptions] = useState([]);
  console.log('INI DATA BENCANA', bencanaOptions);
  const [selected, setSelected] = React.useState('');
  const dataJenis = [
    {key: '1', value: 'PENCEGAHAN'},
    {key: '2', value: 'PENANGGULANGAN'},
  ];
  // useEffect(() => {
  //   axios
  //     .get('/v1/tindakan?page=1&perPage=10')
  //     .then(res => {
  //       let newArray = res.data.rows.map(item => {
  //         return {key: item.id, value: item.jenis_tindakan};
  //       });
  //       setTindakanOptions(newArray);
  //     })
  //     .catch(error => console.error(error));
  // }, []);
  // const handleGetBencana = async () => {
  //   try {
  //     await axios.get(`/v1/bencana?page=1&perPage=10&tindakanId=1`);
  //     await (res => {
  //       let newArray = res.data.rows.map(item => {
  //         return {key: item.id, value: item.sub_jenis};
  //       });
  //       setBencanaOptions(newArray);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    axios
      .get(`/v1/bencana?page=1&perPage=10&tindakanId=${selected || 1}`)
      .then(res => {
        let newArray = res.data.rows.map(item => {
          return {key: item.id, value: item.sub_jenis};
        });
        setBencanaOptions(newArray);
      })
      .catch(error => console.error(error));
  }, [selected]);
  // END DROPDWON

  const handleCreatePusdalop = async () => {
    try {
      let formData = new FormData();
      for (let key in dataPusdalop) {
        formData.append(key, dataPusdalop[key]);
      }
      const datauser = await AsyncStorage.getItem('token');
      console.log(datauser);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + datauser,
        },
      };

      const response = await axios.post('/v1/pusdalops', formData, config);
      alert('Sukses Membuat Laporan');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  //for image picker
  const [image, setImage] = useState();
  // console.log(image);
  // for Date picker
  const [date, setDate] = useState(new Date());
  // console.log(date);
  const [open, setOpen] = useState(false);

  const [latitude, setlatitude] = useState();
  const [longitude, setlongiude] = useState();
  const handleChangeForm = (name, value) => {
    if (name === 'image') {
      setForm({...form, [name]: value});
      setImage({uri: value});
    } else {
      setForm({...form, [name]: value});
    }
  };

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

            {/* <SelectList
              items={tindakanOptions}
              onChange={value => setSelectedTindakan(value)}
              selectedValue={setSelectedTindakan}
              labelExtractor={({jenis_tindakan}) => jenis_tindakan}
              valueExtractor={({id}) => id}
            /> */}
            {/* <SelectList
              setSelected={setSelected}
              data={tindakanOptions}
              onSelect={() => alert(selected)}
            /> */}
            <SelectList
              setSelected={key => setSelected(key)}
              data={dataJenis}
              save="key"
              itemKey="key"
              itemLabel="name"
            />
          </View>
          <View>
            <Text>Jenis Bencana</Text>
            {/* <Button title="get" onPress={handleGetBencana} /> */}

            <SelectList
              // data={bencanaOptions.rows[0] ? bencanaOptions.rows[0] : ''}
              data={bencanaOptions}
              itemKey="id"
              itemLabel="name"
              defaultOption={bencanaOptions}
              // onSelect={() => se}
              // disabled={!selectedTindakan}
            />
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
                style={{marginRight: 30}}
              />

              <TextInput
                onChangeText={handleLongitudeChange}
                keyboardType="numeric"
                placeholder="Longitude"
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
                    placeholder="Masukan Keterangan gambar"
                    style={{
                      height: 100,
                      width: 350,
                      borderWidth: 1,
                      marginLeft: 15,
                      marginTop: 5,
                    }}
                    value={input.value}
                    onChangeText={text => handleInputChange(text, index)}
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
            <Pressable style={style.buttonLogin} onPress={handleCreatePusdalop}>
              <Text style={style.textLogin}>Kirim</Text>
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
