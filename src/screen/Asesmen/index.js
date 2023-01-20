import React from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

export default function Asesmen() {
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
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'white'}}>Lapor Bencana</Text>
              <Text style={{color: 'white'}}>(asesmen)</Text>
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
              placeholder="Tanah Longsor"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Tanggal Kejadian</Text>
            <TextInput
              placeholder="Tanah Longsor"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Titik Lokasi Terjadinya Bencana</Text>
            <TextInput
              placeholder="Tanah Longsor"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Kecamatan</Text>
            <TextInput
              placeholder="Tanah Longsor"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Desa</Text>
            <TextInput
              placeholder="Tanah Longsor"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Alamat</Text>
            <TextInput
              placeholder="Tanah Longsor"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Tanggal Asesmen</Text>
            <TextInput
              placeholder="Tanah Longsor"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Dampak</Text>
            <TextInput
              placeholder="Tanah Longsor"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Kerusakan Fasum</Text>
            <TextInput
              placeholder="Tanah Longsor"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Kerusakan Rumah</Text>
            <TextInput
              placeholder="Tanah Longsor"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            />
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
            <TextInput
              placeholder="Tanah Longsor"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Korban Jiwa</Text>
            <TextInput
              placeholder="Tanah Longsor"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Cakupan Bencana</Text>
            <TextInput
              placeholder="Tanah Longsor"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Potensi Bencana Susulan</Text>
            <TextInput
              placeholder="Tanah Longsor"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Deskripsi Kronologis</Text>
            <TextInput
              placeholder="Tanah Longsor"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Tindakan akan dilakukan</Text>
            <TextInput
              placeholder="Tanah Longsor"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Peralatan yang dibutuhkan</Text>
            <TextInput
              placeholder="Tanah Longsor"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Kebutuhan mendesak</Text>
            <TextInput
              placeholder="Tanah Longsor"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Unsur terlibat</Text>
            <TextInput
              placeholder="Tanah Longsor"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Petugas</Text>
            <TextInput
              placeholder="Tanah Longsor"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Data Barang Yang Di Butuhkan</Text>
            <TextInput
              placeholder="Tanah Longsor"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text>Upload File Gambar</Text>
            <TextInput
              placeholder="Tanah Longsor"
              editable={false}
              style={{borderWidth: 1, borderRadius: 10}}
            />
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
    height: 2000,
    position: 'relative',
    marginTop: -10,
  },
});
