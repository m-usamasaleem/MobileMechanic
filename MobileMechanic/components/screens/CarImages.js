import React from 'react' 
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native' 
import CarDatabase from '../screenSnippets/CarDatabase'
import CarDescription from '../screens/CarDescription'

var windowWidth = Dimensions.get('window').width; 
var windowHeight = Dimensions.get('window').height;

const pressHandler = (key, car, navigationProps) => {
    console.log(`${car} selected ...`);
    navigationProps.navigation.navigate('CarDescription', {
        carName: car, 
        carKey: key, 
        userEmail: navigationProps.navigation.getParam('userEmail'), 
        cart: navigationProps.navigation.getParam('cart')
    });
}

const CarImages = (navigationProps) => {
    console.log('DATA HANDED OVER TO THE CAR IMAGES SCREEN ....');
    console.log(navigationProps.navigation.getParam('userEmail'));
    console.log(navigationProps.navigation.getParam('cart'));

    return(
        <React.Fragment> 
            <View style = { {marginTop: windowWidth * 0.075} }> 
                <Text style = { {marginTop: '12%', marginBottom: 20, fontSize: 30, textAlign: 'center'}}> Select Your Car </Text>
            </View>
            <View style = { {marginBottom: windowHeight * 0.1, marginLeft: windowWidth * 0.1} }>
                {
                    <FlatList 
                        numColumns = { 3 }
                        data = { CarDatabase }
                        renderItem = { ( {item} ) => {
                            return(
                                <React.Fragment> 
                                    <View> 
                                        <TouchableOpacity onPress = { () => pressHandler(item.key, item.car, navigationProps) }> 
                                            <View style = { {marginTop: windowHeight * 0.04, marginBottom: windowHeight * 0.06} }> 
                                                <View style = { {marginRight: windowWidth * 0.05} }> 
                                                    <Image style = { {width: windowWidth * 0.24,  height: windowHeight * 0.08} } source = { myStyles[item.key] } />
                                                    <Text style = { {marginTop: '15%', fontSize: 15, textAlign: 'center'}}> { item.car } </Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </React.Fragment>
                            );
                        }}
                    />
                }
            </View>
            { }
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
});

export default CarImages
