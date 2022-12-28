import React from 'react';
import { View, Text,TextInput, Image, SafeAreaView,StyleSheet,Dimensions } from 'react-native'

var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;


const BoxContainer = props => {

    return (

        <View style={{...styles.boxContainer, ...props.style}}>

            {props.children}

        </View>

    );

};


const styles = StyleSheet.create({

    boxContainer:{

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        height:100,
        borderRadius: 10,
        marginLeft: windowWidth*0.05 ,
        marginRight: windowWidth*0.05,

        width: windowWidth*0.9

    }

});


export default BoxContainer;