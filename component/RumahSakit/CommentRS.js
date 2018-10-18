import React, { Component } from 'react';
import { StyleProvider, Form, Item, Input, Label, Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, CardItem, Card, View, Fab, Spinner, Textarea } from 'native-base';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import DetailListViewRS from './DetailListViewRS';
import { StyleSheet, ImageBackground } from 'react-native';
import axios from 'axios';

export default class CommentRS extends Component {

  constructor(props) {
    super(props);
    this.state = {
      apiURL: 'http://192.168.58.1:3222', // server local
      // apiURL: 'http://app.diskes.jabarprov.go.id:3701', // server local
      isLoading: true,
    };
  }  

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
            <Title>Beri Ulasan</Title>
          </Body>
        </Header>
        <ImageBackground source={ require('../../assets/bg-lemburWalagri.png')}
        style={styles.backgroundImage}>
        <Content padder>
          <Form>
            <Textarea style={{ backgroundColor: '#FFFFFF', borderColor: '#FFFFFF', borderRadius: 4 }} rowSpan={5} bordered rounded placeholder="Textarea" />
            <Button style={{ marginTop: 5 }} block rounded success>
              <Text>Kirim Ulasan</Text>
            </Button>            
          </Form>
        </Content> 
        </ImageBackground>     
      </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  judulDetail: {
    fontWeight: 'bold',
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'    
  }  
});