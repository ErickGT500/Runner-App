import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions, TouchableOpacity, DevSettings} from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import MenuDrawer from 'react-native-side-drawer'
import { Button, Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FetchCorredores from './FetchCorredores'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react/cjs/react.production.min';
import { useEffect } from 'react/cjs/react.production.min';

export default class Principal extends Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);
    this.state = {
      participantes: "",
      open: false,
      datosCorredor: "",
      codigo:"",
      stringCorredor:""
    };
  }

  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };

  drawerContent = () => {
    const navigation = this.context;
    const info = this.state.stringCorredor;

    //console.log("-------------" + this.participantes);

    if(info !="" /*|| valor ==1 */){
      const datos = info.split("::");
    
    //console.log("hay a huevo" + this.participantes);
    return (
        <View style = {styles.iMenu}>
          <Avatar
              size={64}
              rounded
              source={{ uri: datos[6] }}
              title="Avatar"
              containerStyle={{ backgroundColor: 'red' }}
            >
              <Avatar.Accessory size={23} />
            </Avatar>
            <Text style={styles.drawerText}>Nombre: {datos[0]}</Text>
            <Text style={styles.drawerText}>Codigo: {datos[1]}</Text>
            <Text style={styles.drawerText}>Correo: {datos[2]}</Text>
            <Text style={styles.drawerText}>Teléfono: {datos[3]}</Text>
            <Text style={styles.drawerText}>Centro: {datos[4]}</Text>
            <Text style={styles.drawerTextL}>Grado: {datos[5]}</Text>
            <TouchableOpacity 
            style = {styles.btn}
            onPress={this.toggleOpen}><Text style={styles.textEntrar}>Cerrar</Text></TouchableOpacity>
      </View>
    );
    }
  };

  MostrarParticipantes  = async() =>{
      var xhttp = new XMLHttpRequest();
      let _this = this;
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          //console.log(xhttp.responseText);
          const jsonValue = JSON.stringify(xhttp.responseText)
          AsyncStorage.setItem('numParticipantes', jsonValue)
        }
      };
      xhttp.open("GET", "https://above-abuses.000webhostapp.com/Numero_Participantes.php", true);
      xhttp.send();
  }

  getDatosCorredor  = async() =>{
    var xhttp = new XMLHttpRequest();
    let _this = this;
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const jsonValue = JSON.stringify(xhttp.responseText)
        AsyncStorage.setItem('datosCorredor', jsonValue)
        _this.setState({
          stringCorredor: xhttp.responseText
        })
      }
    };
    xhttp.open("GET", "https://above-abuses.000webhostapp.com/DatosCorredor.php?codigo=" + this.props.route.params.codigo, true);
    xhttp.send();
  }

  componentDidMount = () =>{
    this.MostrarParticipantes();
    this.getDatosCorredor();
  }

  render() {
    const navigation = this.context;
    const Mapas = () =>{
      navigation.navigate('Mapas', {codigo: this.props.route.params.codigo})
    }
    return (
      /*<View>
        <ImageBackground source = {require("./Imagenes/Gradient.jpg") } style = {styles.fondo}
        onLoad = {MostrarParticipantes}>
        <Text style = {styles.textParticipantes}>
            Participantes:
        </Text>
        <Text style = {styles.numeroParticipantes}>
            {this.state.participantes}
        </Text>
        </ImageBackground>
      </View>*/
      <View>
      <ImageBackground source = {require("./Imagenes/Gradient.jpg") } style = {styles.fondo}>
        <View style={styles.container}>
          <MenuDrawer
            open={this.state.open}
            position={'left'}
            drawerContent={this.drawerContent()}
            drawerPercentage={45}
            animationTime={250}
            overlay={true}
            opacity={.4}
          >
          <TouchableOpacity onPress={this.toggleOpen} style={styles.body}>
            <Text>Abrir</Text>
          </TouchableOpacity>
          </MenuDrawer>
        </View>
      <View style={styles.viewRanking}><FetchCorredores codigo = {this.props.route.params.codigo}/></View>
      <View style={{flex:1,marginTop: 750, position: 'absolute', alignSelf: 'center'}}>
        <TouchableOpacity 
        style = {styles.btn}
        onPress={Mapas}><Text style={styles.textEntrar}>Mapa</Text></TouchableOpacity>
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
    textParticipantes:{
        fontSize: 30,
        textAlign: "left",
        marginTop: 25,
        marginLeft: 12,
        color: '#c87840',
        fontFamily: 'sans-serif-medium',
        fontWeight: 'normal',
    },
    numeroParticipantes:{
        fontSize: 30,
        textAlign: "right",
        marginTop: -37,
        marginRight: 80,
        color: '#51E892',
        fontFamily: 'sans-serif-medium',
        fontWeight: 'normal',
    },
    container: {
      flex:1,
      alignItems: "baseline",
      justifyContent: "center",
      marginTop: 0,
      height:'100%'
    },
    animatedBox: {
      backgroundColor: "#38C8EC",
      padding: 10
    },
    body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F04812',
    opacity: 10,
    },
    iMenu: {
      flex: 1,
      backgroundColor: "#5458F0",
      padding: 10,
      marginTop: -30,
    },
    drawerText: {
      marginTop: 10,
      color: "white"
    },
    drawerTextL: {
      marginTop: 10,
      marginBottom: 400, 
      color: "white"
    },
    closeButton: {
      marginTop: 100000,
      color: "white"
    },
    viewRanking:{
      position: 'absolute',
      alignSelf: 'center',
      width: '100%'
    },
    btn:{
      height: 45,
      width: 140,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 30,
      backgroundColor: '#1e2d98',
    },
    textEntrar: {
      fontSize: 15,
      color: "white",
      alignSelf: 'center'
    },
})