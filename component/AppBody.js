import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import { Badge, Container, Content, Title, Footer, FooterTab, Button, Icon, Text } from 'native-base';
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
      console.log(y.title);
    });
  }

  render() {
    return (
          <Container>
            <Mapbox.MapView
                styleURL={Mapbox.StyleURL.Street}
                zoomLevel={15}
                centerCoordinate={[107.600439, -6.901062]}
                style={styles.container}>
                {this.renderAnnotations()}
            </Mapbox.MapView>
            <Footer>
              <FooterTab>
                <Button badge vertical>
                  <Badge><Text>2</Text></Badge>
                  <Icon name="apps" />
                  <Text>Profil</Text>
                </Button>
                <Button vertical>
                  <Icon name="camera" />
                  <Text>Info</Text>
                </Button>
                <Button active badge vertical>
                  <Badge ><Text>51</Text></Badge>
                  <Icon active name="navigate" />
                  <Text>Hubungi</Text>
                </Button>
                <Button vertical>
                  <Icon name="person" />
                  <Text>Contact</Text>
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