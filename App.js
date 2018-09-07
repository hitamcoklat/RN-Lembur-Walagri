import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Drawer } from 'native-base';

/*Component*/

import Sidebar from './component/sidebar';
import AppHeader from './component/AppHeader';
import AppBody from './component/AppBody';

/*Component*/

type Props = {};
export default class App extends Component<Props> {

  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    console.log('masuk kesini');
    this.drawer._root.open()
  };

  render() {
    return (
        <Drawer
          ref={(ref) => { this.drawer = ref; }}
          content={<Sidebar/>}
          onClose={() => this.closeDrawer()} >
          <AppHeader openDrawer={this.openDrawer.bind(this)} />
          <AppBody />
        </Drawer>
    );
  }
}