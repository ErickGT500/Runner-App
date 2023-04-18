import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Button} from 'react-native';
//importacion de los objetos

export default class Screen1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
        //variables locales y globales
    };
  }

  render() {
      //codigo para que funcionen los elementos gráficos y funciones
    return (
      <View>
        <Text style = {styles.Texto}> Partido </Text>
        <Image style = {styles.Logo} source = {require("./Imagenes/Barcita.png")}></Image>
        <Text style = {styles.textoVS}>VS</Text>
        <Image style = {styles.Logo2} source = {require("./Imagenes/Madrid.png")}></Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
Texto:{
    fontSize: 30,
    color: "green",
    textAlign: "center",
    marginTop: 10,
},
Logo:{
    width: 160,
    height: 156,
    marginLeft: 100,
    marginTop: 10
},
Logo2:{
    width: 140,
    height: 192,
    marginLeft: 110,
    marginTop: 10
},
textoVS:{
    fontSize: 50,
    color: "red",
    textAlign: "center",
    marginTop: 10
}

});
