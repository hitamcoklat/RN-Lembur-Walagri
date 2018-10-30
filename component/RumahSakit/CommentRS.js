import React, { Component } from 'react';
import { StyleProvider, Form, Item, Input, Label, Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, CardItem, Card, View, Fab, Spinner, Textarea } from 'native-base';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import DetailListViewRS from './DetailListViewRS';
import { StyleSheet, ImageBackground, AsyncStorage, Alert } from 'react-native';
import { API_URL } from '../Config';
import axios from 'axios';

export default class CommentRS extends Component {

  constructor(props) {
    super(props);
    this.state = {
      apiURL: API_URL,
      isLoading: true,
      isLogin: false,
      idUser: '',
      inputUlasan: '',
      id_faskes: '',
      kodeFaskes: '',
      namaFaskes: '',
      namaUser: ''
    };
  }

  static navigationOptions = {
    header: null
  }  

  componentDidMount() {
    const { navigation } = this.props;
    const kodeFaskes = navigation.getParam('kodeFaskes');
    const namaFaskes = navigation.getParam('namaFaskes');
    
    this.setState({ 
      kodeFaskes: kodeFaskes,
      namaFaskes: namaFaskes
    });

    this._retrieveData('idUser').then(res => {
      console.log(res);
      if(res !== null) {
        this.setState({ 
          idUser: res,
          isLogin: true
        });
      }
    });

    this._retrieveData('namaUser').then(res => {
      console.log(res);
      if(res !== null) {
        this.setState({ namaUser: res });
      }
    });     
  }

  async _retrieveData(jenis) {
    let dataUser = ''
    try {
        dataUser = await AsyncStorage.getItem(jenis);
    } catch(error) {
      console.log('terjadi kesalahan!');
    }
    return dataUser;
  }

  kirimData() {
      var self=this;
      var panjangKarakter = this.state.inputUlasan;

      if(panjangKarakter.length < 5) {
        return Alert.alert('Info', 'Ulasan tidak boleh kosong atau kurang dari 5 karakter.');
      }

      axios.post(API_URL + '/input-ulasan', {
        id_fb       : this.state.idUser,
        ulasan      : this.state.inputUlasan,
        id_faskes   : this.state.kodeFaskes,
        nama_user   : this.state.namaUser,
        nama_faskes : this.state.namaFaskes
      })
      .then(function (response) {

        if(response.data.status == 'success') {
          Alert.alert(
            'Info', 
            'Ulasan berhasil dikirim!',
            [
              {text: 'Lihat Ulasan', onPress: () => self.props.navigation.navigate('LihatCommentRS', { kodeFaskes: response.data.data.id_faskes })},
              {text: 'Kembali', onPress: () => self.props.navigation.navigate('DetailFaskesRS', { kodeFaskes: response.data.data.id_faskes })}
            ]
          );
        }
      })
      .catch(function (error) {
        console.log(error);
      });    
  }

  kirimUlasan = () => {
    if(!this.state.isLogin) {
      return Alert.alert(
        'Info',
        'Anda harus login terlebih dahulu.',
        [
          {text: 'Nanti saja', onPress: () => console.log('Ask me later pressed')},
          {text: 'Batal', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'LOGIN', onPress: () => this.props.navigation.navigate('PageLoginFB')},
        ],
        { cancelable: false }
      );
    }
    this.kirimData();
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
            <Title style={{ marginLeft: -50 }}>Beri Ulasan</Title>
          </Body>
        </Header>
        <ImageBackground source={ require('../../assets/bg-lemburWalagri.png')}
        style={styles.backgroundImage}>
        <Content padder>
          <Form>
            <Textarea onChangeText={(text) => this.setState({inputUlasan: text})} style={{ backgroundColor: '#FFFFFF', borderColor: '#FFFFFF', borderRadius: 4 }} rowSpan={5} bordered rounded placeholder="Textarea" />
            <Button onPress={() => this.kirimUlasan()} style={{ marginTop: 5 }} block rounded success>
              <Icon style={{ marginRight: -10 }} name='check-circle' /><Text>Kirim Ulasan</Text>
            </Button>
            <Button onPress={() => this.props.navigation.navigate('LihatCommentRS', { kodeFaskes: this.state.kodeFaskes })} style={{ marginTop: 5 }} block rounded info>
              <Icon style={{ marginRight: -10 }} name='comments' /><Text>Lihat Ulasan</Text>
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