import React from 'react' 
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native' 
import firebase from '../screenSnippets/FirebaseInit'
import { Ionicons } from '@expo/vector-icons'
import { Fontisto } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'

const SeeMechanicResponse = ( navigationProps ) => {
    let displayArray = [];
    let responsesArray = navigationProps.navigation.getParam('mechanics');
    let userEmail = navigationProps.navigation.getParam('userEmailToPass');
    let wallet = navigationProps.navigation.getParam('wallet');
    userEmail = userEmail.replace(/\./g, ',');

// setTimeout(() => {
    
// }, 2000);

    const displayData = (dataResponse, dataProfile) => {
        if (dataResponse && dataProfile) {
            let name = dataProfile.firstName + ' ' + dataProfile.lastName;
            let rating = dataProfile.rating;
            let cnic = dataProfile.cnic;
            let charges = dataResponse.charges;
            let comments = dataResponse.mechanicComments;

            displayArray.push({ 
                mechanicName: name, 
                mechanicCNIC: cnic, 
                mechanicCharges: charges,
                rating: rating,
                comments: comments
            });
        }
    }

    responsesArray.map( (data, index) => {
        let responseData = '';
        let profileData = '';

        // get their demand like this

        firebase.database().ref(`mobileMechanic/mechanicResponse/${ userEmail }/${ data }`).on('value', (dataResponse) => {
            let firebaseDataString = JSON.stringify(dataResponse);
            dataResponse = JSON.parse(firebaseDataString);
            responseData = dataResponse;
            //console.log('--------SeeMechanicResponse-------------')
            
            // get their profile data like this

            firebase.database().ref(`mobileMechanic/Mechanics/${ data }`).on('value', (dataProfile) => {
                let firebaseDataString = JSON.stringify(dataProfile);
                dataProfile = JSON.parse(firebaseDataString);
                profileData = dataProfile;
                
                displayData(responseData, profileData);
            });
        })
    })

    return(
        <React.Fragment> 
            <Text style = { {marginTop: 50, marginBottom: 20, textAlign: 'center', fontSize: 25} }> Available Mechanics </Text>
            <ScrollView> 
                {
                    displayArray.map( (dataObject, index) => {
                        console.log('Type of wallet: ', typeof(wallet));
                        console.log('Wallet: ', JSON.stringify(wallet));
                        if (parseInt(JSON.stringify(wallet)) >= dataObject.mechanicCharges) {
                            return(
                                <React.Fragment>
                                    <View style = { myStyles.item }>
                                        <View key = {index}>
                                            <View style = { {marginLeft: Dimensions.get('window').width * 0.84} }> 
                                                <Ionicons name = "md-arrow-redo-sharp" size = { 24 } color = "#35b8b6" />     
                                                <Text style = { {fontSize: 10, color: '#35b8b6'} }> Profile </Text>
                                            </View>
                                            <View>
                                                <View style = { myStyles.star }> 
                                                    <AntDesign  style = { {marginTop: 5} }name = "user" size = { 19 } color = "#35b8b6" />  
                                                    <Text style = { myStyles.name }> { dataObject.mechanicName } </Text>  
                                                </View>
                                                <View style = { myStyles.star }> 
                                                    <FontAwesome5 style = { {marginTop: 15} }  name = "money-bill-alt" size = { 16 } color = "#35b8b6" />
                                                    <Text style = { myStyles.chargesDemanded }> { dataObject.mechanicCharges } Rs </Text>
                                                </View>
                                                <View style = { myStyles.star }> 
                                                    <FontAwesome style = { {marginTop: 15} } name = "star" size = { 16 } color = "#35b8b6" />
                                                    <Text style = { myStyles.rating }> { dataObject.rating } </Text>
                                                </View>
                                                <Text style = { myStyles.rating }> { dataObject.comments } </Text>
                                            </View>
                                            <View style = { {flexDirection: 'row'} }>
                                                <View style = { {marginTop: 20, marginLeft: 50} }>
                                                    <TouchableOpacity
                                                        style = { myStyles.loginScreenButton }
                                                        onPress = { () => { 
                                                            Alert.alert(
                                                                'Accept Mechanic?',
                                                                `Are you sure you want to proceed with this mechanic? If you select yes, they will be notified that you have accepted them. Else, no changes will be made`,
                                                                [  
                                                                    { text: 'No' },
                                                                     { 
                                                                        text: "Yes", 
                                                                        onPress: () =>  {
                                                                            responsesArray.map( (mechanicCNIC) => {
                                                                                if (mechanicCNIC != dataObject.mechanicCNIC) {
                                                                                    console.log('Making bidAcceptance -1 for', mechanicCNIC);
                                                                                    return(
                                                                                        firebase.database().ref(`mobileMechanic/mechanicResponse/${ userEmail }/${ mechanicCNIC }`).update({ bidAcceptance: -1 })
                                                                                    );
                                                                                }
                                                                                else {
                                                                                    console.log('Removing and changing bidAcceptance to +1');
                                                                                    // firebase.database().ref(`mobileMechanic/userRequests/${ userEmail }`).remove(); ////////////////////////////////////////////////////////////////////////////////////////////////////////////// re do this!!!!
                                                                                    return(
                                                                                        firebase.database().ref(`mobileMechanic/mechanicResponse/${ userEmail }/${ dataObject.mechanicCNIC }`).update({
                                                                                            bidAcceptance: 1
                                                                                        })
                                                                                    );
                                                                                }
                                                                            });
                                                                            navigationProps.navigation.navigate('CustMechanicLocationTracking', {
                                                                            userEmail: userEmail, 
                                                                            cnic: dataObject.mechanicCNIC, 
                                                                            array: responsesArray, 
                                                                            charges: dataObject.mechanicCharges, 
                                                                            wallet: wallet
                                                                            });
                                                                            
                                                                        }
                                                                    }
                                                                ],
                                                            );
                                                        }}
                                                        underlayColor = '#fff'>
                                                        <Text style = { myStyles.loginText }> Accept Bid </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </React.Fragment>
                            );
                        }
                        else {
                            console.log('Money Issues. You dont have enough', dataObject.mechanicCharges, ' vs ', wallet);
                            let toReturn = `Bid too expensive!. Balance: ${ parseInt(JSON.stringify(wallet)) } Rs`;
                            return(
                                <React.Fragment>
                                    <View style = { myStyles.item }>
                                        <View key = {index}>
                                            <View style = { {marginLeft: Dimensions.get('window').width * 0.84, marginTop: 5} }> 
                                                <Fontisto name = "ban" size = { 18 } color = 'red' onPress = { () => { 
                                                    Alert.alert(
                                                        'Profile Unavailable',
                                                        `You cannot afford this mechanic. Therefore, their profile is not available to you. Please select a mechanic that you can afford. Thank you!`,
                                                        [ { text: "OK" } ],
                                                    )}} 
                                                />
                                                <Text style = { {fontSize: 10, color: 'red'} }> Profile </Text>
                                            </View>
                                            <View>
                                                <View style = { myStyles.star }> 
                                                    <AntDesign style = { {marginTop: 5} } name = "user" size = { 19 } color = "red" />  
                                                    <Text style = { myStyles.name }> { dataObject.mechanicName } </Text>  
                                                </View>  
                                                <View style = { myStyles.star }> 
                                                    <FontAwesome5 style = { {marginTop: 15} } name = "money-bill-alt" size = { 16 } color = "red" />
                                                    <Text style = { myStyles.chargesDemanded }> { dataObject.mechanicCharges } Rs </Text>
                                                </View>
                                                <View style = { myStyles.star }> 
                                                    
                                                    <FontAwesome style = { {marginTop: 15} } name = "star" size = { 16 } color = "red" />
                                                    <Text style = { myStyles.rating }> { dataObject.rating } </Text>
                                                </View>
                                                <Text style = { myStyles.rating }> { dataObject.comments } </Text>
                                            </View>
                                            <View style = { {flexDirection: 'row'} }>
                                                <View style = { {marginTop: 20, marginLeft: 50} }>
                                                    <TouchableOpacity
                                                        style = { myStyles.rejectButton }
                                                        onPress = { () => { 
                                                            Alert.alert(
                                                                'Warning! Short on Cash',
                                                                `This mechanic demands ${ dataObject.mechanicCharges } Rs. You only have ${ JSON.stringify(wallet) } Rs in your wallet. Please select another mechanic. Thank you!`,
                                                                [ { text: "OK" } ],
                                                            );
                                                        }}
                                                        underlayColor = '#fff'>
                                                        <Text style = { myStyles.loginText }> Bid Too Expensive </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </React.Fragment>
                            );
                        }
                    })
                }
            </ScrollView>
        </React.Fragment>
    );
}

export default SeeMechanicResponse

const myStyles = StyleSheet.create({
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
        marginBottom: 20, 
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
        position: 'relative', 
        width: Dimensions.get('window').width * 0.5,
    }, 
    loginText: {
        color:'#fff',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10
    },
    rejectButton: {
        marginLeft:40,
        marginBottom:20,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:"red",
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        position: 'relative',
        alignContent: 'center', 
        alignItems: 'center', 
        alignSelf: 'center',
        width: Dimensions.get('window').width * 0.5,
    }, 
    name: {
        fontSize: 23,
        textAlign: 'center', 
        paddingTop: 5
    },
    chargesDemanded: {
        fontSize: 17,
        textAlign: 'center', 
        paddingTop: 15
    },
    rating: {
        fontSize: 13,
        textAlign: 'center', 
        paddingTop: 15
    }, 
    star: {
        flexDirection: 'row', 
        textAlign: 'center', 
        alignContent: 'center', 
        alignItems: 'center', 
        alignSelf: 'center'
    }
});
