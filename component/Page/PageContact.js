import React, { Component } from 'react';
import { StyleProvider, Container, Title, Button, Header, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch } from "native-base";
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
            <Title>Contact</Title>
          </Body>
          <Right />
        </Header>
        <Content>
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
        </Content>
      </Container>
      </StyleProvider>
    );
  }
}