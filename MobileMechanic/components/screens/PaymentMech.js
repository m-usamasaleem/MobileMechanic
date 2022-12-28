import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Alert,TextInput,
} from "react-native";
import BoxContainer from "../../components/screenSnippets/ProfileBoxContainer";
import BoxContainer1 from "../../components/screenSnippets/BoxContainer";
import StarRating from "react-native-star-rating";
import ServiceRequests from "./ServiceRequests";

import firebase from "../screenSnippets/FirebaseInit";
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
  
} from 'react-native-paper';
var windowHeight = Dimensions.get("window").height;
var windowWidth = Dimensions.get("window").width;
let name = "Ford Mustang, 2017";

const ProfileView = (navigationProps) => {
  const [msg, setMsg] = React.useState("");
  const [inputVal, setInputVal] = React.useState('0');
  const [isDialogVisible, setIsDialogVisible] = React.useState(true);

  let customer_object = navigationProps.navigation.getParam("customer_object");
  let cnic_mechanic = navigationProps.navigation.getParam("cnicMechanic");
  let customer_object_email = customer_object[0];
  let customer_object_info = customer_object[1];
  var RandomNumber = Math.floor(Math.random() * 1000000000) + 1;

  customer_object[1].mechanicCNIC[RandomNumber] = cnic_mechanic;

  let customer_object_entries = Object.entries(customer_object[0]);
  let star_gray = require("../../assets/icons/star_gray.png");
  let star_yellow = require("../../assets/icons/star_yellow.png");
  let image = require("../../assets/icons/car-cleaning.png");
  let message = require("../../assets/icons/message.png");
  let call = require("../../assets/icons/call.png");
  let gender = require("../../assets/icons/gender.png");
  let age = require("../../assets/icons/age.png");
  let accept = require("../../assets/icons/accept.png");
  let reject = require("../../assets/icons/reject.png");
  let rate = require("../../assets/icons/rate.png");
  let location = require("../../assets/icons/location.png");
  let date_image = require("../../assets/icons/date1.png");
  const [bidamount, onChangebidAmount] = React.useState(null);
  const [comment, onChangecomment] = React.useState(null);
  //customer_object[1].bidAmount={bidAmount:bidamount};
  //  customer_object[1].mechanicComment={mechanicComment:comment};

  let Images_list = [];
  let render=[];
  let shopping_cart = customer_object[1].customerShoppingCart;
  let keys = Object.keys(shopping_cart);
  let enteries_item = Object.entries(shopping_cart);
  for (let x = 0; x < enteries_item.length; x++) {
    Images_list.push(enteries_item[x][1].carImageKey);
  }


  
  
    const onButtonPress = () => {

      console.log("Buttompress")
      Alert.alert(
        "Enter password",
        "Enter your password to claim your $1.5B in lottery winnings",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "OK",
            onPress: password => console.log("OK Pressed, password: " + password)
          }
        ],
        "secure-text"
      );
    };


  const AcceptPressHandler = () => {
    let setMechanicResponse = "";
    firebase
      .database()
      .ref(`mobileMechanic/mechanicResponse/${customer_object_email}`)
      .once("value", (data) => {
        console.log(data)
        let firebaseDataString = JSON.stringify(data); // JavaScript object to string
        setMechanicResponse = JSON.parse(firebaseDataString); // String to JSON
        // setMechanicResponse[cnic_mechanic] = {
        //   bidAcceptance: 1,
        //   charges: bidamount,
        //   payMe: 1,
        //   mechanicComments:comment
        // };

        firebase
          .database()
          .ref(`mobileMechanic/mechanicResponse/${customer_object_email}/${cnic_mechanic}`)
          .update({payMe:1})
          .catch(() => {
            Alert.alert(
              "Order Confirmed!",
              "Congratulations! Your order has been placed successfully. Please wait while we connect you to the mechanics near by ",
              [{ text: "OK" }]
            );
            setMsg("Please be patient. We are finding you a mechanic");
          });

        firebase
          .database()
          .ref(`mobileMechanic/userRequests/${customer_object_email}`)
          .set(customer_object[1]).catch((error)=>{
            console.log('---------------------',error)
          });

          
      });

      console.log('NAVIGATING TO WAIT PAYMENT NOW')
      navigationProps.navigation.navigate("WaitPayment", {
        customer_email:customer_object_email,
        mech_cnic : cnic_mechanic
      })
      // const payMe = firebase.database().ref(`mobileMechanic/mechanicResponse/${customer_object_email}`).on("value",
      //   (data) => {if(data){
      //     let firebaseDataString = JSON.stringify(data); // JavaScript object to string
      //     mechanicResponse = JSON.parse(firebaseDataString); // String to JSON
      //     if(mechanicResponse[cnic_mechanic].payMe === -1){
      //         navigationProps.navigation.navigate("RatingReviews", {
      //         userId: customer_object_email,
      //         userLabel: "Clients",
      //         reviewBy: cnic_mechanic,
      //         nextScreen:"MechanicRequests",
      //         params:{
      //           usercnic:cnic_mechanic
      //         }
      //     })}}});

        }


  return (
    <React.Fragment>
      <ScrollView behavior="padding">

    
        <View
          style={{
            padding: 10,
            borderBottomColor: "#DADADA",
            borderBottomWidth: 1,
          }}
        />
        <View>

          <View
            style={{
              marginBottom: windowHeight * 0.005,
              marginTop: windowHeight * 0.005,
            }}
          >
            <BoxContainer1 style={styles.container6}>
                              <Image style={styles.schedule_date_image} source={date_image} />

              <Text style={styles.bid_title}>Bid Amount</Text>
              <Text style={styles.schedule_date}>Scheduled Date</Text>
              <Image style={styles.schedule_date_image} source={date_image} />

              <Text style={styles.schedule_date_time}>
                {customer_object_info.orderDateTime.date}
                {"-"}
                {customer_object_info.orderDateTime.month}
                {"-"}
                {customer_object_info.orderDateTime.year} |{" "}
                {customer_object_info.orderDateTime.time.hrs}
                {":"}
                {customer_object_info.orderDateTime.time.mins}
                {":"}
                {customer_object_info.orderDateTime.time.secs}{" "}
              </Text>

              <Text style={styles.bid_title_amount}>1000 PKR  {render} </Text>

            




            </BoxContainer1>
          </View>

          <View
            style={{
              marginBottom: windowHeight * 0.005,
              marginTop: windowHeight * 0.005,
            }}
          >

      <BoxContainer1 style={styles.container3}>
              <Text style={styles.comments}>Feedback</Text>
              <SafeAreaView>
                <TextInput
                  placeholder="Add your feedback"
                  multiline={true}
                  numberOfLines={2}
                  onChangeText={onChangecomment}
                  value={comment}
                  style={styles.input}
                />
              </SafeAreaView>
            </BoxContainer1>
            <TouchableOpacity onPress={() => AcceptPressHandler()}>
              <BoxContainer1 style={styles.container7}>
                <Text style={styles.accept_title}>Request Payment</Text>
              </BoxContainer1>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginBottom: windowHeight * 0.005,
              marginTop: windowHeight * 0.005,
            }}
          >
               <TouchableOpacity onPress={() => setIsDialogVisible(true)}>
              <BoxContainer1 style={styles.container8}>
                <Text style={styles.updatebid_title}>Update Bid</Text>
              </BoxContainer1>
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginBottom: windowHeight * 0.005,
              marginTop: windowHeight * 0.005,
            }}
          >
            <TouchableOpacity onPress={() => pressHandler()}>
              <BoxContainer1 style={styles.container8}>
                <Text style={styles.reject_title}>Cancel</Text>
              </BoxContainer1>
            </TouchableOpacity>
          </View>
        </View>

     

        <Provider style={{
              marginBottom: windowHeight * 0.005,
              marginTop: windowHeight * 0.005,
            }} >
      <View>
        <Portal>
          <Dialog
            visible={isDialogVisible}
            onDismiss={() => setIsDialogVisible(false)}>
            <Dialog.Title>Updated Bid Amount </Dialog.Title>
            <Dialog.Content>
              <TextInput
                value={inputVal}
                onChangeText={text => setInputVal(text)}
              />
  
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setIsDialogVisible(false)}>Update Bid</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
      </ScrollView>
    </React.Fragment>
  );
};

const navigationObject = {

  0: require("../../assets/car-images/civic.png"),
  1: require("../../assets/car-images/city.png"),
  2: require("../../assets/car-images/corolla.png"),
  3: require("../../assets/car-images/mehran.png"),
  4: require("../../assets/car-images/alto.png"),
  5: require("../../assets/car-images/vitz.png"),
  6: require("../../assets/car-images/lexus.png"),
  7: require("../../assets/car-images/bmw.png"),
  8: require("../../assets/car-images/bolan.png"),
  9: require("../../assets/car-images/accord.png"),
  10: require("../../assets/car-images/every.png"),
  11: require("../../assets/car-images/swift.png"),
  // Repearing a few cars for now
  12: require("../../assets/car-images/civic.png"),
  13: require("../../assets/car-images/city.png"),
  14: require("../../assets/car-images/corolla.png"),
  15: require("../../assets/car-images/mehran.png"),
  16: require("../../assets/car-images/alto.png"),
  17: require("../../assets/car-images/vitz.png"),
};

const styles = StyleSheet.create({
  0: require("../../assets/icons/oil-change.png"),
  1: require("../../assets/icons/battery-check.png"),
  2: require("../../assets/icons/automotive.png"),
  3: require("../../assets/icons/car-washing.png"),
  4: require("../../assets/icons/tyre-changing.png"),
  5: require("../../assets/icons/delivery-inspection.png"),
  6: require("../../assets/icons/car-cleaning.png"),
  7: require("../../assets/icons/conditioner-system-repair.png"),
  8: require("../../assets/icons/airbrush.png"),
  9: require("../../assets/icons/radiator.png"),
  10: require("../../assets/icons/brakes.png"),
  11: require("../../assets/icons/car-repair.png"),
  12: require("../../assets/icons/service.png"),
  pageTop_header: {
    marginTop: windowHeight * 0.01,
  },
  title_header: {
    fontWeight: "bold",
    fontSize: 30,
    marginTop: windowHeight * 0.05,
    textAlign: "center",
    color: "black",
  },
  input: {
    paddingTop: 0.02 * windowHeight,
  },
  input_bid: {
    paddingTop: 0.02 * windowHeight,
    left: 0.02 * windowHeight,
  },
  heading3: {
    paddingTop: 0.02 * windowHeight,
    borderBottomWidth: 1,
    borderRadius: 20,
    borderColor: "#fee",
    flexDirection: "row",
  },
  pageTop: {
    marginTop: windowHeight * 0.01,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    marginTop: windowHeight * 0.05,
    textAlign: "center",
  },

  container1: {
    paddingLeft: windowWidth * 0.03,
    paddingTop: windowWidth * 0.05,
    backgroundColor: "white",
    height: windowHeight * 0.4,
  },

  container2: {
    paddingRight: windowWidth * 0.03,
    paddingLeft: windowWidth * 0.03,
    backgroundColor: "white",
    height: windowHeight * 0.12,
    alignItems: "center",
  },
  container3: {
    paddingRight: windowWidth * 0.03,
    paddingLeft: windowWidth * 0.03,
    backgroundColor: "white",
    height: windowHeight * 0.12,
  },
  container4: {
    paddingRight: windowWidth * 0.03,
    paddingLeft: windowWidth * 0.03,
    backgroundColor: "#35b8b6",
    height: windowHeight * 0.12,
  },
  container6: {
    paddingRight: windowWidth * 0.03,
    paddingLeft: windowWidth * 0.03,
    backgroundColor: "#35b8b6",
    height: windowHeight * 0.15,
  },
  container7: {
    marginTop: windowHeight * 0.03,
    paddingRight: windowWidth * 0.03,
    paddingLeft: windowWidth * 0.03,
    backgroundColor: "#35b8b6",
    height: windowHeight * 0.09,
    width: windowWidth * 0.8,
    justifyContent: "center",
    left: windowWidth * 0.05,
    right: windowWidth * 0.05,
  },
  container8: {
    marginTop: windowHeight * 0.01,
    paddingRight: windowWidth * 0.03,
    paddingLeft: windowWidth * 0.03,
    backgroundColor: "grey",
    height: windowHeight * 0.09,
    width: windowWidth * 0.8,
    justifyContent: "center",
    left: windowWidth * 0.05,
    right: windowWidth * 0.05,
  },
  container5: {
    marginTop: windowHeight * 0.05,
    marginLeft: windowHeight * 0.015,
    paddingRight: windowWidth * 0.03,
    paddingLeft: windowWidth * 0.03,
    paddingTop: windowWidth * 0.0003,
    backgroundColor: "white",
    height: windowHeight * 0.05,
    width: windowWidth * 0.8,
    padding: 4,
  },
  call: {
    marginBottom: windowHeight * 0.06,
    borderRadius: 500,
    width: windowHeight * 0.06,
    height: windowHeight * 0.06,
    position: "absolute",
    marginLeft: windowWidth * 0.06,
    right: windowWidth * 0.03,
  },

  message: {
    marginBottom: windowHeight * 0.06,
    borderRadius: 500,
    width: windowHeight * 0.06,
    height: windowHeight * 0.06,
    position: "absolute",
    marginLeft: windowWidth * 0.06,
    right: windowWidth * 0.18,
  },
  age: {
    marginBottom: windowHeight * 0.06,
    borderRadius: 500,
    width: windowHeight * 0.035,
    height: windowHeight * 0.035,
    position: "absolute",
    marginLeft: windowWidth * 0.005,
    right: windowWidth * 0.18,
    top: windowHeight * 0.17,
  },
  gender: {
    marginBottom: windowHeight * 0.06,
    borderRadius: 500,
    width: windowHeight * 0.035,
    height: windowHeight * 0.035,
    position: "absolute",
    marginLeft: windowWidth * 0.005,
    right: windowWidth * 0.18,
    top: windowHeight * 0.1,
  },
  accept: {
    marginBottom: windowHeight * 0.06,
    borderRadius: 500,
    width: windowHeight * 0.035,
    height: windowHeight * 0.035,
    position: "absolute",
    marginLeft: windowWidth * 0.005,
    left: windowWidth * 0.08,
    top: windowHeight * 0.25,
  },

  accept_bid: {
    position: "absolute",
    left: windowWidth * 0.25,
    width: windowHeight * 0.09,
    height: windowHeight * 0.09,
    top: windowHeight * 0.0,
    bottom: windowHeight * 0.4,
  },
  reject_bid: {
    left: windowWidth * 0.45,
    width: windowHeight * 0.09,
    height: windowHeight * 0.09,
    top: windowHeight * 0.0,
  },
  reject: {
    marginBottom: windowHeight * 0.06,
    borderRadius: 500,
    width: windowHeight * 0.035,
    height: windowHeight * 0.035,
    position: "absolute",
    marginLeft: windowWidth * 0.005,
    left: windowWidth * 0.37,
    top: windowHeight * 0.25,
  },
  rate: {
    marginBottom: windowHeight * 0.06,
    borderRadius: 500,
    width: windowHeight * 0.035,
    height: windowHeight * 0.035,
    position: "absolute",
    marginLeft: windowWidth * 0.005,
    left: windowWidth * 0.65,
    top: windowHeight * 0.25,
  },

  profile: {
    marginBottom: windowHeight * 0.06,
    borderRadius: 500,
    width: windowHeight * 0.08,
    height: windowHeight * 0.08,
    position: "absolute",
    marginLeft: windowWidth * 0.005,
    left: windowWidth * 0.005,
    top: windowWidth * 0.1,
  },

  location: {
    borderRadius: 500,
    width: windowHeight * 0.06,
    height: windowHeight * 0.06,
    marginLeft: windowWidth * 0.005,
    left: windowWidth * 0.005,
    top: windowWidth * 0.1,
    left: windowWidth * 0.03,
    top: windowHeight * 0.03,
    alignItems: "center",
  },

  schedule_date_image: {
    position: "absolute",
    width: windowHeight * 0.04,
    height: windowHeight * 0.04,
    left: windowWidth * 0.489,
    top:windowHeight * 0.02,
  },
  location_text: {
    paddingLeft: windowHeight * 0.05,
    fontSize: 15,
    padding: 20,
    color: "grey",
  },

  services_images: {
    marginBottom: windowHeight * 0.06,
    borderRadius: 500,

    position: "absolute",
    marginLeft: windowWidth * 0.005,
  },

  profilename: {
    paddingLeft: windowHeight * 0.01,
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
    position: "absolute",
    left: windowWidth * 0.14,
    top: windowHeight * 0.06,
  },
  services: {
    paddingLeft: windowHeight * 0.01,
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
    position: "absolute",
    left: windowWidth * 0.01,
    top: windowHeight * 0.01,
  },
  bid_title: {
    paddingLeft: windowHeight * 0.01,
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    position: "absolute",
    left: windowWidth * 0.01,
    top: windowHeight * 0.01,
  },
  bid_title_amount: {
    paddingLeft: windowHeight * 0.01,
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
    position: "absolute",
    left: windowWidth * 0.25,
    top: windowHeight * 0.08,
  },

  accept_title: {
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
    left: windowWidth * 0.1,
    right: windowHeight * 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  updatebid_title: {
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
    left: windowWidth * 0.22,
    right: windowHeight * 0.22,
    justifyContent: "center",
    alignItems: "center",
  },
  reject_title: {
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
    left: windowWidth * 0.28,
    right: windowHeight * 0.22,
    justifyContent: "center",
    alignItems: "center",
  },
  schedule_date: {
    paddingLeft: windowHeight * 0.01,
    fontWeight: "bold",
    fontSize: 15,
    color: "white",
    position: "absolute",
    right: windowWidth * 0.03,
    top: windowHeight * 0.02,
  },
  schedule_date_time: {
    paddingLeft: windowHeight * 0.01,
    fontWeight: "bold",
    fontSize: 8,
    color: "white",
    position: "absolute",
    right: windowWidth * 0.068,
    top: windowHeight * 0.05,
  },

  comments: {
    paddingLeft: windowHeight * 0.01,
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
    position: "absolute",
    left: windowWidth * 0.01,
    top: windowHeight * 0.01,
  },
  gender_info: {
    paddingLeft: windowHeight * 0.01,
    fontSize: 15,
    color: "black",
    position: "absolute",
    right: windowWidth * 0.06,
    top: windowHeight * 0.1,
    color: "#8894c3",
  },
  age_info: {
    paddingLeft: windowHeight * 0.01,
    fontSize: 15,
    color: "black",
    position: "absolute",
    right: windowWidth * 0.1,
    top: windowHeight * 0.17,
    color: "#8894c3",
  },

  acceptance_value: {
    fontWeight: "bold",
    paddingLeft: windowHeight * 0.01,
    fontSize: 15,
    color: "black",
    position: "absolute",
    left: windowWidth * 0.07,
    top: windowHeight * 0.29,
  },
  rejection_value: {
    fontWeight: "bold",
    paddingLeft: windowHeight * 0.01,
    fontSize: 15,
    color: "black",
    position: "absolute",
    left: windowWidth * 0.36,
    top: windowHeight * 0.29,
  },
  rating_value: {
    fontWeight: "bold",
    paddingLeft: windowHeight * 0.01,
    fontSize: 15,
    color: "black",
    position: "absolute",
    left: windowWidth * 0.62,
    top: windowHeight * 0.29,
  },

  acceptance_info: {
    paddingLeft: windowHeight * 0.01,
    fontSize: 15,
    color: "black",
    position: "absolute",
    left: windowWidth * 0.001,
    top: windowHeight * 0.32,
    color: "grey",
  },
  rejection_info: {
    paddingLeft: windowHeight * 0.01,
    fontSize: 15,
    color: "black",
    position: "absolute",
    left: windowWidth * 0.31,
    top: windowHeight * 0.32,
    color: "grey",
  },
  rating_info: {
    paddingLeft: windowHeight * 0.01,
    fontSize: 15,
    color: "black",
    position: "absolute",
    left: windowWidth * 0.6,
    top: windowHeight * 0.32,
    color: "grey",
  },

  rating: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    left: windowWidth * 0.17,
    top: windowWidth * 0.18,
  },
  button: {
    width: 80,
    height: 40,
    color: "white",
    backgroundColor: "white",
  },

  header: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
  },
  headerContent: {
    padding: 30,
  },

  name: {
    fontSize: 22,
    color: "black",
    fontWeight: "600",
    position: "absolute",
  },
  profileDetail: {
    alignSelf: "center",
    marginTop: 200,
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    backgroundColor: "#ffffff",
  },
  detailContent: {
    margin: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "#35b8b6",
  },
  count: {
    fontSize: 18,
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
    marginTop: 40,
  },
  textInfo: {
    fontSize: 18,
    marginTop: 20,
    color: "#696969",
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00CED1",
  },
  description: {
    fontSize: 20,
    color: "#00CED1",
    marginTop: 10,
    textAlign: "center",
  },
});

export default ProfileView;
