import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

import Home from '../screen/Home';
import Detail from '../screen/Detail';
import Map from '../screen/map';

import Pusdalops from '../screen/Pusdalops';
import DrawerContent from '../components/DrawerContent';
import HeaderHome from '../components/Header/home';
import HeaderDefault from '../components/Header/default';
import Asesmen from '../screen/Asesmen';
import Verifikator from '../screen/Verifikator';

function MenuNavigator() {
  return (
    // DAFTARKAN MENU YANG NANTINYA AKAN MASUK KE DALAM DRAWER DISINI
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          header: props => <HeaderHome {...props} />,
          drawerIcon: ({size, color}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Pusdalop"
        component={Pusdalops}
        options={{
          header: props => <HeaderDefault {...props} />,
          drawerIcon: ({size, color}) => (
            <Icon name="filetext1" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Asesmen"
        component={Asesmen}
        options={{
          header: props => <HeaderDefault {...props} />,
          drawerIcon: ({size, color}) => (
            <Icon name="Safety" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Verifikator"
        component={Verifikator}
        options={{
          header: props => <HeaderDefault {...props} />,
          drawerIcon: ({size, color}) => (
            <Icon name="Safety" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Map"
        component={Map}
        options={{
          header: props => <HeaderDefault {...props} />,
          drawerIcon: ({size, color}) => (
            <Icon name="enviroment" color={color} size={size} />
          ),
        }}
      />
      {/* MY BOOKING */}
      {/* MY WISHLIST */}
    </Drawer.Navigator>
  );
}

export default function AppStackNavigator() {
  return (
    // DAFTARKAN MENU YANG NANTINYA DAPAT DI AKSES DILUAR DRAWER DISINI
    <Stack.Navigator initialRouteName="MenuNavigator">
      {/* HOME SCREEN */}
      <Stack.Screen
        name="MenuNavigator"
        component={MenuNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Detail" component={Detail} />
      {/* ORDER */}
      {/* PAYMENT */}
      {/* EDIT PROFILE */}
      {/* CHANGE PASSWORD */}
    </Stack.Navigator>
  );
}
