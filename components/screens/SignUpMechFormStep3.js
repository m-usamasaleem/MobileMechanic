import React from "react";
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import firebase from "../../components/screenSnippets/FirebaseInit";
import { RadioButton } from "react-native-paper";
import RadioGroup from 'react-native-radio-buttons-group';

const yupValidationSchema = yup.object({
  firstname: yup.string().required("You Must Provide  20 Characters").length()<20,
  lastname: yup.string().required("You Must Provide  20 Characters").length()<20,
  age: yup.string().required('You Must Provide a Valid Age').length()<=3, 

});
var windowHeight = Dimensions.get("window").height;
var windowWidth = Dimensions.get("window").width;
const SignUpForm = (props) => {
  let usercnic = props.navigation.getParam('usercnic');
  let genderList=["Male","Female","Other"];
  const [genderCheck, setgenderCheck]=  React.useState("Male");
  const radioButtonsData = [{
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'Male',
    value: 'option1',
    color:'#6C6B6B'
}, {
    id: '2',
    label: 'Female',
    value: 'option2',
    color:'#6C6B6B'
    
}, {
  id: '3',
  label: 'Other',
  value: 'option3',
    color:'#6C6B6B'
  
}]

const [radioButtons, setRadioButtons] = React.useState(radioButtonsData)

function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
    
    for (let i = 0; i < radioButtonsArray.length; i++) {
      if (radioButtonsArray[i].selected){
        setgenderCheck(genderList[i])
        console.log(genderList[i])
      }
    }
}
  return (
    <Formik
      initialValues={{ firstname: "", lastname: "", age: "", confirm: "" }}
      validationSchema={yupValidationSchema}
      onSubmit={(formData, actions) => {
        console.log("Form Data:", formData);
        let userfirstname = formData.firstname;
        let userlastname = formData.lastname;
        let userage = formData.age;
     //   usercnic = usercnic.replace(/\./g, ",");
        // Deliberating replacing "dots" in the email address with "commas"
        // so to avoid firebase key indexing issues
        console.log(usercnic);

        firebase
          .database()
          .ref(`mobileMechanic/Mechanics/${usercnic}`)
          .update({
            firstName: userfirstname,
            lastName: userlastname,
            age: userage,
            gender:genderCheck,
            rating:0,
            cnic:usercnic
          })
          .then(() => {
            console.log(`Customer Sign Up Successful`);
            props.navigation.navigate("UploadPhotoSignIn", {usercnic:usercnic});
          })
          .catch(() => {
            console.log(`Oho! Customer Sign Up Failed ...`);
          });

        actions.resetForm();
      }}
    >
      {(formikProps) => {
        return (
          <ScrollView behavior="padding">
            <View style={myStyles.form}>
              <View style={myStyles.pageTop}>
                <Text style={myStyles.title}> MobileMechanic </Text>
                <Text style={myStyles.signin}> Sign Up </Text>
              </View>
              <TextInput
                style={myStyles.inputField}
                placeholder="First Name"
                onChangeText={formikProps.handleChange("firstname")}
                value={formikProps.values.firstname}
              />
              <Text style={myStyles.formError}>
                {" "}
                {formikProps.touched.firstname && formikProps.errors.firstname}{" "}
              </Text>

              <TextInput
                style={myStyles.inputField}
                placeholder="Last Name"
                onChangeText={formikProps.handleChange("lastname")}
                value={formikProps.values.lastname}
              />
              <Text style={myStyles.formError}>
                {" "}
                {formikProps.touched.lastname && formikProps.errors.lastname}{" "}
              </Text>

              <TextInput
                style={myStyles.inputField}
                placeholder="Age"
                onChangeText={formikProps.handleChange("age")}
                value={formikProps.values.age}
                keyboardType="numeric"
              />
              <Text style={myStyles.formError}>
                {" "}
                {formikProps.touched.age && formikProps.errors.age}{" "}
              </Text>

      <RadioGroup  layout='row'
            radioButtons={radioButtons} 
            onPress={onPressRadioButton} 
        />




              <Text style={myStyles.formError}>
                {" "}
                {formikProps.touched.confirm && formikProps.errors.confirm}{" "}
              </Text>

              <TouchableOpacity
                style={myStyles.loginScreenButton}
                onPress={formikProps.handleSubmit}
                underlayColor="#fff"
              >
                <Text style={myStyles.loginText}>Continue</Text>
              </TouchableOpacity>
            </View>
            <Text  style = { myStyles.termsofservice }>
                <Text  style = { myStyles.termsofservice }> By continuing, you agree to our </Text> 
                <Text style = { myStyles.urlLinking }
                    onPress = { () => Linking.openURL('http://www.uzair-reviews.com/MobileMechanic/privacy-policy.html') }>
                    PRIVACY POLICY
                </Text>
                <Text> and </Text>
                <Text style = { myStyles.urlLinking }
                    onPress = { () => {Linking.openURL('http://www.uzair-reviews.com/MobileMechanic/terms-of-service.html')} }>
                    TERMS OF SERVICE
                </Text> 
            </Text>


            
          </ScrollView>
        );
      }}
    </Formik>
  );
};

const myStyles = StyleSheet.create({

  radiobuttonMaleText: {
    left: windowWidth * 0.1,
    top: windowHeight * 0.015,
    position: "absolute",
  },
    radiobuttonMale: {
      left: windowWidth * 0.1,
      top: windowHeight * 0.45,
      position: "absolute",
      },
      radiobuttonFemale: {
        left: windowWidth * 0.35,
        top: windowHeight * 0.45,
        position: "absolute",
      },
      radiobuttonFemaleText: {
        left: windowWidth * 0.1,
        top: windowHeight * 0.015,
         position: "absolute",
      },
      radiobuttonOthers: {
        left: windowWidth * 0.7,
        top: windowHeight * 0.45,
        position: "absolute",
      },
      radiobuttonOthersText: {
        left: windowWidth * 0.1,
        top: windowHeight * 0.015,
        position: "absolute",
      },
  pageTop: {
    fontWeight: "bold",
    fontSize: 40,
    marginTop: windowHeight * 0.001,
    textAlign: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
    marginTop: windowHeight * 0.0001,
    textAlign: "center",
    padding: 15,
  },

  signin: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    padding: 3,
  },
  useyouraccount: {
    fontSize: 9,

    textAlign: "center",
  },
  termsofservice: {
    color: "black",
    fontSize: 12,
    textAlign: "center",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  pageBottom: {
    paddingTop: 20,
    fontSize: 12,
    paddingBottom: 10,
    textAlign: "center",
  },
  urlLinking: {
    paddingLeft: 20,
    color: "#35b8b6",
    fontSize: 12,
    padding: 10,
    textAlign: "center",
    marginLeft: 25,
    marginRight: 25,
  },
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
    marginTop:windowHeight * 0.0001,
    marginRight: 40,
    marginLeft: 40,
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

export default SignUpForm;
