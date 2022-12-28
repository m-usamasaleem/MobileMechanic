import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import firebase from "./FirebaseInit";
import { NavigationActions } from "react-navigation";

const SignInCustForm = (props) => {
  return (
    <Formik
      initialValues={{ cnic: "", pass: "" }}
      onSubmit={(formData, actions) => {
        console.log("Form Data:", formData);
        let usercnic = formData.cnic;
        usercnic = usercnic.replace(/\./g, ",");
        let userCnicToPass = usercnic.replace(/\,/g, ".");
        let userPassword = formData.pass;
        firebase
          .database()
          .ref(`mobileMechanic/Mechanics/${usercnic}`)
          .once("value", (data) => {
            let firebaseDataString = JSON.stringify(data); // JavaScript object to string
            let firebaseDataJSON = JSON.parse(firebaseDataString); // String to JSON
            
            if (firebaseDataJSON) {
                if (firebaseDataJSON.password === userPassword) {
                console.log(
                  `Login Successful .... CNIC and password both match`
                );

                props.navigateTo("MechanicRequests", {
                  usercnic: userCnicToPass,
                });
              } else {
                console.log(
                  `Login Failed ... CNIC matched but password did not`
                );
              }
            } else {
              console.log(
                `Login Failed .... CNIC did not match. Did not check password to save time`
              );
            }
          });
        actions.resetForm();
      }}
    >
      {(formikProps) => {
        return (
          <View style={myStyles.form}>
            <TextInput
             style = { myStyles.inputField }
             placeholder = "Enter Your CNIC"
             onChangeText = { formikProps.handleChange('cnic') }
             value = { formikProps.values.cnic }
             keyboardType = 'numeric'
            />
            <TextInput
              style={myStyles.inputField}
              placeholder="Enter Your Password"
              secureTextEntry={true}
              onChangeText={formikProps.handleChange("pass")}
              value={formikProps.values.pass}
            />
            <TouchableOpacity
              style={myStyles.loginScreenButton}
              onPress={formikProps.handleSubmit}
              underlayColor="#fff"
            >
              <Text style={myStyles.loginText}>Continue</Text>
            </TouchableOpacity>
          </View>
        );
      }}
    </Formik>
  );
};

const myStyles = StyleSheet.create({
  form: {
    textAlign: "center",
  },
  inputField: {
    padding: 6,
    textAlign: "center",
  },
  continueButton: {
    backgroundColor: "red",
  },
  loginScreenButton: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#35b8b6",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    position: "relative",
  },
  loginText: {
    color: "#fff",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  button: {
    backgroundColor: "#00aeef",
    borderColor: "red",
    borderWidth: 5,
    borderRadius: 15,
  },
  formError: {
    color: "red",
    fontSize: 12,
    textAlign: "center",
  },
});

export default SignInCustForm;
