import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { LoginButton, 
		AccessToken, 
		GraphRequest, 
		GraphRequestManager } from 'react-native-fbsdk';
import { StyleProvider, Form, Item, Input, Label, Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, CardItem, Card } from 'native-base';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import { AsyncStorage, Alert } from "react-native";
import axios from 'axios';

export default class PageLoginFB extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLogin: false,
			namaUser: '',
			idUser: '',
		};
	}

	static navigationOptions = {
		header: null
	}

	componentDidMount() {
		this._retrieveData('namaUser').then(res => {
			console.log(res);
			if(res !== null) {
				this.setState({ 
					isLogin: true,
					namaUser: res 
				});
			}
		});
		this._retrieveData('idUser').then(res => {
			console.log(res);
			if(res !== null) {
				this.setState({ idUser: res });
			}
		});	
	}

	async storeItem(key, item) {
		try {
		    await AsyncStorage.setItem(key, item);
		} catch (error) {
		  console.log(error.message);
		}
	}

	removeDataAll() {
		this._removeDataStorage('namaUser');
		this._removeDataStorage('idUser');
		Alert.alert(
			'Info',
			'Anda Berhasil Logout.',
			[
			  {text: 'Lanjut', onPress: () => this.props.navigation.navigate('Home')},
			],
			{ cancelable: false }
		);
	}

	async _removeDataStorage(key) {
	  try {
	    await AsyncStorage.removeItem(key);
	    console.log('logout.')   
	   } catch (error) {
	   		console.log(error);
	   }
	}	

	async _retrieveData(jenis) {
		let dataUser = ''
		try {
		    dataUser = await AsyncStorage.getItem(jenis);
		} catch(error) {
			console.log('terjadi kesalahan!');
		}
		return dataUser;
	}	

	//Create response callback.
	_responseInfoCallback = (error, result) => {
		if (error) {
		  alert('Error fetching data: ' + error.toString());
		} else {
			this.storeItem('namaUser', result.name);	
			this.storeItem('idUser', result.id);
			this.setState({
				namaUser: result.name,
				isLogin: true
			});
			Alert.alert(
				'Info',
				'Anda Berhasil Login.',
				[
				  {text: 'Lanjut', onPress: () => this.props.navigation.navigate('Home')},
				],
				{ cancelable: false }
			);
		}
	}

	renderInfoLogin = (namaUser) => {
		return (
		  <Card>
		    <CardItem header bordered>
		      <Text>Informasi Login</Text>
		    </CardItem>
		    <CardItem bordered>
		      <Body>
		        <Text style={{ fontWeight: 'bold' }}>Nama</Text>
		        <Text>{ namaUser }</Text>	   
		      </Body>
		    </CardItem>
		  </Card>
		)
	}	

	renderLoginButton = () => {

		let textPerintahLogin;
		let FBLoginButton;

		FBLoginButton = <LoginButton
			  onLoginFinished={
			    (error, result) => {
			      if (error) {
			        console.log('login has error: ', result.error)
			      } else if (result.isCancelled) {
			        console.log('login is cancelled.')
			      } else {
			        AccessToken.getCurrentAccessToken().then((data) => {
			          const { accessToken } = data
		                const infoRequest = new GraphRequest(
		                  '/me?fields=name,picture',
		                  null,
		                  this._responseInfoCallback
		                );
		                // Start the graph request.
		                new GraphRequestManager().addRequest(infoRequest).start();

			        })
			      }
			    }
			  }
			  onLogoutFinished={ () => this.removeDataAll() } />;

		if(!this.state.isLogin) {
			textPerintahLogin = <Text style={styles.textInfoLogin}>Silahkan login menggunakan akun Facebook anda untuk dapat melanjutkan.</Text>;
		}

		return (
			<View style={styles.btnTengahLogin}>
			{ textPerintahLogin }			
			{ FBLoginButton }						
			</View>
		);			 
	}

	render() {

		let infoLoginCard;
		if(this.state.isLogin) {
			infoLoginCard = this.renderInfoLogin(this.state.namaUser);
		}

		return(
			<StyleProvider style={getTheme(platform)}>
			     <Container>
			        <Header>
			          <Left>
			            <Button onPress={() => this.props.navigation.goBack()} transparent>
			              <Icon name='chevron-left' />
			            </Button>
			          </Left>
			          <Body>
			            <Title>Halaman Login</Title>
			          </Body>
			          <Right />
			        </Header>
			        <Content padder>
			        	{ infoLoginCard }
	     				{ this.renderLoginButton() }
			        </Content>
			      </Container>	
	      </StyleProvider>		
		);
	}
}

const styles = StyleSheet.create({
	textInfoLogin: {
		padding: 10,
		borderWidth: 1,
		marginBottom: 10,
		borderColor: '#EAEAEA',
		borderRadius: 5
	},
	btnTengahLogin: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center'
	}
});