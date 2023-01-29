import React from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

export default function Verifikator() {
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
            <Text style={{color: 'white'}}>Verifikator</Text>
          </View>
        </View>
        <View style={style.containerInput}>
          <Text>Perbaiki Isian Data Bencana</Text>
          <View style={{marginBottom: 10}}>
            <Text>Jenis Bencana</Text>
            <TextInput
              placeholder="Tanah Longsor"
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View>
            <Text>Tanggal Kejadian</Text>
            <TextInput
              placeholder="Tanngal kejadian"
              style={{borderWidth: 1, borderRadius: 10}}
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
              placeholder="KEMRAJEN"
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View>
            <Text>Desa</Text>
            <TextInput
              placeholder="Desa Alasmalang"
              style={{borderWidth: 1, borderRadius: 10}}
            />
          </View>
          <View>
            <Text>Alamat</Text>
            <TextInput
              placeholder="alamat"
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
          <View>
            <Text>ASESMENT</Text>
          </View>
          <View>
            <Text>Data Barang Yang Di Butuhkan</Text>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Text>Nama Barang</Text>
                <TextInput
                  placeholder="sembako"
                  style={{borderWidth: 1, borderRadius: 10}}
                />
              </View>
              <View>
                <Text>Qty</Text>
                <TextInput
                  placeholder="qty"
                  style={{borderWidth: 1, borderRadius: 10}}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Text>Nama Barang</Text>
                <TextInput
                  placeholder="sembako"
                  style={{borderWidth: 1, borderRadius: 10}}
                />
              </View>
              <View>
                <Text>Qty</Text>
                <TextInput
                  placeholder="qty"
                  style={{borderWidth: 1, borderRadius: 10}}
                />
              </View>
            </View>
          </View>
          <View>
            <Text>Upload File Gambar</Text>
          </View>
          <View>
            <Pressable>
              <Text>Kirim</Text>
            </Pressable>
            <Pressable>
              <Text>Batal</Text>
            </Pressable>
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
    // height: 500,
    position: 'relative',
    marginTop: -30,
  },
});
