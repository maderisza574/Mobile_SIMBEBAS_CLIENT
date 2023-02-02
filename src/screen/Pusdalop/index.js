import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, Image, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import axios from '../../utils/axios';
export default function Pusdalop(props) {
  const navPusdalopCreate = () => {
    props.navigation.navigate('PusdalopCreate');
  };
  const [data, setData] = useState([]);
  // console.log(data.isi_aduan);
  const [people, setPeople] = useState([
    {
      name: 'Tanah Longsor',
      image: 'https://via.placeholder.com/100x100',
      key: '1',
    },
    {
      name: 'San',
      image: 'https://via.placeholder.com/100x100',
      key: '2',
    },
    {
      name: 'Sun',
      image: 'https://via.placeholder.com/100x100',
      key: '3',
    },
    {
      name: 'dab',
      image: 'https://via.placeholder.com/100x100',
      key: '4',
    },
    {
      name: 'dun',
      image: 'https://via.placeholder.com/100x100',
      key: '5',
    },
    {
      name: 'dor',
      image: 'https://via.placeholder.com/100x100',
      key: '6',
    },
    {
      name: 'dur',
      image: 'https://via.placeholder.com/100x100',
      key: '7',
    },
    {
      name: 'der',
      image: 'https://via.placeholder.com/100x100',
      key: '8',
    },
    {
      name: 'doel',
      image: 'https://via.placeholder.com/100x100',
      key: '9',
    },
    {
      name: 'doer',
      image: 'https://via.placeholder.com/100x100',
      key: '10',
    },
  ]);
  useEffect(() => {
    getDataPusdalop();
  }, []);
  const getDataPusdalop = async () => {
    try {
      const result = await axios.get('/v1/pusdalops?page=1&perPage=10');
      setData(result.data.rows);
      // console.log(result.data.rows);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View>
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
            <Text style={{color: 'white'}}>Data Lapor Bencana</Text>
            <Text style={{color: 'white'}}>(PUSDALOP)</Text>
          </View>
        </View>
      </View>
      <View style={style.containerInput}>
        <View>
          <Text>Riwayat Bencana</Text>
          <View>
            <Pressable style={style.buttonLogin} onPress={navPusdalopCreate}>
              <Text style={style.textLogin}>Buat Laporan</Text>
            </Pressable>
          </View>
        </View>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={style.card}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../../assets/img/bencana1.png')}
                  style={{width: 100, height: 100}}
                />
                <View>
                  <Text style={{marginLeft: 10}}>{item.nama}</Text>
                  <Text style={{marginLeft: 10}}>{item.alamat}</Text>
                  <Text style={{marginLeft: 10}}>
                    {item.lock_verif ? 'Sudah Verifikasi' : 'Belum Verifikasi'}
                  </Text>
                  <Text style={{marginLeft: 10}}>{item.id}</Text>
                </View>
                <View
                  style={{
                    marginLeft: 250,
                    flexDirection: 'row',
                    position: 'absolute',
                  }}>
                  <Pressable
                    style={{
                      backgroundColor: '#FF6A16',
                      color: '#FFFF',
                      width: 50,
                      borderRadius: 10,
                      marginRight: 5,
                    }}
                    onPress={() => {
                      props.navigation.navigate('PusdalopDetail', {
                        // image: item.image,
                        all: item,
                        id: item.id,
                      });
                    }}>
                    <Text style={{marginLeft: 10}}>Lihat</Text>
                  </Pressable>
                  <Pressable
                    style={{
                      backgroundColor: '#FF6A16',
                      color: '#FFFF',
                      width: 50,
                      borderRadius: 10,
                    }}>
                    <Text style={{marginLeft: 8}}>Delete</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          )}
        />
      </View>
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
    maxHeight: '100%',
    // height: 2800,
    position: 'relative',
    marginTop: -10,
  },
  buttonLogin: {
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
    marginTop: 10,
    marginBottom: 10,
  },
  textLogin: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  card: {
    width: 250,
    height: 100,
    marginHorizontal: 15,
    marginTop: 20,
    backgroundColor: 'Blue',
    borderColor: 'Black',
  },
});
