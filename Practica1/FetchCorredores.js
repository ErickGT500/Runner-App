import { Text, StyleSheet, View, Image, SafeAreaView, DevSettings } from 'react-native'
import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class FetchCorredores extends React.Component {
    state = {corredores:""}
    getRanking  = async() =>{
      
      const cod = await AsyncStorage.getItem('codigoUsuario');
      this.forceUpdate()
      var xhttp = new XMLHttpRequest();
      let _this = this;
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          //console.log(xhttp.responseText);
          _this.setState({
            corredores: xhttp.responseText
          })
        }
      };
      const removed = cod.replace(/"/g, '');
      xhttp.open("GET", "https://above-abuses.000webhostapp.com/Ranking.php?codigo=" + this.props.codigo, true);
      xhttp.send();
  }

  componentDidMount = () =>{
     this.getRanking(); 
  }

  componentWillUnmount(){
  }

    render(){
      if(this.state.corredores){
        
        var jsonarray = JSON.parse(this.state.corredores);

        const listCorredores = jsonarray.map((corr, index) =>
          <ElementoRanking {...corr} key={index}/>
        );
      
      return <View>{listCorredores}</View>
      }
      return <View>
      <Text>CARGANDO..</Text>
    </View>
    }
  }

function ElementoRanking (props){
    var color, pos;
    if(props.Posicion == "1"){
      pos = "1";
      color = "#EBDC4B";
    }
    else if(props.Posicion == "2"){
      pos = "2";
      color = "#8D8B8F";
    }
    else if(props.Posicion == "3"){
      pos = "3";
      color = "#D26C41";
    }
    else if(props.Posicion == "0"){
      pos = "Tú";
      color = "#8333C4";
    }
    
    return (
      <View style={{height: 180,
      width: 200,
      backgroundColor: color,
      marginTop: 5,
      alignSelf: 'center',
      borderColor:'black',
      borderRadius: 8,
      borderWidth: 3}}>
        <Text style={styles.posicion}>{pos}</Text>
        <Image style={{height: '30%',
            width:'30%',
            alignSelf: 'center',
            resizeMode: 'contain'}} 
            source={{uri: props.Foto}}></Image>
        <Text style={styles.info}>Código: {props.Codigo}</Text>
        <Text style={styles.info}>Distancia: {props.Distancia} metros</Text>
        <Text style={styles.info}>Tiempo: {props.Tiempo} minutos</Text>
        <Text style={styles.info}>Puntaje: {props.Puntos} metros por minuto</Text>
      </View>
    )
}

const styles = StyleSheet.create({
  posicion:{
    textAlign: 'center',
    textShadowRadius: 10,
    textShadowColor: 'black',
    fontStyle:'italic'
  },
  info:{
    marginLeft: 2,
    fontSize:10,
  }
})