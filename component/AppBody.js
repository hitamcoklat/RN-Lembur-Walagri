import React, { Component } from 'react';
import {
  StyleSheet,
  Image
} from 'react-native';
import { Badge, Container, Content, Title, Footer, FooterTab, Button, Icon, Text, View, Fab } from 'native-base';
import Mapbox from '@mapbox/react-native-mapbox-gl';
Mapbox.setAccessToken('pk.eyJ1IjoiaGl0YW1jb2tsYXQiLCJhIjoiY2prbmZmOHcyMHJhczNybW5rbWhvMmNqYSJ9.xJu-SnSLbjIO6z-pmzn2Vw');

import customMarker from '../assets/icon-marker.png';

export default class AppBody extends Component {

  constructor(props) {
    super(props);
    this.state = {
      arrayKordinat: [
        {
          'id': 1,
          'lat': -6.898493,
          'long': 107.598531,
          'title': 'Rumah Sakit Hasan Sadikin! \n Germas adalah suatu kebijakan pemerintah yang di kemas dalam bentuk kegiatan terpadu dan terkonsep yang harus'
        },
        {
          'id': 2,
          'lat': -6.900852, 
          'long': 107.601106,
          'title': 'Masakan Padang di Bandung!'
        }     
      ],
      lokasiLongitude: 0,
      lokasiLatitude: 0,
    };
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(this.getUserCoordinate, this.error);
  }

  detailFaskes() {
    console.log('Detail di klik!');
  }

  renderPointAnnotation = (marker) => {
    var key = marker.id;
    var id = 'id-' + marker.id;
    var title = marker.title;

    return (
      <Mapbox.PointAnnotation
        key={key}
        id={id}
        anchor={{ x: 0.5, y: 1 }} 
        coordinate={[marker.long, marker.lat]}>

        <Mapbox.Callout title={title}
          key={key}
          id={id}        
        >
          <View style={styles.annotationContainer}>
            <View style={styles.annotationFill} />
            <Text style={{ marginBottom: 5 }}>{title}</Text>
            <Button onPress={() => this.detailFaskes() } block primary>
              <Text>Info</Text>
            </Button>            
          </View>
        </Mapbox.Callout>  

      </Mapbox.PointAnnotation>
    );    
  }

  renderAnnotations () {
    const annotations = [];
    this.state.arrayKordinat.map((y) => {
      const point = this.renderPointAnnotation(y);
      annotations.push(point);
    });
    return annotations;
  }

  getUserCoordinate = (pos) => {
    var crd = pos.coords;
    this.state.lokasiLongitude = crd.longitude;
    this.state.lokasiLatitude  = crd.latitude;
  }

  error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  render() {
    
    return (
          <Container>
            <Mapbox.MapView
                styleURL={Mapbox.StyleURL.Street}
                zoomLevel={15}
                logoEnabled={false}
                centerCoordinate={[this.state.lokasiLongitude, this.state.lokasiLatitude]}
                style={styles.container}> 
                {this.renderAnnotations()}
            </Mapbox.MapView>
            <View>
              <Fab
                active={this.state.active}
                direction="up"
                containerStyle={{ }}
                style={{ backgroundColor: '#5067FF' }}
                position="bottomRight">
                <Icon name="street-view" />
              </Fab>
            </View>            
            <Footer>
              <FooterTab>
                <Button vertical>
                  <Icon name="heartbeat" />
                  <Text>Sekitar</Text>
                </Button>
                <Button onPress={() => this.props.navigation.navigate('CariFaskes')} vertical>
                  <Icon name="search" />
                  <Text>Cari</Text>
                </Button>
                <Button onPress={() => this.props.navigation.navigate('PageArtikel')} vertical>
                  <Icon name="book" />
                  <Text>Germas</Text>
                </Button>
                <Button onPress={() => this.props.navigation.navigate('PageContact')} vertical>
                  <Icon name="feed" />
                  <Text>Hubungi</Text>
                </Button>
              </FooterTab>
            </Footer>
          </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  annotationContainer: {
    width: 200,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  annotationFill: {
    width: 100,
    borderRadius: 15,
    backgroundColor: 'blue',
    transform: [{ scale: 0.6 }],
  }
});

module.exports = AppBody;