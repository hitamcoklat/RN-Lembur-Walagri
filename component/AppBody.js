import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';
import { Badge, Container, Content, Title, Footer, FooterTab, Button, Icon, Text, View, Fab } from 'native-base';
import Mapbox from '@mapbox/react-native-mapbox-gl';
Mapbox.setAccessToken('pk.eyJ1IjoiaGl0YW1jb2tsYXQiLCJhIjoiY2prbmZmOHcyMHJhczNybW5rbWhvMmNqYSJ9.xJu-SnSLbjIO6z-pmzn2Vw');

export default class AppBody extends Component {

  constructor(props) {
    super(props);
    this.state = {
      arrayKordinat: [
        {
          'id': 1,
          'lat': -6.898493,
          'long': 107.598531,
          'title': 'Rumah Sakit Hasan Sadikin!'
        },
        {
          'id': 2,
          'lat': 107.601106, 
          'long': -6.900852,
          'title': 'Masakan Padang di Bandung!'
        }     
      ]
    };
  }

  renderAnnotations () {
    this.state.arrayKordinat.map((y) => {
    });
  }

  render() {
    console.log(this.props.changePage);
    return (
          <Container>
            <Mapbox.MapView
                styleURL={Mapbox.StyleURL.Street}
                zoomLevel={15}
                centerCoordinate={[107.600439, -6.901062]}
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
                <Icon name="map-o" />
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
                <Button vertical>
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
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  annotationFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'orange',
    transform: [{ scale: 0.6 }],
  }
});

module.exports = AppBody;