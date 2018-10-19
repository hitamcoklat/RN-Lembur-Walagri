import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation';
import Home from './component/Home';
import PageCariFaskes from './component/Page/PageCari';
import PageContact from './component/Page/PageContact';
import PageArtikel from './component/Page/PageArtikel';
import PageLoginFB from './component/Page/PageLoginFB';
import DetailFaskesRS from './component/RumahSakit/DetailFaskesRS';
import DetailListViewRS from './component/RumahSakit/DetailListViewRS';
import CommentRS from './component/RumahSakit/CommentRS';

export default class App extends Component {

  render() {
    return (
      <AppStackNavigator />
    );
  }

}

const AppStackNavigator = createStackNavigator({
  Home: Home,
  CariFaskes: PageCariFaskes,
  PageContact: PageContact,
  PageArtikel: PageArtikel,
  DetailListViewRS: DetailListViewRS,
  CommentRS: CommentRS,
  PageLoginFB: PageLoginFB,
  DetailFaskesRS: DetailFaskesRS
});