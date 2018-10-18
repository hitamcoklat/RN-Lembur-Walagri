import React, { Component } from 'react';
import { StyleProvider, Form, Item, Input, Label, Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, CardItem, Card, View, Fab, Spinner, Accordion } from 'native-base';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import DetailListViewRS from './DetailListViewRS';
import { StyleSheet, ImageBackground } from 'react-native';
import axios from 'axios';

export default class DetailFaskes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      detailFaskes: [],
      // apiURL: 'http://192.168.58.1:3222', // server local
      apiURL: 'http://app.diskes.jabarprov.go.id:3701', // server local
      isLoading: true,
      dataArray: []
    };
  }  

	static navigationOptions = {
		header: null
	}

  componentDidMount() {
    const { navigation } = this.props;
    const kodeFaskes = navigation.getParam('kodeFaskes');
    this.getDetailFaskes(kodeFaskes);    
  }

  getDetailFaskes(idFaskes) {
    axios.get(this.state.apiURL + '/detailFaskesByKodeRS/?id_rs='+ idFaskes)
      .then((response) => {
        var res = response.data.data;
        this.setState({
          detailFaskes: response.data.data,
          isLoading: false
        });        
      })
      .catch((error) => {
        console.log(error);
    });       
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
            <Title>{ this.state.detailFaskes.NAMA_RS }</Title>
          </Body>
        </Header>
        <ImageBackground source={ require('../../assets/bg-lemburWalagri.png') }
          style={styles.backgroundImage}>
        <Content padder>
          {(this.isLoading == false) && <Spinner color='blue' />}
          <Card style={{ borderRadius: 10 }}>
            <CardItem header>
              <Text>Informasi</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text style={styles.judulDetail}>Nama Rumah Sakit</Text>
                <Text>{ this.state.detailFaskes.NAMA_RS }</Text>
                <Text style={styles.judulDetail}>Telepon</Text>
                <Text>{ this.state.detailFaskes.TELEPON }</Text>
                <Text style={styles.judulDetail}>Telepon Humas</Text>
                <Text>{ this.state.detailFaskes.TELEPON_HUMAS }</Text>
                <Text style={styles.judulDetail}>Email</Text>
                <Text>{ this.state.detailFaskes.EMAIL }</Text>                                
              </Body>
            </CardItem>
            <CardItem footer>
                <Left>
                <Button rounded bordered onPress={() => this.props.navigation.navigate('CommentRS')}><Text>Beri Ulasan!</Text></Button>
                </Left>
                <Right>
                  <Button onPress={() => this.props.navigation.navigate('DetailListViewRS', { detailFaskes: this.state.detailFaskes })} rounded bordered><Text>Info Detail!</Text></Button>
                </Right>
            </CardItem>
         </Card>                   
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