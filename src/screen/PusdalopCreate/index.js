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
export default function PusdalopCreate(props) {
  // redux
  const dispatch = useDispatch();
  const dataPusdalopRedux = useSelector(state => state.pusdalop.data);
  // end redux

  // console.log('INI DATA IMAGE CREATE', image);

  const [open, setOpen] = useState(false);
  const [dataNama, setDataNama] = useState('tes');
  const [bencanaOptions, setBencanaOptions] = useState('');
  const [selected, setSelected] = React.useState(0);
  const [date, setDate] = useState(new Date());
  const [kecamatanOption, setKecamatanOption] = useState([]);
  const [desaOPtion, setDesaOption] = useState([]);
  const [inputs, setInputs] = useState([{value: '', image: null}]);
  const [images, setImages] = useState([]);
  // console.log('INI DATA IMAGES', images[0][0].uri);
  // NEW DECLARE MAP
  const navPusdalop = () => {
    props.navigation.navigate('Pusdalop');
  };
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
          message: 'SIMBEBAS MEMBUTUHKAN LOKASI ANDA',
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
    const latitude = parseFloat(dataPusdalop.lat);
    const longitude = parseFloat(dataPusdalop.lng);
    setRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
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
  const handleRemoveInput = index => {
    setInputs(inputs.filter((input, i) => i !== index));
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
      const datauser = await AsyncStorage.getItem('token');
      const result = await axios({
        url: 'http://10.100.0.106:5000/api/v1/pusdalops',
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + datauser,
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
          title: 'IZIN KAMERA',
          message: 'SIMBEBAS MEMBUTUHKAN AKSES KAMERA ',
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
              setImages(prevImages => [...prevImages, response.assets]);
              setDataPusdalop({
                ...dataPusdalop,
                image: [...dataPusdalop.image, response.assets],
              });
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
  // console.log('INI DATA PUSDALOP', dataPusdalop.image[0]?.uri);

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
          <Text style={style.titleSilahkan}>
            Silahkan isi beberapa data untuk melapor
          </Text>
          <View style={{padding: 5}}>
            <Text style={style.titleOption}>Jenis Tindakan</Text>

            <SelectList
              setSelected={handleSelect}
              // setSelected={key => setSelected(key)}
              data={dataJenis}
              save="key"
              itemKey="key"
              itemLabel="name"
              onValueChange
              boxStyles={{borderColor: 'black'}}
              placeholder="Pilih Jenis Tindakan"
            />
          </View>
          <View>
            <Text style={style.titleOption}>Jenis Bencana</Text>

            <SelectList
              data={bencanaOptions}
              itemKey="id"
              itemLabel="name"
              defaultOption={bencanaOptions}
              boxStyles={{borderColor: 'black'}}
              // setSelected={key => setKeyBencana(key)}
              setSelected={handleJenis}
              placeholder="Pilih Jenis Bencana"
            />
          </View>
          <View>
            <Text style={style.titleOption}>Tanggal Kejadian</Text>
            <TextInput
              placeholder={date.toLocaleDateString()}
              style={style.inputTanggal}
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
            <Text style={style.titleOption}>Isi Aduan</Text>
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
            <Text style={style.titleOption}>
              Titik Lokasi Terjadinya Bencana
            </Text>
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
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                justifyContent: 'space-between',
              }}>
              <TextInput
                // style={styles.searchBar}
                placeholder="Latitude"
                value={dataPusdalop.lat}
                // onChangeText={text => setLatitude(text)}
                onChangeText={dataPusdalop =>
                  handleChangeForm(dataPusdalop, 'lat')
                }
                keyboardtype="numeric"
              />
              <TextInput
                // style={styles.searchBar}
                placeholder="Longitude"
                value={dataPusdalop.lng}
                // onChangeText={text => setLongitude(text)}
                onChangeText={dataPusdalop =>
                  handleChangeForm(dataPusdalop, 'lng')
                }
                keyboardtype="numeric"
              />
              <Pressable style={style.buttonSearchMap} onPress={() => search()}>
                <Text style={style.textSearchMap}>Cari</Text>
              </Pressable>
            </View>
            <View style={{flexDirection: 'row', marginTop: '5%'}}>
              <View>
                <Text style={style.titleColor}>Pelapor:</Text>
              </View>
              <View style={{marginLeft: '3%'}}>
                <Text style={style.titleColor}>Nama</Text>
              </View>
              <View style={{marginLeft: '30%'}}>
                <Text style={style.titleColor}>No TELP/HP</Text>
              </View>
            </View>
            <View style={{marginLeft: '5%'}}>
              <View style={{flexDirection: 'row', paddingHorizontal: '10%'}}>
                <TextInput
                  placeholder="Masukan Nama"
                  style={{
                    borderWidth: 1,
                    borderColor: 'Black',
                    borderRadius: 10,
                    // marginRight: '10%',
                    width: '50%',
                  }}
                  onChangeText={dataPusdalop =>
                    handleChangeForm(dataPusdalop, 'nama')
                  }
                  // value={dataNama}
                />

                <TextInput
                  placeholder="Masukan No telp"
                  style={{
                    borderWidth: 1,
                    borderColor: 'Black',
                    borderRadius: 10,
                    marginLeft: '3%',
                    // marginRight: '1%',
                    width: '50%',
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
              <Text style={style.titleOption}>Kecamatan</Text>
            </View>
            <View>
              <View>
                <SelectList
                  setSelected={handleKecamatan}
                  data={kecamatanOption}
                  save="key"
                  itemKey="key"
                  itemLabel="name"
                  boxStyles={{borderColor: 'black'}}
                  placeholder="Pilih Kecamatan"
                />
              </View>
            </View>
          </View>
          {/* end Kecamatan */}
          {/* Desa */}
          <View style={{marginTop: 20}}>
            <View>
              <Text style={style.titleOption}>Desa</Text>
            </View>
            <View>
              <SelectList
                setSelected={handleDesa}
                data={desaOPtion}
                save="key"
                itemKey="key"
                itemLabel="name"
                boxStyles={{borderColor: 'black'}}
                placeholder="Pilih Desa"
              />
            </View>
          </View>
          {/* End Desa */}
          {/* Alamat */}
          <View>
            <View>
              <Text style={style.titleOption}>Alamat</Text>
            </View>
            <View>
              <TextInput
                placeholder="Masukan Alamat"
                style={style.inputAduan}
                onChangeText={dataPusdalop =>
                  handleChangeForm(dataPusdalop, 'alamat')
                }
                // value={dataAlamat}
              />
            </View>
          </View>
          {/* End Alamat */}
          <View style={{marginTop: 20}}>
            <Text style={style.titleOption}>Upload gambar</Text>
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
                  <View style={{marginRight: '30%'}}>
                    {images && images[0] && images[0][0]?.uri && (
                      <Image
                        source={{
                          uri: images[0][0].uri,
                        }}
                        style={{height: 200, width: 200}}
                      />
                    )}
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
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
                  <Text style={style.titleOption}>Keterangan</Text>
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
            <Pressable style={style.buttonBatal} onPress={navPusdalop}>
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
    marginTop: '1%',
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
  titleSilahkan: {
    color: 'black',
    marginBottom: '5%',
    fontSize: 16,
  },
  titleOption: {
    color: 'black',
    marginRight: '3%',
    marginTop: '3%',
    marginBottom: '2%',
  },
  titleColor: {
    color: 'black',
  },
  inputTanggal: {
    width: '100%',
    borderWidth: 1,
    marginTop: '1%',
    borderRadius: 10,
    borderColor: 'black',
  },
});
