import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  WebView
} from 'react-native';
import { Badge, Container, Content, Title, Footer, FooterTab, Button, Icon, Text, View, Fab } from 'native-base';
import PopupDialog, { DialogTitle, SlideAnimation } from 'react-native-popup-dialog';
import HTML from 'react-native-render-html';
import Mapbox from '@mapbox/react-native-mapbox-gl';
Mapbox.setAccessToken('pk.eyJ1IjoiaGl0YW1jb2tsYXQiLCJhIjoiY2prbmZmOHcyMHJhczNybW5rbWhvMmNqYSJ9.xJu-SnSLbjIO6z-pmzn2Vw');

import customMarker from '../assets/icon-marker.png';
import dataSample from '../assets/data-sample.json';

export default class AppBody extends Component {

  constructor(props) {
    super(props);
    this.state = {
      arrayKordinat: dataSample,
      lokasiLongitude: 0,
      lokasiLatitude: 0,
      infoContent: '<p>homina</p>'
    };
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(this.getUserCoordinate, this.error);
  }

  detailFaskes(ids) {
    const idFaskes = ids - 1;
    var desc = this.state.arrayKordinat[idFaskes].text;
    this.setState({infoContent: desc}, function () {
        this.popupDialog.show();
    });
  }

  centerMap() {
    console.log(this.map);
    this.map.setCamera({
      centerCoordinate: [this.state.lokasiLongitude, this.state.lokasiLatitude]
    });
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

        <Mapbox.Callout
          key={key}
          id={id}        
        >
          <View style={styles.annotationContainer}>
            <View style={styles.annotationFill} />
            <Text style={{ marginBottom: 5 }}>{title}</Text>
            <Button onPress={() => this.detailFaskes(key) } block primary>
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

    const slideAnimation = new SlideAnimation({
      slideFrom: 'bottom',
    });  
    
    return (
          <Container>
            <Mapbox.MapView
                ref={(e) => { this.map = e; }}
                styleURL={Mapbox.StyleURL.Street}
                zoomLevel={15}
                logoEnabled={false}
                animated={true}
                centerCoordinate={[this.state.lokasiLongitude, this.state.lokasiLatitude]}
                style={styles.container}> 
                {this.renderAnnotations()}
            </Mapbox.MapView>
            <View>
              <Fab
                onPress={() => this.centerMap() }
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
            <PopupDialog
              dialogTitle={<DialogTitle title="Sekilas Info" />}
              ref={(popupDialog) => { this.popupDialog = popupDialog; }}
              dialogAnimation={slideAnimation}
            >
                <ScrollView style={{ flex: 1 }}>
                  <View style={{ padding: 20 }}>
                        <HTML html={this.state.infoContent} imagesMaxWidth={Dimensions.get('window').width - 40} />
                  </View>
                </ScrollView>
            </PopupDialog>             
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