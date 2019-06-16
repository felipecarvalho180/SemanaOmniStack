import React, { Component } from 'react';

import './New.css';
import api from '../services/api';

class New extends Component {

  constructor(props) {
    super(props);

    this.state = {
      image: null,
      author: '',
      place: '',
      description: '',
      hashtags: '',
    }
  }

  handleImageChange = event => {
    this.setState({ image: event.target.files[0] })
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }
  
  handleSubmit = async event => {
    event.preventDefault();

    const data = new FormData();

    data.append('image', this.state.image);
    data.append('author', this.state.author);
    data.append('place', this.state.place);
    data.append('description', this.state.description);
    data.append('hashtags', this.state.hashtags);

    await api.post('posts', data);

    this.props.history.push('/');
  }

  render() {
    const { 
      author,
      place,
      description,
      hashtags
    } = this.state;

    return(
      <form id="new-post" onSubmit={this.handleSubmit}>
        <input 
          type="file"
          onChange={this.handleImageChange}/>

        <input 
          type="text" 
          name="author" 
          placeholder="Autor do post"
          onChange={this.handleChange}
          value={author}/>

        <input 
          type="text" 
          name="place" 
          placeholder="Local do post"
          onChange={this.handleChange}
          value={place}/>

        <input 
          type="text" 
          name="description" 
          placeholder="Descrição do post"
          onChange={this.handleChange}
          value={description}/>

        <input 
          type="text" 
          name="hashtags" 
          placeholder="Hashtags do post"
          onChange={this.handleChange}
          value={hashtags}/>

        <button type="submit">Enviar</button>
      </form>
    )
  }
}

export default New;