import React, { Component, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  TextInput,
  TouchableHighlight,
} from "react-native";
import BoxContainer from "../../components/screenSnippets/ProfileBoxContainer";
import BoxContainer1 from "../../components/screenSnippets/BoxContainer";
import StarRating from "react-native-star-rating";
import { Divider } from "react-native-elements";
import { acc } from "react-native-reanimated";
import { Stopwatch, Timer } from "react-native-stopwatch-timer";
import firebase from "../screenSnippets/FirebaseInit";

var windowHeight = Dimensions.get("window").height;
var windowWidth = Dimensions.get("window").width;
let name = "Ford Mustang, 2017";

const ProfileView = (navigationProps) => {
  //const [description, setdescription] = useState(" ");
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);
  const [finishedStopwatch, setResetfinished] = useState(false);
  let customer_object = navigationProps.navigation.getParam("customer_object");
  let cnic_mechanic = navigationProps.navigation.getParam("cnic_mechanic");
  const path = `mobileMechanic/mechanicLocations/${cnic_mechanic}`
  let customer_object_email = customer_object[0];
  let customer_object_info = customer_object[1];
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
  let image1 = require("../../assets/icons/airbrush.png");
  let image2 = require("../../assets/icons/radiator.png");
  let image3 = require("../../assets/icons/brakes.png");
  let car_image = require("../../assets/car-images/corolla.png");
  let date_image = require("../../assets/icons/date1.png");
  let work_under = require("../../assets/icons/work_under.png");

  let Images_list = [];
  let shopping_cart = customer_object[1].customerShoppingCart;
  let keys = Object.keys(shopping_cart);
  let enteries_item = Object.entries(shopping_cart);
  for (let x = 0; x < enteries_item.length; x++) {
    Images_list.push(enteries_item[x][1].carImageKey);
  }
  console.log(Images_list);

  //
  const pressHandler = (object) => {
    console.log("navigationProps");
    navigationProps.navigation.navigate("ProfileMech", {
      customer_object: object,
    });
  };
  return (
    <React.Fragment>
      <ScrollView behavior="padding">
        <View style={styles.pageTop_header}>
        <BoxContainer style={styles.container1}>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity style={styles.call}>
                  <Image style={styles.call} source={call} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.message}>
                  <Image style={styles.call} source={message} />
                </TouchableOpacity>
                <Image
                  style={styles.profile}
                  source={
                    navigationObject[customer_object_info.customerCarImageKey]
                  }
                />

                <Text style={styles.profilename}>
                  {" "}
                  {customer_object_email.slice(0, 5)}{" "}
                </Text>
 

                <View style={styles.rating}>
                  <StarRating
                    disabled
                    maxStars={5}
                    rating={4}
                    starSize={22}
                    fullStar={star_yellow}
                    emptyStar={star_gray}
                  />
                </View>
              </View>
            </BoxContainer>
          <Image style={styles.work_under_image} source={work_under} />
          <Text style={styles.title_header}> Work in Progress</Text>
        </View>

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
              marginTop: windowHeight * 0.0,
              marginBottom: windowHeight * 0.03,
            }}
          >

          </View>
          <View
            style={{
              marginBottom: windowHeight * 0.005,
              marginTop: windowHeight * 0.005,
            }}
          >
            <BoxContainer1 style={styles.container2}>
              <View style={{ flexDirection: "row" }}>
                <Image style={styles.location} source={location} />
                <Text style={styles.location_text}>
                  Toyata Motors Street # 8, House 6, Bosan Rd, Shalimar Colony,
                  Multan.
                </Text>
              </View>
            </BoxContainer1>
          </View>

          <View
            style={{
              marginBottom: windowHeight * 0.005,
              marginTop: windowHeight * 0.005,
            }}
          >
            <BoxContainer1 style={styles.container3}>
              <Text style={styles.services}>Services</Text>
              <View style={styles.services_images}>
                {Images_list.map((img, index) => (
                  <Image
                    style={{
                      width: windowHeight * 0.04,
                      height: windowHeight * 0.04,
                      position: "absolute",
                      left: windowWidth * (0.03 + index * 0.1),
                      top: windowWidth * 0.01,
                    }}
                    source={styles[img]}
                  />
                ))}
              </View>
            </BoxContainer1>
          </View>

          <View
            style={{
              marginBottom: windowHeight * 0.005,
              marginTop: windowHeight * 0.005,
            }}
          >
            <BoxContainer1 style={styles.container3}>
              <Text style={styles.services}>Photos</Text>
              <View style={styles.services_images}>
                <Image
                  style={{
                    width: windowHeight * 0.04,
                    height: windowHeight * 0.04,
                    position: "absolute",
                    left: windowWidth * 0.03,
                    top: windowWidth * 0.01,
                  }}
                  source={
                    navigationObject[customer_object_info.customerCarImageKey]
                  }
                />
                <Image
                  style={{
                    width: windowHeight * 0.04,
                    height: windowHeight * 0.04,
                    position: "absolute",
                    left: windowWidth * 0.13,
                    top: windowWidth * 0.01,
                  }}
                  source={
                    navigationObject[customer_object_info.customerCarImageKey]
                  }
                />
                <Image
                  style={{
                    width: windowHeight * 0.04,
                    height: windowHeight * 0.04,
                    position: "absolute",
                    left: windowWidth * 0.24,
                    top: windowWidth * 0.01,
                  }}
                  source={
                    navigationObject[customer_object_info.customerCarImageKey]
                  }
                />
              </View>
            </BoxContainer1>
          </View>

          <View
            style={{
              marginBottom: windowHeight * 0.005,
              marginTop: windowHeight * 0.005,
            }}
          >
            <BoxContainer1 style={styles.container3}>
              <Text style={styles.services}>Vehicle</Text>
              <View style={styles.services_images}>
                <Text
                  style={{
                    color: "#8894c3",
                    fontSize: 10,
                    position: "absolute",
                    left: windowWidth * 0.03,
                  }}
                >
                  Car Name: {customer_object_info.customerCarName}
                </Text>
                <Text
                  style={{
                    color: "#8894c3",
                    fontSize: 10,
                    position: "absolute",
                    left: windowWidth * 0.03,
                    top: windowWidth * 0.035,
                  }}
                >
                  Car Model:{customer_object_info.customerCarModel}
                </Text>
                <Text
                  style={{
                    color: "#8894c3",
                    fontSize: 10,
                    position: "absolute",
                    left: windowWidth * 0.03,
                    top: windowWidth * 0.07,
                  }}
                >
                  Car Number:{customer_object_info.customerCarNumber}
                </Text>
              </View>
            </BoxContainer1>
          </View>

          <View
            style={{
              marginBottom: windowHeight * 0.005,
              marginTop: windowHeight * 0.005,
            }}
          >

          </View>

          <View
            style={{
              marginBottom: windowHeight * 0.005,
              marginTop: windowHeight * 0.005,
            }}
          >

          </View>
        </View>
        <View style={styles.container10}>
          <View style={styles.sectionStyle}>
            <Stopwatch
              laps
              msecs
              start={isStopwatchStart}
              //To start
              reset={resetStopwatch}
              //To reset
              options={options}
              //options for the styling
              getTime={(time) => {
                console.log(time);
              }}
            />
            <TouchableOpacity 
              onPress={() => {
                setIsStopwatchStart(!isStopwatchStart);
                setResetStopwatch(false);
                setResetfinished(!finishedStopwatch)
        //      const [finishedStopwatch, setResetfinished] = useState(false);
              }}
            >
              <BoxContainer1 style={styles.container7}>
              <Text style={styles.accept_title}>

                {!isStopwatchStart ? "START" : "PAUSE"}
              </Text>
              </BoxContainer1>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {

                firebase
                .database()
                .ref(path)
                .update({
                  workdone:1,
                })


              //  setIsStopwatchStart(false);
             //   setResetStopwatch(true);

             navigationProps.navigation.navigate("PaymentMech", {
      customer_object: customer_object,
      cnicMechanic: cnic_mechanic,
    });
              }}
            >
              <BoxContainer1 style={styles.container8}>
              <Text style={styles.accept_title}>FINISHED</Text>
              </BoxContainer1>
            </TouchableOpacity>
          </View>
        </View>
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
    marginTop: windowHeight * 0.04,
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
    height: windowHeight * 0.15,
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
    paddingRight: windowWidth * 0.03,
    paddingLeft: windowWidth * 0.03,
    backgroundColor: "#58d400",
    height: windowHeight * 0.09,
    width: windowWidth * 0.65,
    justifyContent: "center",
  },
  container8: {
    marginTop:windowHeight*0.02,
    paddingRight: windowWidth * 0.03,
    paddingLeft: windowWidth * 0.03,
    backgroundColor: "red",
    height: windowHeight * 0.09,
    width: windowWidth * 0.65,
    justifyContent: "center",

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

  work_under_image: {
    width: windowHeight * 0.4,
    height: windowHeight * 0.4,
    marginLeft: windowWidth * 0.06,
    right: windowWidth * 0.12,
    left: windowWidth * 0.12,
    justifyContent: "center",
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
    top: windowWidth * 0.01,
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

  accept_title: {
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
    left: windowWidth * 0.2,
    right: windowHeight * 0.2,
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
    top: windowWidth * 0.07,
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

  container10: {
    flex: 1,
    backgroundColor:"white",
    marginTop: windowHeight * 0.01,
    marginBottom: windowHeight * 0.01,
    marginLeft: windowHeight * 0.015,
    paddingRight: windowWidth * 0.03,
    paddingLeft: windowWidth * 0.03,
    paddingTop: windowWidth * 0.0003,
    height: windowHeight * 0.34,
    width: windowWidth * 0.85,
    padding: 4,
    left: windowWidth * 0.06,
    right: windowWidth * 0.08,
    borderRadius: 10,

  },

  sectionStyle: {
    flex: 1,
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
    color:"red"
  },
  buttonText: {
    fontSize: 20,
    marginTop: 10,
    color:"black"
  },
});

const options = {
  container10: {
    flex: 1,
    backgroundColor:"green",
    marginTop: windowHeight * 0.01,
    marginBottom: windowHeight * 0.01,
    marginLeft: windowHeight * 0.015,
    paddingRight: windowWidth * 0.03,
    paddingLeft: windowWidth * 0.03,
    paddingTop: windowWidth * 0.0003,
    height: windowHeight * 0.34,
    width: windowWidth * 0.85,
    padding: 4,
    left: windowWidth * 0.06,
    right: windowWidth * 0.08,
    borderRadius: 10,
  },
  text: {
    fontSize: 35,
    color: "grey",
    marginLeft: 7,
    fontWeight: "bold",
    textAlign: "center",
  },
};

export default ProfileView;
