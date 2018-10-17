import React, { Component } from 'react';
import { StyleProvider, Form, Item, Input, Label, Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, CardItem, Card, View, Fab, Spinner, Accordion } from 'native-base';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';
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
          dataArray: [
            { title: "Nama Fasilitas Kesehatan", content: res.NAMA_RS },
            { title: "Kode Faskes", content: res.KODE_RS },
            { title: "Jenis RS", content: res.JENIS_RS },
            { title: "Tanggal Registrasi", content: res.TGL_REGISTRASI },
            { title: "Kelas RS", content: res.KLS_RS },
            { title: "Direktur", content: res.DIREKTUR },
            { title: "Alamat", content: res.ALAMAT },
            { title: "Penyelenggara", content: res.PENYELENGGARA },
            { title: "Kab/Kota", content: res.KAB_KOTA },
            { title: "Telepon", content: res.TELEPON },
            { title: "FAX", content: res.FAX },
            { title: "Email", content: res.EMAIL },
            { title: "Website", content: res.WEBSITE },
            { title: "No", content: res.NO },
            { title: "Kamar VVIP", content: res.VVIP },
            { title: "Kamar VIP", content: res.VIP },
            { title: "Kamar Kelas I", content: res.KELAS_I },
            { title: "Kamar Kelas II", content: res.KELAS_II },
          ],
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
        <Content padder>
          {(this.isLoading == false) && <Spinner color='blue' />}
          <Accordion
            dataArray={this.state.dataArray}
            icon="plus-circle" 
            expandedIcon="minus-circle"
            expanded={1}
            headerStyle={{ backgroundColor: "#b7daf8" }}
            contentStyle={{ backgroundColor: "#ddecf8" }}
          />          
        </Content>
            <View>
              <Fab
                direction="up"
                containerStyle={{ }}
                style={{ backgroundColor: '#5067FF' }}
                position="bottomRight">
                <Icon name="edit" />
              </Fab>
            </View>         
      </Container>
      </StyleProvider>
    );
  }
}