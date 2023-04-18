import { Text, StyleSheet, View, PermissionsAndroid, DevSettings, Button, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import MapboxGL from '@react-native-mapbox-gl/maps';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import { NavigationContext } from '@react-navigation/native';
MapboxGL.setAccessToken('sk.eyJ1IjoiZXJpY2tndDUwMCIsImEiOiJjbDJxOTYzZXAxazRnM2Nwbmxja2x2eDM1In0.PDV41QOBs3a_x1Hm-fUvKw');

export default class Mapas extends Component {

  static contextType = NavigationContext;

  constructor(props) {
    super(props)
  
    this.state = {
       kilometros:0,
       geometry: {
        "type": "LineString",
        "coordinates": [
        ]
      },
      medirProgreso: false,
      segundos: 0,
      nuevoInterval: true
    }
  }

  onLocationUpdate = (e: any) => {

    //  this.onLocationUpdate(e);
    if(this.state.medirProgreso){
      if(this.state.coordinates){
        var lat = this.state.coordinates[1];
        var long = this.state.coordinates[0];
      }
      this.setState(
        {
          coordinates: [e.coords.longitude, e.coords.latitude],
        },
        () => {

          if(lat != undefined ){
            console.log(long + ", " + lat);
            var distancia = this.state.kilometros, total;
            let newCoor = this.state.geometry;
            var latActual = this.state.coordinates[1], longActual = this.state.coordinates[0];

            total = parseFloat(distancia) +  parseFloat(this.distance(lat, this.state.coordinates[1], long, this.state.coordinates[0]));
            
            newCoor.coordinates.push([longActual, latActual])
            
            this.setState({
              kilometros: parseFloat(total),
              geometry: newCoor
            })

            console.log("geo: " + JSON.stringify(this.state.geometry))
          }

        },
      );
    }
  };

  distance(lat1,
      lat2, lon1, lon2)
  {

  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.
  lon1 =  lon1 * Math.PI / 180;
  lon2 = lon2 * Math.PI / 180;
  lat1 = lat1 * Math.PI / 180;
  lat2 = lat2 * Math.PI / 180;

  // Haversine formula
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a = Math.pow(Math.sin(dlat / 2), 2)
  + Math.cos(lat1) * Math.cos(lat2)
  * Math.pow(Math.sin(dlon / 2),2);

  let c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth in kilometers. Use 3956
  // for miles
  let r = 6371;

  // calculate the result
  return(c * r);
  }

  Empezar= () =>{
    this.setState({
      medirProgreso: true
    })


    console.log("medirProgreso: " + this.state.medirProgreso)

    if(this.state.nuevoInterval){
      let interval = setInterval(() => {
        this.setState({
          intervalID: interval,
          nuevoInterval: false
        })

        this.setState({
          segundos: this.state.segundos + 1
        })

        if(!this.state.medirProgreso){
          clearInterval(this.state.intervalID)
          console.log("id: " + this.state.intervalID)
          this.setState({
            nuevoInterval: true
          })
        }
      }, 1000);
    }

    console.log("id: " + this.state.intervalID)
  }

  Terminar= () =>{
    this.setState({
      medirProgreso: false
    })
    
    console.log("medirProgreso: " + this.state.medirProgreso)
  }


  componentDidMount() {
    var xhttp = new XMLHttpRequest();
    let _this = this;
    //console.log("propsospsosos" + this.props.navigation.getParams('Codigo'));
    //console.log("propsospsosos" + this.props.route.params.codigo);
    /*const {state} = this.props.navigation;
    console.log("PROPS " + state.params.codigo);*/
    var c = this.props.route.params.codigo;

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        _this.setState({kilometros: xhttp.responseText});
        console.log("Kilometraje: " + xhttp.responseText);
      }
    };

    console.log("codocodcodco" + c.toString())
    xhttp.open(
      'GET',
      'https://above-abuses.000webhostapp.com/Avance.php?codigo=' +
        c.toString(),
      true,
    );
    xhttp.send();
  }

  ActualizarProgreso(){
    var xhttp = new XMLHttpRequest();
    var c = this.props.route.params.codigo;

    console.log("se acabo: " + this.state.kilometros)

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
      }
    };
    xhttp.open(
      'GET',
      'https://above-abuses.000webhostapp.com/Actualizar_Progreso.php?codigo=' +
        c.toString() + "&kilometros=" + this.state.kilometros,
      true,
    );
    xhttp.send();
  }

  componentWillUnmount(){
    this.ActualizarProgreso();
  }



  render() {
    const navigation = this.context;
    
    const Permisos = async ()=> {
      try{
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "PERMISO LOCALIZACION",
              message:
                "PERIMISO LOCALIZACON " +
                "POSICION EN EL MAPA",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the location");
          } else {
            console.log("Location permission denied");
          }

      }
      catch{

      }
      DevSettings.reload();
    }

    return (
        <View style={{flex: 1, height: "100%", width: "100%" , backgroundColor: "#448888"}}>
          <Text style={{fontSize: 40, color: 'red', textAlign: 'center',marginBottom:20}}>
          Mi avance
        </Text>
        <View style={{marginLeft: 200, width:120, height:100}}>
          <AnimatedCircularProgress
            arcSweepAngle={180}
            rotation={-90}
            size={120}
            width={15}
            fill={this.state.kilometros}
            tintColor="#00e0ff"
            backgroundColor="#3d5875">
            {fill => <Text style={{color:"white"}}>{this.state.kilometros/10}  / 10 km</Text>}
          </AnimatedCircularProgress>
          
        </View>
        <Text style={{alignSelf: 'center'}}>{this.state.segundos} segundos</Text>
        <View style={{marginTop: -100, marginLeft:50}}>
        <AnimatedCircularProgress
            arcSweepAngle={180}
            rotation={-90}
            size={120}
            width={15}
            fill={50}
            tintColor="#00e0ff"
            backgroundColor="#3d5875">
            {fill => <Text style={{color:"white"}}>3 dias / 5 dias</Text>}
          </AnimatedCircularProgress>
        </View>
        <MapboxGL.MapView
          styleURL={MapboxGL.StyleURL.Street}
          zoomLevel={16}
            centerCoordinate={[20.66611, -103.35607]}
          style={{flex: 1}}>
          <MapboxGL.UserLocation visible={true}
            onUpdate={this.onLocationUpdate}/>
             <MapboxGL.Camera
                zoomLevel={16}
                centerCoordinate={[3.3362400, 6.5790100]}
                animationMode={'flyTo'}
                animationDuration={0}
                followUserLocation={true}
                >
            </MapboxGL.Camera>
            <MapboxGL.ShapeSource id='line1' shape={this.state.geometry}>
            <MapboxGL.LineLayer id='linelayer1' style={{lineColor:'green'}} />
          </MapboxGL.ShapeSource>
        </MapboxGL.MapView>
        <Button title='Empezar' color= "lightgreen" onPress={this.Empezar}></Button>
        <Button title='Terminar' color= "red" onPress={this.Terminar}></Button>
        <Button title='Permisos' onPress={Permisos}></Button>
      </View>
  
    )
  }
}

const styles = StyleSheet.create({
  btn:{
    height: 45,
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 30,
    backgroundColor: 'lightgreen',
  },
})
