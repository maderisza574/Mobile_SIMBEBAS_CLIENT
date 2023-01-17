import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import DatePicker from 'react-native-date-picker';
import MapView from 'react-native-maps';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function Pusdalops() {
  //for image picker
  const [image, setImage] = useState();
  // for Date picker
  const [date, setDate] = useState(new Date());
  // console.log(date);
  const [open, setOpen] = useState(false);
  // for dropdown
  const [select, setSelected] = React.useState('');
  //
  const data = [
    {
      key: '1',
      value: 'Tindakan',
    },
    {key: '2', value: 'Penangulangan'},
    ,
    {key: '2', value: 'Penangulangan Bencana'},
  ];
  // for camera
  const handleLaunchCamera = async () => {
    try {
      const photo = await launchCamera({
        mediaType: 'photo',
        maxWidth: 100,
        quality: 0.2,
        cameraType: 'back',
      });
      const formData = new FormData();
      formData.append('image', {
        name: photo.assets[0].fileName,
        type: photo.assets[0].type,
        uri: photo.assets[0].uri,
      });
      const result = await setImage(result.assets[0].uri);
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
  return (
    <View>
      <ScrollView>
        <Text style={{marginBottom: 30}}>
          Silahkan isi beberapa data untuk melapor
        </Text>
        <View style={{padding: 5}}>
          <Text style={{marginRight: 5, marginTop: 6}}>Jenis Tindakan</Text>
          <SelectList
            setSelected={val => setSelected(val)}
            data={data}
            save="value"
            placeholder="Pilih Jenis Tindakan"
          />
        </View>
        <View>
          <Text>Jenis Bencana</Text>
          <SelectList
            setSelected={() => setSelected()}
            data={data}
            save="value"
            placeholder="Masukan Jenis Bencana"
          />
        </View>
        <View>
          <Text>Tanggal Kejadian</Text>
          <Text>Selected date: {date.toLocaleDateString()}</Text>
          <Button
            title="Pilih Tanggal dan waktu"
            onPress={() => setOpen(true)}
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
        </View>
        <View>
          <Text>Isi Aduan</Text>
          <TextInput placeholder="Masukan Isi Aduan" style={style.inputAduan} />
        </View>
        <View style={{marginTop: 10}}>
          <Text>Titik Lokasi Terjadinya Bencana</Text>
          <View>
            <MapView
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              style={{flex: 1, height: 200, width: 400}}
            />
          </View>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <TextInput
              placeholder="Lattitude"
              style={{
                marginRight: 20,
                marginLeft: 10,
                borderWidth: 1,
                borderRadius: 3,
                width: 170,
              }}
            />
            <TextInput
              placeholder="Longtitude"
              style={{borderWidth: 1, borderRadius: 3, width: 170}}
            />
          </View>
        </View>
        <View>
          <Text>Upload gambar</Text>
        </View>
        <View style={{flexDirection: 'row', padding: 10}}>
          <View style={{marginRight: 60}}>
            <Text>Preview Image</Text>
            <Image source={{uri: image}} style={{width: 30, height: 30}} />
          </View>
          <TouchableOpacity
            style={{borderWidth: 1, marginRight: 10, width: 60}}
            onPress={handleLaunchCamera}>
            <Text>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{borderWidth: 1, marginRight: 10}}
            onPress={handleLaunchImageLibrary}>
            <Text>Gallery</Text>
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
          <Button title="Kirim" />
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
});
