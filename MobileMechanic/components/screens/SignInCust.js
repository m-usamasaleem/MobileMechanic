import React from 'react'
import { View, Text, StyleSheet, Linking,Dimensions } from 'react-native' 
import SignInCustForm from '../screenSnippets/SignInCustForm'
//import { SearchBar } from 'react-native-elements';
//import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;

const SignInCust = (navigationProps) => {
    return(
        <React.Fragment>
            <View style = { myStyles.pageTop }>
                <Text style = { myStyles.title  } > MobileMechanic </Text>
                <Text style = { myStyles.signin  } > Sign In </Text>
            </View>
            <SignInCustForm 
                navigateTo = { navigationProps.navigation.navigate }
            />
            <Text style = { myStyles.termsofservice }>
                <Text  style = { myStyles.termsofservice }> By continuing, you agree to our </Text> 
                <Text style = { myStyles.urlLinking }
                    onPress = { () => Linking.openURL('http://www.uzair-reviews.com/MobileMechanic/privacy-policy.html') }>
                    PRIVACY POLICY
                </Text>
                <Text> and </Text>
                <Text style = { myStyles.urlLinking }
                    onPress = { () => {Linking.openURL('http://www.uzair-reviews.com/MobileMechanic/terms-of-service.html')} }>
                    TERMS OF SERVICE
                </Text> 
            </Text>
            <View style = { myStyles.pageBottom }> 
                <Text> Do not Have an Account? <Text style = { {color:"#35b8b6"} } onPress = { () => navigationProps.navigation.navigate('PreSignUp') }> SIGN UP </Text> </Text>
            </View>
        </React.Fragment>
    );
}

const myStyles = StyleSheet.create({
    all: {
        backgroundColor: "#F2F2F3"
    },
    h1: {
        marginTop:70,
        fontSize:35,
    },
    h2: {
        marginTop:20,
        fontSize:25,
        fontWeight: 'bold'
    },
    pageTop: {
        fontWeight: 'bold',
        fontSize: 40,
        marginTop: windowHeight * 0.008,
        textAlign: 'center'
    }, 
    title: {
        fontWeight: 'bold',
        fontSize: 40,
        marginTop: windowHeight * 0.01,
        textAlign: 'center',
        padding: 30
    },
    
    signin: {
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
        padding: 3
    },
    useyouraccount: {
        fontSize: 9,
        
        textAlign: 'center',
    },
    termsofservice: {
        fontSize: 12,
        padding: 10,
        textAlign: 'center',
        marginLeft: 25,
        marginRight: 25,
    },
    pageBottom: {
        fontSize: 4,
        padding: 60,
        textAlign: 'center',
        marginRight: 15,
        marginBottom: 25,
        alignContent: 'center', 
        alignItems: 'center', 
        alignSelf: 'center'
    }, 
    urlLinking: {
        color: "#26B9B6",
        fontSize: 12
    }, 
});

export default SignInCust
