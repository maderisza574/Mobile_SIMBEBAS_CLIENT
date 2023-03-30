import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
  Button,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {SelectList} from 'react-native-dropdown-select-list';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import MapView, {Marker} from 'react-native-maps';
import axios from '../../utils/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {Chip} from 'react-native-paper';

export default function VerifikatorDetail(props) {
  const [dataById, setDataByID] = useState({});
  const [images, setImages] = useState([]);
  const [inputs, setInputs] = useState([{value: '', image: null}]);
  const pusdalopid = props.route.params.pusdalopId;
  console.log('INI DATA PUSDALOP DETAIL', dataById?.data?.alamat);
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
              // setDataPusdalop({
              //   ...dataPusdalop,
              //   image: [...dataPusdalop.image, response.assets],
              // });
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
      // setFormData({
      //   ...dataPusdalop,
      //   images: [...dataPusdalop.images, ...photo.assets],
      // });
    }
    // console.log('INI IMAGE LIBRARY', formData._parts[0]);
    // setImages(photo.assets[0].uri);
  };

  return (
    <>
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
            <Text style={{color: 'white'}}>Verifikator</Text>
            <Text style={{color: 'white'}}>(Verifikator Detail)</Text>
          </View>
          <View style={style.containerInput}>
            <Text>Perbaiki Isian Data Bencana</Text>
            <View style={{marginBottom: 10}}>
              <Text>Jenis Bencana</Text>
              <TextInput
                placeholder="Tanah Longsor"
                style={{borderWidth: 1, borderRadius: 10}}
                editable={false}
              />
            </View>
            <View>
              <Text>Tanggal Kejadian</Text>
              <TextInput
                placeholder={dataById?.data?.tanggal}
                style={{borderWidth: 1, borderRadius: 10}}
                editable={false}
              />
            </View>
            <View>
              <Text>Lokasi Terjadinya Bencana</Text>
              <TextInput
                placeholder="INPUT MAP"
                style={{borderWidth: 1, borderRadius: 10}}
              />
            </View>
            <View>
              <Text>Kecamatan</Text>
              <TextInput
                placeholder={dataById?.data?.kecamatan?.kecamatan}
                style={{borderWidth: 1, borderRadius: 10}}
              />
            </View>
            <View>
              <Text>Desa</Text>
              <TextInput
                placeholder={dataById?.data?.desa?.desa}
                style={{borderWidth: 1, borderRadius: 10}}
              />
            </View>
            <View>
              <Text>Alamat</Text>
              <TextInput
                placeholder={dataById?.data?.alamat}
                style={{borderWidth: 1, borderRadius: 10}}
              />
            </View>
            <View>
              <Text>Kerusakan Rumah</Text>
              <TextInput
                placeholder="alamat"
                style={{borderWidth: 1, borderRadius: 10}}
              />
            </View>
            <View>
              <Text>Cakupan Banjir</Text>
              <TextInput
                placeholder="alamat"
                style={{borderWidth: 1, borderRadius: 10}}
              />
            </View>
            <View>
              <Text>Deskripsi Kronologis</Text>
              <TextInput
                placeholder="alamat"
                style={{borderWidth: 1, borderRadius: 10}}
              />
            </View>
            <View>
              <Text>Tindakan</Text>
              <TextInput
                placeholder="Pendataan dan koordinasi dengan perangkat desa"
                style={{borderWidth: 1, borderRadius: 10}}
              />
            </View>
            <View>
              <Text>Peralatan dibutuhkan</Text>
              <TextInput
                placeholder="Pendataan dan koordinasi dengan perangkat desa"
                style={{borderWidth: 1, borderRadius: 10}}
              />
            </View>
            <View>
              <Text>Rekomendasi</Text>
              <TextInput
                placeholder="Pendataan dan koordinasi dengan perangkat desa"
                style={{borderWidth: 1, borderRadius: 10}}
              />
            </View>
            <View style={style.viewVerifikator}>
              <View>
                <Text style={style.fontviewVerifikator}>ASESMENT</Text>
              </View>
            </View>
            <View>
              <View>
                <Text style={style.colorFortext}>
                  Data Barang Yang Di Butuhkan
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text>Nama Barang</Text>
                <Text style={{marginLeft: '22%'}}>Qty</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <SelectList
                  // setSelected={handleSelect}
                  // setSelected={key => setSelected(key)}
                  // data={dataJenis}
                  save="key"
                  itemKey="key"
                  itemLabel="name"
                  onValueChange
                  boxStyles={{borderColor: 'black'}}
                  placeholder="Pilih Jenis Tindakan"
                />
                <TextInput
                  style={{
                    flex: 1,
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    marginRight: 10,
                    marginLeft: 5,
                  }}
                  // onChangeText={text => setText2(text)}
                  // value={text2}
                />
                <Button title="Submit" />
              </View>
            </View>
            <View>
              <Text>Upload File Gambar</Text>
            </View>
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
                      // value={dataPusdalop.keteranganImage}
                      // onChangeText={text =>
                      //   setDataPusdalop({
                      //     ...dataPusdalop,
                      //     keteranganImage: [text],
                      //   })
                      // }
                    />
                    {/* ))} */}
                    <Button
                      title="Remove"
                      onPress={() => handleRemoveInput(index)}
                    />
                  </View>
                </View>
              ))}
            </View>
            <View></View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 1300,
                marginBottom: '3%',
                // backgroundColor: 'red',
                position: 'absolute',
                // zIndex: 100,
              }}>
              <View>
                <Chip
                  styicon="information"
                  onPress={() => console.log('Pressed')}
                  style={style.styleChip}>
                  <Icon
                    name="hand"
                    size={20}
                    style={{marginLeft: 5, marginRight: 3}}
                    selectionColor
                  />
                  <Text>Tindakan TRC</Text>
                </Chip>
              </View>
              <View>
                <Chip
                  styicon="information"
                  onPress={() => console.log('Pressed')}
                  style={style.chipLangsung}>
                  <Icon name="archive" size={20} selectionColor />
                  <Text>Pemberian Langsung</Text>
                </Chip>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                zIndex: 99999,
                position: 'absolute',
                marginTop: 1340,
                marginBottom: '2%',
              }}>
              <View>
                <Chip
                  styicon="information"
                  onPress={() => console.log('Pressed')}
                  style={style.styleChip}>
                  <Icon
                    name="new"
                    size={20}
                    style={{marginLeft: 5, marginRight: 3}}
                    selectionColor
                  />
                  <Text>Penangan Kontruksi</Text>
                </Chip>
              </View>
              <View>
                <Chip
                  styicon="information"
                  onPress={() => console.log('Pressed')}
                  style={style.chipAlat}>
                  <Icon
                    name="creative-commons-remix"
                    size={20}
                    style={{marginLeft: 5, marginRight: 3}}
                    selectionColor
                  />
                  <Text>Alat Berat</Text>
                </Chip>
              </View>
            </View>
            <View style={{marginTop: '25%'}}>
              <Chip
                styicon="information"
                onPress={() => console.log('Pressed')}
                style={style.chipDitangani}>
                <Icon
                  name="creative-commons-attribution"
                  size={20}
                  style={{marginLeft: 5, marginRight: 3}}
                  selectionColor
                />
                <Text>Ditangani Dinas Lain</Text>
              </Chip>
            </View>
            <View style={style.buttonStyle}>
              <Button title="Verifikasi & Simpan" />
            </View>
            <View>
              <Pressable style={style.buttonBatal}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Batal</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const style = StyleSheet.create({
  titleScreen: {
    backgroundColor: '#FF6A16',
    color: 'white',
    height: 1700,
  },
  containerInput: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderRadius: 30,
    padding: 6,
    width: '100%',
    height: 2000,
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
    backgroundColor: '#ff471a',
    width: '100%',
    textAlign: 'center',
    height: 50,
    marginTop: 30,
  },
  buttonBatal: {
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 12,
    // paddingHorizontal: 32,
    borderRadius: 7,
    backgroundColor: '#ff0000',
    width: '100%',
    textAlign: 'center',
    height: 40,
    // marginTop: 10,
  },
  viewVerifikator: {
    backgroundColor: '#FF6A16',
    width: '100%',
    height: '2%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
    borderRadius: 20,
  },
  fontviewVerifikator: {
    color: 'white',
    fontWeight: 'bold',
  },
  colorFortext: {
    color: 'black',
    paddingHorizontal: '3%',
    paddingVertical: '3%',
  },
  multipleInputLeft: {
    borderWidth: 1,
    borderRadius: 10,
  },
  containerMulLeft: {
    width: '100%',
  },
  styleChip: {
    width: '100%',
    flex: 1,
  },
  chipLangsung: {
    width: '85%',
    flex: 1,
    marginLeft: '10%',
  },
  chipAlat: {
    width: '85%',
    flex: 1,
    marginLeft: '10%',
  },
  chipDinas: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipDitangani: {
    marginTop: '2%',
    height: '14%',
    width: '50%',
  },
  buttonStyle: {
    marginTop: '-35%',
    marginBottom: '3%',
    // backgroundColor: 'red',
  },
});
