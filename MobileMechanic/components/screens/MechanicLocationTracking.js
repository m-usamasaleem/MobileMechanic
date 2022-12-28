import React, {useState, useEffect, useRef} from 'react' 
import { Text, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native' 
import MapView from 'react-native-maps'
import firebase from "../../components/screenSnippets/FirebaseInit";

var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;

const delay = 5

const MechanicLocation = (navigationProps) => {
    const userCNIC = (navigationProps.navigation.getParam('usercnic'));
    const userObject = (navigationProps.navigation.getParam('customer_object'));
    const userId = userObject[0];

    const path = `mobileMechanic/mechanicLocations/${userCNIC}`
    console.log( "userCNIC   ",    userCNIC )
    const [update, setUpdate] = useState(false)
    let customerLocation = {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
    }
    //const userId = `uzair9990@gmail,com`    //to fetch from previous screen
    let userLocRead = useRef(null)

    let test = useRef(null)
    let updateDb = useRef(null)
    const [currentLocation,setCurrentLocation] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
    })

    const toggleUpdate = () => { setUpdate(!update) }

    useEffect(() => {
        test.current = true
        if (test.current){
            getCurrentPosition()
            if(updateDb.current){
                firebase.database().ref(path).update({
                    location: currentLocation
                }).then(()=>{updateDb.current = false})
            }
            
        }
        let timer1 = setTimeout(toggleUpdate, delay*1000)
        return () => {
            clearTimeout(timer1)
            test.current = false
            updateDb.current = false
        }
      }, [update])

    
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
            console.log(initialRegion)
            setCurrentLocation(initialRegion)
            updateDb.current = true
          },
        (error) => alert(JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 20000});        
    }

    useEffect(() => {
        getCustomerPosition()
        return () => {
            userLocRead.current = true
        }
    }, [])
    
    const getCustomerPosition = () => {
        firebase.database().ref(`mobileMechanic/userRequests/${userId}/customerLocation`).once('value', (data) => {
            if(data){
                customerLocation = JSON.parse(JSON.stringify(data));
                console.log("customer at",customerLocation)
            }
        });
        userLocRead.current = true
    }

    const showCustomer = () => {
        console.log("userLocRead has value:", userLocRead.current)
        if (userLocRead.current){
            console.log('customer read');
            <MapView.Marker
                    coordinate={customerLocation}
                    title="Customer Location"
            />
        }
    }

    const pressHandler = () => {
        firebase.database().ref(path).update({
            arrived : 1
        }).then(()=>{
            navigationProps.navigation.navigate('WorkUnderProcess', {
                customer_object : userObject,
                cnic_mechanic : userCNIC
            })
        }).catch((error)=>{
            console.log(error)
        })        
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
                <MapView.Marker
                    coordinate={currentLocation}
                    title="My Location"
                />
                {showCustomer()}
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
                        onPress={ () => { pressHandler() }}
                        underlayColor='#fff'>
                        <Text style={styles.loginText}> {'Arrived'} </Text>
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


export default MechanicLocation