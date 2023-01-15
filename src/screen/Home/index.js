import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import Logo from '../../assets/img/BPBD.png';

export default function Home() {
  const [people, setPeople] = useState([
    {name: 'Shaun', key: '1'},
    {name: 'San', key: '2'},
    {name: 'Sun', key: '3'},
    {name: 'dab', key: '4'},
    {name: 'dun', key: '5'},
    {name: 'dor', key: '6'},
    {name: 'dur', key: '7'},
    {name: 'der', key: '8'},
    {name: 'doel', key: '9'},
    {name: 'doer', key: '10'},
  ]);

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
        <FlatList
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
        />
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
});
