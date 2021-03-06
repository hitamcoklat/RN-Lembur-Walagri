import React, { Component } from 'react';
import { View, Text, NetInfo, Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');

export default class OfflineNotice extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isConnected: true
		};
	}		

	componentDidMount() {
		NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
	}

	componentWillUnmount() {
		NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
	}

	handleConnectivityChange = isConnected => {
		if (isConnected) {
		  this.setState({ isConnected });
		} else {
		  this.setState({ isConnected });
		}
	};	

	render() {
	    if (!this.state.isConnected) {
	    	console.log('status Offline');
			return (
			    <View style={styles.offlineContainer}>
			      <Text style={styles.offlineText}>No Internet Connection</Text>
			    </View>
			);
	    } else {
	    	this.props.navigation.navigate('Home');
	    }
		return null;
	}
}
const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: 0
  },
  offlineText: { 
    color: '#fff'
  }
});