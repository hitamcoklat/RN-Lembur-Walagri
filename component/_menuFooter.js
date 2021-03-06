import React, { Component } from 'react';
import { Text, Left, Button, Right, Icon, Footer, FooterTab } from 'native-base';

export default class MenuFooter extends Component {
  render() {
    return (
	    <Footer>
	      <FooterTab>
	        <Button onPress={() => this.props.navigation.push('PageCari')} vertical>
	          <Icon name="search" />
	          <Text>Cari</Text>
	        </Button>
	        <Button onPress={() => this.props.navigation.navigate('PageContact')} vertical>
	          <Icon name="feed" />
	          <Text>Tentang</Text>
	        </Button>
	        <Button onPress={() => this.props.navigation.navigate('PageLoginFB')} vertical>
	          <Icon name="user" />
	          <Text>Login</Text>
	        </Button>	        
	      </FooterTab>
	    </Footer>
    );
  }
}

module.exports = MenuFooter;