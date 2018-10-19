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
import MenuFooter from './_menuFooter';
import { API_URL } from './Config';

export default class AppBody extends Component {

  constructor(props) {
    super(props);
    this.state = {
      arrayKordinat: [],
      lokasiLongitude: 0,
      lokasiLatitude: 0,
      kodeFaskes: '',
      showBtnSelengkapnya: false,
      infoContent: '<p>Data belum tersedia</p>',
      imageURL: 'https://facebook.github.io/react/img/logo_og.png',
      apiURL: API_URL // server online
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          lokasiLatitude: position.coords.latitude,
          lokasiLongitude: position.coords.longitude,
        });
        this.getAllFaskes(position.coords.latitude, position.coords.longitude);
      },
    );
  }

  detailFaskes(ids) {
    const idFaskes = ids;
    var desc = this.state.arrayKordinat[idFaskes].deskripsi;

    // Jika ada kode faskes
    if(typeof this.state.arrayKordinat[idFaskes].kode_faskes != 'undefined') {
      this.setState({ showBtnSelengkapnya: true })
    }

    this.setState({
      infoContent: desc,
      kodeFaskes: this.state.arrayKordinat[idFaskes].kode_faskes,
      imageURL: this.state.apiURL + '/uploads/' + this.state.arrayKordinat[idFaskes].image_file_thumb
      }, function () {
        // munculkan pop up dialog
        this.popupDialog.show();
    });
  }

  centerMap() {
    this.map.setCamera({
      centerCoordinate: [this.state.lokasiLongitude, this.state.lokasiLatitude],
      zoom: 15,
      duration: 2000,      
    });
  }

  getAllFaskes(lat, long) {
    return fetch(this.state.apiURL + '/api/getNearby?long=' + long + '&lat=' + lat)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          arrayKordinat: responseJson.data
        });
        // return responseJson.movies;
      })      
      .catch((error) => {
        console.error(error);
      });    
  }

  renderPointAnnotation = (marker, index) => {
    var key = index;
    var id = 'id-' + index;
    var title = marker.nama_faskes;
    var iconPin = this.state.apiURL + '/icon/icon-' + marker.jenis + '.png';

    return (
      <Mapbox.PointAnnotation
        key={key}
        id={id}
        anchor={{ x: 0.5, y: 1 }} 
        coordinate={[marker.long, marker.lat]}>        
        <Image
          source={{ uri: iconPin }} style={{ width: 32, height: 42 }}/>
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
    this.state.arrayKordinat.map((y, i) => {
      const point = this.renderPointAnnotation(y, i);
      annotations.push(point);
    });
    return annotations;
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
            
            <MenuFooter navigation={this.props.navigation} />
            
            <PopupDialog
              dialogTitle={<DialogTitle title="Sekilas Info" />}
              ref={(popupDialog) => { this.popupDialog = popupDialog; }}
              dialogAnimation={slideAnimation}
              height={0.7}
            >
                <ScrollView style={{ flex: 1 }}>
                  <View style={{ 
                    paddingRight: 20, 
                    paddingLeft: 20, 
                    paddingTop: 20, 
                    paddingBottom: 50 }}>
                        <Image
                          style={{height: Math.round(Dimensions.get('window').width * 9 / 16), width: Dimensions.get('window').width - 40, marginBottom: 20}}
                          source={{ uri: '' + this.state.imageURL + '' }}
                        />                                     
                        <HTML html={this.state.infoContent} imagesMaxWidth={Dimensions.get('window').width - 40} />
                        
                        { (this.state.showBtnSelengkapnya == true) ? (<Button style={{ marginTop: 10 }} onPress={() => this.props.navigation.navigate('DetailFaskesRS', { kodeFaskes: this.state.kodeFaskes })} block rounded bordered primary><Text>Selengkapnya</Text></Button>) : (<Text></Text>) }
                        
                  </View>
                </ScrollView>
            </PopupDialog>             
          </Container>
    );
  }
}

const stylesMap = Mapbox.StyleSheet.create({
  icon: {
    iconImage: customMarker,
    iconAllowOverlap: true,
    iconSize: 0.5,
  } 
});


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