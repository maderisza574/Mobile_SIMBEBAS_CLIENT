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
import MapView, {Marker} from 'react-native-maps';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from '../../utils/axios';
// import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {createDataPusdalop} from '../../stores/actions/pusdalop';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
Geocoder.init('AIzaSyDJn6Nsc_kU477Symn0acKq1Js7C-1ALbIs');
export default function PusdalopCreate(props) {
  // redux
  const dispatch = useDispatch();
  const dataPusdalopRedux = useSelector(state => state.pusdalop.data);
  // end redux

  // console.log('INI DATA IMAGE CREATE', image);
  const [tindakanOptions, setTindakanOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [latitude, setlatitude] = useState(0);
  const [longitude, setlongiude] = useState(0);
  const [form, setForm] = useState();
  const [dataNama, setDataNama] = useState('tes');
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
  const [keteranganImage, setKeteranganImage] = useState([]);
  const [images, setImages] = useState([]);
  // NEW DECLARE MAP
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
  // END DECLARE MAP
  // NEW USE EFFECT MAP
  useEffect(() => {
    requestLocationPermission();
    // getAddressFromLatLng();
  }, []);
  // END USE EFFECT MAP
  //  NEW FUNCTION MAP
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
              alert('Position unavailable. Please try again later.');
            } else {
              alert('An error occurred while retrieving your location.');
            }
          },
          {enableHighAccuracy: true, timeout: 10000},
        );
      } else {
        alert('Error', 'ALAMAT YANG ANDA MASUKAN SALAH');
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
    getAddressFromLatLng();
  };
  const getAddressFromLatLng = async () => {
    try {
      // const latitude = parseFloat(latitudedata);
      // const longitude = parseFloat(longitudedata);
      const response = await Geocoder.from(latitudedata, longitudedata);
      const address = response.results[0].formatted_address;
      console.log(address);
      // setAddressCoder(address);
    } catch (error) {
      console.log(error);
    }
  };

  const onMarkerDragEnd = e => {
    const newRegion = {
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta,
    };
    setRegion(newRegion);
  };

  //  END NEW FUNCION MAP
  // console.log(images);

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
  const handleSelect = key => {
    setSelected(key);
    setDataPusdalop(prevData => ({
      ...prevData,
      id_jenis_bencana: key,
    }));
  };
  const handleJenis = key => {
    setDataPusdalop(prevData => ({
      ...prevData,
      id_tindakan: key,
    }));
  };
  const handleKecamatan = key => {
    setDataPusdalop(prevData => ({
      ...prevData,
      id_kecamatan: key,
    }));
  };
  const handleDesa = key => {
    setDataPusdalop(prevData => ({
      ...prevData,
      id_desa: key,
    }));
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
  // END DROPDWON
  useEffect(() => {
    axios
      .get(`/v1/kecamatan?page=1&perPage=30`)
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
      const formData = new FormData();
      formData.append('id_jenis_bencana', dataPusdalop.id_jenis_bencana);
      formData.append('id_tindakan', dataPusdalop.id_tindakan);
      formData.append('user_pemohon', dataPusdalop.user_pemohon);
      formData.append('isi_aduan', dataPusdalop.isi_aduan);
      formData.append('no_telepon', dataPusdalop.no_telepon);
      formData.append('nama', dataPusdalop.nama);
      formData.append('alamat', dataPusdalop.alamat);
      formData.append('id_desa', dataPusdalop.id_desa);
      formData.append('id_kecamatan', dataPusdalop.id_kecamatan);
      formData.append('lng', dataPusdalop.lng);
      formData.append('lat', dataPusdalop.lat);
      formData.append('tindakan_trc', dataPusdalop.tindakan_trc);
      formData.append('logpal', dataPusdalop.logpal);
      formData.append('tanggal', dataPusdalop.tanggal);
      formData.append('keteranganImage[0]', dataPusdalop.keteranganImage);

      images.length > 0 &&
        images.forEach((v, k) => {
          formData.append(`image[${k}]`, {
            name: v[k].fileName,
            type: v[k].type,
            uri: v[k].uri,
          });
        });
      const result = axios({
        url: 'http://10.100.0.47:5000/api/v1/pusdalops',
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUxNjksImlhdCI6MTY3NjQ0MjQxMH0.eUaMZVhw5RBQVh0h6_YsA4VBMABdlIGLIVNSBm2T01Y',
        },
      });
      console.log(result);
      alert('SUKSES MEMBUAT LAPORAN');
      props.navigation.navigate('Pusdalop');
    } catch (error) {
      console.log(error);
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
            if (response.assets && response.assets.length > 0) {
              const source = [
                {
                  uri: response.assets[0].uri,
                  type: response.assets[0].type,
                  name: response.assets[0].fileName,
                },
              ];
              // console.log('INI DATA GAMBAR', source);
              // const formData = new FormData();
              // formData.append({
              //   name: response.assets[0].fileName,
              //   type: response.assets[0].type,
              //   uri: response.assets[0].uri,
              // });
              // console.log('INI DATA GAMBAR', response.assets);
              // formData.append('array', []);
              // console.log('INI DATA IMAGE', formData._parts);
              // setDataImage({...dataimage, image: source});
              setImages(prevImages => [...prevImages, response.assets]);
              setDataPusdalop({
                ...dataPusdalop,
                //   // image: [...dataPusdalop.image, ...dataimage],
                //   // image: [...dataPusdalop.image, ...source],
                image: [...dataPusdalop.image, response.assets],
              });

              // setImage(formData._parts[0].uri);
              // // console.log(dataPusdalopNew);
            } else {
              console.log('No image selected');
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
  console.log();
  const handleLaunchImageLibrary = async () => {
    const photo = await launchImageLibrary({
      mediaType: 'photo',
      maxWidth: 100,
    });
    if (photo) {
      setFormData({
        ...dataPusdalop,
        images: [...dataPusdalop.images, ...photo.assets],
      });
    }
    // console.log('INI IMAGE LIBRARY', formData._parts[0]);
    // setImages(photo.assets[0].uri);
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
  const handleChangeForm = (value, name) => {
    setDataPusdalop({...dataPusdalop, [name]: value});
  };

  const [dataPusdalop, setDataPusdalop] = useState({
    id_jenis_bencana: '', // initialize with empty string
    id_tindakan: '',
    user_pemohon: dataNama,
    isi_aduan: '',
    no_telepon: '',
    nama: '',
    alamat: '',
    id_desa: '',
    id_kecamatan: '',
    lng: '',
    lat: '',
    tindakan_trc: 'true',
    logpal: 'true',
    tanggal: date,
    image: images,
    keteranganImage: [],
  });
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
              setSelected={handleSelect}
              // setSelected={key => setSelected(key)}
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
              // setSelected={key => setKeyBencana(key)}
              setSelected={handleJenis}
            />
          </View>
          <View>
            <Text>Tanggal Kejadian</Text>
            <TextInput
              placeholder={date.toLocaleDateString()}
              style={{borderWidth: 1, borderRadius: 10}}
              editable={false}
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
          <View style={{marginTop: 10}}>
            <Text>Isi Aduan</Text>
            <TextInput
              placeholder="Masukan Isi Aduan"
              style={style.inputAduan}
              multiline={true}
              onChangeText={text =>
                setDataPusdalop({
                  ...dataPusdalop,
                  isi_aduan: text,
                })
              }
              value={dataPusdalop.isi_aduan}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Titik Lokasi Terjadinya Bencana</Text>
            {/* <View>
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
            </View> */}
            <View>
              <MapView
                style={{flex: 1, height: 200, width: 380}}
                region={region}
                onRegionChangeComplete={setRegion}
                onPress={e => console.log(e.nativeEvent.coordinate)}>
                <Marker
                  draggable
                  coordinate={{
                    latitude: region.latitude,
                    longitude: region.longitude,
                  }}
                  onDragEnd={onMarkerDragEnd}
                />
              </MapView>
            </View>
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <TextInput
                // style={styles.searchBar}
                placeholder="Latitude"
                value={latitudedata}
                onChangeText={text => setLatitude(text)}
              />
              <TextInput
                // style={styles.searchBar}
                placeholder="Longitude"
                value={longitudedata}
                onChangeText={text => setLongitude(text)}
              />
              {/* <TextInput
                onChangeText={dataPusdalop =>
                  handleChangeForm(dataPusdalop, 'lat')
                }
                value={latitude}
                placeholder="Latitude"
                keyboardType="numeric"
                style={{marginRight: 30}}
              /> */}

              {/* <TextInput
                onChangeText={dataPusdalop =>
                  handleChangeForm(dataPusdalop, 'lng')
                }
                keyboardType="numeric"
                placeholder="Longitude"
                value={longitude}
                style={{marginRight: 10}}
              /> */}
              <Pressable style={style.buttonSearchMap} onPress={() => search()}>
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
                  onChangeText={dataPusdalop =>
                    handleChangeForm(dataPusdalop, 'nama')
                  }
                  // value={dataNama}
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
                  onChangeText={dataPusdalop =>
                    handleChangeForm(dataPusdalop, 'no_telepon')
                  }
                  // value={dataTelp}
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
                  setSelected={handleKecamatan}
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
                setSelected={handleDesa}
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
                onChangeText={dataPusdalop =>
                  handleChangeForm(dataPusdalop, 'alamat')
                }
                // value={dataAlamat}
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
                    {dataPusdalop.image[0]?.uri && (
                      <Image
                        source={{
                          uri: dataPusdalop.image[0]
                            ? dataPusdalop.image[0]?.uri
                            : null,
                        }}
                        style={{height: 200, width: 200}}
                      />
                    )}
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
                  {/* {keteranganImage.map((text, index) => ( */}
                  <TextInput
                    placeholder="Masukan Keterangan gambar"
                    key={index}
                    style={{
                      height: 100,
                      width: 350,
                      borderWidth: 1,
                      marginLeft: 15,
                      marginTop: 5,
                      marginBottom: 10,
                    }}
                    value={dataPusdalop.keteranganImage}
                    onChangeText={text =>
                      setDataPusdalop({
                        ...dataPusdalop,
                        keteranganImage: [text],
                      })
                    }
                  />
                  {/* ))} */}
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
    width: '100%',
    borderWidth: 1,
    marginTop: 5,
    borderRadius: 10,
    borderColor: '#b8b894',
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
