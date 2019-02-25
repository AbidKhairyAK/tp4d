/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, WebView, View, Text, TouchableOpacity, BackHandler } from 'react-native';
import SplashScreen from 'react-native-splash-screen'

import OfflineNotice from './src/comp/OfflineNotice';

const WEBVIEW_REF = "WEBVIEW_REF";

export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = { canGoBack: false };
  }
  
  _backHandler = () => {
    if(this.state.canGoBack) {
      this.refs[WEBVIEW_REF].goBack();
      return true;
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this._backHandler);
    SplashScreen.hide();
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this._backHandler);
  }

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <OfflineNotice />
        <WebView
          ref={WEBVIEW_REF}
          style={{flex: 1}}
          onNavigationStateChange=
            {this.onNavigationStateChange.bind(this)}
          source={{uri: 'http://tp4dkejari-sukoharjo.com/'}}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
});