import React, { useState } from 'react' 
import { View, Text, StyleSheet, TextInput, Button, ScrollView, Dimensions, TouchableOpacity } from 'react-native' 
import { Formik } from 'formik'
import * as yup from 'yup' 
import firebase from '../screenSnippets/FirebaseInit'

const schema = yup.object({
    firstName: yup.string().required('First name is required'), 
    lastName: yup.string().required('Last name is required'), 
    age: yup.number().required().positive().integer(),
    creditCard: yup.string().required('Credit card number is required').length(16),
    wallet: yup.number().required().positive().integer(),
});

var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;

const ProfileCustForm = (props) => {
    let userEmail = props.userEmail;
    userEmail = userEmail.replace(/\./g, ',');
    let currentBalance = 0;
    
    const [firstNameToShow, setFirstName] = useState('Enter Your First Name');
    const [lastNameToShow, setLastName] = useState('Enter Your Last Name');
    const [ageToShow, setAge] = useState('Enter Your Age');
    const [creditCardToShow, setCreditCard] = useState('Enter Your Credit Card');
    const [walletToShow, setWallet] = useState('Wallet is empty (0 Rs)');

    const getData = () => {
        firebase.database().ref(`mobileMechanic/Clients/${ userEmail }`).once('value', (data) => {
            let firebaseDataString = JSON.stringify(data); // JavaScript object to string
            let firebaseDataJSON = JSON.parse(firebaseDataString); // String to JSON
        
            if (firebaseDataJSON.firstName) {
                console.log('Got data successfully ...');
                setFirstName('FIRST NAME: ' + firebaseDataJSON.firstName);
            }
            if (firebaseDataJSON.lastName) {
                setLastName('LAST NAME: ' + firebaseDataJSON.lastName);
            }
            if (firebaseDataJSON.age) {
                setAge('AGE: ' + firebaseDataJSON.age);
            }
            if (firebaseDataJSON.creditCard) {
                setCreditCard('CREDIT CARD NUMBER: ' + firebaseDataJSON.creditCard);
            }
            if (firebaseDataJSON.wallet) {
                currentBalance = firebaseDataJSON.wallet;
                setWallet('CURRENT BALANCE: Rs ' + firebaseDataJSON.wallet);
            }
        })
    }

    getData();
    
    return(
        <ScrollView> 
            <Formik 
                initialValues = { {firstName: '', lastName: '', age: '', creditCard: '', wallet: ''} }
                validationSchema = { schema }
                onSubmit = { (submittedData, control) => {
                    control.resetForm();

                    let firstName = submittedData.firstName; 
                    let lastName = submittedData.lastName; 
                    let age = submittedData.age;
                    let creditCardNumb = submittedData.creditCard;
                    let walletMoney = submittedData.wallet;

                    firebase.database().ref(`mobileMechanic/Clients/${userEmail}`).update({
                        firstName: firstName, 
                        lastName: lastName, 
                        age: age, 
                        creditCard: creditCardNumb, 
                        wallet: parseInt(walletMoney) + parseInt(currentBalance)
                    }).then( () => { 
                        console.log(`Profile updation successful ...`);
                        getData();
                    })
                    .catch( () => { 
                        console.log(`Profile updation failed ...`);
                    });
                }}
            > 
            {
                (formikProps) => {
                    return(
                        <View>
                            <TextInput 
                                style = { styles.input }
                                placeholder = {firstNameToShow}
                                onChangeText = { formikProps.handleChange('firstName') }
                                value = { formikProps.values.firstName }
                            />
                            <Text style = { styles.errors }> { formikProps.touched.firstName && formikProps.errors.firstName } </Text>
                            
                            <TextInput 
                                style = { styles.input }
                                placeholder = {lastNameToShow}
                                onChangeText = { formikProps.handleChange('lastName') }
                                value = { formikProps.values.lastName }
                            />
                            <Text style = { styles.errors }> { formikProps.touched.lastName && formikProps.errors.lastName } </Text>

                            <TextInput 
                                style = { styles.input }
                                placeholder = {ageToShow}
                                onChangeText = { formikProps.handleChange('age') }
                                value = { formikProps.values.age }
                            />
                            <Text style = { styles.errors }> { formikProps.touched.age && formikProps.errors.age } </Text>

                            <TextInput 
                                style = { styles.input }
                                placeholder = {creditCardToShow}
                                onChangeText = { formikProps.handleChange('creditCard') }
                                value = { formikProps.values.creditCard }
                            />
                            <Text style = { styles.errors }> { formikProps.touched.creditCard && formikProps.errors.creditCard } </Text>
                            
                            <TextInput 
                                style = { {textAlign: 'center'} }
                                placeholder = { walletToShow }
                                onChangeText = { formikProps.handleChange('wallet') }
                                value = { formikProps.values.wallet }
                            />
                            <Text style = { styles.errors }> { formikProps.touched.wallet && formikProps.errors.wallet } </Text>
                            
                            <View style = { styles.heading4 }>
                                <TouchableOpacity
                                    style = { styles.loginScreenButton }
                                    onPress = { formikProps.handleSubmit  }
                                    underlayColor = '#fff'>
                                    <Text style = { styles.loginText }> Update Profile </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }
            }
            </Formik>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    errors: {
        color: 'red', 
        textAlign: 'center', 
        fontSize: 12,
    },
    button: {
        marginLeft:  0.2*windowWidth,
        marginRight: 0.2*windowWidth,
    },
    input: {
        // marginBottom: 10,
        // paddingHorizontal: 8,
        // paddingVertical: 6,
        // borderBottomWidth: 1,
        // borderBottomColor: '#ddd',
        textAlign: 'center',      
    },
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
});

export default ProfileCustForm