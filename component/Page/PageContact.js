import React, { Component } from 'react';
import { StyleProvider, CardItem, Card, Container, Title, Button, Header, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch } from "native-base";
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';

export default class PageContact extends Component {

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
            <Title>Tentang Aplikasi</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Card>
            <CardItem>
              <Body>
                <Text>
                   Lembur Walagri adalah aplikasi yang dapat memudahkan para pengguna (Masyarakat) dalam mencari informasi seputar Fasilitas Kesehatan, Info Kesehatan dan Rujukan.
                </Text>
                <Text style={{ margin: 10, fontWeight: 'bold' }}>
                  Version. 1.0
                </Text>
              </Body>
            </CardItem>
          </Card>        
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="whatsapp" />
              </Button>
            </Left>
            <Body>
              <Text>(022) 4230353 - 4232292</Text>
            </Body>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="envelope" />
              </Button>
            </Left>
            <Body>
              <Text>Email: tikdiskesjabar@gmail.com</Text>
            </Body>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="instagram" />
              </Button>
            </Left>
            <Body>
              <Text>IG: @diskesjabar</Text>
            </Body>
          </ListItem>    
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="facebook" />
              </Button>
            </Left>
            <Body>
              <Text>FB: diskesprovjabar</Text>
            </Body>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="twitter" />
              </Button>
            </Left>
            <Body>
              <Text>Twitter: @diskes_jabar</Text>
            </Body>
          </ListItem>  
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="link" />
              </Button>
            </Left>
            <Body>
              <Text>http://diskes.jabarprov.go.id</Text>
            </Body>
          </ListItem>                                              
        </Content>
      </Container>
      </StyleProvider>
    );
  }
}