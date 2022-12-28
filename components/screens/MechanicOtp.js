
import React from 'react'
import { View, Text, Alert,TouchableOpacity, StyleSheet } from 'react-native'

import OTPInputView from '@twotalltotems/react-native-otp-input'



const SignUpForm = (props) => {

  let usercnic = props.navigation.getParam('usercnic');
  const AcceptPressHandler = () => {

    Alert.alert(
      'Congratulationss!',
      "Your number is verified successfully. Upload your documents to complete the process of interview registration!",
      [ { text: "OK" } ],
    );


    props.navigation.navigate('SignUpMechFormStep3',{usercnic:usercnic});

  };


  
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{marginTop: 30}} onPress={() => AcceptPressHandler() } > 
          <Text>Resend</Text>
        </TouchableOpacity >

        <OTPInputView
    style={{width: '80%', height: 200}}
    pinCount={4}

    autoFocusOnLoad
    codeInputFieldStyle={styles.underlineStyleBase}
    codeInputHighlightStyle={styles.underlineStyleHighLighted}
    onCodeFilled = {(code) => {
        console.log(`Code is ${code}, you are good to go!`)
        Alert.alert(
          'Congratulationss!',
          "Your number is verified successfully. Upload your documents to complete the process of interview registration!",
          [ { text: "OK" } ],
        );
    
    
        props.navigation.navigate('SignUpMechFormStep3',{usercnic:usercnic});
    
    }}
/>
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
});


export default SignUpForm