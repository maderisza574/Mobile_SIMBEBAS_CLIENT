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
import Logo from '../../assets/img/Vector.png';

export default function Signin(props) {
  const [form, setForm] = useState({});
  // console.log(form);
  const [showPassword, setShowPassword] = useState(false);
  const handleChangeForm = (value, name) => {
    setForm({...form, [name]: value});
  };
  const handleLogin = async () => {
    try {
      // console.log(form);
      const result = await axios.post('/auth/', form);
      // console.log(result.data);
      // await AsyncStorage.setItem('userId', result.data.data.id);
      await AsyncStorage.setItem('token', result.data.data.token);
      await AsyncStorage.setItem('refreshToken', result.data.data.refreshToken);
      alert('sukses');
      // console.log(result.data);
      props.navigation.replace('AppScreen', {screen: 'MenuNavigator'});
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <>
      <View style={style.containerForm}>
        <View style={style.containerLogin}>
          <View style={style.containerImage}>
            <Image source={Logo} style={{width: 39, height: 52}} />
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Text style={style.titleLogin}>simbebas</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={style.titleLoginBottom}>Login</Text>
        </View>
        <View style={{marginTop: 30}}>
          <TextInput
            style={style.input}
            placeholder="Masukan Username Anda"
            onChangeText={text => handleChangeForm(text, 'username')}
            // defaultValue={form}
          />
        </View>
        <View style={{marginBottom: 20}}>
          <View style={{position: 'relative'}}>
            <TextInput
              style={style.input}
              placeholder="Masukan Password"
              autoCapitalize="none"
              secureTextEntry={showPassword ? false : true}
              placeholderTextColor="#A0A3BD"
              onChangeText={text => handleChangeForm(text, 'password')}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                // right: 0,
                marginLeft: 320,
                height: '100%',
                paddingHorizontal: 12,
                justifyContent: 'center',
              }}
              onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Icon name="eye-with-line" size={20} />
              ) : (
                <Icon name="eye" size={20} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginTop: 30}}>
          <Pressable style={style.buttonLogin} onPress={handleLogin}>
            <Text style={style.textLogin}>Masuk</Text>
          </Pressable>
          {/* <Button title="Masuk" onPress={handleLogin} style={{outerWidth: 20}} /> */}
        </View>
        <View style={{marginLeft: 100, marginTop: 15}}>
          <Text>Belum Punya Akun? Daftar</Text>
        </View>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: 370,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  containerImage: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 70,
  },
  buttonLogin: {
    aalignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#ff471a',
    width: 300,
    marginLeft: 50,
  },
  textLogin: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    marginLeft: 100,
  },
  containerLogin: {
    backgroundColor: '#FF6A16',
    height: 250,
    width: 400,
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
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
    marginLeft: 180,
    marginTop: 30,
  },
});
