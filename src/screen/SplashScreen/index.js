import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Logo from '../../assets/img/BPBD.png';

export default function SplashScreen(props) {
  console.log(props);
  const token = false;
  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = () => {
    setTimeout(() => {
      if (token) {
        props.navigation.replace('AppScreen');
      } else {
        props.navigation.replace('AuthScreen');
      }
    }, 1000);
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image source={Logo} style={{width: 100, height: 100}} />
      <View style={{flexDirection: 'row'}}>
        <Text>SIM</Text>
        <Text>BEBAS</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({});
