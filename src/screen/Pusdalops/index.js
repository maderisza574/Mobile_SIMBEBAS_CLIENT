import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import DatePicker from 'react-native-date-picker';
import MapView from 'react-native-maps';

export default function Pusdalops() {
  // for Date picker
  const [date, setDate] = useState(new Date());
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
  return (
    <View>
      <Text style={{marginBottom: 30}}>
        Silahkan isi beberapa data untuk melapor
      </Text>
      <ScrollView>
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
          <View style={{flexDirection: 'row'}}>
            <TextInput
              placeholder="Lattitude"
              style={{marginRight: 20, marginLeft: 10}}
            />
            <TextInput placeholder="Longtitude" />
          </View>
        </View>
        <View>
          <Text>Upload gambar</Text>
          <TextInput placeholder="from camera" />
          <TextInput placeholder="from gallery" />
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
