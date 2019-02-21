import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

import SearchInput from './components/SearchInput';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding">
          <Text style={[styles.largeText, styles.textStyle, styles.special]}>
            San Francisco
          </Text>
          <Text style={[styles.smallText, styles.textStyle]}>
            Light Cloud
          </Text>
          <Text style={[styles.largeText, styles.textStyle]}>
            54°
          </Text>
          <SearchInput placeholder="Search any city"/>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    textAlign: 'center',
    ...Platform.select({
      ios: {
        fontFamily: 'AvenirNext-Regular',
      },
      android: {
        fontFamily: 'Roboto',
      }
    })
  },
  largeText: {
    fontSize: 48,
  },
  smallText: {
    fontSize: 16,
  },
  special: {
    fontFamily: 
      Platform.OS === 'ios' ? 'AvenirNext-UltraLight' : 'Roboto',
  },
  textInput: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    color: 'white',
    height: 40,
    width: 300,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    alignSelf: 'center',
},
});
