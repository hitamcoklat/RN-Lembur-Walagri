import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { LoginButton, 
		AccessToken, 
		GraphRequest, 
		GraphRequestManager } from 'react-native-fbsdk';
import axios from 'axios';		

export default class PageLoginFB extends Component {	

	  //Create response callback.
	  _responseInfoCallback = (error, result) => {
	    if (error) {
	      alert('Error fetching data: ' + error.toString());
	    } else {
	      console.log(result);
	    }
	  }	

	render() {	
		return(
	      <View style={styles.container}>
			<LoginButton
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
	                    console.log(infoRequest);
			        })
			      }
			    }
			  }
			  onLogoutFinished={() => console.log("logout.")} />
	      </View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});