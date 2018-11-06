import React, { Component } from 'react';
import {
  Text,
} from 'react-native';

import {Header,Left,Button,Icon,Right,Body,Title,StyleProvider} from 'native-base';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

export default class AppHeader extends Component {

	render() {
		return (
			<StyleProvider style={getTheme(platform)}>
		    <Header>
		      <Left>
		        <Button transparent
		          onPress={()=>this.props.openDrawer()}
		        >
		          <Icon name='bars' />
		        </Button>
		      </Left>
		      <Body>
		        <Title>Lembur Walagri</Title>		          
		      </Body>
		      <Right />
		    </Header>
		    </StyleProvider>
		);
	}
}

module.exports = AppHeader;