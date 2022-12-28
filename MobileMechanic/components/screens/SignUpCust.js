import React from 'react'
import { View, Text, StyleSheet, Linking,Dimensions } from 'react-native' 
import SignUpForm from '../screenSnippets/SignUpCustForm'
var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;
const SignUp = (navigationProps) => {
    return(
        <React.Fragment>
            <View style = { myStyles.pageTop }>
                <Text style = { myStyles.title  }> MobileMechanic </Text>
                <Text style = { myStyles.signin  }> Sign Up </Text>
            </View>
            <SignUpForm 
                navigateTo = { navigationProps.navigation.navigate }
            />
            <Text  style = { myStyles.termsofservice }>
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
            <View> 
                <Text style = { myStyles.pageBottom }> Already Have an Account? <Text style = { {color: '#35b8b6'} } onPress = { () => navigationProps.navigation.navigate('PreSignIn') }> SIGN IN </Text> </Text>
            </View>
        </React.Fragment>
    );
}

const myStyles = StyleSheet.create({
    pageTop: {
        fontWeight: 'bold',
        fontSize: 40,
        marginTop: windowHeight * 0.001,
        textAlign: 'center'
    }, 
    title: {
        fontWeight: 'bold',
        fontSize: 40,
        marginTop: windowHeight * 0.0001,
        textAlign: 'center',
        padding: 15
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
        color: 'black',
        fontSize: 12,
        textAlign: 'center',
        paddingLeft:20,
        paddingRight:20,
        paddingTop:20,
    },
    pageBottom: {
        paddingTop:60,
        fontSize: 12,
        paddingBottom: 10,
        textAlign: 'center',

    }, 
    urlLinking: {
        paddingLeft:20,
        color: '#35b8b6',
        fontSize: 12,
        padding: 10,
        textAlign: 'center',
        marginLeft: 25,
        marginRight: 25,
    }, 
});

export default SignUp
