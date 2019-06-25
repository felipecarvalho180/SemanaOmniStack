import React, { Component } from 'react';
import api from '../services/api';
import ImagePicker from 'react-native-image-picker';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native'

export default class New extends Component {
  static navigationOptions = {
    headerTitle: 'Nova Publicação'
  }

  constructor(props) {
    super(props);

    this.state = {
      image: null,
      preview: null,
      author: '',
      place: '',
      description: '',
      hashtags: '',
    }
  }

  handleSelectImage = () => {
    ImagePicker.showImagePicker({
      title: 'Selecioanr Imagem',
    }, upload => {
      
      if (upload.error) {
        console.log('Error');
      } else if (upload.didCancel) {
        console.log('Used canceled');
      } else {
        const preview = {
          uri: `data:image/jpeg;base64,${ upload.data }`
        }

        let prefix;
        let ext;
        debugger
        if(upload) {
          [prefix, ext] = upload.fileName.split('.');
          ext = ext.toLowerCase() === 'heic' ? 'jpg' : ext;
        } else {
          prefix = new Date().getTime();
          ext = 'jpg';
        }

        const image = {
          uri: upload.uri,
          type: upload.type,
          name: `${prefix}.${ext}`
        };

        this.setState((state) => ({
          ...state,
          preview,
          image,
        }))
        
      }
    })
  }

  handleSubmit = async () => {

    const data = new FormData();

    data.append('image', this.state.image);
    data.append('author', this.state.author);
    data.append('place', this.state.place);
    data.append('description', this.state.description);
    data.append('hashtags', this.state.hashtags);

    await api.post('posts', data);

    this.props.navigation.navigate('Feed');
  }

  render() {
    const { preview } = this.state;
    return (
      <View style={ styles.container }>
        <TouchableOpacity
          style={ styles.selectButton }
          onPress={this.handleSelectImage}
        >
          <Text style={styles.selectButtonText}>Selecionar imagem</Text>
        </TouchableOpacity>

        {
          preview && 
          <Image 
            style={styles.preview}
            source={ preview } 
          /> 
        }

        <TextInput 
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Nome do autor"
          placeholderTextColor="#999"
          value={this.state.author}
          onChangeText={author => this.setState({ author }) }
        />

        <TextInput 
          style={styles.input}
          autoCorrect={false}
          key="place"
          autoCapitalize="none"
          placeholder="Local da foto"
          placeholderTextColor="#999"
          value={this.state.place}
          onChangeText={place => this.setState({ place }) }
        />

        <TextInput 
          style={styles.input}
          autoCorrect={false}
          key="description"
          autoCapitalize="none"
          placeholder="Descrição"
          placeholderTextColor="#999"
          value={this.state.description}
          onChangeText={description => this.setState({ description }) }
        />

        <TextInput 
          style={styles.input}
          autoCorrect={false}
          key="hashtags"
          autoCapitalize="none"
          placeholder="Hashtags"
          placeholderTextColor="#999"
          value={this.state.hashtags}
          onChangeText={hashtags => this.setState({ hashtags }) }
        />

        <TouchableOpacity
          style={ styles.sharedButton }
          onPress={this.handleSubmit}
        >
          <Text style={styles.sharedButtonText}>Postar imagem</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
  },

  selectButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 5,
    marginBottom: 5,
    height: 40
  },

  selectButtonText: {
    color: '#666'
  },

  preview: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    margin: 10,
    borderRadius: 5,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 5,
    borderRadius: 5,
    paddingLeft: 15
  },

  sharedButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7159c1',
    borderRadius: 5,
    padding: 5,
    marginBottom: 5,
    height: 40
  },

  sharedButtonText: {
    color: '#fff'
  },
});
