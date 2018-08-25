import React, { Component, Fragment } from 'react'
import { Text,StatusBar } from 'react-native';
import Header from '../../screens/components/header';
import CategoryList from '../../videos/containers/category-list.js';
import SuggestionList from '../../videos/containers/suggestion-list';
import API from '../../../utils/api';
import {connect}from 'react-redux';
import Movie from '../../screens/containers/movie';
import Search from '../../sections/containers/search';

class Home extends Component {

    static navigationOptions = () => {
        return {
            header: Header,
            title : 'Inicio'
        }
    }

    async componentDidMount(){

      this.focus = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('dark-content');
            StatusBar.setBackgroundColor('white');   
          });


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

      componentWillUnmount(){
        this.focus.remove();
      }



    render() {
           
                return (               
                    <Fragment>                                    
                        <Search/>
                        <CategoryList/>
                        <SuggestionList/>        
                    </Fragment>
                )
                     
    }
}



export default connect(null)(Home);