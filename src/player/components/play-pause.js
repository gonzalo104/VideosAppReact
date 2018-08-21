import React from 'react';
import {TouchableHighlight, TouchableOpacity , TouchableWithoutFeedback, StyleSheet,Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const playIcon  = (<Icon name="play" size={30} color="green" />)
const pauseIcon = (<Icon name="pause" size={30} color="green" />)

const PlayPause = (props) =>{
    return(
        <TouchableHighlight
            onPress       = {props.onPress}
            underlayColor = "rgba(255,255,255,.1)"
            hitSlop       = {{left:5,top:5,bottom:5,right:5}}
        >
        {
            props.paused ? playIcon: pauseIcon
        }    
        </TouchableHighlight>                     
    )
}

const styles = StyleSheet.create({
    button:{
        color     : 'white',
        fontSize  : 10,
        fontWeight: 'bold',
    },
    container:{
        justifyContent   : 'center',
        paddingHorizontal: 10,
        height           : 25,
        marginRight      : 10,
        marginVertical   : 5,
        borderWidth      : 1,
        borderRadius     : 10,
        borderColor      : 'white',
        backgroundColor  : 'gray',
    }
});

export default PlayPause;