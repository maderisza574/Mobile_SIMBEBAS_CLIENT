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

import Logo from '../../assets/img/BPBD.png';
// import Foto from '../../assets/img/';

export default function Home() {
  const Foto = '../../assets/img/';
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
  // const Item = ({image}) => {
  //   return <Image source={{uri: image}} style={{width: 100, height: 100}} />;
  // };

  return (
    <View style={{flex: 1}}>
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
      <View style={{marginLeft: 10, marginTop: 10}}>
        <Text>Riwayat Data Terakhir</Text>
      </View>
      <View>
        {/* <FlatList
          data={people}
          style={{
            width: '100%',
            height: 500,
            backgroundColor: '#FFFFFF',
            top: 40,
            position: 'absolute',
            zIndex: 10,
          }}
          renderItem={({item}) => <Text style={style.item}>{item.name}</Text>}
        /> */}
        {/* <FlatList
          horizontal={true}
          data={people}
          renderItem={({item}) => (
            <View style={style.card}>
              onPress={() => handleDetail(item.eventid)}>
              <Text>{item.name}</Text>
              <Image
                source={require(item.image)}
                style={{width: '100%', height: '100%', borderRadius: 30}}
              />
              <View style={{position: 'absolute', bottom: 30, left: 25}}>
                <Text style={{color: 'white'}}>{item.dateTimeShow}</Text>
                <Text style={{color: 'white'}}>{item.name}</Text>
                <TouchableOpacity>
                  <Text>GO</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={item => item.key}
        /> */}
        <FlatList
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
        />
        {/* <FlatList
          data={people}
          renderItem={({item}) => (
            <View>
              <Image
                source={require(item.image)}
                style={{width: 100, height: 100}}
              />
              <Text>{item.name}</Text>
            </View>
          )}
          keyExtractor={item => item.key}
        /> */}
        {/* <FlatList
          data={people}
          renderItem={({item}) => (
            <View>
              <Text>{item.image}</Text>
              <Image
                source={`require(${item.image})`}
                style={{width: 100, height: 100, borderColor: 'Blue'}}
              />
              <Text>{item.name}</Text>
            </View>
          )}
          keyExtractor={item => item.key}
        /> */}
        {/* <FlatList
          horizontal={false}
          data={DATA}
          renderItem={({item}) => <Item title={item.title} />}
          keyExtractor={item => item.id}
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
    marginTop: 20,
    width: 370,
    backgroundColor: '#ffffff',
    height: 140,
    marginHorizontal: 15,
    borderRadius: 20,
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
});
