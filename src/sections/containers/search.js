import React, { Component } from 'react'
import { TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import API from '../../../utils/api';

class Search extends Component {

    state = {
        text: ''
    }

    handleSubmit = async() => {
        const movies = await API.searchMovie(this.state.text);
        this.props.dispatch({
            type   : 'SET_SELECTED_MOVIE',
            payload: {
                movie: movies[0]
            }
        });

    }
    handleChangueText = (text) => {
        this.setState({
            text
        });
    }

    render() {
        return (
            <TextInput placeholder="Busca tu película favoritass"
                autoCorrect           = {false}
                autoCapitalize        = "none"
                underlineColorAndroid = "transparent"
                onSubmitEditing       = {this.handleSubmit}
                onChangeText          = {this.handleChangueText}
                style                 = {styles.input}
            />
        )
    }
}

const styles = StyleSheet.create({
    input: {
        padding    : 8,
        fontSize   : 15,
        borderWidth: 1,
        borderColor: '#eaeaea',
    }
});


export default connect(null)(Search);