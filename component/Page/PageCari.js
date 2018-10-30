import React, { Component } from 'react';
import { StyleProvider, Item, Input, Label, Container, Header, List, ListItem, Title, Content, Button, Left, Right, Body, Icon, Text } from 'native-base';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import { ImageBackground, StyleSheet, View, Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from '../Config';

export default class PageCari extends Component {

  constructor(props) {
    super(props);
    this.state = {
      faskesPick: 'puskesmas',
      inputSearch: '',
      dataFaskes: []
    };
  }  

  static navigationOptions = {
    header: null
  }

  searchData() {
    
    let inputSearch = this.state.inputSearch;
    
    if(inputSearch.length <= 5) {
      return Alert.alert(
        'info',
        'Input tidak boleh kurang dari 5 karakter!',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }

    axios.get(API_URL + '/search-data?q=' + this.state.inputSearch)
      .then(function (response) {
          this.setState({ dataFaskes: response.data.data });
        // if(response.data.data.status == 'success') {
        // }
      }.bind(this))
      .catch(function (error) {
        console.log(error);
    });    
  }

  render() {
    return (
      <StyleProvider style={getTheme(platform)}>
      <Container>
        <Header searchBar rounded>
            <Item>
              <Input onChangeText={(text) => this.setState({inputSearch: text})} placeholder="Masukan nama Faskes..." />
              <Icon onPress={ () => this.searchData() } name="search" />
            </Item>
        </Header>
          <ImageBackground source={ require('../../assets/bg-lemburWalagri.png') } style={styles.backgroundImage}>
        <Content>       
          <Button onPress={() => this.props.navigation.goBack()} style={{ margin: 10 }} block>
            <Text>Kembali</Text>
          </Button>
          <List
            style={{ backgroundColor: 'white' }} 
            dataArray={this.state.dataFaskes}
            renderRow={(item) => 
              <ListItem>
                <Left>
                  <Text>{ item.nama_faskes }</Text>
                </Left>
                <Right>
                  <Icon name="arrow-circle-right" />
                </Right>
              </ListItem>                         
            }>
          </List>
        </Content>
        </ImageBackground>
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