import React, { Component } from 'react';
import { StyleProvider, Input, Label, Container, Header, Title, Content, Left, Right, Body, Icon, Text, Button } from 'native-base';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import { WebView, ActivityIndicator, StyleSheet, View } from 'react-native';
import { API_URL } from '../Config';

export default class LihatCommentRS extends Component {

	constructor(props) {
		super(props);
		this.state = {
			visible: true,
			apiURL: API_URL,
			kodeFaskes: ''
		}
	}

	static navigationOptions = {
		header: null
	}	

	componentDidMount() {
	    const { navigation } = this.props;
	    const kodeFaskes = navigation.getParam('kodeFaskes');
	    this.setState({ kodeFaskes: kodeFaskes });
	    console.log(kodeFaskes);	
	}

	hideSpinner() {
		this.setState({ visible: false });
	}   

	render() {
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
		        <Title>Ulasan Faskes</Title>
		      </Body>
		      <Right />
		    </Header>
		    <Content contentContainerStyle={{ flex: 1 }}>
				<WebView
					onLoad={() => this.hideSpinner()}
					source={{uri: API_URL + '/lihat-komentar?id_faskes=' + this.state.kodeFaskes}} />
		        {this.state.visible && (
		        	<View style={styles.loading}>
			          <ActivityIndicator
			          	color="#0000ff"
			            size="large"
			          />
		          </View>
		        )}					
		    </Content>
		  	</Container>
		   </StyleProvider>    	      
		);
	}
}

const styles = StyleSheet.create({
	loading: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center'
	}
});