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
// import axios from 'axios';
import {
  deleteDataPusdalop,
  getDataPusdalopById,
  updateDataPusdalop,
} from '../../stores/actions/pusdalop';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
export default function PusdalopDetail(props) {
  const dispatch = useDispatch();
  const dataPusdalopRedux = useSelector(state => state.pusdalop.data);
  const [form, setForm] = useState({});
  const [dataNama, setDataNama] = useState('');
  const [inputs, setInputs] = useState([{value: '', image: null}]);
  const [date, setDate] = useState(new Date());
  const [tindakanOptions, setTindakanOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [bencanaOptions, setBencanaOptions] = useState([]);
  const [keybencana, setKeyBencana] = useState(0);
  const [selected, setSelected] = React.useState('');
  const [latitude, setlatitude] = useState('');
  const [longitude, setlongiude] = useState();
  const [kecamatanOption, setKecamatanOption] = useState([]);
  const [keykecamatan, setkeyKecamatan] = useState(0);
  const [desaOPtion, setDesaOption] = useState([]);
  const [keyDesa, setKeyDesa] = useState(0);
  const [dataAlamat, setDataAlamat] = useState('');
  const [dataTelp, setdataTelp] = useState(0);
  const [isiaduan, setIsiAduan] = useState('');
  const pusdalopid = props.route.params.pusdalopId;
  const pusdalopId = props.route.params.pusdalopId;
  const [latitudeData, setLatitudeData] = useState('');
  const [longitudeData, setLongitudeData] = useState('');
  const [dataById, setDataByID] = useState({});
  console.log('ini data pusdalop', dataById?.data?.subBencana?.sub_jenis);
  const dateStr = dataById?.data?.tanggal;
  const formatDate = moment(dateStr).format('YYYY-MM-DD HH:mm:ss');
  const lat = parseFloat(dataById?.data?.lat);
  const lng = parseFloat(dataById?.data?.lng);
  const defaultLat = -7.43973580004;
  const defaultLng = 109.244402567;

  const [dataUpdatePusdalop, setDataUpdatePusdalop] = useState({
    id_jenis_bencana: '',
    id_tindakan: '',
    // user_pemohon: '',
    isi_aduan: '',
    no_telepon: '',
    nama: '',
    alamat: '',
    id_desa: '',
    id_kecamatan: '',
    lng: longitudeData,
    lat: latitudeData,
    tindakan_trc: true,
    logpal: true,
    tanggal: date.toISOString().slice(0, 10),
  });
  // console.log('INI DATA UPDATE', dataUpdatePusdalop);

  const handleChangeNama = text => {
    setDataNama(text);
  };
  const handleChangeIsi = text => {
    setIsiAduan(text);
  };
  const handleChangeNo = text => {
    setdataTelp(text);
  };

  useEffect(() => {
    handlegetPusdalopId();
  }, [handlegetPusdalopId]);

  const handleAddInput = () => {
    setInputs([...inputs, {value: '', image: null}]);
  };

  const handleChangeALamat = text => {
    setDataAlamat(text);
  };

  useEffect(() => {
    axios
      .get('/v1/kecamatan?page=1&perPage=27')
      .then(res => {
        let newArray = res.data.rows.map(item => {
          return {key: item.id, value: item.kecamatan};
        });
        setKecamatanOption(newArray);
      })
      .catch(error => {
        if (error.response && error.response.status === 403) {
          props.navigation.navigate('AuthScreen');
        } else {
          console.error(error);
        }
      });
  }, []);
  useEffect(() => {
    setTimeout(() => {
      axios
        .get('/v1/desa?page=1&perPage=27')
        .then(res => {
          let newArray = res.data.rows.map(item => {
            return {key: item.id, value: item.desa};
          });
          setDesaOption(newArray);
        })
        .catch(error => console.error(error));
    }, 3000);
  }, []);
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

  const handleChangeForm = (value, name) => {
    setDataUpdatePusdalop({...dataUpdatePusdalop, [name]: value});
  };
  const handleSelect = key => {
    setSelected(key);
    setDataUpdatePusdalop(prevData => ({
      ...prevData,
      id_jenis_bencana: key,
    }));
  };
  const handleJenis = key => {
    setDataUpdatePusdalop(prevData => ({
      ...prevData,
      id_tindakan: key,
    }));
  };
  const handleKecamatan = key => {
    setDataUpdatePusdalop(prevData => ({
      ...prevData,
      id_kecamatan: key,
    }));
  };
  const handleDesa = key => {
    setDataUpdatePusdalop(prevData => ({
      ...prevData,
      id_desa: key,
    }));
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

  // const [stateMap, setStateMap] = useState({
  //   latitude: -7.431391,
  //   longitude: 109.247833,
  // });
  const [mapRegion, setMapRegion] = useState({
    latitude: isNaN(lat) ? defaultLat : lat,
    longitude: isNaN(lng) ? defaultLng : lng,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  // console.log('INI DATA MAP', mapRegion);
  // console.log(stateMap);
  const handleLatitudeChange = text => {
    // setStateMap({...stateMap, latitude: parseFloat(latitude)});
    setLatitudeData(text);
    setDataUpdatePusdalop({
      ...dataUpdatePusdalop,
      lat: text,
    });
  };
  const handleLongitudeChange = text => {
    // setStateMap({...stateMap, longitude: parseFloat(longitude)});
    setLongitudeData(text);
    setDataUpdatePusdalop({
      ...dataUpdatePusdalop,
      lng: text,
    });
  };
  // const handleSearch = () => {
  //   setMapRegion({
  //     ...mapRegion,
  //     latitude: stateMap.latitude,
  //     longitude: stateMap.longitude,
  //   });
  // };
  // const search = () => {
  //   const latitude = parseFloat(latitudeData);
  //   const longitude = parseFloat(longitudeData);
  //   setMapRegion({
  //     latitude: latitude,
  //     longitude: longitude,
  //     latitudeDelta: 0.01,
  //     longitudeDelta: 0.01,
  //   });
  // };
  const handleDeletePusdalop = async () => {
    try {
      const datauser = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + datauser,
        },
      };
      // console.log('PUSDALOP ID HANDLE', pusdalopId);
      await dispatch(deleteDataPusdalop(pusdalopId, config));
      alert('sukses');
      props.navigation.navigate('Pusdalop');
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   if (stateMap.latitude && stateMap.longitude) {
  //     setMapRegion({
  //       latitude: stateMap.latitude,
  //       longitude: stateMap.longitude,
  //       latitudeDelta: 0.0922,
  //       longitudeDelta: 0.0421,
  //     });
  //   }
  // }, [stateMap.latitude, stateMap.longitude]);
  const handleUpdatePusdalop = async () => {
    try {
      console.log('INI DATA PUSDALOP DALAM', dataUpdatePusdalop);
      const datauser = await AsyncStorage.getItem('token');
      const result = await axios({
        method: 'PATCH',
        url: `https://apisimbebas.banyumaskab.go.id/api/v1/pusdalops/${pusdalopid}`,
        data: dataUpdatePusdalop,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + datauser,
        },
      });
      console.log(result);
      // const datauser = await AsyncStorage.getItem('token');
      // const config = {
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //     Authorization: 'Bearer ' + datauser,
      //   },
      // };
      // console.log(
      //   'INI DATA PUSDALOP ID',
      //   dataUpdatePusdalop,
      //   config,
      //   pusdalopid,
      // );
      // await dispatch(
      //   updateDataPusdalop(dataUpdatePusdalop, config, pusdalopid),
      // );
      alert('SUKSES');
      // props.navigation.navigate('Pusdalop');
    } catch (error) {
      console.log(error);
      alert('GAGAL UPDATE');
      props.navigation.navigate('Pusdalop');
    }
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
              name="news"
              size={40}
              color={'white'}
              style={{marginLeft: 10}}
            />
            <Text style={{color: 'white'}}>Detail</Text>
            <Text style={{color: 'white'}}>Laporan Pusdalop</Text>
          </View>
        </View>
        <View style={style.containerInput}>
          <Text style={style.titleEdit}>Edit beberapa data</Text>

          <View style={{padding: 5}}>
            <Text style={style.tittleOption}>Jenis Tindakan</Text>

            <SelectList
              setSelected={handleSelect}
              data={dataJenis}
              save="key"
              itemKey="key"
              itemLabel="name"
              boxStyles={{borderColor: 'black'}}
              placeholder={
                dataById?.data?.tindakan?.jenis_tindakan
                  ? dataById?.data?.tindakan?.jenis_tindakan
                  : 'BELUM ADA'
              }
              // onSelect={dataById.data.data.id_tindakan}
            />
          </View>
          <View>
            <Text style={style.tittleOption}>Jenis Bencana</Text>
            {/* <Button title="get" onPress={handleGetBencana} /> */}

            <SelectList
              // data={bencanaOptions.rows[0] ? bencanaOptions.rows[0] : ''}
              data={bencanaOptions}
              itemKey="id"
              itemLabel="name"
              defaultOption={bencanaOptions}
              boxStyles={{borderColor: 'black'}}
              placeholder={dataById?.data?.subBencana?.sub_jenis}
              setSelected={handleJenis}
            />
          </View>
          <View>
            <Text style={style.tittleOption}>Tanggal Kejadian</Text>
            <TextInput
              placeholder={formatDate}
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
            <Text style={style.tittleOption}>Isi Aduan</Text>
            <TextInput
              placeholder={dataById?.data?.isi_aduan.toString()}
              style={style.inputAduan}
              multiline={true}
              boxStyles={{borderColor: 'black'}}
              onChangeText={text =>
                setDataUpdatePusdalop({
                  ...dataUpdatePusdalop,
                  isi_aduan: text,
                })
              }
              // value={isiaduan}adsddasdsad
            />
          </View>
          <View>
            <Text style={style.tittleOption}>
              Titik Lokasi Terjadinya Bencana
            </Text>
            <View>
              <MapView
                region={mapRegion}
                initialRegion={mapRegion}
                style={{flex: 1, height: 200, width: '100%'}}>
                <Marker
                  draggable
                  coordinate={{
                    latitude: mapRegion.latitude,
                    longitude: mapRegion.longitude,
                  }}
                  onDragEnd={e =>
                    setMapRegion({
                      ...mapRegion,
                      latitude: e.nativeEvent.coordinate.latitude,
                      longitude: e.nativeEvent.coordinate.longitude,
                    })
                  }
                />
              </MapView>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: '5%',
                paddingHorizontal: '25%',
              }}>
              <TextInput
                onChangeText={handleLatitudeChange}
                // value={mapRegion.latitude}
                placeholder={dataById?.data?.lat}
                keyboardType="numeric"
                style={{marginRight: 30}}
              />

              <TextInput
                onChangeText={handleLongitudeChange}
                keyboardType="numeric"
                placeholder={dataById?.data?.lng}
                // value={mapRegion.longitude}
                style={{marginRight: 10}}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: '5%'}}>
            <View>
              <Text style={style.titleEditMar}>Pelapor:</Text>
            </View>
            <View style={style.titleEditMar2}>
              <Text>Nama</Text>
            </View>
            <View style={style.titleEditMar}>
              <Text>No TELP/HP</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{marginLeft: '20%'}}>
              <TextInput
                placeholder={dataById?.data?.nama}
                style={{
                  borderWidth: 1,
                  borderColor: 'Black',
                  borderRadius: 10,
                  marginRight: 5,
                  width: 150,
                }}
                // onChangeText={handleChangeNama}
                onChangeText={text =>
                  setDataUpdatePusdalop({
                    ...dataUpdatePusdalop,
                    nama: text,
                  })
                }
                value={dataUpdatePusdalop.nama}
              />
            </View>
            <View>
              <TextInput
                placeholder={dataById?.data?.no_telpon}
                style={{
                  borderWidth: 1,
                  borderColor: 'Black',
                  borderRadius: 10,
                  marginRight: 5,
                  width: 150,
                }}
                onChangeText={text =>
                  setDataUpdatePusdalop({
                    ...dataUpdatePusdalop,
                    no_telepon: text,
                  })
                }
                // onChangeText={handleChangeNo}
                value={dataTelp}
                keyboardType="numeric"
              />
            </View>
          </View>
          {/* Kecamatan */}
          <View style={{marginTop: '3%'}}>
            <View>
              <Text style={style.tittleOption}>Kecamatan:</Text>
            </View>
            <View>
              <View>
                <SelectList
                  setSelected={handleKecamatan}
                  boxStyles={{borderColor: 'black'}}
                  data={kecamatanOption}
                  save="key"
                  itemKey="key"
                  itemLabel="name"
                  placeholder={dataById?.data?.kecamatan?.kecamatan}
                />
              </View>
            </View>
          </View>
          {/* end Kecamatan */}
          {/* Desa */}
          <View style={{marginTop: '2%'}}>
            <View>
              <Text style={style.tittleOption}>Desa</Text>
            </View>
            <View>
              <SelectList
                setSelected={handleDesa}
                boxStyles={{borderColor: 'black'}}
                data={desaOPtion}
                save="key"
                itemKey="key"
                itemLabel="name"
                placeholder={dataById?.data?.desa?.desa}
              />
            </View>
          </View>
          {/* End Desa */}
          {/* Alamat */}
          <View style={{marginTop: '2%'}}>
            <View>
              <Text style={style.tittleOption}>Alamat</Text>
            </View>
            <View>
              <TextInput
                placeholder={dataById?.data?.alamat}
                style={{borderWidth: 1, borderColor: 'black', borderRadius: 10}}
                onChangeText={dataUpdatePusdalop =>
                  handleChangeForm(dataUpdatePusdalop, 'alamat')
                }
                // onChangeText={handleChangeALamat}
                // value={dat}dasd
              />
            </View>
          </View>
          {/* End Alamat */}
          <View style={{marginTop: 10}}>
            <Pressable style={style.buttonLogin} onPress={handleUpdatePusdalop}>
              <Text style={style.textLogin}>Perbaiki</Text>
            </Pressable>
            <Pressable style={style.buttonBatal} onPress={handleDeletePusdalop}>
              <Text style={style.textLogin}>Hapus</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  inputAduan: {
    width: '100%',
    borderWidth: 1,
    marginTop: 5,
    borderRadius: 10,
    borderColor: 'black',
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
    marginTop: -20,
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
  tittleOption: {
    color: 'black',
    marginRight: '3%',
    marginTop: '3%',
    marginBottom: '2%',
  },
  titleEdit: {
    color: 'black',
  },
  titleEditMar: {
    color: 'black',
    marginRight: '10%',
  },
  titleEditMar2: {
    color: 'black',
    marginRight: '30%',
  },
});
