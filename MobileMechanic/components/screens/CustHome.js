import React, { useState } from 'react' 
import { View, Text, StyleSheet, Alert, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native' 
import db from '../screenSnippets/ServicesDatabase'

var windowWidth = Dimensions.get('window').width; 
var windowHeight = Dimensions.get('window').height;
let shoppingCart = [];

const CustHome = (navigationProps) => {
    let obtainedEmail = navigationProps.navigation.dangerouslyGetParent().getParam('userEmail');
    
    if (navigationProps.navigation.getParam('updatedCart')) {
        shoppingCart = (navigationProps.navigation.getParam('updatedCart'));
        console.log('CART RETURNED FROM THE SPECIFICATIONS SCREEN ...', shoppingCart);
    }

    const pressHandler = (itemKey, itemName) => {
        console.log(`Item touched ${itemKey} ${itemName}`)
        navigationProps.navigation.navigate(navigationObject[itemKey], {cart: shoppingCart});
    }

    const proceedForward = () => {
        if (!(shoppingCart.length > 0 && (shoppingCart[0].description.length > 1 || shoppingCart[0].specifications.length > 0))) {
            shoppingCart = [];
            Alert.alert(
                'Oops!', 
                `Please fill your shopping cart first by selecting services from the list ${shoppingCart}`, 
                [ {text: "OK"} ]
            );
        }
        else {
            navigationProps.navigation.navigate('CarImages', {userEmail: obtainedEmail, cart: shoppingCart});
        }
    }

    return(
        <React.Fragment> 
            <View style = { {marginTop: windowWidth * 0.075} }> 
                <Text style = { {marginTop: '12%', marginBottom: 20, fontSize: 30, textAlign: 'center'}}> Select Services </Text>
            </View>
            <View style = { {marginBottom: windowHeight * 0.28, marginLeft: windowWidth * 0.185} }>
                {
                    <FlatList 
                        numColumns = { 3 }
                        data = { db }
                        renderItem = { ( {item} ) => {
                            return(
                                <View> 
                                    <TouchableOpacity onPress = { () => pressHandler(item.key, item.offering) }> 
                                        <View style = { {marginTop: windowHeight * 0.04, marginBottom: windowHeight * 0.07} }> 
                                            <View style = { {marginRight: windowWidth * 0.1} }> 
                                                <Image style = { {width: windowWidth * 0.14,  height: windowHeight * 0.08} } source = { myStyles[item.key] } />
                                                <Text> { item.offering } </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            );
                        }}
                    />
                }
                <TouchableOpacity
                        style = { myStyles.loginScreenButton }
                        onPress = { proceedForward }
                        underlayColor = '#fff'>
                        <Text style = { myStyles.loginText }> { 'Proceed' } </Text>
                </TouchableOpacity>
            </View>
        </React.Fragment>
    );
}

const navigationObject = {
    0: 'OilChangeSpecifications',
    1: 'BatterySpecifications',
    2: 'TuningSpecifications',
    3: 'CleaningSpecifications', 
    4: 'TyreSpecifications',
    5: 'InspectionSpecifications', 
    6: 'PolishSpecifications',
    7: 'AcSpecifications',
    8: 'PaintingSpecifications', 
    9: 'RadiatorSpecifications', 
    10: 'BrakeSpecifications', 
    11: 'AccidentSpecifications', 
    12: 'OtherSpecifications'
}

const myStyles = StyleSheet.create({
    0: require('../../assets/icons/oil-change.png'), 
    1: require('../../assets/icons/battery-check.png'),
    2: require('../../assets/icons/automotive.png'),
    3: require('../../assets/icons/car-washing.png'),
    4: require('../../assets/icons/tyre-changing.png'),
    5: require('../../assets/icons/delivery-inspection.png'),
    6: require('../../assets/icons/car-cleaning.png'),
    7: require('../../assets/icons/conditioner-system-repair.png'),
    8: require('../../assets/icons/airbrush.png'),
    9: require('../../assets/icons/radiator.png'), 
    10: require('../../assets/icons/brakes.png'),   
    11: require('../../assets/icons/car-repair.png'),
    12: require('../../assets/icons/service.png'), 

    loginScreenButton:{
        marginRight:40,
       marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:"#35b8b6",
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        position: 'relative', 
        width: windowWidth / 1.6
      },
  loginText:{
      color:'#fff',
      textAlign:'center',
      paddingLeft : 10,
      paddingRight : 10
  },
});

export default CustHome
