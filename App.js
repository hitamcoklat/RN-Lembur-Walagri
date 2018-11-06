import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation';
import Home from './component/Home';
import PageCari from './component/Page/PageCari';
import PageContact from './component/Page/PageContact';
import PageArtikel from './component/Page/PageArtikel';
import PageLoginFB from './component/Page/PageLoginFB';
import DetailPageCari from './component/Page/DetailPageCari';
import OfflinePage from './component/Page/OfflinePage';
import TesPage from './component/Page/TesPage';
import DetailFaskesRS from './component/RumahSakit/DetailFaskesRS';
import DetailListViewRS from './component/RumahSakit/DetailListViewRS';
import CommentRS from './component/RumahSakit/CommentRS';
import AppHome from './component/AppHome';
import LihatCommentRS from './component/RumahSakit/LihatCommentRS';

export default class App extends Component {

  render() {
    return (
      <AppStackNavigator />
    );
  }

}

const AppStackNavigator = createStackNavigator({
  Home: AppHome,
  PageCari: PageCari,
  PageContact: PageContact,
  TesPage: TesPage,
  PageArtikel: PageArtikel,
  LihatCommentRS: LihatCommentRS,
  DetailListViewRS: DetailListViewRS,
  CommentRS: CommentRS,
  DetailPageCari: DetailPageCari,
  PageLoginFB: PageLoginFB,
  OfflinePage: OfflinePage,
  DetailFaskesRS: DetailFaskesRS
});