import React from 'react';
import {View,Text, ImageBackground, StyleSheet} from 'react-native';

const Category = (props) =>{
    return(
        <ImageBackground
        source = {{uri: props.background_image}}
        style  = {styles.wrapper}
        >
            <Text style={styles.genre}>{props.genres ? props.genres[0] : "General"}</Text>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        width         : 250,
        height        : 100,
        borderRadius  : 10,
        overflow      : 'hidden',
        alignItems    : 'center',
        justifyContent: 'center'
    },
    genre:{
        color           : 'white',
        fontSize        : 40,
        fontWeight      : 'bold',
        textShadowColor : 'rgba(0,0,0,.75)',
        textShadowOffset: {
            width : 2,
            height: 2
        },
        textShadowRadius: 0
    }    
});

export default Category;

