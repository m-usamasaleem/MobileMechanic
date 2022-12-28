import React, {useState, useEffect} from 'react' 
import { Text, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native' 
import MapView from 'react-native-maps'

var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;

const CustLocation = (navigationProps) => {
    let carName = (navigationProps.navigation.getParam('carName'));
    console.log(carName);
    let carImageKey = (navigationProps.navigation.getParam('carImageKey'));
    console.log(carImageKey);
    let carModel = (navigationProps.navigation.getParam('carModel'));
    let carNumber = (navigationProps.navigation.getParam('carNumber'));
    let carDescriptionNote = (navigationProps.navigation.getParam('carDescriptionNote'));
    let userEmail = (navigationProps.navigation.getParam('userEmail'));
    let cartToSend = navigationProps.navigation.getParam('cart');

    // More requirements to forward: shopping cart (will be implemented later on ...)

    const [currentLocation,setCurrentLocation] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
    })

    useEffect(() => {
        getCurrentPosition()
      }, [])

    const getCurrentPosition = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            var lat = parseFloat(position.coords.latitude)
            var long = parseFloat(position.coords.longitude)
      
            var initialRegion = {
              latitude: lat,
              longitude: long,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }
      
            setCurrentLocation(initialRegion)
          },
        (error) => alert(JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 20000});
    }
    
    return(
        <View>
            <View style = { styles.heading1 }>
                <Text style = { styles.title1 }> Customer Location </Text>
            </View>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    region={{
                        latitude:currentLocation.latitude,
                        longitude:currentLocation.longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                >
                <MapView.Marker draggable
                    coordinate={currentLocation}
                    title="My Location"
                    description="Hold it to drag"
                    onDragEnd={(e) => setCurrentLocation(e.nativeEvent.coordinate)}
                />
                </MapView>
            </View>
            <View style = { {flexDirection: 'row'} }> 
                <View style = {styles.heading4}>
                    <TouchableOpacity
                        style={styles.loginScreenButton}
                        onPress={ () => getCurrentPosition() }
                        underlayColor='#fff'>
                        <Text style={styles.loginText}> Reset Location </Text>
                    </TouchableOpacity>
                </View>
                <View style = {styles.heading4}>
                    <TouchableOpacity
                        style={styles.loginScreenButton}
                        onPress={ () => { navigationProps.navigation.navigate('ConfirmCustOrder', {
                            locationObject: currentLocation, 
                            carName: carName, 
                            carImageKey: carImageKey, 
                            carModel: carModel, 
                            carNumber: carNumber, 
                            carDescriptionNote: carDescriptionNote,
                            userEmail: userEmail,
                            cart: cartToSend
                        })}}
                        underlayColor='#fff'>
                        <Text style={styles.loginText}> {'Next =>'} </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: windowHeight,
      width: windowWidth,
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginTop: 140,
    },
    map: {
      ...StyleSheet.absoluteFillObject,
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
    heading4: {
        paddingTop: 0.02*windowHeight,
        marginLeft: windowWidth * 0.01,
        marginRight: windowWidth * 0.01,
        width: windowWidth / 2
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


export default CustLocation