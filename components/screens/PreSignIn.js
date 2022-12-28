import React from 'react' 
import { View, StyleSheet, Text, Button,Dimensions,TouchableOpacity } from 'react-native' 

var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;
const PreSignUp = (navigationProps) => {
    return(
        <React.Fragment> 
            <View style = { myStyles.pageTop }> 
                <Text  style = { myStyles.title }> MobileMechanic </Text>

            </View>
            <View style = { myStyles.signUp }> 
                <Text style = { myStyles.signin  } > Sign In </Text>
            </View>
            <View> 

                            <TouchableOpacity
                                    style={myStyles.loginScreenButton}
                                    onPress={() => navigationProps.navigation.navigate('SignInCust')}
                                    underlayColor='#fff'>
                                    <Text style={myStyles.loginText}>Customer</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                    style={myStyles.loginScreenButton}
                                    onPress={() => navigationProps.navigation.navigate('SignInMech')}
                                    underlayColor='#fff'>
                                    <Text style={myStyles.loginText}>Mechanic</Text>
                            </TouchableOpacity>
            </View>
            <Text style = { myStyles.pageBottom }> 
            <Text style = { {fontSize: 12} }> Do not Have an Account? <Text style = { {color:"#35b8b6", fontSize: 14} } onPress = { () => navigationProps.navigation.navigate('PreSignUp') }> SIGN UP </Text> </Text>
            </Text>
        </React.Fragment>
    );
}

const myStyles = StyleSheet.create({
     
    mobMech: {
        marginTop: 30
    }, 

    pageTop: {
        fontWeight: 'bold',
        fontSize: 40,
        marginTop: windowHeight * 0.01,
        textAlign: 'center'
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

    title: {
        fontWeight: 'bold',
        fontSize: 40,
        marginTop: windowHeight * 0.01,
        textAlign: 'center',
        padding: 30
    },
    loginScreenButton:{
        marginRight:40,
        marginLeft:40,
       marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:"#35b8b6",
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        position: 'relative'
      },
  loginText:{
      color:'#fff',
      textAlign:'center',
      paddingLeft : 10,
      paddingRight : 10
  },
  pageBottom: {
    fontSize: 10,
    paddingTop: windowHeight * 0.5,
    paddingBottom: 15,
    textAlign:'center',
}, 
    signUp: {

    }
});

export default PreSignUp
