import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { color } from 'react-native-elements/dist/helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Login extends Component {

  static contextType = NavigationContext;

  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
    };
  }

  componentWillUnmount(){
    const jsonValue = JSON.stringify(this.state.login)
    AsyncStorage.setItem('codigoUsuario', jsonValue)
    console.log("lolo")
  }

  render() {
    const navigation = this.context;
      const Registro = () =>{
        navigation.navigate('Registro');
      }
      const btnLogin = () =>{
          
          let _this = this;
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            console.log(xhttp.responseText);
            if(xhttp.response == "1"){
              console.log("Usuario autentificado");
              navigation.navigate('Principal', {codigo: _this.state.login});
              //guardar datos
              const jsonValue = JSON.stringify(_this.state.login)
              AsyncStorage.setItem('codigoUsuario', jsonValue)
            }
            else if(xhttp.response == "2"){
              Alert.alert("Error!!!", "Contraseña errónea, intente de nuevo",
              [{text: "OK", onPress:() => console.log("pass error")}]);
            }
            else if (xhttp.response == "0"){
              Alert.alert("Error!!!", "Usuario no reconocido",
              [{text: "OK", onPress:() => console.log("user error")}]);
            }
          }
        };
        xhttp.open("GET", "https://above-abuses.000webhostapp.com/Login.php?codigo="+this.state.login+
        "&password="+this.state.password, true);
        xhttp.send();
      }
    return (
      <View>
          <ImageBackground source = {require("./Imagenes/Gradient.jpg") } style = {styles.fondo}>
                <View>
                <Image style = {styles.Logo} source = {require("./Imagenes/LogoRunning.png")}></Image>
                  <TextInput
                    style={styles.input}
                    //onChangeText={onChangeNumber}
                    //value={number}
                    onChangeText = {login => this.setState({login})} 
                    placeholder="Código"
                    keyboardType="numeric"
                    placeholderTextColor='gray'
                  />
                  <TextInput
                    style={styles.input2}
                    secureTextEntry = {true}
                    placeholder="Contraseña"
                    onChangeText = {password => this.setState({password})} 
                    placeholderTextColor='gray'
                  />
                  <TouchableOpacity
                    onPress={btnLogin}
                    style={styles.btn}>
                    <Text style={styles.textEntrar}>Entrar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={Registro}
                    style={styles.btn}>
                    <Text style={styles.textEntrar}>Registro</Text>
                  </TouchableOpacity>  
                </View>
          </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    fondo:{
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
    },
    btn:{
      margin: 12,
      marginTop: 50,
      marginLeft: 30,
      marginRight: 30,
      height: 50,
      width: 300,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 30,
      backgroundColor: '#1e2d98',
    },
    input: {
      marginTop: 30,
      height: 60,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      //backgroundColor: "#D1D2CF",
      fontSize: 22,
      borderColor: "white",
      color: 'white',
    },
    input2: {
      marginTop: 20,
      height: 60,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      //backgroundColor: "#D1D2CF",
      fontSize: 22,
      borderColor: "white",
      color: 'white',
    },
    textEntrar: {
      fontSize: 18,
      color: "white",
    },
    Logo:{
      width: 250,
      height: 200,
      marginLeft: 60,
      marginTop: 10
  },
})