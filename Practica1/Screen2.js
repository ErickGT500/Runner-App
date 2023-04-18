import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';

export default class Screen2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> Screen2 </Text>
        <Input
        placeholder='Usuario'
        leftIcon={
          <Icon
            name='person'
            size={24}
            color='black'
          />
        }
        ></Input>
        
        <Input
        placeholder='Contraseña'
        leftIcon={
          <Icon
            name='lock'
            size={24}
            color='black'
          />
        }
        ></Input>
        <View style={styles.btn}>
        <Button title="Ingresar"></Button>
        </View>
        

      </View>
    );
  }
}

const styles = StyleSheet.create({
    btn:{
    }
    
    });
