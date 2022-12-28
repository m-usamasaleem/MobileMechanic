import React from 'react'
import { Text, View, StyleSheet, Image, Dimensions, TextInput, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native' 
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useState } from 'react';

var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;

const CarDescription = (navigationProps) => {
    const [carModel, setCarModel] = useState('');
    const [numberPlate, setNumberPlate] = useState('');
    const [description, setDescription] = useState('');
    
    let carName = navigationProps.navigation.getParam('carName');
    let carKey = navigationProps.navigation.getParam('carKey');
    console.log(carName, carKey, carModel, numberPlate, description);
    console.log(navigationProps.navigation.getParam('userEmail'));
    
    return(
        <React.Fragment> 
            <ScrollView> 
                <View style = { {alignItems: 'center'}}> 
                    <Text style = { {marginTop: 70, marginBottom: 20,fontSize: 30} }> Add Car Description </Text>
                    <Image style = { {width: windowWidth * 0.6, height: windowHeight * 0.2} } source = { myStyles[carKey] } />
                </View>
                <View style = { {textAlign: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 20} }> 
                    <TextInput style = { {marginBottom: 10, fontSize: 25, fontWeight: 'bold'}} value = {carName} />
                    <TextInput style = { {marginBottom: 10, borderBottomWidth: 1}}  placeholder = 'Enter Car Model' onChangeText = { (text) => setCarModel(text) } />
                    <TextInput style = { {marginBottom: 15, borderBottomWidth: 1}} placeholder = 'Enter Car Number Plate' onChangeText = { (text) => setNumberPlate(text) } />
                </View>
                <Text style = { {fontSize: 20, marginLeft: "5%"}}> Add More Photos </Text>
                <View style = { {flexDirection: 'row', marginTop: 20} }> 
                    <Image style = { {width: windowWidth * 0.25, height: windowHeight * 0.08, marginLeft: '5%'} } source = { myStyles[carKey] } />
                    {
                        // Here, you should also figure out how to add an option to add more images (icon added. Done) 
                        // How to go to OS file system to get those images? (Not Done)
                        // Plus, how to display those uploaded images here and store them temporarily? (Not Done)
                    }
                    <MaterialCommunityIcons 
                        name = "image-plus" 
                        size = { 24 } 
                        color = "black" 
                        onPress = { () => console.log('You clicked the icon!') }
                        style = { {marginTop: 15, marginLeft: 10} }
                    />
                </View>
                <View style = {myStyles.description}>
                    <Text style = { myStyles.descrption }> Description </Text>
                </View>
                <View style = {myStyles.heading3}>
                    <SafeAreaView>
                        <TextInput
                            placeholder = "  Enter Requirements / Description"
                            multiline = {true}
                            numberOfLines = { 4 }
                            onChangeText = { (text) => setDescription(text) }
                            value = { description }
                            style = { myStyles.input }
                        />
                    </SafeAreaView>
                </View>
                <View> 
                    <TouchableOpacity
                        style = { myStyles.loginScreenButton }
                        onPress={ () => navigationProps.navigation.navigate('CustLocation', {
                            carName: carName, 
                            carModel: carModel, 
                            carNumber: numberPlate, 
                            carImageKey: carKey, 
                            carDescriptionNote: description, 
                            userEmail: navigationProps.navigation.getParam('userEmail'),
                            cart: navigationProps.navigation.getParam('cart')
                        })}
                        underlayColor = '#fff'
                    >
                        <Text style = {myStyles.loginText}> Proceed </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </React.Fragment>
    );
}

const myStyles = StyleSheet.create({
    0: require('../../assets/car-images/civic.png'), 
    1: require('../../assets/car-images/city.png'),
    2: require('../../assets/car-images/corolla.png'),
    3: require('../../assets/car-images/mehran.png'),
    4: require('../../assets/car-images/alto.png'),
    5: require('../../assets/car-images/vitz.png'),
    6: require('../../assets/car-images/lexus.png'),
    7: require('../../assets/car-images/bmw.png'),
    8: require('../../assets/car-images/bolan.png'),
    9: require('../../assets/car-images/accord.png'), 
    10: require('../../assets/car-images/every.png'),   
    11: require('../../assets/car-images/swift.png'), 
    // Repearing a few cars for now
    12: require('../../assets/car-images/civic.png'), 
    13: require('../../assets/car-images/city.png'),
    14: require('../../assets/car-images/corolla.png'),
    15: require('../../assets/car-images/mehran.png'),
    16: require('../../assets/car-images/alto.png'),
    17: require('../../assets/car-images/vitz.png'),

    input: {
        height: 50,
        width: 0.86*windowWidth,
        margin: 2,
        borderWidth: 2,
        //marginLeft: windowWidth * 0.05,
        textAlignVertical: 'top',
        color: "black",
        borderRadius: 10,
        marginLeft: '7%',
        marginRight: '7%',
        marginBottom: 10
    }, 
    heading3: {
        paddingTop: 0.02*windowHeight,
        borderBottomWidth:1,
        borderRadius: 20,
        borderColor:'#fee',
        flexDirection: 'row',
    },
    descrption: {
        fontSize: 20,
        paddingTop: 0.05 * windowHeight,
        marginLeft: windowWidth * 0.05,
        color:"#8894c3",
        marginBottom: 5
    }, 
    loginScreenButton:{
        marginTop: 5,
        marginRight:'20%',
        marginLeft:'20%',
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

export default CarDescription
