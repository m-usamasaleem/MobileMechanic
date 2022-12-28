import React from 'react' 
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Alert, Dimensions } from 'react-native' 
import firebase from '../screenSnippets/FirebaseInit'
import { Formik } from 'formik'
import * as yup from 'yup'

let windowHeight = Dimensions.get('window').height;
let windowWidth = Dimensions.get('window').width;

const Payments = (navigationProps) => {
    let userEmail = navigationProps.navigation.getParam('userEmail');
    let acceptedCNIC = navigationProps.navigation.getParam('cnic');
    let array = navigationProps.navigation.getParam('array');
    let charges = navigationProps.navigation.getParam('charges');
    let userWallet = navigationProps.navigation.getParam('wallet');
    let place = `You Owe Rs. ${ charges }`;
    let mechanicWallet = '';
    console.log('userEmail in payment :', userEmail)
    console.log('array in payment :', array)
    

    firebase.database().ref(`mobileMechanic/Mechanics/${ acceptedCNIC }/wallet`).once('value', (data) => {
        mechanicWallet = parseInt(JSON.stringify(data));
    });

    const yupValidationSchema = yup.object({
        money: yup.number().required(`You Must Pay the Mechanic ${ charges } Rs`) 
    });

    const paymentMethod = (moneyPaid) => {
        let date = new Date().getDate();
        let month = new Date().getMonth() + 1;
        let year = new Date().getFullYear();
        let today = date + '-' + month + '-' + year;
        let random = Math.floor((Math.random() * 1000000000) + 1);

        firebase.database().ref(`mobileMechanic/Clients/${ userEmail }`).update({ // update client's wallet
            wallet: parseInt(JSON.stringify(userWallet)) - charges
        }).then( () => {
            firebase.database().ref(`mobileMechanic/Mechanics/${ acceptedCNIC }`).update({ // update mechanic's wallet as well
                wallet: mechanicWallet + charges
            }).then( () => {
                firebase.database().ref(`mobileMechanic/mechanicTransactions/${ acceptedCNIC }/${ userEmail }`).update({  // update mechanic's transactions
                    [random]: {
                        totalPayment: charges,
                        date: today
                    }
                }).then( () => {
                    firebase.database().ref(`mobileMechanic/userTransactions/${ userEmail }/${ acceptedCNIC }`).update({ // update user's transactions as well
                        [random]: {
                            totalPayment: charges,
                            date: today
                        }
                    }).then( () => {
                        Alert.alert(
                            'Transaction Successful',
                            `You Paid ${ moneyPaid } rupees`,
                            [ 
                                {
                                    text: "OK", 
                                    onPress: () => {
                                        firebase
                                        .database()
                                        .ref(`mobileMechanic/mechanicResponse/${userEmail}/${acceptedCNIC}`)
                                        .update({payMe:-1})
                                        navigationProps.navigation.navigate('RatingReviews', {
                                            userId: acceptedCNIC,
                                            userLabel: "Mechanics",
                                            reviewBy: userEmail,
                                            nextScreen: "CustTabsWrapper",
                                            params: {userEmail: userEmail},
                                        });
                                    }
                                }
                            ],
                        );
                    }).catch( (error) => {
                        console.log('Could not update users transactions ...', error);
                        Alert.alert(
                            'Transaction Failed',
                            `Please try again`,
                            [ 
                                { 
                                    text: "OK",
                                }
                            ],
                        );
                    });
                }).catch( (error) => {
                    console.log('Could not update mechanics transactions ...', error);
                });
            }).catch( (error) => {
                console.log('Could not update mechanics wallet ...', error);
            });
        }).catch( (error) => {
            console.log('Could not update users wallet ... ', error);
        });
    }

    // array.map( (mechanicCNIC) => {
    //     if (mechanicCNIC != acceptedCNIC) {
    //         console.log('Making bidAcceptance -1 for', acceptedCNIC);
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

    return(
        <React.Fragment> 
            <View style = { {flex: windowHeight * 0.12} }>
                <Text style = { {marginTop: '12%', marginBottom: 20, fontSize: 30, textAlign: 'center'}}> Payments </Text>
                {
                    //<Text style = { {marginTop: '12%', marginBottom: 20, fontSize: 20, textAlign: 'center'}}> The Mechanic is Done Working ... </Text>
                }
                <Text style = { {marginTop: 25, marginBottom: 10, fontSize: 25, textAlign: 'center'}}> { `Total Charges: ${ charges } Rs`} </Text>
                <Text style = { {textAlign: 'center', color: '#35b8b6'}}> Please take {charges} Rs from your wallet and transfer to your mechanic. {'\n'} Thank you! </Text>
            </View>
            <View style = { {flex: windowHeight * 0.80, justifyContent: 'center', alignItems: 'center'}}>    
                <Formik
                    initialValues = { {money: ''} }
                    validationSchema = { yupValidationSchema }
                    onSubmit = { (formData, actions) => {
                        console.log('Form Data:', formData);
                        let money = formData.money;
                        actions.resetForm();

                        if (parseInt(money) < parseInt(charges)) {
                            Alert.alert(
                                'Warning! Under Payment',
                                `You need to pay at least ${ charges } rupees. Please pay the exact amount of money from your wallet. We don't accept under payments. Thank you!`,
                                [ { text: "OK" } ],
                            );
                        }
                        else if (parseInt(money) > parseInt(charges)) {
                            let over = money - charges;
                            Alert.alert(
                                'Warning! Over Payment',
                                `You are over paying by ${ over } rupees. Please pay the exact amount of money from your wallet. We don't accept over payments. Thank you!`,
                                [ 
                                    { 
                                        text: "OK", 
                                    }
                                ],
                            );
                        }
                        else if (parseInt(money) == parseInt(charges)) {
                            paymentMethod(money);
                        }
                        else {
                            console.log('Something went wrong ...');
                        }
                    }}
                >
                {
                    (formikProps) => {
                        return(
                            <View style = { myStyles.form }> 
                                <TextInput 
                                    style = { myStyles.inputField }
                                    placeholder = { place }
                                    onChangeText = { formikProps.handleChange('money') }
                                    value = { formikProps.values.money }
                                    keyboardType = 'numeric'
                                />
                                <Text style = { myStyles.formError }> { formikProps.touched.money && formikProps.errors.money } </Text>

                                <TouchableOpacity
                                        style = { myStyles.loginScreenButton }
                                        onPress = { formikProps.handleSubmit }
                                        underlayColor = '#fff'>
                                        <Text style = { myStyles.loginText }> Pay! </Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }
                }
                </Formik>
            </View>
        </React.Fragment>
    );
}

const myStyles = StyleSheet.create({
    form: {
        textAlign: 'center', 
    },
    inputField: {
        padding: 6,
        textAlign: 'center', 
        width: windowWidth * 0.6, 
        borderBottomColor: '#35b8b6',
        borderBottomWidth: 1.25,
        marginBottom: 30,
    },
    continueButton: {
        backgroundColor:"red",
    },
    loginScreenButton:{
        marginRight:40,
        marginLeft:40,
       marginTop:10,
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
    },
   button: {
      backgroundColor: '#00aeef',
      borderColor: 'red',
      borderWidth: 5,
      borderRadius: 15       
   },
    formError: {
        color: 'red', 
        fontSize: 12,
        textAlign: 'center'
    }
});

export default Payments
