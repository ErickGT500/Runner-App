import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LOGIN from "./Login"
import REGISTRO from "./Registro"
import PRINCIPAL from './Principal';
import MAPAS from "./Mapas";

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codigo:""
    };
  }

  render() {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LOGIN} />
          <Stack.Screen name="Registro" component={REGISTRO} />
          <Stack.Screen name="Principal" component={PRINCIPAL} />
          <Stack.Screen name="Mapas" component={MAPAS} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
