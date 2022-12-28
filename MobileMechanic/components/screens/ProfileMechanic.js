import React from 'react' 
import { View, Text, Dimensions, Image, StyleSheet } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'; 
// import * as fs from 'react-native-fs'

let image = require('../../assets/john-doe-girl..jpg');
var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;

const ProfileCust = (tabsNavigationProps) => {
    let obtainedEmail = tabsNavigationProps.navigation.dangerouslyGetParent().getParam('usercnic');
    console.log(obtainedEmail);
    return(
        <React.Fragment> 
            <View style = { {alignSelf: 'center', flexDirection: 'row', marginTop:windowHeight*0.1} }> 
                <Image 
                    style = { {width: windowWidth * 0.5, height: windowHeight * 0.27, borderRadius: 100, marginBottom: windowHeight * 0.05, marginTop: windowHeight * 0.05} } 
                    source = {image}
                />
                
                <FontAwesome5 
                    style = { {marginTop: windowHeight * 0.27, marginLeft: windowWidth * -0.12} } 
                    name = "plus-circle" 
                    size = { 28 } 
                    color = "black"
                    onPress = { () => console.log('You Pressed the Plus Icon ...') }
                />
            </View>
        </React.Fragment>
    );
}

const styles = StyleSheet.create( {
    header: {
        height: 80,
        paddingTop: 38,
        backgroundColor: 'coral',
        
    },
    title: {
        textAlign: 'center',
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: windowHeight * 0.05,
    }
})


export default ProfileCust
