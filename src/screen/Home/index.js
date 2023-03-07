import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import Icon from 'react-native-vector-icons/AntDesign';

import Logo from '../../assets/img/BPBD.png';
// import Foto from '../../assets/img/';

export default function Home() {
  const Foto = '../../assets/img/';

  // const Item = ({image}) => {
  //   return <Image source={{uri: image}} style={{width: 100, height: 100}} />;
  // };

  return (
    <View>
      <View style={style.containerTop}></View>
      <View style={style.containerButton}>
        <View style={style.cardWelcome}>
          <View style={{marginLeft: 20, marginTop: 15, position: 'absolute'}}>
            <Image source={Logo} style={{width: 100, height: 100}} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 30,
              marginTop: 115,
              position: 'absolute',
            }}>
            <Text style={style.textSim}>SIM</Text>
            <Text style={style.textBebas}>BEBAS</Text>
          </View>
          <View style={{marginLeft: 130, marginTop: 30, width: 200}}>
            <Text>
              Selamat Datang di aplikasi SIMBEBAS, untuk memulai tombol menu
              berada di kiri {'\n'} atas
            </Text>
          </View>
        </View>
        <View style={style.grupButton}>
          <View>
            <Icon name="filetext1" color={'black'} size={50} />
            <Text>Pusdalop</Text>
          </View>
          <View>
            <Icon name="Safety" color={'black'} size={50} />
            <Text>Asesmen</Text>
          </View>
          <View>
            <Icon name="team" color={'black'} size={50} />
            <Text>Verifikator</Text>
          </View>
        </View>
        <View style={style.grupButton2}>
          <View>
            <Icon name="inbox" color={'black'} size={50} />
            <Text>Logpal</Text>
          </View>
          <View>
            <Icon name="flag" color={'black'} size={50} />
            <Text>TRC</Text>
          </View>
          <View>
            <Icon name="exception1" color={'black'} size={50} />
            <Text>LogCepat</Text>
          </View>
        </View>
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
                <View style={{marginLeft: -40}}>
                  <Pressable
                    style={{
                      backgroundColor: '#FF6A16',
                      color: '#FFFF',
                      width: 50,
                      borderRadius: 10,
                    }}>
                    <Text style={{marginLeft: 10}}>Lihat</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          )}
        /> */}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  // dummy style
  item: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  cardWelcome: {
    marginTop: -80,
    width: 370,
    backgroundColor: '#ffffff',
    height: 140,
    marginHorizontal: 11,
    borderRadius: 20,
    zIndex: 999,
    borderWidth: 1,
    borderColor: '#FF6A16',
    // position: 'absolute',
  },
  textSim: {
    color: '#0000ff',
    marginRight: 5,
  },
  textBebas: {
    color: '#ff0000',
  },
  card: {
    width: 250,
    height: 100,
    marginHorizontal: 15,
    marginTop: 20,
    backgroundColor: 'Blue',
    borderColor: 'Black',
  },
  containerButton: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'relative',
    marginTop: -30,
  },
  containerTop: {
    backgroundColor: '#FF6A16',
    width: '100%',
    height: '20%',
  },
  grupButton: {
    flexDirection: 'row',
    paddingHorizontal: 40,
    justifyContent: 'space-between',
    marginTop: '20%',
  },
  grupButton2: {
    flexDirection: 'row',
    paddingHorizontal: 40,
    justifyContent: 'space-between',
    marginTop: '15%',
  },
});
