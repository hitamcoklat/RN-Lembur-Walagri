import React, { Component } from 'react';
import { StyleProvider, Item, Input, Label, Container, Header, List, ListItem, Title, Content, Button, Left, Right, Body, Icon, Text } from 'native-base';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import { ImageBackground, StyleSheet, ActivityIndicator, View, Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from '../Config';

export default class PageCari extends Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dataKosong: false,
      inputSearch: '',
      dataFaskes: []
    };
  }    

  searchData() {

    this.setState({ loading: true });
    
    let inputSearch = this.state.inputSearch;
    
    if(inputSearch.length <= 3) {
      return Alert.alert(
        'info',
        'Input tidak boleh kurang dari 3 karakter!',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }

    axios.get(API_URL + '/search-data?q=' + this.state.inputSearch)
      .then(function (response) {
          console.log();
          if(response.data.data.length <= 0) {
            this.setState({ dataKosong: true });
          } else {
            this.setState({ dataFaskes: response.data.data });
          }
          this.setState({ loading: false });
      }.bind(this))
      .catch(function (error) {
        console.log(error);
    });    
  }

  render() {

    let backButton = <Button onPress={() => this.props.navigation.goBack()} style={{ margin: 10 }} block><Text>Kembali</Text></Button>;

    return (
      <StyleProvider style={getTheme(platform)}>
      <Container>
        <Header searchBar rounded>
            <Item>
              <Input clearButtonMode="while-editing" returnKeyType='search' onSubmitEditing={() => this.searchData()} onChangeText={(text) => this.setState({inputSearch: text})} placeholder="Masukan nama Faskes..." />
              <Icon onPress={ () => this.searchData() } name="search" />
            </Item>
        </Header>
          <ImageBackground source={ require('../../assets/bg-lemburWalagri.png') } style={styles.backgroundImage}>
        <Content>

            {this.state.dataKosong && (
              <View style={styles.loading}>
                <Text>Data tidak ditemukan.</Text>
              </View>
            )}    

            {this.state.loading && (
              <View style={styles.loading}>
                <ActivityIndicator
                  color="#0000ff"
                  size="large"
                />
              </View>
            )}          
          
          <List
            style={{ backgroundColor: 'white' }} 
            dataArray={this.state.dataFaskes}
            renderRow={(item) => 
              <ListItem onPress={ () => this.props.navigation.navigate('DetailPageCari', {
                dataFaskes: item
              }) }>
                <Left>
                  <Text>{ item.nama_faskes }</Text>
                </Left>
                <Right>
                  <Icon name="arrow-circle-right" />
                </Right>
              </ListItem>
            }>
          </List>

          { backButton }

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
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center'
  }  
});