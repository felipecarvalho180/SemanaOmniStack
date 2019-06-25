import React, { Component } from 'react';
import io from 'socket.io-client';
import { Text, View, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import api from '../services/api';

export default class Feed extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity
        style={{marginRight: 20}}
        onPress={() => navigation.navigate('New')}
      >
        <Feather name="camera" size={20} /> 
      </TouchableOpacity>
    ),
  });

  constructor(props) {
    super(props);

    this.state = {
      feed: [],
    }
  }

  async componentDidMount() {
    this.registerToSocket();

    const response = await api.get('posts');

    console.log(response.data);

    this.setState((state) => ({
      ...state,
      feed: response.data,
    }))
  }

  registerToSocket = () => {
    const socket = io('http://192.168.1.103:3333');

    socket.on('post', newPost => {
      this.setState((state) => ({
        ...state,
        feed: [newPost, ...this.state.feed],
      }))
    });

    socket.on('like', likedPost => {
      this.setState((state) => ({
        ...state,
        feed: this.state.feed.map(post =>
          post._id === likedPost._id ? likedPost : post
        )
      }))
    })

  }

  handleLike = id => {
    api.post(`/posts/${id}/like`);
  }

  render() {
    const { feed } = this.state;
    return (
      <View style={ styles.container }>
        <FlatList 
          data={ feed }
          keyExtractor={ post => post._id }
          renderItem={ ({ item }) => (
            <View style={ styles.feedItem }>

              <View style={ styles.feedItemHeader }>
                <View style={ styles.userInfo }>
                  <Text style={ styles.name }>{ item.author }</Text>
                  <Text style={ styles.place }>{ item.place }</Text>
                </View>

                <Feather name="more-horizontal" size={ 20 }/>
              </View>

              <Image 
                style={ styles.feedImage } 
                source={{ uri: `http://192.168.1.103:3333/files/${item.image}` }}
              />

              <View style={ styles.feedItemFooter }>
                <View style={ styles.actions }>
                  <TouchableOpacity 
                    style={styles.action} 
                    onPress={() => this.handleLike(item._id)}
                  >
                    <Feather name="heart" size={ 25 } />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.action} onPress={ () => {} }>
                    <FontAwesome name="comment-o" size={ 25 } />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.action} onPress={ () => {} }>
                    <Feather name="send" size={ 25 } />
                  </TouchableOpacity>
                </View>

                <Text style={ styles.likes }>{ item.likes } curtidas</Text>
                <Text style={ styles.description }>{ item.description }</Text>
                <Text style={ styles.hashtags }>{ item.hashtags }</Text>
              </View>
            </View>
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  feedItem: {
    marginTop: 20,
  },

  feedItemHeader: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  name: {
    fontSize: 14,
    color: '#000',
  },

  place: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },

  feedImage: {
    width: '100%',
    height: 400,
    marginVertical: 15,
  },

  feedItemFooter: {
    paddingHorizontal: 15,
  },

  actions: {
    flexDirection: 'row',
  },

  action: {
    marginRight: 8,
  },

  likes: {
    marginTop: 15,
    fontWeight: 'bold',
    color: '#000',
  },

  description: {
    lineHeight: 18,
    color: '#000',
  },

  hashtags: {
    color: '#7159c1',
  },
});
