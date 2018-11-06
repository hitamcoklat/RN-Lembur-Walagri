import React, { Component } from 'react';
import { StyleProvider, Item, Input, Label, Container, Header, List, ListItem, Title, Content, Button, Left, Right, Body, Icon, Text } from 'native-base';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import { ImageBackground, StyleSheet, View, Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from '../Config';

export default class TesPage extends React.Component {

  static navigationOptions = {
    header: null
  }

  render() {

    return (
      <StyleProvider style={getTheme(platform)}>
      <Container>
        <Button onPress={() => this.props.navigation.navigate('TesPage')} style={{ margin: 10 }} block><Text>ke Halaman Tes</Text></Button>
      </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'    
  },
  tengah: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  }
});