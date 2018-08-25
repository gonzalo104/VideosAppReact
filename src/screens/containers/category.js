import React, { Component } from 'react';
import {FlatList, Text} from 'react-native';
import  Layout from '../../videos/components/suggestion-list-layout';
import Empty from '../../videos/components/empty';
import Separator from '../../videos/components/verticalSeparator';
import Suggestion from '../../videos/components/suggestion';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
const mapStateToProps = (state) =>{
    return {
        list: state.videos.categoryList
    }
}

class Category extends Component{

    keyExtractor  = (item) => item.id.toString();
    renderEmpty   = () => <Empty text="No hay sugerencias :("/>
    itemSeparator = () => <Separator/>
    viewMovie     = (item) => {
        this.props.dispatch({
            type   : 'SET_SELECTED_MOVIE',
            payload: {
                movie: item,
            }
        })
        this.props.dispatch(
            NavigationActions.navigate({
                routeName: 'Movie'
            })
        )
    }
    renderItem    = ({item}) => {
        return(
            <Suggestion {...item} onPress={() => { this.viewMovie(item)}}/>
        )        
    }


    render(){
        const list = [
           {
               title: "Avengers",
               key  : '1',
           },
           {
               title: "Pokemon",
               key  : '2'
           }
        ];
        
        return(
            <Layout title={`${this.props.navigation.getParam('genre','Categoria')}`}>
                <FlatList
                    keyExtractor           = {this.keyExtractor}
                    data                   = {this.props.list}
                    ListEmptyComponent     = {this.renderEmpty}
                    ItemSeparatorComponent = {this.itemSeparator}
                    renderItem             = {this.renderItem}
                />
            </Layout>
            
        )
    }
};

export default connect(mapStateToProps)(Category);

