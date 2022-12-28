import React from 'react' 
import { View, Text, StyleSheet, TextInput, Button, Alert,TouchableOpacity, Dimensions } from 'react-native' 
import { Formik } from 'formik'
import * as yup from 'yup'
import firebase from './FirebaseInit'

const yupValidationSchema = yup.object({
    email: yup.string().email().required('You Must Provide an Email Address'),
    phone: yup.string().required('You Must Provide a Phone Number').length(11), 
    pass: yup.string().required('You Must Choose a Password').matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "All passwords must contain 8 characters with at least one uppercase letter, at least one lowercase letter, at least one digit and a special character"
      ),
    confirm: yup.string().required('You Must Confirm Your Password').oneOf([yup.ref('pass'), null], 'Passwords Must Match'),
});

const SignUpForm = (props) => {
    return(
        <Formik 
            initialValues = { {email: '', phone: '', pass: '', confirm: ''} }
            validationSchema = { yupValidationSchema }
            onSubmit = { (formData, actions) => {
                console.log('Form Data:', formData);
                let userEmail = formData.email;
                let userPhone = formData.phone;
                let userPass = formData.pass;
                userEmail = userEmail.replace(/\./g, ','); 
                // Deliberating replacing "dots" in the email address with "commas" 
                // so to avoid firebase key indexing issues
                console.log(userEmail);
                
                firebase.database().ref(`mobileMechanic/Clients/${userEmail}`).set({
                    phone: userPhone, 
                    password: userPass
                }).then( () => { 
                    console.log(`Customer Sign Up Successful`);
                    props.navigateTo('SignInCust')
                })
                .catch( () => { 
                    console.log(`Oho! Customer Sign Up Failed ...`);
                });
                
                actions.resetForm();
            }}> 
            {
                (formikProps) => {
                    return(
                        <View style = { myStyles.form }> 
                            <TextInput 
                                style = { myStyles.inputField }
                                placeholder = "Enter Your Email"
                                onChangeText = {formikProps.handleChange('email')}
                                value = { formikProps.values.email }
                            />
                            <Text style = { myStyles.formError }> { formikProps.touched.email && formikProps.errors.email } </Text>

                            <TextInput 
                                style = { myStyles.inputField }
                                placeholder = "Enter Your Phone"
                                onChangeText = { formikProps.handleChange('phone') }
                                value = { formikProps.values.phone }
                                keyboardType = 'numeric'
                            />
                            <Text style = { myStyles.formError }> {  formikProps.touched.phone && formikProps.errors.phone } </Text>

                            <TextInput 
                                style = { myStyles.inputField }
                                placeholder = "Enter Your Password"
                                secureTextEntry = {true}
                                onChangeText = { formikProps.handleChange('pass') }
                                value = { formikProps.values.pass }
                            />
                            <Text style = { myStyles.formError }> {  formikProps.touched.pass && formikProps.errors.pass } </Text>

                            <TextInput 
                                style = { myStyles.inputField }
                                placeholder = "Confirm Password"
                                secureTextEntry = { true }
                                onChangeText = { formikProps.handleChange('confirm') }
                                value = { formikProps.values.confirm }
                            />
                            <Text style = { myStyles.formError }> {  formikProps.touched.confirm && formikProps.errors.confirm } </Text>

                            <TouchableOpacity
                                    style={myStyles.loginScreenButton}
                                    onPress={ formikProps.handleSubmit }
                                    underlayColor='#fff'>
                                    <Text style={myStyles.loginText}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    );
                }
            }
        </Formik>
    );
}

const myStyles = StyleSheet.create({
    form: {
        textAlign: 'center', 
    },
    inputField: {
        padding: 6,
        textAlign: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderBottomColor: '#35b8b6',
        borderBottomWidth: 1.25,
        width: Dimensions.get('window').width * 0.7,
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

export default SignUpForm