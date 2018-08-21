import React, { Component } from 'react'
import { Text } from 'react-native';
import Header from './screens/components/header';
import Home from './screens/containers/home';
import CategoryList from './videos/containers/category-list.js';
import SuggestionList from './videos/containers/suggestion-list';
import API from '../utils/api';
import {connect}from 'react-redux';
import Movie from './screens/containers/movie';
import Search from './sections/containers/search';

class AppLayout extends Component {

    async componentDidMount(){
        const suggestionList = await API.getSuggestion(10);
        this.props.dispatch({
          type   : 'SET_CATEGORY_LIST',
          payload: {
            suggestionList
          }
        });
        
        const categoryList = await API.getMovies();
        this.props.dispatch({
          type   : 'SET_SEGGESTION_LIST',
          payload: {
            categoryList
          }
        });
    
      }



    render() {
            if (this.props.selectedMovie) {
                return <Movie/>  
            }else{
                return (               
                    <Home>            
                        <Header />                                                          
                        <Search/>
                        <CategoryList/>
                        <SuggestionList/>        
                    </Home>
                )
            }          
    }
}

const mapStateToProps = (state) => {
    return {
        selectedMovie: state.selectedMovie
    }
}

export default connect(mapStateToProps)(AppLayout);