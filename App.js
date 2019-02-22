import React from 'react';
import { 
  StyleSheet, 
  View, 
  ImageBackground,
  Text, 
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';

import getImageForWeather from './utils/img_gallery';

import SearchInput from './components/SearchInput';

import {fetchLocationId, fetchWeather} from './utils/api';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      temperature: null,
      weather: '',
      loading: true
    }
  }

  componentDidMount() {
    this.handleUpdateLocation('San Diego');
  }

  handleUpdateLocation = async newLocation => {
    this.setState({loading: true});
    const id = await fetchLocationId(newLocation);
    fetchWeather(id)
      .then(data => {
        const wData = data;
        wData.temperature = data.temperature.toFixed(0);
        return this.setState({...wData, loading: false});
      })
      .catch(err => {
        console.error(err);
        return this.setState({
          location: '',
          temperature: null,
          weather: '',
          loading: true
        });
      })
  }

  render() {
    const {location, weather, temperature} = this.state;

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding">
        
        <ImageBackground
          fadeDuration="4s"
          source={getImageForWeather(this.state.weather)}
          style={styles.imageContainer}
          imageStyle={styles.image}>

          <View style={styles.detailsContainer}>
            <Text style={[styles.largeText, styles.textStyle, styles.special]}>
              {this.state.loading ? '' : location}
            </Text>
            <Text style={[styles.smallText, styles.textStyle]}>
              {this.state.loading ? '' : weather}
            </Text>
            {
              this.state.loading 
              ? <ActivityIndicator size="large" color="rgba(0, 0, 0, 0.8)"/>
              : <Text style={[styles.largeText, styles.textStyle]}>
                  {temperature}&deg;F
                </Text>
                }
            
            <SearchInput 
              placeholder="Search any city"
              onSubmission={this.handleUpdateLocation}/>
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
