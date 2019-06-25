import React, { Component } from 'react'
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
    //this.registerToSocket();

    const response = await api.get('posts');

    console.log(response.data);

    this.setState((state) => ({
      ...state,
      feed: response.data,
    }))
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
                source={{ uri: `http://192.168.1.103:3333/${item.image}` }}
              />

              <View style={ styles.feedItemFooter }>
                <View style={ styles.actions }>
                  <TouchableOpacity onPress={() => {}}>
                    <Feather name="heart" size={ 25 } />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={ () => {} }>
                    <FontAwesome name="comment-o" size={ 25 } />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={ () => {} }>
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

  },
});
