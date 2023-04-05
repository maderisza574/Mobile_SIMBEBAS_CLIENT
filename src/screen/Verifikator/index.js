import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, Image, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {getDataPusdalop} from '../../stores/actions/pusdalop';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Verifikator(props) {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const pusdalop = useSelector(state => state.pusdalop.data);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getDataPusdalop());
      } catch (error) {
        alert('SILAHKAN LOGIN ULANG');
        await AsyncStorage.clear();
        props.navigation.replace('AuthScreen', {
          screen: 'Login',
        });
      }
    };
    fetchData();
  }, []);

  const navVerifDetail = id => {
    // setDataPusdalop(id);
    // console.log('ini id flat list', id);
    props.navigation.navigate('VerifikatorDetail', {pusdalopId: id});
  };
  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(getDataPusdalop()).finally(() => setRefreshing(false));
  };
  const handleEndReached = () => {
    dispatch(getDataPusdalop());
  };
  const renderItem = ({item}) => {
    // render your item here
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
          <Icon name="team" color={'white'} size={50} />
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white'}}>Data Lapor Bencana</Text>
            <Text style={{color: 'white'}}>(Verifikator)</Text>
          </View>
        </View>
      </View>
      <View style={style.containerInput}>
        <View style={style.containerButton}>
          <View>
            <Text style={style.texttitle}>Riwayat Bencana</Text>
          </View>
        </View>
        <View style={style.containerFlat}>
          <FlatList
            data={pusdalop}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.5}
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
                    <Text style={style.textFlatlist}>{item.nama}</Text>
                    <Text style={style.textFlatlist}>{item.alamat}</Text>
                    <Text style={style.textFlatlist}>
                      {moment(item.tanggal).format('YYYY-MM-DD')}
                    </Text>
                    <View>
                      {item.lock_gudang === false ? (
                        <Text style={{color: 'red', marginLeft: '7%'}}>
                          Verifikasi
                        </Text>
                      ) : (
                        <Text style={{color: 'green', marginLeft: '7%'}}>
                          Verifikasi
                        </Text>
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      paddingLeft: 280,
                      flexDirection: 'row',
                      position: 'absolute',
                    }}>
                    {item.lock_gudang === false ? (
                      <Pressable
                        style={{
                          backgroundColor: '#FF6A16',
                          color: '#FFFF',
                          width: '120%',
                          height: '100%',
                          borderRadius: 10,
                          marginRight: 5,
                        }}
                        onPress={() => navVerifDetail(item.id)}>
                        <View
                          style={{
                            paddingHorizontal: '10%',
                            paddingVertical: '10%',
                          }}>
                          <Text
                            style={{
                              marginLeft: 10,
                              color: 'white',
                              fontSize: 15,
                            }}>
                            Verifikasi
                          </Text>
                        </View>
                      </Pressable>
                    ) : (
                      <Pressable
                        style={{
                          backgroundColor: '#FF6A16',
                          color: '#FFFF',
                          width: '150%',
                          height: '100%',
                          borderRadius: 10,
                          marginRight: 5,
                        }}
                        onPress={() => alert('BELUM TERSEDIA')}>
                        {/* // onPress={() => navAsesmenDetail(item.id)}> */}
                        <View
                          style={{
                            paddingHorizontal: '10%',
                            paddingVertical: '10%',
                          }}>
                          <Text
                            style={{
                              marginLeft: 10,
                              color: 'white',
                              fontSize: 15,
                            }}>
                            Lihat
                          </Text>
                        </View>
                      </Pressable>
                    )}
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
        </View>
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
  textFlatlist: {
    color: 'black',
    marginLeft: '5%',
    marginBottom: '3%',
    marginTop: '2%',
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

  card: {
    width: 250,
    height: 110,
    marginHorizontal: 15,
    marginTop: 20,
    backgroundColor: 'Blue',
    borderColor: 'Black',
    borderWidth: 1,
    borderRadius: 5,
  },
  containerFlat: {
    height: '100%',
    // marginTop: '-30%',
  },
  texttitle: {
    color: 'black',
  },
  buttonLogin: {
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 7,
    backgroundColor: '#ff471a',
    width: '41%',
    textAlign: 'center',
    height: '50%',
    marginTop: 10,
  },
  textLogin: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  containerButton: {
    width: '100%',
    height: '3%',
    position: 'relative',
  },
});
