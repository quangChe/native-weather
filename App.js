import React from 'react';
import { 
  StyleSheet, 
  View, 
  ImageBackground,
  Text, 
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import getImageForWeather from './utils/getImageForWeather';

import SearchInput from './components/SearchInput';


export default class App extends React.Component {
  render() {
    const location = 'San Francisco';

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding">
        
        <ImageBackground
          source={getImageForWeather('Clear')}
          style={styles.imageContainer}
          imageStyle={styles.image}>

          <View style={styles.detailsContainer}>
            <Text style={[styles.largeText, styles.textStyle, styles.special]}>
              {location}
            </Text>
            <Text style={[styles.smallText, styles.textStyle]}>
              Light Cloud
            </Text>
            <Text style={[styles.largeText, styles.textStyle]}>
              54°
            </Text>
            <SearchInput 
              location={location}
              placeholder="Search any city"/>
          </View>            
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
  },
  imageContainer: {
    flex: 1,
  }, 
  image: {
    flex: 1,
    width: null, 
    height: null, 
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 20,
    marginTop: -60
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: 
      Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: 'white'
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
});
