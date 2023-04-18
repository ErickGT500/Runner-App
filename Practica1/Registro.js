import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
export default class Registro extends Component {

  static contextType = NavigationContext;

  constructor(props) {
    super(props);
    this.state = {
      nombre : "",
      codigo : "",
      contrasena : "",
      telefono : "",
      centro : "",
      grado : "",
      correo : ""
    };
  }

  render() {

    const navigation = this.context;

    const Regresar = () =>{
      navigation.navigate('Login');
    }

    function containsNumber(str) {
      return /\d/.test(str);
    }

    const btnRegistro = () =>{
      if(this.state.nombre !== "")
          if(this.state.codigo !== "")
            if(this.state.contrasena !== "")
              if(this.state.telefono !== "")
                if(this.state.centro !== "")
                  if(this.state.grado !== "")
                    if(this.state.correo !== "")
                      aux = true;

      if(!containsNumber(this.state.nombre.toString()))
        if(this.state.correo.toString().includes("@"))
          auxn = true;
      
      if(aux && auxn){
        var xhttp = new XMLHttpRequest();
        var aux = new Boolean(false);
        var auxn = new Boolean(false);

        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            console.log(xhttp.responseText);
            if(xhttp.response == "2"){
              Alert.alert("Error!!!", "Código ya registrado",
              [{text: "OK", onPress:() => console.log("code error")}])
            }
            else if(xhttp.response == "0"){
              Alert.alert("Error!!!", "Datos no válidos",
              [{text: "OK", onPress:() => console.log("data error")}])
            }
            else if (xhttp.response == "1"){
              Alert.alert("Éxito!", "Datos registrados",
              [{text: "OK", onPress:() => navigation.navigate('Login')}])
            }
          }
        };

          xhttp.open("GET", "https://above-abuses.000webhostapp.com/Registro.php?nombre="
          + this.state.nombre + "&codigo=" + this.state.codigo + "&password=" + this.state.contrasena +
          "&telefono=" + this.state.telefono +  "&centro=" + this.state.centro + "&semestre=" + this.state.grado +
          "&correo=" + this.state.correo, true);
            xhttp.send();
      }
      else{
        if(!aux){
          Alert.alert("Error!!!", "Rellene todos los campos",
          [{text: "OK", onPress:() => console.log("data error")}])
          console.log("Rellene todos los campos")
          
        }
        else if(!auxn){
          Alert.alert("Error!!!", "Ingrese valores válidos",
          [{text: "OK", onPress:() => console.log("data error")}])
          console.log("Valores inválidos")
        }
      }
    }

    return (
      <ScrollView 
      style = {{flex:1}}>
        <View>
          <ImageBackground source = {require("./Imagenes/Gradient.jpg") } style = {styles.fondo}>
              <Text style = {styles.textRegistro}>
                Registro
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                onChangeText = {nombre => this.setState({nombre})} 
              />
              <TextInput
                style={styles.input2}
                placeholder="Código"
                keyboardType="numeric"
                onChangeText = {codigo => this.setState({codigo})} 
              />
              <TextInput
                style={styles.input2}
                placeholder="Contraseña"
                onChangeText = {contrasena => this.setState({contrasena})} 
              />
              <TextInput
                style={styles.input2}
                placeholder="Teléfono"
                keyboardType="numeric"
                onChangeText = {telefono => this.setState({telefono})} 
              />
              <TextInput
                style={styles.input2}
                placeholder="Escuela"
                onChangeText = {centro => this.setState({centro})} 
              />
              <TextInput
                style={styles.input2}
                placeholder="Grado"
                onChangeText = {grado => this.setState({grado})} 
              />
              <TextInput
                style={styles.input2}
                placeholder="Correo"
                onChangeText = {correo => this.setState({correo})} 
              />
              <TouchableOpacity
                onPress = {Regresar}
                style={styles.btnRegresar}>
                <Text style = {styles.buttonText}>Regresar</Text>
              </TouchableOpacity> 
            <TouchableOpacity
                onPress = {btnRegistro}
                style={styles.btnEnviar}>
                <Text style = {styles.buttonText}>Enviar</Text>
              </TouchableOpacity> 
          </ImageBackground> 
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  fondo:{
      width: Dimensions.get("screen").width,
      height: Dimensions.get("screen").height,
  },
  btnRegresar:{
    margin: 12,
    marginTop: 30,
    marginLeft: 20,
    height: 50,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 30,
    backgroundColor: '#1e2d98',
  },
  btnEnviar:{
    margin: 12,
    marginTop: -62,
    marginLeft: 190,
    height: 50,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 30,
    backgroundColor: '#1e2d98',
  },
  buttonText: {
    fontSize: 22,
    color: "white",
  },
  textRegistro: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 12,
    color: '#c87840',
    fontFamily: 'sans-serif-medium',
    fontWeight: 'normal',
  },
  input: {
    marginTop: 30,
    height: 60,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    //backgroundColor: "#D1D2CF",
    fontSize: 22,
    borderColor: "white"
  },
  input2: {
    marginTop: 0,
    height: 60,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    //backgroundColor: "#D1D2CF",
    fontSize: 22,
    borderColor: "white"
  },
})
