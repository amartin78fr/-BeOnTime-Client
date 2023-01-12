import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';

export default class LoadingView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: 'rgba(0,0,0,0.3)',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          zIndex: 1000,
        }}>
        <View
          style={{
            borderRadius: 10,
            shadowColor: 'black',
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 25,
            shadowOffset: {width: 0, height: 2},
            maxWidth: 150,
            maxHeight: 150,
            shadowOpacity: 0.4,
            shadowRadius: 4,
            elevation: 5,
          }}>
          <ActivityIndicator size={'large'} color={'#000'} />
        </View>
      </View>
    );
  }
}
