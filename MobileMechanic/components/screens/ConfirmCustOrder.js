import React, { useState } from 'react' 
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native' 
import firebase from '../screenSnippets/FirebaseInit'

var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;
var mechanicResponseCNIC = [];

const ConfirmCustOrder = ( navigationProps ) => {
    let locationObject = (navigationProps.navigation.getParam('locationObject'));
    let carName = (navigationProps.navigation.getParam('carName'));
    let carImageKey = (navigationProps.navigation.getParam('carImageKey')); // required by mechanic
    let carModel = (navigationProps.navigation.getParam('carModel'));
    let carNumber = (navigationProps.navigation.getParam('carNumber'));
    let carDescriptionNote = (navigationProps.navigation.getParam('carDescriptionNote'));
    let userEmail = (navigationProps.navigation.getParam('userEmail')); // required by mechanic
    let obtainedCart = navigationProps.navigation.getParam('cart');
    userEmail = userEmail.replace(/\./g, ',');
    let wallet = '';

    firebase.database().ref(`mobileMechanic/Clients/${ userEmail }/wallet`).on('value', (incomingMoney) => {
        if (incomingMoney) {
            wallet = incomingMoney;
        }
    });
    
    const [msg, setMsg] = useState('');

    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let time = {
        hrs: new Date().getHours(),
        mins: new Date().getMinutes(),
        secs: new Date().getSeconds() 
    }

    let today = {
        date: date, 
        month: month, 
        year: year, 
        time: time
    }

    const orderConfirmationHandler = () => {
        firebase.database().ref(`mobileMechanic/userRequests/${ userEmail }`).set({
            orderDateTime: today,
            customerEmail: userEmail,
            customerLocation: locationObject,
            customerCarName: carName, 
            customerCarImageKey: carImageKey, 
            customerCarModel: carModel, 
            customerCarNumber: carNumber, 
            customerCarDescription: carDescriptionNote, 
            customerShoppingCart: obtainedCart,
            mechanicCNIC: ['dummyCNIC']
        }).then( () => { 
            mechanicResponseCNIC = [];
            Alert.alert(
                'Order Confirmed',
                "Congratulations! Your order has been placed successfully. Please wait while we connect you to the mechanics near by ",
                [ { text: "OK" } ],
            );
            setMsg('Please be patient. We are finding you a mechanic');
            
            // get customer's wallet like this
        })
        .catch( () => { 
            Alert.alert(
                'Ooops!',
                'An unknown error occurred. We could not place your order. Please try again ...',
                [ { text: "OK" } ],
            );
        });
    }

    firebase.database().ref(`mobileMechanic/userRequests/${ userEmail }`).on('value', (data) => {
        // console.log('Something changed in the DB in realtime');
        // console.log('User for which we check:', userEmail);
        // console.log(data);

        let firebaseDataString = JSON.stringify(data); // JavaScript object to string
        let firebaseDataJSON = JSON.parse(firebaseDataString); // String to JSON

        if (firebaseDataJSON && firebaseDataJSON.mechanicCNIC) {
            let mechanicCNICObject = firebaseDataJSON.mechanicCNIC;
            if (Object.keys(mechanicCNICObject).length >= 2) {
                for (let key in mechanicCNICObject) {
                    if (mechanicCNICObject[key] === 'dummyCNIC' || mechanicResponseCNIC.includes(firebaseDataJSON.mechanicCNIC[key])) {
                        // nothing
                    }
                    else {
                        mechanicResponseCNIC.push(firebaseDataJSON.mechanicCNIC[key]);
                        console.log(mechanicResponseCNIC);
                    }
                }
                console.log(`Some mechanic has responded ... !!`);
                navigationProps.navigation.navigate('SeeMechanicResponse', {mechanics: mechanicResponseCNIC, userEmailToPass: userEmail, wallet: wallet});
            }
        }
    });

    return(
        <React.Fragment> 
            <Text style = { styles.title }> Confirm Your Order </Text>
            <ScrollView style = { {marginBottom: -10} }> 
                <View style = {styles.header}>
                <Text style = { styles.title1 }> Order Details </Text>
                
                <View style = {styles.item}>
                    <Text style = {{color: '#000',fontSize: 15, marginTop: 20, fontWeight: 'bold'}}> Location: </Text>
                    <Text style = {styles.title3}> { locationObject.longitude },{ locationObject.latitude } </Text>
                    <Text style = {styles.title2}> Car </Text>
                    <Text style = {styles.title3}> { carName } </Text>
                    <Text style = {styles.title2}> Model </Text>
                    <Text style = {styles.title3}> { carModel } </Text>
                    <Text style = {styles.title2}> Number Plate  </Text>
                    <Text style = {styles.title3}> { carNumber } </Text>
                    <Text style = {styles.title2}> Car Description  </Text>
                    <Text style = {styles.title3}> { carDescriptionNote + '\n\n' } </Text>
                </View>
                
                <Text style = {styles.title1} > { 'Shopping Cart' } </Text>
                {
                    obtainedCart.map( (data, index) => {
                        if (!(data.service === 'Other Issues')) {
                            return(    
                                <View style = {styles.item}> 
                                    <Text style = {styles.title2}> Service # { index + 1 } </Text>
                                    <Text style = {styles.title3}> { data.service }  </Text>
                                    <Text style = {styles.title2}> Description </Text> 
                                    <Text style = {styles.title3}> { data.description }  </Text>
                                    <Text style = {styles.title2}> Specifications </Text>
                                    {
                                        data.specifications.map( (specs, index) => {
                                            return(
                                                <Text style = {styles.title3}> {specs.k } </Text>
                                            )
                                        })
                                    }
                                </View>
                            );
                        }
                        else {
                            return(
                                <View style = {styles.item}> 
                                    <Text style = {styles.title2}> Service # { index + 1 }</Text>
                                    <Text style = {styles.title3}> { data.service }  </Text>
                                    <Text style = {styles.title2}> Description:</Text> 
                                    <Text style = {styles.title3}> { data.description }  </Text>
                                    <Text style = {styles.title2}> Specifications: </Text>
                                    <Text style = {styles.title2}> Specifications:  </Text>
                                    <Text style = {styles.title3}>{data.specifications } </Text>
                                </View>
                            );
                        }
                    })
                }
                </View>
            </ScrollView>
            <View style = { styles.heading4 }>
                <TouchableOpacity
                    style = { styles.loginScreenButton }
                    onPress = { orderConfirmationHandler }
                    underlayColor = '#fff'>
                    <Text style = { styles.loginText }> Confirm Order </Text>
                </TouchableOpacity>
            </View>
            <Text style = { {color: 'red', textAlign: 'center', marginTop: 20, marginBottom: 20} }> { msg } </Text>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    heading4: {
        paddingTop: 0.02*windowHeight,
        marginLeft: windowWidth * 0.01,
        marginRight: windowWidth * 0.01,
        width: windowWidth
    }, 
    loginScreenButton: {
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
    loginText: {
        color:'#fff',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10
    },
    header: {
        paddingTop: 30,
        //backgroundColor: 'coral',
        
    },
    title: {
        textAlign: 'center',
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: windowHeight * 0.07,
    },
    title1: {
        textAlign: 'center',
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    title2: {
        color: '#000',
        fontSize: 15,
        fontWeight: 'bold',
    },
    title3: {
        color: '#000',
        fontSize: 15,
    },
    item: {
        paddingLeft: 5,
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 10,
        borderColor: '#bbb',
        backgroundColor: '#fff', 
        marginBottom: 20
    },
});

export default ConfirmCustOrder


/*

    // const dummy = () => {
    //     firebase.database().ref(`mobileMechanic/userRequests/${ userEmail }`).once('value', (data) => {
    //         let firebaseDataString = JSON.stringify(data); // JavaScript object to string
    //         let firebaseDataJSON = JSON.parse(firebaseDataString); // String to JSON
    
    //         if (firebaseDataJSON) {
    //             console.log('Data obtained from firebase ...');
    //             console.log(firebaseDataJSON.mechanicCNIC);
    //             if (Object.keys(firebaseDataJSON.mechanicCNIC).length >= 2) {
    //                 for (let key in firebaseDataJSON.mechanicCNIC) {
    //                     if (firebaseDataJSON.mechanicCNIC[key] === 'dummyCNIC' || mechanicResponseCNIC.includes(firebaseDataJSON.mechanicCNIC[key])) {
    //                         // nothing
    //                     }
    //                     else {
    //                         mechanicResponseCNIC.push(firebaseDataJSON.mechanicCNIC[key]);
    //                         console.log(mechanicResponseCNIC);
    //                         // clearInterval(interval);
    //                     }
    //                 }
    //                 console.log(`Some mechanic has responded ... !!`);
    //                 updateColor('green');
    //                 updateMsg('A mechanic responded. Click to view their response');
                    
    //                 // props.navigateTo('CustTabsWrapper', {userEmail: userEmailToPass});
    //             } 
    //             else {
    //                 console.log(`No mechanic has responded yet ...`);
    //                 updateColor('red');
    //                 updateMsg('Please Wait. We are finding you a mechanic');
    //             }
    //         }
    //         else {
    //             console.log(`This user has put no request in the DB as of now`);
    //         }
    //     })
    // }

    // dummy(); // If you just open this page, check in the DB immediately for any response

    // // Otherwise, check every 20 seconds if anybody has responded or not ...

    // interval = setInterval(() => {
    //     dummy();
    // }, 20000);
*/
