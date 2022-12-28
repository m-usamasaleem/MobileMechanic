import React, { useState } from 'react' 
import { ScrollView, Button, CheckBox, View, Text, Dimensions, StyleSheet, TextInput, SafeAreaView, Alert ,TouchableOpacity } from 'react-native'

var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;

const BatterySpecifications = (navigationProps) => {
    const [description, setdescription] = useState(" ");
    let incomingCart = navigationProps.navigation.getParam('cart');
    let pushToCart = {
        service: 'Other Issues', 
        description: description, 
        specifications: 'No specific specifications',
        carImageKey: 12
    };
    return(
        <ScrollView behavior="padding"> 
            <View style = { mystyles.main  }>
                <View style = {mystyles.description}>
                        <Text style = { mystyles.descrption }> What's Troubling You? </Text>
                </View>
                <View style = {mystyles.heading3}>
                    <SafeAreaView>
                        <TextInput
                            placeholder = "Enter Description"
                            multiline={true}
                            numberOfLines={2}
                            onChangeText={(text) => setdescription(text)}
                            value={description}
                            style={mystyles.input}
                        />
                    </SafeAreaView>
                </View>
                <View style = {mystyles.heading4}>
                <TouchableOpacity
                style = { mystyles.loginScreenButton }
                onPress = { () => {
                    incomingCart.push(pushToCart);
                    return(
                        navigationProps.navigation.navigate('Home', {updatedCart: incomingCart}) 
                    )
                }}
                underlayColor='#fff'>
                <Text style = { mystyles.loginText }> Add to Shopping Cart </Text>
            </TouchableOpacity>
                </View>
                
            </View>
        </ScrollView>
    );
}

const mystyles = StyleSheet.create( {
    heading: {
        height:70,
        paddingTop: 0.005*windowHeight,
        backgroundColor: 'white',
        borderBottomWidth:2,
        borderRadius: 20,
    },
    icon: {
        left: windowWidth * 0.20,
        transform: [{rotateY: '180deg'}],
        
    },
    main: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    heading3: {
        paddingTop: 0.02*windowHeight,
        borderBottomWidth:1,
        borderRadius: 20,
        borderColor:'#fee',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center', 
        textAlign: 'center',
    },
    input: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center', 
        textAlign: 'center',
        height: 50,
        width: 0.7*windowWidth,
        margin: 1,
        borderWidth: 2,
        marginLeft: windowWidth * 0.05,
        textAlignVertical: 'top',
        color: "black",
        borderRadius: 10,
    },
    descrption: {
        paddingTop: 0.07 * windowHeight,
        marginLeft: windowWidth * 0.05,
        color:"#8894c3",
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center', 
        textAlign: 'center',
        
    },
    heading4: {
        paddingTop: 0.02*windowHeight,
        marginLeft: windowWidth * 0.05,
        marginRight: windowWidth * 0.05,

    },
    loginScreenButton:{
        marginRight:40,
        marginLeft:40,
       marginBottom:20,
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
  }
}); 

export default BatterySpecifications
