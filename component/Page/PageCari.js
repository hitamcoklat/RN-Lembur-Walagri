import React, { Component } from 'react';
import { StyleProvider, Form, Item, Input, Label, Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, CardItem, Card } from 'native-base';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import { ImageBackground, StyleSheet } from 'react-native';

export default class PageCari extends Component {

  static navigationOptions = {
    header: null
  }   
  render() {
    return (
      <StyleProvider style={getTheme(platform)}>
      <Container>
        <Header>
          <Left>
            <Button onPress={() => this.props.navigation.goBack()} transparent>
              <Icon name='chevron-left' />
            </Button>
          </Left>
          <Body>
            <Title>Cari Faskes</Title>
          </Body>
          <Right />
        </Header>
          <ImageBackground source={ require('../../assets/bg-lemburWalagri.png') }
            style={styles.backgroundImage}>        
        <Content>
          <Card>
            <CardItem>
              <Body>
                <Text>
                   Silahkan tuliskan nama Fasilitas Kesehatan, (Misal: Nama Rumah Sakit, Nama Puskesmas atau Nama Klinik)
                </Text>
              </Body>
            </CardItem>
          </Card>        
          <Card style={{ backgroundColor:'transparent' }}>
            <Item style={{ backgroundColor: '#FFFFFF', padding: 10, borderRadius: 10 }}>
              <Input style={{ borderBottomWidth: 0.5, borderBottomColor: '#d6d7da' }} />
            </Item> 
            <Button style={{ marginTop: 30 }} rounded block primary>
              <Text>Klik untuk mencari</Text>
            </Button>                       
          </Card>          
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
  }
});