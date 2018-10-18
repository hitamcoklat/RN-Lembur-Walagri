import React, { Component } from 'react';
import { StyleProvider, Form, Item, Input, Label, Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, CardItem, Card, View, Fab, Spinner, Accordion } from 'native-base';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import axios from 'axios';

export default class DetailListViewRS extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataArray: []
    };
  }  

	static navigationOptions = {
		header: null
	}

  componentDidMount() {
    const { navigation } = this.props;
    const detailFaskes = navigation.getParam('detailFaskes');
    this.setState({
      dataArray: [
        { title: "Nama Fasilitas Kesehatan", content: detailFaskes.NAMA_RS },
        { title: "Kode Faskes", content: detailFaskes.KODE_RS },
        { title: "Jenis RS", content: detailFaskes.JENIS_RS },
        { title: "Tanggal Registrasi", content: detailFaskes.TGL_REGISTRASI },
        { title: "Kelas RS", content: detailFaskes.KLS_RS },
        { title: "Direktur", content: detailFaskes.DIREKTUR },
        { title: "Alamat", content: detailFaskes.ALAMAT },
        { title: "Penyelenggara", content: detailFaskes.PENYELENGGARA },
        { title: "Kab/Kota", content: detailFaskes.KAB_KOTA },
        { title: "Telepon", content: detailFaskes.TELEPON },
        { title: "FAX", content: detailFaskes.FAX },
        { title: "Email", content: detailFaskes.EMAIL },
        { title: "Website", content: detailFaskes.WEBSITE },
        { title: "No", content: detailFaskes.NO },
        { title: "Kamar VVIP", content: detailFaskes.VVIP },
        { title: "Kamar VIP", content: detailFaskes.VIP },
        { title: "Kamar Kelas I", content: detailFaskes.KELAS_I },
        { title: "Kamar Kelas II", content: detailFaskes.KELAS_II }
      ]
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
            <Title></Title>
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
      </Container>
      </StyleProvider>
    );
  }
}