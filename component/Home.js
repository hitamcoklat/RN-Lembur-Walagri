import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Drawer, StyleProvider } from 'native-base';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

/*Component*/
import Sidebar from './sidebar';
import AppHeader from './AppHeader';
import AppBody from './AppBody';
import OfflineNotice from './OfflineNotice';
/*Component*/

export default class Home extends Component {

  static navigationOptions = {
    header: null
  }	

  constructor(props) {
    super(props);
    this.state = {
      drawerType: 'overlay',
      openDrawerOffset:100,
      closedDrawerOffset:0,
      panOpenMask: .1,
      panCloseMask: .9,
      relativeDrag: false,
      panThreshold: .25,
      tweenHandlerOn: false,
      tweenDuration: 200,
      tweenEasing: 'linear',
      disabled: false,
      tweenHandlerPreset: null,
      acceptDoubleTap: false,
      acceptTap: false,
      acceptPan: true,
      tapToClose: false,
      negotiatePan: false,
      side: "top"
    };
  }  

  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    console.log('masuk kesini');
    this.drawer._root.open()
  };

  render() {
    return (
          <StyleProvider style={getTheme(platform)}>

            <Drawer
              type={this.state.drawerType}
              animation={this.state.animation}
              openDrawerOffset={this.state.openDrawerOffset}
              closedDrawerOffset={this.state.closedDrawerOffset}
              panOpenMask={this.state.panOpenMask}
              panCloseMask={this.state.panCloseMask}
              relativeDrag={this.state.relativeDrag}
              panThreshold={this.state.panThreshold}        
              tweenDuration={this.state.tweenDuration}
              tweenEasing={this.state.tweenEasing}
              acceptDoubleTap={this.state.acceptDoubleTap}
              acceptTap={this.state.acceptTap}
              acceptPan={this.state.acceptPan}
              tapToClose={this.state.tapToClose}
              negotiatePan={this.state.negotiatePan}
              changeVal={this.state.changeVal}
              side={this.state.side}        
              ref={(ref) => { this.drawer = ref; }}
              content={<Sidebar/>}
              onClose={() => this.closeDrawer()} >
                <AppHeader openDrawer={this.openDrawer.bind(this)} />
                <OfflineNotice navigation={this.props.navigation} />
                <AppBody navigation={this.props.navigation} />
            </Drawer>
          </StyleProvider>
    );
  }
}

module.exports = Home;