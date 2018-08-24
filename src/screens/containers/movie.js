import React, { Component } from 'react';
import MovieLayout from '../components/movie';
import Player from '../../player/containers/player';
import Header from '../../screens/components/header';
import Close from '../../sections/components/close';
import Details from '../../videos/components/details';
import {connect} from 'react-redux';
import {Animated} from 'react-native';
class Movie extends Component {

    state = {
        opacity: new Animated.Value(0),
    }

    static navigationOptions = ({ navigation }) => {
        return {
            header: (
                <Header>
                    <Close onPress={() => {navigation.goBack()}}/>  
                </Header> 
            )
        }
    }


    componentDidMount() {
        Animated.timing(
            this.state.opacity,
            {
                toValue : 1,
                duration: 1000,
            }
        ).start();
    }

    closeVideo = () =>{
        this.props.dispatch({
            type   : 'SET_SELECTED_MOVIE',
            payload: {
                movie: null
            },
        });
    }

    render() {
        return (
        <Animated.View
        style = {{flex:1, opacity: this.state.opacity,}}
        >
          <MovieLayout>             
             <Player/>  
             <Details {...this.props.movie}/>
          </MovieLayout>
        </Animated.View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        movie: state.videos.selectedMovie
    }
}

export default connect(mapStateToProps)(Movie);