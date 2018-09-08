import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation';
import PageHome from './component/PageHome';
import PageCariFaskes from './component/PageCari';
import PageContact from './component/PageContact';

export default class App extends Component {

  render() {
    return (
      <AppStackNavigator />
    );
  }

}

const AppStackNavigator = createStackNavigator({
  Home: PageHome,
  CariFaskes: PageCariFaskes,
  PageContact: PageContact
});