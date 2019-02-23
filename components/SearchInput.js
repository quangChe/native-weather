import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, StyleSheet } from 'react-native';


export default class SearchInput extends React.Component {
  state = {
    text: '',
  }

  static propTypes = {
    onSubmission: PropTypes.func.isRequired,
    placeholder: PropTypes.string
  }

  static defaultProps = {
    placeholder: '',
  }

  handleChangeText = (text) => {
    this.setState({text});
  }

  handleSubmitEditing = () => {
    const { onSubmission } = this.props;
    const { text } = this.state;

    if (!text) return;

    onSubmission(text);
    this.setState({text: ''});
  }
  
  render() {
    const { text } = this.state;
    const { placeholder } = this.props;

    return (
      <View style={styles.container}>
        <TextInput
          autoCorrect={false} 
          value={text}
          placeholder={placeholder}
          placeholderTextColor="white"
          underlineColorAndroid="transparent" 
          style={styles.textInput} 
          clearButtonMode="always"
          onChangeText={this.handleChangeText}
          onSubmitEditing={this.handleSubmitEditing}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 300,
    marginTop: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    color: 'white',
  },
})
