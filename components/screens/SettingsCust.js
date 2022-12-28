import React, { useState } from 'react'
import { View, Text, Image, Dimensions } from 'react-native'
import { FontAwesome, Ionicons, Entypo, Feather } from '@expo/vector-icons'
import firebase from '../../components/screenSnippets/FirebaseInit'

var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;

const SettingsCust = (tabsNavigationProps) => {
    const [name, setName] = useState('Your Name');
    let image = require('../../assets/john-doe.jpg');
    let obtainedEmail = tabsNavigationProps.navigation.dangerouslyGetParent().getParam('userEmail');
    console.log(obtainedEmail);
    obtainedEmail = obtainedEmail.replace(/\./g, ','); 

    const getData = () => {
        firebase.database().ref(`mobileMechanic/Clients/${ obtainedEmail }`).once('value', (data) => {
            let firebaseDataString = JSON.stringify(data); // JavaScript object to string
            let firebaseDataJSON = JSON.parse(firebaseDataString); // String to JSON
        
            if (firebaseDataJSON.firstName && firebaseDataJSON.lastName) {
                console.log('Got data successfully ...');
                setName(firebaseDataJSON.firstName + ' ' + firebaseDataJSON.lastName);
            }
        })
    }

    getData();

    return(
        <React.Fragment> 
            <View style = { {marginTop: windowHeight * 0.1, flexDirection: 'row', marginBottom: windowHeight * 0.06} }>
                <Image style = { {width: windowWidth * 0.35, height: windowHeight * 0.2, borderRadius: windowWidth * 0.5, marginLeft: windowWidth * 0.05} } source = { image } />
                <Text style = { {marginLeft: windowWidth * 0.05, fontWeight: 'bold', fontSize: 24, marginTop: windowHeight*0.06} }> { name } </Text>
            </View>
            
            {
                // <Text> userEmail (debugging print, remove later): { obtainedEmail } </Text>
            }
            
            <View style = { {flexDirection: 'row', marginBottom: windowHeight * 0.05} }>
                <Ionicons style = { {marginLeft: windowWidth * 0.05} } name = "person" size = { 24 } color = "green" />
                <Text style = { {marginLeft: windowWidth * 0.02} }> Online Status </Text>
                <FontAwesome style = { {marginLeft: windowWidth * 0.5} } name = "toggle-off" size = { 30 } color = "gray" />
            </View>

            <View style = { {flexDirection: 'row', marginBottom: windowHeight * 0.05} }>
                <Ionicons style = { {marginLeft: windowWidth * 0.05} } name = "notifications" size = { 24 } color = "green" />
                <Text style = { {marginLeft: windowWidth * 0.02} }> Notifications Alert </Text>
                <FontAwesome style = { {marginLeft: windowWidth * 0.42} } name = "toggle-on" size = { 30 } color = "green" />
            </View>

            <View style = { {flexDirection: 'row', marginBottom: windowHeight * 0.05} }> 
                <Entypo style = { {marginLeft: windowWidth * 0.05} } name = "key" size = { 24 } color = "green" />
                <Text style = { {marginLeft: windowWidth * 0.02} }> Change Password </Text>
                <Feather style = { {marginLeft: windowWidth * 0.42} } name = "arrow-right" size = { 24 } color = "gray" />
            </View>

            <View style = { {flexDirection: 'row', marginBottom: windowHeight * 0.05} }> 
                <Ionicons style = { {marginLeft: windowWidth * 0.05} } name = "document-text-sharp" size = { 24 } color = "green" />
                <Text style = { {marginLeft: windowWidth * 0.02} }> Terms of Service </Text>
                <Feather style = { {marginLeft: windowWidth * 0.45} } name = "arrow-right" size = { 24 } color = "gray" />
            </View>

            <View style = { {flexDirection: 'row', marginBottom: windowHeight * 0.05} }>
                <Entypo style = { {marginLeft: windowWidth * 0.05} } name = "log-out" size = { 24 } color = "green" /> 
                <Text style = { {marginLeft: windowWidth * 0.02} }> Sign Out </Text>
            </View>
        </React.Fragment>
    );
}
export default SettingsCust
