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
import {useDispatch, useSelector} from 'react-redux';
import {createDataPusdalop} from '../../stores/actions/pusdalop';

export default function PusdalopCreate() {
  // redux
  const dispatch = useDispatch();
  const dataPusdalopRedux = useSelector(state => state.pusdalop.data);
  // end redux
  const [image, setImage] = useState();
  const [tindakanOptions, setTindakanOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [latitude, setlatitude] = useState(0);
  const [longitude, setlongiude] = useState(0);
  const [form, setForm] = useState();
  const [dataNama, setDataNama] = useState('');
  const [dataTelp, setdataTelp] = useState(0);
  const [dataAlamat, setDataAlamat] = useState('');
  const [bencanaOptions, setBencanaOptions] = useState('');
  const [keybencana, setKeyBencana] = useState(0);
  const [selected, setSelected] = React.useState(0);
  const [date, setDate] = useState(new Date());
  const [kecamatanOption, setKecamatanOption] = useState([]);
  const [keykecamatan, setkeyKecamatan] = useState(0);
  const [desaOPtion, setDesaOption] = useState([]);
  const [keyDesa, setKeyDesa] = useState(0);
  const [isiaduan, setIsiAduan] = useState('');
  const [inputs, setInputs] = useState([{value: '', image: null}]);

  const handleAddInput = () => {
    setInputs([...inputs, {value: '', image: null}]);
  };
  const handleChangeLat = text => {
    setlatitude(text);
  };
  const handleChangeLong = text => {
    setlongiude(text);
  };
  const handleChangeNama = text => {
    setDataNama(text);
  };
  const handleChangeNo = text => {
    setdataTelp(text);
  };
  const handleChangeALamat = text => {
    setDataAlamat(text);
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

  const dataJenis = [
    {key: '1', value: 'PENCEGAHAN'},
    {key: '2', value: 'PENANGGULANGAN'},
  ];
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
  useEffect(() => {
    axios
      .get(`/v1/kecamatan?page=1&perPage=27`)
      .then(res => {
        let newArray = res.data.rows.map(item => {
          return {key: item.id, value: item.kecamatan};
        });
        setKecamatanOption(newArray);
      })
      .catch(error => console.error(error));
  }, []);
  useEffect(() => {
    setTimeout(() => {
      axios
        .get(`/v1/desa?page=1&perPage=27`)
        .then(res => {
          let newArray = res.data.rows.map(item => {
            return {key: item.id, value: item.desa};
          });
          setDesaOption(newArray);
        })
        .catch(error => console.error(error));
    }, 3000);
  }, []);

  const handleCreatePusdalop = async () => {
    try {
      // let formData = new FormData();
      // for (let key in dataPusdalop) {
      //   formData.append(key, dataPusdalop[key]);
      //   console.log('INI DATA DALAM FUNGSI', formData);
      // }
      const datauser = await AsyncStorage.getItem('token');
      // console.log(datauser);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + datauser,
        },
      };
      await dispatch(createDataPusdalop(dataPusdalop, config));
      alert('Sukses Membuat Laporan');
      props.navigation.navigate('Pusdalop');

      // const response = await axios.post('/v1/pusdalops', formData, config);
      // console.log(response.data);
    } catch (error) {
      alert('GAGAL');
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
  const handleChangeForm = text => {
    setForm(text);
  };

  const dataPusdalop = {
    id_jenis_bencana: selected,
    id_tindakan: keybencana,
    user_pemohon: dataNama,
    isi_aduan: form,
    no_telepon: dataTelp,
    nama: dataNama,
    alamat: dataAlamat,
    id_desa: keyDesa,
    id_kecamatan: keykecamatan,
    lng: longitude,
    lat: latitude,
    tindakan_trc: 'true',
    logpal: 'true',
    //ke:tessss
    //keteranganGambar[1]:tosss
    tanggal: date,
  };
  // console.log('INI DATA PUSDALOP', dataPusdalop);

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
              setSelected={key => setSelected(key)}
              data={dataJenis}
              save="key"
              itemKey="key"
              itemLabel="name"
              onValueChange
            />
          </View>
          <View>
            <Text>Jenis Bencana</Text>

            <SelectList
              data={bencanaOptions}
              itemKey="id"
              itemLabel="name"
              defaultOption={bencanaOptions}
              setSelected={key => setKeyBencana(key)}
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
              onChangeText={handleChangeForm}
              value={form}
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
                onChangeText={handleChangeLat}
                value={latitude}
                placeholder="Latitude"
                keyboardType="numeric"
                style={{marginRight: 30}}
              />

              <TextInput
                onChangeText={handleChangeLong}
                keyboardType="numeric"
                placeholder="Longitude"
                value={longitude}
                style={{marginRight: 10}}
              />
              <Pressable style={style.buttonSearchMap} onPress={handleSearch}>
                <Text style={style.textSearchMap}>Cari</Text>
              </Pressable>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <View>
                <Text>Pelapor:</Text>
              </View>
              <View style={{marginLeft: 30}}>
                <Text>Nama</Text>
              </View>
              <View style={{marginLeft: 110}}>
                <Text>No TELP/HP</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{marginLeft: 80}}>
                <TextInput
                  placeholder="Masukan Nama"
                  style={{
                    borderWidth: 2,
                    borderColor: 'Black',
                    borderRadius: 10,
                    marginRight: 5,
                    width: 150,
                  }}
                  onChangeText={handleChangeNama}
                  value={dataNama}
                />
              </View>
              <View>
                <TextInput
                  placeholder="Masukan No telp"
                  style={{
                    borderWidth: 2,
                    borderColor: 'Black',
                    borderRadius: 10,
                    marginRight: 5,
                    width: 150,
                  }}
                  onChangeText={handleChangeNo}
                  value={dataTelp}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
          {/* Kecamatan */}
          <View style={{marginTop: 20}}>
            <View>
              <Text>Kecamatan:</Text>
            </View>
            <View>
              <View style={{marginLeft: 10}}>
                <SelectList
                  setSelected={key => setkeyKecamatan(key)}
                  data={kecamatanOption}
                  save="key"
                  itemKey="key"
                  itemLabel="name"
                />
              </View>
            </View>
          </View>
          {/* end Kecamatan */}
          {/* Desa */}
          <View style={{marginTop: 20}}>
            <View>
              <Text>Desa</Text>
            </View>
            <View>
              <SelectList
                setSelected={key => setKeyDesa(key)}
                data={desaOPtion}
                save="key"
                itemKey="key"
                itemLabel="name"
              />
            </View>
          </View>
          {/* End Desa */}
          {/* Alamat */}
          <View style={{marginTop: 10}}>
            <View>
              <Text>Alamat</Text>
            </View>
            <View>
              <TextInput
                placeholder="Masukan Alamat"
                style={{borderWidth: 3, borderColor: 'black', borderRadius: 10}}
                onChangeText={handleChangeALamat}
                value={dataAlamat}
              />
            </View>
          </View>
          {/* End Alamat */}
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
                      marginBottom: 10,
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
