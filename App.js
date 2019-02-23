import React from 'react';
import { 
  StyleSheet, 
  View, 
  ImageBackground,
  Text, 
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StatusBar
} from 'react-native';

import getImageForWeather from './utils/img_gallery';

import SearchInput from './components/SearchInput';

import {fetchLocationId, fetchWeather} from './utils/api';


export default class App extends React.Component {
  state = {
    location: '',
    temperature: null,
    weather: '',
    loading: false,
    error: false
  }

  componentDidMount() {
    this.handleUpdateLocation('Los Angeles');
  }

  handleUpdateLocation = newLocation => {
    if (!newLocation) return;  

    this.setState({loading: true}, async () => {
      try {
        const id = await fetchLocationId(newLocation);
        let {location, weather, temperature} = await fetchWeather(id);
        temperature = ((temperature * 9/5) + 32).toFixed(0);
        this.setState({
          loading: false, 
          error: false,
          weather,
          location,
          temperature
        });
      } catch(e) {
        this.setState({loading: false, error: true});
      }
    })
  }

  render() {
    const {
      location, 
      weather, 
      temperature,
      loading,
      error
    } = this.state;

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding">
        <StatusBar barStyle="light-content" />
        <ImageBackground
          source={getImageForWeather(this.state.weather)}
          style={styles.imageContainer}
          imageStyle={styles.image}>
          
          <View style={styles.detailsContainer}>
            <ActivityIndicator 
              animating={loading}
              size="large" 
              color="rgba(255, 255, 255, 0.9)"/>

            { !loading && (
              <View>
                {error && (
                  <Text style={[styles.smallText, styles.textStyle]}>
                    Could not load weather, please try a different
                    city.
                  </Text>
                )}

                {!error && (
                  <View>
                    <Text style={[styles.largeText, styles.textStyle, styles.special]}>
                      {location}
                    </Text>
                    <Text style={[styles.smallText, styles.textStyle]}>
                      {weather}
                    </Text>
                    <Text style={[styles.largeText, styles.textStyle]}>
                      {temperature}&deg;F
                    </Text>
                  </View>
                )}

                <SearchInput 
                  placeholder="Search any city"
                  onSubmission={this.handleUpdateLocation}/>
              </View>
            )}
          
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
