import React, { Component } from 'react';
import { Container, Header, Content, CardItem, Card, Text, Left, Right, Icon, Body } from 'native-base';

export default class Sidebar extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Card>
            <CardItem header>
              <Text>Lembur Walagri</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                	Lembur Walagri adalah aplikasi yang dapat memudahkan para pengguna (Masyarakat) dalam mencari informasi seputar Fasilitas Kesehatan, Info Kesehatan dan Rujukan.
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text>&copy; Dinas Kesehatan Prov. JABAR</Text>
            </CardItem>
         </Card>
        </Content>
      </Container>
    );
  }
}

module.exports = Sidebar;