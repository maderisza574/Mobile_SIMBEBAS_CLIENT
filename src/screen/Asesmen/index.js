import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {getDataPusdalop} from '../../stores/actions/pusdalop';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Asesmen(props) {
  const pusdalop = useSelector(state => state.pusdalop.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataPusdalop());
  }, []);
  const navAsesmenDetail = id => {
    props.navigation.navigate('AsesmenDetail', {pusdalopId: id});
  };
  const [people, setPeople] = useState([
    {
      name: 'Shaun',
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
            name="Safety"
            size={40}
            color={'white'}
            style={{marginLeft: 10}}
          />
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white'}}>Data Lapor Bencana</Text>
            <Text style={{color: 'white'}}>(ASESMEN)</Text>
          </View>
        </View>
      </View>
      <View style={style.containerInput}>
        <View>
          <Text>Riwayat Bencana</Text>
        </View>
        <FlatList
          data={pusdalop}
          renderItem={({item}) => (
            <View style={style.card}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={
                    item.risalah[0]?.file
                      ? {
                          uri: `${item.risalah[0]?.file}`,
                        }
                      : require('../../assets/img/bencana1.png')
                  }
                  // source={{uri: `${item.risalah[0]?.file}`}}
                  style={{width: 100, height: 100}}
                />
                <View>
                  <Text style={{marginLeft: 10}}>{item.nama}</Text>
                  <Text style={{marginLeft: 10}}>{item.alamat}</Text>
                  <Text style={{marginLeft: 10}}>{item.tanggal}</Text>
                </View>
                <View
                  style={{
                    paddingLeft: 280,
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
                    onPress={() => navAsesmenDetail(item.id)}>
                    <Text style={{marginLeft: 10}}>Lihat</Text>
                  </Pressable>
                  {/* <Pressable
                    style={{
                      backgroundColor: '#FF6A16',
                      color: '#FFFF',
                      width: 50,
                      borderRadius: 10,
                    }}
                    onPress={handleDeleteBencana(item.id)}>
                    <Text style={{marginLeft: 8}}>Delete</Text>
                  </Pressable> */}
                </View>
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
        />
        {/* <FlatList
          data={people}
          keyExtractor={item => item.key}
          renderItem={({item}) => (
            <View style={style.card}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={{uri: `${item.image}`}}
                  style={{width: 100, height: 100}}
                />
                <View>
                  <Text style={{marginLeft: 10}}>Bencana</Text>
                  <Text style={{marginLeft: 10}}>Location</Text>
                  <Text style={{marginLeft: 10}}>Butuh asesment</Text>
                  <Text style={{marginLeft: 10}}>
                    lorem ipsum lorem lorem lorem lorem lorem lorem
                  </Text>
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
                    onPress={navAsesmenDetail}>
                    <Text style={{marginLeft: 10}}>Lihat</Text>
                  </Pressable>
                  <Pressable
                    style={{
                      backgroundColor: '#FF6A16',
                      color: '#FFFF',
                      width: 50,
                      borderRadius: 10,
                    }}>
                    <Text style={{marginLeft: 5}}>Delete</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          )}
        /> */}
        <Text>Asesmen</Text>
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
