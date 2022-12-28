import React, { useState } from 'react' 
import { ScrollView, Button, CheckBox, View, Text, Dimensions, StyleSheet, TextInput, SafeAreaView, Alert ,TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;

const BatterySpecifications = (navigationProps) => {
    const [batteryState, setbatteryState] = useState([{k:'Engine Inspection', v: false}, {k:'Tyre Inspection', v: false}, {k:'Fix Abnormal Noise', v: false}, {k:'Silencer Exhaust Inspection', v: false}, {k:'Other', v: false}]);
    const [num, setnum] = useState(5);
    const [description, setdescription] = useState(" "); 
    let incomingCart = navigationProps.navigation.getParam('cart');
    let pushToCart = {
        service: 'Car Inspection', 
        description: description, 
        specifications: batteryState.filter( (eachObject) => eachObject.v === true ),
        carImageKey: 5
    };

    const pressHandler = (i) => {
        setbatteryState( (prevbatteryState) => {
            var newState = {k:prevbatteryState[i].k, v: !prevbatteryState[i].v}
            var newbatteryState = [...prevbatteryState.slice(0,i), newState, ...prevbatteryState.slice(i+1, num)]
            return newbatteryState;
        });
    }
    
    var battery = [];
    for(let i = 0; i < batteryState.length; i++){
		battery.push(
			<View key = {i} style = {mystyles.heading3}>
                <Text style = { mystyles.title2 }>{batteryState[i].k}</Text>
                <CheckBox style = {mystyles.checkbox}
                    value= {batteryState[i].v}
                    onValueChange={(key) => pressHandler(i)}
                />
			</View>
		)
	}

    return(
        <ScrollView behavior="padding"> 
            <View style = {mystyles.view1} behavior="padding">
                <View style = { mystyles.heading1 }>
                    <Text style = { mystyles.title1 }> Specifications </Text>
                    <MaterialCommunityIcons style = { mystyles.icon } name = "location-exit" size = { 30 } color = "gray" onPress = { () => navigationProps.navigation.goBack() }/>
                </View>
                <View style = {mystyles.heading2}>
                    {battery}
                    <View style = {mystyles.description}>
                        <Text style = { mystyles.descrption }>Description</Text>
                    </View>
                    <View style = {mystyles.heading3}>
                        <SafeAreaView>
                        <TextInput
                            placeholder = "Enter Your Email"
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
            </View>
        </ScrollView>
    );
}
export default BatterySpecifications

const mystyles = StyleSheet.create( {
    heading: {
        height:70,
        paddingTop: 0.005*windowHeight,
        backgroundColor: 'white',
        borderBottomWidth:2,
        borderRadius: 20,
    },
    title: {
        textAlign: 'center',
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
    },
    view1: {
        marginLeft: 0.1*windowWidth,
        marginTop: 0.08*windowHeight,
        marginRight: 0.1*windowWidth,
        marginBottom: 0.01*windowHeight,
        backgroundColor: '#FFFFFF',

    },
    heading1: {
        height: 70,
        paddingTop: 0.05*windowHeight,
        flexDirection: 'row',
        borderBottomWidth:2,
        borderRadius: 20,
        borderColor:'#35b8b6'
    },
    title1: {
        marginLeft: windowWidth * 0.02,
        fontWeight: 'bold',
        color: 'black',
        fontSize: 25,
    },
    icon: {
        left: windowWidth * 0.20,
        transform: [{rotateY: '180deg'}],
        
    },
    heading2: {
        paddingTop: 0.01*windowHeight,
    },
    title2: {
        paddingTop: 15,
        color: 'black',
        fontSize: 15,
        marginLeft: windowWidth * 0.05,
    },
    heading3: {
        paddingTop: 0.02*windowHeight,
        borderBottomWidth:1,
        borderRadius: 20,
        borderColor:'#fee',
        flexDirection: 'row',
    },
    input: {
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
        paddingTop: 0.01*windowHeight,
        marginLeft: windowWidth * 0.05,
        color:"#8894c3",
    },
    checkbox: {
        position: 'absolute',
        marginLeft: windowWidth * 0.65,
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
})
