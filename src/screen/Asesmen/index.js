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
          <View>
            <Text>Jenis Bencana</Text>
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
    height: 500,
    position: 'relative',
    marginTop: -10,
  },
});
