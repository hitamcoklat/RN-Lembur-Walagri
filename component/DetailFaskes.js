import React, { Component } from 'react';
import { StyleProvider, Form, Item, Input, Label, Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, CardItem, Card } from 'native-base';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

export default class DetailFaskes extends Component {

	static navigationOptions = {
		header: null
	}

  render() {
  	const { navigation } = this.props;
  	const kodeFaskes = navigation.getParam('kodeFaskes');
  	console.log(kodeFaskes);

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
          <Form>
            <Item floatingLabel>
              <Label>Masukan Nama Faskes</Label>
              <Input />
            </Item> 
            <Button style={{ marginTop: 30 }} block info>
              <Text>Klik untuk mencari</Text>
            </Button>                       
          </Form>          
        </Content>
      </Container>
      </StyleProvider>
    );
  }
}