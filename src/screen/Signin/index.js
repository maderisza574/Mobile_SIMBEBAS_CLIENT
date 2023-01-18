import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import axios from '../../utils/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../../assets/img/BPBD.png';

export default function Signin(props) {
  const [form, setForm] = useState({});
  // console.log(form);
  const [showPassword, setShowPassword] = useState(false);
  const handleChangeForm = (value, name) => {
    setForm({...form, [name]: value});
  };
  const navSignUp = () => {
    props.navigation.navigate('Register');
  };
  const handleLogin = async () => {
    try {
      // console.log(form);
      const result = await axios.post('/v1/login/', form);
      // console.log(result.data);
      // await AsyncStorage.setItem('userId', result.data.data.id);
      await AsyncStorage.setItem('token', result.data.data.token);
      // await AsyncStorage.setItem('refreshToken', result.data.data.refreshToken);
      alert('sukses');
      // console.log(result.data);
      props.navigation.replace('AppScreen', {screen: 'MenuNavigator'});
    } catch (error) {
      // alert(error.response.data.message);
    }
  };
  return (
    <>
      {/* <View style={style.containerForm}> */}
      <View style={style.containerLogin}>
        <View style={style.containerImage}>
          <Image source={Logo} style={{width: 60, height: 60}} />
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={style.titleLogin}>SIMBEBAS</Text>
          </View>
        </View>
        <View
          style={{backgroundColor: 'white', height: '100%', borderRadius: 25}}>
          <Text style={style.titleLogin}>SIMBEBAS</Text>

          <View>
            <Text style={style.titleLoginBottom}>Login</Text>
          </View>
          <View style={{padding: 20}}>
            <TextInput
              style={style.input}
              placeholder="Masukan Username Anda"
              placeholderTextColor="#A0A3BD"
              onChangeText={text => handleChangeForm(text, 'email')}
            />
            <TextInput
              style={style.input}
              placeholder="Masukan Password"
              autoCapitalize="none"
              secureTextEntry={showPassword ? false : true}
              placeholderTextColor="#A0A3BD"
              onChangeText={text => handleChangeForm(text, 'password')}
            />
            <Pressable style={style.buttonLogin} onPress={handleLogin}>
              <Text style={style.textLogin}>Masuk</Text>
            </Pressable>

            <View
              style={{marginLeft: 100, marginTop: 15, flexDirection: 'row'}}>
              <Text style={{color: 'black', marginRight: 5}}>
                Belum Punya Akun?
              </Text>
              <TouchableOpacity onPress={navSignUp}>
                <Text style={{color: 'blue'}}>Daftar</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                position: 'absolute',
                // right: 0,
                marginLeft: 320,
                height: '100%',
                paddingHorizontal: 6,
                justifyContent: 'center',
                marginTop: -10,
              }}
              onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Icon name="eye-with-line" size={20} />
              ) : (
                <Icon name="eye" size={20} />
              )}
            </TouchableOpacity>
          </View>
          {/* </View> */}
          <View style={{marginTop: 30}}>
            {/* <Button
              title="Masuk"
              onPress={handleLogin}
              style={{outerWidth: 20}}
            /> */}
          </View>
        </View>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 10,
    marginBottom: 24,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
  },
  containerImage: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 90,
    marginBottom: 90,
  },
  buttonLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 7,
    elevation: 3,
    backgroundColor: '#ff471a',
    width: '100%',
    textAlign: 'center',
    height: 50,
    marginTop: 30,
  },
  textLogin: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  containerLogin: {
    backgroundColor: '#FF6A16',
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  titleLogin: {
    color: 'white',
    fontSize: 24,
  },
  textRegister: {
    marginRight: 100,
  },
  containerForm: {
    backgroundColor: 'white',
    height: 100,
    width: 500,
    borderRadius: 30,
  },
  titleLoginBottom: {
    fontSize: 19,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
    marginLeft: 180,
    marginTop: 30,
  },
});
