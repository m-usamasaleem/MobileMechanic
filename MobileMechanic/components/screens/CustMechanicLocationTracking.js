import React, {useState, useEffect, useRef} from 'react' 
import { Text, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native' 
import MapView from 'react-native-maps'
import { bool } from 'yup';
import { array } from 'yup/lib/locale';
import firebase from "../../components/screenSnippets/FirebaseInit";

var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;

const delay = 5


const CustMechanicLocation = (navigationProps) => {

    let userEmail = navigationProps.navigation.getParam('userEmail')
    let cnic = navigationProps.navigation.getParam('cnic')
    let tempArray = navigationProps.navigation.getParam('array')
    let charges = navigationProps.navigation.getParam('charges')
    let wallet = navigationProps.navigation.getParam('wallet')


    const mechanicCNIC = (navigationProps.navigation.getParam('cnic'));
    const array = (navigationProps.navigation.getParam('array'));
    const path = `mobileMechanic/mechanicLocations/${mechanicCNIC}/location`;
    const [update, setUpdate] = useState(false);
    const [check, setCheck] = useState(true);
    
    const [mechanicLocation, setmechanicLocation] = useState({
        latitude: 0,
        longitude: 0,
    });
    
    // const listener = firebase.database().ref(`mobileMechanic/mechanicLocations/${mechanicCNIC}/arrived`).on('value', (data) => {
    //     let firebaseDataString = JSON.stringify(data); // JavaScript object to string
    //     let arrived = JSON.parse(firebaseDataString); // String to JSON
    //     if (arrived) {
    //         navigationProps.navigation.navigate('CustWorkUnderProgress', {
    //             cnic: cnic,
    //             userEmail: userEmail,
    //             array: tempArray,
    //             charges: charges,
    //             wallet: wallet,
    //         })
    //     }
    //     console.log("arrived :",arrived)
    // });

    // tempArray.map( (mechanicCNIC) => {
    //     if (mechanicCNIC != cnic) {
    //         console.log('Making bidAcceptance -1 for', cnic);
    //         return(
    //             firebase.database().ref(`mobileMechanic/mechanicResponse/${ userEmail }/${ mechanicCNIC }`).update({ bidAcceptance: -1 })
    //         );
    //     }
    //     else {
    //         console.log('Removing and changing bidAcceptance to +1');
    //         // firebase.database().ref(`mobileMechanic/userRequests/${ userEmail }`).remove(); ////////////////////////////////////////////////////////////////////////////////////////////////////////////// re do this!!!!
    //         return(
    //             firebase.database().ref(`mobileMechanic/mechanicResponse/${ userEmail }/${ acceptedCNIC }`).update({
    //                 bidAcceptance: 1
    //             })
    //         );
    //     }
    // });
    
    console.log(check);
    useEffect(() => {
        firebase.database().ref(path).once('value', (data) => {
            if (data) {
                let firebaseDataString = JSON.stringify(data); // JavaScript object to string
                let firebaseDataJSON = JSON.parse(firebaseDataString); // String to JSON
                setmechanicLocation(firebaseDataJSON)
                //console.log("mechanic at",mechanicLocation)
                //console.log("array at : ", array)
            }
        });
        console.log(check);
        if (check) {
            const listener = firebase.database().ref(`mobileMechanic/mechanicLocations/${mechanicCNIC}/arrived`).once('value', (data) => {
                let firebaseDataString = JSON.stringify(data); // JavaScript object to string
                let arrived = JSON.parse(firebaseDataString); // String to JSON
                if (arrived) {
                    navigationProps.navigation.navigate('CustWorkUnderProgress', {
                        cnic: cnic,
                        userEmail: userEmail,
                        array: tempArray,
                        charges: charges,
                        wallet: wallet,
                    })
                    console.log("arrived :",arrived)
                    setCheck(false);
                }
                
            });
        }  
        let timer1 = setTimeout(()=>{setUpdate(!update)}, delay*1000)
        return () => {
            clearTimeout(timer1);

        }
      }, [update, 0]);


    // setmechanicLocation({
    //     latitude: tempLocation.latitude,
    //     longitude: tempLocation.longitude,
    // })setmechanicLocation({
    //     latitude: tempLocation.latitude,
    //     longitude: tempLocation.longitude,
    // })

    
    return(
        <View>
            <View style = { styles.heading1 }>
                <Text style = { styles.title1 }> Mechanic Location {update}</Text>
            </View>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    region={{
                        latitude:mechanicLocation.latitude,
                        longitude:mechanicLocation.longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                >
                <MapView.Marker
                    coordinate={mechanicLocation}
                    title="Mechanic Location"
                />
                {/* {showCustomer()} */}
                </MapView>
            </View>
            {/* <View style = { {flexDirection: 'row'} }> 
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
                        onPress={ () => { navigationProps.navigation.navigate('SignInMech', {})}}
                        underlayColor='#fff'>
                        <Text style={styles.loginText}> {'Arrived'} </Text>
                    </TouchableOpacity>
                </View>
            </View> */}
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


export default CustMechanicLocation