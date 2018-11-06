import React, { Component } from 'react';
import { StyleProvider, Form, Item, Input, Label, Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, CardItem, Card, View, Fab, Spinner, Accordion } from 'native-base';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import HTML from 'react-native-render-html';
import { StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { API_URL } from '../Config';
import axios from 'axios';

export default class DetailFaskes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      detailFaskes: [],
      apiURL: API_URL,
      isLoading: true,
      showBtnSelengkapnyaRS: false,
      showBtnSelengkapnyaPus: false      
    };
  }  

	static navigationOptions = {
		header: null
	}

  componentDidMount() {
  
    const { navigation } = this.props;
    const dataFaskes = navigation.getParam('dataFaskes');
    console.log(dataFaskes);
    this.setState({ detailFaskes: dataFaskes });
    
    if(dataFaskes.jenis == 'puskesmas') {
      this.setState({ showBtnSelengkapnyaPus: true })
    } else {
      this.setState({ showBtnSelengkapnyaRS: true })      
    }
  
  }

  render() {

    let btnDetailForPuskesmas = (this.state.showBtnSelengkapnyaPus == true) ? (
                        <Button style={{ marginTop: 10 }} 
                        onPress={() => this.props.navigation.navigate('CommentRS', { kodeFaskes: this.state.detailFaskes.kode_faskes, namaFaskes: this.state.detailFaskes.nama_faskes })}  
                        rounded block bordered success><Icon style={{ marginRight: -10 }} name='comments' /><Text>Ulasan</Text></Button>) : (<Text></Text>);

    let btnDetailForRS = (this.state.showBtnSelengkapnyaRS == true) ? (<Button style={{ marginTop: 10 }} onPress={() => this.props.navigation.navigate('DetailFaskesRS', { 
                          kodeFaskes: this.state.detailFaskes.kode_faskes,
                          namaFaskes: this.state.detailFaskes.nama_faskes,
                          })} block rounded bordered primary><Icon style={{ color: '#3F51B5', marginRight: -10}} name='info-circle' /><Text>Selengkapnya</Text></Button>) : (<Text></Text>);    

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
            <Title style={{ marginLeft: -50 }}>Detail Cari</Title>
          </Body>
        </Header>
        <ImageBackground source={ require('../../assets/bg-lemburWalagri.png') }
          style={styles.backgroundImage}>
        <Content padder>

          <Card style={{ borderRadius: 10 }}>
            <CardItem header>
              <Icon style={{ color: '#3F51B5' }} name='info-circle' /><Text style={{ fontWeight: 'bold', color: '#3F51B5', borderBottomWidth: 1 }}>Informasi</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text style={styles.judulDetail}>Nama Faskes</Text>
                <Text>{ this.state.detailFaskes.nama_faskes }</Text>
                <Text style={styles.judulDetail}>Keterangan</Text>
                <HTML html={"<p style='color: black;'>" + this.state.detailFaskes.deskripsi + "</p>"} imagesMaxWidth={Dimensions.get('window').width - 40} />

                { btnDetailForRS }

                { btnDetailForPuskesmas }
                            
              </Body>
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