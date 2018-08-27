import React from 'react';
import {View, Text, SafeAreaView,ScrollView, Image,StyleSheet} from 'react-native';
import {DrawerItems} from 'react-navigation';

const Drawer = (props) => {
    return (
        <ScrollView>
            <SafeAreaView>
                <Image source={require('../../../assets/logo.png')} style={styles.logo}/>
            </SafeAreaView>
            <DrawerItems {...props}/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    logo:{
        width         : 80,
        height        : 26,
        resizeMode    : 'contain',
        marginVertical: 20,
        marginLeft    : 10,
    }
});

export default Drawer;