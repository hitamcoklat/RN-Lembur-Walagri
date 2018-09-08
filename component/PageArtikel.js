import React, { Component } from 'react';
import { Image, Dimensions } from 'react-native';
import { StyleProvider, Container, Title, Header, Right, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

export default class PageArtikel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      article: [
        {
          'id': 1,
          'tgl': 'April 15, 2016',
          'title': '7 Kegiatan Germas',
          'image': 'https://4.bp.blogspot.com/-MyCdd3orC9Q/WgAVrCjP0XI/AAAAAAAAAdE/SN_wvpUfMNkhylFB9GNKDkGl32llUj46gCLcBGAs/s1600/7%2Bkegiatan%2Bgermas.jpg',
          'text': 'Germas adalah suatu kebijakan pemerintah yang di kemas dalam bentuk kegiatan terpadu dan terkonsep yang harus dilakukan oleh seluruh elemen...'
        },
        {
          'id': 2,
          'tgl': 'April 15, 2016',
          'title': 'Indonesia Sehat Bersama GERMAS',
          'image': 'https://4.bp.blogspot.com/-xiF1G2saKdY/WXGmZejBCBI/AAAAAAAACb4/RJbCAsTCz78aAfA7ksD8EMneGcq99BH-QCLcBGAs/s1600/Waktu%2BTidur.jpg',
          'text': 'Meski terkesan kompleks, GERMAS sendiri sejatinya cukup mudak direfleksikan dan dilaksanakan di kehidupan harian...'
        },
        {
          'id': 3,
          'tgl': 'April 15, 2016',
          'title': 'GERMAS Wujudkan Indonesia Sehat',
          'image': 'http://www.depkes.go.id/resources/download/narasi%20tunggal/germas/GERM%203.jpeg',
          'text': 'Saat ini, Indonesia tengah menghadapi tantangan besar yakni masalah kesehatan triple burden, karena masih adanya penyakit infeksi,...'
        }                       
      ]
    };
  }

  static navigationOptions = {
    header: null
  }

  render() {
	
	const dimensions = Dimensions.get('window');
	const imageHeight = Math.round(dimensions.width * 9 / 16);
	const imageWidth = dimensions.width;

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
            <Title>Artikel Sehat</Title>
          </Body>
          <Right />
        </Header>
        <Content>
        {
        	this.state.article.map((v, i) => {
        		return (
		          <Card key={i}>
		            <CardItem>
		              <Left>
		                <Thumbnail source={{uri: v.image}} />
		                <Body>
		                  <Text>{ v.title }</Text>
		                  <Text note>{ v.tgl }</Text>
		                </Body>
		              </Left>
		            </CardItem>
		            <CardItem>
		              <Body>
		                <Image source={{uri: v.image}} style={{height: imageHeight, width: imageWidth, flex: 1 }}/>
		                <Text>
		                  { v. text }
		                </Text>
		              </Body>
		            </CardItem>
		          </Card>
        		);
        	})
        }

        </Content>
      </Container>
      </StyleProvider>
    );
  }
}