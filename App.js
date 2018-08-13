/**
 * Sample React Native App
 * https:   //github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Home from './src/screens/containers/home';
import Header from './src/screens/components/header';
import SuggestionList from './src/videos/containers/suggestion-list';
import API from './utils/api';
import CategoryList from './src/videos/containers/category-list.js'
import Video from 'react-native-video';
import Player from './src/player/containers/player';

type Props = {};
export default class App extends Component<Props> {

  state = {
    suggestionList: [],
    categoryList  : []
  }

   async componentDidMount(){
    const movies     = await API.getSuggestion(10);
    const categories = await API.getMovies();
    console.log(movies);
    console.log(categories);
    this.setState({
      suggestionList: movies,
      categoryList  : categories
    });
  }

  render() {
    return (
      <Home>
        <Header/>   
        <Player/>            
        <Text>Buscador</Text>        
        <CategoryList list={this.state.categoryList}/>
        <SuggestionList list={this.state.suggestionList}/>        
      </Home>
    );
  }
}

